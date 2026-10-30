/* 회사소개 히어로(한 바퀴 약 12초). 순서 A: 일하는 방식 → 결과 → 쌓아 온 시간 / B: 결과 → 일하는 방식 → 쌓아 온 시간.
   - 일하는 방식: 채널 장면 6개가 0.55초 간격으로 크게 떴다가 가속하며 3x2 칸으로 '툭' 모인다(영상은 계속 재생).
   - 결과: 실제 고객 로고 130개가 가운데에서 점점 빠르게 터져 흩어졌다가, 가속하며 한 줄로 모여 'IN AD COMPANY'.
   - 쌓아 온 시간: 회사 이름이 위로 올라가고 2019~2026 막대가 차례로 차오른 뒤 한 줄.
   화면은 시간 t 하나로 계산한다(render). 히어로가 화면 밖이거나 탭이 숨겨지면 멈추고(영상도 멈춤),
   '움직임 줄이기' 설정이면 마지막 화면에서 멈춘다. window.abhSeek(t) 로 특정 순간을 고정해 볼 수 있다. */
(function () {
  var root = document.querySelector('[data-abh]');
  if (!root) return;
  function q(k) { return root.querySelector('[data-abh-' + k + ']'); }
  function qa(k) { return Array.prototype.slice.call(root.querySelectorAll('[data-abh-' + k + ']')); }
  var scs = qa('sc'), lgs = qa('lg'), word = q('word'), wsub = q('wsub'), hist = q('hist'), bars = qa('bar'), foot = q('foot');
  var vids = scs.map(function (s) { return s.querySelector('video'); });
  var m = /[?&]abh=([ab])/.exec(location.search);
  var ORDER = m ? m[1] : root.getAttribute('data-abh-order') || 'a';

  // 막(초): 일하는 방식 4.2초, 결과 3.4초, 쌓아 온 시간 4.0초
  var MLEN = 4.2, RLEN = 3.4;
  var M0 = ORDER === 'a' ? 0.2 : 0.2 + RLEN, R0 = ORDER === 'a' ? 0.2 + MLEN : 0.2, H0 = 0.2 + MLEN + RLEN;
  var OUT = [H0 + 3.8, H0 + 4.2], CYCLE = H0 + 4.2;
  // 일하는 방식: 장면 하나는 0.12초에 뜨고 0.42초까지 머문 뒤 0.2초 동안 칸으로
  var SC_GAP = 0.55, SC_IN = 0.12, SC_HOLD = 0.42, SC_FLY = 0.62, SC_OUT = [MLEN - 0.3, MLEN];
  var BIG = { x: 340, y: 320 }, TILE_S = 0.392;
  var TILE = [[122, 240], [340, 240], [558, 240], [122, 408], [340, 408], [558, 408]];
  // 결과: 로고는 0.02초 → 0.005초 간격으로 터지고(각 0.45초), 1.75초에 모이기 시작(0.5초)
  var LG_IN = 0.45, CONV = [1.75, 2.25], WORD_IN = [2.15, 2.4];
  var LAT = [], la = 0;
  for (var i = 0; i < lgs.length; i++) { LAT.push(la); la += 0.02 + (0.005 - 0.02) * (i / Math.max(1, lgs.length - 1)); }
  // 회사 이름 자리: 가운데(크게) → 위(작게)
  var WORD_MID = 260, WORD_TOP = 30, WORD_TOP_S = 0.62;

  var seed = 11; function rnd() { seed = (seed * 16807) % 2147483647; return seed / 2147483647; }
  var LSPOT = lgs.map(function () {
    var a = rnd() * Math.PI * 2, r = 0.35 + 0.65 * Math.sqrt(rnd());
    return { x: 340 + Math.cos(a) * r * 290, y: 310 + Math.sin(a) * r * 270, a: (rnd() - 0.5) * 16, s: 0.85 + rnd() * 0.3,
      tx: 130 + rnd() * 420, ty: WORD_MID + 10 + rnd() * 40, dl: rnd() * 0.15 };
  });

  function clamp(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
  function seg(l, r) { return clamp((l - r[0]) / (r[1] - r[0])); }
  function ease(x) { return 1 - Math.pow(1 - x, 3); }
  function accel(x) { return x * x * x; }
  function inout(x) { return x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; }
  function lerp(a, b, p) { return a + (b - a) * p; }
  function thud(h) { return Math.sin(Math.PI * h) * (1 - h); }

  function render(t) {
    var l = t % CYCLE;
    var vis = ease(seg(l, [0, 0.2])) * (1 - seg(l, OUT));

    // 일하는 방식
    var mu = l - M0, mOut = ORDER === 'a' ? accel(seg(mu, SC_OUT)) : ease(seg(mu, SC_OUT));
    scs.forEach(function (s, k) {
      var u = mu - k * SC_GAP;
      var e = ease(seg(u, [0, SC_IN])), d = accel(seg(u, [SC_HOLD, SC_FLY])), hit = seg(u, [SC_FLY, SC_FLY + 0.2]);
      var x = lerp(BIG.x, TILE[k][0], d), y = lerp(BIG.y, TILE[k][1], d), sc = lerp(0.9 + 0.1 * e, TILE_S, d) * (1 + 0.05 * thud(hit));
      // 끝: A 는 가운데로 빨려 들어가 로고로 이어지고, B 는 그 자리에서 작아지며 사라진다
      if (ORDER === 'a') { x = lerp(x, 340, mOut); y = lerp(y, 310, mOut); }
      sc *= 1 - 0.85 * mOut;
      var o = mu >= 0 && mu < MLEN ? vis * e * (1 - mOut) : 0;
      s.style.opacity = o.toFixed(3);
      s.style.zIndex = 10 + k;
      s.style.transform = 'translate(' + (x - 260).toFixed(1) + 'px,' + (y - 195).toFixed(1) + 'px) rotate(' + ((k % 2 ? 1 : -1) * 1.5 * d * (1 - mOut)).toFixed(2) + 'deg) scale(' + sc.toFixed(4) + ')';
      var v = vids[k];
      if (v) { if (live && o > 0) { if (v.paused) { var pr = v.play(); if (pr && pr.catch) pr.catch(function () {}); } } else if (!v.paused) v.pause(); }
    });

    // 결과: 로고가 터졌다가 모여 회사 이름
    var ru = l - R0, conv = seg(ru, CONV);
    lgs.forEach(function (g, k) {
      var o = LSPOT[k], b = ease(seg(ru - LAT[k], [0, LG_IN])), c = accel(seg(ru, [CONV[0] + o.dl, CONV[1] + o.dl * 0.4]));
      var x = lerp(lerp(340, o.x, b), o.tx, c), y = lerp(lerp(310, o.y, b), o.ty, c);
      g.style.opacity = (ru >= 0 && ru < RLEN ? vis * seg(ru - LAT[k], [0, 0.08]) * (1 - seg(c, [0.7, 1])) : 0).toFixed(3);
      g.style.transform = 'translate(' + (x - 55).toFixed(1) + 'px,' + (y - 20.5).toFixed(1) + 'px) rotate(' + (o.a * b * (1 - c)).toFixed(2) + 'deg) scale(' + (lerp(0.3, o.s, b) * (1 - 0.88 * c)).toFixed(4) + ')';
    });
    // 회사 이름: 모일 때 '툭' 나타나고, 쌓아 온 시간(또는 B 의 일하는 방식)으로 넘어가면 위로 작게
    var wIn = l >= R0 ? ease(seg(ru, WORD_IN)) : 0, wHit = seg(ru, [WORD_IN[1] - 0.05, WORD_IN[1] + 0.25]);
    var upAt = ORDER === 'a' ? H0 : M0, up = l >= upAt ? inout(seg(l - upAt, [0, 0.4])) : 0;
    if (ORDER === 'b' && l < R0) wIn = 0;
    word.style.opacity = (vis * wIn).toFixed(3);
    word.style.transform = 'translateY(' + lerp(WORD_MID, WORD_TOP, up).toFixed(1) + 'px) scale(' + (lerp(1, WORD_TOP_S, up) * (0.92 + 0.08 * wIn) * (1 + 0.05 * thud(wHit))).toFixed(4) + ')';
    wsub.style.opacity = (1 - up).toFixed(3);

    // 쌓아 온 시간
    var hu = l - H0;
    hist.style.opacity = (hu >= 0 ? vis * ease(seg(hu, [0.25, 0.5])) : 0).toFixed(3);
    bars.forEach(function (b, k) {
      var p = ease(seg(hu, [0.45 + k * 0.12, 0.8 + k * 0.12]));
      b.style.setProperty('--p', p.toFixed(3));
    });
    var f = ease(seg(hu, [1.75, 2.05]));
    foot.style.opacity = f.toFixed(3);
    foot.style.transform = 'translateY(' + ((1 - f) * 10).toFixed(1) + 'px)';
  }

  // 브랜드 수: 포트폴리오 목록 수로 맞춘다(실패하면 기본값 그대로)
  if (window.fetch) fetch('/api/admin/public/works').then(function (r) { return r.json(); }).then(function (d) {
    var n = d && d.items ? d.items.length : 0; if (n > 0) qa('brands').forEach(function (e) { e.textContent = n.toLocaleString('ko-KR'); });
  }).catch(function () {});

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var t = 0, prev = 0, on = true, held = false, live = false;
  window.abhSeek = function (s) { held = true; live = false; t = s; render(t); };
  window.abhTimes = { ORDER: ORDER, M0: M0, R0: R0, H0: H0, CYCLE: CYCLE };
  if (reduce) { t = H0 + 3; render(t); return; }
  if ('IntersectionObserver' in window) new IntersectionObserver(function (e) { on = e[0].isIntersecting; }).observe(root);
  function frame(now) {
    var dt = prev ? Math.min(0.1, (now - prev) / 1000) : 0; prev = now;
    live = !held && on && !document.hidden;
    if (live) t += dt;
    render(t);
    requestAnimationFrame(frame);
  }
  render(0);
  requestAnimationFrame(frame);
})();
