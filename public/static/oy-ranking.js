/* 올리브영 마케팅 히어로(한 바퀴 약 9.5초): '랭킹이 오르는 순간'.
   스킨케어 판매 랭킹 38위의 우리 상품 → 리뷰 수가 오르며 줄이 떠올라 다른 상품을 제침(38→17) →
   눌러 들어간 상세페이지에 사용 장면·성분·사용법이 채워짐 → 돌아오면 17→6 →
   검색창에 '토너패드' → 결과 첫 줄 → 돌아오면 6→1 → '급상승'·장바구니 담은 사람 수가 오름 → 처음으로.
   목록은 카메라가 우리 상품을 따라가듯 스크롤되고, 다른 상품은 한 칸씩 밀려 내려간다.
   화면 상태는 시간 t 하나로 계산한다(render). 히어로가 화면 밖이거나 탭이 숨겨지면 멈추고,
   '움직임 줄이기' 설정이면 1위 화면에서 멈춘다. window.oySeek(t) 로 특정 순간을 고정해 볼 수 있다. */
(function () {
  var root = document.querySelector('[data-oy]');
  if (!root) return;
  function $(k) { return root.querySelector('[data-oy-' + k + ']'); }
  function $$(k) { return Array.prototype.slice.call(root.querySelectorAll('[data-oy-' + k + ']')); }
  var el = { phone: $('phone'), side: $('side'), big: $('big'), me: $('me'), no: $('no'), up: $('up'), hot: $('hot'), star: $('star'), n: $('n'),
    cart: $('cart'), cn: $('cn'), sbox: $('sbox'), dt: $('dt'), dtrack: $('dtrack'), sr: $('sr'), q: $('q'), touch: $('touch') };
  var others = $$('o'), steps = $$('step'), blks = $$('blk'), res = $$('res');
  var nos = others.map(function (o) { return o.querySelector('.oy-no'); });
  var Q = el.q.textContent, ROW = 88, LIST_TOP = 184, FOLLOW = 1.6;

  // 시각표(초)
  var IN = [0, 0.35], R1 = [0.7, 2.1], TAP1 = 2.3, DET = [2.4, 2.65], BLK = [2.8, 3.1, 3.4], DSCROLL = [2.85, 3.6], BACK1 = 3.78, DET_OUT = [3.85, 4.1],
    R2 = [4.2, 4.9], TAP2 = 5.05, SRCH = [5.15, 5.35], TYPE = [5.4, 5.8], RES = [5.9, 6.25], BACK2 = 6.55, SRCH_OUT = [6.62, 6.82],
    R3 = [6.95, 7.75], TOP = [7.75, 8.05], CART = [7.9, 9.0], OUT = [9.2, 9.5], CYCLE = 9.5;
  var P = [37, 16, 5, 0]; // 우리 상품 자리(0 = 1위)
  var STEP_AT = [R1[0], DET[0], SRCH[0]];
  var PRESSES = [TAP1, BACK1, TAP2, BACK2];
  // 손끝: [시각, x, y, 보임] (휴대폰 화면 좌표 342x714)
  var MY = LIST_TOP + FOLLOW * ROW + ROW / 2;
  var TOUCH = [[2.05, 210, MY + 40, 0], [2.15, 210, MY + 40, 1], [2.28, 200, MY, 1], [2.45, 200, MY, 1], [2.55, 200, MY, 0],
    [3.6, 60, 110, 0], [3.66, 60, 110, 1], [3.76, 24, 58, 1], [3.9, 24, 58, 1], [3.98, 24, 58, 0],
    [4.85, 190, 120, 0], [4.92, 190, 120, 1], [5.03, 171, 61, 1], [5.2, 171, 61, 1], [5.28, 171, 61, 0],
    [6.38, 60, 110, 0], [6.44, 60, 110, 1], [6.53, 26, 61, 1], [6.68, 26, 61, 1], [6.76, 26, 61, 0]];

  function clamp(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
  function seg(l, r) { return clamp((l - r[0]) / (r[1] - r[0])); }
  function ease(x) { return 1 - Math.pow(1 - x, 3); }
  function inout(x) { return x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; }
  function lerp(a, b, p) { return a + (b - a) * p; }
  function fmt(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ','); }
  function path(l, k) {
    if (l <= k[0][0]) return k[0];
    for (var i = 1; i < k.length; i++) if (l <= k[i][0]) { var p = inout((l - k[i - 1][0]) / (k[i][0] - k[i - 1][0])); return [l, lerp(k[i - 1][1], k[i][1], p), lerp(k[i - 1][2], k[i][2], p), lerp(k[i - 1][3], k[i][3], p)]; }
    return k[k.length - 1];
  }

  function render(t) {
    var l = t % CYCLE;
    var r1 = inout(seg(l, R1)), r2 = inout(seg(l, R2)), r3 = inout(seg(l, R3));
    var p = l < R2[0] ? lerp(P[0], P[1], r1) : l < R3[0] ? lerp(P[1], P[2], r2) : lerp(P[2], P[3], r3);
    var rank = Math.round(p) + 1;
    var climbing = (l > R1[0] && l < R1[1]) || (l > R2[0] && l < R2[1]) || (l > R3[0] && l < R3[1]);
    var vis = ease(seg(l, IN)) * (1 - seg(l, OUT));
    el.phone.style.opacity = vis; el.side.style.opacity = vis;

    // 랭킹 목록: 우리 상품을 따라 스크롤, 다른 상품은 우리 상품이 지나가면 한 칸 아래로
    var scroll = Math.max(0, (p - FOLLOW) * ROW);
    others.forEach(function (o, j) {
      var pos = j + clamp(j - p + 1);
      var y = pos * ROW - scroll;
      o.style.transform = 'translateY(' + y.toFixed(1) + 'px)';
      o.style.visibility = y < -ROW || y > 560 ? 'hidden' : 'visible';
      var nr = Math.round(pos) + 1;
      if (nos[j].textContent !== String(nr)) nos[j].textContent = nr;
    });
    var lift = climbing ? 1 : l >= TOP[0] ? 1 - 0.4 * ease(seg(l, TOP)) : 0;
    var liftS = Math.max(lift, l > R1[0] - 0.15 && l < R1[0] ? seg(l, [R1[0] - 0.15, R1[0]]) : 0);
    el.me.style.setProperty('--lift', liftS.toFixed(3));
    el.me.style.transform = 'translateY(' + (p * ROW - scroll).toFixed(1) + 'px) scale(' + (1 + 0.03 * liftS).toFixed(3) + ')';
    el.no.textContent = rank;
    el.up.textContent = rank < 38 ? '▲' + (38 - rank) : '';
    el.big.textContent = rank;
    // 리뷰 수·별점(첫 번째 오름과 함께)
    el.n.textContent = ' (' + fmt(Math.round(lerp(23, 1280, ease(seg(l, R1))))) + ')';
    el.star.textContent = lerp(4.1, 4.8, ease(seg(l, R1))).toFixed(1);
    var tp = ease(seg(l, TOP));
    el.hot.style.opacity = tp;
    var cp = seg(l, CART);
    el.cart.style.opacity = ease(clamp(cp * 4)); el.cart.style.transform = 'translateY(' + ((1 - ease(clamp(cp * 4))) * 10).toFixed(1) + 'px)';
    el.cn.textContent = fmt(Math.round(lerp(2180, 3214, ease(cp))));
    el.sbox.classList.toggle('is-press', l >= TAP2 && l < TAP2 + 0.14);

    // 휴대폰 옆: 단계가 시작될 때 밝아지고 가는 선·형광펜
    steps.forEach(function (s, i) {
      var a = ease(seg(l, [STEP_AT[i], STEP_AT[i] + 0.3]));
      s.style.opacity = (0.28 + 0.72 * a).toFixed(3);
      s.style.transform = 'translateX(' + ((1 - a) * 6).toFixed(1) + 'px)';
      s.style.setProperty('--ln', a.toFixed(3));
      var m = s.querySelector('mark'); if (m) m.style.setProperty('--hl', (ease(seg(l, [STEP_AT[i] + 0.15, STEP_AT[i] + 0.5])) * 100).toFixed(0) + '%');
    });

    // 상세페이지: 오른쪽에서 들어와 콘텐츠가 차례로 채워지며 스크롤 → 뒤로
    var di = inout(seg(l, DET)), dout = inout(seg(l, DET_OUT));
    var dx = l < DET_OUT[0] ? 1 - di : dout;
    el.dt.style.opacity = l >= DET[0] && dout < 1 ? 1 : 0;
    el.dt.style.transform = 'translateX(' + (dx * 100).toFixed(1) + '%)';
    el.dtrack.style.transform = 'translateY(' + (-310 * inout(seg(l, DSCROLL))).toFixed(1) + 'px)';
    blks.forEach(function (b, i) {
      var a = ease(seg(l, [BLK[i], BLK[i] + 0.22]));
      b.style.opacity = a; b.style.transform = 'translateY(' + ((1 - a) * 14).toFixed(1) + 'px)';
    });

    // 검색: 화면이 바뀌고 '토너패드' 입력 → 결과 첫 줄에 우리 상품
    var si = ease(seg(l, SRCH)), so = seg(l, SRCH_OUT);
    el.sr.style.opacity = (si * (1 - so)).toFixed(3);
    el.q.textContent = Q.slice(0, Math.round(Q.length * seg(l, TYPE)));
    res.forEach(function (r, i) {
      var a = ease(seg(l, [RES[0] + i * 0.07, RES[0] + i * 0.07 + 0.2]));
      r.style.opacity = a; r.style.transform = 'translateY(' + ((1 - a) * 10).toFixed(1) + 'px)';
    });
    if (res[0]) res[0].style.setProperty('--glow', ease(seg(l, [RES[1], RES[1] + 0.2])).toFixed(3));

    // 손끝
    var k = path(l, TOUCH);
    el.touch.style.opacity = k[3]; el.touch.style.left = k[1].toFixed(1) + 'px'; el.touch.style.top = k[2].toFixed(1) + 'px';
    el.touch.style.transform = 'scale(' + (PRESSES.some(function (x) { return l >= x && l < x + 0.14; }) ? 0.82 : 1) + ')';
  }

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var t = 0, prev = 0, on = true, held = false;
  window.oySeek = function (s) { held = true; t = s; render(t); };
  if (reduce) { render(8.6); return; }
  if ('IntersectionObserver' in window) new IntersectionObserver(function (e) { on = e[0].isIntersecting; }).observe(root);
  function frame(now) {
    var dt = prev ? Math.min(0.1, (now - prev) / 1000) : 0; prev = now;
    if (!held && on && !document.hidden) { t += dt; render(t); }
    requestAnimationFrame(frame);
  }
  render(0);
  requestAnimationFrame(frame);
})();
