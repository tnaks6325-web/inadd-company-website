// 올리브영 마케팅 히어로(한 바퀴 약 9.5초): '랭킹이 오르는 순간' — 사람 없이, 온라인몰(앱) 안에서만.
// 스킨케어 판매 랭킹 38위의 '소담결 시카 진정 토너패드' →
//   ① 리뷰가 쌓이며(23 → 1,280개) 줄이 위로 올라가 다른 상품을 제침(38 → 17위) →
//   ② 상품을 눌러 상세페이지에 사용 장면·성분·사용법이 차례로 채워짐 → 돌아오면 17 → 6위 →
//   ③ 검색창에 '토너패드' → 결과 첫 줄에 우리 상품 → 돌아오면 6 → 1위 → '급상승'·장바구니 담는 수가 오름 → 처음으로.
// 휴대폰 옆에는 순위 숫자와 세 단계(리뷰·상세페이지·검색)가 글자·가는 선·형광펜으로 적힌다.
// 실제 올리브영 로고·화면을 쓰지 않은 가상 쇼핑 앱, 브랜드·상품은 모두 가상. 대가·협찬 표시 문구는 넣지 않는다. 움직임은 oy-ranking.js.
const V = '/static/oy-ranking/'

// 우리 상품(img 가 없으면 색 상자 + 이름표)
const OURS = { brand: '소담결', name: '시카 진정 토너패드 70매', price: '18,900원', a: '#b7d39a', img: '', ph: '토너패드' }

// 다른 상품(랭킹 37줄을 이 목록으로 돌려 채운다)
const OTHERS: { brand: string; name: string; price: string; star: string; n: string; a: string; img?: string; ph: string }[] = [
  { brand: '라온담', name: '수분 선크림 50ml', price: '15,800원', star: '4.7', n: '8,412', a: '#f2d9a4', ph: '선크림' },
  { brand: '결고운', name: '약산성 클렌징폼 150ml', price: '11,900원', star: '4.8', n: '12,307', a: '#bcd7ea', ph: '클렌징폼' },
  { brand: '하늬', name: '비타 잡티 세럼 30ml', price: '24,000원', star: '4.6', n: '5,129', a: '#f4c38c', ph: '세럼' },
  { brand: '모아린', name: '장벽 수분 크림 50ml', price: '21,500원', star: '4.8', n: '9,880', a: '#d9dde6', ph: '크림' },
  { brand: '단미', name: '진정 시트마스크 10매', price: '13,900원', star: '4.7', n: '6,744', a: '#c9e3d0', ph: '시트마스크' },
  { brand: '새결', name: '톤업 커버 쿠션', price: '26,000원', star: '4.6', n: '4,301', a: '#ecc9bd', ph: '쿠션' },
  { brand: '온새', name: '각질 결 토너 200ml', price: '16,800원', star: '4.7', n: '7,215', a: '#d8e8e4', ph: '토너' },
  { brand: '나린', name: '글로우 립 틴트', price: '12,000원', star: '4.8', n: '10,452', a: '#e9a7a7', ph: '립 틴트' },
  { brand: '물결랩', name: '히알루 세럼 30ml', price: '28,000원', star: '4.9', n: '1,284', a: '#b9c7e6', ph: '세럼' },
]
const RANK_FROM = 38

// 상세페이지에 차례로 채워지는 콘텐츠
const INGR = ['병풀 추출물', '판테놀', '히알루론산']
const HOWTO = ['세안 후 한 장 꺼내기', '결 따라 닦아내기', '열감 있는 곳에 3분 올려두기']

const Star = () => <svg width="11" height="11" viewBox="0 0 24 24" aria-hidden="true"><path fill="#f5b301" d="m12 2.5 2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8z" /></svg>
const Glass = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2.2" /><path d="m20 20-3.5-3.5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" /></svg>
const Thumb = (p: { a: string; img?: string; ph: string; cls?: string }) =>
  <i class={'oy-th' + (p.cls ? ' ' + p.cls : '')} style={`--a:${p.a}` + (p.img ? `;background-image:url(${p.img})` : '')}>{!p.img && <span>{p.ph}</span>}</i>

// 38위 아래로도 몇 줄 더 있어야 목록 끝이 비어 보이지 않는다
const others = Array.from({ length: RANK_FROM + 5 }, (_, i) => OTHERS[i % OTHERS.length])

