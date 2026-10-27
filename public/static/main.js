/* ============================================
   NOVA STUDIO — Main JS

   ★ 히어로 인트로 설계 ★
   ────────────────────────────────────────────
   [구조]
     #heroSlider (100vh, position:relative/sticky)
       ├─ .yt-slides          — 영상 슬라이드
       ├─ #heroTextLayer      — 메인 텍스트
       ├─ #blackCurtain       — 검은 커튼 (absolute, 기본 숨김)
       └─ #logoLayer          — 로고 + CTA (absolute, 기본 숨김)

   [상태]
     STATE_HERO : 영상 + 텍스트 표시
     STATE_LOGO : 커튼 + 로고 + CTA 표시

   [전환 규칙]
     • 텍스트 완성(1.3s) 후 → 휠 다운 가능
     • 휠 다운 → 커튼 fade-in → 로고 등장 → CTA 올라옴
     • 휠 업 (로고 화면) → 로고 fade-out → 커튼 fade-out → 텍스트 재시작
     • 새로고침 → STATE_HERO 에서 시작

   [텍스트 시퀀스]
     0ms   : eyebrow
     100ms : 1번 줄 fade-in
     400ms : 2번 줄 fade-in
     700ms : 3번 줄 fade-in
     1000ms: 서브카피 fade-in
     1300ms: CTA fade-in → seqReady=true

   [슬라이드]
     6초마다 크로스페이드 (1s dissolve)
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
  const siteHeader = document.getElementById('site-header');
  menuToggle.addEventListener('click', () => {
    const o = menuToggle.classList.toggle('open');
    mainNav.classList.toggle('open', o);
    /* 헤더의 backdrop-filter가 fixed 메뉴의 기준 박스를 헤더로 바꿔
       메뉴가 헤더 높이에 갇히는 문제 → 메뉴 열린 동안만 블러 해제 */
    if (siteHeader) siteHeader.classList.toggle('nav-open', o);
    document.body.style.overflow = o ? 'hidden' : '';
  });
  mainNav.querySelectorAll('.nav-link').forEach(a =>
    a.addEventListener('click', () => {
      /* 모바일에서 드롭다운 트리거(홈·서비스)는 아코디언만 여닫음 — 메뉴 유지 */
      if (window.innerWidth <= 768 && a.classList.contains('nav-dropdown-trigger')) return;
      menuToggle.classList.remove('open');
      mainNav.classList.remove('open');
      if (siteHeader) siteHeader.classList.remove('nav-open');
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
      a.style.color      = 'var(--blue)';  /* blue-light 는 밝은 바탕에서 대비 3.3:1 이라 진한 파랑으로 */
      a.style.background = 'rgba(26,107,255,0.08)';
    }
  });
}

/* ══════════════════════════════════════════════
   4. INTRO 시퀀스 (히어로 ↔ 로고 전환)
   ══════════════════════════════════════════════ */
