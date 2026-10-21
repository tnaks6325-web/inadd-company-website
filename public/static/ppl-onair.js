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
  var cuts = qa('cut'), posts = qa('post'), vid = q('vid');

  // 시각표(초)
  var IN = [0, 0.25], CLAP = 0.35, SET_PUSH = [0, 1.4], TO_MON = [1.3, 1.5], ZOOM = [1.85, 2.5], TO_TV = [2.4, 2.6],
    ONAIR = [2.85, 3.05], SHRINK = [3.75, 4.25], GRAPH = [4.2, 4.4], LINE = [4.3, 5.2], X = [4.75, 5.4],
    BOARD = [5.3, 5.5], POST_AT = 5.45, POST_GAP = 0.32, OUT = [7.6, 8.0], CYCLE = 8.0;
  // 드라마 장면 영상(4초): 방송 화면이 뜰 때 0.9초 지점부터 재생해, 한 모금 마시는 순간(영상 1.5~3초)이 큰 화면에 걸리게 한다. 끝나면 마지막 장면(웃음)에서 멈춤
  var VID_AT = TO_TV[0], VID_OFF = 0.9, VID_END = 4.0;
  // 무대 좌표: 모니터 사진 속 화면 중심·너비(사진 2400x1792 을 680x620 에 꽉 채운 기준), 방송 화면 큰/작은 자리
  var MON = { x: 372.7, y: 318.0, w: 170.2 }, ZS = 680 / MON.w;
  var BIG = { x: 0, y: 118.5, w: 680, h: 382.5 }, SMALL = { x: 0, y: 0, w: 300, h: 168.75 };

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
    if (!vid) return;
    var vt = Math.min(VID_END, VID_OFF + Math.max(0, l - VID_AT));
    if (live && l >= VID_AT && vt < VID_END) {
      if (vid.paused) { vid.currentTime = vt; var p = vid.play(); if (p && p.catch) p.catch(function () {}); }
      else if (Math.abs(vid.currentTime - vt) > 0.25) vid.currentTime = vt;
    } else {
      if (!vid.paused) vid.pause();
      if (vid.readyState > 0 && Math.abs(vid.currentTime - vt) > 0.05) vid.currentTime = vt;
    }
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
    else if (vid && !vid.paused) vid.pause();
    requestAnimationFrame(frame);
  }
  render(0);
  requestAnimationFrame(frame);
})();
