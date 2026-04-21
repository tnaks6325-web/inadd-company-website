export const SvcSeedingPage = () => (
  <>
    <section class="vh-hero">
      <canvas id="vhCanvas3" class="vh-canvas"></canvas>
      <div class="vh-bg">
        <div class="vh-orb vh-orb--1" style="background:radial-gradient(circle,rgba(16,185,129,0.24) 0%,transparent 70%)"></div>
        <div class="vh-orb vh-orb--2" style="background:radial-gradient(circle,rgba(6,182,212,0.18) 0%,transparent 70%)"></div>
        <div class="vh-orb vh-orb--3" style="background:radial-gradient(circle,rgba(26,107,255,0.18) 0%,transparent 70%)"></div>
        <div class="vh-grid"></div>
        <div class="vh-noise"></div>
      </div>

      <div class="container vh-inner">
        <a href="/marketing" class="svc-back-link vh-back">← Marketing 전체보기</a>

        <div class="vh-badge" style="color:rgba(16,185,129,0.95);border-color:rgba(16,185,129,0.35);background:rgba(16,185,129,0.08)">
          <span class="vh-badge-dot" style="background:rgba(16,185,129,1);box-shadow:0 0 8px rgba(16,185,129,0.9)"></span>
          <span>SEEDING CAMPAIGN</span>
        </div>

        <h1 class="vh-title">
          <span class="vh-tline" id="sdL1">브랜드의 씨앗을 심어</span>
          <span class="vh-tline" id="sdL2" style="background:linear-gradient(135deg,#fff 20%,rgba(16,185,129,0.95) 60%,rgba(6,182,212,0.85) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">자연스러운 성장을 유도합니다.</span>
        </h1>

        <div class="vh-sub-wrap" id="sdSub">
          <p class="vh-sub"><strong style="color:rgba(255,255,255,0.9)">검색 최적화와 브랜드 신뢰도 구축</strong>을 위한 전략적 콘텐츠 배포로,</p>
          <p class="vh-sub">소비자가 브랜드를 스스로 발견하고 경험하도록 만듭니다.</p>
          <p class="vh-sub" style="margin-top:12px">다양한 플랫폼에 최적화된 시딩 전략으로 <span style="color:rgba(16,185,129,0.9);font-weight:600">강력한 바이럴 효과를 창출합니다.</span></p>
        </div>

        <div class="vh-kpi-strip" id="sdKpi">
          <div class="vh-kpi-item">
            <strong class="vh-kpi-num" style="color:#10b981">68%</strong>
            <span class="vh-kpi-label">후기 전환율</span>
          </div>
          <div class="vh-kpi-sep"></div>
          <div class="vh-kpi-item">
            <strong class="vh-kpi-num">+230%</strong>
            <span class="vh-kpi-label">리뷰 전환 효과</span>
          </div>
          <div class="vh-kpi-sep"></div>
          <div class="vh-kpi-item">
            <strong class="vh-kpi-num">3배</strong>
            <span class="vh-kpi-label">브랜드 신뢰도 향상</span>
          </div>
        </div>

        <div class="vh-btns" id="sdBtns">
          <a href="/contact" class="hero-cta-btn primary">
            <span>무료 전략 상담받기</span>
            <svg viewBox="0 0 24 24" fill="none"><path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
          <a href="#svc-intro" class="vh-scroll-btn">
            <span>자세히 보기</span>
            <svg viewBox="0 0 24 24" fill="none" width="15" height="15"><path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
        </div>
      </div>

      <div class="vh-scroll-hint">
        <div class="vh-scroll-mouse"><div class="vh-scroll-wheel"></div></div>
      </div>

      <script dangerouslySetInnerHTML={{ __html: `
(function(){
  var cvs=document.getElementById('vhCanvas3'); if(!cvs)return;
  var ctx=cvs.getContext('2d'),W,H,pts=[];
  function resize(){W=cvs.width=window.innerWidth;H=cvs.height=cvs.closest('section').offsetHeight||window.innerHeight;}
  function mkPt(){return{x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.38,vy:(Math.random()-.5)*.38,r:Math.random()*1.8+.3,a:Math.random(),color:Math.random()>.6?'16,185,129':(Math.random()>.5?'6,182,212':'26,107,255')};}
  function init(){resize();pts=[];var n=Math.min(Math.floor(W*H/8000),130);for(var i=0;i<n;i++)pts.push(mkPt());}
  function draw(){ctx.clearRect(0,0,W,H);pts.forEach(function(p){p.x+=p.vx;p.y+=p.vy;p.a+=(Math.random()-.5)*.01;if(p.a<.1)p.a=.1;if(p.a>.9)p.a=.9;if(p.x<0)p.x=W;if(p.x>W)p.x=0;if(p.y<0)p.y=H;if(p.y>H)p.y=0;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle='rgba('+p.color+','+(p.a*.55)+')';ctx.fill();});
  for(var i=0;i<pts.length;i++){for(var j=i+1;j<pts.length;j++){var dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.sqrt(dx*dx+dy*dy);if(d<115){ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.strokeStyle='rgba(16,185,129,'+(0.13*(1-d/115))+')';ctx.lineWidth=.5;ctx.stroke();}}}
  requestAnimationFrame(draw);}
  init();draw();window.addEventListener('resize',init);
  function anim(el,delay,dir){if(!el)return;el.style.opacity='0';el.style.transform=dir==='up'?'translateY(32px)':'translateX(-32px)';el.style.transition='opacity .9s cubic-bezier(.25,.46,.45,.94),transform .9s cubic-bezier(.25,.46,.45,.94)';setTimeout(function(){el.style.opacity='1';el.style.transform='none';},delay);}
  anim(document.getElementById('sdL1'),200,'left');
  anim(document.getElementById('sdL2'),440,'left');
  anim(document.getElementById('sdSub'),700,'up');
  anim(document.getElementById('sdKpi'),940,'up');
  anim(document.getElementById('sdBtns'),1140,'up');
})();
      `}} />
    </section>

    <section class="section svc-intro-section">
      <div class="svc-bg-deco"><div class="svc-grid-lines"></div><div class="svc-orb-right"></div></div>
      <div class="container">
        <div class="svc-intro-grid">
          <div class="svc-intro-text">
            <span class="sec-label">What We Do</span>
            <h2 class="sec-title">소비자가<br /><em>먼저 말하게 합니다</em></h2>
            <p>단순 체험단이 아닙니다. 브랜드의 핵심 타겟을 정밀하게 선별하고, 실제 사용 경험을 자연스럽게 콘텐츠로 남기도록 설계합니다. 진정성 있는 후기 하나가 수백 개의 광고보다 강력합니다.</p>
            <p>플랫폼별 최적화된 리뷰 배포로 검색 결과부터 SNS까지 브랜드 신뢰 생태계를 구축합니다.</p>
            <ul class="svc-feature-list">
              <li><span class="sfl-dot"></span>타겟 체험단 모집 및 관리</li>
              <li><span class="sfl-dot"></span>진정성 있는 후기 콘텐츠 생성</li>
              <li><span class="sfl-dot"></span>플랫폼별 최적화 리뷰 배포</li>
              <li><span class="sfl-dot"></span>리뷰 전환율 분석 및 최적화</li>
              <li><span class="sfl-dot"></span>네이버·인스타·블로그 동시 커버</li>
            </ul>
          </div>
          <div class="svc-intro-visual">
            <div class="siv-img-wrap">
              <img src="/static/svc-images/seeding.png" alt="시딩 캠페인 비주얼" class="siv-photo" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section svc-process-section">
      <div class="svc-bg-deco"><div class="svc-grid-lines"></div><div class="svc-orb-left"></div><div class="svc-section-glow-top"></div></div>
      <div class="container">
        <div class="section-head">
          <span class="sec-label">Process</span>
          <h2 class="sec-title">시딩 캠페인<br /><em>진행 프로세스</em></h2>
        </div>
        <div class="svc-process-steps">
          {[
            { num:'01', title:'타겟 체험단 설계', desc:'브랜드 타겟에 가장 부합하는 체험단 프로필을 설계하고 모집 전략을 수립합니다.' },
            { num:'02', title:'체험단 모집·선별', desc:'지원자 중 진정성과 영향력을 기준으로 최적의 체험단을 선별합니다.' },
            { num:'03', title:'제품 발송', desc:'제품과 함께 사용 가이드, 촬영 팁, 핵심 메시지를 전달합니다.' },
            { num:'04', title:'후기 작성 지원', desc:'자연스럽고 진정성 있는 후기가 나올 수 있도록 방향성을 제시합니다.' },
            { num:'05', title:'플랫폼 배포', desc:'네이버 블로그, 인스타그램, 카페 등 플랫폼별 최적화된 방식으로 후기를 배포합니다.' },
            { num:'06', title:'성과 분석', desc:'전환율, 검색 유입, 매출 변화 등 시딩 전후 성과를 정밀하게 분석합니다.' },
          ].map(s => (
            <div class="sps-step">
              <div class="sps-num">{s.num}</div>
              <div class="sps-body"><h4>{s.title}</h4><p>{s.desc}</p></div>
            </div>
          ))}
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
            <div class="srg-tag">식품 시딩 캠페인</div>
            <div class="srg-metrics">
              <div class="srg-metric"><strong>68%</strong><span>후기 전환율</span></div>
              <div class="srg-metric"><strong>+230%</strong><span>리뷰 전환 효과</span></div>
              <div class="srg-metric"><strong>3배</strong><span>신뢰도 향상</span></div>
            </div>
            <p class="srg-desc">신제품 출시 시딩 캠페인. 300명 체험단으로 네이버·인스타 동시 리뷰 생태계 구축</p>
          </div>
          <div class="srg-card">
            <div class="srg-tag">뷰티 시딩 캠페인</div>
            <div class="srg-metrics">
              <div class="srg-metric"><strong>500+</strong><span>후기 콘텐츠</span></div>
              <div class="srg-metric"><strong>+180%</strong><span>매출 증가</span></div>
            </div>
            <p class="srg-desc">K-뷰티 브랜드 올리브영 입점 전 시딩으로 런칭 직후 HOT 상품 등극</p>
          </div>
          <div class="srg-card">
            <div class="srg-tag">헬스케어 시딩</div>
            <div class="srg-metrics">
              <div class="srg-metric"><strong>TOP3</strong><span>검색 순위</span></div>
              <div class="srg-metric"><strong>+250%</strong><span>전환율 상승</span></div>
            </div>
            <p class="srg-desc">건강기능식품 시딩 + SEO 연계 전략으로 주요 키워드 검색 TOP3 달성</p>
          </div>
        </div>
      </div>
    </section>

    <section class="svc-cta-section">
      <div class="container">
        <div class="svc-cta-inner">
          <div class="svc-cta-text">
            <h2>진정성 있는 후기로<br /><em>브랜드 신뢰를 쌓아보세요</em></h2>
            <p>소비자가 먼저 말하게 만드는 시딩 전략을 무료로 진단해드립니다.</p>
          </div>
          <div class="svc-cta-btns">
            <a href="/contact" class="hero-cta-btn primary"><span>무료 상담 신청하기</span><svg viewBox="0 0 24 24" fill="none"><path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
            <button type="button" class="hero-cta-btn ghost" onclick="openCallModal()"><span>📞 바로 전화하기</span></button>
          </div>
        </div>
      </div>
    </section>
  </>
)
