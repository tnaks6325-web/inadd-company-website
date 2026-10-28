export const BREVO_EMAIL_ENDPOINT = 'https://api.brevo.com/v3/smtp/email'

type Address = { email: string; name?: string }

function parseAddress(value: string): Address {
  const input = String(value ?? '').trim()
  const angle = input.match(/^(.*?)\s*<\s*([^<>\s]+@[^<>\s]+)\s*>$/)
  const email = angle ? angle[2].trim() : input
  if (!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email)) {
    throw new Error('메일 발신 주소 형식이 올바르지 않습니다.')
  }
  const name = angle?.[1]?.trim().replace(/^"|"$/g, '')
  return name ? { email, name } : { email }
}

function parseSender(value: string): Address {
  const sender = parseAddress(value)
  if (sender.email.toLowerCase().endsWith('@inadcompany.co.kr')) {
    sender.email = sender.email.replace(/@inadcompany\.co\.kr$/i, '@notify.inadcompany.co.kr')
  }
  return sender
}

export async function sendBrevoEmail(
  apiKey: string,
  message: { from: string; to: string[]; subject: string; html: string; replyTo?: string; idempotencyKey?: string },
  fetcher: typeof fetch = fetch,
): Promise<any> {
  if (!apiKey || !message.from || !message.to.length) throw new Error('메일 환경변수가 설정되지 않았습니다.')
  const payload = {
    sender: parseSender(message.from),
    to: message.to.map(parseAddress),
    subject: message.subject,
    htmlContent: message.html,
    headers: { idempotencyKey: message.idempotencyKey || crypto.randomUUID() },
    ...(message.replyTo ? { replyTo: parseAddress(message.replyTo) } : {}),
  }
  const response = await fetcher(BREVO_EMAIL_ENDPOINT, {
    method: 'POST',
    headers: { 'api-key': apiKey, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const raw = await response.text()
  let json: any = {}
  try { json = raw ? JSON.parse(raw) : {} } catch { json = { raw } }
  if (!response.ok) throw new Error(`메일 발송 실패: ${response.status} ${json?.message || json?.error || json?.raw || ''}`.trim())
  return json
}
