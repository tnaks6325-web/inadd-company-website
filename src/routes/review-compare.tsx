// 리뷰 마케팅 히어로(한 바퀴 약 11.7초): '리뷰가 다음 선택을 만든다' — 현실 → 앱 → 현실 → 앱 → 여러 소비자.
// 현실: 소파에서 휴대폰으로 세럼 두 개를 두고 고민 → 카메라가 천천히 시작해 점점 빠르게 돌아 휴대폰 화면 속으로 빨려 들어감
//       (영상 끝 = 손에 든 휴대폰 속 앱 화면).
// 앱: 쇼핑 앱 비교 화면. 왼쪽 'A사 세럼'(★3.0·리뷰 23) 후기를 스크롤하며 고민 → 왼쪽이 흐려지며 이탈 →
//     오른쪽 '물결랩 히알루 세럼'에 사진 후기가 차오르며 별점·리뷰 수가 오름 → 오른쪽에 결정 강조 → 장바구니 → 구매하기 → 결제 → 구매 완료.
// 현실: 택배에서 꺼낸 물결랩 세럼 → 클로즈업으로 볼에 한 방울 떨어뜨리고 손끝으로 굴려 바르며 미소.
// 앱: 직접 리뷰를 씀(별 5개 → 한 줄 → 사진 → 등록) → 비교 화면 맨 위에 그 리뷰가 '방금 전'으로 뜸(다음 사람이 보게 될 리뷰).
// 마지막: 여러 소비자(사무실·카페·부엌·지하철·침실·거실)가 같은 순간 오른쪽 상품을 고르고 '구매 완료'가 여기저기 뜸 → 처음으로.
// 인물은 모두 AI 가상 인물(리뷰어는 폼보드 281번, 연한 하늘색 니트), 브랜드는 다른 페이지와 같은 샘플. 왼쪽 'A사'는 실제 상표가 아닌 가상 상품.
// 대가·협찬 표시 문구는 넣지 않는다. 움직임은 review-compare.js.
type Rv = { s: string; by: string; img?: string; ph: string }
const V = '/static/review-compare/'

// 현실 컷: src 가 있으면 public/static/review-compare/{src}.mp4·.webp, 없으면 img(사진), 그것도 없으면 임시 상자
const REAL: { n: string; label: string; src?: string; img?: string }[] = [
  { n: '고민', label: '고민 → 카메라가 돌아 휴대폰 화면 속으로', src: 'dive' },
  { n: '개봉', label: '택배에서 꺼낸 물결랩 세럼', src: 'smile' },
  { n: '볼', label: '볼에 한 방울 떨어뜨리고 손끝으로 굴려 바르며 미소', src: 'cheek' },
]
const A = { img: V + 'prod-a.webp', name: 'A사 수분 세럼 30ml', price: '26,000원', star: '3.0', n: '23',
  reviews: ['기대보다 평범해요', '흡수가 조금 느려요', '보통이에요', '향이 살짝 있어요', '무난하게 쓰고 있어요', '배송은 빨랐어요', '용량은 적당해요'] }
const B = { img: V + 'prod-b.webp', name: '물결랩 히알루 세럼 30ml', price: '28,000원', color: '#b9c7e6',
  reviews: [
    { s: '끈적임 없이 촉촉해요', by: 'jin***', ph: '손등에 덜어 낸 세럼', img: V + 'rv-0.webp' },
    { s: '오후까지 안 당겨요', by: 'soo***', ph: '세면대 옆 세럼', img: V + 'rv-1.webp' },
    { s: '예민한 날에도 손이 가요', by: 'min***', ph: '화장대 위 세럼', img: V + 'rv-2.webp' },
    { s: '물처럼 가볍게 스며요', by: 'hye***', ph: '스포이드에서 떨어지는 방울', img: V + 'rv-3.webp' },
    { s: '같은 걸로 다시 샀어요', by: 'yun***', ph: '빈 병과 새 병', img: V + 'rv-4.webp' },
    { s: '민감한 날에도 편했어요', by: 'ara***', ph: '파우치 속 세럼', img: V + 'rv-5.webp' },
  ] as Rv[] }

// 휴대폰 옆 인용(말풍선 대신 지면 주석처럼): 앱 속 후기 한 줄에 형광펜이 그어지는 순간, 그 구절을 옆에 옮겨 적는다.
// 장식(이모지·유리 카드·별 남발) 없이 글자·가는 선·형광펜만. rv = 오른쪽 후기 목록의 몇 번째 후기와 연결되는지.
const NOTES = [
  { rv: 1, top: 150, pre: '세안하고 바로 바르면 ', hl: '오후까지 안 당겨요', meta: 'soo*** · 복합성 · 3주째' },
  { rv: 2, top: 290, pre: '향이 없어서 ', hl: '예민한 날에도 손이 가요', meta: 'min*** · 민감성' },
  { rv: 4, top: 430, pre: '한 병 다 쓰고 ', hl: '같은 걸로 다시 샀어요', meta: 'yun*** · 재구매' },
]

// 인물이 직접 쓰는 리뷰(끝에서 비교 화면 맨 위에 뜬다)
const MINE = { s: '세안하고 바로 발라도 끈적이지 않아요', hl: '끈적이지 않아요', by: 'ha***', ph: '손등에 덜어 낸 세럼', img: V + 'rv-mine.webp' }

// 마지막 장면: 같은 순간 오른쪽 상품을 고르는 여러 소비자(각자 휴대폰을 누르는 짧은 영상, 폼보드 12·50·176·284·219·85번)
const CROWD = ['crowd-1', 'crowd-2', 'crowd-3', 'crowd-4', 'crowd-5', 'crowd-6']

