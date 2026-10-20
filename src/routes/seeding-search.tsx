// 체험단 히어로(한 바퀴 6초): 현실 → 웹.
// 현실(인물 영상 3컷): 블로거가 택배를 열고 → 휴대폰으로 제품을 찍고 → 노트북으로 글을 쓰는 뒷모습에서
// 카메라가 인물 어깨를 지나 노트북 화면 속으로 들어간다. 그 화면이 그대로 브라우저 창이 되어 웹 장면으로 이어진다.
// 웹(브라우저 창): 글쓰기 화면에서 발행 → 검색 결과로 바뀌어 방금 쓴 글을 시작으로 후기가 쌓이고 후기 수가 오른다.
// 인물은 AI 가상 인물(실존 인물 아님).
// 브랜드·후기는 퍼포먼스·바이럴 페이지와 같은 샘플 브랜드(온숨·바삭공방·말끔·물결랩·바름) 가상 후기다.
// 대가·협찬 표시 문구는 넣지 않는다(홈페이지 대가 언급 금지). 움직임은 seeding-search.js.
type Review = { t: string; by: string; d: string; s: string; ph: string }
type Brand = { q: string; kw: string; n: number; color: string; reviews: Review[] }

export const SS_BRANDS: Brand[] = [
  { q: '온숨 공기청정기 후기', kw: '온숨', n: 128, color: '#9fb8c8', reviews: [
    { t: '3주 써본 온숨 공기청정기 S1 솔직 후기', by: '살림하는 하루', d: '2026.10.12.', s: '7평 원룸이라 소음이 제일 걱정이었는데 수면모드에선 켜진 줄도 몰랐어요.', ph: '거실 협탁 위 공기청정기' },
    { t: '1인 가구 공기청정기 고민 끝, 온숨 S1', by: '혼자사는 연두', d: '2026.10.09.', s: '작은 방에 두기 좋은 크기를 찾다가 골랐어요. 상자 열자마자 바로 켤 수 있었어요.', ph: '상자 여는 손' },
    { t: '온숨 공기청정기 소음 직접 재봤어요', by: '측정하는 남자', d: '2026.10.07.', s: '휴대폰 앱으로 재 보니 수면모드 22dB 정도. 잘 때 켜 두기 좋네요.', ph: '소음 측정하는 손' },
    { t: '고양이 키우는 집 온숨 S1 한 달 사용기', by: '냥이랑 둘이', d: '2026.10.03.', s: '털 날리는 계절이라 걱정했는데 아침에 일어났을 때 공기가 달라요.', ph: '거실 협탁 위 공기청정기' },
    { t: '온숨 S1 필터 교체까지 써 본 후기', by: '미니멀 홈로그', d: '2026.09.28.', s: '두 달 쓰고 첫 필터 교체, 뚜껑 열고 끼우면 끝이라 1분도 안 걸렸어요.', ph: '상자 여는 손' },
    { t: '신혼집 침실용 공기청정기, 온숨 후기', by: '우리집 기록장', d: '2026.09.25.', s: '디자인이 튀지 않아서 침대 옆에 두기 좋아요. 무드등도 은은해요.', ph: '소음 측정하는 손' },
  ] },
  { q: '바삭공방 김부각 후기', kw: '바삭공방', n: 96, color: '#d9b37c', reviews: [
    { t: '바삭공방 찹쌀 김부각 3봉 먹어 본 후기', by: '오늘도 간식', d: '2026.10.11.', s: '두 번 튀겨서 그런지 봉지 연 지 하루가 지나도 바삭해요.', ph: '식탁 위 김부각 접시' },
    { t: '맥주 안주로 딱, 바삭공방 김부각', by: '퇴근 후 한 캔', d: '2026.10.08.', s: '짜지 않아서 계속 손이 가요. 3봉이 금방 사라졌어요.', ph: '봉지 뜯는 손' },
    { t: '아이 간식으로 바삭공방 김부각 줘 봤어요', by: '두 아이 엄마', d: '2026.10.05.', s: '찹쌀이 고소해서 아이들이 과자보다 먼저 집어 먹더라고요.', ph: '식탁 위 김부각 접시' },
    { t: '김부각 세 곳 비교, 바삭공방이 제일 덜 짜요', by: '먹어보고 씀', d: '2026.10.01.', s: '같은 날 세 제품을 나란히 놓고 먹어 봤어요. 식감 차이가 꽤 나요.', ph: '봉지 뜯는 손' },
    { t: '캠핑 갈 때 챙긴 바삭공방 김부각', by: '주말엔 캠핑', d: '2026.09.27.', s: '부서질까 걱정했는데 상자 포장이라 멀쩡히 도착했어요.', ph: '식탁 위 김부각 접시' },
    { t: '바삭공방 김부각 재구매 후기', by: '살림 메모', d: '2026.09.22.', s: '처음 먹고 맛있어서 부모님 댁에도 보내 드렸어요.', ph: '봉지 뜯는 손' },
  ] },
  { q: '말끔 세탁시트 후기', kw: '말끔', n: 74, color: '#9cc9b8', reviews: [
    { t: '말끔 세탁시트 한 달 써본 후기', by: '빨래하는 고양이', d: '2026.10.10.', s: '세제 계량을 안 해도 돼서 빨래가 훨씬 간단해졌어요.', ph: '세탁기에 시트 넣는 손' },
    { t: '계량컵 버린 후기, 말끔 세탁시트', by: '미니멀 살림', d: '2026.10.06.', s: '한 장 넣으면 끝. 세탁기 위가 깔끔해진 게 제일 좋아요.', ph: '선반 위 세탁시트' },
    { t: '아기 옷 빨래 말끔 세탁시트로 바꿨어요', by: '콩이네 육아', d: '2026.10.02.', s: '향이 세지 않아서 아기 옷에도 부담 없이 쓰고 있어요.', ph: '세탁기에 시트 넣는 손' },
    { t: '찬물에도 잘 녹는지 말끔 시트 실험', by: '궁금한 건 해봄', d: '2026.09.29.', s: '컵에 찬물 받아 넣어 봤는데 30초 만에 다 녹았어요.', ph: '선반 위 세탁시트' },
    { t: '여행 갈 때 챙긴 말끔 세탁시트', by: '가볍게 떠나요', d: '2026.09.24.', s: '지퍼백에 몇 장 넣어 가니 숙소 세탁기에서 바로 쓰기 좋았어요.', ph: '세탁기에 시트 넣는 손' },
    { t: '드럼세탁기에 말끔 세탁시트 써 본 후기', by: '살림 초보', d: '2026.09.20.', s: '세제 투입구 말고 통에 바로 넣으면 돼서 편해요.', ph: '선반 위 세탁시트' },
  ] },
  { q: '물결랩 세럼 후기', kw: '물결랩', n: 152, color: '#b9c7e6', reviews: [
    { t: '물결랩 히알루 세럼 2주 사용 후기', by: '피부 일기', d: '2026.10.13.', s: '세안 후 첫 단계로 바꿨더니 오후에도 당기는 느낌이 덜해요.', ph: '손등에 세럼 덜어 낸 모습' },
    { t: '환절기 속건조엔 물결랩 세럼 정착', by: '봄날의 공', d: '2026.10.09.', s: '가볍게 스며들어서 아침에 바르고 화장해도 밀리지 않았어요.', ph: '화장대 위 세럼 병' },
    { t: '민감 피부가 써 본 물결랩 세럼', by: '예민한 피부', d: '2026.10.04.', s: '바르고 따가운 느낌이 없어서 일주일째 아침저녁으로 쓰고 있어요.', ph: '손등에 세럼 덜어 낸 모습' },
    { t: '물결랩 세럼 제형·발림성 자세히', by: '바르는 기록', d: '2026.09.30.', s: '물처럼 묽은데 흐르지 않는 제형이에요. 두세 방울이면 얼굴 전체.', ph: '화장대 위 세럼 병' },
    { t: '30대 수분 세럼 비교, 물결랩 후기', by: '서른의 화장대', d: '2026.09.26.', s: '쓰던 세럼 두 개와 나눠 발라 봤는데 마무리가 제일 산뜻했어요.', ph: '손등에 세럼 덜어 낸 모습' },
    { t: '물결랩 세럼 한 병 다 쓴 후기', by: '공병 리뷰', d: '2026.09.21.', s: '한 달 반 정도 쓰니 다 썼어요. 재구매 장바구니에 넣어 뒀어요.', ph: '화장대 위 세럼 병' },
  ] },
  { q: '바름 젤리스틱 후기', kw: '바름', n: 88, color: '#f0b49a', reviews: [
    { t: '물 없이 먹는 바름 마그네슘 젤리스틱 후기', by: '출근길 기록', d: '2026.10.12.', s: '알약 삼키기가 힘들었는데 젤리라 출근길에 하나씩 챙겨 먹어요.', ph: '가방에서 꺼낸 스틱' },
    { t: '바름 젤리스틱 레몬맛, 맛은 어떨까', by: '맛 보고 씀', d: '2026.10.08.', s: '새콤한 레몬맛이라 영양제 먹는 느낌이 거의 안 나요.', ph: '책상 위 젤리스틱' },
    { t: '영양제 자꾸 까먹는 사람의 바름 후기', by: '깜빡 대장', d: '2026.10.04.', s: '책상 위에 두고 하루 1포. 챙겨 먹는 게 쉬워졌어요.', ph: '가방에서 꺼낸 스틱' },
    { t: '바름 젤리스틱 휴대성 좋네요', by: '여행가방 정리', d: '2026.09.30.', s: '스틱이 얇아서 파우치에 몇 개 넣어 다니기 좋아요.', ph: '책상 위 젤리스틱' },
    { t: '부모님 드릴 바름 젤리스틱 먼저 먹어 봄', by: '효도 일지', d: '2026.09.25.', s: '목 넘김이 부드러워서 알약 힘들어하시는 부모님께 보냈어요.', ph: '가방에서 꺼낸 스틱' },
    { t: '바름 마그네슘 젤리스틱 한 달 기록', by: '하루 1포', d: '2026.09.21.', s: '한 달 동안 빠뜨리지 않고 먹었어요. 맛이 질리지 않는 게 장점.', ph: '책상 위 젤리스틱' },
  ] },
]

