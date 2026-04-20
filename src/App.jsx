import { useState, useEffect } from "react";

const API = import.meta.env.VITE_API_URL;

// ─── API helper ───────────────────────────────────────────────────────────────
const api = {
  get: (path) => fetch(`${API}${path}`).then(r => r.json()),
  post: (path, body) => fetch(`${API}${path}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }).then(r => r.json()),
  put: (path, body) => fetch(`${API}${path}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }).then(r => r.json()),
  del: (path) => fetch(`${API}${path}`, { method: "DELETE" }).then(r => r.json()),
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const injectStyles = () => {
  if (document.getElementById("lh-styles")) return;
  const style = document.createElement("style");
  style.id = "lh-styles";
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,600;0,700;0,900;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
    *{box-sizing:border-box;margin:0;padding:0;}
    :root{
  --ink:#0d0f1a;--paper:#f5f0e8;--cream:#ede8dc;--accent:#c84b31;--gold:#d4a843;
  --teal:#2a7f6f;--soft:#8b8578;--card:#fff9f0;--shadow:0 2px 20px rgba(13,15,26,.08);
}
body.dark{
  --ink:#f0ece4;--paper:#0f1117;--cream:#1e2130;--accent:#e8694f;--gold:#e0b84e;
  --teal:#3db38f;--soft:#7a8294;--card:#161b27;--shadow:0 2px 20px rgba(0,0,0,.4);
}
body.dark .sidebar{background:#0a0c12;}
body.dark .auth-card{background:#161b27;}
body.dark .form-input{background:#1e2130;color:#f0ece4;border-color:#2a2f42;}
body.dark .search-bar{background:#1e2130;color:#f0ece4;border-color:#2a2f42;}
body.dark table{background:#161b27;}
body.dark th{background:#1e2130;}
body.dark .modal{background:#161b27;}
body.dark .course-card{background:#161b27;border-color:#1e2130;}
body.dark .stat-card{background:#161b27;border-color:#1e2130;}
body.dark .card{background:#161b27;border-color:#1e2130;}
body.dark .topbar{background:#161b27;border-color:#1e2130;}
body.dark .lesson-item{background:#1e2130;}
body.dark .auth-tabs{background:#1e2130;}
body.dark .auth-tab.active{background:#2a2f42;color:#f0ece4;}
body.dark .btn-ghost{border-color:#2a2f42;color:#f0ece4;}
body.dark .btn-ghost:hover{background:#1e2130;}
body.dark select.form-input option{background:#1e2130;color:#f0ece4;
}
    body{font-family:'DM Sans',sans-serif;background:var(--paper);color:var(--ink);min-height:100vh;}
    h1,h2,h3{font-family:'Fraunces',serif;}
    .app-wrap{display:flex;min-height:100vh;}
    .sidebar{width:240px;min-height:100vh;background:var(--ink);color:#fff;display:flex;flex-direction:column;flex-shrink:0;position:fixed;left:0;top:0;bottom:0;z-index:100;}
    .sidebar-logo{padding:28px 24px 20px;border-bottom:1px solid rgba(255,255,255,.08);}
    .sidebar-logo h2{font-family:'Fraunces',serif;font-size:1.4rem;color:var(--gold);letter-spacing:-.5px;}
    .sidebar-logo span{font-size:.75rem;color:var(--soft);font-family:'DM Sans',sans-serif;font-weight:300;}
    .sidebar-nav{flex:1;padding:16px 0;}
    .nav-section{padding:8px 16px;font-size:.65rem;text-transform:uppercase;letter-spacing:2px;color:rgba(255,255,255,.3);margin-top:8px;}
    .nav-item{display:flex;align-items:center;gap:10px;padding:11px 24px;cursor:pointer;transition:all .2s;font-size:.88rem;color:rgba(255,255,255,.65);border-left:3px solid transparent;}
    .nav-item:hover{background:rgba(255,255,255,.05);color:#fff;}
    .nav-item.active{background:rgba(212,168,67,.1);color:var(--gold);border-left-color:var(--gold);}
    .nav-item .icon{font-size:1rem;width:20px;text-align:center;}
    .sidebar-footer{padding:20px 24px;border-top:1px solid rgba(255,255,255,.08);}
    .user-chip{display:flex;align-items:center;gap:10px;}
    .avatar{width:34px;height:34px;border-radius:50%;background:var(--accent);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:.85rem;flex-shrink:0;}
    .user-info{flex:1;min-width:0;}
    .user-info .name{font-size:.82rem;font-weight:600;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
    .user-info .role{font-size:.7rem;color:rgba(255,255,255,.4);text-transform:capitalize;}
    .logout-btn{background:none;border:none;color:rgba(255,255,255,.4);cursor:pointer;font-size:1rem;padding:4px;}
    .logout-btn:hover{color:var(--accent);}
    .main-content{margin-left:240px;flex:1;display:flex;flex-direction:column;}
    .topbar{background:var(--card);border-bottom:1px solid var(--cream);padding:16px 32px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:50;}
    .topbar-title{font-family:'Fraunces',serif;font-size:1.5rem;font-weight:700;}
    .topbar-right{display:flex;align-items:center;gap:12px;}
    .badge{background:var(--accent);color:#fff;font-size:.65rem;padding:2px 7px;border-radius:20px;font-weight:600;}
    .page-content{padding:32px;flex:1;}
    .card{background:var(--card);border:1px solid var(--cream);border-radius:14px;padding:24px;box-shadow:var(--shadow);}
    .stat-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:16px;margin-bottom:28px;}
    .stat-card{background:var(--card);border:1px solid var(--cream);border-radius:14px;padding:20px;position:relative;overflow:hidden;}
    .stat-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;}
    .stat-card.s1::before{background:var(--accent);}
    .stat-card.s2::before{background:var(--teal);}
    .stat-card.s3::before{background:var(--gold);}
    .stat-card.s4::before{background:#6b5ce7;}
    .stat-num{font-family:'Fraunces',serif;font-size:2.2rem;font-weight:900;line-height:1;}
    .stat-label{font-size:.75rem;color:var(--soft);margin-top:4px;text-transform:uppercase;letter-spacing:.5px;}
    .stat-icon{position:absolute;right:16px;top:50%;transform:translateY(-50%);font-size:2rem;opacity:.15;}
    .table-wrap{overflow-x:auto;border-radius:12px;border:1px solid var(--cream);}
    table{width:100%;border-collapse:collapse;background:var(--card);}
    th{background:var(--cream);padding:12px 16px;text-align:left;font-size:.72rem;text-transform:uppercase;letter-spacing:.8px;color:var(--soft);font-weight:600;white-space:nowrap;}
    td{padding:12px 16px;border-bottom:1px solid var(--cream);font-size:.875rem;vertical-align:middle;}
    tr:last-child td{border-bottom:none;}
    tr:hover td{background:rgba(212,168,67,.04);}
    .btn{padding:9px 18px;border-radius:8px;font-size:.82rem;font-weight:600;cursor:pointer;transition:all .2s;border:none;display:inline-flex;align-items:center;gap:6px;font-family:'DM Sans',sans-serif;}
    .btn-primary{background:var(--ink);color:#fff;}
    .btn-primary:hover{background:#1e2235;}
    .btn-accent{background:var(--accent);color:#fff;}
    .btn-accent:hover{opacity:.88;}
    .btn-ghost{background:transparent;border:1px solid var(--cream);color:var(--ink);}
    .btn-ghost:hover{background:var(--cream);}
    .btn-danger{background:#fee2e2;color:#dc2626;border:1px solid #fecaca;}
    .btn-danger:hover{background:#fecaca;}
    .btn-sm{padding:5px 12px;font-size:.75rem;}
    .form-group{margin-bottom:18px;}
    .form-label{display:block;font-size:.78rem;font-weight:600;margin-bottom:6px;color:var(--soft);text-transform:uppercase;letter-spacing:.5px;}
    .form-input{width:100%;padding:10px 14px;border:1.5px solid var(--cream);border-radius:8px;font-size:.875rem;background:var(--paper);color:var(--ink);transition:border-color .2s;font-family:'DM Sans',sans-serif;}
    .form-input:focus{outline:none;border-color:var(--gold);background:#fff;}
    .form-row{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
    .modal-overlay{position:fixed;inset:0;background:rgba(13,15,26,.6);z-index:1000;display:flex;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(3px);}
    .modal{background:var(--card);border-radius:18px;width:100%;max-width:540px;max-height:85vh;overflow-y:auto;box-shadow:0 20px 60px rgba(0,0,0,.3);}
    .modal-header{padding:24px 28px 0;display:flex;align-items:center;justify-content:space-between;}
    .modal-header h3{font-family:'Fraunces',serif;font-size:1.3rem;}
    .modal-body{padding:24px 28px;}
    .modal-footer{padding:0 28px 24px;display:flex;justify-content:flex-end;gap:10px;}
    .close-btn{background:none;border:none;cursor:pointer;font-size:1.3rem;color:var(--soft);padding:4px;}
    .course-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:20px;}
    .course-card{background:var(--card);border:1px solid var(--cream);border-radius:16px;overflow:hidden;transition:transform .2s,box-shadow .2s;cursor:pointer;}
    .course-card:hover{transform:translateY(-3px);box-shadow:0 8px 30px rgba(0,0,0,.12);}
    .course-thumb{height:120px;display:flex;align-items:center;justify-content:center;font-size:3.5rem;background:linear-gradient(135deg,var(--cream),#fff);}
    .course-body{padding:16px;}
    .course-meta{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px;}
    .tag{padding:3px 8px;border-radius:4px;font-size:.68rem;font-weight:600;text-transform:uppercase;letter-spacing:.3px;}
    .tag-cat{background:#e8f4f0;color:var(--teal);}
    .tag-level{background:#fef3e2;color:#b45309;}
    .tag-status-active{background:#d1fae5;color:#065f46;}
    .tag-status-draft{background:#fef9c3;color:#854d0e;}
    .course-title{font-family:'Fraunces',serif;font-size:1rem;font-weight:700;margin-bottom:6px;line-height:1.3;}
    .course-instructor{font-size:.78rem;color:var(--soft);}
    .course-footer{padding:12px 16px;border-top:1px solid var(--cream);display:flex;align-items:center;justify-content:space-between;}
    .price{font-family:'Fraunces',serif;font-size:1.1rem;font-weight:700;color:var(--accent);}
    .progress-bar{height:6px;background:var(--cream);border-radius:3px;overflow:hidden;}
    .progress-fill{height:100%;background:var(--teal);border-radius:3px;transition:width .3s;}
    .auth-page{min-height:100vh;display:flex;align-items:center;justify-content:center;background:var(--ink);padding:20px;}
    .auth-card{background:var(--card);border-radius:20px;padding:40px;width:100%;max-width:420px;box-shadow:0 30px 80px rgba(0,0,0,.4);}
    .auth-logo{text-align:center;margin-bottom:32px;}
    .auth-logo h1{font-family:'Fraunces',serif;font-size:2rem;color:var(--ink);}
    .auth-logo p{color:var(--soft);font-size:.85rem;margin-top:4px;}
    .auth-tabs{display:flex;gap:4px;background:var(--cream);border-radius:8px;padding:4px;margin-bottom:24px;}
    .auth-tab{flex:1;padding:8px;text-align:center;border-radius:6px;cursor:pointer;font-size:.82rem;font-weight:600;transition:all .2s;background:transparent;border:none;color:var(--soft);}
    .auth-tab.active{background:#fff;color:var(--ink);box-shadow:0 1px 4px rgba(0,0,0,.1);}
    .error-msg{background:#fee2e2;color:#dc2626;padding:10px 14px;border-radius:8px;font-size:.82rem;margin-bottom:16px;}
    .success-msg{background:#d1fae5;color:#065f46;padding:10px 14px;border-radius:8px;font-size:.82rem;margin-bottom:16px;}
    .section-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;}
    .section-header h2{font-family:'Fraunces',serif;font-size:1.4rem;}
    .empty-state{text-align:center;padding:48px 24px;color:var(--soft);}
    .empty-state .icon{font-size:3rem;margin-bottom:12px;}
    .chip{display:inline-flex;align-items:center;gap:4px;padding:2px 8px;border-radius:20px;font-size:.72rem;font-weight:600;}
    .chip-green{background:#d1fae5;color:#065f46;}
    .chip-yellow{background:#fef9c3;color:#854d0e;}
    .search-bar{padding:9px 14px;border:1.5px solid var(--cream);border-radius:8px;font-size:.875rem;width:240px;background:var(--paper);font-family:'DM Sans',sans-serif;color:#000;}
    .search-bar::placeholder{color:#aaa;}
    .search-bar:focus{outline:none;border-color:var(--gold);}
    .actions{display:flex;gap:6px;}
    .lesson-item{display:flex;align-items:center;gap:10px;padding:10px 14px;background:var(--paper);border-radius:8px;margin-bottom:6px;font-size:.85rem;}
    .lesson-num{width:24px;height:24px;background:var(--ink);color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.72rem;font-weight:700;flex-shrink:0;}
    .detail-hero{background:var(--ink);color:#fff;border-radius:16px;padding:32px;margin-bottom:24px;display:flex;align-items:center;gap:24px;}
    .detail-emoji{font-size:4rem;flex-shrink:0;}
    .detail-title{font-family:'Fraunces',serif;font-size:1.8rem;margin-bottom:6px;}
    .enrolled-badge{background:var(--gold);color:var(--ink);padding:4px 10px;border-radius:4px;font-size:.72rem;font-weight:700;display:inline-block;margin-top:8px;}
    .loading{text-align:center;padding:48px;color:var(--soft);font-size:.9rem;}
    .pw-wrap{position:relative;}
    .pw-wrap .form-input{padding-right:42px;}
    .pw-eye{position:absolute;right:12px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:var(--soft);font-size:1.1rem;padding:2px;line-height:1;transition:color .2s;}
    .pw-eye:hover{color:var(--ink);}
  `;
  document.head.appendChild(style);
};

// ─── Eye Icon SVG ─────────────────────────────────────────────────────────────
function EyeIcon({ open }) {
  return open ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  );
}

// ─── Password Input with Eye Toggle ──────────────────────────────────────────
function PasswordInput({ value, onChange, placeholder, onKeyDown }) {
  const [show, setShow] = useState(false);
  return (
    <div className="pw-wrap">
      <input
        className="form-input"
        type={show ? "text" : "password"}
        placeholder={placeholder || "Password"}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      <button className="pw-eye" type="button" onClick={() => setShow(s => !s)} tabIndex={-1}>
        <EyeIcon open={show} />
      </button>
    </div>
  );
}

// ─── Auth Page ────────────────────────────────────────────────────────────────
function AuthPage({ onLogin }) {
  const [tab, setTab] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const handle = f => e => setForm({ ...form, [f]: e.target.value });

  const switchTab = (t) => {
    setTab(t);
    setError("");
    setSuccess("");
    setForm({ name: "", email: "", password: "", confirm: "" });
  };

  const login = async () => {
    if (!form.email || !form.password) return setError("Email and password are required.");
    setLoading(true); setError("");
    const res = await api.post("/auth/login", { email: form.email, password: form.password });
    setLoading(false);
    if (res.error) return setError(res.error);
    onLogin(res.user);
  };

  const register = async () => {
    if (!form.name || !form.email || !form.password || !form.confirm)
      return setError("All fields are required.");
    if (form.password.length < 6)
      return setError("Password must be at least 6 characters.");
    if (form.password !== form.confirm)
      return setError("Passwords do not match.");
    setLoading(true); setError("");
    const res = await api.post("/auth/register", { name: form.name, email: form.email, password: form.password });
    setLoading(false);
    if (res.error) return setError(res.error);
    setSuccess("Account created! Please sign in.");
    switchTab("login");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo"><h1>📚 LearnHub</h1><p>Your gateway to knowledge</p></div>
        <div className="auth-tabs">
          <button className={`auth-tab${tab === "login" ? " active" : ""}`} onClick={() => switchTab("login")}>Sign In</button>
          <button className={`auth-tab${tab === "register" ? " active" : ""}`} onClick={() => switchTab("register")}>Register</button>
        </div>

        {error && <div className="error-msg">⚠️ {error}</div>}
        {success && <div className="success-msg">✅ {success}</div>}

        {tab === "register" && (
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input className="form-input" placeholder="Your full name" value={form.name} onChange={handle("name")} />
          </div>
        )}

        <div className="form-group">
          <label className="form-label">Email</label>
          <input className="form-input" type="email" placeholder="you@example.com" value={form.email} onChange={handle("email")} />
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <PasswordInput
            value={form.password}
            onChange={handle("password")}
            placeholder={tab === "register" ? "Min. 6 characters" : "Your password"}
            onKeyDown={e => e.key === "Enter" && tab === "login" && login()}
          />
        </div>

        {tab === "register" && (
          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <PasswordInput
              value={form.confirm}
              onChange={handle("confirm")}
              placeholder="Re-enter your password"
              onKeyDown={e => e.key === "Enter" && register()}
            />
            {form.confirm && form.password !== form.confirm && (
              <div style={{ color: "#dc2626", fontSize: ".75rem", marginTop: 5 }}>
                ⚠️ Passwords do not match
              </div>
            )}
            {form.confirm && form.password === form.confirm && form.confirm.length > 0 && (
              <div style={{ color: "#2a7f6f", fontSize: ".75rem", marginTop: 5 }}>
                ✓ Passwords match
              </div>
            )}
          </div>
        )}

        <button
          className="btn btn-primary"
          style={{ width: "100%", justifyContent: "center", padding: "12px", marginTop: 4 }}
          onClick={tab === "login" ? login : register}
          disabled={loading}
        >
          {loading ? "Please wait..." : tab === "login" ? "Sign In →" : "Create Account →"}
        </button>

        <p style={{ textAlign: "center", marginTop: 16, fontSize: ".78rem", color: "var(--soft)" }}>
          By signing up, you agree to our <a href="/terms" style={{ color: "var(--accent)", textDecoration: "underline" }}>Terms of Service</a> and <a href="/privacy" style={{ color: "var(--accent)", textDecoration: "underline" }}>Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
function Sidebar({ user, page, setPage, onLogout, onToggleDark, isDark }) {
  const isAdmin = user.role === "admin";
  const nav = isAdmin
    ? [{ label: "Dashboard", icon: "📊", id: "admin-dashboard" }, { label: "Courses", icon: "📚", id: "admin-courses" }, { label: "Students", icon: "👥", id: "admin-students" }, { label: "Enrollments", icon: "📋", id: "admin-enrollments" }, { label: "Browse Site", icon: "🌐", id: "courses" }]
    : [{ label: "Dashboard", icon: "🏠", id: "dashboard" }, { label: "Browse Courses", icon: "🔍", id: "courses" }, { label: "My Learning", icon: "📖", id: "my-courses" }, { label: "My Profile", icon: "👤", id: "profile" }];
  return (
    <aside className="sidebar">
      <div className="sidebar-logo"><h2>📚 LearnHub</h2><span>{isAdmin ? "Admin Panel" : "Learning Portal"}</span></div>
      <nav className="sidebar-nav">
        {nav.map(item => <div key={item.id} className={`nav-item${page === item.id ? " active" : ""}`} onClick={() => setPage(item.id)}><span className="icon">{item.icon}</span>{item.label}</div>)}
      </nav>
      <div className="sidebar-footer">
  <div className="user-chip">
    <div className="avatar">{user.name[0]}</div>
    <div className="user-info">
      <div className="name">{user.name}</div>
      <div className="role">{user.role}</div>
    </div>
  </div>
</div>
    </aside>
  );
}

// ─── Student Dashboard ────────────────────────────────────────────────────────
function StudentDashboard({ user, setPage }) {
  const [enrollments, setEnrollments] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.get(`/enrollments/user/${user.id}`), api.get("/courses")]).then(([e, c]) => {
      setEnrollments(e); setAllCourses(c); setLoading(false);
    });
  }, [user.id]);

  if (loading) return <div className="loading">Loading dashboard...</div>;
  const activeCourses = allCourses.filter(c => c.status === "active");

  return (
    <div>
      <div className="stat-grid">
        <div className="stat-card s1"><div className="stat-num">{enrollments.length}</div><div className="stat-label">Enrolled Courses</div><div className="stat-icon">📚</div></div>
        <div className="stat-card s2"><div className="stat-num">{enrollments.filter(e => e.completed).length}</div><div className="stat-label">Completed</div><div className="stat-icon">✅</div></div>
        <div className="stat-card s3"><div className="stat-num">{enrollments.length ? Math.round(enrollments.reduce((s, e) => s + e.progress, 0) / enrollments.length) : 0}%</div><div className="stat-label">Avg. Progress</div><div className="stat-icon">📈</div></div>
        <div className="stat-card s4"><div className="stat-num">{activeCourses.length}</div><div className="stat-label">Available Courses</div><div className="stat-icon">🎓</div></div>
      </div>
      <div className="section-header"><h2>Continue Learning</h2><button className="btn btn-ghost btn-sm" onClick={() => setPage("courses")}>Browse All →</button></div>
      {enrollments.length === 0
        ? <div className="empty-state"><div className="icon">🎯</div><p>No courses yet. Start learning today!</p><button className="btn btn-primary" style={{ marginTop: 12 }} onClick={() => setPage("courses")}>Browse Courses</button></div>
        : <div className="course-grid">{enrollments.map(e => (
          <div className="course-card" key={e.course_id} onClick={() => setPage(`course-${e.course_id}`)}>
            <div className="course-thumb">{e.image}</div>
            <div className="course-body">
              <div className="course-meta"><span className="tag tag-cat">{e.category}</span></div>
              <div className="course-title">{e.title}</div>
              <div className="course-instructor">by {e.instructor}</div>
              <div style={{ marginTop: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: ".75rem", color: "var(--soft)", marginBottom: 4 }}><span>Progress</span><span>{e.progress}%</span></div>
                <div className="progress-bar"><div className="progress-fill" style={{ width: `${e.progress}%` }} /></div>
              </div>
            </div>
          </div>
        ))}</div>}
    </div>
  );
}

// ─── Browse Courses ───────────────────────────────────────────────────────────
function CourseCatalog({ user, setPage }) {
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");
  const [toast, setToast] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.get("/courses"), api.get(`/enrollments/user/${user.id}`)]).then(([c, e]) => {
      setCourses(c.filter(c => c.status === "active")); setEnrollments(e); setLoading(false);
    });
  }, [user.id]);

  const cats = ["All", ...new Set(courses.map(c => c.category))];
  const filtered = courses.filter(c => (cat === "All" || c.category === cat) && (c.title.toLowerCase().includes(search.toLowerCase()) || c.instructor.toLowerCase().includes(search.toLowerCase())));
  const isEnrolled = id => enrollments.some(e => e.course_id === id);

  const enroll = async (ev, courseId) => {
    ev.stopPropagation();
    const res = await api.post("/enrollments", { userId: user.id, courseId });
    if (res.error) return setToast("Already enrolled!");
    setEnrollments([...enrollments, { course_id: courseId }]);
    setToast("Enrolled successfully! 🎉"); setTimeout(() => setToast(""), 3000);
  };

  if (loading) return <div className="loading">Loading courses...</div>;

  return (
    <div>
      {toast && <div className="success-msg" style={{ marginBottom: 16 }}>✅ {toast}</div>}
      <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap", alignItems: "center" }}>
        <input className="search-bar" placeholder="Search courses..." value={search} onChange={e => setSearch(e.target.value)} />
        <div style={{ display: "flex", gap: 6 }}>{cats.map(c => <button key={c} className={`btn btn-sm ${cat === c ? "btn-primary" : "btn-ghost"}`} onClick={() => setCat(c)}>{c}</button>)}</div>
      </div>
      <div className="course-grid">
        {filtered.map(c => (
          <div className="course-card" key={c.id} onClick={() => setPage(`course-${c.id}`)}>
            <div className="course-thumb">{c.image}</div>
            <div className="course-body">
              <div className="course-meta"><span className="tag tag-cat">{c.category}</span><span className="tag tag-level">{c.level}</span></div>
              <div className="course-title">{c.title}</div>
              <div className="course-instructor">by {c.instructor}</div>
              <div style={{ marginTop: 8, fontSize: ".75rem", color: "var(--soft)" }}>⏱ {c.duration} &nbsp;⭐ {c.rating || "New"} &nbsp;👥 {c.students}</div>
            </div>
            <div className="course-footer">
              <span className="price">₹{Number(c.price).toLocaleString()}</span>
              {isEnrolled(c.id) ? <span className="chip chip-green">✓ Enrolled</span> : <button className="btn btn-accent btn-sm" onClick={ev => enroll(ev, c.id)}>Enroll</button>}
            </div>
          </div>
        ))}
      </div>
      {filtered.length === 0 && <div className="empty-state"><div className="icon">🔍</div><p>No courses found.</p></div>}
    </div>
  );
}

// ─── Course Detail ────────────────────────────────────────────────────────────
function CourseDetail({ courseId, user, onBack }) {
  const [course, setCourse] = useState(null);
  const [enrollment, setEnrollment] = useState(null);
  const [toast, setToast] = useState("");

  useEffect(() => {
    api.get(`/courses/${courseId}`).then(setCourse);
    api.get(`/enrollments/user/${user.id}`).then(list => setEnrollment(list.find(e => e.course_id === courseId) || null));
  }, [courseId, user.id]);

  if (!course) return <div className="loading">Loading course...</div>;

  const enroll = async () => {
    const res = await api.post("/enrollments", { userId: user.id, courseId });
    if (!res.error) { setEnrollment({ course_id: courseId, progress: 0 }); setToast("Enrolled! 🎉"); setTimeout(() => setToast(""), 2000); }
  };

  const updateProgress = async (p) => {
    await api.put("/enrollments/progress", { userId: user.id, courseId, progress: p });
    setEnrollment({ ...enrollment, progress: p }); setToast(`Progress set to ${p}%`); setTimeout(() => setToast(""), 2000);
  };

  const lessons = Array.isArray(course.lessons) ? course.lessons : (typeof course.lessons === "string" ? JSON.parse(course.lessons) : []);

  return (
    <div>
      <button className="btn btn-ghost btn-sm" style={{ marginBottom: 16, display:"block", marginLeft: "auto"}} onClick={onBack}>← Back</button>
      {toast && <div className="success-msg" style={{ marginBottom: 16 }}>✅ {toast}</div>}
      <div className="detail-hero">
        <div className="detail-emoji">{course.image}</div>
        <div>
          <div className="course-meta" style={{ marginBottom: 8 }}><span className="tag tag-cat">{course.category}</span><span className="tag tag-level">{course.level}</span></div>
          <div className="detail-title">{course.title}</div>
          <div style={{ color: "rgba(255,255,255,.65)", fontSize: ".85rem" }}>by {course.instructor} · ⏱ {course.duration} · ⭐ {course.rating} · 👥 {course.students} students</div>
          {enrollment && <span className="enrolled-badge">✓ Enrolled</span>}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 24 }}>
        <div>
          <div className="card" style={{ marginBottom: 20 }}><h3 style={{ marginBottom: 12 }}>About This Course</h3><p style={{ color: "var(--soft)", lineHeight: 1.7 }}>{course.description}</p></div>
          <div className="card">
            <h3 style={{ marginBottom: 16 }}>Course Curriculum ({lessons.length} lessons)</h3>
            {lessons.map((l, i) => <div className="lesson-item" key={i}><div className="lesson-num">{i + 1}</div><span>{l}</span>{enrollment && enrollment.progress >= ((i + 1) / lessons.length * 100) && <span style={{ marginLeft: "auto", color: "var(--teal)", fontSize: ".8rem" }}>✓</span>}</div>)}
          </div>
        </div>
        <div className="card">
          <div style={{ fontFamily: "Fraunces", fontSize: "1.8rem", fontWeight: 900, color: "var(--accent)", marginBottom: 16 }}>₹{Number(course.price).toLocaleString()}</div>
          {!enrollment
            ? <button className="btn btn-accent" style={{ width: "100%", justifyContent: "center", padding: 12 }} onClick={enroll}>Enroll Now</button>
            : <><div style={{ marginBottom: 12 }}><div style={{ display: "flex", justifyContent: "space-between", fontSize: ".78rem", color: "var(--soft)", marginBottom: 6 }}><span>Your Progress</span><span>{enrollment.progress}%</span></div><div className="progress-bar" style={{ height: 8 }}><div className="progress-fill" style={{ width: `${enrollment.progress}%` }} /></div></div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>{[25, 50, 75, 100].map(p => <button key={p} className="btn btn-ghost btn-sm" onClick={() => updateProgress(p)}>Set {p}%</button>)}</div></>}
        </div>
      </div>
    </div>
  );
}

// ─── My Courses ───────────────────────────────────────────────────────────────
function MyCourses({ user, setPage }) {
  const [my, setMy] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { api.get(`/enrollments/user/${user.id}`).then(d => { setMy(d); setLoading(false); }); }, [user.id]);
  if (loading) return <div className="loading">Loading...</div>;
  return (
    <div>
      {my.length === 0
        ? <div className="empty-state"><div className="icon">📚</div><p>No courses yet.</p><button className="btn btn-primary" style={{ marginTop: 12 }} onClick={() => setPage("courses")}>Browse Courses</button></div>
        : <div className="table-wrap"><table>
          <thead><tr><th>Course</th><th>Category</th><th>Instructor</th><th>Enrolled</th><th>Progress</th><th>Status</th></tr></thead>
          <tbody>{my.map(e => (
            <tr key={e.course_id} style={{ cursor: "pointer" }} onClick={() => setPage(`course-${e.course_id}`)}>
              <td><strong>{e.image} {e.title}</strong></td>
              <td><span className="tag tag-cat">{e.category}</span></td>
              <td style={{ color: "var(--soft)" }}>{e.instructor}</td>
              <td style={{ color: "var(--soft)", fontSize: ".8rem" }}>{new Date(e.enrolled_at).toLocaleDateString()}</td>
              <td style={{ minWidth: 120 }}><div style={{ display: "flex", alignItems: "center", gap: 8 }}><div className="progress-bar" style={{ flex: 1 }}><div className="progress-fill" style={{ width: `${e.progress}%` }} /></div><span style={{ fontSize: ".75rem", color: "var(--soft)" }}>{e.progress}%</span></div></td>
              <td>{e.completed ? <span className="chip chip-green">Completed</span> : <span className="chip chip-yellow">In Progress</span>}</td>
            </tr>
          ))}</tbody>
        </table></div>}
    </div>
  );
}

// ─── Profile ──────────────────────────────────────────────────────────────────
function Profile({ user }) {
  const [form, setForm] = useState({ name: user.name, email: user.email, password: "" });
  const [saved, setSaved] = useState(false);
  const handle = f => e => setForm({ ...form, [f]: e.target.value });
  const save = async () => {
    await api.put(`/users/${user.id}`, form);
    setSaved(true); setTimeout(() => setSaved(false), 2000);
  };
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
      <div className="card">
        <h3 style={{ marginBottom: 20 }}>Personal Information</h3>
        {saved && <div className="success-msg">✅ Profile updated!</div>}
        <div className="form-group"><label className="form-label">Full Name</label><input className="form-input" value={form.name} onChange={handle("name")} /></div>
        <div className="form-group"><label className="form-label">Email</label><input className="form-input" type="email" value={form.email} onChange={handle("email")} /></div>
        <div className="form-group"><label className="form-label">New Password</label><input className="form-input" type="password" value={form.password} onChange={handle("password")} placeholder="Leave blank to keep" /></div>
        <button className="btn btn-primary" onClick={save}>Save Changes</button>
      </div>
      <div className="card">
        <h3 style={{ marginBottom: 20 }}>Account Info</h3>
        {[["Role", user.role], ["Member Since", new Date(user.created_at).toLocaleDateString()], ["Email", user.email]].map(([k, v]) => (
          <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid var(--cream)" }}>
            <span style={{ color: "var(--soft)", fontSize: ".85rem" }}>{k}</span>
            <span style={{ fontWeight: 600, fontSize: ".85rem", textTransform: "capitalize" }}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Admin Dashboard ──────────────────────────────────────────────────────────
function AdminDashboard() {
  const [data, setData] = useState(null);
  useEffect(() => {
    Promise.all([api.get("/courses"), api.get("/users"), api.get("/enrollments")]).then(([courses, users, enrollments]) => setData({ courses, users, enrollments }));
  }, []);
  if (!data) return <div className="loading">Loading...</div>;
  const { courses, users, enrollments } = data;
  const revenue = enrollments.reduce((s, e) => { const c = courses.find(c => c.id === e.course_id); return s + (c ? Number(c.price) : 0); }, 0);
  return (
    <div>
      <div className="stat-grid">
        <div className="stat-card s1"><div className="stat-num">{courses.length}</div><div className="stat-label">Total Courses</div><div className="stat-icon">📚</div></div>
        <div className="stat-card s2"><div className="stat-num">{users.length}</div><div className="stat-label">Students</div><div className="stat-icon">👥</div></div>
        <div className="stat-card s3"><div className="stat-num">{enrollments.length}</div><div className="stat-label">Enrollments</div><div className="stat-icon">📋</div></div>
        <div className="stat-card s4"><div className="stat-num">₹{(revenue / 1000).toFixed(1)}k</div><div className="stat-label">Revenue</div><div className="stat-icon">💰</div></div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div className="card">
          <h3 style={{ marginBottom: 16 }}>Top Courses</h3>
          {[...courses].sort((a, b) => b.students - a.students).slice(0, 5).map(c => (
            <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <span style={{ fontSize: "1.4rem" }}>{c.image}</span>
              <div style={{ flex: 1 }}><div style={{ fontSize: ".85rem", fontWeight: 600 }}>{c.title}</div><div className="progress-bar" style={{ marginTop: 4 }}><div className="progress-fill" style={{ width: `${(c.students / 400) * 100}%` }} /></div></div>
              <span style={{ fontSize: ".78rem", color: "var(--soft)" }}>{c.students}</span>
            </div>
          ))}
        </div>
        <div className="card">
          <h3 style={{ marginBottom: 16 }}>Recent Enrollments</h3>
          {enrollments.slice(0, 5).map(e => (
            <div key={e.id} style={{ display: "flex", gap: 10, marginBottom: 12, alignItems: "center" }}>
              <div className="avatar" style={{ width: 28, height: 28, fontSize: ".72rem" }}>{e.user_name?.[0]}</div>
              <div style={{ flex: 1, fontSize: ".82rem" }}><strong>{e.user_name}</strong> enrolled in <strong>{e.course_title}</strong></div>
              <span style={{ fontSize: ".72rem", color: "var(--soft)" }}>{new Date(e.enrolled_at).toLocaleDateString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Admin: Courses CRUD ──────────────────────────────────────────────────────
function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const [search, setSearch] = useState("");
  const [delId, setDelId] = useState(null);

  const load = () => api.get("/courses").then(setCourses);
  useEffect(() => { load(); }, []);
  const handle = f => e => setForm({ ...form, [f]: e.target.value });

  const openCreate = () => { setForm({ title: "", category: "Web Dev", instructor: "", price: "", duration: "", level: "Beginner", description: "", image: "📚", status: "draft", lessons: "" }); setModal("create"); };
  const openEdit = c => { setForm({ ...c, lessons: Array.isArray(c.lessons) ? c.lessons.join("\n") : "" }); setModal("edit"); };

  const save = async () => {
    const data = { ...form, price: Number(form.price), lessons: form.lessons ? form.lessons.split("\n").filter(Boolean) : [] };
    if (modal === "create") await api.post("/courses", data);
    else await api.put(`/courses/${form.id}`, data);
    load(); setModal(null);
  };

  const del = async () => { await api.del(`/courses/${delId}`); load(); setDelId(null); };
  const filtered = courses.filter(c => c.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      {modal && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header"><h3>{modal === "create" ? "Add Course" : "Edit Course"}</h3><button className="close-btn" onClick={() => setModal(null)}>✕</button></div>
            <div className="modal-body">
              <div className="form-group"><label className="form-label">Title</label><input className="form-input" value={form.title || ""} onChange={handle("title")} /></div>
              <div className="form-row">
                <div className="form-group"><label className="form-label">Category</label><select className="form-input" value={form.category} onChange={handle("category")}>{["Web Dev","Data Science","Design","AI/ML","Mobile","DevOps"].map(c => <option key={c}>{c}</option>)}</select></div>
                <div className="form-group"><label className="form-label">Level</label><select className="form-input" value={form.level} onChange={handle("level")}>{["Beginner","Intermediate","Advanced"].map(l => <option key={l}>{l}</option>)}</select></div>
              </div>
              <div className="form-row">
                <div className="form-group"><label className="form-label">Instructor</label><input className="form-input" value={form.instructor || ""} onChange={handle("instructor")} /></div>
                <div className="form-group"><label className="form-label">Price (₹)</label><input className="form-input" type="number" value={form.price || ""} onChange={handle("price")} /></div>
              </div>
              <div className="form-row">
                <div className="form-group"><label className="form-label">Duration</label><input className="form-input" value={form.duration || ""} placeholder="e.g. 10h" onChange={handle("duration")} /></div>
                <div className="form-group"><label className="form-label">Emoji</label><input className="form-input" value={form.image || ""} onChange={handle("image")} /></div>
              </div>
              <div className="form-group"><label className="form-label">Status</label><select className="form-input" value={form.status} onChange={handle("status")}><option value="active">Active</option><option value="draft">Draft</option></select></div>
              <div className="form-group"><label className="form-label">Description</label><textarea className="form-input" rows={3} value={form.description || ""} onChange={handle("description")} /></div>
              <div className="form-group"><label className="form-label">Lessons (one per line)</label><textarea className="form-input" rows={4} value={form.lessons || ""} onChange={handle("lessons")} /></div>
            </div>
            <div className="modal-footer"><button className="btn btn-ghost" onClick={() => setModal(null)}>Cancel</button><button className="btn btn-primary" onClick={save}>Save</button></div>
          </div>
        </div>
      )}
      {delId && (
        <div className="modal-overlay" onClick={() => setDelId(null)}>
          <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 360 }}>
            <div className="modal-body" style={{ textAlign: "center", paddingTop: 32 }}>
              <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>🗑️</div>
              <h3 style={{ marginBottom: 8 }}>Delete Course?</h3>
              <p style={{ color: "var(--soft)", fontSize: ".85rem", marginBottom: 20 }}>All enrollments will be removed too.</p>
              <div style={{ display: "flex", gap: 10, justifyContent: "center" }}><button className="btn btn-ghost" onClick={() => setDelId(null)}>Cancel</button><button className="btn btn-danger" onClick={del}>Delete</button></div>
            </div>
          </div>
        </div>
      )}
      <div className="section-header"><input className="search-bar" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} /><button className="btn btn-primary" onClick={openCreate}>+ Add Course</button></div>
      <div className="table-wrap"><table>
        <thead><tr><th>Course</th><th>Category</th><th>Instructor</th><th>Price</th><th>Students</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>{filtered.map(c => (
          <tr key={c.id}>
            <td><strong>{c.image} {c.title}</strong><div style={{ fontSize: ".75rem", color: "var(--soft)" }}>{c.level} · {c.duration}</div></td>
            <td><span className="tag tag-cat">{c.category}</span></td>
            <td style={{ color: "var(--soft)" }}>{c.instructor}</td>
            <td>₹{Number(c.price).toLocaleString()}</td>
            <td>{c.students}</td>
            <td><span className={`tag tag-status-${c.status}`}>{c.status}</span></td>
            <td><div className="actions"><button className="btn btn-ghost btn-sm" onClick={() => openEdit(c)}>✏️ Edit</button><button className="btn btn-danger btn-sm" onClick={() => setDelId(c.id)}>🗑️</button></div></td>
          </tr>
        ))}</tbody>
      </table></div>
    </div>
  );
}

// ─── Admin: Students CRUD ─────────────────────────────────────────────────────
function AdminStudents() {
  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const [search, setSearch] = useState("");
  const [delId, setDelId] = useState(null);

  const load = () => api.get("/users").then(setUsers);
  useEffect(() => { load(); }, []);
  const handle = f => e => setForm({ ...form, [f]: e.target.value });

  const save = async () => {
    if (modal === "create") await api.post("/users", form);
    else await api.put(`/users/${form.id}`, form);
    load(); setModal(null);
  };

  const del = async () => { await api.del(`/users/${delId}`); load(); setDelId(null); };
  const filtered = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      {modal && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header"><h3>{modal === "create" ? "Add Student" : "Edit Student"}</h3><button className="close-btn" onClick={() => setModal(null)}>✕</button></div>
            <div className="modal-body">
              <div className="form-group"><label className="form-label">Full Name</label><input className="form-input" value={form.name || ""} onChange={handle("name")} /></div>
              <div className="form-group"><label className="form-label">Email</label><input className="form-input" type="email" value={form.email || ""} onChange={handle("email")} /></div>
              <div className="form-group"><label className="form-label">{modal === "create" ? "Password" : "New Password"}</label><input className="form-input" type="password" value={form.password || ""} onChange={handle("password")} /></div>
            </div>
            <div className="modal-footer"><button className="btn btn-ghost" onClick={() => setModal(null)}>Cancel</button><button className="btn btn-primary" onClick={save}>Save</button></div>
          </div>
        </div>
      )}
      {delId && (
        <div className="modal-overlay" onClick={() => setDelId(null)}>
          <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 360 }}>
            <div className="modal-body" style={{ textAlign: "center", paddingTop: 32 }}>
              <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>⚠️</div>
              <h3 style={{ marginBottom: 8 }}>Remove Student?</h3>
              <p style={{ color: "var(--soft)", fontSize: ".85rem", marginBottom: 20 }}>All their enrollments will be removed too.</p>
              <div style={{ display: "flex", gap: 10, justifyContent: "center" }}><button className="btn btn-ghost" onClick={() => setDelId(null)}>Cancel</button><button className="btn btn-danger" onClick={del}>Remove</button></div>
            </div>
          </div>
        </div>
      )}
      <div className="section-header"><input className="search-bar" placeholder="Search students..." value={search} onChange={e => setSearch(e.target.value)} /><button className="btn btn-primary" onClick={() => { setForm({ name: "", email: "", password: "" }); setModal("create"); }}>+ Add Student</button></div>
      <div className="table-wrap"><table>
        <thead><tr><th>Student</th><th>Email</th><th>Joined</th><th>Actions</th></tr></thead>
        <tbody>{filtered.map(u => (
          <tr key={u.id}>
            <td><div style={{ display: "flex", alignItems: "center", gap: 10 }}><div className="avatar" style={{ width: 30, height: 30, fontSize: ".78rem" }}>{u.name[0]}</div><strong>{u.name}</strong></div></td>
            <td style={{ color: "var(--soft)" }}>{u.email}</td>
            <td style={{ color: "var(--soft)", fontSize: ".8rem" }}>{new Date(u.created_at).toLocaleDateString()}</td>
            <td><div className="actions"><button className="btn btn-ghost btn-sm" onClick={() => { setForm({ ...u, password: "" }); setModal("edit"); }}>✏️ Edit</button><button className="btn btn-danger btn-sm" onClick={() => setDelId(u.id)}>🗑️</button></div></td>
          </tr>
        ))}</tbody>
      </table></div>
    </div>
  );
}

// ─── Admin: Enrollments ───────────────────────────────────────────────────────
function AdminEnrollments() {
  const [enrollments, setEnrollments] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => { api.get("/enrollments").then(setEnrollments); }, []);
  const filtered = enrollments.filter(e => e.user_name?.toLowerCase().includes(search.toLowerCase()) || e.course_title?.toLowerCase().includes(search.toLowerCase()));
  return (
    <div>
      <div className="section-header"><input className="search-bar" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} /><div style={{ fontSize: ".85rem", color: "var(--soft)" }}>{filtered.length} enrollments</div></div>
      <div className="table-wrap"><table>
        <thead><tr><th>Student</th><th>Course</th><th>Enrolled</th><th>Progress</th><th>Status</th></tr></thead>
        <tbody>{filtered.map(e => (
          <tr key={e.id}>
            <td><div style={{ display: "flex", alignItems: "center", gap: 8 }}><div className="avatar" style={{ width: 28, height: 28, fontSize: ".72rem" }}>{e.user_name?.[0]}</div>{e.user_name}</div></td>
            <td><strong>{e.course_image} {e.course_title}</strong></td>
            <td style={{ color: "var(--soft)", fontSize: ".8rem" }}>{new Date(e.enrolled_at).toLocaleDateString()}</td>
            <td style={{ minWidth: 140 }}><div style={{ display: "flex", alignItems: "center", gap: 8 }}><div className="progress-bar" style={{ flex: 1 }}><div className="progress-fill" style={{ width: `${e.progress}%` }} /></div><span style={{ fontSize: ".75rem", color: "var(--soft)" }}>{e.progress}%</span></div></td>
            <td>{e.completed ? <span className="chip chip-green">✓ Completed</span> : <span className="chip chip-yellow">In Progress</span>}</td>
          </tr>
        ))}</tbody>
      </table></div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  useEffect(() => { injectStyles(); }, []);
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("");
  const [isDark, setIsDark] = useState(false);

  const toggleDark = () => {
    setIsDark(d => {
      document.body.classList.toggle("dark", !d);
      return !d;
    });
  };

  const handleLogin = u => { setUser(u); setPage(u.role === "admin" ? "admin-dashboard" : "dashboard"); };
  const handleLogout = () => { setUser(null); setPage(""); };

  if (!user) return <AuthPage onLogin={handleLogin} />;

  const isCourseDetail = page.startsWith("course-");
  const courseDetailId = isCourseDetail ? Number(page.split("-")[1]) : null;

  const titles = { "dashboard": "Dashboard", "courses": "Browse Courses", "my-courses": "My Learning", "profile": "My Profile", "admin-dashboard": "Admin Dashboard", "admin-courses": "Manage Courses", "admin-students": "Manage Students", "admin-enrollments": "Enrollments" };

  return (
    <div className="app-wrap">
      <Sidebar user={user} page={page} setPage={setPage} onLogout={handleLogout} onToggleDark={toggleDark} isDark={isDark} />
      <div className="main-content">
        <div className="topbar">
  <div className="topbar-title">{isCourseDetail ? "Course Detail" : titles[page]}</div>
  <div className="topbar-right">
    {user.role === "admin" && <span className="badge">Admin</span>}
    <span style={{ fontSize: ".82rem", color: "var(--soft)" }}>
      Welcome, {user.name.split(" ")[0]}!
    </span>
    <button
      onClick={toggleDark}
      title="Toggle Dark Mode"
      style={{ background: "none", border: "1px solid var(--cream)", borderRadius: 8, padding: "5px 10px", cursor: "pointer", fontSize: "1rem", color: "var(--soft)" }}
    >
      {isDark ? "☀️" : "🌙"}
    </button>
    <button
      onClick={handleLogout}
      title="Logout"
      style={{ background: "none", border: "1px solid var(--cream)", borderRadius: 8, padding: "5px 12px", cursor: "pointer", fontSize: ".82rem", fontWeight: 600, color: "var(--accent)", fontFamily: "DM Sans, sans-serif" }}
    >
      ⏏ Logout
    </button>
  </div>
</div>
        <div className="page-content">
          {page === "dashboard" && <StudentDashboard user={user} setPage={setPage} />}
          {page === "courses" && <CourseCatalog user={user} setPage={setPage} />}
          {page === "my-courses" && <MyCourses user={user} setPage={setPage} />}
          {page === "profile" && <Profile user={user} />}
          {page === "admin-dashboard" && <AdminDashboard />}
          {page === "admin-courses" && <AdminCourses />}
          {page === "admin-students" && <AdminStudents />}
          {page === "admin-enrollments" && <AdminEnrollments />}
          {isCourseDetail && <CourseDetail courseId={courseDetailId} user={user} onBack={() => setPage("courses")} />}
        </div>
      </div>
    </div>
  );
}
