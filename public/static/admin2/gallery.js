// 인애드 일상 — 사진 묶음(최대 5장) 올리기·고치기·삭제. 사이트: 인사이트의 '인애드 일상' 탭
// 옛 화면과 달리 사진을 줄여서 올리고(긴 쪽 1600px), 고치다 뺀 사진은 '저장'할 때만 지움(취소하면 그대로)
import { $, $$, esc, api, ask, toast, saveBar, setDirtyCheck, preview, shrink, pickFiles, day } from './core.js';

const TAGS = ['일상', '팀', '오피스', '행사', '캠페인'];
const MAX = 5;
const imgsOf = g => (g.images && g.images.length ? g.images : g.imageUrl ? [{ key: '', url: g.imageUrl }] : []);

export async function galleryView(el, sub) {
  if (sub) return editor(el, sub);
  el.innerHTML = `<div class="view wide"><div class="hd"><div><span class="mono sub">인애드 일상</span><h1>인애드 일상 사진</h1></div><div class="tools"><a class="lnk" href="/insight" target="_blank" rel="noopener">사이트에서 보기</a><a class="btn" href="#/gallery/new">사진 올리기</a></div></div>
    <p class="where" style="margin-top:12px">사이트에서 <b>인사이트 → '인애드 일상' 탭</b>. 묶음마다 첫 사진이 카드로 보이고, 누르면 크게 넘겨 봅니다.</p><div data-body><p class="loading">불러오는 중…</p></div></div>`;
  preview('/insight');
  const items = (await api('GET', '/gallery')).items || [];
  $('[data-body]', el).innerHTML = items.length ? `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:22px;margin-top:18px">${items.map(g => {
    const im = imgsOf(g);
    return `<a href="#/gallery/${g.id}" style="text-decoration:none"><div style="aspect-ratio:4/3;background:var(--paper) ${im[0] ? `url('${esc(im[0].url)}') center/cover` : ''};position:relative">${im.length > 1 ? `<span class="mono" style="position:absolute;right:8px;bottom:8px;background:var(--ink);color:var(--white);padding:2px 6px">${im.length}장</span>` : ''}</div>
      <span class="mono sub" style="display:block;margin-top:8px">${day(g.createdAt)} · ${esc(g.tag || '')}</span><b style="display:block;margin-top:2px">${esc(g.caption || '설명 없음')}</b></a>`;
  }).join('')}</div>` : '<p class="empty">아직 올린 사진이 없습니다.</p>';
}

