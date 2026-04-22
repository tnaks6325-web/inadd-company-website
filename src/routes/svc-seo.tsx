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
                  <div class="seop-sub-card" style="--sc:#3b82f6">
                    <div class="seop-sub-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>
                    </div>
                    <div>
                      <strong>블로그 배포</strong>
                      <p>키워드 최적화 블로그 포스팅으로 플레이스 연관 콘텐츠를 확산</p>
                    </div>
                  </div>
                  <div class="seop-sub-card" style="--sc:#8b5cf6">
                    <div class="seop-sub-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                    </div>
                    <div>
                      <strong>유입 작업</strong>
                      <p>플레이스 페이지 클릭 및 유입 수를 늘려 알고리즘 신호를 강화</p>
                    </div>
                  </div>
                  <div class="seop-sub-card" style="--sc:#10b981">
                    <div class="seop-sub-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    </div>
                    <div>
                      <strong>방문자 리뷰</strong>
                      <p>실제 방문자 리뷰를 축적해 신뢰도와 순위를 동시에 끌어올림</p>
                    </div>
                  </div>
                  <div class="seop-sub-card" style="--sc:#f59e0b">
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

              {/* 오른쪽 시각화 */}
              <div class="seop-visual">
                <div class="seop-mock seop-mock--place">
                  <div class="seop-mock-header">
                    <div class="seop-mock-bar">
                      <span class="seop-mock-dot r"></span><span class="seop-mock-dot y"></span><span class="seop-mock-dot g"></span>
                    </div>
                    <div class="seop-mock-url">map.naver.com</div>
                  </div>
                  <div class="seop-mock-body">
                    <div class="seop-place-search">
                      <span class="seop-place-search-icon">🔍</span>
                      <span class="seop-place-kw">강남 맛집</span>
                    </div>
                    <div class="seop-place-list">
                      <div class="seop-place-item seop-place-item--top">
                        <span class="seop-place-rank rank-1">1</span>
                        <div class="seop-place-info">
                          <strong>광고주 브랜드</strong>
                          <span>⭐ 4.9 · 리뷰 1,240</span>
                        </div>
                        <span class="seop-place-badge">TOP</span>
                      </div>
                      <div class="seop-place-item">
                        <span class="seop-place-rank rank-2">2</span>
                        <div class="seop-place-info"><strong>경쟁사 A</strong><span>⭐ 4.5 · 리뷰 380</span></div>
                      </div>
                      <div class="seop-place-item">
                        <span class="seop-place-rank rank-3">3</span>
                        <div class="seop-place-info"><strong>경쟁사 B</strong><span>⭐ 4.3 · 리뷰 210</span></div>
                      </div>
                    </div>
                    <div class="seop-place-stats">
                      <div class="seop-pstat"><span class="seop-pstat-label">블로그 배포</span><div class="seop-pstat-bar"><div class="seop-pstat-fill" style="width:88%;background:#3b82f6"></div></div><span>88%</span></div>
                      <div class="seop-pstat"><span class="seop-pstat-label">리뷰 축적</span><div class="seop-pstat-bar"><div class="seop-pstat-fill" style="width:95%;background:#10b981"></div></div><span>95%</span></div>
                      <div class="seop-pstat"><span class="seop-pstat-label">저장 수</span><div class="seop-pstat-bar"><div class="seop-pstat-fill" style="width:72%;background:#f59e0b"></div></div><span>72%</span></div>
                    </div>
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
                      <span class="seop-auto-typing">강남 헬스장<span class="seop-cursor">|</span></span>
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
                    <div class="seop-insta-searchbar">
                      <span>#</span>
                      <span class="seop-insta-kw">강남헬스장</span>
                    </div>
                    <div class="seop-insta-grid">
                      <div class="seop-insta-cell seop-insta-cell--featured">
                        <div class="seop-insta-overlay">
                          <span>❤️ 2,840</span>
                          <div class="seop-insta-fbadge">TOP</div>
                        </div>
                      </div>
                      <div class="seop-insta-cell seop-insta-cell--brand">
                        <div class="seop-insta-overlay"><span>❤️ 1,920</span></div>
                      </div>
                      <div class="seop-insta-cell seop-insta-cell--brand2">
                        <div class="seop-insta-overlay"><span>❤️ 1,540</span></div>
                      </div>
                      <div class="seop-insta-cell seop-insta-cell--c4">
                        <div class="seop-insta-overlay"><span>❤️ 980</span></div>
                      </div>
                      <div class="seop-insta-cell seop-insta-cell--c5">
                        <div class="seop-insta-overlay"><span>❤️ 760</span></div>
                      </div>
                      <div class="seop-insta-cell seop-insta-cell--c6">
                        <div class="seop-insta-overlay"><span>❤️ 640</span></div>
                      </div>
                    </div>
                    <div class="seop-insta-legend">상위 노출된 브랜드 콘텐츠</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>{/* /seop-panels */}

        <script dangerouslySetInnerHTML={{ __html: `
(function(){
  var tabs = document.querySelectorAll('#seopTabs .seop-tab');
  var panels = document.querySelectorAll('#seopPanels .seop-panel');
  tabs.forEach(function(tab, i){
    tab.addEventListener('click', function(){
      tabs.forEach(function(t){ t.classList.remove('active'); });
      panels.forEach(function(p){ p.classList.remove('active'); });
      tab.classList.add('active');
      if(panels[i]) panels[i].classList.add('active');
    });
  });
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
