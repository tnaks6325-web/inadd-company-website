export const SvcInfluencerPage = () => (
  <>
    {/* ══ HERO ══ */}
    <section class="vh-hero">
      <canvas id="vhCanvas2" class="vh-canvas"></canvas>
      <div class="vh-bg">
        <div class="vh-orb vh-orb--1" style="background:radial-gradient(circle,rgba(168,85,247,0.26) 0%,transparent 70%)"></div>
        <div class="vh-orb vh-orb--2" style="background:radial-gradient(circle,rgba(236,72,153,0.18) 0%,transparent 70%)"></div>
        <div class="vh-orb vh-orb--3" style="background:radial-gradient(circle,rgba(26,107,255,0.20) 0%,transparent 70%)"></div>
        <div class="vh-grid"></div>
        <div class="vh-noise"></div>
      </div>

      <div class="container vh-inner">
        <a href="/marketing" class="svc-back-link vh-back">← Marketing 전체보기</a>

        <div class="vh-badge" style="color:rgba(168,85,247,0.95);border-color:rgba(168,85,247,0.35);background:rgba(168,85,247,0.08)">
          <span class="vh-badge-dot" style="background:rgba(168,85,247,1);box-shadow:0 0 8px rgba(168,85,247,0.9)"></span>
          <span>INFLUENCER &amp; YOUTUBE MARKETING</span>
        </div>

        <h1 class="vh-title">
          <span class="vh-tline" id="ifL1">'좋은것 같다'는 추측이 아닌,</span>
          <span class="vh-tline" id="ifL2" style="background:linear-gradient(135deg,#fff 20%,rgba(168,85,247,0.95) 60%,rgba(236,72,153,0.85) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">'이겁니다'를 말해드립니다.</span>
        </h1>

        <div class="vh-sub-wrap" id="ifSub">
          <p class="vh-sub">인애드만의 <strong style="color:rgba(255,255,255,0.9)">인플루언서 분석 프로그램</strong>을 통해 필터링 후</p>
          <p class="vh-sub">브랜드 메시지와 크리에이터 핏을 비교 및 제안합니다.</p>
          <p class="vh-sub" style="margin-top:12px">데이터 기반의 정교한 매칭으로 <span style="color:rgba(168,85,247,0.9);font-weight:600">최고의 퍼포먼스를 창출합니다.</span></p>
        </div>

        <div class="vh-kpi-strip" id="ifKpi">
          <div class="vh-kpi-item">
            <strong class="vh-kpi-num" style="color:#a855f7">1,200+</strong>
            <span class="vh-kpi-label">파트너 크리에이터</span>
          </div>
          <div class="vh-kpi-sep"></div>
          <div class="vh-kpi-item">
            <strong class="vh-kpi-num">+580%</strong>
            <span class="vh-kpi-label">최대 매출 증가</span>
          </div>
          <div class="vh-kpi-sep"></div>
          <div class="vh-kpi-item">
            <strong class="vh-kpi-num">98%</strong>
            <span class="vh-kpi-label">재계약률</span>
          </div>
        </div>

        <div class="vh-btns" id="ifBtns">
          <a href="/contact" class="hero-cta-btn primary">
            <span>무료 전략 상담받기</span>
            <svg viewBox="0 0 24 24" fill="none"><path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
          <a href="#ifl-services" class="vh-scroll-btn">
            <span>서비스 보기</span>
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
  s.onload=function(){ initSvcThreeBg(0xa855f7, 0xec4899, 0x6478ff); };
  document.head.appendChild(s);
  function anim(el,delay,dir){if(!el)return;el.style.opacity='0';el.style.transform=dir==='up'?'translateY(32px)':'translateX(-32px)';el.style.transition='opacity .9s cubic-bezier(.25,.46,.45,.94),transform .9s cubic-bezier(.25,.46,.45,.94)';setTimeout(function(){el.style.opacity='1';el.style.transform='none';},delay);}
  anim(document.getElementById('ifL1'),200,'left');
  anim(document.getElementById('ifL2'),440,'left');
  anim(document.getElementById('ifSub'),700,'up');
  anim(document.getElementById('ifKpi'),940,'up');
  anim(document.getElementById('ifBtns'),1140,'up');
})();
      `}} />
    </section>

    {/* ══ 서비스 앵커 ══ */}
    <div id="ifl-services"></div>


    {/* ══════════════════════════════════════════
        DATA & FILTERING SECTION
    ══════════════════════════════════════════ */}
    <section class="ifl-data-section">

      {/* ── 배경 레이어 ── */}
      <div class="ifl-data-bg">
        <div class="ifl-data-grid-lines"></div>
        <div class="ifl-data-orb ifl-data-orb--blue"></div>
        <div class="ifl-data-orb ifl-data-orb--purple"></div>
        <div class="ifl-data-orb ifl-data-orb--cyan"></div>
        {/* 파티클 도트 */}
        <div class="ifl-data-particles">
          <span class="ifl-dp dp1"></span><span class="ifl-dp dp2"></span>
          <span class="ifl-dp dp3"></span><span class="ifl-dp dp4"></span>
          <span class="ifl-dp dp5"></span><span class="ifl-dp dp6"></span>
          <span class="ifl-dp dp7"></span><span class="ifl-dp dp8"></span>
        </div>
        {/* 수평 글로우 라인 */}
        <div class="ifl-data-glow-line ifl-data-glow-line--top"></div>
        <div class="ifl-data-glow-line ifl-data-glow-line--bottom"></div>
      </div>

      <div class="container">

        {/* ── 섹션 헤드 ── */}
        <div class="ifl-data-head">
          <span class="ifl-data-eyebrow">DATA-DRIVEN CREATOR CURATION</span>
          <h2 class="ifl-data-heading">
            숫자보다 맥락을 읽고,<br />
            <em>맞는 크리에이터를 찾아드립니다</em>
          </h2>
          <p class="ifl-data-subhead">
            구독자 수치만으로는 광고의 성과를 담보할 수 없습니다.<br />
            실질적인 데이터를 기반으로 <strong>브랜드에 진짜 맞는 크리에이터</strong>를
            신중하게 검토하고 제안해 드립니다.
          </p>

          {/* 3단계 플로우 */}
          <div class="ifl-data-flow">
            <div class="ifl-data-flow-step" data-step="01">
              <div class="ifl-data-flow-img-wrap">
                <img src="/static/images/process/flow-collect.jpg" alt="데이터 수집" />
                <div class="ifl-data-flow-img-overlay"></div>
                <div class="ifl-data-flow-label-wrap">
                  <div class="ifl-data-flow-label">데이터 수집</div>
                  <div class="ifl-data-flow-sub">조회수 · 구독자 · 유지율</div>
                </div>
              </div>
            </div>
            <div class="ifl-data-flow-arrow">
              <svg viewBox="0 0 40 12" fill="none"><path d="M0 6 H34 M28 1 L34 6 L28 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
            <div class="ifl-data-flow-step" data-step="02">
              <div class="ifl-data-flow-img-wrap">
                <img src="/static/images/process/flow-review.jpg" alt="면밀한 검토" />
                <div class="ifl-data-flow-img-overlay"></div>
                <div class="ifl-data-flow-label-wrap">
                  <div class="ifl-data-flow-label">면밀한 검토</div>
                  <div class="ifl-data-flow-sub">전문가 기준으로 엄선</div>
                </div>
              </div>
            </div>
            <div class="ifl-data-flow-arrow">
              <svg viewBox="0 0 40 12" fill="none"><path d="M0 6 H34 M28 1 L34 6 L28 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
            <div class="ifl-data-flow-step ifl-data-flow-step--accent" data-step="03">
              <div class="ifl-data-flow-img-wrap">
                <img src="/static/images/process/flow-propose.jpg" alt="합리적 제안" />
                <div class="ifl-data-flow-img-overlay ifl-data-flow-img-overlay--accent"></div>
                <div class="ifl-data-flow-label-wrap">
                  <div class="ifl-data-flow-label">합리적 제안</div>
                  <div class="ifl-data-flow-sub">거품 없이, 목적에 맞게</div>
                </div>
              </div>
            </div>
          </div>

          {/* 카운터 배지 바 */}
          <div class="ifl-data-counter-bar">
            <div class="ifl-data-counter-item">
              <span class="ifl-data-counter-num" data-target="1520">0</span>
              <span class="ifl-data-counter-unit">+</span>
              <span class="ifl-data-counter-label">검증 크리에이터</span>
            </div>
            <div class="ifl-data-counter-divider"></div>
            <div class="ifl-data-counter-item">
              <span class="ifl-data-counter-num" data-target="97">0</span>
              <span class="ifl-data-counter-unit">%</span>
              <span class="ifl-data-counter-label">실제 활동 채널</span>
            </div>
            <div class="ifl-data-counter-divider"></div>
            <div class="ifl-data-counter-item ifl-data-counter-item--live">
              <span class="ifl-data-live-dot"></span>
              <span class="ifl-data-counter-label">기준 미달 시 실시간 제외</span>
            </div>
          </div>
        </div>

        {/* ── 01 — 데이터를 읽는 눈 ── */}
        <div class="ifl-data-row">
          <div class="ifl-data-text">
            <div class="ifl-data-num">01</div>
            <h3 class="ifl-data-title">구독자 수 너머의 지표로<br /><strong>광고 효과를 미리 가늠합니다</strong></h3>
            <p class="ifl-data-desc">
              크리에이터를 제안드릴 때, 구독자 수는 하나의 참고 지표일 뿐입니다.
              <strong>구독자 대비 실제 조회수 달성률</strong>, 영상별 유지율을 함께 살펴보고
              광고 효과를 미리 검토한 뒤 제안드립니다.
            </p>
            <ul class="ifl-data-points">
              <li><span class="ifl-data-dot"></span>구독자 대비 조회수 달성률 — 채널 실질 영향력 파악</li>
              <li><span class="ifl-data-dot"></span>조회수 유지율 — 광고 노출 구간 예측</li>
              <li><span class="ifl-data-dot"></span>구독자 이상 급증 채널은 제안 대상에서 제외</li>
            </ul>
            <div class="ifl-data-insight-bar">
              <svg viewBox="0 0 18 18" fill="none" width="16" height="16"><circle cx="9" cy="9" r="8" stroke="#1a6bff" stroke-width="1.4"/><path d="M9 5v4l3 2" stroke="#1a6bff" stroke-width="1.4" stroke-linecap="round"/></svg>
              <span>검토 후 <strong>제안서 전달까지 평균 24시간 이내</strong></span>
            </div>
          </div>
          <div class="ifl-data-img-wrap ifl-data-img-wrap--report">
            <img src="/static/images/process/data-report.jpg" alt="구독자 수 및 조회수 추이 데이터 리포트 차트" />
          </div>
        </div>

        {/* ── 02 — 합리적 제안을 위한 선별 시스템 ── */}
        <div class="ifl-data-row ifl-data-row--rev">
          <div class="ifl-data-img-wrap ifl-data-img-wrap--filter">
            <img src="/static/images/process/filter-list.jpg" alt="크리에이터 상세 분석 리스트 뷰" class="ifl-filter-img ifl-filter-img--top" />
            <img src="/static/images/process/filter-grid.jpg" alt="크리에이터 그리드 필터링 시스템" class="ifl-filter-img ifl-filter-img--bottom" />
          </div>
          <div class="ifl-data-text">
            <div class="ifl-data-num">02</div>
            <h3 class="ifl-data-title">어떤 조건이든 세밀하게 맞춰<br /><strong>꼭 맞는 크리에이터를 찾아드립니다</strong></h3>
            <p class="ifl-data-desc">
              카테고리, 구독자 규모, 업로드 주기 등 —
              브랜드의 목적과 예산에 맞는 채널을 <strong>1,520+개 검증 DB에서 신중하게 추려</strong>
              제안드립니다. 기준에 미치지 못하는 채널은 DB에서 지속적으로 정리됩니다.
            </p>

            {/* 필터 태그 칩 */}
            <div class="ifl-data-tags">
              <span class="ifl-data-tag"># 영상 조회수 유지율 최상위</span>
              <span class="ifl-data-tag"># 연예인/셀럽 인플루언서</span>
              <span class="ifl-data-tag"># 커플/부부 라이프스타일</span>
              <span class="ifl-data-tag"># 먹방/맛집 투어 전문</span>
              <span class="ifl-data-tag"># 남성 패션/그루밍</span>
              <span class="ifl-data-tag"># 급상승 구독자 알고리즘 침투</span>
              <span class="ifl-data-tag ifl-data-tag--more"># 조회수 대비 저평가 가성비 유튜버</span>
            </div>

            {/* 실시간 DB 배지 */}
            <div class="ifl-data-db-badge">
              <div class="ifl-data-db-left">
                <span class="ifl-data-live-dot"></span>
                <span class="ifl-data-db-live-text">LIVE DB</span>
              </div>
              <div class="ifl-data-db-right">
                <strong class="ifl-data-counter-num" data-target="1520">0</strong>
                <span class="ifl-data-db-plus">+</span>
                <span class="ifl-data-db-label">Verified Creators</span>
              </div>
              <div class="ifl-data-db-sub">기준 미달 크리에이터는 실시간으로 DB에서 제외됩니다</div>
            </div>
          </div>
        </div>

      </div>
    </section>

    {/* ══════════════════════════════════════════
        DIFFERENTIATOR — 인애드컴퍼니의 제안 크리에이터
    ══════════════════════════════════════════ */}
    <section class="ifl2-diff-section">
      <div class="ifl2-diff-bg">
        <div class="ifl2-diff-orb ifl2-diff-orb--blue"></div>
        <div class="ifl2-diff-orb ifl2-diff-orb--purple"></div>
        <div class="ifl2-diff-grid"></div>
      </div>
      <div class="container">
        <div class="ifl2-diff-layout">

          {/* ── 왼쪽: 타이틀 + 설명 ── */}
          <div class="ifl2-diff-left">
            <span class="ifl2-diff-sup">INFLUENCER &amp; YOUTUBE MARKETING</span>
            <h2 class="ifl2-diff-title">
              인애드컴퍼니의<br />
              <em>제안 크리에이터</em>
            </h2>
            <blockquote class="ifl2-diff-quote">
              "인애드컴퍼니는<br />
              대한민국 크리에이터 시장의<br />
              <strong>거품가를 인지하고</strong><br />
              최대한 <strong>합리적인 크리에이터</strong>로<br />
              제안드립니다."
            </blockquote>
            <ul class="ifl2-diff-criteria">
              <li>
                <div class="ifl2-diff-cicon ifl2-diff-cicon--ban">
                  <svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="1.5"/><path d="M4 4l12 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
                </div>
                <span>시장 과열가 배제</span>
              </li>
              <li>
                <div class="ifl2-diff-cicon ifl2-diff-cicon--search">
                  <svg viewBox="0 0 20 20" fill="none"><circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" stroke-width="1.5"/><path d="M14 14l3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
                </div>
                <span>비용 대비 퍼포먼스 검증</span>
              </li>
              <li>
                <div class="ifl2-diff-cicon ifl2-diff-cicon--growth">
                  <svg viewBox="0 0 20 20" fill="none"><path d="M3 15l4-5 4 3 6-8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </div>
                <span>성장 포텐셜 분석</span>
              </li>
            </ul>
          </div>

          {/* ── 세로 구분선 ── */}
          <div class="ifl2-diff-divider"></div>

          {/* ── 오른쪽: 케이스 카드 ── */}
          <div class="ifl2-diff-right">

            {/* CASE 1 — 합리적 제안 */}
            <div class="ifl2-case-card ifl2-case-card--good">
              <div class="ifl2-case-glow"></div>
              <div class="ifl2-case-header">
                <div class="ifl2-case-badge ifl2-case-badge--good">
                  <svg viewBox="0 0 12 12" fill="none" width="10" height="10"><circle cx="6" cy="6" r="5" fill="rgba(26,107,255,0.3)"/><path d="M3 6l2 2 4-4" stroke="rgba(26,107,255,1)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  진행 확정
                </div>
                <span class="ifl2-case-title">CASE: 합리적 제안</span>
                <div class="ifl2-case-check">
                  <svg viewBox="0 0 24 24" fill="none" width="20" height="20"><circle cx="12" cy="12" r="10" fill="rgba(26,107,255,0.15)" stroke="rgba(26,107,255,0.5)" stroke-width="1.5"/><path d="M7 12l3.5 3.5L17 8" stroke="rgba(26,107,255,0.9)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </div>
              </div>
              <div class="ifl2-case-price">
                <div class="ifl2-case-price-from">
                  <span class="ifl2-case-price-label">내부 예상 단가</span>
                  <span class="ifl2-case-price-val">800 – 1,000만원</span>
                </div>
                <div class="ifl2-case-arrow">
                  <svg viewBox="0 0 24 10" fill="none" width="28"><path d="M0 5h22M17 1l5 4-5 4" stroke="rgba(26,107,255,0.7)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </div>
                <div class="ifl2-case-price-to">
                  <span class="ifl2-case-price-label ifl2-case-price-label--em">실제 집행 비용</span>
                  <span class="ifl2-case-price-num ifl2-case-price-num--good">500만원</span>
                </div>
              </div>
              <ul class="ifl2-case-points ifl2-case-points--good">
                <li>예상보다 하회 단가 / 높은 퍼포먼스 / 팬층 반응도 고루 보유</li>
                <li>비슷한 수준의 퍼포먼스는 보통 준메이저급부터 나오는 편</li>
                <li>향후 성장 포텐셜 <strong>매우 높음</strong></li>
              </ul>
            </div>

            {/* CASE 2 — 비효율 제안 */}
            <div class="ifl2-case-card ifl2-case-card--bad">
              <div class="ifl2-case-header">
                <div class="ifl2-case-badge ifl2-case-badge--bad">
                  <svg viewBox="0 0 12 12" fill="none" width="10" height="10"><circle cx="6" cy="6" r="5" fill="rgba(100,100,120,0.3)"/><path d="M4 4l4 4M8 4l-4 4" stroke="rgba(140,140,160,0.8)" stroke-width="1.2" stroke-linecap="round"/></svg>
                  리스트 삭제
                </div>
                <span class="ifl2-case-title ifl2-case-title--bad">CASE: 비효율 제안</span>
                <div class="ifl2-case-check ifl2-case-check--bad">
                  <svg viewBox="0 0 24 24" fill="none" width="20" height="20"><circle cx="12" cy="12" r="10" fill="rgba(80,80,100,0.15)" stroke="rgba(100,100,130,0.35)" stroke-width="1.5"/><path d="M8 8l8 8M16 8l-8 8" stroke="rgba(120,120,140,0.6)" stroke-width="1.5" stroke-linecap="round"/></svg>
                </div>
              </div>
              <div class="ifl2-case-price ifl2-case-price--bad">
                <div class="ifl2-case-price-from">
                  <span class="ifl2-case-price-label">내부 예상 단가</span>
                  <span class="ifl2-case-price-val">200 – 300만원</span>
                </div>
                <div class="ifl2-case-arrow">
                  <svg viewBox="0 0 24 10" fill="none" width="28"><path d="M0 5h22M17 1l5 4-5 4" stroke="rgba(120,120,140,0.45)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </div>
                <div class="ifl2-case-price-to">
                  <span class="ifl2-case-price-label">실제 집행 비용</span>
                  <span class="ifl2-case-price-num ifl2-case-price-num--bad">500만원</span>
                </div>
              </div>
              <ul class="ifl2-case-points ifl2-case-points--bad">
                <li>1개월 내 광고 미집행 / 낮은 퍼포먼스 / 예상대비 고비용</li>
                <li>광고 시장득성상 괜찮은 크리에이터는 1개월 내 광고 필수 진행</li>
                <li>향후 성장 포텐셜 <strong>낮음</strong> (리스트 가치가 낮음)</li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </section>


    {/* ══════════════════════════════════════════
        SERVICE TABS — 섭외/협찬 · 콘텐츠 유형 · 모델
    ══════════════════════════════════════════ */}
    <section class="svctab-section" id="svctabSection">
      <div class="svctab-bg">
        <div class="svctab-orb svctab-orb--a"></div>
        <div class="svctab-orb svctab-orb--b"></div>
        <div class="svctab-grid"></div>
      </div>
      <div class="container" style="position:relative;z-index:1">

        {/* ── 대분류 탭 ── */}
        <div class="svctab-nav" id="svctabNav">
          <button class="svctab-btn active" data-tab="0">
            <span class="svctab-btn-num">01</span>
            <span class="svctab-btn-label">섭외 / 협찬</span>
            <span class="svctab-btn-sub">Creator Casting</span>
          </button>
          <div class="svctab-divider"></div>
          <button class="svctab-btn" data-tab="1">
            <span class="svctab-btn-num">02</span>
            <span class="svctab-btn-label">콘텐츠 유형</span>
            <span class="svctab-btn-sub">Content Types</span>
          </button>
          <div class="svctab-divider"></div>
          <button class="svctab-btn" data-tab="2">
            <span class="svctab-btn-num">03</span>
            <span class="svctab-btn-label">모델</span>
            <span class="svctab-btn-sub">Model Service</span>
          </button>
        </div>

        {/* ── 탭 패널 0 : 섭외 / 협찬 ── */}
        <div class="svctab-panel active" id="svctabPanel0">
          <div class="svctab-panel-head">
            <p class="svctab-panel-eyebrow">CREATOR CASTING</p>
            <h2 class="svctab-panel-title">연예인 &amp; 인플루언서 <em>섭외 / 협찬</em></h2>
            <p class="svctab-panel-lead">브랜드 예산과 목적에 맞게, <strong>최적의 크리에이터 전략</strong>을 설계합니다.</p>
          </div>

          {/* 중분류 아코디언 */}
          <div class="svctab-acc" id="acc0">

            {/* 중분류 01 — 연예인 섭외/협찬 */}
            <div class="svctab-item" data-acc="0-0">
              <button class="svctab-item-trigger active">
                <div class="svctab-item-left">
                  <span class="svctab-item-idx">01</span>
                  <div class="svctab-item-info">
                    <span class="svctab-item-name">연예인 섭외 / 협찬</span>
                    <span class="svctab-item-en">Celebrity Casting</span>
                  </div>
                </div>
                <div class="svctab-item-arrow">
                  <svg viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </div>
              </button>
              <div class="svctab-item-body open">
                <div class="svctab-item-content">
                  <div class="svctab-infocard" style="border-top-color:#fbbf24">
                    <div class="sic-header">
                      <span class="sic-icon">🎬</span>
                      <span class="sic-label">Celebrity Casting</span>
                    </div>
                    <div class="sic-stats">
                      <div class="sic-stat">
                        <span class="sic-num">Top</span>
                        <span class="sic-desc">탑·미들 연예인<br/>전 구간 대응</span>
                      </div>
                      <div class="sic-stat">
                        <span class="sic-num">∞</span>
                        <span class="sic-desc">팬덤 기반<br/>폭발적 확산</span>
                      </div>
                      <div class="sic-stat">
                        <span class="sic-num">PPL</span>
                        <span class="sic-desc">협찬·광고<br/>통합 운영</span>
                      </div>
                    </div>
                    <p class="sic-quote">"연예인 파워로 브랜드를 단숨에 각인"</p>
                  </div>
                  <div class="svctab-item-desc">
                    <div class="svctab-desc-tags">
                      <span style="--tc:#fbbf24">브랜딩 강화</span>
                      <span style="--tc:#fbbf24">팬덤 마케팅</span>
                      <span style="--tc:#fbbf24">퍼포먼스 광고</span>
                      <span style="--tc:#fbbf24">판매 촉진</span>
                    </div>
                    <p class="svctab-desc-text">연예인의 강력한 <strong>팬덤과 채널 콘텐츠</strong>를 동시에 활용해 팬층을 집중 공략하고, 브랜드 인지도를 폭발적으로 확장합니다. 공식 협찬부터 자연스러운 PPL까지 목적에 맞는 방식을 제안합니다.</p>
                    <ul class="svctab-desc-points">
                      <li><span class="svctab-desc-dot" style="--dc:#fbbf24"></span>강력한 팬덤 기반 빠른 인지도 확산</li>
                      <li><span class="svctab-desc-dot" style="--dc:#fbbf24"></span>채널 콘텐츠 + 협찬 연계로 시너지 극대화</li>
                      <li><span class="svctab-desc-dot" style="--dc:#fbbf24"></span>미들~탑 연예인 섭외 모두 대응 가능</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 중분류 02 — 인플루언서 섭외/협찬 */}
            <div class="svctab-item" data-acc="0-1">
              <button class="svctab-item-trigger">
                <div class="svctab-item-left">
                  <span class="svctab-item-idx">02</span>
                  <div class="svctab-item-info">
                    <span class="svctab-item-name">인플루언서 섭외 / 협찬</span>
                    <span class="svctab-item-en">Influencer Casting</span>
                  </div>
                </div>
                <div class="svctab-item-arrow">
                  <svg viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </div>
              </button>
              <div class="svctab-item-body">
                <div class="svctab-item-content">
                  <div class="svctab-infocard" style="border-top-color:#a78bfa">
                    <div class="sic-header">
                      <span class="sic-icon">⭐</span>
                      <span class="sic-label">Influencer Casting</span>
                    </div>
                    <div class="sic-stats">
                      <div class="sic-stat">
                        <span class="sic-num">1,520<span class="sic-unit">+</span></span>
                        <span class="sic-desc">검증된<br/>크리에이터 DB</span>
                      </div>
                      <div class="sic-stat">
                        <span class="sic-num">Nano<br/><span style="font-size:11px">~Mega</span></span>
                        <span class="sic-desc">전 구간<br/>대응 가능</span>
                      </div>
                      <div class="sic-stat">
                        <span class="sic-num">ROI</span>
                        <span class="sic-desc">데이터 기반<br/>고효율 매칭</span>
                      </div>
                    </div>
                    <p class="sic-quote">"정확한 타겟에 정확히 도달하는 방법"</p>
                  </div>
                  <div class="svctab-item-desc">
                    <div class="svctab-desc-tags">
                      <span style="--tc:#a78bfa">인지도 상승</span>
                      <span style="--tc:#a78bfa">시청층 타겟</span>
                      <span style="--tc:#a78bfa">합리적 비용</span>
                      <span style="--tc:#a78bfa">판매 촉진</span>
                    </div>
                    <p class="svctab-desc-text">연예인 대비 <strong>합리적인 비용으로 고효율</strong>을 끌어내는 전략. 검증된 1,520+ DB에서 브랜드 목표에 딱 맞는 크리에이터를 선별해 정확한 타겟에게 도달합니다.</p>
                    <ul class="svctab-desc-points">
                      <li><span class="svctab-desc-dot" style="--dc:#a78bfa"></span>조회율·구독자 품질 기준 검증된 크리에이터 매칭</li>
                      <li><span class="svctab-desc-dot" style="--dc:#a78bfa"></span>나노~메가 인플루언서 전 구간 대응</li>
                      <li><span class="svctab-desc-dot" style="--dc:#a78bfa"></span>인스타그램 피드 연계 확산까지 통합 운영</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 중분류 03 — 인스타 피드 연계 */}
            <div class="svctab-item" data-acc="0-2">
              <button class="svctab-item-trigger">
                <div class="svctab-item-left">
                  <span class="svctab-item-idx">03</span>
                  <div class="svctab-item-info">
                    <span class="svctab-item-name">인스타 피드 연계</span>
                    <span class="svctab-item-en">Instagram Feed Integration</span>
                  </div>
                </div>
                <div class="svctab-item-arrow">
                  <svg viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </div>
              </button>
              <div class="svctab-item-body">
                <div class="svctab-item-content">
                  <div class="svctab-infocard" style="border-top-color:#f472b6">
                    <div class="sic-header">
                      <span class="sic-icon">📸</span>
                      <span class="sic-label">Instagram Feed</span>
                    </div>
                    <div class="sic-stats">
                      <div class="sic-stat">
                        <span class="sic-num">Feed</span>
                        <span class="sic-desc">인스타 피드<br/>자연 노출</span>
                      </div>
                      <div class="sic-stat">
                        <span class="sic-num">Reels</span>
                        <span class="sic-desc">숏폼 연계<br/>바이럴 확산</span>
                      </div>
                      <div class="sic-stat">
                        <span class="sic-num">2배</span>
                        <span class="sic-desc">유튜브 연계 시<br/>도달 시너지</span>
                      </div>
                    </div>
                    <p class="sic-quote">"유튜브 협찬 + 인스타 확산 동시 집행"</p>
                  </div>
                  <div class="svctab-item-desc">
                    <div class="svctab-desc-tags">
                      <span style="--tc:#f472b6">팬덤 소통</span>
                      <span style="--tc:#f472b6">브랜드 친밀감</span>
                      <span style="--tc:#f472b6">피드 전략</span>
                      <span style="--tc:#f472b6">진정성</span>
                    </div>
                    <p class="svctab-desc-text">단순 노출을 넘어 <strong>팬덤 소통과 브랜드 친밀감</strong>을 동시에 강화합니다. 정교한 인스타그램 피드 전략으로 진정성 있는 팬층을 공략하고 브랜드 확산을 유도합니다.</p>
                    <ul class="svctab-desc-points">
                      <li><span class="svctab-desc-dot" style="--dc:#f472b6"></span>피드·스토리·릴스 통합 콘텐츠 기획</li>
                      <li><span class="svctab-desc-dot" style="--dc:#f472b6"></span>팬덤 기반 자연스러운 브랜드 노출</li>
                      <li><span class="svctab-desc-dot" style="--dc:#f472b6"></span>인플루언서 협찬과 연계해 확산 시너지 극대화</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

          </div>{/* /acc0 */}

          {/* ── 섭외/협찬 하단 CTA ── */}
          <div class="svctab-inline-cta">
            <p class="svctab-cta-msg">
              상담을 남기시면 유형에 맞는 <strong>레퍼런스</strong>를 받아 보실 수 있습니다.
            </p>
            <a href="/contact" class="svctab-cta-btn">
              상담 남기기
              <svg viewBox="0 0 24 24" fill="none" width="14" height="14">
                <path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
          </div>

        </div>{/* /panel0 */}

        {/* ── 탭 패널 1 : 콘텐츠 유형 ── */}
        <div class="svctab-panel" id="svctabPanel1">
          <div class="svctab-panel-head">
            <p class="svctab-panel-eyebrow">CONTENT TYPES</p>
            <h2 class="svctab-panel-title">콘텐츠 <em>유형</em></h2>
            <p class="svctab-panel-lead">브랜드 메시지가 콘텐츠 자체가 되도록 — 목적별 <strong>4가지 콘텐츠 유형</strong>을 제공합니다.</p>
          </div>

          <div class="svctab-acc" id="acc1">

            {/* 중분류 01 — 브랜디드 콘텐츠 */}
            <div class="svctab-item" data-acc="1-0">
              <button class="svctab-item-trigger active">
                <div class="svctab-item-left">
                  <span class="svctab-item-idx">01</span>
                  <div class="svctab-item-info">
                    <span class="svctab-item-name">브랜디드 콘텐츠</span>
                    <span class="svctab-item-en">Branded Content</span>
                  </div>
                </div>
                <div class="svctab-item-arrow">
                  <svg viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </div>
              </button>
              <div class="svctab-item-body open">
                <div class="svctab-item-content">
                  <div class="svctab-infocard" style="border-top-color:#60a5fa">
                    <div class="sic-header">
                      <span class="sic-icon">🎨</span>
                      <span class="sic-label">Branded Content</span>
                    </div>
                    <div class="sic-stats">
                      <div class="sic-stat">
                        <span class="sic-num">100%</span>
                        <span class="sic-desc">광고 인식<br/>없는 자연 노출</span>
                      </div>
                      <div class="sic-stat">
                        <span class="sic-num">세계관</span>
                        <span class="sic-desc">크리에이터<br/>스토리 융합</span>
                      </div>
                      <div class="sic-stat">
                        <span class="sic-num">프리미엄</span>
                        <span class="sic-desc">고관여<br/>콘텐츠 설계</span>
                      </div>
                    </div>
                    <p class="sic-quote">"광고가 아닌 콘텐츠로 소비자를 설득"</p>
                  </div>
                  <div class="svctab-item-desc">
                    <div class="svctab-desc-tags">
                      <span style="--tc:#60a5fa">스토리텔링</span>
                      <span style="--tc:#60a5fa">프리미엄 제작</span>
                      <span style="--tc:#60a5fa">세계관 연계</span>
                    </div>
                    <p class="svctab-desc-text">브랜드 메시지를 콘텐츠 그 자체로 승화시킵니다. 광고라는 인식 없이 크리에이터의 세계관과 브랜드 스토리가 완벽하게 융합된 <strong>프리미엄 콘텐츠</strong>를 제작합니다.</p>
                    <ul class="svctab-desc-points">
                      <li><span class="svctab-desc-dot" style="--dc:#60a5fa"></span>크리에이터 세계관 연계 기획</li>
                      <li><span class="svctab-desc-dot" style="--dc:#60a5fa"></span>브랜드 스토리텔링 극대화</li>
                      <li><span class="svctab-desc-dot" style="--dc:#60a5fa"></span>자연스러운 메시지 임베딩</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 중분류 02 — 기획 PPL */}
            <div class="svctab-item" data-acc="1-1">
              <button class="svctab-item-trigger">
                <div class="svctab-item-left">
                  <span class="svctab-item-idx">02</span>
                  <div class="svctab-item-info">
                    <span class="svctab-item-name">기획 PPL</span>
                    <span class="svctab-item-en">Planned PPL</span>
                  </div>
                </div>
                <div class="svctab-item-arrow">
                  <svg viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </div>
              </button>
              <div class="svctab-item-body">
                <div class="svctab-item-content">
                  <div class="svctab-infocard" style="border-top-color:#34d399">
                    <div class="sic-header">
                      <span class="sic-icon">🎭</span>
                      <span class="sic-label">Planned PPL</span>
                    </div>
                    <div class="sic-stats">
                      <div class="sic-stat">
                        <span class="sic-num">자연</span>
                        <span class="sic-desc">콘텐츠 흐름<br/>속 자연 배치</span>
                      </div>
                      <div class="sic-stat">
                        <span class="sic-num">低</span>
                        <span class="sic-desc">시청자<br/>이탈률 최소화</span>
                      </div>
                      <div class="sic-stat">
                        <span class="sic-num">신뢰</span>
                        <span class="sic-desc">브랜드<br/>친밀감 형성</span>
                      </div>
                    </div>
                    <p class="sic-quote">"보는 사람이 광고라 느끼지 않는 광고"</p>
                  </div>
                  <div class="svctab-item-desc">
                    <div class="svctab-desc-tags">
                      <span style="--tc:#34d399">자연 노출</span>
                      <span style="--tc:#34d399">이탈률 최소화</span>
                      <span style="--tc:#34d399">브랜드 친밀감</span>
                    </div>
                    <p class="svctab-desc-text">소비자가 광고임을 인식하지 못한 채 브랜드를 자연스럽게 경험하게 하는 방식. 콘텐츠 흐름 안에 제품을 녹여내어 <strong>거부감 없이 브랜드 인지도</strong>를 높입니다.</p>
                    <ul class="svctab-desc-points">
                      <li><span class="svctab-desc-dot" style="--dc:#34d399"></span>콘텐츠 흐름 내 자연스러운 제품 노출</li>
                      <li><span class="svctab-desc-dot" style="--dc:#34d399"></span>시청자 이탈률 최소화</li>
                      <li><span class="svctab-desc-dot" style="--dc:#34d399"></span>브랜드 친밀감 및 신뢰 형성</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 중분류 03 — 숏폼 콘텐츠 */}
            <div class="svctab-item" data-acc="1-2">
              <button class="svctab-item-trigger">
                <div class="svctab-item-left">
                  <span class="svctab-item-idx">03</span>
                  <div class="svctab-item-info">
                    <span class="svctab-item-name">숏폼 콘텐츠</span>
                    <span class="svctab-item-en">Short-form Content</span>
                  </div>
                </div>
                <div class="svctab-item-arrow">
                  <svg viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </div>
              </button>
              <div class="svctab-item-body">
                <div class="svctab-item-content">
                  <div class="svctab-infocard" style="border-top-color:#f87171">
                    <div class="sic-header">
                      <span class="sic-icon">📱</span>
                      <span class="sic-label">Short-form Content</span>
                    </div>
                    <div class="sic-stats">
                      <div class="sic-stat">
                        <span class="sic-num">크리에이터</span>
                        <span class="sic-desc">전문 크리에이터<br/>직접 기획·출연</span>
                      </div>
                      <div class="sic-stat">
                        <span class="sic-num">릴스<br/><span style="font-size:11px">/ 쇼츠</span></span>
                        <span class="sic-desc">플랫폼별<br/>최적화 포맷</span>
                      </div>
                      <div class="sic-stat">
                        <span class="sic-num">바이럴</span>
                        <span class="sic-desc">자연스러운<br/>광고 확산</span>
                      </div>
                    </div>
                    <p class="sic-quote">"크리에이터가 직접 만드는 찐 광고 콘텐츠"</p>
                  </div>
                  <div class="svctab-item-desc">
                    <div class="svctab-desc-tags">
                      <span style="--tc:#f87171">크리에이터 제작</span>
                      <span style="--tc:#f87171">릴스 / 쇼츠</span>
                      <span style="--tc:#f87171">자연 노출</span>
                      <span style="--tc:#f87171">바이럴</span>
                    </div>
                    <p class="svctab-desc-text">크리에이터가 <strong>직접 기획하고 출연</strong>하는 숏폼 광고 콘텐츠. 광고처럼 느껴지지 않는 자연스러운 포맷으로 시청자의 공감을 이끌어내고 빠른 확산을 유도합니다.</p>
                    <ul class="svctab-desc-points">
                      <li><span class="svctab-desc-dot" style="--dc:#f87171"></span>크리에이터 고유 톤·스타일로 브랜드 자연 녹여내기</li>
                      <li><span class="svctab-desc-dot" style="--dc:#f87171"></span>릴스·쇼츠·틱톡 각 플랫폼 특성에 맞는 포맷 기획</li>
                      <li><span class="svctab-desc-dot" style="--dc:#f87171"></span>광고 거부감 없이 높은 시청 완료율 달성</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 중분류 04 — 유튜브 영상 제작 */}
            <div class="svctab-item" data-acc="1-3">
              <button class="svctab-item-trigger">
                <div class="svctab-item-left">
                  <span class="svctab-item-idx">04</span>
                  <div class="svctab-item-info">
                    <span class="svctab-item-name">유튜브 영상 제작</span>
                    <span class="svctab-item-en">YouTube Video Production</span>
                  </div>
                </div>
                <div class="svctab-item-arrow">
                  <svg viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </div>
              </button>
              <div class="svctab-item-body">
                <div class="svctab-item-content">
                  <div class="svctab-infocard" style="border-top-color:#a78bfa">
                    <div class="sic-header">
                      <span class="sic-icon">▶️</span>
                      <span class="sic-label">YouTube Video Production</span>
                    </div>
                    <div class="sic-stats">
                      <div class="sic-stat">
                        <span class="sic-num">롱폼</span>
                        <span class="sic-desc">브랜드 스토리<br/>심층 전달</span>
                      </div>
                      <div class="sic-stat">
                        <span class="sic-num">AI</span>
                        <span class="sic-desc">AI 롱폼·숏폼<br/>합리적 제작</span>
                      </div>
                      <div class="sic-stat">
                        <span class="sic-num">Premium</span>
                        <span class="sic-desc">고품질<br/>프리미엄 영상</span>
                      </div>
                    </div>
                    <p class="sic-quote">"브랜드 스토리를 깊이 있게, 효율적으로"</p>
                  </div>
                  <div class="svctab-item-desc">
                    <div class="svctab-desc-tags">
                      <span style="--tc:#a78bfa">유튜브</span>
                      <span style="--tc:#a78bfa">롱폼</span>
                      <span style="--tc:#a78bfa">AI 롱폼·숏폼</span>
                      <span style="--tc:#a78bfa">프리미엄</span>
                    </div>
                    <p class="svctab-desc-text">브랜드 메시지를 <strong>깊이 있는 스토리</strong>로 풀어내는 유튜브 전문 영상 제작. 프리미엄 롱폼부터 AI 기반 롱폼·숏폼까지 예산과 목적에 맞게 선택할 수 있습니다.</p>
                    <ul class="svctab-desc-points">
                      <li><span class="svctab-desc-dot" style="--dc:#a78bfa"></span>프리미엄 롱폼 — 브랜드 스토리 심층 전달</li>
                      <li><span class="svctab-desc-dot" style="--dc:#a78bfa"></span>AI 롱폼·AI 숏폼 — 합리적 단가의 스마트한 제작</li>
                      <li><span class="svctab-desc-dot" style="--dc:#a78bfa"></span>유튜브 알고리즘 최적화 기획·편집 포함</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

          </div>{/* /acc1 */}

          {/* ── 콘텐츠 유형 하단 CTA ── */}
          <div class="svctab-inline-cta">
            <p class="svctab-cta-msg">
              상담을 남기시면 유형에 맞는 <strong>레퍼런스</strong>를 받아 보실 수 있습니다.
            </p>
            <a href="/contact" class="svctab-cta-btn">
              상담 남기기
              <svg viewBox="0 0 24 24" fill="none" width="14" height="14">
                <path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
          </div>

        </div>{/* /panel1 */}

        {/* ── 탭 패널 2 : 모델 ── */}
        <div class="svctab-panel" id="svctabPanel2">
          <div class="svctab-panel-head">
            <p class="svctab-panel-eyebrow">MODEL SERVICE</p>
            <h2 class="svctab-panel-title">모델 <em>서비스</em></h2>
            <p class="svctab-panel-lead">브랜드 목표와 예산에 최적화된 <strong>모델 전략</strong>을 함께 설계합니다.</p>
          </div>

          <div class="svctab-acc" id="acc2">

            {/* 중분류 01 — 유튜버 모델 */}
            <div class="svctab-item" data-acc="2-0">
              <button class="svctab-item-trigger active">
                <div class="svctab-item-left">
                  <span class="svctab-item-idx">01</span>
                  <div class="svctab-item-info">
                    <span class="svctab-item-name">유튜버 모델</span>
                    <span class="svctab-item-en">YouTuber Model</span>
                  </div>
                </div>
                <div class="svctab-item-arrow">
                  <svg viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </div>
              </button>
              <div class="svctab-item-body open">
                <div class="svctab-item-content">
                  <div class="svctab-infocard" style="border-top-color:#fb923c">
                    <div class="sic-header">
                      <span class="sic-icon">📺</span>
                      <span class="sic-label">YouTuber Model</span>
                    </div>
                    <div class="sic-stats">
                      <div class="sic-stat">
                        <span class="sic-num">High</span>
                        <span class="sic-desc">팬층 기반<br/>구매 전환율</span>
                      </div>
                      <div class="sic-stat">
                        <span class="sic-num">동시</span>
                        <span class="sic-desc">채널 콘텐츠<br/>광고 동시 집행</span>
                      </div>
                      <div class="sic-stat">
                        <span class="sic-num">ROI</span>
                        <span class="sic-desc">합리적 비용<br/>높은 수익률</span>
                      </div>
                    </div>
                    <p class="sic-quote">"연예인 효과를 합리적 비용으로 실현"</p>
                  </div>
                  <div class="svctab-item-desc">
                    <div class="svctab-desc-tags">
                      <span style="--tc:#fb923c">커머스 활성화</span>
                      <span style="--tc:#fb923c">팬층 타겟</span>
                      <span style="--tc:#fb923c">합리적 비용</span>
                    </div>
                    <p class="svctab-desc-text">크리에이터 커머스 활성화 &amp; 팬층 타겟 마케팅에 최적화된 모델. 연예인 모델 대비 <strong>합리적인 비용</strong>으로 미들급 연예인 이상의 퍼포먼스를 창출합니다.</p>
                    <ul class="svctab-desc-points">
                      <li><span class="svctab-desc-dot" style="--dc:#fb923c"></span>팬층 기반 구매 전환율 높음</li>
                      <li><span class="svctab-desc-dot" style="--dc:#fb923c"></span>채널 연계 콘텐츠 광고 동시 집행 가능</li>
                      <li><span class="svctab-desc-dot" style="--dc:#fb923c"></span>합리적 금액대로 높은 ROI 실현</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 중분류 02 — 연예인 모델 */}
            <div class="svctab-item" data-acc="2-1">
              <button class="svctab-item-trigger">
                <div class="svctab-item-left">
                  <span class="svctab-item-idx">02</span>
                  <div class="svctab-item-info">
                    <span class="svctab-item-name">연예인 모델</span>
                    <span class="svctab-item-en">Celebrity Model</span>
                  </div>
                </div>
                <div class="svctab-item-arrow">
                  <svg viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </div>
              </button>
              <div class="svctab-item-body">
                <div class="svctab-item-content">
                  <div class="svctab-infocard" style="border-top-color:#e879f9">
                    <div class="sic-header">
                      <span class="sic-icon">✨</span>
                      <span class="sic-label">Celebrity Model</span>
                    </div>
                    <div class="sic-stats">
                      <div class="sic-stat">
                        <span class="sic-num">Premium</span>
                        <span class="sic-desc">브랜드<br/>이미지 프리미엄화</span>
                      </div>
                      <div class="sic-stat">
                        <span class="sic-num">대중</span>
                        <span class="sic-desc">대중적 신뢰도<br/>즉각 확보</span>
                      </div>
                      <div class="sic-stat">
                        <span class="sic-num">탄력</span>
                        <span class="sic-desc">규모별<br/>탄력적 예산 협의</span>
                      </div>
                    </div>
                    <p class="sic-quote">"브랜드 고급화의 가장 확실한 방법"</p>
                  </div>
                  <div class="svctab-item-desc">
                    <div class="svctab-desc-tags">
                      <span style="--tc:#e879f9">이미지 제고</span>
                      <span style="--tc:#e879f9">프리미엄</span>
                      <span style="--tc:#e879f9">탄력적 비용</span>
                    </div>
                    <p class="svctab-desc-text">브랜드 확실한 <strong>이미지 제고</strong>가 필요할 때 가장 강력한 선택. 촬영 콘텐츠와 규모에 따라 탄력적 비용 구조로 협의합니다.</p>
                    <ul class="svctab-desc-points">
                      <li><span class="svctab-desc-dot" style="--dc:#e879f9"></span>브랜드 고급화 이미지 순간 확립</li>
                      <li><span class="svctab-desc-dot" style="--dc:#e879f9"></span>대중적 신뢰도와 인지도 극대화</li>
                      <li><span class="svctab-desc-dot" style="--dc:#e879f9"></span>규모에 따른 탄력적 예산 협의</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 중분류 03 — 일반 모델 */}
            <div class="svctab-item" data-acc="2-2">
              <button class="svctab-item-trigger">
                <div class="svctab-item-left">
                  <span class="svctab-item-idx">03</span>
                  <div class="svctab-item-info">
                    <span class="svctab-item-name">일반 모델</span>
                    <span class="svctab-item-en">Commercial Model</span>
                  </div>
                </div>
                <div class="svctab-item-arrow">
                  <svg viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </div>
              </button>
              <div class="svctab-item-body">
                <div class="svctab-item-content">
                  <div class="svctab-infocard" style="border-top-color:#2dd4bf">
                    <div class="sic-header">
                      <span class="sic-icon">💡</span>
                      <span class="sic-label">Commercial Model</span>
                    </div>
                    <div class="sic-stats">
                      <div class="sic-stat">
                        <span class="sic-num">직관</span>
                        <span class="sic-desc">제품 핵심<br/>직관적 전달</span>
                      </div>
                      <div class="sic-stat">
                        <span class="sic-num">합리</span>
                        <span class="sic-desc">합리적 비용<br/>고품질 촬영</span>
                      </div>
                      <div class="sic-stat">
                        <span class="sic-num">다양</span>
                        <span class="sic-desc">다양한<br/>모델 풀 보유</span>
                      </div>
                    </div>
                    <p class="sic-quote">"제품을 가장 아름답게 보여주는 방법"</p>
                  </div>
                  <div class="svctab-item-desc">
                    <div class="svctab-desc-tags">
                      <span style="--tc:#2dd4bf">시각 표현</span>
                      <span style="--tc:#2dd4bf">합리적 비용</span>
                      <span style="--tc:#2dd4bf">제품 표현</span>
                    </div>
                    <p class="svctab-desc-text">브랜드 제품을 <strong>시각적으로 표현</strong>할 때 최적화된 모델. 비교적 합리적인 비용으로 모델 특색을 살려 제품 핵심을 고급스럽게 표현합니다.</p>
                    <ul class="svctab-desc-points">
                      <li><span class="svctab-desc-dot" style="--dc:#2dd4bf"></span>제품 핵심을 직관적으로 전달</li>
                      <li><span class="svctab-desc-dot" style="--dc:#2dd4bf"></span>합리적 비용으로 고품질 촬영</li>
                      <li><span class="svctab-desc-dot" style="--dc:#2dd4bf"></span>상황·컨셉에 맞는 다양한 모델 풀 보유</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

          </div>{/* /acc2 */}

          {/* ── 모델 하단 CTA ── */}
          <div class="svctab-inline-cta">
            <p class="svctab-cta-msg">
              상담을 남기시면 유형에 맞는 <strong>레퍼런스</strong>를 받아 보실 수 있습니다.
            </p>
            <a href="/contact" class="svctab-cta-btn">
              상담 남기기
              <svg viewBox="0 0 24 24" fill="none" width="14" height="14">
                <path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
          </div>

        </div>{/* /panel2 */}

      </div>

      <script dangerouslySetInnerHTML={{__html:`(function(){
  // ── 대분류 탭 전환 ──
  var tabBtns = document.querySelectorAll('#svctabNav .svctab-btn');
  var panels  = document.querySelectorAll('.svctab-panel');
  tabBtns.forEach(function(btn){
    btn.addEventListener('click', function(){
      var idx = parseInt(btn.dataset.tab);
      tabBtns.forEach(function(b){ b.classList.remove('active'); });
      panels.forEach(function(p){ p.classList.remove('active'); });
      btn.classList.add('active');
      panels[idx].classList.add('active');
    });
  });
  // ── 중분류 아코디언 ──
  var triggers = document.querySelectorAll('.svctab-item-trigger');
  triggers.forEach(function(trigger){
    trigger.addEventListener('click', function(){
      var item  = trigger.closest('.svctab-item');
      var body  = item.querySelector('.svctab-item-body');
      var acc   = item.closest('.svctab-acc');
      var isOpen = body.classList.contains('open');
      // 같은 아코디언 내 모두 닫기
      acc.querySelectorAll('.svctab-item-body').forEach(function(b){ b.classList.remove('open'); b.style.maxHeight=''; });
      acc.querySelectorAll('.svctab-item-trigger').forEach(function(t){ t.classList.remove('active'); });
      if(!isOpen){
        body.classList.add('open');
        trigger.classList.add('active');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });
  // 초기 열림 항목 maxHeight 설정
  document.querySelectorAll('.svctab-item-body.open').forEach(function(b){
    b.style.maxHeight = b.scrollHeight + 'px';
  });
})();`}} />
    </section>



    {/* ══════════════════════════════════════════
        SERVICE 07 — 미디어믹스 2차가공 콘텐츠
    ══════════════════════════════════════════ */}
    <section class="ifl2-section ifl2-section--confidential">
      <canvas id="ifl2ConfCanvas" class="ifl2-conf-canvas"></canvas>
      <div class="ifl2-conf-inner container">
        <div class="ifl2-conf-body">
          <div class="ifl2-conf-snum">07</div>
          <div class="ifl2-conf-label">Media Mix Content</div>
          <h2 class="ifl2-conf-title">미디어믹스<br /><em>2차가공 콘텐츠</em></h2>

          <div class="ifl2-conf-stamp">
            <span>CONFIDENTIAL</span>
          </div>

          <p class="ifl2-conf-sub">보안상 오픈소스에서는 공개할 수 없는 캠페인이 대부분입니다.</p>

          <div class="ifl2-conf-box">
            <div class="ifl2-conf-lock">
              <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
                <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" stroke-width="1.5"/>
                <path d="M8 11V7a4 4 0 0 1 8 0v4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                <circle cx="12" cy="16" r="1.5" fill="currentColor"/>
              </svg>
            </div>
            <p class="ifl2-conf-box-main">대기업들도 선택하는 <strong>인애드컴퍼니의 고유 마케팅 상품</strong></p>
            <p class="ifl2-conf-box-sub">미디어믹스 2차가공 콘텐츠는<br /><strong>킥오프 미팅에서만 디테일을 공개합니다.</strong></p>
            <div class="ifl2-conf-security">
              <span class="ifl2-conf-dot"></span>
              SECURITY LEVEL: HIGH · INTERNAL USE ONLY
            </div>
          </div>

          <a href="/contact?type=kickoff" class="hero-cta-btn primary ifl2-conf-cta">
            <span>상담 신청하기</span>
            <svg viewBox="0 0 24 24" fill="none"><path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{ __html: `
(function(){
  var cvs=document.getElementById('ifl2ConfCanvas'); if(!cvs)return;
  var ctx=cvs.getContext('2d'),W,H,chars='01CONFIDENTIAL秘密機密SECURE'.split(''),drops=[];
  function resize(){W=cvs.width=window.innerWidth;H=cvs.height=cvs.closest('section').offsetHeight||600;drops=[];var cols=Math.floor(W/22);for(var i=0;i<cols;i++)drops.push(Math.random()*H/18);}
  function draw(){ctx.fillStyle='rgba(2,4,8,0.07)';ctx.fillRect(0,0,W,H);ctx.font='13px monospace';drops.forEach(function(y,i){var ch=chars[Math.floor(Math.random()*chars.length)];var alpha=Math.random()>.88?0.5:0.1;ctx.fillStyle='rgba(168,85,247,'+alpha+')';ctx.fillText(ch,i*22,y*18);drops[i]=y>H/18+Math.random()*20?0:y+1;});requestAnimationFrame(draw);}
  resize();draw();window.addEventListener('resize',resize);
})();
      `}} />
    </section>

    {/* ══ PROCESS ══ (iflp 카드 그리드 유지) */}
    <section class="iflp-section">
      <div class="iflp-bg">
        <div class="iflp-bg-grid"></div>
        <div class="iflp-bg-orb iflp-bg-orb--a"></div>
        <div class="iflp-bg-orb iflp-bg-orb--b"></div>
        <div class="iflp-bg-orb iflp-bg-orb--c"></div>
      </div>
      <div class="container" style="position:relative;z-index:1">
        <div class="iflp-head">
          <div class="iflp-eyebrow"><span class="iflp-eyebrow-dot"></span>INFLUENCER MARKETING PROCESS<span class="iflp-eyebrow-dot"></span></div>
          <h2 class="iflp-title">캠페인 시작부터 성과까지<br /><em>7단계 정밀 프로세스</em></h2>
          <p class="iflp-sub">단순 섭외를 넘어 — 전략 설계, 크리에이터 매칭, 콘텐츠 제작, 바이럴 확산까지<br />인애드컴퍼니가 전 과정을 책임집니다.</p>
        </div>
        <div class="iflp2-wrap" id="iflp2Wrap">
          <ul class="iflp2-list" id="iflp2List">
            <li class="iflp2-item active" data-idx="0"><button><span class="iflp2-num">01</span><span class="iflp2-name">상담 진행</span><span class="iflp2-en">Strategy Consultation</span></button></li>
            <li class="iflp2-item" data-idx="1"><button><span class="iflp2-num">02</span><span class="iflp2-name">계약 진행</span><span class="iflp2-en">Contract &amp; Scope</span></button></li>
            <li class="iflp2-item" data-idx="2"><button><span class="iflp2-num">03</span><span class="iflp2-name">가이드라인 작성</span><span class="iflp2-en">Creative Briefing</span></button></li>
            <li class="iflp2-item" data-idx="3"><button><span class="iflp2-num">04</span><span class="iflp2-name">인플루언서 매칭</span><span class="iflp2-en">Creator Matching</span></button></li>
            <li class="iflp2-item" data-idx="4"><button><span class="iflp2-num">05</span><span class="iflp2-name">콘텐츠 제작</span><span class="iflp2-en">Content Production</span></button></li>
            <li class="iflp2-item" data-idx="5"><button><span class="iflp2-num">06</span><span class="iflp2-name">연계 바이럴 확산</span><span class="iflp2-en">Viral Amplification</span></button></li>
            <li class="iflp2-item" data-idx="6"><button><span class="iflp2-num">07</span><span class="iflp2-name">리포팅</span><span class="iflp2-en">Performance Reporting</span></button></li>
          </ul>
          <div class="iflp2-panels" id="iflp2Panels">
            <div class="iflp2-panel active" data-panel="0">
              <div class="iflp2-panel-img"><img src="/static/images/process/step01.png" alt="상담 진행" loading="lazy" /></div>
              <div class="iflp2-panel-body">
                <span class="iflp2-panel-tag" style="--pc:#2563eb">Strategy Consultation</span>
                <p class="iflp2-panel-desc">브랜드 목표·예산·타겟을 심층 분석합니다.<br />캠페인 KPI와 방향성을 함께 정의하고 맞춤 전략을 제안합니다.<br />단순한 견적 상담이 아닌 브랜드 성장 전략 미팅입니다.</p>
                <div class="iflp2-panel-tags"><p class="iflp2-ptag-label">KEY ACTIONS</p><div class="iflp2-ptag-grid"><span class="iflp2-ptag" style="--pc:#2563eb">🎯 목표 정의</span><span class="iflp2-ptag" style="--pc:#2563eb">💰 예산 협의</span><span class="iflp2-ptag" style="--pc:#2563eb">📊 KPI 설정</span><span class="iflp2-ptag" style="--pc:#2563eb">🗺 전략 수립</span></div></div>
              </div>
            </div>
            <div class="iflp2-panel" data-panel="1">
              <div class="iflp2-panel-img"><img src="/static/images/process/step02.png" alt="계약 진행" loading="lazy" /></div>
              <div class="iflp2-panel-body">
                <span class="iflp2-panel-tag" style="--pc:#7c3aed">Contract &amp; Scope</span>
                <p class="iflp2-panel-desc">진행 범위·일정·성과 지표를 명문화합니다.<br />투명한 비용 구조와 명확한 계약서로 신뢰를 보장합니다.<br />모든 조건이 계약서에 명시되어 불필요한 분쟁을 방지합니다.</p>
                <div class="iflp2-panel-tags"><p class="iflp2-ptag-label">KEY ACTIONS</p><div class="iflp2-ptag-grid"><span class="iflp2-ptag" style="--pc:#7c3aed">📋 범위 확정</span><span class="iflp2-ptag" style="--pc:#7c3aed">📅 일정 조율</span><span class="iflp2-ptag" style="--pc:#7c3aed">✍️ 계약 체결</span><span class="iflp2-ptag" style="--pc:#7c3aed">🔒 비용 명문화</span></div></div>
              </div>
            </div>
            <div class="iflp2-panel" data-panel="2">
              <div class="iflp2-panel-img"><img src="/static/images/process/step03.png" alt="가이드라인 작성" loading="lazy" /></div>
              <div class="iflp2-panel-body">
                <span class="iflp2-panel-tag" style="--pc:#059669">Creative Briefing</span>
                <p class="iflp2-panel-desc">브랜드 메시지·금지 표현·톤앤매너를 담은 크리에이터 브리핑 가이드를 제작합니다.<br />크리에이터가 브랜드의 언어로 콘텐츠를 만들 수 있도록 상세 지침을 제공합니다.</p>
                <div class="iflp2-panel-tags"><p class="iflp2-ptag-label">KEY ACTIONS</p><div class="iflp2-ptag-grid"><span class="iflp2-ptag" style="--pc:#059669">🎨 톤앤매너</span><span class="iflp2-ptag" style="--pc:#059669">📄 브리핑 문서</span><span class="iflp2-ptag" style="--pc:#059669">✅ 승인 기준</span><span class="iflp2-ptag" style="--pc:#059669">🚫 금지 표현</span></div></div>
              </div>
            </div>
            <div class="iflp2-panel" data-panel="3">
              <div class="iflp2-panel-img"><img src="/static/images/process/step04.png" alt="인플루언서 매칭" loading="lazy" /></div>
              <div class="iflp2-panel-body">
                <span class="iflp2-panel-tag" style="--pc:#0891b2">Creator Matching</span>
                <p class="iflp2-panel-desc">1,200+ 크리에이터 DB에서 타겟 적합성·퍼포먼스·단가를 종합 분석합니다.<br />단순 팔로워 수가 아닌 실제 전환율과 브랜드 핏을 기준으로 최적 크리에이터를 선별합니다.</p>
                <div class="iflp2-panel-tags"><p class="iflp2-ptag-label">KEY ACTIONS</p><div class="iflp2-ptag-grid"><span class="iflp2-ptag" style="--pc:#0891b2">🗄 DB 분석</span><span class="iflp2-ptag" style="--pc:#0891b2">🔍 적합성 검증</span><span class="iflp2-ptag" style="--pc:#0891b2">💹 단가 협의</span><span class="iflp2-ptag" style="--pc:#0891b2">📈 전환율 선별</span></div></div>
              </div>
            </div>
            <div class="iflp2-panel" data-panel="4">
              <div class="iflp2-panel-img"><img src="/static/images/process/step05.png" alt="콘텐츠 제작" loading="lazy" /></div>
              <div class="iflp2-panel-body">
                <span class="iflp2-panel-tag" style="--pc:#d97706">Content Production</span>
                <p class="iflp2-panel-desc">가이드라인 기반으로 크리에이터가 콘텐츠를 제작합니다.<br />브랜드 검수와 피드백을 거쳐 최종 확정합니다.<br />완성도 높은 콘텐츠가 나올 때까지 함께 조율합니다.</p>
                <div class="iflp2-panel-tags"><p class="iflp2-ptag-label">KEY ACTIONS</p><div class="iflp2-ptag-grid"><span class="iflp2-ptag" style="--pc:#d97706">🎬 제작 관리</span><span class="iflp2-ptag" style="--pc:#d97706">🔎 브랜드 검수</span><span class="iflp2-ptag" style="--pc:#d97706">✅ 최종 승인</span><span class="iflp2-ptag" style="--pc:#d97706">🔄 피드백 반영</span></div></div>
              </div>
            </div>
            <div class="iflp2-panel" data-panel="5">
              <div class="iflp2-panel-img"><img src="/static/images/process/step06.png" alt="연계 바이럴 확산" loading="lazy" /></div>
              <div class="iflp2-panel-body">
                <span class="iflp2-panel-tag" style="--pc:#dc2626">Viral Amplification</span>
                <p class="iflp2-panel-desc">최적 시간에 콘텐츠를 게시하고 커뮤니티·SNS 연계 확산 전략을 병행 실행합니다.<br />인플루언서 콘텐츠를 씨앗으로 바이럴 파급력을 극대화합니다.</p>
                <div class="iflp2-panel-tags"><p class="iflp2-ptag-label">KEY ACTIONS</p><div class="iflp2-ptag-grid"><span class="iflp2-ptag" style="--pc:#dc2626">📱 SNS 확산</span><span class="iflp2-ptag" style="--pc:#dc2626">💬 커뮤니티 연계</span><span class="iflp2-ptag" style="--pc:#dc2626">📡 실시간 모니터링</span><span class="iflp2-ptag" style="--pc:#dc2626">⚡ 추가 확산</span></div></div>
              </div>
            </div>
            <div class="iflp2-panel" data-panel="6">
              <div class="iflp2-panel-img"><img src="/static/images/process/step07.png" alt="리포팅" loading="lazy" /></div>
              <div class="iflp2-panel-body">
                <span class="iflp2-panel-tag" style="--pc:#a855f7">Performance Reporting</span>
                <p class="iflp2-panel-desc">조회수·도달·클릭·전환·매출까지 전 과정을 투명하게 리포팅합니다.<br />단순 수치 나열이 아닌 인사이트와 차기 캠페인 전략까지 함께 제공합니다.</p>
                <div class="iflp2-panel-tags"><p class="iflp2-ptag-label">KEY ACTIONS</p><div class="iflp2-ptag-grid"><span class="iflp2-ptag" style="--pc:#a855f7">📊 성과 리포트</span><span class="iflp2-ptag" style="--pc:#a855f7">🔬 인사이트 분석</span><span class="iflp2-ptag" style="--pc:#a855f7">🚀 차기 전략</span><span class="iflp2-ptag" style="--pc:#a855f7">📈 ROI 정산</span></div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <script dangerouslySetInnerHTML={{__html:`(function(){var items=document.querySelectorAll('#iflp2List .iflp2-item');var panels=document.querySelectorAll('#iflp2Panels .iflp2-panel');items.forEach(function(item){item.querySelector('button').addEventListener('click',function(){var idx=parseInt(item.dataset.idx);items.forEach(function(el){el.classList.remove('active');});panels.forEach(function(el){el.classList.remove('active');});item.classList.add('active');panels[idx].classList.add('active');});});})();`}} />
    </section>
    {/* ══ RESULTS ══ */}
    <section class="section svc-results-section">
      <div class="svc-bg-deco"><div class="svc-dot-pattern"></div><div class="svc-orb-right"></div><div class="svc-section-glow-top"></div></div>
      <div class="container">
        <div class="section-head">
          <span class="sec-label">Results</span>
          <h2 class="sec-title">실제 성과<br /><em>숫자로 증명합니다</em></h2>
        </div>
        <div class="svc-result-grid">
          <div class="srg-card srg-card--featured">
            <div class="srg-tag">유튜브 인플루언서</div>
            <div class="srg-metrics">
              <div class="srg-metric"><strong>900만+</strong><span>영상 조회수</span></div>
              <div class="srg-metric"><strong>+45,000</strong><span>구독자 증가</span></div>
              <div class="srg-metric"><strong>+580%</strong><span>매출 증가</span></div>
            </div>
            <p class="srg-desc">헬스케어 브랜드 유튜브 인플루언서 캠페인. 마이크로 인플루언서 15명 협업으로 폭발적 성과</p>
          </div>
          <div class="srg-card">
            <div class="srg-tag">Instagram 인플루언서</div>
            <div class="srg-metrics">
              <div class="srg-metric"><strong>2,800만</strong><span>도달</span></div>
              <div class="srg-metric"><strong>4.8%</strong><span>참여율</span></div>
            </div>
            <p class="srg-desc">뷰티 브랜드 인스타그램 캠페인. 나노~마이크로 인플루언서 40명 집중 운영</p>
          </div>
          <div class="srg-card">
            <div class="srg-tag">블로그 인플루언서</div>
            <div class="srg-metrics">
              <div class="srg-metric"><strong>+1,200%</strong><span>검색량 증가</span></div>
              <div class="srg-metric"><strong>TOP3</strong><span>검색 순위</span></div>
            </div>
            <p class="srg-desc">SEO 연계 블로거 캠페인. 인플루언서 콘텐츠가 SEO 자산으로 연결되는 복합 전략</p>
          </div>
        </div>
      </div>
    </section>

    {/* ══ CTA ══ */}
    <section class="svc-cta-section">
      <div class="container">
        <div class="svc-cta-inner">
          <div class="svc-cta-text">
            <h2>우리 브랜드에 맞는<br /><em>인플루언서를 찾아드립니다</em></h2>
            <p>1,200+ 크리에이터 네트워크에서 최적의 파트너를 무료로 추천해드립니다.</p>
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
  var SVC_KEY = 'influencer';
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
