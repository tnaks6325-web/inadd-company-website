/* ============================================
   NOVA STUDIO — Main JS

   ★ 슬라이더 동작 설계 ★
   ────────────────────────────────────────────
   [텍스트 시퀀스 — 최초 1회 실행]
     0.4s  → eyebrow 페이드인
     1.0s  → 1번 줄 한 글자씩 등장 (타이핑)
             타이핑 완료 후 2초 유지
     +2s   → 2번 줄 (강조색) 한 글자씩 등장
             타이핑 완료 후 2초 유지
     +2s   → 3번 줄 한 글자씩 등장
             타이핑 완료 후 0.8s 유지
     +0.8s → 서브카피 + CTA 페이드인
     텍스트 시퀀스 종료 이후: 텍스트 freeze
                              영상 전환만 반복

   [슬라이드 전환 — 부드러운 크로스페이드]
     SLIDE_INTERVAL = 6000ms (6초)
     FADE_DURATION  = 1000ms (dissolve 1초)
     leave 슬라이드: z-index 높게 유지 + opacity 0으로 fade-out
     enter 슬라이드: z-index 낮게 대기  + opacity 1로 드러남
     → 두 슬라이드가 겹치며 녹아드는 dissolve 효과
   ────────────────────────────────────────────
   ============================================ */

'use strict';

/* ── 1. Header scroll ── */
const header = document.getElementById('site-header');
if (header) {
  const fn = () => header.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', fn, { passive: true });
  fn();
}

/* ── 2. Mobile menu ── */
const menuToggle = document.getElementById('menuToggle');
const mainNav    = document.getElementById('mainNav');
if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const o = menuToggle.classList.toggle('open');
    mainNav.classList.toggle('open', o);
    document.body.style.overflow = o ? 'hidden' : '';
  });
  mainNav.querySelectorAll('.nav-link').forEach(a =>
    a.addEventListener('click', () => {
      menuToggle.classList.remove('open');
      mainNav.classList.remove('open');
      document.body.style.overflow = '';
    })
  );
}

/* ── 3. Active nav ── */
{
  const p = window.location.pathname;
  document.querySelectorAll('.nav-link').forEach(a => {
    const h = a.getAttribute('href');
    if (h === p || (h !== '/' && p.startsWith(h))) {
      a.style.color      = 'var(--blue-light)';
      a.style.background = 'rgba(26,107,255,0.08)';
    }
  });
}

/* ══════════════════════════════════════════════
   4. HERO SLIDER
   ══════════════════════════════════════════════ */
