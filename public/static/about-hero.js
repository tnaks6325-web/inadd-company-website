/* 회사소개 히어로(상단 전체 화면, 한 바퀴 약 12.4초)
   - 제목(0~2초): '브랜드의 설득력을 / 설계하는 / 크리에이티브 퍼포먼스'가 한 줄씩 올라왔다가 위로 빠진다.
   - ① 사무실의 하루(약 2.5초): 실제 사무실 사진 6장(08:00~22:00)이 타임랩스처럼 빠르게 넘어가고 천천히 다가간다. 아래 가운데 시계 글자.
   - ② 화면 속으로(약 1.5초): 마지막 밤 사진에서 오른쪽 줄 가운데 모니터로 점점 빨라지며 쭉 빨려 들어간다(약 22배).
     모니터에는 ③ 첫 장면이 원근으로 켜지고, 화면이 무대를 다 덮으면 ③으로 이어진다.
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
  var day = q('day'), dfs = qa('df'), cks = qa('ck'), clock = q('clock'), zps = qa('zp'), scr = q('scr');
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
  var NIGHT = D0 + (dfs.length - 1) * FR + XF;   // 밤 사진(원본)이 다 보인 때 — 고해상도 조각은 이때부터
  // ② 밤 사진의 모니터 화면 네 귀퉁이(무대 좌표: 왼위·오위·오아래·왼아래)와 그 가운데, 끝 배율
  var QUAD = [983.7, 341.9, 1100.8, 342.6, 1091.5, 413.2, 980.2, 413.0], F = { x: 1039.05, y: 377.7 }, ZMAX = 22;
  var ZOOM = [DAY_END - 0.2, DAY_END + 1.3], SCR_IN = [ZOOM[0] + 0.5, ZOOM[0] + 0.9];
  var C0 = ZOOM[1];
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

  // 1600x900 사각형을 네 점(왼위·오위·오아래·왼아래)에 맞추는 원근 변환(matrix3d)
  function quad3d(p) {
    var x0 = p[0], y0 = p[1], x1 = p[2], y1 = p[3], x2 = p[4], y2 = p[5], x3 = p[6], y3 = p[7];
    var dx1 = x1 - x2, dx2 = x3 - x2, dy1 = y1 - y2, dy2 = y3 - y2, sx = x0 - x1 + x2 - x3, sy = y0 - y1 + y2 - y3;
    var den = dx1 * dy2 - dx2 * dy1, g = (sx * dy2 - dx2 * sy) / den, h = (dx1 * sy - sx * dy1) / den;
    var a = x1 - x0 + g * x1, b = x3 - x0 + h * x3, d = y1 - y0 + g * y1, e = y3 - y0 + h * y3;
    return 'matrix3d(' + [a / 1600, d / 1600, 0, g / 1600, b / 900, e / 900, 0, h / 900, 0, 0, 1, 0, x0, y0, 0, 1].join(',') + ')';
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
    // 사진 전체 움직임 = 천천히 다가감(가운데 기준 1→1.06) + ② 모니터로 확대(배율은 로그로 점점 빨라짐, 모니터 가운데가 무대 가운데로)
    var pu = 1 + 0.06 * seg(l, [D0, DAY_END]), zq = seg(l, ZOOM), zq2 = zq * zq, s = Math.pow(ZMAX, zq2);
    var f1x = 800 + (F.x - 800) * pu, f1y = 450 + (F.y - 450) * pu;
    var A = pu * s, BX = 800 * (1 - pu) * s + f1x + (800 - f1x) * zq2 - f1x * s, BY = 450 * (1 - pu) * s + f1y + (450 - f1y) * zq2 - f1y * s;
    day.style.opacity = (seg(l, [D0, D0 + 0.2]) * (l < C0 + 0.2 ? 1 : 0)).toFixed(3);
    day.style.transform = 'translate(' + BX.toFixed(2) + 'px,' + BY.toFixed(2) + 'px) scale(' + A.toFixed(5) + ')';
    zps.forEach(function (z) { z.style.opacity = l >= NIGHT ? 1 : 0; });
    dfs.forEach(function (f, k) {
      var a = D0 + k * FR, o = k === 0 ? 1 : seg(l, [a, a + XF]);
      f.style.opacity = (l >= a - XF || k === 0 ? o : 0).toFixed(3);
    });
    cks.forEach(function (b, k) { var a = D0 + k * FR; b.style.opacity = (l >= a && (k === cks.length - 1 || l < a + FR) ? 1 : 0); });
    clock.style.opacity = (1 - seg(l, [DAY_END - 0.2, DAY_END])).toFixed(3);
    // ② 모니터 화면: 사진과 같은 움직임을 네 귀퉁이에 적용해 원근으로 붙인다(선명하게 그리려고 사진 밖에 따로 둠)
    var sv = ease(seg(l, SCR_IN)) * (l < C0 + 0.2 ? 1 : 0);
    scr.style.opacity = sv.toFixed(3);
    if (sv > 0) scr.style.transform = quad3d(QUAD.map(function (v, i) { return i % 2 ? v * A + BY : v * A + BX; }));
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
  window.abhTimes = { D0: D0, NIGHT: NIGHT, ZOOM: ZOOM, C0: C0, MERGE: MERGE, CYCLE: CYCLE };
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
