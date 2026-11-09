// 새 관리자 화면 — 공통(로그인 확인·서버 요청·알림·확인 창·이동·저장 안 한 변경 지키기)
export const $ = (s, r = document) => r.querySelector(s);
export const $$ = (s, r = document) => [...r.querySelectorAll(s)];
export const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

// 서비스 이름(관리자 탭 순서 — 새 사이트 메뉴 순서). SEO 는 페이지가 없어져 뺌(2026-11-09)
export const SVC = [['viral', '바이럴'], ['influencer', '인플루언서'], ['seeding', '체험단'], ['review', '고객 리뷰'], ['oliveyoung', '올리브영'], ['ppl', 'PPL']];
export const SVC_NAME = Object.fromEntries(SVC);
// 서비스 페이지·자주 묻는 질문에 쓰지 않는 낱말(대표 규칙: 협찬·대가 표현 금지, 용어 확정 — 클라이언트·대행사·고객·타깃)
export const BANNED = ['협찬', '에이전시', '손님', '타겟', '광고주', '뒷광고'];

export const token = () => localStorage.getItem('admin_token') || '';
export function logout() { localStorage.removeItem('admin_token'); document.cookie = 'admin_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; location.href = '/admin/login'; }

// 서버 요청. note = '바뀐 기록'에 남길 한 줄 설명(선택)
export async function api(method, path, body, note) {
  const headers = { Authorization: 'Bearer ' + token() };
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  if (note) headers['X-Admin-Note'] = encodeURIComponent(note);
  const res = await fetch('/api/admin' + path, { method, headers, body: body === undefined ? undefined : JSON.stringify(body) });
  if (res.status === 401) { logout(); throw new Error('로그인이 필요합니다'); }
  let data = null;
  try { data = await res.json(); } catch {}
  if (!res.ok) throw new Error((data && data.error) || `저장하지 못했습니다(${res.status})`);
  return data || {};
}

// 아래쪽 알림
let toastT;
export function toast(msg, err) {
  let el = $('.toast');
  if (!el) { el = document.createElement('div'); el.className = 'toast'; el.setAttribute('role', 'status'); document.body.appendChild(el); }
  el.textContent = msg; el.classList.toggle('err', !!err); el.hidden = false;
  clearTimeout(toastT); toastT = setTimeout(() => { el.hidden = true; }, err ? 6000 : 2600);
}

// 확인 창(브라우저 기본 창 대신). 돌려주는 값: true(확인) / false(취소)
export function ask({ title, body = '', warn = '', ok = '확인', cancel = '취소', danger = false }) {
  return new Promise(resolve => {
    const d = document.createElement('div');
    d.className = 'dlg';
    d.innerHTML = `<div class="dlg-box" role="dialog" aria-modal="true" aria-labelledby="dlg-t"><h3 id="dlg-t">${esc(title)}</h3>${body ? `<p class="body">${esc(body)}</p>` : ''}${warn ? `<p class="warn">${esc(warn)}</p>` : ''}
      <div class="dlg-act">${cancel ? `<button type="button" class="btn ghost" data-no>${esc(cancel)}</button>` : ''}<button type="button" class="btn${danger ? ' danger' : ''}" data-yes>${esc(ok)}</button></div></div>`;
    const done = v => { d.remove(); removeEventListener('keydown', key); resolve(v); };
    const key = e => { if (e.key === 'Escape') done(false); };
    d.addEventListener('click', e => { if (e.target === d) done(false); });
    $('[data-yes]', d).addEventListener('click', () => done(true));
    const no = $('[data-no]', d); if (no) no.addEventListener('click', () => done(false));
    addEventListener('keydown', key);
    document.body.appendChild(d);
    $('[data-yes]', d).focus();
  });
}

// 날짜 표시
export const when = iso => { const d = new Date(iso); const p = n => String(n).padStart(2, '0'); return `${p(d.getMonth() + 1)}.${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`; };
export const day = iso => (iso || '').slice(0, 10).replace(/-/g, '.');

// 지금 화면의 '저장 안 한 변경' — 다른 메뉴로 가거나 창을 닫을 때 물어봄
let dirtyFn = () => false;
export const setDirtyCheck = fn => { dirtyFn = fn || (() => false); };
export const isDirty = () => { try { return !!dirtyFn(); } catch { return false; } };
addEventListener('beforeunload', e => { if (isDirty()) { e.preventDefault(); e.returnValue = ''; } });

// 저장 띠: 바뀐 개수 표시·되돌리기·저장
export function saveBar(host, { onSave, onReset }) {
  host.insertAdjacentHTML('beforeend', `<div class="bar"><span class="cnt" data-bar-cnt>바뀐 곳 없음</span><button type="button" class="btn ghost" data-bar-reset disabled>처음 값으로</button><button type="button" class="btn" data-bar-save disabled>저장</button></div>`);
  const cnt = $('[data-bar-cnt]', host), save = $('[data-bar-save]', host), reset = $('[data-bar-reset]', host);
  let busy = false;
  const set = (n, label) => {
    cnt.textContent = n ? (label || `바뀐 곳 ${n} · 저장 전`) : '바뀐 곳 없음';
    cnt.classList.toggle('dirty', !!n);
    save.disabled = busy || !n; reset.disabled = busy || !n;
  };
  save.addEventListener('click', async () => {
    busy = true; save.disabled = reset.disabled = true; save.textContent = '저장 중…';
    try { await onSave(); } catch (e) { toast(e.message, true); }
    busy = false; save.textContent = '저장';
  });
  reset.addEventListener('click', async () => { if (await ask({ title: '처음 값으로 돌릴까요?', body: '저장하지 않은 변경이 모두 사라집니다.', ok: '처음 값으로' })) onReset(); });
  return set;
}

// 오른쪽 미리보기(실제 사이트 페이지를 작게). 같은 주소라 저장 전 값을 화면 안에 바로 넣어 볼 수 있음
export function preview(url, { scale = 0.315, scrollTo } = {}) {
  const app = $('.app'), pv = $('[data-pv]');
  app.classList.add('has-pv');
  pv.hidden = false;
  pv.innerHTML = `<div class="pv-h"><span class="mono">미리보기 · 저장 전 값</span><span><a class="lnk" href="${esc(url)}" target="_blank" rel="noopener">사이트에서 보기</a></span><button type="button" class="lnk" data-pv-t>${app.classList.contains('pv-off') ? '미리보기 열기' : '접기'}</button></div><div class="pv-box"><iframe title="미리보기" tabindex="-1" src="${esc(url)}"></iframe></div>`;
  const f = $('iframe', pv);
  const fit = () => { const w = $('.pv-box', pv).clientWidth || 460; const s = w / 1440; f.style.transform = `scale(${s})`; f.style.height = Math.ceil(($('.pv-box', pv).clientHeight || 800) / s) + 'px'; };
  fit(); addEventListener('resize', fit);
  $('[data-pv-t]', pv).addEventListener('click', e => { app.classList.toggle('pv-off'); e.target.textContent = app.classList.contains('pv-off') ? '미리보기 열기' : '접기'; setTimeout(fit, 50); });
  const ready = new Promise(r => f.addEventListener('load', () => r(f), { once: true }));
  return {
    // 미리보기 안 문서에서 fn 실행(불러온 뒤)
    run: fn => ready.then(fr => { try { fn(fr.contentDocument, fr.contentWindow); } catch (e) { console.warn(e); } }),
    // 미리보기를 그 자리로 스크롤
    show: sel => ready.then(fr => { try { const d = fr.contentDocument, el = d.querySelector(sel); if (!el) return; const y = el.getBoundingClientRect().top + fr.contentWindow.scrollY - 120; (fr.contentWindow.__lenis ? fr.contentWindow.__lenis.scrollTo(y, { immediate: true }) : fr.contentWindow.scrollTo(0, y)); } catch {} }),
  };
}
export function noPreview() { const app = $('.app'); app.classList.remove('has-pv'); const pv = $('[data-pv]'); pv.hidden = true; pv.innerHTML = ''; }

// 화살표(오른쪽) — 대각선 화살표 쓰지 않음
export const ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

// FAQ 답: 사이트에는 <strong> 만 씀 → 고칠 때는 **굵게** 로 보여 주고 저장할 때 다시 바꿈(다른 태그가 섞였으면 그대로 둠)
const unent = s => s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&');
export function htmlToEdit(h) {
  h = String(h || '');
  if (/<(?!\/?strong>)[a-z/!]/i.test(h)) return { text: h, raw: true };
  return { text: unent(h.replace(/<strong>([\s\S]*?)<\/strong>/g, '**$1**')), raw: false };
}
export function editToHtml(t, raw) {
  if (raw) return String(t || '');
  return esc(String(t || '')).replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/\*\*([\s\S]+?)\*\*/g, '<strong>$1</strong>');
}

