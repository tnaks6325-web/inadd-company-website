/* 회사소개 히어로(한 바퀴 약 11.5초): 한 문장이 설계되는 과정.
   1 고민(0.3~2초): 노트에 타깃·고민·상황, 카피 후보가 점점 빠르게 적힌다.
   2 지우기(2.3~4.2초): 후보 카피에 줄이 그어지고 사라진다(간격 0.42초 → 0.2초).
   3 한 문장(4.4~5.4초): '오후 3시에도 당기지 않는 피부'가 왼쪽부터 적히고 '툭'.
   4 번짐(6.2~8.2초): 노트가 위로 작아지고 선을 따라 검색·릴스·상세페이지에 같은 문장.
   5 끝(8.6초~): '2019년부터 · 누적 캠페인 37,000+'.
   화면은 시간 t 하나로 계산한다(render). 히어로가 화면 밖이거나 탭이 숨겨지면 멈추고,
   '움직임 줄이기' 설정이면 마지막 화면에서 멈춘다. window.abhSeek(t) 로 특정 순간을 고정해 볼 수 있다. */
(function () {
  var root = document.querySelector('[data-abh]');
  if (!root) return;
  function q(k) { return root.querySelector('[data-abh-' + k + ']'); }
  function qa(k) { return Array.prototype.slice.call(root.querySelectorAll('[data-abh-' + k + ']')); }
  var note = q('note'), paper = q('paper'), kws = qa('kw'), line = q('line'), lineSpan = line.querySelector('span'), mks = qa('mk'), foot = q('foot');
  var links = Array.prototype.slice.call(q('links').querySelectorAll('path'));
  var vid = root.querySelector('video');
  var drafts = kws.filter(function (k) { return k.hasAttribute('data-abh-draft'); });

  // 시각표(초)
  var NOTE_IN = [0.1, 0.4], KW0 = 0.4, KW_GAP0 = 0.2, KW_GAP1 = 0.08, KW_IN = 0.22;
  var KAT = [], a = KW0;
  for (var i = 0; i < kws.length; i++) { KAT.push(a); a += KW_GAP0 + (KW_GAP1 - KW_GAP0) * (i / Math.max(1, kws.length - 1)); }
  var ST0 = 2.4, ST_GAP0 = 0.42, ST_GAP1 = 0.2, ST_DRAW = 0.22, SAT = [], sa = ST0;
  for (i = 0; i < drafts.length; i++) { SAT.push(sa); sa += ST_GAP0 + (ST_GAP1 - ST_GAP0) * (i / Math.max(1, drafts.length - 1)); }
  var LINE_IN = [sa + 0.1, sa + 0.9], KEEP_OUT = [sa + 1.3, sa + 1.7];
  var SHRINK = [KEEP_OUT[1], KEEP_OUT[1] + 0.5], LK0 = SHRINK[1], MK0 = SHRINK[1] + 0.2, MK_GAP = 0.28, MK_IN = 0.32;
  var FOOT_IN = [MK0 + mks.length * MK_GAP + 0.4, MK0 + mks.length * MK_GAP + 0.7];
  var OUT = [FOOT_IN[1] + 2.4, FOOT_IN[1] + 2.8], CYCLE = OUT[1];
  // 노트가 작아진 자리: 노트 위쪽 가운데를 기준으로 0.62배, 문장(노트 안 y≈400)이 무대 y≈250 에 오도록 위로
  var NOTE_S = 0.62, NOTE_DY = -58;

  function clamp(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
  function seg(l, r) { return clamp((l - r[0]) / (r[1] - r[0])); }
  function ease(x) { return 1 - Math.pow(1 - x, 3); }
  function accel(x) { return x * x * x; }
  function inout(x) { return x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; }
  function thud(h) { return Math.sin(Math.PI * h) * (1 - h); }

  links.forEach(function (p) { var n = p.getTotalLength ? p.getTotalLength() : 200; p.style.strokeDasharray = n + ' ' + n; p.setAttribute('data-len', n); });

  function render(t) {
    var l = t % CYCLE;
    var vis = 1 - seg(l, OUT);
    // 노트
    var sh = inout(seg(l, SHRINK));
    note.style.opacity = (vis * ease(seg(l, NOTE_IN))).toFixed(3);
    paper.style.opacity = (1 - sh).toFixed(3);   // 작아지면서 종이는 사라지고 문장만 남는다
    note.style.transform = 'translateY(' + (NOTE_DY * sh + (1 - ease(seg(l, NOTE_IN))) * 16).toFixed(1) + 'px) scale(' + (1 - (1 - NOTE_S) * sh).toFixed(4) + ')';
    // 적히는 말: 살짝 크게 떨어져 '툭'
    var keepOut = ease(seg(l, KEEP_OUT));
    kws.forEach(function (k, n) {
      var u = l - KAT[n], d = accel(seg(u, [0, KW_IN])), hit = seg(u, [KW_IN, KW_IN + 0.18]);
      var o = seg(u, [0, 0.06]), di = drafts.indexOf(k);
      if (di >= 0) {
        var su = l - SAT[di], st = ease(seg(su, [0, ST_DRAW]));
        k.querySelector('i').style.transform = 'scaleX(' + st.toFixed(3) + ')';
        o *= 1 - seg(su, [ST_DRAW + 0.1, ST_DRAW + 0.4]);
      } else o *= 1 - keepOut;
      k.style.opacity = o.toFixed(3);
      k.style.transform = 'translateY(' + ((1 - d) * -14).toFixed(1) + 'px) scale(' + ((1.35 - 0.35 * d) * (1 + 0.05 * thud(hit))).toFixed(4) + ')';
    });
    // 한 문장: 왼쪽부터 적히고 '툭'
    var li = seg(l, LINE_IN), lh = seg(l, [LINE_IN[1], LINE_IN[1] + 0.25]);
    line.style.opacity = (l >= LINE_IN[0] ? 1 : 0);
    lineSpan.style.clipPath = 'inset(0 ' + ((1 - li) * 100).toFixed(1) + '% 0 0)';
    line.style.transform = 'scale(' + (1 + 0.06 * thud(lh)).toFixed(4) + ')';
    // 번짐: 선이 그어지고 화면이 차례로
    links.forEach(function (p, n) {
      var len = +p.getAttribute('data-len'), g = ease(seg(l, [LK0 + n * MK_GAP, LK0 + n * MK_GAP + 0.35]));
      p.style.opacity = (vis * (g > 0 ? 1 : 0)).toFixed(3);
      p.style.strokeDashoffset = (len * (1 - g)).toFixed(1);
    });
    mks.forEach(function (m, n) {
      var u = l - (MK0 + n * MK_GAP), d = accel(seg(u, [0, MK_IN])), hit = seg(u, [MK_IN, MK_IN + 0.2]);
      m.style.opacity = (vis * seg(u, [0, 0.08])).toFixed(3);
      m.style.transform = 'translateY(' + ((1 - d) * -40).toFixed(1) + 'px) scale(' + ((1.25 - 0.25 * d) * (1 + 0.05 * thud(hit))).toFixed(4) + ')';
    });
    if (vid) { var vo = +mks[1].style.opacity; if (live && vo > 0) { if (vid.paused) { var pr = vid.play(); if (pr && pr.catch) pr.catch(function () {}); } } else if (!vid.paused) vid.pause(); }
    var f = ease(seg(l, FOOT_IN));
    foot.style.opacity = (vis * f).toFixed(3);
    foot.style.transform = 'translateY(' + ((1 - f) * 10).toFixed(1) + 'px)';
  }

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var t = 0, prev = 0, on = true, held = false, live = false;
  window.abhSeek = function (s) { held = true; live = false; t = s; render(t); };
  window.abhTimes = { LINE_IN: LINE_IN, SHRINK: SHRINK, MK0: MK0, FOOT_IN: FOOT_IN, CYCLE: CYCLE };
  if (reduce) { t = FOOT_IN[1] + 1; render(t); return; }
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
