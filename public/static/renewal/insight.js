// 개편 인사이트 목록(/insight) — 화면 움직임. 시안 lab/insight.html 의 스크립트를 옮긴 것(바꾸면 두 곳).
// 맨 위 글·글 카드는 서버가 관리자 글로 미리 그린다(src/main.tsx + src/routes/renewal/insight.tsx). 여기서는 첫 화면 제목 흐름·분류 탭·인애드 일상 사진첩·움직임만.
SITE.boot(ctx => {
  const { $, $$, lenis } = ctx;
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
  // 분류 이름 — 서버 insight.tsx CAT·SUB 와 같게
  const SUB = { viral: '바이럴 마케팅', influencer: '인플루언서', seeding: '체험단', seo: 'SEO', review: '리뷰', oliveyoung: '올리브영', ppl: 'PPL' };
  const rows = $$('[data-irs] .ir');

  // ── 1. 첫 화면: 글 수·최근 날짜, 실제 글 제목 세 줄이 반대 방향으로 흐르다 느려짐 ──
  if (rows.length) {
    $('[data-ih-count]').textContent = `${String(rows.length).padStart(2, '0')} POSTS`;
    $('[data-ih-upd]').textContent = `UPDATED ${rows[0].dataset.date || ''}`;
    const titles = rows.map(r => $('.tt', r).firstChild.textContent.trim());
    const num = t => esc(t).replace(/(\d[\d,.]*\s?(%|배|개|가지|원|만 원)?)/g, '<b class="n">$1</b>');
    const step = Math.max(1, Math.round(titles.length / 3));
    $('[data-ih-rows]').innerHTML = [0, 1, 2].map(r => {
      const seq = titles.slice(r * step).concat(titles.slice(0, r * step)).map(t => `<span>${num(t)}</span>`).join('');
      return `<div class="ih-row">${seq}${seq}</div>`;
    }).join('');
    const flows = $$('.ih-row').map((row, i) => gsap.fromTo(row, { xPercent: i % 2 ? -50 : 0 }, { xPercent: i % 2 ? 0 : -50, duration: 90 + i * 14, ease: 'none', repeat: -1 }));
    flows.forEach(f => { f.timeScale(6); gsap.to(f, { timeScale: 1, duration: 3.2, ease: 'power2.out', delay: .4 }); });
  }
  // 장면 영상: 다섯 장면이 한 번 넘어가고 마지막 장면에서 멈춤(처음으로 돌아가지 않음)
  const vids = $$('[data-ih-media] video');
  function play(i) {
    vids.forEach((v, k) => v.classList.toggle('on', k === i));
    const v = vids[i]; v.currentTime = 0; v.playbackRate = .8; v.play().catch(() => {});
    if (i < vids.length - 1) setTimeout(() => play(i + 1), 1500);
    else gsap.to('[data-ih-shade]', { backgroundColor: 'rgba(11,12,16,.3)', duration: 1.6 }); // 마지막 장면은 조금 더 어둡게 눌러 글자가 앞에 서게
  }
  if (vids.length) play(0);
  const hs = SplitText.create('[data-ih-t]', { type: 'lines', mask: 'lines', linesClass: 'ln' });
  gsap.from(hs.lines, { yPercent: 110, duration: 1.2, stagger: .1, ease: 'power4.out', delay: .55 });
  gsap.from('[data-ih-type] .mono, [data-ih-sub], [data-ih-meta]', { opacity: 0, y: 14, duration: .8, stagger: .08, delay: .9 });
  // 스크롤: 영상은 천천히 밀려 내려가고 글자는 먼저 빠짐(화면을 붙잡지 않음)
  gsap.to('[data-ih-media]', { yPercent: 18, scale: 1.06, ease: 'none', scrollTrigger: { trigger: '.ih', start: 'top top', end: 'bottom top', scrub: true } });
  gsap.to('[data-ih-type], [data-ih-rows]', { yPercent: -30, opacity: 0, ease: 'none', scrollTrigger: { trigger: '.ih', start: 'top top', end: 'bottom 30%', scrub: true } });

  // ── 2. 맨 위 글: 썸네일이 아래에서 열림(글이 없으면 구역을 뺌) ──
  if ($('[data-feat]')) {
    gsap.to('[data-feat-pic]', { clipPath: 'inset(0% 0 0 0)', duration: 1.4, ease: 'power4.inOut', scrollTrigger: { trigger: '[data-feat-pic]', start: 'top 82%' } });
    gsap.from('[data-feat] .feat-meta, [data-feat] .feat-t, [data-feat] .feat-s, [data-feat] .more', { opacity: 0, y: 26, duration: .9, stagger: .08, ease: 'power3.out', scrollTrigger: { trigger: '[data-feat]', start: 'top 80%' } });
  } else { const fs = $('[data-feat-sec]'); if (fs) fs.remove(); }

  // ── 3. 분류 탭(밑줄) — 콘텐츠별 전략을 고르면 서비스별 작은 탭이 한 줄 더, 인애드 일상은 사진첩(2026-11-09 대표 1-1·2-1) ──
  const subEl = $('[data-subtabs]'), galEl = $('[data-gal]'), irsEl = $('[data-irs]'), emptyEl = $('[data-empty]');
  emptyEl.style.display = rows.length ? 'none' : 'block';
  let G = [];
  const TABS = [['all', '전체'], ['content-strategy', '콘텐츠별 전략'], ['case-study', '실전 사례'], ['resources', '실무 자료실'], ['gallery', '인애드 일상']];
  const cnt = k => k === 'gallery' ? G.length : k === 'all' ? rows.length : rows.filter(r => r.dataset.main === k).length;
  const CS = rows.filter(r => r.dataset.main === 'content-strategy');
  const SUBS = [['all', '전체']].concat(Object.entries(SUB).filter(([k]) => CS.some(r => r.dataset.subcat === k)));
  subEl.innerHTML = SUBS.map(([k, n], i) => `<button type="button" data-sub="${k}" class="${i ? '' : 'on'}">${n}<sup>${k === 'all' ? CS.length : CS.filter(r => r.dataset.subcat === k).length}</sup></button>`).join('');
  let main = 'all', sub = 'all';
  function filter() {
    const gal = main === 'gallery';
    subEl.hidden = main !== 'content-strategy'; irsEl.hidden = gal; galEl.hidden = !gal;
    const show = gal ? [] : rows.filter(r => (main === 'all' || r.dataset.main === main) && (main !== 'content-strategy' || sub === 'all' || r.dataset.subcat === sub));
    gsap.to(rows, { opacity: 0, y: -10, duration: .22, ease: 'power2.in', overwrite: true, onComplete: () => {
      rows.forEach(r => r.classList.toggle('gone', !show.includes(r)));
      emptyEl.style.display = !gal && !show.length ? 'block' : 'none';
      gsap.fromTo(gal ? $$('.gc', galEl) : show, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: .6, stagger: .04, ease: 'power3.out' });
      lenis.resize(); ScrollTrigger.refresh();
    } });
  }
  function drawTabs() {
    $('[data-tabs]').innerHTML = TABS.filter(([k]) => k === 'all' || cnt(k)).map(([k, n]) => `<button type="button" data-tab="${k}" class="${k === main ? 'on' : ''}">${n}<sup>${cnt(k)}</sup></button>`).join('');
    $$('[data-tab]').forEach(b => b.addEventListener('click', () => {
      if (b.classList.contains('on')) return;
      $$('[data-tab]').forEach(x => x.classList.toggle('on', x === b));
      main = b.dataset.tab; sub = 'all'; $$('[data-sub]', subEl).forEach((x, i) => x.classList.toggle('on', !i));
      filter();
    }));
  }
  drawTabs();
  $$('[data-sub]', subEl).forEach(b => b.addEventListener('click', () => {
    if (b.classList.contains('on')) return;
    $$('[data-sub]', subEl).forEach(x => x.classList.toggle('on', x === b));
    sub = b.dataset.sub; filter();
  }));
  // 카드는 각자 화면에 들어올 때 올라온다
  rows.forEach(r => gsap.from(r, { yPercent: 30, opacity: 0, duration: .6, ease: 'power3.out', scrollTrigger: { trigger: r, start: 'top 96%' } }));

  // ── 인애드 일상: 관리자 사진첩(공개 목록)을 불러와 묶음 카드 → 누르면 크게 보기(화살표·밀기·키보드로 넘김) ──
  const lb = $('[data-lb]'), lbImg = $('[data-lb-img]');
  let flat = [], li = 0;
  const lbShow = i => {
    li = (i + flat.length) % flat.length; const f = flat[li];
    lbImg.src = f.src; $('[data-lb-cap]').textContent = f.g.caption || ''; $('[data-lb-tag]').textContent = [f.g.date.replace(/-/g, '.'), f.g.tag].filter(Boolean).join(' · ');
    $('[data-lb-n]').textContent = `${String(li + 1).padStart(2, '0')} / ${String(flat.length).padStart(2, '0')}`;
  };
  const lbOpen = i => { lbShow(i); lb.hidden = false; lenis.stop(); gsap.fromTo(lb, { opacity: 0 }, { opacity: 1, duration: .35 }); };
  const lbClose = () => gsap.to(lb, { opacity: 0, duration: .25, onComplete: () => { lb.hidden = true; lenis.start(); } });
  $('[data-lb-x]').addEventListener('click', lbClose);
  lb.addEventListener('click', e => { if (e.target === lb) lbClose(); });
  $('[data-lb-prev]').addEventListener('click', () => lbShow(li - 1));
  $('[data-lb-next]').addEventListener('click', () => lbShow(li + 1));
  addEventListener('keydown', e => { if (lb.hidden) return; if (e.key === 'Escape') lbClose(); if (e.key === 'ArrowLeft') lbShow(li - 1); if (e.key === 'ArrowRight') lbShow(li + 1); });
  let x0 = null;
  lb.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', e => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 50) lbShow(li + (dx < 0 ? 1 : -1)); x0 = null; });
  fetch('/api/admin/public/gallery').then(r => r.json()).then(d => {
    G = (d.items || []).map(x => ({ caption: x.caption || '', tag: x.tag || '', date: (x.createdAt || '').slice(0, 10), images: (x.images || []).map(m => m.url).filter(Boolean) })).filter(g => g.images.length);
    if (!G.length) return;
    galEl.innerHTML = G.map((g, i) => `<button type="button" class="gc" data-g="${i}"><span class="ph"><img src="${esc(g.images[0])}" alt="" loading="lazy" />${g.images.length > 1 ? `<span class="mono n">${g.images.length}장</span>` : ''}</span><span class="mono d">${esc(g.date.replace(/-/g, '.'))}${g.tag ? ` · ${esc(g.tag)}` : ''}</span><b>${esc(g.caption)}</b></button>`).join('');
    flat = G.flatMap(g => g.images.map(src => ({ src, g })));
    $$('.gc', galEl).forEach(c => c.addEventListener('click', () => lbOpen(flat.findIndex(f => f.g === G[+c.dataset.g]))));
    drawTabs(); // 사진이 있으면 '인애드 일상' 탭이 생김
  }).catch(() => {});
});
