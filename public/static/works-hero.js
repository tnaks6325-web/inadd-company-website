/* 포트폴리오 히어로(한 바퀴 약 14초): 물결랩 세럼 예시 시나리오 — 단계 카드 12장이 하나씩 가운데에 크게 떴다가
   책상에 사진을 흩뜨리듯 위쪽에 서로 겹치며 쌓인다(레이어 누적). 뒤로 갈수록 카드 간격이 짧아지고(1.05초 → 0.7초),
   내려앉는 움직임도 끝으로 갈수록 빨라졌다가 '툭' 멈춘다(가속). 실행 카드(2~11)가 내려앉을 때마다 아래 월 매출 계단이 한 칸씩 차오르고,
   마지막엔 출고 현장 사진이 뒤에 깔리며 '마케팅을 더할 때마다 한 칸씩'. 카드 안 영상(있으면)은 쌓인 뒤에도 각자 계속 반복 재생된다.
   카드 위치·계단은 시간 t 하나로 계산한다(render). 히어로가 화면 밖이거나 탭이 숨겨지면 멈추고(영상도 멈춤),
   '움직임 줄이기' 설정이면 카드가 다 쌓인 결과 화면에서 멈춘다. window.wkhSeek(t) 로 특정 순간을 고정해 볼 수 있다. */
(function () {
  var root = document.querySelector('[data-wkh]');
  if (!root) return;
  function q(k, from) { return (from || root).querySelector('[data-wkh-' + k + ']'); }
  function qa(k, from) { return Array.prototype.slice.call((from || root).querySelectorAll('[data-wkh-' + k + ']')); }
  var bg = q('bg'), chart = q('chart'), big = q('big'), sts = qa('st');
  var cards = qa('card').map(function (c) {
    return { el: c, pops: qa('pop', c), cnts: qa('cnt', c), nums: qa('num', c), bar: q('bar', c), copy: q('copy', c), vids: Array.prototype.slice.call(c.querySelectorAll('video')) };
  });
  var N = cards.length;

  // 시각표(초): 카드 간격이 1.05초에서 0.7초로 점점 짧아진다(처음부터 빠르게 — 대표 의견 '초반에 너무 느려')
  var FIRST = 0.3, GAP0 = 1.05, GAP1 = 0.7, ENTER = 0.28, IN = [0, 0.25], CHART_IN = [0.1, 0.4];
  var AT = [], GAPS = [], acc = FIRST;
  for (var i = 0; i < N; i++) { var g = GAP0 + (GAP1 - GAP0) * (i / (N - 1)); AT.push(acc); GAPS.push(g); acc += g; }
  var END = acc, BG = [END - 0.2, END + 0.4], BIG = [END, END + 0.3], OUT = [END + 2.8, END + 3.2], CYCLE = END + 3.2;   // 다 쌓인 결과는 조금 더 오래 보여 준다
  // 콜라주 자리(카드 가운데 좌표, 기울기) — 4칸 x 3줄을 살짝 어긋나게
  var BIGC = { x: 340, y: 190 }, PILE_S = 0.36;
  var PILE = [[92, 70, -4], [255, 64, 3], [425, 74, -2.5], [590, 66, 4], [110, 182, 2.5], [272, 176, -3.5],
    [440, 186, 2], [588, 178, -3], [96, 292, -2], [262, 298, 3.5], [430, 290, -3], [585, 296, 2.5]];
  var VMAX = 30000, HMAX = 124;

  function clamp(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
  function seg(l, r) { return clamp((l - r[0]) / (r[1] - r[0])); }
  function ease(x) { return 1 - Math.pow(1 - x, 3); }
  function accel(x) { return x * x * x; }
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
      var u = l - AT[i], gp = GAPS[i], land = Math.min(0.45, gp * 0.38), LAND = [gp - land, gp];
      var e = ease(seg(u, [0, ENTER])), d = accel(seg(u, LAND)), hit = seg(u, [gp, gp + 0.22]);
      var x = lerp(BIGC.x, PILE[i][0], d), y = lerp(BIGC.y + (1 - e) * 24, PILE[i][1], d);
      var s = lerp(0.92 + 0.08 * e, PILE_S, d) * (1 + 0.06 * Math.sin(Math.PI * hit) * (1 - hit));
      c.el.style.opacity = (vis * e).toFixed(3);
      c.el.style.zIndex = 10 + i;
      c.el.style.transform = 'translate(' + (x - 230).toFixed(1) + 'px,' + (y - 172.5).toFixed(1) + 'px) rotate(' + (PILE[i][2] * d).toFixed(2) + 'deg) scale(' + s.toFixed(4) + ')';
      var span = Math.max(0.5, gp - land - 0.25);   // 크게 떠 있는 동안 내용이 차례로
      c.pops.forEach(function (p, k) { var a = 0.2 + span * 0.6 * k / Math.max(1, c.pops.length); pop(p, ease(seg(u, [a, a + 0.22]))); });
      c.cnts.forEach(function (n) {
        var k = ease(seg(u, [0.3, 0.3 + span])), to = +n.getAttribute('data-wkh-cnt');
        n.textContent = Math.round(n.getAttribute('data-down') ? lerp(300, to, k) : to * k).toLocaleString('ko-KR');
      });
      c.nums.forEach(function (n) { var r = n.getAttribute('data-wkh-num').split(','); n.textContent = lerp(+r[0], +r[1], ease(seg(u, [0.3, 0.3 + span]))).toFixed(1); });
      if (c.bar) c.bar.style.width = (88 * ease(seg(u, [0.3, 0.3 + span]))).toFixed(1) + '%';
      if (c.copy) c.copy.style.clipPath = 'inset(0 ' + ((1 - seg(u, [0.35, 0.35 + span * 0.7])) * 100).toFixed(1) + '% 0 0)';
      // 실행 카드(2~11)가 내려앉으면 계단 한 칸
      var st = sts[i - 1];
      if (st && i < N - 1) {
        var p = ease(seg(u, [gp - 0.05, gp + 0.3]));
        st.querySelector('i').style.setProperty('--p', p.toFixed(3));
        st.querySelector('small').style.opacity = p.toFixed(3);
      }
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
  window.wkhTimes = { AT: AT, END: END, CYCLE: CYCLE };
  if (reduce) { t = END + 0.8; render(t); return; }
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
