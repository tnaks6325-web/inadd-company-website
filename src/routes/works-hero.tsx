// 포트폴리오 히어로(한 바퀴 약 9.6초): 온라인으로 상품을 파는 커머스 브랜드 대상 — '광고를 본 손님이 사고, 주문이 몰리고, 매출이 오른다'.
// ① 현실(지하철): 인스타그램을 넘기던 휴대폰 → 카메라가 기울어진 휴대폰을 세우며 화면 속으로 →
// ② 화면: 인스타그램 피드 광고(스포츠웨어) → '구매하기' → 결제 완료(메타 광고 전환을 장면으로) →
// ③ 현실(브랜드 쪽): 송장 프린터에서 송장이 줄줄이 나오고 택배 상자가 쌓임 →
// ④ S브랜드 한 달(스포츠웨어 온라인몰 3월→4월): 노출(구글 영상) → 장바구니 → 구매 → 매출(네이버 쇼핑검색) 막대 →
// ⑤ H브랜드(가전 리테일): 광고비 +350만 원 → 매출 +1억 410만 원, ROAS 1,095% → 1,373% →
// ⑥ 브랜드 벽: 온라인 판매 브랜드 로고가 흐르고 '함께한 브랜드 N곳'(N = 관리자 등록 사례 수) → 처음으로.
// ④⑤ 숫자는 퍼포먼스 페이지 매체별 성과 레퍼런스(svc-performance-ref.tsx REF_CASES)와 같은 실제 사례. 막대는 결과 다크 블루·이전 값 버터 브라운, 끝에 값을 적는다.
// ①②③ 인물·상품·계정은 AI 가상(실존 인물·브랜드 아님, 인스타그램 로고 없음): subway.webp(nano_banana b6916326), printer.webp(81922ecd), product.webp(9cf93b4d).
// 로고는 /api/admin/public/works 에서 LOGO_BRANDS 이름과 맞는 것만 가져온다(관리자에 새 사례를 넣어도 이 목록에 없으면 벽에는 안 나옴). 움직임은 works-hero.js.
const V = '/static/works-hero/'

// 로고 벽에 넣을 온라인 판매 브랜드(관리자 사례의 brand 값과 똑같이)
export const LOGO_BRANDS = [
  'SNP', '블라이드', '딘토', '베베숲', '릴리바이레드', '엘라비에', '오가닉그라운드', '아우라코스메틱', '메디테라피',
  '마이노멀', '비타글로리', '솔가원', '대한농부', '디펜드',
  '템퍼', '장수돌침대', '숙면연구소', '노송가구', '웰크론', 'LG전자', 'TP-Link',
  '마이클코어스', '마이펫닥터', '어바웃펫',
]

// S브랜드 한 달: 이전(3월)·이후(4월), 막대 길이는 단계마다 이후 값을 꽉 채운 기준
const FUNNEL = [
  { k: '노출', ch: '구글 영상 광고', a: '52만', b: '317만 회', r: 52 / 317, up: '6.1배' },
  { k: '장바구니', ch: '네이버 쇼핑검색', a: '1,178', b: '3,144건', r: 1178 / 3144, up: '+167%' },
  { k: '구매', ch: '네이버 쇼핑검색', a: '326', b: '568건', r: 326 / 568, up: '+74%' },
  { k: '매출', ch: '네이버 쇼핑검색', a: '4,436만', b: '6,975만 원', r: 4436 / 6975, up: '+57%' },
]

