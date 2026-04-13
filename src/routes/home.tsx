export const HomePage = () => (
  <>
    {/* ============================================================
        HERO SLIDER — 100vh 풀스크린
        안에 영상, 텍스트, 검은 커튼, 로고 레이어를 모두 absolute로 포개어 놓음.
        스크롤 다운 시: 커튼 fade-in → 로고 등장 (히어로 섹션 내부에서 전환)
        스크롤 업 / 새로고침: 커튼 fade-out → 텍스트 재시작
        ============================================================ */}
    <section class="hero-slider" id="heroSlider">

      {/* ── 영상 슬라이드 ── */}
      <div class="yt-slides" id="ytSlides">
        {[
          'HZaDW00sldo',
          'yiWPCX7Qwug',
          'Qh6H3hRXEcs',
          'mdinL3IgKG8',
          '4Vlqt4F1lGY',
          'SjiizDuxmK0'
        ].map((id, i) => (
          <div class={`yt-slide${i === 0 ? ' active' : ''}`} data-index={i}>
            <div class="yt-iframe-wrap">
              <iframe
                class="yt-iframe"
                src={`https://www.youtube.com/embed/${id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${id}&playsinline=1&rel=0&showinfo=0&modestbranding=1&iv_load_policy=3&disablekb=1`}
                allow="autoplay; encrypted-media"
                allowfullscreen
              ></iframe>
            </div>
            <div class="yt-overlay"></div>
          </div>
        ))}
      </div>

      {/* ── 메인 텍스트 레이어 ── */}
      <div class="hero-text-layer" id="heroTextLayer">
        <div class="hero-text-inner">
          <div class="hero-eyebrow">
            <span class="eyebrow-line"></span>
            <span class="eyebrow-text">MARKETING STUDIO</span>
          </div>
          <div class="hero-headline-wrap">
            <h1 class="hero-headline">
              <span class="hl-line" id="hlLine1"></span>
              <span class="hl-line hl-accent" id="hlLine2"></span>
              <span class="hl-line" id="hlLine3"></span>
            </h1>
          </div>
          <p class="hero-sub" id="heroSub"></p>
          <div class="hero-cta-group" id="heroCta">
            <a href="/works" class="hero-cta-btn primary">
              <span>포트폴리오 보기</span>
              <svg viewBox="0 0 24 24" fill="none"><path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </a>
            <a href="/contact" class="hero-cta-btn ghost">
              <span>무료 상담 신청</span>
            </a>
          </div>
        </div>
      </div>

      {/* ── 검은 커튼 (스크롤 다운 시 fade-in) ── */}
      <div id="blackCurtain" class="black-curtain"></div>

      {/* ── 로고 레이어 (커튼 위에, 스크롤 다운 시 등장) ── */}
      <div id="logoLayer" class="logo-layer">
        <div class="ll-mark">N</div>
        <div class="ll-name-wrap">
          <span class="ll-name">NOVA STUDIO</span>
          <span class="ll-sub">브랜드를 움직이는 힘</span>
        </div>
        <div class="ll-cta">
          <a href="/works" class="hero-cta-btn primary">
            <span>포트폴리오 보기</span>
            <svg viewBox="0 0 24 24" fill="none"><path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
          <a href="/contact" class="hero-cta-btn ghost">
            <span>무료 상담 신청</span>
          </a>
        </div>
      </div>

      {/* 스크롤 힌트 */}
      <div class="hero-scroll-cue" id="scrollCue">
        <div class="scroll-cue-line"></div>
        <span>SCROLL</span>
      </div>

    </section>

    {/* ============ MARQUEE ============ */}
    <div class="marquee-band">
      <div class="marquee-track">
        {['Brand Strategy','Viral Marketing','Content Creation','Performance Marketing','Data Analytics','Social Media','Creative Direction','Brand Identity'].map(item => (
          <span class="marquee-item">{item}<span class="marquee-sep">✦</span></span>
        ))}
        {['Brand Strategy','Viral Marketing','Content Creation','Performance Marketing','Data Analytics','Social Media','Creative Direction','Brand Identity'].map(item => (
          <span class="marquee-item">{item}<span class="marquee-sep">✦</span></span>
        ))}
      </div>
    </div>

    {/* ============ SERVICES ============ */}
    <section class="section services-section" id="services">
      <div class="container">
        <div class="section-head">
          <span class="sec-label">What We Do</span>
          <h2 class="sec-title">전략부터 실행까지<br /><em>원스톱 마케팅</em></h2>
        </div>
        <div class="services-grid">
          <article class="svc-card">
            <div class="svc-num">01</div>
            <div class="svc-icon">
              <svg viewBox="0 0 48 48" fill="none">
                <path d="M8 40L24 8L40 40" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M14 28H34" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </div>
            <h3>브랜드 전략</h3>
            <p>시장과 소비자를 분석해 브랜드만의 포지셔닝을 설계합니다. 감이 아닌 근거로 방향을 설정합니다.</p>
            <a href="/about" class="svc-link">더 알아보기 <span>→</span></a>
          </article>
          <article class="svc-card">
            <div class="svc-num">02</div>
            <div class="svc-icon">
              <svg viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="16" stroke="currentColor" stroke-width="2"/>
                <path d="M24 8V24L34 30" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </div>
            <h3>퍼포먼스 마케팅</h3>
            <p>클릭부터 구매까지 모든 퍼널을 데이터로 추적하고 최적화합니다. ROI를 극대화하는 과학적 접근.</p>
            <a href="/works" class="svc-link">더 알아보기 <span>→</span></a>
          </article>
          <article class="svc-card">
            <div class="svc-num">03</div>
            <div class="svc-icon">
              <svg viewBox="0 0 48 48" fill="none">
                <path d="M6 38C6 38 12 24 24 24C36 24 42 10 42 10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <circle cx="24" cy="24" r="4" fill="currentColor"/>
              </svg>
            </div>
            <h3>바이럴 콘텐츠</h3>
            <p>공유되고 검색되고 구매로 연결되는 콘텐츠 생태계를 구축합니다. 광고처럼 보이지 않는 광고.</p>
            <a href="/viral" class="svc-link">더 알아보기 <span>→</span></a>
          </article>
          <article class="svc-card">
            <div class="svc-num">04</div>
            <div class="svc-icon">
              <svg viewBox="0 0 48 48" fill="none">
                <rect x="6" y="6" width="36" height="36" rx="4" stroke="currentColor" stroke-width="2"/>
                <path d="M16 32L22 22L28 28L34 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h3>데이터 인사이트</h3>
            <p>숫자 뒤에 숨겨진 패턴을 발굴합니다. 인사이트가 전략이 되고, 전략이 성과가 되는 사이클.</p>
            <a href="/insight" class="svc-link">더 알아보기 <span>→</span></a>
          </article>
        </div>
      </div>
    </section>

    {/* ============ STATS ============ */}
    <section class="stats-section">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-block">
            <div class="stat-num-wrap"><span class="stat-num-big" data-count="320">0</span><span class="stat-unit-big">+</span></div>
            <div class="stat-desc">완료 프로젝트</div>
          </div>
          <div class="stat-divider-v"></div>
          <div class="stat-block">
            <div class="stat-num-wrap"><span class="stat-num-big" data-count="98">0</span><span class="stat-unit-big">%</span></div>
            <div class="stat-desc">클라이언트 재계약률</div>
          </div>
          <div class="stat-divider-v"></div>
          <div class="stat-block">
            <div class="stat-num-wrap"><span class="stat-num-big" data-count="12">0</span><span class="stat-unit-big">년</span></div>
            <div class="stat-desc">업계 경험</div>
          </div>
          <div class="stat-divider-v"></div>
          <div class="stat-block">
            <div class="stat-num-wrap"><span class="stat-num-big" data-count="50">0</span><span class="stat-unit-big">+</span></div>
            <div class="stat-desc">파트너 브랜드</div>
          </div>
        </div>
      </div>
    </section>

    {/* ============ FEATURED WORKS ============ */}
    <section class="section works-section">
      <div class="container">
        <div class="section-head section-head--row">
          <div>
            <span class="sec-label">Featured Work</span>
            <h2 class="sec-title">우리가 만든<br /><em>변화들</em></h2>
          </div>
          <a href="/works" class="all-works-link">모든 작업물 보기 →</a>
        </div>
        <div class="works-showcase">
          <article class="work-feat work-feat--main">
            <div class="wf-thumb" style="background:linear-gradient(135deg,#0a0a14 0%,#0d1f3c 60%,#0f3460 100%)">
              <div class="wf-thumb-tag">Brand Campaign</div>
              <div class="wf-thumb-deco"><div class="wf-circle"></div></div>
              <div class="wf-overlay"><span>케이스 스터디 →</span></div>
            </div>
            <div class="wf-info">
              <span class="wf-cat">F&B 브랜드</span>
              <h3>리브랜딩으로 매출 340% 성장</h3>
              <p>오프라인 중심 브랜드를 SNS 네이티브로 전환한 리브랜딩 프로젝트</p>
              <div class="wf-meta"><span class="wf-result">+340%</span><span class="wf-period">18개월</span></div>
            </div>
          </article>
          <div class="works-side">
            <article class="work-feat">
              <div class="wf-thumb wf-thumb--sm" style="background:linear-gradient(135deg,#050510 0%,#110022 100%)">
                <div class="wf-thumb-tag">Viral</div>
                <div class="wf-overlay"><span>케이스 스터디 →</span></div>
              </div>
              <div class="wf-info">
                <span class="wf-cat">뷰티 스타트업</span>
                <h3>조회수 2,800만 바이럴</h3>
                <p>7일만에 브랜드 검색량 1,200% 폭발 성장</p>
                <div class="wf-meta"><span class="wf-result">2,800만</span></div>
              </div>
            </article>
            <article class="work-feat">
              <div class="wf-thumb wf-thumb--sm" style="background:linear-gradient(135deg,#040d06 0%,#0a2010 100%)">
                <div class="wf-thumb-tag">Performance</div>
                <div class="wf-overlay"><span>케이스 스터디 →</span></div>
              </div>
              <div class="wf-info">
                <span class="wf-cat">이커머스</span>
                <h3>ROAS 1,850% 달성</h3>
                <p>데이터 기반 광고비 대비 수익 극대화</p>
                <div class="wf-meta"><span class="wf-result">1,850%</span></div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>

    {/* ============ TESTIMONIALS ============ */}
    <section class="section testimonials-section">
      <div class="container">
        <div class="section-head">
          <span class="sec-label">Client Voice</span>
          <h2 class="sec-title">클라이언트가<br /><em>직접 말합니다</em></h2>
        </div>
        <div class="testi-grid">
          <blockquote class="testi-card">
            <div class="testi-quote">"</div>
            <p>단순히 예쁜 디자인이 아니라 실제 매출로 이어지는 마케팅을 처음 경험했습니다. 캠페인 후 첫 달 매출이 3배 뛰었어요.</p>
            <footer><strong>김○○ 대표</strong><span>라이프스타일 브랜드</span></footer>
          </blockquote>
          <blockquote class="testi-card">
            <div class="testi-quote">"</div>
            <p>바이럴 마케팅이 이렇게 정교하게 설계될 수 있다는 걸 몰랐습니다. 우연처럼 보이지만 모두 전략이었더라고요.</p>
            <footer><strong>이○○ CMO</strong><span>테크 스타트업</span></footer>
          </blockquote>
          <blockquote class="testi-card">
            <div class="testi-quote">"</div>
            <p>인사이트 리포트를 받고 마케팅 방향이 완전히 바뀌었습니다. 데이터를 이렇게 해석해주는 파트너는 처음이에요.</p>
            <footer><strong>박○○ 마케팅팀장</strong><span>유통 기업</span></footer>
          </blockquote>
        </div>
      </div>
    </section>

    {/* ============ CTA ============ */}
    <section class="home-cta">
      <div class="home-cta-bg"><div class="hcta-glow"></div></div>
      <div class="container">
        <div class="home-cta-inner">
          <h2>지금 당신의 브랜드에<br /><em>필요한 것은 무엇인가요?</em></h2>
          <p>NOVA STUDIO와 함께라면 시작이 달라집니다.</p>
          <a href="/contact" class="hero-cta-btn primary">
            <span>무료 상담 신청하기</span>
            <svg viewBox="0 0 24 24" fill="none"><path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
        </div>
      </div>
    </section>
  </>
)
