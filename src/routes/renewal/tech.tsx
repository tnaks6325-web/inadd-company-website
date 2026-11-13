import { raw } from 'hono/html'
// 개편 아워테크(2026-11-09 대표: 인사이트 다음 아워테크, 1-1 기술 요소 구역 뺌 · 2-1 휴대폰 줄인 판) — 시안 lab/tech.html 을 옮긴 것.
// 마크업은 tech-body.html(→ 미리 채운 tech-body.gen.html, 메뉴·바닥 포함), 모양·움직임은 /static/renewal/tech.*.
// 첫 화면은 예전 페이지의 히어로(노트북 속 시스템 7화면, ../tech-hero TechHero + /static/tech-hero.*)를 그대로 끼운다.
// 예전 아워테크는 ../development(DevelopmentPage).
import body from './tech-body.gen.html?raw'
import { TechHero } from '../tech-hero'

const V = '20261113a'
const HERO_V = '20261102a' // 히어로 파일은 예전 페이지와 같은 것
const css = (f: string) => <link rel="stylesheet" href={`/static/renewal/${f}?v=${V}`} />
const js = (f: string) => <script src={`/static/renewal/${f}?v=${V}`}></script>

export const renewalTechHead = (
  <>
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/lenis@1.1.13/dist/lenis.css" />
    {css('base.css')}
    <link rel="stylesheet" href={`/static/tech-hero.css?v=${HERO_V}`} />
    {css('tech.css')}
  </>
)

export const renewalTechBody = { 'data-nav': 'about' }

export const RenewalTechPage = () => {
  const [before, after] = body.split('<!--tech-hero-->')
  return (
    <>
      {raw(before)}<TechHero />{raw(after)}
      <script dangerouslySetInnerHTML={{ __html: 'window.INAD_LIVE = true;' }} />
      {js('data.js')}
      <script src="https://cdn.jsdelivr.net/npm/lenis@1.1.13/dist/lenis.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/SplitText.min.js"></script>
      <script src={`/static/tech-hero.js?v=${HERO_V}`}></script>
      {js('base.js')}
      {js('tech.js')}
    </>
  )
}