export const OyRanking = () => (
  <div class="oy" aria-hidden="true" data-oy>
    <div class="oy-stage">
      {/* 휴대폰 옆: 순위 숫자 + 세 단계 */}
      <div class="oy-side" data-oy-side>
        <p class="oy-side-k">스킨케어 판매 랭킹</p>
        <p class="oy-side-r"><b data-oy-big>{RANK_FROM}</b><span>위</span></p>
        <div class="oy-step" data-oy-step><p><mark>리뷰가 쌓이고</mark></p><span>리뷰 23 → 1,280개</span><em>38위 → 17위</em></div>
        <div class="oy-step" data-oy-step><p><mark>상세페이지가 채워지고</mark></p><span>사용 장면 · 성분 · 사용법</span><em>17위 → 6위</em></div>
        <div class="oy-step" data-oy-step><p><mark>검색 첫 줄에 오르면</mark></p><span>'토너패드' 검색 결과 첫 줄</span><em>6위 → 1위</em></div>
      </div>

      <div class="oy-phone" data-oy-phone>
        <div class="oy-scr">
          <div class="oy-status"><b>9:41</b><span>●●● ▮</span></div>
          {/* 랭킹 화면 */}
          <div class="oy-rk" data-oy-rk>
            <div class="oy-search" data-oy-sbox><Glass /><span>토너패드, 선크림 검색</span></div>
            <div class="oy-tabs"><b>판매 랭킹</b><span>급상승</span><span>리뷰 많은 순</span></div>
            <div class="oy-cats"><span>전체</span><b>스킨케어</b><span>마스크팩</span><span>클렌징</span><span>선케어</span></div>
            <p class="oy-when">오늘 10시 기준 · 최근 24시간 판매</p>
            <div class="oy-list" data-oy-list>
              {others.map((o) => <div class="oy-row" data-oy-o>
                <b class="oy-no">0</b><Thumb a={o.a} img={o.img} ph={o.ph} />
                <div class="oy-tx"><span class="oy-br">{o.brand}</span><p>{o.name}</p><b>{o.price}</b><i><Star /> {o.star} ({o.n})</i></div>
              </div>)}
              <div class="oy-row oy-row--me" data-oy-me>
                <b class="oy-no"><span data-oy-no>{RANK_FROM}</span><em class="oy-up" data-oy-up /></b><Thumb a={OURS.a} img={OURS.img} ph={OURS.ph} />
                <div class="oy-tx"><span class="oy-br">{OURS.brand}<em class="oy-hot" data-oy-hot>급상승</em></span><p>{OURS.name}</p><b>{OURS.price}</b>
                  <i><Star /> <u data-oy-star>4.1</u><u data-oy-n> (23)</u></i></div>
              </div>
            </div>
            <div class="oy-cartbar" data-oy-cart><span>오늘 장바구니에 담은 사람</span><b><u data-oy-cn>0</u>명</b></div>
          </div>

          {/* 상세페이지 */}
          <div class="oy-dt" data-oy-dt>
            <div class="oy-bar"><span>←</span><b>상품 상세</b><span /></div>
            <div class="oy-dt-view"><div class="oy-dt-track" data-oy-dtrack>
              <Thumb a={OURS.a} img={OURS.img} ph={OURS.ph} cls="oy-dt-hero" />
              <div class="oy-dt-info"><span class="oy-br">{OURS.brand}</span><p>{OURS.name}</p><b>{OURS.price}</b><i><Star /> 4.8 (1,280)</i></div>
              <div class="oy-dt-tabs"><b>상품 설명</b><span>리뷰 1,280</span><span>Q&amp;A</span></div>
              <div class="oy-blk" data-oy-blk><p class="oy-blk-h">사용 장면</p><div class="oy-blk-ph" style={`--a:${OURS.a}`}><span>세안 후 볼에 올린 토너패드</span></div></div>
              <div class="oy-blk" data-oy-blk><p class="oy-blk-h">핵심 성분</p><div class="oy-ingr">{INGR.map((x) => <span>{x}</span>)}</div></div>
              <div class="oy-blk" data-oy-blk><p class="oy-blk-h">사용법</p><ol class="oy-how">{HOWTO.map((x, i) => <li><b>{i + 1}</b>{x}</li>)}</ol></div>
            </div></div>
          </div>

          {/* 검색 */}
          <div class="oy-sr" data-oy-sr>
            <div class="oy-search oy-search--on"><b class="oy-back">←</b><span data-oy-q>토너패드</span><i class="oy-caret" /></div>
            <p class="oy-sr-n" data-oy-srn>'토너패드' 검색 결과 1,204개 · 추천순</p>
            <div class="oy-sr-list">
              <div class="oy-row oy-row--hit" data-oy-res><Thumb a={OURS.a} img={OURS.img} ph={OURS.ph} />
                <div class="oy-tx"><span class="oy-br">{OURS.brand}</span><p>{OURS.name}</p><b>{OURS.price}</b><i><Star /> 4.8 (1,280)</i></div></div>
              {[6, 4, 1].map((k) => <div class="oy-row" data-oy-res><Thumb a={OTHERS[k].a} img={OTHERS[k].img} ph={OTHERS[k].ph} />
                <div class="oy-tx"><span class="oy-br">{OTHERS[k].brand}</span><p>{OTHERS[k].name}</p><b>{OTHERS[k].price}</b><i><Star /> {OTHERS[k].star} ({OTHERS[k].n})</i></div></div>)}
            </div>
          </div>
          <i class="oy-touch" data-oy-touch />
        </div>
      </div>
    </div>
  </div>
)
