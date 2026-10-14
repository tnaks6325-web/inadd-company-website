import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import { renderer } from './renderer'
import { HomePage } from './routes/home'
import { AboutPage } from './routes/about'
import { WorksPage } from './routes/works'
import { InsightPage } from './routes/insight'
import { InsightDetailPage } from './routes/insight-detail'
import { ViralPage } from './routes/viral'
import { DevelopmentPage } from './routes/development'
import { SvcViralPage } from './routes/svc-viral'
import { SvcInfluencerPage } from './routes/svc-influencer'
import { SvcSeedingPage } from './routes/svc-seeding'
import { SvcReviewPage } from './routes/svc-review'
import { SvcOliveYoungPage } from './routes/svc-oliveyoung'
import { SvcPplPage } from './routes/svc-ppl'
import { SvcSubscriptionPage } from './routes/svc-subscription'
import { SvcPerformancePage } from './routes/svc-performance'
import { admin } from './admin/api'
import { MailRouter } from './routes/api-mail'

const app = new Hono<{ Bindings: { SITE_ENV?: string } }>()

// 테스트 서버(Cloudflare Pages 미리보기)는 검색엔진에 잡히지 않게 한다. SITE_ENV 는 wrangler.jsonc env.preview 에서만 설정.
app.use('*', async (c, next) => {
  await next()
  if (c.env?.SITE_ENV === 'preview') c.res.headers.set('X-Robots-Tag', 'noindex, nofollow')
})

// Static files
app.use('/static/*', serveStatic({ root: './' }))

// Admin API
app.route('/api/admin', admin)
app.route('/api/mail', MailRouter)

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

// ─────────────────────────────────────────────
// SEO: sitemap.xml
// ─────────────────────────────────────────────
app.get('/sitemap.xml', (c) => {
  const base = 'https://www.inadcompany.co.kr'
  // lastmod 는 넣지 않는다 — 요청 날짜를 넣으면 매일 바뀐 것처럼 보여 구글이 값을 무시하게 된다(글 주소는 main.tsx 에서 실제 수정일로 추가)
  const urls = [
    { loc: base, priority: '1.0', changefreq: 'weekly' },
    { loc: `${base}/about`, priority: '0.8', changefreq: 'monthly' },
    { loc: `${base}/works`, priority: '0.8', changefreq: 'weekly' },
    { loc: `${base}/insight`, priority: '0.8', changefreq: 'weekly' },
    { loc: `${base}/marketing/subscription`, priority: '0.9', changefreq: 'monthly' },
    { loc: `${base}/marketing/performance`, priority: '0.8', changefreq: 'monthly' },
    { loc: `${base}/marketing/viral`, priority: '0.8', changefreq: 'monthly' },
    { loc: `${base}/marketing/influencer`, priority: '0.8', changefreq: 'monthly' },
    { loc: `${base}/marketing/seeding`, priority: '0.8', changefreq: 'monthly' },
    { loc: `${base}/marketing/review`, priority: '0.8', changefreq: 'monthly' },
    { loc: `${base}/marketing/oliveyoung`, priority: '0.8', changefreq: 'monthly' },
    { loc: `${base}/marketing/ppl`, priority: '0.8', changefreq: 'monthly' },
    { loc: `${base}/development`, priority: '0.8', changefreq: 'monthly' },
    /* /contact 제외 — 팝업 단일화로 페이지 폐쇄(홈 301) */
  ]
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`
  return c.text(xml, 200, { 'Content-Type': 'application/xml' })
})

// ─────────────────────────────────────────────
// SEO: robots.txt
// ─────────────────────────────────────────────
app.get('/robots.txt', (c) => {
  const txt = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/

Sitemap: https://www.inadcompany.co.kr/sitemap.xml`
  return c.text(txt, 200, { 'Content-Type': 'text/plain' })
})

// Routes
app.get('/', (c) => {
  return c.render(<HomePage />, {
    title: '풀퍼널 마케팅 에이전시',
    description: '채팅·커뮤니티·SNS 중심의 실전형 바이럴 마케팅 에이전시 인애드컴퍼니. 바이럴·인플루언서·체험단·리뷰·올리브영·PPL 마케팅 전문.',
    canonical: 'https://www.inadcompany.co.kr',
    schema: JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://www.inadcompany.co.kr/#organization",
          "name": "(주)인애드컴퍼니",
          "alternateName": "IN AD COMPANY",
          "url": "https://www.inadcompany.co.kr",
          "logo": "https://www.inadcompany.co.kr/static/logo.png",
          "description": "채팅, 커뮤니티, SNS 중심의 실전형 바이럴 마케팅을 설계하는 에이전시",
          "telephone": "010-9186-9944",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "고잔로 51, 타워아이즈빌 2F, 204호",
            "addressLocality": "안산시 단원구",
            "addressRegion": "경기도",
            "addressCountry": "KR"
          },
          "sameAs": ["https://www.inadcompany.co.kr"]
        },
        {
          "@type": "LocalBusiness",
          "@id": "https://www.inadcompany.co.kr/#localbusiness",
          "name": "(주)인애드컴퍼니",
          "image": "https://www.inadcompany.co.kr/static/og-image.png",
          "url": "https://www.inadcompany.co.kr",
          "telephone": "010-9186-9944",
          "priceRange": "$$",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "고잔로 51, 타워아이즈빌 2F, 204호",
            "addressLocality": "안산시 단원구",
            "addressRegion": "경기도",
            "postalCode": "15380",
            "addressCountry": "KR"
          },
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
            "opens": "09:00",
            "closes": "18:00"
          }
        },
        {
          "@type": "WebSite",
          "@id": "https://www.inadcompany.co.kr/#website",
          "url": "https://www.inadcompany.co.kr",
          "name": "인애드컴퍼니",
          "description": "실전형 크리에이티브 바이럴 마케팅 에이전시",
          "publisher": { "@id": "https://www.inadcompany.co.kr/#organization" }
        }
      ]
    })
  })
})

app.get('/about', (c) => {
  return c.render(<AboutPage />, {
    title: '회사 소개',
    description: '인애드컴퍼니는 채팅·커뮤니티·SNS 중심의 실전형 바이럴 마케팅 에이전시입니다. 브랜드 인지도와 전환율을 동시에 높이는 퍼포먼스 마케팅 전문 기업.',
    canonical: 'https://www.inadcompany.co.kr/about'
  })
})

app.get('/works', (c) => {
  return c.render(<WorksPage />, {
    title: '포트폴리오',
    description: '인애드컴퍼니의 바이럴·인플루언서·체험단·리뷰 마케팅 성공 사례를 확인하세요. 다양한 브랜드의 실전 캠페인 포트폴리오.',
    canonical: 'https://www.inadcompany.co.kr/works'
  })
})

app.get('/insight', (c) => {
  return c.render(<InsightPage />, {
    title: '마케팅 인사이트',
    description: '바이럴 마케팅, 인플루언서 마케팅, 리뷰 마케팅 최신 트렌드와 실전 전략을 인애드컴퍼니 전문가가 알려드립니다.',
    canonical: 'https://www.inadcompany.co.kr/insight'
  })
})

app.get('/insight/:id', (c) => {
  const id = c.req.param('id')
  return c.render(<InsightDetailPage id={id} />, {
    title: '마케팅 인사이트',
    canonical: `https://www.inadcompany.co.kr/insight/${id}`
  })
})

