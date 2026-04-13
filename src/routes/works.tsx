export const WorksPage = () => (
  <>
    <section class="page-hero">
      <div class="page-hero-bg"><div class="hero-glow glow-1"></div></div>
      <div class="container">
        <span class="section-label">Our Works</span>
        <h1 class="page-title">숫자가 증명하는<br /><em>우리의 작업</em></h1>
        <p class="page-desc">모든 프로젝트에는 명확한 목표가 있었고,<br />우리는 그 목표를 초과 달성했습니다.</p>
      </div>
    </section>

    {/* Filter */}
    <section class="section">
      <div class="container">
        <div class="works-filter" id="worksFilter">
          <button class="filter-btn active" data-filter="all">전체</button>
          <button class="filter-btn" data-filter="brand">브랜드 전략</button>
          <button class="filter-btn" data-filter="performance">퍼포먼스</button>
          <button class="filter-btn" data-filter="viral">바이럴</button>
          <button class="filter-btn" data-filter="content">콘텐츠</button>
        </div>

        <div class="works-grid" id="worksGrid">
          {/* Work 1 */}
          <article class="work-card" data-category="brand">
            <div class="wc-thumb" style="background: linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%);">
              <div class="wc-thumb-content">
                <div class="wc-thumb-icon">🚀</div>
              </div>
              <div class="wc-overlay">
                <span>Case Study →</span>
              </div>
            </div>
            <div class="wc-body">
              <div class="wc-tags">
                <span class="tag">브랜드 전략</span>
                <span class="tag">리브랜딩</span>
              </div>
              <h3>지역 카페 체인의 전국 브랜드 전환</h3>
              <p>3개 도시 로컬 카페를 SNS 바이럴 전략으로 전국 프랜차이즈로 성장시킨 리브랜딩 프로젝트</p>
              <div class="wc-result">
                <div class="result-item">
                  <span class="result-num">340%</span>
                  <span class="result-label">매출 성장</span>
                </div>
                <div class="result-item">
                  <span class="result-num">18개월</span>
                  <span class="result-label">달성 기간</span>
                </div>
              </div>
            </div>
          </article>

          {/* Work 2 */}
          <article class="work-card" data-category="viral">
            <div class="wc-thumb" style="background: linear-gradient(135deg, #0d0d0d 0%, #1a0033 100%);">
              <div class="wc-thumb-content">
                <div class="wc-thumb-icon">⚡</div>
              </div>
              <div class="wc-overlay"><span>Case Study →</span></div>
            </div>
            <div class="wc-body">
              <div class="wc-tags">
                <span class="tag">바이럴</span>
                <span class="tag">인스타그램</span>
              </div>
              <h3>뷰티 신제품 출시 바이럴 캠페인</h3>
              <p>인플루언서 없이 순수 콘텐츠 기획만으로 2,800만 조회수를 달성한 언박싱 챌린지 캠페인</p>
              <div class="wc-result">
                <div class="result-item">
                  <span class="result-num">2,800만</span>
                  <span class="result-label">조회수</span>
                </div>
                <div class="result-item">
                  <span class="result-num">7일</span>
                  <span class="result-label">달성 기간</span>
                </div>
              </div>
            </div>
          </article>

          {/* Work 3 */}
          <article class="work-card" data-category="performance">
            <div class="wc-thumb" style="background: linear-gradient(135deg, #001a0d 0%, #003322 100%);">
              <div class="wc-thumb-content">
                <div class="wc-thumb-icon">📈</div>
              </div>
              <div class="wc-overlay"><span>Case Study →</span></div>
            </div>
            <div class="wc-body">
              <div class="wc-tags">
                <span class="tag">퍼포먼스</span>
                <span class="tag">이커머스</span>
              </div>
              <h3>패션 이커머스 광고 효율 최적화</h3>
              <p>기존 대비 광고비 40% 절감, ROAS 1,850% 달성. Meta 및 Google 통합 퍼포먼스 마케팅.</p>
              <div class="wc-result">
                <div class="result-item">
                  <span class="result-num">1,850%</span>
                  <span class="result-label">ROAS</span>
                </div>
                <div class="result-item">
                  <span class="result-num">-40%</span>
                  <span class="result-label">광고비 절감</span>
                </div>
              </div>
            </div>
          </article>

          {/* Work 4 */}
          <article class="work-card" data-category="content">
            <div class="wc-thumb" style="background: linear-gradient(135deg, #1a0f00 0%, #3d2700 100%);">
              <div class="wc-thumb-content">
                <div class="wc-thumb-icon">✍️</div>
              </div>
              <div class="wc-overlay"><span>Case Study →</span></div>
            </div>
            <div class="wc-body">
              <div class="wc-tags">
                <span class="tag">콘텐츠</span>
                <span class="tag">유튜브</span>
              </div>
              <h3>B2B 기업의 유튜브 채널 성장</h3>
              <p>딱딱한 B2B 제조업 브랜드를 유튜브 구독자 12만 채널로 성장시킨 콘텐츠 전략</p>
              <div class="wc-result">
                <div class="result-item">
                  <span class="result-num">12만</span>
                  <span class="result-label">구독자</span>
                </div>
                <div class="result-item">
                  <span class="result-num">8개월</span>
                  <span class="result-label">달성 기간</span>
                </div>
              </div>
            </div>
          </article>

          {/* Work 5 */}
          <article class="work-card" data-category="brand">
            <div class="wc-thumb" style="background: linear-gradient(135deg, #0a0a1f 0%, #1a1040 100%);">
              <div class="wc-thumb-content">
                <div class="wc-thumb-icon">🎯</div>
              </div>
              <div class="wc-overlay"><span>Case Study →</span></div>
            </div>
            <div class="wc-body">
              <div class="wc-tags">
                <span class="tag">브랜드 전략</span>
                <span class="tag">네이밍</span>
              </div>
              <h3>헬스케어 스타트업 브랜드 론칭</h3>
              <p>네이밍부터 BI, 디지털 마케팅까지 제로에서 시작해 시리즈 A 투자 유치에 성공한 브랜딩</p>
              <div class="wc-result">
                <div class="result-item">
                  <span class="result-num">50억</span>
                  <span class="result-label">투자 유치</span>
                </div>
                <div class="result-item">
                  <span class="result-num">6개월</span>
                  <span class="result-label">론칭 기간</span>
                </div>
              </div>
            </div>
          </article>

          {/* Work 6 */}
          <article class="work-card" data-category="performance">
            <div class="wc-thumb" style="background: linear-gradient(135deg, #1f0a0a 0%, #3d1010 100%);">
              <div class="wc-thumb-content">
                <div class="wc-thumb-icon">💎</div>
              </div>
              <div class="wc-overlay"><span>Case Study →</span></div>
            </div>
            <div class="wc-body">
              <div class="wc-tags">
                <span class="tag">퍼포먼스</span>
                <span class="tag">D2C</span>
              </div>
              <h3>식품 D2C 브랜드 구독 전환 최적화</h3>
              <p>일회성 구매 고객을 구독 고객으로 전환하는 CRM 기반 마케팅 자동화 시스템 구축</p>
              <div class="wc-result">
                <div class="result-item">
                  <span class="result-num">280%</span>
                  <span class="result-label">구독 전환율 증가</span>
                </div>
                <div class="result-item">
                  <span class="result-num">3.2배</span>
                  <span class="result-label">LTV 향상</span>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="cta-section">
      <div class="cta-bg"><div class="cta-glow"></div></div>
      <div class="container">
        <div class="cta-content">
          <h2>다음 성공 케이스는<br />당신의 브랜드입니다</h2>
          <p>지금 NOVA STUDIO와 함께 시작하세요.</p>
          <a href="/contact" class="btn btn-primary btn-lg">프로젝트 문의하기</a>
        </div>
      </div>
    </section>
  </>
)
