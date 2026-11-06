import { raw } from 'hono/html'
// 개편 포트폴리오(2026-11-07 대표: 서비스 다음으로 포트폴리오) — 시안 lab/works.html 을 옮긴 것.
// 마크업은 works-body.html(→ 미리 채운 works-body.gen.html), 모양·움직임은 /static/renewal/works.*.
// 서버가 끼우는 것: 그로스 카드(<!--works-ads-->, 퍼포먼스 성과 사례 REF_CASES 와 같은 원본), 관리자 등록 사례(<!--works-cards-->, src/main.tsx 가 works_items 로).
// 예전 포트폴리오는 ../works(WorksPage·works-hero).
import body from './works-body.gen.html?raw'
import { REF_CASES } from '../svc-performance-ref'
import type { WorkItem } from '../works'

const V = '20261107c'
const css = (f: string) => <link rel="stylesheet" href={`/static/renewal/${f}?v=${V}`} />
const js = (f: string) => <script src={`/static/renewal/${f}?v=${V}`}></script>

// 서비스 표기의 &·/·, 기호를 가운뎃점으로(보여 줄 때만) — 화면 스크립트 works.js svc 와 같게
const svcText = (t?: string) => (t || '').replace(/\s*[&\/,]\s*/g, ' · ')

// 그로스(광고 성과) 카드 — 누르면 퍼포먼스 페이지의 그 사례(#ref-<id>)가 열림
export const RenewalAdCards = () => (
  <>
    {REF_CASES.map(c => {
      const k = c.kpis[0]
      return (
        <a class="wk-card" data-cat="performance" href={`/marketing/performance#ref-${c.id}`}>
          <div class="wk-ad">
            <div class="md">{c.media.map(m => <span>{m}</span>)}</div>
            <div><strong class={k.num.length > 5 ? 'long' : ''}>{k.num}<small>{k.unit}</small></strong><p class="kl">{k.label}</p><p class="kd">{k.detail}</p></div>
            <p class="tt">{c.title.join('')}<br />{c.title2}</p>
          </div>
          <div class="wk-meta2"><b>{c.client.split(' · ').pop()}</b><span>그로스 · {c.media.join(' + ')}</span></div>
        </a>
      )
    })}
  </>
)

// 관리자 등록 사례 카드 — 화면 스크립트(works.js coverCard)가 직접 불러와 그릴 때와 같은 모양(바꾸면 둘 다)
export const RenewalWorkCards = ({ items }: { items: WorkItem[] }) => (
  <>
    {items.map(w => (
      <article class="wk-card" data-cat={(w.tags || []).join(' ')}>
        <div class="wk-pic"><img src={w.cover} alt={w.brand || ''} loading="lazy" onerror="this.style.opacity=0" /><p class="ov"><span class="mono">CASE</span>{svcText(w.services)}</p></div>
        <div class="wk-meta2"><b>{w.brand || ''}</b><span>{svcText(w.services)}</span></div>
      </article>
    ))}
  </>
)

export const renewalWorksHead = (
  <>
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/lenis@1.1.13/dist/lenis.css" />
    {css('base.css')}
    {css('works.css')}
  </>
)

export const renewalWorksBody = { 'data-nav': 'works' }

export const RenewalWorksPage = () => {
  const [before, after] = body.split('<!--works-ads-->')
  return (
    <>
      {raw(before)}<RenewalAdCards />{raw(after)}
      <script dangerouslySetInnerHTML={{ __html: 'window.INAD_LIVE = true;' }} />
      {js('data.js')}
      {js('voices-data.js')}
      <script src="https://cdn.jsdelivr.net/npm/lenis@1.1.13/dist/lenis.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/SplitText.min.js"></script>
      {js('base.js')}
      {js('works.js')}
    </>
  )
}
