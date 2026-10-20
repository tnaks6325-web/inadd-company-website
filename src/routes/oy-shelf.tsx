// 올리브영 마케팅 히어로(한 바퀴 약 8초): '진열 칸이 바뀌는 순간' — 사람 없이, 온라인몰(PC·모바일) 판매 랭킹 화면 안에서만.
// 뒤에 PC 브라우저, 앞에 휴대폰. 두 화면의 스킨케어 판매 랭킹에서 6위의 밋밋한 우리 상품 칸이 동시에 바뀐다:
//   ① 썸네일이 갈리며 '+20매' 스티커가 붙은 새 썸네일로 → ② 상품명이 구성이 보이게 → ③ 원가 취소선·할인율·기획/증정/세일 딱지 →
//   주변 칸이 흐려지고 우리 칸이 떠오름 → 아래 주석의 조회·장바구니 담기 수가 오름 → 우리 칸이 1위 자리로 옮겨감 →
//   1위 칸을 눌러 상세페이지로 → 대표 이미지(상징 영역)에 '올리브영 랭킹 1위 제품!' 띠와 1위 도장 → 0.3초 만에 그 이미지가 장면을 가득 채우도록 줌인 →
//   점 세계 지도에서 한국(올리브영 1위)에서 미국·일본·동남아·유럽으로 선이 이어짐(글로벌 진출의 발판) → 처음으로.
// 세계 지도 map.svg 는 world-atlas land-110m(공개 지도 자료)로 만든 점 지도(메르카토르, 경도 -130~165·위도 70~-22, 680x281).
// 화면 짜임새는 실제 올리브영 랭킹 화면(2026-10-21 대표 캡처)을 참고했지만 로고·실제 상품/모델 사진·고유 서비스명('오늘드림' 등)은 쓰지 않는다.
// 리뷰 수·검색 결과는 다른 페이지(리뷰 마케팅·체험단)에서 쓰므로 여기서는 쓰지 않는다. 대가·협찬 표시 문구 금지. 움직임은 oy-shelf.js.
type Item = { brand: string; name: string; was: string; off: string; price: string; flags: string[]; a: string; img?: string; ph: string }

// 상품 사진은 모두 가상(Higgsfield nano_banana, 2026-10-21): after.webp(da381d80), before.webp(6a646998, after 를 참고해 같은 통을 밋밋하게), o-1~7(87d856ad 3x3 한 장을 잘라 씀)
const V = '/static/oy-shelf/'
// 우리 상품: 바뀌기 전(before)과 후(after). img 가 없으면 색 상자 + 이름표
const BRAND = '소담결'
const BEFORE = { name: '토너패드 70매', price: '25,000원', a: '#c9ccd1', img: V + 'before.webp', ph: '바뀌기 전 썸네일' }
const AFTER = { name: '[기획] 시카 진정 토너패드 70매+리필 20매 증정', was: '25,000원', off: '24%', price: '18,900원', flags: ['기획', '증정', '세일'],
  a: '#8fc46a', img: V + 'after.webp', ph: '바뀐 뒤 썸네일', sticker: '+20매', band: '시카 진정 기획' }

// 같은 판매 랭킹의 다른 상품(우리 칸은 6위 자리에서 시작)
const OTHERS: Item[] = [
  { brand: '온새', name: '[단독기획] 각질 결 토너 200ml+100ml', was: '22,000원', off: '15%', price: '18,700원', flags: ['세일', '쿠폰'], a: '#cfe6e0', img: V + 'o-1.webp', ph: '토너' },
  { brand: '결고운', name: '약산성 토너패드 60매 기획', was: '19,000원', off: '16%', price: '15,900원', flags: ['증정'], a: '#bcd7ea', img: V + 'o-2.webp', ph: '토너패드' },
  { brand: '하늬', name: '비타 맑은 세럼 30ml', was: '32,000원', off: '25%', price: '24,000원', flags: ['세일', '쿠폰', '증정'], a: '#f4c38c', img: V + 'o-3.webp', ph: '세럼' },
  { brand: '단미', name: '[1+1] 진정 패드 80매 기획', was: '28,000원', off: '25%', price: '21,000원', flags: ['세일'], a: '#c9e3d0', img: V + 'o-4.webp', ph: '패드' },
  { brand: '모아린', name: '장벽 수분 크림 50ml', was: '24,000원', off: '10%', price: '21,500원', flags: ['쿠폰'], a: '#d9dde6', img: V + 'o-5.webp', ph: '크림' },
  { brand: '라온담', name: '수분 선크림 50ml 더블 기획', was: '19,800원', off: '20%', price: '15,800원', flags: ['세일', '증정'], a: '#f2d9a4', img: V + 'o-6.webp', ph: '선크림' },
  { brand: '새결', name: '각질 패드 70매', was: '18,000원', off: '17%', price: '14,900원', flags: ['세일'], a: '#ecc9bd', img: V + 'o-7.webp', ph: '패드' },
]
// 우리 칸이 처음 놓이는 자리(0 = 1위). oy-shelf.js 가 data-from 으로 읽는다
const MY_SLOT = 5

