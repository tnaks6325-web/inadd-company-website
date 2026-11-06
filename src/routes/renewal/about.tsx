import { raw } from 'hono/html'
// 개편 회사소개(2026-11-06 대표 결정: 홈 다음으로 회사소개) — 시안 lab/about-3.html(대표 인터뷰)을 옮기고, 오시는 길 지도를 새 모양으로 넣음.
// 마크업은 about-body.html(→ 미리 채운 about-body.gen.html), 모양·연출은 /static/renewal/about.*, 첫 화면은 기존 /static/about-hero.* 그대로.
// 머리(측정·검색 정보)는 renderer 가 넣고(bare 모드), 예전 메뉴·바닥·문의 팝업은 쓰지 않는다. 예전 회사소개는 ../about(AboutPage).
import body from './about-body.gen.html?raw' // 미리 채운 HTML(scripts/renewal-home-prerender.mjs 가 about-body.html 에서 만듦)

const V = '20261107b'
const css = (f: string) => <link rel="stylesheet" href={`/static/renewal/${f}?v=${V}`} />
const js = (f: string) => <script src={`/static/renewal/${f}?v=${V}`}></script>

export const renewalAboutHead = (
  <>
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/lenis@1.1.13/dist/lenis.css" />
    <link rel="stylesheet" href="/static/about-hero.css?v=20261031m" />
    {css('base.css')}
    {css('about.css')}
  </>
)

export const renewalAboutBody = { 'data-nav': 'about' }

export const RenewalAboutPage = () => (
  <>
    {raw(body)}
    <script dangerouslySetInnerHTML={{ __html: 'window.INAD_LIVE = true;' }} />
    <script src="/static/about-hero.js?v=20261106a"></script>
    {js('data.js')}
    <script src="https://cdn.jsdelivr.net/npm/lenis@1.1.13/dist/lenis.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/SplitText.min.js"></script>
    {js('base.js')}
    {js('about.js')}
  </>
)
