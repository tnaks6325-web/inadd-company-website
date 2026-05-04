export const ViralPage = () => (
  <>
    {/* ════════════════════════════════════════
        HERO — Three.js 3D 배경 + 텍스트 오버레이
    ════════════════════════════════════════ */}
    <section class="mkt-hero">

      {/* ── 전체 배경 3D 캔버스 (absolute, z=0) ── */}
      <canvas id="mkt3dCanvas" class="mkt-3d-bg-canvas"></canvas>

      {/* ── 텍스트 오버레이 (z=2) ── */}
      <div class="container mkt-hero-inner">
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
      </div>

      {/* ── 하단 스크롤 힌트 ── */}
      <div class="mkt-hero-scroll-hint">
        <div class="mhsh-mouse"><div class="mhsh-wheel"></div></div>
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
            <button type="button" class="hero-cta-btn ghost" onclick="openCallModal()">
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

  /* ══════════════════════════════════════════════════════
     THREE.JS 배경 씬
     - 구체 4개 (퍼널 단계: 인지·탐색·신뢰·전환)
     - 구체 사이 광섬유 연결선
     - 환경 파티클 800개
     - 공전 링 2개
     - 마우스 패럴랙스 전체 씬 회전
  ══════════════════════════════════════════════════════ */
  var threeScript = document.createElement('script');
  threeScript.src = 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js';
  threeScript.onload = initBgScene;
  document.head.appendChild(threeScript);

  function initBgScene() {
    var canvas = document.getElementById('mkt3dCanvas');
    if (!canvas) return;

    var W = window.innerWidth;
    var H = canvas.parentElement.offsetHeight || window.innerHeight;

    /* ── 렌더러 ── */
    var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x020814, 1); /* 배경색 — 히어로와 동일 */

    /* ── 씬 & 카메라 ── */
    var scene = new THREE.Scene();
    /* 약간의 안개 — 깊이감 */
    scene.fog = new THREE.FogExp2(0x020814, 0.04);

    var camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 100);
    camera.position.set(0, 0, 9);

    /* ── 조명 ── */
    scene.add(new THREE.AmbientLight(0xffffff, 0.25));

    var blueKey = new THREE.PointLight(0x1a6bff, 10, 18);
    blueKey.position.set(-3, 3, 4);
    scene.add(blueKey);

    var tealFill = new THREE.PointLight(0x00d4a8, 5, 14);
    tealFill.position.set(4, -2, 3);
    scene.add(tealFill);

    var purpleRim = new THREE.PointLight(0x8844ff, 4, 12);
    purpleRim.position.set(0, -4, 2);
    scene.add(purpleRim);

    var orangeAccent = new THREE.PointLight(0xff6b35, 3, 10);
    orangeAccent.position.set(3, 3, -2);
    scene.add(orangeAccent);

    /* ── 퍼널 구체 4개 ── */
    /* 화면 오른쪽 절반에 배치 — 텍스트(왼쪽)와 겹치지 않도록 x 오프셋 +1.5 */
    var sphereDefs = [
      { p: [ 2.2,  1.6,  0.0], r: 1.1,  col: 0x1a6bff, emi: 0x051530 },  /* 인지 — 가장 큰 파랑 */
      { p: [ 4.8,  0.6, -1.0], r: 0.82, col: 0x00b4d8, emi: 0x002233 },  /* 탐색 — 시안 */
      { p: [ 1.8, -1.8,  0.5], r: 0.65, col: 0x00d4a8, emi: 0x002220 },  /* 신뢰 — 초록 */
      { p: [ 4.2, -2.0, -0.5], r: 0.50, col: 0xff6b35, emi: 0x3a1200 },  /* 전환 — 오렌지 */
    ];

    var spheres = sphereDefs.map(function(d) {
      var geo = new THREE.SphereGeometry(d.r, 64, 64);
      var mat = new THREE.MeshStandardMaterial({
        color:            d.col,
        emissive:         d.emi,
        emissiveIntensity:0.5,
        metalness:        0.75,
        roughness:        0.12,
      });
      var mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(d.p[0], d.p[1], d.p[2]);
      mesh.userData.base = d.p.slice();
      scene.add(mesh);
      return mesh;
    });

    /* ── 구체 사이 광섬유 연결선 ── */
    [[0,1],[1,2],[2,3],[0,2],[1,3],[0,3]].forEach(function(pair) {
      var a = new THREE.Vector3(...sphereDefs[pair[0]].p);
      var b = new THREE.Vector3(...sphereDefs[pair[1]].p);
      var pts = [];
      for (var i = 0; i <= 24; i++) {
        var t = i / 24;
        var v = new THREE.Vector3().lerpVectors(a, b, t);
        v.z += Math.sin(t * Math.PI) * 0.4;
        pts.push(v);
      }
      var curve = new THREE.CatmullRomCurve3(pts);
      var tGeo  = new THREE.TubeGeometry(curve, 32, 0.013, 8, false);
      var tMat  = new THREE.MeshBasicMaterial({ color: 0x4499ff, transparent: true, opacity: 0.22 });
      scene.add(new THREE.Mesh(tGeo, tMat));
    });

    /* ── 파티클 구름 ── */
    var pN = 900;
    var pBuf = new Float32Array(pN * 3);
    for (var i = 0; i < pN; i++) {
      pBuf[i*3]   = (Math.random() - 0.5) * 20;
      pBuf[i*3+1] = (Math.random() - 0.5) * 14;
      pBuf[i*3+2] = (Math.random() - 0.5) * 10 - 3;
    }
    var pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pBuf, 3));
    scene.add(new THREE.Points(pGeo,
      new THREE.PointsMaterial({ color: 0x4488ff, size: 0.045, transparent: true, opacity: 0.55 })
    ));

    /* ── 공전 링 ── */
    var ringA = new THREE.Mesh(
      new THREE.TorusGeometry(3.4, 0.012, 16, 140),
      new THREE.MeshBasicMaterial({ color: 0x1a6bff, transparent: true, opacity: 0.13 })
    );
    ringA.rotation.set(Math.PI / 5, 0, Math.PI / 8);
    scene.add(ringA);

    var ringB = new THREE.Mesh(
      new THREE.TorusGeometry(2.2, 0.008, 16, 100),
      new THREE.MeshBasicMaterial({ color: 0x00d4a8, transparent: true, opacity: 0.10 })
    );
    ringB.rotation.set(-Math.PI / 4, Math.PI / 6, 0);
    scene.add(ringB);

    /* ── 마우스 패럴랙스 ── */
    var mouse = { x: 0, y: 0 };
    var rot   = { x: 0, y: 0 };
    document.addEventListener('mousemove', function(e) {
      mouse.x =  (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    });

    /* ── 리사이즈 ── */
    window.addEventListener('resize', function() {
      W = window.innerWidth;
      H = canvas.parentElement.offsetHeight || window.innerHeight;
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      renderer.setSize(W, H);
    });

    /* ── 애니메이션 루프 ── */
    var clock = new THREE.Clock();
    (function animate() {
      requestAnimationFrame(animate);
      var t = clock.getElapsedTime();

      /* 씬 전체 — 느린 자동 회전 + 마우스 패럴랙스 */
      rot.x += (mouse.y * 0.18 - rot.x) * 0.04;
      rot.y += (mouse.x * 0.22 + t * 0.06 - rot.y) * 0.03;
      scene.rotation.x = rot.x;
      scene.rotation.y = rot.y;

      /* 각 구체 — 독립 부유 */
      spheres.forEach(function(s, i) {
        var b   = s.userData.base;
        var spd = 0.38 + i * 0.13;
        var amp = 0.20 + i * 0.05;
        s.position.set(
          b[0] + Math.cos(t * spd + i * 1.3) * amp,
          b[1] + Math.sin(t * spd * 0.8 + i) * amp,
          b[2] + Math.sin(t * 0.5 + i)       * 0.14
        );
        s.rotation.x += 0.003 + i * 0.001;
        s.rotation.y += 0.004 + i * 0.002;
        /* 펄스 */
        var pulse = 1 + Math.sin(t * 1.3 + i * 1.6) * 0.022;
        s.scale.setScalar(pulse);
      });

      /* 링 */
      ringA.rotation.z += 0.0025;
      ringB.rotation.z -= 0.0018;
      ringB.rotation.x += 0.0008;

      /* 조명 궤도 */
      blueKey.position.x    = Math.sin(t * 0.55) * 4;
      blueKey.position.y    = Math.cos(t * 0.40) * 3;
      tealFill.position.x   = Math.cos(t * 0.45) * 4;
      tealFill.position.z   = Math.sin(t * 0.65) * 2;
      purpleRim.position.x  = Math.sin(t * 0.3 + 1) * 3;
      orangeAccent.position.y = Math.cos(t * 0.35 + 2) * 3;

      renderer.render(scene, camera);
    })();
  }

  /* ══════════════════════════════════════════
     타이핑 효과
  ══════════════════════════════════════════ */
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
        if (ci === 0)  { del = false; wi = (wi + 1) % words.length; setTimeout(type, 400); return; }
      }
      setTimeout(type, del ? 50 : 90);
    }
    setTimeout(type, 800);
  }

  /* ══════════════════════════════════════════
     스크롤 리빌
  ══════════════════════════════════════════ */
  var revEls = document.querySelectorAll('.reveal-up,.reveal-side--left,.reveal-side--right');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target); }
      });
    }, { threshold: 0.15 });
    revEls.forEach(function(el) { io.observe(el); });
  } else {
    revEls.forEach(function(el) { el.classList.add('revealed'); });
  }

  /* ══════════════════════════════════════════
     숫자 카운터
  ══════════════════════════════════════════ */
  var nums = document.querySelectorAll('.mss-num');
  var counted = false;
  function countUp() {
    if (counted) return;
    var strip = document.querySelector('.mkt-stats-strip');
    if (!strip) return;
    if (strip.getBoundingClientRect().top < window.innerHeight - 80) {
      counted = true;
      nums.forEach(function(n) {
        var target = parseInt(n.getAttribute('data-target'));
        var t0 = null, dur = 1400;
        function step(ts) {
          if (!t0) t0 = ts;
          var p = Math.min((ts - t0) / dur, 1);
          n.textContent = Math.floor((1 - Math.pow(1 - p, 3)) * target);
          if (p < 1) requestAnimationFrame(step); else n.textContent = target;
        }
        requestAnimationFrame(step);
      });
    }
  }
  window.addEventListener('scroll', countUp, { passive: true });
  countUp();

})();
    `}} />
  </>
)
