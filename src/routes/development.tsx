export const DevelopmentPage = () => (
  <>
    {/* ════════════════════════════════════════
        SECTION 1 — HERO
    ════════════════════════════════════════ */}
    <section class="dev-hero">
      <canvas id="devThreeCanvas" class="dev-three-canvas"></canvas>
      <div class="dev-hero-bg">
        <div class="dev-orb dev-orb--1"></div>
        <div class="dev-orb dev-orb--2"></div>
        <div class="dev-orb dev-orb--3"></div>
        <div class="dev-grid"></div>
        <div class="dev-noise"></div>
      </div>

      <div class="container dev-hero-inner">
        <div class="dev-badge" id="devBadge">
          <span class="dev-badge-dot"></span>
          <span>TECHNOLOGY &amp; MARKETING AUTOMATION</span>
        </div>

        <h1 class="dev-hero-title">
          <span class="dev-tline" id="devL1">마케팅을 <em>코드로</em> 설계하는</span>
          <span class="dev-tline dev-tline--accent" id="devL2">실전 에이전시</span>
        </h1>

        <div class="dev-sub-wrap" id="devSub">
          <p class="dev-sub">인애드컴퍼니는 단순한 마케팅 대행사가 아닙니다.</p>
          <p class="dev-sub dev-sub--em">자체 자동화 시스템을 직접 개발하고,</p>
          <p class="dev-sub">그 기술력을 바탕으로 모든 캠페인을 운영합니다.</p>
          <p class="dev-sub">기술이 만든 효율로, 클라이언트의 성과를 높입니다.<span class="dev-cursor"></span></p>
        </div>

        {/* KPI 스트립 */}
        <div class="dev-kpi-strip" id="devKpi">
          <div class="dev-kpi-item">
            <strong class="dev-kpi-num" data-count="80">0</strong><span class="dev-kpi-unit">%</span>
            <span class="dev-kpi-label">운영 시간 단축</span>
          </div>
          <div class="dev-kpi-sep"></div>
          <div class="dev-kpi-item">
            <strong class="dev-kpi-num" data-count="7">0</strong><span class="dev-kpi-unit">년</span>
            <span class="dev-kpi-label">마케팅 운영 경험</span>
          </div>
          <div class="dev-kpi-sep"></div>
          <div class="dev-kpi-item">
            <strong class="dev-kpi-num" data-count="6">0</strong><span class="dev-kpi-unit">+</span>
            <span class="dev-kpi-label">자체 시스템 운영 중</span>
          </div>
          <div class="dev-kpi-sep"></div>
          <div class="dev-kpi-item">
            <strong class="dev-kpi-num dev-kpi-static">24/7</strong>
            <span class="dev-kpi-label">자동 운영</span>
          </div>
        </div>

        <div class="dev-hero-btns" id="devBtns">
          <a href="/contact" class="hero-cta-btn primary">
            <span>마케팅 문의하기</span>
            <svg viewBox="0 0 24 24" fill="none" width="18" height="18"><path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
          <a href="#dev-systems" class="dev-scroll-btn">
            <span>기술력 보기</span>
            <svg viewBox="0 0 24 24" fill="none" width="15" height="15"><path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
        </div>
      </div>

      <div class="dev-scroll-hint">
        <div class="dev-scroll-mouse"><div class="dev-scroll-wheel"></div></div>
      </div>

      {/* Hero JS */}
      <script dangerouslySetInnerHTML={{__html: `
(function(){
  /* ── CSS animation 방식 Hero 등장 ── */
  var heroItems = [
    { id: 'devBadge', delay: 0.15 },
    { id: 'devL1',    delay: 0.32 },
    { id: 'devL2',    delay: 0.48 },
    { id: 'devSub',   delay: 0.64 },
    { id: 'devKpi',   delay: 0.82 },
    { id: 'devBtns',  delay: 0.96 },
  ];
  heroItems.forEach(function(item){
    var el = document.getElementById(item.id);
    if(!el) return;
    el.style.animationDelay = item.delay + 's';
    el.classList.add('dev-hero-anim');
  });

  /* ── Three.js 3D 배경 (완전 격리) ── */
  try {
    var s = document.createElement('script');
    s.src = '/static/svc-three-bg.js';
    s.onload = function(){
      try {
        if(typeof initSvcThreeBg !== 'function') return;
        var heroEl = document.querySelector('.dev-hero');
        var canvas = document.getElementById('devThreeCanvas');
        if(!heroEl || !canvas) return;
        heroEl.classList.add('vh-hero');
        canvas.id = 'vhCanvas';
        initSvcThreeBg(0x6440ff, 0x1a6bff, 0xa78bfa);
        setTimeout(function(){
          heroEl.classList.remove('vh-hero');
          canvas.id = 'devThreeCanvas';
        }, 100);
      } catch(e){}
    };
    s.onerror = function(){};
    document.head.appendChild(s);
  } catch(e){}

  /* ── KPI 카운터업 ── */
  setTimeout(function(){
    document.querySelectorAll('.dev-kpi-num[data-count]').forEach(function(el){
      var target = parseInt(el.getAttribute('data-count'), 10);
      if(isNaN(target)) return;
      var duration = 1800, startTime = null;
      function step(ts){
        if(!startTime) startTime = ts;
        var p = Math.min((ts - startTime) / duration, 1);
        var ease = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(ease * target);
        if(p < 1) requestAnimationFrame(step);
        else el.textContent = target;
      }
      requestAnimationFrame(step);
    });
  }, 900);
})();
      `}} />
    </section>

    {/* ════════════════════════════════════════
        SECTION 2 — 기술력이 만드는 차이 (WHY)
    ════════════════════════════════════════ */}
    <section class="dev-why reveal-section">
      <div class="dev-why-bg-deco">
        <div class="dev-why-orb"></div>
        <div class="dev-why-grid"></div>
      </div>
      <div class="container">
        <div class="dev-why-inner">
          <div class="dev-why-left reveal-el">
            <span class="sec-label" style="color:#a78bfa">WHY IT MATTERS</span>
            <h2 class="dev-section-title">
              기술력이 만드는<br /><em>마케팅의 차이</em>
            </h2>
            <p class="dev-section-desc" style="text-align:left;margin:0 0 32px">
              같은 예산, 같은 채널로도 결과가 다른 이유 —<br />
              인애드컴퍼니는 자체 자동화 기술로 경쟁사보다 빠르고,<br />
              더 많은 데이터를 보며 캠페인을 운영합니다.
            </p>
            <blockquote class="dev-why-quote">
              <span class="dev-why-quote-bar"></span>
              <p>7년간의 마케팅 현장 경험을 바탕으로<br />
              <strong>직접 개발한 자동화 시스템</strong>이 지금 이 순간에도<br />
              모든 캠페인을 돌리고 있습니다.</p>
            </blockquote>
          </div>
          <div class="dev-why-right reveal-el">
            <div class="dev-why-cards">
              {[
                { icon: '⚡', title: '남들보다 빠른 실행', desc: '캠페인 셋업부터 배포까지 자동화로 처리. 경쟁사 대비 2배 빠른 실행 속도.', color: '#6440ff' },
                { icon: '📊', title: '실시간 데이터 기반 운영', desc: '조회수·반응·전환을 24시간 자동 수집. 데이터가 보이는 만큼 전략이 정교해집니다.', color: '#1a6bff' },
                { icon: '🔄', title: '무중단 캠페인 유지', desc: '사람이 자리를 비워도 시스템이 돌아갑니다. 타이밍을 놓치지 않는 운영 구조.', color: '#00d4a8' },
                { icon: '🎯', title: '전략에 집중하는 구조', desc: '반복 업무는 시스템이, 전략적 판단은 사람이. 마케터의 시간이 핵심에 쓰입니다.', color: '#f0b429' },
              ].map(c => (
                <div class="dev-why-card" style={`--card-color:${c.color}`}>
                  <div class="dev-why-card-glow"></div>
                  <span class="dev-why-icon">{c.icon}</span>
                  <strong>{c.title}</strong>
                  <p>{c.desc}</p>
                  <div class="dev-why-card-line"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ════════════════════════════════════════
        SECTION 3 — 자체 운영 자동화 영역
    ════════════════════════════════════════ */}
    <section class="dev-area reveal-section" id="dev-area">
      <div class="dev-area-bg">
        <div class="dev-area-orb-l"></div>
        <div class="dev-area-orb-r"></div>
        <div class="dev-area-dots"></div>
      </div>
      <div class="container">
        <div class="dev-section-head reveal-el">
          <span class="sec-label" style="color:#a78bfa">WHAT WE AUTOMATE</span>
          <h2 class="dev-section-title">우리가 직접 자동화한 영역들</h2>
          <p class="dev-section-desc">
            일반 에이전시가 사람 손으로 처리하는 일들을,<br />
            인애드컴퍼니는 자체 시스템으로 자동 처리합니다.
          </p>
        </div>
        <div class="dev-area-grid">
          {[
            { num: '01', icon: '🚀', title: 'Campaign Workflow', ko: '캠페인 자동 운영', desc: '캠페인 생성부터 배포, 모니터링, 마감까지 자동 처리. 수작업 없이 일정에 따라 자동 실행됩니다.', tags: ['자동 생성', '일정 관리', '자동 마감'], color: '#6440ff' },
            { num: '02', icon: '📝', title: 'Content Management', ko: '콘텐츠·원고 자동 관리', desc: '인플루언서·체험단 원고를 자동으로 수집·분류·배포. 수백 건을 체계적으로 관리합니다.', tags: ['원고 자동 수집', '콘텐츠 분류', '배포 자동화'], color: '#1a6bff' },
            { num: '03', icon: '⭐', title: 'Review Operations', ko: '리뷰·체험단 자동 운영', desc: '체험단 모집부터 리뷰 확인, 완료 처리까지 리뷰 마케팅 전 과정이 시스템으로 돌아갑니다.', tags: ['체험단 모집', '리뷰 확인', '완료 처리'], color: '#00d4a8' },
            { num: '04', icon: '📊', title: 'Data Collection', ko: '성과 데이터 자동 수집', desc: '유튜브 조회수, 댓글 수, 블로그 방문자 등 마케팅 성과를 실시간으로 자동 수집·정리합니다.', tags: ['조회수 수집', '댓글 모니터링', '성과 리포트'], color: '#f0b429' },
            { num: '05', icon: '⚙️', title: 'Internal Workflow', ko: '팀 운영 자동화', desc: '정산, 보고서, 알림, 스케줄 관리 등 팀 내부 반복 업무가 자동화되어 전략에 집중합니다.', tags: ['정산 자동화', '보고서 생성', '슬랙 알림'], color: '#ff6b6b' },
            { num: '06', icon: '🤖', title: 'AI Integration', ko: 'AI 기반 업무 처리', desc: 'GPT·Gemini AI가 원고 초안 작성, 데이터 요약, 댓글 분류 등을 함께 처리합니다.', tags: ['AI 원고 초안', 'AI 데이터 요약', 'AI 자동 응대'], color: '#a78bfa' },
          ].map(a => (
            <div class="dev-area-card reveal-el" style={`--area-color:${a.color}`}>
              <div class="dev-area-card-glow"></div>
              <div class="dev-area-card-top">
                <span class="dev-area-num">{a.num}</span>
                <span class="dev-area-icon">{a.icon}</span>
              </div>
              <div class="dev-area-titles">
                <strong class="dev-area-title-en">{a.title}</strong>
                <span class="dev-area-title-ko">{a.ko}</span>
              </div>
              <p class="dev-area-desc">{a.desc}</p>
              <div class="dev-area-tags">
                {a.tags.map(t => <span class="dev-area-tag">{t}</span>)}
              </div>
              <div class="dev-area-card-footer">
                <span class="dev-area-arrow">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ════════════════════════════════════════
        SECTION 4 — 운영 방식 (HOW WE WORK)
    ════════════════════════════════════════ */}
    <section class="dev-process reveal-section">
      <div class="dev-process-bg">
        <div class="dev-process-line-bg"></div>
      </div>
      <div class="container">
        <div class="dev-section-head reveal-el">
          <span class="sec-label" style="color:#a78bfa">HOW WE WORK</span>
          <h2 class="dev-section-title">기술이 뒷받침하는 운영 방식</h2>
          <p class="dev-section-desc">
            인애드컴퍼니가 캠페인을 운영하는 방식은<br />
            일반 에이전시와 구조 자체가 다릅니다.
          </p>
        </div>
        <div class="dev-process-flow">
          {[
            { step: '01', title: '캠페인 기획', desc: '클라이언트 목표를 분석하고 채널·타겟·예산에 맞는 전략을 설계합니다.', icon: '🎯', color: '#6440ff' },
            { step: '02', title: '시스템 셋업', desc: '자동화 워크플로우를 구성해 캠페인 전체가 시스템 위에서 돌아가게 준비합니다.', icon: '⚙️', color: '#1a6bff' },
            { step: '03', title: '자동 실행', desc: '배포·수집·모니터링이 자동으로 진행됩니다. 사람의 개입 없이 타이밍을 지킵니다.', icon: '🚀', color: '#00d4a8' },
            { step: '04', title: '실시간 데이터 수집', desc: '성과 지표를 24시간 자동 수집. 캠페인이 진행되는 동안 데이터가 쌓입니다.', icon: '📊', color: '#f0b429' },
            { step: '05', title: '인사이트 리포트', desc: '수집된 데이터를 정리해 다음 캠페인을 더 정교하게 만드는 인사이트로 전달합니다.', icon: '📈', color: '#a78bfa' },
          ].map(p => (
            <div class="dev-process-item reveal-el" style={`--proc-color:${p.color}`}>
              <div class="dev-process-icon-wrap">
                <div class="dev-process-icon-glow"></div>
                <span class="dev-process-icon">{p.icon}</span>
              </div>
              <div class="dev-process-connector"></div>
              <div class="dev-process-body">
                <span class="dev-process-step">STEP {p.step}</span>
                <strong class="dev-process-title">{p.title}</strong>
                <p class="dev-process-desc">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ════════════════════════════════════════
        SECTION 5 — 자체 시스템 (ADFLOW)
    ════════════════════════════════════════ */}
    <section class="dev-systems reveal-section" id="dev-systems">
      <div class="dev-systems-bg">
        <div class="dev-systems-orb-l"></div>
        <div class="dev-systems-orb-r"></div>
        <div class="dev-systems-grid"></div>
      </div>
      <div class="container">
        <div class="dev-section-head reveal-el">
          <span class="sec-label" style="color:#a78bfa">OUR SYSTEMS</span>
          <h2 class="dev-section-title">
            지금 이 순간도 돌아가고 있는<br /><em>인애드컴퍼니의 자동화 시스템</em>
          </h2>
          <p class="dev-section-desc">
            직접 개발하고, 직접 운영하며, 매일 고도화하고 있는<br />
            우리만의 마케팅 자동화 인프라입니다.
          </p>
        </div>

        <div class="dev-flagship reveal-el">
          <div class="dev-flagship-glow"></div>
          <div class="dev-flagship-inner">
            <div class="dev-flagship-left">
              <div class="dev-flagship-badge">FLAGSHIP SYSTEM</div>
              <h3 class="dev-flagship-name">ADFLOW</h3>
              <p class="dev-flagship-desc">
                마케팅 운영 전체를 하나의 흐름으로 연결하는 통합 자동화 시스템.<br />
                캠페인 생성부터 데이터 수집, 정산까지 — 모든 과정이 자동으로 연결됩니다.<br />
                <strong style="color:#a78bfa">현재 모든 클라이언트 캠페인에 실전 적용 중.</strong>
              </p>
            </div>
            <div class="dev-flagship-right">
              <div class="dev-flagship-stats">
                <div class="dev-flagship-stat">
                  <strong class="dev-fstat-num" data-count="6">0</strong>
                  <span class="dev-fstat-unit">+</span>
                  <span class="dev-fstat-label">연동 서비스</span>
                </div>
                <div class="dev-flagship-stat">
                  <strong class="dev-fstat-num" data-count="80">0</strong>
                  <span class="dev-fstat-unit">%</span>
                  <span class="dev-fstat-label">운영 시간 단축</span>
                </div>
                <div class="dev-flagship-stat">
                  <strong class="dev-fstat-num dev-kpi-static">24/7</strong>
                  <span class="dev-fstat-label">자동 운영</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="dev-systems-grid-cards">
          {[
            { name: 'Campaign Center', desc: '캠페인 생성·배포·마감을 자동 관리하는 운영 허브', icon: '🎯', color: '#6440ff' },
            { name: 'Review Management', desc: '리뷰·체험단 모집부터 완료까지 전 과정 자동 관리', icon: '⭐', color: '#00d4a8' },
            { name: 'Content Workflow', desc: '인플루언서 원고 수집·분류·승인 자동화 시스템', icon: '📝', color: '#a78bfa' },
            { name: 'Data Monitoring', desc: '유튜브·블로그·SNS 성과 데이터 실시간 자동 수집', icon: '📊', color: '#f0b429' },
            { name: 'Internal Intranet', desc: '정산·보고서·팀 커뮤니케이션 통합 사내 시스템', icon: '🏢', color: '#ff6b6b' },
          ].map(s => (
            <div class="dev-sys-card reveal-el" style={`--sys-color:${s.color}`}>
              <div class="dev-sys-card-glow"></div>
              <span class="dev-sys-icon">{s.icon}</span>
              <div class="dev-sys-dot-line">
                <div class="dev-sys-dot"></div>
                <div class="dev-sys-line"></div>
              </div>
              <strong class="dev-sys-name">{s.name}</strong>
              <p class="dev-sys-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ════════════════════════════════════════
        SECTION 6 — 기술 스택
    ════════════════════════════════════════ */}
    <section class="dev-tech reveal-section">
      <div class="container">
        <div class="dev-section-head reveal-el">
          <span class="sec-label" style="color:#a78bfa">TECHNOLOGY STACK</span>
          <h2 class="dev-section-title">우리가 사용하는 기술들</h2>
          <p class="dev-section-desc">
            무거운 개발 환경 없이, 마케팅 현장에 최적화된 경량 기술로<br />
            빠르고 안정적인 자동화를 구현합니다.
          </p>
        </div>
        <div class="dev-tech-grid">
          {[
            { tech: 'Google Apps Script', icon: '📜', desc: '업무 자동화의 핵심 엔진. Gmail·Sheets·Drive·Forms를 연결해 복잡한 마케팅 워크플로우를 자동화합니다.', tag: 'CORE', color: '#4285f4' },
            { tech: 'Spreadsheet System', icon: '📊', desc: '수백 건의 캠페인·원고·데이터를 실시간으로 관리. 팀 전원이 동시에 접근·수정하며 운영합니다.', tag: 'DATA', color: '#00d4a8' },
            { tech: 'AI Integration', icon: '🤖', desc: 'GPT·Gemini AI API를 연동해 원고 초안 작성, 데이터 요약, 자동 분류 등 반복 작업을 처리합니다.', tag: 'AI', color: '#a78bfa' },
            { tech: 'Automation Logic', icon: '⚙️', desc: '트리거·이벤트 기반 자동 실행 구조로 사람이 개입하지 않아도 캠페인이 정확히 돌아갑니다.', tag: 'AUTO', color: '#f0b429' },
            { tech: 'Data Processing', icon: '🔢', desc: '마케팅 성과 데이터를 수집·가공·시각화. 다음 캠페인을 위한 인사이트를 자동으로 생성합니다.', tag: 'DATA', color: '#ff6b6b' },
          ].map((t, i) => (
            <div class="dev-tech-card reveal-el" style={`--tech-color:${t.color};--delay:${i*80}ms`}>
              <div class="dev-tech-card-glow"></div>
              <div class="dev-tech-card-top">
                <span class="dev-tech-icon">{t.icon}</span>
                <span class="dev-tech-tag" style={`background:${t.color}22;color:${t.color};border-color:${t.color}44`}>{t.tag}</span>
              </div>
              <strong class="dev-tech-name">{t.tech}</strong>
              <p class="dev-tech-desc">{t.desc}</p>
              <div class="dev-tech-bar">
                <div class="dev-tech-bar-fill" style={`background:${t.color}`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ════════════════════════════════════════
        SECTION 7 — 왜 인애드컴퍼니인가
    ════════════════════════════════════════ */}
    <section class="dev-positioning reveal-section">
      <div class="dev-pos-bg">
        <div class="dev-pos-glow"></div>
      </div>
      <div class="container">
        <div class="dev-section-head reveal-el">
          <span class="sec-label" style="color:#a78bfa">WHY US</span>
          <h2 class="dev-section-title">
            왜 인애드컴퍼니에<br /><em>마케팅을 맡겨야 하는가</em>
          </h2>
          <p class="dev-section-desc">
            마케팅도 하고, 기술도 직접 만드는 에이전시.<br />
            이 조합이 결과의 차이를 만듭니다.
          </p>
        </div>
        <div class="dev-pos-compare reveal-el">
          <div class="dev-pos-col">
            <div class="dev-pos-col-head">
              <span class="dev-pos-col-icon">🏢</span>
              <span>일반 마케팅<br />대행사</span>
            </div>
            {[
              { label: '마케팅 기획·실행', has: true },
              { label: '자동화 시스템 보유', has: false },
              { label: '실시간 데이터 수집', has: false },
              { label: '자체 개발 역량', has: false },
              { label: '기술 기반 운영', has: false },
            ].map(i => (
              <div class={`dev-pos-item ${i.has ? 'dev-pos-item--yes' : 'dev-pos-item--no'}`}>
                <span class="dev-pos-check">{i.has ? '✓' : '✗'}</span>
                <span>{i.label}</span>
              </div>
            ))}
          </div>
          <div class="dev-pos-col dev-pos-col--us">
            <div class="dev-pos-col-glow"></div>
            <div class="dev-pos-col-head">
              <span class="dev-pos-col-icon">⚡</span>
              <span>인애드컴퍼니</span>
            </div>
            {[
              { label: '마케팅 기획·실행', has: true },
              { label: '자동화 시스템 보유', has: true },
              { label: '실시간 데이터 수집', has: true },
              { label: '자체 개발 역량', has: true },
              { label: '기술 기반 운영', has: true },
            ].map(i => (
              <div class="dev-pos-item dev-pos-item--us">
                <span class="dev-pos-check">✓</span>
                <span>{i.label}</span>
              </div>
            ))}
          </div>
          <div class="dev-pos-col">
            <div class="dev-pos-col-head">
              <span class="dev-pos-col-icon">💻</span>
              <span>일반<br />개발사</span>
            </div>
            {[
              { label: '마케팅 기획·실행', has: false },
              { label: '자동화 시스템 보유', has: true },
              { label: '실시간 데이터 수집', has: true },
              { label: '자체 개발 역량', has: true },
              { label: '기술 기반 운영', has: false },
            ].map(i => (
              <div class={`dev-pos-item ${i.has ? 'dev-pos-item--yes' : 'dev-pos-item--no'}`}>
                <span class="dev-pos-check">{i.has ? '✓' : '✗'}</span>
                <span>{i.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* ════════════════════════════════════════
        SECTION 8 — CTA
    ════════════════════════════════════════ */}
    <section class="dev-cta reveal-section">
      <div class="dev-cta-bg">
        <div class="dev-cta-orb-l"></div>
        <div class="dev-cta-orb-r"></div>
        <div class="dev-cta-grid"></div>
        <canvas id="devCtaCanvas" class="dev-cta-canvas"></canvas>
      </div>
      <div class="container">
        <div class="dev-cta-inner reveal-el">
          <span class="sec-label" style="color:#a78bfa">CONTACT US</span>
          <h2 class="dev-cta-title">
            기술이 뒷받침하는 마케팅,<br /><em>인애드컴퍼니와 함께하세요</em>
          </h2>
          <p class="dev-cta-desc">
            자동화 시스템 위에서 돌아가는 마케팅 —<br />
            더 빠르고, 더 정확하고, 더 많은 데이터로<br />
            브랜드의 성과를 만들어드립니다.
          </p>
          <div class="dev-cta-btns">
            <a href="/contact" class="hero-cta-btn primary dev-cta-pulse">
              <span>마케팅 문의하기</span>
              <svg viewBox="0 0 24 24" fill="none" width="18" height="18"><path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </a>
            <a href="tel:010-9186-9944" class="dev-cta-phone">
              <svg viewBox="0 0 24 24" fill="none" width="16" height="16"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a2 2 0 012-2.18h3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
              <span>010-9186-9944</span>
            </a>
          </div>
          <p class="dev-cta-note">평일 09:00 – 18:00 · 문의 접수는 24시간 가능합니다</p>
        </div>
      </div>
    </section>

    {/* JS — reveal + 카운터 + CTA 파티클 + 틸트 */}
    <script dangerouslySetInnerHTML={{__html: `
(function(){
  /* ── reveal 애니메이션 ── */
  var els = document.querySelectorAll('.reveal-el');
  els.forEach(function(el){ el.style.opacity='1'; el.style.transform='none'; });
  if('IntersectionObserver' in window){
    try {
      els.forEach(function(el){
        var rect = el.getBoundingClientRect();
        if(rect.top > window.innerHeight * 1.1){
          el.style.opacity='0';
          el.style.transform='translateY(36px)';
          el.style.transition='opacity 0.85s cubic-bezier(0.16,1,0.3,1), transform 0.85s cubic-bezier(0.16,1,0.3,1)';
        }
      });
      var io = new IntersectionObserver(function(entries){
        entries.forEach(function(e){
          if(e.isIntersecting){ e.target.style.opacity='1'; e.target.style.transform='none'; io.unobserve(e.target); }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
      els.forEach(function(el){ io.observe(el); });
    } catch(e) {
      els.forEach(function(el){ el.style.opacity='1'; el.style.transform='none'; });
    }
  }

  /* ── flagship 카운터업 ── */
  var counted = false;
  var io2 = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting && !counted){
        counted = true;
        document.querySelectorAll('.dev-fstat-num[data-count]').forEach(function(el){
          var target = parseInt(el.getAttribute('data-count'));
          var startTime = null;
          function step(ts){
            if(!startTime) startTime = ts;
            var p = Math.min((ts-startTime)/1600, 1);
            var ease = 1 - Math.pow(1-p,3);
            el.textContent = Math.floor(ease*target);
            if(p < 1) requestAnimationFrame(step);
            else el.textContent = target;
          }
          requestAnimationFrame(step);
        });
      }
    });
  }, { threshold: 0.3 });
  var flagship = document.querySelector('.dev-flagship');
  if(flagship) io2.observe(flagship);

  /* ── 기술 스택 바 애니메이션 ── */
  var barIO = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        e.target.querySelectorAll('.dev-tech-bar-fill').forEach(function(bar){
          bar.style.width='0%';
          setTimeout(function(){ bar.style.width='100%'; }, 200);
        });
        barIO.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('.dev-tech-card').forEach(function(c){ barIO.observe(c); });

  /* ── CTA 파티클 ── */
  (function(){
    var canvas = document.getElementById('devCtaCanvas');
    if(!canvas) return;
    var ctx = canvas.getContext('2d');
    var W, H, pts = [];
    function resize(){ W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; }
    resize();
    window.addEventListener('resize', resize, {passive:true});
    for(var i=0;i<50;i++){
      pts.push({ x:Math.random()*1920, y:Math.random()*600, vx:(Math.random()-.5)*.4, vy:(Math.random()-.5)*.4, r:Math.random()*1.8+.4, a:Math.random()*.4+.1 });
    }
    function draw(){
      ctx.clearRect(0,0,W,H);
      pts.forEach(function(p){
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<0)p.x=W; if(p.x>W)p.x=0;
        if(p.y<0)p.y=H; if(p.y>H)p.y=0;
        ctx.beginPath(); ctx.arc(p.x%W,p.y%H,p.r,0,Math.PI*2);
        ctx.fillStyle='rgba(167,139,250,'+p.a+')'; ctx.fill();
      });
      requestAnimationFrame(draw);
    }
    draw();
  })();

  /* ── 카드 호버 틸트 ── */
  document.querySelectorAll('.dev-area-card, .dev-why-card, .dev-tech-card').forEach(function(card){
    card.addEventListener('mousemove', function(e){
      var rect = card.getBoundingClientRect();
      var x = (e.clientX-rect.left)/rect.width-.5, y = (e.clientY-rect.top)/rect.height-.5;
      card.style.transform='perspective(600px) rotateY('+x*8+'deg) rotateX('+(-y*8)+'deg) translateY(-4px)';
    });
    card.addEventListener('mouseleave', function(){ card.style.transform=''; });
  });
})();
    `}} />
  </>
)
