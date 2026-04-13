/* ============================================
   NOVA STUDIO — Main JS

   ★ 히어로 & 로고 섹션 동작 설계 ★
   ────────────────────────────────────────────
   [히어로 섹션 — IntersectionObserver]
   • 히어로가 화면에 50% 이상 보일 때 → 텍스트 시퀀스 (재)시작
   • 히어로가 뷰포트를 벗어나면 → 텍스트/타이머 모두 리셋
   • 즉, 스크롤로 내려갔다가 올라오면 처음부터 다시 재생

   [로고 섹션 — 스크롤 두 번째 뷰]
   • hero 바로 아래에 100vh 풀스크린 검은 배경 섹션
   • IntersectionObserver로 60% 진입 시 .visible 부여 → 로고 등장
   • 섹션을 벗어나면 .visible 제거 → 다음에 다시 들어올 때 재등장

   [슬라이드 전환]
   • 6초마다 크로스페이드 dissolve 전환
   • 텍스트 시퀀스와 독립 실행
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
   4. HERO SLIDER + 텍스트 시퀀스
   ══════════════════════════════════════════════ */
(function initSlider() {
  const sliderEl = document.getElementById('heroSlider');
  if (!sliderEl) return;

  const slides = Array.from(document.querySelectorAll('.yt-slide'));
  const TOTAL  = slides.length;
  if (TOTAL === 0) return;

  /* ─── 타이밍 상수 ─── */
  const SLIDE_INTERVAL = 6000;  // 슬라이드 전환 주기
  const FADE_DURATION  = 1000;  // dissolve 시간 (CSS와 동일)

  /* ─── 텍스트 DOM ─── */
  const eyebrow  = sliderEl.querySelector('.hero-eyebrow');
  const hlLine1  = document.getElementById('hlLine1');
  const hlLine2  = document.getElementById('hlLine2');
  const hlLine3  = document.getElementById('hlLine3');
  const heroSub  = document.getElementById('heroSub');
  const heroCta  = document.getElementById('heroCta');

  /* ─── 카피 ─── */
  const COPY = {
    l1:  '브랜드를',
    l2:  '움직이는',
    l3:  '힘',
    sub: '데이터가 말하고, 크리에이티브가 설득하고,\n전략이 전환을 만듭니다.'
  };

  /* ─── 타이핑 커서 ─── */
  const cursor = Object.assign(document.createElement('span'), { className: 'typing-cursor' });
  const killCursor = () => { if (cursor.parentNode) cursor.parentNode.removeChild(cursor); };

  /* ─── 텍스트 전체 리셋 ─── */
  function resetText() {
    killCursor();
    [hlLine1, hlLine2, hlLine3].forEach(el => {
      if (!el) return;
      el.innerHTML = '';
      el.classList.remove('show');
    });
    if (eyebrow)  eyebrow.classList.remove('show');
    if (heroSub)  { heroSub.textContent = ''; heroSub.classList.remove('show'); }
    if (heroCta)  heroCta.classList.remove('show');
  }

  /* ─── 한 줄 타이핑 ─── */
  function typeInto(el, text, charMs, onDone) {
    el.innerHTML = '';
    el.appendChild(cursor);
    el.classList.add('show');
    let idx = 0;
    function tick() {
      if (!activeSeqId) return; // 시퀀스가 취소되면 즉시 중단
      if (idx < text.length) {
        el.insertBefore(document.createTextNode(text[idx++]), cursor);
        seqTimers.push(setTimeout(tick, charMs));
      } else {
        killCursor();
        if (onDone) onDone();
      }
    }
    tick();
  }

  /* ─── 텍스트 시퀀스 관리 ─── */
  let seqTimers   = [];   // 현재 진행 중인 타이머 ID 목록
  let activeSeqId = 0;    // 현재 시퀀스 버전 ID (취소 판별)

  function clearSeq() {
    activeSeqId = 0;
    seqTimers.forEach(clearTimeout);
    seqTimers = [];
  }

  /* ─── 텍스트 시퀀스 실행 ───
     히어로가 뷰포트에 진입할 때마다 리셋 후 재실행 */
  function runTextSequence() {
    clearSeq();
    resetText();

    const seqId = ++activeSeqId;  // 이 시퀀스의 고유 ID
    const push  = (fn, ms) => {
      const t = setTimeout(() => {
        if (activeSeqId !== seqId) return; // 취소됐으면 무시
        fn();
      }, ms);
      seqTimers.push(t);
      return t;
    };

    const CHAR_MS  = 80;
    const LINE_GAP = 2000;

    // 0.4s: eyebrow
    push(() => eyebrow && eyebrow.classList.add('show'), 400);

    // 1.0s: 1번 줄 타이핑
    push(() => {
      typeInto(hlLine1, COPY.l1, CHAR_MS, () => {
        // 타이핑 완료 → LINE_GAP 후 2번 줄
        push(() => {
          typeInto(hlLine2, COPY.l2, CHAR_MS, () => {
            push(() => {
              typeInto(hlLine3, COPY.l3, CHAR_MS, () => {
                // 마지막 줄 완료 → 0.8s 후 서브카피+CTA
                push(() => {
                  if (heroSub) {
                    heroSub.textContent = COPY.sub;
                    heroSub.classList.add('show');
                  }
                  push(() => heroCta && heroCta.classList.add('show'), 350);
                }, 800);
              });
            }, LINE_GAP);
          });
        }, LINE_GAP);
      });
    }, 1000);
  }

  /* ─── 히어로 뷰포트 감지 ───
     히어로가 40% 이상 보이면 시퀀스 시작
     히어로가 완전히 벗어나면 리셋 (다음 복귀 때 재시작 준비) */
  const heroObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // 히어로 진입 → 시퀀스 (재)시작
        runTextSequence();
      } else {
        // 히어로 이탈 → 리셋 (다음 복귀 때 재시작)
        clearSeq();
        resetText();
      }
    });
  }, {
    threshold: 0.4   // 40% 이상 보일 때 진입 판정
  });
  heroObserver.observe(sliderEl);

  /* ─── 슬라이드 전환 (크로스페이드 dissolve) ─── */
  let current    = 0;
  let isChanging = false;
  let slideTimer = null;

  function goTo(next) {
    if (isChanging || next === current) return;
    isChanging = true;
    const prev = current;
    current    = next;
    slides[current].classList.add('active');
    slides[prev].classList.add('leaving');
    slides[prev].classList.remove('active');
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
  scheduleNext();  // 슬라이드 전환은 항상 실행 (텍스트와 독립)

})();


/* ══════════════════════════════════════════════
   5. LOGO SECTION — 스크롤 두 번째 뷰 등장
   ══════════════════════════════════════════════ */
(function initLogoSection() {
  const section = document.getElementById('logoSection');
  if (!section) return;

  const inner = section.querySelector('.ls-inner');

  /* 섹션이 60% 이상 진입하면 .visible → 로고 등장
     섹션을 벗어나면 .visible 제거 → 다음에 다시 들어오면 재등장 */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        section.classList.add('visible');
      } else {
        section.classList.remove('visible');
      }
    });
  }, {
    threshold: 0.6   // 60% 보일 때 등장
  });

  observer.observe(section);
})();


/* ── 6. Count-up animation ── */
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

/* ── 7. Scroll reveal ── */
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
