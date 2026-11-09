// ═══════════════════════════════════════════════════════
//  관리자 변경 기록 · 되돌리기 (2026-11-09 대표: 새 관리자 C+B, 되돌리기 넣기)
//  - 관리자 화면(또는 노션 자동 발행)이 저장할 때마다 '바뀌기 전 값'을 KV `hist:<순번>` 에 90일 보관한다.
//  - 순번은 (1e13 - 저장 시각 ms) 13자리라 KV 목록(사전순)에서 최신이 먼저 나온다.
//  - 되돌리기 = 기록의 '바뀌기 전 값'을 다시 쓰는 것. 되돌리기 전 지금 값도 새 기록으로 남겨 되돌리기를 다시 되돌릴 수 있다.
//  - 지운 사진(인애드 일상·브랜드 로고)은 바로 지우지 않고 90일 뒤 저절로 없어지게 둔다 — 되돌리면 사진도 살아나도록(revive).
//  - 계정(아이디·비밀번호)은 기록하지 않는다.
// ═══════════════════════════════════════════════════════

export const HIST_PREFIX = 'hist:'
export const HIST_DAYS = 90
const TTL = HIST_DAYS * 86400

export type HistMeta = { at: string; area: string; label: string; by: string; keys: string[]; rf?: string }
export type HistRecord = HistMeta & { id: string; before: Record<string, string | null> }

// 지금 값(없으면 null) — 기본값으로 채우지 않은 날것 그대로
export async function snapshot(kv: KVNamespace, keys: string[]): Promise<Record<string, string | null>> {
  const out: Record<string, string | null> = {}
  await Promise.all(keys.map(async k => { out[k] = await kv.get(k) }))
  return out
}

const cut = (s: string, n: number) => (s.length > n ? s.slice(0, n - 1) + '…' : s)

export async function record(kv: KVNamespace, m: Omit<HistMeta, 'at' | 'keys'> & { before: Record<string, string | null> }): Promise<string> {
  const now = Date.now()
  const id = String(1e13 - now).padStart(13, '0') + '-' + Math.random().toString(36).slice(2, 6)
  const meta: HistMeta = { at: new Date(now).toISOString(), area: m.area, label: cut(m.label, 120), by: m.by, keys: Object.keys(m.before) }
  if (m.rf) meta.rf = m.rf
  const rec: HistRecord = { id, ...meta, before: m.before }
  await kv.put(HIST_PREFIX + id, JSON.stringify(rec), { expirationTtl: TTL, metadata: meta })
  return id
}

export async function listHistory(kv: KVNamespace, limit = 50, cursor?: string) {
  const r = await kv.list<HistMeta>({ prefix: HIST_PREFIX, limit: Math.min(Math.max(limit, 1), 200), cursor })
  return {
    items: r.keys.map(k => ({ id: k.name.slice(HIST_PREFIX.length), ...(k.metadata as HistMeta) })),
    cursor: r.list_complete ? null : (r as any).cursor || null,
  }
}

export async function getRecord(kv: KVNamespace, id: string): Promise<HistRecord | null> {
  if (!/^[0-9]{13}-[a-z0-9]{1,8}$/.test(id)) return null
  const raw = await kv.get(HIST_PREFIX + id)
  return raw ? JSON.parse(raw) : null
}

// 지운 사진은 90일 뒤 저절로 없어지게(바로 지우지 않음)
export async function softDelete(kv: KVNamespace | undefined, key: string): Promise<void> {
  if (!kv) return
  const v = await kv.get(key)
  if (v != null) await kv.put(key, v, { expirationTtl: TTL })
}

// 되돌린 값이 가리키는 사진을 다시 '계속 보관'으로 — 인애드 일상 사진(gallery_img_…), 브랜드 로고(logo_img_<키>)
async function revive(kv: KVNamespace, key: string, value: string | null) {
  if (!value) return
  const imgs = new Set<string>()
  if (key === 'gallery_items') for (const m of value.matchAll(/gallery_img_[0-9]+_[a-z0-9]+/g)) imgs.add(m[0])
  if (key === 'about_logos') { try { for (const k of JSON.parse(value)) imgs.add(`logo_img_${k}`) } catch {} }
  await Promise.all([...imgs].map(async k => { const v = await kv.get(k); if (v != null) await kv.put(k, v) }))
}