// 회사소개서 — 자체 호스팅(구글 드라이브 권한/HTML 미리보기 문제 회피)
// 미리보기: 브라우저에서 열람 / 다운로드: 같은 파일을 첨부파일로 강제 저장
app.get('/company-profile', (c) => c.redirect('/static/brochure/company-profile.html', 302))
app.get('/company-profile/download', async (c) => {
  const assetUrl = new URL('/static/brochure/company-profile.html', c.req.url)
  const res = await fetch(assetUrl.toString())
  if (!res.ok) return c.text('파일을 찾을 수 없습니다.', 404)
  return new Response(res.body, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Content-Disposition': `attachment; filename="inad-company-profile.html"; filename*=UTF-8''%EC%9D%B8%EC%95%A0%EB%93%9C%EC%BB%B4%ED%8D%BC%EB%8B%88_%ED%9A%8C%EC%82%AC%EC%86%8C%EA%B0%9C%EC%84%9C.html`,
      'Cache-Control': 'public, max-age=3600',
    },
  })
})

// Marketing 메인 (서비스 목록 페이지)
// 마케팅 허브 폐지 — 홈 서비스 섹션으로 통합(301). 개별 서비스 상세는 /marketing/* 유지.
app.get('/marketing', (c) => c.redirect('/#services', 301))

// 기존 /viral 경로도 홈 서비스 섹션으로 (호환성)
app.get('/viral', (c) => c.redirect('/#services', 301))

// 개별 서비스 페이지
app.get('/marketing/performance', (c) => c.render(<SvcPerformancePage />, {
  title: '퍼포먼스 마케팅',
  description: '네이버·구글·메타·카카오 광고 운영부터 GA4·GTM 전환 측정, 소재 제작과 성과 분석까지. 인애드컴퍼니의 퍼포먼스 마케팅.',
  canonical: 'https://www.inadcompany.co.kr/marketing/performance'
}))

app.get('/marketing/subscription', (c) => {
  return c.render(<SvcSubscriptionPage />, {
    title: '마케팅팀 구독',
    description: '신입 마케터 1명 비용(월 300만 원, 부가세 별도)으로 광고·기획·디자인·영상·바이럴·체험단 전담 TF팀을 구독하세요. 초기진단·세팅 무료, 매주 브랜드 주간보고서.',
    canonical: 'https://www.inadcompany.co.kr/marketing/subscription'
  })
})

app.get('/marketing/viral', (c) => {
  return c.render(<SvcViralPage />, {
    title: '바이럴 마케팅',
    description: '커뮤니티·카페·SNS 기반 자연확산 바이럴 마케팅 전문. 실제 사용자 리뷰와 입소문으로 브랜드 인지도를 높이는 인애드컴퍼니의 바이럴 전략.',
    canonical: 'https://www.inadcompany.co.kr/marketing/viral'
  })
})

app.get('/marketing/influencer', (c) => {
  return c.render(<SvcInfluencerPage />, {
    title: '인플루언서 마케팅',
    description: '1,200+ 크리에이터 네트워크를 활용한 인플루언서 마케팅. 브랜드에 최적화된 인플루언서 섭외부터 콘텐츠 제작까지 인애드컴퍼니가 책임집니다.',
    canonical: 'https://www.inadcompany.co.kr/marketing/influencer'
  })
})

app.get('/marketing/seeding', (c) => {
  return c.render(<SvcSeedingPage />, {
    title: '체험단 마케팅',
    description: '샘플 배포와 체험단 운영으로 진짜 후기를 만드는 체험단 캠페인. 소비자 신뢰를 높이는 인애드컴퍼니의 체험단 마케팅 전략.',
    canonical: 'https://www.inadcompany.co.kr/marketing/seeding'
  })
})

{/* SEO 마케팅 페이지 삭제(2026-07 네이버 광고정책) — 기존 URL은 마케팅 허브로 301 리다이렉트 */}
app.get('/marketing/seo', (c) => {
  return c.redirect('/marketing', 301)
})

app.get('/marketing/review', (c) => {
  return c.render(<SvcReviewPage />, {
    title: '리뷰 마케팅',
    description: '브랜드 신뢰도와 구매 전환율을 높이는 리뷰 마케팅. 진성 리뷰 수집과 리뷰 관리로 온라인 평판을 관리하는 인애드컴퍼니.',
    canonical: 'https://www.inadcompany.co.kr/marketing/review'
  })
})

app.get('/marketing/oliveyoung', (c) => {
  return c.render(<SvcOliveYoungPage />, {
    title: '올리브영 마케팅',
    description: '올리브영 랭킹 최적화와 H&B 채널 마케팅 전문. 올리브영 입점 브랜드의 매출 성장을 이끄는 인애드컴퍼니의 올리브영 마케팅.',
    canonical: 'https://www.inadcompany.co.kr/marketing/oliveyoung'
  })
})

app.get('/marketing/ppl', (c) => {
  return c.render(<SvcPplPage />, {
    title: 'PPL 마케팅',
    description: '드라마·예능·유튜브 콘텐츠 속 자연스러운 브랜드 노출 PPL 마케팅. 시청자에게 거부감 없이 브랜드를 각인시키는 인애드컴퍼니의 PPL 전략.',
    canonical: 'https://www.inadcompany.co.kr/marketing/ppl'
  })
})

app.get('/development', (c) => {
  return c.render(<DevelopmentPage />, {
    title: '마케팅 자동화 개발',
    description: '인애드컴퍼니의 마케팅 자동화 개발 서비스. 반복 업무를 자동화하고 데이터 기반 운영 체계를 구축합니다.',
    canonical: 'https://www.inadcompany.co.kr/development'
  })
})

{/* 문의 창구 팝업 단일화(2026-08) — /contact 페이지 폐쇄, 홈으로 301 리다이렉트.
    사이트 내 /contact 링크는 main.js가 가로채 팝업으로 열리므로 영향 없음.
    (직접 주소 입력·검색 유입만 이 경로를 탄다) */}
