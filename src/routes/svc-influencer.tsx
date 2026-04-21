export const SvcInfluencerPage = () => (
  <>
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

    <section class="section svc-intro-section">
      <div class="svc-bg-deco"><div class="svc-grid-lines"></div><div class="svc-orb-right"></div></div>
      <div class="container">
        <div class="svc-intro-grid">
          <div class="svc-intro-text">
            <span class="sec-label">What We Do</span>
            <h2 class="sec-title">팔로워 수보다<br /><em>영향력이 중요합니다</em></h2>
            <p>대형 인플루언서 1명보다, 정교하게 타겟팅된 마이크로 인플루언서 10명이 더 높은 전환율을 만들어냅니다. 인애드컴퍼니는 팔로워 수가 아닌 실질적 구매 영향력을 기준으로 크리에이터를 선별합니다.</p>
            <p>유튜브, 인스타그램, 블로그까지 각 플랫폼 특성에 맞는 최적의 콘텐츠 방향성을 제공하고 성과를 측정합니다.</p>
            <ul class="svc-feature-list">
              <li><span class="sfl-dot"></span>마이크로~메가 인플루언서 맞춤 캐스팅</li>
              <li><span class="sfl-dot"></span>유튜브 리뷰·브랜디드 콘텐츠 기획</li>
              <li><span class="sfl-dot"></span>협업 시나리오 제작 및 방향성 가이드</li>
              <li><span class="sfl-dot"></span>성과 측정 및 ROI 리포팅</li>
              <li><span class="sfl-dot"></span>부정적 리뷰 리스크 관리</li>
            </ul>
          </div>
          <div class="svc-intro-visual">
            <div class="siv-img-wrap">
              <img src="/static/svc-images/influencer.png" alt="인플루언서 마케팅 비주얼" class="siv-photo" loading="lazy" />
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
          <h2 class="sec-title">인플루언서 마케팅<br /><em>진행 프로세스</em></h2>
        </div>
        <div class="svc-process-steps">
          {[
            { num:'01', title:'타겟 분석', desc:'브랜드 타겟 소비자를 분석하고 최적의 인플루언서 유형과 규모를 결정합니다.' },
            { num:'02', title:'크리에이터 선별', desc:'1,200+ DB에서 타겟 적합성, 진정성 지수, 전환율 데이터 기반으로 크리에이터를 선별합니다.' },
            { num:'03', title:'콘텐츠 브리핑', desc:'브랜드 메시지를 자연스럽게 담을 수 있는 콘텐츠 방향성과 시나리오를 제공합니다.' },
            { num:'04', title:'콘텐츠 제작·검수', desc:'크리에이터가 제작한 콘텐츠를 검수하고 브랜드 가이드에 맞게 피드백합니다.' },
            { num:'05', title:'게시 및 모니터링', desc:'최적 시간에 콘텐츠를 게시하고 댓글, 반응, 트래픽을 실시간 모니터링합니다.' },
            { num:'06', title:'ROI 리포팅', desc:'조회수, 도달, 클릭, 전환, 매출 등 전 과정의 ROI를 투명하게 리포팅합니다.' },
          ].map(s => (
            <div class="sps-step">
              <div class="sps-num">{s.num}</div>
              <div class="sps-body">
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
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
  </>
)
