/* 리뷰 마케팅 히어로(한 바퀴 약 8초): '리뷰가 다음 선택을 만든다'.
   0~1.3초 소파에서 고민하던 인물 주위를 카메라가 빠르게 돌아 휴대폰 화면 속으로 빨려 들어감(영상, 끝 장면 = 손에 든 휴대폰 속 앱 화면) →
   영상 속 휴대폰 화면 자리에서 앱 휴대폰이 그대로 이어받아 앞으로 다가옴 → 쇼핑 앱 비교 화면: 오른쪽 물결랩 세럼에 사진 후기가 차오르며
   별점 4.1→4.9, 리뷰 5→1,284, 후기 구절이 옆에 옮겨 적힘 → 엄지가 장바구니를 누름 → 4.7초 택배에서 꺼낸 세럼(영상) →
   5.15초 클로즈업으로 볼에 한 방울 떨어뜨리고 손끝으로 굴려 바름(영상) → 6.3초 직접 리뷰 쓰기(별 5개 → 한 줄 → 사진 → 등록) →
   비교 화면 맨 위에 그 리뷰가 '방금 전'으로 뜸(리뷰 1,285) → 처음으로. 화면 상태는 시간 t 하나로 계산한다(render).
   히어로가 화면 밖이거나 탭이 숨겨지면 멈추고, '움직임 줄이기' 설정이면 후기가 다 찬 비교 화면에서 멈춘다.
   window.rcSeek(t) 로 특정 순간을 고정해 볼 수 있다. */
