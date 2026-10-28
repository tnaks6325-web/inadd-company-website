import assert from 'node:assert/strict'
import test from 'node:test'
import { readFile } from 'node:fs/promises'

const source = await readFile(new URL('../src/admin/api.ts', import.meta.url), 'utf8')
const start = source.indexOf("admin.post('/mail-provider/test'")
const end = source.indexOf("admin.post('/mail-recipients/test'", start)
const route = source.slice(start, end)

test('운영 Brevo 시험 경로는 관리자 인증·고정된 단일 주소·Production만 허용한다', () => {
  assert.ok(start >= 0 && end > start, 'one-time test route exists')
  assert.match(route.slice(0, 100), /authMiddleware/)
  assert.match(route, /SITE_ENV === 'preview' \\|\\| env\\.MAIL_REDIRECT_TO/)
  assert.match(route, /recipients\\.length !== 1/)
  assert.match(route, /BREVO_VERIFY_RECIPIENT_SHA256/)
  assert.doesNotMatch(route, /resolveRecipients/)
})

test('운영 Brevo 시험 경로는 KV 1회 잠금과 고정 idempotency key를 사용한다', () => {
  assert.match(route, /BREVO_VERIFY_ONCE_KEY/)
  assert.match(route, /if \\(prior\\) return c\\.json\\([\\s\\S]*?409\\)/)
  assert.match(route, /BREVO_VERIFY_IDEMPOTENCY_KEY/)
  assert.match(route, /state: 'indeterminate'/)
})

test('운영 Brevo 시험 메일에는 개인정보 없는 고정 문안만 들어간다', () => {
  assert.match(route, /\\[시험 발송\\] 홈페이지 Brevo 운영 확인/)
  assert.match(route, /개인정보가 없는 1회 운영 수신 테스트입니다/)
  assert.doesNotMatch(route, /recipients\\.join/)
})
