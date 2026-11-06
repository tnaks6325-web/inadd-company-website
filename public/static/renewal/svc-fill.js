// 개편 서비스 페이지(2026-11-07 운영 이식) — 시안 lab/svc.html 이 화면에서 그리던 부분을 함수로 뺀 것.
// 서버 미리 채우기(scripts/renewal-home-prerender.mjs)가 서비스 8개 HTML(src/routes/renewal/svc-*.gen.html)을 이 함수로 만든다. 화면에서는 다시 그리지 않고 svc.js 가 움직임만 붙인다.
// 비워 두는 자리: <!--svc-hero-->(첫 화면 장면)·<!--svc-cases-->(성과 사례)는 서버(src/routes/renewal/svc.tsx)가 운영 부품을 끼우고,
// data-svc-kpi(맨 위 숫자)·data-svc-faq(자주 묻는 질문)는 관리자 화면 값으로 서버(src/main.tsx)가 바꿔 넣는다. 여기 글은 관리자 값이 없을 때의 기본값.
(() => {
  const HERO_IMG = { subscription: '/static/subscription/hero-new-marketer.webp' }   // 운영 구독 페이지 첫 화면도 사진 한 장(신입 마케터)
  const CASES = { performance: 1, subscription: 1 }
  const TERMS_LIVE = k => k !== 'performance'   // 진행 조건은 운영 원본(src/routes/svc-terms.tsx SVC_TERMS)을 서버가 끼운다. 퍼포먼스 운영 조건만 여기 글(운영 페이지와 같음)   // 매체별 광고 성과 사례(운영 svc-performance-ref.tsx)를 넣는 서비스
  const esc = s => String(s).replace(/"/g, '&quot;')

  // 질문 한 줄 — 서버(src/main.tsx svcFaqItem)가 관리자 값으로 바꿔 넣을 때도 같은 모양(바꾸면 둘 다)
  window.SVC_FAQ_ITEM = (f, i) => `<div class="fq"><button type="button" aria-expanded="false"><span class="mono">Q${String(i + 1).padStart(2, '0')}</span><b>${f.q}</b><span class="pl"></span></button><div class="a"><div><p>${f.a}</p></div></div></div>`

  window.SVC_FILL = function (k) {
    const D = window.INAD, SVC = window.SITE.SVC, ARROW = window.SITE.ARROW
    const S = SVC[k], P = (window.SVC_PAGES || {})[k]
    if (!S || !P) throw new Error('서비스 내용 없음: ' + k)
    const no = i => String(i + 1).padStart(2, '0')
    const html = []
    let secNo = 0, lastBg = 'ink'
    const label = en => `( ${String(++secNo).padStart(2, '0')} ) ${en}`
    const sec = (bg, inner, attrs = '') => { lastBg = bg; html.push(`\n  <section class="sec wrap"${attrs} data-bg="${bg}">${inner}\n  </section>`) }

    // ── 1. 첫 화면 ──
    const H = P.hero || {}, img = HERO_IMG[k]
    html.push(`
  <section class="sv-hero wrap has-real" data-bg="ink">
    <div class="l">
      <div>
        <div class="crumb mono"><a href="/#services">SERVICES</a><span>/</span><span>${no(S.i)} ${S.en}</span></div>
        <div style="margin-top:9vh">
          <span class="sv-kicker">${H.kicker || S.name}</span>
          <h1 class="sv-title" data-hero-title>${H.title || S.name}</h1>
          <p class="sv-sub" data-hero-fade>${H.sub || S.line}</p>
          <div class="sv-act" data-hero-fade>
            <a class="btn" href="/contact">문의하기 ${ARROW}</a>
            ${k === 'subscription' ? '<a class="lk" href="#estimate">견적 직접 맞춰 보기</a>' : ''}
            ${P.price || TERMS_LIVE(k) ? `<a class="lk" href="#terms">${(P.price && P.price.title) || '진행 조건'} 보기</a>` : ''}
            ${CASES[k] ? '<a class="lk" href="#reference">성과 사례 보기</a>' : ''}
          </div>
        </div>
      </div>
      ${H.kpi && H.kpi.length ? `<div class="kpis" data-hero-fade data-svc-kpi="${k}"><!--kpi-->${H.kpi.map(x => `<div><b>${x.num}</b><span>${x.label}</span></div>`).join('')}<!--/kpi--></div>` : ''}
    </div>
    <div class="sv-media is-real" data-hero-media>
      ${img ? `<img src="${img}" alt="" />` : '<!--svc-hero-->'}
      <span class="mono tag">${no(S.i)} — ${S.en}</span>
    </div>
  </section>`)

    // ── 2. 고민 ──
    if (P.pains && P.pains.items && P.pains.items.length) sec('paper', `
    <div class="sec-h"><span class="mono">${label('WHEN')}</span><div><h2 data-reveal>${P.pains.title}</h2></div></div>
    <div class="prows" data-hrows>${P.pains.items.map((x, i) => `<div class="prow"><span class="mono">${no(i)}</span><div><b class="t">${x.t}</b>${x.d ? `<span class="d">${x.d}</span>` : ''}</div></div>`).join('')}</div>`)

    // ── 3. 특징 ──
    if (P.points && P.points.items && P.points.items.length) {
      const its = P.points.items, withImg = its.some(x => x.img)
      const cols = !withImg && its.length % 3 === 0 ? ' n3' : ''
      sec('ink', `
    <div class="sec-h"><span class="mono">${label('POINT')}</span><div><h2 data-reveal>${P.points.title}</h2></div></div>
    <div class="pts${cols}">${its.map((x, i) => `<div class="pt">${x.img ? `<div class="ph" data-ph><img src="${x.img}" alt="" loading="lazy" /></div>` : ''}<span class="mono">${no(i)}</span><h3>${x.t}</h3><p>${x.d}</p></div>`).join('')}</div>`)
    }

    // ── 3-1. 더 보기 묶음(운영 페이지의 세부 목록을 줄여 옮긴 것 — 인플루언서 섭외·콘텐츠 유형 등) ──
    if (P.more && P.more.items && P.more.items.length) sec(lastBg === 'ink' ? 'paper' : 'ink', `
    <div class="sec-h"><span class="mono">${label(P.more.en || 'DETAIL')}</span><div><h2 data-reveal>${P.more.title}</h2>${P.more.lead ? `<p>${P.more.lead}</p>` : ''}</div></div>
    <dl class="terms sv-more">${P.more.items.map(t => `<div><dt>${t.label}</dt><dd>${t.text}</dd></div>`).join('')}</dl>`)

    // ── 3-2. 제안서(구독만 — 예전 상세페이지를 '제안서 열어보기'로, 2026-11-07 대표 결정) ──
    if (P.proposal) sec(lastBg === 'ink' ? 'paper' : 'ink', `
    <div class="sec-h"><span class="mono">${label('PROPOSAL')}</span><div><h2 data-reveal>${P.proposal.title}</h2>${P.proposal.lead ? `<p>${P.proposal.lead}</p>` : ''}</div></div>
    <div class="sv-prop"><a class="btn" href="${P.proposal.href}" target="_blank" rel="noopener">제안서 열어보기 ${ARROW}</a>${P.proposal.note ? `<span class="mono">${P.proposal.note}</span>` : ''}</div>`)

    // ── 4. 숫자 ──
    if (P.numbers && P.numbers.length) sec('paper', `
    <div class="sec-h"><span class="mono">${label('NUMBERS')}</span><div><h2 data-reveal>숫자로 보는<br />${S.name}</h2></div></div>
    <div class="nums${P.numbers.length === 3 ? ' n3' : ''}">${P.numbers.map(x => `<div><b><span data-num="${x.n}">${x.n}</span><i>${x.unit || ''}</i></b><span class="lb">${x.label}</span></div>`).join('')}</div>`)

    // ── 4-1. 성과 사례(퍼포먼스·구독) — 사례 목록은 서버가 운영 데이터(REF_CASES)로 끼운다 ──
    if (CASES[k]) sec(lastBg === 'ink' ? 'paper' : 'ink', `
    <div class="sec-h"><span class="mono">${label('REFERENCE')}</span><div><h2 data-reveal>매체별 광고<br />성과 사례</h2><p>실제 운영 계정 데이터입니다. 광고주명은 업종과 이니셜로 표기했습니다.</p></div></div>
    <!--svc-cases-->`, ' id="reference"')

    // ── 5. 진행 순서 ──
    if (P.how && P.how.steps && P.how.steps.length) sec('ink', `
    <div class="sec-h"><span class="mono">${label('PROCESS')}</span><div><h2 data-reveal>${P.how.title}</h2></div></div>
    ${P.how.lead ? `<p class="sv-howlead">${P.how.lead}</p>` : ''}
    <div class="steps" data-steps><div class="rail"><i data-rail></i></div>${P.how.steps.map((x, i) => `<div class="st"><span class="no">${no(i)}</span><h3>${x.t}</h3><p>${x.d}</p></div>`).join('')}</div>`)

    // ── 6. 진행 조건 ──
    if (TERMS_LIVE(k)) sec('paper', `
    <div class="sec-h"><span class="mono">${label('TERMS')}</span><div><h2 data-reveal>${(P.price && P.price.title) || '진행 조건'}</h2><!--svc-terms-lead--></div></div>
    <!--svc-terms-->`, ' id="terms"')
    else if (P.price) {
      const pr = P.price
      sec('paper', `
    <div class="sec-h"><span class="mono">${label('TERMS')}</span><div><h2 data-reveal>${pr.title || '진행 조건'}</h2>${pr.lead ? `<p>${pr.lead}</p>` : ''}</div></div>
    <div class="price">
      <div>
        ${pr.rows && pr.rows.length ? `<div class="ptab"><div class="r h">${(pr.head || ['상품', '기준', '시작 금액']).map((h, i) => `<span${i === 2 ? ' style="text-align:right"' : ''}>${h}</span>`).join('')}</div>${pr.rows.map(r => `<div class="r"><b>${r.plan}</b><em>${r.desc || ''}</em><strong>${r.price}</strong></div>`).join('')}</div>` : ''}
        ${pr.note ? `<p class="pnote">${pr.note}</p>` : ''}
      </div>
      ${pr.terms && pr.terms.length ? `<dl class="terms">${pr.terms.map(t => `<div><dt>${t.label}</dt><dd>${t.text}</dd></div>`).join('')}</dl>` : '<div></div>'}
    </div>`, ' id="terms"')
    }

    // ── 6-1. 견적 조합기(구독만, 영수증형) — 그리는 건 estimate-receipt.js(화면에서) ──
    if (k === 'subscription') {
      html.push(`
  <section class="sec wrap e-cfg" id="estimate" data-bg="paper" data-est-receipt data-label="${label('ESTIMATE')}" data-title="필요한 것만 골라<br />월 금액을 맞춰 보세요"></section>
  <section class="e-apply wrap" data-bg="ink" data-est-apply></section>`)
      lastBg = 'ink'
    }

    // ── 7. 자주 하는 질문 ──
    if (P.faq && P.faq.length) sec('ink', `
    <div class="sec-h"><span class="mono">${label('FAQ')}</span><div><h2 data-reveal>자주 하는 질문</h2></div></div>
    <div class="faq" data-svc-faq="${k}"><!--faq-->${P.faq.map((f, i) => window.SVC_FAQ_ITEM(f, i)).join('')}<!--/faq--></div>`)

    // ── 8. 다른 서비스 ──
    const rest = D.services.filter(s => s.k !== k)
    html.push(`
  <section class="sec wrap sec-others" data-bg="paper">
    <div class="sec-h" style="margin-bottom:36px"><span class="mono">${label('OTHER SERVICES')}</span><div><h2 data-reveal>다른 서비스</h2></div></div>
    <div class="others">${rest.map(s => `<a href="${s.href}"><span class="mono">${no(SVC[s.k].i)} ${s.en}</span><b>${s.name}</b></a>`).join('')}</div>
  </section>`)

    // ── 9. 문의 + 바닥(공통) — 미리 채우기가 SITE.endHTML 로 채운다 ──
    const C = P.cta || {}
    html.push(`\n  <section data-site-end data-num="${label('CONTACT')}" data-title="${esc(C.title || '브랜드의 다음 장면,<br />같이 만들겠습니다')}" data-desc="${esc(C.desc || '')}"></section>\n`)

    return `<main data-page data-svc="${k}">${html.join('')}</main>`
  }
})()
