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

    {/* 서비스 소개 */}
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

    {/* Why 인애드컴퍼니 */}
    <section class="section" style="background:var(--black-2)">
      <div class="container">
        <div class="section-head">
          <span class="sec-label">Why Us</span>
          <h2 class="sec-title">왜 인애드컴퍼니인가</h2>
        </div>
        <div class="svc-process-steps">
          {[
            { num:'01', title:'데이터 기반 전략', desc:'감으로 하는 마케팅이 아닙니다. 소비자 데이터와 시장 분석을 기반으로 최적 전략을 수립합니다.' },
            { num:'02', title:'통합 마케팅 운영', desc:'바이럴·SEO·리뷰·PPL을 단독이 아닌 통합 관점으로 운영해 시너지 효과를 극대화합니다.' },
            { num:'03', title:'투명한 성과 리포팅', desc:'매주·매월 상세한 성과 리포트를 제공합니다. 숫자로 증명하는 마케팅 결과를 직접 확인하세요.' },
            { num:'04', title:'전담 팀 운영', desc:'캠페인 시작부터 완료까지 전담 마케터가 책임지고 운영합니다. 98% 재계약률이 증명합니다.' },
            { num:'05', title:'업종별 전문성', desc:'뷰티·식품·헬스케어·패션·생활용품 등 다양한 업종에서 320+ 프로젝트 경험을 보유합니다.' },
            { num:'06', title:'빠른 실행력', desc:'전략 수립 후 1주일 이내 캠페인 시작. 빠른 시장 대응으로 골든타임을 놓치지 않습니다.' },
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
