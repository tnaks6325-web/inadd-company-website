// 포트폴리오 — 사례 목록(순서·대표 순서·대표 이미지)과 고치기. 서버는 목록 전체를 한 번에 저장(PUT /works)
import { $, $$, esc, api, ask, toast, saveBar, setDirtyCheck, preview, shrink, pickFiles } from './core.js';

// 포트폴리오 탭(사이트 분류) — 새 사이트 포트폴리오 탭과 같은 이름
const TAGS = [['viral', '바이럴'], ['influencer', '인플루언서'], ['seeding', '체험단'], ['review', '고객 리뷰'], ['oliveyoung', '올리브영'], ['ppl', 'PPL']];
const TAG_NAME = Object.fromEntries(TAGS);
const clone = x => JSON.parse(JSON.stringify(x));

export async function worksView(el, sub, query) {
  el.innerHTML = `<div class="view wide"><div class="hd"><div><span class="mono sub">포트폴리오</span><h1>포트폴리오 사례</h1></div><a class="lnk" href="/works" target="_blank" rel="noopener">사이트에서 보기</a></div><div data-body><p class="loading">불러오는 중…</p></div></div>`;
  const view = $('.view', el), body = $('[data-body]', el);
  const pv = preview('/works');
  const d = await api('GET', '/works');
  const items0 = d.items || [];
  let items = clone(items0);
  let filter = (new URLSearchParams(query || '')).get('f') || '';
  let q = '';
  let edit = sub === 'new' ? -1 : null; // 고치는 사례 번호(-1 = 새 사례)
  let draft = null;

  const set = saveBar(view, { onSave: save, onReset: () => { items = clone(items0); edit = null; draft = null; draw(); } });
  const changed = () => JSON.stringify(items) !== JSON.stringify(items0) || !!draft && JSON.stringify(draft.cur) !== JSON.stringify(draft.orig);
  setDirtyCheck(changed);

  function list() {
    const rows = items.map((w, i) => ({ w, i })).filter(({ w }) => (filter !== 'logo' || (!w.cover && w.thumb)) && (filter !== 'hidden' || (!w.cover && !w.thumb)) && (!q || (w.brand || '').includes(q)));
    return `<div class="tools" style="margin:18px 0 8px;justify-content:space-between">
        <div class="tabs" style="border:0;gap:20px"><button type="button" data-flt="" class="${filter ? '' : 'on'}">전체 ${items.length}</button><button type="button" data-flt="logo" class="${filter === 'logo' ? 'on' : ''}">로고 칸으로 보임 ${items.filter(w => !w.cover && w.thumb).length}</button>${items.some(w => !w.cover && !w.thumb) || filter === 'hidden' ? `<button type="button" data-flt="hidden" class="${filter === 'hidden' ? 'on' : ''}">사이트에 안 보임 ${items.filter(w => !w.cover && !w.thumb).length}</button>` : ''}</div>
        <div class="tools"><input class="in" style="width:200px" placeholder="브랜드 찾기" data-q value="${esc(q)}" /><button type="button" class="btn" data-new>사례 추가</button></div></div>
      <p class="where">대표 이미지가 있으면 <b>사례 카드</b>로(대표 순서 1~8이 먼저, 나머지는 이 목록 순서), 로고만 있으면 포트폴리오 아래 <b>'함께한 브랜드' 로고 칸</b>으로 나옵니다.</p>
      <table class="log"><tbody>${rows.map(({ w, i }) => `<tr data-i="${i}">
        <td style="width:84px"><div style="width:72px;height:54px;background:${w.cover ? `var(--paper) url('${esc(w.cover)}') center/cover` : w.thumb ? `#fff url('${esc(w.thumb)}') center/80% auto no-repeat` : 'var(--paper)'};border:1px solid var(--ln);display:flex;align-items:center;justify-content:center;font-size:11px;color:var(--red)">${w.cover || w.thumb ? '' : '이미지 없음'}</div></td>
        <td><b>${esc(w.brand || '이름 없음')}</b>${w.featuredRank ? `<span class="tag">대표 ${esc(w.featuredRank)}</span>` : ''}${!w.cover && w.thumb ? '<span class="tag">로고 칸</span>' : ''}<div class="sub small">${esc(w.services || '')}${(w.tags || []).length ? ' · ' + (w.tags || []).map(t => TAG_NAME[t] || t).join(', ') : ''}</div></td>
        <td class="ac" style="width:230px"><span class="mv" style="display:inline-flex;vertical-align:middle;margin-right:10px"><button type="button" data-up ${i ? '' : 'disabled'} aria-label="위로">↑</button><button type="button" data-dn ${i < items.length - 1 ? '' : 'disabled'} aria-label="아래로">↓</button></span><button type="button" class="lnk" data-ed>고치기</button><button type="button" class="lnk red" data-del style="margin-left:12px">삭제</button></td></tr>`).join('') || '<tr><td class="empty">해당하는 사례가 없습니다.</td></tr>'}</tbody></table>`;
  }
  function form() {
    const w = draft.cur, ranks = items.filter((x, i) => i !== edit && x.featuredRank).map(x => String(x.featuredRank));
    return `<div class="blk"><div class="blk-h"><h2>${edit === -1 ? '새 사례' : esc(draft.orig.brand || '사례 고치기')}</h2><button type="button" class="lnk" data-back>목록으로</button></div>
      <div class="grid2">
        <div>
          <label class="fld"><span>브랜드명 *</span><input data-w="brand" value="${esc(w.brand || '')}" placeholder="예: 인애드 뷰티" /></label>
          <label class="fld"><span>진행 서비스<em>사례 카드 아래 작은 글씨</em></span><input data-w="services" value="${esc(w.services || '')}" placeholder="예: 인플루언서 · 체험단" /></label>
          <div class="fld"><span>분류<em>포트폴리오 탭에서 이 분류를 고르면 보임</em></span><div class="tools">${TAGS.map(([k, n]) => `<label class="small"><input type="checkbox" data-tag="${k}" ${(w.tags || []).includes(k) ? 'checked' : ''} /> ${n}</label>`).join('')}</div></div>
          <label class="fld"><span>대표 순서<em>1~8 — 숫자가 작을수록 앞. 이미 쓰는 번호는 고를 수 없음</em></span><select data-w="featuredRank"><option value="">없음(목록 순서대로)</option>${[1, 2, 3, 4, 5, 6, 7, 8].map(n => `<option value="${n}" ${String(w.featuredRank || '') === String(n) ? 'selected' : ''} ${ranks.includes(String(n)) ? 'disabled' : ''}>${n}${ranks.includes(String(n)) ? ' (사용 중)' : ''}</option>`).join('')}</select></label>
        </div>
        <div>
          <div class="fld"><span>대표 이미지 *<em>있으면 사례 카드로 나옴 · 없으면 로고가 있을 때만 '함께한 브랜드' 로고 칸으로 · 올리면 800px 안으로 줄여 저장</em></span>
            <div style="aspect-ratio:4/3;background:var(--paper) ${w.cover ? `url('${esc(w.cover)}') center/contain no-repeat` : ''};border:1px solid var(--ln);display:flex;align-items:center;justify-content:center" data-cover>${w.cover ? '' : '<span class="sub small">이미지 없음</span>'}</div>
            <div class="tools" style="margin-top:8px"><button type="button" class="btn ghost sm" data-up-cover>이미지 올리기</button>${w.cover ? '<button type="button" class="lnk red" data-rm-cover>이미지 빼기</button>' : ''}</div></div>
          <label class="fld"><span>또는 이미지 주소<em>직접 넣을 때만</em></span><input data-w="cover" value="${esc(w.cover || '')}" placeholder="https://…" /></label>
        </div>
      </div>
      <div class="tools"><button type="button" class="btn" data-apply>${edit === -1 ? '목록에 넣기' : '고친 내용 반영'}</button><button type="button" class="btn ghost" data-back>취소</button><span class="sub small">반영한 뒤 아래 '저장'을 눌러야 사이트에 나갑니다.</span></div></div>`;
  }
  function draw() {
    body.innerHTML = edit === null ? list() : form();
    const n = (JSON.stringify(items) !== JSON.stringify(items0) ? 1 : 0);
    set(n, n ? '목록이 바뀜 · 저장 전' : '');
  }
  function openEdit(i) {
    edit = i;
    const orig = i === -1 ? { id: Date.now(), brand: '', services: '', tags: [], cover: '' } : clone(items[i]);
    draft = { orig, cur: clone(orig) };
    draw();
    $('[data-w="brand"]', body).focus();
  }
  function closeEdit() { edit = null; draft = null; draw(); }

  body.addEventListener('input', e => {
    const t = e.target;
    if (t.dataset.q !== undefined) { q = t.value.trim(); const pos = t.selectionStart; draw(); const n = $('[data-q]', body); n.focus(); n.setSelectionRange(pos, pos); return; }
    if (t.dataset.w) { draft.cur[t.dataset.w] = t.value; if (t.dataset.w === 'cover') { const c = $('[data-cover]', body); c.style.background = t.value ? `var(--paper) url('${t.value}') center/contain no-repeat` : 'var(--paper)'; } }
  });
  body.addEventListener('change', e => {
    const t = e.target;
    if (t.dataset.tag) { const s = new Set(draft.cur.tags || []); t.checked ? s.add(t.dataset.tag) : s.delete(t.dataset.tag); draft.cur.tags = TAGS.map(x => x[0]).filter(k => s.has(k)); }
    if (t.dataset.w === 'featuredRank') { if (t.value) draft.cur.featuredRank = +t.value; else delete draft.cur.featuredRank; }
  });
  body.addEventListener('click', async e => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.flt !== undefined) { filter = b.dataset.flt; draw(); return; }
    if (b.hasAttribute('data-new')) { openEdit(-1); return; }
    if (b.hasAttribute('data-back')) { if (JSON.stringify(draft.cur) === JSON.stringify(draft.orig) || await ask({ title: '고친 내용을 버릴까요?', ok: '버리기' })) closeEdit(); return; }
    if (b.hasAttribute('data-up-cover')) {
      const [f] = await pickFiles(); if (!f) return;
      b.disabled = true; b.textContent = '올리는 중…';
      try { const dataUrl = await shrink(f, 800, 800, 0.9); const r = await api('POST', '/works/thumb', { dataUrl }); draft.cur.cover = r.url; draw(); }
      catch (er) { toast(er.message, true); b.disabled = false; b.textContent = '이미지 올리기'; }
      return;
    }
    if (b.hasAttribute('data-rm-cover')) { draft.cur.cover = ''; draw(); return; }
    if (b.hasAttribute('data-apply')) {
      const w = draft.cur; w.brand = (w.brand || '').trim(); w.services = (w.services || '').trim();
      if (!w.brand) { toast('브랜드명을 적어 주세요.', true); return; }
      if (!w.cover && !await ask({ title: '대표 이미지가 없습니다', body: w.thumb ? '대표 이미지가 없으면 사례 카드 대신 포트폴리오 아래 \'함께한 브랜드\' 로고 칸에만 나옵니다. 그래도 넣을까요?' : '대표 이미지가 없으면 사이트 포트폴리오에 나오지 않습니다. 그래도 넣을까요?', ok: '그래도 넣기' })) return;
      if (edit === -1) items.unshift(w); else items[edit] = w;
      closeEdit(); toast('목록에 반영했습니다. 저장을 눌러야 사이트에 나갑니다.'); return;
    }
    const tr = b.closest('tr[data-i]'); if (!tr) return;
    const i = +tr.dataset.i;
    if (b.hasAttribute('data-ed')) { openEdit(i); return; }
    if (b.hasAttribute('data-up') && i > 0) { [items[i - 1], items[i]] = [items[i], items[i - 1]]; draw(); return; }
    if (b.hasAttribute('data-dn') && i < items.length - 1) { [items[i + 1], items[i]] = [items[i], items[i + 1]]; draw(); return; }
    if (b.hasAttribute('data-del')) { if (await ask({ title: '이 사례를 목록에서 뺄까요?', body: `${items[i].brand || '이름 없음'}\n저장해야 사이트에서 빠집니다. 잘못 지웠으면 '바뀐 기록'에서 되돌릴 수 있습니다.`, ok: '빼기', danger: true })) { items.splice(i, 1); draw(); } }
  });

  async function save() {
    if (draft) { toast('고치는 중인 사례가 있습니다. "반영"이나 "취소"를 먼저 눌러 주세요.', true); return; }
    await api('PUT', '/works', { items });
    items0.splice(0, items0.length, ...clone(items));
    toast('저장했습니다. 사이트 포트폴리오에 바로 반영됩니다.');
    draw();
    pv.run((d, w) => w.location.reload());
  }
  if (sub === 'new') openEdit(-1); else draw();
}
