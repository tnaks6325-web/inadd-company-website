// 개편 홈 서버 미리 채우기(2026-11-06) — 검색 로봇이 자바스크립트 없이도 읽도록, 화면이 그려 넣던 글자(머리 메뉴·회사 문장·서비스·연혁·파트너·비전·바닥)를
// 화면과 같은 함수(public/static/renewal/base.js 의 SITE.chromeHTML·endHTML, home-fill.js 의 HOME_FILL)로 미리 만들어
// src/routes/renewal/home-body.gen.html 에 쓴다. 화면 쪽 스크립트는 같은 글자로 다시 채우므로 보이는 모습은 같다.
// 원본(home-body.html)이나 data.js·base.js·home-fill.js 를 고치면: node scripts/renewal-home-prerender.mjs  (tests/renewal-home-prerender.test.mjs 가 어긋나면 실패)
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import vm from 'node:vm'

const root = fileURLToPath(new URL('..', import.meta.url))
const R = root + 'public/static/renewal/'
// 페이지별: 원본 → 미리 채운 파일, 머리 메뉴에서 켜 둘 메뉴(nav), 내용 채우기(home 만)
export const PAGES = [
  { name: 'home', src: root + 'src/routes/renewal/home-body.html', out: root + 'src/routes/renewal/home-body.gen.html', nav: '', fill: true },
  { name: 'about', src: root + 'src/routes/renewal/about-body.html', out: root + 'src/routes/renewal/about-body.gen.html', nav: 'about', fill: false },
]
export const SRC = PAGES[0].src, OUT = PAGES[0].out

export function generate(page = PAGES[0]) {
  const ctx = {}; ctx.window = ctx
  vm.createContext(ctx)
  for (const f of ['data.js', 'base.js', 'home-fill.js']) vm.runInContext(readFileSync(R + f, 'utf8'), ctx, { filename: f })
  const D = ctx.INAD, SITE = ctx.SITE, F = page.fill ? ctx.HOME_FILL(D) : {}
  let html = readFileSync(page.src, 'utf8')
  for (const [sel, inner] of Object.entries(F)) {
    const attr = sel.slice(1, -1)
    const re = new RegExp(`(<(\\w+)\\b[^>]*\\s${attr}(?=[\\s>])[^>]*>)(</\\2>)`)
    if (!re.test(html)) throw new Error('빈 자리를 못 찾음: ' + sel)
    html = html.replace(re, (_, open, tag, close) => open + inner + close)
  }
  const endRe = /<section data-site-end((?:\s+[\w-]+="[^"]*")*)\s*><\/section>/ // data-title 안에 <br /> 가 있어 속성은 따옴표 단위로 읽음
  if (!endRe.test(html)) throw new Error('문의 띠 자리를 못 찾음')
  html = html.replace(endRe, (_, attrs) => {
    const ds = {}
    for (const m of attrs.matchAll(/data-(num|title|desc)="([^"]*)"/g)) ds[m[1]] = m[2]
    return `<section data-site-end${attrs} data-filled="1" class="s-cta wrap" id="contact" data-bg="ink">${SITE.endHTML(ds, true)}</section>`
  })
  return `<!-- 자동 생성 파일 — 고치지 말 것. 원본: ${page.name}-body.html, 만드는 법: node scripts/renewal-home-prerender.mjs -->\n` + SITE.chromeHTML(page.nav) + '\n' + html
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  for (const p of PAGES) { writeFileSync(p.out, generate(p)); console.log('wrote', p.out) }
}
