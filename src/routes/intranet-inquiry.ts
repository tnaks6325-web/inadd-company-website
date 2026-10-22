/**
 * 상담 문의를 사내 인트라넷에도 쌓는다 — 회신 담당자 배치·리드 관리용.
 *
 * 받는 곳: 인트라넷 POST /api/homepage-inquiries/ingest (inadd-webapp src/routes/homepage-inquiries.ts)
 * 열쇠: INTRANET_INQUIRY_KEY (인트라넷 HOMEPAGE_INQUIRY_KEY 와 같은 값, X-Inquiry-Key 헤더)
 *
 * - 열쇠가 없거나 테스트 서버(SITE_ENV=preview 또는 MAIL_REDIRECT_TO)면 보내지 않는다 — 시험 문의가 운영 인트라넷에 쌓이지 않게.
 * - 실패해도 예외를 던지지 않는다. 문의 접수·회사 메일은 이 결과와 상관없이 그대로 진행한다.
 * - external_id(문의 백업 키)로 인트라넷이 같은 문의를 한 번만 저장한다.
 *
 * 지난 문의(backfillInquiriesToIntranet): 연결 전에 쌓인 문의 백업(KV lead_contact_*)을 한 번만 보낸다(admin/api.ts, 끝나면 잠금).
 * 인트라넷은 알림 없이 원래 접수 시각으로 '지난 문의'(기록용) 묶음에 넣는다. 같은 문의는 한 번만 들어간다.
 */

export const DEFAULT_INTRANET_URL = 'https://inadd-system.pages.dev'
const TIMEOUT_MS = 8000
export const BACKFILL_PAGE = 200    // 1번 호출에서 읽는 백업 수(KV 읽기·하위요청 제한 여유)
export const BACKFILL_CHUNK = 40    // 인트라넷 1회 전송 건수(인트라넷 BACKFILL_MAX 와 같게)
const LEAD_PREFIX = 'lead_contact_'

export type IntranetInquiryEnv = {
  INTRANET_INQUIRY_KEY?: string
  INTRANET_URL?: string
  SITE_ENV?: string
  MAIL_REDIRECT_TO?: string
}

export type ForwardResult = { sent: boolean; reason?: string; status?: number }

export async function forwardInquiryToIntranet(
  env: IntranetInquiryEnv,
  externalId: string,
  data: Record<string, string>,
  fetchImpl: typeof fetch = fetch,
): Promise<ForwardResult> {
  const key = String(env.INTRANET_INQUIRY_KEY || '').trim()
  if (!key) return { sent: false, reason: 'no_key' }
  if (env.SITE_ENV === 'preview' || env.MAIL_REDIRECT_TO) return { sent: false, reason: 'preview' }
  const base = String(env.INTRANET_URL || DEFAULT_INTRANET_URL).replace(/\/+$/, '')
  try {
    const res = await fetchImpl(`${base}/api/homepage-inquiries/ingest`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Inquiry-Key': key },
      body: JSON.stringify({ external_id: externalId, received_at: new Date().toISOString(), data }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    })
    if (!res.ok) {
      console.error('[intranet-inquiry] 인트라넷 전송 실패', res.status)
      return { sent: false, reason: 'http', status: res.status }
    }
    return { sent: true, status: res.status }
  } catch (e: any) {
    console.error('[intranet-inquiry] 인트라넷 전송 오류', e?.message || e)
    return { sent: false, reason: 'error' }
  }
}

type KvLike = {
  list(opts: { prefix: string; limit?: number; cursor?: string }): Promise<{ keys: Array<{ name: string }>; list_complete: boolean; cursor?: string }>
  get(key: string): Promise<string | null>
}

export type BackfillResult = {
  ok: boolean
  reason?: string
  listed: number
  inserted: number
  duplicate: number
  invalid: number
  failed: number
  cursor: string | null    // 다음 호출에 넘길 값. null 이면 끝
}

// 백업 키 'lead_contact_<ms>_<id>' 의 ms → 접수 시각(백업에 receivedAt 이 없을 때)
function receivedAtOf(key: string, stored: any): string {
  const at = Date.parse(String(stored?.receivedAt || ''))
  if (Number.isFinite(at)) return new Date(at).toISOString()
  const ms = Number(key.slice(LEAD_PREFIX.length).split('_')[0])
  return Number.isFinite(ms) && ms > 0 ? new Date(ms).toISOString() : ''
}

export async function backfillInquiriesToIntranet(
  env: IntranetInquiryEnv,
  kv: KvLike,
  cursor: string | null,
  fetchImpl: typeof fetch = fetch,
): Promise<BackfillResult> {
  const out: BackfillResult = { ok: false, listed: 0, inserted: 0, duplicate: 0, invalid: 0, failed: 0, cursor: null }
  const key = String(env.INTRANET_INQUIRY_KEY || '').trim()
  if (!key) return { ...out, reason: 'no_key' }
  if (env.SITE_ENV === 'preview' || env.MAIL_REDIRECT_TO) return { ...out, reason: 'preview' }
  const page = await kv.list({ prefix: LEAD_PREFIX, limit: BACKFILL_PAGE, ...(cursor ? { cursor } : {}) })
  out.listed = page.keys.length
  out.cursor = page.list_complete ? null : (page.cursor || null)
  const items: Array<{ external_id: string; received_at: string; data: Record<string, string> }> = []
  for (const k of page.keys) {
    let stored: any = null
    try { stored = JSON.parse((await kv.get(k.name)) || 'null') } catch { stored = null }
    if (!stored || typeof stored.data !== 'object' || !stored.data) { out.invalid++; continue }
    items.push({ external_id: k.name, received_at: receivedAtOf(k.name, stored), data: stored.data })
  }
  const base = String(env.INTRANET_URL || DEFAULT_INTRANET_URL).replace(/\/+$/, '')
  for (let i = 0; i < items.length; i += BACKFILL_CHUNK) {
    const chunk = items.slice(i, i + BACKFILL_CHUNK)
    try {
      const res = await fetchImpl(`${base}/api/homepage-inquiries/ingest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Inquiry-Key': key },
        body: JSON.stringify({ backfill: true, items: chunk }),
        signal: AbortSignal.timeout(TIMEOUT_MS * 2),
      })
      const j: any = await res.json().catch(() => ({}))
      if (!res.ok) { out.failed += chunk.length; console.error('[intranet-inquiry] 지난 문의 전송 실패', res.status); continue }
      out.inserted += Number(j.inserted || 0)
      out.duplicate += Number(j.duplicate || 0)
      out.invalid += Number(j.invalid || 0)
    } catch (e: any) {
      out.failed += chunk.length
      console.error('[intranet-inquiry] 지난 문의 전송 오류', e?.message || e)
    }
  }
  out.ok = out.failed === 0
  return out
}
