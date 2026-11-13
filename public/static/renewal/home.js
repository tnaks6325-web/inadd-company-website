// 개편 홈(2026-11-06 운영 이식) — 시안 lab/home.html 의 연출 그대로. 마크업은 src/routes/renewal/home-body.html, 모양은 home.css.
// 운영: 누적 캠페인 숫자는 관리자 기록(/api/admin/public/home 의 stats.projects)을 천 단위로 내려 씀(운영 홈과 같은 값, 실패하면 data.js 값)
const CAMPAIGNS = fetch('/api/admin/public/home').then(r => r.json()).then(d => { const n = Number(d && d.stats && d.stats.projects); return n > 0 ? Math.floor(n / 1000) * 1000 : null; }).catch(() => null);
CAMPAIGNS.then(n => { const b = n && document.querySelector('[data-hero-camp]'); if (b) b.textContent = n.toLocaleString('ko-KR') + '+'; });
SITE.boot(ctx => {
  ESTR.mount(ctx, { id: 'home' });
  const D = window.INAD, $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const mobile = matchMedia('(max-width:860px)').matches;
  gsap.registerPlugin(ScrollTrigger, SplitText);
  // 고정 구간 길이(화면 몇 개만큼 스크롤하는지) — 2026-11-06 대표 A안: 연혁 2.4(한 해 0.3화면), 클라이언트의 말 1.8. 주소 뒤 ?hist=·?vc= 로 바꿔 볼 수 있음
  const Q = new URLSearchParams(location.search), HIST_LEN = +Q.get('hist') || 2.4, VC_LEN = +Q.get('vc') || 1.8;
  // 구역 높이(2026-11-06 대표: 클라이언트의 말·연혁이 페이지에서 차지하는 높이를 줄여 보기) — 편집 상자(?n)에서 고름
  // 비율 ?vch=·?hih= : 화면 높이 % (100·90·80·70) 또는 가로 비율(16x9·2x1·21x9 → 화면 높이 대비 비율로 바꿔 씀, 휴대폰은 100%)
  // 방식 ?hm= : 1 상자는 화면 가득, 멈춰 있는 거리만 줄여 차지하는 높이를 비율만큼 / 2 상자와 멈춰 있는 거리를 같은 비율로 함께 줄임 / 3 멈추지 않고 지나가는 구역(높이 1.2화면 × 비율)
  const HM = ['1', '2', '3'].includes(Q.get('hm')) ? Q.get('hm') : '1';
  const ratio = v => { const m = /^(\d+)x(\d+)$/.exec(v || ''); return Math.min(1, m ? (mobile ? 1 : innerWidth * m[2] / m[1] / innerHeight) : (Math.min(100, +v || 100) / 100)); };
  const VH = ctx.vh; // 휴대폰 주소창 접힘에 흔들리지 않는 화면 높이(base.js)
  const plan = (r, len) => HM === '3' ? { h: Math.round(VH() * 1.2 * r), len: 0, pin: false }
    : HM === '2' ? { h: Math.round(VH() * r), len: len * r, pin: true }
    : { h: VH(), len: Math.max(.3, (1 + len) * r - 1), pin: true };
  // 연혁 기본 = A+B(auto, 2026-11-06 대표 확정). 비교용: ?hmode=flow(C), ?hmode=pin(예전 붙잡는 방식)
  const HMODE = ['auto', 'flow', 'pin'].includes(Q.get('hmode')) ? Q.get('hmode') : 'auto';
  if (HMODE !== 'pin') $('.s-hist').classList.add(HMODE);
  const VC = plan(ratio(Q.get('vch')), VC_LEN), HI = { h: VH(), len: HIST_LEN, pin: true }; // 연혁: 원래 높이 + 붙잡은 동안 2019~2026(2026-11-06 대표 — 붙잡지 않는 안은 연도가 빨리·화면 밖에서 넘어가 되돌림)
  $('.s-voices').style.height = VC.h + 'px';
  const pinAt = h => (h < VH() - 2 ? 'center center' : 'top top');
  // 멈추는 방식이면 붙잡고 그 거리만큼, 멈추지 않으면 구역이 화면을 지나가는 동안 진행
  const stCfg = (sel, P, a, b) => P.pin ? { trigger: sel, start: pinAt(P.h), end: () => '+=' + Math.round(P.len * VH()), pin: true } : { trigger: sel, start: 'top ' + a, end: 'bottom ' + b };

  // ── 내용 채우기 ──
  const F = window.HOME_FILL(D);
  Object.entries(F).forEach(([sel, html]) => { $(sel).innerHTML = html; });
  const CH = ['네이버 블로그', '인스타그램', '유튜브 쇼츠', '맘카페', '올리브영', '쿠팡 리뷰', '스마트스토어', '커뮤니티', '지식iN', '틱톡', '네이버 쇼핑', '드라마 PPL', '체험단 후기', '릴스', '자사몰'];
  $('[data-flow]').innerHTML = [0, 1, 2, 3, 4].map(c => `<div>${Array.from({ length: 26 }, (_, i) => `<span>${CH[(i * 3 + c * 5) % CH.length]}</span>`).join('')}</div>`).join('');
  // 일하는 방식 다섯 단계(문구는 실제 아워테크 페이지 그대로)
  const STEPS = [
    ['캠페인 기획', '클라이언트 목표를 분석하고 채널·타깃·예산에 맞는 전략을 설계합니다.'],
    ['시스템 셋업', '자동화 워크플로우를 구성해 캠페인 전체가 시스템 위에서 돌아가게 준비합니다.'],
    ['자동 실행', '배포·수집·모니터링이 자동으로 진행됩니다. 올릴 시간에 맞춰 자동으로 올라가고, 사람은 결과를 봅니다.'],
    ['실시간 데이터 수집', '성과 숫자를 24시간 자동으로 모읍니다. 캠페인이 진행되는 동안 데이터가 쌓입니다.'],
    ['인사이트 리포트', '수집된 데이터를 정리해 다음 캠페인을 더 정교하게 만드는 인사이트로 전달합니다.'],
  ];
  $('[data-hw]').insertAdjacentHTML('beforeend', STEPS.map((s, i) => `<div class="hw-step"><span class="mono">STEP 0${i + 1}</span><b>${s[0]}</b><p>${s[1]}</p></div>`).join(''));
  const hwSteps = $$('.hw-step');
  gsap.to('[data-hw-line]', { [mobile ? 'scaleY' : 'scaleX']: 1, ease: 'none', scrollTrigger: { trigger: '.hw-flow', start: 'top 75%', end: mobile ? 'bottom 55%' : 'bottom 45%', scrub: true,
    onUpdate: t => hwSteps.forEach((st, i) => st.classList.toggle('on', t.progress >= (mobile ? i / hwSteps.length : i / (hwSteps.length - 1) * .92))) } });

  // ── 관성 스크롤 ──
  const lenis = ctx.lenis;
  lenis.stop();

  // ── 시작 화면 → 첫 화면 ──
  const cnt = { v: 0 }, cEl = $('[data-count]');
  // 제목 줄 나누기는 글꼴이 오면 다시 나뉨(base.js lines). 첫 화면 제목은 시작 화면 타임라인 밖에서 같은 시각(1.55초 = 숫자 1.1 + 막 .9 - .45)에 따로 움직임
  const splitEls = $$('[data-split]'), t0 = ctx.now();
  let heroN = 1;
  ctx.lines(splitEls[0], ls => { heroN = ls.length; return gsap.from(ls, { yPercent: 110, duration: 1.1, stagger: 0.09, ease: 'power4.out', delay: ctx.wait(t0, 1.55) }); });
  const vid = $('[data-hero-video]');
  vid.playbackRate = 0.55;
  // 사무실 하루 영상: 한 번 재생 후 마지막 장면에서 멈추고, 화면은 아주 천천히 다가간다(처음으로 돌아가지 않음)
  if (!mobile) gsap.fromTo('[data-hero-media] video', { scale: 1.12 }, { scale: 1, duration: 9, ease: 'power2.out' });
  gsap.timeline()
    .to(cnt, { v: 100, duration: 1.1, ease: 'power2.inOut', onUpdate: () => cEl.textContent = String(Math.round(cnt.v)).padStart(3, '0') })
    .add(() => { vid.play().catch(() => {}); })
    .to('[data-loader]', { yPercent: -100, duration: 0.9, ease: 'power4.inOut' })
    .to({}, { duration: 1.1 + 0.09 * (heroN - 1) }, '-=.45') // 제목 줄이 올라오는 동안(움직임은 위 ctx.lines 에서 따로)
    .from('.hero-meta span', { opacity: 0, y: 10, duration: .7, stagger: .06 }, '-=.8')
    .add(() => lenis.start());

  const heroWin = (() => {
    const W = innerWidth, H = innerHeight, side = mobile ? .08 : .3;
    const winW = W * (1 - side * 2), winH = winW * 9 / 16, vidW = Math.max(W, H * 16 / 9);
    const tb = Math.max(0, (H - winH) / 2 / H * 100);
    // 영상 상자를 실제 영상 크기로 두고(가장자리는 바깥 상자가 자름) 줄일 때 잘려 있던 양옆까지 창 안에 들어오게 함 — 휴대폰 세로 화면용
    const v = document.querySelector('[data-hero-media] video'), vidH = vidW * 9 / 16;
    Object.assign(v.style, { position: 'absolute', width: vidW + 'px', height: Math.max(H, vidH) + 'px', left: (W - vidW) / 2 + 'px', top: (H - Math.max(H, vidH)) / 2 + 'px', maxWidth: 'none' });
    return { clip: `inset(${tb}% ${side * 100}% ${tb}% ${side * 100}%)`, scale: winW / vidW, fit: W / vidW, lift: -Math.round(H * .1) };
  })();
  // 휴대폰 첫 화면(2026-11-13 대표: 세로 화면에 가득 채우면 좌우가 많이 잘림): 처음부터 영상 가로 전체가 보이게 화면 폭에 맞추고 제목 위로 조금 올려 둠
  if (mobile) gsap.fromTo('[data-hero-media] video', { scale: heroWin.fit * 1.05, y: heroWin.lift }, { scale: heroWin.fit, y: heroWin.lift, duration: 9, ease: 'power2.out' });
  // 첫 화면 고정: 영상이 창 크기로 줄고 가운데 문장이 나타남
  gsap.timeline({ scrollTrigger: { trigger: '.s-hero', start: 'top top', end: () => '+=' + Math.round(VH() * 1.1), scrub: 1, pin: true } })
    // 작은 창은 영상 비율(16:9) 그대로, 영상 전체가 창 안에 들어오게 줄임(2026-11-05 — 마지막 장면의 사람들이 잘리지 않게)
    .to('[data-hero-media]', { clipPath: heroWin.clip, ease: 'none' }, 0)
    .to('[data-hero-media] video', { scale: heroWin.scale, y: 0, ease: 'none' }, 0)
    .to('.hero-title, .hero-meta', { opacity: 0, y: -40, ease: 'none' }, 0)
    // 가운데 글자: 줄어들기 시작하자마자 화면 안쪽에서 작고 흐리게 나와 보는 사람 쪽으로 다가옴
    .fromTo('[data-hero-mid]', { opacity: 0, scale: .32, filter: 'blur(10px)' }, { opacity: 1, scale: 1, filter: 'blur(0px)', ease: 'power2.out', duration: .75 }, 0)
    .to('[data-hero-mid]', { scale: 1.06, ease: 'none', duration: .25 }, .75)
    .to('[data-hero-media] video', { filter: 'brightness(.85) saturate(.9)', ease: 'none' }, 0);

  // 문장이 단어 단위로 차오름
  gsap.to('.stmt .w', { opacity: 1, stagger: .5, ease: 'none', scrollTrigger: { trigger: '.s-statement', start: 'top 70%', end: 'bottom 70%', scrub: true } });

  // 제목 줄 올라오기(첫 화면 제외)
  splitEls.slice(1).forEach(el => ctx.lines(el, ls => gsap.from(ls, { yPercent: 110, duration: 1.1, stagger: .08, ease: 'power4.out', scrollTrigger: { trigger: el, start: 'top 82%' } })));

  // 숫자 세기 + 사진 시차
  // 클라이언트의 말: 화면을 붙잡고(스크롤 2.6화면), 가운데 포트폴리오 카드 → 사방으로 흩어짐 → 카톡 카드 줄이 번갈아 위아래로 비스듬히 흐름
  (() => {
    const PICK = [1, 2, 12, 5, 6, 15, 7, 8]; // 최종: 실제 메시지 8개, 날짜 줄 없음. 3·4·13·16 버림, 9는 다른 곳. 가상 예시 17·18은 홈에 쓰지 않음(실제 답을 받으면 교체)
    const voices = PICK.map(id => VOICES.find(v => v.id === id)).filter(Boolean);
    const ncol = mobile ? 1 : 4, cols = Array.from({ length: ncol }, () => []);
    voices.forEach((v, i) => cols[i % ncol].push(KAKAO.card({ ...v, date: '' }))); // 홈에서는 날짜 줄을 빼 연도가 보이지 않게(실제 날짜를 바꾸지 않음)
    // 줄이 화면 위아래를 다 덮도록 옆 줄 카드를 이어 붙여 길게(같은 줄 안에서는 반복 없음)
    $('[data-vc-chat]').innerHTML = cols.map((c, i) => `<div class="vc-col">${(ncol > 1 ? c.concat(cols[(i + 1) % ncol]) : c).join('')}</div>`).join('');
    const svcName = t => (t || '').replace(/\s*[&\/,]\s*/g, ' · ');
    const works = WORKS.filter(w => w.cover).slice(0, mobile ? 10 : 14);
    $('[data-vc-cards]').innerHTML = works.map(w => `<div class="vc-card"><div class="ph"><img src="${w.cover}" alt="" loading="lazy" onerror="this.style.opacity=0" /></div><span>${svcName(w.services)}</span></div>`).join('');
    const cards = $$('.vc-card'), colsEl = $$('.vc-col');
    // 처음: 가운데 겹쳐 쌓임(조금씩 틀어짐)
    cards.forEach((c, i) => gsap.set(c, { rotate: gsap.utils.random(-14, 14), x: gsap.utils.random(-30, 30), y: gsap.utils.random(-24, 24), zIndex: i }));
    const tl = gsap.timeline({ scrollTrigger: { ...stCfg('.s-voices', VC, '85%', '15%'), scrub: 1 } });
    // 1) 카드가 사방으로 흩어짐(각자 다른 방향·회전)
    cards.forEach((c, i) => {
      const a = (i / cards.length) * Math.PI * 2 + gsap.utils.random(-.3, .3), r = Math.max(innerWidth, innerHeight) * gsap.utils.random(.62, .9);
      tl.to(c, { x: Math.cos(a) * r, y: Math.sin(a) * r, rotate: gsap.utils.random(-60, 60), scale: gsap.utils.random(.7, 1.05), ease: 'power2.in', duration: .34 }, gsap.utils.random(0, .06));
    });
    tl.to('.vc-head', { opacity: 0, y: -30, duration: .14 }, .2)
      .to('[data-vc-chat]', { opacity: 1, duration: .12 }, .22);
    // 2) 카톡 카드 줄: 홀수 줄은 아래→위, 짝수 줄은 위→아래
    // 이동 거리는 줄 길이 + 화면 높이 기준(카드 수·길이가 바뀌어도 화면을 끝까지 지나감)
    colsEl.forEach((c, i) => { const d = () => mobile ? Math.max(0, c.offsetHeight / 2 - VH() * .45) : c.offsetHeight / 2 + VH() * .2, /* 휴대폰 한 줄: 처음과 끝에도 화면이 비지 않게 */ s = i % 2 ? -1 : 1; tl.fromTo(c, { y: () => s * d() }, { y: () => -s * d(), ease: 'none', duration: .78 }, .22); });
  })();

  // 서비스: 줄 목록 — 화면을 붙잡지 않는다. 마우스를 올린 줄이 검게 차오르고, 그 서비스 장면 영상이 이름을 가리지 않게 오른쪽 빈자리에서 마우스 높이를 따라옴(살짝 기울며), 영문은 글자가 섞였다 맞춰짐
  const rows = $$('.row'), pic = $('[data-pic]');
  const SCR = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&*';
  function scramble(el) {
    const to = el.dataset.scr; let f = 0; clearInterval(el._t);
    el._t = setInterval(() => { el.textContent = to.split('').map((c, i) => i < f / 2 ? c : c === ' ' ? ' ' : SCR[Math.random() * SCR.length | 0]).join(''); if (++f > to.length * 2) clearInterval(el._t); }, 28);
  }
  // 오른쪽 장면: 영상 8개를 미리 깔아 두고, 고른 것만 아래에서 열리며 재생
  const vids = D.services.map((s, i) => { const v = document.createElement('video'); Object.assign(v, { muted: true, loop: true, playsInline: true, preload: 'metadata', poster: `/static/renewal/assets/svc-${i + 1}-v.webp`, src: `/static/renewal/assets/svc-${i + 1}-v.mp4` }); pic.appendChild(v); return v; });
  let shown = -1;
  function show(i) {
    if (i === shown) return;
    const prev = shown; shown = i;
    vids.forEach((v, k) => v.classList.toggle('on', k === i));
    gsap.fromTo(vids[i], { clipPath: prev < i ? 'inset(100% 0 0 0)' : 'inset(0 0 100% 0)', scale: 1.1 }, { clipPath: 'inset(0% 0 0% 0)', scale: 1, duration: .9, ease: 'power3.inOut', overwrite: true,
      onComplete: () => vids.forEach((v, k) => { if (k !== shown) { gsap.set(v, { clipPath: 'inset(100% 0 0 0)' }); v.pause(); } }) });
    vids[i].play().catch(() => {});
    $('[data-cap-n]').textContent = `0${i + 1} / 0${D.services.length} — ${D.services[i].en}`;
    $('[data-cap-t]').textContent = D.services[i].line;
  }
  show(0);
  if (matchMedia('(hover:hover)').matches) {
    // 스크롤로 줄이 마우스 밑을 지날 때는 반응하지 않는다(스크롤은 마우스 이동 이벤트를 만들지 않음) — 마우스를 직접 움직였을 때만 줄이 차오르고 장면이 바뀜
    let act = -1;
    function activate(i) {
      if (i === act) return;
      if (act >= 0) rows[act].classList.remove('on');
      act = i;
      if (i < 0) return;
      rows[i].classList.add('on'); scramble($('[data-scr]', rows[i])); show(i);
    }
    addEventListener('mousemove', e => { const r = e.target.closest && e.target.closest('.row'); activate(r ? +r.dataset.i : -1); });
    lenis.on('scroll', () => activate(-1));
  }
  // 줄은 각자 화면에 들어올 때 바로 올라온다(차례 기다림 없음)
  rows.forEach(r => gsap.from(r, { yPercent: 30, opacity: 0, duration: .6, ease: 'power3.out', scrollTrigger: { trigger: r, start: 'top 96%' } }));

  // 연혁: 한 화면에 고정(1.6화면 분량)한 채 스크롤하면 그 해 칸이 넓게 펼쳐지고, 지난 해는 버터색 선이 남음
  const hcs = $$('.hc'), HN = hcs.length;
  let hi = -1;
  function hpick(i) {
    if (i === hi) return;
    hi = i;
    hcs.forEach((c, k) => {
      c.classList.toggle('on', k === i); c.classList.toggle('past', k < i);
      gsap.to(c, { flexGrow: k === i ? (mobile ? 7 : 5.5) : 1, duration: .9, ease: 'power3.inOut', overwrite: 'auto' });
    });
    const bd = $('.bd', hcs[i]);
    gsap.fromTo($('.yb', bd), { yPercent: 100 }, { yPercent: 0, duration: .9, ease: 'power4.out', delay: .1, overwrite: true });
    gsap.fromTo($$('h3, li', bd), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .7, stagger: .05, ease: 'power3.out', delay: .25, overwrite: true });
  }
  hpick(0);
  if (HMODE === 'auto') {
    ScrollTrigger.create({ trigger: '.s-hist', start: 'top 55%', end: 'bottom 55%', onToggle: st => $('.s-hist').classList.toggle('lit', st.isActive) }); // 바탕 전환(base.js backgrounds)과 같은 구간
    // 시안 A+B: 스크롤을 붙잡지 않음. 연혁이 화면에 보이면 1.1초마다 한 해씩 저절로 펼쳐지고(2026에서 멈춤), 진행 막대가 시간으로 참.
    // 칸에 마우스를 올리거나 누르면 그 해에서 멈춤(벗어나면 이어서). 다시 들어오면 처음부터
    const STEP = 1.1;
    let timer = null, paused = false, inView = false;
    const bar = $('[data-hbar]'), t = $('[data-hauto-t]'), btn = $('[data-hauto-b]');
    const showBar = i => gsap.to(bar, { width: (i + 1) / HN * 100 + '%', duration: STEP, ease: 'none', overwrite: true });
    const label = () => { t.textContent = paused ? 'PAUSED' : hi >= HN - 1 ? 'DONE' : 'AUTO PLAY'; btn.textContent = hi >= HN - 1 ? '처음부터' : paused ? '이어 보기' : '멈춤'; };
    const tick = () => { clearTimeout(timer); if (!inView || paused) return label(); if (hi < HN - 1) { hpick(hi + 1); showBar(hi); timer = setTimeout(tick, STEP * 1000); } label(); };
    const start = () => { clearTimeout(timer); hi = -1; hpick(0); gsap.set(bar, { width: 0 }); showBar(0); paused = false; timer = setTimeout(tick, STEP * 1000); label(); };
    ScrollTrigger.create({ trigger: '.s-hist', start: 'top 70%', end: 'bottom 30%', onEnter: () => { inView = true; start(); }, onEnterBack: () => { inView = true; start(); }, onLeave: () => { inView = false; clearTimeout(timer); }, onLeaveBack: () => { inView = false; clearTimeout(timer); } });
    const hold = k => { paused = true; clearTimeout(timer); hpick(k); gsap.to(bar, { width: (k + 1) / HN * 100 + '%', duration: .4, overwrite: true }); label(); };
    hcs.forEach((c, k) => { c.addEventListener('mouseenter', () => matchMedia('(hover:hover)').matches && hold(k)); c.addEventListener('click', () => hold(k)); });
    $('[data-hcols]').addEventListener('mouseleave', () => { if (!matchMedia('(hover:hover)').matches) return; paused = false; timer = setTimeout(tick, 1500); label(); });
    btn.addEventListener('click', () => { if (hi >= HN - 1) return start(); paused = !paused; paused ? label() : tick(); });
  } else if (HMODE === 'flow') {
    // 시안 C: 스크롤을 붙잡지 않음. 연혁이 지나가는 동안 연도 카드 띠가 오른쪽에서 왼쪽으로 흐르고, 화면 가운데 온 해가 켜짐
    const fl = $('[data-hflow]');
    fl.innerHTML = D.history.map((h, i) => `<article class="hfc"><span class="mono">0${i + 1} / 0${HN} — ${h.label}</span><div><span class="yb">${h.year}</span><h3>${h.label}</h3><ul>${h.items.map(x => `<li>${x}</li>`).join('')}</ul></div></article>`).join('');
    const cards = $$('.hfc', fl);
    const mark = () => { const c = innerWidth / 2; let best = 0, bd = 1e9; cards.forEach((el, k) => { const r = el.getBoundingClientRect(), d = Math.abs(r.left + r.width / 2 - c); if (d < bd) { bd = d; best = k; } }); cards.forEach((el, k) => el.classList.toggle('on', k === best)); };
    gsap.fromTo(fl, { x: 0 }, { x: () => -(fl.scrollWidth - innerWidth), ease: 'none', onUpdate: mark, scrollTrigger: { trigger: '.s-hist', start: 'top 80%', end: 'bottom 20%', scrub: .6, invalidateOnRefresh: true } }); // 띠가 실제로 움직이는 동안 가운데 카드를 고름(스크롤이 멈춘 뒤 늦게 따라오는 움직임까지)
    mark();
  } else {
    const histST = ScrollTrigger.create({ ...stCfg('.s-hist', HI, '85%', '15%'),
      onUpdate: s => { hpick(Math.min(HN - 1, Math.floor(s.progress * HN))); gsap.set('[data-hbar]', { width: s.progress * 100 + '%' }); } });
    hcs.forEach((c, k) => c.addEventListener('click', () => lenis.scrollTo(histST.start + (histST.end - histST.start) * (k + .5) / HN, { duration: 1.2 })));
  }

  // 큰 문장: 작게 시작해 커지며 자간이 좁혀짐
  // 누적 캠페인 숫자: 화면에 들어오면 0에서 38,000까지 1.6초 만에 몰아치듯 차오르고, 끝에서 한 번 튕김
  (() => {
    const el = $('[data-big-n]'), END = (D.stats.find(x => x.en === 'CAMPAIGNS') || { n: 38000 }).n, o = { v: 0 };
    el.style.width = el.offsetWidth + 'px'; // 마지막 숫자(38,000) 폭으로 고정
    el.textContent = '0';
    ScrollTrigger.create({ trigger: '.s-big', start: 'top 70%', once: true, onEnter: () => {
      CAMPAIGNS.then(n => gsap.to(o, { v: n || END, duration: 1.6, ease: 'expo.out', onUpdate: () => { el.textContent = Math.round(o.v).toLocaleString('ko-KR'); },
        onComplete: () => gsap.fromTo(el, { scale: 1.08 }, { scale: 1, duration: .5, ease: 'back.out(3)' }) }));
    } });
  })();
  gsap.fromTo('[data-big]', { scale: .78, letterSpacing: '0em', opacity: .2 }, { scale: 1, letterSpacing: '-.06em', opacity: 1, ease: 'none', scrollTrigger: { trigger: '.s-big', start: 'top 85%', end: 'center 55%', scrub: true } });

  // 채널 흐름: 열마다 다른 속도로 위아래로
  $$('[data-flow] > div').forEach((c, i) => gsap.fromTo(c, { yPercent: i % 2 ? -18 : 6 }, { yPercent: i % 2 ? 6 : -22, ease: 'none', scrollTrigger: { trigger: '.s-flow', scrub: true } }));

  // 파트너 사진: 아래에서 위로 열림 + 시차
  gsap.to('[data-ptphoto]', { clipPath: 'inset(0% 0 0 0)', duration: 1.4, ease: 'power4.inOut', scrollTrigger: { trigger: '[data-ptphoto]', start: 'top 80%' } });
  gsap.fromTo('[data-ptphoto] img', { yPercent: -8 }, { yPercent: 8, ease: 'none', scrollTrigger: { trigger: '[data-ptphoto]', scrub: true } });
  gsap.from('.pt li', { opacity: 0, x: 30, stagger: .1, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: '[data-pt]', start: 'top 80%' } });


});
