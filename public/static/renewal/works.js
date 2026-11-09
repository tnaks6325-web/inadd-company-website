// 개편 포트폴리오(/works) — 화면 움직임. 시안 lab/works.html 의 스크립트를 옮긴 것(바꾸면 두 곳).
// 본문·12단계·사례 카드는 서버가 미리 채운다(works-body.gen.html + src/routes/renewal/works.tsx 그로스 카드 + src/main.tsx 관리자 사례).
// 여기서는 첫 화면 사진판·브랜드 벽(사진+클라이언트의 말)·탭·더 보기·움직임만. 서버가 사례를 못 채웠으면 공개 목록을 직접 불러온다.
SITE.boot(ctx => {
  const { D, $, $$, lenis, mobile } = ctx;
  const camp = D.stats.find(s => s.en === 'CAMPAIGNS'), since = D.stats.find(s => s.en === 'SINCE');
  const campText = camp.n.toLocaleString('en-US') + camp.unit;
  const esc = v => String(v == null ? '' : v).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  // 서비스 표기의 &·/·, 기호를 가운뎃점으로 통일(운영 데이터는 그대로 두고 보여 줄 때만) — 서버 works.tsx svcText 와 같게
  const svc = t => String(t || '').replace(/\s*[&\/,]\s*/g, ' · ');
  const FILTERS = [['all', '전체'], ['performance', '그로스'], ['viral', '바이럴'], ['influencer', '인플루언서'], ['seeding', '체험단'], ['review', '리뷰'], ['oliveyoung', '올리브영'], ['ppl', 'PPL']];

  // 클라이언트의 말 — 대표 카카오톡 실제 메시지(voices-data.js, 홈 '클라이언트의 말'과 같은 원본). 브랜드 담당자가 보낸 말만, 문장은 그대로.
  // [대화 id, 담당자 메시지 순번, (한 메시지에 앞뒤 업무 이야기가 붙어 있으면) 여기서부터 자름]. 가상 예시(example)는 쓰지 않는다.
  // 2026-11-07 대표: 예전 '고객 후기' 문장(출처 확인 불가)을 이걸로 교체. 홈에 공개 승인된 8개(1·2·5·6·7·8·12·15)만 — 다른 대화는 넣지 않는다
  const QUOTES = [[1, 1], [7, 1], [6, 0], [12, 0], [5, 1], [2, 0], [8, 0, '확실히'], [15, 0, '좀 늦었지만']];
  const VOICE = QUOTES.map(([id, i, from]) => {
    const v = (window.VOICES || []).find(x => x.id === id && !x.example); if (!v) return null;
    const them = v.msgs.filter(m => m.side === 'them' && m.t);
    let t = [].concat(i).map(n => them[n] && them[n].t).filter(Boolean).join('\n');
    if (from && t.includes(from)) t = t.slice(t.indexOf(from));
    return { t, cat: v.cat };
  }).filter(Boolean);

  // ── 숫자 ──
  $$('[data-camp]').forEach(el => el.textContent = campText);
  $('[data-since]').innerHTML = `${since.n}년부터 누적 캠페인 ${campText}<br /><span class="mono" style="letter-spacing:.04em">PORTFOLIO · REAL BRANDS</span>`;

  // ── 2. 12단계: 금액 없이 단계만, 스크롤에 맞춰 윗선이 차오르고 글이 진해짐(휴대폰은 2열·이름만) ──
  const fl = $('[data-flow]'), fss = $$('.wk-fs', fl);
  const AXIS = 'scaleX';
  gsap.set($$('.wk-fs i', fl), { [AXIS]: 0 });
  const flowTl = gsap.timeline({ scrollTrigger: { trigger: fl, start: 'top 78%', end: mobile ? 'bottom 55%' : 'bottom 50%', scrub: .6,
    onUpdate: st => { const n = st.progress * fss.length; fss.forEach((el, i) => el.classList.toggle('on', n > i + .4)); } } });
  fss.forEach((el, i) => flowTl.to($('i', el), { [AXIS]: 1, duration: 1, ease: 'none' }, i));

  // ── 3. 브랜드 벽: 실제 사진 47장(포트폴리오 대표 사진) + 클라이언트의 말 카드, 두 줄이 반대로 흐름 ──
  const items = [];
  for (let i = 0; i < 47; i++) {
    items.push(`<img src="/static/works-hero/brands/b${String(i).padStart(2, '0')}.webp" alt="" loading="lazy" width="220" height="220" />`);
    const q = i % 6 === 2 && VOICE[(i - 2) / 6]; // 사진 6장마다 1장(8개)
    if (q) items.push(`<div class="wk-rv"><span class="mono">클라이언트의 말</span><p class="bub">${esc(q.t).replace(/\n/g, '<br />')}</p><span>${esc(q.cat)}</span></div>`);
  }
  const half = Math.ceil(items.length / 2);
  $('[data-row="0"]').innerHTML = items.slice(0, half).join('');
  $('[data-row="1"]').innerHTML = items.slice(half).join('');
  $$('.wk-row').forEach((r, i) => gsap.fromTo(r, { x: i ? () => -(r.scrollWidth - innerWidth) : 0 }, { x: i ? 0 : () => -(r.scrollWidth - innerWidth), ease: 'none', scrollTrigger: { trigger: '.wk-wall', start: 'top bottom', end: 'bottom top', scrub: true, invalidateOnRefresh: true } }));
  // 브랜드 수는 관리자 '함께한 브랜드'(base.js setNums). 벽 제목 숫자 세기는 제목 줄 나누기 뒤 늘 빈 요소를 잡아 한 번도 움직이지 않던 코드라 뺌(2026-11-09, 화면은 그대로 고정 숫자)

  // ── 사례 카드: 서버가 채웠으면 그대로, 못 채웠으면 공개 목록을 불러와 같은 모양으로 그림(src/routes/renewal/works.tsx WorkCards 와 같게) ──
  const grid = $('[data-grid]');
  const coverCard = w => `<article class="wk-card" data-cat="${esc((w.tags || []).join(' '))}">
      <div class="wk-pic"><img src="${esc(w.cover)}" alt="${esc(w.brand)}" loading="lazy" onerror="this.style.opacity=0" /><p class="ov"><span class="mono">CASE</span>${esc(svc(w.services))}</p></div>
      <div class="wk-meta2"><b>${esc(w.brand)}</b><span>${esc(svc(w.services))}</span></div></article>`;
  const loaded = $('article.wk-card', grid) ? Promise.resolve() : fetch('/api/admin/public/works').then(r => r.json()).then(data => {
    // 대표이미지(cover) 있는 항목만, featuredRank 순(없으면 등록 순) — works.tsx visibleWorks 와 같은 기준
    const list = (data.items || []).map((item, index) => ({ item, index })).filter(e => e.item.cover)
      .sort((a, b) => ((Number(a.item.featuredRank) || 999) - (Number(b.item.featuredRank) || 999)) || a.index - b.index).map(e => e.item);
    grid.insertAdjacentHTML('beforeend', list.map(coverCard).join(''));
  }).catch(() => {});

  // ── 1. 첫 화면 제목·문구(사진판과 따로 바로 시작) ──
  // 제목 줄은 글꼴이 오면 다시 나뉘므로 따로 움직이고(base.js lines), 문구는 처음 나눈 줄 수로 같은 시각(제목 끝 .7초 전)에 시작
  const t0 = ctx.now(); let titleN = 1;
  ctx.lines('[data-hero-title]', ls => { titleN = ls.length; return gsap.from(ls, { yPercent: 110, duration: 1.1, stagger: .09, ease: 'power4.out', delay: ctx.wait(t0, .9) }); });
  gsap.set('[data-hero-sub]', { opacity: 0, y: 16 });
  gsap.to('[data-hero-sub]', { opacity: 1, y: 0, duration: .8, stagger: .1, ease: 'power3.out', delay: .9 + 1.1 + .09 * (titleN - 1) - .7 });
  gsap.to('[data-mosaic]', { scale: .9, yPercent: 8, opacity: .35, ease: 'none', scrollTrigger: { trigger: '.wk-hero', start: 'top top', end: 'bottom top', scrub: true } });
  gsap.to('.wk-hero-in', { yPercent: -18, ease: 'none', scrollTrigger: { trigger: '.wk-hero', start: 'top top', end: 'bottom top', scrub: true } });

  loaded.then(() => {
    // ── 1. 첫 화면 사진판: 사례 대표 사진이 하나씩 열리고, 몇 초마다 한 칸씩 다른 사례로 바뀜(아래에서 덮듯이) ──
    const covers = $$('article.wk-card', grid).map(c => ({ cover: ($('img', c) || {}).src, brand: ($('.wk-meta2 b', c) || {}).textContent || '' })).filter(w => w.cover);
    if (covers.length) {
      const COLS = mobile ? 3 : 6, ROWS = mobile ? 4 : 3, NT = COLS * ROWS;
      let nextCover = NT % covers.length;
      $('[data-mosaic]').innerHTML = Array.from({ length: NT }, (_, i) => { const w = covers[i % covers.length]; return `<div class="wk-tile"><img src="${esc(w.cover)}" alt="" /><span class="mono">${esc(w.brand)}</span></div>`; }).join('');
      const tiles = $$('.wk-tile');
      const swap = () => {
        if (document.hidden) return;
        const t = tiles[Math.floor(Math.random() * tiles.length)], w = covers[nextCover]; nextCover = (nextCover + 1) % covers.length;
        const img = new Image(); img.src = w.cover; img.alt = '';
        img.onload = () => {
          img.style.cssText = 'position:absolute;inset:0;clip-path:inset(100% 0 0 0)'; t.appendChild(img);
          gsap.to(img, { clipPath: 'inset(0% 0 0 0)', duration: 1, ease: 'power4.inOut', onComplete: () => { [...t.querySelectorAll('img')].slice(0, -1).forEach(x => x.remove()); img.style.position = ''; img.style.clipPath = ''; $('.mono', t).textContent = w.brand; } });
        };
      };
      setTimeout(() => setInterval(swap, 1400), 3200);
      gsap.timeline({ delay: .2 })
        .to(tiles, { clipPath: 'inset(0% 0 0 0)', duration: 1.1, ease: 'power4.inOut', stagger: { each: .045, from: 'random' } })
        .to($$('.wk-tile img'), { scale: 1, duration: 2.2, ease: 'power3.out', stagger: .03 }, '<.2');
    }

    // ── 4. 사례 목록: 밑줄 탭으로 거르고 16개씩 더 보기 ──
    const cards = $$('.wk-card', grid);
    const count = f => cards.filter(c => f === 'all' || (c.dataset.cat || '').split(' ').includes(f)).length;
    $('[data-tabs]').innerHTML = FILTERS.filter(([f]) => f === 'all' || count(f) > 0).map(([f, n], i) => `<button type="button" class="${i ? '' : 'on'}" data-f="${f}">${n}<sup>${count(f)}</sup></button>`).join('');
    const STEP = mobile ? 8 : 16; let limit = STEP, cur = 'all';
    const moreBtn = $('[data-more]'), endNote = $('[data-end]');
    function apply(animate) {
      let shown = 0, total = 0; const fresh = [];
      cards.forEach(c => {
        const match = cur === 'all' || (c.dataset.cat || '').split(' ').includes(cur);
        if (match) total++;
        const show = match && shown < limit;
        if (show) { if (c.hidden) fresh.push(c); c.hidden = false; shown++; } else c.hidden = true;
      });
      moreBtn.textContent = `더보기 (${shown} / ${total})`;
      moreBtn.style.display = total > shown ? '' : 'none';
      endNote.style.display = total <= shown ? 'block' : 'none';
      if (animate && fresh.length) gsap.fromTo(fresh, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: .8, stagger: .04, ease: 'power3.out', overwrite: true });
      ScrollTrigger.refresh();
    }
    $$('[data-tabs] button').forEach(b => b.addEventListener('click', () => {
      $$('[data-tabs] button').forEach(x => x.classList.toggle('on', x === b));
      cur = b.dataset.f; limit = STEP;
      cards.forEach(c => c.hidden = true);
      apply(true);
      const top = $('#cases').getBoundingClientRect().top + scrollY;
      if (scrollY > top + 200) lenis.scrollTo('#cases', { duration: 1, offset: 40 });
    }));
    moreBtn.addEventListener('click', () => { limit += STEP; apply(true); });
    // 붙어 있는 탭이 머리 메뉴에 가리지 않게: 메뉴가 보이는 동안(올릴 때)은 메뉴 높이만큼 내려 붙음 — base.js 머리 메뉴 숨김 기준(160px·내릴 때)과 같게
    const tabsEl = $('[data-tabs]'), hdEl = $('[data-hd]');
    if (hdEl) lenis.on('scroll', ({ scroll, direction }) => { tabsEl.style.top = (scroll > 160 && direction === 1) ? '0px' : hdEl.offsetHeight + 'px'; });
    apply(false);
    ScrollTrigger.batch(cards.filter(c => !c.hidden), { start: 'top 92%', once: true, onEnter: b => gsap.from(b, { y: 50, opacity: 0, duration: .9, stagger: .06, ease: 'power3.out' }) });

    // 카드 반응: 마우스를 직접 움직일 때만(스크롤로 카드가 마우스 밑을 지날 때는 반응 없음)
    if (matchMedia('(hover:hover)').matches) {
      let act = null, at = 0;
      const set = c => { if (c === act) return; if (act) act.classList.remove('on'); act = c; at = lenis.scroll; if (c) c.classList.add('on'); };
      addEventListener('mousemove', e => set(e.target.closest && e.target.closest('.wk-card')));
      // 스크롤이 멈추며 남는 미세한 움직임은 무시하고, 실제로 30px 넘게 움직이면 끔
      lenis.on('scroll', ({ scroll }) => { if (act && Math.abs(scroll - at) > 30) set(null); });
    }
  });
});
