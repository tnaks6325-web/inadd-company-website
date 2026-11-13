import { raw } from 'hono/html'
// 개편 홈(2026-11-06 대표 결정: 홈부터 새 디자인으로) — 시안(lab/home.html, claude/renewal 브랜치)을 그대로 옮긴 것.
// 마크업은 home-body.html, 모양·연출은 /static/renewal/*. 머리(측정·검색 정보)는 renderer 가 그대로 넣고(bare 모드), 예전 메뉴·바닥·문의 팝업은 쓰지 않는다.
// 운영 연결: window.INAD_LIVE — 링크는 실제 주소로, 간편 문의 창은 /api/mail/contact·brochure, 견적 조합기는 /api/mail/estimate(source=home),
// 누적 캠페인 숫자는 /api/admin/public/home(관리자 기록). 시안 전용 편집 상자(guide.js)는 넣지 않는다.
import body from './home-body.gen.html?raw' // 미리 채운 HTML(scripts/renewal-home-prerender.mjs 가 home-body.html 에서 만듦)

const V = '20261113a'
const css = (f: string) => <link rel="stylesheet" href={`/static/renewal/${f}?v=${V}`} />
const js = (f: string) => <script src={`/static/renewal/${f}?v=${V}`}></script>

export const renewalHomeHead = (
  <>
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/lenis@1.1.13/dist/lenis.css" />
    {css('base.css')}
    {css('estimate.css')}
    {css('estimate-receipt.css')}
    {css('kakao-card.css')}
    {css('home.css')}
  </>
)

export const renewalHomeBody = { 'data-nav': '', 'data-float-cta': '' }

export const RenewalHomePage = () => (
  <>
    {raw(body)}
    <script dangerouslySetInnerHTML={{ __html: 'window.INAD_LIVE = true;' }} />
    {js('data.js')}
    <script src="https://cdn.jsdelivr.net/npm/lenis@1.1.13/dist/lenis.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/SplitText.min.js"></script>
    {js('works-data.js')}
    {js('voices-data.js')}
    {js('kakao-card.js')}
    {js('estimate-core.js')}
    {js('estimate-receipt.js')}
    {js('home-fill.js')}
    {js('base.js')}
    {js('home.js')}
  </>
)