const Star = () => <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true"><path fill="#f5b301" d="m12 2.5 2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8z" /></svg>
const Stars = (p: { n: number }) => <>{Array.from({ length: p.n }, () => <Star />)}</>
const Check = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m5 12.5 4.2 4.2L19 7" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" /></svg>

export const ReviewCompare = () => (
  <div class="rc" aria-hidden="true" data-rc>
    <div class="rc-stage">
      {/* 현실 컷 */}
      <div class="rc-real" data-rc-real>
        {REAL.map((c) => <div class="rc-cut" data-rc-cut>{c.src
          ? <video src={`${V}${c.src}.mp4`} poster={`${V}${c.src}.webp`} muted playsinline preload="auto" />
          : c.img ? <div class="rc-cut-ph rc-cut-img" style={`background-image:url(${V}${c.img}.webp)`} />
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
            <div class="rc-col rc-col--a" data-rc-a>
              <div class="rc-img" style={`background-image:url(${A.img})`} />
              <p class="rc-name">{A.name}</p>
              <p class="rc-price">{A.price}</p>
              <p class="rc-rate"><Star /> <b>{A.star}</b> <i>리뷰 {A.n}</i></p>
              <div class="rc-revs"><div class="rc-track" data-rc-atrack>{A.reviews.map((r) => <div class="rc-tx"><p><Stars n={3} /></p><span>{r}</span></div>)}</div></div>
            </div>
            <div class="rc-col rc-col--b" data-rc-b>
              <div class="rc-img rc-img--b" style={`background-image:url(${B.img})`} />
              <p class="rc-name">{B.name}</p>
              <p class="rc-price">{B.price}</p>
              <p class="rc-rate"><Star /> <b data-rc-star>4.9</b> <i>리뷰 <em data-rc-n>1,284</em></i></p>
              <div class="rc-revs rc-revs--b"><div class="rc-track" data-rc-track>
                <div class="rc-pr is-mine" data-rc-mine><div class="rc-pr-img" style={`--a:${B.color};background-image:url(${MINE.img})`} /><div><p><Stars n={5} /></p><span>{MINE.s.replace(MINE.hl, '')}<mark>{MINE.hl}</mark></span><i>{MINE.by} · 방금 전</i></div></div>
                {B.reviews.map((r) => <div class="rc-pr"><div class="rc-pr-img" style={`--a:${B.color}` + (r.img ? `;background-image:url(${r.img})` : '')}>{!r.img && <span>{r.ph}</span>}</div><div><p><Stars n={5} /></p><span><mark>{r.s}</mark></span><i>{r.by}</i></div></div>)}
              </div></div>
            </div>
          </div>
          <div class="rc-btns" data-rc-btns><span class="rc-btn">장바구니</span><span class="rc-btn rc-btn--b" data-rc-cart>장바구니</span></div>
          <div class="rc-btns rc-btns--buy" data-rc-buybar><span class="rc-btn rc-btn--b" data-rc-buy>구매하기 · {B.price}</span></div>
          <div class="rc-toast" data-rc-toast>장바구니에 담았어요</div>
          {/* 결제 시트 */}
          <div class="rc-sheet" data-rc-sheet>
            <b class="rc-sheet-t">결제하기</b>
            <div class="rc-sheet-row"><i style={`background-image:url(${B.img})`} /><span>{B.name}</span><b>{B.price}</b></div>
            <div class="rc-sheet-kv"><span>결제 수단</span><b>간편결제 · 카드</b></div>
            <div class="rc-sheet-kv"><span>결제 금액</span><b>{B.price}</b></div>
            <span class="rc-sheet-go" data-rc-pay>{B.price} 결제하기</span>
          </div>
          {/* 구매 완료 화면 */}
          <div class="rc-done" data-rc-done>
            <i class="rc-done-ok"><Check /></i>
            <b>주문이 완료되었어요</b>
            <div class="rc-done-row"><i style={`background-image:url(${B.img})`} /><div><span>{B.name}</span><b>{B.price} 결제 완료</b></div></div>
            <p>도착 예정 · 모레</p>
          </div>
          {/* 리뷰 쓰기 화면 */}
          <div class="rc-wr" data-rc-wr>
            <div class="rc-status"><b>9:41</b><span>●●● ▮</span></div>
            <div class="rc-bar"><span>←</span><b>리뷰 쓰기</b><span /></div>
            <div class="rc-wr-prod"><i style={`--a:${B.color};background-image:url(${B.img})`} /><div><b>{B.name}</b><span>배송 완료</span></div></div>
            <p class="rc-wr-q">상품은 어떠셨나요?</p>
            <div class="rc-wr-stars" data-rc-wstars><Stars n={5} /></div>
            <div class="rc-wr-box"><span data-rc-wtxt>{MINE.s}</span><i class="rc-caret" /></div>
            <div class="rc-wr-photos"><i class="rc-wr-add">+ 사진</i><i class="rc-wr-ph" data-rc-wph style={`--a:${B.color};background-image:url(${MINE.img})`} /></div>
            <span class="rc-wr-go" data-rc-wgo>등록하기</span>
          </div>
          <i class="rc-touch" data-rc-touch />
        </div>
      </div>
      {/* 마지막: 여러 소비자가 같은 순간 오른쪽 상품을 고름 */}
      <div class="rc-crowd" data-rc-crowd>
        {CROWD.map((f) => <div class="rc-crowd-t" data-rc-ct style={`background-image:url(${V}${f}.webp)`}>
          <video src={`${V}${f}.mp4`} poster={`${V}${f}.webp`} muted playsinline preload="auto" />
          <div class="rc-crowd-c"><i style={`background-image:url(${B.img})`} /><div><span>물결랩 히알루 세럼</span><b><Check /> 구매 완료</b></div></div>
        </div>)}
      </div>
    </div>
  </div>
)