(function initIntro() {

  /* ─── DOM ─── */
  const heroSlider   = document.getElementById('heroSlider');
  if (!heroSlider) return;

  const slides       = Array.from(document.querySelectorAll('.yt-slide'));
  const TOTAL        = slides.length;
  const blackCurtain = document.getElementById('blackCurtain');
  const textLayer    = document.getElementById('heroTextLayer');
  const eyebrow      = heroSlider.querySelector('.hero-eyebrow');
  const hlLine1      = document.getElementById('hlLine1');
  const hlLine2      = document.getElementById('hlLine2');
  const hlLine3      = document.getElementById('hlLine3');
  const heroSub      = document.getElementById('heroSub');
  const heroCta      = document.getElementById('heroCta');
  const logoLayer    = document.getElementById('logoLayer');
  const scrollCue    = document.getElementById('scrollCue');

  /* ─── 카피 ─── */
  const COPY = {
    l1:  'The Creative Marketing Agency',
    l2:  '',
    l3:  '',
    sub: '마케팅 퍼널을 설계하는 인애드컴퍼니입니다'
  };

  /* ─── 상태 ─── */
  const STATE_HERO = 'hero';
  const STATE_LOGO = 'logo';
  let state         = STATE_HERO;
  let transitioning = false;
  let seqReady      = false;
  let seqTimers     = [];

  /* 히어로 섹션을 sticky/fixed처럼 첫 화면에 고정,
     일반 문서 흐름은 그 아래 콘텐츠가 이어지도록 함.
     → heroSlider 자체는 일반 position:relative 유지.
     스크롤 잠금은 STATE_HERO일 때 wheel preventDefault로 처리. */
  document.body.style.overflow = ''; // 초기에는 정상

  /* ─── 텍스트 리셋 ─── */
  function resetText() {
    seqTimers.forEach(clearTimeout);
    seqTimers = [];
    seqReady  = false;
    [hlLine1, hlLine2, hlLine3].forEach(el => {
      if (!el) return;
      el.textContent = '';
      el.classList.remove('show');
    });
    if (eyebrow) eyebrow.classList.remove('show');
    if (heroSub) { heroSub.textContent = ''; heroSub.classList.remove('show'); }
    if (heroCta) heroCta.classList.remove('show');
  }

  /* ─── 텍스트 시퀀스 (1.3s 내 완성) ─── */
  function runTextSequence() {
    resetText();
    const push = (fn, ms) => {
      const t = setTimeout(fn, ms);
      seqTimers.push(t);
    };

    push(() => { if (eyebrow) eyebrow.classList.add('show'); }, 0);
    push(() => {
      if (hlLine1) { hlLine1.textContent = COPY.l1; hlLine1.classList.add('show'); }
    }, 100);
    push(() => {
      if (hlLine2) { hlLine2.textContent = COPY.l2; hlLine2.classList.add('show'); }
    }, 400);
    push(() => {
      if (hlLine3) { hlLine3.textContent = COPY.l3; hlLine3.classList.add('show'); }
    }, 700);
    push(() => {
      if (heroSub) { heroSub.textContent = COPY.sub; heroSub.classList.add('show'); }
    }, 1000);
    push(() => {
      if (heroCta) heroCta.classList.add('show');
      seqReady = true;
    }, 1300);
  }

  /* ──────────────────────────────────────────
     STATE_HERO → STATE_LOGO (휠 다운)
     1) 커튼 fade-in (0.55s)
     2) 로고 레이어 등장 + 텍스트 레이어 숨김
  ────────────────────────────────────────── */
  function toLogoState() {
    if (transitioning || state === STATE_LOGO) return;
    transitioning = true;
    state = STATE_LOGO;

    // 스크롤 커서 숨김
    if (scrollCue) scrollCue.classList.add('hide');

    // 커튼 올리기
    if (blackCurtain) blackCurtain.classList.add('show');

    // 0.45s 후 로고 레이어 등장
    setTimeout(() => {
      if (textLayer) textLayer.classList.add('hidden');
      if (logoLayer) logoLayer.classList.add('show');
      transitioning = false;
    }, 450);
  }

  /* ──────────────────────────────────────────
     STATE_LOGO → STATE_HERO (휠 업)
     1) 로고 fade-out
     2) 커튼 fade-out → 영상 재등장
     3) 텍스트 시퀀스 재시작
  ────────────────────────────────────────── */
  function toHeroState() {
    if (transitioning || state === STATE_HERO) return;
    transitioning = true;
    state = STATE_HERO;

    // 로고 레이어 숨기기
    if (logoLayer) logoLayer.classList.remove('show');

    // 0.3s 후 커튼 내리기 + 텍스트 레이어 복귀
    setTimeout(() => {
      if (blackCurtain) blackCurtain.classList.remove('show');
      if (textLayer)    textLayer.classList.remove('hidden');
      if (scrollCue)    scrollCue.classList.remove('hide');
    }, 300);

    // 0.7s 후 텍스트 시퀀스 재시작
    setTimeout(() => {
      runTextSequence();
      transitioning = false;
    }, 700);
  }

  /* ─── 휠 이벤트 핸들러 ─── */
  let wheelCooldown = false;

  // 히어로 섹션 높이 (= 100vh)
  function heroHeight() { return heroSlider.offsetHeight; }

  function onWheel(e) {
    // 커튼/로고 전환 비활성화 — 히어로에서 자연 스크롤 허용
    return;
    if (mainNav && mainNav.classList.contains('open')) return;

    const delta    = e.deltaY;
    const scrollY  = window.scrollY;
    const heroH    = heroHeight();

    /* ── 히어로 영역 안(scrollY ≈ 0) ── */
    if (scrollY < heroH * 0.5) {
      if (state === STATE_HERO) {
        if (delta > 0 && seqReady && !transitioning) {
          // 아래 → 로고 전환
          e.preventDefault();
          if (wheelCooldown) return;
          wheelCooldown = true;
          setTimeout(() => { wheelCooldown = false; }, 1200);
          toLogoState();
        } else if (delta > 0) {
          // 텍스트 미완성이면 잠금
          e.preventDefault();
        }
        // 위 스크롤은 막지 않음 (맨 위라 어차피 안 움직임)
      } else if (state === STATE_LOGO) {
        if (delta < 0 && !transitioning) {
          // 로고 화면에서 위 → 히어로 복귀
          e.preventDefault();
          if (wheelCooldown) return;
          wheelCooldown = true;
          setTimeout(() => { wheelCooldown = false; }, 1200);
          toHeroState();
        }
        // 아래 → 자연 스크롤 허용 (하위 콘텐츠로 이동)
      }
    }
    /* ── 히어로 아래(하위 콘텐츠 영역) ──
       어떤 상태든 wheel 가로채지 않음 → 완전 자연 스크롤 */
  }

  window.addEventListener('wheel', onWheel, { passive: false });

  /* ─── 터치 스와이프 ─── */
  let touchStartY = 0;
  window.addEventListener('touchstart', e => {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });
  window.addEventListener('touchend', e => {
    const dy     = touchStartY - e.changedTouches[0].clientY;
    const heroH  = heroHeight();
    const scrollY = window.scrollY;
    // 커튼/로고 전환 비활성화 — 자연 스크롤 허용
    return;
  }, { passive: true });

  /* 새로고침 시 맨 위 */
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);

  /* ─── 슬라이드 전환 ─── */
  const SLIDE_INTERVAL = 1000;
  const FADE_DURATION  = 600;
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
    if (TOTAL < 2) return;
    clearTimeout(slideTimer);
    slideTimer = setTimeout(() => {
      goTo((current + 1) % TOTAL);
      scheduleNext();
    }, SLIDE_INTERVAL);
  }

  /* ─── 초기화 ─── */
  slides.forEach(s => s.classList.remove('active', 'leaving'));
  if (slides[0]) slides[0].classList.add('active');
  if (TOTAL > 1) scheduleNext();
  runTextSequence();

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
    '.svc-card, .testi-card, .work-feat, .wf-thumb'
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

