// 견적 조합기 · 영수증형(2026-11-05 대표 확정) — 시안 페이지(estimate-1)·구독 페이지·홈이 같이 쓴다.
// 계산 규칙·항목·신청 칸은 estimate-core.js(EST). 시안이라 신청은 보내지 않는다.
// 쓰는 법: 페이지에 <section data-est-receipt data-label="( 01 ) BUILD YOUR TEAM" data-title="…">, <section data-est-apply> 를 두고
//          SITE.boot 안에서 ESTR.mount(ctx, { id: 'e1' }) 를 부른다.
(() => {
  function sectionHTML(label, title) {
    return `
    <div class="e-top">
      <div><span class="mono">${label}</span><h2 data-split>${title}</h2></div>
      <div class="e-tools"><button type="button" data-all>10가지 전부 담기</button><button type="button" data-clear>모두 빼기</button></div>
    </div>
    <div class="e-grid">
      <div class="er-rows" data-rows></div>
      <div class="rc-wrap" data-rcw>
        <button type="button" class="rc-bar" data-rcbar><span>예상 월 <b data-bar-t>0</b>만 원</span><span data-bar-l>내역 보기</span></button>
        <div class="rc" data-rc>
          <div class="rc-hd"><span class="mono">IN AD COMPANY</span><b>마케팅팀 구독 견적서</b><span>예시 견적 · 부가세 별도</span></div>
          <ul class="rc-lines" data-lines></ul>
          <div class="rc-sub"><span>단품가 합계</span><span class="p" data-list>0만 원</span><div class="stamp" data-stamp><span>TEAM PLAN</span><b>팀구독 적용</b><span>월 300만 원</span></div></div>
          <div class="rc-tot"><span>예상 월</span><b><span data-tot>0</span><small>만 원</small></b></div>
          <p class="rc-vat">부가세 별도</p>
          <p class="rc-save" data-save></p>
          <p class="e-note" data-note></p>
          <a class="rc-btn" href="#apply" data-go>이 조합으로 상담 신청</a>
        </div>
      </div>
    </div>`;
  }

  function mount(ctx, opt = {}) {
    const { $, $$, lenis } = ctx, E = window.EST;
    const sec = $('[data-est-receipt]'), apply = $('[data-est-apply]');
    if (!sec) return;
    sec.id = sec.id || 'estimate';
    if (apply) apply.id = apply.id || 'apply';
    sec.innerHTML = sectionHTML(sec.dataset.label || '( 01 ) BUILD YOUR TEAM', sec.dataset.title || '담을수록 계산서에<br />한 줄씩 찍힙니다');
    const q = s => $(s, sec), qa = s => $$(s, sec);

    // ── 항목 줄 ──
    q('[data-rows]').innerHTML = E.ITEMS.map((it, i) => `
      <label class="er-row${it.fixed ? ' fx on' : ''}" data-id="${it.id}">
        <span class="mono er-n">${String(i + 1).padStart(2, '0')}</span>
        <input type="checkbox" ${it.fixed ? 'checked disabled' : 'checked'} value="${it.id}" /><span class="e-box">${E.TICK}</span>
        <span class="er-nm">${it.name}<small>${it.fixed ? '항상 포함' : it.amount}${it.note ? `<span class="er-nt"> · ${it.note}</span>` : ''}</small></span>
        <span class="er-pr">${it.free ? `<s>${it.price}만 원</s>무료` : it.fixed ? '포함' : E.won(it.price)}</span>
      </label>`).join('');
    const boxes = qa('[data-rows] input:not([disabled])');
    const ids = () => boxes.filter(b => b.checked).map(b => b.value);

    // ── 계산서 ──
    const lines = q('[data-lines]'), rc = q('[data-rc]'), stamp = q('[data-stamp]');
    let wasCapped = null, refreshForm = null;
    const shown = new Set();
    function lineHTML(it) {
      const p = it.free ? `<s>${it.price}만 원</s>무료` : it.fixed ? '포함' : E.won(it.price);
      return `<li data-l="${it.id}"><span>${it.name}<em>${it.fixed && !it.free ? '' : it.amount === '무료' ? '' : it.amount}</em></span><span class="p">${p}</span></li>`;
    }
    function render(first) {
      const e = E.compute(ids()), want = e.picked.length ? E.ITEMS.filter(it => it.fixed || e.picked.includes(it)) : [];
      const wantIds = new Set(want.map(it => it.id));
      // 빠진 줄은 접히며 사라지고, 새 줄은 제자리에 끼워져 찍힘
      $$('li[data-l]', lines).forEach(li => { if (!wantIds.has(li.dataset.l)) { shown.delete(li.dataset.l); gsap.to(li, { height: 0, paddingTop: 0, paddingBottom: 0, opacity: 0, duration: .3, ease: 'power2.in', onComplete: () => li.remove() }); } });
      $$('.empty', lines).forEach(x => x.remove());
      want.forEach((it, i) => {
        if (shown.has(it.id)) return;
        shown.add(it.id);
        const next = want.slice(i + 1).map(n => $(`li[data-l="${n.id}"]`, lines)).find(Boolean);
        next ? next.insertAdjacentHTML('beforebegin', lineHTML(it)) : lines.insertAdjacentHTML('beforeend', lineHTML(it));
        const li = $(`li[data-l="${it.id}"]`, lines);
        if (!first) gsap.from(li, { height: 0, paddingTop: 0, paddingBottom: 0, opacity: 0, x: -10, duration: .4, ease: 'power3.out' });
        else gsap.from(li, { opacity: 0, y: 8, duration: .4, delay: .04 * i, ease: 'power3.out', scrollTrigger: { trigger: rc, start: 'top 80%' } });
      });
      if (!want.length) lines.insertAdjacentHTML('beforeend', '<li class="empty">항목을 골라 주세요</li>');
      q('[data-list]').textContent = E.won(e.listTotal);
      E.roll(q('[data-tot]'), e.total); E.roll(q('[data-bar-t]'), e.total);
      q('[data-save]').textContent = e.saving > 0 ? `따로 맡길 때보다 ${E.won(e.saving)} 아낍니다.` : '';
      q('[data-note]').textContent = E.note(e);
      rc.classList.toggle('capped', e.capped);
      if (e.capped !== wasCapped) {
        if (e.capped) gsap.fromTo(stamp, { scale: 1.8, opacity: 0, rotate: -14 }, { scale: 1, opacity: 1, rotate: -8, duration: .45, ease: 'back.out(2.2)', delay: first ? .9 : .15 });
        else gsap.to(stamp, { scale: .6, opacity: 0, duration: .25, ease: 'power2.in' });
        wasCapped = e.capped;
      }
      qa('[data-rows] .er-row').forEach(r => r.classList.toggle('on', $('input', r).checked));
      refreshForm && refreshForm();
    }
    boxes.forEach(b => b.addEventListener('change', () => render()));
    // 운영: 방문 기록(GA4) — 운영 조합기와 같은 이름 estimate_view(구역이 보이면 한 번)·estimate_edit(처음 고칠 때 한 번), source=home|subscription(opt.source)
    if (window.INAD_LIVE) {
      const track = (n, p) => { try { if (typeof window.gtag === 'function') window.gtag('event', n, p); } catch (x) {} };
      let edited = false; const edit = () => { if (!edited) { edited = true; track('estimate_edit', { source: opt.source || 'home' }); } };
      boxes.forEach(b => b.addEventListener('change', edit));
      ScrollTrigger.create({ trigger: sec, start: 'top 90%', once: true, onEnter: () => track('estimate_view', { source: opt.source || 'home' }) });
    }
    q('[data-all]').addEventListener('click', () => { boxes.forEach(b => b.checked = true); render(); });
    q('[data-clear]').addEventListener('click', () => { boxes.forEach(b => b.checked = false); render(); });
    const rcw = q('[data-rcw]');
    q('[data-go]').addEventListener('click', ev => { ev.preventDefault(); rcw.classList.remove('open'); if (apply) lenis.scrollTo(apply, { offset: -40, duration: 1.1 }); });

    // ── 신청 칸 ──
    if (apply) { apply.innerHTML = E.formHTML(opt.id || 'e1'); refreshForm = E.bindForm(apply, () => E.compute(ids()), opt.source || 'home'); }
    render(true);

    // ── 휴대폰: 계산서 띠(조합 구역을 보는 동안만 보임) ──
    q('[data-rcbar]').addEventListener('click', () => { rcw.classList.toggle('open'); q('[data-bar-l]').textContent = rcw.classList.contains('open') ? '접기' : '내역 보기'; });
    ScrollTrigger.create({ trigger: sec, start: 'top 60%', end: 'bottom 30%', onToggle: s => rcw.classList.toggle('show', s.isActive) });

    // 줄이 차례로 올라옴
    gsap.from(qa('[data-rows] .er-row'), { opacity: 0, y: 20, stagger: .05, duration: .6, ease: 'power3.out', scrollTrigger: { trigger: q('[data-rows]'), start: 'top 82%' } });
  }

  window.ESTR = { mount };
})();