(function initSlider() {
  const sliderEl = document.getElementById('heroSlider');
  if (!sliderEl) return;

  const slides = Array.from(document.querySelectorAll('.yt-slide'));
  const TOTAL  = slides.length;
  if (TOTAL === 0) return;

  /* ─── 타이밍 상수 ─── */
  const SLIDE_INTERVAL = 6000;   // 슬라이드 전환 주기 (ms)
  const FADE_DURATION  = 1000;   // 크로스페이드 길이 (ms) — CSS transition과 일치

  /* ─── 텍스트 DOM ─── */
  const textLayer   = document.getElementById('heroTextLayer');
  const eyebrow     = sliderEl.querySelector('.hero-eyebrow');
  const hlLine1     = document.getElementById('hlLine1');
  const hlLine2     = document.getElementById('hlLine2');
  const hlLine3     = document.getElementById('hlLine3');
  const heroSub     = document.getElementById('heroSub');
  const heroCta     = document.getElementById('heroCta');
  const logoOverlay = document.getElementById('heroLogoOverlay');

  /* ─── 고정 카피 ─── */
  const COPY = {
    l1:  '브랜드를',
    l2:  '움직이는',
    l3:  '힘',
    sub: '데이터가 말하고, 크리에이티브가 설득하고,\n전략이 전환을 만듭니다.'
  };

  /* ─── 타이핑 커서 ─── */
  const cursor = Object.assign(document.createElement('span'), { className: 'typing-cursor' });
  const killCursor = () => { if (cursor.parentNode) cursor.parentNode.removeChild(cursor); };

  /* ─── 한 줄 타이핑 ───
     el        : 대상 span
     text      : 문자열
     charMs    : 글자 간격 (ms)
     onDone    : 완료 콜백                */
  function typeInto(el, text, charMs, onDone) {
    el.innerHTML = '';
    el.appendChild(cursor);
    el.classList.add('show');   // CSS: opacity 0→1, translateY 사라짐

    let idx = 0;
    function tick() {
      if (idx < text.length) {
        el.insertBefore(document.createTextNode(text[idx++]), cursor);
        setTimeout(tick, charMs);
      } else {
        killCursor();
        if (onDone) onDone();
      }
    }
    tick();
  }

  /* ─── 텍스트 시퀀스 (최초 1회) ───
     각 줄이 타이핑 완료 → 2초 유지 → 다음 줄
     마지막 줄 완료 → 0.8s 후 서브카피 + CTA + 로고 동시 등장
     그 이후 텍스트는 고정 (영상만 계속 전환)                   */
  let seqDone = false;

  function runTextSequence() {
    const CHAR_MS  = 80;    // 글자당 80ms — 자연스러운 타이핑 속도
    const LINE_GAP = 2000;  // 줄 등장 후 다음 줄까지 대기 (ms)

    /* 0.4s — eyebrow */
    setTimeout(() => {
      if (eyebrow) eyebrow.classList.add('show');
    }, 400);

    /* 1.0s — 1번 줄 */
    setTimeout(() => {
      typeInto(hlLine1, COPY.l1, CHAR_MS, () => {
        // 타이핑 완료 → LINE_GAP 후 2번 줄
        setTimeout(() => {
          typeInto(hlLine2, COPY.l2, CHAR_MS, () => {
            // LINE_GAP 후 3번 줄
            setTimeout(() => {
              typeInto(hlLine3, COPY.l3, CHAR_MS, () => {
                // 마지막 줄 타이핑 완료 → 0.8s 유지 → 서브카피+CTA+로고
                setTimeout(() => {
                  /* 서브카피 */
                  if (heroSub) {
                    heroSub.textContent = COPY.sub;
                    heroSub.classList.add('show');
                  }
                  /* CTA — 0.35s 딜레이 */
                  setTimeout(() => {
                    if (heroCta) heroCta.classList.add('show');
                  }, 350);
                  /* 로고 오버레이 — 0.7s 딜레이 */
                  setTimeout(() => {
                    if (logoOverlay) logoOverlay.classList.add('show');
                  }, 700);

                  seqDone = true; // 이후 영상 전환만 진행
                }, 800);
              });
            }, LINE_GAP);
          });
        }, LINE_GAP);
      });
    }, 1000);
  }

  /* ─── 슬라이드 전환 (크로스페이드 dissolve) ───
     leave: z-index를 active보다 위(3)로 올린 채 opacity 0 → 페이드아웃처럼 보임
     enter: z-index 2로 이미 렌더링된 상태에서 드러남
     결과: 두 영상이 겹치며 자연스럽게 녹아드는 dissolve 효과              */
  let current    = 0;
  let isChanging = false;
  let slideTimer = null;

  function goTo(next) {
    if (isChanging || next === current) return;
    isChanging = true;

    const prev = current;
    current    = next;

    /* enter: 미리 보여줄 슬라이드 z-index 2 (leave 뒤) */
    slides[current].classList.add('active');

    /* leave: z-index 3으로 올려서 위에서 페이드아웃 */
    slides[prev].classList.add('leaving');
    slides[prev].classList.remove('active');

    /* FADE_DURATION 후 leaving 클래스 제거 */
    setTimeout(() => {
      slides[prev].classList.remove('leaving');
      isChanging = false;
    }, FADE_DURATION + 100);
  }

  function scheduleNext() {
    clearTimeout(slideTimer);
    slideTimer = setTimeout(() => {
      goTo((current + 1) % TOTAL);
      scheduleNext();
    }, SLIDE_INTERVAL);
  }

  /* ─── 초기화 ─── */
  slides.forEach(s => s.classList.remove('active', 'leaving'));
  slides[0].classList.add('active');

  runTextSequence();   // 텍스트 시퀀스 시작 (1회)
  scheduleNext();      // 슬라이드 자동 전환 시작

})();


/* ── 5. Count-up animation ── */
{
  const cs = document.querySelectorAll('[data-count]');
  if (cs.length) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el  = e.target;
        const end = parseInt(el.getAttribute('data-count'), 10);
        const dur = 1800;
        const s0  = performance.now();
        (function tick(now) {
          const t = Math.min((now - s0) / dur, 1);
          el.textContent = Math.floor((1 - Math.pow(1 - t, 3)) * end).toLocaleString();
          if (t < 1) requestAnimationFrame(tick);
        })(s0);
        io.unobserve(el);
      });
    }, { threshold: 0.5 });
    cs.forEach(c => io.observe(c));
  }
}

/* ── 6. Scroll reveal ── */
{
  const els = document.querySelectorAll(
    '.svc-card, .testi-card, .stat-block, .work-feat, .wf-thumb'
  );
  if (els.length) {
    els.forEach(el => {
      el.style.opacity    = '0';
      el.style.transform  = 'translateY(24px)';
      el.style.transition = 'opacity 0.65s ease, transform 0.65s ease';
    });
    const io = new IntersectionObserver(entries => {
      entries.forEach((e, i) => {
        if (!e.isIntersecting) return;
        setTimeout(() => {
          e.target.style.opacity   = '1';
          e.target.style.transform = 'translateY(0)';
        }, i * 80);
        io.unobserve(e.target);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
    els.forEach(el => io.observe(el));
  }
}
