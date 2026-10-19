// 인플루언서 히어로: 인스타그램 릴스·피드, 유튜브 쇼츠·영상 화면이 여러 휴대폰에서 동시에 재생된다.
// 인물은 전부 AI로 만든 가상 인물(폼보드 기준 9명, Higgsfield 장면 사진 → 5초 영상)이고 계정명·문구도 가상이다.
// 화면 비율대로 세로(360x640)·피드(360x480)·가로(640x360) 영상을 둔다.
// 실제 협업 콘텐츠로 바꿀 때는 public/static/influencer-phones 의 mp4·webp 와 아래 목록만 바꾼다. 움직임은 influencer-phones.js.
const V = '/static/influencer-phones/'

const Svg = (p: { d: string; w?: number; f?: string; sw?: number }) => (
  <svg width={p.w || 26} height={p.w || 26} viewBox="0 0 24 24" fill={p.f || 'none'} stroke="currentColor" stroke-width={p.sw || 1.9} stroke-linecap="round" stroke-linejoin="round"><path d={p.d} /></svg>
)
const I = {
  heart: 'M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z',
  comment: 'M20 12a8 8 0 0 1-11.6 7.1L4 20l1-4A8 8 0 1 1 20 12Z',
  send: 'M21 3 10 14M21 3l-7 18-4-7-7-4 18-7Z',
  more: 'M5 12h.01M12 12h.01M19 12h.01',
  bookmark: 'M6 4h12v16l-6-4-6 4V4Z',
  camera: 'M4 8h3l2-3h6l2 3h3v11H4V8Zm8 9a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z',
  search: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm5-2 4 4',
  home: 'M4 11 12 4l8 7v9h-5v-6H9v6H4v-9Z',
  plus: 'M5 4h14v16H5zM12 8v8M8 12h8',
  reels: 'M4 4h16v16H4zM4 9h16M9 4l3 5M14 4l3 5M10 12v5l4-2.5-4-2.5Z',
  like: 'M7 11v9H4v-9h3Zm0 0 4-7a2 2 0 0 1 2 2v4h5a2 2 0 0 1 2 2.3l-1.2 6A2 2 0 0 1 16.8 20H7',
  dislike: 'M17 13V4h3v9h-3Zm0 0-4 7a2 2 0 0 1-2-2v-4H6a2 2 0 0 1-2-2.3l1.2-6A2 2 0 0 1 7.2 4H17',
  share: 'M14 5l7 7-7 7v-4c-6 0-9 2-11 5 1-6 4-10 11-11V5Z',
  remix: 'M4 7h11l-3-3M20 17H9l3 3',
  bell: 'M6 16V11a6 6 0 0 1 12 0v5l2 2H4l2-2Zm4 4h4',
}

const Status = (p: { light?: boolean }) => (
  <div class={'ip-status' + (p.light ? ' ip-status--light' : '')}>
    <b>9:41</b>
    <span><svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="1" /><rect x="5" y="5.5" width="3" height="6.5" rx="1" /><rect x="10" y="3" width="3" height="9" rx="1" /><rect x="15" y="0" width="3" height="12" rx="1" /></svg>
      <svg width="27" height="13" viewBox="0 0 27 13" fill="none"><rect x=".5" y=".5" width="22" height="12" rx="3.5" stroke="currentColor" opacity=".45" /><rect x="2" y="2" width="19" height="9" rx="2" fill="currentColor" /></svg></span>
  </div>
)
const Video = (p: { id: string; cls?: string }) => (
  <video class={'ip-video ' + (p.cls || '')} src={V + p.id + '.mp4'} poster={V + p.id + '.webp'} muted loop playsinline preload="none" />
)
const Ava = (p: { c: string }) => <span class="ip-ava" style={`--a:${p.c}`} />

type Clip = { id: string; handle: string; caption: string; likes: string; comments: string; color: string; title?: string; channel?: string; subs?: string; views?: string; cmt?: string; next?: string }

