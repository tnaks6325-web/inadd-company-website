import { jsxRenderer } from 'hono/jsx-renderer'

declare module 'hono' {
  interface ContextRenderer {
    (content: string | Promise<string>, props?: { title?: string; description?: string; canonical?: string; schema?: string }): Response
  }
}

export const renderer = jsxRenderer(({ children, title, description, canonical, schema }: { children?: any; title?: string; description?: string; canonical?: string; schema?: string }) => {
  // 검색 결과 제목은 60자 안팎에서 잘리므로, 붙이면 60자를 넘는 긴 제목(인사이트 글 등)에는 회사명 꼬리를 생략한다
  const pageTitle = !title ? '인애드컴퍼니 — 실전형 크리에이티브 바이럴 마케팅 에이전시'
    : `${title} | 인애드컴퍼니`.length > 60 ? title : `${title} | 인애드컴퍼니`
  const pageDesc = description || '채팅, 커뮤니티, SNS 중심의 실전형 바이럴 마케팅을 설계하는 인애드컴퍼니. 브랜드 인지도와 전환율을 동시에 높이는 퍼포먼스를 제공합니다.'
  const siteUrl = 'https://www.inadcompany.co.kr'
  const canonicalUrl = canonical || siteUrl
  return (
    <html lang="ko">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* ── Consent Mode 기본값 ──
             GTM·GA4보다 먼저 실행돼야 광고 개인 최적화(ad_personalization) 신호가
             'denied'로 처리되지 않는다. 순서를 바꾸면 리마케팅 잠재고객이 쌓이지 않음. */}
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            'ad_storage': 'granted',
            'ad_user_data': 'granted',
            'ad_personalization': 'granted',
            'analytics_storage': 'granted'
          });
        `}} />

        {/* ── Google Tag Manager ── */}
        <script dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-T45WR778');` }} />
        {/* ── End Google Tag Manager ── */}

        <title>{pageTitle}</title>

        {/* ── SEO 기본 메타태그 ── */}
        <meta name="description" content={pageDesc} />
        <meta name="keywords" content="바이럴마케팅, 인플루언서마케팅, 체험단, 리뷰마케팅, 올리브영마케팅, PPL마케팅, 마케팅에이전시, 인애드컴퍼니, inadcompany" />
        <meta name="author" content="인애드컴퍼니 (IN AD COMPANY)" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonicalUrl} />

        {/* ── 파비콘 (네이버 서치어드바이저 마크업 가이드: 절대경로) ── */}
        <link rel="shortcut icon" href="https://www.inadcompany.co.kr/favicon.ico" />

        {/* ── Open Graph (SNS 공유) ── */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="인애드컴퍼니" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={`${siteUrl}/static/og-image.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="ko_KR" />

        {/* ── Twitter Card ── */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDesc} />
        <meta name="twitter:image" content={`${siteUrl}/static/og-image.png`} />

        {/* ── 네이버 웹마스터 인증 ── */}
        <meta name="naver-site-verification" content="9d12802cf3021d63f7403fd275a35888ecc26ec0" />

        {/* ── Google Analytics (GA4) ── */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XFPHBJNW38"></script>
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XFPHBJNW38');
          // 대표 계정에서 보이는 속성(488401721 · 회사홈페이지)에도 같이 보낸다(2026-10-27).
          // 위 G-XFPHBJNW38 은 지금 로그인된 대표 계정에 권한이 없어, 주인 계정을 찾을 때까지 두 곳에 똑같이 쌓는다.
          gtag('config', 'G-474V2Z6PHE');
        `}} />

        {/* ── 네이버 애널리틱스 + 검색광고 전환추적 (공통 스크립트) ── */}
        <script src="//wcs.naver.net/wcslog.js"></script>
        <script dangerouslySetInnerHTML={{ __html: `
          if(!wcs_add) var wcs_add={};
          if(!_nasa) var _nasa={};
          if(window.wcs){
            wcs.inflow();
            wcs_add["wa"] = "4cf8723bdd3578";
            wcs_do();
            wcs_add["wa"] = "s_dcdf9038a76";
            wcs_do();
          }
        `}} />

        {/* ── 구조화 데이터 (Schema.org JSON-LD) ── */}
        {schema && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />
        )}

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
        {/* Pretendard — 전체 폰트 (한국어/영문 통일) */}
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" />
        <link href="/static/style.css?v=20261027p" rel="stylesheet" />
        {/* ── Meta Pixel Code ── */}
        <script dangerouslySetInnerHTML={{ __html: `
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '27496919366666410');
fbq('track', 'PageView');
        ` }} />
        <noscript dangerouslySetInnerHTML={{ __html: `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=27496919366666410&ev=PageView&noscript=1" />` }} />
        {/* ── End Meta Pixel Code ── */}
      </head>
      <body>
        {/* ── Google Tag Manager (noscript) ── */}
        <noscript dangerouslySetInnerHTML={{ __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-T45WR778" height="0" width="0" style="display:none;visibility:hidden"></iframe>` }} />
        {/* ── End Google Tag Manager (noscript) ── */}
        <header class="site-header" id="site-header">
          <div class="header-inner">
            <a href="/" class="logo">
              <span class="logo-wordmark">IN AD COMPANY</span>
            </a>
            <button class="menu-toggle" id="menuToggle" aria-label="메뉴 열기">
              <span></span><span></span><span></span>
            </button>
            <nav class="main-nav" id="mainNav">
              {/* 홈 드롭다운: 어바웃 · 인사이트 · 아워테크 */}
              <div class="nav-dropdown" id="navHomeDropdown">
                <a href="/" class="nav-link nav-dropdown-trigger">
                  홈
                  <svg class="nav-arrow" viewBox="0 0 12 8" fill="none">
                    <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </a>
                <div class="nav-dropdown-menu nav-dropdown-menu--compact">
                  <div class="ndm-inner">
                    <a href="/about" class="ndm-item">
                      <span class="ndm-text"><strong>About</strong><em>회사 소개 · 연혁</em></span>
                    </a>
                    <a href="/insight" class="ndm-item">
                      <span class="ndm-text"><strong>Insight</strong><em>현장의 이야기</em></span>
                    </a>
                    <a href="/development" class="ndm-item">
                      <span class="ndm-text"><strong>Our Tech</strong><em>자체 자동화 기술</em></span>
                    </a>
                  </div>
                </div>
              </div>
              {/* 서비스 드롭다운 (구 Marketing) */}
              <div class="nav-dropdown" id="navDropdown">
                <a href="/#services" class="nav-link nav-dropdown-trigger" id="navDropdownTrigger">
                  서비스
                  <svg class="nav-arrow" viewBox="0 0 12 8" fill="none">
                    <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </a>
                <div class="nav-dropdown-menu" id="navDropdownMenu">
                  <div class="ndm-inner">
                    <a href="/marketing/subscription" class="ndm-item">
                      <span class="ndm-text">
                        <strong>마케팅팀 구독</strong>
                        <em>신입 1명 비용으로 전담 TF팀</em>
                      </span>
                    </a>
                    <a href="/marketing/performance" class="ndm-item">
                      <span class="ndm-text">
                        <strong>퍼포먼스 마케팅</strong>
                        <em>광고 운영부터 전환 데이터 분석까지</em>
                      </span>
                    </a>
                    <a href="/marketing/viral" class="ndm-item">
                      <span class="ndm-text">
                        <strong>바이럴 마케팅</strong>
                        <em>커뮤니티 기반 자연확산</em>
                      </span>
                    </a>
                    <a href="/marketing/influencer" class="ndm-item">
                      <span class="ndm-text">
                        <strong>인플루언서 마케팅</strong>
                        <em>1,520+ 크리에이터 네트워크</em>
                      </span>
                    </a>
                    <a href="/marketing/seeding" class="ndm-item">
                      <span class="ndm-text">
                        <strong>체험단 마케팅</strong>
                        <em>샘플 배포 & 후기 수집</em>
                      </span>
                    </a>
                    <a href="/marketing/review" class="ndm-item">
                      <span class="ndm-text">
                        <strong>리뷰 마케팅</strong>
                        <em>브랜드 신뢰 & 전환율 향상</em>
                      </span>
                    </a>
                    <a href="/marketing/oliveyoung" class="ndm-item">
                      <span class="ndm-text">
                        <strong>올리브영 마케팅</strong>
                        <em>H&B 채널 랭킹 최적화</em>
                      </span>
                    </a>
                    <a href="/marketing/ppl" class="ndm-item">
                      <span class="ndm-text">
                        <strong>PPL 마케팅</strong>
                        <em>콘텐츠 속 자연스러운 노출</em>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
              <a href="/works" class="nav-link">포트폴리오</a>
              <a href="/contact" class="nav-link">문의하기</a>
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
                <a href="/marketing/subscription">마케팅팀 구독</a>
                <a href="/marketing/performance">퍼포먼스 마케팅</a>
                <a href="/marketing/viral">바이럴 마케팅</a>
                <a href="/marketing/influencer">인플루언서 마케팅</a>
                <a href="/marketing/seeding">체험단</a>
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
            <p class="footer-legal">상호 : (주)인애드컴퍼니 | 대표 : 김수만 | 사업자등록번호 : 311-87-02345</p>
            <p class="footer-legal">연락처 : 010-9186-9944 | 경기도 안산시 단원구 고잔로 51, 타워아이즈빌 2층 204호</p>
            <a href="/admin/login" class="admin-login-btn" title="관리자 로그인" aria-label="관리자 로그인"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="width:15px;height:15px"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg></a>
          </div>
        </footer>

        {/* ══ 전역 간편 문의 팝업 — /contact 링크 클릭 시 팝업으로 열림 ══ */}
        <div id="cmodal" class="cmodal-overlay" style="display:none">
          <div class="cmodal-box svc-light">
            <button type="button" class="cmodal-close" onclick="closeContactModal()" aria-label="닫기">
              <svg viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
            </button>

            <div class="cmodal-head">
              <span class="sec-label">Contact</span>
              <h3>문의하기</h3>
              <p>1영업일 이내에 담당자가 메일로 연락드립니다.</p>
            </div>

            <form class="contact-form" id="cmForm">
              {/* ── 대체 문의 안내: 모바일 이메일 입력 이탈 방지 ── */}
              <p class="cf-altmail">
                <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="2.5" y="4.5" width="15" height="11" rx="2" stroke="currentColor" stroke-width="1.6"/><path d="M3.5 6l6.5 4.5L16.5 6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
                <span>이메일 입력이 어려우신 경우, 아래 메일로 직접 문의 주셔도 됩니다.<br />
                  <a href="mailto:dndvkr41@inadcompany.com">dndvkr41@inadcompany.com</a>
                </span>
              </p>

              {/* ── 필수 입력: 메일 주소 + 문의 내용 (상단, 컬러 테두리로 강조) ── */}
              <div class="cf-required">
                <div class="cf-group">
                  <label for="cm-email">메일 주소 <span class="cf-req">*</span></label>
                  <input type="email" id="cm-email" name="email" placeholder="hello@yourcompany.com" required />
                </div>
                <div class="cf-group">
                  <label for="cm-message">문의 내용 <span class="cf-req">*</span></label>
                  <textarea id="cm-message" name="message" rows={4} required placeholder="브랜드 상황, 마케팅 목표 등 편하게 적어주세요."></textarea>
                </div>
                <p class="cf-required-hint">
                  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 10.5l3.5 3.5L16 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  메일 주소와 문의 내용만 입력해도 문의 가능합니다.
                </p>
              </div>

              {/* ── 선택 입력: 기본 접힘(아코디언) — 개인정보 항목 노출 부담 완화 ── */}
              <div class="cf-optional cf-optional--collapsible" id="cmOptional">
                <button type="button" class="cf-optional-toggle" aria-expanded="false" aria-controls="cmOptionalBody"
                  onclick="var o=this.closest('.cf-optional');var on=o.classList.toggle('open');this.setAttribute('aria-expanded',on)">
                  <span>추가 정보 입력 <span class="cf-opt">(선택)</span></span>
                  <svg class="cf-optional-arr" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </button>
                <div class="cf-optional-body" id="cmOptionalBody">
                <div class="cf-row cf-row--2">
                  <div class="cf-group">
                    <label for="cm-company">회사 / 브랜드명</label>
                    <input type="text" id="cm-company" name="company" placeholder="브랜드명 또는 회사명" />
                  </div>
                  <div class="cf-group">
                    <label for="cm-name">이름</label>
                    <input type="text" id="cm-name" name="name" placeholder="홍길동" />
                  </div>
                </div>
                <div class="cf-group">
                  <label for="cm-phone">연락처</label>
                  <input type="tel" id="cm-phone" name="phone" inputmode="numeric" maxlength="13" autocomplete="tel" placeholder="010-0000-0000" />
                </div>
                <div class="cf-group">
                  <label>관심 서비스 <span class="cf-opt">(복수 선택 가능)</span></label>
                  <div class="cf-chips">
                    <label class="cf-chip"><input type="checkbox" name="service" value="마케팅팀 구독" /><span>마케팅팀 구독</span></label>
                    <label class="cf-chip"><input type="checkbox" name="service" value="퍼포먼스 마케팅" /><span>퍼포먼스 마케팅</span></label>
                    <label class="cf-chip"><input type="checkbox" name="service" value="바이럴 마케팅" /><span>바이럴 마케팅</span></label>
                    <label class="cf-chip"><input type="checkbox" name="service" value="인플루언서·유튜브" /><span>인플루언서·유튜브</span></label>
                    <label class="cf-chip"><input type="checkbox" name="service" value="체험단" /><span>체험단</span></label>
                    <label class="cf-chip"><input type="checkbox" name="service" value="고객 리뷰" /><span>고객 리뷰</span></label>
                    <label class="cf-chip"><input type="checkbox" name="service" value="올리브영" /><span>올리브영</span></label>
                    <label class="cf-chip"><input type="checkbox" name="service" value="PPL" /><span>PPL</span></label>
                    <label class="cf-chip"><input type="checkbox" name="service" value="미디어 믹스" /><span>미디어 믹스</span></label>
                    <label class="cf-chip"><input type="checkbox" name="service" value="기타" /><span>기타</span></label>
                  </div>
                </div>
                </div>{/* /cf-optional-body */}
              </div>
              <div class="cm-checks">
                {/* 회사소개서 체크박스 제거 — 문의 접수 시 항상 함께 발송 */}
                {/* 동의 문구 옆에 '내용 보기' — 버튼은 label 밖에 둬야 클릭이 체크박스를 토글하지 않음 */}
                <div class="cf-privacy-row">
                  <label class="cf-privacy-check">
                    <input type="checkbox" name="privacy" required />
                    <span class="cf-privacy-box"></span>
                    <span>개인정보 수집 및 이용에 동의합니다. <span class="cf-req">*</span></span>
                  </label>
                  <button type="button" class="cf-privacy-view" aria-expanded="false" aria-controls="cmPrivacyPanel"
                    onclick="var p=document.getElementById('cmPrivacyPanel');var o=p.classList.toggle('open');this.setAttribute('aria-expanded',o);this.textContent=o?'닫기':'내용 보기'">내용 보기</button>
                </div>
                <div class="cm-privacy-panel" id="cmPrivacyPanel">
                  <div>
                    <p><strong>수집 항목</strong> — (필수) 이메일, 문의 내용 / (선택) 회사/브랜드명, 이름, 연락처, 관심 서비스</p>
                    <p><strong>수집 목적</strong> — 마케팅 상담 회신 및 회사소개서 발송</p>
                    <p><strong>보유 기간</strong> — 동의일로부터 1년 보관 후 파기</p>
                    <p>동의를 거부할 수 있으며, 거부 시 문의 접수가 제한될 수 있습니다.</p>
                  </div>
                </div>
              </div>
              {/* 접수 실패 안내 — 브라우저 기본 경고창 대신 버튼 바로 위에 표시 */}
              <p class="cf-error" id="cmError" role="alert" hidden>
                접수가 완료되지 않았습니다. 입력하신 내용은 그대로 있으니 잠시 후 다시 눌러 주시거나, <a href="tel:010-9186-9944">010-9186-9944</a>로 전화 주세요.
              </p>
              <button type="submit" class="cf-submit">
                <span>문의하기</span>
                <svg viewBox="0 0 24 24" fill="none"><path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </button>
              <p class="cf-brochure-note">문의를 접수하시면 회사소개서도 함께 보내드립니다.</p>
            </form>

            {/* 완료 화면 */}
            <div class="cmodal-success" id="cmSuccess" style="display:none">
              <div class="cs-check">
                <svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="22" stroke="rgba(37,70,158,0.3)" stroke-width="1.5"/><path d="M14 24l8 8 12-12" stroke="rgba(37,70,158,0.9)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </div>
              <h3>문의가 접수되었습니다!</h3>
              <p>담당자가 <strong>1영업일 이내</strong> 메일로 연락드립니다.</p>
              <p class="cm-bro-note" id="cmBroNote" style="display:none">입력하신 이메일로 회사소개서도 보내드립니다.</p>
              <p class="cm-tel">급한 문의: <a href="tel:010-9186-9944">010-9186-9944</a></p>
              <button type="button" class="cf-submit cmodal-done-btn" onclick="closeContactModal()"><span>확인</span></button>
            </div>
          </div>
        </div>

        <script src="/static/main.js?v=20261027p"></script>
        {/* ── Ribbons 커서 제거 (파란 줄 트레일 비활성화) ── */}
      </body>
    </html>
  )
})
