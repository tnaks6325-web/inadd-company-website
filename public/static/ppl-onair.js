/* PPL 마케팅 히어로(한 바퀴 약 8초): '방송 직후 반응'.
   촬영 현장(슬레이트 '딱' 순간 번쩍) → 감독 모니터 → 모니터 화면으로 줌인 → 그 화면이 그대로 방송 화면(본방송 21:40) →
   방송 화면이 왼쪽 위로 작아지고 검색량 그래프가 그려지며 21:40 에서 치솟음(1 → 18배) → 게시판 글 제목이 시각과 함께 한 줄씩 → 처음으로.
   화면 상태는 시간 t 하나로 계산한다(render). 히어로가 화면 밖이거나 탭이 숨겨지면 멈추고,
   '움직임 줄이기' 설정이면 그래프·게시판이 다 보인 화면에서 멈춘다. window.ponSeek(t) 로 특정 순간을 고정해 볼 수 있다. */
(function () {
  var root = document.querySelector('[data-pon]');
  if (!root) return;
  function q(k) { return root.querySelector('[data-pon-' + k + ']'); }
  function qa(k) { return Array.prototype.slice.call(root.querySelectorAll('[data-pon-' + k + ']')); }
  var el = { real: q('real'), flash: q('flash'), tv: q('tv'), scr: q('scr'), onair: q('onair'), graph: q('graph'), x: q('x'),
    line: q('line'), fill: q('fill'), mark: q('mark'), tag: q('tag'), board: q('board') };
  var cuts = qa('cut'), posts = qa('post'), vids = qa('vid'), mscr = q('mscr'), vid = vids[vids.length - 1];

  // 시각표(초)
  var IN = [0, 0.25], CLAP = 0.35, SET_PUSH = [0, 1.4], TO_MON = [1.3, 1.5], ZOOM = [1.85, 2.5], TO_TV = [2.4, 2.6],
    ONAIR = [2.85, 3.05], SHRINK = [3.75, 4.25], GRAPH = [4.2, 4.4], LINE = [4.3, 5.2], X = [4.75, 5.4],
    BOARD = [5.3, 5.5], POST_AT = 5.45, POST_GAP = 0.32, OUT = [7.6, 8.0], CYCLE = 8.0;
  // 영상마다 시작 시각(data-pon-vid 값, 초): 촬영 현장 3초 영상은 0초, 드라마 장면 4초 영상은 감독 모니터가 보일 때(1.3초).
  // 드라마 영상은 모니터 화면 → 방송 화면으로 넘어가도 같은 시각으로 이어서 돌고, 한 모금 마시는 순간(영상 1.5~3초)이 큰 방송 화면(2.8~4.3초)에 걸린다.
  // 끝나면 마지막 장면에서 멈춤
  // 무대 좌표: 모니터 사진 속 화면 중심·너비(사진 2400x1792 을 680x620 에 꽉 채운 기준), 방송 화면 큰/작은 자리
  var MON = { x: 372.7, y: 318.0, w: 170.2 }, ZS = 680 / MON.w;
  var BIG = { x: 0, y: 118.5, w: 680, h: 382.5 }, SMALL = { x: 0, y: 0, w: 300, h: 168.75 };
  // 모니터 사진 속 화면 네 모서리(왼위·오른위·오른아래·왼아래, 무대 좌표). 왼쪽이 가까워 조금 더 길다
  var MON_Q = [[286.4, 264.0], [457.6, 261.9], [457.6, 367.4], [288.8, 382.3]];

  // 640x360 상자를 네 모서리 자리로 비스듬히 펴는 변환(사각형 → 사변형)
  function quad(W, H, p) {
    var x0 = p[0][0], y0 = p[0][1], x1 = p[1][0], y1 = p[1][1], x2 = p[2][0], y2 = p[2][1], x3 = p[3][0], y3 = p[3][1];
    var dx1 = x1 - x2, dx2 = x3 - x2, dx3 = x0 - x1 + x2 - x3, dy1 = y1 - y2, dy2 = y3 - y2, dy3 = y0 - y1 + y2 - y3;
    var den = dx1 * dy2 - dx2 * dy1, g = (dx3 * dy2 - dx2 * dy3) / den, h = (dx1 * dy3 - dx3 * dy1) / den;
    var a = (x1 - x0 + g * x1) / W, b = (x3 - x0 + h * x3) / H, d = (y1 - y0 + g * y1) / W, e = (y3 - y0 + h * y3) / H;
    return 'matrix3d(' + [a, d, 0, g / W, b, e, 0, h / H, 0, 0, 1, 0, x0, y0, 0, 1].map(function (v) { return +v.toFixed(8); }).join(',') + ')';
  }
  if (mscr) mscr.style.transform = quad(640, 360, MON_Q);

  function clamp(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
  function seg(l, r) { return clamp((l - r[0]) / (r[1] - r[0])); }
  function ease(x) { return 1 - Math.pow(1 - x, 3); }
  function inout(x) { return x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; }
  function lerp(a, b, p) { return a + (b - a) * p; }

  function render(t) {
    var l = t % CYCLE;
    var vis = ease(seg(l, IN)) * (1 - seg(l, OUT));
    // 촬영 현장: 천천히 다가가고, 슬레이트를 치는 순간 살짝 번쩍
    var mon = seg(l, TO_MON), sp = seg(l, SET_PUSH);
    cuts[0].style.opacity = 1 - mon;
    cuts[0].style.transform = 'scale(' + (1 + 0.05 * sp).toFixed(4) + ')';
    cuts[0].style.transformOrigin = '50% 55%';
    el.flash.style.opacity = l >= CLAP && l < CLAP + 0.12 ? (0.55 * (1 - (l - CLAP) / 0.12)).toFixed(3) : 0;
    // 감독 모니터 → 화면으로 줌인
    var z = inout(seg(l, ZOOM)), zs = lerp(1, ZS, z), fx = lerp(MON.x, 340, z), fy = lerp(MON.y, BIG.y + BIG.h / 2, z);
    cuts[1].style.opacity = mon;
    cuts[1].style.transform = 'translate(' + (fx - MON.x * zs).toFixed(1) + 'px,' + (fy - MON.y * zs).toFixed(1) + 'px) scale(' + zs.toFixed(4) + ')';
    var tv = ease(seg(l, TO_TV));
    el.real.style.opacity = (vis * (1 - tv)).toFixed(3);
    // 방송 화면: 크게 → 왼쪽 위 작게
    var sh = inout(seg(l, SHRINK));
    el.tv.style.opacity = (vis * tv * (1 - sh)).toFixed(3);
    el.scr.style.opacity = (vis * tv).toFixed(3);
    var r = { x: lerp(BIG.x, SMALL.x, sh), y: lerp(BIG.y, SMALL.y, sh), w: lerp(BIG.w, SMALL.w, sh), h: lerp(BIG.h, SMALL.h, sh) };
    el.scr.style.left = r.x.toFixed(1) + 'px'; el.scr.style.top = r.y.toFixed(1) + 'px';
    el.scr.style.width = r.w.toFixed(1) + 'px'; el.scr.style.height = r.h.toFixed(1) + 'px';
    el.scr.style.fontSize = (r.w / 680 * 26).toFixed(2) + 'px';
    el.scr.style.backgroundSize = 'auto ' + (100 + 4 * seg(l, [TO_TV[0], SHRINK[0]])).toFixed(2) + '%';
    if (vid) vid.style.transform = 'scale(' + (1 + 0.04 * seg(l, [TO_TV[0], SHRINK[0]])).toFixed(4) + ')';
    syncVid(l);
    // 본방송 21:40: 큰 화면에선 화면 위 오른쪽, 작아지면 화면 오른쪽 옆
    var oa = ease(seg(l, ONAIR));
    el.onair.style.opacity = (vis * oa).toFixed(3);
    el.onair.style.left = lerp(BIG.x + BIG.w - 168, SMALL.x + SMALL.w + 20, sh).toFixed(1) + 'px';
    el.onair.style.top = lerp(BIG.y - 48, SMALL.y + 64, sh).toFixed(1) + 'px';
    el.onair.style.transform = 'scale(' + (lerp(1, 1.35, sh) * (0.9 + 0.1 * oa)).toFixed(3) + ')';
    el.onair.style.transformOrigin = '0 50%';
    // 검색량 그래프
    var g = ease(seg(l, GRAPH));
    el.graph.style.opacity = (vis * g).toFixed(3);
    el.graph.style.transform = 'translateY(' + ((1 - g) * 12).toFixed(1) + 'px)';
    var lp = seg(l, LINE);
    el.line.style.strokeDashoffset = (1 - lp).toFixed(3);
    el.fill.style.opacity = (0.9 * ease(seg(l, [LINE[1] - 0.2, LINE[1] + 0.2]))).toFixed(3);
    var mk = ease(seg(l, [LINE[0] + 0.45, LINE[0] + 0.6]));
    el.mark.style.opacity = mk; el.tag.style.opacity = mk;
    el.x.textContent = Math.max(1, Math.round(18 * ease(seg(l, X))));
    // 게시판: 글 제목이 시각과 함께 한 줄씩
    var b = ease(seg(l, BOARD));
    el.board.style.opacity = (vis * b).toFixed(3);
    el.board.style.transform = 'translateY(' + ((1 - b) * 12).toFixed(1) + 'px)';
    posts.forEach(function (p, i) {
      var a = ease(seg(l, [POST_AT + i * POST_GAP, POST_AT + i * POST_GAP + 0.25]));
      p.style.opacity = a; p.style.transform = 'translateX(' + ((1 - a) * 14).toFixed(1) + 'px)';
    });
  }

  // 영상 위치를 시간 t 에 맞춘다. 재생 구간이고 화면이 돌아가는 중이면 재생(0.25초 넘게 어긋날 때만 다시 맞춤), 아니면 멈추고 그 순간 장면을 보여 준다
  function syncVid(l) {
    vids.forEach(function (v) {
      var at = +v.getAttribute('data-pon-vid') || 0, end = isFinite(v.duration) ? v.duration - 0.05 : 3;
      var vt = Math.min(end, Math.max(0, l - at));
      if (live && l >= at && vt < end) {
        if (v.paused) { v.currentTime = vt; var p = v.play(); if (p && p.catch) p.catch(function () {}); }
        else if (Math.abs(v.currentTime - vt) > 0.25) v.currentTime = vt;
      } else {
        if (!v.paused) v.pause();
        if (v.readyState > 0 && Math.abs(v.currentTime - vt) > 0.05) v.currentTime = vt;
      }
    });
  }

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var t = 0, prev = 0, on = true, held = false, live = false;
  window.ponSeek = function (s) { held = true; live = false; t = s; render(t); };
  if (reduce) { render(7.4); return; }
  if ('IntersectionObserver' in window) new IntersectionObserver(function (e) { on = e[0].isIntersecting; }).observe(root);
  function frame(now) {
    var dt = prev ? Math.min(0.1, (now - prev) / 1000) : 0; prev = now;
    live = !held && on && !document.hidden;
    if (live) { t += dt; render(t); }
    else vids.forEach(function (v) { if (!v.paused) v.pause(); });
    requestAnimationFrame(frame);
  }
  render(0);
  requestAnimationFrame(frame);
})();
