// 인사이트 — 글 목록·쓰기·고치기. 본문 편집기는 옛 화면과 같은 Quill 2.0.2(같은 HTML 이 나오게)
import { $, $$, esc, api, ask, toast, saveBar, setDirtyCheck, preview, noPreview, shrink, pickFiles, day } from './core.js';

const CAT = [['content-strategy', '콘텐츠별 전략'], ['case-study', '실전 사례'], ['resources', '실무 자료실']];
const SUB = [['', '없음'], ['viral', '바이럴 마케팅'], ['influencer', '인플루언서'], ['seeding', '체험단'], ['review', '리뷰'], ['oliveyoung', '올리브영'], ['ppl', 'PPL']];
const CAT_NAME = Object.fromEntries(CAT), SUB_NAME = Object.fromEntries(SUB);

let quillReady;
function loadQuill() {
  if (quillReady) return quillReady;
  quillReady = new Promise((ok, no) => {
    const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = 'https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.snow.css'; document.head.appendChild(l);
    const s = document.createElement('script'); s.src = 'https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.js'; s.onload = () => ok(window.Quill); s.onerror = () => no(new Error('본문 편집기를 불러오지 못했습니다(인터넷 연결 확인)')); document.head.appendChild(s);
  });
  return quillReady;
}

export async function insightView(el, sub, query) {
  if (sub) return editor(el, sub);
  el.innerHTML = `<div class="view wide"><div class="hd"><div><span class="mono sub">인사이트</span><h1>인사이트 글</h1></div><div class="tools"><a class="lnk" href="/insight" target="_blank" rel="noopener">사이트에서 보기</a><a class="btn" href="#/insight/new">글 쓰기</a></div></div><div data-body><p class="loading">불러오는 중…</p></div></div>`;
  const posts = (await api('GET', '/insight')).posts || [];
  let f = (new URLSearchParams(query || '')).get('f') || '', q = '';
  const body = $('[data-body]', el);
  const draw = () => {
    const rows = posts.filter(p => (!f || (f === 'nothumb' ? !p.thumbnail : p.mainCategory === f)) && (!q || (p.title || '').includes(q)));
    body.innerHTML = `<div class="tools" style="margin:16px 0 10px;justify-content:space-between"><div class="tabs" style="border:0;gap:20px"><button type="button" data-f="" class="${f ? '' : 'on'}">전체 ${posts.length}</button>${CAT.map(([k, n]) => `<button type="button" data-f="${k}" class="${f === k ? 'on' : ''}">${n} ${posts.filter(p => p.mainCategory === k).length}</button>`).join('')}<button type="button" data-f="nothumb" class="${f === 'nothumb' ? 'on' : ''}">썸네일 없음 ${posts.filter(p => !p.thumbnail).length}</button></div><input class="in" style="width:220px" placeholder="제목 찾기" data-q value="${esc(q)}" /></div>
      <table class="log"><tbody>${rows.map(p => `<tr><td style="width:96px"><div style="width:84px;height:52px;background:var(--paper) ${p.thumbnail ? `url('${esc(p.thumbnail)}') center/cover` : ''};display:flex;align-items:center;justify-content:center;font-size:11px;color:var(--red)">${p.thumbnail ? '' : '썸네일 없음'}</div></td>
        <td><a href="#/insight/${encodeURIComponent(p.id)}" style="text-decoration:none"><b>${esc(p.title || '제목 없음')}</b></a>${p.notionId ? '<span class="tag">노션</span>' : ''}<div class="sub small">${esc(CAT_NAME[p.mainCategory] || '분류 없음')}${p.subCategory ? ' · ' + esc(SUB_NAME[p.subCategory] || p.subCategory) : ''} · ${day(p.createdAt)}</div></td>
        <td class="ac"><a class="lnk" href="/insight/admin_${encodeURIComponent(p.id)}" target="_blank" rel="noopener">사이트</a><a class="lnk" href="#/insight/${encodeURIComponent(p.id)}" style="margin-left:12px">고치기</a></td></tr>`).join('') || '<tr><td class="empty">해당하는 글이 없습니다.</td></tr>'}</tbody></table>`;
  };
  body.addEventListener('click', e => { const b = e.target.closest('[data-f]'); if (b) { f = b.dataset.f; draw(); } });
  body.addEventListener('input', e => { if (e.target.dataset.q !== undefined) { q = e.target.value.trim(); const pos = e.target.selectionStart; draw(); const n = $('[data-q]', body); n.focus(); n.setSelectionRange(pos, pos); } });
  draw();
}