/* ── 8. History 노드 — 터치 디바이스 토글 지원 ── */
(function initHistoryNodes() {
  const nodes = document.querySelectorAll('.hn-node');
  if (!nodes.length) return;

  /* 터치 기기에서 탭 → active 토글 */
  nodes.forEach(node => {
    node.addEventListener('click', (e) => {
      const isActive = node.classList.contains('active');
      /* 다른 모두 닫기 */
      nodes.forEach(n => n.classList.remove('active'));
      if (!isActive) node.classList.add('active');
    });
  });

  /* 외부 클릭 시 닫기 */
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.hn-node')) {
      nodes.forEach(n => n.classList.remove('active'));
    }
  });
})();

/* ── 9. 서비스 인터랙티브 리스트 ── */
(function initSvcInteractive() {
  /* 시딩 페이지 & 홈 페이지는 자체 JS로 처리 — 전역 함수 실행 안 함 */
  if (document.getElementById('sdngBlogVisual') || document.getElementById('sdngInstaVisual')) return;
  if (document.getElementById('homeSvcList')) return;

  const visual = document.querySelector('.svc-visual');
  if (!visual) return;

  const items  = document.querySelectorAll('.svc-list-item');
  /* .svc-visual 안의 직계 .svc-panel만 선택 (전역 오염 방지) */
  const panels = visual.querySelectorAll('.svc-panel');
  if (!items.length || !panels.length) return;

  let currentIdx = 0;

  function activate(idx) {
    if (idx === currentIdx) return; /* 동일 패널 재진입 무시 */
    currentIdx = idx;
    items.forEach((el, i) => el.classList.toggle('active', i === idx));
    panels.forEach((el, i) => {
      if (i === idx) {
        el.style.display = 'flex';
        /* 다음 프레임에 active 추가 → CSS animation 정상 실행 */
        requestAnimationFrame(() => el.classList.add('active'));
      } else {
        el.classList.remove('active');
        el.style.display = 'none';
      }
    });
  }

  /* 초기 상태 — 0번 패널만 보이고 나머지 명시적으로 숨김 */
  panels.forEach((el, i) => {
    if (i === 0) {
      el.style.display = 'flex';
      el.classList.add('active');
    } else {
      el.style.display = 'none';
      el.classList.remove('active');
    }
  });

  items.forEach((item, idx) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      activate(idx);
    });
  });
})();

