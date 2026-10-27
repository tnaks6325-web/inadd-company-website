import { SvcTerms } from './svc-terms'
import { icon } from '../icons'
import { InfluencerPhones } from './influencer-phones'
export const SvcInfluencerPage = () => (
  <>
    <link rel="stylesheet" href="/static/influencer-phones.css?v=20261020b" />
    {/* ══ HERO ══ */}
    <section class="vh-hero vh-hero--ip">
      <div class="vh-glow" aria-hidden="true"></div>
      <canvas id="vhCanvas2" class="vh-canvas"></canvas>
      <div class="vh-bg">
        <div class="vh-orb vh-orb--1" style="background:radial-gradient(circle,rgba(168,85,247,0.26) 0%,transparent 70%)"></div>
        <div class="vh-orb vh-orb--2" style="background:radial-gradient(circle,rgba(236,72,153,0.18) 0%,transparent 70%)"></div>
        <div class="vh-orb vh-orb--3" style="background:radial-gradient(circle,rgba(37,70,158,0.20) 0%,transparent 70%)"></div>
        <div class="vh-grid"></div>
        <div class="vh-noise"></div>
      </div>

      <div class="container vh-inner">
        <a href="/#services" class="svc-back-link vh-back">← 서비스 전체보기</a>

        {/* 서비스명(검색엔진이 읽는 큰 제목의 일부) + 슬로건 */}
        <h1 class="vh-h1">
          <span class="vh-badge" style="color:rgba(168,85,247,0.95);border-color:rgba(168,85,247,0.35);background:rgba(168,85,247,0.08)">
            <span class="vh-badge-dot" style="background:rgba(168,85,247,1);box-shadow:0 0 8px rgba(168,85,247,0.9)"></span>
            <span>인플루언서 · 유튜브 마케팅</span>
          </span>

          <span class="vh-title">
          <span class="vh-tline" id="ifL1">'좋은 것 같다'는 <span class="vh-hl">추측이 아닌,</span></span>
          <span class="vh-tline" id="ifL2" style="background:linear-gradient(135deg,#fff 20%,rgba(168,85,247,0.95) 60%,rgba(236,72,153,0.85) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">'이겁니다'를 <span class="vh-hl">근거</span>로</span>
        </span>
        </h1>

        <div class="vh-sub-wrap" id="ifSub">
          <p class="vh-sub"><strong style="color:rgba(255,255,255,0.9)">인플루언서 분석 프로세스</strong>로 후보를 먼저 걸러낸 후</p>
          <p class="vh-sub">브랜드 메시지와 크리에이터의 결을 비교해, <span style="color:rgba(255,255,255,0.85);font-weight:400">"왜 이 조합인지"까지 제안합니다.</span></p>
          <p class="vh-sub" style="margin-top:12px">인애드는 감이 아니라 숫자로 고른 매칭이 <span style="color:rgba(168,85,247,0.9);font-weight:600">캠페인의 출발선을 바꿉니다.</span></p>
        </div>

        <div class="vh-kpi-strip" id="ifKpi"></div>
        <script dangerouslySetInnerHTML={{__html:`(function(){
          fetch('/api/admin/public/hero-kpi/influencer')
            .then(function(r){return r.json();})
            .then(function(d){
              var el=document.getElementById('ifKpi');if(!el||!d.kpi)return;
              el.innerHTML=d.kpi.map(function(k,i){
                return (i>0?'<div class="vh-kpi-sep"></div>':'')
                  +'<div class="vh-kpi-item">'
                  +'<strong class="vh-kpi-num">'+k.num+'</strong>'
                  +'<span class="vh-kpi-label">'+k.label+'</span>'
                  +'</div>';
              }).join('');
            }).catch(function(){});
        })();`}} />

        <div class="vh-btns" id="ifBtns">
          <a href="/contact" class="vh-cta-btn">
            <span>문의하기</span>
            <svg viewBox="0 0 24 24" fill="none" width="15" height="15"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
          <a href="#ifl-services" class="vh-scroll-btn">
            <span>서비스 보기</span>
            <svg viewBox="0 0 24 24" fill="none" width="15" height="15"><path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
        </div>
      </div>

      {/* 인스타그램·유튜브 화면이 여러 휴대폰에서 동시에 재생 */}
      <InfluencerPhones />
      <script src="/static/influencer-phones.js?v=20261019a" defer></script>

      <div class="vh-scroll-hint">
        <div class="vh-scroll-mouse"><div class="vh-scroll-wheel"></div></div>
      </div>

      <script dangerouslySetInnerHTML={{ __html: `
(function(){
  function anim(el,delay,dir){if(!el)return;el.style.opacity='0';el.style.transform=dir==='up'?'translateY(32px)':'translateX(-32px)';el.style.transition='opacity .9s cubic-bezier(.25,.46,.45,.94),transform .9s cubic-bezier(.25,.46,.45,.94)';setTimeout(function(){el.style.opacity='1';el.style.transform='none';},delay);}
  anim(document.getElementById('ifL1'),200,'left');
  anim(document.getElementById('ifL2'),440,'left');
  anim(document.getElementById('ifSub'),700,'up');
  anim(document.getElementById('ifKpi'),940,'up');
  anim(document.getElementById('ifBtns'),1140,'up');
})();
      `}} />
    </section>

    {/* ══ 라이트 테마 콘텐츠 래퍼 (히어로 제외) ══ */}
    <div class="svc-light">

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
          <div class="ifl-story-quotes" aria-label="기존 인플루언서 마케팅의 뻔한 제안">
            <p class="ifl-story-line">“10만 크리에이터 진행하는 데 3,000만 원 정도 들어가세요.”</p>
            <p class="ifl-story-line">“메이저 크리에이터 진행하시려면 1억 정도 예상하셔야 해요.”</p>
            <p class="ifl-story-line">“구독자 많은 크리에이터일수록 좋습니다.”</p>
          </div>

          <h2 class="ifl-story-turn">이런 뻔한 이야기, <span class="ifl-turn-highlight">이제는 없애야 합니다.<svg viewBox="0 0 360 22" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="M5 12 C82 18 155 6 232 11 C278 14 319 10 355 7" /></svg></span></h2>

          <p class="ifl-story-question">
            원하는 크리에이터의 단가와<br />
            대행 수수료까지 투명하게 공개하는 업체를 찾고 계신가요?
          </p>

          <p class="ifl-story-proof">
            인애드컴퍼니는 아래의 <span class="ifl-story-ring">세 개의 검증
              <svg viewBox="0 0 240 76" aria-hidden="true"><path d="M8 39C15 12 63 4 124 5c65 1 108 15 108 36 0 22-48 31-112 30C56 70 5 59 8 39Z" /></svg>
            </span>을 통해<br />
            크리에이터를 선별하고 투명하게 제안합니다.
          </p>

          <div class="ifl-story-criteria" aria-label="크리에이터 검증 기준">
            <div class="ifl-story-criterion"><span>01</span><strong>타깃 적합도</strong><p>브랜드가 만나야 할 고객과<br /><em>실제 구독자가 일치</em>하는가</p></div>
            <div class="ifl-story-criterion"><span>02</span><strong>반응의 밀도</strong><p>좋아요를 넘어 <em>댓글·저장·공유</em>가<br />꾸준히 발생하는 채널인가</p></div>
            <div class="ifl-story-criterion"><span>03</span><strong>브랜드 맥락</strong><p>콘텐츠의 결이 <em>브랜드 메시지</em>와<br />자연스럽게 이어지는가</p></div>
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
        <div class="ifl-data-row ifl-analysis-row">
          <div class="ifl-data-text">
            <h3 class="ifl-data-title ifl-fx-title">구독자보다 중요한 건<br /><em class="ifl-scribble">‘실제 반응’<svg class="ifl-scribble-svg" viewBox="0 0 300 100" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="M 200 14 C 150 6, 80 8, 45 22 C 8 36, 6 66, 42 82 C 95 100, 210 100, 262 82 C 300 68, 298 34, 258 20 C 225 12, 170 12, 148 18" fill="none" stroke="var(--blue)" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke"/></svg></em></h3>
            <p class="ifl-data-desc">
              크리에이터를 제안할 때 구독자 수는 참고일 뿐<br />
              실제 조회수 흐름, 평균 조회수, 참여율 같은 지표로 채널의 영향력을 먼저 확인하고<br />
              더 높은 캠페인 성과를 위해 <strong>노출과 반응을 예상하며 기획합니다.</strong>
            </p>
            <ul class="ifl-data-points ifl-analysis-points">
              <li><b>실조회수</b><span>구독자 대비 실제 영향력 확인</span></li>
              <li><b>시청 지속</b><span>노출 구간과 이탈 구간 분석</span></li>
              <li><b>지표 신뢰도</b><span>왜곡 채널을 사전에 선별·제외</span></li>
            </ul>
            <div class="ifl-data-insight-bar">
              <svg viewBox="0 0 18 18" fill="none" width="16" height="16"><circle cx="9" cy="9" r="8" stroke="#25469E" stroke-width="1.4"/><path d="M9 5v4l3 2" stroke="#25469E" stroke-width="1.4" stroke-linecap="round"/></svg>
              <span>검토 후 <strong>제안서 전달까지 평균 24시간 이내</strong></span>
            </div>
          </div>
          <div class="ifl-data-img-wrap ifl-data-img-wrap--report">
            <img src="/static/images/process/data-report.jpg" alt="구독자 수 및 조회수 추이 데이터 리포트 차트" />
          </div>
        </div>

        {/* ── 02 — 합리적 제안을 위한 선별 시스템 ── */}
        <div class="ifl-data-row ifl-data-row--rev ifl-matching-row">
          <div class="ifl-data-img-wrap ifl-data-img-wrap--filter">
            <img src="/static/images/process/filter-list.jpg" alt="크리에이터 상세 분석 리스트 뷰" class="ifl-filter-img ifl-filter-img--top" />
            <img src="/static/images/process/filter-grid.jpg" alt="크리에이터 그리드 필터링 시스템" class="ifl-filter-img ifl-filter-img--bottom" />
          </div>
          <div class="ifl-data-text">
            <h3 class="ifl-data-title ifl-fx-title">원하는 조건이 디테일할수록,<br /><em class="ifl-underline">최적의 크리에이터<svg class="ifl-underline-svg" viewBox="0 0 320 20" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="M6 12 C 74 4, 150 17, 212 10 C 262 4, 298 14, 314 9" fill="none" stroke="var(--blue)" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke"/></svg></em>가 매칭</h3>
            <p class="ifl-data-desc">
              카테고리·구독자·타깃·업로드 주기까지, 목적과 예산에 맞춰 후보를 좁히고<br />
              <strong>1,520+ 검증 DB</strong>를 기반으로 선별, 기준에 맞지 않는 채널은 데이터로 지속 정리합니다.<br />
              그래서 "아무나"가 아니라 <strong>"적절한" 제안</strong>을 드릴 수 있습니다.
            </p>

            {/* 필터 태그 칩 */}
            <div class="ifl-data-tags">
              <span class="ifl-data-tag">조회수 강한 유튜브</span>
              <span class="ifl-data-tag">셀럽·매니지먼트</span>
              <span class="ifl-data-tag">커플·부부 라이프</span>
              <span class="ifl-data-tag">IT·디바이스 리뷰</span>
              <span class="ifl-data-tag">남성 패션·그루밍</span>
              <span class="ifl-data-tag">성장세 높은 채널</span>
              <span class="ifl-data-tag ifl-data-tag--more">조회수 대비 합리적인 단가</span>
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
                <span class="ifl-data-db-label">검증 크리에이터</span>
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
    <section class="ifl2-diff-section ifl-editorial-proposal" id="creatorProposalCriteria">
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
              <em>크리에이터 제안 기준</em>
            </h2>
            <blockquote class="ifl2-diff-quote">
              "시장 단가를 아는 만큼,<br />
              예산을 <strong>'합리화'</strong>합니다.<br />
              유명함보다 <strong>성과 가능성</strong>을 먼저 봅니다."
            </blockquote>
            <ul class="ifl2-diff-criteria">
              <li>
                <div class="ifl2-diff-cicon ifl2-diff-cicon--ban">
                  <svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="1.5"/><path d="M4 4l12 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
                </div>
                <span>과열 단가, 먼저 걸러냅니다</span>
              </li>
              <li>
                <div class="ifl2-diff-cicon ifl2-diff-cicon--search">
                  <svg viewBox="0 0 20 20" fill="none"><circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" stroke-width="1.5"/><path d="M14 14l3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
                </div>
                <span>비용 대비 성과 가능성 검증</span>
              </li>
              <li>
                <div class="ifl2-diff-cicon ifl2-diff-cicon--growth">
                  <svg viewBox="0 0 20 20" fill="none"><path d="M3 15l4-5 4 3 6-8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </div>
                <span>성장 가능성까지 함께 봅니다</span>
              </li>
            </ul>
          </div>

          {/* ── 세로 구분선 ── */}
          <div class="ifl2-diff-divider"></div>

          {/* ── 오른쪽: 케이스 카드 ── */}
          <div class="ifl2-diff-right">

            {/* CASE 1 — 효율 기준 통과 */}
            <div class="ifl2-case-card ifl2-case-card--good">
              <div class="ifl2-case-glow"></div>
              <div class="ifl2-case-header">
                <div class="ifl2-case-badge ifl2-case-badge--good">CASE 01</div>
                <span class="ifl2-case-title">효율 기준 통과</span>
              </div>
              <div class="ifl2-case-price">
                <div class="ifl2-case-price-from">
                  <span class="ifl2-case-price-label">내부 예상 단가</span>
                  <span class="ifl2-case-price-val">800 – 1,000만원</span>
                </div>
                <div class="ifl2-case-arrow">
                  <svg viewBox="0 0 24 10" fill="none" width="28"><path d="M0 5h22M17 1l5 4-5 4" stroke="rgba(37,70,158,0.7)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </div>
                <div class="ifl2-case-price-to">
                  <span class="ifl2-case-price-label ifl2-case-price-label--em">실제 집행 비용</span>
                  <span class="ifl2-case-price-num ifl2-case-price-num--good">500만원</span>
                </div>
              </div>
              <ul class="ifl2-case-points ifl2-case-points--good">
                <li>예산 대비 성과 가능성 기준으로 선별</li>
                <li>단가·조회수 흐름·반응지표 교차 검증</li>
                <li>브랜드 메시지 적합도까지 확인 후 <strong>확정</strong></li>
              </ul>
              <div class="ifl2-case-status ifl2-case-status--good">진행 확정</div>
            </div>

            {/* CASE 2 — 기준 미달 제외 */}
            <div class="ifl2-case-card ifl2-case-card--bad">
              <div class="ifl2-case-header">
                <div class="ifl2-case-badge ifl2-case-badge--bad">CASE 02</div>
                <span class="ifl2-case-title ifl2-case-title--bad">기준 미달 제외</span>
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
                <li>단가 대비 기대효과 낮음</li>
                <li>조회수 편차 / 지표 불안정</li>
                <li>브랜드 적합도 낮음</li>
              </ul>
              <div class="ifl2-case-status ifl2-case-status--bad">진행 불가</div>
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
            <h2 class="svctab-panel-title">섭외 / 협찬 <em>서비스 목록</em></h2>
            <p class="svctab-panel-lead">예산과 목표를 먼저 정리한 뒤, 브랜드에 <strong>"맞는 얼굴"</strong>과 <strong>"맞는 채널"</strong>을 조합합니다. 섭외는 과정이고, 결과는 전환과 확산입니다.</p>
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
                  </div>
                </div>
                <div class="svctab-item-arrow">
                  <svg viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </div>
              </button>
              <div class="svctab-item-body open">
                <div class="svctab-item-content">
                  <div class="svctab-photo svctab-photo--filled" style="--img:url('/static/mkt-images/casting-celebrity.png')">
                    <div class="svctab-photo-ph">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="14" rx="2"/><circle cx="12" cy="13" r="3.2"/><path d="M8 6l1.4-2h5.2L16 6"/></svg>
                      <span>Celebrity Casting</span>
                    </div>
                  </div>
                  <div class="svctab-item-desc">
                    <div class="svctab-desc-tags">
                      <span style="--tc:#25469E">브랜딩 강화</span>
                      <span style="--tc:#25469E">팬덤 마케팅</span>
                      <span style="--tc:#25469E">퍼포먼스 광고</span>
                      <span style="--tc:#25469E">판매 촉진</span>
                    </div>
                    <p class="svctab-desc-text">연예인이 가진 팬덤과 콘텐츠 파급력은 "인지"를 빠르게 만듭니다. 다만 중요한 건 노출이 아니라 맥락. <strong>노출형 협업부터 스토리형 PPL까지,</strong> 브랜드 목표에 맞는 형태로 제안합니다.</p>
                    <ul class="svctab-desc-points">
                      <li><span class="svctab-desc-dot" style="--dc:#25469E"></span>팬덤 기반 확산으로 인지도 부스팅</li>
                      <li><span class="svctab-desc-dot" style="--dc:#25469E"></span>채널 콘텐츠 + 협찬 콘텐츠를 함께 굴려 효과 확대</li>
                      <li><span class="svctab-desc-dot" style="--dc:#25469E"></span>메가부터 마이크로까지, 예산/목표에 맞춘 캐스팅 범위</li>
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
                  </div>
                </div>
                <div class="svctab-item-arrow">
                  <svg viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </div>
              </button>
              <div class="svctab-item-body">
                <div class="svctab-item-content">
                  <div class="svctab-photo svctab-photo--filled" style="--img:url('/static/mkt-images/casting-influencer.png')">
                    <div class="svctab-photo-ph">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="14" rx="2"/><circle cx="12" cy="13" r="3.2"/><path d="M8 6l1.4-2h5.2L16 6"/></svg>
                      <span>Influencer Casting</span>
                    </div>
                  </div>
                  <div class="svctab-item-desc">
                    <div class="svctab-desc-tags">
                      <span style="--tc:#25469E">인지도 상승</span>
                      <span style="--tc:#25469E">시청층 타겟</span>
                      <span style="--tc:#25469E">합리적 비용</span>
                      <span style="--tc:#25469E">판매 촉진</span>
                    </div>
                    <p class="svctab-desc-text">연예인 대비 더 <strong>합리적인 비용으로, 고효율을 노릴 수 있는 선택지.</strong> 검증된 1,520+ DB 안에서 브랜드 목표와 타깃에 맞는 조합만 남깁니다. 핵심은 '누가 유명한가'가 아니라, <strong>'누가 전환을 만드는가'</strong>입니다.</p>
                    <ul class="svctab-desc-points">
                      <li><span class="svctab-desc-dot" style="--dc:#25469E"></span>조회수·반응지표·성장 흐름까지 보고, 검증된 크리에이터만 매칭</li>
                      <li><span class="svctab-desc-dot" style="--dc:#25469E"></span>나노–메가까지 폭넓게 구성, 예산/목표에 맞춘 스케일링</li>
                      <li><span class="svctab-desc-dot" style="--dc:#25469E"></span>인스타그램 피드 연계까지 묶어 확산–검색–전환 흐름으로 운영</li>
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
                    <span class="svctab-item-name">인스타그램 피드 연계<br />(확산/리포스트)</span>
                  </div>
                </div>
                <div class="svctab-item-arrow">
                  <svg viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </div>
              </button>
              <div class="svctab-item-body">
                <div class="svctab-item-content">
                  <div class="svctab-photo svctab-photo--filled" style="--img:url('/static/mkt-images/casting-instagram.png')">
                    <div class="svctab-photo-ph">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="14" rx="2"/><circle cx="12" cy="13" r="3.2"/><path d="M8 6l1.4-2h5.2L16 6"/></svg>
                      <span>Instagram Feed</span>
                    </div>
                  </div>
                  <div class="svctab-item-desc">
                    <div class="svctab-desc-tags">
                      <span style="--tc:#25469E">팬덤 소통</span>
                      <span style="--tc:#25469E">브랜드 친밀감</span>
                      <span style="--tc:#25469E">피드 전략</span>
                      <span style="--tc:#25469E">진정성</span>
                    </div>
                    <p class="svctab-desc-text">단순 노출이 아니라, 브랜드의 <strong>'분위기'가 쌓이게 만듭니다.</strong> 피드·릴스·스토리 흐름을 한 톤으로 맞추고, 리포스트 확산까지 연결합니다. 결과는 저장·공유·재방문, 그리고 <strong>검색으로 이어지는 잔상.</strong></p>
                    <ul class="svctab-desc-points">
                      <li><span class="svctab-desc-dot" style="--dc:#25469E"></span>피드/스토리/릴스 흐름을 고려한 콘텐츠 릴레이 기획</li>
                      <li><span class="svctab-desc-dot" style="--dc:#25469E"></span>인플루언서 콘텐츠 리포스트로 브랜드 채널 신뢰도 강화</li>
                      <li><span class="svctab-desc-dot" style="--dc:#25469E"></span>확산 이후 유입 동선까지 정리(프로필·링크·하이라이트)</li>
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
          </div>

        </div>{/* /panel0 */}

        {/* ── 탭 패널 1 : 콘텐츠 유형 ── */}
        <div class="svctab-panel" id="svctabPanel1">
          <div class="svctab-panel-head">
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
                  </div>
                </div>
                <div class="svctab-item-arrow">
                  <svg viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </div>
              </button>
              <div class="svctab-item-body open">
                <div class="svctab-item-content">
                  <div class="svctab-photo svctab-photo--filled" style="--img:url('/static/mkt-images/content-branded.png')">
                    <div class="svctab-photo-ph">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="14" rx="2"/><circle cx="12" cy="13" r="3.2"/><path d="M8 6l1.4-2h5.2L16 6"/></svg>
                      <span>Branded Content</span>
                    </div>
                  </div>
                  <div class="svctab-item-desc">
                    <div class="svctab-desc-tags">
                      <span style="--tc:#25469E">스토리텔링</span>
                      <span style="--tc:#25469E">프리미엄 제작</span>
                      <span style="--tc:#25469E">세계관 연계</span>
                    </div>
                    <p class="svctab-desc-text">브랜드 메시지를 콘텐츠 그 자체로 승화시킵니다. 크리에이터의 세계관과 브랜드 스토리가 결합된 <strong>프리미엄 콘텐츠</strong>를 제작합니다.</p>
                    <ul class="svctab-desc-points">
                      <li><span class="svctab-desc-dot" style="--dc:#25469E"></span>크리에이터 세계관 연계 기획</li>
                      <li><span class="svctab-desc-dot" style="--dc:#25469E"></span>브랜드 스토리를 더 길게 끌고 감</li>
                      <li><span class="svctab-desc-dot" style="--dc:#25469E"></span>자연스러운 메시지 임베딩</li>
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
                  </div>
                </div>
                <div class="svctab-item-arrow">
                  <svg viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </div>
              </button>
              <div class="svctab-item-body">
                <div class="svctab-item-content">
                  <div class="svctab-photo svctab-photo--filled" style="--img:url('/static/mkt-images/content-ppl.png')">
                    <div class="svctab-photo-ph">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="14" rx="2"/><circle cx="12" cy="13" r="3.2"/><path d="M8 6l1.4-2h5.2L16 6"/></svg>
                      <span>Planned PPL</span>
                    </div>
                  </div>
                  <div class="svctab-item-desc">
                    <div class="svctab-desc-tags">
                      <span style="--tc:#25469E">자연 노출</span>
                      <span style="--tc:#25469E">이탈률 최소화</span>
                      <span style="--tc:#25469E">브랜드 친밀감</span>
                    </div>
                    <p class="svctab-desc-text">콘텐츠 흐름 안에 브랜드를 자연스럽게 담아, 시청자가 <strong>거부감 없이 브랜드를 경험</strong>하게 합니다.</p>
                    <ul class="svctab-desc-points">
                      <li><span class="svctab-desc-dot" style="--dc:#25469E"></span>콘텐츠 흐름 내 자연스러운 제품 노출</li>
                      <li><span class="svctab-desc-dot" style="--dc:#25469E"></span>시청자 이탈률 최소화</li>
                      <li><span class="svctab-desc-dot" style="--dc:#25469E"></span>브랜드 친밀감 및 신뢰 형성</li>
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
                  </div>
                </div>
                <div class="svctab-item-arrow">
                  <svg viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </div>
              </button>
              <div class="svctab-item-body">
                <div class="svctab-item-content">
                  <div class="svctab-photo svctab-photo--filled" style="--img:url('/static/mkt-images/content-shortform.png')">
                    <div class="svctab-photo-ph">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="14" rx="2"/><circle cx="12" cy="13" r="3.2"/><path d="M8 6l1.4-2h5.2L16 6"/></svg>
                      <span>Short-form Content</span>
                    </div>
                  </div>
                  <div class="svctab-item-desc">
                    <div class="svctab-desc-tags">
                      <span style="--tc:#25469E">크리에이터 제작</span>
                      <span style="--tc:#25469E">릴스 / 쇼츠</span>
                      <span style="--tc:#25469E">자연 노출</span>
                      <span style="--tc:#25469E">바이럴</span>
                    </div>
                    <p class="svctab-desc-text">크리에이터가 <strong>직접 기획하고 출연</strong>하는 숏폼 콘텐츠. 크리에이터 고유의 톤으로 시청자의 공감을 이끌어내고 빠른 확산을 만듭니다.</p>
                    <ul class="svctab-desc-points">
                      <li><span class="svctab-desc-dot" style="--dc:#25469E"></span>크리에이터 고유 톤·스타일로 브랜드 자연 녹여내기</li>
                      <li><span class="svctab-desc-dot" style="--dc:#25469E"></span>릴스·쇼츠 각 플랫폼 특성에 맞는 포맷 기획</li>
                      <li><span class="svctab-desc-dot" style="--dc:#25469E"></span>광고 거부감 없이 높은 시청 완료율 달성</li>
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
                  </div>
                </div>
                <div class="svctab-item-arrow">
                  <svg viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </div>
              </button>
              <div class="svctab-item-body">
                <div class="svctab-item-content">
                  <div class="svctab-photo svctab-photo--filled" style="--img:url('/static/mkt-images/content-youtube.png')">
                    <div class="svctab-photo-ph">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="14" rx="2"/><circle cx="12" cy="13" r="3.2"/><path d="M8 6l1.4-2h5.2L16 6"/></svg>
                      <span>YouTube Video Production</span>
                    </div>
                  </div>
                  <div class="svctab-item-desc">
                    <div class="svctab-desc-tags">
                      <span style="--tc:#25469E">유튜브</span>
                      <span style="--tc:#25469E">롱폼</span>
                      <span style="--tc:#25469E">AI 롱폼·숏폼</span>
                      <span style="--tc:#25469E">프리미엄</span>
                    </div>
                    <p class="svctab-desc-text">브랜드 메시지를 <strong>깊이 있는 스토리</strong>로 풀어내는 유튜브 전문 영상 제작. 프리미엄 롱폼부터 AI 기반 롱폼·숏폼까지 예산과 목적에 맞게 선택할 수 있습니다.</p>
                    <ul class="svctab-desc-points">
                      <li><span class="svctab-desc-dot" style="--dc:#25469E"></span>프리미엄 롱폼 — 브랜드 스토리 심층 전달</li>
                      <li><span class="svctab-desc-dot" style="--dc:#25469E"></span>AI 롱폼·AI 숏폼 — 합리적 단가의 스마트한 제작</li>
                      <li><span class="svctab-desc-dot" style="--dc:#25469E"></span>유튜브 알고리즘 최적화 기획·편집 포함</li>
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
          </div>

        </div>{/* /panel1 */}

        {/* ── 탭 패널 2 : 모델 ── */}
        <div class="svctab-panel" id="svctabPanel2">
          <div class="svctab-panel-head">
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
                  </div>
                </div>
                <div class="svctab-item-arrow">
                  <svg viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </div>
              </button>
              <div class="svctab-item-body open">
                <div class="svctab-item-content">
                  <div class="svctab-photo svctab-photo--filled" style="--img:url('/static/mkt-images/model-youtuber.png')">
                    <div class="svctab-photo-ph">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="14" rx="2"/><circle cx="12" cy="13" r="3.2"/><path d="M8 6l1.4-2h5.2L16 6"/></svg>
                      <span>YouTuber Model</span>
                    </div>
                  </div>
                  <div class="svctab-item-desc">
                    <div class="svctab-desc-tags">
                      <span style="--tc:#25469E">커머스 활성화</span>
                      <span style="--tc:#25469E">팬층 타겟</span>
                      <span style="--tc:#25469E">합리적 비용</span>
                    </div>
                    <p class="svctab-desc-text">크리에이터 커머스와 팬층 타겟에 맞는 모델. 연예인 모델보다 <strong>합리적인 비용</strong>으로 그 이상의 반응을 끌어내기도 합니다.</p>
                    <ul class="svctab-desc-points">
                      <li><span class="svctab-desc-dot" style="--dc:#25469E"></span>팬층 기반 구매 전환율 높음</li>
                      <li><span class="svctab-desc-dot" style="--dc:#25469E"></span>채널 연계 콘텐츠 광고 동시 집행 가능</li>
                      <li><span class="svctab-desc-dot" style="--dc:#25469E"></span>합리적 금액대로 높은 ROI 실현</li>
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
                  </div>
                </div>
                <div class="svctab-item-arrow">
                  <svg viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </div>
              </button>
              <div class="svctab-item-body">
                <div class="svctab-item-content">
                  <div class="svctab-photo svctab-photo--filled" style="--img:url('/static/mkt-images/model-celebrity.png')">
                    <div class="svctab-photo-ph">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="14" rx="2"/><circle cx="12" cy="13" r="3.2"/><path d="M8 6l1.4-2h5.2L16 6"/></svg>
                      <span>Celebrity Model</span>
                    </div>
                  </div>
                  <div class="svctab-item-desc">
                    <div class="svctab-desc-tags">
                      <span style="--tc:#25469E">이미지 제고</span>
                      <span style="--tc:#25469E">프리미엄</span>
                      <span style="--tc:#25469E">탄력적 비용</span>
                    </div>
                    <p class="svctab-desc-text">브랜드 <strong>이미지를 끌어올려야 할 때</strong> 어울리는 선택. 촬영 분량과 규모에 따라 비용을 유연하게 협의합니다.</p>
                    <ul class="svctab-desc-points">
                      <li><span class="svctab-desc-dot" style="--dc:#25469E"></span>브랜드 고급화 이미지 순간 확립</li>
                      <li><span class="svctab-desc-dot" style="--dc:#25469E"></span>대중 신뢰도와 인지도 확대</li>
                      <li><span class="svctab-desc-dot" style="--dc:#25469E"></span>규모에 따른 탄력적 예산 협의</li>
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
                  </div>
                </div>
                <div class="svctab-item-arrow">
                  <svg viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </div>
              </button>
              <div class="svctab-item-body">
                <div class="svctab-item-content">
                  <div class="svctab-photo svctab-photo--filled" style="--img:url('/static/mkt-images/model-commercial.png')">
                    <div class="svctab-photo-ph">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="14" rx="2"/><circle cx="12" cy="13" r="3.2"/><path d="M8 6l1.4-2h5.2L16 6"/></svg>
                      <span>Commercial Model</span>
                    </div>
                  </div>
                  <div class="svctab-item-desc">
                    <div class="svctab-desc-tags">
                      <span style="--tc:#25469E">시각 표현</span>
                      <span style="--tc:#25469E">합리적 비용</span>
                      <span style="--tc:#25469E">제품 표현</span>
                    </div>
                    <p class="svctab-desc-text">브랜드 제품을 <strong>시각적으로 표현</strong>할 때 최적화된 모델. 비교적 합리적인 비용으로 모델 특색을 살려 제품 핵심을 고급스럽게 표현합니다.</p>
                    <ul class="svctab-desc-points">
                      <li><span class="svctab-desc-dot" style="--dc:#25469E"></span>제품 핵심을 직관적으로 전달</li>
                      <li><span class="svctab-desc-dot" style="--dc:#25469E"></span>합리적 비용으로 고품질 촬영</li>
                      <li><span class="svctab-desc-dot" style="--dc:#25469E"></span>상황·컨셉에 맞는 다양한 모델 풀 보유</li>
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
          </div>

        </div>{/* /panel2 */}

      </div>

      <script dangerouslySetInnerHTML={{__html:`(function(){
  // ── 대분류 탭: 컴팩트화 + 활성 패널의 서브 문구(헤드) 아래로 이동 ──
  var nav = document.getElementById('svctabNav');
  if (nav) nav.classList.add('svctab-nav--compact');
  var tabBtns = document.querySelectorAll('#svctabNav .svctab-btn');
  var panels  = document.querySelectorAll('.svctab-panel');
  function placeNav(panel){
    if (!nav || !panel) return;
    var acc = panel.querySelector('.svctab-acc');
    if (acc) panel.insertBefore(nav, acc); else panel.appendChild(nav);
  }
  tabBtns.forEach(function(btn){
    btn.addEventListener('click', function(){
      var idx = parseInt(btn.dataset.tab);
      tabBtns.forEach(function(b){ b.classList.remove('active'); });
      panels.forEach(function(p){ p.classList.remove('active'); });
      btn.classList.add('active');
      panels[idx].classList.add('active');
      placeNav(panels[idx]);
    });
  });
  // 초기: 활성 패널의 헤드 아래로 탭 배치
  placeNav(document.querySelector('.svctab-panel.active') || panels[0]);
  // ── 강조 이펙트(동그라미·밑줄) — 스크롤 진입 시 그리기 ──
  var fxTitles = document.querySelectorAll('.ifl-fx-title');
  if (fxTitles.length && 'IntersectionObserver' in window) {
    var fxIo = new IntersectionObserver(function(ents){
      ents.forEach(function(e){
        if (e.isIntersecting) { e.target.classList.add('is-in'); fxIo.unobserve(e.target); }
      });
    }, { threshold: 0.6 });
    fxTitles.forEach(function(t){ fxIo.observe(t); });
  }
  // ── 중분류: 아코디언 → 2-Pane 변환 (좌측 리스트 / 우측 상세 고정) ──
  var ARROW = '<span class="svctab-sub-arrow"><svg viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>';
  document.querySelectorAll('.svctab-acc').forEach(function(acc){
    var items = Array.prototype.slice.call(acc.querySelectorAll('.svctab-item'));
    if(!items.length) return;
    var sublist = document.createElement('div'); sublist.className = 'svctab-sublist';
    var stage   = document.createElement('div'); stage.className = 'svctab-stage';
    items.forEach(function(item, i){
      var trig = item.querySelector('.svctab-item-trigger');
      var g = function(sel){ var e = trig.querySelector(sel); return e ? e.textContent : ''; };
      var gHtml = function(sel){ var e = trig.querySelector(sel); return e ? e.innerHTML : ''; };
      var on = (trig && trig.classList.contains('active')) || i === 0;
      var btn = document.createElement('button');
      btn.className = 'svctab-sub' + (on ? ' active' : '');
      btn.setAttribute('data-i', i);
      btn.innerHTML =
        '<span class="svctab-sub-idx">'+ g('.svctab-item-idx') +'</span>'
        + '<span class="svctab-sub-info"><span class="svctab-sub-name">'+ gHtml('.svctab-item-name') +'</span></span>' + ARROW;
      sublist.appendChild(btn);
      var content = item.querySelector('.svctab-item-content');
      var panel = document.createElement('div');
      panel.className = 'svctab-stage-item' + (on ? ' active' : '');
      panel.setAttribute('data-i', i);
      if(content) panel.appendChild(content);   // 노드 이동(콘텐츠 보존)
      stage.appendChild(panel);
    });
    acc.innerHTML = '';
    var pane = document.createElement('div'); pane.className = 'svctab-2pane';
    pane.appendChild(sublist); pane.appendChild(stage);
    acc.appendChild(pane);
    sublist.querySelectorAll('.svctab-sub').forEach(function(b){
      b.addEventListener('click', function(){
        var i = b.getAttribute('data-i');
        sublist.querySelectorAll('.svctab-sub').forEach(function(x){ x.classList.remove('active'); });
        stage.querySelectorAll('.svctab-stage-item').forEach(function(x){ x.classList.remove('active'); });
        b.classList.add('active');
        var t = stage.querySelector('.svctab-stage-item[data-i="'+i+'"]');
        if(t) t.classList.add('active');
      });
    });
  });
})();`}} />
    </section>



    {/* ══════════════════════════════════════════
        SERVICE 07 — 미디어믹스 2차가공 콘텐츠
    ══════════════════════════════════════════ */}
    <section class="ifl2-section ifl2-section--confidential ifl2-media-light" id="mediaMixContent">
      <div class="ifl2-conf-inner container">
        <div class="ifl2-conf-body">
          <h2 class="ifl2-conf-title">미디어믹스<br /><em>2차가공 콘텐츠</em></h2>

          <p class="ifl2-conf-sub">하나의 원본으로<br />매체와 고객을 재설계합니다.</p>

          <div class="ifl2-conf-box">
            <div class="ifl2-media-formula" aria-label="하나의 원본을 매체별로 최적화">
              <strong>하나의 원본</strong>
              <span><i></i><b>→</b></span>
              <strong>매체별 최적화</strong>
            </div>
            <div class="ifl2-media-point">
              <span>01</span><strong>매체별 규격</strong><p>채널 특성과 노출 위치에 맞게 화면과 호흡을 조정합니다.</p>
            </div>
            <div class="ifl2-media-point">
              <span>02</span><strong>메시지 재편집</strong><p>매체별 고객이 반응하는 장면과 메시지를 다시 선별합니다.</p>
            </div>
            <div class="ifl2-media-point">
              <span>03</span><strong>전환 흐름</strong><p>노출 이후 검색과 구매로 이어지는 동선을 함께 설계합니다.</p>
            </div>
            <p class="ifl2-media-note">캠페인 상세 사례는 계약상 공개 범위가 제한될 수 있으며, 미팅에서 브랜드 상황에 맞춘 적용 방식을 안내합니다.</p>
          </div>

        </div>
      </div>
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
          <h2 class="iflp-title">캠페인 시작부터 성과까지<br /><em>7단계 정밀 프로세스</em></h2>
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
                <span class="iflp2-panel-tag" style="--pc:#25469E">Strategy Consultation</span>
                <p class="iflp2-panel-desc">브랜드 목표·예산·타겟을 먼저 뜯어봅니다.<br />KPI와 방향을 같이 정하고 맞춤 전략을 제안합니다.<br />견적만 받는 상담이 아니라, 성장 전략을 짜는 미팅입니다.</p>
                <div class="iflp2-panel-tags"><p class="iflp2-ptag-label">KEY ACTIONS</p><div class="iflp2-ptag-grid"><span class="iflp2-ptag" style="--pc:#25469E">목표 정의</span><span class="iflp2-ptag" style="--pc:#25469E">예산 협의</span><span class="iflp2-ptag" style="--pc:#25469E">KPI 설정</span><span class="iflp2-ptag" style="--pc:#25469E">전략 수립</span></div></div>
              </div>
            </div>
            <div class="iflp2-panel" data-panel="1">
              <div class="iflp2-panel-img"><img src="/static/images/process/step02.png" alt="계약 진행" loading="lazy" /></div>
              <div class="iflp2-panel-body">
                <span class="iflp2-panel-tag" style="--pc:#7c3aed">Contract &amp; Scope</span>
                <p class="iflp2-panel-desc">진행 범위·일정·성과 지표를 명문화합니다.<br />투명한 비용 구조와 명확한 계약서로 신뢰를 보장합니다.<br />모든 조건이 계약서에 명시되어 불필요한 분쟁을 방지합니다.</p>
                <div class="iflp2-panel-tags"><p class="iflp2-ptag-label">KEY ACTIONS</p><div class="iflp2-ptag-grid"><span class="iflp2-ptag" style="--pc:#7c3aed">범위 확정</span><span class="iflp2-ptag" style="--pc:#7c3aed">일정 조율</span><span class="iflp2-ptag" style="--pc:#7c3aed">계약 체결</span><span class="iflp2-ptag" style="--pc:#7c3aed">비용 명문화</span></div></div>
              </div>
            </div>
            <div class="iflp2-panel" data-panel="2">
              <div class="iflp2-panel-img"><img src="/static/images/process/step03.png" alt="가이드라인 작성" loading="lazy" /></div>
              <div class="iflp2-panel-body">
                <span class="iflp2-panel-tag" style="--pc:#059669">Creative Briefing</span>
                <p class="iflp2-panel-desc">브랜드 메시지·금지 표현·톤앤매너를 담은 크리에이터 브리핑 가이드를 제작합니다.<br />크리에이터가 브랜드의 언어로 콘텐츠를 만들 수 있도록 상세 지침을 제공합니다.</p>
                <div class="iflp2-panel-tags"><p class="iflp2-ptag-label">KEY ACTIONS</p><div class="iflp2-ptag-grid"><span class="iflp2-ptag" style="--pc:#059669">톤앤매너</span><span class="iflp2-ptag" style="--pc:#059669">브리핑 문서</span><span class="iflp2-ptag" style="--pc:#059669">승인 기준</span><span class="iflp2-ptag" style="--pc:#059669">금지 표현</span></div></div>
              </div>
            </div>
            <div class="iflp2-panel" data-panel="3">
              <div class="iflp2-panel-img"><img src="/static/images/process/step04.png" alt="인플루언서 매칭" loading="lazy" /></div>
              <div class="iflp2-panel-body">
                <span class="iflp2-panel-tag" style="--pc:#0891b2">Creator Matching</span>
                <p class="iflp2-panel-desc">1,520+ 크리에이터 DB에서 타겟 적합성·퍼포먼스·단가를 종합 분석합니다.<br />단순 팔로워 수가 아닌 실제 전환율과 브랜드 핏을 기준으로 최적 크리에이터를 선별합니다.</p>
                <div class="iflp2-panel-tags"><p class="iflp2-ptag-label">KEY ACTIONS</p><div class="iflp2-ptag-grid"><span class="iflp2-ptag" style="--pc:#0891b2">DB 분석</span><span class="iflp2-ptag" style="--pc:#0891b2">적합성 검증</span><span class="iflp2-ptag" style="--pc:#0891b2">단가 협의</span><span class="iflp2-ptag" style="--pc:#0891b2">전환율 선별</span></div></div>
              </div>
            </div>
            <div class="iflp2-panel" data-panel="4">
              <div class="iflp2-panel-img"><img src="/static/images/process/step05.png" alt="콘텐츠 제작" loading="lazy" /></div>
              <div class="iflp2-panel-body">
                <span class="iflp2-panel-tag" style="--pc:#d97706">Content Production</span>
                <p class="iflp2-panel-desc">가이드라인 기반으로 크리에이터가 콘텐츠를 제작합니다.<br />브랜드 검수와 피드백을 거쳐 최종 확정합니다.<br />완성도 높은 콘텐츠가 나올 때까지 함께 조율합니다.</p>
                <div class="iflp2-panel-tags"><p class="iflp2-ptag-label">KEY ACTIONS</p><div class="iflp2-ptag-grid"><span class="iflp2-ptag" style="--pc:#d97706">제작 관리</span><span class="iflp2-ptag" style="--pc:#d97706">브랜드 검수</span><span class="iflp2-ptag" style="--pc:#d97706">최종 승인</span><span class="iflp2-ptag" style="--pc:#d97706">피드백 반영</span></div></div>
              </div>
            </div>
            <div class="iflp2-panel" data-panel="5">
              <div class="iflp2-panel-img"><img src="/static/images/process/step06.png" alt="연계 바이럴 확산" loading="lazy" /></div>
              <div class="iflp2-panel-body">
                <span class="iflp2-panel-tag" style="--pc:#dc2626">Viral Amplification</span>
                <p class="iflp2-panel-desc">반응이 가장 좋은 시간에 게시하고, 커뮤니티·SNS로 확산을 같이 굴립니다.<br />인플루언서 콘텐츠를 시작점 삼아 노출을 더 넓게 확대합니다.</p>
                <div class="iflp2-panel-tags"><p class="iflp2-ptag-label">KEY ACTIONS</p><div class="iflp2-ptag-grid"><span class="iflp2-ptag" style="--pc:#dc2626">SNS 확산</span><span class="iflp2-ptag" style="--pc:#dc2626">커뮤니티 연계</span><span class="iflp2-ptag" style="--pc:#dc2626">실시간 모니터링</span><span class="iflp2-ptag" style="--pc:#dc2626">추가 확산</span></div></div>
              </div>
            </div>
            <div class="iflp2-panel" data-panel="6">
              <div class="iflp2-panel-img"><img src="/static/images/process/step07.png" alt="리포팅" loading="lazy" /></div>
              <div class="iflp2-panel-body">
                <span class="iflp2-panel-tag" style="--pc:#a855f7">Performance Reporting</span>
                <p class="iflp2-panel-desc">조회수·도달·클릭·전환·매출까지 전 과정을 투명하게 리포팅합니다.<br />단순 수치 나열이 아닌 인사이트와 차기 캠페인 전략까지 함께 제공합니다.</p>
                <div class="iflp2-panel-tags"><p class="iflp2-ptag-label">KEY ACTIONS</p><div class="iflp2-ptag-grid"><span class="iflp2-ptag" style="--pc:#a855f7">성과 리포트</span><span class="iflp2-ptag" style="--pc:#a855f7">인사이트 분석</span><span class="iflp2-ptag" style="--pc:#a855f7">차기 전략</span><span class="iflp2-ptag" style="--pc:#a855f7">ROI 정산</span></div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <script dangerouslySetInnerHTML={{__html:`(function(){var items=document.querySelectorAll('#iflp2List .iflp2-item');var panels=document.querySelectorAll('#iflp2Panels .iflp2-panel');items.forEach(function(item){item.querySelector('button').addEventListener('click',function(){var idx=parseInt(item.dataset.idx);items.forEach(function(el){el.classList.remove('active');});panels.forEach(function(el){el.classList.remove('active');});item.classList.add('active');panels[idx].classList.add('active');});});})();`}} />
    </section>
    {/* ══ RESULTS ══ */}
    <SvcTerms service="influencer" />

    {/* ══ FAQ ══ */}
    <section class="section svc-faq-section">
      <div class="svc-bg-deco"><div class="svc-dot-pattern"></div><div class="svc-orb-right"></div><div class="svc-section-glow-top"></div></div>
      <div class="container">
        <div class="section-head">
          <span class="sec-label">FAQ</span>
          <h2 class="sec-title">자주 하는 질문</h2>
          <p class="sec-sub">인플루언서 마케팅에 대해 가장 많이 묻는 질문들을 모았습니다.</p>
        </div>
        <div class="faq-wrap" id="faqWrap" data-service="influencer"></div>
        <script dangerouslySetInnerHTML={{__html:`(function(){
          var pre=document.getElementById('faqWrap'); if(pre&&pre.children.length)return; // 서버(main.tsx)가 미리 채운 경우
          fetch('/api/admin/public/svc-faq/influencer')
            .then(function(r){return r.json();})
            .then(function(data){
              var wrap=document.getElementById('faqWrap');
              if(!wrap||!data.faq)return;
              wrap.innerHTML=data.faq.map(function(item,i){
                return '<div class="faq-item" id="faq-infl-'+i+'">'
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
      <div class="cta-img-bg" aria-hidden="true" style="--cta-img:url('/static/images/우리 브랜드에 맞는 인플루언서를 찾아드립니다.png')"></div>
      <div class="container">
        <div class="svc-cta-inner">
          <div class="svc-cta-text">
            <h2>우리 브랜드에 맞는<br /><em>인플루언서를 찾아드립니다</em></h2>
            <p>1,520+ 크리에이터 네트워크에서 브랜드에 맞는 파트너를 무료로 추천해드립니다.</p>
          </div>
        </div>
      </div>
    </section>


    {/* ── Scroll Reveal ── */}
    <script src="/static/influencer-counter.js?v=20260722u2"></script>
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
    </div>{/* /svc-light */}
  </>
)
