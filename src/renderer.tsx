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
        <link href="/static/style.css?v=20260427i" rel="stylesheet" />
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
              <a href="/" class="nav-link">Home</a>
              <a href="/about" class="nav-link">About</a>
              <a href="/works" class="nav-link">Works</a>
              <a href="/insight" class="nav-link">Insight</a>
              {/* Marketing 드롭다운 */}
              <div class="nav-dropdown" id="navDropdown">
                <a href="/marketing" class="nav-link nav-dropdown-trigger" id="navDropdownTrigger">
                  Marketing
                  <svg class="nav-arrow" viewBox="0 0 12 8" fill="none">
                    <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </a>
                <div class="nav-dropdown-menu" id="navDropdownMenu">
                  <div class="ndm-inner">
                    <a href="/marketing/viral" class="ndm-item">
                      <span class="ndm-icon">🔥</span>
                      <span class="ndm-text">
                        <strong>바이럴 마케팅</strong>
                        <em>커뮤니티 기반 자연확산</em>
                      </span>
                    </a>
                    <a href="/marketing/influencer" class="ndm-item">
                      <span class="ndm-icon">⭐</span>
                      <span class="ndm-text">
                        <strong>인플루언서 마케팅</strong>
                        <em>1,200+ 크리에이터 네트워크</em>
                      </span>
                    </a>
                    <a href="/marketing/seeding" class="ndm-item">
                      <span class="ndm-icon">🌱</span>
                      <span class="ndm-text">
                        <strong>시딩 캠페인</strong>
                        <em>샘플 배포 & 후기 수집</em>
                      </span>
                    </a>
                    <a href="/marketing/seo" class="ndm-item">
                      <span class="ndm-icon">🔍</span>
                      <span class="ndm-text">
                        <strong>SEO 마케팅</strong>
                        <em>검색 상위 노출 최적화</em>
                      </span>
                    </a>
                    <a href="/marketing/review" class="ndm-item">
                      <span class="ndm-icon">💬</span>
                      <span class="ndm-text">
                        <strong>리뷰 마케팅</strong>
                        <em>브랜드 신뢰 & 전환율 향상</em>
                      </span>
                    </a>
                    <a href="/marketing/oliveyoung" class="ndm-item">
                      <span class="ndm-icon">💚</span>
                      <span class="ndm-text">
                        <strong>올리브영 마케팅</strong>
                        <em>H&B 채널 랭킹 최적화</em>
                      </span>
                    </a>
                    <a href="/marketing/ppl" class="ndm-item">
                      <span class="ndm-icon">🎬</span>
                      <span class="ndm-text">
                        <strong>PPL 마케팅</strong>
                        <em>콘텐츠 속 자연스러운 노출</em>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
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
                <h4>Marketing</h4>
                <a href="/marketing/viral">바이럴 마케팅</a>
                <a href="/marketing/influencer">인플루언서 마케팅</a>
                <a href="/marketing/seeding">시딩 캠페인</a>
                <a href="/marketing/seo">SEO 마케팅</a>
                <a href="/marketing/review">리뷰 마케팅</a>
                <a href="/marketing/oliveyoung">올리브영 마케팅</a>
                <a href="/marketing/ppl">PPL 마케팅</a>
              </div>
              <div class="footer-col">
                <h4>Company</h4>
                <a href="/about">About</a>
                <a href="/works">Works</a>
                <a href="/insight">Insight</a>
                <a href="/contact">Contact</a>
              </div>
            </div>
          </div>
          <div class="footer-bottom">
            <p>© 2025 인애드컴퍼니 (IN AD COMPANY). All rights reserved.</p>
            <p class="footer-legal">대표 : 김수만 | 연락처 : 010-9186-9944 | 경기도 안산시 단원구 고잔로 51, 타워아이즈빌 2F, 204호</p>
            <a href="/admin/login" class="admin-login-btn" title="관리자 로그인">⚙</a>
          </div>
        </footer>
        {/* 전화 모달 - 전역 공통 */}
        <div class="call-modal-overlay" id="callModalOverlay" aria-modal="true" role="dialog" aria-label="전화 상담">
          <div class="call-modal">
            <button class="call-modal-close" id="callModalClose" aria-label="닫기">
              <svg viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
            </button>
            <div class="call-modal-icon">📞</div>
            <p class="call-modal-label">대표 직통 연락처</p>
            <h2 class="call-modal-name">김수만 대표</h2>
            <a href="tel:010-9186-9944" class="call-modal-number">010-9186-9944</a>
            <p class="call-modal-hours">운영시간 · 평일 09:00 – 18:00</p>
          </div>
        </div>
        <script src="/static/main.js"></script>
      </body>
    </html>
  )
})