app.get('/contact', (c) => {
  return c.redirect('/', 301)
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
    background: #F1F1F1;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Segoe UI', system-ui, sans-serif;
  }
  .login-card {
    background: #FFFFFF;
    border: 1px solid #E6E7EA;
    border-radius: 16px;
    padding: 48px 40px;
    width: 100%;
    max-width: 400px;
    box-shadow: 0 24px 60px rgba(26,31,46,0.45);
  }
  .login-logo {
    text-align: center;
    margin-bottom: 32px;
  }
  .login-logo .brand { color: #285CCC; font-size: 13px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 8px; }
  .login-logo h1 { color: #393939; font-size: 22px; font-weight: 700; }
  .login-logo p { color: #7A7A80; font-size: 13px; margin-top: 6px; }
  .form-group { margin-bottom: 20px; }
  .form-group label { display: block; color: #6E6E6E; font-size: 12px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 8px; }
  .form-group input {
    width: 100%; padding: 14px 16px;
    background: #FFFFFF; border: 1px solid #DDDEE2;
    border-radius: 8px; color: #393939; font-size: 15px;
    outline: none; transition: border-color .2s;
  }
  .form-group input:focus { border-color: #285CCC; }
  .btn-login {
    width: 100%; padding: 15px;
    background: #285CCC; color: #fff;
    border: none; border-radius: 8px;
    font-size: 15px; font-weight: 700;
    cursor: pointer; transition: background .2s;
    margin-top: 8px;
  }
  .btn-login:hover { background: #1E47A0; }
  .error-msg { color: #DC2626; font-size: 13px; text-align: center; margin-top: 16px; display: none; }
  .back-link { text-align: center; margin-top: 24px; }
  .back-link a { color: #8A8A90; font-size: 13px; text-decoration: none; }
  .back-link a:hover { color: #6E6E6E; }
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
  body { background: #F1F1F1; color: #4A4B52; font-family: 'Segoe UI', system-ui, sans-serif; display: flex; min-height: 100vh; }

  /* ── Sidebar ── */
  .sidebar {
    width: 240px; min-height: 100vh;
    background: #FFFFFF; border-right: 1px solid #F8F8F8;
    display: flex; flex-direction: column;
    position: fixed; top: 0; left: 0; z-index: 100;
  }
  .sidebar-header {
    padding: 24px 20px 20px;
    border-bottom: 1px solid #F8F8F8;
  }
  .sidebar-header .brand { color: #285CCC; font-size: 11px; font-weight: 700; letter-spacing: 2px; }
  .sidebar-header h2 { color: #393939; font-size: 16px; font-weight: 700; margin-top: 4px; }
  .sidebar-nav { flex: 1; padding: 16px 0; overflow-y: auto; }
  .nav-section { padding: 8px 16px 4px; color: #8A8A90; font-size: 10px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; }
  .nav-item {
    display: flex; align-items: center; gap: 10px;
    padding: 11px 20px; color: #6E6E6E;
    cursor: pointer; transition: all .15s;
    font-size: 14px; border-left: 3px solid transparent;
  }
  .nav-item:hover { color: #393939; background: #FFFFFF; }
  .nav-item.active { color: #285CCC; background: rgba(40,92,204,0.07); border-left-color: #285CCC; }
  .nav-item i { width: 18px; text-align: center; font-size: 13px; }
  .sidebar-footer { padding: 16px 20px; border-top: 1px solid #F8F8F8; display: flex; flex-direction: column; gap: 8px; }
  .btn-logout { width: 100%; padding: 10px; background: transparent; border: 1px solid #DDDEE2; border-radius: 6px; color: #7A7A80; font-size: 13px; cursor: pointer; transition: all .15s; }
  .btn-logout:hover { border-color: #DC2626; color: #DC2626; }
  .btn-change-cred { width: 100%; padding: 10px; background: transparent; border: 1px solid #E6E7EA; border-radius: 6px; color: #8A8A90; font-size: 13px; cursor: pointer; transition: all .15s; display: flex; align-items: center; justify-content: center; gap: 6px; }
  .btn-change-cred:hover { border-color: #285CCC; color: #285CCC; }

  /* ── 계정 변경 모달 ── */
  .cred-modal-overlay { display: none; position: fixed; inset: 0; background: rgba(26,31,46,0.5); z-index: 1000; align-items: center; justify-content: center; }
  .cred-modal-overlay.open { display: flex; }
  .cred-modal { background: #FFFFFF; border: 1px solid #E6E7EA; border-radius: 14px; padding: 32px 28px; width: 100%; max-width: 400px; box-shadow: 0 20px 60px rgba(26,31,46,0.45); }
  .cred-modal-title { color: #393939; font-size: 16px; font-weight: 700; margin-bottom: 6px; display: flex; align-items: center; gap: 8px; }
  .cred-modal-title i { color: #285CCC; }
  .cred-modal-desc { color: #8A8A90; font-size: 12px; margin-bottom: 24px; }
  .cred-field { margin-bottom: 16px; }
  .cred-field label { display: block; color: #6E6E6E; font-size: 11px; font-weight: 600; letter-spacing: .5px; text-transform: uppercase; margin-bottom: 6px; }
  .cred-field input { width: 100%; background: #FFFFFF; border: 1px solid #E6E7EA; border-radius: 8px; color: #393939; font-size: 14px; padding: 10px 14px; outline: none; transition: border-color .2s; box-sizing: border-box; }
  .cred-field input:focus { border-color: #285CCC; }
  .cred-divider { border: none; border-top: 1px solid #F8F8F8; margin: 20px 0; }
  .cred-modal-actions { display: flex; gap: 8px; margin-top: 4px; }
  .cred-modal-actions .btn { flex: 1; padding: 11px; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; transition: all .2s; border: none; }
  .cred-modal-actions .btn-cancel { background: #F8F8F8; color: #6E6E6E; border: 1px solid #E6E7EA; }
  .cred-modal-actions .btn-cancel:hover { background: #E6E7EA; color: #5A5B62; }
  .cred-modal-actions .btn-confirm { background: #285CCC; color: #fff; }
  .cred-modal-actions .btn-confirm:hover { background: #1E47A0; }
  .cred-modal-actions .btn-confirm:disabled { opacity: .5; cursor: not-allowed; }
  .cred-error { color: #DC2626; font-size: 12px; margin-top: 12px; min-height: 16px; text-align: center; }

  /* ── Main ── */
  .main { margin-left: 240px; flex: 1; min-height: 100vh; }
  .topbar { background: #FFFFFF; border-bottom: 1px solid #F8F8F8; padding: 16px 32px; display: flex; align-items: center; justify-content: space-between; }
  .topbar h1 { color: #393939; font-size: 18px; font-weight: 700; }
  .topbar .status { color: #8A8A90; font-size: 13px; }
  .content { padding: 32px; }

  /* ── Panels ── */
  .panel { background: #FFFFFF; border: 1px solid #F8F8F8; border-radius: 12px; padding: 28px; margin-bottom: 24px; }
  .panel-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; }
  .panel-title { color: #393939; font-size: 16px; font-weight: 700; display: flex; align-items: center; gap: 8px; }
  .panel-title i { color: #285CCC; }

  /* ── Form elements ── */
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
  .form-row.single { grid-template-columns: 1fr; }
  .form-row.triple { grid-template-columns: 1fr 1fr 1fr; }
  .form-group { display: flex; flex-direction: column; gap: 6px; }
  .form-group label { color: #6E6E6E; font-size: 12px; font-weight: 600; letter-spacing: .5px; }
  .form-group input, .form-group textarea, .form-group select {
    background: #FFFFFF; border: 1px solid #DDDEE2; border-radius: 8px;
    color: #393939; font-size: 14px; padding: 10px 14px; outline: none;
    transition: border-color .2s; font-family: inherit;
  }
  .form-group input:focus, .form-group textarea:focus, .form-group select:focus { border-color: #285CCC; }
  .form-group textarea { resize: vertical; min-height: 80px; }

  /* ── Buttons ── */
  .btn { padding: 10px 20px; border-radius: 8px; font-size: 13px; font-weight: 700; cursor: pointer; border: none; transition: all .2s; display: inline-flex; align-items: center; gap: 6px; }
  .btn-primary { background: #285CCC; color: #fff; }
  .btn-primary:hover { background: #1E47A0; }
  .btn-secondary { background: #F8F8F8; color: #6E6E6E; border: 1px solid #DDDEE2; }
  .btn-secondary:hover { background: #E6E7EA; color: #393939; }
  .btn-danger { background: transparent; color: #DC2626; border: 1px solid #DC2626; }
  .btn-danger:hover { background: rgba(220,38,38,0.10); }
  .btn-success { background: #22c55e; color: #393939; }
  .btn-success:hover { background: #16a34a; }
  .btn-sm { padding: 6px 14px; font-size: 12px; }

  /* ── Video list ── */
  .video-list { display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px; }
  .video-item { background: #FFFFFF; border: 1px solid #E6E7EA; border-radius: 8px; overflow: hidden; }
  .video-item-inner { display: flex; flex-direction: column; }
  .video-memo-input { width: 100%; background: #FFFFFF; border: none; border-bottom: 1px solid #F8F8F8; color: #B7791F; font-size: 12px; font-weight: 600; padding: 7px 16px; outline: none; letter-spacing: .02em; }
  .video-memo-input::placeholder { color: #8A8A90; font-weight: 400; }
  .video-memo-input:focus { background: #FFFBEB; border-bottom-color: #B7791F; }
  .video-item-row { display: flex; align-items: center; gap: 10px; padding: 10px 16px; }
  .video-item .idx { color: #8A8A90; font-size: 12px; font-weight: 700; min-width: 24px; }
  .video-item input[data-idx] { flex: 1; background: transparent; border: none; color: #393939; font-size: 14px; outline: none; }
  .video-item .yt-preview { color: #ff4040; font-size: 16px; cursor: pointer; padding: 0 4px; }
  .video-item .btn-remove { color: #8A8A90; background: none; border: none; cursor: pointer; font-size: 16px; padding: 0 4px; transition: color .15s; }
  .video-item .btn-remove:hover { color: #DC2626; }

  /* ── Stats grid ── */
  .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
  .stat-card { background: #FFFFFF; border: 1px solid #E6E7EA; border-radius: 10px; padding: 20px; text-align: center; }
  .stat-card label { color: #777; font-size: 11px; display: block; margin-bottom: 8px; }
  .stat-card input { background: transparent; border: none; border-bottom: 1px solid #DDDEE2; color: #393939; font-size: 24px; font-weight: 700; text-align: center; width: 100%; outline: none; padding: 4px 0; }

  /* ── Logo grid ── */
  .logo-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 12px; margin-bottom: 16px; }
  .logo-card { background: #FFFFFF; border: 1px solid #E6E7EA; border-radius: 8px; padding: 12px; text-align: center; position: relative; }
  .logo-card img { max-width: 80px; max-height: 50px; object-fit: contain; }
  .logo-card .btn-del { position: absolute; top: 4px; right: 4px; background: rgba(220,38,38,0.85); color: #ffffff; border: none; border-radius: 4px; font-size: 11px; padding: 2px 6px; cursor: pointer; }
  .logo-card .logo-name { color: #7A7A80; font-size: 10px; margin-top: 6px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .upload-zone { border: 2px dashed #DDDEE2; border-radius: 10px; padding: 32px; text-align: center; color: #8A8A90; cursor: pointer; transition: all .2s; margin-bottom: 16px; }
  .upload-zone:hover { border-color: #285CCC; color: #285CCC; }
  .upload-zone i { font-size: 32px; margin-bottom: 8px; display: block; }
  .thumb-spec { background: #EEF2FA; border: 1px solid #285CCC33; border-radius: 8px; padding: 14px 18px; margin-bottom: 16px; color: #6E6E6E; font-size: 13px; line-height: 1.8; }
  .thumb-spec strong { color: #285CCC; }

  /* ── Works table ── */
  .works-table { width: 100%; border-collapse: collapse; }
  .works-table th { color: #7A7A80; font-size: 11px; font-weight: 700; letter-spacing: .5px; text-transform: uppercase; padding: 8px 12px; border-bottom: 1px solid #F8F8F8; text-align: left; }
  .works-table td { padding: 12px; border-bottom: 1px solid #FFFFFF; vertical-align: middle; }
  .works-table tr:hover td { background: #F8F8F8; }
  .works-thumb { width: 64px; height: 48px; object-fit: cover; border-radius: 6px; }
  .tag-chip { display: inline-block; padding: 3px 10px; border-radius: 100px; font-size: 11px; font-weight: 600; background: rgba(40,92,204,0.12); color: #285CCC; margin: 2px; }

  /* ── Insight posts ── */
  .post-list { display: flex; flex-direction: column; gap: 12px; }
  .post-item { background: #FFFFFF; border: 1px solid #E6E7EA; border-radius: 10px; padding: 16px 20px; display: flex; align-items: center; gap: 16px; }
  .post-thumb { width: 80px; height: 56px; object-fit: cover; border-radius: 6px; background: #F8F8F8; flex-shrink: 0; }
  .post-info { flex: 1; min-width: 0; }
  .post-info .post-title { color: #393939; font-size: 14px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .post-info .post-meta { color: #7A7A80; font-size: 12px; margin-top: 4px; }
  .post-actions { display: flex; gap: 8px; }

  /* ── Gallery admin ── */
  .gal-admin-filter { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px; }
  .gal-admin-ftag { padding: 5px 14px; border-radius: 20px; border: 1px solid #E6E7EA; background: transparent; color: #7A7A80; font-size: 12px; font-weight: 600; cursor: pointer; transition: all .2s; letter-spacing: .3px; }
  .gal-admin-ftag:hover { border-color: #285CCC; color: #6E6E6E; }
  .gal-admin-ftag.active { background: rgba(40,92,204,0.12); border-color: #285CCC; color: #285CCC; }
  .gal-admin-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 14px; }
  .gal-admin-item { position: relative; border-radius: 12px; overflow: hidden; border: 1px solid #E6E7EA; background: #FFFFFF; aspect-ratio: 4/3; cursor: pointer; transition: border-color .2s, transform .2s; }
  .gal-admin-item:hover { border-color: #DDDEE2; transform: translateY(-2px); }
  .gal-admin-item img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .3s; }
  .gal-admin-item:hover img { transform: scale(1.04); }
  .gal-admin-item-info { position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(transparent, rgba(26,31,46,0.55)); padding: 28px 10px 10px; }
  .gal-admin-item-tag { font-size: 9px; font-weight: 700; color: #285CCC; letter-spacing: 1px; text-transform: uppercase; background: rgba(26,107,255,0.2); border: 1px solid rgba(26,107,255,0.4); border-radius: 10px; padding: 2px 7px; display: inline-block; }
  .gal-admin-item-cap { font-size: 11px; color: rgba(255,255,255,0.75); margin-top: 4px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; display: block; }
  .gal-admin-count-badge { position: absolute; top: 7px; left: 7px; background: rgba(0,0,0,0.72); border: 1px solid rgba(255,255,255,0.18); color: #393939; font-size: 10px; font-weight: 700; border-radius: 8px; padding: 2px 7px; display: flex; align-items: center; gap: 3px; letter-spacing: .3px; }
  .gal-admin-item-actions { position: absolute; top: 7px; right: 7px; display: flex; gap: 5px; opacity: 0; transition: opacity .2s; }
  .gal-admin-item:hover .gal-admin-item-actions { opacity: 1; }
  .gal-admin-item-edit { background: rgba(26,107,255,0.85); border: none; color: #393939; width: 26px; height: 26px; border-radius: 50%; font-size: 11px; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(26,31,46,0.28); }
  .gal-admin-item-del { background: rgba(220,38,38,0.9); border: none; color: #ffffff; width: 26px; height: 26px; border-radius: 50%; font-size: 11px; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(26,31,46,0.28); }
  .gal-admin-empty { grid-column: 1/-1; text-align: center; padding: 48px 0; color: #8A8A90; font-size: 13px; }
  .gal-admin-empty i { font-size: 32px; display: block; margin-bottom: 10px; }

  /* ── Service FAQ Admin ── */
  .svc-tab-bar { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 20px; }
  .svc-tab-btn { padding: 7px 16px; border-radius: 20px; border: 1px solid #E6E7EA; background: transparent; color: #7A7A80; font-size: 12px; font-weight: 600; cursor: pointer; transition: all .2s; letter-spacing: .3px; }
  .svc-tab-btn:hover { border-color: #285CCC; color: #6E6E6E; }
  .svc-tab-btn.active { background: rgba(40,92,204,0.12); border-color: #285CCC; color: #285CCC; }
  .svc-faq-list { display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px; }
  .svc-faq-row { background: #FFFFFF; border: 1px solid #E6E7EA; border-radius: 10px; padding: 14px 16px; }
  .svc-faq-row-head { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
  .svc-faq-num { width: 24px; height: 24px; border-radius: 50%; background: rgba(40,92,204,0.12); border: 1px solid rgba(26,107,255,0.3); color: #285CCC; font-size: 11px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .svc-faq-row input.svc-faq-q-inp { flex: 1; background: transparent; border: none; border-bottom: 1px solid #DDDEE2; color: #393939; font-size: 14px; font-weight: 600; padding: 4px 0; outline: none; transition: border-color .2s; }
  .svc-faq-row input.svc-faq-q-inp:focus { border-bottom-color: #285CCC; }
  .svc-faq-row-actions { display: flex; gap: 6px; margin-left: auto; flex-shrink: 0; }
  .svc-faq-row-actions button { background: none; border: 1px solid #E6E7EA; border-radius: 6px; color: #7A7A80; width: 28px; height: 28px; cursor: pointer; font-size: 11px; transition: all .2s; display: flex; align-items: center; justify-content: center; }
  .svc-faq-row-actions .btn-move-up:hover, .svc-faq-row-actions .btn-move-down:hover { border-color: #8A8A90; color: #5A5B62; }
  .svc-faq-row-actions .btn-del-faq:hover { border-color: #dc2626; color: #dc2626; }
  .svc-faq-row textarea.svc-faq-a-inp { width: 100%; background: #FFFFFF; border: 1px solid #E6E7EA; border-radius: 6px; color: #4A4B52; font-size: 13px; line-height: 1.65; padding: 10px 12px; resize: vertical; min-height: 72px; outline: none; font-family: inherit; box-sizing: border-box; }
  .svc-faq-row textarea.svc-faq-a-inp:focus { border-color: #285CCC; }
  .svc-faq-hint { color: #8A8A90; font-size: 11px; margin-top: 4px; }
  .svc-faq-bottom { display: flex; align-items: center; justify-content: space-between; margin-top: 4px; }

  /* ── Marketing stats ── */
  .mktg-service { background: #FFFFFF; border: 1px solid #E6E7EA; border-radius: 10px; padding: 20px; margin-bottom: 16px; }
  .mktg-service-title { color: #285CCC; font-size: 13px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 16px; display: flex; align-items: center; gap: 8px; }
  .case-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
  .case-card { background: #FFFFFF; border: 1px solid #E6E7EA; border-radius: 8px; padding: 16px; }
  .case-card .case-tag { color: #6E6E6E; font-size: 11px; margin-bottom: 10px; }
  .metric-row { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 8px; }
  .metric-input-wrap { display: flex; flex-direction: column; gap: 3px; }
  .metric-input-wrap .ml { color: #8A8A90; font-size: 10px; }
  .metric-input-wrap input { background: #FFFFFF; border: 1px solid #E6E7EA; border-radius: 4px; color: #393939; font-size: 13px; padding: 6px 10px; font-weight: 700; outline: none; width: 100%; }
  .metric-input-wrap input:focus { border-color: #285CCC; }

  /* ── Modal ── */
  .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.85); z-index: 1000; display: flex; align-items: center; justify-content: center; display: none; }
  .modal-overlay.open { display: flex; }
  .modal { background: #FFFFFF; border: 1px solid #E6E7EA; border-radius: 16px; padding: 32px; width: 100%; max-width: 600px; max-height: 90vh; overflow-y: auto; }
  .modal-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; }
  .modal-title { color: #393939; font-size: 18px; font-weight: 700; }
  .modal-close { background: none; border: none; color: #7A7A80; font-size: 20px; cursor: pointer; }
  .modal-close:hover { color: #393939; }
  /* ── Insight 풀화면 에디터 모달 ── */
  #insightModal .modal { max-width: 860px; width: 96vw; max-height: 96vh; padding: 0; border-radius: 12px; display: flex; flex-direction: column; }
  .insight-editor-header { display: flex; align-items: center; justify-content: space-between; padding: 18px 28px; border-bottom: 1px solid #F8F8F8; flex-shrink: 0; }
  .insight-editor-body { flex: 1; overflow-y: auto; padding: 28px; display: flex; flex-direction: column; gap: 20px; }
  .insight-editor-body .form-group label { font-size: 12px; font-weight: 600; color: #6E6E6E; text-transform: uppercase; letter-spacing: .06em; margin-bottom: 6px; display: block; }
  .insight-title-input { width: 100%; background: transparent; border: none; border-bottom: 2px solid #E6E7EA; color: #393939; font-size: 22px; font-weight: 700; padding: 8px 0; outline: none; transition: border-color .2s; }
  .insight-title-input:focus { border-bottom-color: #285CCC; }
  .insight-summary-input { width: 100%; background: #FFFFFF; border: 1px solid #E6E7EA; border-radius: 8px; color: #4A4B52; font-size: 14px; padding: 12px 14px; resize: vertical; min-height: 72px; outline: none; line-height: 1.6; }
  .insight-summary-input:focus { border-color: #285CCC; }
  .insight-content-input { width: 100%; background: #FFFFFF; border: 1px solid #E6E7EA; border-radius: 8px; color: #4A4B52; font-size: 15px; line-height: 1.8; padding: 16px; resize: vertical; min-height: 320px; outline: none; font-family: inherit; }
  .insight-content-input:focus { border-color: #285CCC; }
  .insight-cat-row { display: flex; gap: 16px; }
  .insight-cat-row .form-group { flex: 1; }
  .insight-cat-row select { width: 100%; background: #FFFFFF; border: 1px solid #E6E7EA; border-radius: 8px; color: #393939; font-size: 14px; padding: 10px 12px; outline: none; }
  .insight-thumb-section { display: flex; gap: 16px; align-items: flex-start; }
  .insight-thumb-drop { flex: 1; border: 2px dashed #E6E7EA; border-radius: 10px; padding: 24px; text-align: center; cursor: pointer; color: #8A8A90; transition: border-color .2s, background .2s; }
  .insight-thumb-drop:hover { border-color: #285CCC; background: #EEF2FA; color: #285CCC; }
  .insight-thumb-drop i { font-size: 28px; margin-bottom: 8px; display: block; }
  .insight-thumb-drop p { font-size: 12px; margin: 4px 0 0; }
  .insight-thumb-preview { width: 140px; height: 90px; border-radius: 8px; object-fit: cover; border: 1px solid #E6E7EA; display: none; }
  .insight-thumb-preview.show { display: block; }
  .insight-editor-footer { display: flex; gap: 12px; padding: 18px 28px; border-top: 1px solid #F8F8F8; flex-shrink: 0; background: #FFFFFF; border-radius: 0 0 12px 12px; }
  .content-hint { font-size: 11px; color: #8A8A90; margin-top: 6px; line-height: 1.5; }

  /* ── Quill WYSIWYG 에디터 커스텀 스타일 ── */
  .ql-toolbar.ql-snow {
    background: #FFFFFF;
    border: 1px solid #DDDEE2 !important;
    border-bottom: none !important;
    border-radius: 8px 8px 0 0;
    padding: 8px 10px;
    flex-shrink: 0;
  }
  .ql-toolbar.ql-snow .ql-stroke { stroke: #6E6E6E; }
  .ql-toolbar.ql-snow .ql-fill { fill: #6E6E6E; }
  .ql-toolbar.ql-snow .ql-picker-label { color: #6E6E6E; }
  .ql-toolbar.ql-snow button:hover .ql-stroke,
  .ql-toolbar.ql-snow .ql-active .ql-stroke { stroke: #fff; }
  .ql-toolbar.ql-snow button:hover .ql-fill,
  .ql-toolbar.ql-snow .ql-active .ql-fill { fill: #fff; }
  .ql-toolbar.ql-snow .ql-picker-label:hover,
  .ql-toolbar.ql-snow .ql-active .ql-picker-label { color: #393939; }
  .ql-toolbar.ql-snow .ql-picker-options {
    background: #FFFFFF;
    border: 1px solid #DDDEE2;
    color: #4A4B52;
  }
  .ql-snow .ql-picker.ql-expanded .ql-picker-label { color: #393939; }
  .ql-snow .ql-picker.ql-expanded .ql-picker-options { border-color: #8A8A90; }
  .ql-snow.ql-toolbar button:hover, .ql-snow .ql-toolbar button:hover,
  .ql-snow.ql-toolbar button.ql-active, .ql-snow .ql-toolbar button.ql-active {
    color: #393939;
  }
  #quillEditor {
    background: #FFFFFF;
    border: 1px solid #DDDEE2 !important;
    border-top: none !important;
    border-radius: 0 0 8px 8px;
    color: #4A4B52;
    font-size: 15px;
    line-height: 1.8;
    min-height: 360px;
    max-height: 55vh;
    overflow-y: auto;
  }
  #quillEditor .ql-editor { padding: 18px 20px; min-height: 360px; }
  #quillEditor .ql-editor p { margin-bottom: 0.8em; }
  #quillEditor .ql-editor h1 { font-size: 1.8em; font-weight: 700; color: #393939; margin: 1em 0 0.4em; }
  #quillEditor .ql-editor h2 { font-size: 1.4em; font-weight: 700; color: #f0f0f0; margin: 0.9em 0 0.35em; }
  #quillEditor .ql-editor h3 { font-size: 1.2em; font-weight: 700; color: #ddd; margin: 0.8em 0 0.3em; }
  #quillEditor .ql-editor blockquote { border-left: 4px solid #285CCC; background: #F4F6FB; padding: 12px 18px; margin: 12px 0; color: #aac8ff; border-radius: 0 6px 6px 0; }
  #quillEditor .ql-editor a { color: #4a9eff; }
  #quillEditor .ql-editor ul, #quillEditor .ql-editor ol { padding-left: 1.5em; }
  #quillEditor .ql-editor li { margin-bottom: 0.3em; }
  #quillEditor .ql-editor code { background: #FFFFFF; padding: 2px 6px; border-radius: 4px; font-family: monospace; color: #f08; }
  #quillEditor .ql-editor pre { background: #FFFFFF; padding: 14px 18px; border-radius: 8px; overflow-x: auto; color: #a8e6cf; }
  .ql-snow .ql-color-picker .ql-picker-label svg, .ql-snow .ql-icon-picker .ql-picker-label svg { width: 18px; }
  .ql-editor.ql-blank::before { color: #8A8A90; font-style: normal; font-size: 14px; }
  /* 툴바 구분선 */
  .ql-toolbar.ql-snow .ql-formats { margin-right: 10px; }

  /* ── Toast ── */
  .toast { position: fixed; bottom: 32px; right: 32px; background: #22c55e; color: #393939; padding: 14px 24px; border-radius: 10px; font-size: 14px; font-weight: 600; z-index: 2000; transform: translateY(100px); opacity: 0; transition: all .3s; box-shadow: 0 8px 24px rgba(0,0,0,0.3); }
  .toast.show { transform: translateY(0); opacity: 1; }
  .toast.error { background: #ef4444; }
  .toast.info { background: #285CCC; }

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

  /* [정리:숨김] 좌표 기능 정리에 따라 지도 미리보기도 숨김 (JS가 인라인 block으로 켜므로 !important로 우선 처리) — 되살리려면 이 규칙 삭제 */
  #adminMapPreview { display: none !important; }
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
    <!-- [정리:숨김] 서비스 히어로 수치+FAQ 미사용으로 사이드바에서 숨김 — 되살리려면 style="display:none" 제거 -->
    <div class="nav-item" data-section="marketing" style="display:none"><i class="fas fa-chart-line"></i> Marketing</div>
    <!-- [정리:숨김] /contact 페이지 폐쇄(홈 301)로 여기서 수정해도 사이트에 반영되지 않음 — 되살리려면 style="display:none" 제거 -->
    <div class="nav-item" data-section="contact" style="display:none"><i class="fas fa-envelope"></i> Contact</div>
  </nav>
  <div class="sidebar-footer">
    <button class="btn-change-cred" id="btnOpenCredModal"><i class="fas fa-key"></i> 계정 설정</button>
    <button class="btn-logout" id="btnLogout"><i class="fas fa-sign-out-alt"></i> 로그아웃</button>
  </div>
</aside>

<!-- 계정 설정 모달 -->
<div class="cred-modal-overlay" id="credModalOverlay">
  <div class="cred-modal">
    <div class="cred-modal-title"><i class="fas fa-key"></i> 계정 설정</div>
    <div class="cred-modal-desc">아이디와 비밀번호를 변경합니다. 변경 후 다시 로그인해야 합니다.</div>
    <div class="cred-field">
      <label>현재 비밀번호</label>
      <input type="password" id="credCurrentPw" placeholder="현재 비밀번호 입력" autocomplete="current-password">
    </div>
    <hr class="cred-divider">
    <div class="cred-field">
      <label>새 아이디</label>
      <input type="text" id="credNewId" placeholder="새 아이디 입력" autocomplete="username">
    </div>
    <div class="cred-field">
      <label>새 비밀번호</label>
      <input type="password" id="credNewPw" placeholder="새 비밀번호 입력 (4자 이상)" autocomplete="new-password">
    </div>
    <div class="cred-field">
      <label>새 비밀번호 확인</label>
      <input type="password" id="credNewPwConfirm" placeholder="새 비밀번호 재입력" autocomplete="new-password">
    </div>
    <div class="cred-error" id="credError"></div>
    <div class="cred-modal-actions">
      <button class="btn btn-cancel" id="credBtnCancel">취소</button>
      <button class="btn btn-confirm" id="credBtnConfirm"><i class="fas fa-check"></i> 변경</button>
    </div>
  </div>
</div>

<!-- Main -->
<main class="main">
  <div class="topbar">
    <h1 id="sectionTitle">홈 관리</h1>
    <span class="status" id="statusText">admin</span>
  </div>
  <div class="content">

    <!-- ───────── HOME ───────── -->
    <div class="section active" id="section-home">

      <!-- [정리:숨김] 홈 썸네일 배경 영상 — 히어로가 정적 이미지로 전환되어 이 그리드는 화면에 안 나옴. 되살리려면 아래 panel의 style="display:none" 제거 -->
      <div class="panel" style="display:none">
        <div class="panel-header">
          <div class="panel-title"><i class="fas fa-th-large"></i> 홈 썸네일 배경 영상</div>
          <button class="btn btn-secondary btn-sm" id="btnAddVideo"><i class="fas fa-plus"></i> 추가</button>
        </div>
        <p style="color:#7A7A80;font-size:13px;margin-bottom:16px">홈 메인 화면 배경에 흐르는 <strong style="color:#285CCC">유튜브 썸네일 그리드</strong>에 표시할 영상을 등록합니다.<br>YouTube 링크 또는 영상 ID를 붙여넣으면 자동으로 인식합니다.<br><small style="color:#8A8A90">예시: https://www.youtube.com/watch?v=<strong style="color:#285CCC">HZaDW00sldo</strong> 또는 https://youtu.be/<strong style="color:#285CCC">HZaDW00sldo</strong></small></p>
        <div class="video-list" id="videoList"></div>
        <button class="btn btn-primary" id="btnSaveVideos"><i class="fas fa-save"></i> 썸네일 저장</button>
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

      <!-- 소개서 메일 템플릿 -->
      <div class="panel">
        <div class="panel-header">
          <div class="panel-title"><i class="fas fa-envelope-open-text"></i> 소개서 메일 템플릿</div>
        </div>
        <p style="color:#7A7A80;font-size:13px;margin-bottom:20px;">
          광고주가 소개서를 신청하면 자동 발송되는 이메일의 내용을 수정합니다.<br>
          <small style="color:#8A8A90">줄바꿈은 Enter를 누르면 메일에서도 줄바꿈으로 적용됩니다.</small>
        </p>
        <div class="form-row single" style="margin-bottom:16px;">
          <div class="form-group">
            <label>메일 제목 <small style="color:#8A8A90;font-weight:400">(받은편지함에 표시)</small></label>
            <input type="text" id="brochureMailSubject"
              style="width:100%;background:#FFFFFF;border:1px solid #E6E7EA;border-radius:8px;color:#393939;font-size:14px;padding:10px 14px;"
              placeholder="[인애드컴퍼니] 요청하신 회사소개서를 보내드립니다.">
          </div>
        </div>
        <div class="form-row single" style="margin-bottom:16px;">
          <div class="form-group">
            <label>헤더 제목 <small style="color:#8A8A90;font-weight:400">(이메일 상단 큰 제목)</small></label>
            <textarea id="brochureMailHeadline" rows="2"
              style="width:100%;background:#FFFFFF;border:1px solid #E6E7EA;border-radius:8px;color:#393939;font-size:14px;padding:10px 14px;resize:vertical;font-family:inherit;"
              placeholder="회사소개서를&#10;보내드립니다."></textarea>
          </div>
        </div>
        <div class="form-row single" style="margin-bottom:20px;">
          <div class="form-group">
            <label>헤더 서브 문구 <small style="color:#8A8A90;font-weight:400">(제목 아래 작은 설명)</small></label>
            <textarea id="brochureMailBody" rows="3"
              style="width:100%;background:#FFFFFF;border:1px solid #E6E7EA;border-radius:8px;color:#393939;font-size:14px;padding:10px 14px;resize:vertical;font-family:inherit;"
              placeholder="요청해 주셔서 감사합니다.&#10;인애드컴퍼니의 서비스와 레퍼런스를 담은 소개서입니다."></textarea>
          </div>
        </div>
        <div class="form-group" style="margin-bottom:20px;">
          <label>서비스 태그 칩 <small style="color:#8A8A90;font-weight:400">(쉼표로 구분, 최대 6개 권장)</small></label>
          <input type="text" id="brochureMailTags"
            style="width:100%;background:#FFFFFF;border:1px solid #E6E7EA;border-radius:8px;color:#393939;font-size:14px;padding:10px 14px;"
            placeholder="인플루언서, 바이럴 마케팅, 리뷰, PPL">
          <div id="brochureTagPreview" style="display:flex;flex-wrap:wrap;gap:6px;margin-top:10px;"></div>
        </div>
        <button class="btn btn-primary" id="btnSaveBrochureMail"><i class="fas fa-save"></i> 템플릿 저장</button>
      </div>

      <!-- 문의 알림 받는 사람 -->
      <div class="panel">
        <div class="panel-header">
          <div class="panel-title"><i class="fas fa-inbox"></i> 문의 알림 받는 사람</div>
          <button class="btn btn-secondary btn-sm" id="btnAddMailRecipient" style="font-size:12px;padding:6px 14px"><i class="fas fa-plus"></i> 추가</button>
        </div>
        <p style="color:#7A7A80;font-size:13px;margin-bottom:16px;">
          홈페이지에서 상담 신청이 접수되면 아래 이메일 모두에게 알림 메일이 동시에 갑니다.<br>
          <small style="color:#8A8A90">저장하면 다음 문의부터 바로 적용됩니다. 최소 1명, 최대 50명까지 등록할 수 있습니다. 회사소개서 요청은 광고주에게만 메일이 가고 내부 알림은 없습니다.</small>
        </p>
        <div id="mailRecipientList" style="display:flex;flex-direction:column;gap:10px;margin-bottom:12px;"></div>
        <p id="mailRecipientNote" style="color:#8A8A90;font-size:12px;margin-bottom:16px;"></p>
        <div style="display:flex;gap:10px;flex-wrap:wrap;">
          <button class="btn btn-primary" id="btnSaveMailRecipients"><i class="fas fa-save"></i> 받는 사람 저장</button>
          <button class="btn btn-secondary" id="btnTestMailRecipients"><i class="fas fa-paper-plane"></i> 테스트 메일 보내기</button>
        </div>
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
            <small style="color:#8A8A90;font-size:11px;margin-top:6px;display:block;">프로젝트+ 로 표시</small>
          </div>
          <div class="stat-card">
            <label>클라이언트 재계약률</label>
            <input type="number" id="statContracts" placeholder="98">
            <small style="color:#8A8A90;font-size:11px;margin-top:6px;display:block;">% 로 표시</small>
          </div>
          <div class="stat-card">
            <label>업력 (년)</label>
            <input type="number" id="statExperience" placeholder="6">
            <small style="color:#8A8A90;font-size:11px;margin-top:6px;display:block;">년차 로 표시</small>
          </div>
          <div class="stat-card">
            <label>파트너 브랜드</label>
            <input type="number" id="statPartners" placeholder="50">
            <small style="color:#8A8A90;font-size:11px;margin-top:6px;display:block;">브랜드+ 로 표시</small>
          </div>
        </div>
        <button class="btn btn-primary" style="margin-top:20px" id="btnSaveStats"><i class="fas fa-save"></i> 수치 저장</button>
      </div>

    </div>

    <!-- ───────── ABOUT ───────── -->
    <div class="section" id="section-about">

      <!-- 주소 -->
      <div class="panel">
        <div class="panel-header">
          <div class="panel-title"><i class="fas fa-map-marker-alt"></i> 회사 주소</div>
        </div>
        <p style="color:#7A7A80;font-size:13px;margin-bottom:16px">주소 찾기로 회사 주소를 검색해 입력하세요.</p>

        <!-- 주소 입력 -->
        <div class="form-row single" style="margin-bottom:10px">
          <div class="form-group">
            <label>주소</label>
            <div style="display:flex;gap:10px;align-items:center">
              <input type="text" id="aboutAddress" placeholder="주소 검색 후 자동 입력됩니다" readonly
                style="flex:1;background:#FFFFFF;border:1px solid #E6E7EA;border-radius:8px;color:#393939;font-size:14px;padding:10px 14px;cursor:default">
              <button class="btn btn-secondary" id="btnSearchAddress" style="white-space:nowrap;flex-shrink:0">
                <i class="fas fa-search"></i> 주소 찾기
              </button>
            </div>
            <div id="addrDetailWrap" style="margin-top:10px">
              <label style="color:#7A7A80;font-size:12px;display:block;margin-bottom:4px">상세 주소 (층/호수 등)</label>
              <input type="text" id="aboutAddressDetail" placeholder="예: 2F, 204호"
                style="width:100%;background:#FFFFFF;border:1px solid #E6E7EA;border-radius:8px;color:#393939;font-size:14px;padding:10px 14px;box-sizing:border-box">
            </div>
          </div>
        </div>

        <!-- [정리:숨김] 좌표 직접 입력 — 손입력 불편·저사용으로 숨김. 기존 저장 좌표는 유지됨. 되살리려면 아래 div의 display:none 제거 -->
        <div style="background:#F8F8F8;border:1px solid #EEF2FA;border-radius:10px;padding:14px;margin-bottom:14px;display:none">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
            <span style="color:#285CCC;font-size:13px;font-weight:600"><i class="fas fa-crosshairs"></i> 지도 좌표 (필수)</span>
            <a id="btnOpenKakaoMap" href="#" target="_blank"
              style="font-size:12px;color:#A16207;text-decoration:none;background:#FFFBEB;border:1px solid #FBF3D6;border-radius:6px;padding:4px 10px">
              <i class="fas fa-external-link-alt"></i> 카카오맵에서 좌표 확인
            </a>
          </div>
          <p style="color:#8A8A90;font-size:12px;margin-bottom:10px;line-height:1.6">
            카카오맵에서 주소 검색 → 해당 위치 우클릭 → <strong style="color:#6E6E6E">"이 곳이 궁금한가요?"</strong> 클릭 → 좌표 복사
          </p>
          <div style="display:flex;gap:10px">
            <div style="flex:1">
              <label style="color:#7A7A80;font-size:12px;display:block;margin-bottom:4px">위도 (Latitude)</label>
              <input type="text" id="aboutLat" placeholder="예: 37.320819"
                style="width:100%;background:#FFFFFF;border:1px solid #E6E7EA;border-radius:8px;color:#393939;font-size:14px;padding:9px 12px;box-sizing:border-box">
            </div>
            <div style="flex:1">
              <label style="color:#7A7A80;font-size:12px;display:block;margin-bottom:4px">경도 (Longitude)</label>
              <input type="text" id="aboutLng" placeholder="예: 126.831592"
                style="width:100%;background:#FFFFFF;border:1px solid #E6E7EA;border-radius:8px;color:#393939;font-size:14px;padding:9px 12px;box-sizing:border-box">
            </div>
            <div style="display:flex;align-items:flex-end">
              <button class="btn btn-secondary" id="btnPreviewCoord" style="white-space:nowrap;padding:9px 14px">
                <i class="fas fa-map"></i> 미리보기
              </button>
            </div>
          </div>
        </div>

        <!-- 미리보기 지도 -->
        <div id="adminMapPreview" style="display:none;margin-bottom:14px;border-radius:10px;overflow:hidden;height:220px;background:#FFFFFF;border:1px solid #E6E7EA">
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
          배경: <strong>흰색 또는 투명 배경만 등록 가능</strong> — 색 배경 로고는 그리드 균형이 깨져 자동 차단됩니다<br>
          권장 크기: <strong>200 × 80 px</strong> (가로형 로고) 또는 <strong>80 × 80 px</strong> (정방형)<br>
          파일 형식: PNG (투명 배경 권장), JPG · 최대 500KB<br>
          <em style="color:#7A7A80">※ 업로드 시 자동으로 동일 규격(200×80, 흰 배경)으로 변환됩니다. 작은 로고는 자동 확대됩니다.</em>
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
          <strong>이미지 안내 — 기본 사진 + 마우스 호버 시 중앙 로고</strong><br>
          <strong>대표 이미지</strong>: 캠페인/상품 비주얼 — 원본 비율을 유지하며 어떤 영역도 자르지 않고 전체 표시합니다.<br>
          <strong>로고</strong>: 크기·비율 제한 없음 — 자동으로 규격을 통일하고 호버 시 흰 배경 중앙에 표시합니다.<br>
          파일 형식: JPG, PNG, WebP · 파일 크기: 최대 2MB<br>
          <em style="color:#7A7A80">※ 로고는 배경이 투명하거나 흰색인 이미지가 가장 깔끔하게 표시됩니다.</em>
        </div>
        <table class="works-table" id="worksTable">
          <thead>
            <tr>
              <th>대표 이미지</th>
              <th>로고</th>
              <th>업체명 (브랜드)</th>
              <th>오버레이 문구</th>
              <th>진행 상품</th>
              <th>서비스 설명</th>
              <th>대표 순서</th>
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
          <em style="color:#7A7A80">※ 썸네일은 리스트 페이지에서 카드 형태로 표시됩니다.</em>
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
          <em style="color:#7A7A80">태그: 일상 · 팀 · 오피스 · 행사 · 캠페인 / 권장 비율 4:3 (800 × 600 px 이상)</em>
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
          <em style="color:#7A7A80">숫자·텍스트 모두 자유롭게 입력 가능 — 저장 즉시 서비스 페이지에 반영됩니다.</em>
        </div>
        <!-- 서비스 탭 -->
        <div class="svc-tab-bar" id="heroKpiTabBar">
          <button class="svc-tab-btn active" data-svc="viral">바이럴</button>
          <button class="svc-tab-btn" data-svc="influencer">인플루언서</button>
          <button class="svc-tab-btn" data-svc="seeding">체험단</button>
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
          <em style="color:#7A7A80">HTML 태그 사용 가능 (예: &lt;strong&gt;강조&lt;/strong&gt;) — 저장 후 서비스 페이지에 즉시 반영됩니다.</em>
        </div>
        <!-- 서비스 탭 -->
        <div class="svc-tab-bar" id="svcFaqTabBar">
          <button class="svc-tab-btn active" data-svc="viral">바이럴</button>
          <button class="svc-tab-btn" data-svc="influencer">인플루언서</button>
          <button class="svc-tab-btn" data-svc="seeding">체험단</button>
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
        <p style="color:#7A7A80;font-size:13px;margin-bottom:20px">개인정보 처리방침 모달에 표시되는 책임자 정보를 수정합니다.</p>
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
        <p style="color:#7A7A80;font-size:13px;margin-bottom:20px">Contact 페이지 하단에 표시되는 FAQ를 관리합니다. <strong style="color:#6E6E6E">최대 5개</strong>까지 등록 가능합니다.</p>
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
          ${[['viral','바이럴'],['influencer','인플루언서'],['seeding','체험단'],['review','리뷰'],['oliveyoung','올리브영'],['ppl','PPL']].map(([t,ko]) =>
            `<label style="display:flex;align-items:center;gap:6px;color:#6E6E6E;font-size:13px;cursor:pointer">
              <input type="checkbox" name="wTag" value="${t}" style="accent-color:#285CCC"> ${ko}
            </label>`).join('')}
        </div>
      </div>
    </div>
    <div class="form-row single">
      <div class="form-group">
        <label for="wFeaturedRank">대표 포트폴리오 순서</label>
        <select id="wFeaturedRank">
          <option value="">대표 포트폴리오로 사용하지 않음</option>
          ${Array.from({ length: 8 }, (_, i) => `<option value="${i + 1}">${i + 1}번째</option>`).join('')}
        </select>
        <small style="display:block;margin-top:7px;color:#777;line-height:1.5">1~8개까지 설정할 수 있으며, 선택한 순서대로 포트폴리오 최상단과 홈페이지에 표시됩니다.</small>
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
        <label>대표 이미지 (무크롭 · 원본 전체 표시)</label>
        <div class="upload-zone" id="wCoverZone" style="padding:20px">
          <i class="fas fa-panorama"></i>
          <p style="font-size:13px;margin-top:6px">클릭하여 대표 이미지 업로드 (원본 비율 유지 · 사진 전체 표시)</p>
          <input type="file" id="wCoverFile" accept="image/*" style="display:none">
        </div>
        <div id="wCoverPreview" style="margin-top:8px"></div>
        <div class="form-group" style="margin-top:8px">
          <label style="font-size:11px;color:#7A7A80">또는 이미지 URL 직접 입력 (비워두면 기존 로고 카드 방식)</label>
          <input type="text" id="wCoverUrl" placeholder="https://...">
        </div>
      </div>
    </div>
    <div class="form-row single">
      <div class="form-group">
        <label>로고 이미지 (대표 이미지 위 하단 칩)</label>
        <div class="upload-zone" id="wThumbZone" style="padding:20px">
          <i class="fas fa-image"></i>
          <p style="font-size:13px;margin-top:6px">클릭하여 로고 업로드 (아무 크기나 가능 — 자동으로 규격 통일)</p>
          <input type="file" id="wThumbFile" accept="image/*" style="display:none">
        </div>
        <div id="wThumbPreview" style="margin-top:8px"></div>
        <div class="form-group" style="margin-top:8px">
          <label style="font-size:11px;color:#7A7A80">또는 이미지 URL 직접 입력</label>
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
            <option value="seeding">체험단 마케팅</option>
            <option value="review">리뷰 마케팅</option>
            <option value="oliveyoung">올리브영 마케팅</option>
            <option value="ppl">PPL 마케팅</option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label>썸네일 이미지 <span style="color:#8A8A90;font-weight:400">(800 × 500px 권장)</span></label>
        <div class="insight-thumb-section">
          <div class="insight-thumb-drop" id="iThumbZone">
            <i class="fas fa-image"></i>
            <p>클릭하여 이미지 업로드</p>
            <p style="font-size:11px;color:#8A8A90;margin-top:4px">JPG · PNG · WEBP</p>
            <input type="file" id="iThumbFile" accept="image/*" style="display:none">
          </div>
          <div style="display:flex;flex-direction:column;gap:8px;justify-content:flex-start">
            <img class="insight-thumb-preview" id="iThumbPreview" src="" alt="미리보기">
            <input class="insight-summary-input" type="text" id="iThumbUrl" placeholder="또는 이미지 URL 직접 입력 (https://...)" style="min-height:unset;resize:none;font-size:12px;padding:8px 10px">
          </div>
        </div>
      </div>
      <div class="form-group">
        <label>요약 <span style="color:#8A8A90;font-weight:400">(카드 목록에 표시되는 소개글)</span></label>
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
<script src="/static/admin.js?v=20260720d"></script>
</body>
</html>`
}

export default app
