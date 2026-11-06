// 개편 A안 공통 — 머리 메뉴(회사소개·서비스 펼침·포트폴리오·인사이트 + 문의하기), 휴대폰 전체 메뉴, 문의 띠·바닥,
// 관성 스크롤, 줄 단위 제목 등장, 구역마다 바탕색 전환, 시안 페이지끼리 이동.
// 페이지는 SITE.boot(ctx => { ... }) 안에서 자기 연출만 만든다. 바탕색 전환·위치 계산은 그 뒤에 여기서 한 번에 한다.
// 필요한 것: gsap, ScrollTrigger, SplitText, Lenis, common/data.js(window.INAD) 를 먼저 불러올 것.
// 운영 홈페이지(2026-11-06 이식): window.INAD_LIVE 가 켜진 페이지는 링크를 실제 주소로 그대로 열고, 간편 문의 창은 실제로 접수한다(/api/mail/contact·brochure).
(() => {
  const LIVE = !!window.INAD_LIVE;
  const D = window.INAD, $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const CHEV = '<svg viewBox="0 0 12 8" fill="none"><path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>';
  const MENU = [
    { g: '전담·성과', items: [['subscription', '신입 1명 비용으로 전담 TF팀'], ['performance', '광고 운영부터 전환 데이터 분석까지']] },
    { g: '입소문·후기', items: [['viral', '커뮤니티 기반 자연확산'], ['influencer', '1,520+ 크리에이터 네트워크'], ['seeding', '샘플 배포·후기 수집'], ['review', '브랜드 신뢰·전환율 향상']] },
    { g: '채널·노출', items: [['oliveyoung', 'H&B 채널 랭킹 최적화'], ['ppl', '콘텐츠 속 자연스러운 노출']] },
  ];
  const SVC = Object.fromEntries(D.services.map((s, i) => [s.k, { ...s, i }]));

  // 실제 주소 → 시안 파일. 없는 곳은 안내만 띄운다.
  const ROUTES = { '/': 'home.html', '/about': 'about-3.html', '/development': 'tech.html', '/works': 'works.html', '/insight': 'insight.html', '/contact': 'contact.html' };
  function labHref(h) {
    if (!h || !h.startsWith('/')) return null;
    if (h.startsWith('/#')) return 'home.html' + h.slice(1);
    const [path, hash = ''] = h.split('#');
    if (ROUTES[path]) return ROUTES[path] + (hash ? '#' + hash : '');
    let m = path.match(/^\/marketing\/([a-z]+)$/); if (m && SVC[m[1]]) return 'svc.html?k=' + m[1] + (hash ? '#' + hash : '');
    m = path.match(/^\/insight\/(.+)$/); if (m) return 'insight-detail.html?id=' + encodeURIComponent(m[1]);
    return null;
  }

  // 머리 메뉴·펼침 판·휴대폰 메뉴 등 화면 틀(HTML 글자). 운영에서는 서버가 같은 글자를 미리 넣어 두므로(검색 로봇이 링크를 읽게) 이미 있으면 다시 넣지 않는다
  function chromeHTML(nav) {
    return `
<div class="grain"></div>
<div class="curtain" data-curtain></div>
<header class="hd" data-hd>
  <a class="logo" href="/">IN AD COMPANY</a>
  <nav>
    <a href="/about" class="${nav === 'about' ? 'is-cur' : ''}" data-mini-t>회사소개</a>
    <a href="/#services" class="${nav === 'services' ? 'is-cur' : ''}" data-mega-t>서비스 ${CHEV}</a>
    <a href="/works" class="${nav === 'works' ? 'is-cur' : ''}">포트폴리오</a>
    <a href="/insight" class="${nav === 'insight' ? 'is-cur' : ''}">인사이트</a>
  </nav>
  <div class="r"><a class="cta" href="/contact">문의하기</a><button class="mbtn" type="button" data-mopen>메뉴</button></div>
</header>
<div class="mini" data-mini>
  <a href="/about">회사 이야기<em>대표 인터뷰 · 사무실</em></a>
  <a href="/development">아워테크<em>자체 자동화 기술</em></a>
</div>
<div class="mega" data-mega>
  <div class="mega-in">
    <div class="mega-groups">${MENU.map(m => `<div class="mg"><span class="mono">${m.g}</span>${m.items.map(([k, d]) => `<a href="${SVC[k].href}" data-mi="${SVC[k].i}"><b>${SVC[k].name}</b><em>${d}</em></a>`).join('')}</div>`).join('')}</div>
    <div class="mega-view"><div class="mega-pic" data-mpic></div><div class="mega-cap"><span class="mono" data-mcap-n></span><span data-mcap-t></span></div></div>
    <div class="mega-foot"><span>상황에 맞는 서비스를 모르겠다면, 문의 한 번이면 같이 골라 드립니다.</span><a href="/contact">문의하기</a></div>
  </div>
</div>
<div class="mnav" data-mnav>
  <div class="mnav-top"><b>IN AD COMPANY</b><button type="button" data-mclose>닫기</button></div>
  <div class="mnav-list">
    <div><a class="big" href="/about">회사소개</a><a href="/development" style="display:block;font-size:15px;color:rgba(245,244,240,.7);padding:0 0 16px">아워테크 · 자체 자동화 기술</a></div>
    <div data-macc><button class="big" type="button" data-macc-t>서비스 ${CHEV}</button><div class="mnav-sub"><div>${MENU.map(m => `<span class="mono">${m.g}</span>${m.items.map(([k]) => `<a href="${SVC[k].href}">${SVC[k].name}</a>`).join('')}`).join('')}</div></div></div>
    <div><a class="big" href="/works">포트폴리오</a></div>
    <div><a class="big" href="/insight">인사이트</a></div>
  </div>
  <div class="mnav-go"><a href="/contact">문의하기</a><p>${D.hours}</p></div>
</div>
<div class="toast" data-toast></div>`;
  }
  function chrome() {
    const nav = document.body.dataset.nav || '';
    if (!LIVE && !document.querySelector('link[rel="icon"]')) document.head.insertAdjacentHTML('beforeend', '<link rel="icon" href="/static/logo.png" />');
    if (!$('[data-hd]')) document.body.insertAdjacentHTML('afterbegin', chromeHTML(nav));
    // 문의 띠 + 바닥: <section data-site-end data-num data-title data-desc data-bg>
    $$('[data-site-end]').forEach(fillEnd);
  }

  // 문의 띠 + 바닥(HTML 글자). ds = 구역의 data-* (num·title·desc), floatCta = 떠 있는 문의 버튼이 내려앉을 자리를 둘지
  function endHTML(ds, floatCta) {
    return `
    <span class="mono" style="color:var(--mute)">${ds.num || 'CONTACT'}</span>
    <p class="cta-t" data-reveal style="margin-top:30px">${ds.title || '브랜드의 다음 장면,<br />같이 만들겠습니다'}</p>
    <div class="cta-row">
      <p style="color:var(--mute);font-size:16px;line-height:1.7">${ds.desc || '인애드컴퍼니 전문가가 브랜드 상황을 보고 무료로 진단해 드립니다.'}<br /><span class="mono" style="letter-spacing:.04em">${D.hours}</span></p>
      ${floatCta ? '<span class="fcta-dock" data-fcta-dock></span>' : `<a class="btn" href="/contact">문의하기 ${ARROW}</a>`}
    </div>
    <div class="ft">
      <div><b>ADDRESS</b>경기도 안산시 단원구 고잔로 51<br />타워아이즈빌 2층 204호</div>
      <div><b>CONTACT</b>${D.email}<br />평일 09:30 – 18:00</div>
      <div><b>SERVICES</b>${MENU.map(m => m.items.map(([k]) => `<a href="${SVC[k].href}">${SVC[k].name.replace(/ 마케팅$/, '')}</a>`).join(' · ')).join('<br />')}</div>
      <div><b>COMPANY</b><a href="/about">회사소개</a> · <a href="/works">포트폴리오</a><br /><a href="/insight">인사이트</a> · <a href="/development">아워테크</a></div>
    </div>
    <p class="ft-legal">상호 : (주)인애드컴퍼니 · 대표 : 김수만 · 사업자등록번호 : 311-87-02345 · 연락처 : 010-9186-9944</p>
    <div class="word" data-word>IN AD COMPANY</div>`;
  }

  // 문의 띠 + 바닥 채우기. 페이지가 boot 안에서 끝 구역을 새로 만들면 boot 가 끝날 때 한 번 더 채운다(SITE.fillEnd 로 직접 불러도 됨)
  function fillEnd(el) {
      if (!el || el.dataset.filled) return;
      el.dataset.filled = '1';
      el.classList.add('s-cta', 'wrap'); el.id = el.id || 'contact'; if (!el.dataset.bg) el.dataset.bg = 'ink';
      el.innerHTML = endHTML(el.dataset, 'floatCta' in document.body.dataset);
  }

  function menus(lenis) {
    const hd = $('[data-hd]'), mega = $('[data-mega]'), mini = $('[data-mini]'), megaT = $('[data-mega-t]'), miniT = $('[data-mini-t]');
    // 펼침 판 오른쪽 장면(서비스란과 같은 세로 영상)
    const mvids = D.services.map((s, i) => { const v = document.createElement('video'); Object.assign(v, { muted: true, loop: true, playsInline: true, preload: 'none', poster: `/static/renewal/assets/svc-${i + 1}-v.webp`, src: `/static/renewal/assets/svc-${i + 1}-v.mp4` }); $('[data-mpic]').appendChild(v); return v; });
    let mshown = -1;
    function mshow(i) {
      if (i === mshown) return;
      const prev = mshown; mshown = i;
      mvids.forEach((v, k) => v.classList.toggle('on', k === i));
      gsap.fromTo(mvids[i], { clipPath: prev < i ? 'inset(100% 0 0 0)' : 'inset(0 0 100% 0)' }, { clipPath: 'inset(0% 0 0% 0)', duration: .7, ease: 'power3.inOut', overwrite: true,
        onComplete: () => mvids.forEach((v, k) => { if (k !== mshown) { gsap.set(v, { clipPath: 'inset(100% 0 0 0)' }); v.pause(); } }) });
      mvids[i].play().catch(() => {});
      $('[data-mcap-n]').textContent = `0${i + 1} — ${D.services[i].en}`;
      $('[data-mcap-t]').textContent = D.services[i].line;
      $$('.mg a').forEach(a => a.classList.toggle('on', +a.dataset.mi === i));
    }
    $$('.mg a').forEach(a => a.addEventListener('mouseenter', () => { mega.classList.add('dim'); mshow(+a.dataset.mi); }));
    $('.mega-groups').addEventListener('mouseleave', () => { mega.classList.remove('dim'); $$('.mg a').forEach(a => a.classList.remove('on')); });
    // 열고 닫기: 메뉴 글자와 판 사이를 오가는 동안 닫히지 않게 잠깐 기다림
    const panels = { mega: { el: mega, t: megaT, open: false }, mini: { el: mini, t: miniT, open: false } };
    let closeTimer, openAt = 0;
    function openP(name) {
      clearTimeout(closeTimer);
      Object.keys(panels).forEach(n => n !== name && closeP(n, true));
      const P = panels[name]; if (P.open) return; P.open = true; openAt = lenis.scroll;
      P.t.classList.add('is-open');
      if (name === 'mini') { const r = miniT.getBoundingClientRect(); mini.style.left = (r.left - 20) + 'px'; }
      gsap.set(P.el, { visibility: 'visible' });
      gsap.to(P.el, { clipPath: 'inset(0 0 0% 0)', duration: name === 'mega' ? .7 : .45, ease: 'power3.inOut', overwrite: true });
      if (name === 'mega') {
        const cur = SVC[new URLSearchParams(location.search).get('k')];
        if (mshown < 0) mshow(cur ? cur.i : SVC.subscription.i); else mvids[mshown].play().catch(() => {});
        gsap.fromTo('.mg .mono, .mg a, .mega-view, .mega-foot', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: .7, stagger: .03, ease: 'power3.out', delay: .2, overwrite: true });
      }
    }
    function closeP(name, now) {
      const P = panels[name]; if (!P.open) return; P.open = false;
      P.t.classList.remove('is-open');
      gsap.to(P.el, { clipPath: 'inset(0 0 100% 0)', duration: now ? .25 : .45, ease: 'power3.inOut', overwrite: true, onComplete: () => { gsap.set(P.el, { visibility: 'hidden' }); if (name === 'mega') mvids.forEach(v => v.pause()); } });
    }
    const later = () => { clearTimeout(closeTimer); closeTimer = setTimeout(() => { closeP('mega'); closeP('mini'); }, 180); };
    if (matchMedia('(hover:hover)').matches) {
      megaT.addEventListener('mouseenter', () => openP('mega'));
      miniT.addEventListener('mouseenter', () => openP('mini'));
      [megaT, miniT, mega, mini].forEach(el => { el.addEventListener('mouseleave', later); el.addEventListener('mouseenter', () => clearTimeout(closeTimer)); });
      $$('.hd nav a:not([data-mega-t]):not([data-mini-t]), .hd .logo, .hd .cta').forEach(a => a.addEventListener('mouseenter', () => { closeP('mega'); closeP('mini'); }));
    }
    megaT.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); panels.mega.open ? closeP('mega') : openP('mega'); });
    addEventListener('keydown', e => { if (e.key === 'Escape') { closeP('mega'); closeP('mini'); mclose(); } });
    // 스크롤: 내리면 머리 메뉴가 숨고, 올리면 다시 나타남. 펼침 판은 실제로 60px 넘게 움직였을 때만 닫힘
    let hdHidden = false;
    lenis.on('scroll', ({ scroll, direction }) => {
      if ((panels.mega.open || panels.mini.open) && Math.abs(scroll - openAt) > 60) { closeP('mega'); closeP('mini'); }
      const hide = scroll > 160 && direction === 1;
      if (hide !== hdHidden) { hdHidden = hide; gsap.to(hd, { yPercent: hide ? -110 : 0, duration: .5, ease: 'power3.out', overwrite: true }); }
    });
    // 휴대폰 전체 메뉴
    const mnav = $('[data-mnav]');
    function mopen() { lenis.stop(); gsap.set(mnav, { visibility: 'visible' }); gsap.to(mnav, { clipPath: 'inset(0 0 0% 0)', duration: .6, ease: 'power3.inOut', overwrite: true }); gsap.fromTo('.mnav-list > div, .mnav-go', { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: .06, duration: .6, ease: 'power3.out', delay: .25 }); }
    function mclose() { if (mnav.style.visibility !== 'visible') return; gsap.to(mnav, { clipPath: 'inset(0 0 100% 0)', duration: .45, ease: 'power3.inOut', overwrite: true, onComplete: () => { gsap.set(mnav, { visibility: 'hidden' }); lenis.start(); } }); }
    $('[data-mopen]').addEventListener('click', mopen);
    $('[data-mclose]').addEventListener('click', mclose);
    $('[data-macc-t]').addEventListener('click', () => $('[data-macc]').classList.toggle('open'));
  }

  let QC = null; // 간편 문의 창 열기(quick)
  function links(lenis) {
    const toast = $('[data-toast]'), curtain = $('[data-curtain]'); let toastT;
    // 들어올 때 덮개가 위로 걷힘
    gsap.to(curtain, { yPercent: -100, duration: .8, ease: 'power4.inOut', delay: .05 });
    document.addEventListener('click', e => {
      const a = e.target.closest('a[href]'); if (!a || e.defaultPrevented) return;
      const h = a.getAttribute('href');
      if (h.startsWith('#')) { if (h.length > 1 && $(h)) { e.preventDefault(); lenis.scrollTo(h, { duration: 1.6, offset: -90 }); } return; }
      if (!h.startsWith('/')) return;
      e.preventDefault();
      if (h === '/contact' && QC) { QC(); return; }
      if (LIVE) {
        // 같은 페이지 안의 구역(/#services 등)은 스크롤, 그 밖은 덮개를 내리고 실제 주소로 이동
        const [path, hash] = h.split('#');
        if (hash && (path || '/') === location.pathname && $('#' + hash)) { lenis.scrollTo('#' + hash, { duration: 1.6, offset: -90 }); return; }
        let gone = false; const go = () => { if (!gone) { gone = true; location.href = h; } };
        gsap.fromTo(curtain, { yPercent: 100 }, { yPercent: 0, duration: .6, ease: 'power4.inOut', onComplete: go });
        setTimeout(go, 700);
        return;
      }
      const to = labHref(h);
      if (!to) { toast.textContent = `시안에 아직 없는 페이지예요 → ${h}`; toast.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(() => toast.classList.remove('on'), 1600); return; }
      const here = location.pathname.split('/').pop() + location.search;
      const [file, hash] = to.split('#');
      if (file === here && hash) { lenis.scrollTo('#' + hash, { duration: 1.6, offset: -90 }); return; }
      // 덮개 움직임이 끝나면 이동. 화면이 가려져 움직임이 멈춰도 0.7초 뒤엔 반드시 이동
      let gone = false; const go = () => { if (!gone) { gone = true; location.href = to; } };
      gsap.fromTo(curtain, { yPercent: 100 }, { yPercent: 0, duration: .6, ease: 'power4.inOut', onComplete: go });
      setTimeout(go, 700);
    });
    // 뒤로 가기로 돌아왔을 때 덮개가 남아 있지 않게
    addEventListener('pageshow', e => { if (e.persisted) gsap.set(curtain, { yPercent: -100 }); });
  }

  // 떠 있는 문의 버튼(2026-11-06 대표: 지금 위치에 항상 띄워 둠) — <body data-float-cta> 인 페이지(홈)에서 시작 화면이 끝나면 나타나 계속 떠 있음.
  // 머리 메뉴 문의하기는 숨김. 견적 구역에서만 잠깐 숨김(PC는 오른쪽 계산서 합계를, 휴대폰은 아래 계산서 띠를 가려서 — 대표 결정 1번).
  // 디자인 확정: ( 08 ) 문의 구역 버튼과 같은 모양, 색은 구역 바탕의 반대, 올리면 버터빛 + 버터 테두리(base.css .fcta)
  function floatCta() {
    if (!('floatCta' in document.body.dataset)) return;
    document.body.insertAdjacentHTML('beforeend', `<a class="fcta" href="/contact" data-fcta><span class="fc-t">문의하기 ${ARROW}</span></a>`);
    const el = $('[data-fcta]'), est = $('[data-est-receipt]'), dock = $('[data-fcta-dock]');
    $('[data-hd]').classList.add('fc-on');
    setTimeout(() => el.classList.add('on'), $('[data-loader]') ? 2000 : 300);
    if (est) ScrollTrigger.create({ trigger: est, start: 'top 75%', end: 'bottom 25%', onToggle: s => el.classList.toggle('off', s.isActive) });
    // ( 08 ) 문의 구역에 닿으면 떠 있던 버튼이 그 자리에 내려앉아 구역과 함께 올라감(2026-11-06 대표: 문의 구역의 원래 버튼 대신)
    // 자리(dock)는 떠 있을 때와 같은 가로 위치에 두고, 자리의 아래 끝이 버튼의 아래 끝 높이에 오는 순간 바꿔 끼워 끊김 없이 보이게 함
    if (dock) {
      gsap.set(dock, { width: el.offsetWidth, height: el.offsetHeight });
      const gap = () => parseFloat(getComputedStyle(el).bottom) || 0;
      ScrollTrigger.create({ trigger: dock, start: () => 'bottom bottom-=' + gap(), invalidateOnRefresh: true,
        onEnter: () => { dock.appendChild(el); el.classList.add('docked'); },
        onLeaveBack: () => { document.body.appendChild(el); el.classList.remove('docked'); } });
    }
  }


  // 간편 문의 창(2026-11-06 대표: 지금 홈페이지처럼 간편하고 빠른 입력) — /contact 링크를 누르면 페이지를 옮기지 않고 오른쪽(휴대폰은 아래)에서 이 창이 열림.
  // 지금 홈페이지 팝업(src/renderer.tsx #cmodal)과 같은 구성: 필수는 메일 주소·문의 내용 둘, 회사·이름·연락처·관심 서비스는 '추가 정보(선택)'에 접어 둠,
  // 메일 '@' 뒤 도메인 추천·오타 안내, 연락처 하이픈 자동. 문의 페이지(contact.html) 자체에서는 만들지 않음(그 페이지의 전체 양식을 씀).
  // 시안이라 보내기를 눌러도 아무것도 보내지 않음. 닫았다 다시 열어도 적던 내용은 남고, 보낸 뒤에만 비움.
  const QC_SVC = ['마케팅팀 구독', '퍼포먼스 마케팅', '바이럴 마케팅', '인플루언서·유튜브', '체험단', '고객 리뷰', '올리브영', 'PPL', '미디어 믹스', '기타'];
  const QC_DOM = ['naver.com', 'gmail.com', 'daum.net', 'hanmail.net', 'nate.com', 'kakao.com'];
  const TICK = '<svg viewBox="0 0 12 12" fill="none"><path d="M2 6.2l2.6 2.6L10 3.4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  function quick(lenis) {
    if (/contact\.html$/.test(location.pathname)) return null;
    document.body.insertAdjacentHTML('beforeend', `
<div class="qc" data-qc role="dialog" aria-modal="true" aria-labelledby="qc-t" hidden>
  <div class="qc-dim" data-qc-x></div>
  <div class="qc-box" data-lenis-prevent>
    <div class="qc-top"><span class="mono">( CONTACT )</span><button type="button" class="qc-x" data-qc-x>닫기</button></div>
    <form class="qc-form" data-qc-form>
      <h3 class="qc-t" id="qc-t">문의하기</h3>
      <p class="qc-d">메일 주소와 문의 내용만 적어 주시면 됩니다.<br />1영업일 이내 담당자가 메일로 연락드립니다.</p>
      <div class="qc-f"><label for="qc-email">메일 주소<em>*</em></label><input id="qc-email" name="email" type="email" inputmode="email" autocomplete="email" autocapitalize="off" spellcheck="false" placeholder="hello@yourcompany.com" required /><div class="qc-sug" data-qc-sug></div></div>
      <div class="qc-f"><label for="qc-msg">문의 내용<em>*</em></label><textarea id="qc-msg" name="message" rows="4" placeholder="브랜드 상황, 마케팅 목표 등 편하게 적어 주세요. 한 줄도 괜찮습니다." required></textarea></div>
      <div class="qc-more" data-qc-more>
        <button type="button" class="qc-more-t" aria-expanded="false" aria-controls="qc-more-b"><span>추가 정보 입력 <small>(선택)</small></span>${CHEV}</button>
        <div class="qc-more-b" id="qc-more-b"><div>
          <div class="qc-row">
            <div class="qc-f"><label for="qc-company">회사 / 브랜드명</label><input id="qc-company" name="company" autocomplete="organization" placeholder="브랜드명 또는 회사명" /></div>
            <div class="qc-f"><label for="qc-name">이름</label><input id="qc-name" name="name" autocomplete="name" placeholder="홍길동" /></div>
          </div>
          <div class="qc-f"><label for="qc-phone">연락처</label><input id="qc-phone" name="phone" type="tel" inputmode="numeric" maxlength="13" autocomplete="tel" placeholder="010-0000-0000" /></div>
          <div class="qc-f"><label>관심 서비스<small>(여러 개 고를 수 있어요)</small></label><div class="qc-pick">${QC_SVC.map(l => `<label class="qc-ck"><input type="checkbox" name="service" value="${l}" /><span class="box">${TICK}</span><span>${l}</span></label>`).join('')}</div></div>
        </div></div>
      </div>
      <div class="qc-agree">
        <label class="qc-ck"><input type="checkbox" name="privacy" required /><span class="box">${TICK}</span><span>개인정보 수집 및 이용에 동의합니다.<em>*</em></span></label>
        <button type="button" data-qc-prv aria-expanded="false" aria-controls="qc-prv">내용 보기</button>
      </div>
      <div class="qc-prv" id="qc-prv"><div>
        <p><b>수집 항목</b> (필수) 메일 주소, 문의 내용 / (선택) 회사·브랜드명, 이름, 연락처, 관심 서비스</p>
        <p><b>수집 목적</b> 마케팅 상담 회신 및 회사소개서 발송</p>
        <p><b>보유 기간</b> 동의일로부터 1년 보관 후 파기</p>
        <p>동의를 거부할 수 있으며, 거부 시 문의 접수가 제한될 수 있습니다.</p>
      </div></div>
      <p class="qc-err" data-qc-err role="alert" hidden>접수가 완료되지 않았습니다. 입력하신 내용은 그대로 있으니 잠시 후 다시 눌러 주시거나, <a href="tel:010-9186-9944">010-9186-9944</a>로 전화 주세요.</p>
      <p class="qc-note">문의를 접수하시면 회사소개서도 함께 보내드립니다.<br />메일 입력이 어려우시면 <a href="mailto:${D.email}">${D.email}</a>로 바로 보내셔도 됩니다.</p>
      <div class="qc-act"><button type="submit" class="qc-send">보내기 ${ARROW}</button></div>
    </form>
    <div class="qc-done" data-qc-done hidden>
      <span class="mono">( RECEIVED )</span>
      <h3 class="qc-t">문의가 접수되었습니다</h3>
      <p class="qc-d">담당자가 <b>1영업일 이내</b> 메일로 연락드립니다.<br />입력하신 메일로 회사소개서도 함께 보내드립니다.</p>
      ${LIVE ? '<p class="qc-d">급한 문의: <a href="tel:010-9186-9944">010-9186-9944</a></p>' : '<p class="qc-lab">시안이라 실제로는 보내지 않았어요.</p>'}
      <button type="button" class="qc-send" data-qc-x>확인</button>
    </div>
  </div>
</div>`);
    const qc = $('[data-qc]'), form = $('[data-qc-form]'), done = $('[data-qc-done]'), box = $('.qc-box', qc), email = $('#qc-email'), sug = $('[data-qc-sug]');
    let isOpen = false, hideT;
    function open() {
      clearTimeout(hideT);
      if (isOpen) return; isOpen = true;
      // 휴대폰 전체 메뉴에서 눌렀으면 메뉴를 닫고 열림(메뉴가 닫히며 스크롤을 다시 켜므로 잠시 뒤 한 번 더 멈춤)
      if ($('[data-mnav]').style.visibility === 'visible') { $('[data-mclose]').click(); setTimeout(() => isOpen && lenis.stop(), 500); }
      qc.hidden = false; lenis.stop();
      requestAnimationFrame(() => requestAnimationFrame(() => qc.classList.add('on')));
      // 마우스로 쓰는 화면만 메일 칸에 바로 커서(휴대폰은 키보드가 갑자기 올라오지 않게)
      if (matchMedia('(pointer:fine)').matches && done.hidden) setTimeout(() => email.focus({ preventScroll: true }), 450);
    }
    function close() {
      if (!isOpen) return; isOpen = false;
      qc.classList.remove('on'); lenis.start();
      hideT = setTimeout(() => {
        qc.hidden = true;
        if (!done.hidden) { done.hidden = true; form.hidden = false; }
      }, 600);
    }
    $$('[data-qc-x]', qc).forEach(b => b.addEventListener('click', close));
    addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
    const more = $('[data-qc-more]');
    $('.qc-more-t', more).addEventListener('click', e => e.currentTarget.setAttribute('aria-expanded', more.classList.toggle('open')));
    $('[data-qc-prv]').addEventListener('click', e => { const o = $('.qc-prv', qc).classList.toggle('open'); e.currentTarget.setAttribute('aria-expanded', o); e.currentTarget.textContent = o ? '닫기' : '내용 보기'; });

    // 메일 칸: 휴대폰 키보드가 끼워 넣는 안 보이는 글자·전각 기호 정리, '@' 뒤 도메인 추천, 1~2글자 틀린 도메인은 고칠 주소 제안(지금 홈페이지와 같음)
    const clean = v => v.replace(/[​-‍﻿]/g, '').replace(/[！-～]/g, c => String.fromCharCode(c.charCodeAt(0) - 0xFEE0)).replace(/。/g, '.').replace(/[\s ]/g, '');
    const dist = (a, b) => { let p = [...Array(b.length + 1).keys()]; for (let i = 1; i <= a.length; i++) { const c = [i]; for (let j = 1; j <= b.length; j++) c[j] = Math.min(p[j] + 1, c[j - 1] + 1, p[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); p = c; } return p[b.length]; };
    function suggest() {
      const v = email.value.trim(), at = v.indexOf('@'); sug.innerHTML = '';
      if (at < 1) return;
      const local = v.slice(0, at), typed = v.slice(at + 1).toLowerCase();
      if (QC_DOM.includes(typed)) return;
      const near = typed.length >= 4 && QC_DOM.find(d => { const n = dist(typed, d); return n > 0 && n <= 2; });
      if (near) { sug.innerHTML = `<button type="button" class="qc-fix" data-v="${local}@${near}">혹시 <b>${local}@${near}</b> 인가요?</button>`; return; }
      sug.innerHTML = QC_DOM.filter(d => d.startsWith(typed)).slice(0, 4).map(d => `<button type="button" data-v="${local}@${d}">@${d}</button>`).join('');
    }
    email.addEventListener('input', () => {
      const c = clean(email.value); if (c !== email.value) email.value = c;
      email.setCustomValidity(/[ㄱ-ㆎ가-힣]/.test(email.value) ? '메일 주소는 영문으로 입력해 주세요. (한글이 들어 있습니다)' : '');
      suggest();
    });
    sug.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; email.value = b.dataset.v; email.focus(); suggest(); });

    // 연락처: 숫자만 눌러도 010-1234-5678 모양(지금 홈페이지와 같은 규칙)
    const fmt = v => { let d = v.replace(/\D/g, '').slice(0, 11);
      if (/^1[5-9]\d{2}/.test(d)) return d.length <= 4 ? d : d.slice(0, 4) + '-' + d.slice(4, 8);
      if (d.startsWith('02')) { d = d.slice(0, 10); return d.length <= 2 ? d : d.length <= 5 ? d.slice(0, 2) + '-' + d.slice(2) : d.length <= 9 ? d.slice(0, 2) + '-' + d.slice(2, 5) + '-' + d.slice(5) : d.slice(0, 2) + '-' + d.slice(2, 6) + '-' + d.slice(6); }
      return d.length <= 3 ? d : d.length <= 6 ? d.slice(0, 3) + '-' + d.slice(3) : d.length <= 10 ? d.slice(0, 3) + '-' + d.slice(3, 6) + '-' + d.slice(6) : d.slice(0, 3) + '-' + d.slice(3, 7) + '-' + d.slice(7); };
    // 문의 창·견적 신청 칸 등 이 페이지의 모든 연락처 칸(type=tel)에 적용
    document.addEventListener('input', e => { const t = e.target; if (!t || t.tagName !== 'INPUT' || t.type !== 'tel') return; const f = fmt(t.value); if (f !== t.value) t.value = f; });

    const showDone = () => {
      form.reset(); sug.innerHTML = ''; more.classList.remove('open');
      form.hidden = true; done.hidden = false; box.scrollTop = 0;
      gsap.fromTo(done, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .6, ease: 'power3.out' });
    };
    // 운영: 문의 접수 + 회사소개서 발송을 같이 보내고, 문의 접수가 성공한 뒤에만 네이버 광고 전환을 센다(소개서 실패로 접수를 실패 처리하지 않음).
    // 연타로 같은 문의가 여러 번 가지 않게 접수 중에는 버튼을 막는다. 실패하면 적은 내용은 그대로 두고 버튼 위에 안내.
    const err = $('[data-qc-err]'), send = $('.qc-act .qc-send'), sendHTML = send.innerHTML; let busy = false;
    form.addEventListener('submit', async e => {
      e.preventDefault();
      if (!LIVE) return showDone();
      if (busy) return;
      busy = true; err.hidden = true; send.disabled = true; send.textContent = '접수 중...';
      const fd = new FormData(form), payload = {}, services = [];
      fd.forEach((v, k) => { if (k === 'service') services.push(v); else if (k !== 'privacy' && v) payload[k] = v; });
      if (services.length) payload.services = services.join(', ');
      const post = (url, body) => fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      try {
        const [res] = await Promise.all([post('/api/mail/contact', payload), post('/api/mail/brochure', { email: payload.email, emailAgree: 'on' }).catch(() => null)]);
        if (!res.ok) throw new Error('mail failed');
      } catch (x) {
        busy = false; send.disabled = false; send.innerHTML = sendHTML; err.hidden = false;
        err.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        return;
      }
      try { if (typeof window.trackNaverLead === 'function') window.trackNaverLead(); } catch (x) {}
      busy = false; send.disabled = false; send.innerHTML = sendHTML;
      showDone();
    });
    // 주소 끝이 #contact 이면 바로 열림(운영 팝업과 같음)
    if (LIVE && location.hash === '#contact') setTimeout(open, 600);
    return open;
  }


  // 줄 단위로 아래에서 올라오는 제목: data-reveal
  function reveals() {
    $$('[data-reveal]').forEach(el => {
      const sp = SplitText.create(el, { type: 'lines', mask: 'lines', linesClass: 'ln' });
      gsap.from(sp.lines, { yPercent: 110, duration: 1.1, stagger: .08, ease: 'power4.out', scrollTrigger: { trigger: el, start: 'top 85%' } });
    });
    $$('[data-word]').forEach(w => gsap.from(w, { yPercent: 60, ease: 'none', scrollTrigger: { trigger: w, start: 'top bottom', end: 'bottom bottom', scrub: true } }));
  }

  // 바탕색 바꾸기 — 고정(pin) 구역들을 다 만든 뒤에 만들어야 위치가 맞는다
  function backgrounds() {
    const BG = { ink: ['#0B0C10', '#F5F4F0'], paper: ['#E9E8E4', '#0B0C10'] };
    const first = $('[data-bg]');
    if (first) gsap.set('body', { backgroundColor: BG[first.dataset.bg][0], color: BG[first.dataset.bg][1], '--pg': BG[first.dataset.bg][0], '--fg': BG[first.dataset.bg][1] });
    $$('[data-bg]').forEach(sec => {
      const [bg, fg] = BG[sec.dataset.bg];
      // 화면에 붙잡히는 구역(연혁·클라이언트의 말 등)은 붙잡힌 동안 전체(pin-spacer)를 기준으로 — 구역 자체를 기준으로 하면 위로 올라올 때 바탕이 늦게 바뀌어 글자가 안 보였음(2026-11-06)
      const t = sec.parentElement && sec.parentElement.classList.contains('pin-spacer') ? sec.parentElement : sec;
      ScrollTrigger.create({ trigger: t, start: 'top 55%', end: 'bottom 55%', onToggle: s => s.isActive && gsap.to('body', { backgroundColor: bg, color: fg, '--pg': bg, '--fg': fg, duration: .9, ease: 'power2.out', overwrite: true }) });
    });
  }

  window.SITE = {
    labHref,
    fillEnd,
    chromeHTML,
    endHTML,
    boot(page) {
      gsap.registerPlugin(ScrollTrigger, SplitText);
      chrome();
      const lenis = new Lenis({ lerp: 0.085 });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(t => lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0);
      window.__lenis = lenis;
      menus(lenis);
      links(lenis);
      QC = quick(lenis);
      const ctx = { lenis, D, $, $$, mobile: matchMedia('(max-width:860px)').matches, SVC, MENU, ARROW };
      if (page) page(ctx);
      $$('[data-site-end]').forEach(fillEnd);
      floatCta();
      reveals();
      backgrounds();
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
      // 주소에 #이 있으면 그 구역으로
      if (location.hash && $(location.hash)) setTimeout(() => lenis.scrollTo(location.hash, { immediate: true }), 300);
    },
  };
})();
