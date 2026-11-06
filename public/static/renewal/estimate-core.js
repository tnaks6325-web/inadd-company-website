// 견적 조합기 시안 4종(영수증·팀 조립·막대 비교·한 달 달력) 공통 — 항목·단품가·계산 규칙·신청 칸.
// 항목·단품가·규칙은 운영 src/lib/subscription-estimate.ts 와 같다(대표 결정 2026-10-27):
// 항목은 켜고 끄기만 하고, 고른 단품가 합이 300만 원 이상이면 팀구독 300만 원(10가지 전부 포함). 초기진단·세팅은 항상 무료, 주간보고서는 항상 포함.
// 시안에서는 신청을 눌러도 아무것도 보내지 않는다. 운영(window.INAD_LIVE)에서는 운영 조합기(public/static/estimate.js)와 같은 주소·같은 칸으로 접수한다(POST /api/mail/estimate, 금액은 서버가 다시 계산).
(() => {
  const PACKAGE = 300;
  // part: 팀 조립형의 자리(구독 페이지 '전담 TF팀 구성' 6개 파트), cal: 한 달 달력형에 찍는 방법
  const ITEMS = [
    { id: 'diag', name: '초기진단·세팅', short: '진단', amount: '무료', price: 30, fixed: true, free: true, part: 'ads', cal: { kind: 'first' } },
    { id: 'performance', name: '퍼포먼스 마케팅', short: '광고 운영', amount: '운영 대행', note: '광고비 월 1,000만 원 한도까지 운영', price: 100, part: 'ads', cal: { kind: 'always' } },
    { id: 'creative', name: '광고 소재 제작', short: '소재', amount: '무제한', note: '월 운영 범위 안에서 제작', price: 80, part: 'design', cal: { kind: 'always' } },
    { id: 'reels', name: '릴스 소재 제작', short: '릴스', amount: '월 1회', price: 30, part: 'video', cal: { kind: 'count', n: 1 } },
    { id: 'landing', name: '랜딩페이지 제작·운영', short: '랜딩', amount: '3개월마다 1회', price: 60, part: 'plan', cal: { kind: 'quarter' } },
    { id: 'cafe', name: '카페 바이럴', short: '카페', amount: '월 15회', price: 40, part: 'viral', cal: { kind: 'count', n: 15 } },
    { id: 'blog', name: '블로그 체험단', short: '블로그', amount: '월 15회', price: 40, part: 'seeding', cal: { kind: 'count', n: 15 } },
    { id: 'purchase', name: '구매후기 체험단', short: '구매후기', amount: '월 50회', price: 50, part: 'seeding', cal: { kind: 'count', n: 50 } },
    { id: 'press', name: '언론기사 작성·송출', short: '기사', amount: '월 1회', price: 20, part: 'plan', cal: { kind: 'count', n: 1 } },
    { id: 'report', name: '브랜드 주간보고서', short: '주간보고', amount: '매주', price: 0, fixed: true, part: 'ads', cal: { kind: 'weekly' } },
  ];
  // 구독 페이지 '우리 브랜드 전담 TF팀 구성'의 6개 파트(이름·하는 일 그대로)
  const PARTS = [
    { k: 'ads', t: '광고 운영', d: '퍼포먼스 마케팅, 광고 계정 진단·세팅, GA4·GTM 설치, 브랜드 주간보고서' },
    { k: 'plan', t: '기획·카피', d: '랜딩페이지 기획·원고, 광고 카피, 언론기사 작성' },
    { k: 'design', t: '디자인', d: '광고 소재 무제한 제작, 랜딩페이지 디자인' },
    { k: 'video', t: '영상', d: '릴스 소재 기획·제작' },
    { k: 'viral', t: '바이럴 운영', d: '카페 바이럴 월 15회' },
    { k: 'seeding', t: '체험단 운영', d: '블로그 체험단 월 15회, 구매후기 체험단 월 50회' },
  ];
  const FREE = ITEMS.filter(it => it.free).reduce((s, it) => s + it.price, 0);
  const won = n => n.toLocaleString('ko-KR') + '만 원';

  function compute(ids) {
    const want = new Set(ids);
    const picked = ITEMS.filter(it => !it.fixed && want.has(it.id));
    if (!picked.length) return { picked, listTotal: 0, subtotal: 0, total: 0, capped: false, saving: 0 };
    const subtotal = picked.reduce((s, it) => s + it.price, 0);
    const capped = subtotal >= PACKAGE;
    const total = capped ? PACKAGE : subtotal;
    const listTotal = subtotal + FREE;
    return { picked, listTotal, subtotal, total, capped, saving: listTotal - total };
  }
  // 합계 아래 한 줄 안내(운영 조합기 문구와 같은 뜻)
  function note(e) {
    if (!e.picked.length) return '항목을 골라 주세요.';
    if (e.capped) return `단품가 합계가 ${won(PACKAGE)} 이상이라 팀구독 ${won(PACKAGE)}으로 10가지가 전부 들어갑니다.`;
    return `${won(PACKAGE - e.subtotal)} 더 담으면 팀구독 ${won(PACKAGE)}으로 10가지가 전부 들어갑니다.`;
  }
  // 신청 메일에 들어갈 조합 요약(운영 estimateText 와 같은 모양)
  function text(e) {
    const lines = ITEMS.filter(it => it.fixed || e.picked.includes(it))
      .map(it => `· ${it.name}${it.free ? '' : ` (${it.amount})`} — ${it.free ? '무료 포함' : it.fixed ? '포함' : won(it.price)}`);
    lines.push(`단품가 합계 ${won(e.listTotal)} → 예상 월 ${won(e.total)} (부가세 별도)`);
    return lines.join('\n');
  }

  // 신청 칸(운영 조합기의 '이 조합으로 상담 신청'과 같은 칸). 시안이라 보내지 않음
  const TICK = '<svg viewBox="0 0 12 12" fill="none"><path d="M2 6.2l2.6 2.6L10 3.4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  function formHTML(id) {
    return `
<form class="ef" data-ef autocomplete="off" novalidate>
  <div class="ef-h"><span class="mono">APPLY</span><b>이 조합으로 상담 신청</b></div>
  <div class="ef-grid">
    <div class="ef-f"><label for="${id}-c">회사/브랜드명<em>*</em></label><input id="${id}-c" name="company" required /><i></i></div>
    <div class="ef-f"><label for="${id}-n">담당자 이름<em>*</em></label><input id="${id}-n" name="name" required /><i></i></div>
    <div class="ef-f"><label for="${id}-p">연락처<em>*</em></label><input id="${id}-p" name="phone" type="tel" placeholder="010-0000-0000" required /><i></i></div>
    <div class="ef-f"><label for="${id}-e">이메일<em>*</em></label><input id="${id}-e" name="email" type="email" required /><i></i></div>
    <div class="ef-f full"><label for="${id}-m">더 알려 주실 내용</label><textarea id="${id}-m" name="message" rows="2" placeholder="판매 채널, 월 광고비, 고민 중인 점 등"></textarea><i></i></div>
  </div>
  <label class="ef-ck"><input type="checkbox" name="privacy" required /><span class="e-box">${TICK}</span><span>개인정보 수집 및 이용에 동의합니다.<em>*</em></span></label>
  <div class="ef-send"><p data-ef-sum></p><button type="submit">이 조합으로 상담 신청하고 <span class="nb">추가 혜택 받아보기</span></button></div>
  <p class="ef-err" data-ef-err role="alert" hidden></p>
  <div class="ef-sent" data-ef-sent role="status">${window.INAD_LIVE ? '<b>상담 신청이 접수되었습니다</b><p>고르신 조합과 금액을 <span data-ef-mail></span> 로도 보내 드렸습니다. 담당자가 1영업일 이내 연락드립니다.<br />급한 문의: <a href="tel:010-9186-9944">010-9186-9944</a></p>' : '<b>시안이라 실제로 보내지 않았어요</b><p>실제 페이지에서는 고른 조합과 금액이 담당자 메일로 가고, 1영업일 이내 연락드린다는 안내가 나옵니다.</p>'}<pre data-ef-pre></pre></div>
</form>`;
  }
  // getEst: 지금 조합을 돌려주는 함수. 금액 줄은 조합이 바뀔 때 refresh() 로 다시 그린다
  function bindForm(root, getEst) {
    const f = root.querySelector('[data-ef]'), sum = f.querySelector('[data-ef-sum]');
    const refresh = () => { const e = getEst(); sum.textContent = !e.picked.length ? '항목을 먼저 골라 주세요.' : e.capped ? `팀구독 10가지 전부 · 예상 월 ${won(e.total)} (부가세 별도)` : `${e.picked.length}가지 · 예상 월 ${won(e.total)} (부가세 별도)`; };
    const err = f.querySelector('[data-ef-err]'), btn = f.querySelector('button[type="submit"]'), btnHTML = btn.innerHTML;
    let busy = false;
    const fail = m => { err.textContent = m; err.hidden = false; };
    f.addEventListener('submit', ev => {
      ev.preventDefault();
      if (window.INAD_LIVE) {
        if (busy) return;
        const fd = new FormData(f), v = k => String(fd.get(k) || '').trim(), e = getEst();
        const payload = { items: e.picked.map(it => it.id), company: v('company'), name: v('name'), phone: v('phone'), email: v('email'), message: v('message'), privacy: !!fd.get('privacy'), source: 'home' };
        if (!payload.items.length) return fail('항목을 하나 이상 골라 주세요.');
        if (!payload.company || !payload.name || !payload.phone || !payload.email) return fail('별표(*) 칸을 모두 채워 주세요.');
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) return fail('이메일 주소를 확인해 주세요.');
        if (!payload.privacy) return fail('개인정보 수집 및 이용에 동의해 주세요.');
        err.hidden = true; busy = true; btn.disabled = true; btn.textContent = '접수 중...';
        fetch('/api/mail/estimate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
          .then(res => res.json().catch(() => ({})).then(j => { if (!res.ok || !j.ok) throw new Error(res.status === 400 || res.status === 429 ? (j.error || '') : ''); return j; }))
          .then(j => {
            const total = Number(j.total) || 0;
            try { if (typeof window.gtag === 'function') window.gtag('event', 'estimate_submit', { value: total * 10000, currency: 'KRW', item_count: payload.items.length, capped: total >= PACKAGE, source: 'home' }); } catch (x) {}
            try { if (typeof window.trackNaverLead === 'function') window.trackNaverLead(); } catch (x) {}
            const sent = f.querySelector('[data-ef-sent]');
            f.querySelector('[data-ef-pre]').textContent = text(e);
            f.querySelector('[data-ef-mail]').textContent = payload.email;
            [...f.children].forEach(c => { if (c !== sent && !c.matches('.ef-h')) c.style.display = 'none'; });
            sent.classList.add('on');
            if (window.gsap) gsap.fromTo(sent, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: .5, ease: 'power3.out' });
          })
          .catch(x => { busy = false; btn.disabled = false; btn.innerHTML = btnHTML; fail((x && x.message) || '접수 중 오류가 났어요. 잠시 뒤 다시 시도하거나 010-9186-9944로 전화 주세요.'); });
        return;
      }
      const e = getEst(), sent = f.querySelector('[data-ef-sent]');
      f.querySelector('[data-ef-pre]').textContent = e.picked.length ? text(e) : '고른 항목이 없습니다.';
      sent.classList.add('on');
      if (window.gsap) gsap.fromTo(sent, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: .5, ease: 'power3.out' });
    });
    refresh();
    return refresh;
  }
  // 합계 숫자가 굴러가며 바뀌는 효과
  function roll(el, to, dur = .7) {
    const from = +(el.dataset.v || 0); el.dataset.v = to;
    if (!window.gsap) { el.textContent = to.toLocaleString('ko-KR'); return; }
    const o = { v: from };
    gsap.to(o, { v: to, duration: dur, ease: 'power3.out', overwrite: true, onUpdate: () => { el.textContent = Math.round(o.v).toLocaleString('ko-KR'); } });
  }

  window.EST = { PACKAGE, ITEMS, PARTS, FREE, won, compute, note, text, formHTML, bindForm, roll, TICK };
})();