/* ============================================
   CONTACT FORM 핸들러
   ============================================ */
function handleContact(e) {
  e.preventDefault();
  const form = document.getElementById('contactForm');
  const success = document.getElementById('contactSuccess');
  if (form && success) {
    form.style.display = 'none';
    success.style.display = 'block';
  }
  return false;
}


/* ── Insight 필터 ── */
(function initInsightFilter() {
  const filterBar = document.getElementById('insightFilter');
  const grid = document.getElementById('insightGrid');
  if (!filterBar || !grid) return;

  filterBar.addEventListener('click', (e) => {
    const btn = e.target.closest('.inf-btn');
    if (!btn) return;
    filterBar.querySelectorAll('.inf-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    grid.querySelectorAll('.ins-card').forEach(card => {
      const cat = card.dataset.cat || '';
      card.classList.toggle('hidden', filter !== 'all' && !cat.includes(filter));
    });
  });

  const loadBtn = document.getElementById('insLoadMore');
  if (loadBtn) {
    loadBtn.addEventListener('click', () => {
      loadBtn.style.opacity = '0.5';
      loadBtn.disabled = true;
      setTimeout(() => {
        loadBtn.innerHTML = '<span>모든 인사이트를 불러왔습니다</span>';
        loadBtn.style.opacity = '0.5';
        loadBtn.style.cursor = 'default';
      }, 600);
    });
  }
})();

/* ── Newsletter 폼 ── */
function handleNewsletter(e) {
  e.preventDefault();
  const form = e.target;
  const success = document.getElementById('nlSuccess');
  if (success) {
    form.querySelector('.ins-nl-input-wrap').style.display = 'none';
    form.querySelector('.ins-nl-note').style.display = 'none';
    success.style.display = 'flex';
  }
  return false;
}