/* 인스타그램 릴스 */
const Reels = (c: Clip) => (
  <div class="ip-app ip-dark">
    <Video id={c.id} cls="ip-video--full" />
    <div class="ip-shade" />
    <Status light />
    <div class="ip-reels-top"><b>릴스</b><Svg d={I.camera} /></div>
    <div class="ip-side"><span><Svg d={I.heart} w={30} /><em>{c.likes}</em></span><span><Svg d={I.comment} w={29} /><em>{c.comments}</em></span><span><Svg d={I.send} w={27} /><em>공유</em></span><span><Svg d={I.more} sw={3} w={26} /></span></div>
    <div class="ip-reels-info"><div class="ip-user"><Ava c={c.color} /><b>{c.handle}</b><span class="ip-follow">팔로우</span></div><div class="ip-cap">{c.caption}</div><div class="ip-music">♫ {c.handle} · 원본 오디오</div></div>
    <div class="ip-nav ip-nav--dark"><Svg d={I.home} /><Svg d={I.search} /><Svg d={I.plus} /><Svg d={I.reels} /><span class="ip-me" /></div>
  </div>
)

/* 유튜브 쇼츠 */
const Shorts = (c: Clip) => (
  <div class="ip-app ip-dark">
    <Video id={c.id} cls="ip-video--full" />
    <div class="ip-shade" />
    <Status light />
    <div class="ip-shorts-top"><Svg d={I.search} /><Svg d={I.more} sw={3} /></div>
    <div class="ip-side ip-side--yt"><span><i class="ip-round"><Svg d={I.like} w={25} /></i><em>{c.likes}</em></span><span><i class="ip-round"><Svg d={I.dislike} w={25} /></i><em>싫어요</em></span><span><i class="ip-round"><Svg d={I.comment} w={24} /></i><em>{c.comments}</em></span><span><i class="ip-round"><Svg d={I.share} w={24} /></i><em>공유</em></span><span><i class="ip-round"><Svg d={I.remix} w={24} /></i><em>리믹스</em></span></div>
    <div class="ip-shorts-info"><div class="ip-user"><Ava c={c.color} /><b>@{c.handle}</b><span class="ip-sub">구독</span></div><div class="ip-cap">{c.caption}</div></div>
    <div class="ip-nav ip-nav--yt"><span><Svg d={I.home} w={22} />홈</span><span><Svg d={I.reels} w={22} />Shorts</span><span class="ip-yt-plus">+</span><span><Svg d={I.bell} w={22} />구독</span><span><span class="ip-me" />내 페이지</span></div>
  </div>
)

/* 인스타그램 피드 */
const Feed = (c: Clip) => (
  <div class="ip-app">
    <Status />
    <div class="ip-feed-top"><span class="ip-ig-logo">Instagram</span><Svg d={I.heart} /><Svg d={I.send} /></div>
    <div class="ip-stories">{['#f58529', '#dd2a7b', '#8134af', '#515bd4', '#feda75'].map((x, i) => <span class="ip-story" key={i} style={`--a:${x}`} />)}</div>
    <div class="ip-post-head"><Ava c={c.color} /><div><b>{c.handle}</b><small>서울 성수동</small></div><Svg d={I.more} sw={3} w={22} /></div>
    <Video id={c.id} cls="ip-video--feed" />
    <div class="ip-actions"><Svg d={I.heart} w={27} /><Svg d={I.comment} w={26} /><Svg d={I.send} w={25} /><i /><Svg d={I.bookmark} w={25} /></div>
    <div class="ip-feed-txt"><b>좋아요 {c.likes}개</b><div><b>{c.handle}</b> {c.caption}</div><span>댓글 {c.comments}개 모두 보기</span></div>
    <div class="ip-nav"><Svg d={I.home} /><Svg d={I.search} /><Svg d={I.plus} /><Svg d={I.reels} /><span class="ip-me" /></div>
  </div>
)

