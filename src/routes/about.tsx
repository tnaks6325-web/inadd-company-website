import { icon } from '../icons'
import { AboutHero } from './about-hero'
export const AboutPage = () => (
  <>
    {/* ── Page Hero: 홈처럼 상단 구역 좌우 전체를 채우는 움직이는 화면(about-hero). 제목은 화면 안의 큰 글자로 나오고, 검색엔진용 제목은 숨겨 둔다 ── */}
    <link rel="stylesheet" href="/static/about-hero.css?v=20261030g" />
    <section class="abh-hero">
      <h1 class="abh-sr">브랜드의 설득력을 설계하는 크리에이티브 퍼포먼스 — 인애드컴퍼니 회사소개</h1>
      <AboutHero />
      <script src="/static/about-hero.js?v=20261030g" defer></script>
    </section>

    {/* 밴드 등장 — 뷰포트 진입 시 reveal */}
    <script dangerouslySetInnerHTML={{__html: `
(function(){
  var band = document.querySelector('.about-hero-band');
  if (!band) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) { band.classList.add('revealed'); return; }
  if (!('IntersectionObserver' in window)) { band.classList.add('revealed'); return; }
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if (e.isIntersecting) { band.classList.add('revealed'); io.disconnect(); } });
  }, { threshold: 0.2 });
  io.observe(band);
})();
    `}} />

    {/* ══ 라이트 테마 콘텐츠 래퍼 (히어로 제외) ══ */}
    <div class="svc-light">

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
              <p>인애드컴퍼니는 2019년부터 "보이기 위한 광고"보다 "선택받는 이유"를 만드는 데 집중해왔습니다.</p>
              <p>바이럴·인플루언서·유튜브·리뷰·PPL까지 상황에 맞게 조합하되, 기준은 하나입니다: 설득력 있는 메시지. 브랜드 콘텐츠가 널리 닿게 만들고, 그 흐름이 전환으로 이어지도록 끝까지 설계합니다.</p>
            </div>

            {/* 서비스 태그 그리드 — 각 서비스 페이지로 이동 */}
            <div class="ai-services-grid">
              <a class="ai-svc-item" href="/marketing/viral">
                <span class="ai-svc-dot"></span>
                <span class="ai-svc-name">바이럴 마케팅</span>
              </a>
              <a class="ai-svc-item" href="/marketing/influencer">
                <span class="ai-svc-dot"></span>
                <span class="ai-svc-name">인플루언서 마케팅</span>
              </a>
              <a class="ai-svc-item" href="/marketing/seeding">
                <span class="ai-svc-dot"></span>
                <span class="ai-svc-name">체험단 마케팅</span>
              </a>
              <a class="ai-svc-item" href="/marketing/review">
                <span class="ai-svc-dot"></span>
                <span class="ai-svc-name">리뷰 마케팅</span>
              </a>
              <a class="ai-svc-item" href="/marketing/ppl">
                <span class="ai-svc-dot"></span>
                <span class="ai-svc-name">PPL 광고</span>
              </a>
              <a class="ai-svc-item" href="/marketing/oliveyoung">
                <span class="ai-svc-dot"></span>
                <span class="ai-svc-name">올리브영 마케팅</span>
              </a>
            </div>

          </div>

          {/* 오른쪽: 숫자 스토리 (에디토리얼 타이포) */}
          <div class="about-stats-grid about-stats-grid--editorial">
            <div class="astat-card" data-target="2019" data-suffix="년" data-label="설립">
              <div class="astat-num"><span class="astat-counter">2019</span><span class="astat-unit">년</span></div>
              <div class="astat-copy">
                <p class="astat-copy-label">설립</p>
                <p class="astat-copy-desc">7년째, 이론이 아니라 실전에서 배웠습니다</p>
              </div>
            </div>
            <div class="astat-card astat-card--highlight" data-target="37000" data-suffix="+" data-label="완료 캠페인">
              <div class="astat-num"><span class="astat-counter">37,000</span><span class="astat-unit">+</span></div>
              <div class="astat-copy">
                <p class="astat-copy-label">완료 캠페인</p>
                <p class="astat-copy-desc">업종을 가리지 않고, 퍼널 단위로 설계했습니다</p>
              </div>
            </div>
            <div class="astat-card" data-target="1520" data-suffix="+" data-label="크리에이터 DB">
              <div class="astat-num"><span class="astat-counter">1,520</span><span class="astat-unit">+</span></div>
              <div class="astat-copy">
                <p class="astat-copy-label">크리에이터 DB</p>
                <p class="astat-copy-desc">전담 디렉터가 관리하는 자사 크리에이터 DB입니다</p>
              </div>
            </div>
            <div class="astat-card" data-target="50" data-suffix="+" data-label="파트너 브랜드">
              <div class="astat-num"><span class="astat-counter">50</span><span class="astat-unit">+</span></div>
              <div class="astat-copy">
                <p class="astat-copy-label">파트너 브랜드</p>
                <p class="astat-copy-desc">스타트업부터 대기업까지, 함께 성장 중입니다</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    {/* ============ HISTORY (홈에서 이관) ============ */}
    <section class="section history-section" id="history">
      <div class="container">

        {/* 헤더 */}
        <div class="hist-head">
          <div>
            <span class="sec-label">Company Growth</span>
            <h2 class="sec-title hist-title">IN AD <em>HISTORY</em></h2>
            <p class="hist-subtitle">2019 – 2026 Continuous Growth</p>
          </div>
        </div>

        {/* SVG 성장 곡선 + 노드 컨테이너 */}
        <div class="hist-track-wrap" id="histTrackWrap">

          {/* 배경 SVG 곡선 */}
          <svg class="hist-curve-svg" viewBox="0 0 1200 260" preserveAspectRatio="none" aria-hidden="true">
            {/* 글로우 선 */}
            <path class="hist-curve-glow"
              d="M 0,220 C 100,210 180,200 250,185 C 330,168 390,148 470,128 C 550,108 610,92 690,75 C 770,58 840,44 920,32 C 980,22 1050,16 1200,12"
              fill="none" />
            {/* 메인 선 */}
            <path class="hist-curve-line"
              d="M 0,220 C 100,210 180,200 250,185 C 330,168 390,148 470,128 C 550,108 610,92 690,75 C 770,58 840,44 920,32 C 980,22 1050,16 1200,12"
              fill="none" />
          </svg>

          {/* 노드 8개 — 각 연도 */}
          {[
            {
              year: '2019', label: '설립 및 런칭', pos: 12,
              items: ['인아웃컴퍼니 설립', '카페 바이럴 런칭'],
              now: false
            },
            {
              year: '2020', label: '서비스 확장', pos: 24,
              items: ['확장 이전', 'SNS 채널 런칭', '커뮤니티 바이럴 런칭'],
              now: false
            },
            {
              year: '2021', label: '브랜드 재정립', pos: 36,
              items: ['"인애드컴퍼니" 사명 변경'],
              now: false
            },
            {
              year: '2022', label: '법인 전환 & 도약', pos: 48,
              items: ['주식회사 전환', '유튜브 마케팅 런칭', '2차 가공 콘텐츠 런칭'],
              now: false
            },
            {
              year: '2023', label: '조직 전문화', pos: 60,
              items: ['확장 이전', '유튜브 에이전시 팀'],
              now: false
            },
            {
              year: '2024', label: '시스템 고도화', pos: 72,
              items: ['퍼스널 마케팅 구축', '브랜딩 TF팀 구축', '유튜브 릴리즈 개발'],
              now: false
            },
            {
              year: '2025', label: '업무 시스템 자동화', pos: 84,
              items: ['사내 인트라넷 구축', '카피하우스 자동화 개발'],
              now: false
            },
            {
              year: '2026', label: '글로벌 & 퍼포먼스', pos: 96,
              items: ['콘텐츠 마케팅 정립', '글로벌 마케팅 런칭', '퍼포먼스 마케팅 런칭'],
              now: true
            }
          ].map((node) => (
            <div
              class={`hn-node${node.now ? ' hn-node--future' : ''}`}
              style={`left:${node.pos}%`}
              data-year={node.year}
            >
              {/* 동그라미 */}
              <div class="hn-circle">
                <span class="hn-circle-inner"></span>
                <span class="hn-pulse"></span>
              </div>

              {/* 툴팁 카드 */}
              <div class="hn-card">
                <div class="hn-card-year">{node.year}{node.now && <span class="hn-future-badge">예정</span>}</div>
                <div class="hn-card-title">{node.label}</div>
                <ul class="hn-card-list">
                  {node.items.map(item => <li>{item}</li>)}
                </ul>
              </div>

              {/* 연도 라벨 (평소에 보임) */}
              <span class="hn-year-label">{node.year}</span>
            </div>
          ))}

        </div>{/* /hist-track-wrap */}
      </div>

      {/* 곡선 드로잉 + 노드 순차 등장 (home.js에서 이관) */}
      <script dangerouslySetInnerHTML={{__html: `
(function(){
  var histSection = document.querySelector('.history-section');
  if(!histSection) return;
  var triggered = false;

  var nodes = histSection.querySelectorAll('.hn-node');
  nodes.forEach(function(n){
    n.style.opacity = '0';
    n.style.transform = 'translateY(20px) scale(0.8)';
    n.style.transition = 'none';
  });

  var line = histSection.querySelector('.hist-curve-line');
  if(line){
    var len = line.getTotalLength ? line.getTotalLength() : 1800;
    line.style.strokeDasharray = len;
    line.style.strokeDashoffset = len;
    line.style.transition = 'none';
  }
  var glow = histSection.querySelector('.hist-curve-glow');
  if(glow){
    var glen = glow.getTotalLength ? glow.getTotalLength() : 1800;
    glow.style.strokeDasharray = glen;
    glow.style.strokeDashoffset = glen;
    glow.style.transition = 'none';
  }

  function runAnim(){
    if(triggered) return;
    var rect = histSection.getBoundingClientRect();
    if(rect.top > window.innerHeight - 80) return;
    triggered = true;

    if(line){
      line.style.transition = 'stroke-dashoffset 1.8s cubic-bezier(0.4,0,0.2,1)';
      line.style.strokeDashoffset = '0';
    }
    if(glow){
      glow.style.transition = 'stroke-dashoffset 1.8s cubic-bezier(0.4,0,0.2,1) 0.1s';
      glow.style.strokeDashoffset = '0';
    }

    nodes.forEach(function(n, i){
      var delay = 0.3 + i * 0.18;
      setTimeout(function(){
        n.style.transition = 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.34,1.56,0.64,1)';
        n.style.opacity = '1';
        n.style.transform = 'translateY(0) scale(1)';
      }, delay * 1000);
    });
  }

  window.addEventListener('scroll', runAnim, { passive: true });
  runAnim();
})();
      `}} />
    </section>

    {/* ── 비즈니스 파트너 섹션 ── */}
    <section class="about-partner-section">
      <div class="aptn-bg-orb aptn-bg-orb--a"></div>
      <div class="aptn-bg-orb aptn-bg-orb--b"></div>

      <div class="container" style="position:relative;z-index:1">

        {/* 섹션 헤더 */}
        <div class="aptn-header">
          <p class="aptn-eyebrow">OUR IDENTITY</p>
          <h2 class="aptn-main-title">비즈니스 파트너</h2>
          <p class="aptn-main-sub">인애드컴퍼니는 일을 받아 처리하는 대행사가 아닙니다.<br />브랜드의 성장을 같이 고민하고, 끝까지 함께 가는 파트너입니다.</p>
        </div>

        {/* ── 수렴 플로우 다이어그램 ── */}
        <div class="aptn-converge" id="aptnConverge">

          {/* 상단 영역: 3개 스텝 카드 + Canvas (선은 여기서 그려짐) */}
          <div class="aptn-converge-top" id="aptnConvergeTop">

            {/* 상단 3개 스텝 */}
            <div class="aptn-converge-steps">

              {/* STEP 01 */}
              <div class="aptn-converge-step aptn-converge-step--left" data-step="0">
                <div class="aptn-step-badge">STEP 01</div>
                <div class="aptn-step-card">
                  <div class="aptn-step-icon-wrap">
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                      <path d="M14 4L17.5 10.5H24L19 15L21 22L14 18L7 22L9 15L4 10.5H10.5L14 4Z" stroke="rgba(37,70,158,0.9)" stroke-width="1.6" stroke-linejoin="round" fill="rgba(37,70,158,0.1)"/>
                    </svg>
                  </div>
                  <strong class="aptn-step-title">차별화된 솔루션</strong>
                  <p class="aptn-step-desc">브랜드의 강점과 경쟁 환경을 뜯어보고, 남들과 다르게 갈 채널부터 정합니다.</p>
                  <ul class="aptn-step-list">
                    <li>브랜드 심층 분석</li>
                    <li>맞춤 채널 기획</li>
                    <li>경쟁 차별화 전략</li>
                  </ul>
                </div>
              </div>

              {/* STEP 02 */}
              <div class="aptn-converge-step aptn-converge-step--center" data-step="1">
                <div class="aptn-step-badge aptn-step-badge--accent">STEP 02</div>
                <div class="aptn-step-card aptn-step-card--accent">
                  <div class="aptn-step-icon-wrap aptn-step-icon-wrap--accent">
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                      <polyline points="4,20 10,13 16,17 24,7" stroke="rgba(41,200,130,0.9)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <polyline points="20,7 24,7 24,11" stroke="rgba(41,200,130,0.9)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                  <strong class="aptn-step-title">사업 성장 유도</strong>
                  <p class="aptn-step-desc">노출→유입→전환의 풀퍼널 구조로 매출과 인지도를 함께 끌어올립니다.</p>
                  <ul class="aptn-step-list">
                    <li>풀퍼널 캠페인 운영</li>
                    <li>전환율 최적화</li>
                    <li>성과 데이터 분석</li>
                  </ul>
                </div>
              </div>

              {/* STEP 03 */}
              <div class="aptn-converge-step aptn-converge-step--right" data-step="2">
                <div class="aptn-step-badge">STEP 03</div>
                <div class="aptn-step-card">
                  <div class="aptn-step-icon-wrap">
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                      <circle cx="14" cy="14" r="9" stroke="rgba(37,70,158,0.9)" stroke-width="1.6"/>
                      <circle cx="14" cy="14" r="4" fill="rgba(37,70,158,0.3)" stroke="rgba(37,70,158,0.9)" stroke-width="1.6"/>
                      <circle cx="14" cy="14" r="1.5" fill="rgba(37,70,158,0.9)"/>
                    </svg>
                  </div>
                  <strong class="aptn-step-title">브랜딩 강화</strong>
                  <p class="aptn-step-desc">소비자가 브랜드를 자연스럽게 기억하고, 다시 찾게 만듭니다.</p>
                  <ul class="aptn-step-list">
                    <li>브랜드 아이덴티티 구축</li>
                    <li>소비자 신뢰도 향상</li>
                    <li>지속 생태계 설계</li>
                  </ul>
                </div>
              </div>

            </div>
            {/* /상단 스텝 */}

            {/* Canvas — convergeEl 전체를 덮는 절대 레이어 (JS가 위치 설정) */}
            <canvas id="cvgCanvas" class="aptn-cvg-canvas" aria-hidden="true"></canvas>

          </div>
          {/* /aptn-converge-top */}

          {/* 비즈니스 파트너 결과 카드 — 선 수렴 완료 후 등장 */}
          <div class="aptn-converge-result" id="aptnConvergeResult">
            {/* 외부 글로우 링들 */}
            <div class="aptn-result-ring aptn-result-ring--outer"></div>
            <div class="aptn-result-ring aptn-result-ring--mid"></div>
            <div class="aptn-result-ring aptn-result-ring--inner"></div>
            {/* 메인 카드 */}
            <div class="aptn-result-card">
              <div class="aptn-result-card-inner">
                <div class="aptn-result-icon-wrap">
                  <span class="aptn-result-icon">{icon('handshake')}</span>
                </div>
                <strong class="aptn-result-label">Business Partner</strong>
                <p class="aptn-result-tagline">STRATEGY · GROWTH · IDENTITY</p>
                <p class="aptn-result-sub">한 번의 캠페인이 아니라,<br />브랜드의 다음 단계까지 설계합니다</p>
                <div class="aptn-result-divider"></div>
                <div class="aptn-result-metrics">
                  <div class="aptn-result-metric">
                    <span class="aptn-result-metric-val">320<em>+</em></span>
                    <span class="aptn-result-metric-key">Projects</span>
                  </div>
                  <div class="aptn-result-metric-sep"></div>
                  <div class="aptn-result-metric">
                    <span class="aptn-result-metric-val">98<em>%</em></span>
                    <span class="aptn-result-metric-key">Retention</span>
                  </div>
                  <div class="aptn-result-metric-sep"></div>
                  <div class="aptn-result-metric">
                    <span class="aptn-result-metric-val">6<em>yr</em></span>
                    <span class="aptn-result-metric-key">Expertise</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        {/* /수렴 플로우 */}
        {/* /수렴 플로우 */}

        {/* ── VISION / MISSION ── */}
        <div class="aptn-vm-section">
          <div class="aptn-vm-divider">
            <span class="aptn-vm-divider-line"></span>
            <span class="aptn-vm-divider-badge">CORE VALUES</span>
            <span class="aptn-vm-divider-line"></span>
          </div>

          <div class="aptn-vm-row">
            {/* VISION */}
            <div class="aptn-vm-item aptn-vm-item--vision">
              <div class="aptn-vm-item-icon">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <circle cx="11" cy="11" r="8" stroke="rgba(37,70,158,0.8)" stroke-width="1.5"/>
                  <circle cx="11" cy="11" r="3" fill="rgba(37,70,158,0.9)"/>
                  <line x1="11" y1="1" x2="11" y2="4" stroke="rgba(37,70,158,0.6)" stroke-width="1.5" stroke-linecap="round"/>
                  <line x1="11" y1="18" x2="11" y2="21" stroke="rgba(37,70,158,0.6)" stroke-width="1.5" stroke-linecap="round"/>
                  <line x1="1" y1="11" x2="4" y2="11" stroke="rgba(37,70,158,0.6)" stroke-width="1.5" stroke-linecap="round"/>
                  <line x1="18" y1="11" x2="21" y2="11" stroke="rgba(37,70,158,0.6)" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </div>
              <div class="aptn-vm-item-content">
                <span class="aptn-vm-item-label">VISION</span>
                <p class="aptn-vm-item-text">오직 고객사의 <strong>매출과 성장</strong>을 위해,<br />검색부터 재구매까지 <strong>퍼널 전 단계</strong>를 설계합니다.</p>
              </div>
            </div>

            {/* 구분선 */}
            <div class="aptn-vm-sep-v"></div>

            {/* MISSION */}
            <div class="aptn-vm-item aptn-vm-item--mission">
              <div class="aptn-vm-item-icon aptn-vm-item-icon--mission">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path d="M11 3L13.5 8.5L20 9.3L15.5 13.5L16.8 20L11 16.8L5.2 20L6.5 13.5L2 9.3L8.5 8.5L11 3Z" stroke="rgba(37,70,158,0.8)" stroke-width="1.5" stroke-linejoin="round" fill="rgba(37,70,158,0.08)"/>
                </svg>
              </div>
              <div class="aptn-vm-item-content">
                <span class="aptn-vm-item-label aptn-vm-item-label--mission">MISSION</span>
                <p class="aptn-vm-item-text">고객사의 <strong>성장</strong>에 전력을 다하는<br />진정한 <strong>비즈니스 파트너</strong>가 됩니다.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

    {/* ── 클라이언트 섹션 제거(2026-07) — 파트너 로고 흐름은 홈 히어로 아래 마퀴로 이동 ── */}

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
                  <p class="ldl-value">경기도 안산시 단원구 고잔로 51<br />타워아이즈빌 2층 204호</p>
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
                  <a href="mailto:tnaks6325@inadcompany.com" class="ldl-value ldl-link">tnaks6325@inadcompany.com</a>
                </div>
              </li>
              <li class="ldl-item">
                <div class="ldl-icon">
                  <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><path d="M12 6v6l4 2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
                </div>
                <div>
                  <span class="ldl-label">운영시간</span>
                  <p class="ldl-value">평일 09:30 – 18:00<br /><span class="ldl-note">주말 및 공휴일 휴무</span></p>
                </div>
              </li>
            </ul>
            <a href="/contact" class="why-cta cta-inq-btn cta-inq-btn--block">
              <span>문의하기</span>
              <svg class="why-cta-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>
            </a>
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
      html: '<div style="width:36px;height:36px;background:#25469E;border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:3px solid #fff;box-shadow:0 3px 12px rgba(37,70,158,0.6);position:relative">' +
            '<div style="width:10px;height:10px;background:#fff;border-radius:50%;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)"></div></div>',
      iconSize: [36, 36],
      iconAnchor: [18, 36],
      popupAnchor: [0, -40]
    });
    markerInstance = L.marker([lat, lng], { icon: icon }).addTo(mapInstance);
    markerInstance.bindPopup(
      '<div style="font-family:inherit;padding:4px 2px">' +
      '<strong style="font-size:14px;color:#25469E">인애드컴퍼니</strong><br>' +
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
    var isYear = target >= 1990 && target <= 2100;
    var from = isYear ? target : 0;
    function step(ts) {
      if (!startTime) startTime = ts;
      var progress = Math.min((ts - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var val = Math.floor(from + (target - from) * eased);
      el.textContent = isYear ? String(val) : val.toLocaleString();
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = isYear ? String(target) : target.toLocaleString();
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

  /* ══ 수렴 플로우 Canvas 애니메이션 ══ */
  (function() {
    function run() {
      var convergeEl = document.getElementById('aptnConverge');
      var topEl      = document.getElementById('aptnConvergeTop');
      var canvas     = document.getElementById('cvgCanvas');
      var resultEl   = document.getElementById('aptnConvergeResult');
      if (!convergeEl || !topEl || !canvas || !resultEl) return;

      var steps = convergeEl.querySelectorAll('.aptn-converge-step');
      var ctx   = canvas.getContext('2d');

      /* ── Canvas를 convergeEl 전체에 절대 포지션으로 오버레이 ──
         convergeEl 은 CSS에서 position:relative 이므로 canvas를 그 위에 덮음
         단, pointer-events:none + z-index:0 이라 클릭/터치 방해 없음          */
      convergeEl.style.position = 'relative';
      canvas.style.position  = 'absolute';
      canvas.style.top       = '0';
      canvas.style.left      = '0';
      canvas.style.pointerEvents = 'none';
      canvas.style.zIndex    = '0';

      function resizeCanvas() {
        var r = convergeEl.getBoundingClientRect();
        canvas.width  = r.width;
        canvas.height = r.height;
        canvas.style.width  = r.width  + 'px';
        canvas.style.height = r.height + 'px';
      }
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);

      var fired = false;

      var io = new IntersectionObserver(function(entries) {
        if (!entries[0].isIntersecting || fired) return;
        fired = true;
        io.disconnect();

        /* ① 3개 스텝 카드 순차 등장 (0 / 150 / 300 ms) */
        steps.forEach(function(s, i) {
          setTimeout(function() { s.classList.add('is-visible'); }, i * 150);
        });

        /* ② 모든 카드 transition 완료 후 선 그리기 시작
             가장 늦은 카드: 300ms delay + 700ms transition = 1000ms
             → 1100ms 에 좌표 읽어 선 그리기 시작 (여유 100ms)               */
        setTimeout(function() {
          resizeCanvas();

          var baseRect = convergeEl.getBoundingClientRect();

          /* 스텝 카드 하단 중앙 (선 시작점) — 카드 경계 바깥 1px */
          function getCardBottom(stepEl) {
            var card = stepEl.querySelector('.aptn-step-card') || stepEl;
            var r = card.getBoundingClientRect();
            return {
              x: (r.left + r.width  / 2) - baseRect.left,
              y: (r.bottom)              - baseRect.top + 1   /* 카드 밖 1px */
            };
          }

          /* 수렴점: Business Partner 카드 상단 중앙 (선 끝점)
             결과 카드는 opacity:0 + transform 으로 숨겨져 있어
             getBoundingClientRect 가 변형된 위치를 반환할 수 있음
             → 측정 순간만 transform 을 none 으로 바꿔 정확한 위치 확보 */
          var resCard = resultEl.querySelector('.aptn-result-card') || resultEl;
          var prevTransition = resultEl.style.transition;
          var prevTransform  = resultEl.style.transform;
          resultEl.style.transition = 'none';
          resultEl.style.transform  = 'none';
          var resR = resCard.getBoundingClientRect();
          resultEl.style.transform  = prevTransform;
          resultEl.style.transition = prevTransition;

          var ex = (resR.left + resR.width / 2) - baseRect.left;
          var ey = resR.top                      - baseRect.top - 6; /* 카드 상단 6px 위 */

          var s0 = getCardBottom(steps[0]);
          var s1 = getCardBottom(steps[1]);
          var s2 = getCardBottom(steps[2]);

          /* 3선 정의 — 시작(sx,sy) → 수렴점(ex,ey) */
          var lineData = [
            { sx: s0.x, sy: s0.y },
            { sx: s1.x, sy: s1.y },
            { sx: s2.x, sy: s2.y }
          ];

          var DUR = 450;   /* ms — 선 그리기 총 시간 */
          var t0  = null;

          function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

          function drawLines(ts) {
            if (!t0) t0 = ts;
            var prog = Math.min((ts - t0) / DUR, 1);
            var e    = easeOutCubic(prog);

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            lineData.forEach(function(ln, idx) {
              /* 현재 선 끝점: 시작 → 수렴점을 e 비율만큼 진행 */
              var mx = ln.sx + (ex - ln.sx) * e;
              var my = ln.sy + (ey - ln.sy) * e;

              /* 그라데이션: 카드 하단(연한 파랑) → 수렴점(밝은 파랑) */
              var grad = ctx.createLinearGradient(ln.sx, ln.sy, mx, my);
              grad.addColorStop(0,   'rgba(37,70,158,0.45)');
              grad.addColorStop(0.5, 'rgba(85,113,192,0.80)');
              grad.addColorStop(1,   'rgba(169,182,220,0.95)');

              ctx.beginPath();
              ctx.moveTo(ln.sx, ln.sy);
              ctx.lineTo(mx, my);
              ctx.strokeStyle = grad;
              ctx.lineWidth   = idx === 1 ? 2.5 : 1.8;
              ctx.lineCap     = 'round';
              ctx.shadowBlur  = 8;
              ctx.shadowColor = 'rgba(37,70,158,0.45)';
              ctx.stroke();
              ctx.shadowBlur  = 0;
            });

            if (prog < 1) {
              requestAnimationFrame(drawLines);
            } else {
              /* ③ 선 3개 모두 수렴 완료 → Business Partner 카드 등장 */
              resultEl.classList.add('is-visible');
            }
          }

          requestAnimationFrame(drawLines);

        }, 1100);

      }, { threshold: 0.15 });

      io.observe(convergeEl);
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        requestAnimationFrame(function() { requestAnimationFrame(run); });
      });
    } else {
      requestAnimationFrame(function() { requestAnimationFrame(run); });
    }
  })();
})();
    `}} />
    </div>{/* /svc-light */}
  </>
)