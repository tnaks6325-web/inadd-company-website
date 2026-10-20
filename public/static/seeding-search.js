/* 체험단 히어로: 브랜드 하나당 9초 — 검색어 입력 → 검색 → 후기 카드가 하나씩 쌓이며 후기 수가 오름 → 지우고 다음 브랜드.
   화면 상태는 시간 t 하나로 계산한다(render). 히어로가 화면 밖이거나 탭이 숨겨지면 멈추고,
   '움직임 줄이기' 설정이면 후기가 다 찬 장면에서 멈춘다. window.ssSeek(t) 로 특정 순간을 고정해 볼 수 있다. */
(function () {
  var root = document.querySelector('[data-ss]');
  if (!root) return;
  var data = JSON.parse(root.querySelector('[data-ss-data]').textContent);
  var qEl = root.querySelector('[data-ss-q]'), nEl = root.querySelector('[data-ss-n]'), track = root.querySelector('[data-ss-track]');
  var go = root.querySelector('.ss-go');
  var CYCLE = 9, TYPE_AT = 0.4, TYPE_DUR = 1.3, SEARCH_AT = 1.9, CARD_AT = 2.3, CARD_GAP = 0.75, CARD_IN = 0.5, CLEAR_AT = 8.3, ROW = 124, ROWS_SHOWN = 3;
  var cur = -1, cards = [];

  function clamp(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
  function ease(x) { return 1 - Math.pow(1 - x, 3); }
  function esc(s) { return s.replace(/[&<>]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]; }); }
  function hl(t, kw) { var i = t.indexOf(kw); return i < 0 ? esc(t) : esc(t.slice(0, i)) + '<b>' + esc(kw) + '</b>' + esc(t.slice(i + kw.length)); }
  function build(b) {
    track.innerHTML = b.reviews.map(function (r) {
      return '<article class="ss-card"><div class="ss-card-txt"><div class="ss-by"><span class="ss-by-ava" style="--a:' + b.color + '"></span>' + esc(r.by) + '<i>' + r.d + '</i></div>' +
        '<strong class="ss-ttl">' + hl(r.t, b.kw) + '</strong><p class="ss-snip">' + esc(r.s) + '</p></div>' +
        '<div class="ss-ph" style="--a:' + b.color + (r.img ? ';background-image:url(' + r.img + ')' : '') + '">' + (r.img ? '' : '<span>' + esc(r.ph) + '</span>') + '</div></article>';
    }).join('');
    cards = Array.prototype.slice.call(track.children);
  }

  function render(t) {
    var bi = Math.floor(t / CYCLE) % data.length, l = t % CYCLE, b = data[bi];
    if (bi !== cur) { cur = bi; build(b); }
    // 검색어: 입력 → 유지 → 지우기
    var chars = l < CLEAR_AT ? Math.round(b.q.length * clamp((l - TYPE_AT) / TYPE_DUR)) : Math.round(b.q.length * (1 - clamp((l - CLEAR_AT) / 0.5)));
    qEl.textContent = b.q.slice(0, chars);
    go.classList.toggle('is-press', l >= SEARCH_AT && l < SEARCH_AT + 0.25);
    // 후기 카드: 검색 뒤 하나씩 아래에서 올라옴, 3장 넘으면 목록이 위로 밀림
    var shown = 0;
    cards.forEach(function (c, i) {
      var p = l < SEARCH_AT ? 0 : ease(clamp((l - CARD_AT - i * CARD_GAP) / CARD_IN));
      shown += p;
      c.style.opacity = p;
      c.style.transform = 'translateY(' + ((1 - p) * 28).toFixed(1) + 'px)';
    });
    var out = clamp((l - CLEAR_AT + 0.2) / 0.4);
    track.style.transform = 'translateY(' + (-Math.max(0, shown - ROWS_SHOWN) * ROW).toFixed(1) + 'px)';
    track.style.opacity = 1 - out;
    // 후기 수: 카드가 쌓이는 동안 0 → n
    var last = CARD_AT + (cards.length - 1) * CARD_GAP + CARD_IN;
    nEl.textContent = l < SEARCH_AT ? 0 : Math.round(b.n * ease(clamp((l - CARD_AT) / (last - CARD_AT))));
  }

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var t = 0, prev = 0, on = true, held = false;
  window.ssSeek = function (s) { held = true; t = s; render(t); };
  if (reduce) { render(7.5); return; }
  if ('IntersectionObserver' in window) new IntersectionObserver(function (e) { on = e[0].isIntersecting; }).observe(root);
  function frame(now) {
    var dt = prev ? Math.min(0.1, (now - prev) / 1000) : 0; prev = now;
    if (!held && on && !document.hidden) { t += dt; render(t); }
    requestAnimationFrame(frame);
  }
  render(0);
  requestAnimationFrame(frame);
})();
