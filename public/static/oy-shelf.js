/* 올리브영 마케팅 히어로(한 바퀴 약 8초): '진열 칸이 바뀌는 순간'. 뒤에 PC 브라우저, 앞에 휴대폰 — 두 화면이 같은 시각에 같은 일을 한다.
   판매 랭킹을 내려 보다가 6위의 밋밋한 우리 칸에서 멈춤 →
   ① 썸네일이 왼쪽에서 오른쪽으로 갈리며 '+20매' 스티커·띠가 붙은 새 썸네일로 → ② 상품명이 구성이 보이게 바뀜 →
   ③ 원가 취소선·할인율·기획/증정/세일 딱지 → 주변 칸이 흐려지고 우리 칸이 떠오름 → 아래 주석의 조회·장바구니 담기 수가 오름 →
   우리 칸이 1위 자리로 옮겨감(다른 칸은 한 칸씩 밀리며 순위 숫자가 바뀜) →
   1위 칸을 눌러 두 화면 모두 상세페이지로 → 대표 이미지에 '올리브영 랭킹 1위 제품!' 띠·1위 도장 →
   0.3초 만에 휴대폰 속 그 대표 이미지가 장면을 가득 채우도록 줌인 →
   두 화면이 물러나고 점 세계 지도에서 한국(올리브영 1위)부터 일본·동남아·미국·유럽으로 선이 차례로 이어짐 → 처음으로.
   화면 상태는 시간 t 하나로 계산한다(render). 히어로가 화면 밖이거나 탭이 숨겨지면 멈추고,
   '움직임 줄이기' 설정이면 상세페이지에 '랭킹 1위'가 찍힌 화면에서 멈춘다. window.oySeek(t) 로 특정 순간을 고정해 볼 수 있다. */
