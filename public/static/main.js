/* ============================================
   NOVA STUDIO — Main JS
   - YouTube 전체재생 슬라이더 (0.25s 촤르륵)
   - 타이핑 효과 (5초 유지)
   - 5초 후 로고 등장
   ============================================ */

'use strict';

/* ── 1. Header scroll ── */
const header = document.getElementById('site-header');
if (header) {
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ── 2. Mobile menu ── */
const menuToggle = document.getElementById('menuToggle');
const mainNav    = document.getElementById('mainNav');
if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const open = menuToggle.classList.toggle('open');
    mainNav.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  mainNav.querySelectorAll('.nav-link').forEach(a =>
    a.addEventListener('click', () => {
      menuToggle.classList.remove('open');
      mainNav.classList.remove('open');
      document.body.style.overflow = '';
    })
  );
}

/* ── 3. Active nav link ── */
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

/* ──────────────────────────────────────────
   4. YOUTUBE SLIDER
   - 모든 영상이 처음부터 autoplay + mute 재생
   - 슬라이드 전환: 0.25s translateX
   - 타이핑 카피 5초 유지
   - 5초 후 로고 오버레이 등장
   - 무한 반복
   ────────────────────────────────────────── */
(function initSlider() {
  const sliderEl  = document.getElementById('heroSlider');
  if (!sliderEl) return;

  const slides    = Array.from(document.querySelectorAll('.yt-slide'));
  const TOTAL     = slides.length;          // 6
  const SLIDE_DUR = 1800;  // ms — 각 슬라이드가 보이는 시간 (빠른 슬라이드)

  // 타이핑 설정
  const COPY_SHOW_MS  = 5000;  // 메인 문구 표시 시간 (5초)
  const LOGO_DELAY_MS = 5000;  // 로고 등장 딜레이 (5초)

  // 텍스트 레이어 엘리먼트
  const textLayer  = document.getElementById('heroTextLayer');
  const eyebrow    = sliderEl.querySelector('.hero-eyebrow');
  const hlLine1    = document.getElementById('hlLine1');
  const hlLine2    = document.getElementById('hlLine2');
  const hlLine3    = document.getElementById('hlLine3');
  const heroSub    = document.getElementById('heroSub');
  const heroCta    = document.getElementById('heroCta');
  const logoOverlay = document.getElementById('heroLogoOverlay');

  // 슬라이드별 카피
  const COPIES = [
    { l1: '콘텐츠가',   l2: '바이럴이',     l3: '되는 순간',     sub: '보여지는 것을 넘어, 퍼지게 만드는 전략' },
    { l1: '데이터가',   l2: '전략이',       l3: '되는 방법',     sub: '숫자와 감성이 만나는 마케팅의 교차점' },
    { l1: '브랜드를',   l2: '움직이는',     l3: '힘',           sub: '12년의 경험이 만드는 결과의 차이' },
    { l1: '성과로',     l2: '이어지는',     l3: '크리에이티브', sub: '아름다운 것이 아닌, 팔리는 것을 만듭니다' },
    { l1: '플랫폼을',   l2: '지배하는',     l3: '콘텐츠',       sub: '알고리즘이 먼저 찾는 콘텐츠 설계' },
    { l1: '바이럴은',   l2: '우연이',       l3: '아닙니다',     sub: '철저하게 설계된 전략의 산물' },
  ];

  let current    = 0;
  let sliderTimer = null;
  let logoTimer   = null;
  let isSliding   = false;  // 전환 중 중복 방지

  /* ─── 타이핑 관련 ─── */
  let typingRafs  = [];   // 진행 중인 타이핑 타이머들
  let typingDone  = false;

  // 커서 엘리먼트 (단 하나, 현재 타이핑 중인 줄에 붙음)
  const cursor = document.createElement('span');
  cursor.className = 'typing-cursor';

  function clearTyping() {
    typingRafs.forEach(id => clearTimeout(id));
    typingRafs = [];
    if (cursor.parentNode) cursor.parentNode.removeChild(cursor);
  }

  /**
   * 특정 엘리먼트에 텍스트를 글자 단위로 타이핑
   * @param {HTMLElement} el   대상 엘리먼트
   * @param {string}      text 타이핑할 텍스트
   * @param {number}      startDelay 시작 딜레이(ms)
   * @param {number}      charInterval 글자간 간격(ms)
   * @param {Function}    onDone 완료 콜백
   */
  function typeText(el, text, startDelay, charInterval, onDone) {
    el.textContent = '';
    el.appendChild(cursor);

    const id = setTimeout(() => {
      let i = 0;
      function nextChar() {
        if (i < text.length) {
          // cursor 앞에 글자 삽입
          el.insertBefore(document.createTextNode(text[i]), cursor);
          i++;
          const t = setTimeout(nextChar, charInterval);
          typingRafs.push(t);
        } else {
          if (onDone) onDone();
        }
      }
      nextChar();
    }, startDelay);
    typingRafs.push(id);
  }

  /* ─── 텍스트 등장 시퀀스 ─── */
  function startTextSequence(copyIdx) {
    clearTyping();
    typingDone = false;

    const copy = COPIES[copyIdx] || COPIES[0];

    // 초기화
    if (hlLine1) hlLine1.textContent = '';
    if (hlLine2) hlLine2.textContent = '';
    if (hlLine3) hlLine3.textContent = '';
    if (heroSub)  heroSub.textContent  = '';
    if (heroSub)  heroSub.classList.remove('show');
    if (heroCta)  heroCta.classList.remove('show');
    if (eyebrow)  eyebrow.classList.remove('show');
    if (logoOverlay) logoOverlay.classList.remove('show');
    if (textLayer)   textLayer.classList.remove('hide-for-logo');

    // eyebrow 등장 (200ms)
    const t0 = setTimeout(() => {
      if (eyebrow) eyebrow.classList.add('show');
    }, 200);
    typingRafs.push(t0);

    // 글자 속도 (전체 텍스트 길이에 따라 조정)
    const allText = copy.l1 + copy.l2 + copy.l3;
    const CHAR_INTERVAL = Math.min(70, Math.floor(2000 / Math.max(allText.length, 1)));

    let line1Duration = copy.l1.length * CHAR_INTERVAL;
    let line2Duration = copy.l2.length * CHAR_INTERVAL;

    // 1줄 타이핑 시작 (400ms 딜레이)
    typeText(hlLine1, copy.l1, 400, CHAR_INTERVAL, () => {
      // 2줄 타이핑 시작
      if (hlLine2) {
        hlLine2.appendChild(cursor);
        typeText(hlLine2, copy.l2, 0, CHAR_INTERVAL, () => {
          // 3줄 타이핑 시작
          if (hlLine3) {
            hlLine3.appendChild(cursor);
            typeText(hlLine3, copy.l3, 0, CHAR_INTERVAL, () => {
              // 커서 제거
              if (cursor.parentNode) cursor.parentNode.removeChild(cursor);

              // sub 등장
              const ts = setTimeout(() => {
                if (heroSub) {
                  heroSub.textContent = copy.sub;
                  heroSub.classList.add('show');
                }
              }, 150);
              typingRafs.push(ts);

              // CTA 등장
              const tc = setTimeout(() => {
                if (heroCta) heroCta.classList.add('show');
              }, 400);
              typingRafs.push(tc);

              typingDone = true;
            });
          }
        });
      }
    });

    // ── 5초 후 로고 등장 ──
    clearTimeout(logoTimer);
    logoTimer = setTimeout(() => {
      showLogo();
    }, LOGO_DELAY_MS);
  }

  function showLogo() {
    if (textLayer) textLayer.classList.add('hide-for-logo');
    if (logoOverlay) logoOverlay.classList.add('show');
  }

  function hideLogo() {
    if (textLayer) textLayer.classList.remove('hide-for-logo');
    if (logoOverlay) logoOverlay.classList.remove('show');
  }

  /* ─── 슬라이드 전환 ─── */
  function goTo(nextIdx) {
    if (isSliding) return;
    isSliding = true;

    const prevIdx = current;
    current = nextIdx;

    // 로고 숨김
    hideLogo();
    clearTimeout(logoTimer);

    // prev 슬라이드: leaving (왼쪽으로)
    slides[prevIdx].classList.remove('active');
    slides[prevIdx].classList.add('leaving');

    // next 슬라이드: active (오른쪽→중앙)
    slides[current].classList.remove('leaving');
    slides[current].classList.add('active');

    // 0.25s 후 leaving 클래스 제거
    setTimeout(() => {
      slides[prevIdx].classList.remove('leaving');
      isSliding = false;
    }, 260);

    // 텍스트 시퀀스 시작
    startTextSequence(current);

    // 다음 슬라이드 스케줄
    scheduleNext();
  }

  function scheduleNext() {
    clearTimeout(sliderTimer);
    sliderTimer = setTimeout(() => {
      const next = (current + 1) % TOTAL;
      goTo(next);
    }, SLIDE_DUR);
  }

  /* ─── 초기화 ─── */
  function init() {
    // 모든 슬라이드 초기 상태
    slides.forEach((s, i) => {
      s.classList.remove('active', 'leaving');
    });
    slides[0].classList.add('active');
    current = 0;

    // 텍스트 시퀀스 시작
    startTextSequence(0);

    // 슬라이드 자동 진행
    scheduleNext();
  }

  init();

})();

/* ── 5. Count-up ── */
{
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el  = entry.target;
        const end = parseInt(el.getAttribute('data-count'), 10);
        const dur = 1800;
        const s0  = performance.now();
        (function step(now) {
          const t = Math.min((now - s0) / dur, 1);
          el.textContent = Math.floor((1 - Math.pow(1 - t, 3)) * end).toLocaleString();
          if (t < 1) requestAnimationFrame(step);
        })(s0);
        io.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(c => io.observe(c));
  }
}

/* ── 6. Scroll Reveal ── */
{
  const targets = document.querySelectorAll(
    '.svc-card, .testi-card, .stat-block, .work-feat, .wf-thumb'
  );
  if (targets.length) {
    targets.forEach(el => {
      el.style.opacity   = '0';
      el.style.transform = 'translateY(28px)';
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
    targets.forEach(el => io.observe(el));
  }
}
