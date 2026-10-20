/* 체험단 히어로(한 바퀴 6초): 현실 → 웹.
   0~0.85초 개봉 → 0.85~1.7초 촬영(1.3초 찰칵) → 1.7~2.9초 노트북으로 글 쓰는 뒷모습, 2.3초부터 카메라가 어깨를 지나 화면 속으로 →
   2.8초 노트북 화면이 무대를 꽉 채우면 그 자리에서 화면 내용이 웹 글쓰기 창으로 바뀌고(정면, 같은 크기) 3.3초까지 비스듬히 자리 잡음 →
   3.4초 발행 → 3.55초 검색 결과로 바뀜 → 방금 쓴 글이 맨 위, 이어서 후기가 쌓이며 후기 수가 오름 →
   5.75초부터 처음으로. 화면 상태는 시간 t 하나로 계산한다(render). 히어로가 화면 밖이거나 탭이 숨겨지면 멈추고,
   '움직임 줄이기' 설정이면 후기가 다 찬 장면에서 멈춘다. window.ssSeek(t) 로 특정 순간을 고정해 볼 수 있다. */
(function () {
  var root = document.querySelector('[data-ss]');
  if (!root) return;
  var data = JSON.parse(root.querySelector('[data-ss-data]').textContent);
  function $(k) { return root.querySelector('[data-ss-' + k + ']'); }
  var el = { real: $('real'), win: $('win'), flash: $('flash'), url: $('url'), ed: $('ed'), sr: $('sr'), pub: $('pub'), ttl: $('ttl'), txt: $('txt'),
    c1: $('c1'), c2: $('c2'), img: $('img'), q: $('q'), n: $('n'), track: $('track') };
  var cuts = Array.prototype.slice.call(root.querySelectorAll('[data-ss-cut]'));
  var go = root.querySelector('.ss-go');
  var CYCLE = 6, CUT_AT = [0, 0.85, 1.7], SHOT = 1.3, PUSH = [2.2, 2.82], PUSH_V = [2.5, 2.86], TO_WEB = [2.7, 2.92], SETTLE = [2.95, 3.3], TXT = [3.0, 3.35], PUB = 3.4,
    SWITCH = [3.55, 3.67], Q = [3.65, 3.92], SEARCH = 3.94, CARD_AT = 4.05, CARD_GAP = 0.19, CARD_IN = 0.26, OUT = [5.75, 6.0], ROW = 124, ROWS_SHOWN = 3;
  // 노트북 화면 칸(무대 비율): 이 칸이 무대 전체가 되도록 키운다. 사진이면 data-scr 값, 임시 그림이면 기본값
  var sv = cuts[2] && cuts[2].getAttribute('data-scr'), sa = sv ? sv.split(',').map(Number) : [0.33, 0.26, 0.34, 0.31];
  var scr = { x: sa[0], y: sa[1], w: sa[2], h: sa[3] };
  var fv = cuts[2] && cuts[2].getAttribute('data-fit'), fit = fv ? fv.split(',').map(Number) : null;
  var cur = -1, cards = [], playing = -1;

  function clamp(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
  function seg(l, r) { return clamp((l - r[0]) / (r[1] - r[0])); }
  function ease(x) { return 1 - Math.pow(1 - x, 3); }
  function inout(x) { return x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; }
  function esc(s) { return s.replace(/[&<>]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]; }); }
  function hl(t, kw) { var i = t.indexOf(kw); return i < 0 ? esc(t) : esc(t.slice(0, i)) + '<b>' + esc(kw) + '</b>' + esc(t.slice(i + kw.length)); }
  function bg(r, b) { return '--a:' + b.color + (r.img ? ';background-image:url(' + r.img + ')' : ''); }
  function build(b) {
    el.track.innerHTML = b.reviews.map(function (r, i) {
      return '<article class="ss-card' + (i ? '' : ' is-mine') + '"><div class="ss-card-txt"><div class="ss-by"><span class="ss-by-ava" style="--a:' + b.color + '"></span>' + esc(r.by) + '<i>' + (i ? r.d : '방금 전') + '</i></div>' +
        '<strong class="ss-ttl">' + hl(r.t, b.kw) + '</strong><p class="ss-snip">' + esc(r.s) + '</p></div>' +
        '<div class="ss-ph" style="' + bg(r, b) + '">' + (r.img ? '' : '<span>' + esc(r.ph) + '</span>') + '</div></article>';
    }).join('');
    cards = Array.prototype.slice.call(el.track.children);
    el.img.setAttribute('style', bg(b.reviews[0], b));
  }
  function type(node, s, p) { node.textContent = s.slice(0, Math.round(s.length * p)); }
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
    var bi = Math.floor(t / CYCLE) % data.length, l = t % CYCLE, b = data[bi], mine = b.reviews[0];
    if (bi !== cur) { cur = bi; build(b); }

    // 현실: 컷 3개를 차례로(짧게 겹쳐 바뀜), 처음 0.15초는 흰 화면에서 나타남
    var ci = l >= CUT_AT[2] ? 2 : l >= CUT_AT[1] ? 1 : 0;
    cuts.forEach(function (c, i) { c.style.opacity = i === ci ? 1 : i === ci - 1 ? 1 - clamp((l - CUT_AT[ci]) / 0.12) : 0; });
    if (l < TO_WEB[1]) syncVideo(ci, l - CUT_AT[ci], seeking); else syncVideo(-1, 0, seeking);
    el.flash.style.opacity = l >= SHOT && l < SHOT + 0.22 ? (1 - (l - SHOT) / 0.22) * 0.9 : 0;
    // 작성 컷: 영상이 없으면 임시 그림을 노트북 화면 쪽으로 키워 카메라가 들어가는 움직임을 흉내
    var vid = cuts[2] && cuts[2].querySelector('video');
    if (vid && fit) {
      // 영상: 끝나갈 때 화면 속 글쓰기 창이 웹 창 자리와 겹치도록 조금 더 다가감(무대 가운데 기준)
      var fz = inout(seg(l, PUSH_V));
      vid.style.transform = 'translate(' + (fit[1] * fz).toFixed(1) + 'px,' + (fit[2] * fz).toFixed(1) + 'px) scale(' + (1 + (fit[0] - 1) * fz).toFixed(3) + ')';
    }
    var ph = cuts[2] && cuts[2].querySelector('.ss-cut-ph');
    if (ph) {
      var SCR = scr;
      // 화면 칸이 무대를 빈틈없이 덮을 때까지(가로·세로 중 더 큰 배율, 사진 속 화면이 비스듬해 12% 더) 다가감. 끝에서 서서히 멈추도록 감속
      var pz = inout(seg(l, PUSH)), zEnd = Math.max(1 / SCR.w, 1 / SCR.h) * 1.12, z = Math.pow(zEnd, pz);
      ph.style.setProperty('--ox', ((SCR.x + SCR.w / 2) * 100) + '%'); ph.style.setProperty('--oy', ((SCR.y + SCR.h / 2) * 100) + '%');
      ph.style.transform = 'translate(' + ((0.5 - SCR.x - SCR.w / 2) * 100 * pz).toFixed(2) + '%,' + ((0.5 - SCR.y - SCR.h / 2) * 100 * pz).toFixed(2) + '%) scale(' + z.toFixed(3) + ')';
      var hd = ph.querySelector('.ss-cut-head'), hz = inout(clamp(seg(l, PUSH) * 1.6));
      if (hd) { hd.style.transform = 'translate(' + (-40 * hz).toFixed(1) + '%,' + (30 * hz).toFixed(1) + '%) scale(' + (1 + 0.5 * hz).toFixed(3) + ')'; hd.style.opacity = 1 - hz; }
    }
    // 현실 → 웹: 무대를 꽉 채운 노트북 화면 위에 같은 크기의 웹 창(정면)이 겹쳐 나타나고, 그다음 비스듬한 자리로 물러남
    var w = seg(l, TO_WEB), st = inout(seg(l, SETTLE)), out = seg(l, OUT), back = clamp(l / 0.15);
    el.real.style.opacity = (1 - w) * back;
    el.win.style.opacity = w * (1 - out);
    el.win.style.setProperty('--tilt', st.toFixed(3));
    el.win.style.setProperty('--k', '1');
    el.win.style.borderRadius = (18 - 4 * st).toFixed(1) + 'px';

    // 글쓰기: 제목·사진은 이미 들어가 있고 본문 마지막 줄이 써진 뒤 발행
    type(el.ttl, mine.t, 1); type(el.txt, mine.s, seg(l, TXT));
    el.img.classList.add('is-on');
    el.c1.style.opacity = 0; el.c2.style.opacity = l < PUB ? 1 : 0;
    el.pub.classList.toggle('is-press', l >= PUB && l < PUB + 0.14);

    // 창이 검색 결과로 바뀜
    var sw = seg(l, SWITCH);
    el.ed.style.opacity = 1 - sw; el.sr.style.opacity = sw;
    el.url.textContent = l < SWITCH[0] ? 'blog.naver.com/postwrite' : 'search.naver.com';
    type(el.q, b.q, seg(l, Q));
    go.classList.toggle('is-press', l >= SEARCH && l < SEARCH + 0.12);
    var shown = 0;
    cards.forEach(function (c, i) {
      var p = l < SEARCH ? 0 : ease(clamp((l - CARD_AT - i * CARD_GAP) / CARD_IN));
      shown += p; c.style.opacity = p; c.style.transform = 'translateY(' + ((1 - p) * 26).toFixed(1) + 'px)';
    });
    el.track.style.transform = 'translateY(' + (-Math.max(0, shown - ROWS_SHOWN) * ROW).toFixed(1) + 'px)';
    var last = CARD_AT + (cards.length - 1) * CARD_GAP + CARD_IN;
    el.n.textContent = l < SEARCH ? 0 : Math.round(b.n * ease(clamp((l - CARD_AT) / (last - CARD_AT))));
  }

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var t = 0, prev = 0, on = true, held = false;
  window.ssSeek = function (s) { held = true; t = s; render(t, true); };
  if (reduce) { render(5.5, true); return; }
  if ('IntersectionObserver' in window) new IntersectionObserver(function (e) { on = e[0].isIntersecting; }).observe(root);
  function frame(now) {
    var dt = prev ? Math.min(0.1, (now - prev) / 1000) : 0; prev = now;
    if (!held && on && !document.hidden) { t += dt; render(t); } else if (!held && playing >= 0) syncVideo(-1, 0, false);
    requestAnimationFrame(frame);
  }
  render(0);
  requestAnimationFrame(frame);
})();
