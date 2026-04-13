export const HomePage = () => (
  <>
    {/* Hero Section */}
    <section class="hero" id="hero">
      <div class="hero-bg">
        <div class="hero-grid"></div>
        <div class="hero-glow glow-1"></div>
        <div class="hero-glow glow-2"></div>
      </div>
      <div class="hero-content">
        <div class="hero-badge">
          <span class="badge-dot"></span>
          <span>새로운 마케팅 패러다임</span>
        </div>
        <h1 class="hero-title">
          <span class="title-line">브랜드를</span>
          <span class="title-line accent">움직이는</span>
          <span class="title-line">힘</span>
        </h1>
        <p class="hero-desc">
          데이터가 말하고, 크리에이티브가 설득하고,<br />
          전략이 전환을 만듭니다.<br />
          NOVA STUDIO는 숫자와 감성의 교차점에서 답을 찾습니다.
        </p>
        <div class="hero-actions">
          <a href="/works" class="btn btn-primary">포트폴리오 보기</a>
          <a href="/contact" class="btn btn-ghost">문의하기 <span class="arrow">→</span></a>
        </div>
        <div class="hero-stats">
          <div class="stat-item">
            <span class="stat-num" data-count="320">0</span>
            <span class="stat-unit">+</span>
            <span class="stat-label">프로젝트</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-num" data-count="98">0</span>
            <span class="stat-unit">%</span>
            <span class="stat-label">클라이언트 재계약률</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-num" data-count="12">0</span>
            <span class="stat-unit">년</span>
            <span class="stat-label">업력</span>
          </div>
        </div>
      </div>
      <div class="hero-scroll-hint">
        <span>Scroll</span>
        <div class="scroll-line"></div>
      </div>
    </section>

    {/* Marquee */}
    <div class="marquee-wrap">
      <div class="marquee-track">
        {['Brand Strategy', 'Content Marketing', 'Viral Campaign', 'Data Analytics', 'Social Media', 'Performance Marketing', 'Creative Direction', 'Brand Identity'].map(item => (
          <span class="marquee-item">{item} <span class="marquee-dot">✦</span></span>
        ))}
        {['Brand Strategy', 'Content Marketing', 'Viral Campaign', 'Data Analytics', 'Social Media', 'Performance Marketing', 'Creative Direction', 'Brand Identity'].map(item => (
          <span class="marquee-item">{item} <span class="marquee-dot">✦</span></span>
        ))}
      </div>
    </div>

    {/* Service Section */}
    <section class="services section" id="services">
      <div class="container">
        <div class="section-header">
          <span class="section-label">What We Do</span>
          <h2 class="section-title">전략부터 실행까지<br /><em>원스톱 마케팅</em></h2>
        </div>
        <div class="services-grid">
          <article class="service-card" data-index="01">
            <div class="service-icon">
              <svg viewBox="0 0 48 48" fill="none">
                <path d="M8 40L24 8L40 40" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M14 28H34" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
              </svg>
            </div>
            <h3>브랜드 전략</h3>
            <p>시장과 소비자를 분석해 브랜드만의 포지셔닝을 설계합니다. 단순한 슬로건이 아닌 살아있는 전략을 만듭니다.</p>
            <a href="/about" class="card-link">더 알아보기 →</a>
          </article>
          <article class="service-card" data-index="02">
            <div class="service-icon">
              <svg viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="16" stroke="currentColor" stroke-width="2.5"/>
                <path d="M24 8V24L34 30" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
              </svg>
            </div>
            <h3>퍼포먼스 마케팅</h3>
            <p>클릭부터 구매까지 모든 퍼널을 데이터로 추적하고 최적화합니다. ROI를 극대화하는 과학적 접근법.</p>
            <a href="/works" class="card-link">더 알아보기 →</a>
          </article>
          <article class="service-card" data-index="03">
            <div class="service-icon">
              <svg viewBox="0 0 48 48" fill="none">
                <path d="M6 38C6 38 12 24 24 24C36 24 42 10 42 10" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
                <circle cx="24" cy="24" r="4" fill="currentColor"/>
              </svg>
            </div>
            <h3>바이럴 콘텐츠</h3>
            <p>공유되고 검색되고 구매로 연결되는 콘텐츠 생태계를 구축합니다. 광고처럼 보이지 않는 광고.</p>
            <a href="/viral" class="card-link">더 알아보기 →</a>
          </article>
          <article class="service-card" data-index="04">
            <div class="service-icon">
              <svg viewBox="0 0 48 48" fill="none">
                <rect x="6" y="6" width="36" height="36" rx="4" stroke="currentColor" stroke-width="2.5"/>
                <path d="M16 32L22 22L28 28L34 18" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h3>데이터 인사이트</h3>
            <p>숫자 뒤에 숨겨진 패턴을 발굴합니다. 인사이트가 전략이 되고, 전략이 성과가 되는 사이클.</p>
            <a href="/insight" class="card-link">더 알아보기 →</a>
          </article>
        </div>
      </div>
    </section>

    {/* Process Section */}
    <section class="process section">
      <div class="container">
        <div class="section-header">
          <span class="section-label">How We Work</span>
          <h2 class="section-title">성과가 나오는<br /><em>우리만의 방식</em></h2>
        </div>
        <div class="process-steps">
          <div class="process-step">
            <div class="step-number">01</div>
            <div class="step-content">
              <h3>Discovery</h3>
              <p>브랜드, 시장, 경쟁사, 타깃 소비자를 깊이 분석합니다. 직관이 아닌 데이터로 현황을 진단합니다.</p>
            </div>
          </div>
          <div class="process-connector"></div>
          <div class="process-step">
            <div class="step-number">02</div>
            <div class="step-content">
              <h3>Strategy</h3>
              <p>발견한 인사이트를 바탕으로 실행 가능한 전략을 설계합니다. 목표와 KPI를 명확히 정의합니다.</p>
            </div>
          </div>
          <div class="process-connector"></div>
          <div class="process-step">
            <div class="step-number">03</div>
            <div class="step-content">
              <h3>Creative</h3>
              <p>전략에 감성을 입힙니다. 클릭을 유도하는 비주얼과 전환을 만드는 카피라이팅.</p>
            </div>
          </div>
          <div class="process-connector"></div>
          <div class="process-step">
            <div class="step-number">04</div>
            <div class="step-content">
              <h3>Optimize</h3>
              <p>실행 후 데이터를 분석하고 지속적으로 개선합니다. 성과가 나올 때까지 멈추지 않습니다.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Featured Work */}
    <section class="featured section">
      <div class="container">
        <div class="section-header">
          <span class="section-label">Featured Work</span>
          <h2 class="section-title">우리가 만든<br /><em>변화들</em></h2>
        </div>
        <div class="work-showcase">
          <article class="work-item work-item--large">
            <div class="work-thumb" style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);">
              <div class="work-thumb-inner">
                <div class="work-thumb-tag">Brand Campaign</div>
                <div class="work-thumb-visual">
                  <div class="visual-circle"></div>
                  <div class="visual-line"></div>
                </div>
              </div>
            </div>
            <div class="work-info">
              <span class="work-category">F&B 브랜드</span>
              <h3>리브랜딩으로 매출 340% 성장</h3>
              <p>오프라인 중심 브랜드를 SNS 네이티브 브랜드로 전환한 전략적 리브랜딩 프로젝트</p>
              <a href="/works" class="btn btn-outline">케이스 스터디 →</a>
            </div>
          </article>
          <div class="work-grid-side">
            <article class="work-item">
              <div class="work-thumb" style="background: linear-gradient(135deg, #0d0d0d 0%, #1a0033 100%);">
                <div class="work-thumb-inner">
                  <div class="work-thumb-tag">Viral</div>
                </div>
              </div>
              <div class="work-info">
                <span class="work-category">뷰티 스타트업</span>
                <h3>조회수 2,800만 바이럴</h3>
                <p>7일만에 브랜드 검색량 1,200% 폭발 성장</p>
              </div>
            </article>
            <article class="work-item">
              <div class="work-thumb" style="background: linear-gradient(135deg, #001a0d 0%, #003322 100%);">
                <div class="work-thumb-inner">
                  <div class="work-thumb-tag">Performance</div>
                </div>
              </div>
              <div class="work-info">
                <span class="work-category">이커머스</span>
                <h3>ROAS 1,850% 달성</h3>
                <p>데이터 기반 퍼포먼스 마케팅으로 광고비 대비 수익 극대화</p>
              </div>
            </article>
          </div>
        </div>
        <div class="center-action">
          <a href="/works" class="btn btn-primary">모든 작업물 보기</a>
        </div>
      </div>
    </section>

    {/* Testimonial */}
    <section class="testimonials section">
      <div class="container">
        <div class="section-header">
          <span class="section-label">Client Voice</span>
          <h2 class="section-title">함께한<br /><em>클라이언트의 이야기</em></h2>
        </div>
        <div class="testimonials-grid">
          <blockquote class="testimonial-card">
            <p>"단순히 예쁜 디자인이 아니라 실제 매출로 이어지는 마케팅을 처음 경험했습니다. 캠페인 후 첫 달 매출이 3배 뛰었어요."</p>
            <footer>
              <strong>김○○ 대표</strong>
              <span>라이프스타일 브랜드</span>
            </footer>
          </blockquote>
          <blockquote class="testimonial-card">
            <p>"바이럴 마케팅이 이렇게 정교하게 설계될 수 있다는 걸 몰랐습니다. 우연처럼 보이지만 모두 전략이었더라고요."</p>
            <footer>
              <strong>이○○ CMO</strong>
              <span>테크 스타트업</span>
            </footer>
          </blockquote>
          <blockquote class="testimonial-card">
            <p>"인사이트 리포트를 받고 마케팅 방향이 완전히 바뀌었습니다. 데이터를 이렇게 해석해주는 파트너는 처음이에요."</p>
            <footer>
              <strong>박○○ 마케팅팀장</strong>
              <span>유통 기업</span>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>

    {/* CTA Section */}
    <section class="cta-section">
      <div class="cta-bg">
        <div class="cta-glow"></div>
      </div>
      <div class="container">
        <div class="cta-content">
          <h2>지금 당신의 브랜드에<br />필요한 것은 무엇인가요?</h2>
          <p>NOVA STUDIO와 함께라면 시작이 달라집니다.</p>
          <a href="/contact" class="btn btn-primary btn-lg">무료 상담 신청하기</a>
        </div>
      </div>
    </section>
  </>
)
