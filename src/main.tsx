import { Hono } from 'hono'
import app from './index'
import { renderer } from './renderer'
import { BlogRouter } from './routes/api-blog'
import { RenewalInsightDetailPage, InsightFeat, InsightRows, renewalInsightHead, renewalInsightBody } from './routes/renewal/insight'
import { visibleWorks, logoWorks, type WorkItem } from './routes/works'
import { RenewalWorkCards, RenewalLogoCells } from './routes/renewal/works'
import { kvGet } from './admin/store'
import { SVC_FAQ_DEFAULTS, VALID_SVC_NAMES, HERO_KPI_DEFAULTS, VALID_HERO_SVCS } from './admin/api'
import {
  getPosts, realId, postPath, absoluteUrl, plainText, xmlEscape,
  SITE_URL,
} from './lib/insight-posts'

// ─────────────────────────────────────────────
//  진입점. 인사이트(블로그) 관련 경로만 여기서 처리하고
//  나머지는 기존 src/index.tsx 앱에 그대로 넘긴다.
//   - /insight, /insight/:id : 서버에서 글을 그려 검색로봇이 읽을 수 있게
//   - /sitemap.xml, /robots.txt : 글 주소 추가 / 썸네일·공개 데이터 크롤링 허용
//   - /insight/rss.xml : 새 글 알림용 RSS
//   - /works : 포트폴리오 카드를 서버에서 미리 채워 검색로봇이 읽을 수 있게
//   - /marketing/:서비스 : 자주 묻는 질문을 서버에서 미리 채우고 FAQPage 구조화 데이터를 붙인다(스크립트를 안 돌리는 AI 검색 로봇용)
//   - /api/admin/public/* : 화면이 불러가는 공개 데이터 — 로봇이 읽게 열되 검색결과에는 안 나오게
//   - /api/blog/* : 노션 자동 발행 API
// ─────────────────────────────────────────────

const root = new Hono()

const kvOf = (c: any): KVNamespace | undefined => c.env?.ADMIN_KV

// 테스트 서버(미리보기)는 검색엔진에 잡히지 않게 한다 — index.tsx 와 같은 규칙을 이 진입점 경로에도 적용
root.use('*', async (c, next) => {
  await next()
  if ((c.env as any)?.SITE_ENV === 'preview') c.res.headers.set('X-Robots-Tag', 'noindex, nofollow')
})

root.route('/api/blog', BlogRouter)

// 공개 데이터(포트폴리오·FAQ·상단 숫자 등)는 robots 에서 열어 두므로, 데이터 주소 자체는 검색결과에 안 나오게 한다
root.use('/api/admin/public/*', async (c, next) => {
  await next()
  c.res.headers.set('X-Robots-Tag', 'noindex')
})

function passThrough(c: any): Response | Promise<Response> {
  let ctx: any
  try { ctx = c.executionCtx } catch { ctx = undefined }
  return app.fetch(c.req.raw, c.env, ctx)
}

