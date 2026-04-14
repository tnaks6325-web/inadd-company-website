export const SvcReviewPage = () => (
  <>
    <section class="page-hero svc-hero">
      <div class="page-hero-bg"><div class="hero-glow glow-1"></div><div class="hero-glow glow-2"></div></div>
      <div class="container">
        <a href="/marketing" class="svc-back-link">← Marketing 서비스 전체보기</a>
        <span class="sec-label">Customer Review Marketing</span>
        <h1 class="page-title">리뷰 마케팅</h1>
        <p class="page-desc">진정성 있는 소비자 리뷰가 브랜드 신뢰를 만들고<br />구매 전환율을 극적으로 높입니다.</p>
        <div class="svc-hero-kpi">
          <div class="shk-item"><strong>+230%</strong><span>리뷰 전환율 향상</span></div>
          <div class="shk-divider"></div>
          <div class="shk-item"><strong>68%</strong><span>시딩 리뷰 전환율</span></div>
          <div class="shk-divider"></div>
          <div class="shk-item"><strong>3×</strong><span>브랜드 신뢰도 향상</span></div>
        </div>
      </div>
    </section>

    {/* 서비스 소개 */}
    <section class="section svc-intro-section">
      <div class="container">
        <div class="svc-intro-grid">
          <div class="svc-intro-text">
            <span class="sec-label">What We Do</span>
            <h2 class="sec-title">리뷰 하나가<br /><em>구매를 결정합니다</em></h2>
            <p>소비자의 92%는 구매 전에 리뷰를 확인합니다. 하지만 모든 리뷰가 브랜드에 도움이 되는 것은 아닙니다. 인애드컴퍼니는 실제 소비자 경험에서 나온 진정성 있는 리뷰를 전략적으로 수집하고 확산시킵니다.</p>
            <p>리뷰의 양과 질을 동시에 관리하며, 검색 결과 상단에 긍정적 리뷰가 노출되도록 SEO 전략과 연계합니다.</p>
            <ul class="svc-feature-list">
              <li><span class="sfl-dot"></span>리뷰어 선발 및 시딩 캠페인 설계</li>
              <li><span class="sfl-dot"></span>네이버·쿠팡·올리브영 리뷰 전략</li>
              <li><span class="sfl-dot"></span>블로그 체험단 기획 및 운영</li>
              <li><span class="sfl-dot"></span>부정 리뷰 관리 및 평판 보호</li>
              <li><span class="sfl-dot"></span>리뷰 SEO 연계 전략</li>
            </ul>
          </div>
          <div class="svc-intro-visual">
            <div class="siv-card">
              <div class="siv-icon">
                <svg viewBox="0 0 80 80" fill="none">
                  <rect x="12" y="18" width="56" height="44" rx="8" stroke="rgba(26,107,255,0.3)" stroke-width="1.5"/>
                  <path d="M26 34 L34 42 L54 22" stroke="rgba(26,107,255,0.7)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <circle cx="40" cy="40" r="26" stroke="rgba(26,107,255,0.15)" stroke-width="1"/>
                  <path d="M22 50 H36" stroke="rgba(26,107,255,0.3)" stroke-width="1.5" stroke-linecap="round"/>
                  <path d="M22 56 H32" stroke="rgba(26,107,255,0.2)" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </div>
              <h3>리뷰 신뢰 설계</h3>
              <p>진정성 있는 리뷰가 쌓이면 브랜드 신뢰가 되고, 신뢰는 구매로 이어집니다</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* 리뷰 플랫폼별 전략 */}
    <section class="section svc-platform-section" style="background:var(--black-2)">
      <div class="container">
        <div class="section-head">
          <span class="sec-label">Platform Strategy</span>
          <h2 class="sec-title">플랫폼별<br /><em>맞춤 리뷰 전략</em></h2>
        </div>
        <div class="svc-platform-grid">
          {[
            { icon:'🛍️', name:'네이버 쇼핑', desc:'파워링크 + 쇼핑 리뷰 전략으로 검색 상단 점령. 구매 전환율 최적화 리뷰 설계', kpi:'+180% 전환율' },
            { icon:'📦', name:'쿠팡 로켓배송', desc:'로켓배송 리뷰 집중 관리. 별점 4.8+ 유지 전략과 부정 리뷰 즉각 대응 시스템', kpi:'별점 4.8+ 유지' },
            { icon:'💚', name:'올리브영', desc:'뷰티·헬스케어 카테고리 특화. 올리브영 멤버십 리뷰어 시딩 및 상품 순위 상승 전략', kpi:'+340% 채널 매출' },
            { icon:'✍️', name:'네이버 블로그', desc:'SEO 최적화 체험단 블로그 리뷰. 브랜드 키워드 검색 시 상위 노출 보장', kpi:'TOP 3 검색 노출' },
          ].map(p => (
            <div class="spg-card">
              <div class="spg-icon">{p.icon}</div>
              <h4>{p.name}</h4>
              <p>{p.desc}</p>
              <div class="spg-kpi">{p.kpi}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* 진행 프로세스 */}
    <section class="section svc-process-section">
      <div class="container">
        <div class="section-head">
          <span class="sec-label">Process</span>
          <h2 class="sec-title">리뷰 마케팅<br /><em>진행 프로세스</em></h2>
        </div>
        <div class="svc-process-steps">
          {[
            { num:'01', title:'현황 분석', desc:'현재 리뷰 현황 분석, 경쟁사 리뷰 벤치마킹, 핵심 개선 포인트 도출' },
            { num:'02', title:'리뷰어 선발', desc:'타겟 소비자와 일치하는 체험단·시딩 리뷰어 선발 및 제품 발송 계획 수립' },
            { num:'03', title:'가이드 제공', desc:'자연스러운 리뷰를 위한 사용 가이드와 포인트 키워드 제공. 강요 없는 자연 후기 유도' },
            { num:'04', title:'리뷰 수집', desc:'제품 체험 후 각 플랫폼별 리뷰 등록 관리. 인증 이미지·영상 포함 고품질 리뷰 확보' },
            { num:'05', title:'확산 관리', desc:'등록된 리뷰의 유용성 투표 유도. 상위 노출 최적화 및 SEO 연계 전략 실행' },
            { num:'06', title:'성과 분석', desc:'리뷰 수·평균 평점·전환율 변화 등 종합 성과 리포트 제공' },
          ].map(s => (
            <div class="sps-step">
              <div class="sps-num">{s.num}</div>
              <div class="sps-body">
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* 성과 사례 */}
    <section class="section svc-results-section">
      <div class="container">
        <div class="section-head">
          <span class="sec-label">Results</span>
          <h2 class="sec-title">실제 성과<br /><em>숫자로 증명합니다</em></h2>
        </div>
        <div class="svc-result-grid">
          <div class="srg-card srg-card--featured">
            <div class="srg-tag">뷰티 브랜드 리뷰 캠페인</div>
            <div class="srg-metrics">
              <div class="srg-metric"><strong>+230%</strong><span>리뷰 전환율 향상</span></div>
              <div class="srg-metric"><strong>68%</strong><span>시딩 구매 전환</span></div>
              <div class="srg-metric"><strong>3×</strong><span>신뢰도 향상</span></div>
            </div>
            <p class="srg-desc">스킨케어 신제품 출시 캠페인. 300명 체험단 운영으로 리뷰 1,400건 확보, 네이버 쇼핑 별점 4.9 달성</p>
          </div>
          <div class="srg-card">
            <div class="srg-tag">식품 브랜드 블로그 체험단</div>
            <div class="srg-metrics">
              <div class="srg-metric"><strong>850건</strong><span>블로그 리뷰</span></div>
              <div class="srg-metric"><strong>+420%</strong><span>자연 검색 유입</span></div>
            </div>
            <p class="srg-desc">건강식품 브랜드 체험단 캠페인. SEO 최적화 블로그 리뷰로 브랜드 키워드 네이버 1페이지 점령</p>
          </div>
          <div class="srg-card">
            <div class="srg-tag">헬스케어 쿠팡 리뷰 전략</div>
            <div class="srg-metrics">
              <div class="srg-metric"><strong>별점 4.8</strong><span>평균 유지</span></div>
              <div class="srg-metric"><strong>+185%</strong><span>매출 증가</span></div>
            </div>
            <p class="srg-desc">건강보조식품 쿠팡 공략. 리뷰 관리와 순위 최적화로 카테고리 베스트셀러 등극</p>
          </div>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section class="svc-cta-section">
      <div class="container">
        <div class="svc-cta-inner">
          <div class="svc-cta-text">
            <h2>리뷰 마케팅으로<br /><em>브랜드 신뢰를 쌓으세요</em></h2>
            <p>인애드컴퍼니 전문가가 우리 브랜드에 맞는 리뷰 전략을 무료로 진단해드립니다.</p>
          </div>
          <div class="svc-cta-btns">
            <a href="/contact" class="hero-cta-btn primary">
              <span>무료 상담 신청하기</span>
              <svg viewBox="0 0 24 24" fill="none"><path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </a>
            <a href="tel:010-9186-9944" class="hero-cta-btn ghost">
              <span>📞 바로 전화하기</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  </>
)
