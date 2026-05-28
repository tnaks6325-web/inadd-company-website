export const DevelopmentPage = () => (
  <>
    {/* ════════════════════════════════════════
        DEVELOPMENT HERO
    ════════════════════════════════════════ */}
    <section class="dev-hero">
      <div class="dev-hero-bg">
        <div class="dev-orb dev-orb--1"></div>
        <div class="dev-orb dev-orb--2"></div>
        <div class="dev-grid"></div>
        <canvas id="devCanvas" class="dev-canvas"></canvas>
      </div>
      <div class="container dev-hero-inner">
        <div class="dev-badge">
          <span class="dev-badge-dot"></span>
          <span>MARKETING AUTOMATION &amp; DEVELOPMENT</span>
        </div>
        <h1 class="dev-hero-title">
          <span class="dev-tline">마케팅을 <em>코드로</em> 설계하는</span>
          <span class="dev-tline dev-tline--accent">자동화 에이전시</span>
        </h1>
        <p class="dev-hero-sub">
          인애드컴퍼니는 마케팅 에이전시이면서 동시에 자체 자동화 시스템을 개발·운영합니다.<br />
          반복되는 마케팅 업무를 자동화하고, 데이터 기반의 운영 체계를 구축합니다.
        </p>
        <div class="dev-hero-btns">
          <a href="/contact" class="hero-cta-btn primary">
            <span>개발 문의하기</span>
            <svg viewBox="0 0 24 24" fill="none"><path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
          <a href="#dev-area" class="hero-cta-btn ghost">
            <span>자세히 보기</span>
          </a>
        </div>
      </div>
      <div class="dev-scroll-cue">
        <div class="dev-scroll-line"></div>
        <span>SCROLL</span>
      </div>
    </section>

    {/* ════════════════════════════════════════
        SECTION 2 — WHY AUTOMATION
    ════════════════════════════════════════ */}
    <section class="dev-why reveal-section">
      <div class="container">
        <div class="dev-why-inner">
          <div class="dev-why-left reveal-el">
            <span class="sec-label">WHY AUTOMATION</span>
            <h2 class="dev-section-title">
              마케터가 전략에만<br /><em>집중할 수 있도록</em>
            </h2>
            <p class="dev-section-desc">
              캠페인 생성, 원고 배포, 리뷰 수집, 데이터 모니터링 —<br />
              매일 반복되는 작업에 마케터의 시간이 낭비되고 있습니다.<br /><br />
              인애드컴퍼니는 8년간의 마케팅 운영 경험을 바탕으로<br />
              <strong>실전에서 검증된 자동화 시스템</strong>을 직접 설계하고 운영합니다.
            </p>
          </div>
          <div class="dev-why-right reveal-el">
            <div class="dev-why-cards">
              {[
                { icon: '⏱', title: '운영 시간 80% 단축', desc: '반복 업무 자동화로 마케터가 전략에 집중' },
                { icon: '📊', title: '실시간 데이터 수집', desc: '조회수·댓글·반응을 자동으로 수집·분석' },
                { icon: '🔄', title: '무중단 캠페인 운영', desc: '24시간 자동 실행되는 마케팅 워크플로우' },
                { icon: '🤖', title: 'AI 기반 자동화', desc: 'AI가 콘텐츠·운영·분석을 함께 처리' },
              ].map(c => (
                <div class="dev-why-card">
                  <span class="dev-why-icon">{c.icon}</span>
                  <strong>{c.title}</strong>
                  <p>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ════════════════════════════════════════
        SECTION 3 — DEVELOPMENT AREA
    ════════════════════════════════════════ */}
    <section class="dev-area reveal-section" id="dev-area">
      <div class="container">
        <div class="dev-section-head reveal-el">
          <span class="sec-label">DEVELOPMENT AREA</span>
          <h2 class="dev-section-title">자동화 개발 영역</h2>
          <p class="dev-section-desc">마케팅 전 과정에 걸쳐 자동화가 필요한 핵심 영역을 직접 개발·운영합니다.</p>
        </div>
        <div class="dev-area-grid">
          {[
            {
              num: '01',
              title: 'Campaign Workflow',
              ko: '캠페인 운영 자동화',
              desc: '캠페인 생성부터 배포, 모니터링, 마감까지 전 과정을 자동화합니다. 수작업 없이 일정에 따라 캠페인이 자동 실행됩니다.',
              tags: ['캠페인 자동 생성', '일정 관리', '자동 마감'],
            },
            {
              num: '02',
              title: 'Content Management',
              ko: '콘텐츠·원고 관리',
              desc: '인플루언서·체험단 원고를 자동으로 수집·분류·배포합니다. 수백 건의 콘텐츠를 체계적으로 관리합니다.',
              tags: ['원고 자동 수집', '콘텐츠 분류', '배포 자동화'],
            },
            {
              num: '03',
              title: 'Review Operations',
              ko: '리뷰·체험단 운영',
              desc: '체험단 모집부터 리뷰 등록 확인, 완료 처리까지 리뷰 마케팅의 전 과정을 시스템으로 운영합니다.',
              tags: ['체험단 모집', '리뷰 확인 자동화', '완료 처리'],
            },
            {
              num: '04',
              title: 'Data Collection',
              ko: '데이터 자동 수집',
              desc: '유튜브 조회수, 댓글 수, 블로그 방문자 등 마케팅 성과 데이터를 실시간으로 자동 수집·정리합니다.',
              tags: ['조회수 수집', '댓글 모니터링', '성과 데이터'],
            },
            {
              num: '05',
              title: 'Internal Workflow',
              ko: '사내 운영 자동화',
              desc: '정산, 보고서, 알림, 스케줄 관리 등 사내 반복 업무를 자동화하여 팀 운영 효율을 극대화합니다.',
              tags: ['정산 자동화', '보고서 생성', '슬랙 알림'],
            },
            {
              num: '06',
              title: 'AI Workflow',
              ko: 'AI 기반 업무 자동화',
              desc: '생성 AI를 활용한 원고 초안 작성, 데이터 분석 요약, 고객 응대 자동화 등 AI가 마케팅 업무를 함께 처리합니다.',
              tags: ['AI 원고 초안', 'AI 데이터 요약', 'AI 자동 응대'],
            },
          ].map(a => (
            <div class="dev-area-card reveal-el">
              <div class="dev-area-card-top">
                <span class="dev-area-num">{a.num}</span>
                <div class="dev-area-titles">
                  <strong class="dev-area-title-en">{a.title}</strong>
                  <span class="dev-area-title-ko">{a.ko}</span>
                </div>
              </div>
              <p class="dev-area-desc">{a.desc}</p>
              <div class="dev-area-tags">
                {a.tags.map(t => <span class="dev-area-tag">{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ════════════════════════════════════════
        SECTION 4 — PROCESS
    ════════════════════════════════════════ */}
    <section class="dev-process reveal-section">
      <div class="container">
        <div class="dev-section-head reveal-el">
          <span class="sec-label">PROCESS</span>
          <h2 class="dev-section-title">개발·자동화 진행 프로세스</h2>
          <p class="dev-section-desc">마케팅 현장의 문제를 분석하고, 맞춤형 자동화 솔루션을 설계·개발합니다.</p>
        </div>
        <div class="dev-process-flow">
          {[
            { step: 'STEP 01', title: '업무 현황 분석', desc: '현재 운영 중인 마케팅 업무 흐름과 반복 작업을 파악합니다.', icon: '🔍' },
            { step: 'STEP 02', title: '자동화 설계', desc: '어떤 부분을 자동화할지, 어떤 시스템이 필요한지 구조를 설계합니다.', icon: '📐' },
            { step: 'STEP 03', title: '개발 및 연동', desc: 'Google Apps Script, AI API, 스프레드시트 등으로 시스템을 개발합니다.', icon: '⚙️' },
            { step: 'STEP 04', title: '테스트 및 검증', desc: '실제 마케팅 데이터로 테스트하고 안정적으로 동작하는지 검증합니다.', icon: '✅' },
            { step: 'STEP 05', title: '운영 및 고도화', desc: '현장에서 운영하며 지속적으로 개선하고 기능을 추가합니다.', icon: '🚀' },
          ].map((p, i) => (
            <div class="dev-process-item reveal-el">
              <div class="dev-process-icon">{p.icon}</div>
              <div class="dev-process-body">
                <span class="dev-process-step">{p.step}</span>
                <strong class="dev-process-title">{p.title}</strong>
                <p class="dev-process-desc">{p.desc}</p>
              </div>
              {i < 4 && <div class="dev-process-arrow">→</div>}
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ════════════════════════════════════════
        SECTION 5 — SYSTEMS (ADFLOW)
    ════════════════════════════════════════ */}
    <section class="dev-systems reveal-section">
      <div class="container">
        <div class="dev-section-head reveal-el">
          <span class="sec-label">OUR SYSTEMS</span>
          <h2 class="dev-section-title">
            인애드컴퍼니가 직접 운영하는<br /><em>마케팅 자동화 시스템</em>
          </h2>
          <p class="dev-section-desc">
            8년간의 마케팅 운영 경험을 바탕으로 자체 개발한 시스템입니다.<br />
            현재 모든 캠페인 운영에 실전 적용 중입니다.
          </p>
        </div>
        <div class="dev-systems-main reveal-el">
          <div class="dev-systems-flagship">
            <div class="dev-flagship-badge">FLAGSHIP SYSTEM</div>
            <h3 class="dev-flagship-name">ADFLOW</h3>
            <p class="dev-flagship-desc">
              마케팅 운영 전체를 하나의 흐름으로 연결하는 통합 자동화 시스템.<br />
              캠페인 생성부터 데이터 수집, 정산까지 모든 과정이 자동화됩니다.
            </p>
            <div class="dev-flagship-stats">
              <div class="dev-flagship-stat">
                <strong>6+</strong><span>연동 서비스</span>
              </div>
              <div class="dev-flagship-stat">
                <strong>80%</strong><span>운영 시간 단축</span>
              </div>
              <div class="dev-flagship-stat">
                <strong>24/7</strong><span>자동 운영</span>
              </div>
            </div>
          </div>
        </div>
        <div class="dev-systems-grid">
          {[
            { name: 'Campaign Center', desc: '캠페인 생성·배포·마감을 자동 관리하는 운영 허브', color: '#1a6bff' },
            { name: 'Review Management', desc: '리뷰·체험단 프로젝트의 등록부터 완료까지 전 과정 관리', color: '#00d4a8' },
            { name: 'Content Workflow', desc: '인플루언서 원고 수집·분류·승인을 자동화하는 콘텐츠 관리 시스템', color: '#6440ff' },
            { name: 'Data Monitoring', desc: '유튜브·블로그·SNS 성과 데이터를 실시간 자동 수집', color: '#f0b429' },
            { name: 'Internal Intranet', desc: '정산·보고서·팀 커뮤니케이션을 통합 관리하는 사내 시스템', color: '#ff6b6b' },
          ].map(s => (
            <div class="dev-sys-card reveal-el">
              <div class="dev-sys-dot" style={`background:${s.color}`}></div>
              <strong class="dev-sys-name">{s.name}</strong>
              <p class="dev-sys-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ════════════════════════════════════════
        SECTION 6 — TECHNOLOGY
    ════════════════════════════════════════ */}
    <section class="dev-tech reveal-section">
      <div class="container">
        <div class="dev-section-head reveal-el">
          <span class="sec-label">TECHNOLOGY STACK</span>
          <h2 class="dev-section-title">사용 기술</h2>
          <p class="dev-section-desc">마케팅 현장에 최적화된 경량 기술 스택으로 빠르고 안정적인 자동화를 구현합니다.</p>
        </div>
        <div class="dev-tech-grid">
          {[
            { tech: 'Google Apps Script', icon: '📜', desc: '업무 자동화의 핵심. Gmail·Sheets·Drive·Forms 등 구글 서비스를 연결해 복잡한 마케팅 워크플로우를 자동화합니다.', tag: 'CORE' },
            { tech: 'Spreadsheet System', icon: '📊', desc: '수백 건의 캠페인·원고·데이터를 스프레드시트 기반으로 실시간 관리합니다. 팀 전원이 동시에 접근·수정 가능합니다.', tag: 'DATA' },
            { tech: 'AI Workflow', icon: '🤖', desc: 'GPT·Gemini 등 생성 AI API를 연동해 원고 초안 작성, 데이터 요약, 자동 분류 등에 활용합니다.', tag: 'AI' },
            { tech: 'Automation Logic', icon: '⚙️', desc: '트리거·이벤트 기반 자동 실행 로직으로 사람이 개입하지 않아도 마케팅이 돌아가는 구조를 설계합니다.', tag: 'AUTO' },
            { tech: 'Data Processing', icon: '🔢', desc: '마케팅 성과 데이터를 수집·가공·시각화합니다. 의사결정에 필요한 인사이트를 자동으로 생성합니다.', tag: 'DATA' },
          ].map(t => (
            <div class="dev-tech-card reveal-el">
              <div class="dev-tech-card-top">
                <span class="dev-tech-icon">{t.icon}</span>
                <span class="dev-tech-tag">{t.tag}</span>
              </div>
              <strong class="dev-tech-name">{t.tech}</strong>
              <p class="dev-tech-desc">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ════════════════════════════════════════
        SECTION 7 — POSITIONING
    ════════════════════════════════════════ */}
    <section class="dev-positioning reveal-section">
      <div class="container">
        <div class="dev-pos-inner reveal-el">
          <div class="dev-pos-left">
            <span class="sec-label">OUR POSITIONING</span>
            <h2 class="dev-section-title">
              마케팅 에이전시이면서<br /><em>동시에 개발사입니다</em>
            </h2>
            <p class="dev-section-desc">
              일반 마케팅 대행사와 다릅니다.<br />
              일반 개발사와도 다릅니다.<br /><br />
              <strong>마케팅 현장을 직접 운영하면서 개발하기 때문에</strong><br />
              실제로 필요한 것이 무엇인지 정확히 알고,<br />
              현장에서 바로 작동하는 시스템을 만듭니다.
            </p>
          </div>
          <div class="dev-pos-right">
            <div class="dev-pos-compare">
              <div class="dev-pos-col">
                <div class="dev-pos-col-head">일반 마케팅 대행사</div>
                {['마케팅 기획·실행 ✓', '자동화 시스템 ✗', '데이터 수집 ✗', '개발 역량 ✗', '운영 내재화 ✗'].map(i => (
                  <div class={`dev-pos-item ${i.includes('✗') ? 'dev-pos-item--no' : ''}`}>{i}</div>
                ))}
              </div>
              <div class="dev-pos-col dev-pos-col--us">
                <div class="dev-pos-col-head">인애드컴퍼니</div>
                {['마케팅 기획·실행 ✓', '자동화 시스템 ✓', '데이터 수집 ✓', '개발 역량 ✓', '운영 내재화 ✓'].map(i => (
                  <div class="dev-pos-item dev-pos-item--yes">{i}</div>
                ))}
              </div>
              <div class="dev-pos-col">
                <div class="dev-pos-col-head">일반 개발사</div>
                {['마케팅 기획·실행 ✗', '자동화 시스템 ✓', '데이터 수집 ✓', '개발 역량 ✓', '운영 내재화 ✗'].map(i => (
                  <div class={`dev-pos-item ${i.includes('✗') ? 'dev-pos-item--no' : ''}`}>{i}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ════════════════════════════════════════
        SECTION 8 — CTA
    ════════════════════════════════════════ */}
    <section class="dev-cta reveal-section">
      <div class="dev-cta-bg">
        <div class="dev-cta-glow"></div>
      </div>
      <div class="container">
        <div class="dev-cta-inner reveal-el">
          <span class="sec-label">GET STARTED</span>
          <h2 class="dev-cta-title">
            마케팅 자동화,<br /><em>지금 바로 시작하세요</em>
          </h2>
          <p class="dev-cta-desc">
            반복 업무에 지친 마케팅 팀이라면,<br />
            자동화로 운영 효율을 높이고 싶은 기업이라면<br />
            인애드컴퍼니와 함께 첫 걸음을 시작하세요.
          </p>
          <div class="dev-cta-btns">
            <a href="/contact" class="hero-cta-btn primary">
              <span>개발 문의하기</span>
              <svg viewBox="0 0 24 24" fill="none"><path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </a>
            <a href="mailto:inadcompany@naver.com" class="hero-cta-btn ghost">
              <span>협업 문의 메일</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    {/* ════════════════════════════════════════
        JS — 스크롤 reveal 애니메이션
    ════════════════════════════════════════ */}
    <script dangerouslySetInnerHTML={{__html: `
(function(){
  /* ── reveal 애니메이션 ── */
  var els = document.querySelectorAll('.reveal-el');
  if(!('IntersectionObserver' in window)){
    els.forEach(function(el){ el.style.opacity='1'; el.style.transform='none'; });
    return;
  }
  els.forEach(function(el){
    el.style.opacity='0';
    el.style.transform='translateY(32px)';
    el.style.transition='opacity 0.75s cubic-bezier(0.16,1,0.3,1), transform 0.75s cubic-bezier(0.16,1,0.3,1)';
  });
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        e.target.style.opacity='1';
        e.target.style.transform='none';
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(function(el){ io.observe(el); });

  /* ── Hero 입장 애니메이션 ── */
  var badge = document.querySelector('.dev-badge');
  var title = document.querySelector('.dev-hero-title');
  var sub   = document.querySelector('.dev-hero-sub');
  var btns  = document.querySelector('.dev-hero-btns');
  [badge, title, sub, btns].forEach(function(el, i){
    if(!el) return;
    el.style.opacity='0';
    el.style.transform='translateY(24px)';
    el.style.transition='opacity 0.8s ease, transform 0.8s ease';
    el.style.transitionDelay = (i * 120 + 100) + 'ms';
    requestAnimationFrame(function(){
      requestAnimationFrame(function(){
        el.style.opacity='1';
        el.style.transform='none';
      });
    });
  });

  /* ── 파티클 캔버스 ── */
  (function(){
    var canvas = document.getElementById('devCanvas');
    if(!canvas) return;
    var ctx = canvas.getContext('2d');
    var W, H, particles = [];
    function resize(){ W = canvas.width = window.innerWidth; H = canvas.height = canvas.offsetHeight || 600; }
    resize();
    window.addEventListener('resize', resize, { passive: true });
    for(var i = 0; i < 60; i++){
      particles.push({
        x: Math.random() * 1920, y: Math.random() * 1080,
        r: Math.random() * 1.5 + 0.3,
        vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
        a: Math.random() * 0.5 + 0.1
      });
    }
    function draw(){
      ctx.clearRect(0, 0, W, H);
      particles.forEach(function(p){
        p.x += p.vx; p.y += p.vy;
        if(p.x < 0) p.x = W; if(p.x > W) p.x = 0;
        if(p.y < 0) p.y = H; if(p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x % W, p.y % H, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(100, 64, 255, ' + p.a + ')';
        ctx.fill();
      });
      requestAnimationFrame(draw);
    }
    draw();
  })();
})();
    `}} />
  </>
)
