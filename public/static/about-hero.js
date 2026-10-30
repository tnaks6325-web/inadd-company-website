/* 회사소개 히어로(상단 전체 화면, 한 바퀴 약 11.6초, 제목 장면 없이 바로 시작 — 검색엔진용 제목은 about.tsx 에 숨겨 둠)
   - ① 사무실의 하루(약 3.3초): 실제 사무실 사진을 시간대별로 바꾼 6장(08:00~22:00)을 이어 만든 타임랩스 영상 — 사람들이 매우 빠르게 오간다.
     영상이 끝나면 밤 사진(원본)으로 바뀐다.
   - ② 화면 속으로(약 1.5초): 마지막 밤 사진에서 오른쪽 줄 가운데 모니터로 점점 빨라지며 쭉 빨려 들어간다(약 22배).
     거의 다 다가갔을 때 모니터에 ③ 첫 컷이 원근으로 켜지고, 화면이 무대를 다 덮으면 ③으로 이어진다.
   - ③ 실제 사무실 컷(약 6.4초): 기획 메모 쓰는 손(크리에이티브) → 화이트보드에 적는 직원(데이터) → 회의실 TV 회의 →
     실제 촬영 유리벽 로고 — 다음 컷이 아래에서 밀어 올라온다. 로고 위로 '크리에이티브와 데이터가 만나는 곳 · IN AD COMPANY'가 '툭'(약 1.2초).
   1600x900 무대를 칸에 꽉 차게(cover) 키운다(--k·--x·--y). 히어로가 화면 밖이거나 탭이 숨겨지면 멈추고,
   '움직임 줄이기' 설정이면 마지막 화면에서 멈춘다. window.abhSeek(t) 로 특정 순간을 고정해 볼 수 있다. */