// 그림 줄이기: 긴 쪽을 maxW×maxH 안으로(키우지 않음), JPEG. 반환 data URL — 서버 KV 에 그대로 저장되므로 꼭 줄여서 올린다
export function shrink(file, maxW, maxH, q = 0.85) {
  return new Promise((ok, no) => {
    if (!file || !/^image\//.test(file.type)) return no(new Error('그림 파일만 올릴 수 있습니다'));
    const img = new Image(), url = URL.createObjectURL(file);
    img.onload = () => {
      const s = Math.min(1, maxW / img.width, maxH / img.height);
      const c = document.createElement('canvas'); c.width = Math.round(img.width * s); c.height = Math.round(img.height * s);
      const g = c.getContext('2d'); g.fillStyle = '#fff'; g.fillRect(0, 0, c.width, c.height); g.drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url); ok(c.toDataURL('image/jpeg', q));
    };
    img.onerror = () => { URL.revokeObjectURL(url); no(new Error('그림을 읽지 못했습니다')); };
    img.src = url;
  });
}
// 파일 고르기 창
export function pickFiles({ multiple = false, accept = 'image/*' } = {}) {
  return new Promise(ok => { const i = document.createElement('input'); i.type = 'file'; i.accept = accept; i.multiple = multiple; i.onchange = () => ok([...i.files]); i.click(); });
}
