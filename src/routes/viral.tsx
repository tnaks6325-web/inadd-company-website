import { icon } from '../icons'
export const ViralPage = () => (
  <>
    {/* ════════════════════════════════════════
        HERO — 버터밀크 라이트 (에디토리얼)
    ════════════════════════════════════════ */}
    <section class="mkt-hero">
      <div class="mkt-hero-bg" aria-hidden="true"></div>
      <div class="mkt-hero-accent" aria-hidden="true"></div>

      <div class="container mkt-hero-layout">

        {/* 좌측 — 텍스트 */}
        <div class="mkt-hero-left">
          <p class="mkt-hero-eyebrow">FUNNEL MARKETING AGENCY</p>

          <h1 class="mkt-hero-title">
            브랜드를 <em class="mht-accent">성장</em>시키는<br />
            퍼널 전략
          </h1>

          <p class="mkt-hero-lead">
            소비자가 <strong>발견하고, 신뢰하고, 구매하게</strong> 만듭니다.
          </p>

          <p class="mkt-hero-desc">
            노출은 시작일 뿐입니다. 검색에서의 첫 만남부터 신뢰의 축적,
            구매 이후의 재방문까지 — 고객 여정 전체를 한 흐름으로 설계합니다.
          </p>

          <div class="mkt-hero-metrics">
            <div class="mhm-item"><strong>320+</strong><span>완료 프로젝트</span></div>
            <div class="mhm-item"><strong>1,520+</strong><span>크리에이터 DB</span></div>
            <div class="mhm-item"><strong>5년+</strong><span>업계 경력</span></div>
          </div>

          <div class="mkt-hero-btns">
            <a href="#mkt-services" class="mkt-btn-ghost">
              <span>서비스 살펴보기</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    {/* ══ 라이트 테마 콘텐츠 래퍼 (히어로 제외) ══ */}
    <div class="svc-light">

    {/* ════════════════════════════════════════
        MARQUEE TRUST BAR — 무한 슬라이드
    ════════════════════════════════════════ */}
    <div class="mkt-marquee-bar">
      <div class="mkt-marquee-track">
        {[
          { emoji: 'flame', label: '바이럴 마케팅' },
          { emoji: 'star', label: '인플루언서' },
          { emoji: 'sprout', label: '체험단' },
          { emoji: 'message', label: '고객 리뷰' },
          { emoji: 'leaf', label: '올리브영' },
          { emoji: 'film', label: 'PPL' },
          { emoji: 'flame', label: '바이럴 마케팅' },
          { emoji: 'star', label: '인플루언서' },
          { emoji: 'sprout', label: '체험단' },
          { emoji: 'message', label: '고객 리뷰' },
          { emoji: 'leaf', label: '올리브영' },
          { emoji: 'film', label: 'PPL' },
        ].map((item, i) => (
          <span class="mkt-marquee-item" key={i}>
            <span class="mkt-marquee-dot"></span>
            <span class="mkt-marquee-emoji">{icon(item.emoji)}</span>
            {item.label}
          </span>
        ))}
      </div>
    </div>

    {/* ════════════════════════════════════════
        FEATURES — Why INAAD
    ════════════════════════════════════════ */}
    <section class="mkt-features-section">
      <div class="container">
        <div class="mkt-features-head reveal-up">
          <p class="mkt-feat-eyebrow">Why INAAD</p>
          <h2 class="mkt-feat-title">
            대행을 넘어,{' '}
            <span class="mkt-feat-accent">퍼널 전체를 책임지는 마케팅 파트너</span>
          </h2>
        </div>

        <div class="mkt-feat-grid">
          {[
            {
              num: '01',
              icon: 'target',
              title: '전략 설계 우선',
              desc: '실행보다 설계가 먼저입니다. 소비자 여정을 따라가며, 퍼널 단계마다 쓸 채널과 메시지를 정합니다.',
              color: '#38bdf8',
            },
            {
              num: '02',
              icon: 'link',
              title: '7가지 통합 솔루션',
              desc: '바이럴·인플루언서·체험단·리뷰·올리브영·PPL을 단독 또는 통합 퍼널로 운영합니다. 브랜드 목표에 맞게 조합합니다.',
              color: '#818cf8',
            },
            {
              num: '03',
              icon: 'chart',
              title: '성과 기반 운영',
              desc: '캠페인 중에도 데이터를 실시간 모니터링하고 최적화합니다.',
              color: '#34d399',
            },
          ].map((f, i) => (
            <article class="mkt-feat-card reveal-up" style={`transition-delay:${i * 0.12}s;--mfc:${f.color}`} key={f.num}>
              <div class="mfc-top">
                <div class="mfc-icon-wrap" style={`background: ${f.color}18; border-color: ${f.color}30`}>
                  <span class="mfc-icon">{icon(f.icon)}</span>
                </div>
                <span class="mfc-num" style={`color:${f.color}`}>{f.num}</span>
              </div>
              <h3 class="mfc-title">{f.title}</h3>
              <p class="mfc-desc">{f.desc}</p>
              <div class="mfc-line" style={`background: linear-gradient(90deg, ${f.color}, transparent)`}></div>
            </article>
          ))}
        </div>

        <p class="mkt-feat-sub mkt-feat-sub--below">
          채널이 아니라 '고객의 흐름'을 봅니다. 각 단계에 필요한 메시지와 접점을 정교하게 연결합니다.
        </p>
      </div>
    </section>

    {/* STATS BELT 제거 (다른 섹션에서 이미 사용) */}

    {/* ════════════════════════════════════════
        서비스 그리드
    ════════════════════════════════════════ */}
    <section class="section mkt-services-section" id="mkt-services">
      <div class="container">
        <div class="section-head reveal-up">
          <span class="sec-label">Our Services</span>
          <h2 class="sec-title">브랜드에 맞는<br /><em>마케팅을 골라보세요</em></h2>
          <p class="sec-sub">각 서비스는 독립적으로도, 통합 퍼널로도 운영할 수 있습니다.<br />어떤 조합이 최적인지 무료 상담으로 알아보세요.</p>
        </div>
        <div class="mkt-svc-img-grid">
          {[
            {
              icon: 'flame', href: '/marketing/viral', title: '바이럴 마케팅', tag: 'VIRAL',
              hook: '단 하루만에 브랜드가 퍼져야 할 때',
              sub:  '하루아침에 모든 피드에 올라오는 그 브랜드,\n바로 우리가 만듭니다.',
              img: '/static/svc-images/viral.png',
              accentColor: '#1a6bff',
            },
            {
              icon: 'star', href: '/marketing/influencer', title: '인플루언서 마케팅', tag: 'INFLUENCER',
              hook: '내 브랜드를 진짜처럼 말해줄 사람이 필요할 때',
              sub:  '1,520명의 크리에이터가\n브랜드를 대신 이야기합니다.',
              img: '/static/svc-images/influencer.png',
              accentColor: '#a855f7',
            },
            {
              icon: 'sprout', href: '/marketing/seeding', title: '체험단 마케팅', tag: 'SEEDING',
              hook: '리뷰가 없어서 구매를 망설이게 될 때',
              sub:  '실제 후기가 쌓이면\n소비자는 스스로 찾아옵니다.',
              img: '/static/svc-images/seeding.png', imgPos: 'center center',
              accentColor: '#10b981',
            },
            {
              icon: 'message', href: '/marketing/review', title: '리뷰 마케팅', tag: 'REVIEW',
              hook: '별점 하나가 매출을 좌우할 때',
              sub:  '신뢰는 숫자로 증명됩니다.\n리뷰가 곧 영업입니다.',
              img: '/static/svc-images/review.png',
              accentColor: '#f97316',
            },
            {
              icon: 'leaf', href: '/marketing/oliveyoung', title: '올리브영 마케팅', tag: 'OLIVE YOUNG',
              hook: '올리브영 입점은 했는데 팔리질 않을 때',
              sub:  '입점보다 중요한 건 노출,\n노출보다 중요한 건 전환입니다.',
              img: '/static/svc-images/oliveyoung.png',
              accentColor: '#03c75a',
            },
            {
              icon: 'film', href: '/marketing/ppl', title: 'PPL 마케팅', tag: 'PPL',
              hook: '광고인지 모르게 브랜드를 심고 싶을 때',
              sub:  '시청자가 건너뛰지 않는 순간,\n브랜드가 기억에 새겨집니다.',
              img: '/static/svc-images/ppl.png',
              accentColor: '#ef4444',
            },
          ].map((s, i) => (
            <a href={s.href} class="msig-card reveal-up" style={`transition-delay:${i * 0.08}s;--accent:${s.accentColor}`} key={s.href}>
              <div class="msig-img" style={`background-image:url('${s.img}');background-position:${'imgPos' in s ? (s as any).imgPos : 'center center'}`}></div>
              <div class="msig-overlay"></div>
              <div class="msig-accent-glow" style={`background: radial-gradient(circle at 50% 100%, ${s.accentColor}44 0%, transparent 65%)`}></div>
              <div class="msig-tag" style={`background:${s.accentColor}22;border-color:${s.accentColor}66`}>{s.tag}</div>
              <div class="msig-content">
                <div class="msig-icon">{icon(s.icon)}</div>
                <h3 class="msig-title">{s.title}</h3>
                <p class="msig-hook" style={`color:${s.accentColor}`}>{s.hook}</p>
                <p class="msig-sub">{s.sub.split('\n').map((line, li) => (<>{line}{li === 0 && <br />}</>))}</p>
                <div class="msig-arrow" style={`color:${s.accentColor}`}>
                  자세히 보기
                  <svg viewBox="0 0 24 24" fill="none" width="13" height="13"><path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </div>
              </div>
            </a>
          ))}

          {/* 8번째 — 상담 CTA 카드 (그리드 밸런스 + 전환 유도) */}
          <a href="/contact" class="msig-card msig-cta-card reveal-up" style="transition-delay:0.56s">
            <div class="msig-cta-bg"></div>
            <div class="msig-cta-glow"></div>
            <div class="msig-cta-inner">
              <div class="msig-cta-icon">
                <svg viewBox="0 0 24 24" fill="none"><path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.84z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </div>
              <p class="msig-cta-label">ALL-IN-ONE</p>
              <h3 class="msig-cta-title">7가지를<br />하나의 흐름으로</h3>
              <p class="msig-cta-sub">단독 운영도, 통합 퍼널도<br />브랜드에 맞게 설계합니다.</p>
              <span class="msig-cta-btn">
                맞춤 설계 문의
                <svg viewBox="0 0 24 24" fill="none" width="14" height="14"><path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>

    {/* ════════════════════════════════════════
        CTA — 풀 임팩트
    ════════════════════════════════════════ */}
    <section class="mkt-cta-section">
      <div class="cta-img-bg" aria-hidden="true" style="--cta-img:url('/static/images/cta-marketing.png')"></div>
      <div class="mkt-cta-bg-canvas-wrap">
        <div class="mkt-cta-glow mkt-cta-glow--left"></div>
        <div class="mkt-cta-glow mkt-cta-glow--right"></div>
        <div class="mkt-cta-grid-overlay"></div>
      </div>
      <div class="container">
        <div class="mkt-cta-inner reveal-up">
          <p class="mkt-cta-eyebrow">Next Step</p>
          <h2 class="mkt-cta-title">
            어떤 마케팅이 필요한지<br />
            <span class="mkt-cta-grad">모르겠다면?</span>
          </h2>
          <p class="mkt-cta-desc">
            무료 상담을 통해 브랜드에 가장 효과적인 퍼널 솔루션을 찾아드리고<br />
            전략 설계부터 실행까지 인애드컴퍼니가 함께하겠습니다.
          </p>
          <div class="mkt-cta-pills">
            <span>{icon('check')} 무료 상담</span>
            <span>{icon('check')} 전략 설계 포함</span>
            <span>{icon('check')} 24시간 내 회신</span>
          </div>
        </div>
      </div>
    </section>

    {/* ════════════════════════════════════════
        JS — 스크롤 리빌
    ════════════════════════════════════════ */}
    <script dangerouslySetInnerHTML={{__html: `
(function(){

  /* ══ 스크롤 리빌 ══ */
  var revEls = document.querySelectorAll('.reveal-up,.reveal-side--left,.reveal-side--right');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target); }
      });
    }, { threshold: 0.10 });
    revEls.forEach(function(el) { io.observe(el); });
  } else {
    revEls.forEach(function(el) { el.classList.add('revealed'); });
  }

})();
    `}} />
    </div>{/* /svc-light */}
  </>
)
