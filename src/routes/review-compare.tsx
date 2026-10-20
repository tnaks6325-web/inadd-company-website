// 리뷰 마케팅 히어로(한 바퀴 약 7초): '리뷰가 다음 선택을 만든다' — 현실 → 앱 → 현실 → 앱.
// 현실: 소파에서 휴대폰으로 세럼 두 개를 두고 고민 → 휴대폰 화면 속으로.
// 앱: 쇼핑 앱 비교 화면. 왼쪽 'A사 세럼'은 리뷰 3개에 머물고, 오른쪽 '물결랩 히알루 세럼'은 사진 후기가 차오르며 별점·리뷰 수가 오른다 →
//     엄지가 오른쪽 장바구니를 누름 → '장바구니에 담았어요'.
// 현실: 받은 물결랩 세럼을 손등에 덜어 보며 미소.
// 앱: 직접 리뷰를 씀(별 5개 → 한 줄 → 사진 → 등록) → 비교 화면 맨 위에 그 리뷰가 '방금 전'으로 뜸(다음 사람이 보게 될 리뷰) → 처음으로.
// 인물은 AI 가상 인물(폼보드 281번, 연한 하늘색 니트), 브랜드는 다른 페이지와 같은 샘플. 왼쪽 상품은 깎아내리지 않게 별점은 무난하게 두고 후기 수만 적게.
// 대가·협찬 표시 문구는 넣지 않는다. 움직임은 review-compare.js.
type Rv = { s: string; by: string; img?: string; ph: string }

// 현실 컷: src 가 있으면 public/static/review-compare/{src}.mp4·.webp, 없으면 img(사진), 그것도 없으면 임시 상자
// zo = 휴대폰 화면 속으로 다가갈 때 확대 중심(사진 속 휴대폰 위치)
const REAL: { n: string; label: string; src?: string; img?: string; zo?: string }[] = [
  { n: '고민', label: '소파에서 휴대폰으로 세럼 두 개를 비교하며 고민', img: 'think', zo: '67.5% 50.6%' },
  { n: '미소', label: '받은 물결랩 세럼을 손등에 덜어 보며 미소', img: 'smile' },
]
const A = { img: '/static/review-compare/prod-a.webp', name: 'A사 수분 세럼 30ml', price: '26,000원', star: '4.0', n: '3', color: '#d9dde3',
  reviews: ['무난하게 쓰고 있어요', '배송이 빨랐어요', '용량이 적당해요'] }
const B = { img: '/static/review-compare/prod-b.webp', name: '물결랩 히알루 세럼 30ml', price: '28,000원', color: '#b9c7e6',
  reviews: [
    { s: '끈적임 없이 촉촉해요', by: 'jin***', ph: '손등에 덜어 낸 세럼', img: '/static/review-compare/rv-0.webp' },
    { s: '오후까지 안 당겨요', by: 'soo***', ph: '세면대 옆 세럼', img: '/static/review-compare/rv-1.webp' },
    { s: '예민한 날에도 손이 가요', by: 'min***', ph: '화장대 위 세럼', img: '/static/review-compare/rv-2.webp' },
    { s: '물처럼 가볍게 스며요', by: 'hye***', ph: '스포이드에서 떨어지는 방울', img: '/static/review-compare/rv-3.webp' },
    { s: '같은 걸로 다시 샀어요', by: 'yun***', ph: '빈 병과 새 병', img: '/static/review-compare/rv-4.webp' },
    { s: '민감한 날에도 편했어요', by: 'ara***', ph: '파우치 속 세럼', img: '/static/review-compare/rv-5.webp' },
  ] as Rv[] }

// 휴대폰 옆 인용(말풍선 대신 지면 주석처럼): 앱 속 후기 한 줄에 형광펜이 그어지는 순간, 그 구절을 옆에 옮겨 적는다.
// 장식(이모지·유리 카드·별 남발) 없이 글자·가는 선·형광펜만. rv = 오른쪽 후기 목록의 몇 번째 후기와 연결되는지.
const NOTES = [
  { rv: 1, top: 150, pre: '세안하고 바로 바르면 ', hl: '오후까지 안 당겨요', meta: 'soo*** · 복합성 · 3주째' },
  { rv: 2, top: 290, pre: '향이 없어서 ', hl: '예민한 날에도 손이 가요', meta: 'min*** · 민감성' },
  { rv: 4, top: 430, pre: '한 병 다 쓰고 ', hl: '같은 걸로 다시 샀어요', meta: 'yun*** · 재구매' },
]

// 인물이 직접 쓰는 리뷰(끝에서 비교 화면 맨 위에 뜬다)
const MINE = { s: '세안하고 바로 발라도 끈적이지 않아요', hl: '끈적이지 않아요', by: 'ha***', ph: '손등에 덜어 낸 세럼', img: '/static/review-compare/rv-mine.webp' }

const Star = () => <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true"><path fill="#f5b301" d="m12 2.5 2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8z" /></svg>

