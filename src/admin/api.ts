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
  const [address, addressDetail, lat, lng, logos] = await Promise.all([
    kvGet(kv, 'about_address'),
    kvGet(kv, 'about_address_detail'),
    kvGet(kv, 'about_lat'),
    kvGet(kv, 'about_lng'),
    kvGet(kv, 'about_logos'),
  ])
  return c.json({ address, addressDetail: addressDetail || '', lat, lng, logos: JSON.parse(logos!) })
})

admin.put('/about', authMiddleware, async (c) => {
  const kv = (c.env as any)?.ADMIN_KV
  const body = await c.req.json()
  if (body.address !== undefined)       await kvPut(kv, 'about_address', body.address)
  if (body.addressDetail !== undefined) await kvPut(kv, 'about_address_detail', body.addressDetail)
  if (body.lat !== undefined)           await kvPut(kv, 'about_lat', String(body.lat))
  if (body.lng !== undefined)           await kvPut(kv, 'about_lng', String(body.lng))
  if (body.logos !== undefined)         await kvPut(kv, 'about_logos', JSON.stringify(body.logos))
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
  const [address, addressDetail, lat, lng, logos] = await Promise.all([
    kvGet(kv, 'about_address'),
    kvGet(kv, 'about_address_detail'),
    kvGet(kv, 'about_lat'),
    kvGet(kv, 'about_lng'),
    kvGet(kv, 'about_logos'),
  ])
  return c.json({ address, addressDetail: addressDetail || '', lat, lng, logos: JSON.parse(logos!) })
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

// ════════════════════════════════════════════════
//  GALLERY (인애드 일상)
// ════════════════════════════════════════════════

// 갤러리 목록 조회 (어드민)
admin.get('/gallery', authMiddleware, async (c) => {
  const kv = (c.env as any)?.ADMIN_KV
  const raw = await kvGet(kv, 'gallery_items')
  return c.json({ items: JSON.parse(raw!) })
})

// 갤러리 아이템 추가
admin.post('/gallery', authMiddleware, async (c) => {
  const kv   = (c.env as any)?.ADMIN_KV
  const body = await c.req.json() as any
  const raw  = await kvGet(kv, 'gallery_items')
  const items: any[] = JSON.parse(raw!)
  const newItem = {
    id:        Date.now(),
    imageUrl:  body.imageUrl  || '',
    caption:   body.caption   || '',
    tag:       body.tag       || '일상',
    createdAt: new Date().toISOString(),
  }
  items.unshift(newItem)
  await kvPut(kv, 'gallery_items', JSON.stringify(items))
  return c.json({ ok: true, item: newItem })
})

// 갤러리 아이템 수정
admin.put('/gallery/:id', authMiddleware, async (c) => {
  const kv   = (c.env as any)?.ADMIN_KV
  const id   = Number(c.req.param('id'))
  const body = await c.req.json() as any
  const raw  = await kvGet(kv, 'gallery_items')
  const items: any[] = JSON.parse(raw!)
  const idx  = items.findIndex((i: any) => i.id === id)
  if (idx !== -1) items[idx] = { ...items[idx], ...body }
  await kvPut(kv, 'gallery_items', JSON.stringify(items))
  return c.json({ ok: true })
})

// 갤러리 아이템 삭제
admin.delete('/gallery/:id', authMiddleware, async (c) => {
  const kv  = (c.env as any)?.ADMIN_KV
  const id  = Number(c.req.param('id'))
  const raw = await kvGet(kv, 'gallery_items')
  const items: any[] = JSON.parse(raw!).filter((i: any) => i.id !== id)
  await kvPut(kv, 'gallery_items', JSON.stringify(items))
  return c.json({ ok: true })
})

// 갤러리 이미지 업로드 (base64 → KV)
admin.post('/gallery/image', authMiddleware, async (c) => {
  const kv   = (c.env as any)?.ADMIN_KV
  const body = await c.req.json() as any
  const b64  = body.data as string
  const key  = `gallery_img_${Date.now()}`
  await kvPut(kv, key, b64)
  return c.json({ ok: true, key, url: `/api/admin/gallery-img/${key}` })
})

// 갤러리 이미지 서빙
admin.get('/gallery-img/:key', async (c) => {
  const kv  = (c.env as any)?.ADMIN_KV
  const key = c.req.param('key')
  const b64 = await kvGet(kv, key)
  if (!b64) return c.notFound()
  const meta = b64.split(',')[0]
  const mime = meta.match(/:(.*?);/)?.[1] || 'image/jpeg'
  const bin  = atob(b64.split(',')[1])
  const buf  = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; i++) buf[i] = bin.charCodeAt(i)
  return new Response(buf, { headers: { 'Content-Type': mime, 'Cache-Control': 'public,max-age=31536000' } })
})

// Public: 갤러리 목록
admin.get('/public/gallery', async (c) => {
  const kv  = (c.env as any)?.ADMIN_KV
  const raw = await kvGet(kv, 'gallery_items')
  return c.json({ items: JSON.parse(raw!) })
})

// ════════════════════════════════════════════════
//  SERVICE FAQ (서비스별 자주 하는 질문)
// ════════════════════════════════════════════════

const SVC_FAQ_DEFAULTS: Record<string, Array<{q:string,a:string}>> = {
  viral: [
    { q:'바이럴 마케팅과 일반 광고는 어떻게 다른가요?', a:'일반 광고는 브랜드가 직접 메시지를 전달하지만, 바이럴 마케팅은 <strong>소비자가 자발적으로 콘텐츠를 공유</strong>하도록 설계합니다. 신뢰도가 높고 비용 대비 도달 범위가 훨씬 넓습니다.' },
    { q:'어떤 채널에서 바이럴 마케팅이 가능한가요?', a:'인스타그램, 유튜브, 틱톡 등 SNS는 물론 <strong>네이버 카페·커뮤니티, 맘카페, 직장인 커뮤니티</strong> 등 타겟 고객이 모이는 채널 전반에 걸쳐 운영합니다.' },
    { q:'캠페인 효과는 얼마나 걸려야 나타나나요?', a:'채널과 콘텐츠 유형에 따라 다르지만, 통상 <strong>런칭 후 48~72시간 이내</strong>에 초기 반응을 확인할 수 있으며, 본격적인 검색량·매출 변화는 2~4주 내 나타납니다.' },
    { q:'중소기업·스타트업도 진행할 수 있나요?', a:'네, 가능합니다. 예산 규모에 맞게 <strong>핵심 채널 집중형 플랜</strong>을 설계해 드립니다. 대기업과 동일한 효과를 더 효율적인 비용으로 달성한 사례가 많습니다.' },
    { q:'콘텐츠는 누가 제작하나요?', a:'인애드컴퍼니 내부 크리에이티브팀이 브랜드 가이드라인에 맞춰 <strong>직접 기획·제작</strong>합니다. 브랜드 톤앤매너 분석부터 배포까지 원스톱으로 처리합니다.' },
    { q:'성과 측정은 어떻게 이루어지나요?', a:'조회수·공유수·저장수·댓글 등 <strong>채널별 상세 데이터</strong>와 함께, 브랜드 검색량 변화·매출 증감을 연계 분석한 종합 리포트를 캠페인 종료 후 제공합니다.' },
  ],
  influencer: [
    { q:'인플루언서 섭외는 어떻게 진행되나요?', a:'보유한 <strong>1,200+ 크리에이터 네트워크</strong>와 데이터 기반 분석 툴을 통해 브랜드 카테고리·타겟 연령·채널 규모에 최적화된 인플루언서를 추천·섭외합니다.' },
    { q:'팔로워 수가 많을수록 효과가 좋은가요?', a:'반드시 그렇지는 않습니다. <strong>마이크로 인플루언서(1만~10만)</strong>는 팔로워와의 신뢰도가 높아 구매 전환율이 메가 인플루언서보다 평균 3~5배 높은 경우가 많습니다.' },
    { q:'콘텐츠 방향은 누가 정하나요?', a:'브랜드 가이드라인을 기반으로 인애드컴퍼니가 <strong>크리에이티브 브리프</strong>를 제작합니다. 인플루언서의 자연스러운 톤을 살리면서 브랜드 메시지를 정확히 전달할 수 있도록 조율합니다.' },
    { q:'유튜브·인스타·블로그 중 어떤 채널이 효과적인가요?', a:'제품 카테고리와 타겟에 따라 다릅니다. <strong>뷰티·식품</strong>은 인스타·유튜브, <strong>건강기능식품·생활용품</strong>은 블로그·유튜브 조합이 효과적입니다. 무료 진단을 통해 최적 채널을 안내해 드립니다.' },
    { q:'캠페인 기간은 얼마나 되나요?', a:'기획·섭외·제작·게시 전 과정을 포함하면 통상 <strong>3~6주</strong>입니다. 긴급 캠페인의 경우 2주 내 집행도 가능하며, 장기 앰버서더 계약은 별도 협의합니다.' },
    { q:'광고 표시 의무가 있나요?', a:'네, 공정거래위원회 지침에 따라 <strong>경제적 이해관계 표시(#광고, #협찬)</strong>가 의무입니다. 인애드컴퍼니는 모든 캠페인에서 법적 기준을 준수하며, 관련 가이드를 크리에이터에게 제공합니다.' },
  ],
  seeding: [
    { q:'시딩 캠페인이란 정확히 무엇인가요?', a:'시딩은 브랜드 제품을 <strong>실제 소비자(블로거·인플루언서)</strong>에게 제공하고 진정성 있는 후기를 생성하는 마케팅입니다. 광고가 아닌 생생한 사용 경험이 전달되어 신뢰도가 높습니다.' },
    { q:'체험단 규모는 어느 정도가 적당한가요?', a:'제품 카테고리와 예산에 따라 다르지만, 초기 런칭 기준 <strong>100~300명</strong>이 일반적입니다. 플랫폼별(네이버 블로그·인스타·유튜브) 분산 배치 시 더 넓은 커버리지를 확보할 수 있습니다.' },
    { q:'후기가 자연스럽지 않으면 역효과가 나지 않나요?', a:'그래서 인애드컴퍼니는 <strong>크리에이터 선별 기준</strong>을 매우 엄격하게 적용합니다. 활동 이력, 팔로워 품질, 카테고리 적합도를 데이터로 검증하고, 가이드라인은 제시하되 표현은 자유롭게 합니다.' },
    { q:'네이버 블로그와 인스타그램 중 어디가 더 효과적인가요?', a:'목적에 따라 다릅니다. <strong>네이버 블로그</strong>는 검색 노출·SEO 자산 축적에 강하고, <strong>인스타그램</strong>은 즉각적인 도달과 브랜드 인지도 확산에 유리합니다. 두 채널 병행이 가장 효과적입니다.' },
    { q:'캠페인 기간은 얼마나 되나요?', a:'제품 발송부터 최종 게시까지 평균 <strong>4~6주</strong>가 소요됩니다. 전담 PM이 일정 관리를 전담하므로 브랜드 측 업무 부담이 최소화됩니다.' },
    { q:'캠페인 종료 후 리포트는 어떻게 제공되나요?', a:'<strong>채널별 게시 현황, 조회수·좋아요·댓글 수, 검색 유입 변화, 매출 연계 데이터</strong>를 종합한 성과 리포트를 엑셀·PDF 형식으로 제공합니다. 다음 캠페인 전략 제안도 포함됩니다.' },
  ],
  seo: [
    { q:'SEO 마케팅은 광고와 어떻게 다른가요?', a:'광고는 예산이 끊기면 노출도 멈추지만, SEO는 <strong>한 번 상위 노출되면 지속적으로 유입</strong>이 발생합니다. 초기 투자 대비 장기적인 ROI가 매우 높은 마케팅 방식입니다.' },
    { q:'네이버 플레이스 상위 노출은 어떻게 작동하나요?', a:'방문자 수, 리뷰 수·품질, 저장 수, 체류 시간 등 <strong>다양한 신호</strong>를 네이버 알고리즘이 종합 평가합니다. 인애드컴퍼니는 이 신호들을 체계적으로 강화하는 전략을 적용합니다.' },
    { q:'효과가 나타나는 데 얼마나 걸리나요?', a:'초기 변화는 <strong>4~8주</strong> 내에 확인되며, 안정적인 상위 노출 유지는 3~6개월이 소요됩니다. 알고리즘 변화에 대응하는 지속 관리가 중요합니다.' },
    { q:'유튜브 SEO도 따로 필요한가요?', a:'네, 유튜브는 <strong>구글 다음으로 큰 검색 엔진</strong>입니다. 제목·태그·설명·자막 최적화와 초기 조회수 확보를 통해 관련 키워드 검색 시 상위 노출되도록 설계합니다.' },
    { q:'인스타그램 해시태그 SEO도 가능한가요?', a:'가능합니다. 브랜드·카테고리·트렌드 키워드를 분석해 <strong>최적 해시태그 세트</strong>를 구성하고, 해시태그 검색 상위 노출을 위한 초기 인게이지먼트 전략을 병행합니다.' },
    { q:'SEO 작업 후 순위가 다시 떨어질 수 있나요?', a:'알고리즘 업데이트나 경쟁사 활동에 따라 변동이 있을 수 있습니다. 인애드컴퍼니는 <strong>월별 모니터링 및 대응 전략</strong>을 제공해 상위 순위를 안정적으로 유지합니다.' },
  ],
  review: [
    { q:'리뷰 마케팅은 허위 리뷰 아닌가요?', a:'실제 제품을 사용한 소비자가 <strong>자신의 경험을 솔직하게 작성</strong>하는 방식입니다. 인애드컴퍼니는 허위·과장 리뷰를 엄격히 금지하며, 공정거래위원회 지침을 준수합니다.' },
    { q:'어떤 플랫폼에서 리뷰 관리가 가능한가요?', a:'<strong>네이버 스마트스토어, 쿠팡, 올리브영, 카카오선물하기</strong> 등 주요 이커머스 플랫폼과 네이버 블로그, 인스타그램까지 통합 관리합니다.' },
    { q:'부정적인 리뷰는 어떻게 대응하나요?', a:'부정 리뷰 모니터링 → 원인 분석 → <strong>신속한 브랜드 공식 답변 작성</strong> → 긍정 리뷰 비중 확대 전략을 순차적으로 적용해 브랜드 이미지를 회복합니다.' },
    { q:'리뷰 수가 얼마나 있어야 효과가 있나요?', a:'카테고리마다 다르지만, 일반적으로 <strong>50건 이상</strong>이면 신뢰도 형성이 시작되고, 200건 이상이면 검색 알고리즘 상위 노출에도 긍정적인 영향을 줍니다.' },
    { q:'별점 관리도 함께 해주나요?', a:'네, 리뷰 수 확보와 함께 <strong>평균 별점 4.5 이상 유지</strong>를 목표로 운영합니다. 저품질 리뷰 관리 및 우수 리뷰 유도 전략을 병행합니다.' },
    { q:'리뷰 캠페인 완료 후에도 효과가 지속되나요?', a:'네, 블로그·이커머스 리뷰는 <strong>검색 자산으로 축적</strong>되어 캠페인 종료 후에도 지속적으로 신규 고객 유입과 구매 전환에 기여합니다.' },
  ],
  ppl: [
    { q:'PPL 마케팅은 어떤 브랜드에 적합한가요?', a:'드라마·예능 시청자와 타겟이 겹치는 <strong>식품, 뷰티, 건강기능식품, 생활용품</strong> 브랜드에 특히 효과적입니다. 브랜드 인지도 확산과 자연스러운 제품 소구가 동시에 필요한 경우 최적입니다.' },
    { q:'PPL 비용은 어느 정도인가요?', a:'방송사, 프로그램 시청률, 노출 방식(간접 노출·직접 사용·에피소드 기획)에 따라 크게 달라집니다. <strong>케이블·웹드라마부터 지상파까지</strong> 예산에 맞는 옵션을 제안해 드리니 상담을 통해 확인하세요.' },
    { q:'방영 전에 노출 장면을 미리 확인할 수 있나요?', a:'에피소드 기획형의 경우 <strong>사전 장면 협의 및 편집본 검토</strong>가 가능합니다. 일반 간접 노출형은 방송사 편집 권한으로 인해 사전 확인이 제한될 수 있습니다.' },
    { q:'PPL 이후 2차 콘텐츠 활용이 가능한가요?', a:'방영된 장면의 캡처·클립을 <strong>SNS·디지털 광고 소재로 재활용</strong>할 수 있어 PPL 투자 대비 효과를 극대화할 수 있습니다. 저작권 범위는 계약 시 명확히 확정합니다.' },
    { q:'시청률이 낮은 프로그램은 효과가 없나요?', a:'시청률이 낮더라도 <strong>타겟 적합도가 높은 프로그램</strong>이면 전환율이 높습니다. 예를 들어 건강기능식품은 건강 정보 프로그램이, 뷰티는 뷰티 예능이 더 높은 ROI를 보입니다.' },
    { q:'계약 후 방영이 취소될 수도 있나요?', a:'제작 일정 변경이나 편성 조정으로 방영이 지연·변경될 수 있습니다. 인애드컴퍼니는 계약서에 <strong>방영 보장 조항과 환불 정책</strong>을 명확히 포함해 리스크를 최소화합니다.' },
  ],
  oliveyoung: [
    { q:'올리브영 입점이 안 된 상태에서도 마케팅이 가능한가요?', a:'입점 전 <strong>시딩·리뷰 생태계 구축</strong>부터 진행 가능합니다. 입점 심사 시 기존 리뷰·인지도가 긍정적으로 작용하며, 입점 후 바로 HOT 상품 진입을 노릴 수 있도록 준비합니다.' },
    { q:'올리브영 랭킹은 어떤 기준으로 결정되나요?', a:'판매량, 리뷰 수·품질, 위시리스트 저장, 클릭률, 재구매율 등 <strong>다양한 지표</strong>가 복합적으로 반영됩니다. 인애드컴퍼니는 이 지표들을 체계적으로 개선하는 전략을 적용합니다.' },
    { q:'탑리뷰어 섭외는 어떻게 이루어지나요?', a:'인애드컴퍼니가 보유한 <strong>올리브영 탑리뷰어 DB</strong>를 통해 브랜드 카테고리에 맞는 리뷰어를 직접 섭외합니다. 리뷰 품질과 활동 이력을 사전 검증합니다.' },
    { q:'HOT 상품 진입까지 기간이 얼마나 걸리나요?', a:'브랜드 현황과 카테고리 경쟁 강도에 따라 다르지만, 집중 운영 시 <strong>1~3개월</strong> 내 카테고리 TOP 10 진입 사례가 많습니다.' },
    { q:'온라인 스토어와 오프라인 매장 모두 적용되나요?', a:'주력은 <strong>올리브영 온라인몰</strong> 최적화이며, 온라인 성과가 오프라인 매장 발주에도 연동되는 구조를 활용합니다. 오프라인 매대 노출 전략도 함께 제안합니다.' },
    { q:'경쟁 브랜드가 많은 카테고리에서도 효과가 있나요?', a:'경쟁이 치열할수록 <strong>데이터 기반 차별화 전략</strong>이 중요합니다. 경쟁사 리뷰·키워드 분석을 통해 공략 포인트를 발굴하고, 틈새 공략으로 효율적인 순위 상승을 달성합니다.' },
  ],
}

const VALID_SVC_NAMES = ['viral','influencer','seeding','seo','review','ppl','oliveyoung']

// Auth: FAQ 조회
admin.get('/svc-faq/:service', authMiddleware, async (c) => {
  const service = c.req.param('service')
  if (!VALID_SVC_NAMES.includes(service)) return c.json({ error: 'Not found' }, 404)
  const kv  = (c.env as any)?.ADMIN_KV
  const raw = await kvGet(kv, `svc_faq_${service}`)
  const faq = raw ? JSON.parse(raw) : (SVC_FAQ_DEFAULTS[service] || [])
  return c.json({ service, faq })
})

// Auth: FAQ 저장
admin.put('/svc-faq/:service', authMiddleware, async (c) => {
  const service = c.req.param('service')
  if (!VALID_SVC_NAMES.includes(service)) return c.json({ error: 'Not found' }, 404)
  const kv   = (c.env as any)?.ADMIN_KV
  const body = await c.req.json() as any
  await kvPut(kv, `svc_faq_${service}`, JSON.stringify(body.faq))
  return c.json({ ok: true })
})

// Public: FAQ 조회 (서비스 페이지에서 사용)
admin.get('/public/svc-faq/:service', async (c) => {
  const service = c.req.param('service')
  if (!VALID_SVC_NAMES.includes(service)) return c.json({ error: 'Not found' }, 404)
  const kv  = (c.env as any)?.ADMIN_KV
  const raw = await kvGet(kv, `svc_faq_${service}`)
  const faq = raw ? JSON.parse(raw) : (SVC_FAQ_DEFAULTS[service] || [])
  return c.json({ service, faq })
})

export { admin }
