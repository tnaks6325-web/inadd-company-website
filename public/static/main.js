/* ============================================
   NOVA STUDIO — Main JS
   YouTube Slider + Animations
   ============================================ */

'use strict';

// ── 1. Header scroll ─────────────────────────
const header = document.getElementById('site-header');
if (header) {
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ── 2. Mobile menu ───────────────────────────
const menuToggle = document.getElementById('menuToggle');
const mainNav    = document.getElementById('mainNav');
if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const open = menuToggle.classList.toggle('open');
    mainNav.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  mainNav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('open');
      mainNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ── 3. Active nav ────────────────────────────
const path = window.location.pathname;
document.querySelectorAll('.nav-link').forEach(a => {
  const href = a.getAttribute('href');
  if (href === path || (href !== '/' && path.startsWith(href))) {
    a.style.color    = 'var(--blue-light)';
    a.style.background = 'rgba(26,107,255,0.08)';
  }
});


// ── 4. YouTube Slider ─────────────────────────
(function initSlider() {
  const sliderEl      = document.getElementById('heroSlider');
  if (!sliderEl) return;

  const slides        = Array.from(document.querySelectorAll('.yt-slide'));
  const dots          = Array.from(document.querySelectorAll('.slide-dot'));
  const progressFill  = document.getElementById('slideProgressFill');
  const currentNumEl  = document.getElementById('slideCurrentNum');
  const brandReveal   = document.getElementById('heroBrandReveal');

  const TOTAL         = slides.length;
  const SLIDE_DURATION = 7000;   // ms per slide
  const TRANSITION_MS  = 900;    // CSS transition duration

  let current   = 0;
  let timer     = null;
  let progTimer = null;
  let progStart = null;
  let paused    = false;

  // 슬라이드 카피 데이터
  const copies = [
    { w1: '콘텐츠가',   w2: '바이럴이',   w3: '되는 순간',     sub: '보여지는 것을 넘어, 퍼지게 만드는 전략' },
    { w1: '데이터가',   w2: '전략이',     w3: '되는 방법',     sub: '숫자와 감성이 만나는 마케팅의 교차점' },
    { w1: '브랜드를',   w2: '움직이는',   w3: '힘',           sub: '12년의 경험이 만드는 결과의 차이' },
    { w1: '성과로',     w2: '이어지는',   w3: '크리에이티브', sub: '아름다운 것이 아닌, 팔리는 것을 만듭니다' },
    { w1: '플랫폼을',   w2: '지배하는',   w3: '콘텐츠',       sub: '알고리즘이 먼저 찾는 콘텐츠 설계' },
    { w1: '',           w2: '',           w3: '',             sub: '' }, // 마지막: 브랜드 리빌
  ];

  const heroHeadline = document.getElementById('heroHeadline');
  const hlWord1      = document.getElementById('hlWord1');
  const hlWord2      = document.getElementById('hlWord2');
  const hlWord3      = document.getElementById('hlWord3');
  const heroSub      = document.getElementById('heroSub');
  const heroEyebrow  = document.getElementById('heroEyebrow');
  const heroCta      = document.getElementById('heroCta');

  // 텍스트 업데이트
  function updateCopy(idx) {
    const c = copies[idx];
    const isBrand = (idx === TOTAL - 1);

    if (hlWord1) hlWord1.textContent = c.w1;
    if (hlWord2) hlWord2.textContent = c.w2;
    if (hlWord3) hlWord3.textContent = c.w3;
    if (heroSub)  heroSub.textContent = c.sub;
  }

  // 텍스트 애니메이션 in
  function animateTextIn(idx) {
    const isBrand = (idx === TOTAL - 1);

    // 텍스트 숨김
    [heroEyebrow, hlWord1, hlWord2, hlWord3, heroSub, heroCta].forEach(el => {
      if (!el) return;
      el.classList.remove('visible');
    });

    if (isBrand) {
      // 브랜드 리빌 모드
      sliderEl.classList.add('brand-mode');
      setTimeout(() => {
        if (brandReveal) brandReveal.classList.add('show');
      }, 300);
      return;
    }

    // 일반 슬라이드
    sliderEl.classList.remove('brand-mode');
    if (brandReveal) brandReveal.classList.remove('show');

    updateCopy(idx);

    // 순차 등장
    setTimeout(() => { if (heroEyebrow) heroEyebrow.classList.add('visible'); }, 200);
    setTimeout(() => { if (hlWord1)     hlWord1.classList.add('visible'); },     350);
    setTimeout(() => { if (hlWord2) { hlWord2.classList.add('visible'); } }, 500);
    setTimeout(() => { if (hlWord3)     hlWord3.classList.add('visible'); },     650);
    setTimeout(() => { if (heroSub)     heroSub.classList.add('visible'); },     700);
    setTimeout(() => { if (heroCta)     heroCta.classList.add('visible'); },     800);
  }

  // 슬라이드 전환
  function goTo(idx, direction = 'next') {
    if (idx === current) return;

    const prev = current;
    current = idx;

    // 이전 슬라이드: active → prev (좌측으로 빠짐)
    slides[prev].classList.remove('active');
    slides[prev].classList.add('prev');
    setTimeout(() => slides[prev].classList.remove('prev'), TRANSITION_MS + 50);

    // 새 슬라이드: active
    slides[current].classList.remove('prev');
    slides[current].classList.add('active');

    // 인디케이터
    dots.forEach((d, i) => d.classList.toggle('active', i === current));

    // 카운터
    if (currentNumEl) {
      currentNumEl.textContent = String(current + 1).padStart(2, '0');
    }

    // 텍스트
    animateTextIn(current);

    // 프로그레스 재시작
    restartProgress();
  }

  function nextSlide() {
    const next = (current + 1) % TOTAL;
    goTo(next, 'next');
  }

  // 자동 진행 타이머
  function startTimer() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (!paused) nextSlide();
    }, SLIDE_DURATION);
  }

  // 진행 바 애니메이션
  function restartProgress() {
    if (!progressFill) return;
    clearInterval(progTimer);
    progressFill.style.transition = 'none';
    progressFill.style.width = '0%';

    progStart = performance.now();
    progTimer = requestAnimationFrame(function tick(now) {
      if (paused) { progTimer = requestAnimationFrame(tick); return; }
      const elapsed = now - progStart;
      const pct = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
      progressFill.style.transition = 'none';
      progressFill.style.width = pct + '%';
      if (pct < 100) {
        progTimer = requestAnimationFrame(tick);
      }
    });

    startTimer();
  }

  // 인디케이터 클릭
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      clearTimeout(timer);
      goTo(i);
    });
  });

  // Hover pause
  sliderEl.addEventListener('mouseenter', () => { paused = true; });
  sliderEl.addEventListener('mouseleave', () => {
    paused = false;
    progStart = performance.now() - (parseFloat(progressFill?.style.width || '0') / 100) * SLIDE_DURATION;
  });

  // 초기화
  slides.forEach(s => s.classList.remove('active', 'prev'));
  slides[0].classList.add('active');
  dots[0]?.classList.add('active');
  animateTextIn(0);
  restartProgress();

})(); // end initSlider


// ── 5. Count-up Animation ────────────────────
function countUp(el) {
  const target = parseInt(el.getAttribute('data-count'), 10);
  if (isNaN(target)) return;
  const dur = 1800;
  const start = performance.now();
  (function step(now) {
    const t = Math.min((now - start) / dur, 1);
    const ease = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.floor(ease * target).toLocaleString();
    if (t < 1) requestAnimationFrame(step);
  })(start);
}

const counters = document.querySelectorAll('[data-count]');
if (counters.length) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        countUp(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => io.observe(c));
}


// ── 6. Scroll Reveal ────────────────────────
const revealTargets = document.querySelectorAll(
  '.svc-card, .wf-thumb, .testi-card, .stat-block, .work-feat'
);
if (revealTargets.length) {
  revealTargets.forEach(el => el.classList.add('reveal'));
  const revealIO = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        revealIO.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  revealTargets.forEach(el => revealIO.observe(el));
}
