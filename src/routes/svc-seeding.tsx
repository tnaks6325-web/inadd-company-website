export const SvcSeedingPage = () => (
  <>
    <section class="page-hero svc-hero">
      <div class="page-hero-bg"><div class="hero-glow glow-1"></div><div class="hero-glow glow-2"></div></div>
      <div class="container">
        <a href="/marketing" class="svc-back-link">← Marketing 서비스 전체보기</a>
        <span class="sec-label">Seeding Campaign</span>
        <h1 class="page-title">시딩 캠페인</h1>
        <p class="page-desc">브랜드 샘플을 핵심 타겟에게 전달해<br />진정성 있는 후기와 입소문을 만들어냅니다.</p>
        <div class="svc-hero-kpi">
          <div class="shk-item"><strong>68%</strong><span>후기 전환율</span></div>
          <div class="shk-divider"></div>
          <div class="shk-item"><strong>+230%</strong><span>리뷰 전환 효과</span></div>
          <div class="shk-divider"></div>
          <div class="shk-item"><strong>3배</strong><span>브랜드 신뢰도 향상</span></div>
        </div>
      </div>
    </section>

    <section class="section svc-intro-section">
      <div class="container">
        <div class="svc-intro-grid">
          <div class="svc-intro-text">
            <span class="sec-label">What We Do</span>
            <h2 class="sec-title">소비자가<br /><em>먼저 말하게 합니다</em></h2>
            <p>단순 체험단이 아닙니다. 브랜드의 핵심 타겟을 정밀하게 선별하고, 실제 사용 경험을 자연스럽게 콘텐츠로 남기도록 설계합니다. 진정성 있는 후기 하나가 수백 개의 광고보다 강력합니다.</p>
            <p>플랫폼별 최적화된 리뷰 배포로 검색 결과부터 SNS까지 브랜드 신뢰 생태계를 구축합니다.</p>
            <ul class="svc-feature-list">
              <li><span class="sfl-dot"></span>타겟 체험단 모집 및 관리</li>
              <li><span class="sfl-dot"></span>진정성 있는 후기 콘텐츠 생성</li>
              <li><span class="sfl-dot"></span>플랫폼별 최적화 리뷰 배포</li>
              <li><span class="sfl-dot"></span>리뷰 전환율 분석 및 최적화</li>
              <li><span class="sfl-dot"></span>네이버·인스타·블로그 동시 커버</li>
            </ul>
          </div>
          <div class="svc-intro-visual">
            <div class="siv-card">
              <div class="siv-icon">
                <svg viewBox="0 0 80 80" fill="none">
                  <circle cx="40" cy="40" r="38" stroke="rgba(26,107,255,0.2)" stroke-width="1.5"/>
                  <path d="M28 42 L34 48 L52 32" stroke="rgba(26,107,255,0.8)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <circle cx="40" cy="40" r="18" stroke="rgba(26,107,255,0.3)" stroke-width="1"/>
                </svg>
              </div>
              <h3>진정성 기반 시딩</h3>
              <p>실제 사용자의 경험이 담긴 후기가 구매 결정의 마지막 단계를 움직입니다</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section svc-process-section">
      <div class="container">
        <div class="section-head">
          <span class="sec-label">Process</span>
          <h2 class="sec-title">시딩 캠페인<br /><em>진행 프로세스</em></h2>
        </div>
        <div class="svc-process-steps">
          {[
            { num:'01', title:'타겟 체험단 설계', desc:'브랜드 타겟에 가장 부합하는 체험단 프로필을 설계하고 모집 전략을 수립합니다.' },
            { num:'02', title:'체험단 모집·선별', desc:'지원자 중 진정성과 영향력을 기준으로 최적의 체험단을 선별합니다.' },
            { num:'03', title:'제품 발송', desc:'제품과 함께 사용 가이드, 촬영 팁, 핵심 메시지를 전달합니다.' },
            { num:'04', title:'후기 작성 지원', desc:'자연스럽고 진정성 있는 후기가 나올 수 있도록 방향성을 제시합니다.' },
            { num:'05', title:'플랫폼 배포', desc:'네이버 블로그, 인스타그램, 카페 등 플랫폼별 최적화된 방식으로 후기를 배포합니다.' },
            { num:'06', title:'성과 분석', desc:'전환율, 검색 유입, 매출 변화 등 시딩 전후 성과를 정밀하게 분석합니다.' },
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
      <div class="container">
        <div class="section-head">
          <span class="sec-label">Results</span>
          <h2 class="sec-title">실제 성과<br /><em>숫자로 증명합니다</em></h2>
        </div>
        <div class="svc-result-grid">
          <div class="srg-card srg-card--featured">
            <div class="srg-tag">식품 시딩 캠페인</div>
            <div class="srg-metrics">
              <div class="srg-metric"><strong>68%</strong><span>후기 전환율</span></div>
              <div class="srg-metric"><strong>+230%</strong><span>리뷰 전환 효과</span></div>
              <div class="srg-metric"><strong>3배</strong><span>신뢰도 향상</span></div>
            </div>
            <p class="srg-desc">신제품 출시 시딩 캠페인. 300명 체험단으로 네이버·인스타 동시 리뷰 생태계 구축</p>
          </div>
          <div class="srg-card">
            <div class="srg-tag">뷰티 시딩 캠페인</div>
            <div class="srg-metrics">
              <div class="srg-metric"><strong>500+</strong><span>후기 콘텐츠</span></div>
              <div class="srg-metric"><strong>+180%</strong><span>매출 증가</span></div>
            </div>
            <p class="srg-desc">K-뷰티 브랜드 올리브영 입점 전 시딩으로 런칭 직후 HOT 상품 등극</p>
          </div>
          <div class="srg-card">
            <div class="srg-tag">헬스케어 시딩</div>
            <div class="srg-metrics">
              <div class="srg-metric"><strong>TOP3</strong><span>검색 순위</span></div>
              <div class="srg-metric"><strong>+250%</strong><span>전환율 상승</span></div>
            </div>
            <p class="srg-desc">건강기능식품 시딩 + SEO 연계 전략으로 주요 키워드 검색 TOP3 달성</p>
          </div>
        </div>
      </div>
    </section>

    <section class="svc-cta-section">
      <div class="container">
        <div class="svc-cta-inner">
          <div class="svc-cta-text">
            <h2>진정성 있는 후기로<br /><em>브랜드 신뢰를 쌓아보세요</em></h2>
            <p>소비자가 먼저 말하게 만드는 시딩 전략을 무료로 진단해드립니다.</p>
          </div>
          <div class="svc-cta-btns">
            <a href="/contact" class="hero-cta-btn primary"><span>무료 상담 신청하기</span><svg viewBox="0 0 24 24" fill="none"><path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
            <a href="tel:010-9186-9944" class="hero-cta-btn ghost"><span>📞 바로 전화하기</span></a>
          </div>
        </div>
      </div>
    </section>
  </>
)
