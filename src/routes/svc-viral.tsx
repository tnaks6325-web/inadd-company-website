export const SvcViralPage = () => (
  <>
    {/* ════════════════════════════════════════
        VIRAL HERO — 시네마틱 풀스크린
    ════════════════════════════════════════ */}
    <section class="vh-hero">
      {/* 배경 캔버스 파티클 */}
      <canvas id="vhCanvas" class="vh-canvas"></canvas>

      {/* 배경 레이어 */}
      <div class="vh-bg">
        <div class="vh-orb vh-orb--1"></div>
        <div class="vh-orb vh-orb--2"></div>
        <div class="vh-orb vh-orb--3"></div>
        <div class="vh-grid"></div>
        <div class="vh-noise"></div>
      </div>

      {/* 콘텐츠 */}
      <div class="container vh-inner">
        <a href="/marketing" class="svc-back-link vh-back">← Marketing 전체보기</a>

        {/* 상단 배지 */}
        <div class="vh-badge">
          <span class="vh-badge-dot"></span>
          <span>VIRAL MARKETING</span>
        </div>

        {/* 메인 카피 — 줄별 슬라이드 인 + 글리치 효과 */}
        <h1 class="vh-title">
          <span class="vh-tline" id="vhL1">단순한 광고를 넘어,</span>
          <span class="vh-tline vh-tline--accent" id="vhL2">브랜드와 소비자의<br class="vh-br" />진짜 연결을 만듭니다.</span>
        </h1>

        {/* 서브 카피 — 단어 단위 페이드 인 */}
        <div class="vh-sub-wrap" id="vhSub">
          <p class="vh-sub">콘텐츠의 시작부터 소비자의 기억에 남는 순간까지.</p>
          <p class="vh-sub">온라인 채널 속 깊숙이 파고들어 정교한 마케팅으로</p>
          <p class="vh-sub vh-sub--em">기획, 전략, 실행을 모두 아우르며</p>
          <p class="vh-sub">브랜드의 가치를 확산시키고 성과로 이어지는</p>
          <p class="vh-sub vh-sub--highlight">퍼포먼스를 만들어 냅니다.<span class="vh-cursor"></span></p>
        </div>

        {/* 구분선 + KPI 스트립 */}
        <div class="vh-kpi-strip" id="vhKpi"></div>
        <script dangerouslySetInnerHTML={{__html:`(function(){
          fetch('/api/admin/public/hero-kpi/viral')
            .then(function(r){return r.json();})
            .then(function(d){
              var el=document.getElementById('vhKpi');if(!el||!d.kpi)return;
              el.innerHTML=d.kpi.map(function(k,i){
                return (i>0?'<div class="vh-kpi-sep"></div>':'')
                  +'<div class="vh-kpi-item">'
                  +'<strong class="vh-kpi-num">'+k.num+'</strong>'
                  +'<span class="vh-kpi-label">'+k.label+'</span>'
                  +'</div>';
              }).join('');
            }).catch(function(){});
        })();`}} />

        {/* CTA 버튼 */}
        <div class="vh-btns" id="vhBtns">
          <a href="/contact" class="hero-cta-btn primary">
            <span>무료 전략 상담받기</span>
            <svg viewBox="0 0 24 24" fill="none"><path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
          <a href="#viral-content" class="vh-scroll-btn">
            <span>자세히 보기</span>
            <svg viewBox="0 0 24 24" fill="none" width="15" height="15"><path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
        </div>
      </div>

      {/* 하단 스크롤 힌트 */}
      <div class="vh-scroll-hint">
        <div class="vh-scroll-mouse"><div class="vh-scroll-wheel"></div></div>
      </div>

      {/* JS — Three.js 3D 배경 + 순차 애니메이션 + 카운터업 */}
      <script dangerouslySetInnerHTML={{ __html: `
(function(){
  /* ── Three.js 3D 배경 ── */
  var s=document.createElement('script');
  s.src='/static/svc-three-bg.js';
  s.onload=function(){ initSvcThreeBg(0x1a6bff, 0x00d4a8, 0x6440ff); };
  document.head.appendChild(s);

  /* ── 순차 등장 애니메이션 (스윽 fade+slide) ── */
  function animIn(el, delay){
    if(!el) return;
    el.style.opacity='0';
    el.style.transform='translateY(28px)';
    el.style.transition='opacity 0.85s cubic-bezier(.22,1,.36,1), transform 0.85s cubic-bezier(.22,1,.36,1)';
    el.style.transitionDelay = delay+'ms';
    requestAnimationFrame(function(){
      requestAnimationFrame(function(){
        el.style.opacity='1';
        el.style.transform='translateY(0)';
      });
    });
  }
  animIn(document.getElementById('vhL1'),  150);
  animIn(document.getElementById('vhL2'),  320);
  animIn(document.getElementById('vhSub'), 490);
  animIn(document.getElementById('vhKpi'), 660);
  animIn(document.getElementById('vhBtns'),820);
})();
      `}} />
    </section>

    {/* ============ 서비스 소개 ============ */}
    <section class="section svc-intro-section" id="viral-content">
      <div class="svc-bg-deco"><div class="svc-grid-lines"></div><div class="svc-orb-right"></div></div>
      <div class="container">
        <div class="svc-intro-grid vi-grid">

          {/* ── 좌측 텍스트 ── */}
          <div class="svc-intro-text vi-text" id="viText">
            <span class="sec-label vi-label">WHAT WE DO</span>
            <h2 class="sec-title vi-title">광고가 아닌<br /><em>경험으로 퍼집니다</em></h2>
            <p class="vi-desc">소비자는 광고를 피하지만, 경험은 스스로 공유합니다. 인애드컴퍼니는 맘카페, 네이버카페, 커뮤니티 등 소비자가 직접 모이는 공간에서 자연스럽게 확산되는 바이럴 구조를 설계합니다.</p>

            {/* 강조 인용구 */}
            <blockquote class="vi-quote">
              <span class="vi-quote-bar"></span>
              <p>광고처럼 느껴지지 않는 콘텐츠가 공유되고,<br />공유는 검색으로, 검색은 <strong>구매로 연결</strong>됩니다.</p>
            </blockquote>

            {/* 피처 리스트 — 번호 + 아이콘 */}
            <ul class="vi-feat-list">
              <li class="vi-feat-item">
                <span class="vi-feat-num">01</span>
                <span class="vi-feat-text">커뮤니티 이슈화 기획 및 운영</span>
              </li>
              <li class="vi-feat-item">
                <span class="vi-feat-num">02</span>
                <span class="vi-feat-text">맘카페·SNS 자연확산 설계</span>
              </li>
              <li class="vi-feat-item">
                <span class="vi-feat-num">03</span>
                <span class="vi-feat-text">UGC(사용자 생성 콘텐츠) 유도 전략</span>
              </li>
              <li class="vi-feat-item">
                <span class="vi-feat-num">04</span>
                <span class="vi-feat-text">버즈 모니터링 및 실시간 대응</span>
              </li>
              <li class="vi-feat-item">
                <span class="vi-feat-num">05</span>
                <span class="vi-feat-text">바이럴 후 SEO 연계 전략</span>
              </li>
            </ul>
          </div>

          {/* ── 우측 비주얼 ── */}
          <div class="svc-intro-visual vi-visual" id="viVisual">
            {/* 글로우 배경 */}
            <div class="vi-glow"></div>

            {/* 메인 이미지 */}
            <div class="vi-img-frame">
              <img src="/static/svc-images/viral.png" alt="바이럴 마케팅 비주얼" class="vi-photo" loading="lazy" />
              {/* 이미지 상단 오버레이 배지 */}
              <div class="vi-badge vi-badge--tl">
                <span class="vi-badge-icon">📣</span>
                <span class="vi-badge-label">바이럴 확산</span>
              </div>
              <div class="vi-badge vi-badge--br">
                <span class="vi-badge-dot vi-badge-dot--live"></span>
                <span class="vi-badge-label">실시간 모니터링</span>
              </div>
            </div>

            {/* 하단 스탯 바 */}
            <div class="vi-stat-bar">
              <div class="vi-stat">
                <strong>1억+</strong>
                <span>누적 노출</span>
              </div>
              <div class="vi-stat-div"></div>
              <div class="vi-stat">
                <strong>98%</strong>
                <span>재계약률</span>
              </div>
              <div class="vi-stat-div"></div>
              <div class="vi-stat">
                <strong>320+</strong>
                <span>완료 프로젝트</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    {/* ============ 상품 라인업 ============ */}
    <section class="section viral-products-section">
      <div class="svc-bg-deco"><div class="svc-dot-pattern"></div><div class="svc-section-glow-top"></div><div class="svc-float-dots"></div></div>
      <div class="container">
        <div class="section-head">
          <span class="sec-label">Service Products</span>
          <h2 class="sec-title">바이럴 마케팅<br /><em>상품 라인업</em></h2>
        </div>
        <div class="vp-grid">
          {[
            {
              icon:'☕', name:'카페 침투 마케팅', sub:'Cafe Viral',
              desc:'맘카페·네이버카페 등 소비자가 모이는 커뮤니티에 자연스럽게 스며드는 바이럴 콘텐츠 기획·운영',
              kpis:[
                { val:'1,965개', label:'보유 카페 수' },
                { val:'19개', label:'진행 카테고리 수' },
              ]
            },
            {
              icon:'💬', name:'커뮤니티 바이럴', sub:'Community Viral',
              desc:'온라인 커뮤니티 내 이슈화로 브랜드 검색량과 자연 유입을 폭발적으로 증가시킵니다',
              kpis:[
                { val:'72+', label:'진행 가능 커뮤니티' },
              ]
            },
            {
              icon:'📱', name:'SNS 바이럴', sub:'SNS Viral',
              desc:'인스타그램·틱톡·유튜브 등 SNS 채널에서의 자연스러운 확산 구조를 설계합니다',
              kpis:[
                { val:'450개+', label:'진행 가능 계정' },
              ],
              tags:['인스타 카드뉴스','먹스타그램 배포','숏폼 배포','숏폼 제작','X (구 트위터)','스레드'],
            },
            {
              icon:'📰', name:'언론 바이럴', sub:'Press Viral',
              desc:'뉴스·매체 배포를 통해 브랜드의 공신력과 검색 노출을 동시에 강화합니다',
              kpis:[
                { val:'153+', label:'보유 매체 수' },
                { val:'7개', label:'보유 카테고리 수' },
              ]
            },
          ].map((p, i) => (
            <div class="vp-card" id={`vp-card-${i}`} onclick={`toggleVpCard(${i})`}>
              <div class="vp-card-top">
                <div class="vp-icon">{p.icon}</div>
                <div class="vp-body">
                  <h3>{p.name}</h3>
                  <span class="vp-sub">{p.sub}</span>
                  <p>{p.desc}</p>
                </div>
                <div class="vp-toggle-btn" id={`vp-toggle-${i}`}>
                  <svg viewBox="0 0 24 24" fill="none" width="16" height="16"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </div>
              </div>
              <div class="vp-kpi-panel" id={`vp-kpi-${i}`}>
                <div class="vp-kpi-divider"></div>
                <div class="vp-kpi-row">
                  {p.kpis.map(k => (
                    <div class="vp-kpi-item">
                      <strong class="vp-kpi-val">{k.val}</strong>
                      <span class="vp-kpi-label">{k.label}</span>
                    </div>
                  ))}
                </div>
                {p.tags && (
                  <div class="vp-tags-row">
                    <span class="vp-tags-label">상품군</span>
                    <div class="vp-tags-wrap">
                      {p.tags.map(t => (
                        <span class="vp-tag">{t}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* 자세히 보기 — 상담 신청 연결 */}
        <div class="vp-brochure-wrap">
          <a
            href="/contact"
            class="vp-brochure-btn"
          >
            <span class="vp-brochure-dot"></span>
            <span class="vp-brochure-text">상담 신청하기</span>
            <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
              <path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
          <p class="vp-brochure-hint">무료 상담으로 맞춤 전략을 확인해보세요</p>
        </div>

      </div>
    </section>

    {/* ============ 진행 프로세스 ============ */}
    <section class="section svc-process-section">
      <div class="svc-bg-deco"><div class="svc-grid-lines"></div><div class="svc-orb-left"></div><div class="svc-section-glow-top"></div></div>
      <div class="container">
        <div class="section-head">
          <span class="sec-label">Process</span>
          <h2 class="sec-title">바이럴 마케팅<br /><em>진행 프로세스</em></h2>
        </div>
        <div class="svc-process-steps">
          {[
            { num:'01', title:'브랜드 분석', desc:'브랜드 특성, 타겟 소비자, 경쟁 환경을 분석해 바이럴 포인트를 발굴합니다.', img:'/static/process-images/process-01.png', accent:'#1a6bff' },
            { num:'02', title:'채널 전략 수립', desc:'맘카페, 커뮤니티, SNS 등 타겟이 모이는 최적 채널과 확산 시나리오를 설계합니다.', img:'/static/process-images/process-02.png', accent:'#7c3aed' },
            { num:'03', title:'콘텐츠 제작', desc:'광고처럼 느껴지지 않는 자연스러운 경험 콘텐츠를 기획·제작합니다.', img:'/static/process-images/process-03.png', accent:'#059669' },
            { num:'04', title:'시드 배포', desc:'핵심 커뮤니티에 콘텐츠를 전략적으로 배포하고 초기 반응을 모니터링합니다.', img:'/static/process-images/process-04.png', accent:'#0891b2' },
            { num:'05', title:'확산 관리', desc:'버즈가 확산되는 과정을 실시간 모니터링하고 추가 확산 전략을 실행합니다.', img:'/static/process-images/process-05.png', accent:'#dc2626' },
            { num:'06', title:'성과 리포팅', desc:'도달, 공유, 검색량 변화, 매출 연계 등 종합 성과 리포트를 제공합니다.', img:'/static/process-images/process-06.png', accent:'#d97706' },
          ].map(s => (
            <div class="sps-step">
              <div class="sps-img-wrap">
                <img src={s.img} alt={s.title} class="sps-img" loading="lazy" />
                <div class="sps-img-dim"></div>
              </div>
              <div class="sps-content">
                <div class="sps-num" style={`color:${s.accent}`}>{s.num}</div>
                <div class="sps-body">
                  <h4>{s.title}</h4>
                  <p>{s.desc}</p>
                </div>
                <div class="sps-accent-bar" style={`background:${s.accent}`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ============ 성과 사례 ============ */}
    {/* ══ FAQ ══ */}
    <section class="section svc-faq-section">
      <div class="svc-bg-deco"><div class="svc-dot-pattern"></div><div class="svc-orb-right"></div><div class="svc-section-glow-top"></div></div>
      <div class="container">
        <div class="section-head">
          <span class="sec-label">FAQ</span>
          <h2 class="sec-title">자주 하는 질문</h2>
          <p class="sec-sub">바이럴 마케팅에 대해 가장 많이 묻는 질문들을 모았습니다.</p>
        </div>
        <div class="faq-wrap" id="faqWrap" data-service="viral"></div>
        <script dangerouslySetInnerHTML={{__html:`(function(){
          fetch('/api/admin/public/svc-faq/viral')
            .then(function(r){return r.json();})
            .then(function(data){
              var wrap=document.getElementById('faqWrap');
              if(!wrap||!data.faq)return;
              wrap.innerHTML=data.faq.map(function(item,i){
                return '<div class="faq-item" id="faq-viral-'+i+'">'
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

    {/* ============ CTA ============ */}
    <section class="svc-cta-section">

    <script dangerouslySetInnerHTML={{ __html: `
      function toggleVpCard(idx) {
        var panel = document.getElementById('vp-kpi-' + idx);
        var btn   = document.getElementById('vp-toggle-' + idx);
        var card  = document.getElementById('vp-card-' + idx);
        if (!panel) return;
        var isOpen = panel.classList.contains('vp-kpi-panel--open');
        // 모든 카드 닫기
        for (var i = 0; i < 4; i++) {
          var p = document.getElementById('vp-kpi-' + i);
          var b = document.getElementById('vp-toggle-' + i);
          var c = document.getElementById('vp-card-' + i);
          if (p) p.classList.remove('vp-kpi-panel--open');
          if (b) b.classList.remove('vp-toggle-btn--open');
          if (c) c.classList.remove('vp-card--active');
        }
        // 클릭한 카드가 닫혀있었으면 열기
        if (!isOpen) {
          panel.classList.add('vp-kpi-panel--open');
          btn.classList.add('vp-toggle-btn--open');
          card.classList.add('vp-card--active');
        }
      }
    `}} />
      <div class="container">
        <div class="svc-cta-inner">
          <div class="svc-cta-text">
            <h2>바이럴 마케팅으로<br /><em>브랜드를 폭발적으로 성장시키세요</em></h2>
            <p>인애드컴퍼니 전문가가 우리 브랜드에 맞는 바이럴 전략을 무료로 진단해드립니다.</p>
          </div>
          <div class="svc-cta-btns">
            <a href="/contact" class="hero-cta-btn primary">
              <span>무료 상담 신청하기</span>
              <svg viewBox="0 0 24 24" fill="none"><path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </a>
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

  /* vi- 섹션 진입 애니메이션 */
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add('vi-in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.15 });
  ['viText','viVisual'].forEach(function(id){
    var el = document.getElementById(id);
    if(el) io.observe(el);
  });
})();
    `}} />

    {/* ── Admin Dynamic Marketing Stats ── */}
    <script dangerouslySetInnerHTML={{__html: `
(function(){
  var SVC_KEY = 'viral';
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
        var mdata = [{m:c.m1,l:c.l1},{m:c.m2,l:c.l2},{m:c.m3,l:c.l3}].filter(function(x){ return x.m; });
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
