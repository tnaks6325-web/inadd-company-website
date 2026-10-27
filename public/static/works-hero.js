/* 포트폴리오 히어로(한 바퀴 약 13.4초): 물결랩 세럼 예시 시나리오 — 단계 카드가 하나씩 가운데에 크게 떴다가
   사진을 내려놓듯 위쪽 3x2 자리에 차곡차곡 쌓인다(장면 전환 없이 누적). 카드가 내려앉을 때마다 아래 월 매출 계단이 한 칸씩 차오르고,
   마지막엔 출고 현장 사진이 뒤에 깔리며 '마케팅을 더할 때마다 한 칸씩'. 카드 안 영상(있으면)은 쌓인 뒤에도 각자 계속 반복 재생된다.
   카드 위치·계단은 시간 t 하나로 계산한다(render). 히어로가 화면 밖이거나 탭이 숨겨지면 멈추고(영상도 멈춤),
   '움직임 줄이기' 설정이면 카드 6장이 다 쌓인 결과 화면에서 멈춘다. window.wkhSeek(t) 로 특정 순간을 고정해 볼 수 있다. */
(function () {
  var root = document.querySelector('[data-wkh]');
  if (!root) return;
  function q(k, from) { return (from || root).querySelector('[data-wkh-' + k + ']'); }
  function qa(k, from) { return Array.prototype.slice.call((from || root).querySelectorAll('[data-wkh-' + k + ']')); }
  var bg = q('bg'), chart = q('chart'), big = q('big'), sts = qa('st');
  var cards = qa('card').map(function (c) {
    return { el: c, pops: qa('pop', c), cnts: qa('cnt', c), copy: q('copy', c), vids: Array.prototype.slice.call(c.querySelectorAll('video')) };
  });

  // 시각표(초): 카드 i 는 AT[i] 에 뜨고 → 내용이 차례로 → 자리로 내려앉고 → 계단 i 가 찬다
  var IN = [0, 0.25], CHART_IN = [0.1, 0.4], FIRST = 0.3, GAP = 1.65,
    ENTER = 0.3, LAND = [1.15, 1.6], FILL = [1.45, 1.8], BG = [10.3, 10.9], BIG = [10.6, 10.9], OUT = [13.0, 13.4], CYCLE = 13.4;
  // 카드(460x345) 자리: 가운데 크게 → 위쪽 3x2 (0.448배, 살짝 기울여 사진처럼)
  var BIGC = { x: 340, y: 196 }, SLOT_S = 0.448, ROT = [-2.2, 1.6, -1.2, 2.0, -1.6, 1.2];
  var SLOTS = [[123, 97.5], [340, 97.5], [557, 97.5], [123, 264.5], [340, 264.5], [557, 264.5]];
  var VMAX = 30000, HMAX = 116;

  function clamp(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
  function seg(l, r) { return clamp((l - r[0]) / (r[1] - r[0])); }
  function ease(x) { return 1 - Math.pow(1 - x, 3); }
  function inout(x) { return x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; }
  function lerp(a, b, p) { return a + (b - a) * p; }
  function pop(e, p, dy) { e.style.opacity = p.toFixed(3); e.style.transform = 'translateY(' + ((1 - p) * (dy || 8)).toFixed(1) + 'px)'; }

  // 막대 높이: 금액 차이가 커서 제곱근 비율로(800만도 보이게)
  sts.forEach(function (st) { st.querySelector('i').style.setProperty('--h', (Math.sqrt(+st.getAttribute('data-v') / VMAX) * HMAX).toFixed(1) + 'px'); });

  function render(t) {
    var l = t % CYCLE;
    var vis = ease(seg(l, IN)) * (1 - seg(l, OUT));
    chart.style.opacity = (vis * ease(seg(l, CHART_IN))).toFixed(3);
    bg.style.opacity = (vis * seg(l, BG)).toFixed(3);
    big.style.opacity = ease(seg(l, BIG)).toFixed(3);
    cards.forEach(function (c, i) {
      var at = FIRST + i * GAP, u = l - at;
      var e = ease(seg(u, [0, ENTER])), d = inout(seg(u, LAND));
      var x = lerp(BIGC.x, SLOTS[i][0], d), y = lerp(BIGC.y + (1 - e) * 24, SLOTS[i][1], d);
      var s = lerp(0.92 + 0.08 * e, SLOT_S, d) * (1 + 0.035 * Math.sin(Math.PI * seg(u, [LAND[1] - 0.1, LAND[1] + 0.15])));
      c.el.style.opacity = (vis * e).toFixed(3);
      c.el.style.zIndex = 10 + i;
      c.el.style.transform = 'translate(' + (x - 230).toFixed(1) + 'px,' + (y - 172.5).toFixed(1) + 'px) rotate(' + (ROT[i] * d).toFixed(2) + 'deg) scale(' + s.toFixed(4) + ')';
      c.pops.forEach(function (p, k) { pop(p, ease(seg(u, [0.3 + k * 0.15, 0.55 + k * 0.15]))); });
      c.cnts.forEach(function (n) { n.textContent = Math.round(+n.getAttribute('data-wkh-cnt') * ease(seg(u, [0.4, 1.1]))).toLocaleString('ko-KR'); });
      if (c.copy) c.copy.style.clipPath = 'inset(0 ' + ((1 - seg(u, [0.5, 1.1])) * 100).toFixed(1) + '% 0 0)';
      // 계단 i: 카드가 내려앉을 때 차오름
      var p = ease(seg(u, FILL)), st = sts[i];
      st.querySelector('i').style.setProperty('--p', p.toFixed(3));
      st.querySelector('small').style.opacity = p.toFixed(3);
      // 카드 영상: 카드가 보이는 동안 계속 반복 재생
      c.vids.forEach(function (v) {
        if (live && e > 0 && vis > 0) { if (v.paused) { var pr = v.play(); if (pr && pr.catch) pr.catch(function () {}); } }
        else if (!v.paused) v.pause();
      });
    });
  }

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var t = 0, prev = 0, on = true, held = false, live = false;
  window.wkhSeek = function (s) { held = true; live = false; t = s; render(t); };
  if (reduce) { t = 12.0; render(t); return; }
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
