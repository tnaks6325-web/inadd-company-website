export const SvcOliveYoungPage = () => (
  <>
    <section class="page-hero svc-hero">
      <div class="page-hero-bg"><div class="hero-glow glow-1"></div><div class="hero-glow glow-2"></div></div>
      <div class="container">
        <a href="/marketing" class="svc-back-link">← Marketing 서비스 전체보기</a>
        <span class="sec-label">Olive Young Marketing</span>
        <h1 class="page-title">올리브영 마케팅</h1>
        <p class="page-desc">국내 최대 H&B 스토어 올리브영에서<br />브랜드를 폭발적으로 성장시키는 전략</p>
        <div class="svc-hero-kpi">
          <div class="shk-item"><strong>+340%</strong><span>채널 매출 증가</span></div>
          <div class="shk-divider"></div>
          <div class="shk-item"><strong>2.4×</strong><span>3개월 매출 성장</span></div>
          <div class="shk-divider"></div>
          <div class="shk-item"><strong>TOP 10</strong><span>카테고리 순위 달성</span></div>
        </div>
      </div>
    </section>

    {/* 서비스 소개 */}
    <section class="section svc-intro-section">
      <div class="container">
        <div class="svc-intro-grid">
          <div class="svc-intro-text">
            <span class="sec-label">What We Do</span>
            <h2 class="sec-title">올리브영에서<br /><em>팔리는 브랜드</em>를 만듭니다</h2>
            <p>올리브영은 단순한 유통 채널이 아닙니다. 뷰티·헬스케어 소비자가 가장 많이 모이는 디지털 쇼핑 플랫폼입니다. 인애드컴퍼니는 올리브영 알고리즘을 이해하고, 랭킹 상승과 매출 극대화를 위한 통합 전략을 제공합니다.</p>
            <p>입점 기획부터 리뷰 관리, 기획전 참여, 인플루언서 연계까지 올리브영 성장의 모든 것을 지원합니다.</p>
            <ul class="svc-feature-list">
              <li><span class="sfl-dot"></span>올리브영 입점 컨설팅 및 페이지 최적화</li>
              <li><span class="sfl-dot"></span>리뷰 & 별점 관리 전략</li>
              <li><span class="sfl-dot"></span>올리브영 기획전·이벤트 참여 전략</li>
              <li><span class="sfl-dot"></span>카테고리 랭킹 상승 최적화</li>
              <li><span class="sfl-dot"></span>뷰티 인플루언서 연계 시딩</li>
            </ul>
          </div>
          <div class="svc-intro-visual">
            <div class="siv-card">
              <div class="siv-icon">
                <svg viewBox="0 0 80 80" fill="none">
                  <circle cx="40" cy="40" r="28" stroke="rgba(26,107,255,0.2)" stroke-width="1.5"/>
                  <path d="M25 45 Q40 20 55 45" stroke="rgba(26,107,255,0.6)" stroke-width="2" fill="none" stroke-linecap="round"/>
                  <circle cx="40" cy="40" r="4" fill="rgba(26,107,255,0.5)"/>
                  <path d="M40 20 L40 16" stroke="rgba(26,107,255,0.4)" stroke-width="1.5" stroke-linecap="round"/>
                  <path d="M55 33 L58 30" stroke="rgba(26,107,255,0.4)" stroke-width="1.5" stroke-linecap="round"/>
                  <path d="M25 33 L22 30" stroke="rgba(26,107,255,0.4)" stroke-width="1.5" stroke-linecap="round"/>
                  <rect x="32" y="48" width="16" height="14" rx="3" stroke="rgba(26,107,255,0.4)" stroke-width="1.5"/>
                </svg>
              </div>
              <h3>올리브영 성장 전략</h3>
              <p>알고리즘 이해 기반의 랭킹 최적화로 카테고리 TOP을 달성합니다</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* 올리브영 성장 4단계 */}
    <section class="section" style="background:var(--black-2)">
      <div class="container">
        <div class="section-head">
          <span class="sec-label">Growth Formula</span>
          <h2 class="sec-title">올리브영 성장<br /><em>4단계 공식</em></h2>
        </div>
        <div class="svc-4step-grid">
          {[
            { step:'01', icon:'📄', title:'페이지 최적화', desc:'상품 페이지 이미지·텍스트 최적화, 검색 키워드 세팅, 상세페이지 클릭률 극대화' },
            { step:'02', icon:'⭐', title:'리뷰 집중 공략', desc:'올리브영 멤버십 리뷰어 시딩, 별점 4.8+ 유지, 상위 노출 리뷰 최적화' },
            { step:'03', icon:'🎯', title:'기획전 참여', desc:'올리브영 공식 기획전 참여 전략, 세일 이벤트 최적 활용, 노출 빈도 극대화' },
            { step:'04', icon:'📈', title:'랭킹 상승', desc:'알고리즘 기반 랭킹 상승 전략, 카테고리 TOP 10 진입 및 유지 관리' },
          ].map(s => (
            <div class="s4g-card">
              <div class="s4g-step">{s.step}</div>
              <div class="s4g-icon">{s.icon}</div>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
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
          <h2 class="sec-title">올리브영 마케팅<br /><em>진행 프로세스</em></h2>
        </div>
        <div class="svc-process-steps">
          {[
            { num:'01', title:'채널 현황 진단', desc:'올리브영 내 현재 상품 순위, 리뷰 현황, 경쟁사 분석을 통한 성장 기회 파악' },
            { num:'02', title:'페이지 최적화', desc:'상품 대표 이미지, 상세페이지, 키워드 세팅 전면 최적화로 클릭률·전환율 향상' },
            { num:'03', title:'리뷰 캠페인', desc:'올리브영 체험단 모집·운영. 실제 구매 소비자 리뷰 확보 및 별점 관리' },
            { num:'04', title:'기획전 참여', desc:'올리브영 공식 프로모션 시즌 참여 전략 수립 및 기획전 최적 활용' },
            { num:'05', title:'인플루언서 연계', desc:'뷰티 인플루언서 시딩을 통한 올리브영 구매 유입 증가 및 바이럴 확산' },
            { num:'06', title:'성과 분석·개선', desc:'주간/월간 채널 매출, 순위, 리뷰 현황 리포팅 및 지속 개선 전략 실행' },
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
            <div class="srg-tag">스킨케어 브랜드 올리브영 공략</div>
            <div class="srg-metrics">
              <div class="srg-metric"><strong>+340%</strong><span>3개월 채널 매출</span></div>
              <div class="srg-metric"><strong>TOP 5</strong><span>카테고리 순위</span></div>
              <div class="srg-metric"><strong>별점 4.9</strong><span>달성</span></div>
            </div>
            <p class="srg-desc">중소 뷰티 브랜드 올리브영 입점 6개월 성장 프로젝트. 리뷰 1,200건 확보, 카테고리 TOP 5 진입</p>
          </div>
          <div class="srg-card">
            <div class="srg-tag">헬스케어 보조식품 성장</div>
            <div class="srg-metrics">
              <div class="srg-metric"><strong>2.4×</strong><span>3개월 매출 성장</span></div>
              <div class="srg-metric"><strong>+680건</strong><span>신규 리뷰 확보</span></div>
            </div>
            <p class="srg-desc">건강보조식품 올리브영 채널 성장. 기획전 참여 + 리뷰 캠페인으로 3개월 만에 매출 2.4배 성장</p>
          </div>
          <div class="srg-card">
            <div class="srg-tag">뷰티 신규 브랜드 런칭</div>
            <div class="srg-metrics">
              <div class="srg-metric"><strong>1개월</strong><span>TOP 10 달성</span></div>
              <div class="srg-metric"><strong>+215%</strong><span>첫달 목표 초과</span></div>
            </div>
            <p class="srg-desc">신규 뷰티 브랜드 올리브영 런칭 캠페인. 인플루언서 연계 시딩으로 입점 1개월 만에 카테고리 TOP 10 진입</p>
          </div>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section class="svc-cta-section">
      <div class="container">
        <div class="svc-cta-inner">
          <div class="svc-cta-text">
            <h2>올리브영에서<br /><em>브랜드를 폭발 성장시키세요</em></h2>
            <p>인애드컴퍼니 전문가가 올리브영 채널 최적화 전략을 무료로 진단해드립니다.</p>
          </div>
          <div class="svc-cta-btns">
            <a href="/contact" class="hero-cta-btn primary">
              <span>무료 상담 신청하기</span>
              <svg viewBox="0 0 24 24" fill="none"><path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </a>
            <button type="button" class="hero-cta-btn ghost" onclick="openCallModal()"><span>📞 바로 전화하기</span></button>
          </div>
        </div>
      </div>
    </section>
  </>
)
