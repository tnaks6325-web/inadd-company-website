/* 회사소개 히어로 — 지금은 ③ 크리에이티브 × 데이터만(한 바퀴 약 6.5초). ①②는 대표 자료를 받으면 앞에 붙인다.
   - 왼쪽(크리에이티브)·오른쪽(데이터) 반쪽 화면이 양옆에서 들어오고, 손 장면이 서로 엇갈리며 점점 빠르게 바뀐다(아래에서 밀어 올림).
   - 두 화면이 가운데로 가속하며 모이고 '툭' — '크리에이티브와 데이터가 만나는 곳 · IN AD COMPANY'.
   화면은 시간 t 하나로 계산한다(render). 히어로가 화면 밖이거나 탭이 숨겨지면 멈추고,
   '움직임 줄이기' 설정이면 마지막 화면에서 멈춘다. window.abhSeek(t) 로 특정 순간을 고정해 볼 수 있다. */
(function () {
  var root = document.querySelector('[data-abh]');
  if (!root) return;
  function q(k, from) { return (from || root).querySelector('[data-abh-' + k + ']'); }
  function qa(k, from) { return Array.prototype.slice.call((from || root).querySelectorAll('[data-abh-' + k + ']')); }
  var panes = qa('pane').map(function (p) { return { el: p, clips: qa('clip', p).map(function (c) { return { el: c, v: c.querySelector('video') }; }) }; });
  var meet = q('meet');

  // 시각표(초)
  var C0 = 0.2, PANE_IN = [0, 0.35];
  // 장면이 바뀌는 때: 왼쪽 0 · 1.0 · 1.75, 오른쪽 0.5 · 1.4 · 2.05 (점점 빨라짐), 바뀔 때 0.22초 동안 아래에서 밀어 올림
  var CUT = [[0, 1.0, 1.75], [0.5, 1.4, 2.05]], WIPE = 0.22;
  var MERGE = [2.6, 3.1], MEET_IN = [3.0, 3.3];
  var OUT = [C0 + 5.9, C0 + 6.3], CYCLE = C0 + 6.3;

  function clamp(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
  function seg(l, r) { return clamp((l - r[0]) / (r[1] - r[0])); }
  function ease(x) { return 1 - Math.pow(1 - x, 3); }
  function accel(x) { return x * x * x; }
  function thud(h) { return Math.sin(Math.PI * h) * (1 - h); }

  function render(t) {
    var l = t % CYCLE, u = l - C0;
    var vis = 1 - seg(l, OUT);
    var pin = ease(seg(u, PANE_IN)), mg = accel(seg(u, MERGE));
    panes.forEach(function (p, side) {
      var dir = side ? 1 : -1;
      // 들어올 때는 바깥에서, 모일 때는 가운데로 가속하며 겹치고 작아진다
      var x = dir * (1 - pin) * 60 - dir * mg * 170, s = 1 - 0.35 * mg;
      p.el.style.opacity = (vis * pin * (1 - seg(u, [MERGE[1] - 0.15, MERGE[1] + 0.1]))).toFixed(3);
      p.el.style.transform = 'translateX(' + x.toFixed(1) + 'px) scale(' + s.toFixed(4) + ') rotate(' + (dir * 2 * mg).toFixed(2) + 'deg)';
      p.clips.forEach(function (c, k) {
        var at = CUT[side][k], w = k === 0 ? 1 : ease(seg(u, [at, at + WIPE]));
        var gone = k < p.clips.length - 1 ? seg(u, [CUT[side][k + 1] + WIPE, CUT[side][k + 1] + WIPE + 0.01]) : 0;
        c.el.style.zIndex = k + 1;
        c.el.style.transform = 'translateY(' + ((1 - w) * 100).toFixed(2) + '%)';
        c.el.style.visibility = (u >= at || k === 0) && gone < 1 ? 'visible' : 'hidden';
        var on = live && vis > 0 && u >= at && gone < 1 && u < MERGE[1];
        if (c.v) { if (on) { if (c.v.paused) { var pr = c.v.play(); if (pr && pr.catch) pr.catch(function () {}); } } else if (!c.v.paused) c.v.pause(); }
      });
    });
    var mi = ease(seg(u, MEET_IN)), mh = seg(u, [MEET_IN[1], MEET_IN[1] + 0.25]);
    meet.style.opacity = (vis * mi).toFixed(3);
    meet.style.transform = 'translate(-50%,-50%) scale(' + ((0.86 + 0.14 * mi) * (1 + 0.05 * thud(mh))).toFixed(4) + ')';
  }

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var t = 0, prev = 0, on = true, held = false, live = false;
  window.abhSeek = function (s) { held = true; live = false; t = s; render(t); };
  window.abhTimes = { C0: C0, CUT: CUT, MERGE: MERGE, CYCLE: CYCLE };
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
