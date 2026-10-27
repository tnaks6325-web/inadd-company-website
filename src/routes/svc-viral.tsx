import { SvcTerms } from './svc-terms'
import { icon } from '../icons'
import { ViralPhones, ViralBackdrop } from './viral-phones'
export const SvcViralPage = () => (
  <>
    <link rel="stylesheet" href="/static/viral-phones.css?v=20261027q" />
    {/* ════════════════════════════════════════
        VIRAL HERO — 시네마틱 풀스크린
    ════════════════════════════════════════ */}
    <section class="vh-hero vh-hero--phones">
      <ViralBackdrop />
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
        <a href="/#services" class="svc-back-link vh-back">← 서비스 전체보기</a>

        {/* 상단 배지 */}
        {/* 서비스명(검색엔진이 읽는 큰 제목의 일부) + 슬로건 */}
        <h1 class="vh-h1">
          <span class="vh-badge">
            <span class="vh-badge-dot"></span>
            <span>바이럴 마케팅</span>
          </span>


        {/* 메인 카피 — 줄별 슬라이드 인 + 글리치 효과 */}
          <span class="vh-title">
          <span class="vh-tline" id="vhL1">광고가 아니라,</span>
          <span class="vh-tline vh-tline--accent" id="vhL2"><span class="vh-hl">이야기로 퍼집니다</span></span>
        </span>
        </h1>

        {/* 서브 카피 — 단어 단위 페이드 인 */}
        <div class="vh-sub-wrap" id="vhSub">
          <p class="vh-sub">카페·커뮤니티·SNS·언론까지, 사람들이 모이는 곳을 따라가</p>
          <p class="vh-sub vh-sub--highlight">채널 안쪽의 데이터를 읽고, 크리에이티브로 설득을 더합니다.<span class="vh-cursor"></span></p>
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
          <a href="/contact" class="vh-cta-btn">
            <span>문의하기</span>
            <svg viewBox="0 0 24 24" fill="none" width="15" height="15"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
          <a href="#viral-content" class="vh-scroll-btn">
            <span>자세히 보기</span>
            <svg viewBox="0 0 24 24" fill="none" width="15" height="15"><path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
        </div>
      </div>

      {/* 카페·블로그·뽐뿌·뉴스·에펨코리아 모바일 화면 롤링 */}
      <ViralPhones />
      <script src="/static/viral-phones.js?v=20261020a" defer></script>

      {/* 하단 스크롤 힌트 */}
      <div class="vh-scroll-hint">
        <div class="vh-scroll-mouse"><div class="vh-scroll-wheel"></div></div>
      </div>

      {/* JS — 순차 등장 애니메이션 */}
      <script dangerouslySetInnerHTML={{ __html: `
(function(){

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

    {/* ══ 라이트 테마 콘텐츠 래퍼 (히어로 제외) ══ */}
    <div class="svc-light">

    {/* ============ 서비스 소개 ============ */}
    <section class="section svc-intro-section" id="viral-content">
      <div class="svc-bg-deco"><div class="svc-grid-lines"></div><div class="svc-orb-right"></div></div>
      <div class="container">
        <div class="vi-story vi-text" id="viText">
          <h2 class="vi-story-title">광고를 더 많이 보여주는 것이 아닌,<br /><em>사람들이 <span class="vi-story-highlight">먼저 말하고 싶게!<svg class="vi-story-underline" viewBox="0 0 300 20" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="M 5 11 C 70 15, 132 6, 196 10 C 235 12, 266 9, 295 6" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" vector-effect="non-scaling-stroke" /></svg></span></em></h2>
          <div class="vi-story-flow" aria-label="바이럴 마케팅 확산 과정">
            <article class="vi-story-step">
              <span class="vi-story-num">01</span>
              <strong>발견</strong>
              <p>필요한 순간,<br />광고가 아닌 정보로 만납니다.</p>
            </article>
            <span class="vi-story-line" aria-hidden="true"></span>
            <article class="vi-story-step">
              <span class="vi-story-num">02</span>
              <strong>납득</strong>
              <p>실제 경험과 맥락이<br />브랜드의 신뢰를 만듭니다.</p>
            </article>
            <span class="vi-story-line" aria-hidden="true"></span>
            <article class="vi-story-step">
              <span class="vi-story-num">03</span>
              <strong>확산</strong>
              <p>공유된 이야기가 검색과<br />구매까지 이어집니다.</p>
            </article>
          </div>

          <p class="vi-story-closing">인애드는 <strong>노출량보다, 반응이 나오는 맥락부터 설계합니다.</strong></p>
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
        <div class="vp-tiles">
          {[
            {
              img:'cafe', name:'카페 바이럴', sub:'Cafe Viral',
              needs:['검색해도 후기가 없어 신뢰가 안 생길 때', '맘카페·육아·뷰티 등 타깃 커뮤니티에 스며들고 싶을 때', '커뮤니티 맥락에 맞는 콘텐츠로 알리고 싶을 때'],
              kpis:[ { val:'1,965개', label:'보유 카페' }, { val:'19개', label:'진행 카테고리' } ]
            },
            {
              img:'community', name:'커뮤니티 바이럴', sub:'Community Viral',
              needs:['관심사 커뮤니티에 자연스럽게 진입하고 싶을 때', '광고 거부감이 큰 채널에서 화제를 만들고 싶을 때', '타깃이 뾰족한 채널에서 화제를 만들고 싶을 때'],
              kpis:[ { val:'72+', label:'진행 가능 커뮤니티' } ]
            },
            {
              img:'sns', name:'SNS 바이럴', sub:'SNS Viral',
              needs:['인스타·유튜브에서 브랜드가 안 보일 때', '해시태그·탐색탭에서 발견되고 싶을 때', 'MZ 타깃에게 트렌디하게 다가가고 싶을 때'],
              kpis:[ { val:'450개+', label:'진행 가능 계정' } ]
            },
            {
              img:'press', name:'언론 바이럴', sub:'Press Viral',
              needs:['검색했을 때 기사가 떠서 믿음을 주고 싶을 때', '브랜드 공신력·신뢰도가 필요할 때', '투자·제휴·B2B 등 공식 레퍼런스가 중요할 때'],
              kpis:[ { val:'153+', label:'보유 매체' }, { val:'7개', label:'보유 카테고리' } ]
            },
          ].map((p) => (
            <div class="vp-tile" style={`background-image:url('/static/viral-products/${p.img}.jpg')`}>
              <div class="vp-tile-overlay"></div>
              <div class="vp-tile-inner">
                {/* 기본(항상 노출): 한글명 + 첫 니즈 한 줄 — hover 없이도 내용이 읽히게 */}
                <div class="vp-tile-front">
                  <span class="vp-tile-front-en">{p.sub}</span>
                  <strong class="vp-tile-front-name">{p.name}</strong>
                  <span class="vp-tile-front-hook">{p.needs[0]}</span>
                  <span class="vp-tile-more">자세히 보기<svg viewBox="0 0 24 24" fill="none" width="13" height="13"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
                </div>
                {/* 호버: 한글 + 서브 + 설명/수치 */}
                <div class="vp-tile-detail">
                  <span class="vp-tile-eyebrow">{p.sub}</span>
                  <h3 class="vp-tile-name">{p.name}</h3>
                  <div class="vp-tile-needs">
                    <span class="vp-tile-needs-label">이럴 때 필요해요</span>
                    <ul class="vp-tile-needs-list">
                      {p.needs.map(n => (
                        <li><svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 10.5l3.5 3.5L16 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg><span>{n}</span></li>
                      ))}
                    </ul>
                  </div>
                  {p.kpis && (
                    <div class="vp-tile-kpis">
                      {p.kpis.map(k => (
                        <span class="vp-tile-kpi"><strong>{k.val}</strong> {k.label}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 자세히 보기 — 상담 신청 연결 */}
        <div class="vp-brochure-wrap">
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
            { num:'01', title:'브랜드 분석', desc:'브랜드 특성, 타겟 소비자, 경쟁 환경을 분석해 바이럴 포인트를 발굴합니다.', img:'/static/process-images/process-01.png', accent:'#25469E' },
            { num:'02', title:'채널 전략 수립', desc:'맘카페, 커뮤니티, SNS 등 타겟이 모이는 최적 채널과 확산 시나리오를 설계합니다.', img:'/static/process-images/process-02.png', accent:'#7c3aed' },
            { num:'03', title:'콘텐츠 제작', desc:'타깃이 공감하는 경험 콘텐츠를 기획·제작합니다.', img:'/static/process-images/process-03.png', accent:'#059669' },
            { num:'04', title:'시드 배포', desc:'핵심 커뮤니티에 콘텐츠를 먼저 풀고, 초기 반응을 지켜봅니다.', img:'/static/process-images/process-04.png', accent:'#0891b2' },
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
    <SvcTerms service="viral" />

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
          var pre=document.getElementById('faqWrap'); if(pre&&pre.children.length)return; // 서버(main.tsx)가 미리 채운 경우
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
      <div class="cta-img-bg" aria-hidden="true" style="--cta-img:url('/static/images/cta-viral.png');--cta-img-m:url('/static/m/images/cta-viral.webp')"></div>

      <div class="container">
        <div class="svc-cta-inner">
          <div class="svc-cta-text">
            <h2>바이럴 마케팅으로<br /><em>브랜드 성장의 흐름을 만드세요</em></h2>
            <p>인애드컴퍼니 전문가가 우리 브랜드에 맞는 바이럴 전략을 무료로 진단해드립니다.</p>
          </div>
        </div>
      </div>
    </section>


    {/* ── Scroll Reveal ── */}
    <script dangerouslySetInnerHTML={{__html: `
(function(){
  var s = document.createElement('script');
  s.src = '/static/scroll-reveal.js?v=20260722b';
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
    </div>{/* /svc-light */}
  </>
)
