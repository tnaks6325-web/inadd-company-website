import assert from 'node:assert/strict'
import test from 'node:test'
import { BREVO_EMAIL_ENDPOINT, sendBrevoEmail } from '../src/lib/brevo-mail.ts'

test('상담 메일 어댑터는 mock fetch로 Brevo에 전달하고 ID를 읽는다', async () => {
  let request
  const result = await sendBrevoEmail('test-key-only', {
    from: 'In Ad Company <no-reply@inadcompany.co.kr>',
    to: ['test-recipient@example.test'],
    subject: '[테스트서버] 가상 문의',
    html: '<p>가상 본문</p>',
    replyTo: 'reply@example.test',
  }, async (url, init) => {
    request = { url, init, body: JSON.parse(init.body) }
    return new Response(JSON.stringify({ messageId: 'mock-message-id' }), { status: 201 })
  })
  assert.equal(request.url, BREVO_EMAIL_ENDPOINT)
  assert.equal(request.init.headers['api-key'], 'test-key-only')
  assert.deepEqual(request.body.sender, { name: 'In Ad Company', email: 'no-reply@notify.inadcompany.co.kr' })
  assert.deepEqual(request.body.to, [{ email: 'test-recipient@example.test' }])
  assert.deepEqual(request.body.replyTo, { email: 'reply@example.test' })
  assert.equal(request.body.htmlContent, '<p>가상 본문</p>')
  assert.match(request.body.headers.idempotencyKey, /^[0-9a-f-]{36}$/i)
  assert.equal(result.messageId, 'mock-message-id')
})


test('운영 시험 발송은 전달된 고정 idempotency key를 재사용할 수 있다', async () => {
  let request
  await sendBrevoEmail('test-key-only', {
    from: 'no-reply@notify.inadcompany.co.kr', to: ['test@example.test'], subject: '가상 확인',
    html: '<p>가상</p>', idempotencyKey: 'de6852ad-1c12-4d0a-9ab2-83facd96fc01',
  }, async (_url, init) => {
    request = JSON.parse(init.body)
    return new Response(JSON.stringify({ messageId: 'mock-message-id' }), { status: 201 })
  })
  assert.equal(request.headers.idempotencyKey, 'de6852ad-1c12-4d0a-9ab2-83facd96fc01')
})

test('Brevo 오류는 호출자에게 전달한다', async () => {
  await assert.rejects(
    sendBrevoEmail('test-key-only', {
      from: 'no-reply@notify.inadcompany.co.kr', to: ['test@example.test'], subject: '가상', html: '<p>가상</p>',
    }, async () => new Response(JSON.stringify({ message: 'mock rejected' }), { status: 400 })),
    /mock rejected/,
  )
})
