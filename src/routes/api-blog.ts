import { Hono } from 'hono'
import { kvPut } from '../admin/store'
import { getPosts, savePosts, postPath, SITE_URL, type InsightPost } from '../lib/insight-posts'

// ─────────────────────────────────────────────
//  블로그 자동 발행 API (노션 → 홈페이지 인사이트)
//  헤더 `X-Blog-Key` 로 인증. 관리자 전체 권한이 아니라 인사이트 글 등록·수정만 가능.
//  키 원문은 코드에 없고, SHA-256 해시만 둔다 (저장소가 공개여도 역산 불가).
// ─────────────────────────────────────────────

const BLOG_KEY_SHA256 = '22a5a83b7ca627ce5f4cc03f7e185bc858d9be48cc4c16ae2ed6674fe38430a7'

async function sha256Hex(text: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
  return Array.from(new Uint8Array(buf), b => b.toString(16).padStart(2, '0')).join('')
}

export const BlogRouter = new Hono()

BlogRouter.use('*', async (c, next) => {
  const key = c.req.header('X-Blog-Key') || ''
  if (!key || (await sha256Hex(key)) !== BLOG_KEY_SHA256) {
    return c.json({ error: 'Unauthorized' }, 401)
  }
  await next()
})

const MAIN = ['content-strategy', 'case-study']
const SUB = ['viral', 'influencer', 'seeding', 'seo', 'review', 'oliveyoung', 'ppl']
const EDITABLE = ['title', 'summary', 'content', 'mainCategory', 'subCategory',
  'thumbnail', 'metaDescription', 'keywords', 'notionId'] as const

function pick(body: any): Partial<InsightPost> {
  const out: any = {}
  for (const k of EDITABLE) if (body[k] !== undefined) out[k] = body[k]
  return out
}

function validate(p: Partial<InsightPost>, creating: boolean): string | null {
  if (creating && (!p.title || !p.content)) return 'title, content 는 필수입니다.'
  if (p.mainCategory && !MAIN.includes(p.mainCategory)) return `mainCategory 는 ${MAIN.join('/')} 중 하나`
  if (p.subCategory && !SUB.includes(p.subCategory)) return `subCategory 는 ${SUB.join('/')} 중 하나`
  if (p.keywords && !Array.isArray(p.keywords)) return 'keywords 는 배열이어야 합니다.'
  return null
}

const view = (p: InsightPost) => ({ id: p.id, title: p.title, notionId: p.notionId,
  createdAt: p.createdAt, updatedAt: p.updatedAt, url: `${SITE_URL}${postPath(p)}` })

// 목록
BlogRouter.get('/insight', async (c) => {
  const posts = await getPosts((c.env as any)?.ADMIN_KV)
  return c.json({ posts: posts.map(view) })
})

// 등록 (같은 notionId 가 이미 있으면 그 글을 수정 → 중복 발행 방지)
BlogRouter.post('/insight', async (c) => {
  const kv = (c.env as any)?.ADMIN_KV
  const body = pick(await c.req.json())
  const err = validate(body, true)
  if (err) return c.json({ error: err }, 400)
  const posts = await getPosts(kv)
  const now = new Date().toISOString()
  const existing = body.notionId ? posts.find(p => p.notionId === body.notionId) : undefined
  if (existing) {
    Object.assign(existing, body, { updatedAt: now })
    await savePosts(kv, posts)
    return c.json({ ok: true, updated: true, post: view(existing) })
  }
  const post: InsightPost = {
    mainCategory: 'content-strategy',
    ...body,
    id: `ins_${Date.now()}`,
    createdAt: now,
  } as InsightPost
  posts.unshift(post)
  await savePosts(kv, posts)
  return c.json({ ok: true, created: true, post: view(post) })
})

// 수정
BlogRouter.put('/insight/:id', async (c) => {
  const kv = (c.env as any)?.ADMIN_KV
  const id = c.req.param('id').replace(/^admin_/, '')
  const body = pick(await c.req.json())
  const err = validate(body, false)
  if (err) return c.json({ error: err }, 400)
  const posts = await getPosts(kv)
  const post = posts.find(p => p.id === id)
  if (!post) return c.json({ error: 'not found' }, 404)
  Object.assign(post, body, { updatedAt: new Date().toISOString() })
  await savePosts(kv, posts)
  return c.json({ ok: true, post: view(post) })
})

// 썸네일 업로드 (data URL) — 관리자 업로드와 같은 저장 방식
BlogRouter.post('/insight/thumb', async (c) => {
  const kv = (c.env as any)?.ADMIN_KV
  const { dataUrl } = await c.req.json()
  if (!dataUrl || !/^data:image\//.test(dataUrl)) return c.json({ error: 'dataUrl(image) required' }, 400)
  const key = `ins_thumb_${Date.now()}`
  await kvPut(kv, `insight_img_${key}`, dataUrl)
  return c.json({ ok: true, key, url: `/api/admin/insight-img/${key}` })
})
