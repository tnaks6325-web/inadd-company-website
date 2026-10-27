/* 포트폴리오 히어로(한 바퀴 약 13.4초): 물결랩 세럼 예시 시나리오 — 마케팅이 하나씩 더해지며 월 매출이 계단처럼 오른다.
   장면 7개(브랜드 메시지·체험단·리뷰·바이럴·인플루언서·광고·올리브영·PPL·결과)가 차례로 겹쳐 바뀌고,
   오른쪽 아래 월 매출 계단이 장면이 끝날 때마다 한 칸씩 차오른다 → 결과에서 화면 가운데로 커지며 단계 이름이 붙는다.
   화면 상태는 시간 t 하나로 계산한다(render). 히어로가 화면 밖이거나 탭이 숨겨지면 멈추고,
   '움직임 줄이기' 설정이면 계단이 화면 가득 다 찬 결과 화면에서 멈춘다. window.wkhSeek(t) 로 특정 순간을 고정해 볼 수 있다. */
(function () {
  var root = document.querySelector('[data-wkh]');
  if (!root) return;
  function q(k, from) { return (from || root).querySelector('[data-wkh-' + k + ']'); }
  function qa(k, from) { return Array.prototype.slice.call((from || root).querySelectorAll('[data-wkh-' + k + ']')); }
  var scns = qa('scn'), chart = q('chart'), big = q('big'), sts = qa('st'), vids = qa('vid');
  var S = scns.map(function (s) {
    return { el: s, cut: q('cut', s), chip: q('chip', s), ov: qa('ov', s), pops: qa('pop', s), cnts: qa('cnt', s), copy: q('copy', s), deal: q('deal', s), dim: q('dim', s) };
  });

  // 시각표(초): 장면 [시작, 끝] — 다음 장면과 0.15~0.2초 겹쳐 바뀐다
  var SC = [[0, 2.0], [1.85, 3.9], [3.75, 5.6], [5.45, 7.3], [7.15, 9.0], [8.85, 10.9], [10.75, 13.4]],
    FADE = 0.2, IN = [0, 0.25], CHART_IN = [0.3, 0.6], GROW = [10.9, 11.55], NAMES = 11.35, OUT = [13.0, 13.4], CYCLE = 13.4;
  // 계단 i 가 차오르는 시각: 장면 i 가 끝나기 0.45초 전부터 0.35초 동안
  var STEP_AT = SC.slice(0, 6).map(function (r) { return r[1] - 0.45; });
  var SMALL = { x: 680 - 16 - 632 * 0.4, y: 620 - 16 - 420 * 0.4, s: 0.4 }, BIG = { x: 24, y: 100, s: 1 };
  var VMAX = 30000, HMAX = 226;

  function clamp(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
  function seg(l, r) { return clamp((l - r[0]) / (r[1] - r[0])); }
  function ease(x) { return 1 - Math.pow(1 - x, 3); }
  function inout(x) { return x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; }
  function lerp(a, b, p) { return a + (b - a) * p; }
  function pop(e, p, dy) { e.style.opacity = p.toFixed(3); e.style.transform = 'translateY(' + ((1 - p) * (dy || 10)).toFixed(1) + 'px)'; }

  // 막대 높이: 금액 차이가 커서 제곱근 비율로(800만도 보이게)
  sts.forEach(function (st) { st.querySelector('i').style.setProperty('--h', (Math.sqrt(+st.getAttribute('data-v') / VMAX) * HMAX).toFixed(1) + 'px'); });

  function render(t) {
    var l = t % CYCLE;
    var vis = ease(seg(l, IN)) * (1 - seg(l, OUT));
    S.forEach(function (s, i) {
      var r = SC[i], u = l - r[0], d = r[1] - r[0];
      var a = seg(l, [r[0], r[0] + FADE]) * (i === S.length - 1 ? 1 : 1 - seg(l, [r[1] - FADE, r[1]]));
      if (i === 0) a = l < r[1] ? 1 - seg(l, [r[1] - FADE, r[1]]) : 0;
      s.el.style.opacity = (vis * a).toFixed(3);
      s.el.style.zIndex = i + 1;
      if (s.cut) s.cut.style.transform = 'scale(' + (1 + 0.05 * clamp(u / d)).toFixed(4) + ')';
      if (s.chip) pop(s.chip, ease(seg(u, [0.1, 0.35])), 6);
      s.ov.forEach(function (o) { pop(o, ease(seg(u, [0.35, 0.65])), 14); });
      s.pops.forEach(function (p, k) { pop(p, ease(seg(u, [0.6 + k * 0.18, 0.85 + k * 0.18])), 8); });
      s.cnts.forEach(function (c) {
        var n = Math.round(+c.getAttribute('data-wkh-cnt') * ease(seg(u, [0.45, 1.5])));
        c.textContent = n.toLocaleString('ko-KR');
      });
      if (s.copy) s.copy.style.clipPath = 'inset(0 ' + ((1 - seg(u, [0.75, 1.45])) * 100).toFixed(1) + '% 0 0)';
      if (s.deal) { var dp = ease(seg(u, [1.1, 1.4])); s.deal.style.opacity = dp.toFixed(3); s.deal.style.transform = 'scale(' + (0.9 + 0.1 * dp).toFixed(3) + ')'; }
      if (s.dim) s.dim.style.opacity = seg(l, GROW).toFixed(3);
    });
    // 월 매출 계단
    var g = inout(seg(l, GROW));
    var cx = lerp(SMALL.x, BIG.x, g), cy = lerp(SMALL.y, BIG.y, g), cs = lerp(SMALL.s, BIG.s, g);
    chart.style.opacity = (vis * ease(seg(l, CHART_IN))).toFixed(3);
    chart.style.transform = 'translate(' + cx.toFixed(1) + 'px,' + cy.toFixed(1) + 'px) scale(' + cs.toFixed(4) + ')';
    big.style.opacity = ease(seg(l, [NAMES, NAMES + 0.3])).toFixed(3);
    sts.forEach(function (st, i) {
      var p = ease(seg(l, [STEP_AT[i], STEP_AT[i] + 0.35]));
      st.querySelector('i').style.setProperty('--p', p.toFixed(3));
      st.querySelector('small').style.opacity = p.toFixed(3);
      st.querySelector('span').style.opacity = ease(seg(l, [NAMES + i * 0.06, NAMES + 0.25 + i * 0.06])).toFixed(3);
    });
    syncVid(l);
  }

  // 실사 컷 영상(있으면): 시작 시각(data-wkh-vid 값)에 맞춰 재생 위치를 맞춘다
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
  if (reduce) { t = 12.5; render(t); return; }
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
