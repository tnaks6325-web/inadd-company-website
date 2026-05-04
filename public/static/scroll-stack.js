/**
 * scroll-stack.js
 * ScrollStack - Lenis 기반 스크롤 스택 애니메이션
 * React Bits ScrollStack 로직을 순수 JS로 포팅
 */
(function(global) {

  function initScrollStack(containerSelector, options) {
    var opts = Object.assign({
      itemDistance:      100,
      itemScale:         0.03,
      itemStackDistance: 30,
      stackPosition:     '20%',
      scaleEndPosition:  '10%',
      baseScale:         0.85,
      rotationAmount:    0,
      blurAmount:        0,
    }, options || {});

    var container = document.querySelector(containerSelector);
    if (!container) return;

    var cards = Array.from(container.querySelectorAll('.ss-card'));
    if (!cards.length) return;

    var endEl = container.querySelector('.ss-end');

    /* margin + will-change 초기 세팅 */
    cards.forEach(function(card, i) {
      if (i < cards.length - 1) {
        card.style.marginBottom = opts.itemDistance + 'px';
      }
      card.style.willChange      = 'transform, filter';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
    });

    /* ── 헬퍼 ── */
    function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

    function parsePercent(val, ref) {
      if (typeof val === 'string' && val.includes('%')) {
        return (parseFloat(val) / 100) * ref;
      }
      return parseFloat(val);
    }

    function calcProgress(scroll, start, end) {
      if (scroll < start) return 0;
      if (scroll > end)   return 1;
      return (scroll - start) / (end - start);
    }

    /* ── 핵심 업데이트 ── */
    function update() {
      var scrollTop = window.scrollY;
      var vh        = window.innerHeight;

      var stackPosPx    = parsePercent(opts.stackPosition,    vh);
      var scaleEndPosPx = parsePercent(opts.scaleEndPosition, vh);

      var endTop = endEl
        ? endEl.getBoundingClientRect().top + scrollTop
        : 0;

      cards.forEach(function(card, i) {
        var cardTop    = card.getBoundingClientRect().top + scrollTop;
        var trigStart  = cardTop - stackPosPx - opts.itemStackDistance * i;
        var trigEnd    = cardTop - scaleEndPosPx;
        var pinStart   = trigStart;
        var pinEnd     = endTop - vh / 2;

        /* 스케일 */
        var scaleProgress = calcProgress(scrollTop, trigStart, trigEnd);
        var targetScale   = opts.baseScale + i * opts.itemScale;
        var scale         = 1 - scaleProgress * (1 - targetScale);

        /* 회전 */
        var rotation = opts.rotationAmount
          ? i * opts.rotationAmount * scaleProgress : 0;

        /* 블러 */
        var blur = 0;
        if (opts.blurAmount) {
          var topIdx = 0;
          cards.forEach(function(c, j) {
            var jTop   = c.getBoundingClientRect().top + scrollTop;
            var jStart = jTop - stackPosPx - opts.itemStackDistance * j;
            if (scrollTop >= jStart) topIdx = j;
          });
          if (i < topIdx) blur = Math.max(0, (topIdx - i) * opts.blurAmount);
        }

        /* translateY — sticky 핀 */
        var translateY = 0;
        if (scrollTop >= pinStart && scrollTop <= pinEnd) {
          translateY = scrollTop - cardTop + stackPosPx + opts.itemStackDistance * i;
        } else if (scrollTop > pinEnd) {
          translateY = pinEnd - cardTop + stackPosPx + opts.itemStackDistance * i;
        }

        card.style.transform =
          'translate3d(0,' + translateY.toFixed(2) + 'px,0)' +
          ' scale(' + scale.toFixed(4) + ')' +
          ' rotate(' + rotation.toFixed(2) + 'deg)';

        card.style.filter = blur > 0 ? 'blur(' + blur.toFixed(2) + 'px)' : '';
      });
    }

    /* ── Lenis 부드러운 스크롤 ── */
    function setupLenis() {
      var lenis = new global.Lenis({
        duration:          1.2,
        easing:            function(t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
        smoothWheel:       true,
        touchMultiplier:   2,
        wheelMultiplier:   1,
        lerp:              0.1,
        syncTouch:         true,
        syncTouchLerp:     0.075,
      });

      lenis.on('scroll', update);

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
      return lenis;
    }

    /* ── Lenis CDN 로드 후 시작 ── */
    function start() {
      setupLenis();
      update();
    }

    if (global.Lenis) {
      start();
    } else {
      var s = document.createElement('script');
      s.src = 'https://cdn.jsdelivr.net/npm/lenis@1.1.14/dist/lenis.min.js';
      s.onload = start;
      document.head.appendChild(s);
    }
  }

  global.initScrollStack = initScrollStack;

})(window);
