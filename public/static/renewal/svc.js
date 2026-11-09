// 개편 서비스 페이지(2026-11-07 운영 이식) — 화면 움직임. 글은 서버가 미리 채워 두므로(svc-fill.js → svc-*.gen.html) 여기서는 그리지 않는다.
// 시안 lab/svc.html 의 움직임 부분 그대로 + 견적 조합기(구독)·첫 화면 장면 크기 맞춤·성과 사례 넘기기.
SITE.boot(ctx => {
  const { $, $$, lenis } = ctx;
  const k = ($('[data-svc]') || {}).dataset ? $('[data-svc]').dataset.svc : '';

  if (k === 'subscription' && window.ESTR) ESTR.mount(ctx, { id: 'sub', source: 'subscription' });

  // 첫 화면 장면: 운영 서비스 페이지의 장면(가로 680 × 세로 620 기준)을 상자 크기에 맞춰 줄인다
  const box = $('[data-hero-media]');
  const root = box && box.querySelector('.vp, .ip, .ss, .rc, .oys, .pon');
  if (root) {
    const BASE = { vp: [806, .68], ip: [691, .5] };
    const key = Object.keys(BASE).find(c => root.classList.contains(c));
    const fit = () => {
      const w = box.clientWidth, h = box.clientHeight, b = key && BASE[key];
      root.style.setProperty('--s', b ? (w / b[0] * b[1]).toFixed(3) : Math.min(w / 680, h / 620).toFixed(3));
    };
    fit(); addEventListener('resize', fit);
  }

  // 첫 화면: 제목 줄이 올라오고, 장면이 아래에서 열림, 스크롤하면 장면이 천천히 올라감
  // 제목 줄은 글꼴이 오면 다시 나뉘므로 타임라인 밖에서 같은 시각(.35초 뒤)에 따로 움직임(base.js lines)
  const t0 = ctx.now();
  ctx.lines('[data-hero-title]', ls => gsap.from(ls, { yPercent: 110, duration: 1.1, stagger: .09, ease: 'power4.out', delay: ctx.wait(t0, .35) }));
  gsap.timeline({ delay: .35 })
    .to('[data-hero-media]', { clipPath: 'inset(0% 0 0 0)', duration: 1.3, ease: 'power4.inOut' }, 0)
    .from('[data-hero-media] > video, [data-hero-media] > img', { scale: 1.15, duration: 1.6, ease: 'power3.out' }, 0)
    .from('[data-hero-fade]', { opacity: 0, y: 16, duration: .8, stagger: .08, ease: 'power3.out' }, .5);
  gsap.to('[data-hero-media] > video, [data-hero-media] > img', { yPercent: 5, ease: 'none', scrollTrigger: { trigger: '.sv-hero', start: 'top top', end: 'bottom top', scrub: true } });

  // 고민 줄: 마우스를 직접 움직였을 때만 차오름(스크롤로 지나갈 때는 반응 없음)
  const prows = $$('.prow');
  if (prows.length) {
    gsap.from(prows, { yPercent: 30, opacity: 0, duration: .7, stagger: .06, ease: 'power3.out', scrollTrigger: { trigger: '[data-hrows]', start: 'top 85%' } });
    if (matchMedia('(hover:hover)').matches) {
      let act = null;
      const set = r => { if (r === act) return; if (act) act.classList.remove('on'); act = r; if (r) r.classList.add('on'); };
      addEventListener('mousemove', e => set(e.target.closest ? e.target.closest('.prow') : null));
      lenis.on('scroll', () => set(null));
    }
  }

  // 특징 사진: 아래에서 열리고 살짝 시차
  $$('[data-ph]').forEach(ph => {
    gsap.to(ph, { clipPath: 'inset(0% 0 0 0)', duration: 1.2, ease: 'power4.inOut', scrollTrigger: { trigger: ph, start: 'top 85%' } });
    gsap.fromTo($('img', ph), { yPercent: -5 }, { yPercent: 5, ease: 'none', scrollTrigger: { trigger: ph, scrub: true } });
  });
  $$('.pt').forEach(p => gsap.from(p.querySelectorAll('.mono, h3, p'), { opacity: 0, y: 18, duration: .7, stagger: .06, ease: 'power3.out', scrollTrigger: { trigger: p, start: 'top 85%' } }));

  // 숫자: 처음에는 실제 값을 그대로 둔다(움직임이 안 돌아도 빈칸이 되지 않게). 화면에 들어오는 순간 0부터 다시 올라감
  $$('.nums [data-num]').forEach(el => {
    const raw = el.dataset.num, n = Number(raw);
    if (!isFinite(n)) return;
    const dec = (raw.split('.')[1] || '').length, o = { v: 0 };
    const fmt = v => (dec ? v.toFixed(dec) : Math.round(v).toLocaleString('en-US'));
    el.textContent = fmt(n);
    ScrollTrigger.create({ trigger: el, start: 'top 88%', once: true, onEnter: () => { o.v = 0; gsap.to(o, { v: n, duration: 1.6, ease: 'power3.out', onUpdate: () => el.textContent = fmt(o.v), onComplete: () => el.textContent = fmt(n) }); } });
  });

  // 성과 사례: 매체 탭 + 한 장씩 넘기기(휴대폰은 밀어서). 포트폴리오의 광고 성과 카드에서 #ref-<id> 로 들어오면 그 사례를 펼친다
  const cs = $('[data-cases]');
  if (cs) {
    const slides = $$('[data-case]', cs), tabs = $$('[data-case-tab]', cs), cnt = $('[data-case-n]', cs);
    let g = 'all', cur = 0;
    const vis = () => slides.filter(s => g === 'all' || s.dataset.group === g);
    const show = i => {
      const v = vis(); cur = (i + v.length) % v.length;
      slides.forEach(s => s.classList.toggle('on', s === v[cur]));
      if (cnt) cnt.textContent = `${String(cur + 1).padStart(2, '0')} / ${String(v.length).padStart(2, '0')}`;
      ScrollTrigger.refresh();
    };
    tabs.forEach(t => t.addEventListener('click', () => { tabs.forEach(x => x.classList.toggle('on', x === t)); g = t.dataset.caseTab; show(0); }));
    $('[data-case-prev]', cs).addEventListener('click', () => show(cur - 1));
    $('[data-case-next]', cs).addEventListener('click', () => show(cur + 1));
    let x0 = null;
    cs.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
    cs.addEventListener('touchend', e => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 50) show(cur + (dx < 0 ? 1 : -1)); x0 = null; });
    const fromHash = () => {
      const i = slides.findIndex(s => '#' + s.id === location.hash);
      if (i < 0) return;
      tabs.forEach(x => x.classList.toggle('on', x.dataset.caseTab === 'all')); g = 'all'; show(i);
      setTimeout(() => lenis.scrollTo('#reference', { immediate: true, offset: -40 }), 350);
    };
    addEventListener('hashchange', fromHash); fromHash();
    show(Math.max(0, slides.findIndex(s => s.classList.contains('on'))));
  }

  // 진행 순서: 세로선이 스크롤에 맞춰 차오르고, 지나간 단계 번호가 채워짐
  if ($('[data-steps]')) {
    gsap.to('[data-rail]', { height: '100%', ease: 'none', scrollTrigger: { trigger: '[data-steps]', start: 'top 60%', end: 'bottom 60%', scrub: true } });
    $$('.st').forEach(st => ScrollTrigger.create({ trigger: st, start: 'top 60%', onEnter: () => st.classList.add('done'), onLeaveBack: () => st.classList.remove('done') }));
  }

  // 진행 조건 줄 등장
  if ($('.ptab')) gsap.from('.ptab .r:not(.h), #terms .terms > div', { opacity: 0, y: 14, duration: .6, stagger: .04, ease: 'power3.out', scrollTrigger: { trigger: '#terms .price', start: 'top 80%' } });

  // 질문: 눌러서 펼침(하나 펼치면 나머지는 접힘)
  $$('.fq button').forEach(b => b.addEventListener('click', () => {
    const fq = b.parentElement, open = !fq.classList.contains('open');
    $$('.fq.open').forEach(o => { o.classList.remove('open'); $('button', o).setAttribute('aria-expanded', 'false'); });
    if (open) { fq.classList.add('open'); b.setAttribute('aria-expanded', 'true'); }
    setTimeout(() => ScrollTrigger.refresh(), 550);
  }));

  // 다른 서비스 띠 등장
  gsap.from('.others a', { opacity: 0, y: 20, duration: .6, stagger: .05, ease: 'power3.out', scrollTrigger: { trigger: '.others', start: 'top 88%' } });
});
