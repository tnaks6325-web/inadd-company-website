import { jsxRenderer } from 'hono/jsx-renderer'

declare module 'hono' {
  interface ContextRenderer {
    (content: string | Promise<string>, props?: { title?: string; description?: string }): Response
  }
}

export const renderer = jsxRenderer(({ children, title, description }: { children?: any; title?: string; description?: string }) => {
  return (
    <html lang="ko">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title ? `${title} | 인애드컴퍼니` : '인애드컴퍼니 — THE CREATIVE MARKETING AGENCY'}</title>
        <meta name="description" content={description || '크리에이티브와 데이터가 만나는 마케팅 에이전시 인애드컴퍼니 (IN AD COMPANY)'} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700;900&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link href="/static/style.css" rel="stylesheet" />
      </head>
      <body>
        <header class="site-header" id="site-header">
          <div class="header-inner">
            <a href="/" class="logo">
              <span class="logo-wordmark">IN AD COMPANY</span>
            </a>
            <button class="menu-toggle" id="menuToggle" aria-label="메뉴 열기">
              <span></span><span></span><span></span>
            </button>
            <nav class="main-nav" id="mainNav">
              <a href="/about" class="nav-link">About</a>
              <a href="/works" class="nav-link">Works</a>
              <a href="/insight" class="nav-link">Insight</a>
              <a href="/viral" class="nav-link">Viral</a>
              <a href="/contact" class="nav-link nav-cta">Contact</a>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer class="site-footer">
          <div class="footer-inner">
            <div class="footer-brand">
              <a href="/" class="logo">
                <img src="/static/logo.png" class="logo-img" alt="인애드컴퍼니" />
                <span class="logo-text">인애드컴퍼니<br /><span class="logo-sub">IN AD COMPANY</span></span>
              </a>
              <p class="footer-desc">크리에이티브와 데이터가 만나는<br />THE CREATIVE MARKETING AGENCY</p>
            </div>
            <div class="footer-links">
              <div class="footer-col">
                <h4>Service</h4>
                <a href="/works">Works</a>
                <a href="/viral">Marketing</a>
                <a href="/insight">Insight</a>
              </div>
              <div class="footer-col">
                <h4>Company</h4>
                <a href="/about">About</a>
                <a href="/contact">Contact</a>
              </div>
            </div>
          </div>
          <div class="footer-bottom">
            <p>© 2025 인애드컴퍼니 (IN AD COMPANY). All rights reserved.</p>
            <p class="footer-legal">대표 : 김수만 | 연락처 : 010-9186-9944 | 경기도 안산시 단원구 고잔로 51, 타워아이즈빌 2F, 204호</p>
          </div>
        </footer>
        <script src="/static/main.js"></script>
      </body>
    </html>
  )
})
