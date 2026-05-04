export const ViralPage = () => (
  <>
    {/* ════════════════════════════════════════
        HERO — Three.js 3D 배경 + glassmorphism 레이아웃
    ════════════════════════════════════════ */}
    <section class="mkt-hero">

      {/* 전체 배경 3D 캔버스 */}
      <canvas id="mkt3dCanvas" class="mkt-3d-bg-canvas"></canvas>

      {/* 배경 그라디언트 오버레이 */}
      <div class="mkt-hero-overlay"></div>
      {/* 그리드 패턴 */}
      <div class="mkt-hero-grid"></div>

      {/* 콘텐츠 레이아웃 */}
      <div class="container mkt-hero-layout">

        {/* 좌측 — 텍스트 */}
        <div class="mkt-hero-left">
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
            <a href="/contact" class="mkt-btn-primary">
              <span>무료 전략 상담받기</span>
              <svg viewBox="0 0 24 24" fill="none"><path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </a>
            <a href="#mkt-services" class="mkt-btn-ghost">
              <span>서비스 살펴보기</span>
            </a>
          </div>

          {/* 스탯 4개 — 히어로 하단 */}
          <div class="mkt-hero-stats">
            {[
              { value: '320+',   label: '완료 프로젝트' },
              { value: '98%',    label: '재계약률' },
              { value: '2,800만+', label: '평균 캠페인 도달' },
              { value: '5년+',   label: '업계 전문 경력' },
            ].map(s => (
              <div class="mhs-item" key={s.label}>
                <p class="mhs-value">{s.value}</p>
                <p class="mhs-label">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 우측 — 플로팅 glassmorphism 카드 */}
        <div class="mkt-hero-right">
          <div class="mhr-card mhr-card--1">
            <p class="mhrc-eyebrow">REACH</p>
            <p class="mhrc-value">2,800<span>만+</span></p>
            <p class="mhrc-desc">평균 캠페인 도달 수치,<br />퍼널 전략으로 도달 폭발</p>
          </div>

          <div class="mhr-card mhr-card--2">
            <p class="mhrc-eyebrow">RESULT</p>
            <p class="mhrc-value">+580<span>%</span></p>
            <p class="mhrc-desc">최대 매출 증가율,<br />통합 퍼널 캠페인 기준</p>
          </div>

          <div class="mhr-card mhr-card--3">
            <p class="mhrc-eyebrow">TRUST</p>
            <p class="mhrc-value">98<span>%</span></p>
            <p class="mhrc-desc">재계약률 — 성과가 증명하는<br />인애드컴퍼니의 신뢰도</p>
          </div>
        </div>

      </div>

      {/* 스크롤 힌트 */}
      <div class="mkt-hero-scroll-hint">
        <div class="mhsh-mouse"><div class="mhsh-wheel"></div></div>
      </div>
    </section>

    {/* ════════════════════════════════════════
        TRUST BAR — 서비스 태그
    ════════════════════════════════════════ */}
    <div class="mkt-trust-bar">
      <div class="container mkt-trust-inner">
        <p class="mkt-trust-label">인애드컴퍼니가 커버하는 마케팅 영역</p>
        <div class="mkt-trust-tags">
          {['바이럴 마케팅', '인플루언서', '시딩 캠페인', 'SEO 마케팅', '고객 리뷰', '올리브영', 'PPL'].map(tag => (
            <span class="mkt-trust-tag" key={tag}>{tag}</span>
          ))}
        </div>
      </div>
    </div>

    {/* ════════════════════════════════════════
        FEATURES — 퍼널 3열 카드
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
              title: '전략 설계 우선',
              desc: '캠페인 전 소비자 여정을 분석하고, 각 퍼널 단계별 최적 채널과 메시지를 설계합니다. 실행 전 전략이 먼저입니다.',
            },
            {
              num: '02',
              title: '7가지 통합 솔루션',
              desc: '바이럴·인플루언서·시딩·SEO·리뷰·올리브영·PPL을 단독 또는 통합 퍼널로 운영합니다. 브랜드 목표에 맞게 조합합니다.',
            },
            {
              num: '03',
              title: '성과 기반 운영',
              desc: '캠페인 중에도 데이터를 실시간 모니터링하고 최적화합니다. 98% 재계약률이 결과로 증명합니다.',
            },
          ].map((f, i) => (
            <article class="mkt-feat-card reveal-up" style={`transition-delay:${i * 0.1}s`} key={f.num}>
              <div class="mfc-num">{f.num}</div>
              <h3 class="mfc-title">{f.title}</h3>
              <p class="mfc-desc">{f.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

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
              icon: '🔥', href: '/marketing/viral', title: '바이럴 마케팅', tag: 'VIRAL',
              desc: '맘카페·커뮤니티 기반의 자연스러운 확산으로 브랜드 인지도를 폭발적으로 높입니다.',
              kpis: [{ val: '2,800만+', label: '평균 도달' }, { val: '48h', label: '최단 바이럴' }],
              img: '/static/svc-images/viral.png',
            },
            {
              icon: '⭐', href: '/marketing/influencer', title: '인플루언서 마케팅', tag: 'INFLUENCER',
              desc: '검증된 1,200+ 크리에이터 네트워크로 타겟 소비자에게 진정성 있는 메시지를 전달합니다.',
              kpis: [{ val: '1,200+', label: '파트너 크리에이터' }, { val: '+580%', label: '최대 매출 증가' }],
              img: '/static/svc-images/influencer.png',
            },
            {
              icon: '🌱', href: '/marketing/seeding', title: '시딩 캠페인', tag: 'SEEDING',
              desc: '핵심 타겟에게 샘플을 전달해 진정성 있는 후기와 입소문 생태계를 구축합니다.',
              kpis: [{ val: '68%', label: '후기 전환율' }, { val: '+230%', label: '리뷰 전환 효과' }],
              img: '/static/svc-images/seeding.png', imgPos: 'center center',
            },
            {
              icon: '🔍', href: '/marketing/seo', title: 'SEO 마케팅', tag: 'SEO',
              desc: '소비자가 검색하는 순간 브랜드가 먼저 보이도록 키워드부터 콘텐츠까지 설계합니다.',
              kpis: [{ val: 'TOP3', label: '검색 순위 달성' }, { val: '+1,200%', label: '검색량 증가' }],
              img: '/static/svc-images/seo.png', imgPos: 'center center',
            },
            {
              icon: '💬', href: '/marketing/review', title: '리뷰 마케팅', tag: 'REVIEW',
              desc: '진정성 있는 소비자 리뷰로 브랜드 신뢰를 쌓고 구매 전환율을 극적으로 높입니다.',
              kpis: [{ val: '+230%', label: '리뷰 전환율' }, { val: '3×', label: '브랜드 신뢰도' }],
              img: '/static/svc-images/review.png',
            },
            {
              icon: '💚', href: '/marketing/oliveyoung', title: '올리브영 마케팅', tag: 'OLIVE YOUNG',
              desc: '국내 최대 H&B 채널 올리브영에서 브랜드를 단기간에 폭발적으로 성장시킵니다.',
              kpis: [{ val: '+340%', label: '채널 매출 증가' }, { val: '2.4×', label: '3개월 성장' }],
              img: '/static/svc-images/oliveyoung.png',
            },
            {
              icon: '🎬', href: '/marketing/ppl', title: 'PPL 마케팅', tag: 'PPL',
              desc: '드라마·유튜브 콘텐츠 속 자연스러운 브랜드 노출로 수천만 시청자에게 각인됩니다.',
              kpis: [{ val: '5,000만+', label: '누적 시청자' }, { val: '3×', label: '광고 전환율' }],
              img: '/static/svc-images/ppl.png',
            },
          ].map((s, i) => (
            <a href={s.href} class="msig-card reveal-up" style={`transition-delay:${i * 0.08}s`} key={s.href}>
              <div class="msig-img" style={`background-image:url('${s.img}');background-position:${'imgPos' in s ? (s as any).imgPos : 'center center'}`}></div>
              <div class="msig-overlay"></div>
              <div class="msig-tag">{s.tag}</div>
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
        CTA — glassmorphism 카드
    ════════════════════════════════════════ */}
    <section class="mkt-cta-section">
      <div class="container">
        <div class="mkt-cta-card">
          {/* 배경 글로우 */}
          <div class="mkt-cta-glow mkt-cta-glow--left"></div>
          <div class="mkt-cta-glow mkt-cta-glow--right"></div>

          <div class="mkt-cta-inner">
            <div class="mkt-cta-text">
              <p class="mkt-cta-eyebrow">Next Step</p>
              <h2 class="mkt-cta-title">
                어떤 마케팅이 필요한지<br />
                <span class="mkt-cta-accent">모르겠다면?</span>
              </h2>
              <p class="mkt-cta-desc">
                무료 상담을 통해 브랜드에 가장 효과적인 퍼널 솔루션을 찾아드립니다.<br />
                전략 설계부터 실행까지 인애드컴퍼니가 함께합니다.
              </p>
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
    scene.fog = new THREE.FogExp2(0x020814, 0.04);
    var camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 100);
    camera.position.set(0, 0, 9);

    scene.add(new THREE.AmbientLight(0xffffff, 0.25));
    var blueKey = new THREE.PointLight(0x1a6bff, 10, 18);
    blueKey.position.set(-3, 3, 4); scene.add(blueKey);
    var tealFill = new THREE.PointLight(0x00d4a8, 5, 14);
    tealFill.position.set(4, -2, 3); scene.add(tealFill);
    var purpleRim = new THREE.PointLight(0x8844ff, 4, 12);
    purpleRim.position.set(0, -4, 2); scene.add(purpleRim);
    var orangeAccent = new THREE.PointLight(0xff6b35, 3, 10);
    orangeAccent.position.set(3, 3, -2); scene.add(orangeAccent);

    var sphereDefs = [
      { p: [ 2.2,  1.6,  0.0], r: 1.1,  col: 0x1a6bff, emi: 0x051530 },
      { p: [ 4.8,  0.6, -1.0], r: 0.82, col: 0x00b4d8, emi: 0x002233 },
      { p: [ 1.8, -1.8,  0.5], r: 0.65, col: 0x00d4a8, emi: 0x002220 },
      { p: [ 4.2, -2.0, -0.5], r: 0.50, col: 0xff6b35, emi: 0x3a1200 },
    ];
    var spheres = sphereDefs.map(function(d) {
      var geo = new THREE.SphereGeometry(d.r, 64, 64);
      var mat = new THREE.MeshStandardMaterial({ color: d.col, emissive: d.emi, emissiveIntensity: 0.5, metalness: 0.75, roughness: 0.12 });
      var mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(d.p[0], d.p[1], d.p[2]);
      mesh.userData.base = d.p.slice();
      scene.add(mesh);
      return mesh;
    });

    [[0,1],[1,2],[2,3],[0,2],[1,3],[0,3]].forEach(function(pair) {
      var a = new THREE.Vector3(sphereDefs[pair[0]].p[0], sphereDefs[pair[0]].p[1], sphereDefs[pair[0]].p[2]);
      var b = new THREE.Vector3(sphereDefs[pair[1]].p[0], sphereDefs[pair[1]].p[1], sphereDefs[pair[1]].p[2]);
      var pts = [];
      for (var i = 0; i <= 24; i++) {
        var t = i / 24;
        var v = new THREE.Vector3().lerpVectors(a, b, t);
        v.z += Math.sin(t * Math.PI) * 0.4;
        pts.push(v);
      }
      var curve = new THREE.CatmullRomCurve3(pts);
      scene.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 32, 0.013, 8, false), new THREE.MeshBasicMaterial({ color: 0x4499ff, transparent: true, opacity: 0.22 })));
    });

    var pN = 900, pBuf = new Float32Array(pN * 3);
    for (var i = 0; i < pN; i++) {
      pBuf[i*3] = (Math.random()-0.5)*20; pBuf[i*3+1] = (Math.random()-0.5)*14; pBuf[i*3+2] = (Math.random()-0.5)*10-3;
    }
    var pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pBuf, 3));
    scene.add(new THREE.Points(pGeo, new THREE.PointsMaterial({ color: 0x4488ff, size: 0.045, transparent: true, opacity: 0.55 })));

    var ringA = new THREE.Mesh(new THREE.TorusGeometry(3.4, 0.012, 16, 140), new THREE.MeshBasicMaterial({ color: 0x1a6bff, transparent: true, opacity: 0.13 }));
    ringA.rotation.set(Math.PI/5, 0, Math.PI/8); scene.add(ringA);
    var ringB = new THREE.Mesh(new THREE.TorusGeometry(2.2, 0.008, 16, 100), new THREE.MeshBasicMaterial({ color: 0x00d4a8, transparent: true, opacity: 0.10 }));
    ringB.rotation.set(-Math.PI/4, Math.PI/6, 0); scene.add(ringB);

    var mouse = { x: 0, y: 0 }, rot = { x: 0, y: 0 };
    document.addEventListener('mousemove', function(e) {
      mouse.x = (e.clientX/window.innerWidth-0.5)*2;
      mouse.y = -(e.clientY/window.innerHeight-0.5)*2;
    });
    window.addEventListener('resize', function() {
      W = window.innerWidth; H = canvas.parentElement.offsetHeight || window.innerHeight;
      camera.aspect = W/H; camera.updateProjectionMatrix(); renderer.setSize(W, H);
    });

    var clock = new THREE.Clock();
    (function animate() {
      requestAnimationFrame(animate);
      var t = clock.getElapsedTime();
      rot.x += (mouse.y*0.18 - rot.x)*0.04;
      rot.y += (mouse.x*0.22 + t*0.06 - rot.y)*0.03;
      scene.rotation.x = rot.x; scene.rotation.y = rot.y;
      spheres.forEach(function(s, i) {
        var b = s.userData.base, spd = 0.38+i*0.13, amp = 0.20+i*0.05;
        s.position.set(b[0]+Math.cos(t*spd+i*1.3)*amp, b[1]+Math.sin(t*spd*0.8+i)*amp, b[2]+Math.sin(t*0.5+i)*0.14);
        s.rotation.x += 0.003+i*0.001; s.rotation.y += 0.004+i*0.002;
        s.scale.setScalar(1+Math.sin(t*1.3+i*1.6)*0.022);
      });
      ringA.rotation.z += 0.0025; ringB.rotation.z -= 0.0018; ringB.rotation.x += 0.0008;
      blueKey.position.x = Math.sin(t*0.55)*4; blueKey.position.y = Math.cos(t*0.40)*3;
      tealFill.position.x = Math.cos(t*0.45)*4; tealFill.position.z = Math.sin(t*0.65)*2;
      purpleRim.position.x = Math.sin(t*0.3+1)*3;
      orangeAccent.position.y = Math.cos(t*0.35+2)*3;
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
      if (!del) { el.textContent = w.slice(0, ++ci); if (ci===w.length){del=true;setTimeout(type,1800);return;} }
      else { el.textContent = w.slice(0, --ci); if (ci===0){del=false;wi=(wi+1)%words.length;setTimeout(type,400);return;} }
      setTimeout(type, del?50:90);
    }
    setTimeout(type, 800);
  }

  /* ══ 스크롤 리빌 ══ */
  var revEls = document.querySelectorAll('.reveal-up,.reveal-side--left,.reveal-side--right');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) { if(e.isIntersecting){e.target.classList.add('revealed');io.unobserve(e.target);} });
    }, { threshold: 0.12 });
    revEls.forEach(function(el) { io.observe(el); });
  } else { revEls.forEach(function(el) { el.classList.add('revealed'); }); }

})();
    `}} />
  </>
)
