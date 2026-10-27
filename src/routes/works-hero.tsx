// 포트폴리오 히어로(한 바퀴 약 9.5초): 온라인으로 상품을 파는 커머스 브랜드 대상 — '나 같은 브랜드와 일해 봤나 → 광고가 매출로 이어지나'.
// ① 브랜드 벽: 온라인 판매 브랜드 로고만 네 줄로 흐르고 '함께한 브랜드 N곳'(N = 관리자 등록 사례 수) →
// ② S브랜드 한 달(스포츠웨어 온라인몰 3월→4월): 노출(구글 영상) → 장바구니 → 구매 → 매출(네이버 쇼핑검색)이 한 단계씩 막대로 →
// ③ 인스타그램 광고 전환(실제 수치 받기 전이라 ○○ 자리 표시) →
// ④ H브랜드(가전 리테일): 광고비 +350만 원 → 매출 +1억 410만 원, ROAS 1,095% → 1,373% → 처음으로.
// 숫자는 퍼포먼스 페이지 매체별 성과 레퍼런스(svc-performance-ref.tsx REF_CASES)와 같은 실제 사례. 막대는 결과 다크 블루·이전 값 버터 브라운, 끝에 값을 적는다.
// 로고는 /api/admin/public/works 에서 LOGO_BRANDS 이름과 맞는 것만 가져온다(관리자에 새 사례를 넣어도 이 목록에 없으면 벽에는 안 나옴). 움직임은 works-hero.js.

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

// 인스타그램 광고 전환: 실제 수치를 받으면 채운다(지금은 자리 표시)
const META = [
  { k: '구매 전환', a: '○○', b: '○○건', up: '○○%' },
  { k: 'ROAS', a: '○○%', b: '○○%', up: '○○%p' },
]

export const WorksHero = () => (
  <div class="wkh" aria-hidden="true" data-wkh data-wkh-brands={LOGO_BRANDS.join('|')}>
    <div class="wkh-stage">
      {/* ① 브랜드 벽 */}
      <div class="wkh-sc wkh-wall" data-wkh-wall>
        <p class="wkh-cap">함께한 브랜드 <b><u data-wkh-n>0</u>곳</b></p>
        <div class="wkh-rows">
          {[0, 1, 2, 3].map(r => <div class="wkh-row" data-wkh-row={r}><div class="wkh-track" data-wkh-track /></div>)}
        </div>
      </div>

      {/* ② S브랜드 한 달 */}
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

      {/* ③ 인스타그램 광고 전환(수치 받기 전) */}
      <div class="wkh-sc wkh-card wkh-meta" data-wkh-meta>
        <p class="wkh-card-h"><b>K브랜드</b><span>인스타그램 광고 · 구매 전환</span></p>
        <div class="wkh-feed">
          <p class="wkh-feed-h"><i /><b>k_brand.official</b><span>광고</span></p>
          <div class="wkh-feed-img"><span>상품 이미지</span></div>
          <p class="wkh-feed-cta">구매하기<span>›</span></p>
          <ul class="wkh-buys">{[0, 1, 2].map(() => <li data-wkh-buy>구매 완료</li>)}</ul>
        </div>
        <div class="wkh-meta-nums">
          {META.map(m => (
            <div class="wkh-mn" data-wkh-mn>
              <b>{m.k}</b>
              <p><span>{m.a}</span>→<strong>{m.b}</strong></p>
              <em>{m.up}</em>
            </div>
          ))}
          <p class="wkh-todo">실제 수치 받으면 채움</p>
        </div>
      </div>

      {/* ④ H브랜드 광고비 대비 매출 */}
      <div class="wkh-sc wkh-card wkh-roas" data-wkh-roas>
        <p class="wkh-card-h"><b>H브랜드</b><span>가전 리테일 · 네이버 파워링크 · 6월 → 7월</span></p>
        <div class="wkh-pair">
          <div class="wkh-pair-a"><span>광고비</span><b>+350<small>만 원</small></b></div>
          <i class="wkh-arrow" />
          <div class="wkh-pair-b" data-wkh-rev><span>월 매출</span><b><u data-wkh-rv>0</u><small>만 원</small></b></div>
        </div>
        <div class="wkh-rbar">
          <p><b>ROAS</b><span>광고비 1원당 매출</span></p>
          <div class="wkh-bar wkh-bar--a"><i data-wkh-bar style={`--w:${(1095 / 1373 * 100).toFixed(1)}%`} /><small>6월 1,095%</small></div>
          <div class="wkh-bar wkh-bar--b"><i data-wkh-bar style="--w:100%" /><small>7월 1,373%</small></div>
        </div>
      </div>
    </div>
  </div>
)
