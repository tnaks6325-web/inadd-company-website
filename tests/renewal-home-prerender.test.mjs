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

test('개편 회사소개 미리 채운 HTML이 최신이고, 메뉴·바닥·지도 정보 글자가 있다', async () => {
  const { PAGES } = await import('../scripts/renewal-home-prerender.mjs')
  const about = PAGES.find(p => p.name === 'about')
  const html = readFileSync(about.out, 'utf8')
  assert.equal(html, generate(about))
  for (const t of ['/marketing/viral', '사업자등록번호', 'data-loc-map', '고잔로 51', 'class="is-cur"']) assert.ok(html.includes(t), t)
  assert.ok(!/시안|가상 예시/.test(html))
})

// 개편 서비스 8개(2026-11-07)
test('개편 서비스 페이지 미리 채운 HTML이 최신이고, 운영 데이터를 끼울 자리가 있다', async () => {
  const { PAGES, SVC_KEYS } = await import('../scripts/renewal-home-prerender.mjs')
  for (const k of SVC_KEYS) {
    const page = PAGES.find(p => p.svc === k)
    const html = readFileSync(page.out, 'utf8')
    assert.equal(html, generate(page), k)
    assert.ok(html.includes(`data-svc="${k}"`), k)
    assert.ok(html.includes('사업자등록번호') && html.includes('/marketing/viral'), k + ' 메뉴·바닥')
    if (k !== 'subscription') assert.ok(html.includes('<!--svc-hero-->'), k + ' 첫 화면 장면 자리')
    if (k !== 'performance') assert.ok(html.includes('<!--svc-terms-->') && html.includes('<!--svc-terms-lead-->'), k + ' 진행 조건 자리')
    if (k === 'performance' || k === 'subscription') assert.ok(html.includes('<!--svc-cases-->'), k + ' 성과 사례 자리')
    assert.ok(!/시안|가상 예시|추가 혜택/.test(html), k)
  }
})

test('퍼포먼스 자주 묻는 질문이 운영 원문(svc-performance.tsx PM_FAQ)과 같다', async () => {
  const tsx = readFileSync(new URL('../src/routes/svc-performance.tsx', import.meta.url), 'utf8')
  const live = [...tsx.slice(tsx.indexOf('const PM_FAQ'), tsx.indexOf(']\n\nexport const SvcPerformancePage')).matchAll(/\['([^']+)', '([^']+)'\]/g)].map(m => [m[1], m[2]])
  const ctx = { window: {} }
  const { default: vm } = await import('node:vm')
  vm.createContext(ctx)
  vm.runInContext(readFileSync(new URL('../public/static/renewal/svc-data-1.js', import.meta.url), 'utf8'), ctx)
  const data = JSON.parse(JSON.stringify(ctx.window.SVC_PAGES.performance.faq.map(f => [f.q, f.a])))   // 다른 실행 공간(vm)의 배열이라 일반 배열로
  assert.equal(live.length, 8)
  assert.deepEqual(data, live)
})

// 개편 포트폴리오(2026-11-07)
test('개편 포트폴리오 미리 채운 HTML이 최신이고, 사례 카드 자리가 있고, 단계별 매출 금액이 없다', async () => {
  const { PAGES } = await import('../scripts/renewal-home-prerender.mjs')
  const works = PAGES.find(p => p.name === 'works')
  const html = readFileSync(works.out, 'utf8')
  assert.equal(html, generate(works))
  for (const t of ['<!--works-ads-->', '<!--works-cards-->', 'data-flow', 'STEP 12', '사업자등록번호', 'class="is-cur"']) assert.ok(html.includes(t), t)
  assert.equal(html.split('<!--works-ads-->').length, 2, '그로스 카드 표식은 한 번만')
  // 2026-11-07 대표: 어느 단계에서 매출이 얼마 오르는지 알 수 없음 — 금액 계단을 다시 넣지 않는다
  assert.ok(!/예시 시나리오|월 매출|800만|1\.4억|3억/.test(html))
  assert.ok(!/시안|가상 예시|고객 후기/.test(html))
})
