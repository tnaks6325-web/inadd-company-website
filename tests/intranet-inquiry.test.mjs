import assert from 'node:assert/strict'
import test from 'node:test'

import { DEFAULT_INTRANET_URL, forwardInquiryToIntranet } from '../src/routes/intranet-inquiry.ts'

// 가상 문의만 쓴다(example.test)
const DATA = { name: '김문의', email: 'lead@example.test', company: '예시상사', message: '견적 문의' }

const fakeFetch = (respond) => {
  const calls = []
  const fn = async (url, init) => {
    calls.push({ url, init, body: JSON.parse(init.body) })
    return respond()
  }
  fn.calls = calls
  return fn
}

test('열쇠가 있으면 인트라넷 받기 창구로 전용 키와 함께 보낸다', async () => {
  const f = fakeFetch(() => new Response('{"success":true}', { status: 200 }))
  const r = await forwardInquiryToIntranet({ INTRANET_INQUIRY_KEY: 'k1' }, 'lead_contact_1', DATA, f)
  assert.deepEqual(r, { sent: true, status: 200 })
  assert.equal(f.calls.length, 1)
  assert.equal(f.calls[0].url, `${DEFAULT_INTRANET_URL}/api/homepage-inquiries/ingest`)
  assert.equal(f.calls[0].init.headers['X-Inquiry-Key'], 'k1')
  assert.equal(f.calls[0].body.external_id, 'lead_contact_1')
  assert.deepEqual(f.calls[0].body.data, DATA)
  assert.ok(!Number.isNaN(Date.parse(f.calls[0].body.received_at)))
})

test('주소를 바꿀 수 있고 끝 빗금은 정리한다', async () => {
  const f = fakeFetch(() => new Response('{}', { status: 200 }))
  await forwardInquiryToIntranet({ INTRANET_INQUIRY_KEY: 'k1', INTRANET_URL: 'http://localhost:3000/' }, 'x', DATA, f)
  assert.equal(f.calls[0].url, 'http://localhost:3000/api/homepage-inquiries/ingest')
})

test('열쇠가 없거나 테스트 서버면 보내지 않는다', async () => {
  const f = fakeFetch(() => new Response('{}', { status: 200 }))
  assert.equal((await forwardInquiryToIntranet({}, 'x', DATA, f)).reason, 'no_key')
  assert.equal((await forwardInquiryToIntranet({ INTRANET_INQUIRY_KEY: 'k1', SITE_ENV: 'preview' }, 'x', DATA, f)).reason, 'preview')
  assert.equal((await forwardInquiryToIntranet({ INTRANET_INQUIRY_KEY: 'k1', MAIL_REDIRECT_TO: 'test@example.test' }, 'x', DATA, f)).reason, 'preview')
  assert.equal(f.calls.length, 0)
})

test('인트라넷이 거절하거나 연결이 안 돼도 예외를 던지지 않는다(문의 접수는 그대로)', async () => {
  const bad = fakeFetch(() => new Response('{"error":"Unauthorized"}', { status: 401 }))
  assert.deepEqual(await forwardInquiryToIntranet({ INTRANET_INQUIRY_KEY: 'k1' }, 'x', DATA, bad), { sent: false, reason: 'http', status: 401 })
  const down = async () => { throw new TypeError('fetch failed') }
  assert.deepEqual(await forwardInquiryToIntranet({ INTRANET_INQUIRY_KEY: 'k1' }, 'x', DATA, down), { sent: false, reason: 'error' })
})
