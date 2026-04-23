export const SvcSeoPage = () => (
  <>
    <section class="vh-hero">
      <canvas id="vhCanvas4" class="vh-canvas"></canvas>
      <div class="vh-bg">
        <div class="vh-orb vh-orb--1" style="background:radial-gradient(circle,rgba(234,179,8,0.22) 0%,transparent 70%)"></div>
        <div class="vh-orb vh-orb--2" style="background:radial-gradient(circle,rgba(249,115,22,0.18) 0%,transparent 70%)"></div>
        <div class="vh-orb vh-orb--3" style="background:radial-gradient(circle,rgba(26,107,255,0.18) 0%,transparent 70%)"></div>
        <div class="vh-grid"></div>
        <div class="vh-noise"></div>
      </div>
      <div class="container vh-inner">
        <a href="/marketing" class="svc-back-link vh-back">← Marketing 전체보기</a>
        <div class="vh-badge" style="color:rgba(234,179,8,0.95);border-color:rgba(234,179,8,0.35);background:rgba(234,179,8,0.08)">
          <span class="vh-badge-dot" style="background:rgba(234,179,8,1);box-shadow:0 0 8px rgba(234,179,8,0.9)"></span>
          <span>SEO MARKETING</span>
        </div>
        <h1 class="vh-title">
          <span class="vh-tline" id="seL1">검색 결과의 가장 위,</span>
          <span class="vh-tline" id="seL2" style="background:linear-gradient(135deg,#fff 20%,rgba(234,179,8,0.95) 55%,rgba(249,115,22,0.85) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">브랜드가 먼저 보여야 합니다.</span>
        </h1>
        <div class="vh-sub-wrap" id="seSub">
          <p class="vh-sub">소비자는 구매 직전 반드시 검색합니다.</p>
          <p class="vh-sub"><strong style="color:rgba(255,255,255,0.9)">네이버 플레이스, 자동완성, 유튜브, 인스타그램</strong> — 검색이 일어나는 모든 채널에서</p>
          <p class="vh-sub" style="margin-top:8px"><span style="color:rgba(234,179,8,0.9);font-weight:600">브랜드를 먼저 발견하게 만드는 정교한 SEO 전략.</span></p>
        </div>
        <div class="vh-kpi-strip" id="seKpi">
          <div class="vh-kpi-item">
            <strong class="vh-kpi-num" style="color:#eab308">TOP3</strong>
            <span class="vh-kpi-label">검색 순위 달성</span>
          </div>
          <div class="vh-kpi-sep"></div>
          <div class="vh-kpi-item">
            <strong class="vh-kpi-num">+1,200%</strong>
            <span class="vh-kpi-label">최대 검색량 증가</span>
          </div>
          <div class="vh-kpi-sep"></div>
          <div class="vh-kpi-item">
            <strong class="vh-kpi-num">4개</strong>
            <span class="vh-kpi-label">채널 동시 커버</span>
          </div>
        </div>
        <div class="vh-btns" id="seBtns">
          <a href="/contact" class="hero-cta-btn primary">
            <span>무료 전략 상담받기</span>
            <svg viewBox="0 0 24 24" fill="none"><path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
          <a href="#seo-products" class="vh-scroll-btn">
            <span>상품 보기</span>
            <svg viewBox="0 0 24 24" fill="none" width="15" height="15"><path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
        </div>
      </div>
      <div class="vh-scroll-hint">
        <div class="vh-scroll-mouse"><div class="vh-scroll-wheel"></div></div>
      </div>
      <script dangerouslySetInnerHTML={{ __html: `
(function(){
  var cvs=document.getElementById('vhCanvas4'); if(!cvs)return;
  var ctx=cvs.getContext('2d'),W,H,pts=[];
  function resize(){W=cvs.width=window.innerWidth;H=cvs.height=cvs.closest('section').offsetHeight||window.innerHeight;}
  function mkPt(){return{x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.38,vy:(Math.random()-.5)*.38,r:Math.random()*1.8+.3,a:Math.random(),color:Math.random()>.6?'234,179,8':(Math.random()>.5?'249,115,22':'26,107,255')};}
  function init(){resize();pts=[];var n=Math.min(Math.floor(W*H/8000),130);for(var i=0;i<n;i++)pts.push(mkPt());}
  function draw(){ctx.clearRect(0,0,W,H);pts.forEach(function(p){p.x+=p.vx;p.y+=p.vy;p.a+=(Math.random()-.5)*.01;if(p.a<.1)p.a=.1;if(p.a>.9)p.a=.9;if(p.x<0)p.x=W;if(p.x>W)p.x=0;if(p.y<0)p.y=H;if(p.y>H)p.y=0;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle='rgba('+p.color+','+(p.a*.55)+')';ctx.fill();});
  for(var i=0;i<pts.length;i++){for(var j=i+1;j<pts.length;j++){var dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.sqrt(dx*dx+dy*dy);if(d<115){ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.strokeStyle='rgba(234,179,8,'+(0.12*(1-d/115))+')';ctx.lineWidth=.5;ctx.stroke();}}}
  requestAnimationFrame(draw);}
  init();draw();window.addEventListener('resize',init);
  function anim(el,delay,dir){if(!el)return;el.style.opacity='0';el.style.transform=dir==='up'?'translateY(32px)':'translateX(-32px)';el.style.transition='opacity .9s cubic-bezier(.25,.46,.45,.94),transform .9s cubic-bezier(.25,.46,.45,.94)';setTimeout(function(){el.style.opacity='1';el.style.transform='none';},delay);}
  anim(document.getElementById('seL1'),200,'left');
  anim(document.getElementById('seL2'),440,'left');
  anim(document.getElementById('seSub'),700,'up');
  anim(document.getElementById('seKpi'),940,'up');
  anim(document.getElementById('seBtns'),1140,'up');
})();
      `}} />
    </section>

    {/* ══ 4대 SEO 상품군 탭 ══ */}
    <section class="section seo-products-section" id="seo-products">
      <div class="svc-bg-deco"><div class="svc-grid-lines"></div><div class="svc-orb-right"></div><div class="svc-section-glow-top"></div></div>
      <div class="container">
        <div class="section-head">
          <span class="sec-label">SEO Products</span>
          <h2 class="sec-title">4대 SEO 상품군</h2>
          <p class="sec-sub">검색이 일어나는 모든 채널을 커버합니다.</p>
        </div>

        {/* 탭 버튼 */}
        <div class="seop-tabs" id="seopTabs">
          <button class="seop-tab active" data-tab="0">
            <span class="seop-tab-icon">📍</span>
            <span class="seop-tab-label">네이버 플레이스</span>
          </button>
          <button class="seop-tab" data-tab="1">
            <span class="seop-tab-icon">⌨️</span>
            <span class="seop-tab-label">검색어 자동완성</span>
          </button>
          <button class="seop-tab" data-tab="2">
            <span class="seop-tab-icon">▶️</span>
            <span class="seop-tab-label">유튜브 SEO</span>
          </button>
          <button class="seop-tab" data-tab="3">
            <span class="seop-tab-icon">📸</span>
            <span class="seop-tab-label">인스타 검색</span>
          </button>
        </div>

        {/* 탭 패널들 */}
        <div class="seop-panels" id="seopPanels">

          {/* ── 패널 0 : 네이버 플레이스 ── */}
          <div class="seop-panel active" data-panel="0">
            <div class="seop-panel-inner">
              {/* 왼쪽 텍스트 */}
              <div class="seop-info">
                <div class="seop-tag-row">
                  <span class="seop-chip" style="--cc:#f59e0b">Naver Place</span>
                  <span class="seop-purpose">플레이스 순위 상승</span>
                </div>
                <h3 class="seop-title">네이버 지도·플레이스<br />상위 노출 전략</h3>
                <p class="seop-desc">
                  네이버 지도와 플레이스 검색에서 <strong>상위 순위를 차지</strong>하는 것은 오프라인 매장의 필수 과제입니다.<br /><br />
                  인애드컴퍼니는 블로그 배포, 유입 작업, 방문자 리뷰, 저장 작업을 유기적으로 결합해 플레이스 알고리즘을 공략합니다.
                </p>

                {/* 4가지 세부 작업 카드 */}
                <div class="seop-sub-grid">
                  <div class="seop-sub-card seop-sub-card--blog-trigger" id="seoBlogCard" style="--sc:#3b82f6" tabindex="0" role="button" aria-label="블로그 배포 효과 보기">
                    <div class="seop-sub-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>
                    </div>
                    <div>
                      <strong>블로그 배포</strong>
                      <p>키워드 최적화 블로그 포스팅으로 플레이스 연관 콘텐츠를 확산</p>
                    </div>
                  </div>
                  <div class="seop-sub-card seop-sub-card--trigger" id="seoInflowCard" style="--sc:#8b5cf6" tabindex="0" role="button" aria-label="유입 작업 효과 보기">
                    <div class="seop-sub-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                    </div>
                    <div>
                      <strong>유입 작업</strong>
                      <p>플레이스 페이지 클릭 및 유입 수를 늘려 알고리즘 신호를 강화</p>
                    </div>
                  </div>
                  <div class="seop-sub-card seop-sub-card--trigger" id="seoReviewCard" style="--sc:#10b981" tabindex="0" role="button" aria-label="방문자 리뷰 효과 보기">
                    <div class="seop-sub-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    </div>
                    <div>
                      <strong>방문자 리뷰</strong>
                      <p>실제 방문자 리뷰를 축적해 신뢰도와 순위를 동시에 끌어올림</p>
                    </div>
                  </div>
                  <div class="seop-sub-card seop-sub-card--trigger" id="seoSaveCard" style="--sc:#f59e0b" tabindex="0" role="button" aria-label="저장 작업 효과 보기">
                    <div class="seop-sub-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                    </div>
                    <div>
                      <strong>저장 작업</strong>
                      <p>플레이스 저장 수 증가로 알고리즘 인기도 지표를 직접 상승</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 오른쪽 시각화 — 실제 이미지 모핑 비주얼 */}
              <div class="seop-visual" id="seopPlaceVisual">
                {/* 블로그 배포 모핑 컨테이너 */}
                <div class="seop-blog-morph" id="seoBlogMorph">

                  {/* 레이어 1: 전체 스크린 (기본 상태) */}
                  <div class="sbm-base" id="sbmBase">
                    <img src="/static/seo-images/blog-before.jpg" alt="네이버 플레이스 전체 화면" class="sbm-base-img" />
                    {/* 미묘한 테두리 프레임 */}
                    <div class="sbm-frame"></div>
                    {/* 클릭 힌트 */}
                    <div class="sbm-hint" id="sbmHint">
                      <span class="sbm-hint-icon">👆</span>
                      <span class="sbm-hint-text">블로그 배포 카드를 클릭하세요</span>
                    </div>
                  </div>

                  {/* 레이어 2: 모핑 확대 오버레이 (블로그 배포 클릭 시) */}
                  <div class="sbm-morph" id="sbmMorph">
                    {/* 흐린 배경 블러 */}
                    <div class="sbm-backdrop"></div>
                    {/* 확대된 블로그 리뷰 영역 */}
                    <div class="sbm-zoom-card" id="sbmZoomCard">
                      <img src="/static/seo-images/blog-after.jpg" alt="블로그 리뷰 증가" class="sbm-zoom-img" />
                      {/* UP! 강조 뱃지 */}
                      <div class="sbm-up-badge">
                        <span class="sbm-up-text">UP!</span>
                        <span class="sbm-up-arrow">↑</span>
                      </div>
                      {/* 통계 라벨 */}
                      <div class="sbm-stat-row">
                        <div class="sbm-stat">
                          <strong>블로그 리뷰</strong>
                          <span class="sbm-stat-num" id="sbmBlogNum">0</span>
                        </div>
                        <div class="sbm-stat-divider"></div>
                        <div class="sbm-stat">
                          <strong>방문자 리뷰</strong>
                          <span class="sbm-stat-num" id="sbmVisitNum">0</span>
                        </div>
                      </div>
                    </div>
                    {/* 닫기 버튼 */}
                    <button class="sbm-close" id="sbmClose">✕ 닫기</button>
                  </div>

                  {/* ── 레이어 3: 유입 작업 (실제 이미지 + 마우스 커서 클릭 연출) ── */}
                  <div class="sbm-morph sbm-morph--inflow" id="sbmInflowMorph">
                    <div class="sbm-backdrop"></div>
                    {/* 전체 이미지를 배경으로 보여주고 그 위에 커서 클릭 */}
                    <div class="sbm-zoom-card sbm-zoom-card--inflow" id="sbmInflowCard">
                      {/* blog-before.jpg 를 배경 이미지로 깔기 */}
                      <div class="sbm-inflow-img-wrap" id="sbmInflowImgWrap">
                        <img src="/static/seo-images/blog-before.jpg" alt="플레이스 유입 작업" class="sbm-inflow-bg-img" id="sbmInflowBgImg" />
                        {/* 클릭 타깃 하이라이트 — 플레이스 카드 영역 */}
                        <div class="sbm-inflow-click-target" id="sbmInflowTarget"></div>
                        {/* 마우스 커서 SVG */}
                        <div class="sbm-cursor sbm-cursor--inflow" id="sbmCursor">
                          <svg viewBox="0 0 24 24" width="32" height="32" fill="none">
                            <path d="M5 3l14 9-7 1-4 7z" fill="white" stroke="#1a1a2e" stroke-width="1.2"/>
                          </svg>
                          <div class="sbm-cursor-ring" id="sbmCursorRing"></div>
                        </div>
                        {/* click! 텍스트 */}
                        <div class="sbm-click-label sbm-click-label--inflow" id="sbmClickLabel">click !</div>
                        {/* 유입 카운트 배지 */}
                        <div class="sbm-inflow-badge" id="sbmInflowBadge">
                          <span class="sbm-inflow-badge-icon">👆</span>
                          <span class="sbm-inflow-badge-text">유입 <strong id="sbmInflowCount">0</strong></span>
                        </div>
                      </div>
                    </div>
                    <button class="sbm-close" id="sbmInflowClose">✕ 닫기</button>
                  </div>

                  {/* ── 레이어 4: 방문자 리뷰 (블로그 배포와 동일 방식) ── */}
                  <div class="sbm-morph sbm-morph--review" id="sbmReviewMorph">
                    <div class="sbm-backdrop"></div>
                    <div class="sbm-zoom-card sbm-zoom-card--review" id="sbmReviewCard">
                      <img src="/static/seo-images/review-place.jpg" alt="방문자 리뷰 증가" class="sbm-zoom-img sbm-zoom-img--review" />
                      <div class="sbm-up-badge sbm-up-badge--green">
                        <span class="sbm-up-text">UP!</span>
                        <span class="sbm-up-arrow">↑</span>
                      </div>
                      <div class="sbm-stat-row">
                        <div class="sbm-stat">
                          <strong>방문자 리뷰</strong>
                          <span class="sbm-stat-num sbm-stat-num--green" id="sbmReviewNum">0</span>
                        </div>
                        <div class="sbm-stat-divider"></div>
                        <div class="sbm-stat">
                          <strong>블로그 리뷰</strong>
                          <span class="sbm-stat-num sbm-stat-num--green" id="sbmReviewBlogNum">0</span>
                        </div>
                      </div>
                    </div>
                    <button class="sbm-close" id="sbmReviewClose">✕ 닫기</button>
                  </div>

                  {/* ── 레이어 5: 저장 작업 (마우스 커서 + 저장 버튼 클릭) ── */}
                  <div class="sbm-morph sbm-morph--save" id="sbmSaveMorph">
                    <div class="sbm-backdrop"></div>
                    <div class="sbm-zoom-card sbm-zoom-card--save" id="sbmSaveCard">
                      {/* 저장 이미지 래퍼 — 커서 포지셔닝 기준 */}
                      <div class="sbm-save-img-wrap">
                        <img src="/static/seo-images/save-click.jpg" alt="저장 클릭" class="sbm-zoom-img sbm-zoom-img--save" id="sbmSaveImg" />
                        {/* 저장 버튼 하이라이트 */}
                        <div class="sbm-save-target" id="sbmSaveTarget"></div>
                        {/* 마우스 커서 SVG */}
                        <div class="sbm-cursor sbm-cursor--save" id="sbmSaveCursor">
                          <svg viewBox="0 0 24 24" width="32" height="32" fill="none">
                            <path d="M5 3l14 9-7 1-4 7z" fill="white" stroke="#1a1a2e" stroke-width="1.2"/>
                          </svg>
                          <div class="sbm-cursor-ring sbm-cursor-ring--amber" id="sbmSaveCursorRing"></div>
                        </div>
                        <div class="sbm-click-label sbm-click-label--amber" id="sbmSaveClickLabel">저장 !</div>
                      </div>
                      {/* 저장 카운트 */}
                      <div class="sbm-stat-row sbm-stat-row--save">
                        <div class="sbm-stat">
                          <strong>저장 수 증가</strong>
                          <span class="sbm-stat-num sbm-stat-num--amber" id="sbmSaveNum">0</span>
                        </div>
                      </div>
                    </div>
                    <button class="sbm-close" id="sbmSaveClose">✕ 닫기</button>
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* ── 패널 1 : 자동완성 ── */}
          <div class="seop-panel" data-panel="1">
            <div class="seop-panel-inner">
              <div class="seop-info">
                <div class="seop-tag-row">
                  <span class="seop-chip" style="--cc:#6d28d9">Autocomplete</span>
                  <span class="seop-purpose">자체 개발 프로그램 운영</span>
                </div>
                <h3 class="seop-title">검색창에 브랜드명이<br />자동으로 뜨게 만듭니다</h3>
                <p class="seop-desc">
                  소비자가 특정 키워드를 입력하는 순간, <strong>브랜드명이 연관 검색어로 자동 노출</strong>됩니다.<br /><br />
                  인애드컴퍼니가 <strong>자체 개발한 전용 프로그램</strong>으로 자동완성 노출을 완벽하게 핸들링합니다. 경쟁사보다 먼저 소비자의 눈에 들어오는 브랜드를 만듭니다.
                </p>
                <div class="seop-badge-row">
                  <div class="seop-highlight-card" style="--hc:#6d28d9">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
                    <div>
                      <strong>자체 개발 프로그램</strong>
                      <p>인애드 독자 기술로 자동완성을 정밀 제어</p>
                    </div>
                  </div>
                  <div class="seop-highlight-card" style="--hc:#8b5cf6">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    <div>
                      <strong>키워드 + 브랜드명 동시 노출</strong>
                      <p>타겟 키워드 검색 시 브랜드가 자동 연동</p>
                    </div>
                  </div>
                  <div class="seop-highlight-card" style="--hc:#a855f7">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
                    <div>
                      <strong>완벽한 노출 핸들링</strong>
                      <p>노출 빈도·순서·키워드를 자유롭게 설정</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="seop-visual">
                <div class="seop-mock seop-mock--auto">
                  <div class="seop-mock-header">
                    <div class="seop-mock-bar">
                      <span class="seop-mock-dot r"></span><span class="seop-mock-dot y"></span><span class="seop-mock-dot g"></span>
                    </div>
                    <div class="seop-mock-url">search.naver.com</div>
                  </div>
                  <div class="seop-mock-body">
                    <div class="seop-auto-searchbox">
                      <span class="seop-auto-icon">🔍</span>
                      <span class="seop-auto-typing">강남 헬스장</span>
                    </div>
                    <div class="seop-auto-list">
                      <div class="seop-auto-item seop-auto-item--brand">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="13" height="13"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                        <span>강남 헬스장 <em>광고주 브랜드</em></span>
                        <span class="seop-auto-hit">✦</span>
                      </div>
                      <div class="seop-auto-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="13" height="13"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                        <span>강남 헬스장 추천</span>
                      </div>
                      <div class="seop-auto-item seop-auto-item--brand">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="13" height="13"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                        <span>강남 헬스장 <em>광고주 브랜드</em> 가격</span>
                        <span class="seop-auto-hit">✦</span>
                      </div>
                      <div class="seop-auto-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="13" height="13"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                        <span>강남 헬스장 월 회비</span>
                      </div>
                      <div class="seop-auto-item seop-auto-item--brand">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="13" height="13"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                        <span>강남 헬스장 <em>광고주 브랜드</em> 후기</span>
                        <span class="seop-auto-hit">✦</span>
                      </div>
                    </div>
                    <div class="seop-auto-legend">
                      <span class="seop-auto-hit">✦</span> 인애드 자동완성 노출 키워드
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── 패널 2 : 유튜브 SEO ── */}
          <div class="seop-panel" data-panel="2">
            <div class="seop-panel-inner">
              <div class="seop-info">
                <div class="seop-tag-row">
                  <span class="seop-chip" style="--cc:#e11d48">YouTube SEO</span>
                  <span class="seop-purpose">콘텐츠 키워드 상위 노출</span>
                </div>
                <h3 class="seop-title">유튜브 검색에서<br />브랜드 콘텐츠를 상위 노출</h3>
                <p class="seop-desc">
                  유튜브는 세계 2위 검색 엔진입니다. <strong>브랜드 관련 키워드로 콘텐츠를 제작</strong>하고, 해당 키워드 검색 결과 상위에 노출시킵니다.<br /><br />
                  콘텐츠 기획부터 SEO 최적화, 상위 노출 작업까지 전 과정을 원스톱으로 진행합니다.
                </p>
                <div class="seop-steps-row">
                  <div class="seop-step-item" style="--sc:#e11d48">
                    <span class="seop-step-num">01</span>
                    <strong>키워드 리서치</strong>
                    <p>타겟 검색량·경쟁도 분석</p>
                  </div>
                  <div class="seop-step-arrow">→</div>
                  <div class="seop-step-item" style="--sc:#f97316">
                    <span class="seop-step-num">02</span>
                    <strong>콘텐츠 제작</strong>
                    <p>SEO 최적화 영상 기획·제작</p>
                  </div>
                  <div class="seop-step-arrow">→</div>
                  <div class="seop-step-item" style="--sc:#eab308">
                    <span class="seop-step-num">03</span>
                    <strong>상위 노출</strong>
                    <p>타겟 키워드 검색 TOP 노출</p>
                  </div>
                </div>
              </div>
              <div class="seop-visual">
                <div class="seop-mock seop-mock--yt">
                  <div class="seop-mock-header">
                    <div class="seop-mock-bar">
                      <span class="seop-mock-dot r"></span><span class="seop-mock-dot y"></span><span class="seop-mock-dot g"></span>
                    </div>
                    <div class="seop-mock-url">youtube.com/results</div>
                  </div>
                  <div class="seop-mock-body">
                    <div class="seop-yt-searchbar">
                      <span>🔍</span>
                      <span class="seop-yt-kw">강남 헬스장 추천</span>
                    </div>
                    <div class="seop-yt-list">
                      <div class="seop-yt-item seop-yt-item--top">
                        <div class="seop-yt-thumb">
                          <span class="seop-yt-play">▶</span>
                          <span class="seop-yt-dur">3:24</span>
                        </div>
                        <div class="seop-yt-meta">
                          <strong>강남 헬스장 추천 TOP5 | 광고주 브랜드 직접 체험</strong>
                          <span>광고주채널 · 조회수 4.2만</span>
                          <div class="seop-yt-topbadge">검색 상위 노출</div>
                        </div>
                      </div>
                      <div class="seop-yt-item">
                        <div class="seop-yt-thumb seop-yt-thumb--sm">
                          <span class="seop-yt-play">▶</span>
                        </div>
                        <div class="seop-yt-meta">
                          <strong>강남 헬스장 비교 솔직 후기</strong>
                          <span>일반 채널 · 조회수 8,200</span>
                        </div>
                      </div>
                      <div class="seop-yt-item">
                        <div class="seop-yt-thumb seop-yt-thumb--sm">
                          <span class="seop-yt-play">▶</span>
                        </div>
                        <div class="seop-yt-meta">
                          <strong>2024 강남 헬스장 순위</strong>
                          <span>일반 채널 · 조회수 5,100</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── 패널 3 : 인스타 검색 ── */}
          <div class="seop-panel" data-panel="3">
            <div class="seop-panel-inner">
              <div class="seop-info">
                <div class="seop-tag-row">
                  <span class="seop-chip" style="--cc:#ec4899">Instagram SEO</span>
                  <span class="seop-purpose">해시태그 상위 노출</span>
                </div>
                <h3 class="seop-title">인스타 해시태그에<br />콘텐츠를 상위 노출</h3>
                <p class="seop-desc">
                  인스타그램 해시태그 검색에서 <strong>브랜드 콘텐츠를 상위에 노출</strong>시킵니다.<br /><br />
                  신제품 출시, 할인 이벤트, 시즌 프로모션 등 <strong>특정 이벤트 시점</strong>에 집중 노출하면 최대 효과를 얻을 수 있습니다. 인스타를 활발히 사용하는 MZ 세대에게 자연스럽게 도달합니다.
                </p>
                <div class="seop-usecase-grid">
                  <div class="seop-usecase" style="--uc:#ec4899">
                    <span class="seop-usecase-icon">🛍️</span>
                    <strong>신제품 출시</strong>
                    <p>출시 직후 집중 노출로 초기 인지도 확산</p>
                  </div>
                  <div class="seop-usecase" style="--uc:#a855f7">
                    <span class="seop-usecase-icon">🎁</span>
                    <strong>할인 이벤트</strong>
                    <p>이벤트 해시태그 검색 시 브랜드 콘텐츠 상단 노출</p>
                  </div>
                  <div class="seop-usecase" style="--uc:#f97316">
                    <span class="seop-usecase-icon">📅</span>
                    <strong>시즌 프로모션</strong>
                    <p>시즌 키워드에 브랜드를 선제적으로 연결</p>
                  </div>
                  <div class="seop-usecase" style="--uc:#06b6d4">
                    <span class="seop-usecase-icon">✨</span>
                    <strong>브랜드 인지도</strong>
                    <p>카테고리 해시태그 지속 노출로 브랜드 각인</p>
                  </div>
                </div>
              </div>
              <div class="seop-visual">
                <div class="seop-mock seop-mock--insta">
                  <div class="seop-mock-header">
                    <div class="seop-mock-bar">
                      <span class="seop-mock-dot r"></span><span class="seop-mock-dot y"></span><span class="seop-mock-dot g"></span>
                    </div>
                    <div class="seop-mock-url">instagram.com/explore</div>
                  </div>
                  <div class="seop-mock-body">
                    {/* 검색바 — #올영 타이핑 후 자동완성 3개 등장 */}
                    <div class="seop-insta-searchbar">
                      <span class="seop-insta-hash">#</span>
                      <span class="seop-insta-kw" id="instaTypingText"></span><span class="seop-cursor seop-cursor--insta" id="instaCursor">|</span>
                    </div>
                    {/* 자동완성 드롭다운 — 타이핑 완료 후 순차 등장 */}
                    <div class="seop-insta-suggest" id="instaSuggest">
                      <div class="seop-insta-sug-item" id="instaSug0" data-tag="올영추천템">
                        <span class="seop-insta-sug-hash">#</span>
                        <span class="seop-insta-sug-text">올영<strong>추천템</strong></span>
                        <span class="seop-insta-sug-cnt">게시물 24.8만</span>
                      </div>
                      <div class="seop-insta-sug-item" id="instaSug1" data-tag="올영세일">
                        <span class="seop-insta-sug-hash">#</span>
                        <span class="seop-insta-sug-text">올영<strong>세일</strong></span>
                        <span class="seop-insta-sug-cnt">게시물 18.2만</span>
                      </div>
                      <div class="seop-insta-sug-item" id="instaSug2" data-tag="올영추천">
                        <span class="seop-insta-sug-hash">#</span>
                        <span class="seop-insta-sug-text">올영<strong>추천</strong></span>
                        <span class="seop-insta-sug-cnt">게시물 31.4만</span>
                      </div>
                    </div>
                    {/* 클릭 유도 안내 문구 */}
                    <div class="seop-insta-hint" id="instaHint">👆 해시태그를 클릭해보세요</div>
                    {/* 이미지 결과 영역 — 자동완성 클릭 시 해당 이미지 표시 */}
                    <div class="seop-insta-result" id="instaResult">
                      <div class="seop-insta-result-topbar">
                        <button class="seop-insta-back" id="instaBackBtn">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="14" height="14"><polyline points="15 18 9 12 15 6"/></svg>
                          뒤로
                        </button>
                        <div class="seop-insta-result-header" id="instaResultTag"></div>
                        <button class="seop-insta-close" id="instaCloseBtn">✕</button>
                      </div>
                      <img class="seop-insta-result-img" id="instaResultImg" src="" alt="" />
                    </div>
                    <div class="seop-insta-legend" id="instaLegend">상위 노출된 브랜드 콘텐츠</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>{/* /seop-panels */}

        <script dangerouslySetInnerHTML={{ __html: `
(function(){
  /* DOM 준비 후 실행 보장 */
  function init(){
  /* ══════════════════════════════════════════════
     변수·함수 먼저 선언 — 탭 이벤트 등록보다 앞에 위치
  ══════════════════════════════════════════════ */

  /* ── 패널 3 — 인스타: #올영 타이핑 → 자동완성 3개 → 클릭 시 이미지 전환 ── */
  var INSTA_KEYWORD = '올영';
  var instaTimers   = [];
  var instaPlayed   = false;

  /* 태그별 이미지 매핑 */
  var INSTA_IMAGES = {
    '올영추천템': '/static/seo-images/insta-rec.jpg',
    '올영세일':   '/static/seo-images/insta-sale.jpg',
    '올영추천':   '/static/seo-images/insta-best.jpg'
  };

  function showInstaResult(tag){
    var resultEl  = document.getElementById('instaResult');
    var tagEl     = document.getElementById('instaResultTag');
    var imgEl     = document.getElementById('instaResultImg');
    var legendEl  = document.getElementById('instaLegend');
    var hintEl    = document.getElementById('instaHint');
    if(!resultEl || !imgEl) return;

    var typingEl = document.getElementById('instaTypingText');
    if(typingEl) typingEl.textContent = '#' + tag;

    imgEl.src = INSTA_IMAGES[tag] || '';
    if(tagEl) tagEl.textContent = '#' + tag;

    /* 힌트 숨기기 */
    if(hintEl) hintEl.style.display = 'none';

    resultEl.style.display = '';
    resultEl.classList.add('insta-result-visible');
    if(legendEl) legendEl.classList.add('insta-legend-visible');

    document.querySelectorAll('.seop-insta-sug-item').forEach(function(el){
      el.classList.toggle('active', el.dataset.tag === tag);
    });
  }

  function hideInstaResult(){
    var resultEl  = document.getElementById('instaResult');
    var legendEl  = document.getElementById('instaLegend');
    var typingEl  = document.getElementById('instaTypingText');
    var hintEl    = document.getElementById('instaHint');
    if(resultEl)  resultEl.classList.remove('insta-result-visible');
    if(legendEl)  legendEl.classList.remove('insta-legend-visible');
    if(typingEl)  typingEl.textContent = INSTA_KEYWORD;
    /* 뒤로가기 시 힌트 다시 표시 */
    if(hintEl) hintEl.style.display = '';
    document.querySelectorAll('.seop-insta-sug-item').forEach(function(el){
      el.classList.remove('active');
    });
  }

  function startInstaAnim(){
    if(instaPlayed) return;
    instaPlayed = true;
    var typingEl  = document.getElementById('instaTypingText');
    var cursorEl  = document.getElementById('instaCursor');
    var suggestEl = document.getElementById('instaSuggest');
    var sugItems  = document.querySelectorAll('.seop-insta-sug-item');
    if(!typingEl) return;

    /* 초기화 */
    typingEl.textContent = '';
    if(cursorEl) cursorEl.style.display = '';
    if(suggestEl){ suggestEl.style.display = ''; suggestEl.classList.remove('suggest-visible'); }
    sugItems.forEach(function(el){ el.classList.remove('sug-visible','active'); });
    var resultEl = document.getElementById('instaResult');
    if(resultEl) resultEl.classList.remove('insta-result-visible');
    var legendEl = document.getElementById('instaLegend');
    if(legendEl) legendEl.classList.remove('insta-legend-visible');

    /* 1. #올영 타이핑 (90ms 간격) */
    var chars = INSTA_KEYWORD.split('');
    chars.forEach(function(ch, idx){
      instaTimers.push(setTimeout(function(){
        typingEl.textContent += ch;
      }, 90 * idx));
    });

    /* 2. 타이핑 완료 → 커서 깜빡임 유지 → 자동완성 순차 등장 */
    var typingDone = 90 * chars.length + 400;
    if(suggestEl){
      instaTimers.push(setTimeout(function(){
        suggestEl.classList.add('suggest-visible');
      }, typingDone));
    }
    sugItems.forEach(function(el, idx){
      instaTimers.push(setTimeout(function(){
        el.classList.add('sug-visible');
      }, typingDone + 80 + idx * 120));
    });

    /* 3. 자동완성 등장 완료 → 유저 클릭 대기 (자동 선택 없음) */
  }

  /* ── 탭 전환 ── */
  var tabs = document.querySelectorAll('#seopTabs .seop-tab');
  var panels = document.querySelectorAll('#seopPanels .seop-panel');

  var tabContainer = document.getElementById('seopTabs');
  if(tabContainer){
    tabContainer.addEventListener('click', function(e){
      var clickedTab = e.target.closest('.seop-tab');
      if(!clickedTab) return;
      var tabIdx = Array.prototype.indexOf.call(tabs, clickedTab);
      if(tabIdx < 0) return;

      tabs.forEach(function(t){ t.classList.remove('active'); });
      panels.forEach(function(p){ p.classList.remove('active'); });
      clickedTab.classList.add('active');
      if(panels[tabIdx]) panels[tabIdx].classList.add('active');

      /* 인스타 탭만 JS 애니 실행 */
      if(tabIdx === 3 && !instaPlayed) { startInstaAnim(); }
    });
  }

  /* ── 인스타 자동완성 항목 클릭 ── */
  var suggestContainer = document.getElementById('instaSuggest');
  if(suggestContainer){
    suggestContainer.addEventListener('click', function(e){
      var item = e.target.closest('.seop-insta-sug-item');
      if(!item) return;
      var tag = item.dataset.tag;
      if(tag) showInstaResult(tag);
    });
  }

  /* ── 인스타 뒤로가기 / 닫기 버튼 ── */
  var instaBackBtn = document.getElementById('instaBackBtn');
  if(instaBackBtn) instaBackBtn.addEventListener('click', hideInstaResult);

  var instaCloseBtn = document.getElementById('instaCloseBtn');
  if(instaCloseBtn) instaCloseBtn.addEventListener('click', hideInstaResult);

  /* IntersectionObserver — 인스타 탭이 기본 활성인 경우만 처리 */
  (function(){
    var seoSection = document.querySelector('#seopPanels');
    if(!seoSection) return;
    var started = false;
    var obs = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting && !started){
          started = true;
          var activePanel = document.querySelector('#seopPanels .seop-panel.active');
          if(activePanel){
            var idx = Array.prototype.indexOf.call(
              document.querySelectorAll('#seopPanels .seop-panel'), activePanel
            );
            if(idx === 3) startInstaAnim();
          }
          obs.disconnect();
        }
      });
    }, { threshold: 0.3 });
    obs.observe(seoSection);
  })();

  /* ════════════════════════════════════════════
     블로그 배포 · 유입 · 방문자 리뷰 · 저장 모핑
  ════════════════════════════════════════════ */

  /* 공통 카운트업 */
  function animCount(el, target, duration){
    var startTime = null;
    function step(ts){
      if(!startTime) startTime = ts;
      var prog = Math.min((ts - startTime) / duration, 1);
      var ease = 1 - Math.pow(1 - prog, 3);
      el.textContent = Math.round(ease * target);
      if(prog < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* 모든 모핑 닫기 */
  var ALL_MORPHS   = ['sbmMorph','sbmInflowMorph','sbmReviewMorph','sbmSaveMorph'];
  var ALL_TRIGGERS = ['seoBlogCard','seoInflowCard','seoReviewCard','seoSaveCard'];
  var hint = document.getElementById('sbmHint');
  /* 인터벌 레퍼런스를 상위 스코프에 선언 */
  var _inflowInterval = null;
  var _saveInterval   = null;

  function _clearIntervals(){
    if(_inflowInterval){ clearInterval(_inflowInterval); _inflowInterval = null; }
    if(_saveInterval){   clearInterval(_saveInterval);   _saveInterval   = null; }
    var iw = document.getElementById('sbmInflowImgWrap');
    var ib = document.getElementById('sbmInflowBgImg');
    var sw = document.querySelector('#sbmSaveCard .sbm-save-img-wrap');
    if(iw) iw.classList.remove('clicking');
    if(ib) ib.classList.remove('flash');
    if(sw) sw.classList.remove('clicking');
  }

  function closeAll(){
    ALL_MORPHS.forEach(function(id){
      var el = document.getElementById(id);
      if(el) el.classList.remove('active');
    });
    ALL_TRIGGERS.forEach(function(id){
      var el = document.getElementById(id);
      if(el) el.classList.remove('active');
    });
    if(hint) hint.style.opacity = '1';
    _clearIntervals();
    /* 숫자 리셋 */
    ['sbmBlogNum','sbmVisitNum','sbmInflowCount',
     'sbmReviewNum','sbmReviewBlogNum','sbmSaveNum'].forEach(function(id){
      var el = document.getElementById(id);
      if(el) el.textContent = '0';
    });
  }

  /* ── 블로그 배포 ── */
  var blogCard = document.getElementById('seoBlogCard');
  var blogMorph = document.getElementById('sbmMorph');
  if(blogCard){
    blogCard.addEventListener('click', function(){
      closeAll();
      if(hint) hint.style.opacity = '0';
      blogCard.classList.add('active');
      blogMorph.classList.add('active');
      setTimeout(function(){
        animCount(document.getElementById('sbmBlogNum'),  239, 1000);
        animCount(document.getElementById('sbmVisitNum'), 401, 1200);
      }, 300);
    });
    blogCard.addEventListener('keydown', function(e){
      if(e.key==='Enter'||e.key===' '){ e.preventDefault(); blogCard.click(); }
    });
  }
  var blogClose = document.getElementById('sbmClose');
  if(blogClose) blogClose.addEventListener('click', closeAll);

  /* ── 유입 작업 ── */
  var inflowCard  = document.getElementById('seoInflowCard');
  var inflowMorph = document.getElementById('sbmInflowMorph');

  if(inflowCard){
    inflowCard.addEventListener('click', function(){
      closeAll();
      if(hint) hint.style.opacity = '0';
      inflowCard.classList.add('active');
      inflowMorph.classList.add('active');
      /* 카운트업 + 반복 클릭 효과 */
      setTimeout(function(){
        animCount(document.getElementById('sbmInflowCount'), 128, 1400);
        /* 2.4초 주기로 이미지 깜빡임 + 하이라이트 */
        var iw = document.getElementById('sbmInflowImgWrap');
        var ib = document.getElementById('sbmInflowBgImg');
        _inflowInterval = setInterval(function(){
          if(iw) iw.classList.add('clicking');
          if(ib) ib.classList.add('flash');
          setTimeout(function(){
            if(iw) iw.classList.remove('clicking');
            if(ib) ib.classList.remove('flash');
          }, 200);
        }, 2400);
      }, 500);
    });
    inflowCard.addEventListener('keydown', function(e){
      if(e.key==='Enter'||e.key===' '){ e.preventDefault(); inflowCard.click(); }
    });
  }
  var inflowClose = document.getElementById('sbmInflowClose');
  if(inflowClose) inflowClose.addEventListener('click', closeAll);

  /* ── 방문자 리뷰 ── */
  var reviewCard  = document.getElementById('seoReviewCard');
  var reviewMorph = document.getElementById('sbmReviewMorph');
  if(reviewCard){
    reviewCard.addEventListener('click', function(){
      closeAll();
      if(hint) hint.style.opacity = '0';
      reviewCard.classList.add('active');
      reviewMorph.classList.add('active');
      setTimeout(function(){
        animCount(document.getElementById('sbmReviewNum'),    401, 1100);
        animCount(document.getElementById('sbmReviewBlogNum'),239, 1300);
      }, 300);
    });
    reviewCard.addEventListener('keydown', function(e){
      if(e.key==='Enter'||e.key===' '){ e.preventDefault(); reviewCard.click(); }
    });
  }
  var reviewClose = document.getElementById('sbmReviewClose');
  if(reviewClose) reviewClose.addEventListener('click', closeAll);

  /* ── 저장 작업 ── */
  var saveCard  = document.getElementById('seoSaveCard');
  var saveMorph = document.getElementById('sbmSaveMorph');

  if(saveCard){
    saveCard.addEventListener('click', function(){
      closeAll();
      if(hint) hint.style.opacity = '0';
      saveCard.classList.add('active');
      saveMorph.classList.add('active');
      setTimeout(function(){
        animCount(document.getElementById('sbmSaveNum'), 347, 1200);
        /* 2.4초 주기로 저장 버튼 하이라이트 + 이미지 깜빡임 */
        var sw = document.querySelector('#sbmSaveCard .sbm-save-img-wrap');
        _saveInterval = setInterval(function(){
          if(sw) sw.classList.add('clicking');
          setTimeout(function(){
            if(sw) sw.classList.remove('clicking');
          }, 200);
        }, 2400);
      }, 500);
    });
    saveCard.addEventListener('keydown', function(e){
      if(e.key==='Enter'||e.key===' '){ e.preventDefault(); saveCard.click(); }
    });
  }
  var saveClose = document.getElementById('sbmSaveClose');
  if(saveClose) saveClose.addEventListener('click', closeAll);

  } /* end init() */
  /* DOMContentLoaded 또는 즉시 실행 */
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
        `}} />

      </div>
    </section>

    {/* ══ SEO 프로세스 ══ */}
    <section class="section seop-process-section">
      <div class="svc-bg-deco"><div class="svc-grid-lines"></div><div class="svc-orb-left"></div><div class="svc-section-glow-top"></div></div>
      <div class="container">
        <div class="section-head">
          <span class="sec-label">Process</span>
          <h2 class="sec-title">SEO 마케팅<br /><em>진행 프로세스</em></h2>
          <p class="sec-sub">상담부터 리포트까지, 각 상품의 특성에 맞게 최적화된 방식으로 진행됩니다.</p>
        </div>

        <div class="seop-proc-wrap">

          {/* STEP 01 */}
          <div class="seop-proc-step">
            <div class="seop-proc-num-col">
              <div class="seop-proc-circle" style="--pc:#1a6bff">
                <span class="seop-proc-n">01</span>
              </div>
              <div class="seop-proc-line"></div>
            </div>
            <div class="seop-proc-body">
              <div class="seop-proc-icon-wrap" style="--pc:#1a6bff">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              </div>
              <div class="seop-proc-text">
                <span class="seop-proc-en">Consultation</span>
                <h4 class="seop-proc-title">상담 진행</h4>
                <p class="seop-proc-desc">브랜드 현황, 목표 키워드, 예산, 마케팅 방향성을 파악합니다. SEO 전략의 시작점이 되는 핵심 단계입니다.</p>
              </div>
            </div>
          </div>

          {/* STEP 02 */}
          <div class="seop-proc-step">
            <div class="seop-proc-num-col">
              <div class="seop-proc-circle" style="--pc:#6d28d9">
                <span class="seop-proc-n">02</span>
              </div>
              <div class="seop-proc-line"></div>
            </div>
            <div class="seop-proc-body">
              <div class="seop-proc-icon-wrap" style="--pc:#6d28d9">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </div>
              <div class="seop-proc-text">
                <span class="seop-proc-en">Brand Analysis</span>
                <h4 class="seop-proc-title">브랜드 분석</h4>
                <p class="seop-proc-desc">경쟁사 분석, 키워드 검색량·경쟁도 조사, 현재 검색 노출 현황을 진단합니다. 데이터 기반으로 최적의 SEO 전략을 도출합니다.</p>
              </div>
            </div>
          </div>

          {/* STEP 03 */}
          <div class="seop-proc-step">
            <div class="seop-proc-num-col">
              <div class="seop-proc-circle" style="--pc:#0891b2">
                <span class="seop-proc-n">03</span>
              </div>
              <div class="seop-proc-line"></div>
            </div>
            <div class="seop-proc-body">
              <div class="seop-proc-icon-wrap" style="--pc:#0891b2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
              </div>
              <div class="seop-proc-text">
                <span class="seop-proc-en">Contract &amp; Scope</span>
                <h4 class="seop-proc-title">계약 진행</h4>
                <p class="seop-proc-desc">진행 범위, 기간, 목표 KPI를 명확히 문서화합니다. 투명한 비용 구조와 성과 기준을 계약서에 명시해 신뢰를 구축합니다.</p>
              </div>
            </div>
          </div>

          {/* STEP 04 */}
          <div class="seop-proc-step">
            <div class="seop-proc-num-col">
              <div class="seop-proc-circle" style="--pc:#d97706">
                <span class="seop-proc-n">04</span>
              </div>
              <div class="seop-proc-line"></div>
            </div>
            <div class="seop-proc-body">
              <div class="seop-proc-icon-wrap" style="--pc:#d97706">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
              </div>
              <div class="seop-proc-text">
                <span class="seop-proc-en">Product-Specific Process</span>
                <h4 class="seop-proc-title">각 상품 프로세스 진행</h4>
                <p class="seop-proc-desc">선택한 상품에 맞게 최적화된 방식으로 실행됩니다. 네이버 플레이스, 자동완성, 유튜브 SEO, 인스타 검색 각각의 특성에 맞는 전략을 적용합니다.</p>
                <div class="seop-proc-chips">
                  <span class="seop-proc-chip" style="--cc:#f59e0b">📍 네이버 플레이스</span>
                  <span class="seop-proc-chip" style="--cc:#6d28d9">⌨️ 검색어 자동완성</span>
                  <span class="seop-proc-chip" style="--cc:#e11d48">▶️ 유튜브 SEO</span>
                  <span class="seop-proc-chip" style="--cc:#ec4899">📸 인스타 검색</span>
                </div>
              </div>
            </div>
          </div>

          {/* STEP 05 */}
          <div class="seop-proc-step seop-proc-step--last">
            <div class="seop-proc-num-col">
              <div class="seop-proc-circle seop-proc-circle--final" style="--pc:#10b981">
                <span class="seop-proc-n">05</span>
              </div>
            </div>
            <div class="seop-proc-body">
              <div class="seop-proc-icon-wrap" style="--pc:#10b981">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
              </div>
              <div class="seop-proc-text">
                <span class="seop-proc-en">Performance Report</span>
                <h4 class="seop-proc-title">리포트</h4>
                <p class="seop-proc-desc">캠페인 전 기간의 검색 순위 변화, 유입량, 전환율을 수치로 정리한 종합 리포트를 제공합니다. 성과 분석을 바탕으로 다음 단계 전략까지 제안합니다.</p>
              </div>
            </div>
          </div>

        </div>{/* /seop-proc-wrap */}

        <div class="seop-proc-note">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          위 프로세스는 이해를 돕기 위한 전체 흐름입니다. <strong>실제 진행은 선택하신 상품의 특성과 방식에 맞춰 최적화</strong>되어 진행됩니다.
        </div>

      </div>
    </section>

    <section class="section svc-results-section">
      <div class="svc-bg-deco"><div class="svc-dot-pattern"></div><div class="svc-orb-right"></div><div class="svc-section-glow-top"></div></div>
      <div class="container">
        <div class="section-head">
          <span class="sec-label">Results</span>
          <h2 class="sec-title">실제 성과<br /><em>숫자로 증명합니다</em></h2>
        </div>
        <div class="svc-result-grid">
          <div class="srg-card srg-card--featured">
            <div class="srg-tag">헬스케어 플레이스 SEO</div>
            <div class="srg-metrics">
              <div class="srg-metric"><strong>TOP1</strong><span>플레이스 순위</span></div>
              <div class="srg-metric"><strong>+1,200%</strong><span>검색 유입 증가</span></div>
              <div class="srg-metric"><strong>3개월</strong><span>달성 기간</span></div>
            </div>
            <p class="srg-desc">건강기능식품 브랜드 플레이스 + 자동완성 통합 전략으로 주요 키워드 3개월 내 1위 달성</p>
          </div>
          <div class="srg-card">
            <div class="srg-tag">뷰티 브랜드 유튜브 SEO</div>
            <div class="srg-metrics">
              <div class="srg-metric"><strong>+340%</strong><span>오가닉 유입 증가</span></div>
              <div class="srg-metric"><strong>6개월</strong><span>유지 기간</span></div>
            </div>
            <p class="srg-desc">K-뷰티 신규 브랜드 유튜브 SEO. 카테고리 핵심 키워드 선점으로 광고 없이 꾸준한 유입 확보</p>
          </div>
          <div class="srg-card">
            <div class="srg-tag">이커머스 인스타 검색</div>
            <div class="srg-metrics">
              <div class="srg-metric"><strong>+520%</strong><span>해시태그 노출</span></div>
              <div class="srg-metric"><strong>2배</strong><span>전환율 상승</span></div>
            </div>
            <p class="srg-desc">신제품 출시 인스타 해시태그 집중 공략으로 출시 2주 만에 인지도 급상승 및 매출 전환</p>
          </div>
        </div>
      </div>
    </section>

    <section class="svc-cta-section">
      <div class="container">
        <div class="svc-cta-inner">
          <div class="svc-cta-text">
            <h2>검색에서 먼저<br /><em>발견되는 브랜드를 만드세요</em></h2>
            <p>브랜드 키워드 분석부터 SEO 전략까지 무료로 진단해드립니다.</p>
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
  var SVC_KEY = 'seo';
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
