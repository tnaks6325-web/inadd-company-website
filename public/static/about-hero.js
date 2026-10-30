/* 회사소개 히어로(상단 전체 화면, 한 바퀴 약 15초)
   - 제목(0~2초): '브랜드의 설득력을 / 설계하는 / 크리에이티브 퍼포먼스'가 한 줄씩 올라왔다가 위로 빠진다.
   - ① 사무실의 하루(약 2.5초): 실제 사무실 사진 6장(08:00~22:00)이 타임랩스처럼 빠르게 넘어가고 천천히 다가간다. 아래 가운데 시계 글자.
   - ② 사무실 한 바퀴(약 3.4초): 대표가 걸어 들어간 영상이 끝나면 꺼진 모니터에 ③ 첫 장면이 켜지고(원근 맞춤), 모니터 쪽으로 확대되며 화면 속으로.
   - ③ 크리에이티브 × 데이터: 네 줄의 손 장면이 줄마다 엇갈리며 점점 빠르게 바뀐다(아래에서 밀어 올림).
     네 줄이 가운데로 가속하며 모이고 '툭' — '크리에이티브와 데이터가 만나는 곳 · IN AD COMPANY'.
   1600x900 무대를 칸에 꽉 차게(cover) 키운다(--k·--x·--y). 히어로가 화면 밖이거나 탭이 숨겨지면 멈추고,
   '움직임 줄이기' 설정이면 마지막 화면에서 멈춘다. window.abhSeek(t) 로 특정 순간을 고정해 볼 수 있다. */
