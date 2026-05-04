/**
 * svc-three-bg.js  v3
 * - 캔버스를 position:fixed 로 전체 페이지 배경에 깔기
 * - 구체들 전체 화면에 넓게 분산, 자유롭게 둥둥 부유
 * - 마우스 팔로우 안개/빛 효과 추가
 * 사용법: initSvcThreeBg(primaryHex, secondaryHex, accentHex)
 */
(function(global){

  function initSvcThreeBg(primaryHex, secondaryHex, accentHex) {
    /* Three.js 로드 후 씬 초기화 */
    if (global.THREE) {
      _buildScene(primaryHex, secondaryHex, accentHex);
      return;
    }
    var s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js';
    s.onload = function(){ _buildScene(primaryHex, secondaryHex, accentHex); };
    document.head.appendChild(s);
  }

  function _buildScene(primaryHex, secondaryHex, accentHex) {

    /* ── 캔버스: body에 fixed로 붙여 전체 페이지 배경 ── */
    var canvas = document.createElement('canvas');
    canvas.id = '__svc-three-bg__';
    canvas.style.cssText = [
      'position:fixed',
      'inset:0',
      'width:100%',
      'height:100%',
      'pointer-events:none',
      'z-index:0'
    ].join(';');
    /* body 맨 앞에 삽입 (다른 요소 뒤에 위치) */
    document.body.insertBefore(canvas, document.body.firstChild);

    /* 기존 섹션 배경들이 z-index 위로 올라오도록 보장 */
    var styleTag = document.createElement('style');
    styleTag.textContent = [
      /* 히어로 섹션: 배경 투명하게 + 콘텐츠는 위로 */
      '.vh-hero { background: transparent !important; }',
      '.vh-bg   { display: none !important; }',
      '.vh-canvas { display: none !important; }',
      /* 그 외 일반 섹션들: 반투명 오버레이로 가독성 확보 */
      '.section { position: relative; isolation: isolate; }',
      '.section::before {',
      '  content:""; position:absolute; inset:0; z-index:0;',
      '  background: rgba(2,4,12,0.72);',
      '  pointer-events:none;',
      '}',
      '.section .container, .section > * { position:relative; z-index:1; }',
      /* CTA, intro 등 특수 섹션 */
      '.svc-cta-section { background: transparent !important; }',
      '.svc-intro-section { background: transparent !important; }',
    ].join('\n');
    document.head.appendChild(styleTag);

    var W = window.innerWidth;
    var H = window.innerHeight;

    /* ── 렌더러 ── */
    var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: false });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x020408, 1);

    /* ── 씬 & 카메라 ── */
    var scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020408, 0.022);

    var camera = new THREE.PerspectiveCamera(65, W / H, 0.1, 120);
    camera.position.set(0, 0, 12);

    /* ── 조명 ── */
    scene.add(new THREE.AmbientLight(0xffffff, 0.25));

    var keyLight = new THREE.PointLight(primaryHex, 12, 22);
    keyLight.position.set(-3, 4, 6);
    scene.add(keyLight);

    var fillLight = new THREE.PointLight(secondaryHex, 6, 16);
    fillLight.position.set(6, -3, 4);
    scene.add(fillLight);

    var rimLight = new THREE.PointLight(accentHex, 4, 12);
    rimLight.position.set(0, -5, 2);
    scene.add(rimLight);

    /* ── 메인 구체: 화면 전체에 넓게 분산 배치 ── */
    var sphereDefs = [
      { p: [-5.5,  3.0,  -1.0], r: 1.1,  col: primaryHex   },
      { p: [ 5.0,  2.5,  -2.0], r: 0.85, col: secondaryHex },
      { p: [-4.0, -3.0,  -1.5], r: 0.70, col: accentHex    },
      { p: [ 4.5, -2.5,  -0.5], r: 0.90, col: primaryHex   },
      { p: [ 0.0,  0.5,  -3.5], r: 0.60, col: secondaryHex },
      { p: [-1.5, -4.5,  -2.0], r: 0.50, col: accentHex    },
      { p: [ 2.5,  4.5,  -3.0], r: 0.45, col: primaryHex   },
    ];

    var spheres = sphereDefs.map(function(d) {
      var geo = new THREE.SphereGeometry(d.r, 48, 48);
      var mat = new THREE.MeshStandardMaterial({
        color:             d.col,
        emissive:          d.col,
        emissiveIntensity: 0.25,
        metalness:         0.75,
        roughness:         0.18,
        transparent:       true,
        opacity:           0.82,
      });
      var mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(d.p[0], d.p[1], d.p[2]);
      /* 각 구체마다 독립적인 부유 파라미터 */
      mesh.userData.base  = d.p.slice();
      mesh.userData.speed = 0.28 + Math.random() * 0.18;
      mesh.userData.amp   = 0.35 + Math.random() * 0.25;
      mesh.userData.phase = Math.random() * Math.PI * 2;
      scene.add(mesh);
      return mesh;
    });

    /* ── 환경 파티클: 화면 전체 ── */
    var pN = 1200;
    var pBuf = new Float32Array(pN * 3);
    for (var i = 0; i < pN; i++) {
      pBuf[i*3]   = (Math.random() - 0.5) * 30;
      pBuf[i*3+1] = (Math.random() - 0.5) * 22;
      pBuf[i*3+2] = (Math.random() - 0.5) * 14 - 4;
    }
    var pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pBuf, 3));
    scene.add(new THREE.Points(pGeo,
      new THREE.PointsMaterial({
        color: primaryHex,
        size: 0.038,
        transparent: true,
        opacity: 0.45,
      })
    ));

    /* ── 공전 링 3개: 넓게 배치 ── */
    var ringDefs = [
      { r: 5.5, tube: 0.012, col: primaryHex,   rx:  0.4, ry: 0,    rz:  0.6,  spd:  0.0018 },
      { r: 3.8, tube: 0.009, col: secondaryHex, rx: -0.5, ry:  0.4, rz:  0,    spd: -0.0013 },
      { r: 7.0, tube: 0.007, col: accentHex,    rx:  0.2, ry: -0.3, rz: -0.4,  spd:  0.0010 },
    ];
    var rings = ringDefs.map(function(d) {
      var mesh = new THREE.Mesh(
        new THREE.TorusGeometry(d.r, d.tube, 16, 160),
        new THREE.MeshBasicMaterial({ color: d.col, transparent: true, opacity: 0.10 })
      );
      mesh.rotation.set(d.rx, d.ry, d.rz);
      mesh.userData.spd = d.spd;
      scene.add(mesh);
      return mesh;
    });

    /* ── 마우스 팔로우 안개 조명 ── */
    /* 마우스 위치를 NDC(-1~1) 로 추적 */
    var mouse = { x: 0, y: 0 };          /* 실제 마우스 NDC */
    var mouseSmooth = { x: 0, y: 0 };    /* lerp 된 부드러운 위치 */
    var mousePrev   = { x: 0, y: 0 };    /* 이전 프레임 위치 */
    var mouseVel    = { x: 0, y: 0 };    /* 속도 (이동 빠를수록 빛 강해짐) */

    window.addEventListener('mousemove', function(e) {
      mouse.x =  (e.clientX / window.innerWidth)  * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    /* 마우스 팔로우 포인트 라이트 — 안개 속에서 퍼지는 빛 */
    var fogLight = new THREE.PointLight(primaryHex, 0, 18);
    fogLight.position.set(0, 0, 6);
    scene.add(fogLight);

    /* 보조 안개 조명 — 약간 뒤처지며 색이 다름 (trailing glow) */
    var fogTrail = new THREE.PointLight(accentHex, 0, 12);
    fogTrail.position.set(0, 0, 5);
    scene.add(fogTrail);

    /* 마우스 커서 주변에 미세한 파티클 스프레이 (안개 티끌) */
    var dustN   = 180;
    var dustBuf = new Float32Array(dustN * 3);
    var dustVel = new Float32Array(dustN * 3);  /* 각 파티클 속도 */
    for (var i = 0; i < dustN; i++) {
      /* 초기엔 랜덤하게 흩어져 있음 */
      dustBuf[i*3]   = (Math.random() - 0.5) * 14;
      dustBuf[i*3+1] = (Math.random() - 0.5) * 10;
      dustBuf[i*3+2] = (Math.random() - 0.5) * 4 + 4;
      /* 각 파티클 고유 표류 속도 */
      dustVel[i*3]   = (Math.random() - 0.5) * 0.004;
      dustVel[i*3+1] = (Math.random() - 0.5) * 0.004;
      dustVel[i*3+2] = 0;
    }
    var dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustBuf, 3));
    var dustMat = new THREE.PointsMaterial({
      color:       primaryHex,
      size:        0.055,
      transparent: true,
      opacity:     0,            /* 처음엔 투명 — 마우스 움직이면 나타남 */
      depthWrite:  false,
      blending:    THREE.AdditiveBlending,
    });
    var dustPoints = new THREE.Points(dustGeo, dustMat);
    scene.add(dustPoints);

    /* 마우스가 얼마나 빠르게 움직이는지 추적 */
    var mouseSpeed     = 0;    /* 0~1 정규화 */
    var mouseSpeedSmth = 0;    /* 부드럽게 감쇠 */

    /* ── 리사이즈 ── */
    window.addEventListener('resize', function() {
      W = window.innerWidth;
      H = window.innerHeight;
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      renderer.setSize(W, H);
    });

    /* ── 애니메이션 루프 ── */
    var clock = new THREE.Clock();
    (function animate() {
      requestAnimationFrame(animate);
      var t = clock.getElapsedTime();

      /* ── 마우스 lerp: 0.04 = 아주 느리고 묵직하게 추적 ── */
      mouseSmooth.x += (mouse.x - mouseSmooth.x) * 0.04;
      mouseSmooth.y += (mouse.y - mouseSmooth.y) * 0.04;

      /* 마우스 이동 속도 계산 */
      var dx = mouseSmooth.x - mousePrev.x;
      var dy = mouseSmooth.y - mousePrev.y;
      mouseSpeed     = Math.min(Math.sqrt(dx*dx + dy*dy) * 60, 1); /* 60 = 감도 */
      mouseSpeedSmth += (mouseSpeed - mouseSpeedSmth) * 0.08;       /* 부드럽게 */
      mousePrev.x = mouseSmooth.x;
      mousePrev.y = mouseSmooth.y;

      /* 마우스 NDC → 3D world 좌표 (z=6 평면 기준) */
      var mwx = mouseSmooth.x * 7.5;   /* 화면 폭 절반 대략 7.5 unit */
      var mwy = mouseSmooth.y * 5.5;

      /* ── fogLight: 마우스를 천천히 따라오는 주 안개 조명 ── */
      fogLight.position.x += (mwx - fogLight.position.x) * 0.035;
      fogLight.position.y += (mwy - fogLight.position.y) * 0.035;
      /* 강도: 기본 4 + 빠르게 움직일수록 최대 9까지 올라감 */
      fogLight.intensity = 4 + mouseSpeedSmth * 5;
      /* 색상: 속도에 따라 primaryHex ↔ accentHex 사이를 살짝 진동 */
      fogLight.color.setHex(mouseSpeedSmth > 0.4 ? accentHex : primaryHex);

      /* ── fogTrail: fogLight보다 더 느리게 — 잔상처럼 뒤처짐 ── */
      fogTrail.position.x += (fogLight.position.x - fogTrail.position.x) * 0.018;
      fogTrail.position.y += (fogLight.position.y - fogTrail.position.y) * 0.018;
      fogTrail.intensity = 2.5 + mouseSpeedSmth * 3;

      /* ── 먼지 파티클: 마우스 주변으로 서서히 끌려옴 ── */
      var attr = dustGeo.getAttribute('position');
      for (var i = 0; i < dustN; i++) {
        var px = attr.getX(i);
        var py = attr.getY(i);
        var pz = attr.getZ(i);

        /* 마우스 방향 인력: 거리 멀수록 약하게 */
        var ex  = mwx - px;
        var ey  = mwy - py;
        var dist2 = ex*ex + ey*ey;
        var pull  = 0.0006 / (dist2 * 0.08 + 0.5);  /* 거리 역비례 인력 */

        /* 고유 표류 + 인력 합산 */
        px += dustVel[i*3]   + ex * pull;
        py += dustVel[i*3+1] + ey * pull;
        pz += Math.sin(t * 0.3 + i * 0.4) * 0.003;  /* 살짝 Z 흔들림 */

        /* 너무 멀리 가면 마우스 근처로 리셋 */
        if (dist2 > 120) {
          px = mwx + (Math.random() - 0.5) * 5;
          py = mwy + (Math.random() - 0.5) * 4;
          pz = 4.5 + Math.random() * 1.5;
        }

        attr.setXYZ(i, px, py, pz);
      }
      attr.needsUpdate = true;

      /* 먼지 불투명도: 마우스 속도 + 항상 살짝 보이게 */
      dustMat.opacity = 0.12 + mouseSpeedSmth * 0.45;
      dustMat.size    = 0.045 + mouseSpeedSmth * 0.035;

      /* ── 씬 전체 — 아주 느린 자동 회전 ── */
      scene.rotation.y = t * 0.012;
      scene.rotation.x = Math.sin(t * 0.007) * 0.06;

      /* ── 각 구체 독립 부유 ── */
      spheres.forEach(function(s) {
        var b   = s.userData.base;
        var spd = s.userData.speed;
        var amp = s.userData.amp;
        var ph  = s.userData.phase;
        s.position.set(
          b[0] + Math.cos(t * spd       + ph) * amp,
          b[1] + Math.sin(t * spd * 0.7 + ph) * amp,
          b[2] + Math.sin(t * 0.4       + ph) * 0.15
        );
        /* 매우 느린 자전 */
        s.rotation.y += 0.002;
        s.rotation.x += 0.001;
        /* 부드러운 펄스 */
        var pulse = 1 + Math.sin(t * 0.9 + ph) * 0.018;
        s.scale.setScalar(pulse);
      });

      /* ── 링 회전 ── */
      rings.forEach(function(r) { r.rotation.z += r.userData.spd; });

      /* ── 조명 궤도 (씬 독립) ── */
      keyLight.position.x  = Math.sin(t * 0.4) * 5;
      keyLight.position.y  = Math.cos(t * 0.3) * 4;
      fillLight.position.x = Math.cos(t * 0.35) * 5;
      fillLight.position.z = Math.sin(t * 0.5)  * 3;

      renderer.render(scene, camera);
    })();
  }

  global.initSvcThreeBg = initSvcThreeBg;

})(window);