export const ReviewCompare = () => (
  <div class="rc" aria-hidden="true" data-rc>
    <div class="rc-stage">
      {/* 현실 컷 */}
      <div class="rc-real" data-rc-real>
        {REAL.map((c) => <div class="rc-cut" data-rc-cut data-zo={c.zo}>{c.src
          ? <video src={`/static/review-compare/${c.src}.mp4`} poster={`/static/review-compare/${c.src}.webp`} muted playsinline preload="auto" />
          : c.img ? <div class="rc-cut-ph rc-cut-img" style={`background-image:url(/static/review-compare/${c.img}.webp)`} />
          : <div class="rc-cut-ph"><b>{c.n}</b><span>{c.label}</span></div>}</div>)}
      </div>
      {/* 휴대폰 옆 인용 */}
      {NOTES.map((n) => <div class="rc-note" data-rc-note data-rv={n.rv} style={`top:${n.top}px`}><p>“{n.pre}<mark>{n.hl}</mark>”</p><span>{n.meta}</span></div>)}
      <div class="rc-note" data-rc-mnote style="top:150px"><p>“{MINE.s.replace(MINE.hl, '')}<mark>{MINE.hl}</mark>”</p><span>{MINE.by} · 방금 전 · 다음 사람이 보게 될 리뷰</span></div>
      {/* 앱: 쇼핑 앱 비교 화면 */}
      <div class="rc-phone" data-rc-phone>
        <div class="rc-scr">
          <div class="rc-status"><b>9:41</b><span>●●● ▮</span></div>
          <div class="rc-bar"><span>←</span><b>상품 비교</b><span /></div>
          <div class="rc-cols">
            <div class="rc-col rc-col--a">
              <div class="rc-img" style={`--a:${A.color};background-image:url(${A.img})`} />
              <p class="rc-name">{A.name}</p>
              <p class="rc-price">{A.price}</p>
              <p class="rc-rate"><Star /> <b>{A.star}</b> <i>리뷰 {A.n}</i></p>
              <div class="rc-revs">{A.reviews.map((r) => <div class="rc-tx"><Star /><Star /><Star /><Star /><span>{r}</span></div>)}</div>
            </div>
            <div class="rc-col rc-col--b" data-rc-b>
              <div class="rc-img rc-img--b" style={`--a:${B.color};background-image:url(${B.img})`} />
              <p class="rc-name">{B.name}</p>
              <p class="rc-price">{B.price}</p>
              <p class="rc-rate"><Star /> <b data-rc-star>4.9</b> <i>리뷰 <em data-rc-n>1,284</em></i></p>
              <div class="rc-revs rc-revs--b"><div class="rc-track" data-rc-track>
                <div class="rc-pr is-mine" data-rc-mine><div class="rc-pr-img" style={`--a:${B.color};background-image:url(${MINE.img})`} /><div><p><Star /><Star /><Star /><Star /><Star /></p><span>{MINE.s.replace(MINE.hl, '')}<mark>{MINE.hl}</mark></span><i>{MINE.by} · 방금 전</i></div></div>
                {B.reviews.map((r) => <div class="rc-pr"><div class="rc-pr-img" style={`--a:${B.color}` + (r.img ? `;background-image:url(${r.img})` : '')}>{!r.img && <span>{r.ph}</span>}</div><div><p><Star /><Star /><Star /><Star /><Star /></p><span><mark>{r.s}</mark></span><i>{r.by}</i></div></div>)}
              </div></div>
            </div>
          </div>
          <div class="rc-btns"><span class="rc-btn">장바구니</span><span class="rc-btn rc-btn--b" data-rc-cart>장바구니</span></div>
          <div class="rc-toast" data-rc-toast>장바구니에 담았어요</div>
          {/* 리뷰 쓰기 화면 */}
          <div class="rc-wr" data-rc-wr>
            <div class="rc-status"><b>9:41</b><span>●●● ▮</span></div>
            <div class="rc-bar"><span>←</span><b>리뷰 쓰기</b><span /></div>
            <div class="rc-wr-prod"><i style={`--a:${B.color};background-image:url(${B.img})`} /><div><b>{B.name}</b><span>배송 완료</span></div></div>
            <p class="rc-wr-q">상품은 어떠셨나요?</p>
            <div class="rc-wr-stars" data-rc-wstars><Star /><Star /><Star /><Star /><Star /></div>
            <div class="rc-wr-box"><span data-rc-wtxt>{MINE.s}</span><i class="rc-caret" /></div>
            <div class="rc-wr-photos"><i class="rc-wr-add">+ 사진</i><i class="rc-wr-ph" data-rc-wph style={`--a:${B.color};background-image:url(${MINE.img})`} /></div>
            <span class="rc-wr-go" data-rc-wgo>등록하기</span>
          </div>
          <i class="rc-touch" data-rc-touch />
        </div>
      </div>
    </div>
  </div>
)
