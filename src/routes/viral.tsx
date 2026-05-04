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

        {/* 오른쪽 — Three.js 3D 인터랙티브 씬 */}
        <div class="mkt-3d-wrap">
          <canvas id="mkt3dCanvas" class="mkt-3d-canvas"></canvas>
          {/* HUD 레이블 오버레이 */}
          <div class="mkt-3d-hud">
            <div class="m3h-label m3h-label--awareness" id="hud-awareness">
              <span class="m3h-dot"></span>
              <span class="m3h-text">인지</span>
              <span class="m3h-val">AWARENESS</span>
            </div>
            <div class="m3h-label m3h-label--explore" id="hud-explore">
              <span class="m3h-dot"></span>
              <span class="m3h-text">탐색</span>
              <span class="m3h-val">EXPLORE</span>
            </div>
            <div class="m3h-label m3h-label--trust" id="hud-trust">
              <span class="m3h-dot"></span>
              <span class="m3h-text">신뢰</span>
              <span class="m3h-val">TRUST</span>
            </div>
            <div class="m3h-label m3h-label--convert" id="hud-convert">
              <span class="m3h-dot"></span>
              <span class="m3h-text">전환</span>
              <span class="m3h-val">CONVERT</span>
            </div>
          </div>
          {/* 우하단 KPI 미니 카드 */}
          <div class="mkt-3d-kpi">
            <div class="m3k-item">
              <strong>+580%</strong><span>최대 매출</span>
            </div>
            <div class="m3k-sep"></div>
            <div class="m3k-item">
              <strong>98%</strong><span>재계약률</span>
            </div>
            <div class="m3k-sep"></div>
            <div class="m3k-item">
              <strong>320+</strong><span>프로젝트</span>
            </div>
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
              imgPos: 'center center',
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
            <button type="button" class="hero-cta-btn ghost" onclick="openCallModal()">
              <span>📞 바로 전화하기</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    {/* ════════════════════════════════════════
        JS — 파티클 + 타이핑 + 스크롤 리빌
    ════════════════════════════════════════ */}
    <script dangerouslySetInnerHTML={{__html: `
(function(){
  /* ══════════════════════════════════════════
     1. Three.js 3D 씬 — 퍼널 구체 + 파티클
  ══════════════════════════════════════════ */
  var script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js';
  script.onload = function(){ initThreeScene(); };
  document.head.appendChild(script);

  function initThreeScene(){
    var canvas = document.getElementById('mkt3dCanvas');
    if(!canvas) return;
    var wrap = canvas.parentElement;
    var W = wrap.clientWidth, H = wrap.clientHeight;

    /* ── 렌더러 ── */
    var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    /* ── 씬 & 카메라 ── */
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(50, W/H, 0.1, 100);
    camera.position.set(0, 0, 7);

    /* ── 조명 ── */
    var ambient = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambient);
    var dirLight = new THREE.DirectionalLight(0x4488ff, 2.5);
    dirLight.position.set(3, 5, 5);
    scene.add(dirLight);
    var bluePoint = new THREE.PointLight(0x1a6bff, 6, 12);
    bluePoint.position.set(-2, 2, 3);
    scene.add(bluePoint);
    var tealPoint = new THREE.PointLight(0x00d4a8, 3, 10);
    tealPoint.position.set(3, -2, 2);
    scene.add(tealPoint);
    var purplePoint = new THREE.PointLight(0x8844ff, 2, 8);
    purplePoint.position.set(0, -3, 1);
    scene.add(purplePoint);

    /* ── 퍼널 구체 4개 (인지→탐색→신뢰→전환) ── */
    var funnelData = [
      { pos: [-1.8, 1.4, 0],   r: 1.05, color: 0x1a6bff, emissive: 0x0a2855, label: 'hud-awareness' },
      { pos: [ 1.6, 1.0, -0.5], r: 0.82, color: 0x00b4d8, emissive: 0x003344, label: 'hud-explore' },
      { pos: [-1.2, -1.1, 0.4], r: 0.65, color: 0x00d4a8, emissive: 0x003322, label: 'hud-trust' },
      { pos: [ 1.3, -1.4, -0.3],r: 0.50, color: 0xff6b35, emissive: 0x441800, label: 'hud-convert' },
    ];

    var spheres = [];
    funnelData.forEach(function(d){
      var geo = new THREE.SphereGeometry(d.r, 64, 64);
      var mat = new THREE.MeshStandardMaterial({
        color: d.color,
        emissive: d.emissive,
        emissiveIntensity: 0.4,
        metalness: 0.7,
        roughness: 0.15,
        envMapIntensity: 1.2,
      });
      var mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(d.pos[0], d.pos[1], d.pos[2]);
      mesh.userData = { basePos: d.pos.slice(), label: d.label, baseR: d.r };
      scene.add(mesh);
      spheres.push(mesh);
    });

    /* ── 구체 사이 연결선 (광섬유 느낌) ── */
    var linePairs = [[0,1],[1,2],[2,3],[0,2],[1,3]];
    linePairs.forEach(function(pair){
      var p1 = new THREE.Vector3(...funnelData[pair[0]].pos);
      var p2 = new THREE.Vector3(...funnelData[pair[1]].pos);
      var points = [];
      for(var i=0; i<=20; i++){
        var t = i/20;
        var mid = new THREE.Vector3().lerpVectors(p1, p2, t);
        mid.z += Math.sin(t * Math.PI) * 0.3;
        points.push(mid);
      }
      var curve = new THREE.CatmullRomCurve3(points);
      var geo = new THREE.TubeGeometry(curve, 30, 0.015, 8, false);
      var mat = new THREE.MeshBasicMaterial({
        color: 0x3399ff,
        transparent: true,
        opacity: 0.25,
      });
      scene.add(new THREE.Mesh(geo, mat));
    });

    /* ── 환경 파티클 (점구름) ── */
    var pCount = 600;
    var pPos = new Float32Array(pCount * 3);
    for(var i=0; i<pCount; i++){
      pPos[i*3]   = (Math.random()-0.5)*14;
      pPos[i*3+1] = (Math.random()-0.5)*10;
      pPos[i*3+2] = (Math.random()-0.5)*8 - 2;
    }
    var pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    var pMat = new THREE.PointsMaterial({ color: 0x4488ff, size: 0.04, transparent: true, opacity: 0.6 });
    scene.add(new THREE.Points(pGeo, pMat));

    /* ── 링 (중앙 원형 궤도) ── */
    var ringGeo = new THREE.TorusGeometry(2.8, 0.012, 16, 120);
    var ringMat = new THREE.MeshBasicMaterial({ color: 0x1a6bff, transparent: true, opacity: 0.15 });
    var ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 5;
    ring.rotation.z = Math.PI / 8;
    scene.add(ring);

    var ring2Geo = new THREE.TorusGeometry(2.0, 0.008, 16, 100);
    var ring2Mat = new THREE.MeshBasicMaterial({ color: 0x00d4a8, transparent: true, opacity: 0.1 });
    var ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.y = Math.PI / 6;
    scene.add(ring2);

    /* ── 마우스 인터랙션 ── */
    var mouse = { x: 0, y: 0 };
    var targetRot = { x: 0, y: 0 };
    var currentRot = { x: 0, y: 0 };
    document.addEventListener('mousemove', function(e){
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    /* ── 리사이즈 ── */
    window.addEventListener('resize', function(){
      W = wrap.clientWidth; H = wrap.clientHeight;
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      renderer.setSize(W, H);
    });

    /* ── 애니메이션 루프 ── */
    var clock = new THREE.Clock();
    function animate(){
      requestAnimationFrame(animate);
      var t = clock.getElapsedTime();

      /* 씬 전체 부드러운 마우스 회전 */
      targetRot.y = mouse.x * 0.3;
      targetRot.x = -mouse.y * 0.2;
      currentRot.x += (targetRot.x - currentRot.x) * 0.05;
      currentRot.y += (targetRot.y - currentRot.y) * 0.05;
      scene.rotation.x = currentRot.x;
      scene.rotation.y = currentRot.y + t * 0.08;

      /* 구체별 개별 공전 */
      spheres.forEach(function(s, i){
        var bp = s.userData.basePos;
        var spd = 0.4 + i * 0.15;
        var amp = 0.18 + i * 0.04;
        s.position.x = bp[0] + Math.cos(t * spd + i) * amp;
        s.position.y = bp[1] + Math.sin(t * spd * 0.7 + i) * amp;
        s.position.z = bp[2] + Math.sin(t * 0.5 + i) * 0.12;
        /* 자전 */
        s.rotation.x += 0.003 + i * 0.001;
        s.rotation.y += 0.005 + i * 0.002;
        /* 펄스 스케일 */
        var pulse = 1 + Math.sin(t * 1.2 + i * 1.5) * 0.025;
        s.scale.setScalar(pulse);
      });

      /* 링 회전 */
      ring.rotation.z  += 0.003;
      ring2.rotation.z -= 0.002;
      ring2.rotation.x += 0.001;

      /* 조명 이동 */
      bluePoint.position.x = Math.sin(t * 0.6) * 3;
      bluePoint.position.y = Math.cos(t * 0.4) * 2;
      tealPoint.position.x = Math.cos(t * 0.5) * 3;
      tealPoint.position.z = Math.sin(t * 0.7) * 2;

      renderer.render(scene, camera);
    }
    animate();
  }

  /* ══════════════════════════════════════════
     2. 타이핑 효과
  ══════════════════════════════════════════ */
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

  /* ══════════════════════════════════════════
     3. 스크롤 리빌
  ══════════════════════════════════════════ */
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

  /* ══════════════════════════════════════════
     4. 숫자 카운터
  ══════════════════════════════════════════ */
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
        var duration = 1400, startTime = null;
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
