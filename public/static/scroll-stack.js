/**
 * scroll-stack.js  v2
 * 올바른 ScrollStack 구현:
 * - 각 카드가 독립적인 .ss-item 래퍼 안에 위치
 * - 래퍼가 충분한 높이(scrollHeight)를 가져 스크롤 공간 확보
 * - 카드 자체는 position:sticky 로 뷰포트에 고정
 * - 스크롤하면 이전 카드가 scale down 되며 다음 카드가 올라옴
 *
 * 사용법:
 *   initScrollStack('.ss-container')
 *
 * HTML 구조:
 *   <div class="ss-container">
 *     <div class="ss-item">   ← 스크롤 높이를 담당
 *       <div class="ss-card"> ← sticky 고정, transform 대상
 *         ...content...
 *       </div>
 *     </div>
 *     ...
 *   </div>
 */
(function(global) {

  function initScrollStack(containerSelector, options) {
    var opts = Object.assign({
      itemScale:         0.03,   /* 카드당 축소량 */
      itemStackOffset:   24,     /* 위로 쌓일 때 px 간격 */
      baseScale:         0.82,   /* 가장 뒤 카드 최소 스케일 */
      blurAmount:        1.5,    /* 뒤 카드 블러 (px/단계) */
      scrollHeight:      '90vh', /* 각 카드가 차지하는 스크롤 높이 */
      stickyTop:         '8vh',  /* sticky top 위치 */
    }, options || {});

    var container = document.querySelector(containerSelector);
    if (!container) { console.warn('[ScrollStack] container not found:', containerSelector); return; }

    var items = Array.from(container.querySelectorAll('.ss-item'));
    var cards = items.map(function(item) { return item.querySelector('.ss-card'); });
    var N = cards.length;
    if (!N) { console.warn('[ScrollStack] no .ss-card found'); return; }

    /* ── 각 .ss-item 에 스크롤 높이 부여 ── */
    var shPx = parseUnit(opts.scrollHeight, window.innerHeight);
    var stPx = parseUnit(opts.stickyTop,    window.innerHeight);

    items.forEach(function(item, i) {
      item.style.height          = (shPx + (i === N - 1 ? window.innerHeight * 0.4 : 0)) + 'px';
      item.style.position        = 'relative';
    });

    /* ── 각 .ss-card 를 sticky 로 설정 ── */
    cards.forEach(function(card) {
      card.style.position        = 'sticky';
      card.style.top             = stPx + 'px';
      card.style.transformOrigin = 'top center';
      card.style.willChange      = 'transform, filter';
      card.style.backfaceVisibility = 'hidden';
      card.style.zIndex          = '1';
    });

    /* ── 헬퍼 ── */
    function parseUnit(val, ref) {
      if (typeof val === 'string' && val.includes('vh')) return (parseFloat(val) / 100) * ref;
      if (typeof val === 'string' && val.includes('px')) return parseFloat(val);
      return parseFloat(val);
    }

    function lerp(a, b, t) { return a + (b - a) * Math.max(0, Math.min(1, t)); }

    /* ── 핵심 업데이트 ── */
    function update() {
      var scrollY = window.scrollY;
      var vh = window.innerHeight;

      cards.forEach(function(card, i) {
        var item = items[i];
        /* item의 문서상 절대 top 위치 */
        var itemTop = item.getBoundingClientRect().top + scrollY;

        /* 이 카드가 sticky되는 시점 = itemTop */
        /* 이 카드가 스크롤에 의해 얼마나 지나쳤는지 (0 = 막 sticky됨, 1 = 완전히 지남) */
        var progress = (scrollY - itemTop + stPx) / shPx;
        progress = Math.max(0, Math.min(1, progress));

        /* 이 카드 위로 얼마나 많은 카드가 쌓였는지 계산 */
        var stackCount = 0;
        for (var j = 0; j < i; j++) {
          var jItemTop = items[j].getBoundingClientRect().top + scrollY;
          var jProgress = (scrollY - jItemTop + stPx) / shPx;
          if (jProgress >= 1) stackCount++; /* 완전히 지나간 카드 수 */
          else if (jProgress > 0) stackCount += jProgress; /* 진행 중인 카드 */
        }

        /* scale: 뒤에 쌓일수록 작아짐 */
        var targetScale = Math.max(opts.baseScale, 1 - stackCount * opts.itemScale);
        var scale = lerp(1, targetScale, Math.min(1, stackCount));

        /* translateY: 위로 쌓이는 offset */
        var translateY = -stackCount * opts.itemStackOffset;

        /* blur: 뒤 카드일수록 흐려짐 */
        var blurVal = stackCount * opts.blurAmount;
        blurVal = Math.max(0, Math.min(8, blurVal));

        /* opacity: 맨 뒤 카드들 약간 어둡게 */
        var opacity = Math.max(0.55, 1 - stackCount * 0.08);

        card.style.transform = 'translate3d(0,' + translateY.toFixed(2) + 'px,0) scale(' + scale.toFixed(4) + ')';
        card.style.filter    = blurVal > 0.05 ? 'blur(' + blurVal.toFixed(2) + 'px)' : '';
        card.style.opacity   = opacity.toFixed(3);
        card.style.zIndex    = String(N - stackCount);
      });
    }

    /* ── 리사이즈 대응 ── */
    function onResize() {
      var newVh = window.innerHeight;
      shPx = parseUnit(opts.scrollHeight, newVh);
      stPx = parseUnit(opts.stickyTop,    newVh);
      items.forEach(function(item, i) {
        item.style.height = (shPx + (i === N - 1 ? newVh * 0.4 : 0)) + 'px';
      });
      cards.forEach(function(card) {
        card.style.top = stPx + 'px';
      });
      update();
    }
    window.addEventListener('resize', onResize);

    /* ── Lenis 부드러운 스크롤 ── */
    function setupLenis() {
      var lenis = new global.Lenis({
        duration:      1.2,
        easing:        function(t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
        smoothWheel:   true,
        wheelMultiplier: 1,
        lerp:          0.1,
        syncTouch:     true,
      });

      lenis.on('scroll', update);

      function raf(t) { lenis.raf(t); requestAnimationFrame(raf); }
      requestAnimationFrame(raf);
    }

    /* ── 시작 ── */
    function start() {
      setupLenis();
      update();
      /* scroll 이벤트도 fallback으로 등록 */
      window.addEventListener('scroll', update, { passive: true });
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
