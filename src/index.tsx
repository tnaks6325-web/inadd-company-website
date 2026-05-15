import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import { renderer } from './renderer'
import { HomePage } from './routes/home'
import { AboutPage } from './routes/about'
import { WorksPage } from './routes/works'
import { InsightPage } from './routes/insight'
import { InsightDetailPage } from './routes/insight-detail'
import { ViralPage } from './routes/viral'
import { ContactPage } from './routes/contact'
import { SvcViralPage } from './routes/svc-viral'
import { SvcInfluencerPage } from './routes/svc-influencer'
import { SvcSeedingPage } from './routes/svc-seeding'
import { SvcSeoPage } from './routes/svc-seo'
import { SvcReviewPage } from './routes/svc-review'
import { SvcOliveYoungPage } from './routes/svc-oliveyoung'
import { SvcPplPage } from './routes/svc-ppl'
import { admin } from './admin/api'

const app = new Hono()

// Static files
app.use('/static/*', serveStatic({ root: './' }))

// Admin API
app.route('/api/admin', admin)

// Renderer middleware
app.use(renderer)

// Admin pages (plain HTML, no JSX renderer)
app.get('/admin/login', (c) => {
  return c.html(adminLoginHTML())
})

app.get('/admin', (c) => {
  return c.html(adminDashboardHTML())
})

app.get('/admin/*', (c) => {
  return c.html(adminDashboardHTML())
})

// Routes
app.get('/', (c) => {
  return c.render(<HomePage />, { title: '브랜드를 움직이는 힘' })
})

app.get('/about', (c) => {
  return c.render(<AboutPage />, { title: 'About' })
})

app.get('/works', (c) => {
  return c.render(<WorksPage />, { title: 'Works' })
})

app.get('/insight', (c) => {
  return c.render(<InsightPage />, { title: 'Marketing Insight' })
})

app.get('/insight/:id', (c) => {
  const id = c.req.param('id')
  return c.render(<InsightDetailPage id={id} />, { title: 'Insight' })
})

// Marketing 메인 (서비스 목록 페이지)
app.get('/marketing', (c) => {
  return c.render(<ViralPage />, { title: 'Marketing 서비스' })
})

// 기존 /viral 경로 유지 (호환성)
app.get('/viral', (c) => {
  return c.render(<ViralPage />, { title: 'Marketing 서비스' })
})

// 개별 서비스 페이지
app.get('/marketing/viral', (c) => {
  return c.render(<SvcViralPage />, { title: '바이럴 마케팅' })
})

app.get('/marketing/influencer', (c) => {
  return c.render(<SvcInfluencerPage />, { title: '인플루언서 마케팅' })
})

app.get('/marketing/seeding', (c) => {
  return c.render(<SvcSeedingPage />, { title: '시딩 캠페인' })
})

app.get('/marketing/seo', (c) => {
  return c.render(<SvcSeoPage />, { title: 'SEO 마케팅' })
})

app.get('/marketing/review', (c) => {
  return c.render(<SvcReviewPage />, { title: '리뷰 마케팅' })
})

app.get('/marketing/oliveyoung', (c) => {
  return c.render(<SvcOliveYoungPage />, { title: '올리브영 마케팅' })
})

app.get('/marketing/ppl', (c) => {
  return c.render(<SvcPplPage />, { title: 'PPL 마케팅' })
})

app.get('/contact', (c) => {
  return c.render(<ContactPage />, { title: 'Contact' })
})

// ─────────────────────────────────────────────
// Admin Login Page HTML
// ─────────────────────────────────────────────
function adminLoginHTML(): string {
  return `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Admin Login – IN AD COMPANY</title>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    min-height: 100vh;
    background: #0a0a0a;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Segoe UI', system-ui, sans-serif;
  }
  .login-card {
    background: #141414;
    border: 1px solid #2a2a2a;
    border-radius: 16px;
    padding: 48px 40px;
    width: 100%;
    max-width: 400px;
    box-shadow: 0 24px 60px rgba(0,0,0,0.6);
  }
  .login-logo {
    text-align: center;
    margin-bottom: 32px;
  }
  .login-logo .brand { color: #1a6bff; font-size: 13px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 8px; }
  .login-logo h1 { color: #fff; font-size: 22px; font-weight: 700; }
  .login-logo p { color: #666; font-size: 13px; margin-top: 6px; }
  .form-group { margin-bottom: 20px; }
  .form-group label { display: block; color: #aaa; font-size: 12px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 8px; }
  .form-group input {
    width: 100%; padding: 14px 16px;
    background: #1e1e1e; border: 1px solid #333;
    border-radius: 8px; color: #fff; font-size: 15px;
    outline: none; transition: border-color .2s;
  }
  .form-group input:focus { border-color: #1a6bff; }
  .btn-login {
    width: 100%; padding: 15px;
    background: #1a6bff; color: #fff;
    border: none; border-radius: 8px;
    font-size: 15px; font-weight: 700;
    cursor: pointer; transition: background .2s;
    margin-top: 8px;
  }
  .btn-login:hover { background: #0f5ae0; }
  .error-msg { color: #ff4d4d; font-size: 13px; text-align: center; margin-top: 16px; display: none; }
  .back-link { text-align: center; margin-top: 24px; }
  .back-link a { color: #555; font-size: 13px; text-decoration: none; }
  .back-link a:hover { color: #888; }
</style>
</head>
<body>
<div class="login-card">
  <div class="login-logo">
    <div class="brand">IN AD COMPANY</div>
    <h1>관리자 로그인</h1>
    <p>Admin Dashboard</p>
  </div>
  <form id="loginForm">
    <div class="form-group">
      <label>아이디</label>
      <input type="text" id="loginId" placeholder="아이디를 입력하세요" autocomplete="username">
    </div>
    <div class="form-group">
      <label>비밀번호</label>
      <input type="password" id="loginPw" placeholder="비밀번호를 입력하세요" autocomplete="current-password">
    </div>
    <button type="submit" class="btn-login">로그인</button>
    <div class="error-msg" id="errorMsg">아이디 또는 비밀번호가 올바르지 않습니다.</div>
  </form>
  <div class="back-link"><a href="/">← 메인으로 돌아가기</a></div>
</div>
<script>
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('loginId').value;
  const pw = document.getElementById('loginPw').value;
  try {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, pw })
    });
    const data = await res.json();
    if (data.ok) {
      localStorage.setItem('admin_token', data.token);
      window.location.href = '/admin';
    } else {
      document.getElementById('errorMsg').style.display = 'block';
    }
  } catch {
    document.getElementById('errorMsg').style.display = 'block';
  }
});
</script>
</body>
</html>`
}

