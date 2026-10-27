/* 포트폴리오 히어로(한 바퀴 약 10.5초): 물결랩 세럼 예시 시나리오 — 단계 카드 12장이 3~4초 안에 쏟아지듯
   위쪽에 서로 겹치며 쌓인다(앞 카드가 내려앉기 전에 다음 카드가 들어옴). 카드 간격은 0.36초 → 0.2초로 점점 짧아지고,
   내려앉는 움직임은 끝에서 빨라졌다가 '툭' 멈춘다(가속). 실행 카드(2~11)가 내려앉을 때마다 아래 월 매출 계단이 한 칸씩 차오르고,
   다 쌓이면 '마케팅을 더할 때마다 한 칸씩'. 이어서 문구 없이 장면만 바뀌며 실제 포트폴리오 브랜드 사진이 점점 빠르게 쏟아지고
   '130개 브랜드와 함께'(포트폴리오 목록 수로 갱신). 사진 사이에 홈에 공개 중인 실제 고객 후기 카드가 섞인다. 카드 안 영상은 쌓인 뒤에도 각자 계속 반복 재생된다.
   화면은 시간 t 하나로 계산한다(render). 히어로가 화면 밖이거나 탭이 숨겨지면 멈추고(영상도 멈춤),
   '움직임 줄이기' 설정이면 마지막 화면에서 멈춘다. window.wkhSeek(t) 로 특정 순간을 고정해 볼 수 있다. */
