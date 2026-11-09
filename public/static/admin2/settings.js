// 홈 · 회사 숫자 / 회사소개(주소) / 문의 받기 설정 / 계정
import { $, $$, esc, api, ask, toast, saveBar, setDirtyCheck, preview, logout } from './core.js';

// ── 홈 · 회사 숫자 ──
export async function numbersView(el) {
  el.innerHTML = `<div class="view"><div class="hd"><div><span class="mono sub">홈 · 회사 숫자</span><h1>회사 숫자</h1></div></div>
    <p class="lead">사이트의 회사 숫자는 여기 한 곳에서만 바꿉니다. 저장하면 아래에 적힌 페이지에 함께 반영됩니다.</p><div data-body><p class="loading">불러오는 중…</p></div></div>`;
  const pv = preview('/');
  const d = await api('GET', '/home');
  const orig = { projects: +d.stats.projects || 0, contracts: +d.stats.contracts || 0, experience: +d.stats.experience || 0, partners: +d.stats.partners || 0 };
  const cur = { ...orig };
  const F = [
    ['projects', '완료 캠페인', '건', '홈 첫 화면·큰 숫자, 회사소개, 포트폴리오 — 천 단위로 내려서 보여 줌(예: 38,558 → 38,000+)'],
    ['contracts', '재계약률', '%', '회사소개 숫자 칸'],
    ['experience', '업력', '년', '아워테크 첫 문장(“7년 동안 …”)'],
    ['partners', '함께한 브랜드', '개', '홈(“FOR 130 BRANDS”), 회사소개 숫자 칸, 포트폴리오 첫 화면·브랜드 벽 제목'],
  ];
  const body = $('[data-body]', el);
  body.innerHTML = `<div class="blk">${F.map(([k, n, u, w]) => `<div class="fld"><span>${n}<em>${u}</em></span><input class="in" type="number" min="0" data-k="${k}" value="${cur[k]}" style="max-width:220px" /><p class="where" style="margin:6px 0 0">사이트에서 <b>${w}</b></p></div>`).join('')}</div>`;
  const view = $('.view', el);
  const n = () => Object.keys(cur).filter(k => cur[k] !== orig[k]).length;
  const set = saveBar(view, { onSave: save, onReset: () => { Object.assign(cur, orig); $$('[data-k]', body).forEach(i => { i.value = cur[i.dataset.k]; }); set(0); } });
  setDirtyCheck(() => n() > 0);
  body.addEventListener('input', e => { const k = e.target.dataset.k; if (k) { cur[k] = Math.max(0, Math.round(+e.target.value || 0)); set(n()); } });
  async function save() {
    const changed = F.filter(([k]) => cur[k] !== orig[k]).map(([k, nm]) => `${nm} ${orig[k]}→${cur[k]}`).join(', ');
    await api('PUT', '/home', { stats: { ...d.stats, ...cur } }, `회사 숫자: ${changed}`);
    Object.assign(orig, cur); set(0); toast('저장했습니다. 사이트 숫자에 바로 반영됩니다.');
    pv.run((doc, w) => w.location.reload());
  }
}

