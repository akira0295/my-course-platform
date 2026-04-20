require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const app = express();
app.use(cors());
app.use(express.json());

// ─── MySQL Connection ─────────────────────────────────────────────────────────
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) { console.error("❌ MySQL connection failed:", err.message); process.exit(1); }
  console.log("✅ Connected to MySQL database!");
});

// ═══════════════════════════════════════════════════════════════
// AUTH ROUTES
// ═══════════════════════════════════════════════════════════════

// POST /api/auth/register
app.post("/api/auth/register", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: "All fields required" });

  db.query("SELECT id FROM users WHERE email = ?", [email], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    if (rows.length > 0) return res.status(400).json({ error: "Email already registered" });

    const hashed = bcrypt.hashSync(password, 10);
    db.query("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, 'student')",
      [name, email, hashed],
      (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Registered successfully", userId: result.insertId });
      }
    );
  });
});

// POST /api/auth/login
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  db.query("SELECT * FROM users WHERE email = ?", [email], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    if (rows.length === 0) return res.status(401).json({ error: "Invalid email or password" });

    const user = rows[0];
    const match = bcrypt.compareSync(password, user.password);
    if (!match) return res.status(401).json({ error: "Invalid email or password" });

    const { password: _, ...safeUser } = user;
    res.json({ user: safeUser });
  });
});

// ═══════════════════════════════════════════════════════════════
// COURSES ROUTES (CRUD)
// ═══════════════════════════════════════════════════════════════

// GET /api/courses
app.get("/api/courses", (req, res) => {
  db.query("SELECT * FROM courses ORDER BY created_at DESC", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    rows = rows.map(r => {
      let lessons = [];
      try {
        if (r.lessons) {
          lessons = typeof r.lessons === "string" && r.lessons.startsWith("[")
            ? JSON.parse(r.lessons)
            : r.lessons.split(",").map(l => l.trim());
        }
      } catch(e) { lessons = []; }
      return { ...r, lessons };
    });
    res.json(rows);
  });
});
// GET /api/courses/:id
app.get("/api/courses/:id", (req, res) => {
  db.query("SELECT * FROM courses WHERE id = ?", [req.params.id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    if (rows.length === 0) return res.status(404).json({ error: "Course not found" });
    let lessons = [];
try {
  if (rows[0].lessons) {
    lessons = typeof rows[0].lessons === "string" && rows[0].lessons.startsWith("[")
      ? JSON.parse(rows[0].lessons)
      : rows[0].lessons.split(",").map(l => l.trim());
  }
} catch(e) { lessons = []; }
const course = { ...rows[0], lessons };
    res.json(course);
  });
});

// POST /api/courses  (Admin: Create)
app.post("/api/courses", (req, res) => {
  const { title, category, instructor, price, duration, level, description, image, status, lessons } = req.body;
  const lessonsJson = JSON.stringify(lessons || []);
  db.query(
    "INSERT INTO courses (title, category, instructor, price, duration, level, description, image, status, lessons) VALUES (?,?,?,?,?,?,?,?,?,?)",
    [title, category, instructor, price, duration, level, description, image, status || "draft", lessonsJson],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Course created", id: result.insertId });
    }
  );
});

// PUT /api/courses/:id  (Admin: Update)
app.put("/api/courses/:id", (req, res) => {
  const { title, category, instructor, price, duration, level, description, image, status, lessons } = req.body;
  const lessonsJson = JSON.stringify(lessons || []);
  db.query(
    "UPDATE courses SET title=?, category=?, instructor=?, price=?, duration=?, level=?, description=?, image=?, status=?, lessons=? WHERE id=?",
    [title, category, instructor, price, duration, level, description, image, status, lessonsJson, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Course updated" });
    }
  );
});

// DELETE /api/courses/:id  (Admin: Delete)
app.delete("/api/courses/:id", (req, res) => {
  db.query("DELETE FROM enrollments WHERE course_id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    db.query("DELETE FROM courses WHERE id = ?", [req.params.id], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Course deleted" });
    });
  });
});

// ═══════════════════════════════════════════════════════════════
// USERS ROUTES (CRUD)
// ═══════════════════════════════════════════════════════════════

// GET /api/users
app.get("/api/users", (req, res) => {
  db.query("SELECT id, name, email, role, created_at FROM users WHERE role='student' ORDER BY created_at DESC", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// POST /api/users  (Admin: Create student)
app.post("/api/users", (req, res) => {
  const { name, email, password } = req.body;
  const hashed = bcrypt.hashSync(password, 10);
  db.query("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, 'student')",
    [name, email, hashed],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Student created", id: result.insertId });
    }
  );
});

// PUT /api/users/:id  (Admin/Student: Update)
app.put("/api/users/:id", (req, res) => {
  const { name, email, password } = req.body;
  if (password) {
    const hashed = bcrypt.hashSync(password, 10);
    db.query("UPDATE users SET name=?, email=?, password=? WHERE id=?", [name, email, hashed, req.params.id], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "User updated" });
    });
  } else {
    db.query("UPDATE users SET name=?, email=? WHERE id=?", [name, email, req.params.id], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "User updated" });
    });
  }
});

// DELETE /api/users/:id  (Admin: Delete)
app.delete("/api/users/:id", (req, res) => {
  db.query("DELETE FROM enrollments WHERE user_id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    db.query("DELETE FROM users WHERE id = ?", [req.params.id], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "User deleted" });
    });
  });
});

// ═══════════════════════════════════════════════════════════════
// ENROLLMENTS ROUTES
// ═══════════════════════════════════════════════════════════════

// GET /api/enrollments  (Admin: all)
app.get("/api/enrollments", (req, res) => {
  const sql = `
    SELECT e.*, u.name as user_name, u.email as user_email,
           c.title as course_title, c.image as course_image, c.category as course_category
    FROM enrollments e
    JOIN users u ON e.user_id = u.id
    JOIN courses c ON e.course_id = c.id
    ORDER BY e.enrolled_at DESC
  `;
  db.query(sql, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// GET /api/enrollments/user/:userId  (Student: my enrollments)
app.get("/api/enrollments/user/:userId", (req, res) => {
  const sql = `
    SELECT e.*, c.title, c.image, c.category, c.instructor, c.level, c.duration, c.price, c.rating, c.students
    FROM enrollments e
    JOIN courses c ON e.course_id = c.id
    WHERE e.user_id = ?
  `;
  db.query(sql, [req.params.userId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// POST /api/enrollments  (Student: enroll)
app.post("/api/enrollments", (req, res) => {
  const { userId, courseId } = req.body;
  db.query("SELECT id FROM enrollments WHERE user_id=? AND course_id=?", [userId, courseId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    if (rows.length > 0) return res.status(400).json({ error: "Already enrolled" });

    db.query("INSERT INTO enrollments (user_id, course_id) VALUES (?, ?)", [userId, courseId], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      db.query("UPDATE courses SET students = students + 1 WHERE id = ?", [courseId]);
      res.json({ message: "Enrolled successfully", id: result.insertId });
    });
  });
});

// PUT /api/enrollments/progress  (Student: update progress)
app.put("/api/enrollments/progress", (req, res) => {
  const { userId, courseId, progress } = req.body;
  const completed = progress >= 100 ? 1 : 0;
  db.query(
    "UPDATE enrollments SET progress=?, completed=? WHERE user_id=? AND course_id=?",
    [progress, completed, userId, courseId],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Progress updated" });
    }
  );
});

// ─── Start Server ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5003;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));