(function () {
  var root = document.querySelector('[data-abh]');
  if (!root) return;
  function q(k, from) { return (from || root).querySelector('[data-abh-' + k + ']'); }
  function qa(k, from) { return Array.prototype.slice.call((from || root).querySelectorAll('[data-abh-' + k + ']')); }
  var stage = q('stage'), tls = qa('tl'), tags = qa('tag'), meet = q('meet');
  var day = q('day'), dfs = qa('df'), cks = qa('ck'), clock = q('clock'), walk = q('walk'), wv = q('wv'), scr = q('scr');
  var cols = qa('col').map(function (c) { return { el: c, clips: qa('clip', c).map(function (x) { return { el: x, v: x.querySelector('video') }; }) }; });

  // 무대 배율: 칸을 빈틈없이 덮게
  function fit() {
    var w = root.clientWidth, h = root.clientHeight, k = Math.max(w / 1600, h / 900);
    root.style.setProperty('--k', k.toFixed(5));
    root.style.setProperty('--x', ((w - 1600 * k) / 2).toFixed(1) + 'px');
    root.style.setProperty('--y', ((h - 900 * k) / 2).toFixed(1) + 'px');
    root.classList.toggle('is-narrow', w / k < 1000);   // 휴대폰처럼 무대 가운데만 보이면 글자를 줄인다
  }
  fit(); window.addEventListener('resize', fit);

  // 시각표(초)
  var T_IN = 0.15, T_GAP = 0.18, T_OUT = [1.75, 2.1];
  // ① 사무실의 하루: 한 장 0.42초, 바뀔 때 0.08초 겹침
  var D0 = 1.9, FR = 0.42, XF = 0.08, DAY_END = D0 + dfs.length * FR;
  // ② 걷는 영상(3.36초) → 모니터 켜짐 → 확대해 화면 속으로
  var W0 = DAY_END - 0.12, WD = 3.36, WE = W0 + WD, SCR_IN = [WE - 0.05, WE + 0.3], ZOOM = [WE + 0.15, WE + 0.75];
  // 모니터 화면 네 귀퉁이(무대 좌표: 왼위·오위·오아래·왼아래)와 확대 배율
  var QUAD = [212, 56, 1425, 65, 1356, 725, 265, 635], QC = { x: 814.5, y: 370 }, ZS = 1.5;
  var C0 = WE + 0.72;
  // 줄마다 장면이 바뀌는 때(③ 시작 기준, 점점 빨라짐) — 바뀔 때 0.22초 동안 아래에서 밀어 올림
  var CUT = [[0, 1.0, 1.7], [0.3, 1.25, 1.9], [0.15, 1.1, 1.8], [0.45, 1.35, 2.0]], WIPE = 0.22;
  var MERGE = [2.55, 3.05], MEET_IN = [2.95, 3.25];
  var OUT = [C0 + 6.1, C0 + 6.5], CYCLE = C0 + 6.5;
  var CX = [198, 600, 1000, 1402];   // 줄 가운데 x

  function clamp(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
  function seg(l, r) { return clamp((l - r[0]) / (r[1] - r[0])); }
  function ease(x) { return 1 - Math.pow(1 - x, 3); }
  function accel(x) { return x * x * x; }
  function thud(h) { return Math.sin(Math.PI * h) * (1 - h); }
  function inout(x) { return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; }

  // 1600x900 사각형을 모니터 네 귀퉁이에 맞추는 원근 변환(matrix3d)
  (function () {
    var x0 = QUAD[0], y0 = QUAD[1], x1 = QUAD[2], y1 = QUAD[3], x2 = QUAD[4], y2 = QUAD[5], x3 = QUAD[6], y3 = QUAD[7];
    var dx1 = x1 - x2, dx2 = x3 - x2, dy1 = y1 - y2, dy2 = y3 - y2, sx = x0 - x1 + x2 - x3, sy = y0 - y1 + y2 - y3;
    var den = dx1 * dy2 - dx2 * dy1, g = (sx * dy2 - dx2 * sy) / den, h = (dx1 * sy - sx * dy1) / den;
    var a = x1 - x0 + g * x1, b = x3 - x0 + h * x3, d = y1 - y0 + g * y1, e = y3 - y0 + h * y3;
    scr.style.transform = 'matrix3d(' + [a / 1600, d / 1600, 0, g / 1600, b / 900, e / 900, 0, h / 900, 0, 0, 1, 0, x0, y0, 0, 1].join(',') + ')';
  })();

  // 걷는 영상: 시각표에 맞춰 재생(어긋나면 맞춤), 끝나면 마지막 장면에서 멈춤
  function syncWalk(l) {
    var want = Math.min(Math.max(l - W0, 0), WD - 0.03);
    var on = live && l >= W0 && l < WE;
    if (on) {
      if (wv.paused) { var pr = wv.play(); if (pr && pr.catch) pr.catch(function () {}); }
      if (Math.abs(wv.currentTime - want) > 0.25) wv.currentTime = want;
    } else {
      if (!wv.paused) wv.pause();
      if (Math.abs(wv.currentTime - want) > 0.05 && wv.readyState > 0) wv.currentTime = want;
    }
  }

  function render(t) {
    var l = t % CYCLE, vis = 1 - seg(l, OUT);
    // 제목
    var tout = accel(seg(l, T_OUT));
    tls.forEach(function (e, i) {
      var p = ease(seg(l, [T_IN + i * T_GAP, T_IN + i * T_GAP + 0.4]));
      e.style.opacity = (p * (1 - tout)).toFixed(3);
      e.style.transform = 'translateY(' + ((1 - p) * 40 - tout * 120).toFixed(1) + 'px)';
    });
    // ① 사무실의 하루
    var dv = seg(l, [D0, D0 + 0.2]) * (l < C0 ? 1 : 0);
    day.style.opacity = dv.toFixed(3);
    day.style.transform = 'scale(' + (1 + 0.06 * seg(l, [D0, DAY_END])).toFixed(4) + ')';
    dfs.forEach(function (f, k) {
      var a = D0 + k * FR, o = k === 0 ? 1 : seg(l, [a, a + XF]);
      f.style.opacity = (l >= a - XF || k === 0 ? o : 0).toFixed(3);
    });
    cks.forEach(function (b, k) { var a = D0 + k * FR; b.style.opacity = (l >= a && (k === cks.length - 1 || l < a + FR) ? 1 : 0); });
    clock.style.opacity = (1 - seg(l, [DAY_END - 0.2, DAY_END])).toFixed(3);
    // ② 사무실 한 바퀴 → 화면 속으로
    var z = inout(seg(l, ZOOM)), zs = 1 + (ZS - 1) * z;
    walk.style.opacity = (seg(l, [W0, W0 + 0.15]) * (l < C0 + 0.3 ? 1 : 0)).toFixed(3);
    walk.style.transform = 'translate(' + (QC.x + (800 - QC.x) * z - QC.x * zs).toFixed(1) + 'px,' + (QC.y + (450 - QC.y) * z - QC.y * zs).toFixed(1) + 'px) scale(' + zs.toFixed(4) + ')';
    scr.style.opacity = ease(seg(l, SCR_IN)).toFixed(3);
    syncWalk(l);
    // ③ (화면 속 첫 장면에서 이어지므로 네 줄은 제자리에서 나타난다)
    var u = l - C0, mg = accel(seg(u, MERGE));
    cols.forEach(function (c, i) {
      var x = (800 - CX[i]) * mg, sx = 1 - 0.75 * mg;
      c.el.style.opacity = (vis * seg(u, [-0.12, 0.02]) * (1 - seg(u, [MERGE[1] - 0.12, MERGE[1] + 0.08]))).toFixed(3);
      c.el.style.transform = 'translate(' + x.toFixed(1) + 'px,0px) scale(' + sx.toFixed(4) + ',' + (1 - 0.3 * mg).toFixed(4) + ')';
      c.clips.forEach(function (x2, k) {
        var at = CUT[i][k], w = k === 0 ? 1 : ease(seg(u, [at, at + WIPE]));
        var gone = k < c.clips.length - 1 ? (u >= CUT[i][k + 1] + WIPE ? 1 : 0) : 0;
        x2.el.style.zIndex = k + 1;
        x2.el.style.transform = 'translateY(' + ((1 - w) * 100).toFixed(2) + '%)';
        x2.el.style.visibility = (u >= at || k === 0) && !gone ? 'visible' : 'hidden';
        var on = live && vis > 0 && u >= Math.max(0, at) && !gone && u < MERGE[1];
        if (x2.v) { if (on) { if (x2.v.paused) { var pr = x2.v.play(); if (pr && pr.catch) pr.catch(function () {}); } } else if (!x2.v.paused) x2.v.pause(); }
      });
    });
    tags.forEach(function (g, i) {
      var p = ease(seg(u, [0.45, 0.75]));
      g.style.opacity = (u >= 0 ? vis * p * (1 - seg(u, [MERGE[0], MERGE[0] + 0.2])) : 0).toFixed(3);
      g.style.transform = 'translateY(' + ((1 - p) * -20).toFixed(1) + 'px)';
    });
    var mi = ease(seg(u, MEET_IN)), mh = seg(u, [MEET_IN[1], MEET_IN[1] + 0.25]);
    meet.style.opacity = (u >= 0 ? vis * mi : 0).toFixed(3);
    meet.style.transform = 'translate(-50%,-50%) scale(' + ((0.86 + 0.14 * mi) * (1 + 0.05 * thud(mh))).toFixed(4) + ')';
  }

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var t = 0, prev = 0, on = true, held = false, live = false;
  window.abhSeek = function (s) { held = true; live = false; t = s; render(t); };
  window.abhTimes = { D0: D0, W0: W0, WE: WE, C0: C0, MERGE: MERGE, CYCLE: CYCLE };
  if (reduce) { t = C0 + 4.5; render(t); return; }
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
