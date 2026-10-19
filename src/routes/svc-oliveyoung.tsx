import { icon } from '../icons'
export const SvcOliveYoungPage = () => (
  <>
    {/* ══ HERO ══ */}
    <section class="vh-hero vh-hero--photo">
      <div class="vh-photo-bg" aria-hidden="true" style="--hero-photo:url('/static/oy-images/hero.png')"></div>
      <canvas id="vhCanvas6" class="vh-canvas"></canvas>
      <div class="vh-bg">
        <div class="vh-orb vh-orb--1" style="background:radial-gradient(circle,rgba(3,199,90,0.22) 0%,transparent 70%)"></div>
        <div class="vh-orb vh-orb--2" style="background:radial-gradient(circle,rgba(132,204,22,0.18) 0%,transparent 70%)"></div>
        <div class="vh-orb vh-orb--3" style="background:radial-gradient(circle,rgba(3,199,90,0.12) 0%,transparent 70%)"></div>
        <div class="vh-grid"></div>
        <div class="vh-noise"></div>
      </div>
      <div class="container vh-inner">
        <a href="/#services" class="svc-back-link vh-back">← 서비스 전체보기</a>
        {/* 서비스명(검색엔진이 읽는 큰 제목의 일부) + 슬로건 */}
        <h1 class="vh-h1">
          <span class="vh-badge" style="color:rgba(3,199,90,0.95);border-color:rgba(3,199,90,0.35);background:rgba(3,199,90,0.08)">
            <span class="vh-badge-dot" style="background:rgba(3,199,90,1);box-shadow:0 0 8px rgba(3,199,90,0.9)"></span>
            <span>올리브영 마케팅</span>
          </span>

          <span class="vh-title">
          <span class="vh-tline" id="oyL1">올리브영에서</span>
          <span class="vh-tline" id="oyL2" style="background:linear-gradient(135deg,#fff 20%,rgba(3,199,90,0.95) 55%,rgba(132,204,22,0.85) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;"><span class="vh-hl">팔리는 브랜드</span>를 만듭니다.</span>
        </span>
        </h1>
        <div class="vh-sub-wrap" id="oySub">
          <p class="vh-sub">국내 최대 H&amp;B 스토어 올리브영 — 뷰티·헬스케어 소비자가 가장 많이 모이는 플랫폼.</p>
          <p class="vh-sub"><strong style="color:rgba(255,255,255,0.9)">리뷰 마케팅, 검색 노출, 구매 전환</strong>까지</p>
          <p class="vh-sub" style="margin-top:8px"><span style="color:rgba(3,199,90,0.9);font-weight:600">최상의 올리브영 커머스 시나리오를 제안합니다.</span></p>
        </div>
        <div class="vh-kpi-strip" id="oyKpi"></div>
        <script dangerouslySetInnerHTML={{__html:`(function(){
          fetch('/api/admin/public/hero-kpi/oliveyoung')
            .then(function(r){return r.json();})
            .then(function(d){
              var el=document.getElementById('oyKpi');if(!el||!d.kpi)return;
              el.innerHTML=d.kpi.map(function(k,i){
                return (i>0?'<div class="vh-kpi-sep"></div>':'')
                  +'<div class="vh-kpi-item">'
                  +'<strong class="vh-kpi-num">'+k.num+'</strong>'
                  +'<span class="vh-kpi-label">'+k.label+'</span>'
                  +'</div>';
              }).join('');
            }).catch(function(){});
        })();`}} />
        <div class="vh-btns" id="oyBtns">
          <a href="/contact" class="vh-cta-btn">
            <span>문의하기</span>
            <svg viewBox="0 0 24 24" fill="none" width="15" height="15"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
          <a href="#oy-services" class="vh-scroll-btn">
            <span>서비스 보기</span>
            <svg viewBox="0 0 24 24" fill="none" width="15" height="15"><path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
        </div>
      </div>
      <div class="vh-scroll-hint"><div class="vh-scroll-mouse"><div class="vh-scroll-wheel"></div></div></div>
      <script dangerouslySetInnerHTML={{ __html: `
(function(){
  function anim(el,delay,dir){if(!el)return;el.style.opacity='0';el.style.transform=dir==='up'?'translateY(32px)':'translateX(-32px)';el.style.transition='opacity .9s cubic-bezier(.25,.46,.45,.94),transform .9s cubic-bezier(.25,.46,.45,.94)';setTimeout(function(){el.style.opacity='1';el.style.transform='none';},delay);}
  anim(document.getElementById('oyL1'),200,'left');
  anim(document.getElementById('oyL2'),440,'left');
  anim(document.getElementById('oySub'),700,'up');
  anim(document.getElementById('oyKpi'),940,'up');
  anim(document.getElementById('oyBtns'),1140,'up');
})();
      `}} />
    </section>

    {/* ══ 라이트 테마 콘텐츠 래퍼 (히어로 제외) ══ */}
    <div class="svc-light">

    {/* ══ 4대 서비스 그리드 ══ */}
    <section class="section oy-services-section" id="oy-services">
      <div class="svc-bg-deco"><div class="svc-grid-lines"></div><div class="svc-orb-right"></div><div class="svc-section-glow-top"></div></div>
      <div class="container">
        <div class="section-head">
          <span class="sec-label">Service Types</span>
          <h2 class="sec-title">올리브영 마케팅<br /><em>4대 핵심 서비스</em></h2>
          <p class="sec-sub">리뷰부터 검색 노출, 구매 전환까지 — 올리브영 성장의 모든 퍼즐을 맞춥니다.</p>
        </div>

        <div class="oy-grid">

          {/* 01 리뷰 마케팅 */}
          <div class="oy-card oy-card--review">
            <div class="oy-card-img-wrap">
              <img src="/static/oy-images/oy-review.jpg" alt="리뷰 마케팅" class="oy-card-img" />
              <div class="oy-card-img-overlay">
                <span class="oy-card-img-badge">Review Marketing</span>
              </div>
            </div>
            <div class="oy-card-header">
              <div class="oy-card-icon-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              </div>
              <div>
                <p class="oy-card-en">Review Marketing</p>
                <h3 class="oy-card-title">리뷰 마케팅</h3>
              </div>
            </div>
            <div class="oy-card-tags">
              <span class="oy-tag">#상단 리뷰 노출</span>
              <span class="oy-tag">#상세 페이지 리뷰</span>
            </div>
            <p class="oy-card-desc">
              올리브영에서 활발히 활동하는 <strong>검증된 리뷰어</strong>들과 함께 실사용 경험 콘텐츠를 제작합니다.<br />
              영향력 있는 리뷰어와의 지속적인 협업으로 높은 노출도를 유지하며, 소비자 신뢰를 빠르게 구축합니다.
            </p>
            <ul class="oy-card-list">
              <li>올리브영 영향력 리뷰어 네트워크 운영</li>
              <li>상세페이지 리뷰 노출 최적화</li>
              <li>고객 만족도 관리 전략 수립</li>
              <li>부정 리뷰 완화 및 여론 관리</li>
            </ul>
          </div>

          {/* 02 검색 노출 */}
          <div class="oy-card oy-card--ranking">
            <div class="oy-card-img-wrap">
              <img src="/static/oy-images/oy-ranking.jpg" alt="검색 노출" class="oy-card-img" />
              <div class="oy-card-img-overlay">
                <span class="oy-card-img-badge oy-card-img-badge--ranking">Category Content</span>
              </div>
            </div>
            <div class="oy-card-header">
              <div class="oy-card-icon-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
              </div>
              <div>
                <p class="oy-card-en">Category Content</p>
                <h3 class="oy-card-title">카테고리 콘텐츠 강화</h3>
              </div>
            </div>
            <div class="oy-card-tags">
              <span class="oy-tag">#상세페이지 활용</span>
              <span class="oy-tag">#콘텐츠 집중형</span>
            </div>
            <p class="oy-card-desc">
              카테고리별 <strong>상세페이지·리뷰 콘텐츠</strong>를 강화해, 상품이 발견될 확률을 높입니다.<br />
              경쟁이 치열한 카테고리에서도 <strong>브랜드 관심도</strong>를 끌어올립니다.
            </p>
            <ul class="oy-card-list">
              <li>카테고리별 콘텐츠 강화 노하우 보유</li>
              <li>실시간 노출 현황 모니터링 및 리포트 제공</li>
              <li>콘텐츠 지속 관리 시스템</li>
            </ul>
          </div>

          {/* 03 검색 노출 */}
          <div class="oy-card oy-card--exposure">
            <div class="oy-card-img-wrap">
              <img src="/static/oy-images/oy-exposure.jpg" alt="검색 노출" class="oy-card-img" />
              <div class="oy-card-img-overlay">
                <span class="oy-card-img-badge oy-card-img-badge--exposure">Search Exposure</span>
              </div>
            </div>
            <div class="oy-card-header">
              <div class="oy-card-icon-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </div>
              <div>
                <p class="oy-card-en">Search Exposure</p>
                <h3 class="oy-card-title">검색 노출</h3>
              </div>
            </div>
            <div class="oy-card-tags">
              <span class="oy-tag">#소비자 접점</span>
              <span class="oy-tag">#전환율 강화</span>
            </div>
            <p class="oy-card-desc">
              실시간 변동되는 올리브영 노출 환경에서 <strong>계획된 일정에 맞춰</strong> 안정적으로 운영합니다.<br />
              <strong>전환율을 끌어올리는 소비자 접점</strong>을 설계합니다.
            </p>
            <ul class="oy-card-list">
              <li>고객 리뷰 기반 상품 신뢰성 강화</li>
              <li>카테고리별 맞춤전략으로 브랜드 관심도를 강화</li>
              <li>일정 기반 안정적 스케줄 관리</li>
              <li>노출 성과 주간 리포트 제공</li>
            </ul>
          </div>

          {/* 04 구매 전환 */}
          <div class="oy-card oy-card--conversion oy-card--conversion-highlight">
            <div class="oyc-bg" aria-hidden="true"></div>
            <div class="oyc-inner">
              <span class="oyc-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" width="24" height="24"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
              </span>
              <p class="oyc-label">SYNERGY EFFECT</p>
              <h3 class="oyc-title">리뷰·노출·검색이<br />구매로 이어집니다</h3>
              <p class="oyc-desc">각 서비스가 유기적으로 연결되어<br />구매 전환율이 복합적으로 상승합니다.</p>
              <div class="oyc-flow">
                <span class="oyc-fc">리뷰</span>
                <i>+</i>
                <span class="oyc-fc">콘텐츠</span>
                <i>+</i>
                <span class="oyc-fc">검색노출</span>
                <i class="oyc-fa">→</i>
                <span class="oyc-fc oyc-fc--res">구매 전환 ↑</span>
              </div>
              <div class="oyc-kpi">
                <div class="oyc-kp"><strong>+340%</strong><span>평균 매출 증가</span></div>
                <div class="oyc-kp"><strong>콘텐츠</strong><span>지속 제작</span></div>
                <div class="oyc-kp"><strong>3개월</strong><span>목표 달성</span></div>
              </div>
            </div>
          </div>

        </div>{/* /oy-grid */}

        {/* 하단 배너 */}
        <div class="oy-scenario-banner">
          <div class="oy-sb-icon">{icon('leaf')}</div>
          <div class="oy-sb-text">
            <strong>최상의 올리브영 커머스 시나리오를 제안합니다</strong>
            <span>리뷰 · 노출 · 검색 · 전환 — 네 가지가 맞물릴 때 성과가 가장 크게 납니다</span>
          </div>
        </div>

      </div>
    </section>

    {/* ══ PROCESS TIMELINE ══ */}
    <section class="section sdtl-section">
      <div class="svc-bg-deco"><div class="svc-grid-lines"></div><div class="svc-orb-left"></div><div class="svc-section-glow-top"></div></div>
      <div class="container">
        <div class="section-head">
          <span class="sec-label">Process</span>
          <h2 class="sec-title">올리브영 마케팅<br /><em>진행 프로세스</em></h2>
          <p class="sec-sub">상담부터 최종 리포트까지, 전담 PM이 모든 단계를 함께합니다.</p>
        </div>

        <div class="sdtl-wrap" id="sdtlWrap">
          <div class="sdtl-axis"><div class="sdtl-axis-line"></div></div>

          {/* STEP 01 */}
          <div class="sdtl-item sdtl-item--left">
            <div class="sdtl-card">
              <div class="sdtl-card-icon" style="--tc:#1a6bff">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              </div>
              <div class="sdtl-card-body">
                <span class="sdtl-card-en">Consultation</span>
                <h4 class="sdtl-card-title">상담 진행</h4>
                <p class="sdtl-card-desc">브랜드 현황·목표 카테고리·예산·기간을 파악합니다. 리뷰·노출·검색 중 무엇을 어떤 순서로 묶을지 정해 드립니다.</p>
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
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </div>
              <div class="sdtl-card-body">
                <span class="sdtl-card-en">Brand Analysis</span>
                <h4 class="sdtl-card-title">브랜드 분석</h4>
                <p class="sdtl-card-desc">올리브영 내 현재 상품 노출, 리뷰 현황, 만족도 분포, 경쟁사 포지션을 데이터로 분석합니다. 성장 기회와 개선이 필요한 취약점을 명확히 도출합니다.</p>
              </div>
            </div>
          </div>

          {/* STEP 03 */}
          <div class="sdtl-item sdtl-item--left">
            <div class="sdtl-card">
              <div class="sdtl-card-icon" style="--tc:#0891b2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
              </div>
              <div class="sdtl-card-body">
                <span class="sdtl-card-en">Contract</span>
                <h4 class="sdtl-card-title">계약 진행</h4>
                <p class="sdtl-card-desc">진행 서비스 범위, 목표 KPI(노출·리뷰 수·만족도), 일정을 계약서에 명확히 문서화합니다. 투명한 비용 구조로 신뢰를 바탕으로 한 파트너십을 구축합니다.</p>
              </div>
            </div>
            <div class="sdtl-dot" style="--tc:#0891b2"><span class="sdtl-num">03</span></div>
            <div class="sdtl-spacer"></div>
          </div>

          {/* STEP 04 */}
          <div class="sdtl-item sdtl-item--right">
            <div class="sdtl-spacer"></div>
            <div class="sdtl-dot" style="--tc:#d97706"><span class="sdtl-num">04</span></div>
            <div class="sdtl-card">
              <div class="sdtl-card-icon" style="--tc:#d97706">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
              </div>
              <div class="sdtl-card-body">
                <span class="sdtl-card-en">Service Execution</span>
                <h4 class="sdtl-card-title">각 상품 프로세스 진행</h4>
                <p class="sdtl-card-desc">계약된 서비스를 특성에 맞는 순서로 실행합니다. 리뷰·노출·검색 작업이 맞물려 돌아가도록 설계합니다.</p>
                <div class="seop-proc-chips" style="margin-top:12px">
                  <span class="seop-proc-chip" style="--cc:#03c75a">리뷰 마케팅</span>
                  <span class="seop-proc-chip" style="--cc:#1a6bff">노출 강화</span>
                  <span class="seop-proc-chip" style="--cc:#f59e0b">검색 노출</span>
                </div>
              </div>
            </div>
          </div>

          {/* STEP 05 */}
          <div class="sdtl-item sdtl-item--left sdtl-item--last">
            <div class="sdtl-card sdtl-card--final">
              <div class="sdtl-card-icon" style="--tc:#10b981">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
              </div>
              <div class="sdtl-card-body">
                <span class="sdtl-card-en">Performance Report</span>
                <h4 class="sdtl-card-title">리포트</h4>
                <p class="sdtl-card-desc">캠페인 전 기간의 노출 변화, 리뷰 수·만족도 추이, 노출량, 매출 변화를 수치로 정리한 종합 리포트를 제공합니다. 분석을 바탕으로 다음 성장 단계 전략까지 제안합니다.</p>
              </div>
            </div>
            <div class="sdtl-dot sdtl-dot--final" style="--tc:#10b981"><span class="sdtl-num">05</span></div>
            <div class="sdtl-spacer"></div>
          </div>

        </div>{/* /sdtl-wrap */}

        <div class="sdtl-footer">
          <span class="sdtl-footer-icon">{icon('clipboard')}</span>
          <span>모든 단계에서 <strong>전담 PM</strong>이 함께합니다 &nbsp;·&nbsp; 위 프로세스는 이해를 돕기 위한 흐름이며 <strong>실제는 각 상품에 맞춰 최적화</strong>되어 진행됩니다</span>
        </div>

      </div>
    </section>

    {/* ══ RESULTS ══ */}
    {/* ══ FAQ ══ */}
    <section class="section svc-faq-section">
      <div class="svc-bg-deco"><div class="svc-dot-pattern"></div><div class="svc-orb-right"></div><div class="svc-section-glow-top"></div></div>
      <div class="container">
        <div class="section-head">
          <span class="sec-label">FAQ</span>
          <h2 class="sec-title">자주 하는 질문</h2>
          <p class="sec-sub">올리브영 마케팅에 대해 가장 많이 묻는 질문들을 모았습니다.</p>
        </div>
        <div class="faq-wrap" id="faqWrap" data-service="oliveyoung"></div>
        <script dangerouslySetInnerHTML={{__html:`(function(){
          var pre=document.getElementById('faqWrap'); if(pre&&pre.children.length)return; // 서버(main.tsx)가 미리 채운 경우
          fetch('/api/admin/public/svc-faq/oliveyoung')
            .then(function(r){return r.json();})
            .then(function(data){
              var wrap=document.getElementById('faqWrap');
              if(!wrap||!data.faq)return;
              wrap.innerHTML=data.faq.map(function(item,i){
                return '<div class="faq-item" id="faq-oy-'+i+'">'
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

    {/* ══ CTA ══ */}
    <section class="svc-cta-section">
      <div class="cta-img-bg" aria-hidden="true" style="--cta-img:url('/static/images/cta-oliveyoung.png')"></div>
      <div class="container">
        <div class="svc-cta-inner">
          <div class="svc-cta-text">
            <h2>올리브영에서<br /><em>브랜드를 폭발 성장시키세요</em></h2>
            <p>인애드컴퍼니 전문가가 올리브영 채널 최적화 전략을 무료로 진단해드립니다.</p>
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
})();
    `}} />

    {/* ── Admin Dynamic Marketing Stats ── */}
    <script dangerouslySetInnerHTML={{__html: `
(function(){
  var SVC_KEY = 'oliveyoung';
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
    </div>{/* /svc-light */}
  </>
)
