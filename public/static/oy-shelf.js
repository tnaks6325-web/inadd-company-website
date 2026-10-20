/* 올리브영 마케팅 히어로(한 바퀴 약 7.5초): '진열 칸이 바뀌는 순간'.
   토너·패드 카테고리 2열 목록을 내려 보다가 흐릿한 우리 상품 칸에서 멈춤 →
   ① 썸네일이 왼쪽에서 오른쪽으로 갈리며 새 썸네일로 → ② 상품명이 구성이 보이게 바뀜 → ③ 기획세트·증정·세일 딱지와 할인가 →
   주변 칸이 흐려지고 우리 칸이 떠오름 → 휴대폰 옆 조회·장바구니 담기 수가 오름 → 우리 칸이 목록 맨 앞으로 옮겨감(다른 칸은 한 칸씩 밀림) → 처음으로.
   화면 상태는 시간 t 하나로 계산한다(render). 히어로가 화면 밖이거나 탭이 숨겨지면 멈추고,
   '움직임 줄이기' 설정이면 맨 앞으로 옮겨간 화면에서 멈춘다. window.oySeek(t) 로 특정 순간을 고정해 볼 수 있다. */
(function () {
  var root = document.querySelector('[data-oy]');
  if (!root) return;
  function $(k) { return root.querySelector('[data-oy-' + k + ']'); }
  function $$(k) { return Array.prototype.slice.call(root.querySelectorAll('[data-oy-' + k + ']')); }
  var el = { phone: $('phone'), side: $('side'), grid: $('grid'), me: $('me'), thnew: $('thnew'), wipe: $('wipe'), flags: $('flags'),
    nm0: $('nm0'), nm1: $('nm1'), off: $('off'), was: $('was'), price: $('price'), nums: $('nums'), view: $('view'), cart: $('cart') };
  var others = $$('o'), steps = $$('step');
  var flags = Array.prototype.slice.call(el.flags.children);
  var FROM = +el.grid.getAttribute('data-from') || 5;
  var P0 = el.price.textContent, P1 = el.price.getAttribute('data-after');
  var W = 154, GAP = 10, PAD = 12, RH = 264, TOP_PAD = 8, VIEW = 566;

  // 시각표(초)
  var IN = [0, 0.3], BROWSE = [0.1, 0.95], THUMB = [1.1, 1.6], NAME = [1.95, 2.3], FLAG = 2.55, PRICE = 2.75,
    FOCUS = [3.1, 3.45], NUMS = [3.3, 5.0], MOVE = [5.15, 6.1], SETTLE = [6.1, 6.45], OUT = [7.2, 7.5], CYCLE = 7.5;
  var STEP_AT = [1.0, 1.85, 2.45];
  var SCROLL_FROM = 150, SCROLL_AT = TOP_PAD + Math.floor(FROM / 2) * RH + 248 - VIEW + 40;

  function clamp(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
  function seg(l, r) { return clamp((l - r[0]) / (r[1] - r[0])); }
  function ease(x) { return 1 - Math.pow(1 - x, 3); }
  function inout(x) { return x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; }
  function lerp(a, b, p) { return a + (b - a) * p; }
  function fmt(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ','); }
  function slotXY(k) { var lo = Math.floor(k), f = k - lo, a = [PAD + (lo % 2) * (W + GAP), TOP_PAD + Math.floor(lo / 2) * RH], hi = lo + 1, b = [PAD + (hi % 2) * (W + GAP), TOP_PAD + Math.floor(hi / 2) * RH]; return [lerp(a[0], b[0], f), lerp(a[1], b[1], f)]; }

  function render(t) {
    var l = t % CYCLE;
    var vis = ease(seg(l, IN)) * (1 - seg(l, OUT));
    el.phone.style.opacity = vis; el.side.style.opacity = vis;

    // 목록 스크롤: 내려 보다가 우리 칸에서 멈춤 → 맨 앞으로 옮겨갈 때 함께 위로
    var mv = inout(seg(l, MOVE));
    var scroll = lerp(lerp(SCROLL_FROM, SCROLL_AT, inout(seg(l, BROWSE))), 0, mv);
    var s = lerp(FROM, 0, mv);
    var focus = ease(seg(l, FOCUS)) * (1 - ease(seg(l, SETTLE)));
    others.forEach(function (o, j) {
      var xy = slotXY(j + clamp(j - s + 1));
      o.style.transform = 'translate(' + xy[0].toFixed(1) + 'px,' + (xy[1] - scroll).toFixed(1) + 'px)';
      o.style.opacity = (1 - 0.55 * focus).toFixed(3);
      o.style.filter = focus > 0 ? 'grayscale(' + (0.7 * focus).toFixed(2) + ') blur(' + (0.8 * focus).toFixed(2) + 'px)' : '';
    });
    var a = slotXY(FROM), b = slotXY(0);
    var lift = Math.max(focus, l >= SETTLE[0] && l < OUT[1] ? 0.55 : 0);
    el.me.style.setProperty('--lift', lift.toFixed(3));
    el.me.style.transform = 'translate(' + lerp(a[0], b[0], mv).toFixed(1) + 'px,' + (lerp(a[1], b[1], mv) - scroll).toFixed(1) + 'px) scale(' + (1 + 0.04 * focus + 0.03 * Math.sin(Math.PI * mv)).toFixed(3) + ')';

    // ① 썸네일이 갈림
    var w = inout(seg(l, THUMB));
    el.thnew.style.setProperty('--w', (w * 100).toFixed(1) + '%');
    el.wipe.style.setProperty('--w', (w * 100).toFixed(1) + '%');
    el.wipe.style.opacity = w > 0 && w < 1 ? 1 : 0;
    // ② 상품명
    var n = ease(seg(l, NAME));
    el.nm0.style.opacity = 1 - n; el.nm0.style.transform = 'translateY(' + (-6 * n).toFixed(1) + 'px)';
    el.nm1.style.opacity = n; el.nm1.style.transform = 'translateY(' + (6 * (1 - n)).toFixed(1) + 'px)';
    // ③ 딱지·할인가
    flags.forEach(function (f, i) {
      var p = ease(seg(l, [FLAG + i * 0.08, FLAG + i * 0.08 + 0.18]));
      f.style.opacity = p; f.style.transform = 'translateY(' + ((1 - p) * 4).toFixed(1) + 'px)';
    });
    var pr = l >= PRICE;
    el.price.textContent = pr ? P1 : P0;
    el.off.style.display = el.was.style.display = pr ? 'inline' : 'none';
    el.price.style.transform = 'scale(' + (1 + 0.12 * Math.sin(Math.PI * seg(l, [PRICE, PRICE + 0.2]))).toFixed(3) + ')';

    // 휴대폰 옆: 단계가 시작될 때 밝아지고 가는 선·형광펜, 이어서 조회·담기 수
    steps.forEach(function (st, i) {
      var p = ease(seg(l, [STEP_AT[i], STEP_AT[i] + 0.3]));
      st.style.opacity = (0.28 + 0.72 * p).toFixed(3);
      st.style.transform = 'translateX(' + ((1 - p) * 6).toFixed(1) + 'px)';
      st.style.setProperty('--ln', p.toFixed(3));
      var m = st.querySelector('mark'); if (m) m.style.setProperty('--hl', (ease(seg(l, [STEP_AT[i] + 0.15, STEP_AT[i] + 0.5])) * 100).toFixed(0) + '%');
    });
    el.nums.style.opacity = ease(seg(l, [NUMS[0], NUMS[0] + 0.25]));
    var np = ease(seg(l, NUMS));
    el.view.textContent = fmt(Math.round(lerp(312, 4870, np)));
    el.cart.textContent = fmt(Math.round(lerp(41, 1206, np)));
  }

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var t = 0, prev = 0, on = true, held = false;
  window.oySeek = function (s) { held = true; t = s; render(t); };
  if (reduce) { render(6.6); return; }
  if ('IntersectionObserver' in window) new IntersectionObserver(function (e) { on = e[0].isIntersecting; }).observe(root);
  function frame(now) {
    var dt = prev ? Math.min(0.1, (now - prev) / 1000) : 0; prev = now;
    if (!held && on && !document.hidden) { t += dt; render(t); }
    requestAnimationFrame(frame);
  }
  render(0);
  requestAnimationFrame(frame);
})();