// 휴대폰 화면: 인스타그램 피드 광고(사진 속 휴대폰과 큰 휴대폰에 똑같이 그린다) + 결제 화면(큰 휴대폰만)
const Feed = ({ full }: { full?: boolean }) => (
  <div class="wkh-scr">
    <p class="wkh-stat"><b>9:41</b><i /></p>
    <div class="wkh-feed">
      <p class="wkh-fd-h"><i /><span><b>activ.wear</b><small>광고</small></span><em>···</em></p>
      <div class="wkh-fd-img" style={`background-image:url(${V}product.webp)`} />
      <p class="wkh-fd-cta" data-wkh-cta>구매하기<span>›</span></p>
      <p class="wkh-fd-act"><i class="h" /><i class="c" /><i class="s" /></p>
      <p class="wkh-fd-tx"><b>activ.wear</b> 땀 차지 않는 운동복 셋업, 오늘 주문하면 내일 도착</p>
    </div>
    {full && (
      <div class="wkh-pay" data-wkh-pay>
        <p class="wkh-pay-h">주문하기</p>
        <div class="wkh-pay-item"><i style={`background-image:url(${V}product.webp)`} /><span><b>운동복 셋업 2종</b><small>세이지 그린 · M</small></span></div>
        <p class="wkh-pay-btn" data-wkh-paybtn>결제하기</p>
        <div class="wkh-done" data-wkh-done><i /><b>결제 완료</b><small>주문이 접수됐어요</small></div>
      </div>
    )}
    {full && <i class="wkh-tap" data-wkh-tap />}
  </div>
)

export const WorksHero = () => (
  <div class="wkh" aria-hidden="true" data-wkh data-wkh-brands={LOGO_BRANDS.join('|')}>
    <div class="wkh-stage">
      {/* ① 현실: 지하철에서 인스타그램 */}
      <div class="wkh-real" data-wkh-real="0">
        <div class="wkh-cut" data-wkh-cut style={`background-image:url(${V}subway.webp)`}>
          <div class="wkh-pscr" data-wkh-pscr><Feed /></div>
        </div>
      </div>

      {/* ② 큰 휴대폰: 피드 광고 → 구매하기 → 결제 완료 */}
      <div class="wkh-ph" data-wkh-ph><Feed full /></div>

      {/* ③ 현실: 브랜드 쪽 송장 프린터 */}
      <div class="wkh-real" data-wkh-real="1">
        <div class="wkh-cut" data-wkh-cut style={`background-image:url(${V}printer.webp)`} />
      </div>

      {/* ④ S브랜드 한 달 */}
      <div class="wkh-sc wkh-card" data-wkh-fun>
        <p class="wkh-card-h"><b>S브랜드</b><span>스포츠웨어 온라인몰 · 3월 → 4월</span></p>
        {FUNNEL.map(f => (
          <div class="wkh-step" data-wkh-step>
            <p class="wkh-step-h"><b>{f.k}</b><span>{f.ch}</span><em>{f.up}</em></p>
            <div class="wkh-bar wkh-bar--a"><i data-wkh-bar style={`--w:${(f.r * 100).toFixed(1)}%`} /><small>3월 {f.a}</small></div>
            <div class="wkh-bar wkh-bar--b"><i data-wkh-bar style="--w:100%" /><small>4월 {f.b}</small></div>
          </div>
        ))}
      </div>

      {/* ⑤ H브랜드 광고비 대비 매출 */}
      <div class="wkh-sc wkh-card wkh-roas" data-wkh-roas>
        <p class="wkh-card-h"><b>H브랜드</b><span>가전 리테일 · 네이버 파워링크 · 6월 → 7월</span></p>
        <div class="wkh-pair">
          <div class="wkh-pair-a"><span>광고비</span><b>+350<small>만 원</small></b></div>
          <i class="wkh-arrow" />
          <div class="wkh-pair-b"><span>월 매출</span><b><u data-wkh-rv>0</u><small>만 원</small></b></div>
        </div>
        <div class="wkh-rbar">
          <p><b>ROAS</b><span>광고비 1원당 매출</span></p>
          <div class="wkh-bar wkh-bar--a"><i data-wkh-bar style={`--w:${(1095 / 1373 * 100).toFixed(1)}%`} /><small>6월 1,095%</small></div>
          <div class="wkh-bar wkh-bar--b"><i data-wkh-bar style="--w:100%" /><small>7월 1,373%</small></div>
        </div>
      </div>

      {/* ⑥ 브랜드 벽 */}
      <div class="wkh-sc wkh-wall" data-wkh-wall>
        <p class="wkh-cap">함께한 브랜드 <b><u data-wkh-n>0</u>곳</b></p>
        <div class="wkh-rows">
          {[0, 1, 2, 3].map(r => <div class="wkh-row" data-wkh-row={r}><div class="wkh-track" data-wkh-track /></div>)}
        </div>
      </div>
    </div>
  </div>
)
