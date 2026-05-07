export const SvcOliveYoungPage = () => (
  <>
    {/* ══ HERO ══ */}
    <section class="vh-hero">
      <canvas id="vhCanvas6" class="vh-canvas"></canvas>
      <div class="vh-bg">
        <div class="vh-orb vh-orb--1" style="background:radial-gradient(circle,rgba(3,199,90,0.22) 0%,transparent 70%)"></div>
        <div class="vh-orb vh-orb--2" style="background:radial-gradient(circle,rgba(26,107,255,0.18) 0%,transparent 70%)"></div>
        <div class="vh-orb vh-orb--3" style="background:radial-gradient(circle,rgba(3,199,90,0.12) 0%,transparent 70%)"></div>
        <div class="vh-grid"></div>
        <div class="vh-noise"></div>
      </div>
      <div class="container vh-inner">
        <a href="/marketing" class="svc-back-link vh-back">← Marketing 전체보기</a>
        <div class="vh-badge" style="color:rgba(3,199,90,0.95);border-color:rgba(3,199,90,0.35);background:rgba(3,199,90,0.08)">
          <span class="vh-badge-dot" style="background:rgba(3,199,90,1);box-shadow:0 0 8px rgba(3,199,90,0.9)"></span>
          <span>OLIVE YOUNG MARKETING</span>
        </div>
        <h1 class="vh-title">
          <span class="vh-tline" id="oyL1">올리브영에서</span>
          <span class="vh-tline" id="oyL2" style="background:linear-gradient(135deg,#fff 20%,rgba(3,199,90,0.95) 55%,rgba(26,107,255,0.85) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">팔리는 브랜드를 만듭니다.</span>
        </h1>
        <div class="vh-sub-wrap" id="oySub">
          <p class="vh-sub">국내 최대 H&amp;B 스토어 올리브영 — 뷰티·헬스케어 소비자가 가장 많이 모이는 플랫폼.</p>
          <p class="vh-sub"><strong style="color:rgba(255,255,255,0.9)">리뷰 마케팅, 랭킹 작업, 상위 노출, 구매 전환</strong>까지</p>
          <p class="vh-sub" style="margin-top:8px"><span style="color:rgba(3,199,90,0.9);font-weight:600">최상의 올리브영 커머스 시나리오를 제안합니다.</span></p>
        </div>
        <div class="vh-kpi-strip" id="oyKpi">
          <div class="vh-kpi-item">
            <strong class="vh-kpi-num" style="color:#03c75a">+340%</strong>
            <span class="vh-kpi-label">채널 매출 증가</span>
          </div>
          <div class="vh-kpi-sep"></div>
          <div class="vh-kpi-item">
            <strong class="vh-kpi-num">TOP 5</strong>
            <span class="vh-kpi-label">카테고리 순위 달성</span>
          </div>
          <div class="vh-kpi-sep"></div>
          <div class="vh-kpi-item">
            <strong class="vh-kpi-num">4개</strong>
            <span class="vh-kpi-label">통합 서비스 운영</span>
          </div>
        </div>
        <div class="vh-btns" id="oyBtns">
          <a href="/contact" class="hero-cta-btn primary">
            <span>무료 전략 상담받기</span>
            <svg viewBox="0 0 24 24" fill="none"><path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
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
  var s=document.createElement('script');
  s.src='/static/svc-three-bg.js';
  s.onload=function(){ initSvcThreeBg(0x03c75a, 0x1a6bff, 0x00d4a8); };
  document.head.appendChild(s);
  function anim(el,delay,dir){if(!el)return;el.style.opacity='0';el.style.transform=dir==='up'?'translateY(32px)':'translateX(-32px)';el.style.transition='opacity .9s cubic-bezier(.25,.46,.45,.94),transform .9s cubic-bezier(.25,.46,.45,.94)';setTimeout(function(){el.style.opacity='1';el.style.transform='none';},delay);}
  anim(document.getElementById('oyL1'),200,'left');
  anim(document.getElementById('oyL2'),440,'left');
  anim(document.getElementById('oySub'),700,'up');
  anim(document.getElementById('oyKpi'),940,'up');
  anim(document.getElementById('oyBtns'),1140,'up');
})();
      `}} />
    </section>

    {/* ══ 4대 서비스 그리드 ══ */}
    <section class="section oy-services-section" id="oy-services">
      <div class="svc-bg-deco"><div class="svc-grid-lines"></div><div class="svc-orb-right"></div><div class="svc-section-glow-top"></div></div>
      <div class="container">
        <div class="section-head">
          <span class="sec-label">Service Types</span>
          <h2 class="sec-title">올리브영 마케팅<br /><em>4대 핵심 서비스</em></h2>
          <p class="sec-sub">리뷰부터 랭킹, 노출, 구매 전환까지 — 올리브영 성장의 모든 퍼즐을 맞춥니다.</p>
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
              올리브영이 공식 선정한 <strong>1위~2,000위 탑리뷰어</strong>들로 구성된 전문 리뷰 작성단을 운영합니다.<br />
              탑리뷰어 계정의 지속적인 관리로 높은 노출도와 영향력을 유지하며, 소비자 신뢰를 빠르게 구축합니다.
            </p>
            <ul class="oy-card-list">
              <li>올리브영 공식 탑리뷰어 네트워크 운영</li>
              <li>상세페이지 리뷰 상단 노출 최적화</li>
              <li>별점 4.8+ 유지 전략 수립</li>
              <li>부정 리뷰 완화 및 여론 관리</li>
            </ul>
          </div>

          {/* 02 랭킹 작업 */}
          <div class="oy-card oy-card--ranking">
            <div class="oy-card-img-wrap">
              <img src="/static/oy-images/oy-ranking.jpg" alt="랭킹 작업" class="oy-card-img" />
              <div class="oy-card-img-overlay">
                <span class="oy-card-img-badge oy-card-img-badge--ranking">Category Ranking</span>
              </div>
            </div>
            <div class="oy-card-header">
              <div class="oy-card-icon-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
              </div>
              <div>
                <p class="oy-card-en">Category Ranking</p>
                <h3 class="oy-card-title">랭킹 작업</h3>
              </div>
            </div>
            <div class="oy-card-tags">
              <span class="oy-tag">#상세페이지 활용</span>
              <span class="oy-tag">#보장형 상품</span>
            </div>
            <p class="oy-card-desc">
              카테고리별 <strong>랭킹 1위 보장형 상품</strong>을 운영하며, 상세페이지 캡처본을 제공해 실제 순위 상승을 투명하게 증명합니다.<br />
              경쟁이 치열한 카테고리에서도 <strong>TOP 9 이내</strong> 포지션을 안정적으로 확보합니다.
            </p>
            <ul class="oy-card-list">
              <li>카테고리별 랭킹 1위 보장 패키지</li>
              <li>실시간 순위 모니터링 및 캡처 제공</li>
              <li>TOP 9 진입 집중 전략 수립</li>
              <li>랭킹 유지 지속 관리 시스템</li>
            </ul>
          </div>

          {/* 03 상위 노출 */}
          <div class="oy-card oy-card--exposure">
            <div class="oy-card-img-wrap">
              <img src="/static/oy-images/oy-exposure.jpg" alt="상위 노출" class="oy-card-img" />
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
                <h3 class="oy-card-title">상위 노출</h3>
              </div>
            </div>
            <div class="oy-card-tags">
              <span class="oy-tag">#실구입자 작업 운영</span>
              <span class="oy-tag">#상시 고정 노출</span>
            </div>
            <p class="oy-card-desc">
              실시간 변동되는 올리브영 랭킹에서 <strong>부킹된 일정에 맞춰</strong> 실구매자 기반 보장형 노출을 안정적으로 유지합니다.<br />
              <strong>상시 고정 노출</strong>로 소비자가 검색할 때마다 브랜드가 가장 먼저 눈에 띕니다.
            </p>
            <ul class="oy-card-list">
              <li>실구매자 기반 노출 작업 운영</li>
              <li>검색 키워드별 상위 고정 노출</li>
              <li>일정 기반 안정적 스케줄 관리</li>
              <li>노출 성과 주간 리포트 제공</li>
            </ul>
          </div>

          {/* 04 구매 전환 */}
          <div class="oy-card oy-card--conversion oy-card--conversion-highlight">
            <div class="oy-conversion-header">
              <div class="oy-conversion-badge">✦ SYNERGY EFFECT</div>
              <div class="oy-card-header">
                <div class="oy-card-icon-wrap oy-card-icon-wrap--conversion">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
                </div>
                <div>
                  <p class="oy-card-en">Sales Conversion</p>
                  <h3 class="oy-card-title oy-card-title--conversion">구매 전환</h3>
                </div>
              </div>
            </div>
            <div class="oy-card-tags">
              <span class="oy-tag oy-tag--conversion">#통합 시너지</span>
              <span class="oy-tag oy-tag--conversion">#전환율 극대화</span>
            </div>
            <p class="oy-card-desc oy-card-desc--conversion">
              <strong>리뷰 마케팅 + 랭킹 작업 + 상위 노출</strong> 세 가지를 함께 진행할 때 시너지 효과가 극대화됩니다.<br />
              각 서비스가 유기적으로 연결되어 <strong>구매 전환율이 복합적으로 상승</strong>하는 선순환 구조를 만듭니다.
            </p>
            <div class="oy-conversion-flow">
              <div class="oy-cf-step">
                <span class="oy-cf-icon">⭐</span>
                <span>리뷰 마케팅</span>
              </div>
              <div class="oy-cf-arrow">+</div>
              <div class="oy-cf-step">
                <span class="oy-cf-icon">🏆</span>
                <span>랭킹 작업</span>
              </div>
              <div class="oy-cf-arrow">+</div>
              <div class="oy-cf-step">
                <span class="oy-cf-icon">🔍</span>
                <span>상위 노출</span>
              </div>
              <div class="oy-cf-arrow">→</div>
              <div class="oy-cf-result">
                <span class="oy-cf-icon">📈</span>
                <span>구매 전환 ↑</span>
              </div>
            </div>
            <div class="oy-conversion-kpi">
              <div class="oy-ckpi-item">
                <strong>+340%</strong>
                <span>평균 매출 증가</span>
              </div>
              <div class="oy-ckpi-divider"></div>
              <div class="oy-ckpi-item">
                <strong>TOP 5</strong>
                <span>카테고리 순위</span>
              </div>
              <div class="oy-ckpi-divider"></div>
              <div class="oy-ckpi-item">
                <strong>3개월</strong>
                <span>목표 달성 기간</span>
              </div>
            </div>
          </div>

        </div>{/* /oy-grid */}

        {/* 하단 배너 */}
        <div class="oy-scenario-banner">
          <div class="oy-sb-icon">💚</div>
          <div class="oy-sb-text">
            <strong>최상의 올리브영 커머스 시나리오를 제안합니다</strong>
            <span>리뷰 · 랭킹 · 노출 · 전환 — 4가지를 통합 운영할 때 가장 강력한 성과가 나옵니다</span>
          </div>
          <a href="/contact" class="oy-sb-btn">무료 상담 →</a>
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

        <div class="sdtl-wrap">
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
                <p class="sdtl-card-desc">브랜드 현황, 목표 카테고리, 예산, 희망 기간을 파악합니다. 리뷰·랭킹·노출 중 어떤 조합이 최적인지 전략을 수립하고 방향을 제시합니다.</p>
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
                <p class="sdtl-card-desc">올리브영 내 현재 상품 순위, 리뷰 현황, 별점 분포, 경쟁사 포지션을 데이터로 분석합니다. 성장 기회와 개선이 필요한 취약점을 명확히 도출합니다.</p>
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
                <p class="sdtl-card-desc">진행 서비스 범위, 목표 KPI(랭킹 순위·리뷰 수·별점), 일정을 계약서에 명확히 문서화합니다. 투명한 비용 구조로 신뢰를 바탕으로 한 파트너십을 구축합니다.</p>
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
                <p class="sdtl-card-desc">계약된 서비스를 각 특성에 맞춰 최적의 순서로 실행합니다. 리뷰 작성·랭킹 관리·노출 작업이 유기적으로 연동되어 시너지 효과를 극대화합니다.</p>
                <div class="seop-proc-chips" style="margin-top:12px">
                  <span class="seop-proc-chip" style="--cc:#03c75a">⭐ 리뷰 마케팅</span>
                  <span class="seop-proc-chip" style="--cc:#1a6bff">🏆 랭킹 작업</span>
                  <span class="seop-proc-chip" style="--cc:#f59e0b">🔍 상위 노출</span>
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
                <p class="sdtl-card-desc">캠페인 전 기간의 랭킹 변화, 리뷰 수·별점 추이, 노출량, 매출 변화를 수치로 정리한 종합 리포트를 제공합니다. 분석을 바탕으로 다음 성장 단계 전략까지 제안합니다.</p>
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
          <p class="sec-sub">올리브영 마케팅에 대해 가장 많이 묻는 질문들을 모았습니다.</p>
        </div>
        <div class="faq-wrap">
          {[
            { q:'올리브영 입점이 안 된 상태에서도 마케팅이 가능한가요?', a:'입점 전 <strong>시딩·리뷰 생태계 구축</strong>부터 진행 가능합니다. 입점 심사 시 기존 리뷰·인지도가 긍정적으로 작용하며, 입점 후 바로 HOT 상품 진입을 노릴 수 있도록 준비합니다.' },
            { q:'올리브영 랭킹은 어떤 기준으로 결정되나요?', a:'판매량, 리뷰 수·품질, 위시리스트 저장, 클릭률, 재구매율 등 <strong>다양한 지표</strong>가 복합적으로 반영됩니다. 인애드컴퍼니는 이 지표들을 체계적으로 개선하는 전략을 적용합니다.' },
            { q:'탑리뷰어 섭외는 어떻게 이루어지나요?', a:'인애드컴퍼니가 보유한 <strong>올리브영 탑리뷰어 DB</strong>를 통해 브랜드 카테고리에 맞는 리뷰어를 직접 섭외합니다. 리뷰 품질과 활동 이력을 사전 검증합니다.' },
            { q:'HOT 상품 진입까지 기간이 얼마나 걸리나요?', a:'브랜드 현황과 카테고리 경쟁 강도에 따라 다르지만, 집중 운영 시 <strong>1~3개월</strong> 내 카테고리 TOP 10 진입 사례가 많습니다.' },
            { q:'온라인 스토어와 오프라인 매장 모두 적용되나요?', a:'주력은 <strong>올리브영 온라인몰</strong> 최적화이며, 온라인 성과가 오프라인 매장 발주에도 연동되는 구조를 활용합니다. 오프라인 매대 노출 전략도 함께 제안합니다.' },
            { q:'경쟁 브랜드가 많은 카테고리에서도 효과가 있나요?', a:'경쟁이 치열할수록 <strong>데이터 기반 차별화 전략</strong>이 중요합니다. 경쟁사 리뷰·키워드 분석을 통해 공략 포인트를 발굴하고, 틈새 공략으로 효율적인 순위 상승을 달성합니다.' },
          ].map((item, i) => (
            <div class="faq-item" id={`faq-oy-${i}`}>
              <button class="faq-q" type="button" onclick={`(function(btn){var item=btn.closest('.faq-item');var isOpen=item.classList.contains('faq-item--open');document.querySelectorAll('.faq-item').forEach(function(el){el.classList.remove('faq-item--open');});if(!isOpen){item.classList.add('faq-item--open');}})(this)`}>
                <div class="faq-q-left">
                  <span class="faq-q-badge">Q</span>
                  <span class="faq-q-text">{item.q}</span>
                </div>
                <span class="faq-chevron"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><polyline points="6 9 12 15 18 9"/></svg></span>
              </button>
              <div class="faq-a"><div class="faq-a-inner" dangerouslySetInnerHTML={{__html: item.a}} /></div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ══ CTA ══ */}
    <section class="svc-cta-section">
      <div class="container">
        <div class="svc-cta-inner">
          <div class="svc-cta-text">
            <h2>올리브영에서<br /><em>브랜드를 폭발 성장시키세요</em></h2>
            <p>인애드컴퍼니 전문가가 올리브영 채널 최적화 전략을 무료로 진단해드립니다.</p>
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
  </>
)