async function editor(el, id) {
  const isNew = id === 'new';
  el.innerHTML = '<div class="view"><p class="loading">불러오는 중…</p></div>';
  const items = isNew ? [] : (await api('GET', '/gallery')).items || [];
  const g = isNew ? { caption: '', tag: '일상', images: [] } : items.find(x => String(x.id) === id);
  if (!g) { el.innerHTML = '<div class="view"><p class="empty">사진 묶음을 찾을 수 없습니다. <a class="lnk" href="#/gallery">목록으로</a></p></div>'; return; }
  const orig = { caption: g.caption || '', tag: g.tag || '일상', images: imgsOf(g).map(x => ({ ...x })) };
  // 사진: { key, url } 이미 올린 것 / { file, src } 새로 고른 것(저장할 때 올림)
  let cur = { caption: orig.caption, tag: orig.tag, images: orig.images.map(x => ({ ...x })) };
  el.innerHTML = `<div class="view"><div class="hd"><div><span class="mono sub"><a href="#/gallery" class="lnk" style="font-size:11px">인애드 일상</a></span><h1>${isNew ? '사진 올리기' : '사진 묶음 고치기'}</h1></div></div><div data-body></div></div>`;
  const view = $('.view', el), body = $('[data-body]', el);
  preview('/insight');
  const changed = () => cur.caption !== orig.caption || cur.tag !== orig.tag || JSON.stringify(cur.images.map(x => x.key || x.src)) !== JSON.stringify(orig.images.map(x => x.key || x.url));
  const set = saveBar(view, { onSave: save, onReset: () => { cur = { caption: orig.caption, tag: orig.tag, images: orig.images.map(x => ({ ...x })) }; draw(); } });
  setDirtyCheck(changed);
  function draw() {
    body.innerHTML = `<div class="blk"><div class="fld"><span>사진<em>최대 ${MAX}장 · 첫 사진이 카드에 보임 · 올릴 때 긴 쪽 1600px 로 줄임</em></span>
        <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:10px">${cur.images.map((x, i) => `<div style="position:relative"><div style="aspect-ratio:1;background:var(--paper) url('${esc(x.url || x.src)}') center/cover"></div>
          <div class="tools" style="margin-top:6px;gap:8px"><span class="mv"><button type="button" data-l="${i}" ${i ? '' : 'disabled'} aria-label="앞으로">←</button><button type="button" data-r="${i}" ${i < cur.images.length - 1 ? '' : 'disabled'} aria-label="뒤로">→</button></span><button type="button" class="lnk red" data-rm="${i}">빼기</button>${x.file ? '<span class="tag">새 사진</span>' : ''}</div></div>`).join('')}
          ${cur.images.length < MAX ? `<button type="button" data-add style="aspect-ratio:1;border:1px dashed var(--ln);background:var(--card);cursor:pointer;font-size:13px">사진 고르기<br /><span class="sub">(${MAX - cur.images.length}장 더)</span></button>` : ''}</div></div>
      <div class="grid2"><label class="fld"><span>설명<em>카드 제목·크게 볼 때 아래 글</em></span><input data-k="caption" value="${esc(cur.caption)}" placeholder="예: 11월 팀 워크숍" /></label>
      <label class="fld"><span>분류</span><select data-k="tag">${TAGS.map(t => `<option ${t === cur.tag ? 'selected' : ''}>${t}</option>`).join('')}</select></label></div>
      ${isNew ? '' : '<p style="margin-top:20px"><button type="button" class="lnk red" data-del>이 묶음 삭제</button></p>'}</div>`;
    set(changed() ? 1 : 0);
  }
  body.addEventListener('input', e => { const k = e.target.dataset.k; if (k) { cur[k] = e.target.value; set(changed() ? 1 : 0); } });
  body.addEventListener('change', e => { const k = e.target.dataset.k; if (k) { cur[k] = e.target.value; set(changed() ? 1 : 0); } });
  body.addEventListener('click', async e => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.hasAttribute('data-add')) {
      const fs = (await pickFiles({ multiple: true })).slice(0, MAX - cur.images.length);
      for (const f of fs) { if (/^image\//.test(f.type)) cur.images.push({ file: f, src: URL.createObjectURL(f) }); }
      draw(); return;
    }
    if (b.dataset.rm !== undefined) { cur.images.splice(+b.dataset.rm, 1); draw(); return; }
    if (b.dataset.l !== undefined) { const i = +b.dataset.l; [cur.images[i - 1], cur.images[i]] = [cur.images[i], cur.images[i - 1]]; draw(); return; }
    if (b.dataset.r !== undefined) { const i = +b.dataset.r; [cur.images[i + 1], cur.images[i]] = [cur.images[i], cur.images[i + 1]]; draw(); return; }
    if (b.hasAttribute('data-del')) {
      if (!await ask({ title: '이 사진 묶음을 삭제할까요?', body: `${g.caption || '설명 없음'} · ${orig.images.length}장\n사이트에서 바로 사라집니다. 사진은 90일 동안 보관되어 '바뀐 기록'에서 되돌릴 수 있습니다.`, ok: '삭제', danger: true })) return;
      await api('DELETE', `/gallery/${g.id}`); setDirtyCheck(null); toast('삭제했습니다.'); location.hash = '#/gallery';
    }
  });
  async function save() {
    if (!cur.images.length) { toast('사진을 1장 이상 넣어 주세요.', true); return; }
    const out = [];
    let n = 0; const total = cur.images.filter(x => x.file).length;
    for (const x of cur.images) {
      if (!x.file) { out.push({ key: x.key, url: x.url }); continue; }
      n++; toast(`사진 올리는 중… (${n} / ${total})`);
      const r = await api('POST', '/gallery/image', { data: await shrink(x.file, 1600, 1600, 0.85) });
      x.key = r.key; x.url = r.url; delete x.file; out.push({ key: r.key, url: r.url });
    }
    const data = { images: out, caption: cur.caption.trim(), tag: cur.tag };
    if (isNew) { await api('POST', '/gallery', data); }
    else {
      await api('PUT', `/gallery/${g.id}`, data);
      // 뺀 사진은 저장한 뒤에만 정리(서버가 90일 보관 후 삭제)
      const keep = new Set(out.map(x => x.key));
      await Promise.all(orig.images.filter(x => x.key && !keep.has(x.key)).map(x => api('DELETE', `/gallery/image/${encodeURIComponent(x.key)}`).catch(() => null)));
    }
    setDirtyCheck(null); toast('저장했습니다. 사이트에 바로 반영됩니다.'); location.hash = '#/gallery';
  }
  draw();
}
