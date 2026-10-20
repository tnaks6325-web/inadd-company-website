/* 체험단 히어로(한 바퀴 약 6.4초, 찰칵 사진 수에 따라 달라짐): 현실 → 웹.
   0~0.75초 개봉 → 촬영(각도가 다른 사진이 0.3초마다 찰칵하며 바뀜, 5장이면 0.75~2.25초) → 노트북으로 글 쓰는 뒷모습(영상, 손가락 타이핑).
   노트북 화면 자리에는 웹 글쓰기 창 복제본을 원근에 맞춰 겹쳐 실제 글자가 입력되고, 이어서 카메라가 다가가듯 그 화면이 무대 전체로 펴짐 →
   다 펴지면 같은 모습의 웹 창으로 바뀌고 비스듬히 자리 잡음 →
   발행 → 검색 결과로 바뀜 → 방금 쓴 글이 맨 위, 이어서 후기가 쌓이며 후기 수가 오름 → 처음으로.
   촬영 뒤 시각은 모두 '작성 컷 시작(W0)'을 기준으로 밀린다. 화면 상태는 시간 t 하나로 계산한다(render).
   히어로가 화면 밖이거나 탭이 숨겨지면 멈추고, '움직임 줄이기' 설정이면 후기가 다 찬 장면에서 멈춘다.
   window.ssSeek(t) 로 특정 순간을 고정해 볼 수 있다. */