const Glass = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2" /><path d="m20 20-3.5-3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>
const Bell = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2h-15zM10 20.5a2 2 0 0 0 4 0" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round" /></svg>
const Bag = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 8h14l-1 12H6zM9 8V6a3 3 0 0 1 6 0v2" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round" /></svg>
const Heart = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" /></svg>
const Home = () => <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 11 12 4l8 7v9h-5v-6H9v6H4z" fill="currentColor" /></svg>
const Menu = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>
const User = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.9" /><path d="M4 21a8 8 0 0 1 16 0" stroke="currentColor" stroke-width="1.9" /></svg>

const Th = (p: { a: string; img?: string; ph: string; cls?: string }) =>
  <i class={'oys-th' + (p.cls ? ' ' + p.cls : '')} style={`--a:${p.a}` + (p.img ? `;background-image:url(${p.img})` : '')}>{!p.img && <span>{p.ph}</span>}</i>
const Flags = (p: { f: string[]; me?: boolean }) => p.me
  ? <div class="oys-flags" data-oy-flags>{p.f.map((x) => <em data-f={x}>{x}</em>)}</div>
  : <div class="oys-flags">{p.f.map((x) => <em data-f={x}>{x}</em>)}</div>
// 모바일 상품명: '[기획] 브랜드 상품명' 또는 '브랜드 상품명'
const mName = (brand: string, name: string) => name.startsWith('[') ? name.replace(']', '] ' + brand) : brand + ' ' + name

// 우리 칸 썸네일: 바뀌기 전 위에 바뀐 뒤가 왼쪽부터 갈려 나타남(스티커·띠 포함)
const MyThumb = () => (
  <div class="oys-thw">
    <Th a={BEFORE.a} img={BEFORE.img} ph={BEFORE.ph} cls="oys-th--before" />
    <span class="oys-thnew" data-oy-thnew>
      <Th a={AFTER.a} img={AFTER.img} ph={AFTER.ph} />
      <b class="oys-stk">{AFTER.sticker}</b><b class="oys-tband">{AFTER.band}</b>
    </span>
    <i class="oys-wipe" data-oy-wipe />
  </div>
)

// 한 화면(PC 또는 모바일)의 상품 목록. 칸 자리는 oy-shelf.js 가 계산한다
const Grid = (p: { dev: 'pc' | 'm' }) => (
  <div class="oys-grid" data-oy-grid data-from={MY_SLOT}>
    {OTHERS.map((o) => <div class="oys-card" data-oy-o>
      <div class="oys-thw"><Th a={o.a} img={o.img} ph={o.ph} /></div>
      <b class="oys-rk">0</b>
      {p.dev === 'pc'
        ? <><span class="oys-br">{o.brand}</span><p class="oys-nm">{o.name}</p><p class="oys-pr"><s>{o.was}</s><b>{o.price}</b></p><Flags f={o.flags} /></>
        : <><p class="oys-nm">{mName(o.brand, o.name)}</p><p class="oys-was"><s>{o.was}</s></p><p class="oys-pr"><u>{o.off}</u><b>{o.price}</b></p><Flags f={o.flags} /><p class="oys-ic"><Heart /><Bag /></p></>}
    </div>)}
    <div class="oys-card oys-card--me" data-oy-me>
      <MyThumb />
      <b class="oys-rk" data-oy-rk>{MY_SLOT + 1}</b>
      {p.dev === 'pc' && <span class="oys-br">{BRAND}</span>}
      <p class="oys-nm oys-nm--me">
        <span data-oy-nm0>{p.dev === 'pc' ? BEFORE.name : mName(BRAND, BEFORE.name)}</span>
        <span data-oy-nm1>{p.dev === 'pc' ? AFTER.name : mName(BRAND, AFTER.name)}</span>
      </p>
      {p.dev === 'm' && <p class="oys-was"><s data-oy-was>{AFTER.was}</s></p>}
      <p class="oys-pr">{p.dev === 'pc' ? <s data-oy-was>{AFTER.was}</s> : <u data-oy-off>{AFTER.off}</u>}<b data-oy-price data-after={AFTER.price}>{BEFORE.price}</b></p>
      <Flags f={AFTER.flags} me />
      {p.dev === 'm' && <p class="oys-ic"><Heart /><Bag /></p>}
    </div>
  </div>
)