(function () {
  var root = document.querySelector('[data-rc]');
  if (!root) return;
  function $(k) { return root.querySelector('[data-rc-' + k + ']'); }
  var el = { real: $('real'), phone: $('phone'), b: $('b'), star: $('star'), n: $('n'), track: $('track'), cart: $('cart'), toast: $('toast'), touch: $('touch'),
    wr: $('wr'), wtxt: $('wtxt'), wph: $('wph'), wgo: $('wgo'), mine: $('mine'), mnote: $('mnote') };
  var wstars = Array.prototype.slice.call(root.querySelectorAll('[data-rc-wstars] svg'));
  var cuts = Array.prototype.slice.call(root.querySelectorAll('[data-rc-cut]'));
  var revs = Array.prototype.slice.call(el.track.querySelectorAll('.rc-pr:not(.is-mine)'));
  var notes = Array.prototype.slice.call(root.querySelectorAll('[data-rc-note]'));
  var MINE_TXT = el.wtxt.textContent;
  var CUT_AT = [0, 4.7, 5.15], HAND = [1.25, 1.62], APP_IN = [1.25, 1.33], REV_AT = 1.85, REV_GAP = 0.3, REV_IN = 0.26, ROW = 74, ROWS = 3.4,
    STAR = [1.85, 3.65], TOUCH_IN = [3.7, 3.85], TOUCH_MOVE = [3.8, 4.05], PRESS = 4.07, TOAST = [4.2, 4.65], TO_REAL = [4.65, 4.85],
    APP2_IN = [6.3, 6.5], WSTAR_AT = 6.47, WSTAR_GAP = 0.06, WTXT = [6.73, 7.05], WPH = 6.85, TOUCH2_MOVE = [6.9, 7.1], PRESS2 = 7.13,
    BACK_CMP = [7.21, 7.33], MINE_IN = [7.3, 7.55], MNOTE = [7.45, 7.7], OUT = [7.7, 7.95], CYCLE = 7.95;
  // 영상 끝 장면 속 휴대폰 위치(무대 좌표): 앱 휴대폰이 이 크기·자리에서 시작해 제자리(왼쪽 96, 위 10, 0.82배)로 다가옴
  var HAND_FROM = { dx: 166.1, dy: 120.1, s: 0.433 }, HAND_TO = { dx: 0, dy: 0, s: 0.82 };
  var TOUCH_FROM = [250, 470], TOUCH_TO = [249, 669], TOUCH2_FROM = [210, 520], TOUCH2_TO = [171, 670];
  var playing = -1;

  function clamp(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
  function seg(l, r) { return clamp((l - r[0]) / (r[1] - r[0])); }
  function ease(x) { return 1 - Math.pow(1 - x, 3); }
  function inout(x) { return x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; }
  function fmt(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ','); }
  function lerp(a, b, p) { return a + (b - a) * p; }
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
    var app = seg(l, APP_IN), back = seg(l, TO_REAL), app2 = seg(l, APP2_IN), out = seg(l, OUT), cmp2 = seg(l, BACK_CMP);
    // 현실: 고민·빨려 들어감(0~1.3) → 개봉(4.7~) → 볼(5.15~6.5)
    var ci = l >= CUT_AT[2] ? 2 : l >= TO_REAL[0] ? 1 : 0;
    cuts.forEach(function (c, i) { c.style.opacity = i === ci ? 1 : i === ci - 1 && ci === 2 ? 1 - clamp((l - CUT_AT[2]) / 0.1) : 0; });
    el.real.style.opacity = ci === 0 ? (1 - app) * clamp(l / 0.15) : back * (1 - app2);
    var realOn = ci === 0 ? l < APP_IN[1] : l < APP2_IN[1];
    if (realOn) syncVideo(ci, l - (ci === 0 ? 0 : ci === 1 ? TO_REAL[0] : CUT_AT[2]), seeking); else syncVideo(-1, 0, seeking);

    // 휴대폰: 첫 등장은 영상 속 휴대폰 화면 자리에서 이어받아 앞으로 다가옴, 두 번째(리뷰 쓰기)는 살짝 떠오르며
    var ph1 = app * (1 - back), ph2 = app2 * (1 - out);
    el.phone.style.opacity = Math.max(ph1, ph2);
    if (l < TO_REAL[1]) {
      var hp = inout(seg(l, HAND));
      el.phone.style.transform = 'translate(' + lerp(HAND_FROM.dx, HAND_TO.dx, hp).toFixed(1) + 'px,' + lerp(HAND_FROM.dy, HAND_TO.dy, hp).toFixed(1) + 'px) scale(' + lerp(HAND_FROM.s, HAND_TO.s, hp).toFixed(3) + ')';
    } else el.phone.style.transform = 'scale(' + (0.82 * (1.04 - 0.04 * ease(app2))).toFixed(3) + ')';

    // 비교 화면: 후기 차오름(첫 등장) / 끝에서는 맨 위로 올라가 내 리뷰가 추가됨
    var shown = 0;
    revs.forEach(function (r, i) {
      var p = ease(clamp((l - REV_AT - i * REV_GAP) / REV_IN));
      shown += p; r.style.opacity = p; r.style.transform = 'translateY(' + ((1 - p) * 18).toFixed(1) + 'px)';
    });
    var mi = ease(seg(l, MINE_IN));
    el.mine.style.height = (74 * mi).toFixed(1) + 'px'; el.mine.style.padding = (6 * mi).toFixed(1) + 'px 0';
    el.mine.style.borderBottomWidth = mi > 0 ? '1px' : '0';
    var mm = el.mine.querySelector('mark'); if (mm) mm.style.setProperty('--hl', (ease(seg(l, [MINE_IN[1], MINE_IN[1] + 0.25])) * 100).toFixed(0) + '%');
    el.track.style.transform = 'translateY(' + (l >= BACK_CMP[0] ? 0 : -Math.max(0, shown - ROWS) * ROW).toFixed(1) + 'px)';
    var sp = ease(seg(l, STAR));
    el.star.textContent = (4.1 + 0.8 * sp).toFixed(1);
    el.n.textContent = fmt(Math.round(5 + (1284 - 5) * sp) + (l >= MINE_IN[0] + 0.1 ? 1 : 0));
    // 인용: 연결된 후기가 올라온 직후 그 문장에 형광펜, 같은 구절이 옆에 적힘(첫 비교 화면에서만)
    notes.forEach(function (nt) {
      var i = +nt.getAttribute('data-rv'), at = REV_AT + i * REV_GAP + REV_IN, hl = ease(clamp((l - at) / 0.3)), np = ease(clamp((l - at - 0.15) / 0.35));
      var mk = revs[i] && revs[i].querySelector('mark'); if (mk) mk.style.setProperty('--hl', (hl * 100).toFixed(0) + '%');
      nt.style.opacity = np * (1 - back);
      nt.style.transform = 'translateX(' + ((1 - np) * 10).toFixed(1) + 'px)';
      nt.style.setProperty('--ln', np.toFixed(3));
      var nm = nt.querySelector('mark'); if (nm) nm.style.setProperty('--hl', (ease(clamp((l - at - 0.3) / 0.35)) * 100).toFixed(0) + '%');
    });
    var mn = ease(seg(l, MNOTE));
    el.mnote.style.opacity = mn * (1 - out); el.mnote.style.transform = 'translateX(' + ((1 - mn) * 10).toFixed(1) + 'px)'; el.mnote.style.setProperty('--ln', mn.toFixed(3));
    var mnm = el.mnote.querySelector('mark'); if (mnm) mnm.style.setProperty('--hl', (ease(seg(l, [MNOTE[0] + 0.15, MNOTE[1] + 0.1])) * 100).toFixed(0) + '%');

    // 리뷰 쓰기 화면: 별 5개 → 한 줄 → 사진 → 등록
    el.wr.style.opacity = l >= APP2_IN[0] ? 1 - cmp2 : 0;
    wstars.forEach(function (s, i) { s.classList.toggle('is-on', l >= WSTAR_AT + i * WSTAR_GAP); });
    el.wtxt.textContent = MINE_TXT.slice(0, Math.round(MINE_TXT.length * seg(l, WTXT)));
    var wp = ease(clamp((l - WPH) / 0.15));
    el.wph.style.opacity = wp; el.wph.style.transform = 'scale(' + (0.8 + 0.2 * wp).toFixed(3) + ')';
    el.wgo.classList.toggle('is-press', l >= PRESS2 && l < PRESS2 + 0.12);

    // 장바구니·선택 표시: 첫 비교 화면에서만(끝의 비교 화면은 다음 사람이 보는 화면이라 처음 상태로)
    el.cart.classList.toggle('is-press', l >= PRESS && l < PRESS + 0.15);
    el.b.classList.toggle('is-pick', l >= PRESS && l < TO_REAL[1]);
    var to = seg(l, [TOAST[0], TOAST[0] + 0.15]);
    el.toast.style.opacity = l < TOAST[1] ? to : clamp(1 - (l - TOAST[1]) / 0.12);
    el.toast.style.transform = 'translateY(' + ((1 - ease(to)) * 10).toFixed(1) + 'px)';

    // 엄지: 첫 번째는 장바구니, 두 번째는 '등록하기'
    var tx, ty, top;
    if (l < APP2_IN[0]) {
      var tm = inout(seg(l, TOUCH_MOVE));
      tx = lerp(TOUCH_FROM[0], TOUCH_TO[0], tm); ty = lerp(TOUCH_FROM[1], TOUCH_TO[1], tm);
      top = l < PRESS + 0.25 ? seg(l, TOUCH_IN) : clamp(1 - (l - PRESS - 0.25) / 0.2);
      el.touch.style.transform = 'scale(' + (l >= PRESS && l < PRESS + 0.15 ? 0.82 : 1) + ')';
    } else {
      var t2 = inout(seg(l, TOUCH2_MOVE));
      tx = lerp(TOUCH2_FROM[0], TOUCH2_TO[0], t2); ty = lerp(TOUCH2_FROM[1], TOUCH2_TO[1], t2);
      top = l < PRESS2 + 0.12 ? seg(l, [TOUCH2_MOVE[0] - 0.1, TOUCH2_MOVE[0]]) : clamp(1 - (l - PRESS2 - 0.12) / 0.12);
      el.touch.style.transform = 'scale(' + (l >= PRESS2 && l < PRESS2 + 0.12 ? 0.82 : 1) + ')';
    }
    el.touch.style.opacity = top; el.touch.style.left = tx.toFixed(1) + 'px'; el.touch.style.top = ty.toFixed(1) + 'px';
  }

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var t = 0, prev = 0, on = true, held = false;
  window.rcSeek = function (s) { held = true; t = s; render(t, true); };
  if (reduce) { render(3.75, true); return; }
  if ('IntersectionObserver' in window) new IntersectionObserver(function (e) { on = e[0].isIntersecting; }).observe(root);
  function frame(now) {
    var dt = prev ? Math.min(0.1, (now - prev) / 1000) : 0; prev = now;
    if (!held && on && !document.hidden) { t += dt; render(t); } else if (!held && playing >= 0) syncVideo(-1, 0, false);
    requestAnimationFrame(frame);
  }
  render(0);
  requestAnimationFrame(frame);
})();
