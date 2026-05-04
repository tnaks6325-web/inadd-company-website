/**
 * svc-three-bg.js
 * 세부 마케팅 페이지 공통 Three.js 배경 이펙트
 * 사용법: initSvcThreeBg(canvasId, primaryColor, secondaryColor, accentColor)
 * 예) initSvcThreeBg('vhCanvas', 0x1a6bff, 0x00d4a8, 0x8844ff)
 */
(function(global){

  function initSvcThreeBg(canvasId, primaryHex, secondaryHex, accentHex) {
    /* Three.js 로드 후 씬 초기화 */
    if (global.THREE) {
      _buildScene(canvasId, primaryHex, secondaryHex, accentHex);
      return;
    }
    var s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js';
    s.onload = function(){ _buildScene(canvasId, primaryHex, secondaryHex, accentHex); };
    document.head.appendChild(s);
  }

  function _buildScene(canvasId, primaryHex, secondaryHex, accentHex) {
    var canvas = document.getElementById(canvasId);
    if (!canvas) return;

    var section = canvas.closest('section') || canvas.parentElement;
    var W = window.innerWidth;
    var H = section.offsetHeight || window.innerHeight;

    /* ── 렌더러 ── */
    var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: false });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x020814, 1);

    /* ── 씬 & 카메라 ── */
    var scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020814, 0.038);

    var camera = new THREE.PerspectiveCamera(58, W / H, 0.1, 100);
    camera.position.set(0, 0, 9);

    /* ── 조명 ── */
    scene.add(new THREE.AmbientLight(0xffffff, 0.2));

    var keyLight = new THREE.PointLight(primaryHex, 10, 18);
    keyLight.position.set(-2, 3, 4);
    scene.add(keyLight);

    var fillLight = new THREE.PointLight(secondaryHex, 5, 14);
    fillLight.position.set(4, -2, 3);
    scene.add(fillLight);

    var rimLight = new THREE.PointLight(accentHex, 3, 10);
    rimLight.position.set(0, -4, 1);
    scene.add(rimLight);

    var backLight = new THREE.PointLight(primaryHex, 2, 8);
    backLight.position.set(3, 3, -3);
    scene.add(backLight);

    /* ── 메인 구체 3개 (서비스 아이덴티티) ── */
    var sphereDefs = [
      { p: [ 2.6,  1.5,  0.0],  r: 1.0,  col: primaryHex,   emi: _darken(primaryHex,   0.08) },
      { p: [ 4.6, -0.4, -1.0],  r: 0.72, col: secondaryHex, emi: _darken(secondaryHex, 0.06) },
      { p: [ 1.5, -1.9,  0.6],  r: 0.55, col: accentHex,    emi: _darken(accentHex,    0.05) },
    ];

    var spheres = sphereDefs.map(function(d) {
      var geo = new THREE.SphereGeometry(d.r, 64, 64);
      var mat = new THREE.MeshStandardMaterial({
        color:             d.col,
        emissive:          d.emi,
        emissiveIntensity: 0.45,
        metalness:         0.80,
        roughness:         0.12,
      });
      var mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(d.p[0], d.p[1], d.p[2]);
      mesh.userData.base = d.p.slice();
      scene.add(mesh);
      return mesh;
    });

    /* ── 구체 사이 광섬유 연결선 ── */
    [[0,1],[1,2],[0,2]].forEach(function(pair) {
      var a = new THREE.Vector3().fromArray(sphereDefs[pair[0]].p);
      var b = new THREE.Vector3().fromArray(sphereDefs[pair[1]].p);
      var pts = [];
      for (var i = 0; i <= 24; i++) {
        var t = i / 24;
        var v = new THREE.Vector3().lerpVectors(a, b, t);
        v.z += Math.sin(t * Math.PI) * 0.5;
        pts.push(v);
      }
      var curve = new THREE.CatmullRomCurve3(pts);
      scene.add(new THREE.Mesh(
        new THREE.TubeGeometry(curve, 30, 0.014, 8, false),
        new THREE.MeshBasicMaterial({ color: primaryHex, transparent: true, opacity: 0.20 })
      ));
    });

    /* ── 소형 위성 구체 6개 (배경에 흩뿌림) ── */
    var miniSpheres = [];
    var miniDefs = [
      { p: [-2.0,  2.0, -2.0], r: 0.30 },
      { p: [ 6.5,  2.5, -1.5], r: 0.22 },
      { p: [-1.5, -2.5, -1.0], r: 0.18 },
      { p: [ 5.5, -2.8, -2.0], r: 0.25 },
      { p: [ 3.5,  3.5, -2.5], r: 0.15 },
      { p: [ 0.5, -3.8, -1.5], r: 0.20 },
    ];
    miniDefs.forEach(function(d) {
      var mat = new THREE.MeshStandardMaterial({
        color: primaryHex, metalness: 0.9, roughness: 0.1,
        transparent: true, opacity: 0.45,
      });
      var mesh = new THREE.Mesh(new THREE.SphereGeometry(d.r, 32, 32), mat);
      mesh.position.fromArray(d.p);
      mesh.userData.base = d.p.slice();
      scene.add(mesh);
      miniSpheres.push(mesh);
    });

    /* ── 환경 파티클 ── */
    var pN = 900, pBuf = new Float32Array(pN * 3);
    for (var i = 0; i < pN; i++) {
      pBuf[i*3]   = (Math.random() - 0.5) * 22;
      pBuf[i*3+1] = (Math.random() - 0.5) * 15;
      pBuf[i*3+2] = (Math.random() - 0.5) * 10 - 2;
    }
    var pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pBuf, 3));
    scene.add(new THREE.Points(pGeo,
      new THREE.PointsMaterial({ color: primaryHex, size: 0.042, transparent: true, opacity: 0.5 })
    ));

    /* ── 공전 링 2개 ── */
    var ringA = new THREE.Mesh(
      new THREE.TorusGeometry(3.6, 0.011, 16, 140),
      new THREE.MeshBasicMaterial({ color: primaryHex, transparent: true, opacity: 0.12 })
    );
    ringA.rotation.set(Math.PI / 5, 0, Math.PI / 7);
    scene.add(ringA);

    var ringB = new THREE.Mesh(
      new THREE.TorusGeometry(2.3, 0.008, 16, 100),
      new THREE.MeshBasicMaterial({ color: secondaryHex, transparent: true, opacity: 0.09 })
    );
    ringB.rotation.set(-Math.PI / 4, Math.PI / 5, 0);
    scene.add(ringB);

    /* ── 마우스 패럴랙스 ── */
    var mouse = { x: 0, y: 0 }, rot = { x: 0, y: 0 };
    document.addEventListener('mousemove', function(e) {
      mouse.x =  (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    });

    /* ── 리사이즈 ── */
    window.addEventListener('resize', function() {
      W = window.innerWidth;
      H = section.offsetHeight || window.innerHeight;
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      renderer.setSize(W, H);
    });

    /* ── 애니메이션 루프 ── */
    var clock = new THREE.Clock();
    (function animate() {
      requestAnimationFrame(animate);
      var t = clock.getElapsedTime();

      /* 씬 전체 — 느린 자동 + 마우스 */
      rot.x += (mouse.y * 0.16 - rot.x) * 0.04;
      rot.y += (mouse.x * 0.20 + t * 0.055 - rot.y) * 0.03;
      scene.rotation.x = rot.x;
      scene.rotation.y = rot.y;

      /* 메인 구체 부유 */
      spheres.forEach(function(s, i) {
        var b = s.userData.base;
        var spd = 0.35 + i * 0.12, amp = 0.18 + i * 0.05;
        s.position.set(
          b[0] + Math.cos(t * spd + i * 1.4) * amp,
          b[1] + Math.sin(t * spd * 0.8 + i) * amp,
          b[2] + Math.sin(t * 0.5  + i)      * 0.12
        );
        s.rotation.x += 0.003 + i * 0.001;
        s.rotation.y += 0.004 + i * 0.002;
        var pulse = 1 + Math.sin(t * 1.2 + i * 1.6) * 0.022;
        s.scale.setScalar(pulse);
      });

      /* 소형 위성 부유 */
      miniSpheres.forEach(function(s, i) {
        var b = s.userData.base;
        var spd = 0.25 + i * 0.08;
        s.position.set(
          b[0] + Math.cos(t * spd + i) * 0.25,
          b[1] + Math.sin(t * spd + i) * 0.20,
          b[2] + Math.sin(t * 0.3 + i) * 0.10
        );
      });

      /* 링 회전 */
      ringA.rotation.z += 0.0022;
      ringB.rotation.z -= 0.0016;
      ringB.rotation.x += 0.0007;

      /* 조명 궤도 */
      keyLight.position.x  = Math.sin(t * 0.55) * 4;
      keyLight.position.y  = Math.cos(t * 0.38) * 3;
      fillLight.position.x = Math.cos(t * 0.42) * 4;
      fillLight.position.z = Math.sin(t * 0.60) * 2;
      rimLight.position.x  = Math.sin(t * 0.28 + 1) * 3;

      renderer.render(scene, camera);
    })();
  }

  /* 색상 어두운 버전 (emissive용) */
  function _darken(hex, factor) {
    var r = ((hex >> 16) & 0xff) * factor;
    var g = ((hex >>  8) & 0xff) * factor;
    var b =  (hex        & 0xff) * factor;
    return (Math.round(r) << 16) | (Math.round(g) << 8) | Math.round(b);
  }

  global.initSvcThreeBg = initSvcThreeBg;

})(window);
