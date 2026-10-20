/* 체험단 히어로(한 바퀴 6초):
   0~1.6초 휴대폰 카메라로 개봉 장면 → 1.6초 찰칵 → 찍은 사진이 글쓰기 창으로 날아감 → 2~3.1초 제목·본문이 써짐 →
   3.2초 발행 → 3.3초 같은 창이 검색 결과로 바뀜 → 방금 쓴 글이 맨 위, 이어서 후기가 쌓이며 후기 수가 오름 → 5.75초부터 처음으로.
   화면 상태는 시간 t 하나로 계산한다(render). 히어로가 화면 밖이거나 탭이 숨겨지면 멈추고,
   '움직임 줄이기' 설정이면 후기가 다 찬 장면에서 멈춘다. window.ssSeek(t) 로 특정 순간을 고정해 볼 수 있다. */
(function () {
  var root = document.querySelector('[data-ss]');
  if (!root) return;
  var data = JSON.parse(root.querySelector('[data-ss-data]').textContent);
  function $(k) { return root.querySelector('[data-ss-' + k + ']'); }
  var el = { url: $('url'), ed: $('ed'), sr: $('sr'), pub: $('pub'), ttl: $('ttl'), txt: $('txt'), c1: $('c1'), c2: $('c2'), img: $('img'),
    q: $('q'), n: $('n'), track: $('track'), cam: $('cam'), view: $('view'), shutter: $('shutter'), last: $('last'), flash: $('flash'), fly: $('fly') };
  var go = root.querySelector('.ss-go');
  var CYCLE = 6;
  var SHOT = 1.6, FLY = [1.65, 2.05], CAM_OUT = [2.0, 2.4], TTL = [2.05, 2.55], TXT = [2.45, 3.05], PUB = 3.12, SWITCH = [3.3, 3.45],
    Q = [3.4, 3.75], SEARCH = 3.78, CARD_AT = 3.9, CARD_GAP = 0.22, CARD_IN = 0.28, OUT = [5.75, 6.0], ROW = 124, ROWS_SHOWN = 3;
  // 날아가는 사진: 휴대폰 화면 가운데 → 글쓰기 창 사진 칸(무대 680x620 좌표)
  var FROM = { x: -96, y: 230, w: 190, h: 250 }, TO = { x: 46, y: 166, w: 588, h: 270 };
  var cur = -1, cards = [];

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
    var mine = b.reviews[0];
    el.img.setAttribute('style', bg(mine, b)); el.fly.setAttribute('style', bg(mine, b));
  }
  function type(node, s, p) { node.textContent = s.slice(0, Math.round(s.length * p)); }

  function render(t) {
    var bi = Math.floor(t / CYCLE) % data.length, l = t % CYCLE, b = data[bi], mine = b.reviews[0];
    if (bi !== cur) { cur = bi; build(b); }
    var out = seg(l, OUT);

    // 휴대폰: 처음 0.25초 아래에서 올라오고, 찍은 뒤 왼쪽 아래로 빠짐
    var camIn = ease(clamp(l / 0.25)), camOut = inout(seg(l, CAM_OUT));
    el.cam.style.opacity = Math.min(camIn, 1 - camOut);
    el.cam.style.transform = 'translate(' + (-70 * camOut).toFixed(1) + 'px,' + ((1 - camIn) * 60 + camOut * 90).toFixed(1) + 'px) rotate(-5deg)';
    el.view.style.transform = 'scale(' + (1 + 0.08 * clamp(l / SHOT)).toFixed(3) + ')';
    el.shutter.classList.toggle('is-press', l >= SHOT - 0.08 && l < SHOT + 0.1);
    el.flash.style.opacity = l >= SHOT && l < SHOT + 0.25 ? (1 - (l - SHOT) / 0.25) * 0.9 : 0;
    if (l >= SHOT) el.last.setAttribute('style', bg(mine, b)); else el.last.removeAttribute('style');

    // 사진이 날아가 글쓰기 사진 칸에 들어감
    var f = inout(seg(l, FLY));
    var flying = l >= FLY[0] && l < FLY[1];
    el.fly.style.opacity = flying ? 1 : 0;
    if (flying) {
      el.fly.style.left = (FROM.x + (TO.x - FROM.x) * f).toFixed(1) + 'px'; el.fly.style.top = (FROM.y + (TO.y - FROM.y) * f).toFixed(1) + 'px';
      el.fly.style.width = (FROM.w + (TO.w - FROM.w) * f).toFixed(1) + 'px'; el.fly.style.height = (FROM.h + (TO.h - FROM.h) * f).toFixed(1) + 'px';
    }
    el.img.classList.toggle('is-on', l >= FLY[1]);

    // 글쓰기: 제목 → 본문 → 발행
    type(el.ttl, mine.t, seg(l, TTL)); type(el.txt, mine.s, seg(l, TXT));
    el.c1.style.opacity = l >= TTL[0] && l < TXT[0] ? 1 : 0; el.c2.style.opacity = l >= TXT[0] && l < PUB ? 1 : 0;
    el.pub.classList.toggle('is-press', l >= PUB && l < PUB + 0.14);

    // 창이 검색 결과로 바뀜
    var sw = seg(l, SWITCH);
    el.ed.style.opacity = 1 - sw; el.sr.style.opacity = sw * (1 - out);
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
  window.ssSeek = function (s) { held = true; t = s; render(t); };
  if (reduce) { render(5.5); return; }
  if ('IntersectionObserver' in window) new IntersectionObserver(function (e) { on = e[0].isIntersecting; }).observe(root);
  function frame(now) {
    var dt = prev ? Math.min(0.1, (now - prev) / 1000) : 0; prev = now;
    if (!held && on && !document.hidden) { t += dt; render(t); }
    requestAnimationFrame(frame);
  }
  render(0);
  requestAnimationFrame(frame);
})();
