/**
 * svc-three-bg.js  v4
 * - 캔버스를 vh-hero 섹션 내부 absolute로 고정 (히어로에서만 보임)
 * - 전체 페이지 고정(fixed) 방식 제거 → 히어로 섹션 스크롤 아웃과 함께 사라짐
 * 사용법: initSvcThreeBg(primaryHex, secondaryHex, accentHex)
 */
(function(global){

  function initSvcThreeBg(primaryHex, secondaryHex, accentHex) {
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

    /* ── 히어로 섹션과 캔버스 엘리먼트 찾기 ── */
    var heroEl  = document.querySelector('.vh-hero');
    var canvas  = document.getElementById('vhCanvas');

    /* 둘 다 없으면 구버전 방식(body fixed)으로 폴백 */
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = '__svc-three-bg__';
    }

    /* 히어로 섹션 내부에서 absolute로 꽉 채우기 */
    if (heroEl) {
      heroEl.style.position = 'relative';
      heroEl.style.overflow = 'hidden';
    }

    canvas.style.cssText = [
      'position:absolute',
      'inset:0',
      'width:100%',
      'height:100%',
      'pointer-events:none',
      'z-index:0'
    ].join(';');

    /* 히어로 내부에 없으면 히어로 첫 자식으로 삽입 */
    if (heroEl && !heroEl.contains(canvas)) {
      heroEl.insertBefore(canvas, heroEl.firstChild);
    }

    /* 기존 vh-bg, vh-orb 등 배경 레이어는 숨기지 않고 z-index 위로만 올림 */
    var styleTag = document.createElement('style');
    styleTag.textContent = [
      /* vh-bg가 캔버스 위에 오도록 */
      '.vh-bg   { z-index:1 !important; pointer-events:none; }',
      /* 히어로 콘텐츠가 캔버스+배경 위에 오도록 */
      '.vh-inner { position:relative; z-index:2; }',
      /* 히어로 아래 일반 섹션들 — 기존 배경색 유지 (fixed 캔버스 없으므로 오버레이 불필요) */
    ].join('\n');
    document.head.appendChild(styleTag);

    /* 히어로 크기 기준으로 렌더러 초기화 */
    var W = heroEl ? heroEl.offsetWidth  : window.innerWidth;
    var H = heroEl ? heroEl.offsetHeight : window.innerHeight;

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
      mesh.userData.base  = d.p.slice();
      mesh.userData.speed = 0.28 + Math.random() * 0.18;
      mesh.userData.amp   = 0.35 + Math.random() * 0.25;
      mesh.userData.phase = Math.random() * Math.PI * 2;
      scene.add(mesh);
      return mesh;
    });

    /* ── 환경 파티클 ── */
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

    /* ── 공전 링 3개 ── */
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
    var mouse       = { x: 0, y: 0 };
    var mouseSmooth = { x: 0, y: 0 };
    var mousePrev   = { x: 0, y: 0 };

    window.addEventListener('mousemove', function(e) {
      /* 히어로 내 상대 좌표로 계산 */
      var rect = heroEl ? heroEl.getBoundingClientRect() : { left:0, top:0, width:window.innerWidth, height:window.innerHeight };
      mouse.x =  ((e.clientX - rect.left) / rect.width)  * 2 - 1;
      mouse.y = -((e.clientY - rect.top)  / rect.height) * 2 + 1;
    });

    var fogLight = new THREE.PointLight(primaryHex, 0, 18);
    fogLight.position.set(0, 0, 6);
    scene.add(fogLight);

    var fogTrail = new THREE.PointLight(accentHex, 0, 12);
    fogTrail.position.set(0, 0, 5);
    scene.add(fogTrail);

    /* 마우스 먼지 파티클 */
    var dustN   = 180;
    var dustBuf = new Float32Array(dustN * 3);
    var dustVel = new Float32Array(dustN * 3);
    for (var i = 0; i < dustN; i++) {
      dustBuf[i*3]   = (Math.random() - 0.5) * 14;
      dustBuf[i*3+1] = (Math.random() - 0.5) * 10;
      dustBuf[i*3+2] = (Math.random() - 0.5) * 4 + 4;
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
      opacity:     0,
      depthWrite:  false,
      blending:    THREE.AdditiveBlending,
    });
    scene.add(new THREE.Points(dustGeo, dustMat));

    var mouseSpeed     = 0;
    var mouseSpeedSmth = 0;

    /* ── 리사이즈: 히어로 크기 기준 ── */
    window.addEventListener('resize', function() {
      W = heroEl ? heroEl.offsetWidth  : window.innerWidth;
      H = heroEl ? heroEl.offsetHeight : window.innerHeight;
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      renderer.setSize(W, H);
    });

    /* ── 애니메이션 루프 ── */
    var clock = new THREE.Clock();
    var alive = true;

    /* 히어로가 viewport 밖으로 완전히 나가면 렌더링 중단 (성능 최적화) */
    var observer = new IntersectionObserver(function(entries) {
      alive = entries[0].isIntersecting;
    }, { threshold: 0 });
    if (heroEl) observer.observe(heroEl);

    (function animate() {
      requestAnimationFrame(animate);
      if (!alive) return;   /* 히어로 안 보이면 렌더링 스킵 */

      var t = clock.getElapsedTime();

      mouseSmooth.x += (mouse.x - mouseSmooth.x) * 0.04;
      mouseSmooth.y += (mouse.y - mouseSmooth.y) * 0.04;

      var dx = mouseSmooth.x - mousePrev.x;
      var dy = mouseSmooth.y - mousePrev.y;
      mouseSpeed     = Math.min(Math.sqrt(dx*dx + dy*dy) * 60, 1);
      mouseSpeedSmth += (mouseSpeed - mouseSpeedSmth) * 0.08;
      mousePrev.x = mouseSmooth.x;
      mousePrev.y = mouseSmooth.y;

      var mwx = mouseSmooth.x * 7.5;
      var mwy = mouseSmooth.y * 5.5;

      fogLight.position.x += (mwx - fogLight.position.x) * 0.035;
      fogLight.position.y += (mwy - fogLight.position.y) * 0.035;
      fogLight.intensity = 4 + mouseSpeedSmth * 5;
      fogLight.color.setHex(mouseSpeedSmth > 0.4 ? accentHex : primaryHex);

      fogTrail.position.x += (fogLight.position.x - fogTrail.position.x) * 0.018;
      fogTrail.position.y += (fogLight.position.y - fogTrail.position.y) * 0.018;
      fogTrail.intensity = 2.5 + mouseSpeedSmth * 3;

      var attr = dustGeo.getAttribute('position');
      for (var i = 0; i < dustN; i++) {
        var px = attr.getX(i);
        var py = attr.getY(i);
        var pz = attr.getZ(i);
        var ex   = mwx - px;
        var ey   = mwy - py;
        var dist2 = ex*ex + ey*ey;
        var pull  = 0.0006 / (dist2 * 0.08 + 0.5);
        px += dustVel[i*3]   + ex * pull;
        py += dustVel[i*3+1] + ey * pull;
        pz += Math.sin(t * 0.3 + i * 0.4) * 0.003;
        if (dist2 > 120) {
          px = mwx + (Math.random() - 0.5) * 5;
          py = mwy + (Math.random() - 0.5) * 4;
          pz = 4.5 + Math.random() * 1.5;
        }
        attr.setXYZ(i, px, py, pz);
      }
      attr.needsUpdate = true;
      dustMat.opacity = 0.12 + mouseSpeedSmth * 0.45;
      dustMat.size    = 0.045 + mouseSpeedSmth * 0.035;

      scene.rotation.y = t * 0.012;
      scene.rotation.x = Math.sin(t * 0.007) * 0.06;

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
        s.rotation.y += 0.002;
        s.rotation.x += 0.001;
        var pulse = 1 + Math.sin(t * 0.9 + ph) * 0.018;
        s.scale.setScalar(pulse);
      });

      rings.forEach(function(r) { r.rotation.z += r.userData.spd; });

      keyLight.position.x  = Math.sin(t * 0.4) * 5;
      keyLight.position.y  = Math.cos(t * 0.3) * 4;
      fillLight.position.x = Math.cos(t * 0.35) * 5;
      fillLight.position.z = Math.sin(t * 0.5)  * 3;

      renderer.render(scene, camera);
    })();
  }

  global.initSvcThreeBg = initSvcThreeBg;

})(window);