// ── 목록: 개편 화면(src/routes/renewal/insight-body.html)의 표식 자리에 맨 위 글·글 카드를 서버에서 채운다(검색 로봇이 글을 읽도록) ──
root.get('/insight', async (c) => {
  const [res, posts] = await Promise.all([passThrough(c), getPosts(kvOf(c))])
  if (!posts.length || !res.ok) return res
  let html = await res.text()
  html = html
    .replace('<!--ins-feat-->', await (<InsightFeat post={posts[0]} />).toString())
    .replace('<!--ins-rows-->', await (<InsightRows posts={posts} />).toString())
  // 글 목록 구조화 데이터 — AI 검색이 어떤 글이 있는지 한 번에 읽도록(제목·주소만)
  const list = JSON.stringify({
    '@context': 'https://schema.org', '@type': 'ItemList', '@id': `${SITE_URL}/insight#posts`, name: '마케팅 인사이트 글 목록',
    itemListElement: posts.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE_URL}${postPath(p)}`, name: p.title })),
  }).replace(/</g, '\\u003c')
  html = html.replace('</head>', `<script type="application/ld+json">${list}</script></head>`)
  return c.html(html, 200)
})

// ── 포트폴리오: 관리자 등록 사례를 서버에서 미리 채운다(개편 화면 스크립트 works.js 는 카드가 있으면 다시 불러오지 않음) ──
root.get('/works', async (c) => {
  const [res, raw] = await Promise.all([passThrough(c), kvGet(kvOf(c), 'works_items').catch(() => null)])
  if (!res.ok || !raw) return res
  let all: WorkItem[], items: WorkItem[], logos: WorkItem[]
  try { all = JSON.parse(raw); items = visibleWorks(all); logos = logoWorks(all) } catch { return res }
  if (!items.length) return res
  // 그로스 카드 뒤 <!--works-cards--> 자리에 사례 카드, <!--works-logos--> 자리에 함께한 브랜드 로고. 못 찾으면 그대로 두고 스크립트가 불러온다
  let html = await res.text()
  if (!html.includes('<!--works-cards-->')) return c.html(html, 200)
  html = html.replace('<!--works-cards-->', await (<RenewalWorkCards items={items} />).toString())
  if (logos.length) html = html.replace('<!--works-logos-->', await (<RenewalLogoCells items={logos} />).toString())
  return c.html(html, 200)
})

// 서비스 페이지 자주 묻는 질문 — 화면 스크립트와 같은 모양으로 미리 채운다
const FAQ_ID_PREFIX: Record<string, string> = { viral: 'viral', influencer: 'infl', seeding: 'seed', seo: 'seo', review: 'review', ppl: 'ppl', oliveyoung: 'oy' }
const FAQ_TOGGLE = "(function(btn){var item=btn.closest('.faq-item');var isOpen=item.classList.contains('faq-item--open');document.querySelectorAll('.faq-item').forEach(function(el){el.classList.remove('faq-item--open');});if(!isOpen){item.classList.add('faq-item--open');}})(this)"
const FAQ_CHEVRON = '<span class="faq-chevron"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><polyline points="6 9 12 15 18 9"/></svg></span>'
const attrEscape = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;')
// 구조화 데이터용 글자 — <strong> 같은 강조 태그는 띄어쓰기 없이 벗긴다
const faqText = (html: string) => html.replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim()

// 개편 서비스 페이지(2026-11-07) — svc-fill.js 가 남긴 <!--faq-->…<!--/faq-->, <!--kpi-->…<!--/kpi--> 사이를 관리자 값으로 바꾼다.
// 질문 한 줄 모양은 public/static/renewal/svc-fill.js 의 SVC_FAQ_ITEM 과 같게(바꾸면 둘 다)
const svcFaqItem = (f: { q: string; a: string }, i: number) =>
  `<div class="fq"><button type="button" aria-expanded="false"><span class="mono">Q${String(i + 1).padStart(2, '0')}</span><b>${f.q}</b><span class="pl"></span></button><div class="a"><div><p>${f.a}</p></div></div></div>`
const htmlEscape = (s: string) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const between = (html: string, a: string, b: string, inner: string) => {
  const i = html.indexOf(a), j = i < 0 ? -1 : html.indexOf(b, i)
  return i < 0 || j < 0 ? html : html.slice(0, i + a.length) + inner + html.slice(j)
}

root.get('/marketing/:svc', async (c) => {
  const svc = c.req.param('svc')
  if (!VALID_SVC_NAMES.includes(svc)) return passThrough(c)
  const [res, raw, kpiRaw] = await Promise.all([
    passThrough(c),
    kvGet(kvOf(c), `svc_faq_${svc}`).catch(() => null),
    VALID_HERO_SVCS.includes(svc) ? kvGet(kvOf(c), `hero_kpi_${svc}`).catch(() => null) : Promise.resolve(null),
  ])
  if (!res.ok) return res
  let faq: Array<{ q: string; a: string }>
  try { faq = raw ? JSON.parse(raw) : (SVC_FAQ_DEFAULTS[svc] || []) } catch { return res }
  faq = (faq || []).filter(it => it && it.q && it.a)
  let html = await res.text()
  const ld = () => JSON.stringify({
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: faq.map(it => ({ '@type': 'Question', name: faqText(it.q), acceptedAnswer: { '@type': 'Answer', text: faqText(it.a) } })),
  }).replace(/</g, '\\u003c')
  // 개편 페이지
  if (html.includes(`data-svc-faq="${svc}"><!--faq-->`) || html.includes(`data-svc-kpi="${svc}"><!--kpi-->`)) {
    let kpi: Array<{ num: string; label: string }> | null = null
    try { kpi = kpiRaw ? JSON.parse(kpiRaw) : (HERO_KPI_DEFAULTS[svc] || null) } catch { kpi = null }
    if (kpi && kpi.length) html = between(html, `data-svc-kpi="${svc}"><!--kpi-->`, '<!--/kpi-->', kpi.map(x => `<div><b>${htmlEscape(x.num)}</b><span>${htmlEscape(x.label)}</span></div>`).join(''))
    if (faq.length) {
      html = between(html, `data-svc-faq="${svc}"><!--faq-->`, '<!--/faq-->', faq.map(svcFaqItem).join(''))
      html = html.replace('</head>', `<script type="application/ld+json">${ld()}</script></head>`)
    }
    return c.html(html, 200)
  }
  // 예전 페이지(되돌렸을 때) — 화면 스크립트와 같은 모양으로 미리 채운다
  if (!faq.length) return c.html(html, 200)
  const open = `<div class="faq-wrap" id="faqWrap" data-service="${svc}">`
  // 질문·답은 관리자 화면에서 넣은 HTML(<strong> 등)이라 화면 스크립트처럼 그대로 넣는다
  const items = faq.map((it, i) =>
    `<div class="faq-item" id="faq-${FAQ_ID_PREFIX[svc]}-${i}">`
    + `<button class="faq-q" type="button" onclick="${attrEscape(FAQ_TOGGLE)}">`
    + `<div class="faq-q-left"><span class="faq-q-badge">Q</span><span class="faq-q-text">${it.q}</span></div>${FAQ_CHEVRON}</button>`
    + `<div class="faq-a"><div class="faq-a-inner">${it.a}</div></div></div>`).join('')
  if (!html.includes(open)) return c.html(html, 200)
  return c.html(html
    .replace(open, open + items)
    .replace('</head>', `<script type="application/ld+json">${ld()}</script></head>`), 200)
})

// ── RSS ──
root.get('/insight/rss.xml', async (c) => {
  const posts = (await getPosts(kvOf(c))).slice(0, 50)
  const items = posts.map(p => `  <item>
    <title>${xmlEscape(p.title || '')}</title>
    <link>${SITE_URL}${postPath(p)}</link>
    <guid isPermaLink="true">${SITE_URL}${postPath(p)}</guid>
    <description>${xmlEscape(p.metaDescription || p.summary || plainText(p.content))}</description>
    <pubDate>${new Date(p.createdAt || Date.now()).toUTCString()}</pubDate>
  </item>`).join('\n')
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>마케팅 인사이트 | 인애드컴퍼니</title>
  <link>${SITE_URL}/insight</link>
  <description>바이럴·인플루언서·리뷰 마케팅 실전 전략과 사례</description>
  <language>ko</language>
${items}
</channel>
</rss>`
  return c.body(xml, 200, { 'Content-Type': 'application/rss+xml; charset=UTF-8' })
})

// ── 상세: 본문까지 서버에서 완성 ──
root.get('/insight/:id', renderer, async (c) => {
  const posts = await getPosts(kvOf(c))
  const id = realId(c.req.param('id'))
  const post = posts.find(p => p.id === id) || null
  if (!post) {
    c.status(404)
    return c.render(<RenewalInsightDetailPage post={null} posts={posts} />, { title: '글을 찾을 수 없습니다', bare: true, head: renewalInsightHead, bodyAttrs: renewalInsightBody })
  }
  const url = `${SITE_URL}${postPath(post)}`
  const description = post.metaDescription || post.summary || plainText(post.content)
  const image = absoluteUrl(post.thumbnail)
  const res = await c.render(<RenewalInsightDetailPage post={post} posts={posts} />, {
    bare: true,
    head: renewalInsightHead,
    bodyAttrs: renewalInsightBody,
    title: post.title,
    description,
    canonical: url,
    // 글 정보 + 이동 경로(홈 › 마케팅 인사이트 › 글). 글 정보 칸은 그대로 두고 @graph 로 묶기만 한다
    schema: JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [{
      '@type': 'BlogPosting',
      headline: post.title,
      description,
      datePublished: post.createdAt,
      dateModified: post.updatedAt || post.createdAt,
      mainEntityOfPage: url,
      ...(image ? { image } : {}),
      ...(post.keywords?.length ? { keywords: post.keywords.join(', ') } : {}),
      author: { '@type': 'Organization', name: '인애드컴퍼니', url: SITE_URL },
      publisher: { '@type': 'Organization', name: '(주)인애드컴퍼니', url: SITE_URL },
      }, {
        '@type': 'BreadcrumbList', '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '홈', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: '마케팅 인사이트', item: `${SITE_URL}/insight` },
          { '@type': 'ListItem', position: 3, name: post.title, item: url },
        ],
      }],
    }).replace(/</g, '\\u003c'),
  })
  let html = await res.text()
  html = html.replace('<meta property="og:type" content="website"/>', '<meta property="og:type" content="article"/>')
  if (image) {
    html = html.replace(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*("\/>)/g, `$1${xmlEscape(image)}$2`)
      .replace(/<meta property="og:image:(?:width|height)" content="\d+"\/>/g, '')
  }
  return c.html(html, 200)
})

