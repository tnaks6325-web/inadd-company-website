/**
 * 상담 문의를 사내 인트라넷에도 쌓는다 — 회신 담당자 배치·리드 관리용.
 *
 * 받는 곳: 인트라넷 POST /api/homepage-inquiries/ingest (inadd-webapp src/routes/homepage-inquiries.ts)
 * 열쇠: INTRANET_INQUIRY_KEY (인트라넷 HOMEPAGE_INQUIRY_KEY 와 같은 값, X-Inquiry-Key 헤더)
 *
 * - 열쇠가 없거나 테스트 서버(SITE_ENV=preview 또는 MAIL_REDIRECT_TO)면 보내지 않는다 — 시험 문의가 운영 인트라넷에 쌓이지 않게.
 * - 실패해도 예외를 던지지 않는다. 문의 접수·회사 메일은 이 결과와 상관없이 그대로 진행한다.
 * - external_id(문의 백업 키)로 인트라넷이 같은 문의를 한 번만 저장한다.
 */

export const DEFAULT_INTRANET_URL = 'https://inadd-system.pages.dev'
const TIMEOUT_MS = 8000

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