async function editor(el, id) {
  const isNew = id === 'new';
  el.innerHTML = `<div class="view"><p class="loading">불러오는 중…</p></div>`;
  const [posts, Quill] = await Promise.all([api('GET', '/insight').then(d => d.posts || []), loadQuill()]);
  const post = isNew ? { title: '', summary: '', content: '', thumbnail: '', mainCategory: 'content-strategy', subCategory: '' } : posts.find(p => p.id === decodeURIComponent(id));
  if (!post) { el.innerHTML = '<div class="view"><p class="empty">글을 찾을 수 없습니다. <a class="lnk" href="#/insight">목록으로</a></p></div>'; return; }
  const F = ['title', 'summary', 'thumbnail', 'mainCategory', 'subCategory'];
  const orig = Object.fromEntries(F.map(k => [k, post[k] || ''])); orig.content = post.content || '';
  const cur = { ...orig };
  el.innerHTML = `<div class="view"><div class="hd"><div><span class="mono sub"><a href="#/insight" class="lnk" style="font-size:11px">인사이트 글</a></span><h1>${isNew ? '새 글 쓰기' : '글 고치기'}</h1></div>${isNew ? '' : `<a class="lnk" href="/insight/admin_${encodeURIComponent(post.id)}" target="_blank" rel="noopener">사이트에서 보기</a>`}</div>
    ${post.notionId ? '<p class="where" style="margin-top:14px;background:var(--cream);outline:1.5px solid var(--navy);padding:10px 12px;color:var(--ink)">이 글은 <b>노션에서 자동 발행</b>된 글입니다. 여기서 고치면, 다음에 노션에서 같은 글을 다시 발행할 때 노션 내용으로 덮어써집니다. 큰 수정은 노션 원본에서 해 주세요.</p>' : ''}
    <div class="blk"><label class="fld"><span>제목 *<em>' — ' 뒤는 부제로 작게 보임</em></span><input data-k="title" value="${esc(cur.title)}" placeholder="예: 체험단 리뷰가 검색에 잡히는 조건 — 실제 운영 기록" /></label>
      <div class="grid2"><label class="fld"><span>분류</span><select data-k="mainCategory">${CAT.map(([k, n]) => `<option value="${k}" ${cur.mainCategory === k ? 'selected' : ''}>${n}</option>`).join('')}</select></label>
      <label class="fld"><span>서비스<em>'콘텐츠별 전략' 탭 안의 작은 탭</em></span><select data-k="subCategory">${SUB.map(([k, n]) => `<option value="${k}" ${cur.subCategory === k ? 'selected' : ''}>${n}</option>`).join('')}</select></label></div>
      <div class="grid2"><div class="fld"><span>썸네일<em>목록 카드·글 맨 위 그림 · 800×500 안으로 줄여 저장</em></span><div data-th style="aspect-ratio:16/10;background:var(--paper) ${cur.thumbnail ? `url('${esc(cur.thumbnail)}') center/cover` : ''};border:1px solid var(--ln);display:flex;align-items:center;justify-content:center">${cur.thumbnail ? '' : '<span class="sub small">썸네일 없음 — 목록에서 빈 칸으로 보임</span>'}</div>
        <div class="tools" style="margin-top:8px"><button type="button" class="btn ghost sm" data-th-up>그림 올리기</button>${cur.thumbnail ? '<button type="button" class="lnk red" data-th-rm>빼기</button>' : ''}</div></div>
      <label class="fld"><span>요약<em>목록 카드와 글 맨 위 굵은 문단, 검색 결과 설명</em></span><textarea data-k="summary" rows="7">${esc(cur.summary)}</textarea></label></div>
      <div class="fld"><span>본문</span><div data-tb></div><div data-ed style="min-height:420px;background:var(--card)"></div></div>
      ${isNew ? '' : '<p style="margin-top:26px"><button type="button" class="lnk red" data-del>이 글 삭제</button></p>'}
    </div></div>`;
  if (!isNew) preview(`/insight/admin_${encodeURIComponent(post.id)}`); else noPreview();
  const view = $('.view', el);
  const tb = $('[data-tb]', el);
  tb.innerHTML = `<span class="ql-formats"><select class="ql-header"><option value="1"></option><option value="2"></option><option value="3"></option><option selected></option></select></span><span class="ql-formats"><button class="ql-bold"></button><button class="ql-italic"></button><button class="ql-underline"></button><button class="ql-strike"></button></span><span class="ql-formats"><button class="ql-blockquote"></button><button class="ql-code-block"></button></span><span class="ql-formats"><button class="ql-list" value="ordered"></button><button class="ql-list" value="bullet"></button></span><span class="ql-formats"><button class="ql-link"></button><button class="ql-image"></button></span><span class="ql-formats"><button class="ql-clean"></button></span>`;
  const quill = new Quill($('[data-ed]', el), { theme: 'snow', modules: { toolbar: { container: tb, handlers: { image: insertImage } } }, placeholder: '본문을 쓰세요. 소제목(제목 2)은 글 옆 목차가 됩니다.' });
  if (orig.content) quill.clipboard.dangerouslyPasteHTML(orig.content);
  const html = () => { const h = quill.getSemanticHTML ? quill.getSemanticHTML() : quill.root.innerHTML; return /^(<p>(<br\s*\/?>)?<\/p>)*$/.test(h.trim()) ? '' : h; };
  const base = html(); // 편집기를 거친 처음 본문(같은 글이면 바뀌지 않은 것으로 봄)
  async function insertImage() {
    const [f] = await pickFiles(); if (!f) return;
    try { toast('그림을 올리는 중…'); const dataUrl = await shrink(f, 1200, 800, 0.85); const r = await api('POST', '/insight/thumb', { dataUrl }); const at = (quill.getSelection(true) || { index: quill.getLength() }).index; quill.insertEmbed(at, 'image', r.url, 'user'); quill.setSelection(at + 1); toast('그림을 넣었습니다.'); }
    catch (er) { toast(er.message, true); }
  }
  const count = () => F.filter(k => cur[k] !== orig[k]).length + (html() !== base ? 1 : 0);
  const set = saveBar(view, { onSave: save, onReset: () => { setDirtyCheck(null); location.reload(); } });
  setDirtyCheck(() => count() > 0);
  const refresh = () => set(count());
  quill.on('text-change', refresh);
  view.addEventListener('input', e => { const k = e.target.dataset.k; if (k) { cur[k] = e.target.value; refresh(); } });
  view.addEventListener('change', e => { const k = e.target.dataset.k; if (k) { cur[k] = e.target.value; refresh(); } });
  const drawThumb = () => { const t = $('[data-th]', view); t.style.background = cur.thumbnail ? `var(--paper) url('${cur.thumbnail}') center/cover` : 'var(--paper)'; t.innerHTML = cur.thumbnail ? '' : '<span class="sub small">썸네일 없음 — 목록에서 빈 칸으로 보임</span>'; };
  view.addEventListener('click', async e => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.hasAttribute('data-th-up')) {
      const [f] = await pickFiles(); if (!f) return;
      b.disabled = true; b.textContent = '올리는 중…';
      try { const dataUrl = await shrink(f, 800, 500, 0.85); cur.thumbnail = (await api('POST', '/insight/thumb', { dataUrl })).url; drawThumb(); refresh(); } catch (er) { toast(er.message, true); }
      b.disabled = false; b.textContent = '그림 올리기'; return;
    }
    if (b.hasAttribute('data-th-rm')) { cur.thumbnail = ''; drawThumb(); refresh(); b.remove(); return; }
    if (b.hasAttribute('data-del')) {
      if (!await ask({ title: '이 글을 삭제할까요?', body: `${post.title}\n사이트에서 바로 사라집니다. 잘못 지웠으면 '바뀐 기록'에서 되돌릴 수 있습니다.`, ok: '삭제', danger: true })) return;
      await api('DELETE', `/insight/${encodeURIComponent(post.id)}`); setDirtyCheck(null); toast('삭제했습니다.'); location.hash = '#/insight';
    }
  });
  async function save() {
    if (!cur.title.trim()) { toast('제목을 적어 주세요.', true); return; }
    const data = { title: cur.title.trim(), summary: cur.summary, thumbnail: cur.thumbnail, mainCategory: cur.mainCategory, subCategory: cur.subCategory, content: html() };
    if (isNew) {
      const r = await api('POST', '/insight', data);
      setDirtyCheck(null); toast('발행했습니다. 인사이트 목록 맨 위에 보입니다.');
      location.hash = `#/insight/${encodeURIComponent(r.post.id)}`;
    } else {
      await api('PUT', `/insight/${encodeURIComponent(post.id)}`, data);
      setDirtyCheck(null); toast('저장했습니다. 사이트에 바로 반영됩니다.');
      location.reload();
    }
  }
  refresh();
}
