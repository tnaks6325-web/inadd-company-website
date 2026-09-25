import { Hono } from 'hono'
import app from './index'
import { renderer } from './renderer'
import { setTokenKv } from './admin/store'
import { BlogRouter } from './routes/api-blog'
import { InsightDetailPage } from './routes/insight-detail'
import {
  getPosts, realId, postPath, absoluteUrl, plainText, xmlEscape,
  SITE_URL, CAT_LABEL, SUB_LABEL, type InsightPost,
} from './lib/insight-posts'

// ─────────────────────────────────────────────
//  진입점. 인사이트(블로그) 관련 경로만 여기서 처리하고
//  나머지는 기존 src/index.tsx 앱에 그대로 넘긴다.
//   - /insight, /insight/:id : 서버에서 글을 그려 검색로봇이 읽을 수 있게
//   - /sitemap.xml, /robots.txt : 글 주소 추가 / 썸네일 크롤링 허용
//   - /insight/rss.xml : 새 글 알림용 RSS
//   - /api/blog/* : 노션 자동 발행 API
// ─────────────────────────────────────────────

const root = new Hono()

const kvOf = (c: any): KVNamespace | undefined => c.env?.ADMIN_KV

// 관리자 토큰 서명키를 KV 에서 읽도록 매 요청 바인딩 전달
root.use('*', async (c, next) => {
  setTokenKv(kvOf(c))
  await next()
})

root.route('/api/blog', BlogRouter)

function passThrough(c: any): Response | Promise<Response> {
  let ctx: any
  try { ctx = c.executionCtx } catch { ctx = undefined }
  return app.fetch(c.req.raw, c.env, ctx)
}

const CONTENT_CSS = '<link href="/static/insight-content.css?v=20260926a" rel="stylesheet" />'

// ── 목록: 기존 화면을 그대로 쓰고, 카드만 서버에서 미리 채운다 ──
const Cards = ({ posts }: { posts: InsightPost[] }) => (
  <>
    {posts.map(post => (
      <a href={postPath(post)} class="ins2-card" data-main-cat={post.mainCategory || ''} data-sub-cat={post.subCategory || ''}>
        <div class="ins2-thumb">
          {post.thumbnail
            ? <img src={post.thumbnail} alt={post.title} class="ins2-thumb-img" loading="lazy" onerror="this.style.display='none'" />
            : <div class="ins2-thumb-fallback"><i class="fas fa-newspaper"></i></div>}
          <span class="ins2-tag">{SUB_LABEL[post.subCategory || ''] || CAT_LABEL[post.mainCategory || ''] || '인사이트'}</span>
        </div>
        <div class="ins2-body">
          <h3 class="ins2-title">{post.title}</h3>
          <p class="ins2-summary">{post.summary || ''}</p>
          <div class="ins2-meta"><span class="ins2-date">{(post.createdAt || '').slice(0, 10)}</span></div>
        </div>
      </a>
    ))}
  </>
)

root.get('/insight', async (c) => {
  const [res, posts] = await Promise.all([passThrough(c), getPosts(kvOf(c))])
  if (!posts.length || !res.ok) return res
  let html = await res.text()
  const cards = (<Cards posts={posts} />).toString()
  // 페이지 JS 가 나중에 같은 모양으로 다시 그리므로 화면은 바뀌지 않는다
  html = html
    .replace('id="ins2Loading"', 'id="ins2Loading" style="display:none"')
    .replace('<div class="ins2-grid" id="ins2Grid">', `<div class="ins2-grid" id="ins2Grid">${await cards}`)
  return c.html(html, 200)
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
    return c.render(<InsightDetailPage post={null} />, { title: '글을 찾을 수 없습니다' })
  }
  const url = `${SITE_URL}${postPath(post)}`
  const description = post.metaDescription || post.summary || plainText(post.content)
  const image = absoluteUrl(post.thumbnail)
  const related = posts.filter(p => p.id !== post.id).slice(0, 3)
  const res = await c.render(<InsightDetailPage post={post} related={related} />, {
    title: post.title,
    description,
    canonical: url,
    schema: JSON.stringify({
      '@context': 'https://schema.org',
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
    }),
  })
  let html = await res.text()
  html = html.replace('<meta property="og:type" content="website"/>', '<meta property="og:type" content="article"/>')
  if (image) {
    html = html.replace(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*("\/>)/g, `$1${xmlEscape(image)}$2`)
      .replace(/<meta property="og:image:(?:width|height)" content="\d+"\/>/g, '')
  }
  html = html.replace('</head>', `${CONTENT_CSS}</head>`)
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

// ── robots: 썸네일 이미지 크롤링 허용 ──
root.get('/robots.txt', async (c) => {
  const res = await passThrough(c)
  if (!res.ok) return res
  const txt = (await res.text()).replace('Disallow: /api/', 'Allow: /api/admin/insight-img/\nDisallow: /api/')
  return c.body(txt, 200, { 'Content-Type': 'text/plain' })
})

// 나머지는 기존 앱
root.all('*', (c) => passThrough(c))

export default root