(function () {
  var root = document.querySelector('[data-abh]');
  if (!root) return;
  function q(k, from) { return (from || root).querySelector('[data-abh-' + k + ']'); }
  function qa(k, from) { return Array.prototype.slice.call((from || root).querySelectorAll('[data-abh-' + k + ']')); }
  var stage = q('stage'), tags = qa('tag'), meet = q('meet'), cuts = qa('cut').map(function (c) { return { el: c, v: c.querySelector('video') }; });
  var day = q('day'), dv = q('dv'), night = q('night'), zps = qa('zp'), scr = q('scr');

  // 무대 배율: 칸을 빈틈없이 덮게
  function fit() {
    var w = root.clientWidth, h = root.clientHeight, k = Math.max(w / 1600, h / 900);
    root.style.setProperty('--k', k.toFixed(5));
    root.style.setProperty('--x', ((w - 1600 * k) / 2).toFixed(1) + 'px');
    root.style.setProperty('--y', ((h - 900 * k) / 2).toFixed(1) + 'px');
    root.classList.toggle('is-narrow', w / k < 1000);   // 휴대폰처럼 무대 가운데만 보이면 글자를 줄인다
  }
  fit(); window.addEventListener('resize', fit);

  // 시각표(초)
  // ① 사무실의 하루: 타임랩스 영상(VD초, 시간대 5구간)이 끝나면 밤 사진(원본)으로 0.1초 만에 바뀐다
  var D0 = 0.2, VD = 3.3, NIGHT = D0 + VD;   // 고해상도 조각은 밤 사진부터
  // ② 밤 사진의 모니터 화면 네 귀퉁이(무대 좌표: 왼위·오위·오아래·왼아래)와 그 가운데, 끝 배율
  var QUAD = [983.7, 341.9, 1100.8, 342.6, 1091.5, 413.2, 980.2, 413.0], F = { x: 1039.05, y: 377.7 }, ZMAX = 22;
  var ZOOM = [NIGHT + 0.15, NIGHT + 1.65], SCR_IN = [ZOOM[0] + 1.2, ZOOM[0] + 1.36];   // 모니터 화면은 거의 다 다가갔을 때(화면 폭의 약 60%) 바뀐다
  var C0 = ZOOM[1];
  // ③ 컷 시작 때와 영상 길이(③ 시작 기준) — 바뀔 때 0.22초 동안 아래에서 밀어 올림. 컷4(실제 촬영)는 끝 장면에서 멈춰 있다
  var CUT_AT = [0, 1.3, 2.6, 4.25], CUT_LEN = [1.33, 1.3, 1.67, 0.87], WIPE = 0.22;
  var TAGS = [[0.15, 1.2], [1.45, 2.5]];   // 컷1 '크리에이티브', 컷2 '데이터' 이름표가 보이는 때
  var MEET_IN = [4.75, 5.05];
  var OUT = [C0 + 6.0, C0 + 6.4], CYCLE = C0 + 6.4;   // 마지막 회사 문구는 약 1.2초

  function clamp(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
  function seg(l, r) { return clamp((l - r[0]) / (r[1] - r[0])); }
  function ease(x) { return 1 - Math.pow(1 - x, 3); }
  function thud(h) { return Math.sin(Math.PI * h) * (1 - h); }

  // 1600x900 사각형을 네 점(왼위·오위·오아래·왼아래)에 맞추는 원근 변환(matrix3d)
  function quad3d(p) {
    var x0 = p[0], y0 = p[1], x1 = p[2], y1 = p[3], x2 = p[4], y2 = p[5], x3 = p[6], y3 = p[7];
    var dx1 = x1 - x2, dx2 = x3 - x2, dy1 = y1 - y2, dy2 = y3 - y2, sx = x0 - x1 + x2 - x3, sy = y0 - y1 + y2 - y3;
    var den = dx1 * dy2 - dx2 * dy1, g = (sx * dy2 - dx2 * sy) / den, h = (dx1 * sy - sx * dy1) / den;
    var a = x1 - x0 + g * x1, b = x3 - x0 + h * x3, d = y1 - y0 + g * y1, e = y3 - y0 + h * y3;
    return 'matrix3d(' + [a / 1600, d / 1600, 0, g / 1600, b / 900, e / 900, 0, h / 900, 0, 0, 1, 0, x0, y0, 0, 1].join(',') + ')';
  }

  // 영상을 시각표에 맞춰 재생(어긋나면 맞춤): s = 이 영상 안에서 지금 보여야 할 초, 길이를 넘으면 마지막 장면에서 멈춤
  function syncVid(v, s, len) {
    var want = Math.min(Math.max(s, 0), len - 0.03), on = live && s >= 0 && s < len;
    if (on) {
      if (v.paused) { var pr = v.play(); if (pr && pr.catch) pr.catch(function () {}); }
      if (Math.abs(v.currentTime - want) > 0.25) v.currentTime = want;
    } else {
      if (!v.paused) v.pause();
      if (v.readyState > 0 && Math.abs(v.currentTime - want) > 0.05) v.currentTime = want;
    }
  }

  function render(t) {
    var l = t % CYCLE, vis = 1 - seg(l, OUT);
    // ① 사무실의 하루
    // ② 모니터로 확대: 배율은 로그로 점점 빨라지고, 모니터 가운데가 무대 가운데로 끌려온다
    var zq = seg(l, ZOOM), zq2 = zq * zq, A = Math.pow(ZMAX, zq2);
    var BX = F.x + (800 - F.x) * zq2 - F.x * A, BY = F.y + (450 - F.y) * zq2 - F.y * A;
    day.style.opacity = (seg(l, [0, D0]) * (l < C0 + 0.2 ? 1 : 0)).toFixed(3);
    day.style.transform = 'translate(' + BX.toFixed(2) + 'px,' + BY.toFixed(2) + 'px) scale(' + A.toFixed(5) + ')';
    night.style.opacity = seg(l, [NIGHT - 0.1, NIGHT]).toFixed(3);
    zps.forEach(function (z) { z.style.opacity = l >= NIGHT ? 1 : 0; });
    syncVid(dv, l - D0, VD);
    // ② 모니터 화면: 사진과 같은 움직임을 네 귀퉁이에 적용해 원근으로 붙인다(선명하게 그리려고 사진 밖에 따로 둠)
    var sv = ease(seg(l, SCR_IN)) * (l < C0 + 0.2 ? 1 : 0);
    scr.style.opacity = sv.toFixed(3);
    if (sv > 0) scr.style.transform = quad3d(QUAD.map(function (v, i) { return i % 2 ? v * A + BY : v * A + BX; }));
    // ③ 실제 사무실 컷: 컷1은 화면 속 장면에서 이어지므로 제자리에서 나타나고, 다음 컷은 아래에서 밀어 올라온다
    var u = l - C0;
    cuts.forEach(function (c, i) {
      var at = CUT_AT[i], w = i === 0 ? seg(u, [-0.12, 0.02]) : ease(seg(u, [at, at + WIPE]));
      var gone = i < cuts.length - 1 && u >= CUT_AT[i + 1] + WIPE;
      c.el.style.zIndex = 5 + i;
      c.el.style.visibility = vis > 0 && w > 0 && !gone ? 'visible' : 'hidden';
      c.el.style.opacity = (i === 0 ? w : 1).toFixed(3);
      c.el.style.transform = i === 0 ? 'none' : 'translateY(' + ((1 - w) * 100).toFixed(2) + '%)';
      syncVid(c.v, u >= at - (i === 0 ? 0.12 : 0) && !gone ? u - at : -1, CUT_LEN[i]);
    });
    tags.forEach(function (g, i) {
      var p = ease(seg(u, [TAGS[i][0], TAGS[i][0] + 0.25])) * (1 - seg(u, [TAGS[i][1] - 0.15, TAGS[i][1]]));
      g.style.opacity = p.toFixed(3);
      g.style.transform = 'translate(-50%,' + ((1 - p) * -20).toFixed(1) + 'px)';
    });
    var mi = ease(seg(u, MEET_IN)), mh = seg(u, [MEET_IN[1], MEET_IN[1] + 0.25]);
    meet.style.opacity = (u >= 0 ? vis * mi : 0).toFixed(3);
    meet.style.transform = 'translate(-50%,-50%) scale(' + ((0.86 + 0.14 * mi) * (1 + 0.05 * thud(mh))).toFixed(4) + ')';
  }

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var t = 0, prev = 0, on = true, held = false, live = false;
  window.abhSeek = function (s) { held = true; live = false; t = s; render(t); };
  window.abhTimes = { D0: D0, VD: VD, NIGHT: NIGHT, ZOOM: ZOOM, C0: C0, CUT_AT: CUT_AT, CYCLE: CYCLE };
  if (reduce) { t = C0 + 5.6; render(t); return; }
  if ('IntersectionObserver' in window) new IntersectionObserver(function (e) { on = e[0].isIntersecting; }).observe(root);
  function frame(now) {
    var dt = prev ? Math.min(0.1, (now - prev) / 1000) : 0; prev = now;
    live = !held && on && !document.hidden;
    if (live) t += dt;
    render(t);
    requestAnimationFrame(frame);
  }
  render(0);
  requestAnimationFrame(frame);
})();
