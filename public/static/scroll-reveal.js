/**
 * scroll-reveal.js — 인애드컴퍼니 마케팅 상세 페이지 공통 스크롤 리빌
 * IntersectionObserver 기반. 페이지 로드 시 자동 실행.
 * v2 — 7개 svc 페이지 전용 클래스 전부 커버
 */
(function () {
  'use strict';

  /* ─────────────────────────────────────────────
     애니메이션 종류별 초기 transform
  ───────────────────────────────────────────── */
  var ANIMS = {
    'fade-up':    { op: '0', tr: 'translateY(44px)' },
    'fade-down':  { op: '0', tr: 'translateY(-30px)' },
    'fade-left':  { op: '0', tr: 'translateX(54px)' },
    'fade-right': { op: '0', tr: 'translateX(-54px)' },
    'scale-up':   { op: '0', tr: 'scale(0.82) translateY(22px)' },
    'fade-in':    { op: '0', tr: 'none' },
  };

  /* ─────────────────────────────────────────────
     리빌 대상 설정
     sel      : CSS 선택자
     anim     : 애니메이션 종류
     delay    : 첫 요소 delay(ms)
     stagger  : 형제 요소간 추가 delay(ms)
     dur      : transition 시간(ms, 기본 720)
     threshold: 뷰포트 노출 비율 (기본 0.12)
  ───────────────────────────────────────────── */
  var RULES = [

    /* ── 공통: 섹션 헤더 ── */
    { sel: '.section-head',           anim: 'fade-up',    delay: 0,   dur: 700 },
    { sel: '.sec-label',              anim: 'fade-up',    delay: 0,   dur: 600 },
    { sel: '.sec-title',              anim: 'fade-up',    delay: 80,  dur: 720 },
    { sel: '.sec-sub',                anim: 'fade-up',    delay: 140, dur: 680 },

    /* ── 공통: svc-intro (좌우 분할) ── */
    { sel: '.svc-intro-text',         anim: 'fade-right', delay: 0,   dur: 780 },
    { sel: '.svc-intro-visual',       anim: 'fade-left',  delay: 160, dur: 780 },
    { sel: '.svc-feature-list li',    anim: 'fade-up',    delay: 60,  stagger: 70,  dur: 620 },

    /* ── 공통: 상품 카드 (vp) ── */
    { sel: '.vp-card',                anim: 'fade-up',    delay: 0,   stagger: 90,  dur: 680 },

    /* ── 공통: 프로세스 스텝 ── */
    { sel: '.sps-step',               anim: 'fade-up',    delay: 0,   stagger: 80,  dur: 700 },

    /* ── 공통: 성과 카드 ── */
    { sel: '.srg-card',               anim: 'fade-up',    delay: 0,   stagger: 110, dur: 700 },
    { sel: '.srg-metric',             anim: 'scale-up',   delay: 0,   stagger: 55,  dur: 600 },

    /* ── 공통: CTA ── */
    { sel: '.svc-cta-inner',          anim: 'fade-up',    delay: 0,   dur: 700 },
    { sel: '.svc-cta-text',           anim: 'fade-up',    delay: 0,   dur: 700 },
    { sel: '.svc-cta-btns',           anim: 'fade-up',    delay: 130, dur: 680 },

    /* ── 공통: 이미지 ── */
    { sel: '.siv-img-wrap',           anim: 'scale-up',   delay: 100, dur: 800 },
    { sel: '.sps-img-wrap',           anim: 'scale-up',   delay: 0,   stagger: 60,  dur: 750 },

    /* ════════════════════════════
       INFLUENCER 전용
    ════════════════════════════ */
    { sel: '.ifl-data-section',       anim: 'fade-up',    delay: 0,   dur: 700 },
    { sel: '.ifl-data-head',          anim: 'fade-up',    delay: 0,   dur: 680 },
    { sel: '.ifl-data-heading',       anim: 'fade-up',    delay: 60,  dur: 700 },
    { sel: '.ifl-data-desc',          anim: 'fade-up',    delay: 120, dur: 660 },
    { sel: '.ifl-data-counter-item',  anim: 'scale-up',   delay: 0,   stagger: 80,  dur: 680, threshold: 0.15 },
    { sel: '.ifl-data-row',           anim: 'fade-up',    delay: 0,   stagger: 100, dur: 720 },
    { sel: '.ifl-data-flow-step',     anim: 'fade-up',    delay: 0,   stagger: 90,  dur: 680 },
    { sel: '.ifl-data-img-wrap',      anim: 'scale-up',   delay: 80,  dur: 800 },
    { sel: '.ifl-data-tag',           anim: 'fade-up',    delay: 0,   stagger: 40,  dur: 560 },
    { sel: '.ifl-data-num',           anim: 'scale-up',   delay: 0,   stagger: 60,  dur: 640 },
    { sel: '.ifl-data-text',          anim: 'fade-up',    delay: 60,  dur: 640 },
    { sel: '.ifl-data-points',        anim: 'fade-up',    delay: 0,   stagger: 70,  dur: 640 },
    { sel: '.ifl-data-subhead',       anim: 'fade-up',    delay: 0,   dur: 660 },

    /* ════════════════════════════
       SEEDING 전용
    ════════════════════════════ */
    { sel: '.sdng-panel-photo',       anim: 'scale-up',   delay: 0,   stagger: 90,  dur: 760 },
    { sel: '.sdng-img-wrap',          anim: 'scale-up',   delay: 80,  dur: 800 },
    { sel: '.sdng-insta-features',    anim: 'fade-up',    delay: 0,   dur: 700 },
    { sel: '.sdng-insta-feat',        anim: 'fade-up',    delay: 0,   stagger: 80,  dur: 660 },
    { sel: '.sdng-insta-banner',      anim: 'fade-up',    delay: 60,  dur: 680 },
    { sel: '.sdng-list-best',         anim: 'fade-up',    delay: 0,   stagger: 80,  dur: 680 },
    { sel: '.sdng-best-info',         anim: 'fade-up',    delay: 0,   stagger: 70,  dur: 660 },

    /* ════════════════════════════
       SEO 전용
    ════════════════════════════ */
    { sel: '.seop-highlight-card',    anim: 'scale-up',   delay: 0,   stagger: 100, dur: 720 },
    { sel: '.seop-desc',              anim: 'fade-up',    delay: 60,  dur: 660 },
    { sel: '.seop-info',              anim: 'fade-right', delay: 0,   dur: 680 },
    { sel: '.seop-badge-row',         anim: 'fade-up',    delay: 80,  dur: 660 },
    { sel: '.seop-chip',              anim: 'fade-up',    delay: 0,   stagger: 50,  dur: 580 },

    /* ════════════════════════════
       REVIEW 전용
    ════════════════════════════ */
    { sel: '.rvt-card',               anim: 'fade-up',    delay: 0,   stagger: 110, dur: 720 },
    { sel: '.rvt-compare',            anim: 'fade-up',    delay: 60,  dur: 700 },
    { sel: '.rvt-mock-preview',       anim: 'scale-up',   delay: 80,  dur: 800 },
    { sel: '.rvt-section',            anim: 'fade-up',    delay: 0,   dur: 700 },
    { sel: '.rvt-feature-list',       anim: 'fade-up',    delay: 60,  dur: 680 },

    /* ════════════════════════════
       PPL 전용
    ════════════════════════════ */
    { sel: '.ppl-feat-card',          anim: 'fade-up',    delay: 0,   stagger: 100, dur: 700 },
    { sel: '.ppl-ep-card',            anim: 'fade-up',    delay: 0,   stagger: 110, dur: 720 },
    { sel: '.ppl-ep-visual',          anim: 'scale-up',   delay: 60,  stagger: 90,  dur: 780 },
    { sel: '.ppl-episode-banner',     anim: 'fade-up',    delay: 0,   dur: 700 },
    { sel: '.ppl-intro-desc',         anim: 'fade-up',    delay: 80,  dur: 660 },

    /* ════════════════════════════
       OLIVE YOUNG 전용
    ════════════════════════════ */
    { sel: '.oy-card',                anim: 'fade-up',    delay: 0,   stagger: 100, dur: 720 },
    { sel: '.oy-card-img-wrap',       anim: 'scale-up',   delay: 60,  stagger: 80,  dur: 760 },
    { sel: '.oy-card-list',           anim: 'fade-up',    delay: 0,   stagger: 60,  dur: 640 },
    { sel: '.oy-card-desc',           anim: 'fade-up',    delay: 80,  dur: 660 },
  ];

  /* ─────────────────────────────────────────────
     요소 초기 상태 적용
  ───────────────────────────────────────────── */
  function applyHide(el, rule) {
    var a = ANIMS[rule.anim] || ANIMS['fade-up'];
    var dur = rule.dur || 720;
    el.style.opacity    = a.op;
    el.style.transform  = a.tr;
    el.style.willChange = 'opacity, transform';
    el.style.transition = [
      'opacity ' + dur + 'ms cubic-bezier(0.22, 1, 0.36, 1)',
      'transform ' + dur + 'ms cubic-bezier(0.22, 1, 0.36, 1)',
    ].join(', ');
    el.dataset.srHidden = '1';
  }

  /* ─────────────────────────────────────────────
     요소 표시
  ───────────────────────────────────────────── */
  function applyShow(el, delay) {
    setTimeout(function () {
      el.style.opacity   = '1';
      el.style.transform = 'translateY(0) translateX(0) scale(1)';
      delete el.dataset.srHidden;
    }, delay || 0);
  }

  /* ─────────────────────────────────────────────
     그룹별 Observer 등록
  ───────────────────────────────────────────── */
  function observe(els, rule) {
    var threshold = rule.threshold || 0.12;
    var stagger   = rule.stagger   || 0;
    var baseDelay = rule.delay     || 0;

    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { applyShow(el, 0); });
      return;
    }

    /* 같은 부모 안에서 stagger 적용하기 위해 그룹핑 */
    var groups = {};
    els.forEach(function (el) {
      var key = el.parentElement ? (el.parentElement.__srKey || (el.parentElement.__srKey = 'g' + Math.random())) : 'root';
      if (!groups[key]) groups[key] = [];
      groups[key].push(el);
    });

    Object.keys(groups).forEach(function (key) {
      var group = groups[key];
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el  = entry.target;
          var idx = parseInt(el.dataset.srIdx || '0', 10);
          applyShow(el, baseDelay + idx * stagger);
          io.unobserve(el);
        });
      }, { threshold: threshold, rootMargin: '0px 0px -36px 0px' });

      group.forEach(function (el, i) {
        el.dataset.srIdx = String(i);
        io.observe(el);
      });
    });
  }

  /* ─────────────────────────────────────────────
     메인 초기화
  ───────────────────────────────────────────── */
  function init() {
    RULES.forEach(function (rule) {
      var all = Array.prototype.slice.call(document.querySelectorAll(rule.sel));
      if (!all.length) return;

      /* 히어로 섹션 내부, 이미 처리된 요소 제외 */
      var els = all.filter(function (el) {
        return (
          !el.dataset.srHidden &&
          !el.closest('.vh-hero') &&
          !el.closest('.mkt-hero')
        );
      });
      if (!els.length) return;

      /* 초기 숨김 적용 */
      els.forEach(function (el) { applyHide(el, rule); });
      /* Observer 등록 */
      observe(els, rule);
    });
  }

  /* DOM 준비 시점에 실행 */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    setTimeout(init, 80);
  }

})();
