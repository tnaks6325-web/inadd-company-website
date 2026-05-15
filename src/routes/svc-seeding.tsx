export const SvcSeedingPage = () => (
  <>
    <section class="vh-hero">
      <canvas id="vhCanvas3" class="vh-canvas"></canvas>
      <div class="vh-bg">
        <div class="vh-orb vh-orb--1" style="background:radial-gradient(circle,rgba(16,185,129,0.24) 0%,transparent 70%)"></div>
        <div class="vh-orb vh-orb--2" style="background:radial-gradient(circle,rgba(6,182,212,0.18) 0%,transparent 70%)"></div>
        <div class="vh-orb vh-orb--3" style="background:radial-gradient(circle,rgba(26,107,255,0.18) 0%,transparent 70%)"></div>
        <div class="vh-grid"></div>
        <div class="vh-noise"></div>
      </div>

      <div class="container vh-inner">
        <a href="/marketing" class="svc-back-link vh-back">← Marketing 전체보기</a>

        <div class="vh-badge" style="color:rgba(16,185,129,0.95);border-color:rgba(16,185,129,0.35);background:rgba(16,185,129,0.08)">
          <span class="vh-badge-dot" style="background:rgba(16,185,129,1);box-shadow:0 0 8px rgba(16,185,129,0.9)"></span>
          <span>SEEDING CAMPAIGN</span>
        </div>

        <h1 class="vh-title">
          <span class="vh-tline" id="sdL1">브랜드의 씨앗을 심어</span>
          <span class="vh-tline" id="sdL2" style="background:linear-gradient(135deg,#fff 20%,rgba(16,185,129,0.95) 60%,rgba(6,182,212,0.85) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">자연스러운 성장을 유도합니다.</span>
        </h1>

        <div class="vh-sub-wrap" id="sdSub">
          <p class="vh-sub"><strong style="color:rgba(255,255,255,0.9)">검색 최적화와 브랜드 신뢰도 구축</strong>을 위한 전략적 콘텐츠 배포로,</p>
          <p class="vh-sub">소비자가 브랜드를 스스로 발견하고 경험하도록 만듭니다.</p>
          <p class="vh-sub" style="margin-top:12px">다양한 플랫폼에 최적화된 시딩 전략으로 <span style="color:rgba(16,185,129,0.9);font-weight:600">강력한 바이럴 효과를 창출합니다.</span></p>
        </div>

        <div class="vh-kpi-strip" id="sdKpi"></div>
        <script dangerouslySetInnerHTML={{__html:`(function(){
          fetch('/api/admin/public/hero-kpi/seeding')
            .then(function(r){return r.json();})
            .then(function(d){
              var el=document.getElementById('sdKpi');if(!el||!d.kpi)return;
              el.innerHTML=d.kpi.map(function(k,i){
                return (i>0?'<div class="vh-kpi-sep"></div>':'')
                  +'<div class="vh-kpi-item">'
                  +'<strong class="vh-kpi-num">'+k.num+'</strong>'
                  +'<span class="vh-kpi-label">'+k.label+'</span>'
                  +'</div>';
              }).join('');
            }).catch(function(){});
        })();`}} />

        <div class="vh-btns" id="sdBtns">
          <a href="/contact" class="hero-cta-btn primary">
            <span>무료 전략 상담받기</span>
            <svg viewBox="0 0 24 24" fill="none"><path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
          <a href="#svc-intro" class="vh-scroll-btn">
            <span>자세히 보기</span>
            <svg viewBox="0 0 24 24" fill="none" width="15" height="15"><path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
        </div>
      </div>

      <div class="vh-scroll-hint">
        <div class="vh-scroll-mouse"><div class="vh-scroll-wheel"></div></div>
      </div>

      <script dangerouslySetInnerHTML={{ __html: `
(function(){
  var s=document.createElement('script');
  s.src='/static/svc-three-bg.js';
  s.onload=function(){ initSvcThreeBg(0x10b981, 0x06b6d4, 0x1a6bff); };
  document.head.appendChild(s);
  function anim(el,delay,dir){if(!el)return;el.style.opacity='0';el.style.transform=dir==='up'?'translateY(32px)':'translateX(-32px)';el.style.transition='opacity .9s cubic-bezier(.25,.46,.45,.94),transform .9s cubic-bezier(.25,.46,.45,.94)';setTimeout(function(){el.style.opacity='1';el.style.transform='none';},delay);}
  anim(document.getElementById('sdL1'),200,'left');
  anim(document.getElementById('sdL2'),440,'left');
  anim(document.getElementById('sdSub'),700,'up');
  anim(document.getElementById('sdKpi'),940,'up');
  anim(document.getElementById('sdBtns'),1140,'up');
})();
      `}} />
    </section>

    <section class="section svc-intro-section">
      <div class="svc-bg-deco"><div class="svc-grid-lines"></div><div class="svc-orb-right"></div></div>
      <div class="container">
        <div class="svc-intro-grid">
          <div class="svc-intro-text">
            <span class="sec-label">What We Do</span>
            <h2 class="sec-title">소비자가<br /><em>먼저 말하게 합니다</em></h2>
            <p>단순 체험단이 아닙니다. 브랜드의 핵심 타겟을 정밀하게 선별하고, 실제 사용 경험을 자연스럽게 콘텐츠로 남기도록 설계합니다. 진정성 있는 후기 하나가 수백 개의 광고보다 강력합니다.</p>
            <p>플랫폼별 최적화된 리뷰 배포로 검색 결과부터 SNS까지 브랜드 신뢰 생태계를 구축합니다.</p>
            <ul class="svc-feature-list">
              <li><span class="sfl-dot"></span>타겟 체험단 모집 및 관리</li>
              <li><span class="sfl-dot"></span>진정성 있는 후기 콘텐츠 생성</li>
              <li><span class="sfl-dot"></span>플랫폼별 최적화 리뷰 배포</li>
              <li><span class="sfl-dot"></span>리뷰 전환율 분석 및 최적화</li>
              <li><span class="sfl-dot"></span>네이버·인스타·블로그 동시 커버</li>
            </ul>
          </div>
          <div class="svc-intro-visual">
            <div class="siv-img-wrap">
              <img src="/static/svc-images/seeding.png" alt="시딩 캠페인 비주얼" class="siv-photo" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ══ 네이버 블로그 시딩 상품군 ══ */}
    <section class="section sdng-products-section" id="sdng-blog">
      <div class="svc-bg-deco"><div class="svc-grid-lines"></div><div class="svc-orb-right"></div><div class="svc-section-glow-top"></div></div>
      <div class="container">

        {/* 좌(타이틀+리스트) / 우(패널) 통합 레이아웃 */}
        <div class="sdng-split-layout" id="sdngBlogInteractive">

          {/* 왼쪽: 타이틀 + 상품 리스트 */}
          <div class="sdng-split-left">
            <div class="sdng-split-head">
              <span class="sec-label">Naver Blog Seeding</span>
              <h2 class="sec-title">네이버 블로그 시딩<br /><em>상품 라인업</em></h2>
              <p class="sec-sub">검색 최적화와 신뢰도 기반의 콘텐츠 마케팅.<br />브랜드 목표와 예산에 맞는 최적의 블로그 시딩 상품을 선택하세요.</p>
            </div>
            <ul class="svc-list" id="sdngBlogList">
            <li class="svc-list-item active" data-sdng="0">
              <a href="#sdng-blog">
                <span class="svc-list-num">01</span>
                <span class="svc-list-name">일반 블로거</span>
              </a>
            </li>
            <li class="svc-list-item" data-sdng="1">
              <a href="#sdng-blog">
                <span class="svc-list-num">02</span>
                <span class="svc-list-name">특화 블로거</span>
              </a>
            </li>
            <li class="svc-list-item sdng-list-best" data-sdng="2">
              <a href="#sdng-blog">
                <span class="svc-list-num">03</span>
                <span class="svc-list-name">상위노출 보장</span>
                <span class="sdng-list-best-badge">BEST</span>
              </a>
            </li>
            <li class="svc-list-item" data-sdng="3">
              <a href="#sdng-blog">
                <span class="svc-list-num">04</span>
                <span class="svc-list-name">네이버 인플루언서</span>
              </a>
            </li>
          </ul>
          </div>{/* /sdng-split-left */}

          {/* 오른쪽: 비주얼 패널 */}
          <div class="sdng-split-right">
          <div class="svc-visual" id="sdngBlogVisual">

            {/* 패널 0 — 일반 블로거 */}
            <div class="svc-panel active" data-sdng-panel="0" style="display:flex">
              <div class="svc-panel-img sdng-img-wrap">
                <img src="/static/seeding-images/blog-general-new.png" alt="일반 블로거 시딩" class="sdng-panel-photo" />
                <span class="sdng-panel-badge sdng-panel-badge--basic">Basic</span>
              </div>
              <div class="svc-panel-info">
                <span class="svc-panel-tag">General Blogger</span>
                <p class="svc-panel-desc">
                  다양한 분야의 일반 블로거를 활용한 <strong>가성비 높은 시딩 방식</strong>입니다.<br />
                  넓은 독자층을 대상으로 브랜드를 자연스럽게 노출하며, 진정성 있는 후기로 소비자 신뢰를 쌓습니다.<br /><br />
                  대량 배포와 검색 유입 기반 구축에 최적화된 엔트리 상품입니다.
                </p>
                <div class="svc-panel-tags">
                  <p class="svc-ptag-label">SERVICE KEYWORDS</p>
                  <div class="svc-ptag-grid">
                    <span class="svc-ptag">📝 체험 후기</span>
                    <span class="svc-ptag">🔍 키워드 최적화</span>
                    <span class="svc-ptag">📊 성과 리포트</span>
                    <span class="svc-ptag">📣 대량 확산</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 패널 1 — 특화 블로거 */}
            <div class="svc-panel" data-sdng-panel="1" style="display:none">
              <div class="svc-panel-img sdng-img-wrap">
                <img src="/static/seeding-images/blog-specialized-new.jpg" alt="특화 블로거 시딩" class="sdng-panel-photo" />
                <span class="sdng-panel-badge sdng-panel-badge--specialized">Specialized</span>
              </div>
              <div class="svc-panel-info">
                <span class="svc-panel-tag">Specialized Blogger</span>
                <p class="svc-panel-desc">
                  뷰티, 식품, 육아, 여행 등 <strong>특정 분야 전문 블로거</strong>를 활용합니다.<br />
                  해당 분야의 충성 독자를 보유하고 있어 정밀한 타겟팅이 가능하며, 전문성 있는 콘텐츠로 높은 신뢰도를 형성합니다.<br /><br />
                  카테고리 특화 바이럴에 가장 효과적인 상품입니다.
                </p>
                <div class="svc-panel-tags">
                  <p class="svc-ptag-label">SPECIALTY AREAS</p>
                  <div class="svc-ptag-grid">
                    <span class="svc-ptag">💄 뷰티 특화</span>
                    <span class="svc-ptag">🍽 식품 특화</span>
                    <span class="svc-ptag">👶 육아 특화</span>
                    <span class="svc-ptag">✈️ 여행 특화</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 패널 2 — 상위 노출 보장 (BEST) */}
            <div class="svc-panel sdng-panel--best" data-sdng-panel="2" style="display:none">
              <div class="svc-panel-img sdng-img-wrap">
                <img src="/static/seeding-images/blog-ranking-new.jpg" alt="상위노출 보장 시딩" class="sdng-panel-photo" />
                <span class="sdng-panel-badge sdng-panel-badge--ranking">Guaranteed Top</span>
                <div class="sdng-best-crown">
                  <span class="sdng-best-crown-icon">👑</span>
                  <span class="sdng-best-crown-text">BEST</span>
                </div>
              </div>
              <div class="svc-panel-info sdng-best-info">
                <div class="sdng-best-header">
                  <span class="sdng-best-tag">🏆 베스트 추천 상품</span>
                </div>
                <span class="svc-panel-tag">Guaranteed Top Ranking</span>
                <p class="svc-panel-desc">
                  네이버 블로그 검색 결과 <strong>상위 노출을 보장</strong>하는 프리미엄 시딩 상품입니다.<br />
                  SEO 최적화 콘텐츠와 전략적 키워드 배치로 검색 유입을 극대화하고, 성과를 수치로 증명합니다.<br /><br />
                  키워드 경쟁이 치열한 카테고리에 필수적인 전략 상품입니다.
                </p>
                <div class="svc-panel-tags">
                  <p class="svc-ptag-label">SERVICE KEYWORDS</p>
                  <div class="svc-ptag-grid">
                    <span class="svc-ptag">🏆 TOP 노출 보장</span>
                    <span class="svc-ptag">🔑 키워드 전략</span>
                    <span class="svc-ptag">📈 검색 유입 극대화</span>
                    <span class="svc-ptag">✅ SEO 최적화</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 패널 3 — 네이버 인플루언서 */}
            <div class="svc-panel" data-sdng-panel="3" style="display:none">
              <div class="svc-panel-img sdng-img-wrap">
                <img src="/static/seeding-images/blog-influencer-new.jpg" alt="네이버 인플루언서 시딩" class="sdng-panel-photo" />
                <span class="sdng-panel-badge sdng-panel-badge--premium">Premium</span>
              </div>
              <div class="svc-panel-info">
                <span class="svc-panel-tag">Naver Influencer</span>
                <p class="svc-panel-desc">
                  네이버가 <strong>공식 인증한 인플루언서</strong>를 활용하는 최고 등급의 시딩 상품입니다.<br />
                  높은 팔로워와 강력한 신뢰도를 바탕으로 브랜드 인지도와 매출을 동시에 끌어올립니다.<br /><br />
                  프리미엄 콘텐츠 퀄리티와 최대 확산력으로 브랜드 가치를 극대화합니다.
                </p>
                <div class="svc-panel-tags">
                  <p class="svc-ptag-label">SERVICE KEYWORDS</p>
                  <div class="svc-ptag-grid">
                    <span class="svc-ptag">👑 공식 인증 인플루언서</span>
                    <span class="svc-ptag">⭐ 프리미엄 콘텐츠</span>
                    <span class="svc-ptag">🚀 최대 확산력</span>
                    <span class="svc-ptag">💎 브랜드 가치 극대화</span>
                  </div>
                </div>
              </div>
            </div>

          </div>{/* /svc-visual */}
          </div>{/* /sdng-split-right */}
        </div>{/* /sdng-split-layout */}
      </div>

      <script dangerouslySetInnerHTML={{ __html: `
(function(){
  function initBlogTab() {
    var list = document.getElementById('sdngBlogList');
    var visual = document.getElementById('sdngBlogVisual');
    if(!list || !visual) return;
    var items = list.querySelectorAll('.svc-list-item');
    var panels = visual.querySelectorAll('.svc-panel');

    function activate(idx) {
      items.forEach(function(el){ el.classList.remove('active'); });
      panels.forEach(function(el){
        el.classList.remove('active');
        el.style.display = 'none';
      });
      items[idx].classList.add('active');
      if(panels[idx]) {
        panels[idx].classList.add('active');
        panels[idx].style.display = 'flex';
      }
    }

    /* 초기화: 첫 번째 패널만 표시 */
    panels.forEach(function(el, i){
      el.style.display = i === 0 ? 'flex' : 'none';
    });

    items.forEach(function(item, i){
      item.addEventListener('click', function(e){
        e.preventDefault();
        activate(i);
      });
    });
  }
  if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBlogTab);
  } else {
    initBlogTab();
  }
})();
      `}} />
    </section>

    {/* ══ 인스타그램 시딩 상품군 ══ */}
    <section class="section sdng-products-section" id="sdng-insta">
      <div class="svc-bg-deco"><div class="svc-dot-pattern"></div><div class="svc-orb-left"></div><div class="svc-section-glow-top"></div></div>
      <div class="container">

        {/* 좌(타이틀+특징+리스트) / 우(패널) 통합 레이아웃 */}
        <div class="sdng-split-layout sdng-split-layout--insta" id="sdngInstaInteractive">

          {/* 왼쪽: 타이틀 + 특징 + 상품 리스트 */}
          <div class="sdng-split-left">
            <div class="sdng-split-head">
              <span class="sec-label">Instagram Seeding</span>
              <h2 class="sec-title">인스타그램 시딩<br /><em>상품 라인업</em></h2>
              <p class="sec-sub">해시태그와 캡션을 활용한 소프트 시딩으로 탐색 및 브랜드 인지를 확장합니다.<br />인스타그램 알고리즘 최적화로 자연스러운 브랜드 노출과 참여를 유도합니다.</p>
            </div>

            {/* 인스타 핵심 특징 태그 */}
            <div class="sdng-insta-features">
              <span class="sdng-insta-feat"># 해시태그 유입</span>
              <span class="sdng-insta-feat">👁 시각적 전달</span>
              <span class="sdng-insta-feat">🌿 자연 노출</span>
            </div>

            <ul class="svc-list" id="sdngInstaList">
            <li class="svc-list-item active" data-insta="0">
              <a href="#sdng-insta">
                <span class="svc-list-num">01</span>
                <span class="svc-list-name">일반 피드 시딩</span>
              </a>
            </li>
            <li class="svc-list-item" data-insta="1">
              <a href="#sdng-insta">
                <span class="svc-list-num">02</span>
                <span class="svc-list-name">특화 타깃 시딩</span>
              </a>
            </li>
          </ul>
          </div>{/* /sdng-split-left */}

          {/* 오른쪽: 비주얼 패널 */}
          <div class="sdng-split-right">
          <div class="svc-visual" id="sdngInstaVisual">

            {/* 패널 0 — 일반 피드 시딩 */}
            <div class="svc-panel active" data-insta-panel="0" style="display:flex">
              <div class="svc-panel-img sdng-img-wrap">
                <img src="/static/seeding-images/insta-general-new.jpg" alt="일반 피드 시딩" class="sdng-panel-photo" />
                <span class="sdng-panel-badge sdng-panel-badge--insta-basic">Basic</span>
              </div>
              <div class="svc-panel-info">
                <span class="svc-panel-tag">General Feed Seeding</span>
                <p class="svc-panel-desc">
                  일반 계정을 활용해 <strong>이미지 중심의 정보 전달</strong>과 해시태그 검색 유입을 최적화합니다.<br />
                  자연스러운 피드 콘텐츠로 브랜드를 노출하여 광고 피로감 없이 소비자에게 스며드는 방식입니다.<br /><br />
                  신제품 런칭, 이벤트 홍보, 브랜드 인지도 확산에 최적화된 기본 상품입니다.
                </p>
                <div class="svc-panel-tags">
                  <p class="svc-ptag-label">SERVICE KEYWORDS</p>
                  <div class="svc-ptag-grid">
                    <span class="svc-ptag sdng-insta-ptag">📸 이미지 중심 정보 전달</span>
                    <span class="svc-ptag sdng-insta-ptag"># 해시태그 검색 유입 최적화</span>
                    <span class="svc-ptag sdng-insta-ptag">🌿 자연스러운 브랜드 노출</span>
                    <span class="svc-ptag sdng-insta-ptag">📊 성과 리포트 제공</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 패널 1 — 특화 타깃 시딩 */}
            <div class="svc-panel" data-insta-panel="1" style="display:none">
              <div class="svc-panel-img sdng-img-wrap">
                <img src="/static/seeding-images/insta-specialized-new.jpg" alt="특화 타깃 시딩" class="sdng-panel-photo" />
                <span class="sdng-panel-badge sdng-panel-badge--insta-specialized">Specialized</span>
              </div>
              <div class="svc-panel-info">
                <span class="svc-panel-tag">Specialized Target Seeding</span>
                <p class="svc-panel-desc">
                  특정 타깃층에 맞춘 <strong>해시태그 세트와 위치·카테고리 최적화</strong>로 틈새 커뮤니티를 정밀 공략합니다.<br />
                  뷰티·음식·라이프스타일 등 카테고리별 충성 팔로워를 보유한 계정을 선별하여 높은 참여율을 이끌어냅니다.<br /><br />
                  특정 카테고리 타깃팅이 중요한 브랜드에 가장 효과적인 프리미엄 상품입니다.
                </p>
                <div class="svc-panel-tags">
                  <p class="svc-ptag-label">SERVICE KEYWORDS</p>
                  <div class="svc-ptag-grid">
                    <span class="svc-ptag sdng-insta-ptag sdng-insta-ptag--spec"># 타깃 맞춤 해시태그 세트</span>
                    <span class="svc-ptag sdng-insta-ptag sdng-insta-ptag--spec">📍 위치·카테고리 최적화</span>
                    <span class="svc-ptag sdng-insta-ptag sdng-insta-ptag--spec">🎯 틈새 커뮤니티 공략</span>
                    <span class="svc-ptag sdng-insta-ptag sdng-insta-ptag--spec">💬 높은 참여율 유도</span>
                  </div>
                </div>
              </div>
            </div>

          </div>{/* /svc-visual */}
          </div>{/* /sdng-split-right */}
        </div>{/* /sdng-split-layout */}

        {/* 인스타 시딩 안내 배너 */}
        <div class="sdng-insta-banner">
          <div class="sdng-insta-banner-icon">📱</div>
          <div class="sdng-insta-banner-text">
            <strong>인스타그램 시딩 · 탐색 탭 & 해시태그 최적화</strong>
            <span>네이버 블로그 시딩과 함께 진행 시 검색과 SNS를 동시에 커버하는 가장 강력한 시딩 조합이 완성됩니다</span>
          </div>
        </div>

      </div>

      <script dangerouslySetInnerHTML={{ __html: `
(function(){
  function initInstaTab() {
    var list = document.getElementById('sdngInstaList');
    var visual = document.getElementById('sdngInstaVisual');
    if(!list || !visual) return;
    var items = list.querySelectorAll('.svc-list-item');
    var panels = visual.querySelectorAll('.svc-panel');

    function activate(idx) {
      items.forEach(function(el){ el.classList.remove('active'); });
      panels.forEach(function(el){
        el.classList.remove('active');
        el.style.display = 'none';
      });
      items[idx].classList.add('active');
      if(panels[idx]) {
        panels[idx].classList.add('active');
        panels[idx].style.display = 'flex';
      }
    }

    /* 초기화 */
    panels.forEach(function(el, i){
      el.style.display = i === 0 ? 'flex' : 'none';
    });

    items.forEach(function(item, i){
      item.addEventListener('click', function(e){
        e.preventDefault();
        activate(i);
      });
    });
  }
  if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initInstaTab);
  } else {
    initInstaTab();
  }
})();
      `}} />
    </section>

    {/* ══ PROCESS TIMELINE ══ */}
    <section class="section sdtl-section">
      <div class="svc-bg-deco"><div class="svc-grid-lines"></div><div class="svc-orb-left"></div><div class="svc-section-glow-top"></div></div>
      <div class="container">
        <div class="section-head">
          <span class="sec-label">Process</span>
          <h2 class="sec-title">시딩 캠페인<br /><em>진행 프로세스</em></h2>
          <p class="sec-sub">상담부터 최종 리포트까지, 전담 PM이 모든 단계를 함께합니다.</p>
        </div>

        <div class="sdtl-wrap">
          {/* 중앙 라인 */}
          <div class="sdtl-axis">
            <div class="sdtl-axis-line"></div>
          </div>

          {/* STEP 01 */}
          <div class="sdtl-item sdtl-item--left">
            <div class="sdtl-card">
              <div class="sdtl-card-icon" style="--tc:#1a6bff">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              </div>
              <div class="sdtl-card-body">
                <span class="sdtl-card-en">Strategy Consultation</span>
                <h4 class="sdtl-card-title">상담 진행</h4>
                <p class="sdtl-card-desc">브랜드 목표, 예산, 타겟 고객을 분석하고 최적의 시딩 전략을 수립합니다. 캠페인 방향성과 KPI를 명확히 설정합니다.</p>
              </div>
            </div>
            <div class="sdtl-dot" style="--tc:#1a6bff"><span class="sdtl-num">01</span></div>
            <div class="sdtl-spacer"></div>
          </div>

          {/* STEP 02 */}
          <div class="sdtl-item sdtl-item--right">
            <div class="sdtl-spacer"></div>
            <div class="sdtl-dot" style="--tc:#6d28d9"><span class="sdtl-num">02</span></div>
            <div class="sdtl-card">
              <div class="sdtl-card-icon" style="--tc:#6d28d9">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
              </div>
              <div class="sdtl-card-body">
                <span class="sdtl-card-en">Contract &amp; Scope</span>
                <h4 class="sdtl-card-title">계약 진행</h4>
                <p class="sdtl-card-desc">캠페인 범위, 일정, 성과 지표를 문서화합니다. 투명한 비용 구조와 명확한 계약으로 신뢰 관계를 구축합니다.</p>
              </div>
            </div>
          </div>

          {/* STEP 03 */}
          <div class="sdtl-item sdtl-item--left">
            <div class="sdtl-card">
              <div class="sdtl-card-icon" style="--tc:#0891b2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>
              </div>
              <div class="sdtl-card-body">
                <span class="sdtl-card-en">Creative Briefing</span>
                <h4 class="sdtl-card-title">가이드라인 작성</h4>
                <p class="sdtl-card-desc">브랜드 메시지, 톤앤매너, 금지 표현, 핵심 키워드를 담은 콘텐츠 가이드를 제작합니다. 자연스럽고 일관된 후기 생성의 기반이 됩니다.</p>
              </div>
            </div>
            <div class="sdtl-dot" style="--tc:#0891b2"><span class="sdtl-num">03</span></div>
            <div class="sdtl-spacer"></div>
          </div>

          {/* STEP 04 */}
          <div class="sdtl-item sdtl-item--right">
            <div class="sdtl-spacer"></div>
            <div class="sdtl-dot" style="--tc:#059669"><span class="sdtl-num">04</span></div>
            <div class="sdtl-card">
              <div class="sdtl-card-icon" style="--tc:#059669">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <div class="sdtl-card-body">
                <span class="sdtl-card-en">Creator Recruitment</span>
                <h4 class="sdtl-card-title">크리에이터 모집</h4>
                <p class="sdtl-card-desc">브랜드 타겟과 부합하는 블로거·인플루언서를 공개 모집합니다. 지원자의 채널 분석과 활동 이력을 검토합니다.</p>
              </div>
            </div>
          </div>

          {/* STEP 05 */}
          <div class="sdtl-item sdtl-item--left">
            <div class="sdtl-card">
              <div class="sdtl-card-icon" style="--tc:#d97706">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              </div>
              <div class="sdtl-card-body">
                <span class="sdtl-card-en">Creator Selection</span>
                <h4 class="sdtl-card-title">크리에이터 선정</h4>
                <p class="sdtl-card-desc">진정성, 팔로워 품질, 카테고리 적합도를 기준으로 최적의 크리에이터를 선정합니다. 데이터 기반 매칭으로 성과를 극대화합니다.</p>
              </div>
            </div>
            <div class="sdtl-dot" style="--tc:#d97706"><span class="sdtl-num">05</span></div>
            <div class="sdtl-spacer"></div>
          </div>

          {/* STEP 06 */}
          <div class="sdtl-item sdtl-item--right">
            <div class="sdtl-spacer"></div>
            <div class="sdtl-dot" style="--tc:#e11d48"><span class="sdtl-num">06</span></div>
            <div class="sdtl-card">
              <div class="sdtl-card-icon" style="--tc:#e11d48">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              </div>
              <div class="sdtl-card-body">
                <span class="sdtl-card-en">Product Experience</span>
                <h4 class="sdtl-card-title">체험 진행</h4>
                <p class="sdtl-card-desc">선정된 크리에이터에게 제품을 발송하고 실제 사용 경험을 진행합니다. 가이드라인을 기반으로 자연스러운 체험 콘텐츠가 준비됩니다.</p>
              </div>
            </div>
          </div>

          {/* STEP 07 */}
          <div class="sdtl-item sdtl-item--left">
            <div class="sdtl-card">
              <div class="sdtl-card-icon" style="--tc:#7c3aed">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </div>
              <div class="sdtl-card-body">
                <span class="sdtl-card-en">Review Creation</span>
                <h4 class="sdtl-card-title">리뷰 작성</h4>
                <p class="sdtl-card-desc">크리에이터가 가이드라인에 맞춰 진정성 있는 후기를 작성합니다. 브랜드 검수 후 플랫폼에 최적화된 형태로 최종 게시됩니다.</p>
              </div>
            </div>
            <div class="sdtl-dot" style="--tc:#7c3aed"><span class="sdtl-num">07</span></div>
            <div class="sdtl-spacer"></div>
          </div>

          {/* STEP 08 */}
          <div class="sdtl-item sdtl-item--right sdtl-item--last">
            <div class="sdtl-spacer"></div>
            <div class="sdtl-dot sdtl-dot--final" style="--tc:#10b981"><span class="sdtl-num">08</span></div>
            <div class="sdtl-card sdtl-card--final">
              <div class="sdtl-card-icon" style="--tc:#10b981">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
              </div>
              <div class="sdtl-card-body">
                <span class="sdtl-card-en">Performance Report</span>
                <h4 class="sdtl-card-title">리포트</h4>
                <p class="sdtl-card-desc">캠페인 전 기간의 성과를 수치로 정리한 종합 리포트를 제공합니다. 전환율, 검색 유입, 매출 변화를 분석해 다음 캠페인 전략까지 제안합니다.</p>
              </div>
            </div>
          </div>

        </div>{/* /sdtl-wrap */}

        {/* 하단 배너 */}
        <div class="sdtl-footer">
          <span class="sdtl-footer-icon">📋</span>
          <span>모든 단계에서 <strong>전담 PM</strong>이 함께합니다 &nbsp;·&nbsp; 평균 캠페인 기간 <strong>4–6주</strong></span>
        </div>

      </div>
    </section>

    {/* ══ FAQ ══ */}
    <section class="section svc-faq-section">
      <div class="svc-bg-deco"><div class="svc-dot-pattern"></div><div class="svc-orb-right"></div><div class="svc-section-glow-top"></div></div>
      <div class="container">
        <div class="section-head">
          <span class="sec-label">FAQ</span>
          <h2 class="sec-title">자주 하는 질문</h2>
          <p class="sec-sub">시딩 캠페인에 대해 가장 많이 묻는 질문들을 모았습니다.</p>
        </div>
        <div class="faq-wrap" id="faqWrap" data-service="seeding"></div>
        <script dangerouslySetInnerHTML={{__html:`(function(){
          fetch('/api/admin/public/svc-faq/seeding')
            .then(function(r){return r.json();})
            .then(function(data){
              var wrap=document.getElementById('faqWrap');
              if(!wrap||!data.faq)return;
              wrap.innerHTML=data.faq.map(function(item,i){
                return '<div class="faq-item" id="faq-seed-'+i+'">'
                  +'<button class="faq-q" type="button" onclick="(function(btn){var item=btn.closest(\\'.faq-item\\');var isOpen=item.classList.contains(\\'faq-item--open\\');document.querySelectorAll(\\'.faq-item\\').forEach(function(el){el.classList.remove(\\'faq-item--open\\');});if(!isOpen){item.classList.add(\\'faq-item--open\\');}})(this)">'
                  +'<div class="faq-q-left"><span class="faq-q-badge">Q</span><span class="faq-q-text">'+item.q+'</span></div>'
                  +'<span class="faq-chevron"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><polyline points="6 9 12 15 18 9"/></svg></span>'
                  +'</button>'
                  +'<div class="faq-a"><div class="faq-a-inner">'+item.a+'</div></div>'
                  +'</div>';
              }).join('');
            }).catch(function(){});
        })();`}} />
      </div>
    </section>

    <section class="svc-cta-section">
      <div class="container">
        <div class="svc-cta-inner">
          <div class="svc-cta-text">
            <h2>진정성 있는 후기로<br /><em>브랜드 신뢰를 쌓아보세요</em></h2>
            <p>소비자가 먼저 말하게 만드는 시딩 전략을 무료로 진단해드립니다.</p>
          </div>
          <div class="svc-cta-btns">
            <a href="/contact" class="hero-cta-btn primary"><span>무료 상담 신청하기</span><svg viewBox="0 0 24 24" fill="none"><path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
            <button type="button" class="hero-cta-btn ghost" onclick="openCallModal()"><span>📞 바로 전화하기</span></button>
          </div>
        </div>
      </div>
    </section>


    {/* ── Scroll Reveal ── */}
    <script dangerouslySetInnerHTML={{__html: `
(function(){
  var s = document.createElement('script');
  s.src = '/static/scroll-reveal.js';
  document.head.appendChild(s);
})();
    `}} />

    {/* ── Admin Dynamic Marketing Stats ── */}
    <script dangerouslySetInnerHTML={{__html: `
(function(){
  var SVC_KEY = 'seeding';
  fetch('/api/admin/public/marketing')
    .then(function(r){ return r.json(); })
    .then(function(data){
      var svc = data.stats && data.stats[SVC_KEY];
      if(!svc) return;
      var grid = document.querySelector('.svc-result-grid');
      if(!grid) return;
      var cards = grid.querySelectorAll('.srg-card');
      ['case1','case2','case3'].forEach(function(ck, i){
        var c = svc[ck];
        if(!c || !cards[i]) return;
        var card = cards[i];
        var tagEl = card.querySelector('.srg-tag');
        if(tagEl && c.tag) tagEl.textContent = c.tag;
        var metrics = card.querySelectorAll('.srg-metric');
        var mdata = [
          {m:c.m1,l:c.l1},{m:c.m2,l:c.l2},{m:c.m3,l:c.l3}
        ].filter(function(x){ return x.m; });
        mdata.forEach(function(md, mi){
          if(!metrics[mi]) return;
          var strong = metrics[mi].querySelector('strong');
          var span = metrics[mi].querySelector('span');
          if(strong && md.m) strong.textContent = md.m;
          if(span && md.l) span.textContent = md.l;
        });
        var desc = card.querySelector('.srg-desc');
        if(desc && c.desc) desc.textContent = c.desc;
      });
    }).catch(function(){});
})();
    `}} />
  </>
)