// 키워드를 굵게(실제 검색 결과처럼)
const Hl = (p: { t: string; kw: string }) => {
  const i = p.t.indexOf(p.kw)
  return i < 0 ? <>{p.t}</> : <>{p.t.slice(0, i)}<b>{p.kw}</b>{p.t.slice(i + p.kw.length)}</>
}
export const SsCard = (p: { r: Review; kw: string; color: string }) => (
  <article class="ss-card">
    <div class="ss-card-txt">
      <div class="ss-by"><span class="ss-by-ava" style={`--a:${p.color}`} />{p.r.by}<i>{p.r.d}</i></div>
      <strong class="ss-ttl"><Hl t={p.r.t} kw={p.kw} /></strong>
      <p class="ss-snip">{p.r.s}</p>
    </div>
    <div class="ss-ph" style={`--a:${p.color}`}><span>{p.r.ph}</span></div>
  </article>
)

const Mag = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" stroke-width="2.4" /><path d="m15.5 15.5 5 5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" /></svg>

// 현실 컷(0~0.85초 개봉, 0.85~1.7초 촬영, 1.7~2.9초 작성). src 가 있으면 public/static/seeding-search/{src}.mp4·.webp
// 작성 컷 영상은 마지막 장면이 노트북 화면 가득 글쓰기 창이어야 브라우저 창과 이어진다(영상이 없을 땐 임시 그림을 키워 흉내).
const REAL: { n: string; label: string; src?: string }[] = [
  { n: '개봉', label: '인물이 집에서 택배 상자를 열고 제품을 꺼냄' },
  { n: '촬영', label: '인물이 휴대폰으로 식탁 위 제품을 찍음(찰칵)' },
  { n: '작성', label: '노트북으로 글 쓰는 뒷모습 → 카메라가 어깨를 지나 화면 속으로' },
]

