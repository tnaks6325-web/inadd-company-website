// 관리자 변경 기록 · 되돌리기(src/admin/history.ts) — 가짜 KV 로 검사
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { planFor, snapshot, record, listHistory, getRecord, restore, softDelete, noteFrom } from '../src/admin/history.ts'

function fakeKV() {
  const m = new Map(), meta = new Map(), ttl = new Map()
  return {
    m, ttl,
    async get(k) { return m.has(k) ? m.get(k) : null },
    async put(k, v, o = {}) { m.set(k, v); if (o.metadata) meta.set(k, o.metadata); if (o.expirationTtl) ttl.set(k, o.expirationTtl); else ttl.delete(k) },
    async delete(k) { m.delete(k); meta.delete(k); ttl.delete(k) },
    async list({ prefix, limit }) {
      const keys = [...m.keys()].filter(k => k.startsWith(prefix)).sort().slice(0, limit).map(name => ({ name, metadata: meta.get(name) }))
      return { keys, list_complete: true }
    },
  }
}

test('저장 경로마다 기록 이름·바뀌는 키를 정한다', () => {
  assert.deepEqual(planFor('PUT', '/hero-kpi/ppl', {}).keys, ['hero_kpi_ppl'])
  assert.equal(planFor('PUT', '/hero-kpi/ppl', {}).label({}, {}), 'PPL 상단 숫자')
  assert.equal(planFor('PUT', '/svc-faq/influencer', {}).label({}, {}), '인플루언서 자주 묻는 질문')
  assert.deepEqual(planFor('PUT', '/home', { stats: {} }).keys, ['home_stats'])
  assert.equal(planFor('PUT', '/home', { brochure: 'x' }).area, '문의 받기')
  assert.equal(planFor('PUT', '/home', {}), null)
  // 계정·시험 발송·로그인·사진 올리기는 기록하지 않음
  for (const [m, p] of [['PUT', '/change-credentials'], ['POST', '/login'], ['POST', '/mail-recipients/test'], ['POST', '/gallery/image'], ['POST', '/works/thumb']]) assert.equal(planFor(m, p, {}), null, p)
  const posts = JSON.stringify([{ id: 'ins_1', title: '첫 글' }])
  assert.equal(planFor('DELETE', '/insight/ins_1', null).label({ insight_posts: posts }, null), '글 삭제: 첫 글')
  const gal = JSON.stringify([{ id: 5, caption: '워크숍' }])
  assert.equal(planFor('DELETE', '/gallery/5', null).label({ gallery_items: gal }, null), '사진 묶음 삭제: 워크숍')
})

test('포트폴리오 저장은 무엇이 바뀌었는지 브랜드 이름으로 요약', () => {
  const p = planFor('PUT', '/works', {})
  const a = JSON.stringify([{ brand: 'A', cover: '1' }, { brand: 'B', cover: '2' }])
  assert.equal(p.label({ works_items: a }, { items: [{ brand: 'A', cover: '1' }, { brand: 'B', cover: '2' }, { brand: 'C', cover: '3' }] }), '사례 추가: C')
  assert.equal(p.label({ works_items: a }, { items: [{ brand: 'A', cover: '1' }] }), '사례 삭제: B')
  assert.equal(p.label({ works_items: a }, { items: [{ brand: 'A', cover: '9' }, { brand: 'B', cover: '2' }] }), '사례 수정: A')
  assert.equal(p.label({ works_items: a }, { items: [{ brand: 'B', cover: '2' }, { brand: 'A', cover: '1' }] }), '사례 순서 변경')
})

test('기록은 최신이 먼저, 되돌리면 그때 값으로 돌아가고 되돌리기도 기록된다', async () => {
  const kv = fakeKV()
  await kv.put('hero_kpi_ppl', 'v1')
  const id1 = await record(kv, { area: '서비스', label: 'PPL 상단 숫자', by: 'admin', before: await snapshot(kv, ['hero_kpi_ppl']) })
  await kv.put('hero_kpi_ppl', 'v2')
  await new Promise(r => setTimeout(r, 3))
  const id2 = await record(kv, { area: '서비스', label: 'PPL 상단 숫자', by: 'admin', before: await snapshot(kv, ['hero_kpi_ppl']) })
  await kv.put('hero_kpi_ppl', 'v3')
  const { items } = await listHistory(kv, 10)
  assert.deepEqual(items.map(i => i.id), [id2, id1])
  assert.ok(kv.ttl.get('hist:' + id1) > 0, '기록은 90일 뒤 저절로 없어짐')
  const rid = await restore(kv, await getRecord(kv, id1), 'admin')
  assert.equal(await kv.get('hero_kpi_ppl'), 'v1')
  const back = await getRecord(kv, rid)
  assert.equal(back.before.hero_kpi_ppl, 'v3')
  assert.equal(back.rf, id1)
  assert.match(back.label, /^되돌리기: /)
  // 원래 없던 값으로 되돌리면 지움(기본값으로 돌아감)
  const id0 = await record(kv, { area: '홈', label: '회사 숫자', by: 'admin', before: { home_stats: null } })
  await kv.put('home_stats', '{"partners":130}')
  await restore(kv, await getRecord(kv, id0), 'admin')
  assert.equal(await kv.get('home_stats'), null)
  assert.equal(await getRecord(kv, '../x'), null, '잘못된 번호')
})

test('지운 사진은 90일 보관, 되돌리면 계속 보관으로', async () => {
  const kv = fakeKV()
  await kv.put('gallery_img_1_ab', 'data:image/png;base64,AA')
  await softDelete(kv, 'gallery_img_1_ab')
  assert.ok(kv.ttl.get('gallery_img_1_ab') > 0)
  const id = await record(kv, { area: '인애드 일상', label: '사진 묶음 삭제', by: 'admin', before: { gallery_items: JSON.stringify([{ id: 1, images: [{ key: 'gallery_img_1_ab' }] }]) } })
  await kv.put('gallery_items', '[]')
  await restore(kv, await getRecord(kv, id), 'admin')
  assert.equal(kv.ttl.has('gallery_img_1_ab'), false)
  assert.equal(await kv.get('gallery_img_1_ab'), 'data:image/png;base64,AA')
})

test('관리자 화면이 보내는 한 줄 설명은 짧게 정리', () => {
  assert.equal(noteFrom(encodeURIComponent('PPL 숫자\n3칸 → 2칸')), 'PPL 숫자 3칸 → 2칸')
  assert.equal(noteFrom('%E0%A4%A'), '')
  assert.equal(noteFrom(undefined), '')
})
