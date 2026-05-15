export const SvcPplPage = () => (
  <>
    {/* ══ HERO ══ */}
    <section class="vh-hero">
      <canvas id="vhCanvas5" class="vh-canvas"></canvas>
      <div class="vh-bg">
        <div class="vh-orb vh-orb--1" style="background:radial-gradient(circle,rgba(239,68,68,0.22) 0%,transparent 70%)"></div>
        <div class="vh-orb vh-orb--2" style="background:radial-gradient(circle,rgba(251,146,60,0.18) 0%,transparent 70%)"></div>
        <div class="vh-orb vh-orb--3" style="background:radial-gradient(circle,rgba(168,85,247,0.16) 0%,transparent 70%)"></div>
        <div class="vh-grid"></div>
        <div class="vh-noise"></div>
      </div>
      <div class="container vh-inner">
        <a href="/marketing" class="svc-back-link vh-back">← Marketing 전체보기</a>
        <div class="vh-badge" style="color:rgba(239,68,68,0.95);border-color:rgba(239,68,68,0.35);background:rgba(239,68,68,0.08)">
          <span class="vh-badge-dot" style="background:rgba(239,68,68,1);box-shadow:0 0 8px rgba(239,68,68,0.9)"></span>
          <span>PPL MARKETING · PRODUCT PLACEMENT</span>
        </div>
        <h1 class="vh-title">
          <span class="vh-tline" id="ppL1">방송 콘텐츠 속,</span>
          <span class="vh-tline" id="ppL2" style="background:linear-gradient(135deg,#fff 20%,rgba(239,68,68,0.95) 55%,rgba(251,146,60,0.85) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">브랜드를 자연스럽게 각인시킵니다.</span>
        </h1>
        <div class="vh-sub-wrap" id="ppSub">
          <p class="vh-sub">단순한 노출을 넘어 <strong style="color:rgba(255,255,255,0.9)">스토리텔링과 결합</strong>하여 브랜드 인지도를 높이고</p>
          <p class="vh-sub">시청자의 마음속에 깊이 각인되는 <strong style="color:rgba(255,255,255,0.9)">프리미엄 광고 전략</strong>입니다.</p>
          <p class="vh-sub" style="margin-top:8px"><span style="color:rgba(239,68,68,0.9);font-weight:600">드라마 · 예능 · 교양 — 타겟이 명확한 프로그램으로 브랜드 가치를 전달합니다.</span></p>
        </div>
        <div class="vh-kpi-strip" id="ppKpi"></div>
        <script dangerouslySetInnerHTML={{__html:`(function(){
          fetch('/api/admin/public/hero-kpi/ppl')
            .then(function(r){return r.json();})
            .then(function(d){
              var el=document.getElementById('ppKpi');if(!el||!d.kpi)return;
              el.innerHTML=d.kpi.map(function(k,i){
                return (i>0?'<div class="vh-kpi-sep"></div>':'')
                  +'<div class="vh-kpi-item">'
                  +'<strong class="vh-kpi-num">'+k.num+'</strong>'
                  +'<span class="vh-kpi-label">'+k.label+'</span>'
                  +'</div>';
              }).join('');
            }).catch(function(){});
        })();`}} />
        <div class="vh-btns" id="ppBtns">
          <a href="/contact" class="hero-cta-btn primary">
            <span>무료 전략 상담받기</span>
            <svg viewBox="0 0 24 24" fill="none"><path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
          <a href="#ppl-features" class="vh-scroll-btn">
            <span>서비스 보기</span>
            <svg viewBox="0 0 24 24" fill="none" width="15" height="15"><path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
        </div>
      </div>
      <div class="vh-scroll-hint"><div class="vh-scroll-mouse"><div class="vh-scroll-wheel"></div></div></div>
      <script dangerouslySetInnerHTML={{ __html: `
(function(){
  var s=document.createElement('script');
  s.src='/static/svc-three-bg.js';
  s.onload=function(){ initSvcThreeBg(0xef4444, 0xfb923c, 0xa855f7); };
  document.head.appendChild(s);
  function anim(el,delay,dir){if(!el)return;el.style.opacity='0';el.style.transform=dir==='up'?'translateY(32px)':'translateX(-32px)';el.style.transition='opacity .9s cubic-bezier(.25,.46,.45,.94),transform .9s cubic-bezier(.25,.46,.45,.94)';setTimeout(function(){el.style.opacity='1';el.style.transform='none';},delay);}
  anim(document.getElementById('ppL1'),200,'left');
  anim(document.getElementById('ppL2'),440,'left');
  anim(document.getElementById('ppSub'),700,'up');
  anim(document.getElementById('ppKpi'),940,'up');
  anim(document.getElementById('ppBtns'),1140,'up');
})();
      `}} />
    </section>

    {/* ══ 서비스 소개 + 강점 4개 ══ */}
    <section class="section ppl-features-section" id="ppl-features">
      <div class="svc-bg-deco"><div class="svc-grid-lines"></div><div class="svc-orb-right"></div><div class="svc-section-glow-top"></div></div>
      <div class="container">

        {/* 상단: 좌측 설명 + 우측 강점 카드 */}
        <div class="ppl-intro-wrap">
          <div class="ppl-intro-left">
            <span class="sec-label">What We Do</span>
            <h2 class="sec-title" style="text-align:left;margin-bottom:24px">인애드컴퍼니<br /><em>방송사 협찬 광고</em></h2>
            <p class="ppl-intro-desc">
              방송 콘텐츠 속에 브랜드의 제품이나 서비스를 자연스럽게 녹여내어,
              시청자들에게 <strong>거부감 없이 브랜드를 각인</strong>시키는 고효율 마케팅 솔루션입니다.
            </p>
            <p class="ppl-intro-desc" style="margin-top:14px">
              드라마, 예능, 교양 등 <strong>타겟 오디언스가 명확한 프로그램</strong>을 선정하여
              단순한 노출을 넘어 <strong>브랜드의 가치와 스토리</strong>를 전달합니다.
            </p>
            <div class="ppl-keywords">
              <span class="ppl-kw">📡 방송사 협찬</span>
              <span class="ppl-kw">🎬 에피소드 기획</span>
              <span class="ppl-kw">👁 자연스러운 노출</span>
              <span class="ppl-kw">💎 브랜드 신뢰도</span>
            </div>
            <p class="ppl-intro-note">※ 방송사, 프로그램, 브랜드 메시지에 따라 소구포인트 및 노출포인트가 달라질 수 있습니다.</p>
          </div>

          <div class="ppl-intro-right">
            <div class="ppl-feat-card">
              <div class="ppl-feat-icon" style="color:#ef4444">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
              </div>
              <div class="ppl-feat-body">
                <h4>높은 신뢰도 및 파급력</h4>
                <p>방송 매체가 가진 공신력을 바탕으로 브랜드의 신뢰도를 확보하고, 대중적인 인지도를 단기간에 상승시킵니다.</p>
              </div>
            </div>
            <div class="ppl-feat-card">
              <div class="ppl-feat-icon" style="color:#fb923c">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
              </div>
              <div class="ppl-feat-body">
                <h4>자연스러운 브랜드 노출</h4>
                <p>콘텐츠의 흐름 속에 자연스럽게 배치되어 광고에 대한 심리적 장벽을 낮추고 몰입도를 극대화합니다.</p>
              </div>
            </div>
            <div class="ppl-feat-card">
              <div class="ppl-feat-icon" style="color:#a855f7">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
              </div>
              <div class="ppl-feat-body">
                <h4>2차 마케팅 리소스 확보</h4>
                <p>방송 노출 장면을 캡처하여 상세페이지, SNS 등 다양한 마케팅 채널의 2차 콘텐츠로 활용 가능합니다.</p>
              </div>
            </div>
            <div class="ppl-feat-card">
              <div class="ppl-feat-icon" style="color:#10b981">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
              </div>
              <div class="ppl-feat-body">
                <h4>타 상품 연계 시너지</h4>
                <p>블로그, 카페, SNS 등 바이럴 마케팅과 연계하여 방송 노출 이슈를 확산시키고 구매 전환을 유도합니다.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

    {/* ══ 에피소드 기획 PPL ══ */}
    <section class="section ppl-episode-section">
      <div class="svc-bg-deco"><div class="svc-dot-pattern"></div><div class="svc-orb-left"></div></div>
      <div class="container">
        <div class="section-head">
          <span class="sec-label">Episode PPL</span>
          <h2 class="sec-title">에피소드 기획 PPL<br /><em style="font-size:0.85em;color:rgba(255,255,255,0.5)">(TVN 기준)</em></h2>
          <p class="sec-sub" style="max-width:680px">
            방송관련 상품 진행 시 <strong style="color:rgba(239,68,68,0.9)">가장 큰 효과를 볼 수 있으며</strong>,<br />
            다른 상품과의 연계가 매우 <strong style="color:rgba(255,255,255,0.85)">자연스럽게 이어집니다.</strong>
          </p>
        </div>

        <div class="ppl-episode-grid">
          {/* 예시 1 */}
          <div class="ppl-ep-card">
            <div class="ppl-ep-title-row">
              <div class="ppl-ep-num"><span>1</span></div>
              <h4 class="ppl-ep-title">브랜드 소구포인트 노출</h4>
            </div>
            <div class="ppl-ep-visual">
              <div class="ppl-ep-img-wrap">
                <img src="/static/ppl-images/ppl-ep-brandpoint.jpg" alt="브랜드 소구포인트 노출" class="ppl-ep-img" />
                <div class="ppl-ep-img-badge">▶ 드라마 장면 속 자연 노출</div>
              </div>
              <div class="ppl-ep-label-bar">
                <svg viewBox="0 0 16 16" fill="currentColor" width="12" height="12"><path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 1a6 6 0 1 1 0 12A6 6 0 0 1 8 2zm-.5 3v5h1V5h-1z"/></svg>
                방송사, 프로그램에 따라 노출 방식이 달라질 수 있습니다.
              </div>
            </div>
            <p class="ppl-ep-desc">제품 포스터, 배너 등 브랜드 소구 메시지를 방송 화면 속에 자연스럽게 배치합니다. 시청자가 무의식 중에 브랜드를 인지하게 됩니다.</p>
          </div>

          {/* 예시 2 */}
          <div class="ppl-ep-card">
            <div class="ppl-ep-title-row">
              <div class="ppl-ep-num"><span>2</span></div>
              <h4 class="ppl-ep-title">브랜드 제품 직접 노출</h4>
            </div>
            <div class="ppl-ep-visual">
              <div class="ppl-ep-img-wrap">
                <img src="/static/ppl-images/ppl-ep-product.jpg" alt="브랜드 제품 직접 노출" class="ppl-ep-img" />
                <div class="ppl-ep-img-badge ppl-ep-img-badge--orange">▶ 출연진 직접 사용 장면</div>
              </div>
              <div class="ppl-ep-label-bar">
                <svg viewBox="0 0 16 16" fill="currentColor" width="12" height="12"><path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 1a6 6 0 1 1 0 12A6 6 0 0 1 8 2zm-.5 3v5h1V5h-1z"/></svg>
                방송사, 프로그램에 따라 노출 방식이 달라질 수 있습니다.
              </div>
            </div>
            <p class="ppl-ep-desc">출연진이 실제로 제품을 사용하거나 소개하는 장면을 기획합니다. 가장 강력한 구매 전환 효과를 만들어내는 PPL 유형입니다.</p>
          </div>
        </div>

        {/* 안내 배너 */}
        <div class="ppl-episode-banner">
          <div class="ppl-eb-icon">🎯</div>
          <div class="ppl-eb-text">
            <strong>방송관련 상품 진행 시 가장 큰 효과</strong>
            <span>에피소드 기획 PPL은 다른 마케팅 상품과의 연계가 자연스럽게 이어져 시너지 효과가 극대화됩니다</span>
          </div>
        </div>

      </div>
    </section>

    {/* ══ PROCESS TIMELINE ══ */}
    <section class="section sdtl-section">
      <div class="svc-bg-deco"><div class="svc-grid-lines"></div><div class="svc-orb-right"></div><div class="svc-section-glow-top"></div></div>
      <div class="container">
        <div class="section-head">
          <span class="sec-label">Process</span>
          <h2 class="sec-title">PPL 마케팅<br /><em>진행 프로세스</em></h2>
          <p class="sec-sub">상담부터 최종 리포트까지, 전담 PM이 모든 단계를 함께합니다.</p>
        </div>

        <div class="sdtl-wrap">
          <div class="sdtl-axis"><div class="sdtl-axis-line"></div></div>

          {/* STEP 01 */}
          <div class="sdtl-item sdtl-item--left">
            <div class="sdtl-card">
              <div class="sdtl-card-icon" style="--tc:#ef4444">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              </div>
              <div class="sdtl-card-body">
                <span class="sdtl-card-en">Consultation</span>
                <h4 class="sdtl-card-title">상담 진행</h4>
                <p class="sdtl-card-desc">브랜드 현황, 목표 메시지, 예산, 희망 프로그램 장르를 파악합니다. 방송사 협찬 또는 에피소드 기획 중 최적의 PPL 방식을 제안합니다.</p>
              </div>
            </div>
            <div class="sdtl-dot" style="--tc:#ef4444"><span class="sdtl-num">01</span></div>
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
                <p class="sdtl-card-desc">브랜드 아이덴티티, 핵심 소구 메시지, 타겟 오디언스를 분석합니다. 브랜드에 맞는 최적의 프로그램·채널·노출 방식을 데이터 기반으로 도출합니다.</p>
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
                <p class="sdtl-card-desc">방송사 / 제작사와 PPL 조건(노출 방식, 횟수, 에피소드, 기간)을 협상하고 계약을 체결합니다. 노출 KPI와 투명한 비용 구조를 계약서에 명확히 문서화합니다.</p>
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
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
              </div>
              <div class="sdtl-card-body">
                <span class="sdtl-card-en">PPL Execution</span>
                <h4 class="sdtl-card-title">각 상품 프로세스 진행</h4>
                <p class="sdtl-card-desc">촬영 일정에 맞춰 제품 제공 및 노출 가이드를 제공하고 현장을 모니터링합니다. 에피소드 기획형의 경우 장면 구성부터 최종 편집까지 함께 관리합니다.</p>
                <div class="seop-proc-chips" style="margin-top:12px">
                  <span class="seop-proc-chip" style="--cc:#ef4444">📡 방송사 협찬</span>
                  <span class="seop-proc-chip" style="--cc:#fb923c">🎬 에피소드 기획</span>
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
                <p class="sdtl-card-desc">방송 노출 횟수, 누적 시청자 수, 방영 후 브랜드 검색량 변화, SNS 언급량, 매출 연계 성과를 종합 리포트로 제공합니다. 2차 콘텐츠 활용 방안과 후속 전략도 함께 제안합니다.</p>
              </div>
            </div>
            <div class="sdtl-dot sdtl-dot--final" style="--tc:#10b981"><span class="sdtl-num">05</span></div>
            <div class="sdtl-spacer"></div>
          </div>

        </div>{/* /sdtl-wrap */}

        <div class="sdtl-footer">
          <span class="sdtl-footer-icon">📋</span>
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
          <p class="sec-sub">PPL 마케팅에 대해 가장 많이 묻는 질문들을 모았습니다.</p>
        </div>
        <div class="faq-wrap" id="faqWrap" data-service="ppl"></div>
        <script dangerouslySetInnerHTML={{__html:`(function(){
          fetch('/api/admin/public/svc-faq/ppl')
            .then(function(r){return r.json();})
            .then(function(data){
              var wrap=document.getElementById('faqWrap');
              if(!wrap||!data.faq)return;
              wrap.innerHTML=data.faq.map(function(item,i){
                return '<div class="faq-item" id="faq-ppl-'+i+'">'
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
      <div class="container">
        <div class="svc-cta-inner">
          <div class="svc-cta-text">
            <h2>PPL 마케팅으로<br /><em>콘텐츠 속에 브랜드를 심으세요</em></h2>
            <p>인애드컴퍼니 전문가가 우리 브랜드에 최적화된 PPL 전략을 무료로 진단해드립니다.</p>
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
})();
    `}} />

    {/* ── Admin Dynamic Marketing Stats ── */}
    <script dangerouslySetInnerHTML={{__html: `
(function(){
  var SVC_KEY = 'ppl';
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
