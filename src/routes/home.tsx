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
              <a href="/viral"><span class="svc-list-num">01</span><span class="svc-list-name">VIRAL</span></a>
            </li>
            <li class="svc-list-item" data-svc="1">
              <a href="/works"><span class="svc-list-num">02</span><span class="svc-list-name">INFLUENCER</span></a>
            </li>
            <li class="svc-list-item" data-svc="2">
              <a href="/works"><span class="svc-list-num">03</span><span class="svc-list-name">SEEDING</span></a>
            </li>
            <li class="svc-list-item" data-svc="3">
              <a href="/insight"><span class="svc-list-num">04</span><span class="svc-list-name">SEO</span></a>
            </li>
            <li class="svc-list-item" data-svc="4">
              <a href="/works"><span class="svc-list-num">05</span><span class="svc-list-name">REVIEW</span></a>
            </li>
            <li class="svc-list-item" data-svc="5">
              <a href="/works"><span class="svc-list-num">06</span><span class="svc-list-name">OLIVE YOUNG</span></a>
            </li>
            <li class="svc-list-item" data-svc="6">
              <a href="/viral"><span class="svc-list-num">07</span><span class="svc-list-name">PPL</span></a>
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
                <p class="svc-panel-desc">맘카페·커뮤니티 기반 바이럴 캠페인을 기획·운영합니다. 광고처럼 보이지 않는 자연스러운 확산으로 브랜드 인지도를 폭발적으로 높입니다.</p>
                <div class="svc-panel-kpi"><span>평균 도달</span><strong>2,800만+</strong></div>
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
                <p class="svc-panel-desc">검증된 인플루언서·유튜버 네트워크를 통해 타겟 소비자에게 진정성 있는 브랜드 메시지를 전달합니다. 팔로워 수보다 영향력을 봅니다.</p>
                <div class="svc-panel-kpi"><span>파트너 크리에이터</span><strong>1,200+</strong></div>
              </div>
            </div>

            {/* 패널 2 — SEEDING */}
            <div class="svc-panel" data-panel="2">
              <div class="svc-panel-img" style="background:radial-gradient(ellipse at 50% 50%, rgba(26,107,255,0.18) 0%, transparent 60%), linear-gradient(135deg,#040408 0%,#0c0c1c 100%)">
                <div class="svc-panel-noise"></div>
                <div class="svc-panel-chart">
                  <svg viewBox="0 0 200 100" fill="none" preserveAspectRatio="none">
                    <path d="M100 50 C70 20 30 35 20 65" stroke="rgba(26,107,255,0.5)" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M100 50 C130 20 170 35 180 65" stroke="rgba(26,107,255,0.4)" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M100 50 C100 20 115 10 130 25" stroke="rgba(255,255,255,0.12)" stroke-width="1" stroke-linecap="round"/>
                    <circle cx="100" cy="50" r="5" fill="rgba(26,107,255,0.7)"/>
                    <circle cx="20" cy="65" r="3" fill="rgba(255,255,255,0.3)"/>
                    <circle cx="180" cy="65" r="3" fill="rgba(255,255,255,0.3)"/>
                  </svg>
                </div>
              </div>
              <div class="svc-panel-info">
                <span class="svc-panel-tag">Seeding Campaign</span>
                <p class="svc-panel-desc">브랜드 샘플을 핵심 타겟에게 자연스럽게 전달해 진정성 있는 후기와 입소문을 만들어냅니다. 소비자가 먼저 말하게 합니다.</p>
                <div class="svc-panel-kpi"><span>후기 전환율</span><strong>68%</strong></div>
              </div>
            </div>

            {/* 패널 3 — SEO */}
            <div class="svc-panel" data-panel="3">
              <div class="svc-panel-img" style="background:radial-gradient(ellipse at 30% 70%, rgba(26,107,255,0.2) 0%, transparent 65%), linear-gradient(135deg,#060810 0%,#0a1018 100%)">
                <div class="svc-panel-noise"></div>
                <div class="svc-panel-chart">
                  <svg viewBox="0 0 200 100" fill="none" preserveAspectRatio="none">
                    <rect x="20" y="70" width="20" height="20" fill="rgba(26,107,255,0.25)" rx="2"/>
                    <rect x="50" y="55" width="20" height="35" fill="rgba(26,107,255,0.35)" rx="2"/>
                    <rect x="80" y="40" width="20" height="50" fill="rgba(26,107,255,0.5)" rx="2"/>
                    <rect x="110" y="25" width="20" height="65" fill="rgba(26,107,255,0.65)" rx="2"/>
                    <rect x="140" y="10" width="20" height="80" fill="rgba(26,107,255,0.8)" rx="2"/>
                    <polyline points="20,65 50,50 80,35 110,20 140,5 170,2" stroke="rgba(255,255,255,0.2)" stroke-width="1.5" stroke-dasharray="4 3"/>
                  </svg>
                </div>
              </div>
              <div class="svc-panel-info">
                <span class="svc-panel-tag">SEO Marketing</span>
                <p class="svc-panel-desc">검색 상위 노출로 브랜드를 먼저 발견되게 만듭니다. 키워드 전략부터 콘텐츠 최적화까지 장기적 유입을 설계합니다.</p>
                <div class="svc-panel-kpi"><span>검색 순위 상승</span><strong>TOP 3</strong></div>
              </div>
            </div>

            {/* 패널 4 — REVIEW */}
            <div class="svc-panel" data-panel="4">
              <div class="svc-panel-img" style="background:radial-gradient(ellipse at 60% 30%, rgba(26,107,255,0.2) 0%, transparent 60%), linear-gradient(135deg,#050808 0%,#0a1014 100%)">
                <div class="svc-panel-noise"></div>
                <div class="svc-panel-chart">
                  <svg viewBox="0 0 200 100" fill="none" preserveAspectRatio="none">
                    <path d="M20 80 Q50 20 100 50 Q150 80 180 20" stroke="rgba(26,107,255,0.5)" stroke-width="2" stroke-linecap="round"/>
                    <path d="M30 85 L30 65 M60 85 L60 50 M90 85 L90 60 M120 85 L120 45 M150 85 L150 55 M170 85 L170 35" stroke="rgba(255,255,255,0.15)" stroke-width="3" stroke-linecap="round"/>
                  </svg>
                </div>
              </div>
              <div class="svc-panel-info">
                <span class="svc-panel-tag">Customer Review</span>
                <p class="svc-panel-desc">실구매자의 신뢰 리뷰를 체계적으로 확보·관리합니다. 구매 결정에 직접 영향을 주는 소셜 프루프를 브랜드 자산으로 쌓습니다.</p>
                <div class="svc-panel-kpi"><span>리뷰 전환 효과</span><strong>+230%</strong></div>
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
                <p class="svc-panel-desc">올리브영 입점부터 노출 최적화, 리뷰 관리까지. K-뷰티·헬스 브랜드의 온오프라인 채널 매출을 함께 성장시킵니다.</p>
                <div class="svc-panel-kpi"><span>채널 매출 증가</span><strong>+340%</strong></div>
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
                <p class="svc-panel-desc">드라마·영화·웹콘텐츠 속 자연스러운 브랜드 노출. 수천만 시청자에게 거부감 없이 브랜드를 각인시키는 강력한 노출 전략.</p>
                <div class="svc-panel-kpi"><span>누적 시청자</span><strong>5,000만+</strong></div>
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
          {/* Row 2 원본 */}
          <blockquote class="testi-card testi-card--alt">
            <div class="testi-card-top">
              <div class="testi-stars"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
              <span class="testi-tag">Performance Marketing</span>
            </div>
            <p class="testi-body">퍼포먼스 광고 최적화로 ROAS 1,850%를 달성했습니다. 데이터 기반 접근이 이런 차이를 만드는군요.</p>
            <footer class="testi-footer">
              <div class="testi-avatar">한</div>
              <div class="testi-info"><strong>한○○ 대표</strong><span>이커머스 브랜드</span></div>
            </footer>
          </blockquote>
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
          {/* Row 2 복제 (무한루프) */}
          <blockquote class="testi-card testi-card--alt" aria-hidden="true">
            <div class="testi-card-top">
              <div class="testi-stars"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
              <span class="testi-tag">Performance Marketing</span>
            </div>
            <p class="testi-body">퍼포먼스 광고 최적화로 ROAS 1,850%를 달성했습니다. 데이터 기반 접근이 이런 차이를 만드는군요.</p>
            <footer class="testi-footer">
              <div class="testi-avatar">한</div>
              <div class="testi-info"><strong>한○○ 대표</strong><span>이커머스 브랜드</span></div>
            </footer>
          </blockquote>
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

    {/* ============ CTA ============ */}
    <section class="home-cta">
      <div class="home-cta-bg"><div class="hcta-glow"></div></div>
      <div class="container">
        <div class="home-cta-inner">
          <h2>지금 당신의 브랜드에<br /><em>필요한 것은 무엇인가요?</em></h2>
          <p>인애드컴퍼니와 함께라면 시작이 달라집니다.</p>
          <a href="/contact" class="hero-cta-btn primary">
            <span>무료 상담 신청하기</span>
            <svg viewBox="0 0 24 24" fill="none"><path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
        </div>
      </div>
    </section>
  </>
)
