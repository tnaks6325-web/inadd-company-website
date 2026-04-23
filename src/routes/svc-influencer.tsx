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
  var cvs=document.getElementById('vhCanvas2'); if(!cvs)return;
  var ctx=cvs.getContext('2d'),W,H,pts=[];
  function resize(){W=cvs.width=window.innerWidth;H=cvs.height=cvs.closest('section').offsetHeight||window.innerHeight;}
  function mkPt(){return{x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.38,vy:(Math.random()-.5)*.38,r:Math.random()*1.8+.3,a:Math.random(),color:Math.random()>.6?'168,85,247':(Math.random()>.5?'236,72,153':'100,120,255')};}
  function init(){resize();pts=[];var n=Math.min(Math.floor(W*H/8000),130);for(var i=0;i<n;i++)pts.push(mkPt());}
  function draw(){ctx.clearRect(0,0,W,H);pts.forEach(function(p){p.x+=p.vx;p.y+=p.vy;p.a+=(Math.random()-.5)*.01;if(p.a<.1)p.a=.1;if(p.a>.9)p.a=.9;if(p.x<0)p.x=W;if(p.x>W)p.x=0;if(p.y<0)p.y=H;if(p.y>H)p.y=0;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle='rgba('+p.color+','+(p.a*.55)+')';ctx.fill();});
  for(var i=0;i<pts.length;i++){for(var j=i+1;j<pts.length;j++){var dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.sqrt(dx*dx+dy*dy);if(d<115){ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.strokeStyle='rgba(168,85,247,'+(0.13*(1-d/115))+')';ctx.lineWidth=.5;ctx.stroke();}}}
  requestAnimationFrame(draw);}
  init();draw();window.addEventListener('resize',init);
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
      {/* 배경 오브 */}
      <div class="ifl-data-bg">
        <div class="ifl-data-orb ifl-data-orb--blue"></div>
        <div class="ifl-data-orb ifl-data-orb--purple"></div>
      </div>

      <div class="container">

        {/* 섹션 헤드 */}
        <div class="ifl-data-head">
          <span class="ifl-data-eyebrow">VERIFIED CREATOR DATABASE</span>
          <h2 class="ifl-data-heading">
            방대한 숫자가 아닌,<br />
            <em>검증된 크리에이터만</em> DB에 담습니다
          </h2>
          <p class="ifl-data-subhead">
            구독자 수만 많은 크리에이터는 의미가 없습니다.<br />
            실제로 활동하고, <strong>구독자 대비 조회수가 의미 있는</strong> 국내 크리에이터만을 엄선해 관리합니다.
          </p>

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

        {/* 01 — 정밀 통계 리포트 */}
        <div class="ifl-data-row">
          <div class="ifl-data-text">
            <div class="ifl-data-num">01</div>
            <h3 class="ifl-data-title">구독자 수보다 중요한<br /><strong>조회수 품질 분석 리포트</strong></h3>
            <p class="ifl-data-desc">
              크리에이터 제안 시, 단순 구독자 수가 아닌 <strong>구독자 대비 실제 조회수 달성률</strong>,
              영상별 유지율, 성별/연령 시청자 분포 등 광고 효과를 직접 예측할 수 있는 핵심 지표를 함께 제공합니다.
            </p>
            <ul class="ifl-data-points">
              <li><span class="ifl-data-dot"></span>구독자 대비 조회수 달성률 지표 제공</li>
              <li><span class="ifl-data-dot"></span>성별 · 연령별 실시청자 분포 분석</li>
              <li><span class="ifl-data-dot"></span>조회수 유지율 · 이탈 구간 심층 리포트</li>
              <li><span class="ifl-data-dot"></span>구독자 이상 급증 · 매입 의심 채널 감지</li>
            </ul>
          </div>
          <div class="ifl-data-img-wrap ifl-data-img-wrap--report">
            <img src="/static/images/process/data-report.jpg" alt="구독자 수 및 조회수 추이 데이터 리포트 차트" />
          </div>
        </div>

        {/* 02 — 필터링 시스템 */}
        <div class="ifl-data-row ifl-data-row--rev">
          <div class="ifl-data-img-wrap ifl-data-img-wrap--filter">
            <img src="/static/images/process/filter-list.jpg" alt="크리에이터 상세 분석 리스트 뷰" class="ifl-filter-img ifl-filter-img--top" />
            <img src="/static/images/process/filter-grid.jpg" alt="크리에이터 그리드 필터링 시스템" class="ifl-filter-img ifl-filter-img--bottom" />
          </div>
          <div class="ifl-data-text">
            <div class="ifl-data-num">02</div>
            <h3 class="ifl-data-title">어떤 조건의 유튜버라도<br /><strong>정확하게 매칭해 드립니다</strong></h3>
            <p class="ifl-data-desc">
              카테고리, 구독자 규모, 업로드 주기, 시청자 성별/연령까지 — 브랜드가 원하는 조건을 입력하면
              <strong>1,520+개의 검증 DB</strong>에서 최적의 크리에이터를 즉시 추출합니다.
              기준 미달 채널은 실시간으로 제외되어 항상 최신 상태가 유지됩니다.
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
        SERVICE 01 — 연예인 & 인플루언서 섭외/협찬
    ══════════════════════════════════════════ */}
    <section class="ifl2-section ifl2-section--casting">
      <div class="ifl2-bg">
        <div class="ifl2-orb ifl2-orb--purple"></div>
        <div class="ifl2-orb ifl2-orb--pink"></div>
        <div class="ifl2-grid-lines"></div>
      </div>
      <div class="container">
        <div class="ifl2-section-head">
          <div class="ifl2-snum">01</div>
          <div class="ifl2-stitle-wrap">
            <span class="ifl2-slabel">Creator Casting</span>
            <h2 class="ifl2-stitle">연예인 &amp; 인플루언서 <em>섭외 / 협찬</em></h2>
            <p class="ifl2-slead">브랜드 예산과 목적에 맞게, <strong>최적의 인플루언서 전략</strong>을 정밀하게 설계합니다.</p>
          </div>
        </div>

        <div class="ifl2-casting-grid">
          {/* 연예인 */}
          <div class="ifl2-casting-card ifl2-casting-card--star">
            <div class="ifl2-cc-glow"></div>
            <div class="ifl2-cc-header">
              <div class="ifl2-cc-index">01</div>
              <div class="ifl2-cc-icon">
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 3L19.5 12.5H29.5L21.5 18L24.5 28L16 22.5L7.5 28L10.5 18L2.5 12.5H12.5L16 3Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
            <h3 class="ifl2-cc-title">연예인<br />섭외 / 협찬</h3>
            <p class="ifl2-cc-desc">연예인의 강력한 <strong>팬덤과 채널 콘텐츠</strong>를 동시에 활용해 팬층을 집중 공략하고, 브랜드 인지도를 폭발적으로 확장합니다.</p>
            <div class="ifl2-cc-tags">
              <span>브랜딩 강화</span><span>팬덤 마케팅</span><span>퍼포먼스 광고</span><span>판매 촉진</span>
            </div>
            <div class="ifl2-cc-line"></div>
          </div>

          {/* 인플루언서 */}
          <div class="ifl2-casting-card ifl2-casting-card--infl">
            <div class="ifl2-cc-glow"></div>
            <div class="ifl2-cc-header">
              <div class="ifl2-cc-index">02</div>
              <div class="ifl2-cc-icon">
                <svg viewBox="0 0 32 32" fill="none">
                  <circle cx="12" cy="9" r="4" stroke="currentColor" stroke-width="1.5"/>
                  <path d="M4 26c0-4.4 3.6-8 8-8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                  <circle cx="22" cy="11" r="3.5" stroke="currentColor" stroke-width="1.5"/>
                  <path d="M16 26c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </div>
            </div>
            <h3 class="ifl2-cc-title">인플루언서<br />섭외 / 협찬</h3>
            <p class="ifl2-cc-desc">연예인 대비 <strong>합리적인 비용으로 고효율</strong>을 끌어내는 전략. 높은 영향력을 보유한 인플루언서로 정확한 타겟에게 도달합니다.</p>
            <div class="ifl2-cc-tags">
              <span>인지도 상승</span><span>시청층 타겟</span><span>판매 촉진</span>
            </div>
            <div class="ifl2-cc-line"></div>
          </div>

          {/* 인스타 피드 */}
          <div class="ifl2-casting-card ifl2-casting-card--insta">
            <div class="ifl2-cc-glow"></div>
            <div class="ifl2-cc-header">
              <div class="ifl2-cc-index">03</div>
              <div class="ifl2-cc-icon">
                <svg viewBox="0 0 32 32" fill="none">
                  <rect x="3" y="3" width="26" height="26" rx="7" stroke="currentColor" stroke-width="1.5"/>
                  <circle cx="16" cy="16" r="5.5" stroke="currentColor" stroke-width="1.5"/>
                  <circle cx="23" cy="9" r="1.5" fill="currentColor"/>
                </svg>
              </div>
            </div>
            <h3 class="ifl2-cc-title">인스타 피드<br />연계</h3>
            <p class="ifl2-cc-desc">단순 노출을 넘어 <strong>팬덤 소통과 브랜드 친밀감</strong>을 동시에 강화. 정교한 피드 전략으로 진정성 있는 팬층을 공략합니다.</p>
            <div class="ifl2-cc-tags">
              <span>브랜딩 강화</span><span>팬덤 확산</span><span>친밀감 상승</span>
            </div>
            <div class="ifl2-cc-line"></div>
          </div>
        </div>
      </div>
    </section>

    {/* ══════════════════════════════════════════
        SERVICE 02 + 03 — 브랜디드 / 기획 PPL
    ══════════════════════════════════════════ */}
    <section class="ifl2-section ifl2-section--content">
      <div class="ifl2-bg">
        <div class="ifl2-orb ifl2-orb--blue"></div>
        <div class="ifl2-orb ifl2-orb--cyan"></div>
        <div class="ifl2-dot-field"></div>
      </div>
      <div class="container">
        <div class="ifl2-content-pair">

          {/* 브랜디드 */}
          <div class="ifl2-pair-card ifl2-pair-card--branded">
            <div class="ifl2-pair-num">02</div>
            <div class="ifl2-pair-category">Branded Content</div>
            <h3 class="ifl2-pair-title">브랜디드 콘텐츠</h3>
            <p class="ifl2-pair-desc">브랜드 메시지를 콘텐츠 그 자체로 승화시킵니다. 광고라는 인식 없이 크리에이터의 세계관과 브랜드 스토리가 완벽하게 융합된 <strong>프리미엄 콘텐츠</strong>를 제작합니다.</p>
            <ul class="ifl2-pair-list">
              <li>
                <span class="ifl2-pair-icon">
                  <svg viewBox="0 0 16 16" fill="none"><path d="M2 8l4 4 8-8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </span>
                크리에이터 세계관 연계 기획
              </li>
              <li>
                <span class="ifl2-pair-icon">
                  <svg viewBox="0 0 16 16" fill="none"><path d="M2 8l4 4 8-8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </span>
                브랜드 스토리텔링 극대화
              </li>
              <li>
                <span class="ifl2-pair-icon">
                  <svg viewBox="0 0 16 16" fill="none"><path d="M2 8l4 4 8-8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </span>
                자연스러운 메시지 임베딩
              </li>
            </ul>
            <div class="ifl2-pair-shimmer"></div>
          </div>

          {/* 기획 PPL */}
          <div class="ifl2-pair-card ifl2-pair-card--ppl">
            <div class="ifl2-pair-num">03</div>
            <div class="ifl2-pair-category">Planned PPL</div>
            <h3 class="ifl2-pair-title">기획 PPL</h3>
            <p class="ifl2-pair-desc">소비자가 광고임을 인식하지 못한 채 브랜드를 자연스럽게 경험하게 하는 가장 효과적인 방식. 콘텐츠 흐름 안에 제품을 녹여내어 <strong>거부감 없이 브랜드 인지도</strong>를 높입니다.</p>
            <ul class="ifl2-pair-list">
              <li>
                <span class="ifl2-pair-icon">
                  <svg viewBox="0 0 16 16" fill="none"><path d="M2 8l4 4 8-8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </span>
                콘텐츠 흐름 내 자연스러운 제품 노출
              </li>
              <li>
                <span class="ifl2-pair-icon">
                  <svg viewBox="0 0 16 16" fill="none"><path d="M2 8l4 4 8-8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </span>
                시청자 이탈률 최소화
              </li>
              <li>
                <span class="ifl2-pair-icon">
                  <svg viewBox="0 0 16 16" fill="none"><path d="M2 8l4 4 8-8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </span>
                브랜드 친밀감 및 신뢰 형성
              </li>
            </ul>
            <div class="ifl2-pair-shimmer"></div>
          </div>

        </div>
      </div>
    </section>

    {/* ══════════════════════════════════════════
        SERVICE 04 + 05 — 숏폼 & 유튜브 콘텐츠 제작
    ══════════════════════════════════════════ */}
    <section class="ifl2-section ifl2-section--youtube">
      <div class="ifl2-bg">
        <div class="ifl2-orb ifl2-orb--red"></div>
        <div class="ifl2-orb ifl2-orb--orange"></div>
        <div class="ifl2-grid-lines"></div>
      </div>
      <div class="container">
        <div class="ifl2-section-head">
          <div class="ifl2-snum">04 — 05</div>
          <div class="ifl2-stitle-wrap">
            <span class="ifl2-slabel">YouTube &amp; Short-form Content</span>
            <h2 class="ifl2-stitle">숏폼 &amp; 유튜브 <em>콘텐츠 제작</em></h2>
            <p class="ifl2-slead">플랫폼 특성과 예산에 맞는 <strong>4가지 영상 제작 솔루션</strong>을 제공합니다.</p>
          </div>
        </div>

        <div class="ifl2-yt-grid">
          <div class="ifl2-yt-card">
            <div class="ifl2-yt-top">
              <div class="ifl2-yt-badge ifl2-yt-badge--premium">PREMIUM</div>
              <div class="ifl2-yt-type">롱폼</div>
            </div>
            <div class="ifl2-yt-visual">
              <svg viewBox="0 0 48 48" fill="none">
                <rect x="4" y="8" width="40" height="28" rx="4" stroke="currentColor" stroke-width="1.5"/>
                <path d="M20 18l10 6-10 6V18z" fill="currentColor" opacity=".7"/>
                <path d="M16 40h16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </div>
            <h4>롱폼 영상 제작</h4>
            <p>정통 고품질 영상 제작. 브랜드 스토리와 제품을 깊이 있게 담아내는 <strong>프리미엄 전략</strong>에 최적화됩니다.</p>
            <div class="ifl2-yt-chips"><span>#고퀄리티</span><span>#프리미엄전략</span></div>
          </div>

          <div class="ifl2-yt-card">
            <div class="ifl2-yt-top">
              <div class="ifl2-yt-badge ifl2-yt-badge--ai">AI</div>
              <div class="ifl2-yt-type">롱폼</div>
            </div>
            <div class="ifl2-yt-visual">
              <svg viewBox="0 0 48 48" fill="none">
                <rect x="4" y="8" width="40" height="28" rx="4" stroke="currentColor" stroke-width="1.5"/>
                <circle cx="16" cy="20" r="3" stroke="currentColor" stroke-width="1.5"/>
                <path d="M26 16l6 4-6 4V16z" fill="currentColor" opacity=".7"/>
                <path d="M26 26h8M16 28h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M16 40h16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </div>
            <h4>AI 롱폼 영상 제작</h4>
            <p>AI 기술로 일반 롱폼 대비 <strong>합리적인 단가</strong>로 진행. 방향 설계가 핵심인 스마트한 제작 방식입니다.</p>
            <div class="ifl2-yt-chips"><span>#합리적단가</span><span>#AI제작</span></div>
          </div>

          <div class="ifl2-yt-card">
            <div class="ifl2-yt-top">
              <div class="ifl2-yt-badge ifl2-yt-badge--trend">TREND</div>
              <div class="ifl2-yt-type">숏폼</div>
            </div>
            <div class="ifl2-yt-visual">
              <svg viewBox="0 0 48 48" fill="none">
                <rect x="14" y="4" width="20" height="36" rx="4" stroke="currentColor" stroke-width="1.5"/>
                <path d="M21 19l8 5-8 5V19z" fill="currentColor" opacity=".7"/>
                <circle cx="24" cy="38" r="1.5" fill="currentColor" opacity=".5"/>
              </svg>
            </div>
            <h4>전통 숏폼 콘텐츠</h4>
            <p>유튜브 트렌드에 맞춘 숏폼 영상. 주로 <strong>광고 집행용</strong>으로 활용되며 바이럴 확산에 최적화됩니다.</p>
            <div class="ifl2-yt-chips"><span>#트렌드적합</span><span>#광고집행용</span></div>
          </div>

          <div class="ifl2-yt-card">
            <div class="ifl2-yt-top">
              <div class="ifl2-yt-badge ifl2-yt-badge--ai">AI</div>
              <div class="ifl2-yt-type">숏폼</div>
            </div>
            <div class="ifl2-yt-visual">
              <svg viewBox="0 0 48 48" fill="none">
                <rect x="14" y="4" width="20" height="36" rx="4" stroke="currentColor" stroke-width="1.5"/>
                <path d="M24 14v8M20 18h8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M19 28l5 4 5-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="24" cy="38" r="1.5" fill="currentColor" opacity=".5"/>
              </svg>
            </div>
            <h4>AI 숏폼 콘텐츠</h4>
            <p>전통 방식 대비 <strong>합리적인 금액</strong>으로 빠르게 제작. 퍼포먼스 광고 영상 제작에 특히 유리합니다.</p>
            <div class="ifl2-yt-chips"><span>#합리적금액</span><span>#퍼포먼스특화</span></div>
          </div>
        </div>
      </div>
    </section>

    {/* ══════════════════════════════════════════
        SERVICE 06 — 모델
    ══════════════════════════════════════════ */}
    <section class="ifl2-section ifl2-section--model">
      <div class="ifl2-bg">
        <div class="ifl2-orb ifl2-orb--violet"></div>
        <div class="ifl2-orb ifl2-orb--teal"></div>
        <div class="ifl2-dot-field"></div>
      </div>
      <div class="container">
        <div class="ifl2-section-head">
          <div class="ifl2-snum">06</div>
          <div class="ifl2-stitle-wrap">
            <span class="ifl2-slabel">Model Service</span>
            <h2 class="ifl2-stitle">모델</h2>
            <p class="ifl2-slead">브랜드의 목표와 예산에 최적화된 <strong>모델 전략</strong>을 설계합니다.</p>
          </div>
        </div>

        <div class="ifl2-model-row">
          {/* 유튜버 모델 */}
          <div class="ifl2-model-card">
            <div class="ifl2-mc-top">
              <span class="ifl2-mc-num">01</span>
              <div class="ifl2-mc-icon ifl2-mc-icon--red">
                <svg viewBox="0 0 24 24" fill="none"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" stroke="currentColor" stroke-width="1.5"/><path d="M9.75 15.02L15.5 12l-5.75-3.02v6.04z" fill="currentColor" opacity=".8"/></svg>
              </div>
            </div>
            <h4>유튜버 모델</h4>
            <ul class="ifl2-mc-list">
              <li>크리에이터 커머스 활성화 &amp; 팬층 타겟 마케팅에 최적</li>
              <li>연예인 모델 대비 <strong>합리적인 비용</strong>으로 집행 가능</li>
              <li>미들급 연예인 이상의 퍼포먼스 창출</li>
            </ul>
            <div class="ifl2-mc-glow"></div>
          </div>

          {/* 연예인 모델 — 피처드 */}
          <div class="ifl2-model-card ifl2-model-card--featured">
            <div class="ifl2-mc-featured-tag">FEATURED</div>
            <div class="ifl2-mc-top">
              <span class="ifl2-mc-num">02</span>
              <div class="ifl2-mc-icon ifl2-mc-icon--purple">
                <svg viewBox="0 0 24 24" fill="none"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
              </div>
            </div>
            <h4>연예인 모델</h4>
            <ul class="ifl2-mc-list">
              <li>브랜드 확실한 <strong>이미지 제고</strong>가 필요할 때 최선택</li>
              <li>프리미엄 금액대 형성 (고예산)</li>
              <li>촬영 콘텐츠와 규모에 따라 탄력적 비용 구조</li>
            </ul>
            <div class="ifl2-mc-glow"></div>
          </div>

          {/* 일반 모델 */}
          <div class="ifl2-model-card">
            <div class="ifl2-mc-top">
              <span class="ifl2-mc-num">03</span>
              <div class="ifl2-mc-icon ifl2-mc-icon--teal">
                <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.5"/><path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
              </div>
            </div>
            <h4>일반 모델</h4>
            <ul class="ifl2-mc-list">
              <li>브랜드 제품을 <strong>시각적으로 표현</strong>할 때 최적</li>
              <li>비교적 합리적인 비용으로 집행</li>
              <li>모델 특색으로 제품 핵심을 고급스럽게 표현</li>
            </ul>
            <div class="ifl2-mc-glow"></div>
          </div>
        </div>
      </div>
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

          <a href="/contact" class="hero-cta-btn primary ifl2-conf-cta">
            <span>킥오프 미팅 신청하기</span>
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
                <div class="iflp2-panel-tags"><p class="iflp2-ptag-label">KEY ACTIONS</p><div class="iflp2-ptag-grid"><span class="iflp2-ptag" style="--pc:#2563eb">🎯 목표 정의</span><span class="iflp2-ptag" style="--pc:#2563eb">💰 예산 협의</span><span class="iflp2-ptag" style="--pc:#2563eb">📊 KPI 설정</span><span class="iflp2-ptag" style="--pc:#2563eb">🗺 전략 방향 수립</span></div></div>
              </div>
            </div>
            <div class="iflp2-panel" data-panel="1">
              <div class="iflp2-panel-img"><img src="/static/images/process/step02.png" alt="계약 진행" loading="lazy" /></div>
              <div class="iflp2-panel-body">
                <span class="iflp2-panel-tag" style="--pc:#7c3aed">Contract &amp; Scope</span>
                <p class="iflp2-panel-desc">진행 범위·일정·성과 지표를 명문화합니다.<br />투명한 비용 구조와 명확한 계약서로 신뢰를 보장합니다.<br />모든 조건이 계약서에 명시되어 불필요한 분쟁을 방지합니다.</p>
                <div class="iflp2-panel-tags"><p class="iflp2-ptag-label">KEY ACTIONS</p><div class="iflp2-ptag-grid"><span class="iflp2-ptag" style="--pc:#7c3aed">📋 범위 확정</span><span class="iflp2-ptag" style="--pc:#7c3aed">📅 일정 조율</span><span class="iflp2-ptag" style="--pc:#7c3aed">✍️ 계약 체결</span><span class="iflp2-ptag" style="--pc:#7c3aed">🔒 투명한 비용</span></div></div>
              </div>
            </div>
            <div class="iflp2-panel" data-panel="2">
              <div class="iflp2-panel-img"><img src="/static/images/process/step03.png" alt="가이드라인 작성" loading="lazy" /></div>
              <div class="iflp2-panel-body">
                <span class="iflp2-panel-tag" style="--pc:#059669">Creative Briefing</span>
                <p class="iflp2-panel-desc">브랜드 메시지·금지 표현·톤앤매너를 담은 크리에이터 브리핑 가이드를 제작합니다.<br />크리에이터가 브랜드의 언어로 콘텐츠를 만들 수 있도록 상세 지침을 제공합니다.</p>
                <div class="iflp2-panel-tags"><p class="iflp2-ptag-label">KEY ACTIONS</p><div class="iflp2-ptag-grid"><span class="iflp2-ptag" style="--pc:#059669">🎨 톤앤매너</span><span class="iflp2-ptag" style="--pc:#059669">📄 브리핑 문서</span><span class="iflp2-ptag" style="--pc:#059669">✅ 승인 기준</span><span class="iflp2-ptag" style="--pc:#059669">🚫 금지 표현 정리</span></div></div>
              </div>
            </div>
            <div class="iflp2-panel" data-panel="3">
              <div class="iflp2-panel-img"><img src="/static/images/process/step04.png" alt="인플루언서 매칭" loading="lazy" /></div>
              <div class="iflp2-panel-body">
                <span class="iflp2-panel-tag" style="--pc:#0891b2">Creator Matching</span>
                <p class="iflp2-panel-desc">1,200+ 크리에이터 DB에서 타겟 적합성·퍼포먼스·단가를 종합 분석합니다.<br />단순 팔로워 수가 아닌 실제 전환율과 브랜드 핏을 기준으로 최적 크리에이터를 선별합니다.</p>
                <div class="iflp2-panel-tags"><p class="iflp2-ptag-label">KEY ACTIONS</p><div class="iflp2-ptag-grid"><span class="iflp2-ptag" style="--pc:#0891b2">🗄 1,200+ DB 분석</span><span class="iflp2-ptag" style="--pc:#0891b2">🔍 적합성 검증</span><span class="iflp2-ptag" style="--pc:#0891b2">💹 단가 협의</span><span class="iflp2-ptag" style="--pc:#0891b2">📈 전환율 기반 선별</span></div></div>
              </div>
            </div>
            <div class="iflp2-panel" data-panel="4">
              <div class="iflp2-panel-img"><img src="/static/images/process/step05.png" alt="콘텐츠 제작" loading="lazy" /></div>
              <div class="iflp2-panel-body">
                <span class="iflp2-panel-tag" style="--pc:#d97706">Content Production</span>
                <p class="iflp2-panel-desc">가이드라인 기반으로 크리에이터가 콘텐츠를 제작합니다.<br />브랜드 검수와 피드백을 거쳐 최종 확정합니다.<br />완성도 높은 콘텐츠가 나올 때까지 함께 조율합니다.</p>
                <div class="iflp2-panel-tags"><p class="iflp2-ptag-label">KEY ACTIONS</p><div class="iflp2-ptag-grid"><span class="iflp2-ptag" style="--pc:#d97706">🎬 제작 모니터링</span><span class="iflp2-ptag" style="--pc:#d97706">🔎 브랜드 검수</span><span class="iflp2-ptag" style="--pc:#d97706">✅ 최종 승인</span><span class="iflp2-ptag" style="--pc:#d97706">🔄 피드백 반영</span></div></div>
              </div>
            </div>
            <div class="iflp2-panel" data-panel="5">
              <div class="iflp2-panel-img"><img src="/static/images/process/step06.png" alt="연계 바이럴 확산" loading="lazy" /></div>
              <div class="iflp2-panel-body">
                <span class="iflp2-panel-tag" style="--pc:#dc2626">Viral Amplification</span>
                <p class="iflp2-panel-desc">최적 시간에 콘텐츠를 게시하고 커뮤니티·SNS 연계 확산 전략을 병행 실행합니다.<br />인플루언서 콘텐츠를 씨앗으로 바이럴 파급력을 극대화합니다.</p>
                <div class="iflp2-panel-tags"><p class="iflp2-ptag-label">KEY ACTIONS</p><div class="iflp2-ptag-grid"><span class="iflp2-ptag" style="--pc:#dc2626">📱 SNS 확산</span><span class="iflp2-ptag" style="--pc:#dc2626">💬 커뮤니티 연계</span><span class="iflp2-ptag" style="--pc:#dc2626">📡 실시간 모니터링</span><span class="iflp2-ptag" style="--pc:#dc2626">⚡ 추가 확산 실행</span></div></div>
              </div>
            </div>
            <div class="iflp2-panel" data-panel="6">
              <div class="iflp2-panel-img"><img src="/static/images/process/step07.png" alt="리포팅" loading="lazy" /></div>
              <div class="iflp2-panel-body">
                <span class="iflp2-panel-tag" style="--pc:#a855f7">Performance Reporting</span>
                <p class="iflp2-panel-desc">조회수·도달·클릭·전환·매출까지 전 과정을 투명하게 리포팅합니다.<br />단순 수치 나열이 아닌 인사이트와 차기 캠페인 전략까지 함께 제공합니다.</p>
                <div class="iflp2-panel-tags"><p class="iflp2-ptag-label">KEY ACTIONS</p><div class="iflp2-ptag-grid"><span class="iflp2-ptag" style="--pc:#a855f7">📊 성과 대시보드</span><span class="iflp2-ptag" style="--pc:#a855f7">🔬 인사이트 분석</span><span class="iflp2-ptag" style="--pc:#a855f7">🚀 차기 전략 제안</span><span class="iflp2-ptag" style="--pc:#a855f7">📈 ROI 리포트</span></div></div>
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
