// 개편 아워테크(/development) — 화면 움직임. 시안 lab/tech.html 의 스크립트를 옮긴 것(바꾸면 두 곳).
// 문구는 서버가 미리 그려 둔다(src/routes/renewal/tech-body.html). 여기서는 연차 숫자 맞추기·움직임만. 첫 화면 히어로는 /static/tech-hero.js.
SITE.boot(ctx => {
  const { $, $$, D, lenis } = ctx;
  // 연차는 회사 숫자 한 곳(data.js stats)에서
  const yr = (D.stats || []).find(s => s.unit === '년');
  if (yr) $$('[data-years]').forEach(el => { el.textContent = yr.n; });
  // 숫자 세기는 0부터 시작(글자는 검색 로봇용으로 최종값이 미리 적혀 있음)
  $$('[data-cnt]').forEach(el => { el.textContent = '0'; });

  // 01 문장이 단어 단위로 차오름 + 네 칸이 위에서 열림
  gsap.to('.stmt .w', { opacity: 1, stagger: .5, ease: 'none', scrollTrigger: { trigger: '.stmt', start: 'top 80%', end: 'bottom 45%', scrub: true } });
  gsap.to('.why4 > div', { clipPath: 'inset(0 0 0% 0)', duration: 1.1, stagger: .1, ease: 'power4.inOut', scrollTrigger: { trigger: '.why4', start: 'top 82%' } });

  // 숫자 세기
  $$('[data-cnt]').forEach(el => {
    const n = +el.dataset.cnt, o = { v: 0 };
    ScrollTrigger.create({ trigger: el, start: 'top 90%', once: true, onEnter: () => gsap.to(o, { v: n, duration: 1.6, ease: 'power3.out', onUpdate: () => el.textContent = Math.round(o.v) }) });
  });

  // 02 줄 목록: 줄은 각자 들어올 때 바로 등장. 마우스를 직접 움직였을 때만 줄이 밝게 뒤집힘(스크롤로 지나갈 때는 반응 없음)
  const SCR = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&*';
  function scramble(el) {
    const to = el.dataset.scr; let f = 0; clearInterval(el._t);
    el._t = setInterval(() => { el.textContent = to.split('').map((c, i) => i < f / 2 ? c : c === ' ' ? ' ' : SCR[Math.random() * SCR.length | 0]).join(''); if (++f > to.length * 2) clearInterval(el._t); }, 28);
  }
  const arows = $$('.arow'), syss = $$('.sys');
  arows.forEach(r => gsap.from(r, { yPercent: 30, opacity: 0, duration: .6, ease: 'power3.out', scrollTrigger: { trigger: r, start: 'top 96%' } }));
  if (matchMedia('(hover:hover)').matches) {
    let actA = null, actS = null;
    const set = (cur, el) => { if (cur === el) return cur; if (cur) cur.classList.remove('on'); if (el) { el.classList.add('on'); const s = $('[data-scr]', el) || (el.dataset.scr ? el : null); if (s) scramble(s); } return el; };
    addEventListener('mousemove', e => {
      const t = e.target.closest ? e.target : null;
      actA = set(actA, t && t.closest('.arow'));
      actS = set(actS, t && t.closest('.sys'));
    });
    lenis.on('scroll', () => { actA = set(actA, null); actS = set(actS, null); });
  }

  // 03 운영 방식: 스크롤에 맞춰 선이 그어지고, 선이 지나간 단계가 켜짐(화면을 붙잡지 않음)
  const steps = $$('.step');
  gsap.to('[data-flow-line]', { [ctx.mobile ? 'scaleY' : 'scaleX']: 1, ease: 'none', scrollTrigger: { trigger: '.flow', start: 'top 75%', end: ctx.mobile ? 'bottom 55%' : 'bottom 45%', scrub: true,
    onUpdate: s => steps.forEach((st, i) => st.classList.toggle('on', s.progress >= (ctx.mobile ? i / steps.length : i / (steps.length - 1) * .92))) } });

  // 04 ADFLOW 큰 글자: 작게 시작해 커지며 자간이 좁혀짐
  gsap.fromTo('[data-flag]', { scale: .72, letterSpacing: '0em', opacity: .25 }, { scale: 1, letterSpacing: '-.07em', opacity: 1, ease: 'none', scrollTrigger: { trigger: '.flag', start: 'top 85%', end: 'top 30%', scrub: true } });
  gsap.from('.sys', { opacity: 0, y: 30, stagger: .08, duration: .8, ease: 'power3.out', scrollTrigger: { trigger: '.systems', start: 'top 85%' } });


  // 05 비교: 줄이 차례로, 인애드컴퍼니 칸은 왼쪽에서 밀려 들어옴
  gsap.from('.vs tbody tr', { opacity: 0, y: 20, stagger: .08, duration: .7, ease: 'power3.out', scrollTrigger: { trigger: '.vs', start: 'top 82%' } });
  gsap.from('.vs td.us span', { xPercent: -40, opacity: 0, stagger: .1, duration: .7, ease: 'power3.out', delay: .3, scrollTrigger: { trigger: '.vs', start: 'top 82%' } });
});
