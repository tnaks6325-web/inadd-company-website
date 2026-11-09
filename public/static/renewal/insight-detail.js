// 개편 인사이트 글(/insight/:id) — 화면 움직임. 시안 lab/insight-detail.html 의 스크립트를 옮긴 것(바꾸면 두 곳).
// 제목·본문·다른 인사이트는 서버가 그린다(src/routes/renewal/insight.tsx RenewalInsightDetail). 여기서는 목차·읽은 만큼 선·복사 버튼·움직임만.
SITE.boot(ctx => {
  const { $, $$ } = ctx;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

  // ── 첫 화면 ──
  if ($('[data-t]')) {
    const ts = SplitText.create('[data-t]', { type: 'lines', mask: 'lines', linesClass: 'ln' });
    gsap.from(ts.lines, { yPercent: 110, duration: 1.2, stagger: .09, ease: 'power4.out', delay: .5 });
  }
  // 목록으로 돌아가기는 글자 투명도 전환(마우스 올림)이 있어 위치만 움직임
  gsap.from('.back', { y: 14, duration: .8, delay: .8, ease: 'power3.out' });
  gsap.from('[data-meta], [data-st]', { opacity: 0, y: 14, duration: .8, stagger: .08, delay: .9 });
  if ($('[data-pic]')) {
    gsap.to('[data-pic]', { clipPath: 'inset(0 0 0% 0)', duration: 1.5, ease: 'power4.inOut', delay: 1 });
    gsap.fromTo('[data-pic] img', { yPercent: -6, scale: 1.08 }, { yPercent: 6, scale: 1, ease: 'none', scrollTrigger: { trigger: '[data-pic]', start: 'top bottom', end: 'bottom top', scrub: true } });
  }
  const art = $('[data-art]');
  if (!art) return;

  // ── 본문: 소제목 목차 + 지금 읽는 소제목 표시 ──
  const hs = $$('h2', art), toc = $('[data-toc]');
  hs.forEach((h, i) => { if (!h.id) h.id = 'h' + (i + 1); });
  if (hs.length) {
    toc.insertAdjacentHTML('beforeend', hs.map(h => `<a href="#${h.id}">${esc(h.textContent)}</a>`).join(''));
    const tocs = $$('a', toc);
    hs.forEach((h, i) => ScrollTrigger.create({ trigger: h, start: 'top 40%', endTrigger: hs[i + 1] || art, end: hs[i + 1] ? 'top 40%' : 'bottom 40%', onToggle: s => s.isActive && tocs.forEach((a, k) => a.classList.toggle('on', k === i)) }));
  } else toc.remove();
  // 그림은 각자 들어올 때 아래에서 열림
  $$('figure img', art).forEach(im => gsap.from(im, { clipPath: 'inset(100% 0 0 0)', duration: 1.1, ease: 'power3.inOut', scrollTrigger: { trigger: im, start: 'top 88%' } }));
  // 읽은 만큼 맨 위 가는 선이 차오름
  gsap.to('[data-prog]', { scaleX: 1, ease: 'none', scrollTrigger: { trigger: '.read', start: 'top 70%', end: 'bottom bottom', scrub: true } });

  // 명령문·목록 상자(pre)에 '복사' 버튼 — 예전 /static/insight-content.js 와 같은 동작
  $$('pre', art).forEach(pre => {
    const btn = document.createElement('button');
    btn.type = 'button'; btn.className = 'ins-copy-btn'; btn.textContent = '복사';
    btn.addEventListener('click', () => {
      const text = (pre.querySelector('code') || pre).innerText.replace(/복사(됨)?$/, '').trimEnd();
      navigator.clipboard.writeText(text).then(() => {
        btn.textContent = '복사됨'; btn.classList.add('done');
        setTimeout(() => { btn.textContent = '복사'; btn.classList.remove('done'); }, 1600);
      });
    });
    pre.appendChild(btn);
  });

  // ── 다른 인사이트 3개 ──
  $$('.rc .pic').forEach((pc, i) => gsap.to(pc, { clipPath: 'inset(0% 0 0 0)', duration: 1.2, delay: i * .1, ease: 'power4.inOut', scrollTrigger: { trigger: '[data-rel]', start: 'top 82%' } }));
  // 본문 그림이 늦게 불러와져 길이가 바뀌면 위치 다시 계산
  let rt; $$('img', art).forEach(im => im.addEventListener('load', () => { clearTimeout(rt); rt = setTimeout(() => ScrollTrigger.refresh(), 250); }, { once: true }));
});
