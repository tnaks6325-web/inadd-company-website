/* 포트폴리오 히어로(한 바퀴 약 9.5초): 브랜드 벽('함께한 브랜드 N곳') → S브랜드 한 달(노출→장바구니→구매→매출 막대) →
   인스타그램 광고 전환 → H브랜드 광고비 +350만 원 → 매출 +1억 410만 원 → 처음으로.
   로고와 N 은 /api/admin/public/works 에서 가져온다(실패하면 브랜드 이름 글자 타일, N 은 숨김).
   화면 상태는 시간 t 하나로 계산한다(render). 히어로가 화면 밖이거나 탭이 숨겨지면 멈추고,
   '움직임 줄이기' 설정이면 S브랜드 막대가 다 그려진 화면에서 멈춘다. window.wkhSeek(t) 로 특정 순간을 고정해 볼 수 있다. */
(function () {
  var root = document.querySelector('[data-wkh]');
  if (!root) return;
  function q(k) { return root.querySelector('[data-wkh-' + k + ']'); }
  function qa(k, from) { return Array.prototype.slice.call((from || root).querySelectorAll('[data-wkh-' + k + ']')); }
  var el = { wall: q('wall'), n: q('n'), fun: q('fun'), meta: q('meta'), roas: q('roas'), rv: q('rv') };
  var tracks = qa('track'), steps = qa('step'), buys = qa('buy'), mns = qa('mn');
  var funBars = qa('bar', el.fun), roasBars = qa('bar', el.roas);
  var BRANDS = (root.getAttribute('data-wkh-brands') || '').split('|');

  // 시각표(초)
  var IN = [0, 0.25], COUNT = [0.3, 1.6], WALL_OUT = [2.55, 2.9], SPEED = 34,
    FUN_IN = [2.75, 3.05], STEP_AT = 3.05, STEP_GAP = 0.38, FUN_OUT = [5.15, 5.45],
    META_IN = [5.3, 5.6], BUY_AT = 5.8, BUY_GAP = 0.25, MN_AT = 5.95, MN_GAP = 0.4, META_OUT = [7.2, 7.5],
    ROAS_IN = [7.35, 7.65], REV = [7.7, 8.4], RBAR = [8.0, 8.5], OUT = [9.1, 9.5], CYCLE = 9.5;
  var TILE = 160 + 14, total = 0, rowN = [0, 0, 0, 0];

  function clamp(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
  function seg(l, r) { return clamp((l - r[0]) / (r[1] - r[0])); }
  function ease(x) { return 1 - Math.pow(1 - x, 3); }
  function won(v) { v = Math.round(v); return '+' + (v >= 10000 ? Math.floor(v / 10000) + '억 ' + (v % 10000).toLocaleString('ko-KR') : v.toLocaleString('ko-KR')); }

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

  function render(t) {
    var l = t % CYCLE;
    var vis = ease(seg(l, IN)) * (1 - seg(l, OUT));
    // ① 브랜드 벽
    var wo = seg(l, WALL_OUT);
    el.wall.style.opacity = (vis * (1 - wo)).toFixed(3);
    el.wall.style.transform = 'scale(' + (1 - 0.06 * wo).toFixed(4) + ')';
    tracks.forEach(function (tr, r) {
      var setW = rowN[r] * TILE || 1, dir = r % 2 ? 1 : -1, x = (l * SPEED + r * 57) % setW;
      tr.style.transform = 'translateX(' + (dir < 0 ? -x : x - setW).toFixed(1) + 'px)';
    });
    el.n.textContent = total ? Math.round(total * ease(seg(l, COUNT))) : '';
    el.n.parentNode.parentNode.style.visibility = total ? '' : 'hidden';
    // ② S브랜드 한 달: 단계마다 3월 막대 → 4월 막대
    scene(el.fun, FUN_IN, FUN_OUT, l, vis, 24);
    steps.forEach(function (s, i) {
      var at = STEP_AT + i * STEP_GAP, p = ease(seg(l, [at, at + 0.2]));
      s.style.opacity = p;
      funBars[i * 2].style.setProperty('--p', ease(seg(l, [at + 0.05, at + 0.4])).toFixed(3));
      funBars[i * 2 + 1].style.setProperty('--p', ease(seg(l, [at + 0.15, at + 0.55])).toFixed(3));
    });
    // ③ 인스타그램 광고 전환
    scene(el.meta, META_IN, META_OUT, l, vis, 24);
    buys.forEach(function (b, i) {
      var p = ease(seg(l, [BUY_AT + i * BUY_GAP, BUY_AT + i * BUY_GAP + 0.2]));
      b.style.opacity = p; b.style.transform = 'translateY(' + ((1 - p) * 10).toFixed(1) + 'px) scale(' + (0.94 + 0.06 * p).toFixed(3) + ')';
    });
    mns.forEach(function (m, i) {
      var p = ease(seg(l, [MN_AT + i * MN_GAP, MN_AT + i * MN_GAP + 0.25]));
      m.style.opacity = p; m.style.transform = 'translateX(' + ((1 - p) * 12).toFixed(1) + 'px)';
    });
    // ④ H브랜드: 매출 숫자가 올라가고 ROAS 막대
    scene(el.roas, ROAS_IN, null, l, vis);
    el.rv.textContent = won(10410 * ease(seg(l, REV)));
    roasBars[0].style.setProperty('--p', ease(seg(l, RBAR)).toFixed(3));
    roasBars[1].style.setProperty('--p', ease(seg(l, [RBAR[0] + 0.12, RBAR[1] + 0.12])).toFixed(3));
  }

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var t = 0, prev = 0, on = true, held = false;
  window.wkhSeek = function (s) { held = true; t = s; render(t); };
  if (reduce) { t = 5.0; render(t); return; }
  if ('IntersectionObserver' in window) new IntersectionObserver(function (e) { on = e[0].isIntersecting; }).observe(root);
  function frame(now) {
    var dt = prev ? Math.min(0.1, (now - prev) / 1000) : 0; prev = now;
    if (!held && on && !document.hidden) { t += dt; render(t); }
    requestAnimationFrame(frame);
  }
  render(0);
  requestAnimationFrame(frame);
})();
