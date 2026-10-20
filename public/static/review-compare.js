/* 리뷰 마케팅 히어로(한 바퀴 약 12.5초): '리뷰가 다음 선택을 만든다'.
   0~0.7초 엄지로 쇼핑 앱 화면을 아래로 쓸어내리는 클로즈업 → 0.7~2.3초 앞쪽 대각선에서 고민하던 인물 주위를 카메라가 천천히 시작해 점점 빠르게 돌아 휴대폰 화면 속으로 빨려 들어감(영상) →
   영상 속 휴대폰 화면 자리에서 앱 휴대폰이 이어받아 앞으로 다가옴 → 쇼핑 앱 비교 화면:
   왼쪽 A사 세럼(★3.0·리뷰 23) 후기를 엄지로 스크롤하며 고민 → 왼쪽이 흐려지며 이탈 → 오른쪽 물결랩 세럼에 사진 후기가 차오르며
   별점 4.1→4.9, 리뷰 5→1,284, 후기 구절이 옆에 옮겨 적힘 → 오른쪽에 결정 강조 → 장바구니 → 구매하기 → 결제 → 구매 완료 →
   7.7초 택배에서 꺼낸 세럼(영상) → 8.1초 볼에 한 방울 떨어뜨려 손끝으로 굴려 바름(영상) → 9.3초 직접 리뷰 쓰기 →
   비교 화면 맨 위에 그 리뷰가 '방금 전'으로 뜸 → 10.8초 여러 소비자가 같은 순간 오른쪽 상품을 고르고 '구매 완료'가 여기저기 뜸 → 처음으로.
   화면 상태는 시간 t 하나로 계산한다(render). 히어로가 화면 밖이거나 탭이 숨겨지면 멈추고,
   '움직임 줄이기' 설정이면 오른쪽 상품이 강조된 비교 화면에서 멈춘다. window.rcSeek(t) 로 특정 순간을 고정해 볼 수 있다. */
