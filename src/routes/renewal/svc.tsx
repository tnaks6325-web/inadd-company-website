import { raw } from 'hono/html'
// 개편 서비스 8개(2026-11-07 대표: 서비스부터 새 디자인으로, 8개 한 번에) — 시안 lab/svc.html(한 틀로 8개)을 옮긴 것.
// 본문은 미리 채운 svc-<k>.gen.html(scripts/renewal-home-prerender.mjs 가 svc-fill.js + svc-data-1·2.js 로 만듦), 모양·움직임은 /static/renewal/svc.*.
// 서버가 끼우는 것: 첫 화면 장면(<!--svc-hero-->, 운영 서비스 페이지와 같은 부품), 성과 사례(<!--svc-cases-->, 퍼포먼스·구독).
// 맨 위 숫자·자주 묻는 질문은 src/main.tsx 가 관리자 화면 값으로 바꿔 넣는다. 예전 서비스 페이지는 ../svc-*.tsx(구독 옛 상세는 /marketing/subscription/proposal).
import subscription from './svc-subscription.gen.html?raw'
import performance from './svc-performance.gen.html?raw'
import viral from './svc-viral.gen.html?raw'
import influencer from './svc-influencer.gen.html?raw'
import seeding from './svc-seeding.gen.html?raw'
import review from './svc-review.gen.html?raw'
import oliveyoung from './svc-oliveyoung.gen.html?raw'
import ppl from './svc-ppl.gen.html?raw'
import { SvcCases } from './svc-cases'
import { SVC_TERMS } from '../svc-terms'
import { VaultCards } from '../svc-performance'
import { ViralBackdrop, ViralPhones } from '../viral-phones'
import { InfluencerPhones } from '../influencer-phones'
import { SeedSearch } from '../seeding-search'
import { ReviewCompare } from '../review-compare'
import { OyShelf } from '../oy-shelf'
import { PplOnAir } from '../ppl-onair'

export type SvcKey = 'subscription' | 'performance' | 'viral' | 'influencer' | 'seeding' | 'review' | 'oliveyoung' | 'ppl'
const BODY: Record<SvcKey, string> = { subscription, performance, viral, influencer, seeding, review, oliveyoung, ppl }

const V = '20261109b'
const css = (f: string) => <link rel="stylesheet" href={`/static/renewal/${f}?v=${V}`} />
const js = (f: string) => <script src={`/static/renewal/${f}?v=${V}`}></script>

// 첫 화면 장면 — 운영 서비스 페이지와 같은 부품·같은 모양 파일(버전도 같게 맞춤)
const HERO: Partial<Record<SvcKey, { el: () => any; css: string; js: string }>> = {
  performance: { el: () => <VaultCards />, css: '/static/performance.css?v=20261027p', js: '/static/pm-hero-vault.js?v=20261019b' },
  viral: { el: () => <><ViralBackdrop /><ViralPhones /></>, css: '/static/viral-phones.css?v=20261027q', js: '/static/viral-phones.js?v=20261020a' },
  influencer: { el: () => <InfluencerPhones />, css: '/static/influencer-phones.css?v=20261027q', js: '/static/influencer-phones.js?v=20261019a' },
  seeding: { el: () => <SeedSearch />, css: '/static/seeding-search.css?v=20261027q', js: '/static/seeding-search.js?v=20261020m' },
  review: { el: () => <ReviewCompare />, css: '/static/review-compare.css?v=20261027q', js: '/static/review-compare.js?v=20261021c' },
  oliveyoung: { el: () => <OyShelf />, css: '/static/oy-shelf.css?v=20261027p', js: '/static/oy-shelf.js?v=20261021h' },
  ppl: { el: () => <PplOnAir />, css: '/static/ppl-onair.css?v=20261027p', js: '/static/ppl-onair.js?v=20261021g' },
}

// 진행 조건(운영 원본 SVC_TERMS) — 모양은 svc-fill.js 의 퍼포먼스 운영 조건과 같은 표·목록
const TermsLead = ({ k }: { k: SvcKey }) => SVC_TERMS[k] ? <p>{SVC_TERMS[k].lead}</p> : ''
const TermsBody = ({ k }: { k: SvcKey }) => {
  const d = SVC_TERMS[k]
  if (!d) return ''
  return (
    <div class="price">
      <div>
        {d.prices && d.prices.length > 0 && (
          <div class="ptab">
            <div class="r h"><span>상품</span><span>기준</span><span style="text-align:right">시작 금액</span></div>
            {d.prices.map(p => <div class="r"><b>{p.item}</b><em>{p.unit}</em><strong>{p.price}</strong></div>)}
          </div>
        )}
        {d.prices && d.prices.length > 0 && <p class="pnote">{d.priceNote ?? '금액은 모두 부가세 별도입니다.'}</p>}
      </div>
      <dl class="terms">{d.terms.map(t => <div><dt>{t.label}</dt><dd>{t.text}</dd></div>)}</dl>
    </div>
  )
}

export const renewalSvcHead = (k: SvcKey) => (
  <>
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/lenis@1.1.13/dist/lenis.css" />
    {HERO[k] && <link rel="stylesheet" href={HERO[k]!.css} />}
    {css('base.css')}
    {k === 'subscription' && <>{css('estimate.css')}{css('estimate-receipt.css')}</>}
    {css('svc.css')}
  </>
)

export const renewalSvcBody = { 'data-nav': 'services' }

export const RenewalSvcPage = ({ k }: { k: SvcKey }) => {
  const H = HERO[k]
  const parts = BODY[k].split(/(<!--svc-hero-->|<!--svc-cases-->|<!--svc-terms-lead-->|<!--svc-terms-->)/)
  const SLOT: Record<string, () => any> = {
    '<!--svc-hero-->': () => (H ? H.el() : ''),
    '<!--svc-cases-->': () => <SvcCases />,
    '<!--svc-terms-lead-->': () => <TermsLead k={k} />,
    '<!--svc-terms-->': () => <TermsBody k={k} />,
  }
  return (
    <>
      {parts.map(p => (SLOT[p] ? SLOT[p]() : raw(p)))}
      <script dangerouslySetInnerHTML={{ __html: 'window.INAD_LIVE = true;' }} />
      {js('data.js')}
      <script src="https://cdn.jsdelivr.net/npm/lenis@1.1.13/dist/lenis.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/SplitText.min.js"></script>
      {k === 'subscription' && <>{js('estimate-core.js')}{js('estimate-receipt.js')}</>}
      {js('base.js')}
      {js('svc.js')}
      {H && <script src={H.js} defer></script>}
    </>
  )
}
