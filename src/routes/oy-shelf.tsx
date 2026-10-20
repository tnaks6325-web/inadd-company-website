// 올리브영 마케팅 히어로(한 바퀴 약 7.5초): '진열 칸이 바뀌는 순간' — 사람 없이, 온라인몰(앱) 카테고리 목록 안에서만.
// 토너·패드 카테고리 2열 목록 속 흐릿한 우리 상품 칸 →
//   ① 썸네일이 갈리며 질감이 보이는 새 썸네일로 → ② 상품명이 구성이 한눈에 보이게 바뀜 → ③ 기획세트·증정 딱지와 할인가 →
//   주변 칸이 흐려지고 우리 칸이 떠오름 → 휴대폰 옆에 조회·담기 수가 오름 → 우리 칸이 목록 맨 앞으로 옮겨감 → 처음으로.
// 리뷰 수·검색 결과는 다른 페이지(리뷰 마케팅·체험단)에서 쓰므로 여기서는 쓰지 않는다.
// 실제 올리브영 로고·화면을 쓰지 않은 가상 쇼핑 앱, 브랜드·상품은 모두 가상. 대가·협찬 표시 문구는 넣지 않는다. 움직임은 oy-shelf.js.
const V = '/static/oy-shelf/'

type Card = { brand: string; name: string; price: string; off?: string; was?: string; flags?: string[]; a: string; img?: string; ph: string }

// 우리 상품: 바뀌기 전(before)과 후(after). img 가 없으면 색 상자 + 이름표
const BRAND = '소담결'
const BEFORE = { name: '토너패드 70매', price: '25,000원', a: '#c9ccd1', img: '', ph: '바뀌기 전 썸네일' }
const AFTER = { name: '[기획] 시카 진정 토너패드 70매+리필 20매 증정', price: '18,900원', off: '24%', was: '25,000원', flags: ['기획세트', '증정', '세일'],
  a: '#8fc46a', img: '', ph: '바뀐 뒤 썸네일' }

// 같은 카테고리의 다른 상품(우리 칸은 6번째 자리에서 시작)
const OTHERS: Card[] = [
  { brand: '온새', name: '각질 결 토너 200ml', price: '16,800원', off: '15%', flags: ['세일'], a: '#d8e8e4', ph: '토너' },
  { brand: '결고운', name: '약산성 토너패드 60매', price: '15,900원', flags: ['증정'], a: '#bcd7ea', ph: '토너패드' },
  { brand: '라온담', name: '수분 미스트 120ml', price: '12,000원', a: '#f2e2c4', ph: '미스트' },
  { brand: '하늬', name: '비타 맑은 토너 250ml', price: '19,800원', off: '10%', flags: ['세일'], a: '#f4c38c', ph: '토너' },
  { brand: '단미', name: '진정 패드 80매', price: '21,000원', flags: ['1+1'], a: '#c9e3d0', ph: '패드' },
  { brand: '모아린', name: '보습 토너 300ml', price: '17,500원', a: '#d9dde6', ph: '토너' },
  { brand: '새결', name: '각질 패드 70매', price: '14,900원', off: '20%', flags: ['세일'], a: '#ecc9bd', ph: '패드' },
]
// 우리 칸이 처음 놓이는 자리(0부터, 왼쪽→오른쪽·위→아래). oy-shelf.js 가 data-from 으로 읽는다
const MY_SLOT = 5

const Thumb = (p: { a: string; img?: string; ph: string; cls?: string }) =>
  <i class={'oys-th' + (p.cls ? ' ' + p.cls : '')} style={`--a:${p.a}` + (p.img ? `;background-image:url(${p.img})` : '')}>{!p.img && <span>{p.ph}</span>}</i>

export const OyShelf = () => (
  <div class="oys" aria-hidden="true" data-oy>
    <div class="oys-stage">
      {/* 휴대폰 옆: 무엇이 바뀌는지 + 조회·담기 수 */}
      <div class="oys-side" data-oy-side>
        <p class="oys-side-k">진열 칸만 바꿨을 때</p>
        <div class="oys-step" data-oy-step><p><mark>썸네일</mark></p><span>제품만 → 질감과 구성이 보이게</span></div>
        <div class="oys-step" data-oy-step><p><mark>상품명</mark></p><span>무엇이 몇 매 들었는지 한눈에</span></div>
        <div class="oys-step" data-oy-step><p><mark>기획 구성</mark></p><span>리필 20매 증정 · 기획 할인가</span></div>
        <div class="oys-nums" data-oy-nums>
          <div><span>조회</span><b data-oy-view>312</b></div>
          <div><span>장바구니 담기</span><b data-oy-cart>41</b></div>
        </div>
      </div>

      <div class="oys-phone" data-oy-phone>
        <div class="oys-scr">
          <div class="oys-status"><b>9:41</b><span>●●● ▮</span></div>
          <div class="oys-bar"><span>←</span><b>스킨케어 · 토너/패드</b><span /></div>
          <div class="oys-cats"><span>전체</span><span>토너</span><b>패드</b><span>미스트</span><span>스킨/토너 세트</span></div>
          <div class="oys-sort"><span>상품 128개</span><b>인기순</b></div>
          <div class="oys-grid" data-oy-grid data-from={MY_SLOT}>
            {OTHERS.map((o) => <div class="oys-card" data-oy-o>
              <Thumb a={o.a} img={o.img} ph={o.ph} />
              <div class="oys-flags">{(o.flags || []).map((f) => <em>{f}</em>)}</div>
              <span class="oys-br">{o.brand}</span><p class="oys-nm">{o.name}</p>
              <p class="oys-pr">{o.off && <u>{o.off}</u>}<b>{o.price}</b></p>
            </div>)}
            <div class="oys-card oys-card--me" data-oy-me>
              <div class="oys-th-wrap">
                <Thumb a={BEFORE.a} img={BEFORE.img} ph={BEFORE.ph} cls="oys-th--before" />
                <span class="oys-th-new" data-oy-thnew><Thumb a={AFTER.a} img={AFTER.img} ph={AFTER.ph} /></span>
                <i class="oys-wipe" data-oy-wipe />
              </div>
              <div class="oys-flags" data-oy-flags>{AFTER.flags.map((f) => <em>{f}</em>)}</div>
              <span class="oys-br">{BRAND}</span><p class="oys-nm oys-nm--me"><span data-oy-nm0>{BEFORE.name}</span><span data-oy-nm1>{AFTER.name}</span></p>
              <p class="oys-pr"><u data-oy-off>{AFTER.off}</u><s data-oy-was>{AFTER.was}</s><b data-oy-price data-after={AFTER.price}>{BEFORE.price}</b></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)
