export const AboutPage = () => (
  <>
    {/* Page Hero */}
    <section class="page-hero">
      <div class="page-hero-bg">
        <div class="hero-glow glow-1"></div>
      </div>
      <div class="container">
        <span class="section-label">About Us</span>
        <h1 class="page-title">우리는<br /><em>다르게 생각합니다</em></h1>
        <p class="page-desc">보기 좋은 것이 아닌, 팔리는 것을 만듭니다.<br />감이 아닌 근거로, 직관이 아닌 데이터로 움직입니다.</p>
      </div>
    </section>

    {/* Mission */}
    <section class="section">
      <div class="container">
        <div class="about-mission">
          <div class="mission-text">
            <span class="section-label">Our Mission</span>
            <h2>성과 없는 마케팅은<br /><em>마케팅이 아닙니다</em></h2>
            <p>NOVA STUDIO는 2013년 창립 이래 하나의 원칙을 지켜왔습니다. 모든 크리에이티브에는 명확한 목적이 있어야 하고, 그 목적은 반드시 측정 가능한 성과로 이어져야 합니다.</p>
            <p>우리는 시각적 아름다움에 안주하지 않습니다. 클릭률, 전환율, 매출 성장이라는 냉정한 숫자 앞에서도 자신 있는 결과물을 만드는 것이 우리의 사명입니다.</p>
          </div>
          <div class="mission-visual">
            <div class="mission-card">
              <div class="mc-number">12<span>년</span></div>
              <p>업계 경험</p>
            </div>
            <div class="mission-card">
              <div class="mc-number">320<span>+</span></div>
              <p>완료 프로젝트</p>
            </div>
            <div class="mission-card">
              <div class="mc-number">98<span>%</span></div>
              <p>재계약률</p>
            </div>
            <div class="mission-card">
              <div class="mc-number">50<span>+</span></div>
              <p>파트너 브랜드</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Philosophy */}
    <section class="section philosophy-section">
      <div class="container">
        <div class="section-header">
          <span class="section-label">Our Philosophy</span>
          <h2 class="section-title">우리를 만드는<br /><em>세 가지 신념</em></h2>
        </div>
        <div class="philosophy-grid">
          <div class="phil-item">
            <div class="phil-num">01</div>
            <h3>데이터 우선주의<br /><em>Data First</em></h3>
            <p>모든 의사결정의 출발점은 데이터입니다. 시장 반응, 소비자 행동, 경쟁사 분석을 수치로 환원하고 그 위에 전략을 쌓습니다. 감각은 데이터가 확인된 후에 사용합니다.</p>
          </div>
          <div class="phil-item">
            <div class="phil-num">02</div>
            <h3>목적 있는 크리에이티브<br /><em>Purpose-Driven Creative</em></h3>
            <p>아름다운 결과물도 목적 없이는 의미가 없습니다. 우리의 모든 크리에이티브는 클릭, 공유, 구매 중 하나 이상의 명확한 행동을 유도하도록 설계됩니다.</p>
          </div>
          <div class="phil-item">
            <div class="phil-num">03</div>
            <h3>파트너십 마인드<br /><em>True Partnership</em></h3>
            <p>우리는 납품 업체가 아닌 파트너입니다. 클라이언트의 비즈니스 현실과 제약을 깊이 이해하고, 함께 성장하는 관계를 추구합니다. 성과가 나올 때까지 함께합니다.</p>
          </div>
        </div>
      </div>
    </section>

    {/* Team */}
    <section class="section team-section">
      <div class="container">
        <div class="section-header">
          <span class="section-label">Our Team</span>
          <h2 class="section-title">NOVA를<br /><em>이끄는 사람들</em></h2>
        </div>
        <div class="team-grid">
          <div class="team-card">
            <div class="team-avatar" style="background: linear-gradient(135deg, #7c3aed 0%, #2563eb 100%);">
              <span>J</span>
            </div>
            <div class="team-info">
              <h3>Jiyeon Park</h3>
              <span class="team-role">Chief Strategy Officer</span>
              <p>10년간 삼성, LG, 현대 등 대기업 브랜드 전략을 담당. 데이터 사이언스와 브랜드 커뮤니케이션을 결합한 독자적 방법론 개발.</p>
            </div>
          </div>
          <div class="team-card">
            <div class="team-avatar" style="background: linear-gradient(135deg, #059669 0%, #0284c7 100%);">
              <span>M</span>
            </div>
            <div class="team-info">
              <h3>Minjun Choi</h3>
              <span class="team-role">Creative Director</span>
              <p>글로벌 광고 에이전시 출신. 아시아 태평양 칸 라이언즈 수상. 퍼포먼스와 예술성의 균형을 추구하는 크리에이터.</p>
            </div>
          </div>
          <div class="team-card">
            <div class="team-avatar" style="background: linear-gradient(135deg, #dc2626 0%, #7c3aed 100%);">
              <span>S</span>
            </div>
            <div class="team-info">
              <h3>Sooyeon Lim</h3>
              <span class="team-role">Head of Performance</span>
              <p>퍼포먼스 마케팅 전문가. 월 10억 이상 광고 집행 경험. Google, Meta 공식 인증 파트너. ROAS 최적화 전문.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section class="cta-section">
      <div class="cta-bg"><div class="cta-glow"></div></div>
      <div class="container">
        <div class="cta-content">
          <h2>함께 성장할<br />파트너를 찾고 있나요?</h2>
          <p>NOVA STUDIO가 여러분의 브랜드를 다음 레벨로 이끌겠습니다.</p>
          <a href="/contact" class="btn btn-primary btn-lg">지금 시작하기</a>
        </div>
      </div>
    </section>
  </>
)