// 상세페이지: 대표 이미지(상징 영역)에 '올리브영 랭킹 1위 제품!' 띠와 1위 도장이 찍힌다
const Detail = (p: { dev: 'pc' | 'm' }) => (
  <div class={'oys-dt oys-dt--' + p.dev} data-oy-dt>
    {p.dev === 'pc' ? <p class="oys-dt-crumb">홈 › 스킨케어 › 토너/패드</p> : <div class="oys-dt-bar"><span>←</span><b>상품 상세</b><Bag /></div>}
    <div class="oys-dt-body">
      <div class="oys-dt-kv" style={`background-image:url(${AFTER.img})`}>
        <b class="oys-dt-ban" data-oy-ban>올리브영 랭킹 1위 제품!</b>
        <i class="oys-dt-stamp" data-oy-stamp><small>올리브영</small><b>1위</b><small>스킨케어</small></i>
      </div>
      <div class="oys-dt-info">
        <span class="oys-br">{BRAND}</span><p class="oys-dt-nm">{AFTER.name}</p>
        <p class="oys-dt-pr"><s>{AFTER.was}</s><u>{AFTER.off}</u><b>{AFTER.price}</b></p>
        <div class="oys-flags oys-dt-flags">{AFTER.flags.map((x) => <em data-f={x}>{x}</em>)}</div>
        <div class="oys-dt-btns"><span>장바구니</span><b>바로구매</b></div>
      </div>
    </div>
  </div>
)

// 글로벌: 점 지도 위 한국(올리브영 1위)에서 각 지역으로 선이 이어진다. 좌표는 map.svg(680x281) 기준
const KR = [592.4, 135.8]
const DEST = [
  { n: '일본', s: '현지 유통 입점', at: [621.7, 141], lx: -26, ly: 14 },
  { n: '동남아', s: '현지 몰 판매', at: [538.9, 210.7], lx: 14, ly: 8 },
  { n: '미국', s: '글로벌 몰 판매', at: [73.8, 131.4], lx: 14, ly: 8 },
  { n: '유럽', s: '글로벌 몰 판매', at: [318.1, 102.7], lx: 14, ly: 8 },
]
const arc = (a: number[], b: number[]) => {
  const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, d = Math.hypot(b[0] - a[0], b[1] - a[1])
  return `M${a[0]} ${a[1]} Q${mx.toFixed(1)} ${(my - Math.max(28, d * 0.32)).toFixed(1)} ${b[0]} ${b[1]}`
}
const Globe = () => (
  <div class="oys-glb" data-oy-glb>
    <img class="oys-map" src={V + 'map.svg'} alt="" />
    <svg class="oys-arcs" viewBox="0 0 680 281" aria-hidden="true">
      {DEST.map((d) => <path d={arc(KR, d.at)} pathLength="1" data-oy-arc />)}
      <circle cx={KR[0]} cy={KR[1]} r="5" class="oys-kr-dot" />
      {DEST.map((d) => <circle cx={d.at[0]} cy={d.at[1]} r="4.5" class="oys-dst-dot" data-oy-dot />)}
    </svg>
    <div class="oys-kr" data-oy-kr style={`left:${KR[0] - 236}px;top:${KR[1] - 104}px`}>
      <i style={`background-image:url(${AFTER.img})`} />
      <p><b>한국 · 올리브영 랭킹 1위</b><span>{BRAND} 시카 진정 토너패드</span></p>
    </div>
    {DEST.map((d) => <div class="oys-dst" data-oy-dst style={`left:${d.at[0] + d.lx}px;top:${d.at[1] + d.ly}px`}><b>{d.n}</b><span>{d.s}</span></div>)}
  </div>
)

const PC_CATS = ['전체', '스킨케어', '마스크팩', '클렌징', '선케어', '메이크업', '네일', '뷰티소품', '더모 코스메틱', '향수', '헤어케어', '바디케어']

