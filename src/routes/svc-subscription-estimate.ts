import { ESTIMATE_ITEMS, PACKAGE_PRICE } from '../lib/subscription-estimate'

const FREE_PRICE = ESTIMATE_ITEMS.filter(it => it.free).reduce((s, it) => s + it.price, 0)

// 마케팅팀 구독 — 견적 조합 화면. 상세페이지 '04 포함 항목' 제목 아래, 예전 포함 항목 표 자리에 끼운다(svc-subscription.tsx).
// 10가지가 모두 담긴 상태(팀구독 300만 원)로 시작해 빼 나가는 방식이다(대표 결정 2026-10-27).
// 상세페이지는 좁은 화면에서 통째로 축소되므로, 이 구획만 축소를 되돌려(.mte zoom) 휴대폰에서도 보통 크기로 보인다.
// 홈 하단 '필요한 것은 무엇인가요?' 에도 같은 조합기를 넣는다(home.tsx, 대표 결정 2026-10-27) — id 가 겹치지 않게 estimateSection() 으로 만든다.
// 동작(합계 계산·제출): public/static/estimate.js · 접수: POST /api/mail/estimate · 모양: public/static/estimate.css 의 .mte-*

// 한 화면에 목록·합계가 다 보이도록 항목마다 한 줄(이름 · 제공량 · 단품가)만 둔다(대표 요청 2026-10-27).
// 항목 설명(note)은 신청 칸 아래 안내문에 모아 둔다.
const row = (it: (typeof ESTIMATE_ITEMS)[number]) => {
  const amount = it.free ? '항상 포함' : it.amount
  const price = it.free ? '<b>무료</b>' : it.fixed ? '<b>포함</b>' : `${it.price}만 원`
  const input = it.fixed
    ? `<input type="checkbox" checked disabled aria-label="${it.name} 항상 포함">`
    : `<input type="checkbox" name="item" value="${it.id}" data-price="${it.price}" checked>`
  return `<label class="mte-item${it.fixed ? ' mte-item--fixed' : ''}">${input}<span class="mte-box" aria-hidden="true"></span>`
    + `<span class="mte-name">${it.name}</span><span class="mte-amount">${amount}</span><span class="mte-price">${price}</span></label>`
}

// 항목 설명은 줄 안에 넣지 않고 여기 한 문장으로(lib 의 note 와 같은 내용)
const NOTES = '퍼포먼스 마케팅은 광고비 월 1,000만 원 한도까지 운영해요'

export type EstimateSource = 'subscription' | 'home'

export const estimateSection = (o: { id: string; labelledBy: string; source: EstimateSource; className?: string; intro?: string }) => `
<section id="${o.id}" data-estimate="1" class="mte-sec${o.className ? ' ' + o.className : ''}" aria-labelledby="${o.labelledBy}">
<div class="mte">
  <form class="mte-form" data-package="${PACKAGE_PRICE}" data-free="${FREE_PRICE}" data-source="${o.source}" novalidate>
    <div class="mte-tools">${o.intro ? `<div class="mte-intro">${o.intro}</div>` : ''}
      <div class="mte-tools-btns">
        <button type="button" data-mte-all>10가지 전부 담기</button>
        <button type="button" data-mte-clear>모두 빼기</button>
      </div>
    </div>
    <div class="mte-list">${ESTIMATE_ITEMS.map(row).join('')}</div>
    <div class="mte-bar" aria-live="polite">
      <div class="mte-bar-row">
        <span class="mte-bar-sub"><span data-mte-count>0</span>개 선택 · 단품가 합계 <s data-mte-list>0만 원</s></span>
        <span class="mte-bar-total">예상 월 <strong data-mte-total>0</strong>만 원 <small>부가세 별도</small></span>
      </div>
      <p class="mte-bar-note" data-mte-note>항목을 골라 주세요.</p>
    </div>
    <div class="mte-fields">
      <div class="mte-fields-title">이 조합으로 상담 신청</div>
      <div class="mte-grid">
        <label class="mte-field"><span>회사/브랜드명 <i>*</i></span><input type="text" name="company" autocomplete="organization" maxlength="100" required></label>
        <label class="mte-field"><span>담당자 이름 <i>*</i></span><input type="text" name="name" autocomplete="name" maxlength="50" required></label>
        <label class="mte-field"><span>연락처 <i>*</i></span><input type="tel" name="phone" inputmode="numeric" autocomplete="tel" maxlength="13" placeholder="010-0000-0000" required></label>
        <label class="mte-field"><span>이메일 <i>*</i></span><input type="email" name="email" autocomplete="email" maxlength="120" required></label>
      </div>
      <label class="mte-field"><span>더 알려 주실 내용</span><textarea name="message" rows="2" maxlength="2000" placeholder="판매 채널, 월 광고비, 고민 중인 점 등"></textarea></label>
      <div class="mte-privacy">
        <label><input type="checkbox" name="privacy" required> 개인정보 수집 및 이용에 동의합니다. <i>*</i></label>
        <button type="button" aria-expanded="false" aria-controls="${o.id}Privacy" data-mte-privacy>내용 보기</button>
      </div>
      <div id="${o.id}Privacy" class="mte-privacy-panel" hidden>
        <p><b>수집 항목</b> 회사/브랜드명, 이름, 연락처, 이메일, 고른 조합, 문의 내용</p>
        <p><b>수집 목적</b> 마케팅 상담 회신, 견적 조합 내역·회사소개서 발송</p>
        <p><b>보유 기간</b> 동의일로부터 1년 보관 후 파기</p>
        <p>동의를 거부할 수 있으며, 거부하면 상담 신청이 제한될 수 있습니다.</p>
      </div>
      <p class="mte-error" data-mte-error role="alert" hidden></p>
      <button type="submit" class="mte-submit">이 조합으로 상담 신청</button>
      <p class="mte-foot">신청하시면 고른 조합과 예상 금액을 메일로 보내 드려요. 최종 금액은 상담에서 브랜드 상황에 맞춰 확정해요.<br>${NOTES}.</p>
    </div>
  </form>
  <div class="mte-done" data-mte-done hidden>
    <div class="mte-done-title">상담 신청이 접수됐어요</div>
    <p>고르신 조합을 <b data-mte-done-email></b> 로 보내 드렸어요.<br>담당자가 확인하고 연락드릴게요.</p>
  </div>
</div>
</section>
`

// 구독 페이지 '04 포함 항목' 자리
export const ESTIMATE_SECTION = estimateSection({ id: 'estimate', labelledBy: 'mteTitle', source: 'subscription' })
