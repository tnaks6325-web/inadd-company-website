/* 포트폴리오 히어로(한 바퀴 약 9.6초): 지하철에서 인스타그램 → 휴대폰 화면 속으로 → 피드 광고 '구매하기' → 결제 완료 →
   송장 프린터(주문이 몰림) → S브랜드 한 달(노출→장바구니→구매→매출 막대) → H브랜드 광고비 +350만 원 → 매출 +1억 410만 원 →
   브랜드 벽('함께한 브랜드 N곳') → 처음으로.
   로고와 N 은 /api/admin/public/works 에서 가져온다(실패하면 브랜드 이름 글자 타일, N 은 숨김).
   화면 상태는 시간 t 하나로 계산한다(render). 히어로가 화면 밖이거나 탭이 숨겨지면 멈추고,
   '움직임 줄이기' 설정이면 S브랜드 막대가 다 그려진 화면에서 멈춘다. window.wkhSeek(t) 로 특정 순간을 고정해 볼 수 있다. */
(function () {
  var root = document.querySelector('[data-wkh]');
  if (!root) return;
  function q(k) { return root.querySelector('[data-wkh-' + k + ']'); }
  function qa(k, from) { return Array.prototype.slice.call((from || root).querySelectorAll('[data-wkh-' + k + ']')); }
  var el = { pscr: q('pscr'), ph: q('ph'), pay: q('pay'), paybtn: q('paybtn'), done: q('done'), tap: q('tap'),
    wall: q('wall'), n: q('n'), fun: q('fun'), roas: q('roas'), rv: q('rv') };
  var reals = qa('real'), cuts = qa('cut'), feeds = root.querySelectorAll('.wkh-feed');
  var tracks = qa('track'), steps = qa('step'), vids = qa('vid');
  var funBars = qa('bar', el.fun), roasBars = qa('bar', el.roas);
  var BRANDS = (root.getAttribute('data-wkh-brands') || '').split('|');

  // 시각표(초)
  var IN = [0, 0.25], PUSH = [0, 1.0], PSCR_IN = [0.85, 1.05], ZOOM = [0.95, 1.6], PH_IN = [1.45, 1.6], R0_OUT = [1.48, 1.62],
    SCROLL = [0.9, 1.9], TAP = 2.1, PAY = [2.2, 2.5], TAP2 = 2.65, DONE = [2.75, 2.95], PH_OUT = [3.05, 3.3],
    R1_IN = [3.1, 3.35], R1_PUSH = [3.1, 4.55], R1_OUT = [4.3, 4.55],
    FUN_IN = [4.35, 4.6], STEP_AT = 4.6, STEP_GAP = 0.33, FUN_OUT = [6.15, 6.4],
    ROAS_IN = [6.3, 6.55], REV = [6.6, 7.2], RBAR = [6.85, 7.3], ROAS_OUT = [7.75, 8.0],
    WALL_IN = [7.85, 8.15], COUNT = [8.0, 8.9], OUT = [9.2, 9.6], CYCLE = 9.6;
  // 무대 좌표: 지하철 사진(2400x1792 을 680x620 에 꽉 채운 기준) 속 휴대폰 화면 네 모서리(왼위·오른위·오른아래·왼아래). 약 24.6도 기울어 있다
  var SCR_Q = [[517.1, 265.7], [586.3, 273.3], [526.8, 411.7], [452.4, 398.6]];
  var C = { x: 520.7, y: 337.3 }, TILT = 24.6, ZS = 594 / 149.2;
  var PH = { x: 190, y: 5, w: 300, h: 610 };
  var SPEED = 34, TILE = 160 + 14, total = 0, rowN = [0, 0, 0, 0];

  function clamp(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
  function seg(l, r) { return clamp((l - r[0]) / (r[1] - r[0])); }
  function ease(x) { return 1 - Math.pow(1 - x, 3); }
  function inout(x) { return x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; }
  function lerp(a, b, p) { return a + (b - a) * p; }
  function won(v) { v = Math.round(v); return '+' + (v >= 10000 ? Math.floor(v / 10000) + '억 ' + (v % 10000).toLocaleString('ko-KR') : v.toLocaleString('ko-KR')); }

  // 284x594 상자를 사진 속 휴대폰 화면 네 모서리로 비스듬히 펴는 변환(사각형 → 사변형)
  function quad(W, H, p) {
    var x0 = p[0][0], y0 = p[0][1], x1 = p[1][0], y1 = p[1][1], x2 = p[2][0], y2 = p[2][1], x3 = p[3][0], y3 = p[3][1];
    var dx1 = x1 - x2, dx2 = x3 - x2, dx3 = x0 - x1 + x2 - x3, dy1 = y1 - y2, dy2 = y3 - y2, dy3 = y0 - y1 + y2 - y3;
    var den = dx1 * dy2 - dx2 * dy1, g = (dx3 * dy2 - dx2 * dy3) / den, h = (dx1 * dy3 - dx3 * dy1) / den;
    var a = (x1 - x0 + g * x1) / W, b = (x3 - x0 + h * x3) / H, d = (y1 - y0 + g * y1) / W, e = (y3 - y0 + h * y3) / H;
    return 'matrix3d(' + [a, d, 0, g / W, b, e, 0, h / H, 0, 0, 1, 0, x0, y0, 0, 1].map(function (v) { return +v.toFixed(8); }).join(',') + ')';
  }
  if (el.pscr) el.pscr.style.transform = quad(284, 594, SCR_Q);

  // 로고 타일을 네 줄로 나눠 채우고, 끊김 없이 흐르도록 같은 묶음을 화면 폭보다 넉넉하게 반복
  function fill(list) {
    var rows = tracks.map(function () { return []; });
    list.forEach(function (b, i) { rows[i % rows.length].push(b); });
    tracks.forEach(function (tr, r) {
      var html = rows[r].map(function (b) {
        return '<span class="wkh-tile">' + (b.logo ? '<img src="' + b.logo + '" alt="" crossorigin="anonymous" decoding="async" onload="window.fitWorksLogo&&fitWorksLogo(this)">' : '<b>' + b.name + '</b>') + '</span>';
      }).join('');
      rowN[r] = rows[r].length;
      var reps = Math.max(2, Math.ceil(800 / Math.max(1, rowN[r] * TILE)) + 1);
      tr.innerHTML = new Array(reps + 1).join(html);
    });
  }
  fill(BRANDS.map(function (n) { return { name: n }; }));
  fetch('/api/admin/public/works').then(function (r) { return r.json(); }).then(function (d) {
    var items = (d && d.items) || [], by = {};
    items.forEach(function (it) { if (it.brand && it.thumb) by[it.brand] = it.thumb; });
    total = items.length;
    fill(BRANDS.filter(function (n) { return by[n]; }).map(function (n) { return { name: n, logo: by[n] }; }));
    render(t);
  }).catch(function () {});

  function scene(e, inR, outR, l, vis, dx) {
    var a = ease(seg(l, inR)), b = outR ? seg(l, outR) : 0;
    e.style.opacity = (vis * a * (1 - b)).toFixed(3);
    e.style.transform = 'translateY(' + ((1 - a) * 14).toFixed(1) + 'px) translateX(' + (-(dx || 0) * b).toFixed(1) + 'px)';
  }
  function flash(e, at, l) { if (e) e.style.opacity = l >= at && l < at + 0.3 ? (1 - (l - at) / 0.3).toFixed(3) : 0; }

  function render(t) {
    var l = t % CYCLE;
    var vis = ease(seg(l, IN)) * (1 - seg(l, OUT));
    // ① 지하철: 천천히 다가가다가 휴대폰을 똑바로 세우며 화면 속으로
    var z = inout(seg(l, ZOOM)), s = (1 + 0.03 * seg(l, PUSH)) * lerp(1, ZS, z), a = -TILT * z;
    var fx = lerp(C.x, PH.x + PH.w / 2, z), fy = lerp(C.y, PH.y + PH.h / 2, z);
    cuts[0].style.transform = 'translate(' + fx.toFixed(1) + 'px,' + fy.toFixed(1) + 'px) rotate(' + a.toFixed(2) + 'deg) scale(' + s.toFixed(4) + ') translate(' + (-C.x) + 'px,' + (-C.y) + 'px)';
    reals[0].style.opacity = (vis * (1 - seg(l, R0_OUT))).toFixed(3);
    el.pscr.style.opacity = ease(seg(l, PSCR_IN)).toFixed(3);
    var sc = (1 - ease(seg(l, SCROLL))) * 60;
    for (var i = 0; i < feeds.length; i++) feeds[i].style.transform = 'translateY(' + sc.toFixed(1) + 'px)';
    // ② 피드 광고 → 구매하기 → 결제 → 결제 완료
    var po = seg(l, PH_OUT);
    el.ph.style.opacity = (ease(seg(l, PH_IN)) * (1 - po)).toFixed(3);
    el.ph.style.transform = 'scale(' + (1 - 0.04 * po).toFixed(4) + ')';
    flash(el.tap, TAP, l);
    el.pay.style.transform = 'translateY(' + ((1 - ease(seg(l, PAY))) * 100).toFixed(1) + '%)';
    el.paybtn.style.opacity = l >= TAP2 && l < TAP2 + 0.15 ? 0.7 : 1;
    var dn = ease(seg(l, DONE));
    el.done.style.opacity = dn.toFixed(3);
    el.done.firstChild.style.transform = 'scale(' + (0.6 + 0.4 * dn).toFixed(3) + ')';
    // ③ 송장 프린터
    reals[1].style.opacity = (vis * ease(seg(l, R1_IN)) * (1 - seg(l, R1_OUT))).toFixed(3);
    cuts[1].style.transform = 'scale(' + (1 + 0.06 * seg(l, R1_PUSH)).toFixed(4) + ')';
    cuts[1].style.transformOrigin = '62% 48%';
    // ④ S브랜드 한 달: 단계마다 3월 막대 → 4월 막대
    scene(el.fun, FUN_IN, FUN_OUT, l, vis, 24);
    steps.forEach(function (st, i) {
      var at = STEP_AT + i * STEP_GAP, p = ease(seg(l, [at, at + 0.2]));
      st.style.opacity = p;
      funBars[i * 2].style.setProperty('--p', ease(seg(l, [at + 0.05, at + 0.4])).toFixed(3));
      funBars[i * 2 + 1].style.setProperty('--p', ease(seg(l, [at + 0.15, at + 0.55])).toFixed(3));
    });
    // ⑤ H브랜드: 매출 숫자가 올라가고 ROAS 막대
    scene(el.roas, ROAS_IN, ROAS_OUT, l, vis, 24);
    el.rv.textContent = won(10410 * ease(seg(l, REV)));
    roasBars[0].style.setProperty('--p', ease(seg(l, RBAR)).toFixed(3));
    roasBars[1].style.setProperty('--p', ease(seg(l, [RBAR[0] + 0.12, RBAR[1] + 0.12])).toFixed(3));
    // ⑥ 브랜드 벽
    var wi = ease(seg(l, WALL_IN));
    el.wall.style.opacity = (vis * wi).toFixed(3);
    el.wall.style.transform = 'scale(' + (0.96 + 0.04 * wi).toFixed(4) + ')';
    tracks.forEach(function (tr, r) {
      var setW = rowN[r] * TILE || 1, dir = r % 2 ? 1 : -1, x = (l * SPEED + r * 57) % setW;
      tr.style.transform = 'translateX(' + (dir < 0 ? -x : x - setW).toFixed(1) + 'px)';
    });
    el.n.textContent = total ? Math.round(total * ease(seg(l, COUNT))) : '';
    el.n.parentNode.parentNode.style.visibility = total ? '' : 'hidden';
    syncVid(l);
  }

  // 현실 컷 영상(있으면): 시작 시각(data-wkh-vid 값)에 맞춰 재생 위치를 맞춘다
  function syncVid(l) {
    vids.forEach(function (v) {
      if (v.seeking) return;
      var at = +v.getAttribute('data-wkh-vid') || 0, end = isFinite(v.duration) ? v.duration - 0.05 : 3;
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
  window.wkhSeek = function (s) { held = true; live = false; t = s; render(t); };
  if (reduce) { t = 6.12; render(t); return; }
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
