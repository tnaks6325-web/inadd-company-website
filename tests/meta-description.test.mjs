import assert from 'node:assert/strict'
import test from 'node:test'

import { keepCustomMeta } from '../src/lib/meta-description.ts'

const LONG = '긴 요약 문장입니다. 목록 카드에 그대로 보입니다.'
const SHORT = '따로 줄인 검색 설명'

test('따로 고친 검색 설명은 노션 재발행(요약과 같은 값)으로 덮어쓰지 않는다', () => {
  const out = keepCustomMeta({ summary: LONG, metaDescription: SHORT }, { summary: LONG, metaDescription: LONG, title: 't' })
  assert.equal('metaDescription' in out, false)
  assert.equal(out.summary, LONG)
  assert.equal(out.title, 't')
})

test('요약을 바꿔 재발행해도 따로 고친 검색 설명은 유지한다', () => {
  const out = keepCustomMeta({ summary: LONG, metaDescription: SHORT }, { summary: '새 요약', metaDescription: '새 요약' })
  assert.equal('metaDescription' in out, false)
  assert.equal(out.summary, '새 요약')
})

test('검색 설명이 요약과 같던 글은 재발행 값으로 바뀐다', () => {
  const out = keepCustomMeta({ summary: LONG, metaDescription: LONG }, { summary: '새 요약', metaDescription: '새 요약' })
  assert.equal(out.metaDescription, '새 요약')
})

test('요약과 다른 검색 설명을 직접 보내면 그 값으로 바뀐다', () => {
  const out = keepCustomMeta({ summary: LONG, metaDescription: SHORT }, { metaDescription: '다시 고친 설명' })
  assert.equal(out.metaDescription, '다시 고친 설명')
})

test('검색 설명이 없던 글은 그대로 받는다', () => {
  const out = keepCustomMeta({ summary: LONG }, { summary: LONG, metaDescription: LONG })
  assert.equal(out.metaDescription, LONG)
})