(function () {
  var root = document.querySelector('[data-ss]');
  if (!root) return;
  var data = JSON.parse(root.querySelector('[data-ss-data]').textContent);
  function $(k) { return root.querySelector('[data-ss-' + k + ']'); }
  var el = { real: $('real'), win: $('win'), flash: $('flash'), url: $('url'), ed: $('ed'), sr: $('sr'), pub: $('pub'), ttl: $('ttl'), txt: $('txt'),
    c1: $('c1'), c2: $('c2'), img: $('img'), q: $('q'), n: $('n'), track: $('track') };
  var cuts = Array.prototype.slice.call(root.querySelectorAll('[data-ss-cut]'));
  var go = root.querySelector('.ss-go');
  // 촬영 사진 수 × 0.3초가 촬영 구간. 그 뒤 시각은 작성 컷 시작(W0)에서 얼마나 지났는지로 정한다.
  var SHOT_LEN = 0.3, nShots = cuts[1] ? cuts[1].querySelectorAll('.ss-shot').length : 0;
  var W0 = 0.75 + (nShots ? nShots * SHOT_LEN : 1.1);
  function at(x) { return W0 + x; }
  var CUT_AT = [0, 0.75, W0], SHOT = 1.3, TTL = [at(0.05), at(0.5)], TXT = [at(0.5), at(1.45)], PUSH = [at(0.55), at(1.0)], TO_WEB = [at(0.98), at(1.02)],
    SETTLE = [at(1.05), at(1.4)], PUB = at(1.5), SWITCH = [at(1.65), at(1.77)], Q = [at(1.75), at(2.02)], SEARCH = at(2.04), CARD_AT = at(2.15),
    CARD_GAP = 0.19, CARD_IN = 0.26, OUT = [at(3.85), at(4.1)], CYCLE = at(4.1), ROW = 124, ROWS_SHOWN = 3;
  // 작성 영상 속 노트북 화면 네 모서리(무대 680x620 좌표: 왼위·오른위·오른아래·왼아래)
  var qv = cuts[2] && cuts[2].getAttribute('data-quad'), Q0 = qv ? qv.split(',').map(Number) : null, RECT = [0, 0, 680, 0, 680, 620, 0, 620];
  var scr = null, cur = -1, cards = [], playing = -1;

  function clamp(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
  function seg(l, r) { return clamp((l - r[0]) / (r[1] - r[0])); }
  function ease(x) { return 1 - Math.pow(1 - x, 3); }
  function inout(x) { return x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; }
  // 680x620 사각형을 네 점(q)으로 옮기는 원근 변환(CSS matrix3d)
  function quadMatrix(q) {
    var x0 = q[0], y0 = q[1], x1 = q[2], y1 = q[3], x2 = q[4], y2 = q[5], x3 = q[6], y3 = q[7];
    var dx1 = x1 - x2, dx2 = x3 - x2, dx3 = x0 - x1 + x2 - x3, dy1 = y1 - y2, dy2 = y3 - y2, dy3 = y0 - y1 + y2 - y3, den = dx1 * dy2 - dx2 * dy1;
    var g = (dx3 * dy2 - dx2 * dy3) / den, h = (dx1 * dy3 - dx3 * dy1) / den;
    var a = (x1 - x0 + g * x1) / 680, b = (x3 - x0 + h * x3) / 620, d = (y1 - y0 + g * y1) / 680, e = (y3 - y0 + h * y3) / 620;
    return 'matrix3d(' + [a, d, 0, g / 680, b, e, 0, h / 620, 0, 0, 1, 0, x0, y0, 0, 1].map(function (v) { return +v.toFixed(6); }).join(',') + ')';
  }
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
    // 노트북 화면에 겹칠 글쓰기 창 복제본(검색 화면은 빼고, 데이터 표시는 지워 원본 선택에 안 걸리게)
    if (Q0) {
      if (scr) scr.node.remove();
      var n = el.win.cloneNode(true);
      n.removeAttribute('data-ss-win'); n.removeAttribute('style'); n.className = 'ss-win ss-scr';
      var srp = n.querySelector('[data-ss-sr]'); if (srp) srp.remove();
      var pick = function (k) { var x = n.querySelector('[data-ss-' + k + ']'); return x; };
      scr = { node: n, ttl: pick('ttl'), txt: pick('txt'), c1: pick('c1'), c2: pick('c2'), ed: pick('ed'), url: pick('url') };
      Array.prototype.forEach.call(n.querySelectorAll('*'), function (x) { Array.prototype.slice.call(x.attributes).forEach(function (a) { if (a.name.indexOf('data-ss') === 0) x.removeAttribute(a.name); }); });
      scr.ed.style.opacity = 1; scr.url.textContent = 'blog.naver.com/postwrite';
      cuts[2].appendChild(n);
    }
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
    // 촬영: 사진 n장을 같은 간격으로, 바뀌는 순간마다 찰칵(하얗게 번쩍) + 살짝 당겨지듯 확대에서 제자리로
    var shots = cuts[1] ? cuts[1].querySelectorAll('.ss-shot') : [], fl = 0;
    if (shots.length) {
      var gap = (CUT_AT[2] - CUT_AT[1]) / shots.length, k = Math.min(shots.length - 1, Math.floor((l - CUT_AT[1]) / gap)), into = l - CUT_AT[1] - k * gap;
      Array.prototype.forEach.call(shots, function (sh, i) {
        sh.style.opacity = i === k ? 1 : 0;
        sh.style.transform = 'scale(' + (1 + 0.05 * (1 - ease(clamp(into / gap)))).toFixed(3) + ')';
      });
      var fd = Math.min(0.14, gap * 0.6);
      if (l >= CUT_AT[1] && l < CUT_AT[2]) fl = into < fd ? (1 - into / fd) * 0.85 : 0;
    } else if (l >= SHOT && l < SHOT + 0.22) fl = (1 - (l - SHOT) / 0.22) * 0.9;
    el.flash.style.opacity = fl;
    // 작성 컷: 영상 속 노트북 화면 자리에 글쓰기 창 복제본을 겹치고, 카메라가 다가가듯 그 자리를 무대 전체로 편다.
    // 영상도 같은 비율로 키우고 옮겨 화면 테두리·손이 함께 커지며 밖으로 빠지게 한다.
    if (scr) {
      // 영상은 화면 자리가 무대 크기가 되도록 확대·이동하고, 복제본은 그 영상 화면에 붙어 따라가면서 남은 기울기만 조금씩 펴 준다
      var pz = inout(seg(l, PUSH));
      var w0 = (Q0[2] - Q0[0] + Q0[4] - Q0[6]) / 2, h0 = (Q0[7] - Q0[1] + Q0[5] - Q0[3]) / 2, S1 = (680 / w0 + 620 / h0) / 2;
      var cx0 = (Q0[0] + Q0[2] + Q0[4] + Q0[6]) / 4, cy0 = (Q0[1] + Q0[3] + Q0[5] + Q0[7]) / 4, sc = 1 + (S1 - 1) * pz, cx = cx0 + (340 - cx0) * pz, cy = cy0 + (310 - cy0) * pz;
      var q = Q0.map(function (v, i) {
        var full = i % 2 ? 310 + S1 * (v - cy0) : 340 + S1 * (v - cx0);
        return (i % 2 ? cy + sc * (v - cy0) : cx + sc * (v - cx0)) + (RECT[i] - full) * pz;
      });
      scr.node.style.transform = quadMatrix(q);
      var v3 = cuts[2].querySelector('video');
      if (v3) v3.style.transform = 'translate(' + (cx - sc * cx0).toFixed(1) + 'px,' + (cy - sc * cy0).toFixed(1) + 'px) scale(' + sc.toFixed(3) + ')';
      type(scr.ttl, mine.t, seg(l, TTL)); type(scr.txt, mine.s, seg(l, TXT));
      scr.c1.style.opacity = l < TTL[1] ? 1 : 0; scr.c2.style.opacity = l >= TTL[1] ? 1 : 0;
    }
    // 현실 → 웹: 무대를 꽉 채운 노트북 화면 위에 같은 크기의 웹 창(정면)이 겹쳐 나타나고, 그다음 비스듬한 자리로 물러남
    var w = seg(l, TO_WEB), st = inout(seg(l, SETTLE)), out = seg(l, OUT), back = clamp(l / 0.15);
    el.real.style.opacity = (1 - w) * back;
    el.win.style.opacity = w * (1 - out);
    el.win.style.setProperty('--tilt', st.toFixed(3));
    el.win.style.setProperty('--k', '1');
    el.win.style.borderRadius = (18 - 4 * st).toFixed(1) + 'px';

    // 글쓰기: 노트북 화면에서 이어 제목·본문이 써진 뒤 발행(복제본과 같은 시각표라 바뀌는 순간 글자가 같다)
    type(el.ttl, mine.t, seg(l, TTL)); type(el.txt, mine.s, seg(l, TXT));
    el.img.classList.add('is-on');
    el.c1.style.opacity = l < TTL[1] ? 1 : 0; el.c2.style.opacity = l >= TTL[1] && l < PUB ? 1 : 0;
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
  if (reduce) { render(at(3.6), true); return; }
  if ('IntersectionObserver' in window) new IntersectionObserver(function (e) { on = e[0].isIntersecting; }).observe(root);
  function frame(now) {
    var dt = prev ? Math.min(0.1, (now - prev) / 1000) : 0; prev = now;
    if (!held && on && !document.hidden) { t += dt; render(t); } else if (!held && playing >= 0) syncVideo(-1, 0, false);
    requestAnimationFrame(frame);
  }
  render(0);
  requestAnimationFrame(frame);
})();
