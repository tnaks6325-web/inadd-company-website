/* 리뷰 마케팅 히어로(한 바퀴 6.2초): 현실 → 앱 → 현실.
   0~1.2초 소파에서 휴대폰으로 고민(영상), 0.75초부터 휴대폰 화면 속으로 → 1.2~4.6초 쇼핑 앱 비교 화면:
   오른쪽 물결랩 세럼에 사진 후기가 차오르며 별점 4.1→4.9, 리뷰 5→1,284 → 엄지가 오른쪽 장바구니를 누름 → '장바구니에 담았어요' →
   4.6~6.2초 받은 세럼을 손등에 덜며 미소(영상) → 처음으로. 화면 상태는 시간 t 하나로 계산한다(render).
   히어로가 화면 밖이거나 탭이 숨겨지면 멈추고, '움직임 줄이기' 설정이면 후기가 다 찬 비교 화면에서 멈춘다.
   window.rcSeek(t) 로 특정 순간을 고정해 볼 수 있다. */
(function () {
  var root = document.querySelector('[data-rc]');
  if (!root) return;
  function $(k) { return root.querySelector('[data-rc-' + k + ']'); }
  var el = { real: $('real'), phone: $('phone'), b: $('b'), star: $('star'), n: $('n'), track: $('track'), cart: $('cart'), toast: $('toast'), touch: $('touch') };
  var cuts = Array.prototype.slice.call(root.querySelectorAll('[data-rc-cut]'));
  var revs = Array.prototype.slice.call(el.track.children);
  var CYCLE = 6.2, PUSH = [0.75, 1.2], APP_IN = [1.0, 1.25], REV_AT = 1.55, REV_GAP = 0.32, REV_IN = 0.28, ROW = 74, ROWS = 3.4,
    STAR = [1.55, 3.45], TOUCH_IN = [3.45, 3.6], TOUCH_MOVE = [3.55, 3.8], PRESS = 3.82, TOAST = [3.95, 4.55], TO_REAL = [4.5, 4.72], OUT = [5.95, 6.2];
  var TOUCH_FROM = [250, 470], TOUCH_TO = [249, 669];
  var playing = -1;

  function clamp(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
  function seg(l, r) { return clamp((l - r[0]) / (r[1] - r[0])); }
  function ease(x) { return 1 - Math.pow(1 - x, 3); }
  function inout(x) { return x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; }
  function fmt(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ','); }
  // 컷 영상: 컷이 바뀔 때 처음부터 재생. 고정(seek) 중에는 그 순간 장면으로 맞춘다.
  function syncVideo(ci, inCut, seeking) {
    cuts.forEach(function (c, i) {
      var v = c.querySelector('video'); if (!v) return;
      if (i !== ci) { if (!v.paused) v.pause(); return; }
      if (seeking) { v.pause(); try { v.currentTime = inCut; } catch (e) {} return; }
      if (playing !== i) { try { v.currentTime = 0; } catch (e) {} var p = v.play(); if (p && p.catch) p.catch(function () {}); }
    });
    playing = seeking ? -1 : ci;
  }

  function render(t, seeking) {
    var l = t % CYCLE;
    // 현실: 고민(0~) → 미소(4.5~). 고민 컷은 끝에서 휴대폰 화면 쪽으로 다가가며 사라짐
    var ci = l >= TO_REAL[0] ? 1 : 0, app = seg(l, APP_IN), back = seg(l, TO_REAL), out = seg(l, OUT);
    cuts.forEach(function (c, i) { c.style.opacity = i === ci ? 1 : 0; });
    var pz = inout(seg(l, PUSH)), first = cuts[0] && cuts[0].firstElementChild;
    if (first) first.style.transform = 'scale(' + (1 + 1.2 * pz).toFixed(3) + ')';
    el.real.style.opacity = ci === 0 ? (1 - app) * clamp(l / 0.15) : back * (1 - out);
    if (ci === 0 ? l < APP_IN[1] : l < OUT[1]) syncVideo(ci, ci ? l - TO_REAL[0] : l, seeking); else syncVideo(-1, 0, seeking);

    // 앱: 크게 다가온 화면이 제자리로 → 후기 차오름 → 장바구니
    el.phone.style.opacity = app * (1 - back);
    el.phone.style.transform = 'scale(' + (0.82 * (1.35 - 0.35 * ease(app))).toFixed(3) + ')';
    var shown = 0;
    revs.forEach(function (r, i) {
      var p = ease(clamp((l - REV_AT - i * REV_GAP) / REV_IN));
      shown += p; r.style.opacity = p; r.style.transform = 'translateY(' + ((1 - p) * 18).toFixed(1) + 'px)';
    });
    el.track.style.transform = 'translateY(' + (-Math.max(0, shown - ROWS) * ROW).toFixed(1) + 'px)';
    var sp = ease(seg(l, STAR));
    el.star.textContent = (4.1 + 0.8 * sp).toFixed(1);
    el.n.textContent = fmt(Math.round(5 + (1284 - 5) * sp));
    // 엄지: 나타나서 장바구니로 내려가 누름
    var tin = seg(l, TOUCH_IN), tm = inout(seg(l, TOUCH_MOVE));
    el.touch.style.opacity = l < PRESS + 0.25 ? tin : clamp(1 - (l - PRESS - 0.25) / 0.2);
    el.touch.style.left = (TOUCH_FROM[0] + (TOUCH_TO[0] - TOUCH_FROM[0]) * tm).toFixed(1) + 'px';
    el.touch.style.top = (TOUCH_FROM[1] + (TOUCH_TO[1] - TOUCH_FROM[1]) * tm).toFixed(1) + 'px';
    el.touch.style.transform = 'scale(' + (l >= PRESS && l < PRESS + 0.15 ? 0.82 : 1) + ')';
    el.cart.classList.toggle('is-press', l >= PRESS && l < PRESS + 0.15);
    el.b.classList.toggle('is-pick', l >= PRESS);
    var to = seg(l, [TOAST[0], TOAST[0] + 0.15]);
    el.toast.style.opacity = l < TOAST[1] ? to : clamp(1 - (l - TOAST[1]) / 0.15);
    el.toast.style.transform = 'translateY(' + ((1 - ease(to)) * 10).toFixed(1) + 'px)';
  }

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var t = 0, prev = 0, on = true, held = false;
  window.rcSeek = function (s) { held = true; t = s; render(t, true); };
  if (reduce) { render(3.5, true); return; }
  if ('IntersectionObserver' in window) new IntersectionObserver(function (e) { on = e[0].isIntersecting; }).observe(root);
  function frame(now) {
    var dt = prev ? Math.min(0.1, (now - prev) / 1000) : 0; prev = now;
    if (!held && on && !document.hidden) { t += dt; render(t); } else if (!held && playing >= 0) syncVideo(-1, 0, false);
    requestAnimationFrame(frame);
  }
  render(0);
  requestAnimationFrame(frame);
})();
