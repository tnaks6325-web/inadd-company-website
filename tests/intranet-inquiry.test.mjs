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

// ── 지난 문의 한꺼번에 ──
import { BACKFILL_CHUNK, backfillInquiriesToIntranet } from '../src/routes/intranet-inquiry.ts'

const fakeKv = (entries) => ({
  async list({ prefix, limit, cursor }) {
    const all = Object.keys(entries).filter(k => k.startsWith(prefix)).sort()
    const start = cursor ? Number(cursor) : 0
    const keys = all.slice(start, start + limit).map(name => ({ name }))
    const end = start + keys.length
    return { keys, list_complete: end >= all.length, cursor: end >= all.length ? undefined : String(end) }
  },
  async get(k) { return entries[k] ?? null },
})

test('지난 문의: 백업을 40건씩 나눠 backfill 로 보내고, 접수 시각은 백업 시각(없으면 키의 시각)', async () => {
  const entries = {}
  for (let i = 0; i < 45; i++) {
    const ms = Date.UTC(2026, 8, 1) + i * 60000
    entries[`lead_contact_${ms}_a${i}`] = JSON.stringify({ type: 'contact', data: { ...DATA, company: `회사${i}` }, receivedAt: new Date(ms).toISOString() })
  }
  entries['lead_contact_1790000000000_nots'] = JSON.stringify({ type: 'contact', data: DATA })
  entries['lead_contact_1790000000001_broken'] = '{broken'
  entries['lead_brochure_1790000000000_b'] = JSON.stringify({ type: 'brochure', data: { email: 'x@example.test' } })
  const f = fakeFetch(() => new Response(JSON.stringify({ success: true, inserted: 20, duplicate: 0, invalid: 0 }), { status: 200 }))
  const r = await backfillInquiriesToIntranet({ INTRANET_INQUIRY_KEY: 'k1' }, fakeKv(entries), null, f)
  assert.equal(r.listed, 47)                 // 회사소개서 백업은 빼고 문의 백업만
  assert.equal(r.invalid, 1)                 // 깨진 백업
  assert.equal(r.cursor, null)
  assert.equal(f.calls.length, 2)            // 46건 → 40 + 6
  assert.equal(f.calls[0].body.backfill, true)
  assert.equal(f.calls[0].body.items.length, BACKFILL_CHUNK)
  assert.equal(f.calls[1].body.items.length, 6)
  const nots = [...f.calls[0].body.items, ...f.calls[1].body.items].find(it => it.external_id.endsWith('_nots'))
  assert.equal(nots.received_at, new Date(1790000000000).toISOString())
  assert.equal(r.inserted, 40)
  assert.equal(r.ok, true)
})

test('지난 문의: 200건씩 끊어 cursor 로 이어 가고, 실패한 묶음은 failed 로 센다', async () => {
  const entries = {}
  for (let i = 0; i < 230; i++) entries[`lead_contact_${1790000000000 + i}_x`] = JSON.stringify({ data: DATA, receivedAt: '2026-09-01T00:00:00Z' })
  let n = 0
  const f = fakeFetch(() => (++n === 2 ? new Response('{}', { status: 500 }) : new Response(JSON.stringify({ inserted: 40 }), { status: 200 })))
  const r1 = await backfillInquiriesToIntranet({ INTRANET_INQUIRY_KEY: 'k1' }, fakeKv(entries), null, f)
  assert.equal(r1.listed, 200)
  assert.equal(r1.cursor, '200')
  assert.equal(r1.failed, 40)
  assert.equal(r1.ok, false)
  const r2 = await backfillInquiriesToIntranet({ INTRANET_INQUIRY_KEY: 'k1' }, fakeKv(entries), r1.cursor, f)
  assert.equal(r2.listed, 30)
  assert.equal(r2.cursor, null)
  // 열쇠 없음·테스트 서버는 보내지 않는다
  assert.equal((await backfillInquiriesToIntranet({}, fakeKv(entries), null, f)).reason, 'no_key')
  assert.equal((await backfillInquiriesToIntranet({ INTRANET_INQUIRY_KEY: 'k1', SITE_ENV: 'preview' }, fakeKv(entries), null, f)).reason, 'preview')
})
