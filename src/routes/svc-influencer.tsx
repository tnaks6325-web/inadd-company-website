export const SvcInfluencerPage = () => (
  <>
    <section class="page-hero svc-hero">
      <div class="page-hero-bg"><div class="hero-glow glow-1"></div><div class="hero-glow glow-2"></div></div>
      <div class="container">
        <a href="/marketing" class="svc-back-link">← Marketing 서비스 전체보기</a>
        <span class="sec-label">Influencer & YouTube Marketing</span>
        <h1 class="page-title">인플루언서 &amp;<br /><em>유튜브 마케팅</em></h1>
        <p class="page-desc">검증된 1,200+ 크리에이터 네트워크로 타겟 소비자에게<br />진정성 있는 브랜드 메시지를 전달합니다.</p>
        <div class="svc-hero-kpi">
          <div class="shk-item"><strong>1,200+</strong><span>파트너 크리에이터</span></div>
          <div class="shk-divider"></div>
          <div class="shk-item"><strong>+580%</strong><span>최대 매출 증가</span></div>
          <div class="shk-divider"></div>
          <div class="shk-item"><strong>98%</strong><span>재계약률</span></div>
        </div>
      </div>
    </section>

    <section class="section svc-intro-section">
      <div class="container">
        <div class="svc-intro-grid">
          <div class="svc-intro-text">
            <span class="sec-label">What We Do</span>
            <h2 class="sec-title">팔로워 수보다<br /><em>영향력이 중요합니다</em></h2>
            <p>대형 인플루언서 1명보다, 정교하게 타겟팅된 마이크로 인플루언서 10명이 더 높은 전환율을 만들어냅니다. 인애드컴퍼니는 팔로워 수가 아닌 실질적 구매 영향력을 기준으로 크리에이터를 선별합니다.</p>
            <p>유튜브, 인스타그램, 블로그까지 각 플랫폼 특성에 맞는 최적의 콘텐츠 방향성을 제공하고 성과를 측정합니다.</p>
            <ul class="svc-feature-list">
              <li><span class="sfl-dot"></span>마이크로~메가 인플루언서 맞춤 캐스팅</li>
              <li><span class="sfl-dot"></span>유튜브 리뷰·브랜디드 콘텐츠 기획</li>
              <li><span class="sfl-dot"></span>협업 시나리오 제작 및 방향성 가이드</li>
              <li><span class="sfl-dot"></span>성과 측정 및 ROI 리포팅</li>
              <li><span class="sfl-dot"></span>부정적 리뷰 리스크 관리</li>
            </ul>
          </div>
          <div class="svc-intro-visual">
            <div class="siv-img-wrap">
              <img src="/static/svc-images/influencer.png" alt="인플루언서 마케팅 비주얼" class="siv-photo" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section svc-process-section">
      <div class="container">
        <div class="section-head">
          <span class="sec-label">Process</span>
          <h2 class="sec-title">인플루언서 마케팅<br /><em>진행 프로세스</em></h2>
        </div>
        <div class="svc-process-steps">
          {[
            { num:'01', title:'타겟 분석', desc:'브랜드 타겟 소비자를 분석하고 최적의 인플루언서 유형과 규모를 결정합니다.' },
            { num:'02', title:'크리에이터 선별', desc:'1,200+ DB에서 타겟 적합성, 진정성 지수, 전환율 데이터 기반으로 크리에이터를 선별합니다.' },
            { num:'03', title:'콘텐츠 브리핑', desc:'브랜드 메시지를 자연스럽게 담을 수 있는 콘텐츠 방향성과 시나리오를 제공합니다.' },
            { num:'04', title:'콘텐츠 제작·검수', desc:'크리에이터가 제작한 콘텐츠를 검수하고 브랜드 가이드에 맞게 피드백합니다.' },
            { num:'05', title:'게시 및 모니터링', desc:'최적 시간에 콘텐츠를 게시하고 댓글, 반응, 트래픽을 실시간 모니터링합니다.' },
            { num:'06', title:'ROI 리포팅', desc:'조회수, 도달, 클릭, 전환, 매출 등 전 과정의 ROI를 투명하게 리포팅합니다.' },
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

    <section class="section svc-results-section">
      <div class="container">
        <div class="section-head">
          <span class="sec-label">Results</span>
          <h2 class="sec-title">실제 성과<br /><em>숫자로 증명합니다</em></h2>
        </div>
        <div class="svc-result-grid">
          <div class="srg-card srg-card--featured">
            <div class="srg-tag">유튜브 인플루언서</div>
            <div class="srg-metrics">
              <div class="srg-metric"><strong>900만+</strong><span>영상 조회수</span></div>
              <div class="srg-metric"><strong>+45,000</strong><span>구독자 증가</span></div>
              <div class="srg-metric"><strong>+580%</strong><span>매출 증가</span></div>
            </div>
            <p class="srg-desc">헬스케어 브랜드 유튜브 인플루언서 캠페인. 마이크로 인플루언서 15명 협업으로 폭발적 성과</p>
          </div>
          <div class="srg-card">
            <div class="srg-tag">Instagram 인플루언서</div>
            <div class="srg-metrics">
              <div class="srg-metric"><strong>2,800만</strong><span>도달</span></div>
              <div class="srg-metric"><strong>4.8%</strong><span>참여율</span></div>
            </div>
            <p class="srg-desc">뷰티 브랜드 인스타그램 캠페인. 나노~마이크로 인플루언서 40명 집중 운영</p>
          </div>
          <div class="srg-card">
            <div class="srg-tag">블로그 인플루언서</div>
            <div class="srg-metrics">
              <div class="srg-metric"><strong>+1,200%</strong><span>검색량 증가</span></div>
              <div class="srg-metric"><strong>TOP3</strong><span>검색 순위</span></div>
            </div>
            <p class="srg-desc">SEO 연계 블로거 캠페인. 인플루언서 콘텐츠가 SEO 자산으로 연결되는 복합 전략</p>
          </div>
        </div>
      </div>
    </section>

    <section class="svc-cta-section">
      <div class="container">
        <div class="svc-cta-inner">
          <div class="svc-cta-text">
            <h2>우리 브랜드에 맞는<br /><em>인플루언서를 찾아드립니다</em></h2>
            <p>1,200+ 크리에이터 네트워크에서 최적의 파트너를 무료로 추천해드립니다.</p>
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
