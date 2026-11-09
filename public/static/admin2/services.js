// 서비스(시안 B) — 서비스 6곳의 첫 화면 숫자와 자주 묻는 질문. 오른쪽 미리보기에 저장 전 값이 바로 보임
import { $, $$, esc, api, ask, toast, SVC, SVC_NAME, BANNED, saveBar, setDirtyCheck, preview, htmlToEdit, editToHtml } from './core.js';

const faqHTML = (f, i) => `<div class="fq"><button type="button" aria-expanded="false"><span class="mono">Q${String(i + 1).padStart(2, '0')}</span><b>${f.q}</b><span class="pl"></span></button><div class="a"><div><p>${f.a}</p></div></div></div>`;

export async function servicesView(el, svc) {
  if (!SVC_NAME[svc]) svc = SVC[0][0];
  el.innerHTML = `<div class="view"><div class="hd"><div><span class="mono sub">서비스</span><h1>${SVC_NAME[svc]}</h1></div><a class="lnk" href="/marketing/${svc}" target="_blank" rel="noopener">사이트에서 보기</a></div>
    <nav class="tabs" style="margin-top:6px">${SVC.map(([k, n]) => `<a href="#/services/${k}" class="${k === svc ? 'on' : ''}">${n}</a>`).join('')}</nav>
    <div data-body><p class="loading">불러오는 중…</p></div></div>`;
  const pv = preview(`/marketing/${svc}`);
  const [kd, fd] = await Promise.all([api('GET', '/hero-kpi'), api('GET', `/svc-faq/${svc}`)]);
  const kpi0 = ((kd.kpi || {})[svc] || []).map(x => ({ num: x.num || '', label: x.label || '' }));
  const faq0 = (fd.faq || []).map(f => { const e = htmlToEdit(f.a); return { q: f.q || '', a: e.text, raw: e.raw }; });
  let kpi = kpi0.map(x => ({ ...x })), faq = faq0.map(x => ({ ...x }));
  let open = -1;
  const body = $('[data-body]', el);
  body.innerHTML = `
    <section class="blk"><div class="blk-h"><h2>첫 화면 숫자</h2><button type="button" class="lnk" data-show="[data-svc-kpi]">미리보기에서 찾기</button></div>
      <p class="where">사이트에서 <b>${SVC_NAME[svc]} 첫 화면 아래 숫자 칸</b> · 2~3칸이 보기 좋습니다 · 왼쪽 큰 글자, 오른쪽 작은 설명</p>
      <div data-kpi></div><button type="button" class="lnk" data-kadd style="margin-left:36px">칸 추가</button></section>
    <section class="blk"><div class="blk-h"><h2>자주 묻는 질문 <span class="sub small" style="font-weight:400" data-fcnt></span></h2><button type="button" class="lnk" data-show="[data-svc-faq]">미리보기에서 찾기</button></div>
      <p class="where">사이트에서 <b>${SVC_NAME[svc]} 페이지 아래쪽</b> · 검색 로봇·AI 검색도 이 질문과 답을 읽습니다 · 답에서 <b>**두 별표**</b>로 감싸면 굵게</p>
      <div data-faq></div><button type="button" class="lnk" data-fadd style="margin-top:14px">질문 추가</button></section>
    <p class="where" data-warn style="margin-top:20px"></p>`;
  const set = saveBar($('.view', el), { onSave: save, onReset: () => { kpi = kpi0.map(x => ({ ...x })); faq = faq0.map(x => ({ ...x })); open = -1; draw(); } });

  const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  const changes = () => (same(kpi, kpi0) ? 0 : 1) + faq.filter((f, i) => !faq0[i] || f.q !== faq0[i].q || f.a !== faq0[i].a).length + Math.max(0, faq0.length - faq.length);
  setDirtyCheck(() => changes() > 0);

  function draw() {
    $('[data-kpi]', body).innerHTML = kpi.map((r, i) => `<div class="row"><span class="mv"><button type="button" data-kup="${i}" ${i ? '' : 'disabled'} aria-label="위로">↑</button></span><input class="in" data-ki="${i}" data-kk="num" value="${esc(r.num)}" placeholder="예: 1,520+" aria-label="큰 글자" /><input class="in" data-ki="${i}" data-kk="label" value="${esc(r.label)}" placeholder="예: 파트너 크리에이터" aria-label="설명" /><button type="button" class="x" data-kdel="${i}" aria-label="삭제">×</button></div>`).join('') || '<p class="empty">숫자 칸이 없습니다. 비워 두면 첫 화면에 숫자 줄이 나오지 않습니다.</p>';
    $('[data-fcnt]', body).textContent = `${faq.length}개`;
    $('[data-faq]', body).innerHTML = faq.map((f, i) => {
      const was = faq0[i], chg = !was || was.q !== f.q || was.a !== f.a;
      return `<div class="fq${i === open ? ' open' : ''}${chg ? ' chg' : ''}" data-f="${i}"><div class="fq-h" data-ftog><span class="mono sub">Q${String(i + 1).padStart(2, '0')}</span><b>${esc(f.q) || '<span class="sub">(질문을 적어 주세요)</span>'}</b><span class="sub small">${i === open ? '접기' : '고치기'}</span></div>
        <div class="fq-b"><label class="fld"><span>질문</span><input data-fk="q" value="${esc(f.q)}" /></label>
        <label class="fld"><span>답${f.raw ? '<em>HTML 그대로(굵게 외 꾸밈이 들어 있음)</em>' : ''}</span><textarea data-fk="a" rows="5">${esc(f.a)}</textarea></label>
        <div class="tools"><button type="button" class="lnk" data-fup ${i ? '' : 'disabled'}>위로</button><button type="button" class="lnk" data-fdn ${i < faq.length - 1 ? '' : 'disabled'}>아래로</button><button type="button" class="lnk red" data-fdel>이 질문 삭제</button></div></div></div>`;
    }).join('') || '<p class="empty">질문이 없습니다.</p>';
    refresh();
  }
  function refresh() {
    const n = changes();
    set(n);
    const text = JSON.stringify(kpi) + JSON.stringify(faq);
    const w = BANNED.filter(b => text.includes(b));
    $('[data-warn]', body).innerHTML = w.length ? `<b style="color:var(--red)">쓰지 않기로 한 낱말이 있습니다: ${w.join(', ')}</b> — 서비스 페이지에는 쓰지 않습니다(대표 규칙).` : '';
    pv.run(d => {
      const k = d.querySelector('[data-svc-kpi]'); if (k) k.innerHTML = kpi.filter(x => x.num || x.label).map(x => `<div><b>${esc(x.num)}</b><span>${esc(x.label)}</span></div>`).join('');
      const f = d.querySelector('[data-svc-faq]'); if (f) f.innerHTML = faq.map(x => ({ q: esc(x.q), a: editToHtml(x.a, x.raw) })).map(faqHTML).join('');
    });
  }
  body.addEventListener('input', e => {
    const t = e.target;
    if (t.dataset.ki !== undefined) { kpi[+t.dataset.ki][t.dataset.kk] = t.value; refresh(); }
    if (t.dataset.fk) { const i = +t.closest('[data-f]').dataset.f; faq[i][t.dataset.fk] = t.value; if (t.dataset.fk === 'q') $('.fq-h b', t.closest('[data-f]')).textContent = t.value; refresh(); }
  });
  body.addEventListener('click', async e => {
    const b = e.target.closest('button,[data-ftog]'); if (!b) return;
    if (b.dataset.show) { pv.show(b.dataset.show); return; }
    if (b.dataset.kdel !== undefined) { kpi.splice(+b.dataset.kdel, 1); draw(); return; }
    if (b.dataset.kup !== undefined) { const i = +b.dataset.kup; [kpi[i - 1], kpi[i]] = [kpi[i], kpi[i - 1]]; draw(); return; }
    if (b.hasAttribute('data-kadd')) { kpi.push({ num: '', label: '' }); draw(); $$('[data-ki]', body).slice(-2)[0].focus(); return; }
    if (b.hasAttribute('data-fadd')) { faq.push({ q: '', a: '', raw: false }); open = faq.length - 1; draw(); $(`[data-f="${open}"] input`, body).focus(); pv.show('[data-svc-faq]'); return; }
    const box = b.closest('[data-f]'); if (!box) return;
    const i = +box.dataset.f;
    if (b.hasAttribute('data-ftog')) { open = open === i ? -1 : i; draw(); if (open === i) pv.show('[data-svc-faq]'); return; }
    if (b.hasAttribute('data-fup') && i > 0) { [faq[i - 1], faq[i]] = [faq[i], faq[i - 1]]; open = i - 1; draw(); return; }
    if (b.hasAttribute('data-fdn') && i < faq.length - 1) { [faq[i + 1], faq[i]] = [faq[i], faq[i + 1]]; open = i + 1; draw(); return; }
    if (b.hasAttribute('data-fdel')) {
      if (await ask({ title: '이 질문을 삭제할까요?', body: faq[i].q || '(빈 질문)', ok: '삭제', danger: true })) { faq.splice(i, 1); open = -1; draw(); }
    }
  });
  $$('[data-show]', body).forEach(() => {});

  async function save() {
    if (faq.some(f => !f.q.trim() || !f.a.trim())) { toast('질문이나 답이 빈 칸이 있습니다. 채우거나 그 질문을 삭제해 주세요.', true); return; }
    const k = kpi.filter(x => x.num.trim() || x.label.trim()).map(x => ({ num: x.num.trim(), label: x.label.trim() }));
    const tasks = [];
    if (!same(kpi, kpi0)) tasks.push(api('PUT', `/hero-kpi/${svc}`, { kpi: k }, `${SVC_NAME[svc]} 첫 화면 숫자 ${kpi0.length}칸 → ${k.length}칸`.replace(/ (\d)칸 → \1칸$/, ' 고침')));
    const fq = faq.map(f => ({ q: f.q.trim(), a: editToHtml(f.a.trim(), f.raw) }));
    const fChanged = faq.length !== faq0.length || faq.some((f, i) => f.q !== faq0[i].q || f.a !== faq0[i].a);
    if (fChanged) tasks.push(api('PUT', `/svc-faq/${svc}`, { faq: fq }, `${SVC_NAME[svc]} 자주 묻는 질문 ${faq.length !== faq0.length ? `${faq0.length}개 → ${faq.length}개` : `${changes() - (same(kpi, kpi0) ? 0 : 1)}개 고침`}`));
    await Promise.all(tasks);
    toast('저장했습니다. 사이트에 바로 반영됩니다.');
    // 저장한 값을 새 '처음 값'으로
    kpi0.splice(0, kpi0.length, ...kpi.map(x => ({ ...x })).filter(x => x.num.trim() || x.label.trim()));
    faq0.splice(0, faq0.length, ...faq.map(x => ({ ...x })));
    kpi = kpi0.map(x => ({ ...x }));
    draw();
  }
  draw();
}
