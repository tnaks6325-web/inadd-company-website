/**
 * 문의 접수 메일 수신자 관리
 *
 * 우선순위
 *  1) KV `mail_recipients` (관리자 페이지에서 등록한 이메일 목록)
 *  2) 환경변수 RESEND_TO (쉼표/세미콜론/줄바꿈으로 여러 명 지정 가능)
 *
 * Resend 는 한 번의 요청에 최대 50명까지 `to` 로 받을 수 있습니다.
 */

export const MAIL_RECIPIENTS_KEY = 'mail_recipients'

/**
 * 코드에 등록된 상시 수신자.
 * 관리자 페이지 목록이 비어 있을 때 RESEND_TO 와 함께 기본 수신자로 사용된다.
 */
export const DEFAULT_RECIPIENTS = [
  'tnaks6325@inadcompany.com', // 김수만
  'inadkwj@inadcompany.com',   // 강우진
  'dndvkr41@inadcompany.com',  // 박재웅
]

/** Resend API 1회 발송 최대 수신자 */
export const MAX_RECIPIENTS = 50

const EMAIL_RE = /^[^\s@,;<>]+@[^\s@,;<>]+\.[^\s@,;<>]{2,}$/

export function isValidEmail(value: unknown): value is string {
  return typeof value === 'string' && EMAIL_RE.test(value.trim())
}

/**
 * 문자열 / 배열을 정규화된 이메일 목록으로 변환
 * - 쉼표, 세미콜론, 줄바꿈, 공백 구분 모두 허용
 * - 소문자 변환 후 중복 제거
 * - 형식이 올바르지 않은 값은 제외
 * - 최대 MAX_RECIPIENTS 개까지
 */
export function normalizeRecipients(input: unknown): string[] {
  const raw: string[] = Array.isArray(input)
    ? input.map(v => String(v ?? ''))
    : String(input ?? '').split(/[,;\n\r\s]+/)

  const seen = new Set<string>()
  const out: string[] = []
  for (const item of raw) {
    for (const piece of item.split(/[,;\n\r\s]+/)) {
      const email = piece.trim().toLowerCase()
      if (!email || !isValidEmail(email) || seen.has(email)) continue
      seen.add(email)
      out.push(email)
      if (out.length >= MAX_RECIPIENTS) return out
    }
  }
  return out
}

/** KV 에 저장된 목록(JSON 배열 문자열)을 안전하게 파싱 */
export function parseStoredRecipients(rawValue: string | null | undefined): string[] {
  if (!rawValue) return []
  let parsed: unknown = rawValue
  try {
    const json = JSON.parse(rawValue)
    parsed = json
  } catch {
    // JSON 이 아니면 "a@b.com, c@d.com" 같은 문자열로 취급
  }
  return normalizeRecipients(parsed)
}

/**
 * 관리자 페이지 목록이 비어 있을 때 사용되는 기본 수신자
 * RESEND_TO 환경변수 + DEFAULT_RECIPIENTS 를 합쳐서 중복 제거
 */
export function fallbackRecipients(envTo: string | undefined): string[] {
  return normalizeRecipients([...normalizeRecipients(envTo), ...DEFAULT_RECIPIENTS])
}

/**
 * 실제 발송에 사용할 수신자 목록
 * 관리자 페이지에 등록된 목록이 있으면 그것이 우선(전체 대체),
 * 비어 있으면 기본 수신자로 폴백
 */
export async function resolveRecipients(
  kv: KVNamespace | undefined,
  fallbackTo: string | undefined
): Promise<string[]> {
  let stored: string[] = []
  if (kv) {
    try {
      stored = parseStoredRecipients(await kv.get(MAIL_RECIPIENTS_KEY))
    } catch (e) {
      console.error('[mail-recipients] KV 조회 실패', e)
    }
  }
  if (stored.length) return stored
  return fallbackRecipients(fallbackTo)
}
