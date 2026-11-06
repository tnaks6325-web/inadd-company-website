// 개편 회사소개(2026-11-06 운영 이식) — 시안 lab/about-3.html(대표 인터뷰)의 연출 그대로 + 오시는 길 지도(대표: 지금처럼 지도를 넣음).
// 마크업 src/routes/renewal/about-body.html, 모양 about.css. 첫 화면은 기존 /static/about-hero.* 그대로.
// 회사 숫자: 완료 캠페인은 관리자 기록(/api/admin/public/home stats.projects, 천 단위로 내림), 재계약률은 stats.contracts — 실패하면 data.js 값
const ABOUT_STATS = fetch('/api/admin/public/home').then(r => r.json()).then(d => d && d.stats || {}).catch(() => ({}));
SITE.boot(ctx => {
  const { $, $$, D, mobile } = ctx;

  // ── 내용 채우기(회사 숫자는 홈과 같은 곳에서) ──
  const pick = en => D.stats.find(s => s.en === en);
  $('[data-facts]').innerHTML = ['SINCE', 'CAMPAIGNS', 'BRANDS', 'RENEWAL'].map(pick).map(s => `<div data-en="${s.en}"><b><span data-n="${s.n}">0</span><i>${s.unit}</i></b><span>${s.label}</span></div>`).join('');

  // 답: 문단마다 아래에서 올라옴
  $$('.a p').forEach(p => gsap.from(p, { y: 30, opacity: 0, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: p, start: 'top 88%' } }));

  // 질문 사이: 사진이 화면 가득 열리고, 대표 말 한 줄이 단어 단위로 차오름
  $$('.shot').forEach(sh => {
    const q = $('[data-wq]', sh);
    q.innerHTML = q.textContent.split(' ').map(w => `<span class="w">${w}</span>`).join(' ');
    gsap.timeline({ scrollTrigger: { trigger: sh, start: 'top 80%', end: 'bottom 60%', scrub: true } })
      .to($('.shot-pic', sh), { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', duration: .5 }, 0)
      .to($$('.w', sh), { opacity: 1, stagger: .08, ease: 'none', duration: .2 }, .25);
    gsap.fromTo($('img', sh), { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: sh, scrub: true } });
  });

  // 숫자 세기
  $$('[data-n]').forEach(el => {
    ABOUT_STATS.then(st => {
      const base = +el.dataset.n, en = el.closest('div').dataset.en;
      const k = Math.floor((+st.projects || 0) / 1000) * 1000;
      if (en === 'CAMPAIGNS' && k > 0) el.dataset.n = k;
      if (en === 'RENEWAL' && +st.contracts > 0) el.dataset.n = +st.contracts;
      return base;
    }).then(() => count(el));
  });
  function count(el) {
    const n = +el.dataset.n, o = { v: n === 2019 ? 1990 : 0 };
    ScrollTrigger.create({ trigger: el, start: 'top 90%', once: true, onEnter: () => gsap.to(o, { v: n, duration: 1.6, ease: 'power3.out', onUpdate: () => el.textContent = n === 2019 ? Math.round(o.v) : Math.round(o.v).toLocaleString('en-US') }) });
  }

  // 메일 주소 복사(대표: 누르면 열리는 메일 앱은 거의 안 써서 복사로 제공)
  $$('[data-copy]').forEach(b => b.addEventListener('click', async () => {
    const done = () => { b.textContent = '복사했어요'; clearTimeout(b._t); b._t = setTimeout(() => { b.textContent = '주소 복사'; }, 2000); };
    try { await navigator.clipboard.writeText(b.dataset.copy); done(); }
    catch (x) { const r = document.createRange(); r.selectNodeContents(b.previousElementSibling); const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r); try { document.execCommand('copy'); done(); } catch (y) {} }
  }));

  // 오시는 길 지도 — 지금 회사소개와 같은 지도(Leaflet + OpenStreetMap, 무료), 주소·좌표는 관리자 화면 값. 화면에 가까워지면 그때 불러옴
  // 휠은 페이지 스크롤에 쓰고(확대는 +/− 버튼), 휴대폰은 한 손가락으로 끌면 페이지가 내려가게 지도 끌기를 끔
  const mapEl = $('[data-loc-map]');
  if (mapEl) {
    const DEF = { lat: 37.320819, lng: 126.831592 };
    const info = fetch('/api/admin/public/about').then(r => r.json()).catch(() => ({}));
    info.then(d => { if (d && d.address) $('[data-loc-addr]').innerHTML = d.address + (d.addressDetail ? '<br />' + d.addressDetail : ''); });
    const leaflet = () => window.L ? Promise.resolve() : new Promise((ok, no) => {
      const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'; document.head.appendChild(l);
      const s = document.createElement('script'); s.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'; s.onload = ok; s.onerror = no; document.head.appendChild(s);
    });
    ScrollTrigger.create({ trigger: mapEl, start: 'top bottom+=600', once: true, onEnter: () => Promise.all([leaflet(), info]).then(([, d]) => {
      const lat = parseFloat(d && d.lat) || DEF.lat, lng = parseFloat(d && d.lng) || DEF.lng;
      const map = L.map(mapEl, { scrollWheelZoom: false, dragging: !mobile, tap: false, attributionControl: true }).setView([lat, lng], 17);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' }).addTo(map);
      L.marker([lat, lng], { icon: L.divIcon({ className: '', html: '<div class="loc-pin"></div>', iconSize: [18, 18], iconAnchor: [9, 9] }) }).addTo(map)
        .bindTooltip('IN AD COMPANY', { permanent: true, direction: 'top', offset: [0, -14], className: 'loc-tag' });
    }).catch(() => {}) });
  }
});
