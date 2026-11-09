// 바뀐 기록 · 되돌리기 — 서버 src/admin/history.ts (저장할 때마다 바뀌기 전 값을 90일 보관)
import { $, $$, esc, api, ask, toast, when } from './core.js';

const BY = { admin: '', notion: '노션', };
const parse = s => { try { return s == null ? null : JSON.parse(s); } catch { return s; } };

// 한 키의 '되돌리면 이렇게 바뀝니다' 요약(지금 값 → 기록의 값)
function sumKey(key, cur, old) {
  const a = parse(cur), b = parse(old);
  const name = { insight_posts: p => p.title, works_items: w => w.brand, gallery_items: g => g.caption || '설명 없음' }[key];
  if (name && Array.isArray(a || []) && Array.isArray(b || [])) {
    const A = a || [], B = b || [], idOf = x => x.id ?? JSON.stringify(x);
    const am = new Map(A.map(x => [idOf(x), x])), bm = new Map(B.map(x => [idOf(x), x]));
    const gone = A.filter(x => !bm.has(idOf(x))), back = B.filter(x => !am.has(idOf(x)));
    const chg = B.filter(x => am.has(idOf(x)) && JSON.stringify(am.get(idOf(x))) !== JSON.stringify(x));
    const out = [];
    if (back.length) out.push(`<p>다시 생김: ${back.map(x => `<ins>${esc(name(x))}</ins>`).join(', ')}</p>`);
    if (gone.length) out.push(`<p>없어짐: ${gone.map(x => `<del>${esc(name(x))}</del>`).join(', ')}</p>`);
    if (chg.length) out.push(`<p>예전 내용으로: ${chg.map(x => esc(name(x))).join(', ')}</p>`);
    if (!out.length && A.map(idOf).join() !== B.map(idOf).join()) out.push('<p>순서만 예전대로</p>');
    return out.join('') || '<p>지금과 같음</p>';
  }
  const lines = v => {
    if (v == null) return ['(기본값)'];
    if (Array.isArray(v)) return v.map(x => x && typeof x === 'object' ? (x.q ? `Q. ${x.q}\nA. ${String(x.a || '').replace(/<[^>]+>/g, '')}` : x.num !== undefined ? `${x.num} · ${x.label}` : JSON.stringify(x)) : String(x));
    if (typeof v === 'object') return Object.entries(v).map(([k, x]) => `${k}: ${x}`);
    return [String(v)];
  };
  const L1 = lines(a), L2 = lines(b);
  const s1 = new Set(L1), s2 = new Set(L2);
  const out = [...L1.filter(x => !s2.has(x)).map(x => `<p><del>${esc(x)}</del></p>`), ...L2.filter(x => !s1.has(x)).map(x => `<p><ins>${esc(x)}</ins></p>`)];
  return out.join('') || '<p>지금과 같음</p>';
}

// 되돌리기(확인 창 → 서버). 이 기록보다 뒤에 같은 곳을 바꾼 기록이 있으면 함께 사라진다고 알림
export async function restoreFlow(item, newer) {
  const later = (newer || []).filter(x => x.keys.some(k => item.keys.includes(k)));
  const ok = await ask({
    title: '이 변경 전으로 되돌릴까요?',
    body: `${item.label}\n${when(item.at)} 이전 값으로 돌아갑니다. 되돌린 것도 기록에 남아 다시 되돌릴 수 있습니다.`,
    warn: later.length ? `이 뒤에 같은 곳이 ${later.length}번 더 바뀌었습니다(${later.slice(0, 3).map(x => x.label).join(' / ')}${later.length > 3 ? ' …' : ''}). 되돌리면 그 변경도 함께 사라집니다.` : '',
    ok: '되돌리기', danger: !!later.length,
  });
  if (!ok) return false;
  await api('POST', `/history/${item.id}/restore`);
  toast('되돌렸습니다. 사이트에 바로 반영됩니다.');
  return true;
}

// 기록 목록 표(처음 화면·기록 화면 공용)
export function logRows(items, { detail = true } = {}) {
  return items.map((x, i) => `<tr data-i="${i}"><td class="tm">${when(x.at)}</td><td class="ar">${esc(x.area)}</td><td>${esc(x.label)}${BY[x.by] ? `<span class="tag">${BY[x.by]}</span>` : ''}${x.rf ? '<span class="tag">되돌림</span>' : ''}<div data-diff></div></td>
    <td class="ac">${detail ? '<button type="button" class="lnk" data-dt>자세히</button>' : ''}<button type="button" class="lnk" data-rs>되돌리기</button></td></tr>`).join('');
}
// getItems: 지금 목록을 돌려주는 함수(다시 불러와도 같은 표에 계속 묶임)
export function bindLog(table, getItems, reload) {
  table.addEventListener('click', async e => {
    const tr = e.target.closest('tr[data-i]'); if (!tr) return;
    const items = getItems(), i = +tr.dataset.i, it = items[i];
    if (e.target.closest('[data-rs]')) {
      try { if (await restoreFlow(it, items.slice(0, i))) reload(); } catch (er) { toast(er.message, true); }
    }
    if (e.target.closest('[data-dt]')) {
      const box = $('[data-diff]', tr);
      if (box.innerHTML) { box.innerHTML = ''; return; }
      box.innerHTML = '<div class="diff">불러오는 중…</div>';
      try {
        const d = await api('GET', `/history/${it.id}`);
        box.innerHTML = `<div class="diff"><p class="mono sub" style="margin-bottom:6px">되돌리면 지금 값에서 이렇게 바뀝니다</p>${d.record.keys.map(k => sumKey(k, d.current[k], d.record.before[k])).join('')}</div>`;
      } catch (er) { box.innerHTML = `<div class="diff">${esc(er.message)}</div>`; }
    }
  });
}

export async function historyView(el) {
  el.innerHTML = `<div class="view wide"><div class="hd"><div><span class="mono sub">바뀐 기록</span><h1>바뀐 기록 · 되돌리기</h1></div></div>
    <p class="lead">관리자 화면과 노션 자동 발행으로 바뀐 것을 90일 동안 보관합니다. '되돌리기'를 누르면 그 변경 전 값으로 돌아가고, 되돌린 것도 기록에 남습니다.</p>
    <table class="log" style="margin-top:22px" data-log></table><div data-more style="margin-top:18px"></div></div>`;
  let items = [], cursor = null;
  const table = $('[data-log]', el), more = $('[data-more]', el);
  async function load(reset) {
    if (reset) { items = []; cursor = null; }
    const d = await api('GET', `/history?limit=50${cursor ? '&cursor=' + encodeURIComponent(cursor) : ''}`);
    items = items.concat(d.items); cursor = d.cursor;
    table.innerHTML = items.length ? logRows(items) : '<tr><td class="empty">아직 기록이 없습니다. 이 기능이 생긴 뒤 바뀐 것부터 남습니다.</td></tr>';
    more.innerHTML = cursor ? '<button type="button" class="btn ghost sm">더 보기</button>' : '';
  }
  bindLog(table, () => items, () => load(true));
  more.addEventListener('click', e => { if (e.target.closest('button')) load(false); });
  await load(true);
}
