/**
 * BlobCursor — Vanilla JS IIFE
 * 공 1개, GSAP 기반, hover shrink
 * 의존성: GSAP (window.gsap)
 */
(function () {
  'use strict';

  /* ── 설정 ── */
  const SIZE        = 40;           /* 공 크기 (px) */
  const COLOR       = '#1a6bff';    /* 브랜드 블루 */
  const MOVE_DUR    = 0.12;         /* 이동 속도 (초) */
  const MOVE_EASE   = 'power3.out';
  const SHRINK_TO   = 0.4;          /* 호버 시 축소 비율 */
  const SHRINK_DUR  = 0.22;
  const GROW_DUR    = 0.32;
  const EASE_SHRINK = 'power2.out';
  const EASE_GROW   = 'elastic.out(1, 0.5)';
  const Z_INDEX     = 99999;

  const HOVER_SEL = [
    'a[href]', 'button', '[role="button"]',
    'input[type="submit"]', 'input[type="button"]',
    'label[for]', '.nav-link', '.hero-cta-btn', '.cta-btn',
    '.ndm-item', '.admin-login-btn',
  ].join(', ');

  /* ── GSAP 로드 대기 ── */
  function init() {
    if (typeof window.gsap === 'undefined') {
      setTimeout(init, 80);
      return;
    }
    /* 터치 기기는 스킵 */
    if (window.matchMedia('(pointer: coarse)').matches) return;
    /* prefers-reduced-motion 스킵 */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    build();
  }

  function build() {
    const gsap = window.gsap;

    /* ── 커서 엘리먼트 생성 ── */
    const el = document.createElement('div');
    el.id = 'blob-cursor';
    Object.assign(el.style, {
      position:        'fixed',
      top:             '0px',
      left:            '0px',
      width:           SIZE + 'px',
      height:          SIZE + 'px',
      borderRadius:    '50%',
      backgroundColor: COLOR,
      pointerEvents:   'none',
      zIndex:          String(Z_INDEX),
      willChange:      'transform',
      /* 초기: 화면 밖 */
      transform:       'translate(-9999px, -9999px) translate(-50%, -50%)',
      /* 글로우 */
      boxShadow:       '0 0 18px 4px rgba(26,107,255,0.45)',
    });

    document.body.appendChild(el);

    /* GSAP quickTo — 가장 부드러운 방법 */
    const moveX = gsap.quickTo(el, 'x', { duration: MOVE_DUR, ease: MOVE_EASE });
    const moveY = gsap.quickTo(el, 'y', { duration: MOVE_DUR, ease: MOVE_EASE });

    let appeared  = false;
    let hovering  = false;

    /* ── 마우스 이동 ── */
    window.addEventListener('mousemove', (e) => {
      if (!appeared) {
        /* 첫 등장: 순간이동 후 이동 시작 */
        gsap.set(el, { x: e.clientX, y: e.clientY });
        appeared = true;
      }
      moveX(e.clientX);
      moveY(e.clientY);
    }, { passive: true });

    /* ── Shrink: hover 대상 진입 ── */
    function onEnter() {
      if (hovering) return;
      hovering = true;
      gsap.to(el, {
        scale:    SHRINK_TO,
        duration: SHRINK_DUR,
        ease:     EASE_SHRINK,
        overwrite: true,
      });
    }

    /* ── Grow: hover 대상 이탈 ── */
    function onLeave() {
      if (!hovering) return;
      hovering = false;
      gsap.to(el, {
        scale:    1,
        duration: GROW_DUR,
        ease:     EASE_GROW,
        overwrite: true,
      });
    }

    /* ── 이벤트 바인딩: 현재 DOM ── */
    function bindHover(root) {
      root.querySelectorAll(HOVER_SEL).forEach((node) => {
        node.addEventListener('mouseenter', onEnter, { passive: true });
        node.addEventListener('mouseleave', onLeave, { passive: true });
      });
    }

    /* 초기 바인딩 */
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => bindHover(document));
    } else {
      bindHover(document);
    }

    /* 동적으로 추가되는 요소 대응 (드롭다운 메뉴 등) */
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        m.addedNodes.forEach((node) => {
          if (node.nodeType === 1) bindHover(node);
        });
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    /* 윈도우 이탈 시 원래 크기로 복원 */
    document.addEventListener('mouseleave', onLeave, { passive: true });
  }

  /* ── 진입점 ── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
