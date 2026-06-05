/**
 * BlobCursor — Vanilla JS IIFE
 * React Bits 원본 그대로 변환 (goo filter + 3 blobs)
 * 의존성: GSAP (window.gsap)
 */
(function () {
  'use strict';

  /* ── 설정 (원본 props 그대로) ── */
  const BLOB_TYPE               = 'circle';
  const FILL_COLOR              = '#1a6bff';
  const TRAIL_COUNT             = 3;
  const SIZES                   = [60, 125, 75];
  const INNER_SIZES             = [20, 35, 25];
  const INNER_COLOR             = 'rgba(255,255,255,0.8)';
  const OPACITIES               = [0.6, 0.6, 0.6];
  const SHADOW_COLOR            = 'rgba(0,0,0,0.75)';
  const SHADOW_BLUR             = 5;
  const SHADOW_OFFSET_X         = 10;
  const SHADOW_OFFSET_Y         = 10;
  const FILTER_ID               = 'blob-cursor-goo';
  const FILTER_STD_DEVIATION    = 30;
  const FILTER_COLOR_MATRIX     = '1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 35 -10';
  const USE_FILTER              = true;
  const FAST_DURATION           = 0.1;
  const SLOW_DURATION           = 0.5;
  const FAST_EASE               = 'power3.out';
  const SLOW_EASE               = 'power1.out';
  const Z_INDEX                 = 100;

  /* hover shrink */
  const HOVER_SEL = [
    'a[href]', 'button', '[role="button"]',
    'input[type="submit"]', 'input[type="button"]',
    '.nav-link', '.hero-cta-btn', '.cta-btn',
    '.ndm-item', '.admin-login-btn', 'label[for]',
  ].join(', ');
  const SHRINK_SCALE = 0.4;
  const SHRINK_DUR   = 0.22;
  const GROW_DUR     = 0.35;
  const SHRINK_EASE  = 'power2.out';
  const GROW_EASE    = 'elastic.out(1, 0.5)';

  /* ── GSAP 대기 ── */
  function init() {
    if (typeof window.gsap === 'undefined') { setTimeout(init, 80); return; }
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    build();
  }

  function build() {
    const gsap = window.gsap;

    /* ────────────────────────────────────────────
       컨테이너: position fixed, 전체화면
       overflow: visible  ← SVG filter 가 잘리지 않도록 반드시 visible
    ──────────────────────────────────────────── */
    const container = document.createElement('div');
    container.id = 'blob-cursor-root';
    Object.assign(container.style, {
      position:        'fixed',
      top:             '0',
      left:            '0',
      width:           '100vw',
      height:          '100vh',
      pointerEvents:   'none',
      zIndex:          String(Z_INDEX),
      overflow:        'visible',   /* ← 핵심: filter 클리핑 방지 */
    });

    /* ── SVG goo filter ── */
    if (USE_FILTER) {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      Object.assign(svg.style, {
        position: 'absolute',
        width:    '0',
        height:   '0',
        overflow: 'hidden',
      });

      const defs   = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
      const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
      filter.setAttribute('id', FILTER_ID);
      /* filter 범위를 넉넉하게 — 화면 밖으로 나가도 잘리지 않음 */
      filter.setAttribute('x', '-50%');
      filter.setAttribute('y', '-50%');
      filter.setAttribute('width', '200%');
      filter.setAttribute('height', '200%');

      const blur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
      blur.setAttribute('in', 'SourceGraphic');
      blur.setAttribute('result', 'blur');
      blur.setAttribute('stdDeviation', String(FILTER_STD_DEVIATION));

      const matrix = document.createElementNS('http://www.w3.org/2000/svg', 'feColorMatrix');
      matrix.setAttribute('in', 'blur');
      matrix.setAttribute('mode', 'matrix');
      matrix.setAttribute('values', FILTER_COLOR_MATRIX);

      filter.appendChild(blur);
      filter.appendChild(matrix);
      defs.appendChild(filter);
      svg.appendChild(defs);
      container.appendChild(svg);
    }

    /* ── blob-main 래퍼: filter 적용 영역 ── */
    const blobMain = document.createElement('div');
    Object.assign(blobMain.style, {
      position:      'absolute',
      top:           '0',
      left:          '0',
      width:         '100%',
      height:        '100%',
      pointerEvents: 'none',
      userSelect:    'none',
      overflow:      'visible',   /* ← 잘리지 않도록 */
      filter:        USE_FILTER ? `url(#${FILTER_ID})` : 'none',
    });

    /* ── 개별 blob 생성 ── */
    const blobs = [];
    for (let i = 0; i < TRAIL_COUNT; i++) {
      const size      = SIZES[i];
      const innerSize = INNER_SIZES[i];
      const isCircle  = BLOB_TYPE === 'circle';

      const blob = document.createElement('div');
      Object.assign(blob.style, {
        position:        'absolute',
        width:           size + 'px',
        height:          size + 'px',
        borderRadius:    isCircle ? '50%' : '0%',
        backgroundColor: FILL_COLOR,
        opacity:         String(OPACITIES[i]),
        boxShadow:       `${SHADOW_OFFSET_X}px ${SHADOW_OFFSET_Y}px ${SHADOW_BLUR}px 0 ${SHADOW_COLOR}`,
        willChange:      'transform',
        /* 원본 CSS 그대로: translate(-50%,-50%) 는 GSAP x/y와 결합 */
        transform:       'translate(-50%, -50%)',
        /* 초기 위치: 화면 왼쪽 위 밖 */
        top:             '-200px',
        left:            '-200px',
      });

      /* inner dot */
      const dot = document.createElement('div');
      Object.assign(dot.style, {
        position:        'absolute',
        width:           innerSize + 'px',
        height:          innerSize + 'px',
        top:             ((size - innerSize) / 2) + 'px',
        left:            ((size - innerSize) / 2) + 'px',
        backgroundColor: INNER_COLOR,
        borderRadius:    isCircle ? '50%' : '0%',
      });

      blob.appendChild(dot);
      blobMain.appendChild(blob);
      blobs.push(blob);
    }

    container.appendChild(blobMain);
    document.body.appendChild(container);

    /* ────────────────────────────────────────────
       마우스 좌표 계산
       원본은 container 기준 상대좌표를 씀.
       우리는 fixed 컨테이너 = 뷰포트이므로
       clientX/Y 를 그대로 사용하면 됨.
    ──────────────────────────────────────────── */
    let appeared = false;

    function onMove(e) {
      const x = e.clientX !== undefined ? e.clientX : e.touches[0].clientX;
      const y = e.clientY !== undefined ? e.clientY : e.touches[0].clientY;

      if (!appeared) {
        appeared = true;
        /* 첫 등장: 모든 blob 을 현재 위치로 순간이동 */
        blobs.forEach((el) => gsap.set(el, { x, y }));
      }

      blobs.forEach((el, i) => {
        const isLead = i === 0;
        gsap.to(el, {
          x:         x,
          y:         y,
          duration:  isLead ? FAST_DURATION : SLOW_DURATION,
          ease:      isLead ? FAST_EASE : SLOW_EASE,
          overwrite: 'auto',
        });
      });
    }

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('touchmove', onMove, { passive: true });

    /* ────────────────────────────────────────────
       Hover Shrink / Grow
       blobMain 전체에 scale 적용
    ──────────────────────────────────────────── */
    let hovering = false;

    function shrink() {
      if (hovering) return;
      hovering = true;
      gsap.to(blobMain, {
        scale:     SHRINK_SCALE,
        duration:  SHRINK_DUR,
        ease:      SHRINK_EASE,
        overwrite: true,
      });
    }

    function grow() {
      if (!hovering) return;
      hovering = false;
      gsap.to(blobMain, {
        scale:     1,
        duration:  GROW_DUR,
        ease:      GROW_EASE,
        overwrite: true,
      });
    }

    /* mouseenter/mouseleave 직접 바인딩 */
    function bindHover(root) {
      root.querySelectorAll(HOVER_SEL).forEach((node) => {
        node.addEventListener('mouseenter', shrink, { passive: true });
        node.addEventListener('mouseleave', grow,   { passive: true });
      });
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => bindHover(document));
    } else {
      bindHover(document);
    }

    /* 동적 요소 대응 */
    new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        m.addedNodes.forEach((node) => {
          if (node.nodeType === 1) bindHover(node);
        });
      });
    }).observe(document.body, { childList: true, subtree: true });

    /* 윈도우 밖으로 나가면 복원 */
    document.addEventListener('mouseleave', grow, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
