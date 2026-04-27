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

  /* 헤더는 항상 표시 - 숨김 처리 제거 */
  if (header) { header.classList.remove('header--hidden'); }
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
    <section class="about-intro-section">
      {/* 배경 장식 */}
      <div class="ai-section-bg">
        <div class="ai-bg-grid"></div>
        <div class="ai-bg-glow ai-bg-glow--left"></div>
        <div class="ai-bg-glow ai-bg-glow--right"></div>
      </div>

      <div class="container" style="position:relative;z-index:1">
        {/* 섹션 레이블 */}
        <div class="ai-eyebrow-row">
          <span class="ai-eyebrow-line"></span>
          <span class="ai-eyebrow-text">COMPANY OVERVIEW</span>
          <span class="ai-eyebrow-line"></span>
        </div>

        <div class="about-intro-grid">

          {/* 왼쪽: 텍스트 */}
          <div class="about-intro-text">
            <h2 class="about-intro-title">
              <span class="ai-title-ko">인애드컴퍼니</span>
              <span class="ai-title-en">IN AD COMPANY</span>
            </h2>

            <div class="ai-desc-block">
              <p>2019년 설립된 인애드컴퍼니는 바이럴 마케팅, 인플루언서·유튜브 마케팅, 시딩 캠페인, SEO, 고객 리뷰 마케팅, 올리브영 마케팅, PPL 등 전방위적 퍼널 마케팅 솔루션을 제공하는 크리에이티브 마케팅 에이전시입니다.</p>
              <p>광고처럼 보이지 않는 자연스러운 확산 구조를 설계해 브랜드 인지도를 높이고, 소비자가 먼저 찾게 만드는 지속적인 마케팅 생태계를 구축합니다.</p>
            </div>

            {/* 서비스 태그 그리드 */}
            <div class="ai-services-grid">
              <div class="ai-svc-item">
                <span class="ai-svc-dot"></span>
                <span class="ai-svc-name">바이럴 마케팅</span>
              </div>
              <div class="ai-svc-item">
                <span class="ai-svc-dot"></span>
                <span class="ai-svc-name">인플루언서</span>
              </div>
              <div class="ai-svc-item">
                <span class="ai-svc-dot"></span>
                <span class="ai-svc-name">SEO 최적화</span>
              </div>
              <div class="ai-svc-item">
                <span class="ai-svc-dot"></span>
                <span class="ai-svc-name">시딩 캠페인</span>
              </div>
              <div class="ai-svc-item">
                <span class="ai-svc-dot"></span>
                <span class="ai-svc-name">리뷰 마케팅</span>
              </div>
              <div class="ai-svc-item">
                <span class="ai-svc-dot"></span>
                <span class="ai-svc-name">PPL 광고</span>
              </div>
              <div class="ai-svc-item">
                <span class="ai-svc-dot"></span>
                <span class="ai-svc-name">올리브영</span>
              </div>
              <div class="ai-svc-item">
                <span class="ai-svc-dot"></span>
                <span class="ai-svc-name">유튜브 광고</span>
              </div>
            </div>

            <a href="/contact" class="ai-cta-link">
              <span>상담 신청하기</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
          </div>

          {/* 오른쪽: 스탯 카드 4개 */}
          <div class="about-stats-grid">
            <div class="astat-card" data-target="2019" data-suffix="년" data-label="설립">
              <div class="astat-glow"></div>
              <div class="astat-scan"></div>
              <div class="astat-inner">
                <p class="astat-label-top">설립 연도</p>
                <div class="astat-num"><span class="astat-counter">2019</span><span class="astat-unit">년</span></div>
                <div class="astat-bar"><div class="astat-bar-fill"></div></div>
              </div>
            </div>
            <div class="astat-card astat-card--highlight" data-target="320" data-suffix="+" data-label="완료 프로젝트">
              <div class="astat-glow"></div>
              <div class="astat-scan"></div>
              <div class="astat-inner">
                <p class="astat-label-top">완료 프로젝트</p>
                <div class="astat-num"><span class="astat-counter">320</span><span class="astat-unit">+</span></div>
                <div class="astat-bar"><div class="astat-bar-fill"></div></div>
              </div>
            </div>
            <div class="astat-card" data-target="98" data-suffix="%" data-label="재계약률">
              <div class="astat-glow"></div>
              <div class="astat-scan"></div>
              <div class="astat-inner">
                <p class="astat-label-top">재계약률</p>
                <div class="astat-num"><span class="astat-counter">98</span><span class="astat-unit">%</span></div>
                <div class="astat-bar"><div class="astat-bar-fill"></div></div>
              </div>
            </div>
            <div class="astat-card" data-target="50" data-suffix="+" data-label="파트너 브랜드">
              <div class="astat-glow"></div>
              <div class="astat-scan"></div>
              <div class="astat-inner">
                <p class="astat-label-top">파트너 브랜드</p>
                <div class="astat-num"><span class="astat-counter">50</span><span class="astat-unit">+</span></div>
                <div class="astat-bar"><div class="astat-bar-fill"></div></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    {/* ── 비즈니스 파트너 섹션 ── */}
    <section class="about-partner-section">
      {/* 배경 파티클 캔버스 */}
      <canvas class="aptn-canvas" id="aptnCanvas"></canvas>
      <div class="aptn-bg-orb aptn-bg-orb--a"></div>
      <div class="aptn-bg-orb aptn-bg-orb--b"></div>
      <div class="aptn-bg-line aptn-bg-line--h1"></div>
      <div class="aptn-bg-line aptn-bg-line--h2"></div>

      <div class="container" style="position:relative;z-index:1">

        {/* 섹션 헤더 */}
        <div class="aptn-header">
          <p class="aptn-eyebrow">OUR IDENTITY</p>
          <h2 class="aptn-main-title">비즈니스 파트너</h2>
          <p class="aptn-main-sub">단순한 대행사를 넘어, 고객사의 성장을 함께 책임지는 진정한 파트너</p>
        </div>

        {/* 3개 가치 카드 */}
        <div class="aptn-cards">
          <div class="aptn-card" data-idx="0">
            <div class="aptn-card-accent-line"></div>
            <div class="aptn-card-number">01</div>
            <div class="aptn-card-icon-wrap">
              <div class="aptn-card-icon-ring"></div>
              <span class="aptn-card-icon">💡</span>
            </div>
            <strong class="aptn-card-title">차별화된<br />솔루션 제공</strong>
            <p class="aptn-card-desc">브랜드 특성에 맞는 최적 채널과 전략으로 경쟁과 차별되는 퍼포먼스를 설계합니다.</p>
            <div class="aptn-card-tags">
              <span>채널 분석</span><span>전략 설계</span><span>퍼포먼스</span>
            </div>
          </div>
          <div class="aptn-card aptn-card--center" data-idx="1">
            <div class="aptn-card-accent-line"></div>
            <div class="aptn-card-number">02</div>
            <div class="aptn-card-icon-wrap">
              <div class="aptn-card-icon-ring"></div>
              <span class="aptn-card-icon">📈</span>
            </div>
            <strong class="aptn-card-title">사업 성장<br />유도</strong>
            <p class="aptn-card-desc">노출에서 전환까지 이어지는 풀퍼널 구조로 실질적인 매출과 인지도를 동시에 높입니다.</p>
            <div class="aptn-card-tags">
              <span>풀퍼널</span><span>매출 성장</span><span>인지도</span>
            </div>
          </div>
          <div class="aptn-card" data-idx="2">
            <div class="aptn-card-accent-line"></div>
            <div class="aptn-card-number">03</div>
            <div class="aptn-card-icon-wrap">
              <div class="aptn-card-icon-ring"></div>
              <span class="aptn-card-icon">🎯</span>
            </div>
            <strong class="aptn-card-title">브랜딩<br />강화</strong>
            <p class="aptn-card-desc">소비자 인식 속에 브랜드를 자연스럽게 각인시키는 지속 가능한 마케팅 생태계를 구축합니다.</p>
            <div class="aptn-card-tags">
              <span>브랜드 설계</span><span>지속성</span><span>생태계</span>
            </div>
          </div>
        </div>

        {/* VISION / MISSION */}
        <div class="aptn-vm-section">
          <div class="aptn-vm-divider">
            <span class="aptn-vm-divider-line"></span>
            <span class="aptn-vm-divider-badge">CORE VALUES</span>
            <span class="aptn-vm-divider-line"></span>
          </div>

          <div class="aptn-vm-grid">
            <div class="aptn-vm-card aptn-vm-card--vision">
              <div class="aptn-vm-badge-row">
                <div class="aptn-vm-badge">VISION</div>
                <div class="aptn-vm-badge-dot"></div>
              </div>
              <p class="aptn-vm-quote">"고객사 비즈니스의 <strong>성공</strong>만을 위한,<br />효과적인 <strong>퍼널 솔루션</strong>을 제공합니다."</p>
            </div>

            <div class="aptn-vm-center">
              <div class="aptn-vm-center-ring">
                <div class="aptn-vm-center-dot"></div>
              </div>
            </div>

            <div class="aptn-vm-card aptn-vm-card--mission">
              <div class="aptn-vm-badge-row">
                <div class="aptn-vm-badge aptn-vm-badge--mission">MISSION</div>
                <div class="aptn-vm-badge-dot"></div>
              </div>
              <p class="aptn-vm-quote">"고객사의 <strong>성장</strong>에 전력을 다하는<br />진정한 <strong>비즈니스 파트너</strong>가 됩니다."</p>
            </div>
          </div>
        </div>

      </div>
    </section>

    {/* ── 클라이언트 ── */}
    <section class="acl-section">

      {/* 헤더 */}
      <div class="acl-header">
        <p class="acl-eyebrow">OUR CLIENTS</p>
        <h2 class="acl-heading">함께한 브랜드</h2>
        <p class="acl-sub">인애드컴퍼니와 함께 성장한 브랜드들입니다</p>
      </div>

      {/* 마퀴 래퍼 — 흰 배경, 양끝 페이드 */}
      <div class="acl-marquee-wrap">

        {/* Row 1 — 왼쪽으로 */}
        <div class="acl-row">
          <div class="acl-track acl-track--fwd">
            {[
              'lg','cj','cocacola','maeil','daangn','harim','knotted','gmarket',
              'bodylab','madeu','snp','yakson','secretage','medience','pulio','petitelin',
              'airmade','echo','bon','bobsnu','elravie','dailyco','happyprince',
              /* 루프용 복제 */
              'lg','cj','cocacola','maeil','daangn','harim','knotted','gmarket',
              'bodylab','madeu','snp','yakson','secretage','medience','pulio','petitelin',
              'airmade','echo','bon','bobsnu','elravie','dailyco','happyprince',
            ].map((name, i) => (
              <div class="acl-logo-box" key={i}>
                <img src={`/static/logos/${name}.png`} alt={name} class="acl-logo-img" loading="lazy" />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 — 오른쪽으로 */}
        <div class="acl-row">
          <div class="acl-track acl-track--rev">
            {[
              'petitelin','pulio','medience','secretage','yakson','snp','madeu','bodylab',
              'gmarket','knotted','harim','daangn','maeil','cocacola','cj','lg',
              'jangsoo','suvid','ofmom','nutseline','woori',
              /* 루프용 복제 */
              'petitelin','pulio','medience','secretage','yakson','snp','madeu','bodylab',
              'gmarket','knotted','harim','daangn','maeil','cocacola','cj','lg',
              'jangsoo','suvid','ofmom','nutseline','woori',
            ].map((name, i) => (
              <div class="acl-logo-box" key={i}>
                <img src={`/static/logos/${name}.png`} alt={name} class="acl-logo-img" loading="lazy" />
              </div>
            ))}
          </div>
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

          {/* 지도 영역 — Leaflet.js (OpenStreetMap, 무료) */}
          <div class="location-map-wrap" style="position:relative">
            <div id="locationMap" style="width:100%;height:100%;min-height:400px;border-radius:12px"></div>
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

    {/* ── Admin Dynamic Data + Leaflet Map ── */}
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" crossorigin="" />
    <script dangerouslySetInnerHTML={{__html: `
// Leaflet 동적 로드 후 지도 초기화
(function(){
  var DEFAULT_LAT = 37.320819, DEFAULT_LNG = 126.831592;
  var mapInstance = null;
  var markerInstance = null;

  function loadLeaflet(cb) {
    if (window.L) { cb(); return; }
    var s = document.createElement('script');
    s.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    s.crossOrigin = '';
    s.onload = cb;
    document.head.appendChild(s);
  }

  function initMap(lat, lng, address) {
    var el = document.getElementById('locationMap');
    if (!el) return;
    if (mapInstance) {
      mapInstance.setView([lat, lng], 17);
      if (markerInstance) {
        markerInstance.setLatLng([lat, lng]);
        markerInstance.getPopup().setContent(address || '인애드컴퍼니');
      }
      return;
    }
    mapInstance = L.map('locationMap', { zoomControl: true, scrollWheelZoom: false }).setView([lat, lng], 17);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19
    }).addTo(mapInstance);
    // 커스텀 마커 아이콘
    var icon = L.divIcon({
      className: '',
      html: '<div style="width:36px;height:36px;background:#1a6bff;border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:3px solid #fff;box-shadow:0 3px 12px rgba(26,107,255,0.6);position:relative">' +
            '<div style="width:10px;height:10px;background:#fff;border-radius:50%;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)"></div></div>',
      iconSize: [36, 36],
      iconAnchor: [18, 36],
      popupAnchor: [0, -40]
    });
    markerInstance = L.marker([lat, lng], { icon: icon }).addTo(mapInstance);
    markerInstance.bindPopup(
      '<div style="font-family:inherit;padding:4px 2px">' +
      '<strong style="font-size:14px;color:#1a6bff">인애드컴퍼니</strong><br>' +
      '<span style="font-size:12px;color:#666">' + (address || '') + '</span>' +
      '</div>',
      { maxWidth: 260 }
    ).openPopup();
  }

  fetch('/api/admin/public/about')
    .then(function(r){ return r.json(); })
    .then(function(data){
      // 주소 교체
      if(data.address){
        var addrEl = document.querySelector('.ldl-item .ldl-value');
        if(addrEl){
          var fullAddr = data.address;
          if(data.addressDetail) fullAddr += '<br />' + data.addressDetail;
          addrEl.innerHTML = fullAddr;
        }
      }
      // 지도 초기화
      var lat = parseFloat(data.lat) || DEFAULT_LAT;
      var lng = parseFloat(data.lng) || DEFAULT_LNG;
      loadLeaflet(function(){ initMap(lat, lng, data.address); });

      // 관리자 등록 로고 — 기존 row1/row2 트랙에 자연스럽게 합치기
      if(data.logos && data.logos.length){
        var logoKeys = data.logos;
        Promise.all(logoKeys.map(function(key){
          return fetch('/api/admin/logo/'+key)
            .then(function(r){ return r.json(); })
            .then(function(res){ return res.dataUrl || null; })
            .catch(function(){ return null; });
        })).then(function(dataUrls){
          var validUrls = dataUrls.filter(Boolean);
          if(!validUrls.length) return;

          function makeBox(src){
            var box = document.createElement('div');
            box.className = 'acl-logo-box';
            var img = document.createElement('img');
            img.src = src;
            img.className = 'acl-logo-img';
            img.loading = 'lazy';
            box.appendChild(img);
            return box;
          }

          var tracks = document.querySelectorAll('.acl-track');
          if(!tracks.length) return;

          tracks.forEach(function(track){
            var existing = track.querySelectorAll('.acl-logo-box');
            var half = existing.length / 2;

            validUrls.forEach(function(src){
              var boxOrig  = makeBox(src);
              var boxClone = makeBox(src);
              var pivot = existing[half - 1];
              if(pivot && pivot.nextSibling){
                track.insertBefore(boxOrig, pivot.nextSibling);
              } else {
                var allBoxes = track.querySelectorAll('.acl-logo-box');
                var mid = allBoxes[Math.floor(allBoxes.length / 2)];
                track.insertBefore(boxOrig, mid || null);
              }
              track.appendChild(boxClone);
            });
          });
        });
      }
    })
    .catch(function(){
      // 좌표 로드 실패 시 기본값으로 지도 표시
      loadLeaflet(function(){ initMap(DEFAULT_LAT, DEFAULT_LNG, '경기도 안산시 단원구 고잔로 51'); });
    });
})();
    `}} />

    {/* 카운터 애니메이션 + 파티클 */}
    <script dangerouslySetInnerHTML={{__html: `
(function(){
  /* ── 카운터 애니메이션 ── */
  function animateCounter(el, target, duration) {
    var start = 0, startTime = null;
    var isYear = target >= 2000;
    var from = isYear ? target : 0;
    function step(ts) {
      if (!startTime) startTime = ts;
      var progress = Math.min((ts - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var val = Math.floor(from + (target - from) * eased);
      el.textContent = val.toLocaleString();
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString();
    }
    requestAnimationFrame(step);
  }

  var observed = false;
  var io = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting && !observed) {
        observed = true;
        document.querySelectorAll('.astat-counter').forEach(function(el) {
          var card = el.closest('.astat-card');
          var target = parseInt(card.dataset.target, 10);
          animateCounter(el, target, 1600);
        });
        /* 카드 글로우 순차 등장 */
        document.querySelectorAll('.astat-card').forEach(function(card, i) {
          setTimeout(function(){ card.classList.add('astat-card--visible'); }, i * 120);
        });
      }
    });
  }, { threshold: 0.3 });
  var statsGrid = document.querySelector('.about-stats-grid');
  if (statsGrid) io.observe(statsGrid);

  /* ── 파티클 캔버스 ── */
  var canvas = document.getElementById('aptnCanvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var particles = [];
  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  for (var i = 0; i < 55; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.3,
      dx: (Math.random() - 0.5) * 0.35,
      dy: (Math.random() - 0.5) * 0.35,
      a: Math.random() * 0.5 + 0.1
    });
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(function(p) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(41,121,255,' + p.a + ')';
      ctx.fill();
      p.x += p.dx; p.y += p.dy;
      if (p.x < 0 || p.x > canvas.width)  p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    });
    /* 가까운 파티클끼리 연결 */
    for (var i = 0; i < particles.length; i++) {
      for (var j = i + 1; j < particles.length; j++) {
        var dx = particles[i].x - particles[j].x;
        var dy = particles[i].y - particles[j].y;
        var dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = 'rgba(41,121,255,' + (0.12 * (1 - dist/100)) + ')';
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(drawParticles);
  }
  drawParticles();
})();
    `}} />
  </>
)