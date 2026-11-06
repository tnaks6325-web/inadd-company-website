// 개편 홈 미리 채운 HTML(home-body.gen.html)이 원본·스크립트와 어긋나지 않았는지 — 어긋나면 node scripts/renewal-home-prerender.mjs 로 다시 만든다
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { generate, OUT } from '../scripts/renewal-home-prerender.mjs'

test('개편 홈 미리 채운 HTML이 최신이다', () => {
  assert.equal(readFileSync(OUT, 'utf8'), generate())
})

test('미리 채운 HTML에 검색 로봇이 읽을 메뉴·서비스·바닥 글자가 있다', () => {
  const html = readFileSync(OUT, 'utf8')
  for (const t of ['/marketing/viral', '/marketing/subscription', '/about', '/works', '/insight', '사업자등록번호', '경기도 안산시 단원구 고잔로 51', 'data-fcta-dock']) assert.ok(html.includes(t), t)
  assert.ok(!/시안|가상 예시/.test(html))
})