// ─────────────────────────────────────────────
// Admin Dashboard HTML
// ─────────────────────────────────────────────
function adminDashboardHTML(): string {
  return `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Admin Dashboard – IN AD COMPANY</title>
<link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0d0d0d; color: #e0e0e0; font-family: 'Segoe UI', system-ui, sans-serif; display: flex; min-height: 100vh; }

  /* ── Sidebar ── */
  .sidebar {
    width: 240px; min-height: 100vh;
    background: #111; border-right: 1px solid #222;
    display: flex; flex-direction: column;
    position: fixed; top: 0; left: 0; z-index: 100;
  }
  .sidebar-header {
    padding: 24px 20px 20px;
    border-bottom: 1px solid #222;
  }
  .sidebar-header .brand { color: #1a6bff; font-size: 11px; font-weight: 700; letter-spacing: 2px; }
  .sidebar-header h2 { color: #fff; font-size: 16px; font-weight: 700; margin-top: 4px; }
  .sidebar-nav { flex: 1; padding: 16px 0; overflow-y: auto; }
  .nav-section { padding: 8px 16px 4px; color: #555; font-size: 10px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; }
  .nav-item {
    display: flex; align-items: center; gap: 10px;
    padding: 11px 20px; color: #888;
    cursor: pointer; transition: all .15s;
    font-size: 14px; border-left: 3px solid transparent;
  }
  .nav-item:hover { color: #fff; background: #1a1a1a; }
  .nav-item.active { color: #1a6bff; background: rgba(26,107,255,0.08); border-left-color: #1a6bff; }
  .nav-item i { width: 18px; text-align: center; font-size: 13px; }
  .sidebar-footer { padding: 16px 20px; border-top: 1px solid #222; }
  .btn-logout { width: 100%; padding: 10px; background: transparent; border: 1px solid #333; border-radius: 6px; color: #666; font-size: 13px; cursor: pointer; transition: all .15s; }
  .btn-logout:hover { border-color: #ff4d4d; color: #ff4d4d; }

  /* ── Main ── */
  .main { margin-left: 240px; flex: 1; min-height: 100vh; }
  .topbar { background: #111; border-bottom: 1px solid #222; padding: 16px 32px; display: flex; align-items: center; justify-content: space-between; }
  .topbar h1 { color: #fff; font-size: 18px; font-weight: 700; }
  .topbar .status { color: #555; font-size: 13px; }
  .content { padding: 32px; }

  /* ── Panels ── */
  .panel { background: #141414; border: 1px solid #222; border-radius: 12px; padding: 28px; margin-bottom: 24px; }
  .panel-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; }
  .panel-title { color: #fff; font-size: 16px; font-weight: 700; display: flex; align-items: center; gap: 8px; }
  .panel-title i { color: #1a6bff; }

  /* ── Form elements ── */
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
  .form-row.single { grid-template-columns: 1fr; }
  .form-row.triple { grid-template-columns: 1fr 1fr 1fr; }
  .form-group { display: flex; flex-direction: column; gap: 6px; }
  .form-group label { color: #aaa; font-size: 12px; font-weight: 600; letter-spacing: .5px; }
  .form-group input, .form-group textarea, .form-group select {
    background: #1e1e1e; border: 1px solid #333; border-radius: 8px;
    color: #fff; font-size: 14px; padding: 10px 14px; outline: none;
    transition: border-color .2s; font-family: inherit;
  }
  .form-group input:focus, .form-group textarea:focus, .form-group select:focus { border-color: #1a6bff; }
  .form-group textarea { resize: vertical; min-height: 80px; }

  /* ── Buttons ── */
  .btn { padding: 10px 20px; border-radius: 8px; font-size: 13px; font-weight: 700; cursor: pointer; border: none; transition: all .2s; display: inline-flex; align-items: center; gap: 6px; }
  .btn-primary { background: #1a6bff; color: #fff; }
  .btn-primary:hover { background: #0f5ae0; }
  .btn-secondary { background: #222; color: #aaa; border: 1px solid #333; }
  .btn-secondary:hover { background: #2a2a2a; color: #fff; }
  .btn-danger { background: transparent; color: #ff4d4d; border: 1px solid #ff4d4d; }
  .btn-danger:hover { background: rgba(255,77,77,0.1); }
  .btn-success { background: #22c55e; color: #fff; }
  .btn-success:hover { background: #16a34a; }
  .btn-sm { padding: 6px 14px; font-size: 12px; }

  /* ── Video list ── */
  .video-list { display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px; }
  .video-item { background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 8px; overflow: hidden; }
  .video-item-inner { display: flex; flex-direction: column; }
  .video-memo-input { width: 100%; background: #111; border: none; border-bottom: 1px solid #222; color: #f0b429; font-size: 12px; font-weight: 600; padding: 7px 16px; outline: none; letter-spacing: .02em; }
  .video-memo-input::placeholder { color: #444; font-weight: 400; }
  .video-memo-input:focus { background: #181808; border-bottom-color: #f0b429; }
  .video-item-row { display: flex; align-items: center; gap: 10px; padding: 10px 16px; }
  .video-item .idx { color: #555; font-size: 12px; font-weight: 700; min-width: 24px; }
  .video-item input[data-idx] { flex: 1; background: transparent; border: none; color: #fff; font-size: 14px; outline: none; }
  .video-item .yt-preview { color: #ff4040; font-size: 16px; cursor: pointer; padding: 0 4px; }
  .video-item .btn-remove { color: #555; background: none; border: none; cursor: pointer; font-size: 16px; padding: 0 4px; transition: color .15s; }
  .video-item .btn-remove:hover { color: #ff4d4d; }

  /* ── Stats grid ── */
  .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
  .stat-card { background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 10px; padding: 20px; text-align: center; }
  .stat-card label { color: #777; font-size: 11px; display: block; margin-bottom: 8px; }
  .stat-card input { background: transparent; border: none; border-bottom: 1px solid #333; color: #fff; font-size: 24px; font-weight: 700; text-align: center; width: 100%; outline: none; padding: 4px 0; }

  /* ── Logo grid ── */
  .logo-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 12px; margin-bottom: 16px; }
  .logo-card { background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 8px; padding: 12px; text-align: center; position: relative; }
  .logo-card img { max-width: 80px; max-height: 50px; object-fit: contain; }
  .logo-card .btn-del { position: absolute; top: 4px; right: 4px; background: rgba(255,77,77,0.8); color: #fff; border: none; border-radius: 4px; font-size: 11px; padding: 2px 6px; cursor: pointer; }
  .logo-card .logo-name { color: #666; font-size: 10px; margin-top: 6px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .upload-zone { border: 2px dashed #333; border-radius: 10px; padding: 32px; text-align: center; color: #555; cursor: pointer; transition: all .2s; margin-bottom: 16px; }
  .upload-zone:hover { border-color: #1a6bff; color: #1a6bff; }
  .upload-zone i { font-size: 32px; margin-bottom: 8px; display: block; }
  .thumb-spec { background: #1a1a2e; border: 1px solid #1a6bff33; border-radius: 8px; padding: 14px 18px; margin-bottom: 16px; color: #aaa; font-size: 13px; line-height: 1.8; }
  .thumb-spec strong { color: #1a6bff; }

  /* ── Works table ── */
  .works-table { width: 100%; border-collapse: collapse; }
  .works-table th { color: #666; font-size: 11px; font-weight: 700; letter-spacing: .5px; text-transform: uppercase; padding: 8px 12px; border-bottom: 1px solid #222; text-align: left; }
  .works-table td { padding: 12px; border-bottom: 1px solid #1a1a1a; vertical-align: middle; }
  .works-table tr:hover td { background: #181818; }
  .works-thumb { width: 64px; height: 48px; object-fit: cover; border-radius: 6px; }
  .tag-chip { display: inline-block; padding: 3px 10px; border-radius: 100px; font-size: 11px; font-weight: 600; background: rgba(26,107,255,0.15); color: #1a6bff; margin: 2px; }

  /* ── Insight posts ── */
  .post-list { display: flex; flex-direction: column; gap: 12px; }
  .post-item { background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 10px; padding: 16px 20px; display: flex; align-items: center; gap: 16px; }
  .post-thumb { width: 80px; height: 56px; object-fit: cover; border-radius: 6px; background: #222; flex-shrink: 0; }
  .post-info { flex: 1; min-width: 0; }
  .post-info .post-title { color: #fff; font-size: 14px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .post-info .post-meta { color: #666; font-size: 12px; margin-top: 4px; }
  .post-actions { display: flex; gap: 8px; }

  /* ── Gallery admin ── */
  .gal-admin-filter { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px; }
  .gal-admin-ftag { padding: 5px 14px; border-radius: 20px; border: 1px solid #2a2a2a; background: transparent; color: #666; font-size: 12px; font-weight: 600; cursor: pointer; transition: all .2s; letter-spacing: .3px; }
  .gal-admin-ftag:hover { border-color: #1a6bff; color: #aaa; }
  .gal-admin-ftag.active { background: rgba(26,107,255,0.15); border-color: #1a6bff; color: #4d9fff; }
  .gal-admin-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 14px; }
  .gal-admin-item { position: relative; border-radius: 12px; overflow: hidden; border: 1px solid #2a2a2a; background: #111; aspect-ratio: 4/3; cursor: pointer; transition: border-color .2s, transform .2s; }
  .gal-admin-item:hover { border-color: #333; transform: translateY(-2px); }
  .gal-admin-item img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .3s; }
  .gal-admin-item:hover img { transform: scale(1.04); }
  .gal-admin-item-info { position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(transparent, rgba(0,0,0,0.88)); padding: 28px 10px 10px; }
  .gal-admin-item-tag { font-size: 9px; font-weight: 700; color: #4d9fff; letter-spacing: 1px; text-transform: uppercase; background: rgba(26,107,255,0.2); border: 1px solid rgba(26,107,255,0.4); border-radius: 10px; padding: 2px 7px; display: inline-block; }
  .gal-admin-item-cap { font-size: 11px; color: rgba(255,255,255,0.75); margin-top: 4px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; display: block; }
  .gal-admin-item-del { position: absolute; top: 7px; right: 7px; background: rgba(220,38,38,0.9); border: none; color: #fff; width: 26px; height: 26px; border-radius: 50%; font-size: 11px; cursor: pointer; display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity .2s; box-shadow: 0 2px 8px rgba(0,0,0,0.4); }
  .gal-admin-item:hover .gal-admin-item-del { opacity: 1; }
  .gal-admin-empty { grid-column: 1/-1; text-align: center; padding: 48px 0; color: #444; font-size: 13px; }
  .gal-admin-empty i { font-size: 32px; display: block; margin-bottom: 10px; }

  /* ── Service FAQ Admin ── */
  .svc-tab-bar { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 20px; }
  .svc-tab-btn { padding: 7px 16px; border-radius: 20px; border: 1px solid #2a2a2a; background: transparent; color: #666; font-size: 12px; font-weight: 600; cursor: pointer; transition: all .2s; letter-spacing: .3px; }
  .svc-tab-btn:hover { border-color: #1a6bff; color: #aaa; }
  .svc-tab-btn.active { background: rgba(26,107,255,0.15); border-color: #1a6bff; color: #4d9fff; }
  .svc-faq-list { display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px; }
  .svc-faq-row { background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 10px; padding: 14px 16px; }
  .svc-faq-row-head { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
  .svc-faq-num { width: 24px; height: 24px; border-radius: 50%; background: rgba(26,107,255,0.15); border: 1px solid rgba(26,107,255,0.3); color: #4d9fff; font-size: 11px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .svc-faq-row input.svc-faq-q-inp { flex: 1; background: transparent; border: none; border-bottom: 1px solid #333; color: #fff; font-size: 14px; font-weight: 600; padding: 4px 0; outline: none; transition: border-color .2s; }
  .svc-faq-row input.svc-faq-q-inp:focus { border-bottom-color: #1a6bff; }
  .svc-faq-row-actions { display: flex; gap: 6px; margin-left: auto; flex-shrink: 0; }
  .svc-faq-row-actions button { background: none; border: 1px solid #2a2a2a; border-radius: 6px; color: #666; width: 28px; height: 28px; cursor: pointer; font-size: 11px; transition: all .2s; display: flex; align-items: center; justify-content: center; }
  .svc-faq-row-actions .btn-move-up:hover, .svc-faq-row-actions .btn-move-down:hover { border-color: #555; color: #bbb; }
  .svc-faq-row-actions .btn-del-faq:hover { border-color: #dc2626; color: #dc2626; }
  .svc-faq-row textarea.svc-faq-a-inp { width: 100%; background: #141414; border: 1px solid #2a2a2a; border-radius: 6px; color: #ccc; font-size: 13px; line-height: 1.65; padding: 10px 12px; resize: vertical; min-height: 72px; outline: none; font-family: inherit; box-sizing: border-box; }
  .svc-faq-row textarea.svc-faq-a-inp:focus { border-color: #1a6bff; }
  .svc-faq-hint { color: #555; font-size: 11px; margin-top: 4px; }
  .svc-faq-bottom { display: flex; align-items: center; justify-content: space-between; margin-top: 4px; }

  /* ── Marketing stats ── */
  .mktg-service { background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 10px; padding: 20px; margin-bottom: 16px; }
  .mktg-service-title { color: #1a6bff; font-size: 13px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 16px; display: flex; align-items: center; gap: 8px; }
  .case-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
  .case-card { background: #141414; border: 1px solid #2a2a2a; border-radius: 8px; padding: 16px; }
  .case-card .case-tag { color: #888; font-size: 11px; margin-bottom: 10px; }
  .metric-row { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 8px; }
  .metric-input-wrap { display: flex; flex-direction: column; gap: 3px; }
  .metric-input-wrap .ml { color: #555; font-size: 10px; }
  .metric-input-wrap input { background: #1e1e1e; border: 1px solid #2a2a2a; border-radius: 4px; color: #fff; font-size: 13px; padding: 6px 10px; font-weight: 700; outline: none; width: 100%; }
  .metric-input-wrap input:focus { border-color: #1a6bff; }

  /* ── Modal ── */
  .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.85); z-index: 1000; display: flex; align-items: center; justify-content: center; display: none; }
  .modal-overlay.open { display: flex; }
  .modal { background: #141414; border: 1px solid #2a2a2a; border-radius: 16px; padding: 32px; width: 100%; max-width: 600px; max-height: 90vh; overflow-y: auto; }
  .modal-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; }
  .modal-title { color: #fff; font-size: 18px; font-weight: 700; }
  .modal-close { background: none; border: none; color: #666; font-size: 20px; cursor: pointer; }
  .modal-close:hover { color: #fff; }
  /* ── Insight 풀화면 에디터 모달 ── */
  #insightModal .modal { max-width: 860px; width: 96vw; max-height: 96vh; padding: 0; border-radius: 12px; display: flex; flex-direction: column; }
  .insight-editor-header { display: flex; align-items: center; justify-content: space-between; padding: 18px 28px; border-bottom: 1px solid #222; flex-shrink: 0; }
  .insight-editor-body { flex: 1; overflow-y: auto; padding: 28px; display: flex; flex-direction: column; gap: 20px; }
  .insight-editor-body .form-group label { font-size: 12px; font-weight: 600; color: #888; text-transform: uppercase; letter-spacing: .06em; margin-bottom: 6px; display: block; }
  .insight-title-input { width: 100%; background: transparent; border: none; border-bottom: 2px solid #2a2a2a; color: #fff; font-size: 22px; font-weight: 700; padding: 8px 0; outline: none; transition: border-color .2s; }
  .insight-title-input:focus { border-bottom-color: #1a6bff; }
  .insight-summary-input { width: 100%; background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 8px; color: #ccc; font-size: 14px; padding: 12px 14px; resize: vertical; min-height: 72px; outline: none; line-height: 1.6; }
  .insight-summary-input:focus { border-color: #1a6bff; }
  .insight-content-input { width: 100%; background: #111; border: 1px solid #2a2a2a; border-radius: 8px; color: #e0e0e0; font-size: 15px; line-height: 1.8; padding: 16px; resize: vertical; min-height: 320px; outline: none; font-family: inherit; }
  .insight-content-input:focus { border-color: #1a6bff; }
  .insight-cat-row { display: flex; gap: 16px; }
  .insight-cat-row .form-group { flex: 1; }
  .insight-cat-row select { width: 100%; background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 8px; color: #fff; font-size: 14px; padding: 10px 12px; outline: none; }
  .insight-thumb-section { display: flex; gap: 16px; align-items: flex-start; }
  .insight-thumb-drop { flex: 1; border: 2px dashed #2a2a2a; border-radius: 10px; padding: 24px; text-align: center; cursor: pointer; color: #555; transition: border-color .2s, background .2s; }
  .insight-thumb-drop:hover { border-color: #1a6bff; background: #0d1825; color: #1a6bff; }
  .insight-thumb-drop i { font-size: 28px; margin-bottom: 8px; display: block; }
  .insight-thumb-drop p { font-size: 12px; margin: 4px 0 0; }
  .insight-thumb-preview { width: 140px; height: 90px; border-radius: 8px; object-fit: cover; border: 1px solid #2a2a2a; display: none; }
  .insight-thumb-preview.show { display: block; }
  .insight-editor-footer { display: flex; gap: 12px; padding: 18px 28px; border-top: 1px solid #222; flex-shrink: 0; background: #141414; border-radius: 0 0 12px 12px; }
  .content-hint { font-size: 11px; color: #555; margin-top: 6px; line-height: 1.5; }

  /* ── Quill WYSIWYG 에디터 커스텀 스타일 ── */
  .ql-toolbar.ql-snow {
    background: #1e1e1e;
    border: 1px solid #333 !important;
    border-bottom: none !important;
    border-radius: 8px 8px 0 0;
    padding: 8px 10px;
    flex-shrink: 0;
  }
  .ql-toolbar.ql-snow .ql-stroke { stroke: #aaa; }
  .ql-toolbar.ql-snow .ql-fill { fill: #aaa; }
  .ql-toolbar.ql-snow .ql-picker-label { color: #aaa; }
  .ql-toolbar.ql-snow button:hover .ql-stroke,
  .ql-toolbar.ql-snow .ql-active .ql-stroke { stroke: #fff; }
  .ql-toolbar.ql-snow button:hover .ql-fill,
  .ql-toolbar.ql-snow .ql-active .ql-fill { fill: #fff; }
  .ql-toolbar.ql-snow .ql-picker-label:hover,
  .ql-toolbar.ql-snow .ql-active .ql-picker-label { color: #fff; }
  .ql-toolbar.ql-snow .ql-picker-options {
    background: #1e1e1e;
    border: 1px solid #333;
    color: #ccc;
  }
  .ql-snow .ql-picker.ql-expanded .ql-picker-label { color: #fff; }
  .ql-snow .ql-picker.ql-expanded .ql-picker-options { border-color: #444; }
  .ql-snow.ql-toolbar button:hover, .ql-snow .ql-toolbar button:hover,
  .ql-snow.ql-toolbar button.ql-active, .ql-snow .ql-toolbar button.ql-active {
    color: #fff;
  }
  #quillEditor {
    background: #111;
    border: 1px solid #333 !important;
    border-top: none !important;
    border-radius: 0 0 8px 8px;
    color: #e0e0e0;
    font-size: 15px;
    line-height: 1.8;
    min-height: 360px;
    max-height: 55vh;
    overflow-y: auto;
  }
  #quillEditor .ql-editor { padding: 18px 20px; min-height: 360px; }
  #quillEditor .ql-editor p { margin-bottom: 0.8em; }
  #quillEditor .ql-editor h1 { font-size: 1.8em; font-weight: 700; color: #fff; margin: 1em 0 0.4em; }
  #quillEditor .ql-editor h2 { font-size: 1.4em; font-weight: 700; color: #f0f0f0; margin: 0.9em 0 0.35em; }
  #quillEditor .ql-editor h3 { font-size: 1.2em; font-weight: 700; color: #ddd; margin: 0.8em 0 0.3em; }
  #quillEditor .ql-editor blockquote { border-left: 4px solid #1a6bff; background: #1a2030; padding: 12px 18px; margin: 12px 0; color: #aac8ff; border-radius: 0 6px 6px 0; }
  #quillEditor .ql-editor a { color: #4a9eff; }
  #quillEditor .ql-editor ul, #quillEditor .ql-editor ol { padding-left: 1.5em; }
  #quillEditor .ql-editor li { margin-bottom: 0.3em; }
  #quillEditor .ql-editor code { background: #1e1e1e; padding: 2px 6px; border-radius: 4px; font-family: monospace; color: #f08; }
  #quillEditor .ql-editor pre { background: #1e1e1e; padding: 14px 18px; border-radius: 8px; overflow-x: auto; color: #a8e6cf; }
  .ql-snow .ql-color-picker .ql-picker-label svg, .ql-snow .ql-icon-picker .ql-picker-label svg { width: 18px; }
  .ql-editor.ql-blank::before { color: #444; font-style: normal; font-size: 14px; }
  /* 툴바 구분선 */
  .ql-toolbar.ql-snow .ql-formats { margin-right: 10px; }

  /* ── Toast ── */
  .toast { position: fixed; bottom: 32px; right: 32px; background: #22c55e; color: #fff; padding: 14px 24px; border-radius: 10px; font-size: 14px; font-weight: 600; z-index: 2000; transform: translateY(100px); opacity: 0; transition: all .3s; box-shadow: 0 8px 24px rgba(0,0,0,0.3); }
  .toast.show { transform: translateY(0); opacity: 1; }
  .toast.error { background: #ef4444; }
  .toast.info { background: #1a6bff; }

  /* ── Section visibility ── */
  .section { display: none; }
  .section.active { display: block; }

  /* Responsive */
  @media (max-width: 768px) {
    .sidebar { transform: translateX(-100%); }
    .main { margin-left: 0; }
    .stats-grid { grid-template-columns: repeat(2,1fr); }
    .case-grid { grid-template-columns: 1fr; }
  }
</style>
<!-- Quill.js WYSIWYG 에디터 CDN -->
<link href="https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.snow.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.js"></script>
</head>
<body>

<!-- Sidebar -->
<aside class="sidebar">
  <div class="sidebar-header">
    <div class="brand">IN AD COMPANY</div>
    <h2>Admin Panel</h2>
  </div>
  <nav class="sidebar-nav">
    <div class="nav-section">페이지 관리</div>
    <div class="nav-item active" data-section="home"><i class="fas fa-home"></i> 홈</div>
    <div class="nav-item" data-section="about"><i class="fas fa-building"></i> About</div>
    <div class="nav-item" data-section="works"><i class="fas fa-briefcase"></i> Works</div>
    <div class="nav-item" data-section="insight"><i class="fas fa-newspaper"></i> Insight</div>
    <div class="nav-item" data-section="marketing"><i class="fas fa-chart-line"></i> Marketing</div>
    <div class="nav-item" data-section="contact"><i class="fas fa-envelope"></i> Contact</div>
  </nav>
  <div class="sidebar-footer">
    <button class="btn-logout" id="btnLogout"><i class="fas fa-sign-out-alt"></i> 로그아웃</button>
  </div>
</aside>

<!-- Main -->
<main class="main">
  <div class="topbar">
    <h1 id="sectionTitle">홈 관리</h1>
    <span class="status" id="statusText">admin</span>
  </div>
  <div class="content">

    <!-- ───────── HOME ───────── -->
    <div class="section active" id="section-home">

      <!-- 영상 링크 -->
      <div class="panel">
        <div class="panel-header">
          <div class="panel-title"><i class="fas fa-video"></i> 메인 영상 링크</div>
          <button class="btn btn-secondary btn-sm" id="btnAddVideo"><i class="fas fa-plus"></i> 추가</button>
        </div>
        <p style="color:#666;font-size:13px;margin-bottom:16px">YouTube 링크 또는 영상 ID를 붙여넣으면 자동으로 인식합니다.<br><small style="color:#444">예시: https://www.youtube.com/watch?v=<strong style="color:#1a6bff">HZaDW00sldo</strong> 또는 https://youtu.be/<strong style="color:#1a6bff">HZaDW00sldo</strong></small></p>
        <div class="video-list" id="videoList"></div>
        <button class="btn btn-primary" id="btnSaveVideos"><i class="fas fa-save"></i> 영상 저장</button>
      </div>

      <!-- 회사소개서 링크 -->
      <div class="panel">
        <div class="panel-header">
          <div class="panel-title"><i class="fas fa-file-pdf"></i> 회사소개서 링크</div>
        </div>
        <div class="form-row single">
          <div class="form-group">
            <label>이동 URL</label>
            <input type="text" id="brochureUrl" placeholder="https://drive.google.com/...">
          </div>
        </div>
        <button class="btn btn-primary" id="btnSaveBrochure"><i class="fas fa-save"></i> 저장</button>
      </div>

      <!-- KPI 수치 -->
      <div class="panel">
        <div class="panel-header">
          <div class="panel-title"><i class="fas fa-trophy"></i> KPI 수치</div>
        </div>
        <div class="stats-grid">
          <div class="stat-card">
            <label>완료 프로젝트</label>
            <input type="number" id="statProjects" placeholder="320">
            <small style="color:#555;font-size:11px;margin-top:6px;display:block;">프로젝트+ 로 표시</small>
          </div>
          <div class="stat-card">
            <label>클라이언트 재계약률</label>
            <input type="number" id="statContracts" placeholder="98">
            <small style="color:#555;font-size:11px;margin-top:6px;display:block;">% 로 표시</small>
          </div>
          <div class="stat-card">
            <label>업력 (년)</label>
            <input type="number" id="statExperience" placeholder="6">
            <small style="color:#555;font-size:11px;margin-top:6px;display:block;">년차 로 표시</small>
          </div>
          <div class="stat-card">
            <label>파트너 브랜드</label>
            <input type="number" id="statPartners" placeholder="50">
            <small style="color:#555;font-size:11px;margin-top:6px;display:block;">브랜드+ 로 표시</small>
          </div>
        </div>
        <button class="btn btn-primary" style="margin-top:20px" id="btnSaveStats"><i class="fas fa-save"></i> 수치 저장</button>
      </div>

      <!-- 슬라이드 전환 간격 -->
      <div class="panel">
        <div class="panel-header">
          <div class="panel-title"><i class="fas fa-clock"></i> 슬라이드 전환 간격</div>
        </div>
        <p style="color:#666;font-size:13px;margin-bottom:16px">메인 영상이 자동으로 넘어가는 시간 간격을 설정합니다. <strong>최소 1초 / 최대 30초</strong></p>
        <div class="form-row single">
          <div class="form-group" style="max-width:200px">
            <label>전환 간격 (초)</label>
            <div style="display:flex;align-items:center;gap:10px">
              <input type="number" id="slideInterval" min="1" max="30" step="1" value="7" style="width:90px;text-align:center;font-size:18px;font-weight:700">
              <span style="color:#888;font-size:14px">초마다 전환</span>
            </div>
            <small style="color:#555;font-size:11px;margin-top:6px;display:block">기본값 7초 · 범위 1 ~ 30초</small>
          </div>
        </div>
        <button class="btn btn-primary" style="margin-top:16px" id="btnSaveInterval"><i class="fas fa-save"></i> 간격 저장</button>
      </div>
    </div>

    <!-- ───────── ABOUT ───────── -->
    <div class="section" id="section-about">

      <!-- 주소 -->
      <div class="panel">
        <div class="panel-header">
          <div class="panel-title"><i class="fas fa-map-marker-alt"></i> 회사 주소</div>
        </div>
        <p style="color:#666;font-size:13px;margin-bottom:16px">주소 찾기로 주소를 선택하면 카카오맵에서 정확한 좌표를 확인해 입력하세요.</p>

        <!-- 주소 입력 -->
        <div class="form-row single" style="margin-bottom:10px">
          <div class="form-group">
            <label>주소</label>
            <div style="display:flex;gap:10px;align-items:center">
              <input type="text" id="aboutAddress" placeholder="주소 검색 후 자동 입력됩니다" readonly
                style="flex:1;background:#111;border:1px solid #2a2a2a;border-radius:8px;color:#fff;font-size:14px;padding:10px 14px;cursor:default">
              <button class="btn btn-secondary" id="btnSearchAddress" style="white-space:nowrap;flex-shrink:0">
                <i class="fas fa-search"></i> 주소 찾기
              </button>
            </div>
            <div id="addrDetailWrap" style="margin-top:10px">
              <label style="color:#666;font-size:12px;display:block;margin-bottom:4px">상세 주소 (층/호수 등)</label>
              <input type="text" id="aboutAddressDetail" placeholder="예: 2F, 204호"
                style="width:100%;background:#111;border:1px solid #2a2a2a;border-radius:8px;color:#fff;font-size:14px;padding:10px 14px;box-sizing:border-box">
            </div>
          </div>
        </div>

        <!-- 좌표 직접 입력 -->
        <div style="background:#0d1117;border:1px solid #1e2a3a;border-radius:10px;padding:14px;margin-bottom:14px">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
            <span style="color:#1a6bff;font-size:13px;font-weight:600"><i class="fas fa-crosshairs"></i> 지도 좌표 (필수)</span>
            <a id="btnOpenKakaoMap" href="#" target="_blank"
              style="font-size:12px;color:#ffd700;text-decoration:none;background:#1a1a00;border:1px solid #3a3a00;border-radius:6px;padding:4px 10px">
              <i class="fas fa-external-link-alt"></i> 카카오맵에서 좌표 확인
            </a>
          </div>
          <p style="color:#555;font-size:12px;margin-bottom:10px;line-height:1.6">
            카카오맵에서 주소 검색 → 해당 위치 우클릭 → <strong style="color:#888">"이 곳이 궁금한가요?"</strong> 클릭 → 좌표 복사
          </p>
          <div style="display:flex;gap:10px">
            <div style="flex:1">
              <label style="color:#666;font-size:12px;display:block;margin-bottom:4px">위도 (Latitude)</label>
              <input type="text" id="aboutLat" placeholder="예: 37.320819"
                style="width:100%;background:#111;border:1px solid #2a2a2a;border-radius:8px;color:#fff;font-size:14px;padding:9px 12px;box-sizing:border-box">
            </div>
            <div style="flex:1">
              <label style="color:#666;font-size:12px;display:block;margin-bottom:4px">경도 (Longitude)</label>
              <input type="text" id="aboutLng" placeholder="예: 126.831592"
                style="width:100%;background:#111;border:1px solid #2a2a2a;border-radius:8px;color:#fff;font-size:14px;padding:9px 12px;box-sizing:border-box">
            </div>
            <div style="display:flex;align-items:flex-end">
              <button class="btn btn-secondary" id="btnPreviewCoord" style="white-space:nowrap;padding:9px 14px">
                <i class="fas fa-map"></i> 미리보기
              </button>
            </div>
          </div>
        </div>

        <!-- 미리보기 지도 -->
        <div id="adminMapPreview" style="display:none;margin-bottom:14px;border-radius:10px;overflow:hidden;height:220px;background:#1a1a1a;border:1px solid #2a2a2a">
          <iframe id="adminMapIframe" src="" width="100%" height="220" style="border:0" loading="lazy"></iframe>
        </div>

        <button class="btn btn-primary" id="btnSaveAddress"><i class="fas fa-save"></i> 주소 저장</button>
      </div>

      <!-- 파트너 로고 -->
      <div class="panel">
        <div class="panel-header">
          <div class="panel-title"><i class="fas fa-images"></i> 파트너 브랜드 로고</div>
        </div>
        <div class="thumb-spec">
          <strong>로고 이미지 규격 안내</strong><br>
          권장 크기: <strong>200 × 80 px</strong> (가로형 로고) 또는 <strong>80 × 80 px</strong> (정방형)<br>
          파일 형식: PNG (투명 배경 권장), JPG<br>
          파일 크기: 최대 500KB<br>
          <em style="color:#666">※ 업로드 시 자동으로 동일 규격(200×80)으로 변환됩니다.</em>
        </div>
        <div class="upload-zone" id="logoUploadZone">
          <i class="fas fa-cloud-upload-alt"></i>
          <p>클릭하거나 파일을 드래그하여 로고 업로드</p>
          <small>PNG, JPG · 최대 500KB</small>
          <input type="file" id="logoFileInput" accept="image/*" multiple style="display:none">
        </div>
        <div class="logo-grid" id="logoGrid"></div>
      </div>
    </div>

    <!-- ───────── WORKS ───────── -->
    <div class="section" id="section-works">
      <div class="panel">
        <div class="panel-header">
          <div class="panel-title"><i class="fas fa-briefcase"></i> 포트폴리오 관리</div>
          <button class="btn btn-primary btn-sm" id="btnAddWork"><i class="fas fa-plus"></i> 새 항목 추가</button>
        </div>
        <div class="thumb-spec">
          <strong>썸네일 이미지 규격 안내</strong><br>
          권장 크기: <strong>600 × 450 px</strong> (4:3 비율)<br>
          파일 형식: JPG, PNG, WebP<br>
          파일 크기: 최대 2MB<br>
          <em style="color:#666">※ 이미지는 카드에서 자동 크롭됩니다. 핵심 콘텐츠를 중앙에 배치해 주세요.</em>
        </div>
        <table class="works-table" id="worksTable">
          <thead>
            <tr>
              <th>썸네일</th>
              <th>업체명 (브랜드)</th>
              <th>오버레이 문구</th>
              <th>진행 상품</th>
              <th>서비스 설명</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody id="worksTbody"></tbody>
        </table>
      </div>
    </div>

    <!-- ───────── INSIGHT ───────── -->
    <div class="section" id="section-insight">
      <div class="panel" style="margin-bottom:24px">
        <div class="panel-header">
          <div class="panel-title"><i class="fas fa-newspaper"></i> Insight 게시물 관리</div>
          <button class="btn btn-primary btn-sm" id="btnAddInsight"><i class="fas fa-plus"></i> 새 게시물 작성</button>
        </div>
        <div class="thumb-spec">
          <strong>썸네일 이미지 규격 안내</strong><br>
          권장 크기: <strong>800 × 500 px</strong> (16:10 비율)<br>
          파일 형식: JPG, PNG, WebP<br>
          파일 크기: 최대 2MB<br>
          카테고리: 콘텐츠 전략 / 케이스 스터디<br>
          <em style="color:#666">※ 썸네일은 리스트 페이지에서 카드 형태로 표시됩니다.</em>
        </div>
        <div class="post-list" id="postList"></div>
      </div>

      <div class="panel">
        <div class="panel-header">
          <div class="panel-title"><i class="fas fa-images"></i> 인애드 일상 갤러리 관리</div>
          <button class="btn btn-primary btn-sm" id="btnAddGallery"><i class="fas fa-plus"></i> 사진 추가</button>
        </div>
        <div class="thumb-spec">
          인사이트 페이지 <strong>'인애드 일상'</strong> 탭에 <strong>카드 그리드</strong>로 표시됩니다. 이미지를 업로드하고 태그와 캡션을 설정하세요.<br>
          <em style="color:#666">태그: 일상 · 팀 · 오피스 · 행사 · 캠페인 / 권장 비율 4:3 (800 × 600 px 이상)</em>
        </div>
        <!-- 갤러리 필터 탭 -->
        <div class="gal-admin-filter" id="galAdminFilter">
          <button class="gal-admin-ftag active" data-tag="all">전체</button>
          <button class="gal-admin-ftag" data-tag="일상">일상</button>
          <button class="gal-admin-ftag" data-tag="팀">팀</button>
          <button class="gal-admin-ftag" data-tag="오피스">오피스</button>
          <button class="gal-admin-ftag" data-tag="행사">행사</button>
          <button class="gal-admin-ftag" data-tag="캠페인">캠페인</button>
        </div>
        <div class="gal-admin-grid" id="galAdminGrid"></div>
      </div>
    </div>

    <!-- ───────── MARKETING ───────── -->
    <div class="section" id="section-marketing">
      <!-- 히어로 수치 관리 -->
      <div class="panel" style="margin-bottom:24px">
        <div class="panel-header">
          <div class="panel-title"><i class="fas fa-hashtag"></i> 서비스 페이지 히어로 수치 관리</div>
          <button class="btn btn-primary btn-sm" id="btnSaveMarketing"><i class="fas fa-save"></i> 저장</button>
        </div>
        <div class="thumb-spec">
          각 마케팅 서비스 페이지 최상단에 표시되는 <strong>KPI 수치와 레이블</strong>을 수정합니다.<br>
          <em style="color:#666">숫자·텍스트 모두 자유롭게 입력 가능 — 저장 즉시 서비스 페이지에 반영됩니다.</em>
        </div>
        <!-- 서비스 탭 -->
        <div class="svc-tab-bar" id="heroKpiTabBar">
          <button class="svc-tab-btn active" data-svc="viral">바이럴</button>
          <button class="svc-tab-btn" data-svc="influencer">인플루언서</button>
          <button class="svc-tab-btn" data-svc="seeding">시딩</button>
          <button class="svc-tab-btn" data-svc="seo">SEO</button>
          <button class="svc-tab-btn" data-svc="review">리뷰</button>
          <button class="svc-tab-btn" data-svc="ppl">PPL</button>
          <button class="svc-tab-btn" data-svc="oliveyoung">올리브영</button>
        </div>
        <div id="heroKpiEditor"></div>
      </div>

      <!-- 서비스별 FAQ -->
      <div class="panel">
        <div class="panel-header">
          <div class="panel-title"><i class="fas fa-question-circle"></i> 서비스별 FAQ 관리</div>
          <div style="display:flex;gap:8px">
            <button class="btn btn-secondary btn-sm" id="btnAddFaq"><i class="fas fa-plus"></i> 질문 추가</button>
            <button class="btn btn-primary btn-sm" id="btnSaveFaq"><i class="fas fa-save"></i> 저장</button>
          </div>
        </div>
        <div class="thumb-spec">
          각 마케팅 서비스 페이지 하단 <strong>'자주 하는 질문'</strong> 섹션의 Q&amp;A를 수정합니다.<br>
          <em style="color:#666">HTML 태그 사용 가능 (예: &lt;strong&gt;강조&lt;/strong&gt;) — 저장 후 서비스 페이지에 즉시 반영됩니다.</em>
        </div>
        <!-- 서비스 탭 -->
        <div class="svc-tab-bar" id="svcFaqTabBar">
          <button class="svc-tab-btn active" data-svc="viral">바이럴</button>
          <button class="svc-tab-btn" data-svc="influencer">인플루언서</button>
          <button class="svc-tab-btn" data-svc="seeding">시딩</button>
          <button class="svc-tab-btn" data-svc="seo">SEO</button>
          <button class="svc-tab-btn" data-svc="review">리뷰</button>
          <button class="svc-tab-btn" data-svc="ppl">PPL</button>
          <button class="svc-tab-btn" data-svc="oliveyoung">올리브영</button>
        </div>
        <!-- FAQ 목록 -->
        <div class="svc-faq-list" id="svcFaqList"></div>
        <div class="svc-faq-bottom">
          <span class="svc-faq-hint" id="svcFaqHint"></span>
          <button class="btn btn-primary" id="btnSaveFaq2"><i class="fas fa-save"></i> 저장</button>
        </div>
      </div>
    </div>

    <!-- ───────── CONTACT ───────── -->
    <div class="section" id="section-contact">

      <!-- 개인정보 보호 책임자 -->
      <div class="panel" style="margin-bottom:24px">
        <div class="panel-header">
          <div class="panel-title"><i class="fas fa-shield-alt"></i> 개인정보 보호 책임자</div>
        </div>
        <p style="color:#666;font-size:13px;margin-bottom:20px">개인정보 처리방침 모달에 표시되는 책임자 정보를 수정합니다.</p>
        <div class="form-row" style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px">
          <div class="form-group">
            <label>책임자 이름</label>
            <input type="text" id="privacyManager" placeholder="예: 홍길동">
          </div>
          <div class="form-group">
            <label>담당자 이름</label>
            <input type="text" id="privacyOfficer" placeholder="예: 김철수">
          </div>
        </div>
        <div class="form-row" style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px">
          <div class="form-group">
            <label>웹사이트</label>
            <input type="text" id="privacyWebsite" placeholder="예: www.example.co.kr">
          </div>
          <div class="form-group">
            <label>이메일</label>
            <input type="email" id="privacyEmail" placeholder="예: privacy@example.co.kr">
          </div>
        </div>
        <button class="btn btn-primary" id="btnSavePrivacyOfficer"><i class="fas fa-save"></i> 저장하기</button>
      </div>

      <!-- 자주 묻는 질문 (FAQ) -->
      <div class="panel">
        <div class="panel-header">
          <div class="panel-title"><i class="fas fa-question-circle"></i> 자주 묻는 질문 (FAQ)</div>
          <button class="btn btn-secondary btn-sm" id="btnAddFaq" style="font-size:12px;padding:6px 14px"><i class="fas fa-plus"></i> 추가</button>
        </div>
        <p style="color:#666;font-size:13px;margin-bottom:20px">Contact 페이지 하단에 표시되는 FAQ를 관리합니다. <strong style="color:#aaa">최대 5개</strong>까지 등록 가능합니다.</p>
        <div id="faqList" style="display:flex;flex-direction:column;gap:14px;margin-bottom:20px"></div>
        <button class="btn btn-primary" id="btnSaveFaq"><i class="fas fa-save"></i> FAQ 저장하기</button>
      </div>

    </div>

  </div>
</main>

<!-- ── Works 편집 Modal ── -->
<div class="modal-overlay" id="workModal">
  <div class="modal">
    <div class="modal-header">
      <div class="modal-title" id="workModalTitle">새 포트폴리오 추가</div>
      <button class="modal-close" id="closeWorkModal"><i class="fas fa-times"></i></button>
    </div>
    <div class="form-row single">
      <div class="form-group">
        <label>업체명 (브랜드)</label>
        <input type="text" id="wBrand" placeholder="예: 파파레시피">
      </div>
    </div>
    <div class="form-row single">
      <div class="form-group">
        <label>오버레이 문구 (마우스 오버 시 표시)</label>
        <input type="text" id="wOverlay" placeholder="예: papa recipe">
      </div>
    </div>
    <div class="form-row single">
      <div class="form-group">
        <label>진행 상품 (복수 선택 가능)</label>
        <div id="wTagsWrap" style="display:flex;flex-wrap:wrap;gap:8px;margin-top:4px">
          ${['viral','influencer','seeding','seo','review','oliveyoung','ppl'].map(t =>
            `<label style="display:flex;align-items:center;gap:6px;color:#aaa;font-size:13px;cursor:pointer">
              <input type="checkbox" name="wTag" value="${t}" style="accent-color:#1a6bff"> ${t}
            </label>`).join('')}
        </div>
      </div>
    </div>
    <div class="form-row single">
      <div class="form-group">
        <label>서비스 설명 태그</label>
        <input type="text" id="wServices" placeholder="예: 프로모션 바이럴 · 브랜드 콘텐츠 제작">
      </div>
    </div>
    <div class="form-row single">
      <div class="form-group">
        <label>썸네일 이미지</label>
        <div class="upload-zone" id="wThumbZone" style="padding:20px">
          <i class="fas fa-image"></i>
          <p style="font-size:13px;margin-top:6px">클릭하여 썸네일 업로드 (600×450px 권장)</p>
          <input type="file" id="wThumbFile" accept="image/*" style="display:none">
        </div>
        <div id="wThumbPreview" style="margin-top:8px"></div>
        <div class="form-group" style="margin-top:8px">
          <label style="font-size:11px;color:#666">또는 이미지 URL 직접 입력</label>
          <input type="text" id="wThumbUrl" placeholder="https://...">
        </div>
      </div>
    </div>
    <div style="display:flex;gap:12px;margin-top:24px">
      <button class="btn btn-primary" id="btnSaveWork"><i class="fas fa-save"></i> 저장</button>
      <button class="btn btn-secondary" id="btnCancelWork">취소</button>
    </div>
  </div>
</div>

<!-- ── Insight 작성 Modal ── -->
<div class="modal-overlay" id="insightModal">
  <div class="modal">
    <div class="insight-editor-header">
      <div class="modal-title" id="insightModalTitle">새 게시물 작성</div>
      <button class="modal-close" id="closeInsightModal"><i class="fas fa-times"></i></button>
    </div>
    <div class="insight-editor-body">
      <div class="form-group">
        <label>제목</label>
        <input class="insight-title-input" type="text" id="iTitle" placeholder="게시물 제목을 입력하세요">
      </div>
      <div class="insight-cat-row">
        <div class="form-group">
          <label>메인 카테고리</label>
          <select id="iMainCat">
            <option value="content-strategy">콘텐츠 별 전략</option>
            <option value="case-study">실전 사례</option>
          </select>
        </div>
        <div class="form-group">
          <label>서브 카테고리</label>
          <select id="iSubCat">
            <option value="viral">바이럴 마케팅</option>
            <option value="influencer">인플루언서 마케팅</option>
            <option value="seeding">시딩 캠페인</option>
            <option value="seo">SEO 마케팅</option>
            <option value="review">리뷰 마케팅</option>
            <option value="oliveyoung">올리브영 마케팅</option>
            <option value="ppl">PPL 마케팅</option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label>썸네일 이미지 <span style="color:#555;font-weight:400">(800 × 500px 권장)</span></label>
        <div class="insight-thumb-section">
          <div class="insight-thumb-drop" id="iThumbZone">
            <i class="fas fa-image"></i>
            <p>클릭하여 이미지 업로드</p>
            <p style="font-size:11px;color:#444;margin-top:4px">JPG · PNG · WEBP</p>
            <input type="file" id="iThumbFile" accept="image/*" style="display:none">
          </div>
          <div style="display:flex;flex-direction:column;gap:8px;justify-content:flex-start">
            <img class="insight-thumb-preview" id="iThumbPreview" src="" alt="미리보기">
            <input class="insight-summary-input" type="text" id="iThumbUrl" placeholder="또는 이미지 URL 직접 입력 (https://...)" style="min-height:unset;resize:none;font-size:12px;padding:8px 10px">
          </div>
        </div>
      </div>
      <div class="form-group">
        <label>요약 <span style="color:#555;font-weight:400">(카드 목록에 표시되는 소개글)</span></label>
        <textarea class="insight-summary-input" id="iSummary" placeholder="독자의 관심을 끌 수 있는 짧은 요약을 입력하세요 (1~2문장 권장)"></textarea>
      </div>
      <div class="form-group">
        <label>본문 내용</label>
        <div id="quillToolbar">
          <span class="ql-formats">
            <select class="ql-header">
              <option value="1">제목 1</option>
              <option value="2">제목 2</option>
              <option value="3">제목 3</option>
              <option selected>본문</option>
            </select>
          </span>
          <span class="ql-formats">
            <button class="ql-bold"></button>
            <button class="ql-italic"></button>
            <button class="ql-underline"></button>
            <button class="ql-strike"></button>
          </span>
          <span class="ql-formats">
            <button class="ql-blockquote"></button>
            <button class="ql-code-block"></button>
          </span>
          <span class="ql-formats">
            <button class="ql-list" value="ordered"></button>
            <button class="ql-list" value="bullet"></button>
          </span>
          <span class="ql-formats">
            <button class="ql-link"></button>
            <button class="ql-image"></button>
          </span>
          <span class="ql-formats">
            <button class="ql-clean"></button>
          </span>
        </div>
        <div id="quillEditor"></div>
        <textarea id="iContent" style="display:none"></textarea>
      </div>
    </div>
    <div class="insight-editor-footer">
      <button class="btn btn-primary" id="btnSaveInsight"><i class="fas fa-save"></i> 저장하기</button>
      <button class="btn btn-secondary" id="btnCancelInsight">취소</button>
    </div>
  </div>
</div>

<!-- Toast -->
<div class="toast" id="toast"></div>

<!-- Daum 우편번호 서비스 (주소 검색) -->
<script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
<script src="/static/admin.js"></script>
</body>
</html>`
}

export default app
