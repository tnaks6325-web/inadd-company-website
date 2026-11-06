// 카카오톡 채팅방 카드(실제 모바일 화면처럼) — VOICES 한 개를 받아 HTML 을 돌려준다. 홈 '클라이언트의 말'·후보 페이지가 같이 쓴다.
// 상대 이름·프로필은 흐리게. 이름 글자는 실제 이름이 아니라 자리표시라 페이지 원본을 열어 봐도 이름이 없다.
(() => {
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const NAMES = ['○○○ 대리님', '○○○ 팀장님', '○○ 매니저님', '○○○ 담당자님', '○○○ 대표님'];
  const HUES = [205, 18, 140, 330, 42, 265, 175, 0];
  const ICON = {
    back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4 4"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
    smile: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="12" cy="12" r="8.5"/><path d="M8.5 14.2c.9 1.2 2.1 1.8 3.5 1.8s2.6-.6 3.5-1.8"/><circle cx="9.3" cy="10" r=".6" fill="currentColor"/><circle cx="14.7" cy="10" r=".6" fill="currentColor"/></svg>',
    xls: '<svg viewBox="0 0 32 32"><rect x="4" y="2" width="22" height="28" rx="2" fill="#1F7244"/><path d="M10 11l8 10M18 11l-8 10" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/></svg>',
  };

  function card(v) {
    const hue = HUES[v.id % HUES.length], name = NAMES[v.id % NAMES.length];
    let prev = null, html = '';
    v.msgs.forEach((m, i) => {
      const first = !prev || prev.side !== m.side, next = v.msgs[i + 1];
      const lastOfRun = !next || next.side !== m.side || next.at !== m.at;
      const body = m.file ? `<div class="kk-file">${ICON.xls}<div><b>${esc(m.file)}</b><span>유효기간 ~ · 용량 ○○KB</span></div></div>`
        : m.photo ? `<div class="kk-photo" style="--h:${hue}"><i></i><i></i><i></i><i></i></div>`
        : `<div class="kk-bub${first ? ' tail' : ''}">${esc(m.t).replace(/\n/g, '<br>')}</div>`;
      const time = lastOfRun ? `<time>${m.at}</time>` : '';
      if (m.side === 'them') {
        html += `<div class="kk-row them${first ? ' first' : ''}">${first ? (v.pf ? `<span class="kk-pf img" style="background-image:url(/static/renewal/assets/voices/pf-${v.pf}.webp)"></span>` : `<span class="kk-pf" style="--h:${hue}"></span>`) : '<span class="kk-pf sp"></span>'}<div class="kk-col">${first ? `<span class="kk-nm">${name}</span>` : ''}<div class="kk-line">${body}${time}</div></div></div>`;
      } else {
        html += `<div class="kk-row us${first ? ' first' : ''}"><div class="kk-line">${time}${body}</div></div>`;
      }
      prev = m;
    });
    return `<article class="kk" data-voice="${v.id}">
  <div class="kk-top">${ICON.back}<b class="kk-title">${name}</b><span class="kk-ic">${ICON.search}${ICON.menu}</span></div>
  <div class="kk-body">${v.example ? '<p class="kk-ex">가상 예시 · 실제 고객 답으로 바꿀 자리</p>' : ''}${v.date ? `<p class="kk-date">${v.date}</p>` : ''}${html}</div>
  <div class="kk-input">${ICON.plus}<span class="kk-field"></span>${ICON.smile}<span class="kk-hash">#</span></div>
</article>`;
  }
  window.KAKAO = { card };
})();