// 지금은 온숨 한 브랜드만 6초마다 반복한다(브랜드를 돌리려면 개봉 영상·사진이 브랜드마다 필요).
const ACTIVE = SS_BRANDS.slice(0, 1)

export const SeedSearch = () => {
  const b = ACTIVE[0], mine = b.reviews[0]
  return (
    <div class="ss" aria-hidden="true" data-ss>
      <div class="ss-stage">
        {/* 현실: 인물 영상 3컷(영상이 없으면 임시 상자) */}
        <div class="ss-real" data-ss-real>
          {REAL.map((c) => <div class="ss-cut" data-ss-cut>{c.src
            ? <video src={`/static/seeding-search/${c.src}.mp4`} poster={`/static/seeding-search/${c.src}.webp`} muted playsinline preload="auto" />
            : <div class="ss-cut-ph"><b>{c.n}</b><span>{c.label}</span>{c.n === '작성' && <><i class="ss-cut-screen" /><i class="ss-cut-head" /></>}</div>}</div>)}
          <div class="ss-flash" data-ss-flash />
        </div>
        <div class="ss-win" data-ss-win>
          <div class="ss-chrome"><i /><i /><i /><span class="ss-url" data-ss-url>search.naver.com</span></div>
          {/* 1) 블로그 글쓰기 화면 */}
          <div class="ss-page ss-ed" data-ss-ed>
            <div class="ss-ed-bar"><span class="ss-ed-logo">blog</span><span class="ss-ed-tools">사진 · 동영상 · 인용구 · 구분선 · 장소</span><span class="ss-pub" data-ss-pub>발행</span></div>
            <div class="ss-ed-body">
              <strong class="ss-ed-ttl"><span data-ss-ttl>{mine.t}</span><span class="ss-caret" data-ss-c1 /></strong>
              <div class="ss-ed-img" data-ss-img style={`--a:${b.color}`}><span>{mine.ph}</span></div>
              <p class="ss-ed-txt"><span data-ss-txt>{mine.s}</span><span class="ss-caret" data-ss-c2 /></p>
            </div>
          </div>
          {/* 2) 검색 결과 화면 */}
          <div class="ss-page ss-sr" data-ss-sr>
            <div class="ss-head">
              <span class="ss-logo">N</span>
              <div class="ss-box"><span class="ss-q" data-ss-q>{b.q}</span><span class="ss-caret" /><span class="ss-go"><Mag /></span></div>
            </div>
            <nav class="ss-tabs"><span>통합</span><span class="is-on">블로그</span><span>카페</span><span>이미지</span><span>쇼핑</span></nav>
            <div class="ss-meta"><span>블로그 후기 <b data-ss-n>{b.n}</b>건</span><span class="ss-sort">관련도순 · 최신순</span></div>
            <div class="ss-list"><div class="ss-track" data-ss-track>
              {b.reviews.map((r) => <SsCard r={r} kw={b.kw} color={b.color} />)}
            </div></div>
          </div>
        </div>
      </div>
      <script type="application/json" data-ss-data dangerouslySetInnerHTML={{ __html: JSON.stringify(ACTIVE) }} />
    </div>
  )
}