/* ── Contact 폼 ── */
function handleContact(e) {
  e.preventDefault();
  const form = document.getElementById('contactForm');
  const success = document.getElementById('contactSuccess');
  if (form && success) {
    form.style.display = 'none';
    success.style.display = 'block';
    success.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  return false;
}

// ===== NAV DROPDOWN (다중 인스턴스: 홈/서비스) =====
(function() {
  var dropdowns = document.querySelectorAll('.nav-dropdown');
  if (!dropdowns.length) return;
  var path = location.pathname.replace(/\/+$/, '');
  dropdowns.forEach(function(dropdown) {
    var trigger = dropdown.querySelector('.nav-dropdown-trigger');
    var menu = dropdown.querySelector('.nav-dropdown-menu');
    if (!trigger || !menu) return;

    // 현재 페이지 강조
    var matched = false;
    menu.querySelectorAll('.ndm-item').forEach(function(item) {
      var href = (item.getAttribute('href') || '').replace(/\/+$/, '');
      if (href && path === href) {
        item.classList.add('is-active');
        item.setAttribute('aria-current', 'page');
        matched = true;
      }
    });
    var trigHref = (trigger.getAttribute('href') || '').replace(/\/+$/, '');
    if (matched || (trigHref && trigHref !== '' && path.indexOf(trigHref) === 0 && trigHref !== '/')) {
      trigger.classList.add('is-active');
    }

    var closeTimer;
    /* 모바일(터치)에서는 hover로 열지 않음 — 탭 좌표에 hover가 남아 저절로 열리는 문제 방지 */
    function isMobile() { return window.innerWidth <= 768; }
    function openDropdown() { if (isMobile()) return; clearTimeout(closeTimer); dropdown.classList.add('open'); }
    function closeDropdown() { if (isMobile()) return; closeTimer = setTimeout(function() { dropdown.classList.remove('open'); }, 120); }

    dropdown.addEventListener('mouseenter', openDropdown);
    dropdown.addEventListener('mouseleave', closeDropdown);
    menu.addEventListener('mouseenter', openDropdown);
    menu.addEventListener('mouseleave', closeDropdown);

    trigger.addEventListener('click', function(e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        dropdown.classList.toggle('open');
      }
    });

    document.addEventListener('click', function(e) {
      if (!dropdown.contains(e.target)) dropdown.classList.remove('open');
    });
  });
})();

// ===== CALL MODAL =====
function openCallModal() {
  var overlay = document.getElementById('callModalOverlay');
  if (!overlay) return;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeCallModal() {
  var overlay = document.getElementById('callModalOverlay');
  if (!overlay) return;
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}
(function() {
  var overlay = document.getElementById('callModalOverlay');
  var closeBtn = document.getElementById('callModalClose');
  if (!overlay) return;

  // 닫기 버튼
  if (closeBtn) closeBtn.addEventListener('click', closeCallModal);

  // 오버레이 배경 클릭 시 닫기
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) closeCallModal();
  });

  // ESC 키로 닫기
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeCallModal();
  });
})();

/* ── ifl-data-section 카운터 애니메이션 ── */
(function() {
  function animateCounter(el, target, duration) {
    var start = 0;
    var startTime = null;
    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      // easeOutExpo
      var eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      var current = Math.floor(eased * target);
      el.textContent = current.toLocaleString();
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target.toLocaleString();
      }
    }
    requestAnimationFrame(step);
  }

  var counters = document.querySelectorAll('.ifl-data-counter-num[data-target]:not([data-influencer-counter="1"])');
  if (!counters.length) return;

  var triggered = false;
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting && !triggered) {
        triggered = true;
        counters.forEach(function(el) {
          var target = parseInt(el.getAttribute('data-target'), 10);
          animateCounter(el, target, 1800);
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });

  var section = document.querySelector('.ifl-data-section');
  if (section) observer.observe(section);
})();

