/* 아워테크 히어로(상단 전체 화면, 한 바퀴 약 13.8초)
   - ① 책상(약 0.9초): 대표 책상 사진, 꺼진 넓은 모니터가 켜진다.
   - ② 화면 속으로(약 1.1초): 카메라가 모니터로 날아 들어가고, 모니터 화면의 네 귀퉁이가 무대 네 귀퉁이로 펴진다.
   - ③ 시스템 화면(약 9초): 인트라넷 → 협찬 찾기 → 리뷰 운영 → 카페 운영 → 성과 분석 → 광고주 리포트 센터 → 착수 보고서.
     화면마다 시작된 뒤 몇 초인지(u)에 맞춰 data-a(나타남)·data-n(숫자 세기)·data-w(막대)·data-p(선 그리기)·data-c(상태 바뀜)를 움직인다.
   - ④ 뒤로 빠지며 책상이 다시 보이고 '마케팅을 코드로 설계하는 실전 에이전시', 모니터가 꺼지며 처음(꺼진 모니터)으로 이어진다.
   1600x900 무대를 칸에 꽉 차게(cover) 키운다(--k·--x·--y). 히어로가 화면 밖이거나 탭이 숨겨지면 멈추고,
   '움직임 줄이기' 설정이면 마지막 문구 화면에서 멈춘다. window.tchSeek(t) 로 특정 순간을 고정해 볼 수 있다. */
