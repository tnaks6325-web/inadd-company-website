export const ViralPage = () => (
  <>
    {/* Hero */}
    <section class="page-hero">
      <div class="page-hero-bg">
        <div class="hero-glow glow-1"></div>
        <div class="hero-glow glow-2"></div>
      </div>
      <div class="container">
        <span class="sec-label">Marketing Services</span>
        <h1 class="page-title">마케팅 서비스</h1>
        <p class="page-desc">인애드컴퍼니의 7가지 마케팅 솔루션으로<br />브랜드를 폭발적으로 성장시키세요.</p>
        <div class="svc-hero-kpi">
          <div class="shk-item"><strong>2,800만+</strong><span>평균 캠페인 도달</span></div>
          <div class="shk-divider"></div>
          <div class="shk-item"><strong>+1,200%</strong><span>최대 검색량 증가</span></div>
          <div class="shk-divider"></div>
          <div class="shk-item"><strong>98%</strong><span>재계약률</span></div>
        </div>
      </div>
    </section>

    {/* ── WHY 인애드컴퍼니 ── */}
    <section class="section why-inadco-section">
      <div class="container">

        {/* 헤더 */}
        <div class="why-header">
          <div class="why-header-left">
            <span class="sec-label">MARKET ANALYSIS</span>
            <h2 class="why-title">WHY? 인애드컴퍼니</h2>
            <p class="why-desc">모든 프로세스를 시스템화하여 휴먼 에러를 <strong>구조적으로 최소화</strong>하고,<br />데이터 기반의 안정적인 프로젝트 운영을 보장합니다.</p>
          </div>
          <div class="why-badge-track">
            <div class="wbt-item wbt-item--dim">
              <span class="wbt-label">RISK</span>
              <div class="wbt-dot"></div>
            </div>
            <div class="wbt-line"></div>
            <div class="wbt-item wbt-item--active">
              <span class="wbt-label">SYSTEM</span>
              <div class="wbt-dot wbt-dot--active"></div>
            </div>
            <div class="wbt-line"></div>
            <div class="wbt-item wbt-item--blue">
              <span class="wbt-label wbt-label--blue">STABILITY</span>
              <div class="wbt-dot wbt-dot--blue"></div>
            </div>
          </div>
        </div>

        {/* 6개 카드 그리드 */}
        <div class="why-cards-grid">
          {[
            {
              badge: '시스템 모듈',
              icon: '🗄️',
              title: '사내 인트라넷 모듈',
              desc: '프로젝트 통합 관리 및 문서 아카이빙으로 히스토리 영구 보존 및 권한별 접근 제어',
              highlight: false,
            },
            {
              badge: '운영 관리',
              icon: '📅',
              title: '데일리 일정 관리',
              desc: '캠페인별 체크포인트 자동 알림 및 데일리 운영 보고로 일정 지연 최소화',
              highlight: false,
            },
            {
              badge: '운영 관리',
              icon: '📊',
              title: '프로젝트별 전담 관리',
              desc: '광고주별 전용 대시보드 및 히스토리 관리로 담당자 변경 시에도 업무 연속성 유지',
              highlight: false,
            },
            {
              badge: '데이터 필터링',
              icon: '🔽',
              title: 'DB 필터링 시스템',
              desc: '자체 보유 크리에이터 DB 및 블랙리스트 필터링으로 섭외 리스크 사전 예방',
              highlight: false,
            },
            {
              badge: '전문 운영',
              icon: '👤',
              title: '시니어 PM 운영',
              desc: '각 파트별 최소 5년차 이상 팀장급 PM 배정으로 전문적인 커뮤니케이션 및 핸들링',
              highlight: true,
            },
            {
              badge: '리스크 대응',
              icon: '🔔',
              title: '이슈 즉각 대응',
              desc: '새벽/주말 이슈 대응 프로세스 및 상황별 가이드 보유로 돌발 상황 신속 해결',
              highlight: true,
            },
          ].map(card => (
            <div class={`why-card${card.highlight ? ' why-card--highlight' : ''}`}>
              <div class="why-card-top">
                <span class="why-card-badge">{card.badge}</span>
                <div class={`why-card-icon-wrap${card.highlight ? ' why-card-icon-wrap--blue' : ''}`}>
                  <span class="why-card-icon">{card.icon}</span>
                </div>
              </div>
              <h4 class="why-card-title">{card.title}</h4>
              <p class="why-card-desc">{card.desc}</p>
            </div>
          ))}
        </div>

        {/* OUTCOME 하단 바 */}
        <div class="why-outcome-bar">
          <div class="why-outcome-checks">
            <span class="woc-item">
              <svg viewBox="0 0 20 20" fill="none" width="16" height="16"><circle cx="10" cy="10" r="9" fill="rgba(26,107,255,0.9)"/><path d="M6 10l3 3 5-5" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
              체계적 시스템화
            </span>
            <span class="woc-item">
              <svg viewBox="0 0 20 20" fill="none" width="16" height="16"><circle cx="10" cy="10" r="9" fill="rgba(26,107,255,0.9)"/><path d="M6 10l3 3 5-5" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
              시니어 PM 전담
            </span>
            <span class="woc-item">
              <svg viewBox="0 0 20 20" fill="none" width="16" height="16"><circle cx="10" cy="10" r="9" fill="rgba(26,107,255,0.9)"/><path d="M6 10l3 3 5-5" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
              실시간 리스크 대응
            </span>
          </div>
          <div class="why-outcome-result">
            <span class="why-outcome-badge">OUTCOME</span>
            <span class="why-outcome-text">운영 리스크를 구조적으로 낮춥니다.</span>
          </div>
        </div>

      </div>
    </section>

    {/* ── 서비스 선택 ── */}
    <section class="section">
      <div class="container">
        <div class="section-head">
          <span class="sec-label">Our Services</span>
          <h2 class="sec-title">원하는 서비스를<br /><em>선택하세요</em></h2>
          <p class="sec-sub">각 서비스 페이지에서 상세 설명, 진행 프로세스, 실제 성과 사례를 확인할 수 있습니다.</p>
        </div>
        <div class="mkt-services-grid">
          {[
            {
              icon: '🔥',
              href: '/marketing/viral',
              title: '바이럴 마케팅',
              desc: '맘카페·온라인 커뮤니티 기반의 자연스러운 확산으로 브랜드 인지도를 폭발적으로 높입니다.',
              kpis: [{ val: '2,800만+', label: '평균 도달' }, { val: '48h', label: '최단 바이럴' }]
            },
            {
              icon: '⭐',
              href: '/marketing/influencer',
              title: '인플루언서 마케팅',
              desc: '검증된 1,200+ 크리에이터 네트워크로 타겟 소비자에게 진정성 있는 브랜드 메시지를 전달합니다.',
              kpis: [{ val: '1,200+', label: '파트너 크리에이터' }, { val: '+580%', label: '최대 매출 증가' }]
            },
            {
              icon: '🌱',
              href: '/marketing/seeding',
              title: '시딩 캠페인',
              desc: '브랜드 샘플을 핵심 타겟에게 전달해 진정성 있는 후기와 입소문을 만들어냅니다.',
              kpis: [{ val: '68%', label: '후기 전환율' }, { val: '+230%', label: '리뷰 전환 효과' }]
            },
            {
              icon: '🔍',
              href: '/marketing/seo',
              title: 'SEO 마케팅',
              desc: '소비자가 검색하는 순간 브랜드가 먼저 보이도록 키워드 전략부터 콘텐츠 최적화까지 설계합니다.',
              kpis: [{ val: 'TOP3', label: '검색 순위 달성' }, { val: '+1,200%', label: '검색량 증가' }]
            },
            {
              icon: '💬',
              href: '/marketing/review',
              title: '리뷰 마케팅',
              desc: '진정성 있는 소비자 리뷰가 브랜드 신뢰를 만들고 구매 전환율을 극적으로 높입니다.',
              kpis: [{ val: '+230%', label: '리뷰 전환율' }, { val: '3×', label: '브랜드 신뢰도' }]
            },
            {
              icon: '💚',
              href: '/marketing/oliveyoung',
              title: '올리브영 마케팅',
              desc: '국내 최대 H&B 스토어 올리브영에서 브랜드를 폭발적으로 성장시키는 전략.',
              kpis: [{ val: '+340%', label: '채널 매출 증가' }, { val: '2.4×', label: '3개월 성장' }]
            },
            {
              icon: '🎬',
              href: '/marketing/ppl',
              title: 'PPL 마케팅',
              desc: '드라마·유튜브·콘텐츠 속 자연스러운 브랜드 노출로 5,000만+ 누적 시청자에게 도달합니다.',
              kpis: [{ val: '5,000만+', label: '누적 시청자' }, { val: '3×', label: '광고 전환율' }]
            }
          ].map(s => (
            <a href={s.href} class="mkt-svc-card">
              <div class="msc-icon">{s.icon}</div>
              <div class="msc-body">
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
              <div class="msc-kpi">
                {s.kpis.map(k => (
                  <div class="msc-kpi-item">
                    <strong>{k.val}</strong>
                    <span>{k.label}</span>
                  </div>
                ))}
              </div>
              <span class="msc-arrow">→</span>
            </a>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section class="svc-cta-section">
      <div class="container">
        <div class="svc-cta-inner">
          <div class="svc-cta-text">
            <h2>어떤 마케팅이 필요한지<br /><em>모르겠다면?</em></h2>
            <p>무료 상담을 통해 우리 브랜드에 가장 효과적인 마케팅 솔루션을 찾아드립니다.</p>
          </div>
          <div class="svc-cta-btns">
            <a href="/contact" class="hero-cta-btn primary">
              <span>무료 상담 신청하기</span>
              <svg viewBox="0 0 24 24" fill="none"><path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </a>
            <a href="tel:010-9186-9944" class="hero-cta-btn ghost">
              <span>📞 010-9186-9944</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  </>
)