/* ─────────────────────────────────────────────
   전역 간편 문의 팝업 — /contact 링크를 팝업으로 대체
───────────────────────────────────────────── */
(function() {
  var modal = document.getElementById('cmodal');
  if (!modal) return;
  var form = document.getElementById('cmForm');
  var success = document.getElementById('cmSuccess');

  function openModal() {
    // 재오픈 시 폼 초기화
    if (form) { form.reset(); form.style.display = 'flex'; }
    // 추가 정보 아코디언도 접힌 상태로 복귀
    var opt = document.getElementById('cmOptional');
    if (opt) {
      opt.classList.remove('open');
      var tg = opt.querySelector('.cf-optional-toggle');
      if (tg) tg.setAttribute('aria-expanded', 'false');
    }
    if (success) success.style.display = 'none';
    var doneBox = modal.querySelector('.cmodal-box');
    if (doneBox) doneBox.classList.remove('cmodal-box--done');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(function() { modal.classList.add('cmodal--open'); });
  }
  function closeModal() {
    modal.classList.remove('cmodal--open');
    setTimeout(function() {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }, 250);
  }
  window.openContactModal = openModal;
  window.closeContactModal = closeModal;

  // #contact 해시 딥링크로 팝업 바로 열기
  if (location.hash === '#contact') openModal();

  modal.addEventListener('click', function(e) { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.style.display !== 'none') closeModal();
  });

  // /contact 링크 인터셉트 → 팝업 (컨택트 페이지 자체에서는 기본 동작 유지)
  if (location.pathname.replace(/\/+$/, '') !== '/contact') {
    document.addEventListener('click', function(e) {
      var a = e.target.closest ? e.target.closest('a[href="/contact"]') : null;
      if (!a) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button === 1) return;
      e.preventDefault();
      openModal();
    });
  }

  if (form) {
    var cmSubmitting = false;
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      /* 연타 시 같은 문의가 여러 번 발송되던 문제 방지 */
      if (cmSubmitting) return;
      cmSubmitting = true;
      var errBox = document.getElementById('cmError');
      if (errBox) errBox.hidden = true;
      var submitBtn = form.querySelector('button[type="submit"]');
      var submitLabel = submitBtn ? submitBtn.querySelector('span') : null;
      var submitPrev = submitLabel ? submitLabel.textContent : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.setAttribute('aria-busy', 'true');
      }
      if (submitLabel) submitLabel.textContent = '접수 중...';
      function releaseSubmit() {
        cmSubmitting = false;
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.removeAttribute('aria-busy');
        }
        if (submitLabel) submitLabel.textContent = submitPrev;
      }
      var fd = new FormData(form);
      var payload = {};
      var services = [];
      fd.forEach(function(val, key) {
        if (key === 'service') { services.push(val); return; }
        if (key === 'privacy') return;
        if (val) payload[key] = val;
      });
      if (services.length) payload.services = services.join(', ');
      /* 회사소개서는 선택이 아니라 문의 접수 시 항상 함께 발송 */
      var wantsBrochure = !!payload.email;
      try {
        var responses = await Promise.all([
          fetch('/api/mail/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          }),
          fetch('/api/mail/brochure', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: payload.email, emailAgree: 'on' })
          })
        ]);
        /* 소개서 발송 실패로 문의 접수까지 실패 처리하지 않는다 */
        if (!responses[0].ok) throw new Error('mail failed');
      } catch (err) {
        releaseSubmit();
        if (errBox) {
          errBox.hidden = false;
          (submitBtn || errBox).scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        } else {
          alert('접수가 완료되지 않았습니다. 잠시 후 다시 시도하거나 010-9186-9944로 전화 주세요.');
        }
        return;
      }
      form.style.display = 'none';
      if (success) success.style.display = 'block';
      var note = document.getElementById('cmBroNote');
      if (note) note.style.display = wantsBrochure ? 'block' : 'none';
      var box = modal.querySelector('.cmodal-box');
      if (box) { box.scrollTop = 0; box.classList.add('cmodal-box--done'); }
    });
  }
})();