(function () {
  var root = document.querySelector('[data-tch]');
  if (!root) return;
  function q(k) { return root.querySelector('[data-tch-' + k + ']'); }
  function qa(k, from) { return Array.prototype.slice.call((from || root).querySelectorAll('[data-' + k + ']')); }
  var world = q('world'), scr = q('scr'), off = q('off'), card = q('card');
  var tabs = qa('tch-tab'), panes = qa('tch-pane');

  // 무대 배율: 칸을 빈틈없이 덮게. 무대가 많이 작아지면(휴대폰) 마지막 문구만 TS배 키워 읽히게 한다
  var TS = 1;
  function fit() {
    var w = root.clientWidth, h = root.clientHeight, k = Math.max(w / 1600, h / 900);
    root.style.setProperty('--k', k.toFixed(5));
    root.style.setProperty('--x', ((w - 1600 * k) / 2).toFixed(1) + 'px');
    root.style.setProperty('--y', ((h - 900 * k) / 2).toFixed(1) + 'px');
    TS = Math.min(2, Math.max(1, 0.42 / k));
    root.classList.toggle('is-small', TS > 1);
  }
  fit(); window.addEventListener('resize', fit);

  // 시각표(초)
  var ON = [0.45, 0.8], FLY = [0.9, 2.0];
  var S = [0.8, 2.3, 3.8, 5.3, 6.8, 8.3, 9.4], TAB = [0, 1, 2, 3, 4, 5, 5], TR = 0.25;   // 화면마다 시작하는 때, 위 탭 번호, 넘김 길이
  var OUT = [10.9, 12.0], CARD = [11.6, 11.9], OFF = [13.4, 13.8], CYCLE = 13.8;
  // 사진 속 모니터 화면 네 귀퉁이(무대 좌표: 왼위·오위·오아래·왼아래), 다 펴졌을 때(가운데 1600만 보임)
  var QUAD = [171.4, 107.4, 1465.1, 93.7, 1334.9, 579.4, 420.6, 499.4];
  var FLAT = [-250, 0, 1850, 0, 1850, 900, -250, 900];
  var F = { x: 848, y: 320 }, ZIN = 2.6;

  function clamp(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
  function seg(l, r) { return clamp((l - r[0]) / (r[1] - r[0])); }
  function ease(x) { return 1 - Math.pow(1 - x, 3); }
  function eio(x) { return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; }
  function thud(h) { return Math.sin(Math.PI * h) * (1 - h); }

  // 2100x900 화면을 네 점에 맞추는 원근 변환(matrix3d)
  function quad3d(p) {
    var x0 = p[0], y0 = p[1], x1 = p[2], y1 = p[3], x2 = p[4], y2 = p[5], x3 = p[6], y3 = p[7];
    var dx1 = x1 - x2, dx2 = x3 - x2, dy1 = y1 - y2, dy2 = y3 - y2, sx = x0 - x1 + x2 - x3, sy = y0 - y1 + y2 - y3;
    var den = dx1 * dy2 - dx2 * dy1, g = (sx * dy2 - dx2 * sy) / den, h = (dx1 * sy - sx * dy1) / den;
    var a = x1 - x0 + g * x1, b = x3 - x0 + h * x3, d = y1 - y0 + g * y1, e = y3 - y0 + h * y3;
    return 'matrix3d(' + [a / 2100, d / 2100, 0, g / 2100, b / 900, e / 900, 0, h / 900, 0, 0, 1, 0, x0, y0, 0, 1].join(',') + ')';
  }

  // 화면 속 움직이는 요소를 화면별로 모아 둔다
  function num(v, dec) { return v.toLocaleString('ko-KR', { minimumFractionDigits: dec, maximumFractionDigits: dec }); }
  var P = panes.map(function (p) {
    return {
      el: p,
      a: qa('a', p).map(function (e) { return { e: e, t: +e.getAttribute('data-a') }; }).filter(function (o) { return !o.e.hasAttribute('data-n'); }),
      n: qa('n', p).map(function (e) { return { e: e, v: +e.getAttribute('data-n'), t: +e.getAttribute('data-a'), d: +e.getAttribute('data-dur'), dec: +e.getAttribute('data-dec'), s: e.getAttribute('data-suf') || '' }; }),
      w: qa('w', p).map(function (e) { return { e: e, v: +e.getAttribute('data-w'), t: +e.getAttribute('data-a'), d: +e.getAttribute('data-dur') }; }),
      p: qa('p', p).map(function (e) { var L = e.getTotalLength ? e.getTotalLength() : 3000; e.style.strokeDasharray = L; return { e: e, L: L, t: +e.getAttribute('data-p'), d: +e.getAttribute('data-dur') }; }),
      c: qa('c', p).map(function (e) { return { e: e, t: +e.getAttribute('data-c'), flash: e.classList.contains('th-btn') }; })
    };
  });
  function pane(o, u) {
    o.a.forEach(function (x) { var p = ease(seg(u, [x.t, x.t + 0.25])); x.e.style.opacity = p.toFixed(3); x.e.style.transform = 'translateY(' + ((1 - p) * 14).toFixed(1) + 'px)'; });
    o.n.forEach(function (x) { x.e.textContent = num(x.v * ease(seg(u, [x.t, x.t + x.d])), x.dec) + x.s; });
    o.w.forEach(function (x) { x.e.style.width = (x.v * ease(seg(u, [x.t, x.t + x.d]))).toFixed(2) + '%'; });
    o.p.forEach(function (x) { x.e.style.strokeDashoffset = (x.L * (1 - seg(u, [x.t, x.t + x.d]))).toFixed(1); });
    o.c.forEach(function (x) { x.e.classList.toggle('on', u >= x.t && (!x.flash || u < x.t + 0.25)); });
  }

  function render(t) {
    var l = t % CYCLE;
    // ①② 카메라: 처음엔 아주 천천히 다가가고, 날아 들어갈 때 모니터 가운데가 무대 가운데로 끌려온다(빠질 때는 거꾸로)
    var z = l < OUT[0] ? eio(seg(l, FLY)) : 1 - eio(seg(l, OUT));
    var A0 = 1 + 0.04 * ease(seg(l, [0, FLY[0]])), A = A0 * Math.pow(ZIN / A0, z);
    var BX = F.x + (800 - F.x) * z - F.x * A, BY = F.y + (450 - F.y) * z - F.y * A;
    world.style.transform = 'translate(' + BX.toFixed(2) + 'px,' + BY.toFixed(2) + 'px) scale(' + A.toFixed(5) + ')';
    scr.style.transform = quad3d(QUAD.map(function (v, i) { var p = v * A + (i % 2 ? BY : BX); return p + (FLAT[i] - p) * z; }));
    off.style.opacity = (l < OFF[0] ? 1 - seg(l, ON) : seg(l, OFF)).toFixed(3);
    // ③ 시스템 화면: 다음 화면이 오른쪽에서 살짝 밀려 들어오며 덮는다
    var cur = 0;
    for (var i = 0; i < S.length; i++) if (l >= S[i]) cur = i;
    P.forEach(function (o, i) {
      var inT = i === 0 ? 1 : ease(seg(l, [S[i], S[i] + TR])), shown = (i === cur && (l >= S[i] || i === 0)) || (i === cur - 1 && l < S[cur] + TR);
      o.el.style.visibility = shown ? 'visible' : 'hidden';
      o.el.style.zIndex = i;
      o.el.style.opacity = (i === cur ? inT : 1).toFixed(3);
      o.el.style.transform = i === cur && i > 0 ? 'translateX(' + ((1 - inT) * 90).toFixed(1) + 'px)' : 'none';
      if (shown) pane(o, l - S[i]);
    });
    tabs.forEach(function (b, i) { b.classList.toggle('on', i === TAB[cur]); });
    // ④ 마지막 문구
    var ci = ease(seg(l, CARD)), ch = seg(l, [CARD[1], CARD[1] + 0.25]), co = 1 - seg(l, OFF);
    card.style.opacity = (ci * co).toFixed(3);
    card.style.transform = 'translate(-50%,-50%) scale(' + ((0.86 + 0.14 * ci) * (1 + 0.05 * thud(ch)) * (1 + (TS - 1) * 0.6)).toFixed(4) + ')';
  }

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var t = 0, prev = 0, on = true, held = false;
  window.tchSeek = function (s) { held = true; t = s; render(t); };
  window.tchTimes = { ON: ON, FLY: FLY, S: S, OUT: OUT, CARD: CARD, OFF: OFF, CYCLE: CYCLE };
  if (reduce) { t = CARD[1] + 0.8; render(t); return; }
  if ('IntersectionObserver' in window) new IntersectionObserver(function (e) { on = e[0].isIntersecting; }).observe(root);
  function frame(now) {
    var dt = prev ? Math.min(0.1, (now - prev) / 1000) : 0; prev = now;
    if (!held && on && !document.hidden) t += dt;
    render(t);
    requestAnimationFrame(frame);
  }
  render(0);
  requestAnimationFrame(frame);
})();
