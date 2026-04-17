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
            <span class="eyebrow-text">THE CREATIVE MARKETING AGENCY</span>
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
        <div class="ll-mark">
          <img src="/static/logo.png" alt="인애드컴퍼니 로고" />
        </div>
        <div class="ll-name-wrap">
          <span class="ll-name">인애드컴퍼니</span>
          <span class="ll-sub">IN AD COMPANY · THE CREATIVE MARKETING AGENCY</span>
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
        {['Viral Marketing','Influencer & YouTube Marketing','Seeding Campaign','SEO Marketing','Customer Review Marketing','Olive Young Marketing','PPL'].map(item => (
          <span class="marquee-item">{item}<span class="marquee-sep">✦</span></span>
        ))}
        {['Viral Marketing','Influencer & YouTube Marketing','Seeding Campaign','SEO Marketing','Customer Review Marketing','Olive Young Marketing','PPL'].map(item => (
          <span class="marquee-item">{item}<span class="marquee-sep">✦</span></span>
        ))}
      </div>
    </div>

    {/* ============ SERVICES — 인터랙티브 리스트 + 비주얼 패널 ============ */}
    <section class="section services-section" id="services">
      <div class="container">

        {/* ── 헤드 ── */}
        <div class="section-head">
          <span class="sec-label">What We Do</span>
          <h2 class="sec-title">당신은 아직 <em>진짜 마케팅의 힘</em>을<br />만나지 못했습니다</h2>
          <p class="sec-sub">단순한 노출을 넘어 브랜드의 가치를 전달하고<br />실질적인 성과로 이어지는 인애드만의 솔루션을 경험해보세요</p>
        </div>

        {/* ── 서비스 인터랙티브 ── */}
        <div class="svc-interactive" id="svcInteractive">

          {/* 왼쪽: 키워드 리스트 */}
          <ul class="svc-list">
            <li class="svc-list-item active" data-svc="0">
              <a href="/marketing/viral"><span class="svc-list-num">01</span><span class="svc-list-name">VIRAL</span></a>
            </li>
            <li class="svc-list-item" data-svc="1">
              <a href="/marketing/influencer"><span class="svc-list-num">02</span><span class="svc-list-name">INFLUENCER</span></a>
            </li>
            <li class="svc-list-item" data-svc="2">
              <a href="/marketing/seeding"><span class="svc-list-num">03</span><span class="svc-list-name">SEEDING</span></a>
            </li>
            <li class="svc-list-item" data-svc="3">
              <a href="/marketing/seo"><span class="svc-list-num">04</span><span class="svc-list-name">SEO</span></a>
            </li>
            <li class="svc-list-item" data-svc="4">
              <a href="/marketing/review"><span class="svc-list-num">05</span><span class="svc-list-name">REVIEW</span></a>
            </li>
            <li class="svc-list-item" data-svc="5">
              <a href="/marketing/oliveyoung"><span class="svc-list-num">06</span><span class="svc-list-name">OLIVE YOUNG</span></a>
            </li>
            <li class="svc-list-item" data-svc="6">
              <a href="/marketing/ppl"><span class="svc-list-num">07</span><span class="svc-list-name">PPL</span></a>
            </li>
          </ul>

          {/* 오른쪽: 비주얼 패널 */}
          <div class="svc-visual">

            {/* 패널 0 — VIRAL */}
            <div class="svc-panel active" data-panel="0">
              <div class="svc-panel-img" style="background:radial-gradient(ellipse at 60% 40%, rgba(26,107,255,0.25) 0%, transparent 70%), linear-gradient(135deg,#050510 0%,#0a1228 100%)">
                <div class="svc-panel-noise"></div>
                <div class="svc-panel-chart">
                  <svg viewBox="0 0 200 100" fill="none" preserveAspectRatio="none">
                    <polyline points="10,85 40,60 70,70 100,35 130,45 160,15 190,20" stroke="rgba(26,107,255,0.6)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <polyline points="10,90 40,75 70,80 100,55 130,60 160,40 190,45" stroke="rgba(255,255,255,0.12)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
              </div>
              <div class="svc-panel-info">
                <span class="svc-panel-tag">Viral Marketing</span>
                <p class="svc-panel-desc">단순한 광고를 넘어, 브랜드와 소비자의 진짜 연결을 만듭니다.<br />콘텐츠의 시작부터 소비자의 기억에 남는 순간까지.<br />온라인 채널 속 깊숙이 파고들어 정교한 마케팅으로 기획, 전략, 실행을 모두 아우르며 브랜드의 가치를 확산시키고 성과로 이어지는 퍼포먼스를 만들어 냅니다.</p>
                <div class="svc-panel-tags">
                  <p class="svc-ptag-label">SERVICE KEYWORDS</p>
                  <div class="svc-ptag-grid">
                    <span class="svc-ptag">☕ 카페 침투 마케팅</span>
                    <span class="svc-ptag">💬 커뮤니티 바이럴</span>
                    <span class="svc-ptag">📱 SNS 바이럴</span>
                    <span class="svc-ptag">📰 언론 바이럴</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 패널 1 — INFLUENCER */}
            <div class="svc-panel" data-panel="1">
              <div class="svc-panel-img" style="background:radial-gradient(ellipse at 40% 60%, rgba(41,121,255,0.22) 0%, transparent 65%), linear-gradient(135deg,#060510 0%,#100820 100%)">
                <div class="svc-panel-noise"></div>
                <div class="svc-panel-chart">
                  <svg viewBox="0 0 200 100" fill="none" preserveAspectRatio="none">
                    <circle cx="50" cy="50" r="30" stroke="rgba(26,107,255,0.4)" stroke-width="1.5" stroke-dasharray="4 3"/>
                    <circle cx="130" cy="40" r="20" stroke="rgba(26,107,255,0.3)" stroke-width="1.5" stroke-dasharray="4 3"/>
                    <line x1="50" y1="50" x2="130" y2="40" stroke="rgba(26,107,255,0.35)" stroke-width="1"/>
                    <circle cx="90" cy="70" r="12" stroke="rgba(255,255,255,0.15)" stroke-width="1.5" stroke-dasharray="3 2"/>
                    <line x1="50" y1="50" x2="90" y2="70" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
                  </svg>
                </div>
              </div>
              <div class="svc-panel-info">
                <span class="svc-panel-tag">Influencer &amp; YouTube</span>
                <p class="svc-panel-desc">'좋은것 같다'는 추측이 아닌 <strong>'이겁니다'</strong>를 말해드립니다.<br />인애드만의 <strong>인플루언서 분석 프로그램</strong>을 통해 필터링 후 브랜드 메시지와 크리에이터 핏을 비교 및 제안합니다.<br /><br />데이터 기반의 정교한 매칭으로 최고의 퍼포먼스를 창출합니다.</p>
                <div class="svc-panel-tags">
                  <p class="svc-ptag-label">KEY STRATEGY</p>
                  <div class="svc-ptag-grid">
                    <span class="svc-ptag">📊 데이터 기반 분석</span>
                    <span class="svc-ptag">🔽 정교한 필터링</span>
                    <span class="svc-ptag">🤝 크리에이터 매칭</span>
                    <span class="svc-ptag">📈 최고의 퍼포먼스</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 패널 2 — SEEDING */}
            <div class="svc-panel" data-panel="2">
              <div class="svc-panel-img" style="background-image:url('/static/svc-images/seeding.png'); background-size:cover; background-position:center; position:relative;">
                <div class="svc-real-img-overlay"></div>
              </div>
              <div class="svc-panel-info">
                <span class="svc-panel-tag">Seeding Campaign</span>
                <p class="svc-panel-desc">브랜드의 씨앗을 심어 자연스러운 성장을 유도합니다.<br /><strong>검색 최적화와 브랜드 신뢰도 구축</strong>을 위한 전략적 콘텐츠 배포로, 소비자가 브랜드를 스스로 발견하고 경험하도록 만듭니다.<br /><br />다양한 플랫폼에 최적화된 시딩 전략으로 강력한 바이럴 효과를 창출합니다.</p>
                <div class="svc-panel-tags">
                  <p class="svc-ptag-label">SERVICE KEYWORDS</p>
                  <div class="svc-ptag-grid">
                    <span class="svc-ptag">📝 네이버 블로그 시딩</span>
                    <span class="svc-ptag">📸 인스타그램 시딩</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 패널 3 — SEO */}
            <div class="svc-panel" data-panel="3">
              <div class="svc-panel-img" style="background-image:url('/static/svc-images/seo.png'); background-size:cover; background-position:center; position:relative;">
                <div class="svc-real-img-overlay"></div>
              </div>
              <div class="svc-panel-info">
                <span class="svc-panel-tag">SEO Marketing</span>
                <p class="svc-panel-desc">검색 엔진 최적화로 <strong>브랜드의 온라인 가시성</strong>을 극대화하고 타겟 고객과의 접점을 확대합니다.<br /><br />네이버 플레이스부터 자동완성까지, 소비자의 검색 여정 전반을 장악하여 실질적인 유입과 전환을 이끌어내는 정교한 SEO 전략을 제안합니다.</p>
                <div class="svc-panel-tags">
                  <p class="svc-ptag-label">SERVICE KEYWORDS</p>
                  <div class="svc-ptag-grid">
                    <span class="svc-ptag">📍 네이버 플레이스</span>
                    <span class="svc-ptag">⌨️ 검색어 자동완성</span>
                    <span class="svc-ptag">▶️ 유튜브 SEO</span>
                    <span class="svc-ptag">📸 인스타 검색</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 패널 4 — REVIEW */}
            <div class="svc-panel" data-panel="4">
              <div class="svc-panel-img" style="background-image:url('/static/svc-images/review.png'); background-size:cover; background-position:center; position:relative;">
                <div class="svc-real-img-overlay"></div>
              </div>
              <div class="svc-panel-info">
                <span class="svc-panel-tag">Customer Review</span>
                <p class="svc-panel-desc">소비자의 직접 경험을 콘텐츠화하여 <strong>신뢰 기반 구매 전환</strong>을 만들어냅니다.<br /><br />단순 리뷰 수집을 넘어 플랫폼별 최적화 전략으로 브랜드 평판을 설계하고, 구매 결정에 직접 영향을 주는 리뷰 자산을 구축합니다.</p>
                <div class="svc-panel-tags">
                  <p class="svc-ptag-label">SERVICE TYPES</p>
                  <div class="svc-ptag-grid svc-ptag-grid--3">
                    <span class="svc-ptag svc-ptag--card">
                      <span class="svc-ptag-icon">✍️</span>
                      <span class="svc-ptag-text">
                        <strong>기획형 리뷰</strong>
                        <em>Planning Review</em>
                      </span>
                    </span>
                    <span class="svc-ptag svc-ptag--card">
                      <span class="svc-ptag-icon">💬</span>
                      <span class="svc-ptag-text">
                        <strong>단순 리뷰</strong>
                        <em>Simple Review</em>
                      </span>
                    </span>
                    <span class="svc-ptag svc-ptag--card">
                      <span class="svc-ptag-icon">👑</span>
                      <span class="svc-ptag-text">
                        <strong>프리미엄 리뷰</strong>
                        <em>Premium Review</em>
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 패널 5 — OLIVE YOUNG */}
            <div class="svc-panel" data-panel="5">
              <div class="svc-panel-img" style="background:radial-gradient(ellipse at 50% 50%, rgba(26,107,255,0.22) 0%, transparent 65%), linear-gradient(135deg,#040a06 0%,#081410 100%)">
                <div class="svc-panel-noise"></div>
                <div class="svc-panel-chart">
                  <svg viewBox="0 0 200 100" fill="none" preserveAspectRatio="none">
                    <rect x="15" y="20" width="170" height="60" rx="8" stroke="rgba(26,107,255,0.35)" stroke-width="1.5"/>
                    <path d="M15 45H185" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
                    <path d="M60 20V80" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
                    <circle cx="38" cy="35" r="8" fill="rgba(26,107,255,0.4)"/>
                    <circle cx="38" cy="60" r="6" fill="rgba(26,107,255,0.25)"/>
                    <rect x="70" y="27" width="80" height="8" rx="2" fill="rgba(255,255,255,0.2)"/>
                    <rect x="70" y="54" width="55" height="8" rx="2" fill="rgba(255,255,255,0.1)"/>
                  </svg>
                </div>
              </div>
              <div class="svc-panel-info">
                <span class="svc-panel-tag">Olive Young Marketing</span>
                <p class="svc-panel-desc">올리브영 채널을 전략적으로 공략하여 <strong>브랜드 매출과 인지도를 동시에</strong> 끌어올립니다.<br /><br />입점 기획부터 상위 노출, 리뷰 관리, 기획전 참여까지 올리브영 내 모든 접점을 통합 관리하여 K-뷰티 브랜드의 채널 성과를 극대화합니다.</p>
                <div class="svc-panel-tags">
                  <p class="svc-ptag-label">SERVICE KEYWORDS</p>
                  <div class="svc-ptag-grid">
                    <span class="svc-ptag">🛒 입점 기획</span>
                    <span class="svc-ptag">📊 상위 노출 최적화</span>
                    <span class="svc-ptag">💬 리뷰 관리</span>
                    <span class="svc-ptag">🎪 기획전 참여</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 패널 6 — PPL */}
            <div class="svc-panel" data-panel="6">
              <div class="svc-panel-img" style="background:radial-gradient(ellipse at 45% 55%, rgba(26,107,255,0.2) 0%, transparent 60%), linear-gradient(135deg,#080608 0%,#140a18 100%)">
                <div class="svc-panel-noise"></div>
                <div class="svc-panel-chart">
                  <svg viewBox="0 0 200 100" fill="none" preserveAspectRatio="none">
                    <rect x="15" y="15" width="170" height="70" rx="6" stroke="rgba(26,107,255,0.3)" stroke-width="1.5"/>
                    <circle cx="100" cy="50" r="18" stroke="rgba(26,107,255,0.5)" stroke-width="1.5"/>
                    <polygon points="94,42 94,58 112,50" fill="rgba(26,107,255,0.6)"/>
                    <path d="M15 85 Q55 60 100 68 Q145 75 185 50" stroke="rgba(255,255,255,0.12)" stroke-width="1.5" stroke-dasharray="4 3"/>
                  </svg>
                </div>
              </div>
              <div class="svc-panel-info">
                <span class="svc-panel-tag">PPL</span>
                <p class="svc-panel-desc">방송 콘텐츠 속 <strong>자연스러운 브랜드 노출</strong>로 대중의 신뢰와 관심을 확보하는 프리미엄 광고 전략입니다.<br /><br />단순한 노출을 넘어 스토리텔링과 결합하여 브랜드 인지도를 높이고 시청자의 마음속에 깊이 각인됩니다.</p>
                <div class="svc-panel-tags">
                  <p class="svc-ptag-label">SERVICE KEYWORDS</p>
                  <div class="svc-ptag-grid">
                    <span class="svc-ptag">📡 방송사 협찬</span>
                    <span class="svc-ptag">🎬 에피소드 기획</span>
                    <span class="svc-ptag">👁 자연스러운 노출</span>
                    <span class="svc-ptag">🎯 브랜드 신뢰도</span>
                  </div>
                </div>
              </div>
            </div>

          </div>{/* /svc-visual */}
        </div>{/* /svc-interactive */}

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
            <div class="stat-num-wrap"><span class="stat-num-big" data-count="6">0</span><span class="stat-unit-big">년+</span></div>
            <div class="stat-desc">업계 경험 (2019~)</div>
          </div>
          <div class="stat-divider-v"></div>
          <div class="stat-block">
            <div class="stat-num-wrap"><span class="stat-num-big" data-count="50">0</span><span class="stat-unit-big">+</span></div>
            <div class="stat-desc">파트너 브랜드</div>
          </div>
        </div>
      </div>
    </section>

    {/* ============ HISTORY ============ */}
    <section class="section history-section" id="history">
      <div class="container">

        {/* 헤더 */}
        <div class="hist-head">
          <div>
            <span class="sec-label">Company Growth</span>
            <h2 class="sec-title hist-title">IN AD <em>HISTORY</em></h2>
            <p class="hist-subtitle">2019 – 2026 Continuous Growth</p>
          </div>
        </div>

        {/* SVG 성장 곡선 + 노드 컨테이너 */}
        <div class="hist-track-wrap" id="histTrackWrap">

          {/* 배경 SVG 곡선 */}
          <svg class="hist-curve-svg" viewBox="0 0 1200 260" preserveAspectRatio="none" aria-hidden="true">
            {/* 글로우 선 */}
            <path class="hist-curve-glow"
              d="M 0,220 C 100,210 180,200 250,185 C 330,168 390,148 470,128 C 550,108 610,92 690,75 C 770,58 840,44 920,32 C 980,22 1050,16 1200,12"
              fill="none" />
            {/* 메인 선 */}
            <path class="hist-curve-line"
              d="M 0,220 C 100,210 180,200 250,185 C 330,168 390,148 470,128 C 550,108 610,92 690,75 C 770,58 840,44 920,32 C 980,22 1050,16 1200,12"
              fill="none" />
          </svg>

          {/* 노드 8개 — 각 연도 */}
          {[
            {
              year: '2019', label: '설립 및 런칭', pos: 12,
              items: ['인아드컴퍼니 설립', '카페침투 마케팅 런칭'],
              now: false
            },
            {
              year: '2020', label: '서비스 확장', pos: 24,
              items: ['확장 이전', 'SNS 채널 런칭', '커뮤니티 바이럴 런칭'],
              now: false
            },
            {
              year: '2021', label: '브랜드 재정립', pos: 36,
              items: ['"인애드컴퍼니" 사명 변경'],
              now: false
            },
            {
              year: '2022', label: '법인 전환 & 도약', pos: 48,
              items: ['주식회사 전환', '유튜브 마케팅 런칭', '2차 가공 콘텐츠 런칭'],
              now: false
            },
            {
              year: '2023', label: '조직 전문화', pos: 60,
              items: ['확장 이전', '유튜브 에이전시 팀'],
              now: false
            },
            {
              year: '2024', label: '시스템 고도화', pos: 72,
              items: ['퍼스널 마케팅 구축', '브랜딩 TF팀 구축', '유튜브 릴리즈 개발'],
              now: false
            },
            {
              year: '2025', label: '업무 시스템 자동화', pos: 84,
              items: ['사내 인트라넷 구축', '카피하우스 자동화 개발'],
              now: false
            },
            {
              year: '2026', label: '글로벌 & 퍼포먼스', pos: 96,
              items: ['콘텐츠 마케팅 정립', '글로벌 마케팅 런칭', '퍼포먼스 마케팅 런칭'],
              now: true
            }
          ].map((node) => (
            <div
              class={`hn-node${node.now ? ' hn-node--future' : ''}`}
              style={`left:${node.pos}%`}
              data-year={node.year}
            >
              {/* 동그라미 */}
              <div class="hn-circle">
                <span class="hn-circle-inner"></span>
                <span class="hn-pulse"></span>
              </div>

              {/* 툴팁 카드 */}
              <div class="hn-card">
                <div class="hn-card-year">{node.year}{node.now && <span class="hn-future-badge">예정</span>}</div>
                <div class="hn-card-title">{node.label}</div>
                <ul class="hn-card-list">
                  {node.items.map(item => <li>{item}</li>)}
                </ul>
              </div>

              {/* 연도 라벨 (평소에 보임) */}
              <span class="hn-year-label">{node.year}</span>
            </div>
          ))}

        </div>{/* /hist-track-wrap */}
      </div>
    </section>

    {/* ============ TESTIMONIALS — 두 줄 무한 슬라이드 ============ */}
    <section class="testimonials-section">
      <div class="container">
        <div class="section-head testi-head">
          <span class="sec-label">Client Voice</span>
          <h2 class="sec-title">클라이언트가<br /><em>직접 말합니다</em></h2>
        </div>
      </div>

      {/* ── 1행: 왼쪽으로 흐름 ── */}
      <div class="testi-row-wrap">
        <div class="testi-row testi-row--ltr">
          {/* Row 1 원본 */}
          <blockquote class="testi-card">
            <div class="testi-card-top">
              <div class="testi-stars"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
              <span class="testi-tag">Viral Marketing</span>
            </div>
            <p class="testi-body">단순히 예쁜 디자인이 아니라 실제 매출로 이어지는 마케팅을 처음 경험했습니다. 캠페인 후 첫 달 매출이 3배 뛰었어요.</p>
            <footer class="testi-footer">
              <div class="testi-avatar">김</div>
              <div class="testi-info"><strong>김○○ 대표</strong><span>라이프스타일 브랜드</span></div>
            </footer>
          </blockquote>
          <blockquote class="testi-card">
            <div class="testi-card-top">
              <div class="testi-stars"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
              <span class="testi-tag">Influencer Marketing</span>
            </div>
            <p class="testi-body">바이럴 마케팅이 이렇게 정교하게 설계될 수 있다는 걸 몰랐습니다. 우연처럼 보이지만 모두 전략이었더라고요.</p>
            <footer class="testi-footer">
              <div class="testi-avatar">이</div>
              <div class="testi-info"><strong>이○○ CMO</strong><span>테크 스타트업</span></div>
            </footer>
          </blockquote>
          <blockquote class="testi-card">
            <div class="testi-card-top">
              <div class="testi-stars"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
              <span class="testi-tag">Data Insight</span>
            </div>
            <p class="testi-body">인사이트 리포트를 받고 마케팅 방향이 완전히 바뀌었습니다. 데이터를 이렇게 해석해주는 파트너는 처음이에요.</p>
            <footer class="testi-footer">
              <div class="testi-avatar">박</div>
              <div class="testi-info"><strong>박○○ 마케팅팀장</strong><span>유통 기업</span></div>
            </footer>
          </blockquote>
          <blockquote class="testi-card">
            <div class="testi-card-top">
              <div class="testi-stars"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
              <span class="testi-tag">Olive Young Marketing</span>
            </div>
            <p class="testi-body">올리브영 입점 후 첫 달부터 리뷰가 쌓이기 시작했고, 3개월 만에 채널 매출이 2.4배 성장했습니다.</p>
            <footer class="testi-footer">
              <div class="testi-avatar">최</div>
              <div class="testi-info"><strong>최○○ 대표</strong><span>K-뷰티 브랜드</span></div>
            </footer>
          </blockquote>
          <blockquote class="testi-card">
            <div class="testi-card-top">
              <div class="testi-stars"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
              <span class="testi-tag">YouTube Marketing</span>
            </div>
            <p class="testi-body">유튜브 영상 하나로 브랜드 검색량이 1,200% 폭발했습니다. 인애드 없이는 불가능했을 결과예요.</p>
            <footer class="testi-footer">
              <div class="testi-avatar">정</div>
              <div class="testi-info"><strong>정○○ 마케터</strong><span>뷰티 스타트업</span></div>
            </footer>
          </blockquote>
          <blockquote class="testi-card">
            <div class="testi-card-top">
              <div class="testi-stars"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
              <span class="testi-tag">SEO Marketing</span>
            </div>
            <p class="testi-body">SEO 작업 후 주요 키워드 TOP3 진입. 광고비 없이도 매달 유기적 유입이 꾸준히 늘고 있습니다.</p>
            <footer class="testi-footer">
              <div class="testi-avatar">강</div>
              <div class="testi-info"><strong>강○○ 이사</strong><span>IT 서비스</span></div>
            </footer>
          </blockquote>
          <blockquote class="testi-card">
            <div class="testi-card-top">
              <div class="testi-stars"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
              <span class="testi-tag">Seeding Campaign</span>
            </div>
            <p class="testi-body">시딩 캠페인으로 진짜 소비자 후기를 확보했고, 전환율이 68% 향상됐습니다. 퀄리티가 달랐어요.</p>
            <footer class="testi-footer">
              <div class="testi-avatar">윤</div>
              <div class="testi-info"><strong>윤○○ 팀장</strong><span>생활용품 브랜드</span></div>
            </footer>
          </blockquote>
          {/* Row 1 복제 (무한루프) */}
          <blockquote class="testi-card" aria-hidden="true">
            <div class="testi-card-top">
              <div class="testi-stars"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
              <span class="testi-tag">Viral Marketing</span>
            </div>
            <p class="testi-body">단순히 예쁜 디자인이 아니라 실제 매출로 이어지는 마케팅을 처음 경험했습니다. 캠페인 후 첫 달 매출이 3배 뛰었어요.</p>
            <footer class="testi-footer">
              <div class="testi-avatar">김</div>
              <div class="testi-info"><strong>김○○ 대표</strong><span>라이프스타일 브랜드</span></div>
            </footer>
          </blockquote>
          <blockquote class="testi-card" aria-hidden="true">
            <div class="testi-card-top">
              <div class="testi-stars"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
              <span class="testi-tag">Influencer Marketing</span>
            </div>
            <p class="testi-body">바이럴 마케팅이 이렇게 정교하게 설계될 수 있다는 걸 몰랐습니다. 우연처럼 보이지만 모두 전략이었더라고요.</p>
            <footer class="testi-footer">
              <div class="testi-avatar">이</div>
              <div class="testi-info"><strong>이○○ CMO</strong><span>테크 스타트업</span></div>
            </footer>
          </blockquote>
          <blockquote class="testi-card" aria-hidden="true">
            <div class="testi-card-top">
              <div class="testi-stars"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
              <span class="testi-tag">Data Insight</span>
            </div>
            <p class="testi-body">인사이트 리포트를 받고 마케팅 방향이 완전히 바뀌었습니다. 데이터를 이렇게 해석해주는 파트너는 처음이에요.</p>
            <footer class="testi-footer">
              <div class="testi-avatar">박</div>
              <div class="testi-info"><strong>박○○ 마케팅팀장</strong><span>유통 기업</span></div>
            </footer>
          </blockquote>
          <blockquote class="testi-card" aria-hidden="true">
            <div class="testi-card-top">
              <div class="testi-stars"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
              <span class="testi-tag">Olive Young Marketing</span>
            </div>
            <p class="testi-body">올리브영 입점 후 첫 달부터 리뷰가 쌓이기 시작했고, 3개월 만에 채널 매출이 2.4배 성장했습니다.</p>
            <footer class="testi-footer">
              <div class="testi-avatar">최</div>
              <div class="testi-info"><strong>최○○ 대표</strong><span>K-뷰티 브랜드</span></div>
            </footer>
          </blockquote>
          <blockquote class="testi-card" aria-hidden="true">
            <div class="testi-card-top">
              <div class="testi-stars"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
              <span class="testi-tag">YouTube Marketing</span>
            </div>
            <p class="testi-body">유튜브 영상 하나로 브랜드 검색량이 1,200% 폭발했습니다. 인애드 없이는 불가능했을 결과예요.</p>
            <footer class="testi-footer">
              <div class="testi-avatar">정</div>
              <div class="testi-info"><strong>정○○ 마케터</strong><span>뷰티 스타트업</span></div>
            </footer>
          </blockquote>
          <blockquote class="testi-card" aria-hidden="true">
            <div class="testi-card-top">
              <div class="testi-stars"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
              <span class="testi-tag">SEO Marketing</span>
            </div>
            <p class="testi-body">SEO 작업 후 주요 키워드 TOP3 진입. 광고비 없이도 매달 유기적 유입이 꾸준히 늘고 있습니다.</p>
            <footer class="testi-footer">
              <div class="testi-avatar">강</div>
              <div class="testi-info"><strong>강○○ 이사</strong><span>IT 서비스</span></div>
            </footer>
          </blockquote>
          <blockquote class="testi-card" aria-hidden="true">
            <div class="testi-card-top">
              <div class="testi-stars"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
              <span class="testi-tag">Seeding Campaign</span>
            </div>
            <p class="testi-body">시딩 캠페인으로 진짜 소비자 후기를 확보했고, 전환율이 68% 향상됐습니다. 퀄리티가 달랐어요.</p>
            <footer class="testi-footer">
              <div class="testi-avatar">윤</div>
              <div class="testi-info"><strong>윤○○ 팀장</strong><span>생활용품 브랜드</span></div>
            </footer>
          </blockquote>
        </div>
      </div>

      {/* ── 2행: 오른쪽으로 흐름 (반대 방향) ── */}
      <div class="testi-row-wrap">
        <div class="testi-row testi-row--rtl">
          {/* Row 2 원본 — 퍼포먼스 마케팅 제거됨 */}
          <blockquote class="testi-card testi-card--alt">
            <div class="testi-card-top">
              <div class="testi-stars"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
              <span class="testi-tag">Brand Strategy</span>
            </div>
            <p class="testi-body">브랜드 포지셔닝 전략을 새로 수립하고 나서 경쟁사 대비 인지도가 확연히 달라졌습니다. 전략적 사고가 다릅니다.</p>
            <footer class="testi-footer">
              <div class="testi-avatar">오</div>
              <div class="testi-info"><strong>오○○ 브랜드팀장</strong><span>패션 기업</span></div>
            </footer>
          </blockquote>
          <blockquote class="testi-card testi-card--alt">
            <div class="testi-card-top">
              <div class="testi-stars"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
              <span class="testi-tag">Community Viral</span>
            </div>
            <p class="testi-body">맘카페 바이럴 이후 자연 구전이 폭발적으로 늘었습니다. 진짜 후기가 광고보다 훨씬 강력하다는 걸 체감했어요.</p>
            <footer class="testi-footer">
              <div class="testi-avatar">서</div>
              <div class="testi-info"><strong>서○○ 마케터</strong><span>육아용품 브랜드</span></div>
            </footer>
          </blockquote>
          <blockquote class="testi-card testi-card--alt">
            <div class="testi-card-top">
              <div class="testi-stars"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
              <span class="testi-tag">PPL Campaign</span>
            </div>
            <p class="testi-body">PPL 콘텐츠가 자연스럽게 녹아들어 거부감이 없었습니다. 노출 대비 전환율이 기존 광고의 3배였어요.</p>
            <footer class="testi-footer">
              <div class="testi-avatar">문</div>
              <div class="testi-info"><strong>문○○ 콘텐츠팀장</strong><span>F&amp;B 브랜드</span></div>
            </footer>
          </blockquote>
          <blockquote class="testi-card testi-card--alt">
            <div class="testi-card-top">
              <div class="testi-stars"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
              <span class="testi-tag">Review Marketing</span>
            </div>
            <p class="testi-body">리뷰 마케팅으로 신뢰도가 급격히 올라갔습니다. 소비자들이 먼저 브랜드를 찾기 시작했어요.</p>
            <footer class="testi-footer">
              <div class="testi-avatar">임</div>
              <div class="testi-info"><strong>임○○ 대표</strong><span>헬스케어 브랜드</span></div>
            </footer>
          </blockquote>
          <blockquote class="testi-card testi-card--alt">
            <div class="testi-card-top">
              <div class="testi-stars"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
              <span class="testi-tag">IMC Strategy</span>
            </div>
            <p class="testi-body">통합 마케팅 커뮤니케이션으로 모든 채널이 일관된 메시지를 전달했습니다. 브랜드 신뢰도가 눈에 띄게 올라갔어요.</p>
            <footer class="testi-footer">
              <div class="testi-avatar">조</div>
              <div class="testi-info"><strong>조○○ CMO</strong><span>대형 유통사</span></div>
            </footer>
          </blockquote>
          <blockquote class="testi-card testi-card--alt">
            <div class="testi-card-top">
              <div class="testi-stars"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
              <span class="testi-tag">Viral Content</span>
            </div>
            <p class="testi-body">콘텐츠 하나가 일주일 만에 2,800만 뷰를 달성했습니다. 기획부터 실행까지 완벽한 파트너입니다.</p>
            <footer class="testi-footer">
              <div class="testi-avatar">류</div>
              <div class="testi-info"><strong>류○○ 대표</strong><span>뷰티 스타트업</span></div>
            </footer>
          </blockquote>
          {/* Row 2 복제 — 퍼포먼스 마케팅 제거됨 */}
          <blockquote class="testi-card testi-card--alt" aria-hidden="true">
            <div class="testi-card-top">
              <div class="testi-stars"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
              <span class="testi-tag">Brand Strategy</span>
            </div>
            <p class="testi-body">브랜드 포지셔닝 전략을 새로 수립하고 나서 경쟁사 대비 인지도가 확연히 달라졌습니다. 전략적 사고가 다릅니다.</p>
            <footer class="testi-footer">
              <div class="testi-avatar">오</div>
              <div class="testi-info"><strong>오○○ 브랜드팀장</strong><span>패션 기업</span></div>
            </footer>
          </blockquote>
          <blockquote class="testi-card testi-card--alt" aria-hidden="true">
            <div class="testi-card-top">
              <div class="testi-stars"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
              <span class="testi-tag">Community Viral</span>
            </div>
            <p class="testi-body">맘카페 바이럴 이후 자연 구전이 폭발적으로 늘었습니다. 진짜 후기가 광고보다 훨씬 강력하다는 걸 체감했어요.</p>
            <footer class="testi-footer">
              <div class="testi-avatar">서</div>
              <div class="testi-info"><strong>서○○ 마케터</strong><span>육아용품 브랜드</span></div>
            </footer>
          </blockquote>
          <blockquote class="testi-card testi-card--alt" aria-hidden="true">
            <div class="testi-card-top">
              <div class="testi-stars"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
              <span class="testi-tag">PPL Campaign</span>
            </div>
            <p class="testi-body">PPL 콘텐츠가 자연스럽게 녹아들어 거부감이 없었습니다. 노출 대비 전환율이 기존 광고의 3배였어요.</p>
            <footer class="testi-footer">
              <div class="testi-avatar">문</div>
              <div class="testi-info"><strong>문○○ 콘텐츠팀장</strong><span>F&amp;B 브랜드</span></div>
            </footer>
          </blockquote>
          <blockquote class="testi-card testi-card--alt" aria-hidden="true">
            <div class="testi-card-top">
              <div class="testi-stars"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
              <span class="testi-tag">Review Marketing</span>
            </div>
            <p class="testi-body">리뷰 마케팅으로 신뢰도가 급격히 올라갔습니다. 소비자들이 먼저 브랜드를 찾기 시작했어요.</p>
            <footer class="testi-footer">
              <div class="testi-avatar">임</div>
              <div class="testi-info"><strong>임○○ 대표</strong><span>헬스케어 브랜드</span></div>
            </footer>
          </blockquote>
          <blockquote class="testi-card testi-card--alt" aria-hidden="true">
            <div class="testi-card-top">
              <div class="testi-stars"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
              <span class="testi-tag">IMC Strategy</span>
            </div>
            <p class="testi-body">통합 마케팅 커뮤니케이션으로 모든 채널이 일관된 메시지를 전달했습니다. 브랜드 신뢰도가 눈에 띄게 올라갔어요.</p>
            <footer class="testi-footer">
              <div class="testi-avatar">조</div>
              <div class="testi-info"><strong>조○○ CMO</strong><span>대형 유통사</span></div>
            </footer>
          </blockquote>
          <blockquote class="testi-card testi-card--alt" aria-hidden="true">
            <div class="testi-card-top">
              <div class="testi-stars"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
              <span class="testi-tag">Viral Content</span>
            </div>
            <p class="testi-body">콘텐츠 하나가 일주일 만에 2,800만 뷰를 달성했습니다. 기획부터 실행까지 완벽한 파트너입니다.</p>
            <footer class="testi-footer">
              <div class="testi-avatar">류</div>
              <div class="testi-info"><strong>류○○ 대표</strong><span>뷰티 스타트업</span></div>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>

    {/* ============ HOME PAGE — 인터랙티브 JS ============ */}
    <script dangerouslySetInnerHTML={{__html: `
(function(){

/* ─────────────────────────────────────────────
   1. WHAT WE DO — 서비스 리스트 인터랙션
   마우스 오버 시 오른쪽 패널 교체 + 글로우 이펙트
───────────────────────────────────────────── */
(function(){
  var items = document.querySelectorAll('.svc-list-item');
  var panels = document.querySelectorAll('.svc-panel');
  if(!items.length || !panels.length) return;

  function activate(idx){
    items.forEach(function(el){ el.classList.remove('active'); });
    panels.forEach(function(el){ el.classList.remove('active'); el.classList.add('exiting'); });
    items[idx].classList.add('active');
    // 패널 교체 — 페이드+슬라이드
    setTimeout(function(){
      panels.forEach(function(el){ el.classList.remove('exiting'); });
      var target = document.querySelector('.svc-panel[data-panel="'+idx+'"]');
      if(target) target.classList.add('active');
    }, 180);
  }

  items.forEach(function(item, idx){
    // 호버 시 미리보기
    item.addEventListener('mouseenter', function(){ activate(idx); });
  });

  // 클릭도 동일하게 (모바일 대응)
  items.forEach(function(item, idx){
    item.addEventListener('click', function(e){
      var href = item.querySelector('a') && item.querySelector('a').getAttribute('href');
      if(href && href !== '#'){
        // 링크 이동
      }
    });
  });
})();

/* ─────────────────────────────────────────────
   2. STATS — 숫자 카운팅 + stagger fade-up
───────────────────────────────────────────── */
(function(){
  var statSection = document.querySelector('.stats-section');
  if(!statSection) return;
  var triggered = false;

  // 각 stat-block에 fade-up 클래스 추가
  var blocks = statSection.querySelectorAll('.stat-block');
  blocks.forEach(function(b, i){
    b.style.opacity = '0';
    b.style.transform = 'translateY(32px)';
    b.style.transition = 'opacity 0.6s cubic-bezier(0.16,1,0.3,1) '+(i*0.12)+'s, transform 0.6s cubic-bezier(0.16,1,0.3,1) '+(i*0.12)+'s';
  });

  function countUp(){
    if(triggered) return;
    var rect = statSection.getBoundingClientRect();
    if(rect.top > window.innerHeight - 100) return;
    triggered = true;

    // fade-up 실행
    blocks.forEach(function(b){
      b.style.opacity = '1';
      b.style.transform = 'translateY(0)';
    });

    // 숫자 카운팅
    var nums = statSection.querySelectorAll('.stat-num-big');
    nums.forEach(function(el){
      var target = parseInt(el.getAttribute('data-count') || '0', 10);
      var duration = 1800;
      var start = null;
      function step(ts){
        if(!start) start = ts;
        var prog = Math.min((ts - start) / duration, 1);
        var ease = 1 - Math.pow(1 - prog, 4); // easeOutQuart
        el.textContent = Math.floor(ease * target);
        if(prog < 1){
          requestAnimationFrame(step);
        } else {
          el.textContent = target;
        }
      }
      requestAnimationFrame(step);
    });
  }

  window.addEventListener('scroll', countUp, { passive: true });
  countUp();
})();

/* ─────────────────────────────────────────────
   3. HISTORY — 곡선 드로잉 + 노드 순차 등장
───────────────────────────────────────────── */
(function(){
  var histSection = document.querySelector('.history-section');
  if(!histSection) return;
  var triggered = false;

  // 노드들 초기 숨김
  var nodes = histSection.querySelectorAll('.hn-node');
  nodes.forEach(function(n){
    n.style.opacity = '0';
    n.style.transform = 'translateY(20px) scale(0.8)';
    n.style.transition = 'none';
  });

  // 곡선 경로 길이 측정
  var line = histSection.querySelector('.hist-curve-line');
  if(line){
    var len = line.getTotalLength ? line.getTotalLength() : 1800;
    line.style.strokeDasharray = len;
    line.style.strokeDashoffset = len;
    line.style.transition = 'none';
  }
  var glow = histSection.querySelector('.hist-curve-glow');
  if(glow){
    var glen = glow.getTotalLength ? glow.getTotalLength() : 1800;
    glow.style.strokeDasharray = glen;
    glow.style.strokeDashoffset = glen;
    glow.style.transition = 'none';
  }

  function runAnim(){
    if(triggered) return;
    var rect = histSection.getBoundingClientRect();
    if(rect.top > window.innerHeight - 80) return;
    triggered = true;

    // 곡선 드로잉
    if(line){
      line.style.transition = 'stroke-dashoffset 1.8s cubic-bezier(0.4,0,0.2,1)';
      line.style.strokeDashoffset = '0';
    }
    if(glow){
      glow.style.transition = 'stroke-dashoffset 1.8s cubic-bezier(0.4,0,0.2,1) 0.1s';
      glow.style.strokeDashoffset = '0';
    }

    // 노드 순차 등장 (곡선 드로잉과 함께)
    nodes.forEach(function(n, i){
      var delay = 0.3 + i * 0.18;
      setTimeout(function(){
        n.style.transition = 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.34,1.56,0.64,1)';
        n.style.opacity = '1';
        n.style.transform = 'translateY(0) scale(1)';
      }, delay * 1000);
    });
  }

  window.addEventListener('scroll', runAnim, { passive: true });
  runAnim();
})();

/* ─────────────────────────────────────────────
   4. 전체 섹션 스크롤 reveal (section-head 등)
───────────────────────────────────────────── */
(function(){
  var revealEls = document.querySelectorAll('.section-head, .hist-head, .testi-head');
  if(!('IntersectionObserver' in window)){
    revealEls.forEach(function(el){ el.style.opacity='1'; el.style.transform='none'; });
    return;
  }
  revealEls.forEach(function(el){
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)';
  });
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(function(el){ io.observe(el); });
})();

/* ─────────────────────────────────────────────
   5. HOME CTA — 스크롤 진입 이펙트 + 파티클
───────────────────────────────────────────── */
───────────────────────────────────────────── */
(function(){
  var cta = document.getElementById('homeCta');
  if(!cta) return;
  var triggered = false;

  // 진입 시 각 요소 visible 클래스 추가
  function revealCta(){
    if(triggered) return;
    var rect = cta.getBoundingClientRect();
    if(rect.top > window.innerHeight - 100) return;
    triggered = true;
    var els = cta.querySelectorAll('.hcta-badge, .hcta-line, .hcta-desc, .hcta-kpi, .hcta-btns');
    els.forEach(function(el){ el.classList.add('visible'); });
  }
  window.addEventListener('scroll', revealCta, { passive: true });
  revealCta();

  // CTA 파티클
  var canvas = document.getElementById('ctaParticle');
  if(!canvas) return;
  var ctx = canvas.getContext('2d');
  var W, H, pts = [];
  function resize(){ W = canvas.width = cta.offsetWidth; H = canvas.height = cta.offsetHeight; }
  resize();
  window.addEventListener('resize', resize);
  for(var i=0; i<50; i++){
    pts.push({
      x: Math.random()*1400, y: Math.random()*500,
      r: Math.random()*1.2+0.2,
      dx: (Math.random()-0.5)*0.25, dy: (Math.random()-0.5)*0.25,
      o: Math.random()*0.35+0.05
    });
  }
  function drawCta(){
    ctx.clearRect(0,0,W,H);
    pts.forEach(function(p){
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle='rgba(100,160,255,'+p.o+')';
      ctx.fill();
      p.x+=p.dx; p.y+=p.dy;
      if(p.x<0||p.x>W) p.dx*=-1;
      if(p.y<0||p.y>H) p.dy*=-1;
    });
    requestAnimationFrame(drawCta);
  }
  drawCta();
})();

})();
    `}} />

    {/* ============ CTA ============ */}
    <section class="home-cta" id="homeCta">
      <div class="home-cta-bg">
        <div class="hcta-glow"></div>
        {/* 파티클 캔버스 */}
        <canvas id="ctaParticle" class="hcta-canvas"></canvas>
        {/* 글로우 오브 */}
        <div class="hcta-orb hcta-orb--1"></div>
        <div class="hcta-orb hcta-orb--2"></div>
      </div>
      <div class="container">
        <div class="home-cta-inner">
          {/* 상단 뱃지 */}
          <div class="hcta-badge">
            <span class="hcta-badge-dot"></span>
            FREE CONSULTATION
          </div>
          <h2 class="hcta-title">
            <span class="hcta-line hcta-line--1">지금 당신의 브랜드에</span>
            <em class="hcta-line hcta-line--2">필요한 것은 무엇인가요?</em>
          </h2>
          <p class="hcta-desc">
            인애드컴퍼니와 함께라면 시작이 달라집니다.<br />
            <span class="hcta-desc-sub">검색 → 발견 → 신뢰 → 구매 → 재방문, 퍼널 전 단계를 책임집니다.</span>
          </p>
          {/* KPI 수치 */}
          <div class="hcta-kpi">
            <div class="hcta-kpi-item">
              <strong>320+</strong><span>완료 프로젝트</span>
            </div>
            <div class="hcta-kpi-divider"></div>
            <div class="hcta-kpi-item">
              <strong>98%</strong><span>재계약률</span>
            </div>
            <div class="hcta-kpi-divider"></div>
            <div class="hcta-kpi-item">
              <strong>6년+</strong><span>업계 경험</span>
            </div>
          </div>
          {/* 버튼 그룹 */}
          <div class="hcta-btns">
            <a href="/contact" class="hero-cta-btn primary hcta-btn-main">
              <span>무료 상담 신청하기</span>
              <svg viewBox="0 0 24 24" fill="none"><path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </a>
            <button type="button" class="hero-cta-btn ghost hcta-btn-call" onclick="openCallModal()">
              <span>📞 바로 전화하기</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  </>
)
