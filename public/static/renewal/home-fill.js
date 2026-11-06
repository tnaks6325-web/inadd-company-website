// 개편 홈 내용 채우기(HTML 글자) — 화면(home.js)과 서버 미리 채우기(scripts/renewal-home-prerender.mjs)가 같이 쓴다.
// 검색 로봇이 자바스크립트 없이도 회사 문장·서비스·연혁·파트너·비전을 읽도록 서버가 같은 글자를 미리 넣어 둔다(2026-11-06).
window.HOME_FILL = D => ({
  '[data-fill]': D.intro.split('\n').map(l => l.split(' ').map(w => `<span class="w">${w}</span>`).join(' ')).join(' <br class="lb" />'),
  '[data-rows]': D.services.map((s, i) => `<a class="row" href="${s.href}" data-i="${i}"><span class="mono i">0${i + 1}</span><span class="nm">${s.name}</span><span class="mono en" data-scr="${s.en}">${s.en}</span><span class="ln">${s.line}</span></a>`).join(''),
  '[data-hcols]': D.history.map((h, i) => `<div class="hc"><div class="sp"><span class="mono">0${i + 1}</span><b>${h.year}</b><span class="lb">${h.label}</span></div><div class="bd"><span class="mono">0${i + 1} / 0${D.history.length} — ${h.label}</span><div><span class="mk"><span class="yb">${h.year}</span></span><h3>${h.label}</h3><ul>${h.items.map(t => `<li>${t}</li>`).join('')}</ul></div></div></div>`).join(''),
  '[data-pt]': D.partner.map((p, i) => `<li><span class="mono" style="color:var(--butter)">0${i + 1}</span><b>${p.t}</b><p>${p.d}</p></li>`).join(''),
  '[data-vision]': D.vision,
  '[data-mission]': D.mission,
});
