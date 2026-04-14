export const SvcSeoPage = () => (
  <>
    <section class="page-hero svc-hero">
      <div class="page-hero-bg"><div class="hero-glow glow-1"></div><div class="hero-glow glow-2"></div></div>
      <div class="container">
        <a href="/marketing" class="svc-back-link">← Marketing 서비스 전체보기</a>
        <span class="sec-label">SEO Marketing</span>
        <h1 class="page-title">SEO 마케팅</h1>
        <p class="page-desc">소비자가 검색하는 순간 브랜드가 먼저 보이도록<br />키워드 전략부터 콘텐츠 최적화까지 설계합니다.</p>
        <div class="svc-hero-kpi">
          <div class="shk-item"><strong>TOP3</strong><span>검색 순위 달성</span></div>
          <div class="shk-divider"></div>
          <div class="shk-item"><strong>+1,200%</strong><span>최대 검색량 증가</span></div>
          <div class="shk-divider"></div>
          <div class="shk-item"><strong>장기</strong><span>지속 유입 설계</span></div>
        </div>
      </div>
    </section>

    <section class="section svc-intro-section">
      <div class="container">
        <div class="svc-intro-grid">
          <div class="svc-intro-text">
            <span class="sec-label">What We Do</span>
            <h2 class="sec-title">검색이 곧<br /><em>구매입니다</em></h2>
            <p>소비자가 구매를 결정하기 직전, 반드시 검색을 합니다. 그 순간 브랜드가 먼저 보여야 합니다. 인애드컴퍼니는 네이버·구글 검색 알고리즘을 분석해 브랜드 키워드가 상위에 노출되는 구조를 설계합니다.</p>
            <p>단기 광고와 달리, SEO는 한번 구축하면 지속적으로 유입되는 자산이 됩니다.</p>
            <ul class="svc-feature-list">
              <li><span class="sfl-dot"></span>핵심 키워드 발굴 및 전략 수립</li>
              <li><span class="sfl-dot"></span>네이버·구글 블로그 SEO 최적화</li>
              <li><span class="sfl-dot"></span>검색 상위 노출 콘텐츠 제작</li>
              <li><span class="sfl-dot"></span>월별 순위 추적 및 리포팅</li>
              <li><span class="sfl-dot"></span>바이럴 연계 검색량 증대 전략</li>
            </ul>
          </div>
          <div class="svc-intro-visual">
            <div class="siv-card">
              <div class="siv-icon">
                <svg viewBox="0 0 80 80" fill="none">
                  <circle cx="40" cy="40" r="38" stroke="rgba(26,107,255,0.2)" stroke-width="1.5"/>
                  <circle cx="35" cy="35" r="14" stroke="rgba(26,107,255,0.6)" stroke-width="2"/>
                  <line x1="45" y1="45" x2="58" y2="58" stroke="rgba(26,107,255,0.8)" stroke-width="2.5" stroke-linecap="round"/>
                  <line x1="29" y1="32" x2="42" y2="32" stroke="rgba(26,107,255,0.5)" stroke-width="1.5" stroke-linecap="round"/>
                  <line x1="29" y1="37" x2="38" y2="37" stroke="rgba(26,107,255,0.4)" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </div>
              <h3>검색 상위 최적화</h3>
              <p>소비자가 검색하는 순간 브랜드가 먼저 발견되는 구조를 만듭니다</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section svc-process-section">
      <div class="container">
        <div class="section-head">
          <span class="sec-label">Process</span>
          <h2 class="sec-title">SEO 마케팅<br /><em>진행 프로세스</em></h2>
        </div>
        <div class="svc-process-steps">
          {[
            { num:'01', title:'키워드 리서치', desc:'브랜드·상품 관련 검색량, 경쟁도, 구매 의도를 분석해 핵심 키워드를 발굴합니다.' },
            { num:'02', title:'경쟁사 분석', desc:'상위 노출 경쟁사의 콘텐츠 전략을 분석하고 차별화 포인트를 찾습니다.' },
            { num:'03', title:'콘텐츠 전략 수립', desc:'키워드별 최적화된 콘텐츠 구조와 발행 계획을 수립합니다.' },
            { num:'04', title:'SEO 콘텐츠 제작', desc:'검색 알고리즘과 사용자 경험 모두를 고려한 고품질 콘텐츠를 제작합니다.' },
            { num:'05', title:'최적화 및 배포', desc:'메타태그, 내부링크, 이미지 최적화 등 기술적 SEO를 적용하고 배포합니다.' },
            { num:'06', title:'순위 추적·개선', desc:'월별 키워드 순위 변화를 추적하고 지속적인 개선 작업을 진행합니다.' },
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
            <div class="srg-tag">헬스케어 SEO</div>
            <div class="srg-metrics">
              <div class="srg-metric"><strong>TOP3</strong><span>핵심 키워드 순위</span></div>
              <div class="srg-metric"><strong>+1,200%</strong><span>검색량 증가</span></div>
              <div class="srg-metric"><strong>3개월</strong><span>달성 기간</span></div>
            </div>
            <p class="srg-desc">건강기능식품 브랜드 SEO. 주요 구매 키워드 3개월 내 전 네이버·구글 TOP3 달성</p>
          </div>
          <div class="srg-card">
            <div class="srg-tag">뷰티 브랜드 SEO</div>
            <div class="srg-metrics">
              <div class="srg-metric"><strong>+340%</strong><span>오가닉 유입 증가</span></div>
              <div class="srg-metric"><strong>6개월</strong><span>유지 기간</span></div>
            </div>
            <p class="srg-desc">K-뷰티 신규 브랜드 SEO. 카테고리 핵심 키워드 선점으로 광고 없이 꾸준한 유입 확보</p>
          </div>
          <div class="srg-card">
            <div class="srg-tag">이커머스 SEO</div>
            <div class="srg-metrics">
              <div class="srg-metric"><strong>+520%</strong><span>검색 유입 증가</span></div>
              <div class="srg-metric"><strong>2배</strong><span>전환율 상승</span></div>
            </div>
            <p class="srg-desc">이커머스 브랜드 상품 페이지 SEO. 구매 의도 키워드 최적화로 전환율 2배 향상</p>
          </div>
        </div>
      </div>
    </section>

    <section class="svc-cta-section">
      <div class="container">
        <div class="svc-cta-inner">
          <div class="svc-cta-text">
            <h2>검색에서 먼저<br /><em>발견되는 브랜드를 만드세요</em></h2>
            <p>브랜드 키워드 분석부터 SEO 전략까지 무료로 진단해드립니다.</p>
          </div>
          <div class="svc-cta-btns">
            <a href="/contact" class="hero-cta-btn primary"><span>무료 상담 신청하기</span><svg viewBox="0 0 24 24" fill="none"><path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
            <button type="button" class="hero-cta-btn ghost" onclick="openCallModal()"><span>📞 바로 전화하기</span></button>
          </div>
        </div>
      </div>
    </section>
  </>
)
