export const InsightPage = () => (
  <>
    <section class="page-hero">
      <div class="page-hero-bg"><div class="hero-glow glow-1"></div></div>
      <div class="container">
        <span class="section-label">Marketing Insight</span>
        <h1 class="page-title">시장을 읽는<br /><em>날카로운 시선</em></h1>
        <p class="page-desc">마케팅 현장에서 직접 검증된 인사이트를 공유합니다.<br />트렌드가 아닌 본질을 봅니다.</p>
      </div>
    </section>

    {/* Featured Insight */}
    <section class="section">
      <div class="container">
        <div class="insight-featured">
          <div class="insight-featured-label">Editor's Pick</div>
          <div class="insight-featured-content">
            <div class="insight-featured-meta">
              <span class="insight-cat">퍼포먼스 마케팅</span>
              <span class="insight-date">2025. 03. 28</span>
            </div>
            <h2>2025년 Meta 광고, 이제는 '넓게 던지는' 시대</h2>
            <p>광고 타겟팅이 좁을수록 좋다는 공식이 깨지고 있습니다. AI 최적화 기반의 광고 알고리즘이 진화하면서, 오히려 넓은 타겟팅이 더 높은 ROAS를 만들어내는 역설적인 현상이 나타나고 있습니다. 실제 클라이언트 데이터를 기반으로 분석합니다.</p>
            <a href="#" class="btn btn-outline">아티클 읽기 →</a>
          </div>
          <div class="insight-featured-visual">
            <div class="insight-visual-card">
              <div class="ivc-chart">
                <div class="ivc-bar" style="height:40%"><span>좁은 타겟</span></div>
                <div class="ivc-bar ivc-bar--accent" style="height:90%"><span>넓은 타겟</span></div>
              </div>
              <p class="ivc-label">ROAS 비교 (2024 Q4)</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Articles Grid */}
    <section class="section">
      <div class="container">
        <div class="insight-filter">
          <button class="filter-btn active" data-filter="all">전체</button>
          <button class="filter-btn" data-filter="performance">퍼포먼스</button>
          <button class="filter-btn" data-filter="content">콘텐츠</button>
          <button class="filter-btn" data-filter="brand">브랜딩</button>
          <button class="filter-btn" data-filter="trend">트렌드</button>
        </div>

        <div class="articles-grid">
          <article class="article-card" data-category="content">
            <div class="article-thumb" style="background: linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%);">
              <span class="article-cat-badge">콘텐츠</span>
            </div>
            <div class="article-body">
              <time class="article-date">2025. 03. 15</time>
              <h3>숏폼이 바꾼 소비자 구매 여정, 마케터가 알아야 할 3가지</h3>
              <p>틱톡, 인스타 릴스, 유튜브 쇼츠. 숏폼이 구매 퍼널을 어떻게 재편하고 있는지 데이터로 분석합니다.</p>
              <div class="article-footer">
                <span class="read-time">8분 읽기</span>
                <a href="#" class="article-link">읽기 →</a>
              </div>
            </div>
          </article>

          <article class="article-card" data-category="brand">
            <div class="article-thumb" style="background: linear-gradient(135deg, #0d0d0d 0%, #1a0033 100%);">
              <span class="article-cat-badge">브랜딩</span>
            </div>
            <div class="article-body">
              <time class="article-date">2025. 03. 08</time>
              <h3>스타트업 브랜딩, 돈 없이도 기억에 남는 법</h3>
              <p>예산이 제한적인 스타트업이 브랜드 인지도를 빠르게 높이는 전술적 브랜딩 전략.</p>
              <div class="article-footer">
                <span class="read-time">6분 읽기</span>
                <a href="#" class="article-link">읽기 →</a>
              </div>
            </div>
          </article>

          <article class="article-card" data-category="performance">
            <div class="article-thumb" style="background: linear-gradient(135deg, #001a0d 0%, #003322 100%);">
              <span class="article-cat-badge">퍼포먼스</span>
            </div>
            <div class="article-body">
              <time class="article-date">2025. 02. 25</time>
              <h3>구글 P-MAX, 써야 할까? 말아야 할까?</h3>
              <p>퍼포먼스 맥스 캠페인의 실체. 어떤 업종에 효과적이고, 어떤 경우 피해야 하는지 직접 실험 결과.</p>
              <div class="article-footer">
                <span class="read-time">10분 읽기</span>
                <a href="#" class="article-link">읽기 →</a>
              </div>
            </div>
          </article>

          <article class="article-card" data-category="trend">
            <div class="article-thumb" style="background: linear-gradient(135deg, #1a0f00 0%, #3d2700 100%);">
              <span class="article-cat-badge">트렌드</span>
            </div>
            <div class="article-body">
              <time class="article-date">2025. 02. 18</time>
              <h3>AI 생성 콘텐츠 시대, 진정성의 역설</h3>
              <p>AI 콘텐츠가 범람하는 시대에 오히려 '인간적인 결함'이 신뢰를 높이는 현상을 분석합니다.</p>
              <div class="article-footer">
                <span class="read-time">7분 읽기</span>
                <a href="#" class="article-link">읽기 →</a>
              </div>
            </div>
          </article>

          <article class="article-card" data-category="content">
            <div class="article-thumb" style="background: linear-gradient(135deg, #0a0a1f 0%, #1a1040 100%);">
              <span class="article-cat-badge">콘텐츠</span>
            </div>
            <div class="article-body">
              <time class="article-date">2025. 02. 10</time>
              <h3>리뷰 마케팅의 진화: UGC에서 CGC로</h3>
              <p>사용자 생성 콘텐츠를 넘어 커뮤니티 기반 콘텐츠 전략으로 전환하는 브랜드들의 사례.</p>
              <div class="article-footer">
                <span class="read-time">5분 읽기</span>
                <a href="#" class="article-link">읽기 →</a>
              </div>
            </div>
          </article>

          <article class="article-card" data-category="brand">
            <div class="article-thumb" style="background: linear-gradient(135deg, #1f0a0a 0%, #3d1010 100%);">
              <span class="article-cat-badge">브랜딩</span>
            </div>
            <div class="article-body">
              <time class="article-date">2025. 01. 30</time>
              <h3>B2B도 감성이 필요하다: 기업 브랜드의 인간화</h3>
              <p>딱딱한 B2B 마케팅을 감성으로 풀어낸 성공 사례와 적용 가이드.</p>
              <div class="article-footer">
                <span class="read-time">9분 읽기</span>
                <a href="#" class="article-link">읽기 →</a>
              </div>
            </div>
          </article>
        </div>

        <div class="center-action">
          <button class="btn btn-outline">더 많은 아티클 보기</button>
        </div>
      </div>
    </section>

    {/* Newsletter */}
    <section class="newsletter-section section">
      <div class="container">
        <div class="newsletter-box">
          <div class="newsletter-text">
            <h2>매주 마케팅 인사이트를<br /><em>뉴스레터로 받아보세요</em></h2>
            <p>현장에서 검증된 마케팅 인사이트를 매주 화요일 발행합니다. 2,400명의 마케터가 구독 중입니다.</p>
          </div>
          <form class="newsletter-form" onsubmit="return false;">
            <div class="form-row">
              <input type="email" placeholder="이메일 주소 입력" class="form-input" />
              <button type="submit" class="btn btn-primary">구독하기</button>
            </div>
            <p class="form-note">스팸 없이 마케팅 정보만 발송합니다. 언제든 구독 취소 가능합니다.</p>
          </form>
        </div>
      </div>
    </section>
  </>
)
