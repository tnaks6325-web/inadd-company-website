export const SvcPplPage = () => (
  <>
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
          <span>PPL MARKETING</span>
        </div>

        <h1 class="vh-title">
          <span class="vh-tline" id="ppL1">방송 콘텐츠 속 자연스러운 브랜드 노출로</span>
          <span class="vh-tline" id="ppL2" style="background:linear-gradient(135deg,#fff 20%,rgba(239,68,68,0.95) 55%,rgba(251,146,60,0.85) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">대중의 신뢰와 관심을 확보하는 프리미엄 광고 전략입니다.</span>
        </h1>

        <div class="vh-sub-wrap" id="ppSub">
          <p class="vh-sub">단순한 노출을 넘어 <strong style="color:rgba(255,255,255,0.9)">스토리텔링과 결합하여</strong></p>
          <p class="vh-sub"><strong style="color:rgba(255,255,255,0.9)">브랜드 인지도</strong>를 높이고 시청자의 마음속에 깊이 각인됩니다.</p>
          <p class="vh-sub" style="margin-top:12px"><span style="color:rgba(239,68,68,0.9);font-weight:600">5,000만+ 누적 시청자</span>에게 브랜드를 자연스럽게 경험시킵니다.</p>
        </div>

        <div class="vh-kpi-strip" id="ppKpi">
          <div class="vh-kpi-item">
            <strong class="vh-kpi-num" style="color:#ef4444">5,000만+</strong>
            <span class="vh-kpi-label">누적 시청자 수</span>
          </div>
          <div class="vh-kpi-sep"></div>
          <div class="vh-kpi-item">
            <strong class="vh-kpi-num">3×</strong>
            <span class="vh-kpi-label">광고 전환율 향상</span>
          </div>
          <div class="vh-kpi-sep"></div>
          <div class="vh-kpi-item">
            <strong class="vh-kpi-num">98%</strong>
            <span class="vh-kpi-label">재계약률</span>
          </div>
        </div>

        <div class="vh-btns" id="ppBtns">
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
  var cvs=document.getElementById('vhCanvas5'); if(!cvs)return;
  var ctx=cvs.getContext('2d'),W,H,pts=[];
  function resize(){W=cvs.width=window.innerWidth;H=cvs.height=cvs.closest('section').offsetHeight||window.innerHeight;}
  function mkPt(){return{x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.38,vy:(Math.random()-.5)*.38,r:Math.random()*1.8+.3,a:Math.random(),color:Math.random()>.6?'239,68,68':(Math.random()>.5?'251,146,60':'168,85,247')};}
  function init(){resize();pts=[];var n=Math.min(Math.floor(W*H/8000),130);for(var i=0;i<n;i++)pts.push(mkPt());}
  function draw(){ctx.clearRect(0,0,W,H);pts.forEach(function(p){p.x+=p.vx;p.y+=p.vy;p.a+=(Math.random()-.5)*.01;if(p.a<.1)p.a=.1;if(p.a>.9)p.a=.9;if(p.x<0)p.x=W;if(p.x>W)p.x=0;if(p.y<0)p.y=H;if(p.y>H)p.y=0;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle='rgba('+p.color+','+(p.a*.55)+')';ctx.fill();});
  for(var i=0;i<pts.length;i++){for(var j=i+1;j<pts.length;j++){var dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.sqrt(dx*dx+dy*dy);if(d<115){ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.strokeStyle='rgba(239,68,68,'+(0.12*(1-d/115))+')';ctx.lineWidth=.5;ctx.stroke();}}}
  requestAnimationFrame(draw);}
  init();draw();window.addEventListener('resize',init);
  function anim(el,delay,dir){if(!el)return;el.style.opacity='0';el.style.transform=dir==='up'?'translateY(32px)':'translateX(-32px)';el.style.transition='opacity .9s cubic-bezier(.25,.46,.45,.94),transform .9s cubic-bezier(.25,.46,.45,.94)';setTimeout(function(){el.style.opacity='1';el.style.transform='none';},delay);}
  anim(document.getElementById('ppL1'),200,'left');
  anim(document.getElementById('ppL2'),440,'left');
  anim(document.getElementById('ppSub'),700,'up');
  anim(document.getElementById('ppKpi'),940,'up');
  anim(document.getElementById('ppBtns'),1140,'up');
})();
      `}} />
    </section>

    {/* 서비스 소개 */}
    <section class="section svc-intro-section">
      <div class="svc-bg-deco"><div class="svc-grid-lines"></div><div class="svc-orb-right"></div></div>
      <div class="container">
        <div class="svc-intro-grid">
          <div class="svc-intro-text">
            <span class="sec-label">What We Do</span>
            <h2 class="sec-title">광고가 아닌<br /><em>자연스러운 노출</em></h2>
            <p>PPL(Product Placement)은 소비자가 광고임을 인식하지 못하는 상태에서 브랜드를 경험하게 만드는 가장 강력한 마케팅 방법입니다. 인애드컴퍼니는 드라마, 웹드라마, 유튜브 콘텐츠, 예능 등 다양한 미디어에서 브랜드를 자연스럽게 노출시킵니다.</p>
            <p>콘텐츠를 시청하는 소비자는 브랜드를 경험하고, 경험은 검색으로, 검색은 구매로 연결되는 완벽한 퍼널을 설계합니다.</p>
            <ul class="svc-feature-list">
              <li><span class="sfl-dot"></span>드라마·예능 PPL 기획 및 협상</li>
              <li><span class="sfl-dot"></span>유튜브 채널 협찬 콘텐츠 제작</li>
              <li><span class="sfl-dot"></span>웹드라마 브랜디드 콘텐츠</li>
              <li><span class="sfl-dot"></span>PPL 후 바이럴·SEO 연계 전략</li>
              <li><span class="sfl-dot"></span>PPL 성과 측정 및 리포팅</li>
            </ul>
          </div>
          <div class="svc-intro-visual">
            <div class="siv-img-wrap">
              <img src="/static/svc-images/ppl.png" alt="PPL 마케팅 비주얼" class="siv-photo" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* PPL 유형별 서비스 */}
    <section class="section" style="background:var(--black-2)">
      <div class="svc-bg-deco"><div class="svc-dot-pattern"></div><div class="svc-float-dots"></div></div>
      <div class="container">
        <div class="section-head">
          <span class="sec-label">PPL Types</span>
          <h2 class="sec-title">PPL 유형별<br /><em>맞춤 전략</em></h2>
        </div>
        <div class="svc-platform-grid">
          {[
            { icon:'🎬', name:'드라마 PPL', desc:'지상파·케이블·OTT 드라마 속 제품 노출. 주인공 사용 제품으로 강력한 브랜드 이미지 구축', kpi:'최대 1,000만 시청자' },
            { icon:'📺', name:'예능 PPL', desc:'인기 예능 프로그램 협찬. 출연진의 자연스러운 사용으로 친근감 있는 브랜드 노출', kpi:'높은 반복 노출 효과' },
            { icon:'▶️', name:'유튜브 협찬', desc:'구독자 10만~500만 유튜버 협찬 콘텐츠. 타겟 시청자 정밀 공략, 바이럴 확산 설계', kpi:'정밀 타겟 도달' },
            { icon:'🎭', name:'웹드라마 브랜디드', desc:'브랜드 전용 웹드라마 제작 또는 기존 웹드라마 PPL. 젊은 타겟층에 강력 어필', kpi:'+3× 광고 전환율' },
          ].map(p => (
            <div class="spg-card">
              <div class="spg-icon">{p.icon}</div>
              <h4>{p.name}</h4>
              <p>{p.desc}</p>
              <div class="spg-kpi">{p.kpi}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* 진행 프로세스 */}
    <section class="section svc-process-section">
      <div class="svc-bg-deco"><div class="svc-grid-lines"></div><div class="svc-orb-left"></div><div class="svc-section-glow-top"></div></div>
      <div class="container">
        <div class="section-head">
          <span class="sec-label">Process</span>
          <h2 class="sec-title">PPL 마케팅<br /><em>진행 프로세스</em></h2>
        </div>
        <div class="svc-process-steps">
          {[
            { num:'01', title:'브랜드 분석', desc:'브랜드 아이덴티티, 타겟 소비자, 예산, 목표 달성을 위한 최적 PPL 유형 선정' },
            { num:'02', title:'매체 발굴', desc:'브랜드에 최적화된 드라마·예능·유튜브 채널 발굴 및 협의 가능성 사전 검토' },
            { num:'03', title:'협상·계약', desc:'콘텐츠 제작사·크리에이터와 PPL 조건 협상. 노출 방식, 횟수, 기간 등 조율' },
            { num:'04', title:'제품 제공', desc:'촬영 일정에 맞춘 제품 제공, 노출 장면 가이드 제공, 현장 모니터링' },
            { num:'05', title:'후속 마케팅', desc:'PPL 노출 후 바이럴 마케팅·SEO 연계. 시청자 검색 유입을 구매 전환으로 연결' },
            { num:'06', title:'성과 리포팅', desc:'노출 횟수, 시청자 수, 검색량 변화, 매출 연계 종합 성과 리포트 제공' },
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

    {/* 성과 사례 */}
    <section class="section svc-results-section">
      <div class="svc-bg-deco"><div class="svc-dot-pattern"></div><div class="svc-orb-right"></div><div class="svc-section-glow-top"></div></div>
      <div class="container">
        <div class="section-head">
          <span class="sec-label">Results</span>
          <h2 class="sec-title">실제 성과<br /><em>숫자로 증명합니다</em></h2>
        </div>
        <div class="svc-result-grid">
          <div class="srg-card srg-card--featured">
            <div class="srg-tag">케이블 드라마 PPL</div>
            <div class="srg-metrics">
              <div class="srg-metric"><strong>850만</strong><span>누적 시청자</span></div>
              <div class="srg-metric"><strong>+380%</strong><span>브랜드 검색량</span></div>
              <div class="srg-metric"><strong>3×</strong><span>광고 전환율</span></div>
            </div>
            <p class="srg-desc">뷰티 브랜드 드라마 PPL 캠페인. 주인공 사용 제품 노출로 방영 중 브랜드 검색량 380% 급등</p>
          </div>
          <div class="srg-card">
            <div class="srg-tag">유튜브 100만 구독자 협찬</div>
            <div class="srg-metrics">
              <div class="srg-metric"><strong>220만</strong><span>조회수</span></div>
              <div class="srg-metric"><strong>+240%</strong><span>신규 고객 유입</span></div>
            </div>
            <p class="srg-desc">식품 브랜드 유튜브 협찬 콘텐츠. 먹방·쿠킹 채널 협업으로 타겟 정밀 공략, 구매 전환 폭발적 증가</p>
          </div>
          <div class="srg-card">
            <div class="srg-tag">웹드라마 브랜디드 콘텐츠</div>
            <div class="srg-metrics">
              <div class="srg-metric"><strong>5,000만+</strong><span>누적 시청자</span></div>
              <div class="srg-metric"><strong>+520%</strong><span>SNS 언급량</span></div>
            </div>
            <p class="srg-desc">헬스케어 브랜드 웹드라마 기획·제작 PPL. 전 에피소드 자연 노출로 SNS 화제성 폭발 및 브랜드 인지도 급상승</p>
          </div>
        </div>
      </div>
    </section>

    {/* CTA */}
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
  </>
)
