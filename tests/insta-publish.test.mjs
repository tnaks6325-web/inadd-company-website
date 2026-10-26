import assert from 'node:assert/strict'
import test from 'node:test'

import { buildCaption, checkCardCount, kstDate, normalizeHashtags, pickCardFiles, pickDue } from '../scripts/insta-publish-lib.mjs'

// 2026-10-28 한국 시각 13:00 / 11:00
const AT13 = Date.parse('2026-10-28T04:00:00Z')
const AT11 = Date.parse('2026-10-28T02:00:00Z')

test('한국 날짜는 UTC 자정을 넘겨도 한국 기준으로 센다', () => {
  assert.equal(kstDate(Date.parse('2026-10-27T15:30:00Z')), '2026-10-28')
})

test('카드 파일은 이미지 파일만 이름순(숫자 기준)으로 고른다', () => {
  assert.deepEqual(
    pickCardFiles(['10-end.png', '02-meme.png', '.DS_Store', '_01-cover.html', '01-cover.png', 'caption.txt', '03-a.JPG']),
    ['01-cover.png', '02-meme.png', '03-a.JPG', '10-end.png'],
  )
})

test('카드 장수는 2~10장만 통과한다', () => {
  assert.match(checkCardCount(1), /2장 이상/)
  assert.equal(checkCardCount(2), null)
  assert.equal(checkCardCount(10), null)
  assert.match(checkCardCount(11), /10장까지/)
})

test('해시태그는 #을 붙이고 중복을 빼고 5개까지만', () => {
  assert.deepEqual(normalizeHashtags('마케팅 #마케팅, 브랜드  #AI검색 a b c'), ['#마케팅', '#브랜드', '#AI검색', '#a', '#b'])
})

test('캡션 뒤에 해시태그를 붙이고 캡션에 이미 있는 태그는 다시 넣지 않는다', () => {
  assert.equal(buildCaption('본문 #마케팅', '마케팅 브랜드'), '본문 #마케팅\n\n#브랜드')
  assert.equal(buildCaption('본문', ''), '본문')
  assert.throws(() => buildCaption('  ', '태그'), /비어/)
  assert.throws(() => buildCaption('가'.repeat(2201), ''), /2200자/)
})

test('12시 전이면 아무것도 올리지 않는다', () => {
  const r = pickDue([{ date: '2026-10-28' }], { now: AT11 })
  assert.equal(r.item, null)
  assert.match(r.reason, /12시/)
})

test('오늘 이미 올렸으면 하루 1세트 규칙으로 멈춘다', () => {
  assert.equal(pickDue([{ date: '2026-10-28' }], { postedToday: 1, now: AT13 }).item, null)
})

test('예정일이 비었거나 미래면 기다리고, 지난 것 중 가장 이른 것부터 올린다', () => {
  const items = [
    { id: 'future', date: '2026-10-29' },
    { id: 'empty', date: '' },
    { id: 'today', date: '2026-10-28', created: '2026-10-27T01:00:00Z' },
    { id: 'late', date: '2026-10-27', created: '2026-10-27T05:00:00Z' },
  ]
  assert.equal(pickDue(items, { now: AT13 }).item.id, 'late')
  assert.equal(pickDue(items.filter(i => i.id !== 'late' && i.id !== 'today'), { now: AT13 }).item, null)
})