/* 유튜브 앱 영상 시청 화면 */
const Watch = (c: Clip) => (
  <div class="ip-app">
    <Status />
    <Video id={c.id} cls="ip-video--wide" />
    <div class="ip-yt-body">
      <div class="ip-yt-title">{c.title}</div>
      <div class="ip-yt-meta">조회수 {c.views} · 3일 전 · #{c.caption}</div>
      <div class="ip-yt-ch"><Ava c={c.color} /><b>{c.channel}</b><small>{c.subs}</small><span class="ip-yt-subbtn">구독</span></div>
      <div class="ip-yt-btns"><span><Svg d={I.like} w={19} /> {c.likes} <i /> <Svg d={I.dislike} w={19} /></span><span><Svg d={I.share} w={19} /> 공유</span><span><Svg d={I.bookmark} w={19} /> 저장</span></div>
      <div class="ip-yt-cmt"><b>댓글 {c.comments}</b><div><Ava c="#c9b6e4" /><span>{c.cmt}</span></div></div>
      <div class="ip-yt-next"><span class="ip-yt-thumb" /><div><b>다음 영상 · {c.next}</b><small>{c.channel} · 조회수 21만회</small></div></div>
    </div>
  </div>
)

const SCREENS: [typeof Reels, Clip][][] = [
  [
    [Reels, { id: 'blush', handle: 'soft.minji', caption: '5분 데일리 메이크업 💄 블러셔 하나로 끝', likes: '3.1만', comments: '412', color: '#e98fb0' }],
    [Watch, { id: 'homecook', handle: 'jiwon.home', caption: '집밥', likes: '1.8만', comments: '936', color: '#d8b48a', title: '자취 7년차 된장찌개 황금 레시피 🍲 일주일 집밥 브이로그', channel: '지원의 집밥일기', subs: '구독자 27.4만명', views: '38만회', cmt: '영상 보고 바로 따라 해봤어요 너무 맛있어요!!', next: '반찬 5가지 한 번에 만들기' }],
    [Feed, { id: 'lip', handle: 'lip.yerin', caption: '오늘의 립 💋 로즈 코랄 발색 비교해봤어요', likes: '8,214', comments: '157', color: '#d9667f' }],
  ],
  [
    [Shorts, { id: 'dessert', handle: 'cafe.seol', caption: '성수 신상 디저트 카페 딸기 케이크 🍰 #카페투어', likes: '5.4만', comments: '1,203', color: '#f4b03e' }],
    [Reels, { id: 'skincare-am', handle: 'yuna.log_', caption: '아침 스킨케어 같이 해요 ☀️ 토너 패팅 필수', likes: '2.2만', comments: '388', color: '#7cc4b8' }],
    [Feed, { id: 'grwm', handle: 'daily.chaeyoung', caption: '출근 전 겟레디윗미 🎀 쿠션 하나로 피부 정리', likes: '1.2만', comments: '264', color: '#b79be6' }],
  ],
  [
    [Feed, { id: 'skincare-pm', handle: 'skin.diary_su', caption: '자기 전 스킨케어 루틴 🌙 3단계면 충분해요', likes: '9,870', comments: '201', color: '#c9b6e4' }],
    [Shorts, { id: 'noodle', handle: 'bori_mukbang', caption: '성수 신상 국숫집 웨이팅 1시간 실화? 🍜', likes: '3.8만', comments: '872', color: '#e86b5a' }],
    [Watch, { id: 'omakase', handle: 'hana_eats.kr', caption: '맛집', likes: '2.6만', comments: '1,540', color: '#6f9ae0', title: '오마카세 처음 가본 날 솔직 후기 🍣 가격·맛 다 공개', channel: '하나의 먹고 기록', subs: '구독자 31.7만명', views: '44만회', cmt: '저도 이번 주말에 예약했어요 기대돼요!!', next: '성수 디저트 카페 5곳 비교' }],
  ],
]

export const InfluencerPhones = () => (
  <div class="ip" aria-hidden="true" data-ip>
    {SCREENS.map((col, ci) => <div class={'ip-col ip-col--' + ci} key={ci}>
      {col.map(([Screen, clip]) => <div class="ip-phone" key={clip.id}><div class="ip-screen">{Screen(clip)}<span class="ip-island" /></div></div>)}
    </div>)}
  </div>
)
