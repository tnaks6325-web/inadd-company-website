/**
 * 마케팅팀 구독 견적 조합 — 항목·단품가·계산 규칙 (구독 페이지 조합 화면 + POST /api/mail/estimate 공용)
 *
 * 규칙(대표 결정 2026-10-27):
 * - 손님은 항목을 켜고 끄기만 한다(횟수 조절 없음, 제공량은 구독 페이지 '포함 항목' 표 그대로).
 * - 고른 항목의 단품가를 더하고, 300만 원 이상이면 팀구독 300만 원(10가지 전부 포함)으로 계산한다.
 * - 초기진단·세팅(단품 30만 원)은 항상 무료로 들어가고, 브랜드 주간보고서도 항상 들어간다.
 *
 * 단품가·제공량을 바꾸면 구독 페이지 '포함 항목' 표(svc-subscription-body.ts)도 같이 고친다.
 * 화면 계산은 public/static/subscription/subscription.js 가 data-price 로 하고, 메일에 찍히는 금액은 서버가 이 파일로 다시 계산한다.
 */

export type EstimateItem = {
  id: string
  name: string
  amount: string   // 구독 제공량
  note?: string
  price: number    // 단품가(만 원)
  fixed?: boolean  // 항상 포함(빼기 불가)
  free?: boolean   // 항상 포함 + 무료(단품가는 줄 그어 보여 줌)
}

export const PACKAGE_PRICE = 300 // 만 원, 부가세 별도

export const ESTIMATE_ITEMS: EstimateItem[] = [
  { id: 'diag', name: '초기진단·세팅', amount: '무료', price: 30, fixed: true, free: true },
  { id: 'performance', name: '퍼포먼스 마케팅', amount: '운영 대행', note: '광고비 월 1,000만 원 한도까지 운영', price: 100 },
  { id: 'creative', name: '광고 소재 제작', amount: '무제한', note: '월 운영 범위 안에서 제작', price: 80 },
  { id: 'reels', name: '릴스 소재 제작', amount: '월 1회', price: 30 },
  { id: 'landing', name: '랜딩페이지 제작·운영', amount: '3개월마다 1회', price: 60 },
  { id: 'cafe', name: '카페 바이럴', amount: '월 15회', price: 40 },
  { id: 'blog', name: '블로그 체험단', amount: '월 15회', price: 40 },
  { id: 'purchase', name: '구매후기 체험단', amount: '월 50회', price: 50 },
  { id: 'press', name: '언론기사 작성·송출', amount: '월 1회', price: 20 },
  { id: 'report', name: '브랜드 주간보고서', amount: '매주', price: 0, fixed: true },
]

export type Estimate = {
  picked: EstimateItem[]   // 손님이 고른 항목(고정 항목 제외, 표 순서)
  listTotal: number        // 단품가로 따로 맡기면(초기진단 30만 원 포함)
  subtotal: number         // 고른 항목 단품가 합계(초기진단 무료)
  total: number            // 예상 월 금액
  capped: boolean          // 팀구독 300만 원 적용
  saving: number           // listTotal - total
}

export function computeEstimate(ids: unknown): Estimate {
  const want = new Set(Array.isArray(ids) ? ids.map(String) : [])
  const picked = ESTIMATE_ITEMS.filter(it => !it.fixed && want.has(it.id))
  if (!picked.length) return { picked, listTotal: 0, subtotal: 0, total: 0, capped: false, saving: 0 }
  const subtotal = picked.reduce((s, it) => s + it.price, 0)
  const diag = ESTIMATE_ITEMS.filter(it => it.free).reduce((s, it) => s + it.price, 0)
  const capped = subtotal >= PACKAGE_PRICE
  const total = capped ? PACKAGE_PRICE : subtotal
  const listTotal = subtotal + diag
  return { picked, listTotal, subtotal, total, capped, saving: listTotal - total }
}

const won = (n: number) => n.toLocaleString('ko-KR') + '만 원'

/** 알림 메일·인트라넷 '문의 내용'에 넣는 조합 요약(여러 줄 글) */
export function estimateText(est: Estimate): string {
  const lines = ESTIMATE_ITEMS
    .filter(it => it.fixed || est.picked.includes(it))
    .map(it => `· ${it.name}${it.free ? '' : ` (${it.amount})`} — ${it.free ? '무료 포함' : it.fixed ? '포함' : won(it.price)}`)
  lines.push(`단품가 합계 ${won(est.listTotal)} → 예상 월 ${won(est.total)} (부가세 별도)`)
  if (est.capped) lines.push(`단품가 합계가 ${won(PACKAGE_PRICE)} 이상이라 팀구독 ${won(PACKAGE_PRICE)}(10가지 전부 포함) 적용`)
  return lines.join('\n')
}