// ── 회사소개: 주소 ──
let daum;
const loadDaum = () => daum || (daum = new Promise((ok, no) => { const s = document.createElement('script'); s.src = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'; s.onload = ok; s.onerror = () => no(new Error('주소 찾기를 불러오지 못했습니다')); document.head.appendChild(s); }));
export async function aboutView(el) {
  el.innerHTML = `<div class="view"><div class="hd"><div><span class="mono sub">회사소개</span><h1>회사 주소</h1></div><a class="lnk" href="/about" target="_blank" rel="noopener">사이트에서 보기</a></div><div data-body><p class="loading">불러오는 중…</p></div></div>`;
  const pv = preview('/about');
  const d = await api('GET', '/about');
  const orig = { address: d.address || '', addressDetail: d.addressDetail || '', lat: String(d.lat || ''), lng: String(d.lng || '') };
  const cur = { ...orig };
  const body = $('[data-body]', el), view = $('.view', el);
  const draw = () => {
    body.innerHTML = `<div class="blk"><p class="where">사이트에서 <b>회사소개 아래쪽 '오시는 길' 주소와 지도</b>, <b>회사소개서 메일 아래쪽 주소</b></p>
      <div class="fld"><span>주소</span><div class="tools"><input class="in" data-k="address" value="${esc(cur.address)}" readonly style="flex:1;min-width:260px" /><button type="button" class="btn ghost" data-find>주소 찾기</button></div></div>
      <label class="fld"><span>상세 주소</span><input data-k="addressDetail" value="${esc(cur.addressDetail)}" placeholder="예: 타워아이즈빌 2F, 204호" /></label>
      <div class="grid2"><label class="fld"><span>지도 위치 · 위도<em>주소를 바꾸면 자동으로 찾음</em></span><input data-k="lat" value="${esc(cur.lat)}" inputmode="decimal" /></label><label class="fld"><span>지도 위치 · 경도</span><input data-k="lng" value="${esc(cur.lng)}" inputmode="decimal" /></label></div>
      <p class="where" data-geo>${cur.lat && cur.lng ? `<a class="lnk" href="https://map.kakao.com/link/map/${encodeURIComponent('인애드컴퍼니')},${esc(cur.lat)},${esc(cur.lng)}" target="_blank" rel="noopener">지도에서 위치 확인</a>` : ''}</p></div>`;
  };
  draw();
  const n = () => Object.keys(cur).filter(k => cur[k] !== orig[k]).length;
  const set = saveBar(view, { onSave: save, onReset: () => { Object.assign(cur, orig); draw(); set(0); } });
  setDirtyCheck(() => n() > 0);
  body.addEventListener('input', e => { const k = e.target.dataset.k; if (k) { cur[k] = e.target.value.trim(); set(n()); } });
  body.addEventListener('click', async e => {
    if (!e.target.closest('[data-find]')) return;
    try { await loadDaum(); } catch (er) { toast(er.message, true); return; }
    new window.daum.Postcode({ oncomplete: async r => {
      cur.address = r.roadAddress || r.jibunAddress; draw(); set(n());
      $('[data-geo]', body).textContent = '지도 위치를 찾는 중…';
      try {
        // 주소 → 위치(OpenStreetMap 무료 검색). 못 찾으면 직접 넣기
        const g = await (await fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=kr&q=${encodeURIComponent(cur.address)}`, { headers: { 'Accept-Language': 'ko' } })).json();
        if (g && g[0]) { cur.lat = (+g[0].lat).toFixed(6); cur.lng = (+g[0].lon).toFixed(6); draw(); set(n()); toast('지도 위치를 찾았습니다. 지도에서 맞는지 확인해 주세요.'); }
        else { $('[data-geo]', body).textContent = '지도 위치를 자동으로 못 찾았습니다. 지도에서 위치를 확인해 위도·경도를 직접 넣어 주세요.'; }
      } catch { $('[data-geo]', body).textContent = '지도 위치를 자동으로 못 찾았습니다. 위도·경도를 직접 넣어 주세요.'; }
    } }).open();
  });
  async function save() {
    const lat = +cur.lat, lng = +cur.lng;
    if (!cur.address) { toast('주소를 넣어 주세요.', true); return; }
    if (!(lat >= 33 && lat <= 39 && lng >= 124 && lng <= 132)) { toast('지도 위치(위도 33~39, 경도 124~132)가 맞지 않습니다.', true); return; }
    await api('PUT', '/about', { address: cur.address, addressDetail: cur.addressDetail, lat: cur.lat, lng: cur.lng });
    Object.assign(orig, cur); set(0); toast('저장했습니다.'); pv.run((doc, w) => w.location.reload());
  }
}

// ── 문의 받기 설정: 알림 받는 사람 · 회사소개서 링크 · 소개서 메일 ──
const EMAIL = /^[^\s@,;<>]+@[^\s@,;<>]+\.[^\s@,;<>]{2,}$/;
export async function inquiryView(el) {
  el.innerHTML = `<div class="view"><div class="hd"><div><span class="mono sub">문의 받기 설정</span><h1>문의 받기 설정</h1></div></div>
    <p class="lead">사이트 '문의하기' 창으로 상담 신청이 오면 일어나는 일입니다: ① 아래 사람들에게 알림 메일 ② 신청한 분께 회사소개서 메일.</p><div data-body><p class="loading">불러오는 중…</p></div></div>`;
  const [rc, hm, bm] = await Promise.all([api('GET', '/mail-recipients'), api('GET', '/home'), api('GET', '/brochure-mail')]);
  const orig = { recipients: rc.recipients.slice(), brochure: hm.brochure || '', subject: bm.subject || '', headline: bm.headline || '', body: bm.body || '', tags: (bm.tags || []).join(', ') };
  const cur = JSON.parse(JSON.stringify(orig));
  const body = $('[data-body]', el), view = $('.view', el);
  const draw = () => {
    body.innerHTML = `<section class="blk"><div class="blk-h"><h2>① 알림 받는 사람 <span class="sub small" style="font-weight:400">${cur.recipients.length}명${rc.isDefault && JSON.stringify(cur.recipients) === JSON.stringify(orig.recipients) ? ' · 기본 목록' : ''}</span></h2><button type="button" class="lnk" data-test>시험 메일 보내기</button></div>
        <p class="where">상담 신청이 오면 이 주소로 알림 메일이 갑니다 · 최소 1명, 최대 ${rc.max || 50}명</p>
        ${cur.recipients.map((r, i) => `<div class="row" style="grid-template-columns:1fr 70px"><input class="in" data-r="${i}" value="${esc(r)}" type="email" placeholder="name@inadcompany.com" /><button type="button" class="x" data-rdel="${i}" aria-label="빼기" ${cur.recipients.length > 1 ? '' : 'disabled'}>×</button></div>`).join('')}
        <button type="button" class="lnk" data-radd>사람 추가</button></section>
      <section class="blk"><div class="blk-h"><h2>② 회사소개서 메일</h2></div>
        <p class="where">신청한 분께 자동으로 가는 메일 — 소개서 링크 버튼이 들어갑니다</p>
        <label class="fld"><span>회사소개서 링크<em>구글 드라이브 등 '링크가 있는 모든 사용자' 공유 주소</em></span><input data-k="brochure" value="${esc(cur.brochure)}" placeholder="https://drive.google.com/…" /></label>
        <label class="fld"><span>메일 제목 *<em>받은편지함에 보임 · 150자까지</em></span><input data-k="subject" value="${esc(cur.subject)}" maxlength="150" /></label>
        <label class="fld"><span>메일 큰 제목 *<em>줄바꿈 그대로 보임</em></span><textarea data-k="headline" rows="2">${esc(cur.headline)}</textarea></label>
        <label class="fld"><span>본문</span><textarea data-k="body" rows="4">${esc(cur.body)}</textarea></label>
        <label class="fld"><span>서비스 이름표<em>쉼표로 나눔 · 6개까지 권장</em></span><input data-k="tags" value="${esc(cur.tags)}" /></label></section>`;
  };
  draw();
  const n = () => Object.keys(cur).filter(k => JSON.stringify(cur[k]) !== JSON.stringify(orig[k])).length;
  const set = saveBar(view, { onSave: save, onReset: () => { Object.assign(cur, JSON.parse(JSON.stringify(orig))); draw(); set(0); } });
  setDirtyCheck(() => n() > 0);
  body.addEventListener('input', e => {
    const t = e.target;
    if (t.dataset.r !== undefined) cur.recipients[+t.dataset.r] = t.value.trim();
    if (t.dataset.k) cur[t.dataset.k] = t.value;
    set(n());
  });
  body.addEventListener('click', async e => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.hasAttribute('data-radd')) { if (cur.recipients.length >= (rc.max || 50)) return; cur.recipients.push(''); draw(); set(n()); $$('[data-r]', body).pop().focus(); return; }
    if (b.dataset.rdel !== undefined) { cur.recipients.splice(+b.dataset.rdel, 1); draw(); set(n()); return; }
    if (b.hasAttribute('data-test')) {
      if (n()) { toast('먼저 저장한 뒤 시험 메일을 보내 주세요.', true); return; }
      if (!await ask({ title: '시험 메일을 보낼까요?', body: `저장된 ${orig.recipients.length}명에게 실제 메일이 갑니다.\n${orig.recipients.join('\n')}`, ok: '보내기' })) return;
      b.disabled = true; b.textContent = '보내는 중…';
      try { const r = await api('POST', '/mail-recipients/test'); toast(`시험 메일을 보냈습니다: ${(r.recipients || []).join(', ')}`); } catch (er) { toast(er.message, true); }
      b.disabled = false; b.textContent = '시험 메일 보내기';
    }
  });
  async function save() {
    const rs = cur.recipients.map(x => x.trim()).filter(Boolean);
    const bad = rs.filter(x => !EMAIL.test(x));
    if (bad.length) { toast(`메일 주소 형식이 맞지 않습니다: ${bad.join(', ')}`, true); return; }
    if (!rs.length) { toast('알림 받는 사람은 최소 1명이어야 합니다.', true); return; }
    if (!cur.subject.trim() || !cur.headline.trim()) { toast('메일 제목과 큰 제목은 비울 수 없습니다.', true); return; }
    const t = [];
    if (JSON.stringify(rs) !== JSON.stringify(orig.recipients)) t.push(api('PUT', '/mail-recipients', { recipients: rs }).then(r => { cur.recipients = r.recipients; }));
    if (cur.brochure !== orig.brochure) t.push(api('PUT', '/home', { brochure: cur.brochure.trim() }));
    if (['subject', 'headline', 'body', 'tags'].some(k => cur[k] !== orig[k])) t.push(api('PUT', '/brochure-mail', { subject: cur.subject.trim(), headline: cur.headline, body: cur.body, tags: cur.tags.split(',').map(x => x.trim()).filter(Boolean) }));
    await Promise.all(t);
    Object.assign(orig, JSON.parse(JSON.stringify(cur))); rc.isDefault = false; draw(); set(0); toast('저장했습니다.');
  }
}

// ── 계정 ──
export function accountView(el) {
  el.innerHTML = `<div class="view"><div class="hd"><div><span class="mono sub">계정</span><h1>아이디 · 비밀번호 바꾸기</h1></div></div>
    <p class="lead">바꾸면 다시 로그인해야 합니다. 계정 변경은 '바뀐 기록'에 남기지 않습니다.</p>
    <form class="blk" data-f style="max-width:420px" autocomplete="on">
      <label class="fld"><span>지금 비밀번호</span><input type="password" name="cur" autocomplete="current-password" required /></label>
      <label class="fld"><span>새 아이디</span><input name="id" autocomplete="username" required /></label>
      <label class="fld"><span>새 비밀번호<em>4자 이상</em></span><input type="password" name="pw" autocomplete="new-password" minlength="4" required /></label>
      <label class="fld"><span>새 비밀번호 한 번 더</span><input type="password" name="pw2" autocomplete="new-password" required /></label>
      <button class="btn" type="submit">바꾸기</button></form></div>`;
  $('[data-f]', el).addEventListener('submit', async e => {
    e.preventDefault();
    const f = new FormData(e.target);
    if (f.get('pw') !== f.get('pw2')) { toast('새 비밀번호가 서로 다릅니다.', true); return; }
    try { await api('PUT', '/change-credentials', { currentPw: f.get('cur'), newId: f.get('id'), newPw: f.get('pw') }); toast('바꿨습니다. 다시 로그인해 주세요.'); setTimeout(logout, 1500); }
    catch (er) { toast(er.message, true); }
  });
}
