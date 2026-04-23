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
    l1:  '크리에이티브가',
    l2:  '성과를',
    l3:  '만듭니다',
    sub: '데이터가 말하고, 크리에이티브가 설득하고,\n전략이 전환을 만듭니다.'
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
    if (Math.abs(dy) < 40) return;
    // 히어로 영역 안에서만 가로채기
    if (scrollY >= heroH * 0.5) return;
    if (dy > 0 && state === STATE_HERO && seqReady && !transitioning) {
      toLogoState();
    } else if (dy < 0 && state === STATE_LOGO && !transitioning) {
      toHeroState();
    }
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
    clearTimeout(slideTimer);
    slideTimer = setTimeout(() => {
      goTo((current + 1) % TOTAL);
      scheduleNext();
    }, SLIDE_INTERVAL);
  }

  /* ─── 초기화 ─── */
  slides.forEach(s => s.classList.remove('active', 'leaving'));
  if (slides[0]) slides[0].classList.add('active');
  scheduleNext();
  runTextSequence();

})();


/* ── 5. 마우스 안개 커서 ── */
(function initFogCursor() {

  /* ── 레이어 3개 생성 ──
     core  : 가장 밝은 중심점 (작고 선명)
     fog   : 중간 안개 레이어 (물결 흔들림)
     aura  : 가장 크고 느린 후광 (번짐)
  */
  function makeEl(id) {
    const el = document.createElement('div');
    el.id = id;
    document.body.appendChild(el);
    return el;
  }
  const core = makeEl('fogCore');
  const fog  = makeEl('fogCursor');
  const aura = makeEl('fogAura');

  let mx = -500, my = -500;   // 마우스 실제 위치

  // 각 레이어의 현재 위치
  let cx = -500, cy = -500;   // core  (빠름)
  let fx = -500, fy = -500;   // fog   (중간 + 물결)
  let ax = -500, ay = -500;   // aura  (느림)

  // 물결용 오프셋 (사인파)
  let waveT = 0;

  function lerp(a, b, t) { return a + (b - a) * t; }

  function tick() {
    waveT += 0.04;  // 물결 시간 진행

    // 위치 lerp
    cx = lerp(cx, mx, 0.25);
    cy = lerp(cy, my, 0.25);

    fx = lerp(fx, mx, 0.10);
    fy = lerp(fy, my, 0.10);

    ax = lerp(ax, mx, 0.05);
    ay = lerp(ay, my, 0.05);

    // fog 레이어에 물결 오프셋 적용
    const wx = Math.sin(waveT * 1.1) * 10;
    const wy = Math.cos(waveT * 0.9) * 8;

    // aura 레이어에 더 큰 물결 (느리게)
    const awx = Math.sin(waveT * 0.6) * 18;
    const awy = Math.cos(waveT * 0.5) * 14;

    core.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
    fog.style.transform  = `translate(${fx + wx}px, ${fy + wy}px) translate(-50%, -50%)`;
    aura.style.transform = `translate(${ax + awx}px, ${ay + awy}px) translate(-50%, -50%)`;

    requestAnimationFrame(tick);
  }

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
  });

  document.addEventListener('mouseleave', () => {
    core.style.opacity = '0';
    fog.style.opacity  = '0';
    aura.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    core.style.opacity = '';
    fog.style.opacity  = '';
    aura.style.opacity = '';
  });

  tick();
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
    item.addEventListener('mouseenter', () => activate(idx));
    item.addEventListener('click', (e) => {
      const link = item.querySelector('a');
      if (link && !e.target.closest('a')) {
        window.location.href = link.getAttribute('href');
      }
    });
  });
})();

/* ============================================
   WORKS GALLERY — 필터링
   ============================================ */
(function() {
  const filterBtns = document.querySelectorAll('.wf-btn');
  const cards = document.querySelectorAll('.wg-card');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      cards.forEach(card => {
        const cats = (card.dataset.cat || '').split(' ');
        if (filter === 'all' || cats.includes(filter)) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
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

// ===== NAV DROPDOWN =====
(function() {
  var dropdown = document.getElementById('navDropdown');
  var trigger = document.getElementById('navDropdownTrigger');
  var menu = document.getElementById('navDropdownMenu');
  if (!dropdown || !trigger || !menu) return;

  var closeTimer;

  function openDropdown() {
    clearTimeout(closeTimer);
    dropdown.classList.add('open');
  }
  function closeDropdown() {
    closeTimer = setTimeout(function() {
      dropdown.classList.remove('open');
    }, 120);
  }

  // 마우스 호버
  dropdown.addEventListener('mouseenter', openDropdown);
  dropdown.addEventListener('mouseleave', closeDropdown);
  menu.addEventListener('mouseenter', openDropdown);
  menu.addEventListener('mouseleave', closeDropdown);

  // 클릭 토글 (모바일)
  trigger.addEventListener('click', function(e) {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      dropdown.classList.toggle('open');
    }
  });

  // 외부 클릭 시 닫기
  document.addEventListener('click', function(e) {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove('open');
    }
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

  var counters = document.querySelectorAll('.ifl-data-counter-num[data-target]');
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