// 되돌리기: 기록의 '바뀌기 전 값'을 다시 쓰고, 되돌리기 직전 값을 새 기록으로 남긴다
export async function restore(kv: KVNamespace, rec: HistRecord, by: string): Promise<string> {
  const now = await snapshot(kv, rec.keys)
  const newId = await record(kv, { area: rec.area, label: `되돌리기: ${rec.label}`, by, before: now, rf: rec.id })
  for (const k of rec.keys) {
    const v = rec.before[k]
    if (v == null) await kv.delete(k)
    else { await kv.put(k, v); await revive(kv, k, v) }
  }
  return newId
}

// ── 어떤 저장이 무엇을 바꾸는지(관리자 API 경로 → 기록 이름·바뀌는 KV 키) ──
export const SVC_NAME: Record<string, string> = { viral: '바이럴', influencer: '인플루언서', seeding: '체험단', seo: 'SEO', review: '고객 리뷰', ppl: 'PPL', oliveyoung: '올리브영' }

type Plan = { area: string; keys: string[]; label: (before: Record<string, string | null>, body: any) => string }
const parse = (s: string | null | undefined) => { try { return s ? JSON.parse(s) : null } catch { return null } }
const title = (posts: any, id: string) => (Array.isArray(posts) ? posts.find((p: any) => p && p.id === id) : null)?.title || id

// 포트폴리오: 목록 전체를 저장하므로 무엇이 바뀌었는지 브랜드 이름으로 요약
function worksLabel(before: string | null, items: any[]): string {
  const a: any[] = parse(before) || [], b: any[] = Array.isArray(items) ? items : []
  const name = (x: any) => (x && x.brand) || '이름 없음'
  const key = (x: any) => JSON.stringify(x)
  const aSet = new Set(a.map(key)), bSet = new Set(b.map(key))
  const added = b.filter(x => !aSet.has(key(x))), removed = a.filter(x => !bSet.has(key(x)))
  const aNames = new Set(a.map(name)), bNames = new Set(b.map(name))
  const newOnes = added.filter(x => !aNames.has(name(x))), gone = removed.filter(x => !bNames.has(name(x)))
  const edited = added.filter(x => aNames.has(name(x)))
  if (newOnes.length && !gone.length && !edited.length) return `사례 추가: ${newOnes.map(name).join(', ')}`
  if (gone.length && !newOnes.length && !edited.length) return `사례 삭제: ${gone.map(name).join(', ')}`
  if (edited.length && !newOnes.length && !gone.length) return `사례 수정: ${edited.map(name).join(', ')}`
  if (!added.length && !removed.length) return a.map(name).join() === b.map(name).join() ? '사례 목록 저장(변화 없음)' : '사례 순서 변경'
  return `사례 목록 저장(추가 ${newOnes.length} · 삭제 ${gone.length} · 수정 ${edited.length})`
}

