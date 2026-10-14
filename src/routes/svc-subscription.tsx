import { SUBSCRIPTION_BODY } from './svc-subscription-body'

// 마케팅팀 구독 — 860px 상세페이지를 사이트 머리말·꼬리말 사이에 그대로 둔다.
// 화면이 860px보다 좁으면 subscription.js 가 페이지 전체를 화면 폭에 맞춰 축소한다(상세페이지 방식).
export const SvcSubscriptionPage = () => (
  <>
    <link rel="stylesheet" href="/static/subscription/subscription.css?v=20261014a" />
    <div class="mts-wrap">
      {/* 첫 그림 전에 축소 비율을 정해 가로 스크롤·깜빡임을 막는다 */}
      <script dangerouslySetInnerHTML={{ __html: `document.documentElement.style.setProperty('--mts-zoom',Math.min(1,document.documentElement.clientWidth/860))` }} />
      <div dangerouslySetInnerHTML={{ __html: SUBSCRIPTION_BODY }} />
    </div>
    <script src="/static/subscription/subscription.js?v=20261014b" defer></script>
  </>
)
