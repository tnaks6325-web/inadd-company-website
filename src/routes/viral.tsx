export const ViralPage = () => (
  <>
    {/* ════════════════════════════════════════
        HERO — 풀스크린 + 파티클 + 타이핑 텍스트
    ════════════════════════════════════════ */}
    <section class="mkt-hero">
      {/* 파티클 캔버스 */}
      <canvas id="mktParticle" class="mkt-hero-canvas"></canvas>

      {/* 배경 글로우 오브 */}
      <div class="mkt-hero-orb mkt-hero-orb--1"></div>
      <div class="mkt-hero-orb mkt-hero-orb--2"></div>
      <div class="mkt-hero-orb mkt-hero-orb--3"></div>

      <div class="container mkt-hero-inner">
        {/* 왼쪽 텍스트 */}
        <div class="mkt-hero-text">
          <div class="mkt-hero-badge">
            <span class="mhb-dot"></span>
            FUNNEL MARKETING
          </div>

          <h1 class="mkt-hero-title">
            <span class="mht-line mht-line--1">인애드컴퍼니</span>
            <span class="mht-line mht-line--2">
              <em class="mht-accent">퍼널 마케팅</em>
            </span>
          </h1>

          {/* 타이핑 텍스트 */}
          <div class="mkt-hero-typing-wrap">
            <span class="mht-static">우리 브랜드를 </span>
            <span class="mht-typing" id="mktTyping"></span>
            <span class="mht-cursor">|</span>
          </div>

          <p class="mkt-hero-desc">
            단순한 노출을 넘어 <strong>소비자의 행동을 설계</strong>합니다.<br />
            검색 → 발견 → 신뢰 → 구매 → 재방문까지,<br />
            인애드컴퍼니가 퍼널 전 단계를 책임집니다.
          </p>

          <div class="mkt-hero-btns">
            <a href="/contact" class="hero-cta-btn primary mkt-hero-cta">
              <span>무료 전략 상담받기</span>
              <svg viewBox="0 0 24 24" fill="none"><path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </a>
            <a href="#mkt-services" class="mkt-hero-scroll-btn">
              <span>서비스 살펴보기</span>
              <svg viewBox="0 0 24 24" fill="none" width="16" height="16"><path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </a>
          </div>
        </div>

        {/* 오른쪽 — 플로팅 지표 카드 */}
        <div class="mkt-hero-cards">
          <div class="mhc-card mhc-card--1">
            <div class="mhc-icon">📈</div>
            <div class="mhc-body">
              <strong>+580%</strong>
              <span>최대 매출 증가</span>
            </div>
          </div>
          <div class="mhc-card mhc-card--2">
            <div class="mhc-icon">👁</div>
            <div class="mhc-body">
              <strong>2,800만+</strong>
              <span>평균 캠페인 도달</span>
            </div>
          </div>
          <div class="mhc-card mhc-card--3">
            <div class="mhc-icon">🔁</div>
            <div class="mhc-body">
              <strong>98%</strong>
              <span>재계약률</span>
            </div>
          </div>
          <div class="mhc-card mhc-card--4">
            <div class="mhc-icon">🏆</div>
            <div class="mhc-body">
              <strong>320+</strong>
              <span>완료 프로젝트</span>
            </div>
          </div>
          {/* 퍼널 흐름 시각화 */}
          <div class="mhc-funnel">
            <div class="mhcf-step mhcf-step--1"><span>인지</span></div>
            <div class="mhcf-arrow">↓</div>
            <div class="mhcf-step mhcf-step--2"><span>탐색</span></div>
            <div class="mhcf-arrow">↓</div>
            <div class="mhcf-step mhcf-step--3"><span>신뢰</span></div>
            <div class="mhcf-arrow">↓</div>
            <div class="mhcf-step mhcf-step--4"><span>구매</span></div>
          </div>
        </div>
      </div>

      {/* 하단 스크롤 힌트 */}
      <div class="mkt-hero-scroll-hint">
        <div class="mhsh-mouse">
          <div class="mhsh-wheel"></div>
        </div>
      </div>
    </section>

    {/* ════════════════════════════════════════
        숫자 카운터 스트립
    ════════════════════════════════════════ */}
    <div class="mkt-stats-strip">
      <div class="mkt-stats-inner">
        {[
          { num: '7', suffix: '가지', label: '마케팅 솔루션' },
          { num: '320', suffix: '+', label: '완료 프로젝트' },
          { num: '98', suffix: '%', label: '재계약률' },
          { num: '2800', suffix: '만+', label: '평균 캠페인 도달' },
          { num: '5', suffix: '년+', label: '업계 전문 경력' },
        ].map(s => (
          <div class="mss-item" key={s.label}>
            <strong class="mss-num" data-target={s.num}>{s.num}</strong>
            <span class="mss-suffix">{s.suffix}</span>
            <span class="mss-label">{s.label}</span>
          </div>
        ))}
      </div>
    </div>

    {/* ════════════════════════════════════════
        퍼널 스토리 섹션 — 스크롤 페이드인
    ════════════════════════════════════════ */}
    <section class="mkt-funnel-story">
      <div class="container">
        <div class="mfs-header reveal-up">
          <span class="sec-label">THE FUNNEL</span>
          <h2 class="sec-title">광고를 보는 것과<br /><em>행동하게 만드는 것</em>은 다릅니다</h2>
          <p class="sec-sub">인애드컴퍼니는 단순 노출이 아닌, 소비자가 자연스럽게 구매로 이동하는<br />퍼널 구조 전체를 설계하고 실행합니다.</p>
        </div>

        <div class="mfs-steps">
          {[
            {
              step: '01',
              phase: '인지 · AWARENESS',
              title: '소비자가 먼저 찾아오게 합니다',
              desc: '바이럴·인플루언서·PPL을 통해 브랜드가 자연스럽게 소비자의 일상에 스며듭니다. 광고처럼 보이지 않는 콘텐츠가 진짜 인지도를 만듭니다.',
              icon: '🔥',
              color: 'rgba(255,80,80,0.15)',
              border: 'rgba(255,80,80,0.3)',
            },
            {
              step: '02',
              phase: '탐색 · CONSIDERATION',
              title: '검색하면 반드시 우리가 나옵니다',
              desc: 'SEO·블로그·커뮤니티 최적화로 소비자가 정보를 찾는 모든 접점에서 브랜드가 노출됩니다. 검색 = 발견 = 관심으로 이어집니다.',
              icon: '🔍',
              color: 'rgba(80,160,255,0.15)',
              border: 'rgba(80,160,255,0.3)',
            },
            {
              step: '03',
              phase: '신뢰 · TRUST',
              title: '리뷰와 후기가 구매를 결정합니다',
              desc: '시딩·리뷰 마케팅으로 실제 사용자의 진정성 있는 목소리를 만들어냅니다. 소비자는 광고보다 같은 소비자의 말을 믿습니다.',
              icon: '💬',
              color: 'rgba(80,200,120,0.15)',
              border: 'rgba(80,200,120,0.3)',
            },
            {
              step: '04',
              phase: '전환 · CONVERSION',
              title: '올리브영·플랫폼 최적화로 매출을 폭발시킵니다',
              desc: '올리브영 마케팅·리뷰 관리·플랫폼 SEO로 장바구니 담기부터 결제까지의 여정을 최적화합니다. 같은 유입으로 더 많이 팝니다.',
              icon: '🛒',
              color: 'rgba(255,180,50,0.15)',
              border: 'rgba(255,180,50,0.3)',
            },
          ].map((s, i) => (
            <div class={`mfs-step reveal-side reveal-side--${i % 2 === 0 ? 'left' : 'right'}`} key={s.step}>
              <div class="mfs-step-num">{s.step}</div>
              <div class="mfs-step-card" style={`background:${s.color};border-color:${s.border}`}>
                <div class="mfs-step-icon">{s.icon}</div>
                <div class="mfs-step-body">
                  <span class="mfs-phase">{s.phase}</span>
                  <h3 class="mfs-title">{s.title}</h3>
                  <p class="mfs-desc">{s.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ════════════════════════════════════════
        서비스 그리드 — 이미지 풀카버 + 호버 줌
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
              icon: '🔥',
              href: '/marketing/viral',
              title: '바이럴 마케팅',
              tag: 'VIRAL',
              desc: '맘카페·커뮤니티 기반의 자연스러운 확산으로 브랜드 인지도를 폭발적으로 높입니다.',
              kpis: [{ val: '2,800만+', label: '평균 도달' }, { val: '48h', label: '최단 바이럴' }],
              img: '/static/svc-images/viral.png',
            },
            {
              icon: '⭐',
              href: '/marketing/influencer',
              title: '인플루언서 마케팅',
              tag: 'INFLUENCER',
              desc: '검증된 1,200+ 크리에이터 네트워크로 타겟 소비자에게 진정성 있는 메시지를 전달합니다.',
              kpis: [{ val: '1,200+', label: '파트너 크리에이터' }, { val: '+580%', label: '최대 매출 증가' }],
              img: '/static/svc-images/influencer.png',
            },
            {
              icon: '🌱',
              href: '/marketing/seeding',
              title: '시딩 캠페인',
              tag: 'SEEDING',
              desc: '핵심 타겟에게 샘플을 전달해 진정성 있는 후기와 입소문 생태계를 구축합니다.',
              kpis: [{ val: '68%', label: '후기 전환율' }, { val: '+230%', label: '리뷰 전환 효과' }],
              img: '/static/svc-images/seeding.png',
              imgPos: 'center center',
            },
            {
              icon: '🔍',
              href: '/marketing/seo',
              title: 'SEO 마케팅',
              tag: 'SEO',
              desc: '소비자가 검색하는 순간 브랜드가 먼저 보이도록 키워드부터 콘텐츠까지 설계합니다.',
              kpis: [{ val: 'TOP3', label: '검색 순위 달성' }, { val: '+1,200%', label: '검색량 증가' }],
              img: '/static/svc-images/seo.png',
              imgPos: 'right center',
            },
            {
              icon: '💬',
              href: '/marketing/review',
              title: '리뷰 마케팅',
              tag: 'REVIEW',
              desc: '진정성 있는 소비자 리뷰로 브랜드 신뢰를 쌓고 구매 전환율을 극적으로 높입니다.',
              kpis: [{ val: '+230%', label: '리뷰 전환율' }, { val: '3×', label: '브랜드 신뢰도' }],
              img: '/static/svc-images/review.png',
            },
            {
              icon: '💚',
              href: '/marketing/oliveyoung',
              title: '올리브영 마케팅',
              tag: 'OLIVE YOUNG',
              desc: '국내 최대 H&B 채널 올리브영에서 브랜드를 단기간에 폭발적으로 성장시킵니다.',
              kpis: [{ val: '+340%', label: '채널 매출 증가' }, { val: '2.4×', label: '3개월 성장' }],
              img: '/static/svc-images/oliveyoung.png',
            },
            {
              icon: '🎬',
              href: '/marketing/ppl',
              title: 'PPL 마케팅',
              tag: 'PPL',
              desc: '드라마·유튜브 콘텐츠 속 자연스러운 브랜드 노출로 수천만 시청자에게 각인됩니다.',
              kpis: [{ val: '5,000만+', label: '누적 시청자' }, { val: '3×', label: '광고 전환율' }],
              img: '/static/svc-images/ppl.png',
            },
          ].map((s, i) => (
            <a href={s.href} class="msig-card reveal-up" style={`transition-delay:${i * 0.08}s`} key={s.href}>
              {/* 배경 이미지 — 호버 시 줌 */}
              <div class="msig-img" style={`background-image:url('${s.img}');background-position:${'imgPos' in s ? (s as any).imgPos : 'center center'}`}></div>
              {/* 그라디언트 오버레이 */}
              <div class="msig-overlay"></div>
              {/* 상단 태그 */}
              <div class="msig-tag">{s.tag}</div>
              {/* 하단 콘텐츠 */}
              <div class="msig-content">
                <div class="msig-icon">{s.icon}</div>
                <h3 class="msig-title">{s.title}</h3>
                <p class="msig-desc">{s.desc}</p>
                <div class="msig-kpi">
                  {s.kpis.map(k => (
                    <div class="msig-kpi-item" key={k.label}>
                      <strong>{k.val}</strong>
                      <span>{k.label}</span>
                    </div>
                  ))}
                </div>
                <div class="msig-arrow">
                  자세히 보기
                  <svg viewBox="0 0 24 24" fill="none" width="14" height="14"><path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>

    {/* ════════════════════════════════════════
        CTA
    ════════════════════════════════════════ */}
    <section class="svc-cta-section">
      <div class="container">
        <div class="svc-cta-inner">
          <div class="svc-cta-text">
            <h2>어떤 마케팅이 필요한지<br /><em>모르겠다면?</em></h2>
            <p>무료 상담을 통해 우리 브랜드에 가장 효과적인 퍼널 솔루션을 찾아드립니다.</p>
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

    {/* ════════════════════════════════════════
        JS — 파티클 + 타이핑 + 스크롤 리빌
    ════════════════════════════════════════ */}
    <script dangerouslySetInnerHTML={{__html: `
(function(){
  /* ── 1. 파티클 캔버스 ── */
  var canvas = document.getElementById('mktParticle');
  if (canvas) {
    var ctx = canvas.getContext('2d');
    var W, H, particles = [];
    function resize(){ W = canvas.width = window.innerWidth; H = canvas.height = canvas.parentElement.offsetHeight || window.innerHeight; }
    resize();
    window.addEventListener('resize', resize);

    for(var i=0;i<70;i++){
      particles.push({
        x: Math.random()*1920, y: Math.random()*900,
        r: Math.random()*1.5+0.3,
        dx: (Math.random()-0.5)*0.3, dy: (Math.random()-0.5)*0.3,
        o: Math.random()*0.5+0.1
      });
    }

    function drawParticles(){
      ctx.clearRect(0,0,W,H);
      particles.forEach(function(p){
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle = 'rgba(100,160,255,'+p.o+')';
        ctx.fill();
        p.x+=p.dx; p.y+=p.dy;
        if(p.x<0||p.x>W) p.dx*=-1;
        if(p.y<0||p.y>H) p.dy*=-1;
      });
      /* 선 연결 */
      for(var a=0;a<particles.length;a++){
        for(var b=a+1;b<particles.length;b++){
          var dist=Math.hypot(particles[a].x-particles[b].x,particles[a].y-particles[b].y);
          if(dist<120){
            ctx.beginPath();
            ctx.moveTo(particles[a].x,particles[a].y);
            ctx.lineTo(particles[b].x,particles[b].y);
            ctx.strokeStyle='rgba(100,160,255,'+(0.06*(1-dist/120))+')';
            ctx.lineWidth=0.5;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(drawParticles);
    }
    drawParticles();
  }

  /* ── 2. 타이핑 효과 ── */
  var el = document.getElementById('mktTyping');
  if(el){
    var words = ['발견하게 합니다','신뢰하게 합니다','구매하게 합니다','성장시킵니다'];
    var wi=0, ci=0, deleting=false;
    function type(){
      var word = words[wi];
      if(!deleting){
        el.textContent = word.slice(0,++ci);
        if(ci===word.length){ deleting=true; setTimeout(type,1800); return; }
      } else {
        el.textContent = word.slice(0,--ci);
        if(ci===0){ deleting=false; wi=(wi+1)%words.length; setTimeout(type,400); return; }
      }
      setTimeout(type, deleting?50:90);
    }
    setTimeout(type,800);
  }

  /* ── 3. 스크롤 리빌 (IntersectionObserver) ── */
  var revealEls = document.querySelectorAll('.reveal-up, .reveal-side--left, .reveal-side--right');
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){ e.target.classList.add('revealed'); io.unobserve(e.target); }
      });
    },{threshold:0.15});
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('revealed'); });
  }

  /* ── 4. 플로팅 카드 마우스 패럴랙스 ── */
  var hero = document.querySelector('.mkt-hero');
  if(hero){
    hero.addEventListener('mousemove',function(e){
      var rect=hero.getBoundingClientRect();
      var mx=(e.clientX-rect.left)/rect.width-0.5;
      var my=(e.clientY-rect.top)/rect.height-0.5;
      var cards=document.querySelectorAll('.mhc-card');
      cards.forEach(function(card,i){
        var depth=(i+1)*4;
        card.style.transform='translate('+(mx*depth)+'px,'+(my*depth)+'px)';
      });
    });
    hero.addEventListener('mouseleave',function(){
      document.querySelectorAll('.mhc-card').forEach(function(c){ c.style.transform=''; });
    });
  }

  /* ── 5. 숫자 카운터 ── */
  var nums = document.querySelectorAll('.mss-num');
  var counted = false;
  function countUp(){
    if(counted) return;
    var strip = document.querySelector('.mkt-stats-strip');
    if(!strip) return;
    var rect = strip.getBoundingClientRect();
    if(rect.top < window.innerHeight - 80){
      counted = true;
      nums.forEach(function(n){
        var target = parseInt(n.getAttribute('data-target'));
        var start = 0, duration = 1400;
        var startTime = null;
        function step(ts){
          if(!startTime) startTime=ts;
          var prog = Math.min((ts-startTime)/duration,1);
          var ease = 1-Math.pow(1-prog,3);
          n.textContent = Math.floor(ease*target);
          if(prog<1) requestAnimationFrame(step);
          else n.textContent = target;
        }
        requestAnimationFrame(step);
      });
    }
  }
  window.addEventListener('scroll',countUp,{passive:true});
  countUp();

})();
    `}} />
  </>
)
