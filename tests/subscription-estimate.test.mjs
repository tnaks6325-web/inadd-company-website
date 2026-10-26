import assert from 'node:assert/strict'
import test from 'node:test'

import { computeEstimate, estimateText, PACKAGE_PRICE } from '../src/lib/subscription-estimate.ts'

test('아무것도 안 고르면 0원', () => {
  const e = computeEstimate([])
  assert.equal(e.total, 0)
  assert.equal(e.listTotal, 0)
})

test('일부만 고르면 단품가 합계, 초기진단은 무료로 붙는다', () => {
  const e = computeEstimate(['cafe', 'blog'])
  assert.equal(e.subtotal, 80)
  assert.equal(e.total, 80)
  assert.equal(e.listTotal, 110)
  assert.equal(e.saving, 30)
  assert.equal(e.capped, false)
})

test('단품가 합계가 300만 원 이상이면 300만 원', () => {
  const e = computeEstimate(['performance', 'creative', 'landing', 'purchase', 'press'])
  assert.equal(e.subtotal, 310)
  assert.equal(e.total, PACKAGE_PRICE)
  assert.equal(e.capped, true)
})

test('전부 고르면 450만 원 → 300만 원(구독 페이지 표와 같은 숫자)', () => {
  const e = computeEstimate(['performance', 'creative', 'reels', 'landing', 'cafe', 'blog', 'purchase', 'press'])
  assert.equal(e.listTotal, 450)
  assert.equal(e.total, 300)
})

test('모르는 항목·고정 항목·중복은 무시한다', () => {
  const e = computeEstimate(['cafe', 'cafe', 'diag', 'report', 'free-money', 123])
  assert.deepEqual(e.picked.map(it => it.id), ['cafe'])
  assert.equal(e.total, 40)
  assert.equal(computeEstimate('cafe').total, 0)
})

test('조합 요약 글에 고정 항목·고른 항목·금액이 들어간다', () => {
  const t = estimateText(computeEstimate(['reels']))
  assert.match(t, /초기진단·세팅 — 무료 포함/)
  assert.match(t, /릴스 소재 제작 \(월 1회\) — 30만 원/)
  assert.match(t, /브랜드 주간보고서 \(매주\) — 포함/)
  assert.match(t, /예상 월 30만 원/)
})

// 접수 창구(POST /api/mail/estimate)는 api-mail.ts 가 확장자 없는 import 를 써서 node 로 바로 못 불러온다 — 로컬 서버로 확인한다.
