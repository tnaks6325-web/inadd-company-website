// 새 관리자 화면 — 시작(로그인 확인·메뉴·주소별 화면). 주소는 #/… (예: #/services/ppl)
import { $, $$, esc, token, logout, isDirty, setDirtyCheck, ask, noPreview, toast } from './core.js';
import { homeView } from './home.js';
import { servicesView } from './services.js';
import { historyView } from './history.js';
import { worksView } from './works.js';
import { insightView } from './insight.js';
import { galleryView } from './gallery.js';
import { numbersView, aboutView, inquiryView, accountView } from './settings.js';

if (!token()) location.replace('/admin/login');

const MENU = [
  ['', '처음'],
  ['numbers', '홈 · 회사 숫자'],
  ['about', '회사소개'],
  ['services', '서비스'],
  ['works', '포트폴리오'],
  ['insight', '인사이트'],
  ['gallery', '인애드 일상'],
  ['inquiry', '문의 받기 설정'],
  ['history', '바뀐 기록'],
];

document.body.innerHTML = `<div class="app">
  <nav class="nav" aria-label="관리자 메뉴">
    <a class="brand" href="#/">IN AD COMPANY<small>관리자</small></a>
    ${MENU.map(([k, n]) => `${k === 'history' ? '<div class="gap"></div>' : ''}<a class="it" href="#/${k}" data-m="${k}">${n}</a>`).join('')}
    <div class="grow"></div>
    <div class="foot"><a href="/" target="_blank" rel="noopener">사이트 열기</a><a href="/admin/old">옛 관리자 화면</a><a href="#/account">계정</a><button type="button" data-out>로그아웃</button></div>
  </nav>
  <main class="main" data-main></main>
  <aside class="pv" data-pv hidden></aside>
</div>`;
$('[data-out]').addEventListener('click', async () => { if (!isDirty() || await ask({ title: '저장하지 않은 변경이 있습니다', body: '로그아웃하면 사라집니다.', ok: '로그아웃' })) logout(); });

// 아직 새 화면으로 옮기지 않은 메뉴는 옛 화면으로 안내(2차를 나눠 만드는 동안)
const OLD = { numbers: 'home', about: 'about', works: 'works', insight: 'insight', gallery: 'insight', inquiry: 'home', account: 'home' };
function soon(el, k) {
  el.innerHTML = `<div class="view"><div class="hd"><div><span class="mono sub">준비 중</span><h1>${esc((MENU.find(m => m[0] === k) || [k, '계정'])[1])}</h1></div></div>
    <p class="lead">이 메뉴는 새 화면으로 옮기는 중입니다. 그동안은 옛 관리자 화면에서 고쳐 주세요. 옛 화면에서 저장한 것도 '바뀐 기록'에 남습니다.</p>
    <p style="margin-top:22px"><a class="btn" href="/admin/old#${OLD[k] || 'home'}">옛 관리자 화면 열기</a></p></div>`;
}

let cur = location.hash;
async function route() {
  const h = location.hash || '#/';
  if (h !== cur && isDirty()) {
    const go = await ask({ title: '저장하지 않은 변경이 있습니다', body: '다른 화면으로 가면 사라집니다. 그래도 이동할까요?', ok: '저장 안 하고 이동', danger: true });
    if (!go) { history.replaceState(null, '', cur); return; }
  }
  cur = h;
  setDirtyCheck(null);
  noPreview();
  const [path] = h.slice(2).split('?');
  const [k, a] = path.split('/');
  $$('.nav a.it').forEach(x => x.classList.toggle('on', x.dataset.m === (k || '')));
  const el = $('[data-main]');
  el.scrollTop = 0;
  try {
    if (!k) await homeView(el);
    else if (k === 'services') await servicesView(el, a);
    else if (k === 'history') await historyView(el);
    else if (k === 'works') await worksView(el, a, h.split('?')[1]);
    else if (k === 'insight') await insightView(el, a, h.split('?')[1]);
    else if (k === 'gallery') await galleryView(el, a);
    else if (k === 'numbers') await numbersView(el);
    else if (k === 'about') await aboutView(el);
    else if (k === 'inquiry') await inquiryView(el);
    else if (k === 'account') accountView(el);
    else soon(el, k);
  } catch (e) {
    console.error(e);
    el.innerHTML = `<div class="view"><p class="empty">화면을 불러오지 못했습니다: ${esc(e.message)}</p><p><button type="button" class="btn ghost" onclick="location.reload()">다시 불러오기</button></p></div>`;
    toast(e.message, true);
  }
}
addEventListener('hashchange', route);
route();
