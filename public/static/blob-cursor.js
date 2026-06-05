/**
 * BlobCursor — Vanilla JS IIFE
 * React Bits BlobCursor → Hono SSR (Cloudflare Pages) 환경용 변환
 * 의존성: GSAP (window.gsap)
 *
 * 특징:
 * - position: fixed (전체 뷰포트 기준, 스크롤 독립)
 * - SVG goo filter (useFilter: true)
 * - a[href], button, [role="button"] 호버 시 shrink
 * - 모바일 touch 지원
 * - pointer-events: none (클릭 방해 없음)
 */
(function () {
  'use strict';

  /* ── 설정값 ── */
  const CONFIG = {
    blobType:              'circle',
    fillColor:             '#1a6bff',        /* 브랜드 블루 */
    trailCount:            3,
    sizes:                 [60, 125, 75],
    innerSizes:            [20, 35, 25],
    innerColor:            'rgba(255,255,255,0.75)',
    opacities:             [0.65, 0.55, 0.6],
    shadowColor:           'rgba(26,107,255,0.45)',
    shadowBlur:            18,
    shadowOffsetX:         0,
    shadowOffsetY:         0,
    filterId:              'blob-cursor-filter',
    filterStdDeviation:    28,
    filterColorMatrix:     '1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -10',
    useFilter:             true,
    fastDuration:          0.08,
    slowDuration:          0.45,
    fastEase:              'power3.out',
    slowEase:              'power1.out',
    zIndex:                9999,

    /* hover shrink */
    shrinkScale:           0.35,
    shrinkDuration:        0.25,
    shrinkEase:            'power2.out',
    growDuration:          0.35,
    growEase:              'power2.out',

    /* 호버 대상 셀렉터 */
    hoverSelector:         'a[href], button, [role="button"], .nav-link, .hero-cta-btn, .cta-btn, label[for], input[type="submit"], input[type="button"]',
  };

  /* ── GSAP 로드 확인 ── */
  function init() {
    if (typeof window.gsap === 'undefined') {
      console.warn('[BlobCursor] GSAP not loaded yet — retrying...');
      setTimeout(init, 100);
      return;
    }

    /* 모바일: pointer가 coarse(터치)인 경우 커서 비활성 */
    if (window.matchMedia('(pointer: coarse)').matches) return;

    buildCursor();
  }

  /* ── DOM 생성 ── */
  function buildCursor() {
    const gsap = window.gsap;

    /* ── 컨테이너 (fixed, 전체화면) ── */
    const container = document.createElement('div');
    container.id = 'blob-cursor-root';
    Object.assign(container.style, {
      position:      'fixed',
      top:           '0',
      left:          '0',
      width:         '100vw',
      height:        '100vh',
      pointerEvents: 'none',
      zIndex:        String(CONFIG.zIndex),
      overflow:      'hidden',
    });

    /* ── SVG goo filter ── */
    if (CONFIG.useFilter) {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      Object.assign(svg.style, { position: 'absolute', width: '0', height: '0' });

      const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
      const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
      filter.setAttribute('id', CONFIG.filterId);

      const blur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
      blur.setAttribute('in', 'SourceGraphic');
      blur.setAttribute('result', 'blur');
      blur.setAttribute('stdDeviation', String(CONFIG.filterStdDeviation));

      const matrix = document.createElementNS('http://www.w3.org/2000/svg', 'feColorMatrix');
      matrix.setAttribute('in', 'blur');
      matrix.setAttribute('mode', 'matrix');
      matrix.setAttribute('values', CONFIG.filterColorMatrix);

      filter.appendChild(blur);
      filter.appendChild(matrix);
      defs.appendChild(filter);
      svg.appendChild(defs);
      container.appendChild(svg);
    }

    /* ── blob-main 래퍼 ── */
    const blobMain = document.createElement('div');
    Object.assign(blobMain.style, {
      position:      'absolute',
      top:           '0',
      left:          '0',
      width:         '100%',
      height:        '100%',
      pointerEvents: 'none',
      userSelect:    'none',
      filter:        CONFIG.useFilter ? `url(#${CONFIG.filterId})` : 'none',
    });

    /* ── 개별 blob 생성 ── */
    const blobs = [];
    for (let i = 0; i < CONFIG.trailCount; i++) {
      const size      = CONFIG.sizes[i];
      const innerSize = CONFIG.innerSizes[i];
      const isCircle  = CONFIG.blobType === 'circle';

      const blob = document.createElement('div');
      Object.assign(blob.style, {
        position:     'absolute',
        width:        size + 'px',
        height:       size + 'px',
        borderRadius: isCircle ? '50%' : '0%',
        backgroundColor: CONFIG.fillColor,
        opacity:      String(CONFIG.opacities[i]),
        boxShadow:    `${CONFIG.shadowOffsetX}px ${CONFIG.shadowOffsetY}px ${CONFIG.shadowBlur}px 0 ${CONFIG.shadowColor}`,
        willChange:   'transform',
        transform:    'translate(-50%, -50%) translate(-9999px, -9999px)', /* 초기: 화면 밖 */
      });

      /* inner dot */
      const dot = document.createElement('div');
      const dotOffset = (size - innerSize) / 2;
      Object.assign(dot.style, {
        position:        'absolute',
        width:           innerSize + 'px',
        height:          innerSize + 'px',
        top:             dotOffset + 'px',
        left:            dotOffset + 'px',
        backgroundColor: CONFIG.innerColor,
        borderRadius:    isCircle ? '50%' : '0%',
      });

      blob.appendChild(dot);
      blobMain.appendChild(blob);
      blobs.push(blob);
    }

    container.appendChild(blobMain);
    document.body.appendChild(container);

    /* ── 상태 ── */
    let isVisible  = false;
    let isHovering = false;

    /* ── 커서 이동 핸들러 ── */
    function onMove(e) {
      const x = e.clientX !== undefined ? e.clientX : e.touches[0].clientX;
      const y = e.clientY !== undefined ? e.clientY : e.touches[0].clientY;

      /* 첫 진입 시 즉시 teleport (자연스러운 등장) */
      if (!isVisible) {
        isVisible = true;
        blobs.forEach((el) => {
          gsap.set(el, { x, y });
        });
      }

      blobs.forEach((el, i) => {
        const isLead = i === 0;
        gsap.to(el, {
          x:        x,
          y:        y,
          duration: isLead ? CONFIG.fastDuration : CONFIG.slowDuration * (1 + i * 0.15),
          ease:     isLead ? CONFIG.fastEase : CONFIG.slowEase,
          overwrite: 'auto',
        });
      });
    }

    /* ── hover shrink / grow ── */
    function shrink() {
      if (isHovering) return;
      isHovering = true;
      blobs.forEach((el, i) => {
        gsap.to(el, {
          scale:    CONFIG.shrinkScale,
          duration: CONFIG.shrinkDuration + i * 0.04,
          ease:     CONFIG.shrinkEase,
          overwrite: 'auto',
        });
      });
    }

    function grow() {
      if (!isHovering) return;
      isHovering = false;
      blobs.forEach((el, i) => {
        gsap.to(el, {
          scale:    1,
          duration: CONFIG.growDuration + i * 0.04,
          ease:     CONFIG.growEase,
          overwrite: 'auto',
        });
      });
    }

    /* ── 이벤트 등록 (delegation) ── */
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('touchmove', onMove, { passive: true });

    /* 호버 대상: event delegation */
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(CONFIG.hoverSelector)) shrink();
    }, { passive: true });

    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(CONFIG.hoverSelector)) grow();
    }, { passive: true });

    /* 커서가 윈도우 밖으로 나가면 grow 복원 */
    document.addEventListener('mouseleave', grow, { passive: true });

    /* 동적으로 추가되는 요소 대응: MutationObserver 대신 delegation으로 충분 */

    /* ── 테마 접근성: prefers-reduced-motion 대응 ── */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      /* 애니메이션 off 시 커서 제거 */
      container.remove();
      document.body.style.cursor = '';
    }
  }

  /* ── 진입점: DOM 준비 후 실행 ── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
