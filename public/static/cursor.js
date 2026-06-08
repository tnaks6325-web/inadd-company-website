/**
 * Custom Cursor — 순수 JS + CSS transition
 * dot(작은 원) + ring(따라오는 링)
 * GSAP 없음, 외부 의존성 없음
 */
(function () {
  'use strict';

  // 모바일/터치 기기는 커스텀 커서 비활성
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

  var dot  = document.getElementById('cursorDot');
  var ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;

  // 커스텀 커서 활성 — 기본 커서 숨김
  document.body.classList.add('cursor-ready');

  var mouseX = -200, mouseY = -200;
  var ringX  = -200, ringY  = -200;
  var raf = null;

  // 마우스 이동 — dot은 즉시, ring은 lerp으로 따라옴
  document.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    // dot 즉시 이동 (CSS transform)
    dot.style.transform = 'translate(' + (mouseX - 4) + 'px, ' + (mouseY - 4) + 'px)';
    if (!raf) raf = requestAnimationFrame(lerpRing);
  }, { passive: true });

  // ring lerp 루프
  function lerpRing() {
    var dx = mouseX - ringX;
    var dy = mouseY - ringY;
    ringX += dx * 0.15;
    ringY += dy * 0.15;
    ring.style.transform = 'translate(' + (ringX - 18) + 'px, ' + (ringY - 18) + 'px)';
    if (Math.abs(dx) > 0.3 || Math.abs(dy) > 0.3) {
      raf = requestAnimationFrame(lerpRing);
    } else {
      raf = null;
    }
  }

  // 페이지 진입 시 커서 표시
  document.addEventListener('mouseenter', function () {
    dot.style.opacity  = '1';
    ring.style.opacity = '1';
  });

  // 페이지 이탈 시 커서 숨김
  document.addEventListener('mouseleave', function () {
    dot.style.opacity  = '0';
    ring.style.opacity = '0';
  });

  // 클릭 시 ring 확대 효과
  document.addEventListener('mousedown', function () {
    ring.classList.add('cursor-ring--click');
    dot.classList.add('cursor-dot--click');
  });
  document.addEventListener('mouseup', function () {
    ring.classList.remove('cursor-ring--click');
    dot.classList.remove('cursor-dot--click');
  });

  // 링크/버튼 hover 시 ring 확대
  function onEnterHoverable() {
    ring.classList.add('cursor-ring--hover');
    dot.classList.add('cursor-dot--hover');
  }
  function onLeaveHoverable() {
    ring.classList.remove('cursor-ring--hover');
    dot.classList.remove('cursor-dot--hover');
  }

  // 동적으로 추가되는 요소도 포함하도록 이벤트 위임
  document.addEventListener('mouseover', function (e) {
    var el = e.target;
    if (el && (el.tagName === 'A' || el.tagName === 'BUTTON' ||
        el.closest('a') || el.closest('button') ||
        window.getComputedStyle(el).cursor === 'pointer')) {
      onEnterHoverable();
    }
  }, { passive: true });
  document.addEventListener('mouseout', function (e) {
    var el = e.target;
    if (el && (el.tagName === 'A' || el.tagName === 'BUTTON' ||
        el.closest('a') || el.closest('button') ||
        window.getComputedStyle(el).cursor === 'pointer')) {
      onLeaveHoverable();
    }
  }, { passive: true });

})();
