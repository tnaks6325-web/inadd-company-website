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
        <title>{title ? `${title} | NOVA STUDIO` : 'NOVA STUDIO — 브랜드를 움직이는 힘'}</title>
        <meta name="description" content={description || '데이터 기반 전략과 감성 크리에이티브가 만나는 마케팅 스튜디오 NOVA STUDIO'} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700;900&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link href="/static/style.css" rel="stylesheet" />
      </head>
      <body>
        <header class="site-header" id="site-header">
          <div class="header-inner">
            <a href="/" class="logo">
              <span class="logo-mark">N</span>
              <span class="logo-text">NOVA<br /><span class="logo-sub">STUDIO</span></span>
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
                <span class="logo-mark">N</span>
                <span class="logo-text">NOVA<br /><span class="logo-sub">STUDIO</span></span>
              </a>
              <p class="footer-desc">브랜드의 가능성을 발굴하고<br />성과로 연결하는 마케팅 스튜디오</p>
            </div>
            <div class="footer-links">
              <div class="footer-col">
                <h4>Service</h4>
                <a href="/works">Works</a>
                <a href="/viral">Viral Marketing</a>
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
            <p>© 2025 NOVA STUDIO. All rights reserved.</p>
            <p class="footer-legal">대표 : 홍길동 | 사업자번호 : 000-00-00000 | 서울특별시 강남구 테헤란로 123</p>
          </div>
        </footer>
        <script src="/static/main.js"></script>
      </body>
    </html>
  )
})
