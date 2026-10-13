/**
 * 문의 접수 알림 메일 수신자 관리
 *
 * - 관리자 페이지(홈 > 문의 알림 받는 사람)에서 등록한 목록을 KV `contact_mail_recipients` 에 저장한다.
 * - 저장된 목록이 없거나 읽기에 실패하면 DEFAULT_RECIPIENTS 로 발송한다(문의 알림이 끊기지 않게).
 * - 빈 목록은 저장할 수 없다(관리자 API 에서 거부).
 * - Resend 는 한 번의 요청에 최대 50명까지 `to` 로 받을 수 있다.
 */

export const MAIL_RECIPIENTS_KEY = 'contact_mail_recipients'

/** 관리자 페이지에서 목록을 저장하기 전까지 쓰는 기본 수신자 */
export const DEFAULT_RECIPIENTS = [
  'tnaks6325@inadcompany.com',
  'inadkwj@inadcompany.com',
  'dndvkr41@inadcompany.com',
  'ohmh879@inadcompany.com',
]

/** Resend API 1회 발송 최대 수신자 */
export const MAX_RECIPIENTS = 50

const EMAIL_RE = /^[^\s@,;<>]+@[^\s@,;<>]+\.[^\s@,;<>]{2,}$/

export function isValidEmail(value: unknown): value is string {
  return typeof value === 'string' && EMAIL_RE.test(value.trim())
}

/**
 * 입력 목록 검사: 앞뒤 공백 제거·소문자화·중복 제거 후
 * 올바른 주소(recipients)와 형식이 틀린 값(invalid)을 나눠 돌려준다.
 */
export function checkRecipients(input: unknown): { recipients: string[]; invalid: string[] } {
  const raw = Array.isArray(input) ? input.map(v => String(v ?? '')) : String(input ?? '').split(/[,;\n\r\s]+/)
  const recipients: string[] = []
  const invalid: string[] = []
  for (const piece of raw) {
    const email = piece.trim().toLowerCase()
    if (!email) continue
    if (!isValidEmail(email)) { invalid.push(piece.trim()); continue }
    if (!recipients.includes(email)) recipients.push(email)
  }
  return { recipients, invalid }
}

/** KV 에 저장된 값(JSON 배열 문자열)을 안전하게 읽는다. 깨진 값이면 빈 목록. */
export function parseStoredRecipients(rawValue: string | null | undefined): string[] {
  if (!rawValue) return []
  try {
    const parsed = JSON.parse(rawValue)
    if (!Array.isArray(parsed)) return []
    return checkRecipients(parsed).recipients.slice(0, MAX_RECIPIENTS)
  } catch {
    return []
  }
}

/** 실제 발송에 쓸 수신자: 저장된 목록이 있으면 그것, 없거나 읽기 실패면 기본 수신자 */
export async function resolveRecipients(kv: KVNamespace | undefined): Promise<string[]> {
  if (kv) {
    try {
      const stored = parseStoredRecipients(await kv.get(MAIL_RECIPIENTS_KEY))
      if (stored.length) return stored
    } catch (e) {
      console.error('[mail-recipients] KV 조회 실패 — 기본 수신자로 발송', e)
    }
  }
  return [...DEFAULT_RECIPIENTS]
}
