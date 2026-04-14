export const AboutPage = () => (
  <>
    {/* ============ SCROLL STORY INTRO ============ */}
    <section class="viral-story">

      {/* Scene 1 */}
      <div class="vs-scene" id="vs1">
        <div class="vs-scene-bg"></div>
        <p class="vs-text vs-text--large">에너지드링크,<br /><em>어떻게 플레이 할까요?</em></p>
      </div>

      {/* Scene 2 */}
      <div class="vs-scene" id="vs2">
        <div class="vs-scene-bg"></div>
        <p class="vs-text">99%는 에너지드링크만 생각하며<br />콘텐츠를 구상합니다</p>
      </div>

      {/* Scene 3 */}
      <div class="vs-scene" id="vs3">
        <div class="vs-scene-bg"></div>
        <p class="vs-text vs-text--accent">하지만</p>
      </div>

      {/* Scene 4 */}
      <div class="vs-scene" id="vs4">
        <div class="vs-scene-bg"></div>
        <p class="vs-text vs-text--em">1%만<br />에너지드링크를 <em>마시는 사람</em>으로<br />구상합니다</p>
      </div>

      {/* Scene 5 */}
      <div class="vs-scene" id="vs5">
        <div class="vs-scene-bg"></div>
        <p class="vs-text">고객의 모든 검색환경에서부터<br />시작합니다.</p>
      </div>

      {/* Scene 6 — CTA */}
      <div class="vs-scene vs-scene--cta" id="vs6">
        <div class="vs-scene-bg vs-scene-bg--glow"></div>
        <div class="vs-cta-wrap">
          <span class="sec-label">IN AD COMPANY</span>
          <p class="vs-text vs-text--cta"><em>시각을 뒤집는</em> 인애드가<br />함께 하겠습니다.</p>
          <div class="vs-scroll-hint">
            <span>인애드컴퍼니 더 알아보기</span>
            <svg viewBox="0 0 24 24" fill="none" width="18" height="18"><path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
        </div>
      </div>
    </section>

    {/* 스크롤 스토리 JS */}
    <script dangerouslySetInnerHTML={{__html: `
(function() {
  var story = document.querySelector('.viral-story');
  var header = document.querySelector('.site-header');
  var scenes = document.querySelectorAll('.vs-scene');
  if (!story || scenes.length === 0) return;

  var io = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      var el = entry.target.querySelector('.vs-text, .vs-cta-wrap');
      if (!el) return;
      if (entry.isIntersecting) { el.classList.add('vs-visible'); }
      else { el.classList.remove('vs-visible'); }
    });
  }, { threshold: 0.5 });

  scenes.forEach(function(s) { io.observe(s); });

  function updateHeader() {
    var storyBottom = story.offsetTop + story.offsetHeight;
    var scrollY = window.scrollY || window.pageYOffset;
    if (header) {
      if (scrollY < storyBottom - 80) { header.classList.add('header--hidden'); }
      else { header.classList.remove('header--hidden'); }
    }
  }
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();
})();
    `}} />

    {/* ── Page Hero ── */}
    <section class="page-hero about-hero">
      <div class="page-hero-bg"><div class="hero-glow glow-1"></div></div>
      <div class="container">
        <span class="sec-label">About Us</span>
        <h1 class="page-title">크리에이티브와 데이터가<br /><em>만나는 마케팅 에이전시</em></h1>
        <p class="page-desc">인애드컴퍼니는 단순한 노출을 넘어 브랜드의 가치를 전달하고<br />실질적인 성과로 이어지는 마케팅을 설계합니다.</p>
      </div>
    </section>

    {/* ── 회사 소개 ── */}
    <section class="section about-intro-section">
      <div class="container">
        <div class="about-intro-grid">
          <div class="about-intro-text">
            <span class="sec-label">Company</span>
            <h2 class="sec-title">인애드컴퍼니<br /><em>IN AD COMPANY</em></h2>
            <p>2019년 설립된 인애드컴퍼니는 바이럴 마케팅, 인플루언서·유튜브 마케팅, 시딩 캠페인, SEO, 고객 리뷰 마케팅, 올리브영 마케팅, PPL 등 전방위적 퍼널 마케팅 솔루션을 제공하는 크리에이티브 마케팅 에이전시입니다.</p>
            <p>광고처럼 보이지 않는 자연스러운 확산 구조를 설계해 브랜드 인지도를 높이고, 소비자가 먼저 찾게 만드는 지속적인 마케팅 생태계를 구축합니다.</p>

          </div>
          <div class="about-stats-grid">
            <div class="astat-card">
              <div class="astat-num">2019<span class="astat-unit">년</span></div>
              <p>설립</p>
            </div>
            <div class="astat-card">
              <div class="astat-num">320<span class="astat-unit">+</span></div>
              <p>완료 프로젝트</p>
            </div>
            <div class="astat-card">
              <div class="astat-num">98<span class="astat-unit">%</span></div>
              <p>재계약률</p>
            </div>
            <div class="astat-card">
              <div class="astat-num">50<span class="astat-unit">+</span></div>
              <p>파트너 브랜드</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ── 인애드가 추구하는 가치 (비즈니스 파트너) ── */}
    <section class="section about-values-section about-partner-section">
      <div class="container">
        <div class="aptn-formula">
          <div class="aptn-item">
            <div class="aptn-icon">💡</div>
            <strong>차별화 된<br />솔루션 제공</strong>
          </div>
          <div class="aptn-plus">+</div>
          <div class="aptn-item">
            <div class="aptn-icon">📈</div>
            <strong>사업 성장<br />유도</strong>
          </div>
          <div class="aptn-plus">+</div>
          <div class="aptn-item">
            <div class="aptn-icon">🎯</div>
            <strong>브랜딩<br />강화</strong>
          </div>
        </div>

        <div class="aptn-arrow">
          <svg viewBox="0 0 24 24" fill="none" width="36" height="36">
            <path d="M12 5v14M5 12l7 7 7-7" stroke="#1a6bff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>

        <div class="aptn-result aptn-result--center">
          <h2 class="aptn-result-title">비즈니스 파트너</h2>
        </div>

        <div class="aptn-vm-grid">
          <div class="aptn-vm-card aptn-vm-card--vision">
            <span class="aptn-vm-label">VISION</span>
            <p>"고객사 비즈니스의 <strong>성공</strong>만을 위한,<br />효과적인 <strong>퍼널 솔루션</strong>을 제공합니다."</p>
          </div>
          <div class="aptn-vm-divider"></div>
          <div class="aptn-vm-card aptn-vm-card--mission">
            <span class="aptn-vm-label">MISSION</span>
            <p>"고객사의 <strong>성장</strong>에 전력을 다하는<br />진정한 <strong>비즈니스 파트너</strong>가 됩니다."</p>
          </div>
        </div>
      </div>
    </section>

    {/* ── 클라이언트 파트너스 ── */}
    <section class="section about-clients-section">
      <div class="container">
        <h2 class="about-clients-title">PARTNERS</h2>
        <div class="about-clients-grid">
          {[
            'lg','cj','cocacola','maeil','daangn','harim','knotted','gmarket',
            'bodylab','madeu','snp','yakson','secretage','medience','pulio','petitelin',
            'dailyco','airmade','echo','bon','bobsnu','elravie','jangsoo','suvid',
            'ofmom','happyprince','nutseline','woori',
          ].map(name => (
            <div class="acl-item">
              <img src={`/static/logos/${name}.png`} alt={name} class="acl-logo" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── 오시는 길 ── */}
    <section class="section about-location-section" id="location">
      <div class="container">
        <div class="section-head">
          <span class="sec-label">Location</span>
          <h2 class="sec-title">오시는 길</h2>
        </div>
        <div class="location-layout">

          {/* 지도 영역 */}
          <div class="location-map-wrap">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3172.123456!2d126.8206!3d37.3219!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357b61b1c1234567%3A0xabcdef1234567890!2z6rK96riw64-Z7JWZ7ISc7Jq4IOuTnOuwlOuCrOq1rCDqtIDsnpDroZwgNTE!5e0!3m2!1sko!2skr!4v1700000000000!5m2!1sko!2skr"
              width="100%"
              height="100%"
              style="border:0; border-radius: 12px;"
              allowfullscreen
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* 정보 */}
          <div class="location-info">
            <div class="location-company">
              <div class="lc-logo-row">
                <img src="/static/logo.png" alt="인애드컴퍼니 로고" class="lc-logo" />
                <div>
                  <strong class="lc-name">인애드컴퍼니</strong>
                  <span class="lc-sub">IN AD COMPANY</span>
                </div>
              </div>
            </div>

            <ul class="location-detail-list">
              <li class="ldl-item">
                <div class="ldl-icon">
                  <svg viewBox="0 0 24 24" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor"/></svg>
                </div>
                <div>
                  <span class="ldl-label">주소</span>
                  <p class="ldl-value">경기도 안산시 단원구 고잔로 51<br />타워아이즈빌 2F, 204호</p>
                </div>
              </li>
              <li class="ldl-item">
                <div class="ldl-icon">
                  <svg viewBox="0 0 24 24" fill="none"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="currentColor"/></svg>
                </div>
                <div>
                  <span class="ldl-label">대표 연락처</span>
                  <a href="tel:010-9186-9944" class="ldl-value ldl-link">010-9186-9944</a>
                </div>
              </li>
              <li class="ldl-item">
                <div class="ldl-icon">
                  <svg viewBox="0 0 24 24" fill="none"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="currentColor"/></svg>
                </div>
                <div>
                  <span class="ldl-label">이메일</span>
                  <a href="mailto:inadcompany@naver.com" class="ldl-value ldl-link">inadcompany@naver.com</a>
                </div>
              </li>
              <li class="ldl-item">
                <div class="ldl-icon">
                  <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><path d="M12 6v6l4 2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
                </div>
                <div>
                  <span class="ldl-label">운영시간</span>
                  <p class="ldl-value">평일 09:00 – 18:00<br /><span class="ldl-note">주말 및 공휴일 휴무</span></p>
                </div>
              </li>
            </ul>

            <div class="location-cta-row">
              <a href="/contact" class="hero-cta-btn primary">
                <span>상담 신청하기</span>
                <svg viewBox="0 0 24 24" fill="none"><path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </a>
              <button type="button" class="hero-cta-btn ghost" onclick="openCallModal()"><span>📞 바로 전화하기</span></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
)