/* ─────────────────────────────────────────────
   이메일 도메인 추천 칩 + 오타 감지
   입력칸은 1개 그대로 유지(모바일 자동완성 보존).
   '@' 입력 시 아래에 도메인 칩 노출 → 탭 한 번으로 완성.
   흔한 도메인과 1~2글자 차이면 오타 안내.
───────────────────────────────────────────── */
(function() {
  var DOMAINS = ['naver.com', 'gmail.com', 'daum.net', 'hanmail.net', 'nate.com', 'kakao.com'];

  function distance(a, b) {
    var m = a.length, n = b.length;
    var prev = [], cur = [], i, j;
    for (j = 0; j <= n; j++) prev[j] = j;
    for (i = 1; i <= m; i++) {
      cur[0] = i;
      for (j = 1; j <= n; j++) {
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      }
      prev = cur.slice();
    }
    return prev[n];
  }

  /* 모바일 키보드가 끼워 넣는 '보이지 않는 문자' 정리.
     NBSP·제로폭공백·전각(＠．)은 화면상 정상으로 보이지만 type=email 검증에서 거부되어,
     사용자가 원인을 모른 채 같은 주소를 반복 입력하다 이탈하는 원인이 된다. */
  function sanitizeEmail(v) {
    if (!v) return v;
    return v
      .replace(/[​-‍﻿]/g, '')                                     // 제로폭 문자
      .replace(/[！-～]/g, function(ch) {                                // 전각 영숫자·기호 → 반각(＠ ．포함)
        return String.fromCharCode(ch.charCodeAt(0) - 0xFEE0);
      })
      .replace(/。/g, '.')                                                   // 한글 마침표(。)
      .replace(/[‘’“”]/g, '')                                // 스마트 따옴표
      .replace(/[\s ]/g, '');                                               // 공백·NBSP (이메일엔 공백이 올 수 없음)
  }

  function attach(input) {
    if (!input || input.dataset.emailHelper) return;
    input.dataset.emailHelper = '1';

    /* 입력 즉시 정리 — 커서 위치는 보정해서 타이핑을 방해하지 않는다 */
    input.addEventListener('input', function() {
      var raw = input.value;
      var clean = sanitizeEmail(raw);
      if (clean !== raw) {
        var pos = (input.selectionStart || raw.length) - (raw.length - clean.length);
        input.value = clean;
        try { input.setSelectionRange(pos, pos); } catch (e) {}
      }
      /* 한글은 자동 교정이 불가능하므로 원인을 명확히 알려준다 */
      input.setCustomValidity(
        /[ㄱ-ㆎ가-힣]/.test(input.value)
          ? '이메일 주소는 영문으로 입력해 주세요. (한글이 포함되어 있습니다)'
          : ''
      );
    });
    input.addEventListener('blur', function() { input.value = sanitizeEmail(input.value); });

    var box = document.createElement('div');
    box.className = 'email-suggest';
    input.parentNode.insertBefore(box, input.nextSibling);

    function setValue(v) {
      input.value = v;
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.focus();
      render();
    }

    function render() {
      var val = input.value.trim();
      var at = val.indexOf('@');
      box.innerHTML = '';
      if (at < 1) return;                                   // 로컬파트 없으면 표시 안 함
      var local = val.slice(0, at);
      var typed = val.slice(at + 1).toLowerCase();

      /* 이미 정확한 도메인이면 안내 불필요 */
      if (DOMAINS.indexOf(typed) > -1) return;

      /* 오타 후보: 1~2글자 차이 */
      if (typed.length >= 4) {
        for (var k = 0; k < DOMAINS.length; k++) {
          var d = distance(typed, DOMAINS[k]);
          if (d > 0 && d <= 2) {
            var fix = document.createElement('button');
            fix.type = 'button';
            fix.className = 'email-suggest-fix';
            fix.innerHTML = '혹시 <strong>' + local + '@' + DOMAINS[k] + '</strong> 인가요?';
            (function(dom) {
              fix.addEventListener('click', function() { setValue(local + '@' + dom); });
            })(DOMAINS[k]);
            box.appendChild(fix);
            return;
          }
        }
      }

      /* 도메인 추천 칩 (입력한 앞글자로 필터) */
      var list = DOMAINS.filter(function(d) { return !typed || d.indexOf(typed) === 0; });
      if (!list.length) return;
      list.slice(0, 4).forEach(function(d) {
        var chip = document.createElement('button');
        chip.type = 'button';
        chip.className = 'email-suggest-chip';
        chip.textContent = '@' + d;
        chip.addEventListener('click', function() { setValue(local + '@' + d); });
        box.appendChild(chip);
      });
    }

    input.addEventListener('input', render);
    input.addEventListener('focus', render);
    /* 칩 클릭이 blur보다 먼저 처리되도록 지연 후 정리 */
    input.addEventListener('blur', function() {
      setTimeout(function() {
        if (!box.contains(document.activeElement)) box.innerHTML = '';
      }, 150);
    });
  }

  /* 문의 창구는 팝업 단일화 — 팝업 이메일 입력칸에만 적용 */
  attach(document.getElementById('cm-email'));
})();
