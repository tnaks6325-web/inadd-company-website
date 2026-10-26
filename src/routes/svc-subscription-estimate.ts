import { ESTIMATE_ITEMS, PACKAGE_PRICE } from '../lib/subscription-estimate'

const FREE_PRICE = ESTIMATE_ITEMS.filter(it => it.free).reduce((s, it) => s + it.price, 0)

// 마케팅팀 구독 — 견적 조합 화면. 상세페이지 '04 포함 항목' 바로 아래에 끼운다(svc-subscription.tsx).
// 상세페이지는 좁은 화면에서 통째로 축소되므로, 이 구획만 축소를 되돌려(.mte zoom) 휴대폰에서도 보통 크기로 보인다.
// 동작(합계 계산·제출): public/static/subscription/subscription.js · 접수: POST /api/mail/estimate · 모양: subscription.css 의 .mte-*

const row = (it: (typeof ESTIMATE_ITEMS)[number]) => {
  const price = it.free
    ? `<s>${it.price}만 원</s>`
    : it.fixed ? '<b>포함</b>' : `${it.price}만 원`
  const input = it.fixed
    ? `<input type="checkbox" checked disabled aria-label="${it.name} 항상 포함">`
    : `<input type="checkbox" name="item" value="${it.id}" data-price="${it.price}">`
  return `<label class="mte-item${it.fixed ? ' mte-item--fixed' : ''}">${input}<span class="mte-box" aria-hidden="true"></span>`
    + `<span class="mte-name">${it.name}${it.fixed ? '<em>항상 포함</em>' : ''}${it.note ? `<small>${it.note}</small>` : ''}</span>`
    + `<span class="mte-amount">${it.amount}</span><span class="mte-price">${price}</span></label>`
}

export const ESTIMATE_SECTION = `
<section id="estimate" data-estimate="1" class="mte-sec" aria-labelledby="mteTitle">
<div class="mte">
  <h2 id="mteTitle" class="mte-title">필요한 것만 골라<br>견적을 직접 맞춰 보세요</h2>
  <p class="mte-lead">항목을 고르면 예상 월 금액이 바로 바뀌어요. <br>단품가 합계가 ${PACKAGE_PRICE}만 원을 넘으면 10가지가 다 들어간 팀구독 ${PACKAGE_PRICE}만 원으로 계산해요.</p>
  <form id="mteForm" class="mte-form" data-package="${PACKAGE_PRICE}" data-free="${FREE_PRICE}" novalidate>
    <div class="mte-tools">
      <button type="button" data-mte-all>10가지 전부 담기</button>
      <button type="button" data-mte-clear>모두 빼기</button>
    </div>
    <div class="mte-list">${ESTIMATE_ITEMS.map(row).join('')}</div>
    <div class="mte-bar" aria-live="polite">
      <div class="mte-bar-row">
        <span class="mte-bar-sub"><span data-mte-count>0</span>개 선택 · 단품가 합계 <s data-mte-list>0만 원</s></span>
        <span class="mte-bar-total">예상 월 <strong data-mte-total>0</strong>만 원 <small>부가세 별도</small></span>
      </div>
      <p class="mte-bar-note" data-mte-note>위에서 항목을 골라 주세요.</p>
    </div>
    <div class="mte-fields">
      <div class="mte-fields-title">이 조합으로 상담 신청</div>
      <div class="mte-grid">
        <label class="mte-field"><span>회사/브랜드명 <i>*</i></span><input type="text" name="company" autocomplete="organization" maxlength="100" required></label>
        <label class="mte-field"><span>담당자 이름 <i>*</i></span><input type="text" name="name" autocomplete="name" maxlength="50" required></label>
        <label class="mte-field"><span>연락처 <i>*</i></span><input type="tel" name="phone" autocomplete="tel" maxlength="30" placeholder="010-0000-0000" required></label>
        <label class="mte-field"><span>이메일 <i>*</i></span><input type="email" name="email" autocomplete="email" maxlength="120" required></label>
      </div>
      <label class="mte-field"><span>더 알려 주실 내용</span><textarea name="message" rows="3" maxlength="2000" placeholder="판매 채널, 지금 쓰는 월 광고비, 고민 중인 점 등"></textarea></label>
      <div class="mte-privacy">
        <label><input type="checkbox" name="privacy" required> 개인정보 수집 및 이용에 동의합니다. <i>*</i></label>
        <button type="button" aria-expanded="false" aria-controls="mtePrivacy" data-mte-privacy>내용 보기</button>
      </div>
      <div id="mtePrivacy" class="mte-privacy-panel" hidden>
        <p><b>수집 항목</b> 회사/브랜드명, 이름, 연락처, 이메일, 고른 조합, 문의 내용</p>
        <p><b>수집 목적</b> 마케팅 상담 회신, 견적 조합 내역·회사소개서 발송</p>
        <p><b>보유 기간</b> 동의일로부터 1년 보관 후 파기</p>
        <p>동의를 거부할 수 있으며, 거부하면 상담 신청이 제한될 수 있습니다.</p>
      </div>
      <p class="mte-error" data-mte-error role="alert" hidden></p>
      <button type="submit" class="mte-submit">이 조합으로 상담 신청</button>
      <p class="mte-foot">신청하시면 고른 조합과 예상 금액을 메일로 보내 드려요. 최종 금액은 상담에서 브랜드 상황에 맞춰 확정해요.<br>광고비, 체험단 제품·배송비, 촬영 모델·장소 비용은 별도예요.</p>
    </div>
  </form>
  <div class="mte-done" data-mte-done hidden>
    <div class="mte-done-title">상담 신청이 접수됐어요</div>
    <p>고르신 조합을 <b data-mte-done-email></b> 로 보내 드렸어요.<br>담당자가 확인하고 연락드릴게요.</p>
  </div>
</div>
</section>
`