// ── 사이트맵: 기존 목록 뒤에 글 주소 추가 ──
root.get('/sitemap.xml', async (c) => {
  const [res, posts] = await Promise.all([passThrough(c), getPosts(kvOf(c))])
  if (!res.ok) return res
  const xml = await res.text()
  const extra = posts.map(p => `  <url>
    <loc>${SITE_URL}${postPath(p)}</loc>
    <lastmod>${(p.updatedAt || p.createdAt || '').slice(0, 10)}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('\n')
  return c.body(xml.replace('</urlset>', `${extra}\n</urlset>`), 200, { 'Content-Type': 'application/xml' })
})

// ── robots: 썸네일 이미지·공개 데이터 크롤링 허용 ──
root.get('/robots.txt', async (c) => {
  const res = await passThrough(c)
  if (!res.ok) return res
  // 화면이 불러가는 공개 데이터·이미지만 열고 나머지 /api/ 는 그대로 막는다
  const allow = ['/api/admin/insight-img/', '/api/admin/works-img/', '/api/admin/gallery-img/', '/api/admin/logo/', '/api/admin/public/'].map(p => `Allow: ${p}`).join('\n')
  const txt = (await res.text()).replace('Disallow: /api/', `${allow}\nDisallow: /api/`)
  // 네이버(Yeti) 전용: 구글 광고 클릭 꼬리표(gad_source·gbraid·gclid)가 붙은 주소는 수집하지 않음.
  // canonical 을 꼬리표 없는 주소로 줘도 네이버가 따로 색인해 옛 제목이 중복으로 남았음(2026-11-13 서치어드바이저 확인).
  // 이름 붙은 그룹이 있으면 Yeti 는 * 그룹을 안 읽으므로 * 그룹 규칙을 복사해 둔다(기본 허용이라 'Allow: /' 는 빼서 꼬리표 Disallow 와 다툼이 없게). 구글(AdsBot 포함)은 영향 없음.
  const star = (txt.match(/User-agent: \*\n[\s\S]*?(?=\n\n|$)/) || [''])[0]
  const tags = ['gad_source', 'gad_campaignid', 'gbraid', 'gclid'].flatMap(k => [`Disallow: /*?${k}=`, `Disallow: /*&${k}=`]).join('\n')
  const out = star ? txt.replace(star, `${star}\n\n${star.replace('User-agent: *', 'User-agent: Yeti').replace('Allow: /\n', '')}\n${tags}`) : txt
  return c.body(out, 200, { 'Content-Type': 'text/plain' })
})

// 나머지는 기존 앱
root.all('*', (c) => passThrough(c))

export default root
