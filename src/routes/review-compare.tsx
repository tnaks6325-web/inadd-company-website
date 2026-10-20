// 리뷰 마케팅 히어로(한 바퀴 약 6.2초): 현실 → 앱 → 현실.
// 현실: 소파에서 휴대폰으로 세럼 두 개를 두고 고민 → 휴대폰 화면 속으로.
// 앱: 쇼핑 앱 비교 화면. 왼쪽 'A사 세럼'은 리뷰 3개에 머물고, 오른쪽 '물결랩 히알루 세럼'은 사진 후기가 차오르며 별점·리뷰 수가 오른다 →
//     엄지가 오른쪽 장바구니를 누름 → '장바구니에 담았어요'.
// 현실: 받은 물결랩 세럼을 손등에 덜어 보며 미소.
// 인물은 AI 가상 인물(폼보드 281번, 연한 하늘색 니트), 브랜드는 다른 페이지와 같은 샘플. 왼쪽 상품은 깎아내리지 않게 별점은 무난하게 두고 후기 수만 적게.
// 대가·협찬 표시 문구는 넣지 않는다. 움직임은 review-compare.js.
type Rv = { s: string; by: string; img?: string; ph: string }

// 현실 컷: src 가 있으면 public/static/review-compare/{src}.mp4·.webp, 없으면 img(사진), 그것도 없으면 임시 상자
const REAL: { n: string; label: string; src?: string; img?: string }[] = [
  { n: '고민', label: '소파에서 휴대폰으로 세럼 두 개를 비교하며 고민' },
  { n: '미소', label: '받은 물결랩 세럼을 손등에 덜어 보며 미소' },
]
const A = { name: 'A사 수분 세럼 30ml', price: '26,000원', star: '4.0', n: '3', color: '#d9dde3',
  reviews: ['무난하게 쓰고 있어요', '배송이 빨랐어요', '용량이 적당해요'] }
const B = { name: '물결랩 히알루 세럼 30ml', price: '28,000원', color: '#b9c7e6',
  reviews: [
    { s: '끈적임 없이 촉촉해요', by: 'jin***', ph: '손등에 덜어 낸 세럼' },
    { s: '세안 후 바로 바르기 좋아요', by: 'soo***', ph: '세면대 옆 세럼' },
    { s: '향이 없어서 편해요', by: 'min***', ph: '화장대 위 세럼' },
    { s: '물처럼 가볍게 스며요', by: 'hye***', ph: '스포이드에서 떨어지는 방울' },
    { s: '한 병 다 쓰고 재구매해요', by: 'yun***', ph: '빈 병과 새 병' },
    { s: '민감한 날에도 편했어요', by: 'ara***', ph: '파우치 속 세럼' },
  ] as Rv[] }

const Star = () => <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true"><path fill="#f5b301" d="m12 2.5 2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8z" /></svg>

export const ReviewCompare = () => (
  <div class="rc" aria-hidden="true" data-rc>
    <div class="rc-stage">
      {/* 현실 컷 */}
      <div class="rc-real" data-rc-real>
        {REAL.map((c) => <div class="rc-cut" data-rc-cut>{c.src
          ? <video src={`/static/review-compare/${c.src}.mp4`} poster={`/static/review-compare/${c.src}.webp`} muted playsinline preload="auto" />
          : c.img ? <div class="rc-cut-ph rc-cut-img" style={`background-image:url(/static/review-compare/${c.img}.webp)`} />
          : <div class="rc-cut-ph"><b>{c.n}</b><span>{c.label}</span></div>}</div>)}
      </div>
      {/* 앱: 쇼핑 앱 비교 화면 */}
      <div class="rc-phone" data-rc-phone>
        <div class="rc-scr">
          <div class="rc-status"><b>9:41</b><span>●●● ▮</span></div>
          <div class="rc-bar"><span>←</span><b>상품 비교</b><span /></div>
          <div class="rc-cols">
            <div class="rc-col rc-col--a">
              <div class="rc-img" style={`--a:${A.color}`}><span>A사 세럼</span></div>
              <p class="rc-name">{A.name}</p>
              <p class="rc-price">{A.price}</p>
              <p class="rc-rate"><Star /> <b>{A.star}</b> <i>리뷰 {A.n}</i></p>
              <div class="rc-revs">{A.reviews.map((r) => <div class="rc-tx"><Star /><Star /><Star /><Star /><span>{r}</span></div>)}</div>
            </div>
            <div class="rc-col rc-col--b" data-rc-b>
              <div class="rc-img rc-img--b" style={`--a:${B.color}`}><span>물결랩 세럼</span></div>
              <p class="rc-name">{B.name}</p>
              <p class="rc-price">{B.price}</p>
              <p class="rc-rate"><Star /> <b data-rc-star>4.9</b> <i>리뷰 <em data-rc-n>1,284</em></i></p>
              <div class="rc-revs rc-revs--b"><div class="rc-track" data-rc-track>
                {B.reviews.map((r) => <div class="rc-pr"><div class="rc-pr-img" style={`--a:${B.color}` + (r.img ? `;background-image:url(${r.img})` : '')}>{!r.img && <span>{r.ph}</span>}</div><div><p><Star /><Star /><Star /><Star /><Star /></p><span>{r.s}</span><i>{r.by}</i></div></div>)}
              </div></div>
            </div>
          </div>
          <div class="rc-btns"><span class="rc-btn">장바구니</span><span class="rc-btn rc-btn--b" data-rc-cart>장바구니</span></div>
          <div class="rc-toast" data-rc-toast>장바구니에 담았어요</div>
          <i class="rc-touch" data-rc-touch />
        </div>
      </div>
    </div>
  </div>
)
