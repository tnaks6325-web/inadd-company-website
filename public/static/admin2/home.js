// 처음 화면(시안 C) — 자주 하는 일 · 확인이 필요한 것(자동으로 모음) · 최근 바뀐 것 · 사이트 숫자
import { $, esc, api, ARROW, SVC, BANNED, when } from './core.js';
import { logRows, bindLog } from './history.js';

const ACTS = [
  ['#/insight/new', '인사이트 글 쓰기', '제목·분류·썸네일·본문 — 저장하면 인사이트 목록 맨 위에'],
  ['#/works/new', '포트폴리오 사례 추가', '브랜드명·대표 이미지·진행 서비스 — 포트폴리오 사례 목록에'],
  ['#/gallery/new', '인애드 일상 사진 올리기', '여러 장을 한 묶음으로 — 인사이트의 ‘인애드 일상’ 탭에'],
  ['#/services/viral', '서비스 질문·숫자 고치기', '서비스 6곳의 첫 화면 숫자와 자주 묻는 질문'],
];

export async function homeView(el) {
  el.innerHTML = `<div class="view wide"><div class="hd"><div><span class="mono sub">IN AD COMPANY 관리자</span><h1>무엇을 할까요?</h1></div><a class="lnk" href="/" target="_blank" rel="noopener">사이트 열기</a></div>
    <div class="home-grid">
      <div>
        <div class="acts">${ACTS.map(([h, t, d], i) => `<a href="${h}"><span class="mono sub">0${i + 1}</span><span><b>${t}</b><span class="d">${d}</span></span>${ARROW}</a>`).join('')}</div>
        <section style="margin-top:46px"><h2 class="t">최근 바뀐 것 <a class="lnk" href="#/history">전체 기록</a></h2><table class="log" data-log><tr><td class="loading">불러오는 중…</td></tr></table></section>
      </div>
      <div>
        <h2 class="t">확인이 필요한 것 <span class="sub small" style="font-weight:400">들어올 때마다 자동으로 확인</span></h2>
        <div class="chk" data-chk><div><i></i><span class="sub">확인하는 중…</span><span></span></div></div>
        <h2 class="t" style="margin-top:36px">사이트 숫자 <a class="lnk" href="#/numbers">바꾸기</a></h2>
        <div class="nums" data-nums></div>
      </div>
    </div></div>`;

  // 최근 바뀐 것(6개)
  let log = [];
  const table = $('[data-log]', el);
  const loadLog = async () => {
    try { log = (await api('GET', '/history?limit=6')).items; } catch { log = []; }
    table.innerHTML = log.length ? logRows(log, { detail: false }) : '<tr><td class="empty">아직 기록이 없습니다. 이제부터 저장하는 것이 여기에 남습니다.</td></tr>';
  };
  bindLog(table, () => log, loadLog);
  loadLog();

  // 사이트 숫자
  api('GET', '/home').then(d => {
    const s = d.stats || {};
    const k = Math.floor((+s.projects || 0) / 1000) * 1000;
    $('[data-nums]', el).innerHTML = [
      [k > 0 ? k.toLocaleString('ko-KR') + '+' : '—', '완료 캠페인 · 홈·회사소개·포트폴리오'],
      [(+s.contracts || 0) + '%', '재계약률 · 회사소개'],
      [(+s.experience || 0) + '년', '업력 · 아워테크'],
      [(+s.partners || 0).toLocaleString('ko-KR'), '함께한 브랜드 · 홈·회사소개·포트폴리오'],
    ].map(([b, t]) => `<div><b>${b}</b><span>${t}</span></div>`).join('');
  }).catch(() => {});

  // 확인이 필요한 것
  const rows = [];
  const add = (lvl, title, desc, href, act) => rows.push(`<div><i class="${lvl === '!' ? 'w' : lvl === 'v' ? 'ok' : ''}">${lvl === 'v' ? '✓' : lvl}</i><span><b>${title}</b><p>${desc}</p></span>${href ? `<a class="lnk" href="${href}">${act || '고치기'}</a>` : '<span></span>'}</div>`);
  const [works, ins, rec, kpiD, ...faqs] = await Promise.all([
    api('GET', '/works').catch(() => null), api('GET', '/insight').catch(() => null), api('GET', '/mail-recipients').catch(() => null),
    api('GET', '/hero-kpi').catch(() => null), ...SVC.map(([k]) => api('GET', `/svc-faq/${k}`).catch(() => null)),
  ]);
  if (works) {
    // 대표 이미지가 있으면 사례 카드, 로고만 있으면 '함께한 브랜드' 로고 칸으로 나옴. 둘 다 없을 때만 사이트에 안 보임
    const all = works.items || [], hid = all.filter(w => !w.cover && !w.thumb), logo = all.filter(w => !w.cover && w.thumb).length;
    if (hid.length) add('!', `사이트에 안 보이는 포트폴리오 사례 ${hid.length}개`, `대표 이미지도 로고도 없으면 사이트에 나오지 않습니다 — ${esc(hid.slice(0, 3).map(w => w.brand || '이름 없음').join(', '))}${hid.length > 3 ? ' …' : ''}`, '#/works?f=hidden');
    else add('v', '포트폴리오 사례', all.length ? `${all.length}개 모두 사이트에 나옵니다 — 사례 카드 ${all.length - logo}개, 함께한 브랜드 로고 ${logo}개` : '등록된 사례가 없습니다');
  }
  if (ins) {
    const nt = (ins.posts || []).filter(p => !p.thumbnail);
    if (nt.length) add('!', `썸네일 없는 인사이트 글 ${nt.length}개`, `목록에서 빈 칸으로 보입니다 — ${esc(nt.slice(0, 2).map(p => p.title).join(', '))}${nt.length > 2 ? ' …' : ''}`, '#/insight?f=nothumb');
    else add('v', '인사이트 글', (ins.posts || []).length ? `${ins.posts.length}개 모두 썸네일이 있습니다` : '등록된 글이 없습니다');
  }
  const kpiAll = (kpiD && kpiD.kpi) || {};
  const hits = [];
  SVC.forEach(([k, n], i) => {
    const faq = (faqs[i] && faqs[i].faq) || [];
    const text = JSON.stringify(faq) + JSON.stringify(kpiAll[k] || []);
    const w = BANNED.filter(b => text.includes(b));
    if (w.length) hits.push(`${n}(${w.join('·')})`);
  });
  if (hits.length) add('!', '서비스 페이지에 쓰지 않는 낱말', `${esc(hits.join(', '))}`, `#/services/${SVC[0][0]}`);
  else add('v', '서비스 페이지 낱말', `${BANNED.join('·')} — 6곳 모두 없음`);
  if (rec) add('i', `문의 알림 받는 사람 ${rec.recipients.length}명${rec.isDefault ? ' (기본 목록)' : ''}`, '상담 신청이 오면 이 주소로 알림 메일이 갑니다', '#/inquiry', '확인');
  $('[data-chk]', el).innerHTML = rows.join('');
}