(function () {
  var root = document.querySelector('[data-rc]');
  if (!root) return;
  function $(k) { return root.querySelector('[data-rc-' + k + ']'); }
  var el = { real: $('real'), phone: $('phone'), a: $('a'), atrack: $('atrack'), b: $('b'), star: $('star'), n: $('n'), track: $('track'),
    btns: $('btns'), cart: $('cart'), buybar: $('buybar'), buy: $('buy'), toast: $('toast'), sheet: $('sheet'), pay: $('pay'), done: $('done'),
    touch: $('touch'), wr: $('wr'), wtxt: $('wtxt'), wph: $('wph'), wgo: $('wgo'), mine: $('mine'), mnote: $('mnote'), crowd: $('crowd') };
  var wstars = Array.prototype.slice.call(root.querySelectorAll('[data-rc-wstars] svg'));
  var cuts = Array.prototype.slice.call(root.querySelectorAll('[data-rc-cut]'));
  var revs = Array.prototype.slice.call(el.track.querySelectorAll('.rc-pr:not(.is-mine)'));
  var notes = Array.prototype.slice.call(root.querySelectorAll('[data-rc-note]'));
  var tiles = Array.prototype.slice.call(root.querySelectorAll('[data-rc-ct]'));
  var MINE_TXT = el.wtxt.textContent;
  var tvids = tiles.map(function (tl) { return tl.querySelector('video'); }), crowdOn = false;

  // 시각표(초)
  var HAND = [2.25, 2.62], APP_IN = [2.25, 2.33], A_SCROLL = [2.75, 3.55], A_OUT = [3.8, 4.05],
    REV_AT = 4, REV_GAP = 0.22, REV_IN = 0.24, ROW = 74, ROWS = 3.4, ROW_A = 46, STAR = [4, 5.3], PICK = [5.3, 5.6],
    PRESS = 5.8, TOAST = [5.9, 6.25], BUYBAR = [6.2, 6.32], PRESS_BUY = 6.48, SHEET = [6.55, 6.75], PRESS_PAY = 6.9, DONE = [7, 7.15],
    TO_REAL = [7.65, 7.85], CUT_AT = [0, 7.65, 8.1],
    APP2_IN = [9.25, 9.45], WSTAR_AT = 9.42, WSTAR_GAP = 0.06, WTXT = [9.68, 10], WPH = 9.8, TOUCH2_MOVE = [9.85, 10.05], PRESS2 = 10.08,
    BACK_CMP = [10.16, 10.28], MINE_IN = [10.25, 10.5], MNOTE = [10.4, 10.65],
    CROWD_AT = 10.75, CROWD_POP = [0, 0.14, 0.06, 0.2, 0.1, 0.17], OUT = [12.15, 12.45], CYCLE = 12.45;
  // 영상 끝 장면 속 휴대폰 위치(무대 좌표): 앱 휴대폰이 이 크기·자리에서 시작해 제자리(왼쪽 96, 위 10, 0.82배)로 다가옴
  var HAND_FROM = { dx: 166.1, dy: 120.1, s: 0.433 }, HAND_TO = { dx: 0, dy: 0, s: 0.82 };
  // 엄지 경로(휴대폰 화면 좌표 342x714): [시각, x, y, 보임]
  var TOUCH = [[2.65, 95, 560, 0], [2.75, 95, 560, 1], [3.55, 95, 420, 1], [3.8, 102, 432, 1], [4.1, 250, 470, 1], [5.55, 250, 470, 1],
    [5.75, 249, 669, 1], [6.3, 249, 669, 1], [6.4, 171, 669, 1], [6.95, 171, 669, 1], [7.05, 171, 669, 0]];
  var PRESSES = [PRESS, PRESS_BUY, PRESS_PAY], TOUCH2_FROM = [210, 520], TOUCH2_TO = [171, 670];
  var playing = -1;

  function clamp(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
  function seg(l, r) { return clamp((l - r[0]) / (r[1] - r[0])); }
  function ease(x) { return 1 - Math.pow(1 - x, 3); }
  function inout(x) { return x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; }
  function fmt(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ','); }
  function lerp(a, b, p) { return a + (b - a) * p; }
  function pressed(l, list, d) { return list.some(function (p) { return l >= p && l < p + d; }); }
  function path(l, k) {
    if (l <= k[0][0]) return k[0];
    for (var i = 1; i < k.length; i++) if (l <= k[i][0]) { var p = inout((l - k[i - 1][0]) / (k[i][0] - k[i - 1][0])); return [l, lerp(k[i - 1][1], k[i][1], p), lerp(k[i - 1][2], k[i][2], p), lerp(k[i - 1][3], k[i][3], p)]; }
    return k[k.length - 1];
  }
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
    var app = seg(l, APP_IN), back = seg(l, TO_REAL), app2 = seg(l, APP2_IN), out = seg(l, OUT), cmp2 = seg(l, BACK_CMP), crowd = seg(l, [CROWD_AT, CROWD_AT + 0.3]);
    var first = l < TO_REAL[1];
    // 현실: 고민·빨려 들어감(0~1.6) → 개봉(6.95~) → 볼(7.4~8.75)
    var ci = l >= CUT_AT[2] ? 2 : l >= CUT_AT[1] ? 1 : 0;
    cuts.forEach(function (c, i) { c.style.opacity = i === ci ? 1 : i === 1 && ci === 2 ? 1 - clamp((l - CUT_AT[2]) / 0.1) : 0; });
    el.real.style.opacity = ci === 0 ? (1 - app) * clamp(l / 0.15) : back * (1 - app2);
    var realOn = ci === 0 ? l < APP_IN[1] : l < APP2_IN[1];
    if (realOn) syncVideo(ci, l - CUT_AT[ci], seeking); else syncVideo(-1, 0, seeking);

    // 휴대폰: 첫 등장은 영상 속 휴대폰 화면 자리에서 이어받아 앞으로 다가옴, 두 번째(리뷰 쓰기)는 살짝 떠오르며
    el.phone.style.opacity = Math.max(app * (1 - back), app2 * (1 - crowd));
    if (first) {
      var hp = inout(seg(l, HAND));
      el.phone.style.transform = 'translate(' + lerp(HAND_FROM.dx, HAND_TO.dx, hp).toFixed(1) + 'px,' + lerp(HAND_FROM.dy, HAND_TO.dy, hp).toFixed(1) + 'px) scale(' + lerp(HAND_FROM.s, HAND_TO.s, hp).toFixed(3) + ')';
    } else el.phone.style.transform = 'scale(' + (0.82 * (1.04 - 0.04 * ease(app2))).toFixed(3) + ')';

    // 왼쪽: 후기를 스크롤하며 고민 → 흐려지며 이탈(첫 비교 화면에서만)
    el.atrack.style.transform = 'translateY(' + (-ROW_A * 3 * inout(seg(l, A_SCROLL))).toFixed(1) + 'px)';
    var ao = first ? ease(seg(l, A_OUT)) : 0;
    el.a.style.opacity = (1 - 0.55 * ao).toFixed(3); el.a.style.filter = 'grayscale(' + ao.toFixed(2) + ')'; el.a.style.transform = 'scale(' + (1 - 0.03 * ao).toFixed(3) + ')';
    // 오른쪽: 사진 후기 차오름 → 결정 강조(남색 테두리·은은한 빛, 살짝 앞으로)
    var shown = 0;
    revs.forEach(function (r, i) {
      var p = ease(clamp((l - REV_AT - i * REV_GAP) / REV_IN));
      shown += p; r.style.opacity = p; r.style.transform = 'translateY(' + ((1 - p) * 18).toFixed(1) + 'px)';
    });
    var pk = first ? seg(l, PICK) : 0, glow = ease(pk);
    el.b.style.setProperty('--glow', glow.toFixed(3));
    el.b.style.transform = 'scale(' + (1 + 0.025 * Math.sin(Math.PI * pk) + 0.01 * glow).toFixed(4) + ')';
    // 끝의 비교 화면(다음 사람이 보는 화면): 맨 위로 올라가 내 리뷰가 추가됨
    var mi = ease(seg(l, MINE_IN));
    el.mine.style.height = (74 * mi).toFixed(1) + 'px'; el.mine.style.padding = (6 * mi).toFixed(1) + 'px 0';
    el.mine.style.borderBottomWidth = mi > 0 ? '1px' : '0';
    var mm = el.mine.querySelector('mark'); if (mm) mm.style.setProperty('--hl', (ease(seg(l, [MINE_IN[1], MINE_IN[1] + 0.25])) * 100).toFixed(0) + '%');
    el.track.style.transform = 'translateY(' + (l >= BACK_CMP[0] ? 0 : -Math.max(0, shown - ROWS) * ROW).toFixed(1) + 'px)';
    var sp = ease(seg(l, STAR));
    el.star.textContent = (4.1 + 0.8 * sp).toFixed(1);
    el.n.textContent = fmt(Math.round(5 + (1284 - 5) * sp) + (l >= MINE_IN[0] + 0.1 ? 1 : 0));
    // 인용: 연결된 후기가 올라온 직후 그 문장에 형광펜, 같은 구절이 옆에 적힘(첫 비교 화면에서만, 결제 시트가 오르면 물러남)
    var noteOut = seg(l, [SHEET[0] - 0.2, SHEET[0]]);
    notes.forEach(function (nt) {
      var i = +nt.getAttribute('data-rv'), at = REV_AT + i * REV_GAP + REV_IN, hl = ease(clamp((l - at) / 0.3)), np = ease(clamp((l - at - 0.1) / 0.3));
      var mk = revs[i] && revs[i].querySelector('mark'); if (mk) mk.style.setProperty('--hl', (hl * 100).toFixed(0) + '%');
      nt.style.opacity = np * (1 - noteOut) * (1 - back);
      nt.style.transform = 'translateX(' + ((1 - np) * 10).toFixed(1) + 'px)';
      nt.style.setProperty('--ln', np.toFixed(3));
      var nm = nt.querySelector('mark'); if (nm) nm.style.setProperty('--hl', (ease(clamp((l - at - 0.25) / 0.3)) * 100).toFixed(0) + '%');
    });
    var mn = ease(seg(l, MNOTE));
    el.mnote.style.opacity = mn * (1 - crowd); el.mnote.style.transform = 'translateX(' + ((1 - mn) * 10).toFixed(1) + 'px)'; el.mnote.style.setProperty('--ln', mn.toFixed(3));
    var mnm = el.mnote.querySelector('mark'); if (mnm) mnm.style.setProperty('--hl', (ease(seg(l, [MNOTE[0] + 0.15, MNOTE[1] + 0.1])) * 100).toFixed(0) + '%');

    // 장바구니 → 구매하기 → 결제 → 구매 완료(첫 비교 화면에서만)
    el.cart.classList.toggle('is-press', l >= PRESS && l < PRESS + 0.15);
    var to = seg(l, [TOAST[0], TOAST[0] + 0.12]);
    el.toast.style.opacity = l < TOAST[1] ? to : clamp(1 - (l - TOAST[1]) / 0.1);
    el.toast.style.transform = 'translateY(' + ((1 - ease(to)) * 10).toFixed(1) + 'px)';
    var bb = first ? seg(l, BUYBAR) : 0;
    el.buybar.style.opacity = bb; el.btns.style.opacity = 1 - bb;
    el.buy.classList.toggle('is-press', l >= PRESS_BUY && l < PRESS_BUY + 0.15);
    var sh = first ? inout(seg(l, SHEET)) : 0;
    el.sheet.style.transform = 'translateY(' + ((1 - sh) * 105).toFixed(1) + '%)';
    el.pay.classList.toggle('is-press', l >= PRESS_PAY && l < PRESS_PAY + 0.12);
    var dn = first ? seg(l, DONE) : 0, ok = el.done.firstElementChild;
    el.done.style.opacity = dn;
    if (ok) ok.style.transform = 'scale(' + (0.6 + 0.4 * ease(seg(l, [DONE[0] + 0.05, DONE[1] + 0.15]))).toFixed(3) + ')';

    // 리뷰 쓰기 화면: 별 5개 → 한 줄 → 사진 → 등록
    el.wr.style.opacity = l >= APP2_IN[0] ? 1 - cmp2 : 0;
    wstars.forEach(function (s, i) { s.classList.toggle('is-on', l >= WSTAR_AT + i * WSTAR_GAP); });
    el.wtxt.textContent = MINE_TXT.slice(0, Math.round(MINE_TXT.length * seg(l, WTXT)));
    var wp = ease(clamp((l - WPH) / 0.15));
    el.wph.style.opacity = wp; el.wph.style.transform = 'scale(' + (0.8 + 0.2 * wp).toFixed(3) + ')';
    el.wgo.classList.toggle('is-press', l >= PRESS2 && l < PRESS2 + 0.12);

    // 엄지: 첫 번째는 스크롤·고민·장바구니·구매·결제, 두 번째는 '등록하기'
    var tx, ty, top, sc = 1;
    if (first) {
      var k = path(l, TOUCH); tx = k[1]; ty = k[2]; top = k[3];
      if (pressed(l, PRESSES, 0.15)) sc = 0.82;
    } else {
      var t2 = inout(seg(l, TOUCH2_MOVE));
      tx = lerp(TOUCH2_FROM[0], TOUCH2_TO[0], t2); ty = lerp(TOUCH2_FROM[1], TOUCH2_TO[1], t2);
      top = l < APP2_IN[0] ? 0 : l < PRESS2 + 0.12 ? seg(l, [TOUCH2_MOVE[0] - 0.1, TOUCH2_MOVE[0]]) : clamp(1 - (l - PRESS2 - 0.12) / 0.12);
      if (l >= PRESS2 && l < PRESS2 + 0.12) sc = 0.82;
    }
    el.touch.style.opacity = top; el.touch.style.left = tx.toFixed(1) + 'px'; el.touch.style.top = ty.toFixed(1) + 'px';
    el.touch.style.transform = 'scale(' + sc + ')';

    // 마지막: 여러 소비자 — 사진이 거의 동시에 떠오르고, '구매 완료'가 여기저기서 뜸
    tiles.forEach(function (tl, i) {
      var p = ease(seg(l, [CROWD_AT + i * 0.05, CROWD_AT + i * 0.05 + 0.3])), c = ease(seg(l, [CROWD_AT + 0.3 + CROWD_POP[i], CROWD_AT + 0.5 + CROWD_POP[i]]));
      tl.style.opacity = p * (1 - out);
      tl.style.transform = 'scale(' + (0.94 + 0.06 * p + 0.03 * seg(l, [CROWD_AT, OUT[1]])).toFixed(3) + ')';
      var chip = tl.querySelector('.rc-crowd-c'); chip.style.opacity = c; chip.style.transform = 'translateY(' + ((1 - c) * 8).toFixed(1) + 'px)';
    });
    // 소비자 영상: 장면이 시작될 때 6개를 함께 처음부터 재생, 장면 밖에서는 멈춤
    var inCrowd = l >= CROWD_AT;
    tvids.forEach(function (v) {
      if (!v) return;
      if (seeking) { v.pause(); try { v.currentTime = Math.max(0, l - CROWD_AT); } catch (e) {} return; }
      if (inCrowd && !crowdOn) { try { v.currentTime = 0; } catch (e) {} var p = v.play(); if (p && p.catch) p.catch(function () {}); }
      else if (!inCrowd && !v.paused) v.pause();
    });
    crowdOn = seeking ? false : inCrowd;
  }

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var t = 0, prev = 0, on = true, held = false;
  window.rcSeek = function (s) { held = true; t = s; render(t, true); };
  if (reduce) { render(5.65, true); return; }
  if ('IntersectionObserver' in window) new IntersectionObserver(function (e) { on = e[0].isIntersecting; }).observe(root);
  function frame(now) {
    var dt = prev ? Math.min(0.1, (now - prev) / 1000) : 0; prev = now;
    if (!held && on && !document.hidden) { t += dt; render(t); }
    else if (!held) { if (playing >= 0) syncVideo(-1, 0, false); tvids.forEach(function (v) { if (v && !v.paused) v.pause(); }); crowdOn = false; }
    requestAnimationFrame(frame);
  }
  render(0);
  requestAnimationFrame(frame);
})();
