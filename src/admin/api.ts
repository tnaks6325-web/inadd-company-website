import { Hono } from 'hono'
import { kvGet, kvPut, kvDelete, signToken, verifyToken, type Bindings } from './store'

const admin = new Hono<{ Bindings: Bindings }>()

// ── 인증 미들웨어 ──
async function authMiddleware(c: any, next: any) {
  const token = c.req.header('Authorization')?.replace('Bearer ', '') ||
                getCookie(c.req.raw, 'admin_token')
  if (!token || !(await verifyToken(token))) {
    return c.json({ error: 'Unauthorized' }, 401)
  }
  await next()
}

function getCookie(req: Request, name: string): string | null {
  const cookie = req.headers.get('Cookie') || ''
  const match = cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`))
  return match ? decodeURIComponent(match[1]) : null
}

// ═══════════════════════ AUTH ═══════════════════════

// POST /api/admin/login
admin.post('/login', async (c) => {
  const { id, pw } = await c.req.json()
  if (id === 'admin' && pw === 'admin') {
    const token = await signToken({ role: 'admin', id })
    return c.json({ ok: true, token })
  }
  return c.json({ error: '아이디 또는 비밀번호가 올바르지 않습니다.' }, 401)
})

// GET /api/admin/verify
admin.get('/verify', async (c) => {
  const token = c.req.header('Authorization')?.replace('Bearer ', '') ||
                getCookie(c.req.raw, 'admin_token')
  const ok = token ? await verifyToken(token) : false
  return c.json({ ok })
})

// ═══════════════════════ HOME ═══════════════════════

admin.get('/home', authMiddleware, async (c) => {
  const kv = (c.env as any)?.ADMIN_KV
  const [videos, brochure, stats, interval] = await Promise.all([
    kvGet(kv, 'home_videos'),
    kvGet(kv, 'home_brochure_url'),
    kvGet(kv, 'home_stats'),
    kvGet(kv, 'home_slide_interval'),
  ])
  return c.json({ videos: JSON.parse(videos!), brochure, stats: JSON.parse(stats!), interval: Number(interval) || 7 })
})

admin.put('/home', authMiddleware, async (c) => {
  const kv = (c.env as any)?.ADMIN_KV
  const body = await c.req.json()
  if (body.videos !== undefined)    await kvPut(kv, 'home_videos', JSON.stringify(body.videos))
  if (body.brochure !== undefined)  await kvPut(kv, 'home_brochure_url', body.brochure)
  if (body.stats !== undefined)     await kvPut(kv, 'home_stats', JSON.stringify(body.stats))
  if (body.interval !== undefined)  await kvPut(kv, 'home_slide_interval', String(Number(body.interval) || 7))
  return c.json({ ok: true })
})

// ═══════════════════════ ABOUT ═══════════════════════

admin.get('/about', authMiddleware, async (c) => {
  const kv = (c.env as any)?.ADMIN_KV
  const [address, lat, lng, logos] = await Promise.all([
    kvGet(kv, 'about_address'),
    kvGet(kv, 'about_lat'),
    kvGet(kv, 'about_lng'),
    kvGet(kv, 'about_logos'),
  ])
  return c.json({ address, lat, lng, logos: JSON.parse(logos!) })
})

admin.put('/about', authMiddleware, async (c) => {
  const kv = (c.env as any)?.ADMIN_KV
  const body = await c.req.json()
  if (body.address !== undefined) await kvPut(kv, 'about_address', body.address)
  if (body.lat !== undefined)     await kvPut(kv, 'about_lat', String(body.lat))
  if (body.lng !== undefined)     await kvPut(kv, 'about_lng', String(body.lng))
  if (body.logos !== undefined)   await kvPut(kv, 'about_logos', JSON.stringify(body.logos))
  return c.json({ ok: true })
})

// 로고 이미지 업로드 (base64 → KV 저장)
admin.post('/about/logo', authMiddleware, async (c) => {
  const kv = (c.env as any)?.ADMIN_KV
  const { name, dataUrl } = await c.req.json()
  if (!name || !dataUrl) return c.json({ error: 'name, dataUrl required' }, 400)

  // 로고 목록에 추가
  const logosRaw = await kvGet(kv, 'about_logos')
  const logos: string[] = JSON.parse(logosRaw!)
  const key = `logo_${name}_${Date.now()}`
  await kvPut(kv, `logo_img_${key}`, dataUrl)
  logos.push(key)
  await kvPut(kv, 'about_logos', JSON.stringify(logos))
  return c.json({ ok: true, key })
})

admin.delete('/about/logo/:key', authMiddleware, async (c) => {
  const kv = (c.env as any)?.ADMIN_KV
  const key = c.req.param('key')
  await kvDelete(kv, `logo_img_${key}`)
  const logosRaw = await kvGet(kv, 'about_logos')
  const logos: string[] = JSON.parse(logosRaw!).filter((k: string) => k !== key)
  await kvPut(kv, 'about_logos', JSON.stringify(logos))
  return c.json({ ok: true })
})

// 로고 이미지 조회 (public)
admin.get('/logo/:key', async (c) => {
  const kv = (c.env as any)?.ADMIN_KV
  const key = c.req.param('key')
  const dataUrl = await kvGet(kv, `logo_img_${key}`)
  if (!dataUrl) return c.json({ error: 'not found' }, 404)
  return c.json({ dataUrl })
})

// ═══════════════════════ WORKS ═══════════════════════

admin.get('/works', authMiddleware, async (c) => {
  const kv = (c.env as any)?.ADMIN_KV
  const raw = await kvGet(kv, 'works_items')
  return c.json({ items: JSON.parse(raw!) })
})

admin.put('/works', authMiddleware, async (c) => {
  const kv = (c.env as any)?.ADMIN_KV
  const { items } = await c.req.json()
  await kvPut(kv, 'works_items', JSON.stringify(items))
  return c.json({ ok: true })
})

// 썸네일 이미지 업로드 (base64)
admin.post('/works/thumb', authMiddleware, async (c) => {
  const kv = (c.env as any)?.ADMIN_KV
  const { dataUrl } = await c.req.json()
  if (!dataUrl) return c.json({ error: 'dataUrl required' }, 400)
  const key = `thumb_${Date.now()}`
  await kvPut(kv, `works_img_${key}`, dataUrl)
  return c.json({ ok: true, key, url: `/api/admin/works-img/${key}` })
})

admin.get('/works-img/:key', async (c) => {
  const kv = (c.env as any)?.ADMIN_KV
  const key = c.req.param('key')
  const dataUrl = await kvGet(kv, `works_img_${key}`)
  if (!dataUrl) return c.json({ error: 'not found' }, 404)
  // dataUrl에서 실제 이미지 바이너리 반환
  const [meta, b64] = dataUrl.split(',')
  const mime = meta.match(/:(.*?);/)?.[1] || 'image/png'
  const binary = atob(b64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  return new Response(bytes, { headers: { 'Content-Type': mime } })
})

// ═══════════════════════ INSIGHT ═══════════════════════

admin.get('/insight', authMiddleware, async (c) => {
  const kv = (c.env as any)?.ADMIN_KV
  const raw = await kvGet(kv, 'insight_posts')
  return c.json({ posts: JSON.parse(raw!) })
})

admin.post('/insight', authMiddleware, async (c) => {
  const kv = (c.env as any)?.ADMIN_KV
  const body = await c.req.json()
  const raw = await kvGet(kv, 'insight_posts')
  const posts: any[] = JSON.parse(raw!)
  const newPost = {
    ...body,
    id: `ins_${Date.now()}`,
    createdAt: new Date().toISOString()
  }
  posts.unshift(newPost)
  await kvPut(kv, 'insight_posts', JSON.stringify(posts))
  return c.json({ ok: true, post: newPost })
})

admin.put('/insight/:id', authMiddleware, async (c) => {
  const kv = (c.env as any)?.ADMIN_KV
  const id = c.req.param('id')
  const body = await c.req.json()
  const raw = await kvGet(kv, 'insight_posts')
  const posts: any[] = JSON.parse(raw!).map((p: any) =>
    p.id === id ? { ...p, ...body, id } : p
  )
  await kvPut(kv, 'insight_posts', JSON.stringify(posts))
  return c.json({ ok: true })
})

admin.delete('/insight/:id', authMiddleware, async (c) => {
  const kv = (c.env as any)?.ADMIN_KV
  const id = c.req.param('id')
  const raw = await kvGet(kv, 'insight_posts')
  const posts: any[] = JSON.parse(raw!).filter((p: any) => p.id !== id)
  await kvPut(kv, 'insight_posts', JSON.stringify(posts))
  return c.json({ ok: true })
})

// 인사이트 썸네일 업로드
admin.post('/insight/thumb', authMiddleware, async (c) => {
  const kv = (c.env as any)?.ADMIN_KV
  const { dataUrl } = await c.req.json()
  if (!dataUrl) return c.json({ error: 'dataUrl required' }, 400)
  const key = `ins_thumb_${Date.now()}`
  await kvPut(kv, `insight_img_${key}`, dataUrl)
  return c.json({ ok: true, key, url: `/api/admin/insight-img/${key}` })
})

admin.get('/insight-img/:key', async (c) => {
  const kv = (c.env as any)?.ADMIN_KV
  const key = c.req.param('key')
  const dataUrl = await kvGet(kv, `insight_img_${key}`)
  if (!dataUrl) return c.json({ error: 'not found' }, 404)
  const [meta, b64] = dataUrl.split(',')
  const mime = meta.match(/:(.*?);/)?.[1] || 'image/png'
  const binary = atob(b64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  return new Response(bytes, { headers: { 'Content-Type': mime } })
})

// ═══════════════════════ MARKETING STATS ═══════════════════════

admin.get('/marketing', authMiddleware, async (c) => {
  const kv = (c.env as any)?.ADMIN_KV
  const raw = await kvGet(kv, 'marketing_stats')
  return c.json({ stats: JSON.parse(raw!) })
})

admin.put('/marketing', authMiddleware, async (c) => {
  const kv = (c.env as any)?.ADMIN_KV
  const { stats } = await c.req.json()
  await kvPut(kv, 'marketing_stats', JSON.stringify(stats))
  return c.json({ ok: true })
})

// ═══════════════════════ PUBLIC DATA API ═══════════════════════
// 프론트엔드에서 호출하는 공개 데이터 API

admin.get('/public/home', async (c) => {
  const kv = (c.env as any)?.ADMIN_KV
  const [videos, brochure, stats, interval] = await Promise.all([
    kvGet(kv, 'home_videos'),
    kvGet(kv, 'home_brochure_url'),
    kvGet(kv, 'home_stats'),
    kvGet(kv, 'home_slide_interval'),
  ])
  return c.json({ videos: JSON.parse(videos!), brochure, stats: JSON.parse(stats!), interval: Number(interval) || 7 })
})

admin.get('/public/about', async (c) => {
  const kv = (c.env as any)?.ADMIN_KV
  const [address, lat, lng, logos] = await Promise.all([
    kvGet(kv, 'about_address'),
    kvGet(kv, 'about_lat'),
    kvGet(kv, 'about_lng'),
    kvGet(kv, 'about_logos'),
  ])
  return c.json({ address, lat, lng, logos: JSON.parse(logos!) })
})

admin.get('/public/works', async (c) => {
  const kv = (c.env as any)?.ADMIN_KV
  const raw = await kvGet(kv, 'works_items')
  return c.json({ items: JSON.parse(raw!) })
})

admin.get('/public/insight', async (c) => {
  const kv = (c.env as any)?.ADMIN_KV
  const raw = await kvGet(kv, 'insight_posts')
  return c.json({ posts: JSON.parse(raw!) })
})

admin.get('/public/marketing', async (c) => {
  const kv = (c.env as any)?.ADMIN_KV
  const raw = await kvGet(kv, 'marketing_stats')
  return c.json({ stats: JSON.parse(raw!) })
})

// ── Contact: 개인정보 보호 책임자 + FAQ ──
admin.get('/contact', authMiddleware, async (c) => {
  const kv = (c.env as any)?.ADMIN_KV
  const [officerRaw, faqRaw] = await Promise.all([
    kvGet(kv, 'contact_privacy_officer'),
    kvGet(kv, 'contact_faq'),
  ])
  return c.json({
    officer: JSON.parse(officerRaw!),
    faq: JSON.parse(faqRaw!),
  })
})

admin.put('/contact', authMiddleware, async (c) => {
  const kv = (c.env as any)?.ADMIN_KV
  const body = await c.req.json() as any
  if (body.officer !== undefined) await kvPut(kv, 'contact_privacy_officer', JSON.stringify(body.officer))
  if (body.faq !== undefined) await kvPut(kv, 'contact_faq', JSON.stringify(body.faq))
  return c.json({ ok: true })
})

// ── Public: Contact 데이터 ──
admin.get('/public/contact', async (c) => {
  const kv = (c.env as any)?.ADMIN_KV
  const [officerRaw, faqRaw] = await Promise.all([
    kvGet(kv, 'contact_privacy_officer'),
    kvGet(kv, 'contact_faq'),
  ])
  return c.json({
    officer: JSON.parse(officerRaw!),
    faq: JSON.parse(faqRaw!),
  })
})

export { admin }
