/* 회사소개 히어로(상단 전체 화면, 지금 한 바퀴 약 8.5초) — ①②는 대표 자료를 받으면 제목과 ③ 사이에 붙인다.
   - 제목(0~2초): '브랜드의 설득력을 / 설계하는 / 크리에이티브 퍼포먼스'가 한 줄씩 올라왔다가 위로 빠진다.
   - ③ 크리에이티브 × 데이터: 네 줄이 위·아래에서 번갈아 들어오고, 손 장면이 줄마다 엇갈리며 점점 빠르게 바뀐다(아래에서 밀어 올림).
     네 줄이 가운데로 가속하며 모이고 '툭' — '크리에이티브와 데이터가 만나는 곳 · IN AD COMPANY'.
   1600x900 무대를 칸에 꽉 차게(cover) 키운다(--k·--x·--y). 히어로가 화면 밖이거나 탭이 숨겨지면 멈추고,
   '움직임 줄이기' 설정이면 마지막 화면에서 멈춘다. window.abhSeek(t) 로 특정 순간을 고정해 볼 수 있다. */
(function () {
  var root = document.querySelector('[data-abh]');
  if (!root) return;
  function q(k, from) { return (from || root).querySelector('[data-abh-' + k + ']'); }
  function qa(k, from) { return Array.prototype.slice.call((from || root).querySelectorAll('[data-abh-' + k + ']')); }
  var stage = q('stage'), tls = qa('tl'), tags = qa('tag'), meet = q('meet');
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
  var C0 = 1.95, COL_IN = 0.4, COL_GAP = 0.08;
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

  function render(t) {
    var l = t % CYCLE, vis = 1 - seg(l, OUT);
    // 제목
    var tout = accel(seg(l, T_OUT));
    tls.forEach(function (e, i) {
      var p = ease(seg(l, [T_IN + i * T_GAP, T_IN + i * T_GAP + 0.4]));
      e.style.opacity = (p * (1 - tout)).toFixed(3);
      e.style.transform = 'translateY(' + ((1 - p) * 40 - tout * 120).toFixed(1) + 'px)';
    });
    // ③
    var u = l - C0, mg = accel(seg(u, MERGE));
    cols.forEach(function (c, i) {
      var p = ease(seg(u, [i * COL_GAP, i * COL_GAP + COL_IN])), dir = i % 2 ? 1 : -1;
      var x = (800 - CX[i]) * mg, sx = 1 - 0.75 * mg;
      c.el.style.opacity = (u >= 0 ? vis * (1 - seg(u, [MERGE[1] - 0.12, MERGE[1] + 0.08])) : 0).toFixed(3);
      c.el.style.transform = 'translate(' + x.toFixed(1) + 'px,' + (dir * (1 - p) * 900).toFixed(1) + 'px) scale(' + sx.toFixed(4) + ',' + (1 - 0.3 * mg).toFixed(4) + ')';
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
  window.abhTimes = { C0: C0, MERGE: MERGE, CYCLE: CYCLE };
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