(function () {
  var root = document.querySelector('[data-oy]');
  if (!root) return;
  function q(r, k) { return r.querySelector('[data-oy-' + k + ']'); }
  function qa(r, k) { return Array.prototype.slice.call(r.querySelectorAll('[data-oy-' + k + ']')); }

  // 화면별 칸 배치(그린 크기 기준 px): 열 수, 칸 너비, 칸 사이, 왼쪽 여백, 줄 높이, 칸 높이, 보이는 높이, 처음 스크롤
  var CONF = {
    pc: { cols: 4, w: 200, gap: 73.3, pad: 50, rh: 370, ch: 335, view: 920, from: 0 },
    m: { cols: 2, w: 154, gap: 10, pad: 12, rh: 298, ch: 272, view: 620, from: 0 }
  };
  var devs = Array.prototype.slice.call(root.querySelectorAll('[data-oy-dev]')).map(function (d) {
    var kind = d.getAttribute('data-oy-dev'), c = CONF[kind], me = q(d, 'me'), grid = q(d, 'grid');
    var x = { kind: kind, c: c, box: d, track: q(d, 'track'), grid: grid, me: me, others: qa(d, 'o'),
      thnew: q(me, 'thnew'), wipe: q(me, 'wipe'), flags: Array.prototype.slice.call(q(me, 'flags').children),
      dt: q(d, 'dt'), ban: q(d, 'ban'), stamp: q(d, 'stamp'),
      nm0: q(me, 'nm0'), nm1: q(me, 'nm1'), was: q(me, 'was'), off: q(me, 'off'), price: q(me, 'price'), rk: q(me, 'rk') };
    x.from = +grid.getAttribute('data-from') || 5;
    x.nos = x.others.map(function (o) { return o.querySelector('.oys-rk'); });
    x.p0 = x.price.textContent; x.p1 = x.price.getAttribute('data-after');
    x.gridTop = grid.offsetTop;
    // 우리 칸 줄이 아래 여백까지 다 보이게 멈추는 스크롤
    x.at = Math.max(c.from, x.gridTop + Math.floor(x.from / c.cols) * c.rh + c.ch - c.view + 40);
    return x;
  });
  var el = { side: q(root, 'side'), nums: q(root, 'nums'), view: q(root, 'view'), cart: q(root, 'cart'), touch: q(root, 'touch'), cam: q(root, 'cam'), glb: q(root, 'glb'), kr: q(root, 'kr') };
  var steps = qa(root, 'step'), steps2 = qa(root, 'step2'), grps = qa(root, 'grp'), arcs = qa(root, 'arc'), dots = qa(root, 'dot'), dsts = qa(root, 'dst');
  var mob = devs.filter(function (d) { return d.kind === 'm'; })[0];

  // 시각표(초)
  var IN = [0, 0.25], BROWSE = [0.05, 0.6], THUMB = [0.65, 1.05], NAME = [1.2, 1.45], FLAG = 1.58, PRICE = 1.72,
    FOCUS = [1.95, 2.2], NUMS = [2.05, 3.1], MOVE = [3.2, 3.85], SETTLE = [3.85, 4.1],
    TAP = 4.28, DT = [4.36, 4.62], BAN = [4.72, 4.95], STAMP = [4.82, 5.05], ZOOM = [5.12, 5.42],
    GLB = [5.7, 6.0], MAP_IN = [5.75, 6.05], KR_IN = [5.95, 6.2], ARC_AT = 6.25, ARC_GAP = 0.22, ARC_LEN = 0.38, OUT = [7.65, 8.0], CYCLE = 8.0;
  // 줌인 대상: 휴대폰 상세페이지 대표 이미지(무대 좌표 중심·크기). 휴대폰 왼쪽 448·위 140·0.62배, 화면 안 (9+171, 9+36+44+165)
  var KV = { x: 448 + 180 * 0.62, y: 140 + 254 * 0.62, w: 342 * 0.62, h: 330 * 0.62 }, STAGE = { w: 680, h: 620 };
  var ZS = Math.max(STAGE.w / KV.w, STAGE.h / KV.h) * 1.02;
  // 주석 묶음이 바뀌는 시각: 진열 칸 → 상세페이지 → 글로벌
  var GRP_AT = [0, 4.4, 5.8];
  var STEP_AT = [0.6, 1.15, 1.55];

  function clamp(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
  function seg(l, r) { return clamp((l - r[0]) / (r[1] - r[0])); }
  function ease(x) { return 1 - Math.pow(1 - x, 3); }
  function inout(x) { return x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; }
  function lerp(a, b, p) { return a + (b - a) * p; }
  function fmt(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ','); }
  function rkText(kind, n) { return kind === 'pc' ? (n < 10 ? '0' + n : '' + n) : '' + n; }
  function slot(c, k) { return [c.pad + (k % c.cols) * (c.w + c.gap), Math.floor(k / c.cols) * c.rh]; }
  function slotXY(c, k) { var lo = Math.floor(k), f = k - lo, a = slot(c, lo), b = slot(c, lo + 1); return [lerp(a[0], b[0], f), lerp(a[1], b[1], f)]; }

  function renderDev(d, l, v) {
    var c = d.c;
    d.track.style.transform = 'translateY(' + (-v.scroll(d)).toFixed(1) + 'px)';
    d.others.forEach(function (o, j) {
      var pos = j + clamp(j - v.s + 1), xy = slotXY(c, pos);
      o.style.transform = 'translate(' + xy[0].toFixed(1) + 'px,' + xy[1].toFixed(1) + 'px)';
      o.style.opacity = (1 - 0.55 * v.focus).toFixed(3);
      o.style.filter = v.focus > 0 ? 'grayscale(' + (0.7 * v.focus).toFixed(2) + ')' : '';
      var t = rkText(d.kind, Math.round(pos) + 1); if (d.nos[j].textContent !== t) d.nos[j].textContent = t;
    });
    var a = slot(c, d.from), b = slot(c, 0);
    d.me.style.setProperty('--lift', v.lift.toFixed(3));
    d.me.style.transform = 'translate(' + lerp(a[0], b[0], v.mv).toFixed(1) + 'px,' + lerp(a[1], b[1], v.mv).toFixed(1) + 'px) scale(' + (1 + 0.04 * v.focus + 0.03 * Math.sin(Math.PI * v.mv)).toFixed(3) + ')';
    d.rk.textContent = rkText(d.kind, Math.round(v.s) + 1);
    // 1위 칸을 누름 → 상세페이지: 대표 이미지에 '올리브영 랭킹 1위 제품!' 띠·1위 도장
    if (v.tap) d.me.style.transform += ' scale(.96)';
    d.dt.style.opacity = v.dt > 0 ? 1 : 0;
    d.dt.style.transform = 'translateX(' + ((1 - v.dt) * 100).toFixed(1) + '%)';
    d.ban.style.opacity = v.ban; d.ban.style.transform = 'scaleY(' + (0.3 + 0.7 * v.ban).toFixed(3) + ')';
    d.stamp.style.opacity = clamp(v.stamp * 3);
    d.stamp.style.transform = 'scale(' + (1.7 - 0.7 * v.stamp).toFixed(3) + ') rotate(' + (-14 + 6 * v.stamp).toFixed(1) + 'deg)';
    // ① 썸네일
    d.thnew.style.setProperty('--w', (v.w * 100).toFixed(1) + '%');
    d.wipe.style.setProperty('--w', (v.w * 100).toFixed(1) + '%');
    d.wipe.style.opacity = v.w > 0 && v.w < 1 ? 1 : 0;
    // ② 상품명
    d.nm0.style.opacity = 1 - v.n; d.nm0.style.transform = 'translateY(' + (-6 * v.n).toFixed(1) + 'px)';
    d.nm1.style.opacity = v.n; d.nm1.style.transform = 'translateY(' + (6 * (1 - v.n)).toFixed(1) + 'px)';
    // ③ 딱지·할인가
    d.flags.forEach(function (f, i) {
      var p = ease(seg(l, [FLAG + i * 0.08, FLAG + i * 0.08 + 0.18]));
      f.style.opacity = p; f.style.transform = 'translateY(' + ((1 - p) * 4).toFixed(1) + 'px)';
    });
    d.price.textContent = v.pr ? d.p1 : d.p0;
    if (d.was) d.was.style.visibility = v.pr ? 'visible' : 'hidden';
    if (d.off) d.off.style.visibility = v.pr ? 'visible' : 'hidden';
    d.price.style.display = 'inline-block';
    d.price.style.transform = 'scale(' + (1 + 0.14 * Math.sin(Math.PI * seg(l, [PRICE, PRICE + 0.2]))).toFixed(3) + ')';
  }

  function render(t) {
    var l = t % CYCLE;
    var vis = ease(seg(l, IN)) * (1 - seg(l, OUT));
    var gp = inout(seg(l, GLB));
    // 두 화면은 카메라 묶음째로 사라져야 겹친 부분(뒤 PC)이 비쳐 보이지 않는다
    devs.forEach(function (d) { d.box.style.opacity = vis; });
    el.cam.style.opacity = (1 - gp).toFixed(3);
    // '랭킹 1위' 줌인: 대표 이미지 중심이 무대 가운데로 오며 장면을 가득 채움
    var z = inout(seg(l, ZOOM)), zs = lerp(1, ZS, z), fx = lerp(KV.x, STAGE.w / 2, z), fy = lerp(KV.y, STAGE.h / 2, z);
    el.cam.style.transform = z > 0 ? 'translate(' + (fx - KV.x * zs).toFixed(1) + 'px,' + (fy - KV.y * zs).toFixed(1) + 'px) scale(' + zs.toFixed(3) + ')' : '';
    el.cam.style.clipPath = z > 0 ? 'inset(' + (-(fy - KV.y * zs) / zs).toFixed(1) + 'px ' + ((fx - KV.x * zs + STAGE.w * zs - STAGE.w) / zs).toFixed(1) + 'px ' + ((fy - KV.y * zs + STAGE.h * zs - STAGE.h) / zs).toFixed(1) + 'px ' + (-(fx - KV.x * zs) / zs).toFixed(1) + 'px round ' + (18 / zs).toFixed(1) + 'px)' : '';
    el.side.style.opacity = (vis * Math.max(1 - z, ease(seg(l, MAP_IN)))).toFixed(3);
    var mv = inout(seg(l, MOVE)), br = inout(seg(l, BROWSE)), focus = ease(seg(l, FOCUS)) * (1 - ease(seg(l, SETTLE)));
    var v = { mv: mv, s: lerp(devs[0] ? devs[0].from : 5, 0, mv), focus: focus,
      lift: Math.max(focus, l >= SETTLE[0] && l < OUT[1] ? 0.55 : 0),
      w: inout(seg(l, THUMB)), n: ease(seg(l, NAME)), pr: l >= PRICE,
      tap: l >= TAP && l < TAP + 0.12, dt: inout(seg(l, DT)), ban: ease(seg(l, BAN)), stamp: ease(seg(l, STAMP)),
      scroll: function (d) { return lerp(lerp(d.c.from, d.at, br), 0, mv); } };
    devs.forEach(function (d) { renderDev(d, l, v); });

    // 주석: 단계가 시작될 때 밝아지고 가는 선·형광펜, 이어서 조회·담기 수
    steps.forEach(function (st, i) {
      var p = ease(seg(l, [STEP_AT[i], STEP_AT[i] + 0.3]));
      st.style.opacity = (0.28 + 0.72 * p).toFixed(3);
      st.style.transform = 'translateY(' + ((1 - p) * 5).toFixed(1) + 'px)';
      st.style.setProperty('--ln', p.toFixed(3));
      var m = st.querySelector('mark'); if (m) m.style.setProperty('--hl', (ease(seg(l, [STEP_AT[i] + 0.15, STEP_AT[i] + 0.5])) * 100).toFixed(0) + '%');
    });
    grps.forEach(function (g, i) {
      var inP = i === 0 ? 1 : ease(seg(l, [GRP_AT[i], GRP_AT[i] + 0.3])), outP = i + 1 < GRP_AT.length ? seg(l, [GRP_AT[i + 1] - 0.15, GRP_AT[i + 1] + 0.1]) : 0;
      g.style.opacity = (inP * (1 - outP)).toFixed(3);
      g.style.transform = 'translateY(' + ((1 - inP) * 8).toFixed(1) + 'px)';
    });
    steps2.forEach(function (st, i) {
      var a = GRP_AT[i + 1], p = ease(seg(l, [a, a + 0.3]));
      st.style.setProperty('--ln', p.toFixed(3));
      var m = st.querySelector('mark'); if (m) m.style.setProperty('--hl', (ease(seg(l, [a + 0.15, a + 0.5])) * 100).toFixed(0) + '%');
    });
    // 모바일 손끝: 1위 칸을 누름
    if (mob && el.touch) {
      el.touch.style.left = (mob.c.pad + mob.c.w / 2).toFixed(1) + 'px';
      el.touch.style.top = (36 + mob.gridTop + mob.c.w / 2).toFixed(1) + 'px';
      el.touch.style.opacity = l > TAP - 0.18 && l < TAP + 0.2 ? clamp((l - TAP + 0.18) / 0.08) * clamp((TAP + 0.2 - l) / 0.06) : 0;
      el.touch.style.transform = 'scale(' + (v.tap ? 0.82 : 1) + ')';
    }
    // 글로벌: 지도가 떠오르고 한국 카드 → 선이 차례로 이어지며 지역 이름표
    var mp = ease(seg(l, MAP_IN));
    el.glb.style.opacity = (mp * (1 - seg(l, OUT))).toFixed(3);
    el.glb.style.transform = 'translateY(' + ((1 - mp) * 14).toFixed(1) + 'px)';
    var kp = ease(seg(l, KR_IN));
    el.kr.style.opacity = kp; el.kr.style.transform = 'translateY(' + ((1 - kp) * 8).toFixed(1) + 'px)';
    arcs.forEach(function (a, i) {
      var t0 = ARC_AT + i * ARC_GAP, p = inout(seg(l, [t0, t0 + ARC_LEN])), e = ease(seg(l, [t0 + ARC_LEN - 0.05, t0 + ARC_LEN + 0.2]));
      a.style.strokeDashoffset = (1 - p).toFixed(3);
      if (dots[i]) dots[i].style.opacity = e;
      if (dsts[i]) { dsts[i].style.opacity = e; dsts[i].style.transform = 'translateY(' + ((1 - e) * 6).toFixed(1) + 'px)'; }
    });
    el.nums.style.opacity = ease(seg(l, [NUMS[0], NUMS[0] + 0.25]));
    var np = ease(seg(l, NUMS));
    el.view.textContent = fmt(Math.round(lerp(312, 4870, np)));
    el.cart.textContent = fmt(Math.round(lerp(41, 1206, np)));
  }

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var t = 0, prev = 0, on = true, held = false;
  window.oySeek = function (s) { held = true; t = s; render(t); };
  if (reduce) { render(5.4); return; }
  if ('IntersectionObserver' in window) new IntersectionObserver(function (e) { on = e[0].isIntersecting; }).observe(root);
  function frame(now) {
    var dt = prev ? Math.min(0.1, (now - prev) / 1000) : 0; prev = now;
    if (!held && on && !document.hidden) { t += dt; render(t); }
    requestAnimationFrame(frame);
  }
  render(0);
  requestAnimationFrame(frame);
})();