(function () {
  var root = document.querySelector('[data-wkh]');
  if (!root) return;
  function q(k, from) { return (from || root).querySelector('[data-wkh-' + k + ']'); }
  function qa(k, from) { return Array.prototype.slice.call((from || root).querySelectorAll('[data-wkh-' + k + ']')); }
  var bg = q('bg'), chart = q('chart'), big = q('big'), sts = qa('st'), wall = q('wall'), phs = qa('ph'), endEl = q('end');
  var cards = qa('card').map(function (c) {
    return { el: c, pops: qa('pop', c), cnts: qa('cnt', c), nums: qa('num', c), bar: q('bar', c), copy: q('copy', c), vids: Array.prototype.slice.call(c.querySelectorAll('video')) };
  });
  var N = cards.length, M = phs.length;

  // 시각표(초): 카드는 0.62초 동안 떠서 내려앉고, 카드 간격은 0.36초 → 0.2초(겹치며 쏟아짐)
  var FIRST = 0.2, GAP0 = 0.36, GAP1 = 0.2, FLY = 0.62, POP = 0.14, IN = [0, 0.2], CHART_IN = [0, 0.3];
  var AT = [], acc = FIRST;
  for (var i = 0; i < N; i++) { AT.push(acc); acc += GAP0 + (GAP1 - GAP0) * (i / (N - 1)); }
  var END = AT[N - 1] + FLY, BG = [END - 0.2, END + 0.3], BIG = [END - 0.1, END + 0.2];
  // 실제 브랜드 사진: 0.1초 → 0.03초 간격으로 점점 빠르게, 한 장은 0.32초에 내려앉는다
  var R = END + 0.6, PG0 = 0.1, PG1 = 0.03, PFLY = 0.32, PAT = [], pa = R;
  for (var j = 0; j < M; j++) { PAT.push(pa); pa += PG0 + (PG1 - PG0) * (j / Math.max(1, M - 1)); }
  var WALL_END = PAT[M - 1] + PFLY, SCENE_OUT = [R + 0.5, R + 1.3], END_IN = [WALL_END - 0.15, WALL_END + 0.25];
  var OUT = [WALL_END + 2.3, WALL_END + 2.7], CYCLE = WALL_END + 2.7;
  // 카드 콜라주 자리(카드 가운데 좌표, 기울기) — 4칸 x 3줄을 살짝 어긋나게
  var BIGC = { x: 340, y: 190 }, PILE_S = 0.36;
  var PILE = [[92, 70, -4], [255, 64, 3], [425, 74, -2.5], [590, 66, 4], [110, 182, 2.5], [272, 176, -3.5],
    [440, 186, 2], [588, 178, -3], [96, 292, -2], [262, 298, 3.5], [430, 290, -3], [585, 296, 2.5]];
  var VMAX = 30000, HMAX = 124;
  // 사진 벽 자리: 8칸 x 6줄 칸을 섞어 하나씩 배정하고 조금씩 흔든다(매번 같은 배치)
  var seed = 7; function rnd() { seed = (seed * 16807) % 2147483647; return seed / 2147483647; }
  var cells = []; for (var c = 0; c < 48; c++) cells.push(c);
  for (c = cells.length - 1; c > 0; c--) { var r = Math.floor(rnd() * (c + 1)), tmp = cells[c]; cells[c] = cells[r]; cells[r] = tmp; }
  var SPOT = phs.map(function (_, k) {
    var cell = cells[k % 48];
    return { x: (cell % 8 + 0.5) * 85 + (rnd() - 0.5) * 36, y: (Math.floor(cell / 8) + 0.5) * 103 + (rnd() - 0.5) * 36, a: (rnd() - 0.5) * 18, s: 0.88 + rnd() * 0.3 };
  });
  // 후기 카드처럼 크기가 다른 것도 가운데 기준으로 놓는다
  phs.forEach(function (ph, k) { SPOT[k].hw = (ph.offsetWidth || 150) / 2; SPOT[k].hh = (ph.offsetHeight || 150) / 2; if (ph.tagName !== 'IMG') SPOT[k].s = 1; });

  function clamp(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
  function seg(l, r) { return clamp((l - r[0]) / (r[1] - r[0])); }
  function ease(x) { return 1 - Math.pow(1 - x, 3); }
  function accel(x) { return x * x * x; }
  function lerp(a, b, p) { return a + (b - a) * p; }
  function pop(e, p, dy) { e.style.opacity = p.toFixed(3); e.style.transform = 'translateY(' + ((1 - p) * (dy || 8)).toFixed(1) + 'px)'; }
  function thud(h) { return Math.sin(Math.PI * h) * (1 - h); }

  // 막대 높이: 금액 차이가 커서 제곱근 비율로(800만도 보이게)
  sts.forEach(function (st) { st.querySelector('i').style.setProperty('--h', (Math.sqrt(+st.getAttribute('data-v') / VMAX) * HMAX).toFixed(1) + 'px'); });

  function render(t) {
    var l = t % CYCLE;
    var vis = ease(seg(l, IN)) * (1 - seg(l, OUT));
    var scene = vis * (1 - seg(l, SCENE_OUT));   // 예시 장면(카드·계단): 사진이 덮은 뒤 사라진다
    chart.style.opacity = (scene * ease(seg(l, CHART_IN))).toFixed(3);
    bg.style.opacity = (scene * seg(l, BG)).toFixed(3);
    big.style.opacity = ease(seg(l, BIG)).toFixed(3);
    cards.forEach(function (c, i) {
      var u = l - AT[i];
      var e = ease(seg(u, [0, POP])), d = accel(seg(u, [POP, FLY])), hit = seg(u, [FLY, FLY + 0.2]);
      var x = lerp(BIGC.x, PILE[i][0], d), y = lerp(BIGC.y + (1 - e) * 24, PILE[i][1], d);
      var s = lerp(0.9 + 0.1 * e, PILE_S, d) * (1 + 0.06 * thud(hit));
      c.el.style.opacity = (scene * e).toFixed(3);
      c.el.style.zIndex = 10 + i;
      c.el.style.transform = 'translate(' + (x - 230).toFixed(1) + 'px,' + (y - 172.5).toFixed(1) + 'px) rotate(' + (PILE[i][2] * d).toFixed(2) + 'deg) scale(' + s.toFixed(4) + ')';
      // 카드 속 내용은 뜨자마자 바로(날아가는 동안 숫자가 오른다)
      c.pops.forEach(function (p, k) { var a = 0.02 + 0.12 * k / Math.max(1, c.pops.length); pop(p, ease(seg(u, [a, a + 0.12]))); });
      var k2 = ease(seg(u, [0.05, FLY]));
      c.cnts.forEach(function (n) {
        var to = +n.getAttribute('data-wkh-cnt');
        n.textContent = Math.round(n.getAttribute('data-down') ? lerp(300, to, k2) : to * k2).toLocaleString('ko-KR');
      });
      c.nums.forEach(function (n) { var r = n.getAttribute('data-wkh-num').split(','); n.textContent = lerp(+r[0], +r[1], k2).toFixed(1); });
      if (c.bar) c.bar.style.width = (88 * k2).toFixed(1) + '%';
      if (c.copy) c.copy.style.clipPath = 'inset(0 ' + ((1 - seg(u, [0.05, FLY])) * 100).toFixed(1) + '% 0 0)';
      // 실행 카드(2~11)가 내려앉으면 계단 한 칸
      var st = sts[i - 1];
      if (st && i < N - 1) {
        var p = ease(seg(u, [FLY - 0.05, FLY + 0.2]));
        st.querySelector('i').style.setProperty('--p', p.toFixed(3));
        st.querySelector('small').style.opacity = p.toFixed(3);
      }
      // 카드 영상: 카드가 보이는 동안 계속 반복 재생
      c.vids.forEach(function (v) {
        if (live && e > 0 && scene > 0) { if (v.paused) { var pr = v.play(); if (pr && pr.catch) pr.catch(function () {}); } }
        else if (!v.paused) v.pause();
      });
    });
    // 실제 브랜드 사진: 크게 위에서 떨어지며 가속, 제자리에 '툭'
    wall.style.opacity = vis.toFixed(3);
    phs.forEach(function (ph, k) {
      var u = l - PAT[k], o = SPOT[k], d = accel(seg(u, [0, PFLY])), hit = seg(u, [PFLY, PFLY + 0.18]);
      ph.style.opacity = seg(u, [0, 0.06]).toFixed(3);
      ph.style.transform = 'translate(' + (o.x - o.hw).toFixed(1) + 'px,' + (o.y - o.hh - (1 - d) * 70).toFixed(1) + 'px) rotate(' + (o.a * (0.4 + 0.6 * d)).toFixed(2) + 'deg) scale(' + (lerp(2.1, 1, d) * o.s * (1 + 0.05 * thud(hit))).toFixed(4) + ')';
    });
    var en = ease(seg(l, END_IN));
    endEl.style.opacity = (vis * en).toFixed(3);
    endEl.style.transform = 'translateX(-50%) translateY(' + ((1 - en) * 14).toFixed(1) + 'px) scale(' + (0.94 + 0.06 * en).toFixed(4) + ')';
  }

  // 브랜드 수: 포트폴리오 목록 수로 맞춘다(실패하면 기본값 그대로)
  var brandsEl = q('brands');
  if (brandsEl && window.fetch) fetch('/api/admin/public/works').then(function (r) { return r.json(); }).then(function (d) {
    var n = d && d.items ? d.items.length : 0; if (n > 0) brandsEl.textContent = n.toLocaleString('ko-KR');
  }).catch(function () {});

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var t = 0, prev = 0, on = true, held = false, live = false;
  window.wkhSeek = function (s) { held = true; live = false; t = s; render(t); };
  window.wkhTimes = { AT: AT, END: END, R: R, WALL_END: WALL_END, CYCLE: CYCLE };
  if (reduce) { t = WALL_END + 1; render(t); return; }
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
