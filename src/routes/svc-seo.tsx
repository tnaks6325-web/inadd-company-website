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
          <span class="vh-tline" id="seL1">검색 엔진 최적화로</span>
          <span class="vh-tline" id="seL2" style="background:linear-gradient(135deg,#fff 20%,rgba(234,179,8,0.95) 55%,rgba(249,115,22,0.85) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">브랜드의 온라인 가시성을 극대화합니다.</span>
        </h1>

        <div class="vh-sub-wrap" id="seSub">
          <p class="vh-sub">타겟 고객과의 접점을 확대합니다.</p>
          <p class="vh-sub">네이버 플레이스부터 자동완성까지, 소비자의 검색 여정 전반을 장악하여</p>
          <p class="vh-sub vh-sub--em">실질적인 유입과 전환을 이끌어내는</p>
          <p class="vh-sub"><span style="color:rgba(234,179,8,0.9);font-weight:600">정교한 SEO 전략을 제안합니다.</span></p>
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
            <strong class="vh-kpi-num">장기</strong>
            <span class="vh-kpi-label">지속 유입 설계</span>
          </div>
        </div>

        <div class="vh-btns" id="seBtns">
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

    <section class="section svc-intro-section">
      <div class="svc-bg-deco"><div class="svc-grid-lines"></div><div class="svc-orb-right"></div></div>
      <div class="container">
        <div class="svc-intro-grid">
          <div class="svc-intro-text">
            <span class="sec-label">What We Do</span>
            <h2 class="sec-title">검색이 곧<br /><em>구매입니다</em></h2>
            <p>소비자가 구매를 결정하기 직전, 반드시 검색을 합니다. 그 순간 브랜드가 먼저 보여야 합니다. 인애드컴퍼니는 네이버·구글 검색 알고리즘을 분석해 브랜드 키워드가 상위에 노출되는 구조를 설계합니다.</p>
            <p>단기 광고와 달리, SEO는 한번 구축하면 지속적으로 유입되는 자산이 됩니다.</p>
            <ul class="svc-feature-list">
              <li><span class="sfl-dot"></span>핵심 키워드 발굴 및 전략 수립</li>
              <li><span class="sfl-dot"></span>네이버·구글 블로그 SEO 최적화</li>
              <li><span class="sfl-dot"></span>검색 상위 노출 콘텐츠 제작</li>
              <li><span class="sfl-dot"></span>월별 순위 추적 및 리포팅</li>
              <li><span class="sfl-dot"></span>바이럴 연계 검색량 증대 전략</li>
            </ul>
          </div>
          <div class="svc-intro-visual">
            <div class="siv-img-wrap">
              <img src="/static/svc-images/seo.png" alt="SEO 마케팅 비주얼" class="siv-photo" loading="lazy" />
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
          <h2 class="sec-title">SEO 마케팅<br /><em>진행 프로세스</em></h2>
        </div>
        <div class="svc-process-steps">
          {[
            { num:'01', title:'키워드 리서치', desc:'브랜드·상품 관련 검색량, 경쟁도, 구매 의도를 분석해 핵심 키워드를 발굴합니다.' },
            { num:'02', title:'경쟁사 분석', desc:'상위 노출 경쟁사의 콘텐츠 전략을 분석하고 차별화 포인트를 찾습니다.' },
            { num:'03', title:'콘텐츠 전략 수립', desc:'키워드별 최적화된 콘텐츠 구조와 발행 계획을 수립합니다.' },
            { num:'04', title:'SEO 콘텐츠 제작', desc:'검색 알고리즘과 사용자 경험 모두를 고려한 고품질 콘텐츠를 제작합니다.' },
            { num:'05', title:'최적화 및 배포', desc:'메타태그, 내부링크, 이미지 최적화 등 기술적 SEO를 적용하고 배포합니다.' },
            { num:'06', title:'순위 추적·개선', desc:'월별 키워드 순위 변화를 추적하고 지속적인 개선 작업을 진행합니다.' },
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
            <div class="srg-tag">헬스케어 SEO</div>
            <div class="srg-metrics">
              <div class="srg-metric"><strong>TOP3</strong><span>핵심 키워드 순위</span></div>
              <div class="srg-metric"><strong>+1,200%</strong><span>검색량 증가</span></div>
              <div class="srg-metric"><strong>3개월</strong><span>달성 기간</span></div>
            </div>
            <p class="srg-desc">건강기능식품 브랜드 SEO. 주요 구매 키워드 3개월 내 전 네이버·구글 TOP3 달성</p>
          </div>
          <div class="srg-card">
            <div class="srg-tag">뷰티 브랜드 SEO</div>
            <div class="srg-metrics">
              <div class="srg-metric"><strong>+340%</strong><span>오가닉 유입 증가</span></div>
              <div class="srg-metric"><strong>6개월</strong><span>유지 기간</span></div>
            </div>
            <p class="srg-desc">K-뷰티 신규 브랜드 SEO. 카테고리 핵심 키워드 선점으로 광고 없이 꾸준한 유입 확보</p>
          </div>
          <div class="srg-card">
            <div class="srg-tag">이커머스 SEO</div>
            <div class="srg-metrics">
              <div class="srg-metric"><strong>+520%</strong><span>검색 유입 증가</span></div>
              <div class="srg-metric"><strong>2배</strong><span>전환율 상승</span></div>
            </div>
            <p class="srg-desc">이커머스 브랜드 상품 페이지 SEO. 구매 의도 키워드 최적화로 전환율 2배 향상</p>
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
  </>
)
