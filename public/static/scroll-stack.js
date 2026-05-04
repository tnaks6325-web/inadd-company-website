/**
 * scroll-stack.js  v3
 * - Lenis CDN 실패 시 native scroll 로 자동 fallback
 * - position:sticky + transform 기반 스택 애니메이션
 */
(function(global) {

  function initScrollStack(containerSelector, options) {
    var opts = Object.assign({
      itemScale:       0.03,   /* 카드당 축소 배율 */
      itemStackOffset: 24,     /* 위로 쌓일 px 간격 */
      baseScale:       0.82,   /* 뒤 카드 최소 scale */
      blurAmount:      1.5,    /* 뒤 카드 blur (px/단계) */
      scrollHeight:    '90vh', /* 카드 1장당 스크롤 높이 */
      stickyTop:       '10vh', /* sticky top 위치 */
      lenisTimeout:    3000,   /* Lenis CDN 로딩 대기 최대 ms */
    }, options || {});

    var container = document.querySelector(containerSelector);
    if (!container) { console.warn('[ScrollStack] container not found:', containerSelector); return; }

    var items = Array.from(container.querySelectorAll('.ss-item'));
    var cards = items.map(function(item) { return item.querySelector('.ss-card'); });
    var N = cards.length;
    if (!N) { console.warn('[ScrollStack] no .ss-card found'); return; }

    /* ── 헬퍼 ── */
    function parseUnit(val, ref) {
      if (typeof val === 'string' && val.indexOf('vh') !== -1) return (parseFloat(val) / 100) * ref;
      if (typeof val === 'string' && val.indexOf('px') !== -1) return parseFloat(val);
      return parseFloat(val);
    }

    var shPx = parseUnit(opts.scrollHeight, window.innerHeight);
    var stPx = parseUnit(opts.stickyTop,    window.innerHeight);

    /* ── 각 .ss-item 에 스크롤 높이 부여 ── */
    items.forEach(function(item, i) {
      item.style.height   = (shPx + (i === N - 1 ? window.innerHeight * 0.5 : 0)) + 'px';
      item.style.position = 'relative';
    });

    /* ── 각 .ss-card 를 sticky 로 설정 ── */
    cards.forEach(function(card) {
      card.style.position           = 'sticky';
      card.style.top                = stPx + 'px';
      card.style.transformOrigin    = 'top center';
      card.style.willChange         = 'transform, filter, opacity';
      card.style.backfaceVisibility = 'hidden';
      card.style.zIndex             = '1';
    });

    /* ── 핵심 업데이트 ── */
    function update() {
      var scrollY = window.scrollY;

      cards.forEach(function(card, i) {
        var item     = items[i];
        var itemTop  = item.getBoundingClientRect().top + scrollY;
        var progress = (scrollY - itemTop + stPx) / shPx;
        progress = Math.max(0, Math.min(1, progress));

        /* 이 카드 앞에 얼마나 많은 카드가 쌓였는지 */
        var stackCount = 0;
        for (var j = 0; j < i; j++) {
          var jTop  = items[j].getBoundingClientRect().top + scrollY;
          var jProg = (scrollY - jTop + stPx) / shPx;
          if (jProg >= 1)    stackCount++;
          else if (jProg > 0) stackCount += jProg;
        }

        var scale      = Math.max(opts.baseScale, 1 - stackCount * opts.itemScale);
        var translateY = -stackCount * opts.itemStackOffset;
        var blurVal    = Math.min(8, stackCount * opts.blurAmount);
        var opacity    = Math.max(0.55, 1 - stackCount * 0.08);

        card.style.transform = 'translate3d(0,' + translateY.toFixed(1) + 'px,0) scale(' + scale.toFixed(4) + ')';
        card.style.filter    = blurVal > 0.05 ? 'blur(' + blurVal.toFixed(2) + 'px)' : '';
        card.style.opacity   = opacity.toFixed(3);
        card.style.zIndex    = String(Math.round(N * 10 - stackCount * 10));
      });
    }

    /* ── 리사이즈 ── */
    window.addEventListener('resize', function() {
      shPx = parseUnit(opts.scrollHeight, window.innerHeight);
      stPx = parseUnit(opts.stickyTop,    window.innerHeight);
      items.forEach(function(item, i) {
        item.style.height = (shPx + (i === N - 1 ? window.innerHeight * 0.5 : 0)) + 'px';
      });
      cards.forEach(function(card) { card.style.top = stPx + 'px'; });
      update();
    });

    /* ── native scroll fallback (항상 등록) ── */
    window.addEventListener('scroll', update, { passive: true });
    update();

    /* ── Lenis 부드러운 스크롤 (선택적 향상) ── */
    function tryLenis() {
      if (typeof global.Lenis !== 'function') return; /* 이미 로드 실패 → native만 사용 */
      try {
        var lenis = new global.Lenis({
          duration:        1.2,
          easing:          function(t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
          smoothWheel:     true,
          wheelMultiplier: 1,
          lerp:            0.1,
          syncTouch:       true,
        });
        lenis.on('scroll', update);
        (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })(0);
      } catch(e) {
        console.warn('[ScrollStack] Lenis init failed, using native scroll');
      }
    }

    if (typeof global.Lenis === 'function') {
      tryLenis();
    } else {
      /* Lenis CDN 로드 시도 — 실패해도 native scroll 이 이미 동작 중 */
      var s = document.createElement('script');
      var timer = setTimeout(function() {
        console.warn('[ScrollStack] Lenis CDN timeout — running on native scroll');
      }, opts.lenisTimeout);
      s.onload  = function() { clearTimeout(timer); tryLenis(); };
      s.onerror = function() { clearTimeout(timer); /* native scroll 계속 사용 */ };
      s.src = 'https://cdn.jsdelivr.net/npm/lenis@1.1.14/dist/lenis.min.js';
      document.head.appendChild(s);
    }
  }

  global.initScrollStack = initScrollStack;

})(window);
