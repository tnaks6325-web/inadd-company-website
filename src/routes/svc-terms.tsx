// 서비스 페이지 '진행 조건' 칸 — 결제 직전 손님이 보는 시작 금액·계약 단위·보고·해지 기준.
// 값은 대표 인터뷰(2026-10-20)로 확정. 금액은 모두 부가세 별도. 바꿀 때는 대표 확인 후.

type PriceRow = { item: string; unit: string; price: string }
type Term = { label: string; text: string }
type SvcTermsData = { lead: string; prices?: PriceRow[]; priceNote?: string; terms: Term[] }

export const SVC_TERMS: Record<string, SvcTermsData> = {
  seeding: {
    lead: '상품별 시작 금액과 진행 기준입니다. 정확한 견적은 인원·채널·제품을 확인한 뒤 드립니다.',
    prices: [
      { item: '네이버 블로그 · 일반 블로거', unit: '10명', price: '20만 원부터' },
      { item: '네이버 블로그 · 특화 블로거', unit: '5명', price: '100만 원부터' },
      { item: '네이버 블로그 · 공략형 체험단', unit: '10명', price: '50만 원부터' },
      { item: '네이버 블로그 · 네이버 인플루언서', unit: '5명', price: '100만 원부터' },
      { item: '인스타그램 · 일반 피드', unit: '10명', price: '20만 원부터' },
      { item: '인스타그램 · 특화 타깃', unit: '10명', price: '50만 원부터' },
    ],
    terms: [
      { label: '진행 기간', text: '캠페인 단위로 진행하며 제품 발송부터 최종 게시까지 평균 4~6주 걸립니다.' },
      { label: '첫 후기', text: '계약 후 1주 안에 첫 후기가 올라옵니다.' },
      { label: '견적에 포함', text: '체험단 모집·선발, 후기 가이드 작성, 원고료(체험단 보상), 게시 확인과 수정 요청, 진행 현황을 보는 전용 웹뷰어' },
      { label: '따로 드는 비용', text: '체험단에게 보내는 제품과 배송비는 브랜드에서 준비합니다.' },
      { label: '선발', text: '인애드컴퍼니가 카테고리·활동 이력 기준으로 선발하고 명단을 공유합니다.' },
      { label: '보고', text: '게시 링크는 실시간 공유 시트로 바로 확인하고 종료 후 성과 리포트를 드립니다.' },
      { label: '중간에 그만둘 때', text: '후기를 올리지 않은 인원은 다른 체험단으로 채우거나 그만큼 환불합니다.' },
      { label: '진행하지 않는 일', text: '병원·의료 체험단은 진행하지 않습니다.' },
    ],
  },
  review: {
    lead: '리뷰 유형별 시작 금액과 진행 기준입니다.',
    prices: [
      { item: '기획형 리뷰', unit: '10건', price: '10만 원부터' },
      { item: '단순 리뷰', unit: '50건', price: '20만 원부터' },
    ],
    terms: [
      { label: '계약 단위', text: '월 단위로 계속 운영합니다.' },
      { label: '첫 리뷰', text: '계약 후 1주 안에 첫 리뷰가 올라옵니다.' },
      { label: '따로 드는 비용', text: '제품·배송비와 구매평에 쓰이는 상품 비용은 금액에 들어 있지 않습니다.' },
      { label: '보고', text: '게시 링크는 실시간 공유 시트로 확인하고 종료 후 성과 리포트를 드립니다.' },
      { label: '중간에 그만둘 때', text: '게시되지 않은 건은 다른 리뷰로 채우거나 그만큼 환불합니다.' },
    ],
  },
  influencer: {
    lead: '크리에이터마다 출연료가 달라서 시작 금액과 진행 기준만 먼저 안내합니다.',
    prices: [{ item: '마이크로 인플루언서', unit: '1명', price: '5만 원부터' }],
    priceNote: '출연료 기준이며 대행 수수료와 부가세는 별도입니다. 수수료는 출연료 규모에 따라 달라지며 견적에서 따로 안내합니다.',
    terms: [
      { label: '진행 기간', text: '기획·섭외·제작·게시까지 보통 3~6주 걸립니다. 급한 캠페인은 2주 안에도 진행합니다.' },
      { label: '따로 드는 비용', text: '크리에이터에게 보내는 제품과 배송비는 브랜드에서 준비합니다.' },
      { label: '보고', text: '게시 후 7일 동안의 조회·반응을 정리한 성과 리포트를 드립니다.' },
      { label: '중간에 그만둘 때', text: '크리에이터와 계약을 마친 뒤에는 취소·환불이 어렵습니다.' },
    ],
  },
  viral: {
    lead: '채널별 시작 금액과 진행 기준입니다.',
    prices: [
      { item: '카페 바이럴', unit: '10건', price: '30만 원부터' },
      { item: '커뮤니티 바이럴', unit: '5건', price: '50만 원부터' },
      { item: '언론 바이럴(기사)', unit: '1건', price: '10만 원부터' },
    ],
    priceNote: 'SNS 바이럴은 인스타그램 체험단·인플루언서 금액을 기준으로 견적을 드립니다. 금액은 부가세 별도입니다.',
    terms: [
      { label: '계약 단위', text: '월 단위로 운영합니다.' },
      { label: '첫 반응', text: '게시 후 48~72시간 안에 초기 반응을 확인하고 검색량·매출 변화는 보통 2~4주 안에 나타납니다.' },
      { label: '보고', text: '게시 링크와 반응은 실시간 공유 시트로 확인합니다.' },
      { label: '중간에 그만둘 때', text: '이미 준비한 원고의 제작비를 빼고 게시하지 않은 건은 환불합니다.' },
    ],
  },
  oliveyoung: {
    lead: '올리브영 마케팅의 시작 금액과 진행 기준입니다.',
    prices: [
      { item: '올리브영 리뷰', unit: '건별', price: '리뷰 마케팅·체험단과 같은 단가' },
      { item: '랭킹 마케팅', unit: '1건', price: '100만 원부터' },
    ],
    terms: [
      { label: '계약 단위', text: '건 단위로 계약합니다.' },
      { label: '첫 변화', text: '랭킹 마케팅은 시작 후 1주 안에 순위 변화를 확인할 수 있습니다.' },
      { label: '보고', text: '노출 성과를 주간 리포트로 드립니다.' },
      { label: '중간에 그만둘 때', text: '게시되지 않은 리뷰는 다른 리뷰로 채우거나 그만큼 환불합니다.' },
    ],
  },
  ppl: {
    lead: 'PPL은 방송사·프로그램·노출 방식에 따라 비용과 일정이 크게 달라 상담 때 안내합니다.',
    terms: [
      { label: '비용', text: '케이블·웹드라마부터 지상파까지, 예산에 맞는 프로그램을 골라 견적을 드립니다.' },
      { label: '방영 일정', text: '프로그램 제작 일정에 따라 다르며 계약 전에 확인해 드립니다.' },
      { label: '보고', text: '방영 후 노출 장면과 결과를 정리한 리포트를 드립니다.' },
      { label: '방영이 바뀔 때', text: '방영 보장과 환불 조항을 계약서에 적어 둡니다.' },
    ],
  },
  subscription: {
    lead: '마케팅팀 구독의 금액과 진행 기준입니다.',
    prices: [{ item: '마케팅팀 구독', unit: '월', price: '300만 원' }],
    terms: [
      { label: '계약 단위', text: '월 단위로 연장하며 다음 달부터 해지할 수 있습니다.' },
      { label: '시작', text: '초기 진단과 세팅을 무료로 진행하고 계약 후 2주 안에 집행을 시작합니다.' },
      { label: '따로 드는 비용', text: '광고비, 체험단 제품·배송비, 구매평에 쓰이는 상품 비용, 촬영 모델·장소 비용' },
      { label: '보고', text: '매주 브랜드 주간보고서를 드립니다.' },
    ],
  },
}

export const SvcTerms = ({ service }: { service: keyof typeof SVC_TERMS }) => {
  const d = SVC_TERMS[service]
  return (
    <section class="section svt-section" id="svc-terms">
      <div class="container">
        <div class="section-head">
          <span class="sec-label">Terms</span>
          <h2 class="sec-title">진행 조건</h2>
          <p class="sec-sub">{d.lead}</p>
        </div>
        {d.prices && (
          <div class="svt-table-wrap">
            <table class="svt-table">
              <thead><tr><th scope="col">상품</th><th scope="col">기준</th><th scope="col">시작 금액</th></tr></thead>
              <tbody>
                {d.prices.map(p => <tr><th scope="row">{p.item}</th><td>{p.unit}</td><td>{p.price}</td></tr>)}
              </tbody>
            </table>
            <p class="svt-note">{d.priceNote ?? '금액은 모두 부가세 별도입니다.'}</p>
          </div>
        )}
        <dl class="svt-terms">
          {d.terms.map(t => <div><dt>{t.label}</dt><dd>{t.text}</dd></div>)}
        </dl>
      </div>
    </section>
  )
}