export function planFor(method: string, path: string, body: any): Plan | null {
  const m = method.toUpperCase()
  let x: RegExpMatchArray | null
  if (m === 'PUT' && path === '/home') {
    const F: Record<string, [string, string, string]> = { stats: ['home_stats', '홈', '회사 숫자'], brochure: ['home_brochure_url', '문의 받기', '회사소개서 링크'], videos: ['home_videos', '홈', '홈 영상'], interval: ['home_slide_interval', '홈', '홈 영상 넘김 간격'] }
    const f = Object.keys(F).filter(k => body && body[k] !== undefined)
    if (!f.length) return null
    return { area: F[f[0]][1], keys: f.map(k => F[k][0]), label: () => f.map(k => F[k][2]).join(' · ') }
  }
  if (m === 'PUT' && path === '/about') {
    const F: Record<string, string> = { address: 'about_address', addressDetail: 'about_address_detail', lat: 'about_lat', lng: 'about_lng', logos: 'about_logos' }
    const f = Object.keys(F).filter(k => body && body[k] !== undefined)
    if (!f.length) return null
    return { area: '회사소개', keys: f.map(k => F[k]), label: () => (f.some(k => k !== 'logos') ? '회사 주소' : '') + (f.includes('logos') ? (f.length > 1 ? ' · ' : '') + '브랜드 로고' : '') }
  }
  if (m === 'POST' && path === '/about/logo') return { area: '회사소개', keys: ['about_logos'], label: () => '브랜드 로고 추가' }
  if (m === 'DELETE' && path.startsWith('/about/logo/')) return { area: '회사소개', keys: ['about_logos'], label: () => '브랜드 로고 삭제' }
  if (m === 'PUT' && path === '/works') return { area: '포트폴리오', keys: ['works_items'], label: (b, bd) => worksLabel(b.works_items, bd && bd.items) }
  if (m === 'POST' && path === '/insight') return { area: '인사이트', keys: ['insight_posts'], label: (_, bd) => `글 추가: ${(bd && bd.title) || '제목 없음'}` }
  if ((x = path.match(/^\/insight\/([^/]+)$/)) && (m === 'PUT' || m === 'DELETE')) {
    const id = decodeURIComponent(x[1])
    return { area: '인사이트', keys: ['insight_posts'], label: b => `${m === 'PUT' ? '글 수정' : '글 삭제'}: ${title(parse(b.insight_posts), id)}` }
  }
  if (m === 'PUT' && (x = path.match(/^\/hero-kpi\/([a-z]+)$/))) return { area: '서비스', keys: [`hero_kpi_${x[1]}`], label: () => `${SVC_NAME[x![1]] || x![1]} 상단 숫자` }
  if (m === 'PUT' && (x = path.match(/^\/svc-faq\/([a-z]+)$/))) return { area: '서비스', keys: [`svc_faq_${x[1]}`], label: () => `${SVC_NAME[x![1]] || x![1]} 자주 묻는 질문` }
  if (m === 'PUT' && path === '/brochure-mail') {
    const f = ['subject', 'headline', 'body', 'tags'].filter(k => body && body[k] !== undefined)
    if (!f.length) return null
    return { area: '문의 받기', keys: f.map(k => `brochure_mail_${k}`), label: () => '소개서 메일 문구' }
  }
  if (m === 'PUT' && path === '/mail-recipients') return { area: '문의 받기', keys: ['contact_mail_recipients'], label: () => '문의 알림 받는 사람' }
  if (m === 'PUT' && path === '/contact') {
    const f = ['officer', 'faq'].filter(k => body && body[k] !== undefined)
    if (!f.length) return null
    return { area: '문의 페이지(사용 안 함)', keys: f.map(k => (k === 'officer' ? 'contact_privacy_officer' : 'contact_faq')), label: () => '문의 페이지 설정' }
  }
  const cap = (b: Record<string, string | null>, id: number) => { const it = (parse(b.gallery_items) || []).find((i: any) => i && i.id === id); return (it && it.caption) || '설명 없음' }
  if (m === 'POST' && path === '/gallery') return { area: '인애드 일상', keys: ['gallery_items'], label: (_, bd) => `사진 묶음 추가: ${(bd && bd.caption) || '설명 없음'}` }
  if ((x = path.match(/^\/gallery\/([0-9]+)$/)) && (m === 'PUT' || m === 'DELETE')) {
    const id = Number(x[1])
    return { area: '인애드 일상', keys: ['gallery_items'], label: b => `${m === 'PUT' ? '사진 묶음 수정' : '사진 묶음 삭제'}: ${cap(b, id)}` }
  }
  return null
}

// 관리자 화면이 붙여 보내는 한 줄 설명(선택) — 예: "PPL 상단 숫자 3칸 → 2칸"
export function noteFrom(h: string | undefined): string {
  if (!h) return ''
  try { return cut(decodeURIComponent(h).replace(/[\r\n]+/g, ' ').trim(), 100) } catch { return '' }
}
