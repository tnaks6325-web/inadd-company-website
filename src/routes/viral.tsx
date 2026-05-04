export const ViralPage = () => (
  <>
    {/* ════════════════════════════════════════
        HERO — Three.js 3D 배경 + glassmorphism
    ════════════════════════════════════════ */}
    <section class="mkt-hero">
      <canvas id="mkt3dCanvas" class="mkt-3d-bg-canvas"></canvas>
      <div class="mkt-hero-overlay"></div>
      <div class="mkt-hero-grid"></div>

      <div class="container mkt-hero-layout">

        {/* 좌측 — 텍스트 */}
        <div class="mkt-hero-left">
          <div class="mkt-hero-badge">
            <span class="mhb-dot"></span>
            FUNNEL MARKETING AGENCY
          </div>

          <h1 class="mkt-hero-title">
            <span class="mht-line mht-line--1">브랜드를</span>
            <span class="mht-line mht-line--2">
              <em class="mht-accent">성장</em>시키는
            </span>
            <span class="mht-line mht-line--3">퍼널 전략</span>
          </h1>

          <div class="mkt-hero-typing-wrap">
            <span class="mht-static">소비자를 </span>
            <span class="mht-typing" id="mktTyping"></span>
            <span class="mht-cursor">|</span>
          </div>

          <p class="mkt-hero-desc">
            단순한 노출을 넘어 <strong>소비자의 행동을 설계</strong>합니다.<br />
            검색 → 발견 → 신뢰 → 구매 → 재방문까지,<br />
            인애드컴퍼니가 퍼널 전 단계를 책임집니다.
          </p>

          <div class="mkt-hero-btns">
            <a href="/contact" class="mkt-btn-primary">
              <span>무료 전략 상담받기</span>
              <svg viewBox="0 0 24 24" fill="none"><path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </a>
            <a href="#mkt-services" class="mkt-btn-ghost">
              <span>서비스 살펴보기</span>
            </a>
          </div>

          {/* 스탯 4개 */}
          <div class="mkt-hero-stats">
            {[
              { value: '320+',   label: '완료 프로젝트' },
              { value: '98%',    label: '재계약률' },
              { value: '2,800만+', label: '평균 도달' },
              { value: '5년+',   label: '업계 경력' },
            ].map(s => (
              <div class="mhs-item" key={s.label}>
                <p class="mhs-value">{s.value}</p>
                <p class="mhs-label">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 우측 — glassmorphism 플로팅 카드 */}
        <div class="mkt-hero-right">
          {/* 카드 뒤 glow 오브 */}
          <div class="mhr-orb mhr-orb--blue"></div>
          <div class="mhr-orb mhr-orb--purple"></div>

          <div class="mhr-card mhr-card--1">
            <div class="mhrc-icon-row">
              <span class="mhrc-icon">📡</span>
              <p class="mhrc-eyebrow">REACH</p>
            </div>
            <p class="mhrc-value">2,800<span>만+</span></p>
            <p class="mhrc-desc">평균 캠페인 도달 수치<br />퍼널 전략으로 도달 폭발</p>
            <div class="mhrc-bar"><div class="mhrc-bar-fill" style="width:87%"></div></div>
          </div>

          <div class="mhr-card mhr-card--2">
            <div class="mhrc-icon-row">
              <span class="mhrc-icon">📈</span>
              <p class="mhrc-eyebrow">RESULT</p>
            </div>
            <p class="mhrc-value">+580<span>%</span></p>
            <p class="mhrc-desc">최대 매출 증가율<br />통합 퍼널 캠페인 기준</p>
            <div class="mhrc-bar"><div class="mhrc-bar-fill" style="width:94%"></div></div>
          </div>

          <div class="mhr-card mhr-card--3">
            <div class="mhrc-icon-row">
              <span class="mhrc-icon">🤝</span>
              <p class="mhrc-eyebrow">TRUST</p>
            </div>
            <p class="mhrc-value">98<span>%</span></p>
            <p class="mhrc-desc">재계약률<br />성과가 증명하는 신뢰도</p>
            <div class="mhrc-bar"><div class="mhrc-bar-fill" style="width:98%"></div></div>
          </div>
        </div>
      </div>

      {/* 스크롤 힌트 */}
      <div class="mkt-hero-scroll-hint">
        <div class="mhsh-mouse"><div class="mhsh-wheel"></div></div>
      </div>
    </section>

    {/* ════════════════════════════════════════
        MARQUEE TRUST BAR — 무한 슬라이드
    ════════════════════════════════════════ */}
    <div class="mkt-marquee-bar">
      <div class="mkt-marquee-track">
        {['바이럴 마케팅', '인플루언서', '시딩 캠페인', 'SEO 마케팅', '고객 리뷰', '올리브영', 'PPL', '바이럴 마케팅', '인플루언서', '시딩 캠페인', 'SEO 마케팅', '고객 리뷰', '올리브영', 'PPL'].map((tag, i) => (
          <span class="mkt-marquee-item" key={i}>
            <span class="mkt-marquee-dot"></span>
            {tag}
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
            단순 대행사가 아닌<br />
            <span class="mkt-feat-accent">퍼널을 설계하는 파트너</span>
          </h2>
          <p class="mkt-feat-sub">
            노출에서 끝나지 않고, 소비자의 행동 흐름을 데이터로 설계합니다.
          </p>
        </div>

        <div class="mkt-feat-grid">
          {[
            {
              num: '01',
              icon: '🎯',
              title: '전략 설계 우선',
              desc: '캠페인 전 소비자 여정을 분석하고, 각 퍼널 단계별 최적 채널과 메시지를 설계합니다. 실행 전 전략이 먼저입니다.',
              color: '#38bdf8',
            },
            {
              num: '02',
              icon: '🔗',
              title: '7가지 통합 솔루션',
              desc: '바이럴·인플루언서·시딩·SEO·리뷰·올리브영·PPL을 단독 또는 통합 퍼널로 운영합니다. 브랜드 목표에 맞게 조합합니다.',
              color: '#818cf8',
            },
            {
              num: '03',
              icon: '📊',
              title: '성과 기반 운영',
              desc: '캠페인 중에도 데이터를 실시간 모니터링하고 최적화합니다. 98% 재계약률이 결과로 증명합니다.',
              color: '#34d399',
            },
          ].map((f, i) => (
            <article class="mkt-feat-card reveal-up" style={`transition-delay:${i * 0.12}s`} key={f.num}>
              <div class="mfc-top">
                <div class="mfc-icon-wrap" style={`background: ${f.color}18; border-color: ${f.color}30`}>
                  <span class="mfc-icon">{f.icon}</span>
                </div>
                <span class="mfc-num" style={`color:${f.color}`}>{f.num}</span>
              </div>
              <h3 class="mfc-title">{f.title}</h3>
              <p class="mfc-desc">{f.desc}</p>
              <div class="mfc-line" style={`background: linear-gradient(90deg, ${f.color}, transparent)`}></div>
            </article>
          ))}
        </div>
      </div>
    </section>

    {/* ════════════════════════════════════════
        STATS BELT — 숫자 임팩트
    ════════════════════════════════════════ */}
    <div class="mkt-stats-belt">
      <div class="container">
        <div class="mkt-stats-belt-inner">
          {[
            { val: '320+',  suffix: '',  label: '완료 프로젝트', icon: '🏆' },
            { val: '98',    suffix: '%', label: '재계약률',      icon: '🔄' },
            { val: '1,200', suffix: '+', label: '파트너 크리에이터', icon: '🌟' },
            { val: '5',     suffix: '년+', label: '업계 전문 경력', icon: '📅' },
          ].map(s => (
            <div class="msb-item" key={s.label}>
              <span class="msb-icon">{s.icon}</span>
              <p class="msb-value">{s.val}<span class="msb-suffix">{s.suffix}</span></p>
              <p class="msb-label">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* ════════════════════════════════════════
        서비스 스크롤 스택
    ════════════════════════════════════════ */}
    <section class="section mkt-services-section ss-section" id="mkt-services">
      <div class="container">
        <div class="section-head reveal-up ss-section-head">
          <span class="sec-label">Our Services</span>
          <h2 class="sec-title">브랜드에 맞는<br /><em>마케팅을 골라보세요</em></h2>
          <p class="sec-sub">각 서비스는 독립적으로도, 통합 퍼널로도 운영할 수 있습니다.<br />어떤 조합이 최적인지 무료 상담으로 알아보세요.</p>
        </div>
      </div>

      {/* ── 스크롤 스택 영역 ── */}
      <div class="ss-container" id="ss-container">
        {[
          {
            icon: '🔥', href: '/marketing/viral', title: '바이럴 마케팅', tag: 'VIRAL',
            desc: '맘카페·커뮤니티 기반의 자연스러운 확산으로 브랜드 인지도를 폭발적으로 높입니다.',
            kpis: [{ val: '2,800만+', label: '평균 도달' }, { val: '48h', label: '최단 바이럴' }],
            img: '/static/svc-images/viral.png',
            accentColor: '#1a6bff',
          },
          {
            icon: '⭐', href: '/marketing/influencer', title: '인플루언서 마케팅', tag: 'INFLUENCER',
            desc: '검증된 1,200+ 크리에이터 네트워크로 타겟 소비자에게 진정성 있는 메시지를 전달합니다.',
            kpis: [{ val: '1,200+', label: '파트너 크리에이터' }, { val: '+580%', label: '최대 매출 증가' }],
            img: '/static/svc-images/influencer.png',
            accentColor: '#a855f7',
          },
          {
            icon: '🌱', href: '/marketing/seeding', title: '시딩 캠페인', tag: 'SEEDING',
            desc: '핵심 타겟에게 샘플을 전달해 진정성 있는 후기와 입소문 생태계를 구축합니다.',
            kpis: [{ val: '68%', label: '후기 전환율' }, { val: '+230%', label: '리뷰 전환 효과' }],
            img: '/static/svc-images/seeding.png',
            accentColor: '#10b981',
          },
          {
            icon: '🔍', href: '/marketing/seo', title: 'SEO 마케팅', tag: 'SEO',
            desc: '소비자가 검색하는 순간 브랜드가 먼저 보이도록 키워드부터 콘텐츠까지 설계합니다.',
            kpis: [{ val: 'TOP3', label: '검색 순위 달성' }, { val: '+1,200%', label: '검색량 증가' }],
            img: '/static/svc-images/seo.png',
            accentColor: '#eab308',
          },
          {
            icon: '💬', href: '/marketing/review', title: '리뷰 마케팅', tag: 'REVIEW',
            desc: '진정성 있는 소비자 리뷰로 브랜드 신뢰를 쌓고 구매 전환율을 극적으로 높입니다.',
            kpis: [{ val: '+230%', label: '리뷰 전환율' }, { val: '3×', label: '브랜드 신뢰도' }],
            img: '/static/svc-images/review.png',
            accentColor: '#f97316',
          },
          {
            icon: '💚', href: '/marketing/oliveyoung', title: '올리브영 마케팅', tag: 'OLIVE YOUNG',
            desc: '국내 최대 H&B 채널 올리브영에서 브랜드를 단기간에 폭발적으로 성장시킵니다.',
            kpis: [{ val: '+340%', label: '채널 매출 증가' }, { val: '2.4×', label: '3개월 성장' }],
            img: '/static/svc-images/oliveyoung.png',
            accentColor: '#03c75a',
          },
          {
            icon: '🎬', href: '/marketing/ppl', title: 'PPL 마케팅', tag: 'PPL',
            desc: '드라마·유튜브 콘텐츠 속 자연스러운 브랜드 노출로 수천만 시청자에게 각인됩니다.',
            kpis: [{ val: '5,000만+', label: '누적 시청자' }, { val: '3×', label: '광고 전환율' }],
            img: '/static/svc-images/ppl.png',
            accentColor: '#ef4444',
          },
        ].map((s, i) => (
          <div class="ss-item" key={s.href}>
            <a href={s.href} class="ss-card" style={`--accent:${s.accentColor}`}>
              <div class="ss-card-inner">
                {/* 왼쪽: 이미지 */}
                <div class="ss-card-img" style={`background-image:url('${s.img}')`}></div>
                {/* 오른쪽: 콘텐츠 */}
                <div class="ss-card-body">
                  <div class="ss-card-meta">
                    <span class="ss-card-tag">{s.tag}</span>
                    <span class="ss-card-num">0{i + 1} / 07</span>
                  </div>
                  <div class="ss-card-title-row">
                    <span class="ss-card-icon">{s.icon}</span>
                    <h3 class="ss-card-title">{s.title}</h3>
                  </div>
                  <p class="ss-card-desc">{s.desc}</p>
                  <div class="ss-card-kpis">
                    {s.kpis.map(k => (
                      <div class="ss-card-kpi" key={k.label}>
                        <strong>{k.val}</strong>
                        <span>{k.label}</span>
                      </div>
                    ))}
                  </div>
                  <div class="ss-card-cta">
                    자세히 보기
                    <svg viewBox="0 0 24 24" fill="none" width="13" height="13">
                      <path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </section>

    {/* ════════════════════════════════════════
        CTA — 풀 임팩트
    ════════════════════════════════════════ */}
    <section class="mkt-cta-section">
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
            무료 상담을 통해 브랜드에 가장 효과적인 퍼널 솔루션을 찾아드립니다.<br />
            전략 설계부터 실행까지 인애드컴퍼니가 함께합니다.
          </p>
          <div class="mkt-cta-pills">
            <span>✅ 무료 상담</span>
            <span>✅ 전략 설계 포함</span>
            <span>✅ 24시간 내 회신</span>
          </div>
          <div class="mkt-cta-btns">
            <a href="/contact" class="mkt-btn-primary">
              <span>무료 상담 신청하기</span>
              <svg viewBox="0 0 24 24" fill="none"><path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </a>
            <button type="button" class="mkt-btn-outline" onclick="openCallModal()">
              <span>📞 바로 전화하기</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    {/* ════════════════════════════════════════
        JS — Three.js 배경 + 타이핑 + 스크롤 리빌
    ════════════════════════════════════════ */}
    <script dangerouslySetInnerHTML={{__html: `
(function(){

  /* ══ THREE.JS 배경 ══ */
  var threeScript = document.createElement('script');
  threeScript.src = 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js';
  threeScript.onload = initBgScene;
  document.head.appendChild(threeScript);

  function initBgScene() {
    var canvas = document.getElementById('mkt3dCanvas');
    if (!canvas) return;
    var W = window.innerWidth;
    var H = canvas.parentElement.offsetHeight || window.innerHeight;

    var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x020814, 1);

    var scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020814, 0.032);
    var camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 100);
    camera.position.set(0, 0, 9);

    scene.add(new THREE.AmbientLight(0xffffff, 0.18));
    var blueKey = new THREE.PointLight(0x1a6bff, 8, 20);
    blueKey.position.set(-3, 3, 4); scene.add(blueKey);
    var tealFill = new THREE.PointLight(0x00d4a8, 5, 16);
    tealFill.position.set(4, -2, 3); scene.add(tealFill);
    var purpleRim = new THREE.PointLight(0x8844ff, 4, 14);
    purpleRim.position.set(0, -4, 2); scene.add(purpleRim);

    /* 구체들 — 화면 전체에 넓게 분산 */
    var sphereDefs = [
      { p: [-4.5,  2.5,  -1.0], r: 0.90, col: 0x1a6bff, emi: 0x051530 },
      { p: [ 4.8,  1.8,  -2.0], r: 0.70, col: 0x00b4d8, emi: 0x002233 },
      { p: [-3.2, -2.4,   0.5], r: 0.55, col: 0x00d4a8, emi: 0x002220 },
      { p: [ 3.6, -2.8,  -1.5], r: 0.45, col: 0x8844ff, emi: 0x180930 },
      { p: [ 0.8,  3.8,  -3.0], r: 0.38, col: 0xff6b35, emi: 0x3a1200 },
      { p: [-1.5, -4.0,  -2.0], r: 0.30, col: 0x38bdf8, emi: 0x001828 },
    ];
    var spheres = sphereDefs.map(function(d) {
      var geo = new THREE.SphereGeometry(d.r, 48, 48);
      var mat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(d.col),
        emissive: new THREE.Color(d.emi),
        emissiveIntensity: 0.5, metalness: 0.75, roughness: 0.12
      });
      var mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(d.p[0], d.p[1], d.p[2]);
      mesh.userData.base = d.p.slice();
      scene.add(mesh);
      return mesh;
    });

    /* 연결 파이버 — 분산 배치된 구체들 연결 */
    [[0,1],[1,2],[2,3],[3,4],[4,5],[0,2],[1,3]].forEach(function(pair) {
      var a = new THREE.Vector3(sphereDefs[pair[0]].p[0], sphereDefs[pair[0]].p[1], sphereDefs[pair[0]].p[2]);
      var b = new THREE.Vector3(sphereDefs[pair[1]].p[0], sphereDefs[pair[1]].p[1], sphereDefs[pair[1]].p[2]);
      var pts = [];
      for (var i = 0; i <= 20; i++) {
        var t = i / 20;
        var v = new THREE.Vector3().lerpVectors(a, b, t);
        v.z += Math.sin(t * Math.PI) * 0.5;
        pts.push(v);
      }
      var curve = new THREE.CatmullRomCurve3(pts);
      scene.add(new THREE.Mesh(
        new THREE.TubeGeometry(curve, 24, 0.010, 6, false),
        new THREE.MeshBasicMaterial({ color: 0x3377ff, transparent: true, opacity: 0.16 })
      ));
    });

    /* 파티클 */
    var pN = 1200, pBuf = new Float32Array(pN * 3);
    for (var i = 0; i < pN; i++) {
      pBuf[i*3]   = (Math.random()-0.5)*28;
      pBuf[i*3+1] = (Math.random()-0.5)*18;
      pBuf[i*3+2] = (Math.random()-0.5)*14 - 4;
    }
    var pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pBuf, 3));
    scene.add(new THREE.Points(pGeo, new THREE.PointsMaterial({
      color: 0x3366ff, size: 0.038, transparent: true, opacity: 0.50
    })));

    /* 오빗 링 */
    var ringA = new THREE.Mesh(
      new THREE.TorusGeometry(4.2, 0.011, 16, 180),
      new THREE.MeshBasicMaterial({ color: 0x1a6bff, transparent: true, opacity: 0.10 })
    );
    ringA.rotation.set(Math.PI/5, 0, Math.PI/8); scene.add(ringA);
    var ringB = new THREE.Mesh(
      new THREE.TorusGeometry(6.0, 0.007, 16, 240),
      new THREE.MeshBasicMaterial({ color: 0x00d4a8, transparent: true, opacity: 0.07 })
    );
    ringB.rotation.set(-Math.PI/4, Math.PI/6, 0); scene.add(ringB);

    /* 리사이즈 */
    window.addEventListener('resize', function() {
      W = window.innerWidth;
      H = canvas.parentElement.offsetHeight || window.innerHeight;
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      renderer.setSize(W, H);
    });

    /* 애니메이션 — 마우스 패럴랙스 없음, 자동 회전만 */
    var clock = new THREE.Clock();
    (function animate() {
      requestAnimationFrame(animate);
      var t = clock.getElapsedTime();

      /* 씬 자체 느린 회전 */
      scene.rotation.y = t * 0.04;
      scene.rotation.x = Math.sin(t * 0.025) * 0.08;

      /* 각 구체 독립 둥둥 */
      spheres.forEach(function(s, i) {
        var b = s.userData.base;
        var spd  = 0.28 + i * 0.09;
        var amp  = 0.30 + i * 0.06;
        s.position.set(
          b[0] + Math.cos(t * spd + i * 1.7) * amp,
          b[1] + Math.sin(t * spd * 0.75 + i * 0.9) * amp,
          b[2] + Math.sin(t * 0.4 + i * 1.2) * 0.20
        );
        s.rotation.x += 0.002 + i * 0.001;
        s.rotation.y += 0.003 + i * 0.0015;
        s.scale.setScalar(1 + Math.sin(t * 1.1 + i * 1.4) * 0.025);
      });

      ringA.rotation.z += 0.0020;
      ringB.rotation.z -= 0.0014;
      ringB.rotation.x += 0.0006;

      blueKey.position.x = Math.sin(t * 0.5) * 5;
      blueKey.position.y = Math.cos(t * 0.38) * 4;
      tealFill.position.x = Math.cos(t * 0.42) * 5;
      tealFill.position.z = Math.sin(t * 0.60) * 3;
      purpleRim.position.x = Math.sin(t * 0.28 + 1) * 4;

      renderer.render(scene, camera);
    })();
  }

  /* ══ 타이핑 ══ */
  var el = document.getElementById('mktTyping');
  if (el) {
    var words = ['발견하게 합니다', '신뢰하게 합니다', '구매하게 합니다', '성장시킵니다'];
    var wi = 0, ci = 0, del = false;
    function type() {
      var w = words[wi];
      if (!del) {
        el.textContent = w.slice(0, ++ci);
        if (ci === w.length) { del = true; setTimeout(type, 1800); return; }
      } else {
        el.textContent = w.slice(0, --ci);
        if (ci === 0) { del = false; wi = (wi + 1) % words.length; setTimeout(type, 400); return; }
      }
      setTimeout(type, del ? 50 : 90);
    }
    setTimeout(type, 800);
  }

  /* ══ ScrollStack 로드 ══ */
  (function() {
    var ss = document.createElement('script');
    ss.src = '/static/scroll-stack.js';
    ss.onload = function() {
      if (typeof initScrollStack !== 'function') return;
      /* 이미지·레이아웃 안정 후 초기화 (requestAnimationFrame 2회 대기) */
      requestAnimationFrame(function() {
        requestAnimationFrame(function() {
          initScrollStack('#ss-container', {
            itemScale:        0.03,   /* 카드당 축소 배율 */
            itemStackOffset:  28,     /* 위로 쌓일 px 간격 */
            baseScale:        0.82,   /* 뒤 카드 최소 scale */
            blurAmount:       1.2,    /* 뒤 카드 blur (px/단계) */
            scrollHeight:     '90vh', /* 카드 1장당 스크롤 높이 */
            stickyTop:        '10vh', /* sticky top 위치 */
          });
        });
      });
    };
    document.head.appendChild(ss);
  })();

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
  </>
)