export const OyShelf = () => (
  <div class="oys" aria-hidden="true" data-oy>
    <div class="oys-stage">
      {/* 카메라: PC·휴대폰을 함께 담아 '랭킹 1위' 대표 이미지로 줌인한다 */}
      <div class="oys-cam" data-oy-cam>
      {/* PC 브라우저(1120x960 으로 그리고 0.5배) */}
      <div class="oys-pc" data-oy-dev="pc">
        <div class="oys-chrome"><i /><i /><i /><span>랭킹 | H&amp;B MALL</span></div>
        <div class="oys-pcv"><div class="oys-track" data-oy-track>
          <div class="oys-util"><span>로그인</span><span>장바구니</span><span>주문배송</span><span>고객센터</span></div>
          <div class="oys-head"><b class="oys-logo">H&amp;B MALL</b><span class="oys-sbox"><span>상품, 브랜드, 성분 검색</span><Glass /></span><span class="oys-hr">최근 본 상품</span></div>
          <div class="oys-nav"><b><Menu /> 카테고리</b><span>오늘특가</span><span class="is-on">랭킹</span><span>기획전</span><span>세일</span><span>멤버십/쿠폰</span><span>이벤트</span></div>
          <div class="oys-band"><b>랭킹</b><span>최근 24시간 온라인 판매 기준</span></div>
          <div class="oys-cat">{PC_CATS.map((c) => <span class={c === '스킨케어' ? 'is-on' : ''}>{c}</span>)}</div>
          <Grid dev="pc" />
        </div><Detail dev="pc" /></div>
      </div>

      {/* 휴대폰(360x732 로 그리고 0.6배) */}
      <div class="oys-phone" data-oy-dev="m">
        <div class="oys-scr">
          <div class="oys-status"><b>9:41</b><span>●●● ▮</span></div>
          <div class="oys-mv"><div class="oys-track" data-oy-track>
            <div class="oys-mhead"><b class="oys-logo">H&amp;B MALL</b><span><Glass /><Bell /><Bag /></span></div>
            <div class="oys-mtabs"><span>홈</span><span>오늘특가</span><b>랭킹</b><span>세일</span><span>기획전</span><span>이벤트</span></div>
            <div class="oys-msub"><b>판매 랭킹</b><span>브랜드 랭킹</span><i>온라인 판매 기준</i></div>
            <div class="oys-mchips"><span>전체</span><b>스킨케어</b><span>마스크팩</span><span>클렌징</span><span>선케어</span></div>
            <div class="oys-mupd"><span>50분 전 업데이트</span><i>성별 ⌄　연령대 ⌄　실시간 ⌄</i></div>
            <Grid dev="m" />
          </div><Detail dev="m" /></div>
          <i class="oys-touch" data-oy-touch />
          <div class="oys-mbar"><span><Home />홈</span><span><Menu />카테고리</span><span class="is-on"><Bag />랭킹</span><span><Heart />좋아요</span><span><User />마이</span></div>
        </div>
      </div>
      </div>

      {/* 글로벌 */}
      <Globe />

      {/* 주석: 장면마다 바뀐다 — 진열 칸 세 가지+조회·담기 수 → 상세페이지 → 글로벌 */}
      <div class="oys-side" data-oy-side>
        <div class="oys-grp" data-oy-grp>
          <div class="oys-steps">
            <div class="oys-step" data-oy-step><p><mark>썸네일</mark></p><span>구성이 보이는 컷으로</span></div>
            <div class="oys-step" data-oy-step><p><mark>상품명</mark></p><span>무엇이 몇 매인지 한눈에</span></div>
            <div class="oys-step" data-oy-step><p><mark>기획 구성</mark></p><span>리필 증정 · 기획 할인가</span></div>
          </div>
          <div class="oys-nums" data-oy-nums>
            <div><span>조회</span><b data-oy-view>312</b></div>
            <div><span>장바구니 담기</span><b data-oy-cart>41</b></div>
          </div>
        </div>
        <div class="oys-grp oys-grp--one" data-oy-grp>
          <div class="oys-step" data-oy-step2><p><mark>상세페이지 첫 화면</mark></p><span>'올리브영 랭킹 1위 제품'을 가장 먼저 보이게</span></div>
        </div>
        <div class="oys-grp oys-grp--one" data-oy-grp>
          <div class="oys-step" data-oy-step2><p><mark>글로벌 진출의 발판</mark></p><span>올리브영 1위 기록을 해외 몰·현지 유통으로 연결</span></div>
        </div>
      </div>
    </div>
  </div>
)
