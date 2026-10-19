// 바이럴 히어로 휴대폰 롤링(jitter "Sliding Smartphones: Stories" 참고).
// 각 화면은 실제 모바일 화면(카페·블로그·뽐뿌·네이버뉴스·에펨코리아)의 모양을 390x844 기준으로 다시 만든 것이고,
// 글은 퍼포먼스 페이지와 같은 샘플 브랜드(물결랩·바름·말끔·바삭공방·온숨) 가상 후기다. 움직임은 viral-phones.js.
const IMG = '/static/viral-phones/'

const Svg = (p: { d: string; w?: number; f?: string; s?: string; sw?: number }) => (
  <svg width={p.w || 22} height={p.w || 22} viewBox="0 0 24 24" fill={p.f || 'none'} stroke={p.s || 'currentColor'} stroke-width={p.sw || 1.8} stroke-linecap="round" stroke-linejoin="round"><path d={p.d} /></svg>
)
const I = {
  menu: 'M4 6h16M4 12h16M4 18h16',
  search: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm5-2 4 4',
  heart: 'M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z',
  comment: 'M20 12a8 8 0 0 1-11.6 7.1L4 20l1-4A8 8 0 1 1 20 12Z',
  share: 'M12 4v11M7 9l5-5 5 5M5 14v5h14v-5',
  send: 'M21 3 10 14M21 3l-7 18-4-7-7-4 18-7Z',
  more: 'M5 12h.01M12 12h.01M19 12h.01',
  chev: 'm9 6 6 6-6 6',
  down: 'm6 9 6 6 6-6',
  list: 'M4 7h16M4 12h16M4 17h16',
  thumb: 'M7 11v9H4v-9h3Zm0 0 4-7a2 2 0 0 1 2 2v4h5a2 2 0 0 1 2 2.3l-1.2 6A2 2 0 0 1 16.8 20H7',
  up: 'm6 15 6-6 6 6',
  pen: 'M4 20h4L19 9l-4-4L4 16v4Z',
}

const StatusBar = (p: { dark?: boolean }) => (
  <div class={'vp-status' + (p.dark ? ' vp-status--dark' : '')}>
    <b>9:41</b>
    <span class="vp-status-icons">
      <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="1" /><rect x="5" y="5.5" width="3" height="6.5" rx="1" /><rect x="10" y="3" width="3" height="9" rx="1" /><rect x="15" y="0" width="3" height="12" rx="1" /></svg>
      <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor"><path d="M8 2.6c2.3 0 4.4.9 6 2.4l1.2-1.3A10.4 10.4 0 0 0 8 .8 10.4 10.4 0 0 0 .8 3.7L2 5a8.6 8.6 0 0 1 6-2.4Zm0 3.6c1.3 0 2.5.5 3.4 1.3l1.2-1.3A6.7 6.7 0 0 0 8 4.4 6.7 6.7 0 0 0 3.4 6.2l1.2 1.3c.9-.8 2.1-1.3 3.4-1.3Zm0 3.5c-.6 0-1.1.2-1.5.6L8 12l1.5-1.7c-.4-.4-.9-.6-1.5-.6Z" /></svg>
      <svg width="27" height="13" viewBox="0 0 27 13" fill="none"><rect x=".5" y=".5" width="22" height="12" rx="3.5" stroke="currentColor" opacity=".4" /><rect x="2" y="2" width="19" height="9" rx="2" fill="currentColor" /><path d="M24.5 4.5v4c.8-.3 1.3-1.1 1.3-2s-.5-1.7-1.3-2Z" fill="currentColor" opacity=".45" /></svg>
    </span>
  </div>
)

type Comment = { n: string; t: string; d: string; badge?: string }
const Comments = (p: { list: Comment[]; reply?: string }) => (
  <div class="vp-cmts">{p.list.map(c => <div class="vp-cmt" key={c.n}>
    <span class="vp-ava" />
    <div><div class="vp-cmt-n">{c.n}{c.badge ? <em>{c.badge}</em> : null}</div><div class="vp-cmt-t">{c.t}</div><div class="vp-cmt-d">{c.d}{p.reply ? <span>{p.reply}</span> : null}</div></div>
  </div>)}</div>
)

/* 네이버 카페 — 카페마다 상단 색이 다르다 */
const CafeScreen = (p: { color: string; cafe: string; board: string; title: string; nick: string; date: string; views: string; body: string[]; img: string; after: string[]; likes: number; comments: Comment[]; cc: number }) => (
  <div class="vp-app vp-cafe" style={`--cafe:${p.color}`}>
    <div class="vp-top"><StatusBar dark />
      <div class="vp-cafe-bar"><span class="vp-cafe-logo">Café</span><b>{p.cafe}</b><span class="vp-cafe-join">가입</span><Svg d={I.search} /><Svg d={I.menu} /></div>
    </div>
    <div class="vp-body"><div class="vp-scroll">
      <div class="vp-cafe-head"><div class="vp-cafe-board"><span>{p.board} ›</span><em>앱 열기</em></div>
        <div class="vp-cafe-title">{p.title}</div>
        <div class="vp-cafe-author"><span class="vp-ava vp-ava--lg" /><div><div class="vp-cafe-nick">{p.nick} <i>🌱</i> <span>채팅</span></div><div class="vp-cafe-meta">{p.date} 조회 {p.views}</div></div><span class="vp-more"><Svg d={I.more} sw={3} /></span></div>
      </div>
      <div class="vp-cafe-text">{p.body.map(t => <div key={t}>{t}</div>)}</div>
      <img class="vp-photo" src={IMG + p.img + '.webp'} alt="" loading="lazy" decoding="async" />
      <div class="vp-cafe-text">{p.after.map(t => <div key={t}>{t}</div>)}</div>
      <div class="vp-cafe-like"><span class="vp-cafe-like-tip">'좋아요'로 마음을 나누세요!</span><div><span class="vp-red"><Svg d={I.heart} /></span> 좋아요 {p.likes}</div></div>
      <div class="vp-cafe-cc">댓글 {p.cc} <Svg d={I.chev} w={18} /></div>
      <Comments list={p.comments} reply="답글쓰기" />
    </div></div>
    <div class="vp-bottom vp-cafe-bottom"><span><Svg d={I.list} w={20} /> 목록으로</span><span class="vp-red"><Svg d={I.heart} w={22} /></span><b>{p.likes}</b><Svg d={I.more} sw={3} w={18} /><Svg d={I.comment} w={21} /><b>{p.cc}</b><Svg d={I.share} w={21} /></div>
  </div>
)

const BlogScreen = () => (
  <div class="vp-app vp-blog">
    <div class="vp-top"><StatusBar />
      <div class="vp-blog-bar"><span class="vp-blog-logo">blog</span><b>살림하는 하루 블로그</b><Svg d={I.search} /><Svg d={I.menu} /></div>
    </div>
    <div class="vp-body"><div class="vp-scroll">
      <div class="vp-blog-cat">살림 기록</div>
      <div class="vp-blog-title">세탁 세제 통 대신 시트 한 장,<br />말끔 세탁 시트 한 달 써본 후기</div>
      <div class="vp-blog-prof"><span class="vp-blog-ava">하</span><div class="vp-blog-nick">하루살림 <i>✔</i></div><div class="vp-blog-date">2026. 10. 8. 21:14</div><span class="vp-blog-add">+ 이웃추가</span></div>
      <div class="vp-blog-line" />
      <div class="vp-blog-text"><div>안녕하세요, 하루살림입니다 :)</div><div>&nbsp;</div><div>세탁기 옆 선반이 늘 액체세제 통이랑</div><div>계량컵으로 꽉 차 있었는데요.</div><div>시트형 세제로 바꾸고 한 달이 지나서</div><div><b>솔직한 사용 후기</b> 남겨볼게요!</div></div>
      <img class="vp-photo" src={IMG + 'living.webp'} alt="" loading="lazy" decoding="async" />
      <div class="vp-blog-text"><div>일단 <b>1장에 세탁 1번</b>이라 계량할 일이 없어요.</div><div>서랍에 쏙 들어가는 크기라 선반도 비었고요.</div><div>&nbsp;</div><div>찬물 세탁에서도 잔여물 없이 잘 녹았고</div><div>향이 강하지 않아서 아이 옷에도 쓰고 있어요.</div><div>&nbsp;</div><div>60매 들어 있어서 한 달 반 정도 쓸 것 같아요.</div></div>
    </div></div>
    <div class="vp-bottom vp-blog-bottom"><Svg d={I.heart} w={23} /><span class="vp-red vp-fill">♥</span><b>38</b><Svg d={I.comment} w={22} /><b>9</b><Svg d={I.send} w={21} /><b>2</b></div>
  </div>
)

const PpomppuScreen = () => (
  <div class="vp-app vp-ppom">
    <div class="vp-top"><StatusBar />
      <div class="vp-ppom-bar"><Svg d={I.menu} w={24} /><span class="vp-ppom-logo"><i>P</i><i>P</i><i>O</i><i>M</i><i>P</i><i>P</i><i>U</i></span><b>로그인</b></div>
      <div class="vp-ppom-crumb">뽐뿌 › 뽐뿌게시판 <span>▼</span> › 분류 ▼</div>
    </div>
    <div class="vp-body"><div class="vp-scroll">
      <div class="vp-ppom-head"><div class="vp-ppom-title"><span class="vp-ppom-tag">식품</span>[바삭공방] 찹쌀 김부각 50g 3봉 (12,900원/무료배송) <em>33</em></div>
        <div class="vp-ppom-author"><span class="vp-ava vp-ava--lg" /><div><div class="vp-ppom-nick"><span>P</span>바삭바삭냠냠</div><div class="vp-ppom-meta">2026-10-15 10:21 &nbsp;조회 : 4,812</div></div><span class="vp-ppom-up"><Svg d={I.thumb} w={18} /> 12</span><Svg d={I.more} sw={3} /></div>
      </div>
      <div class="vp-ppom-text">
        <div class="vp-ppom-link">구매링크 : <u>smartstore.example.com/basak</u></div>
        <div>10월 한정 묶음이라 1봉씩 사는 것보다 1,800원 저렴하네요.</div>
        <div>맥주 안주로 쟁여두기 좋습니다.</div>
      </div>
      <img class="vp-photo" src={IMG + 'food.webp'} alt="" loading="lazy" decoding="async" />
      <div class="vp-ppom-text"><div>찹쌀풀 바른 김을 두 번 튀겨서 눅눅해지지 않는 게 장점이고</div><div>개봉 후에도 지퍼백이라 보관 편합니다.</div></div>
      <div class="vp-ppom-cc">댓글 <b>33</b></div>
      <Comments list={[
        { n: '야식요정', t: '지난번에 사서 먹어봤는데 진짜 바삭해요 ㅋㅋ', d: '10:34' },
        { n: '핫딜만기다림', t: '3봉 묶음 좋네요 구매했습니다', d: '10:41' },
        { n: '편의점탈출', t: '맥주랑 먹으면 순삭입니다..', d: '10:52' },
      ]} />
    </div></div>
    <div class="vp-bottom vp-ppom-bottom"><Svg d={I.list} w={24} /><Svg d={I.share} w={22} /><span><Svg d={I.comment} w={22} /> 33</span><Svg d={I.pen} w={22} /></div>
  </div>
)

const NewsScreen = () => (
  <div class="vp-app vp-news">
    <div class="vp-top"><StatusBar />
      <div class="vp-news-bar"><span class="vp-news-logo"><b>N</b> 뉴스</span><span class="vp-news-sub">엔터 <i>|</i> 스포츠 <i>|</i> 프리미엄</span><Svg d={I.search} /></div>
      <div class="vp-news-tabs"><span>정치</span><span class="on">경제</span><span>사회</span><span>생활/문화</span><span>IT/과학</span><span>세계</span></div>
    </div>
    <div class="vp-body"><div class="vp-scroll">
      <div class="vp-news-press"><span class="vp-news-pl">B</span>브랜드경제 <em>+구독</em></div>
      <div class="vp-news-title">"조용해서 켜두고 잔다"…온숨 공기청정기 S1, 1인 가구 입소문</div>
      <div class="vp-news-rep"><span class="vp-ava" /><div><b>김하늘 기자</b><div>입력 2026.10.16. 오전 9:12</div></div><span class="vp-news-orig">기사원문</span></div>
      <div class="vp-news-react"><span>👏 <b>14</b></span><span><Svg d={I.comment} w={18} /> <b>27</b></span><i /><span class="vp-news-tool">가가</span><Svg d={I.share} w={19} /></div>
      <img class="vp-photo vp-photo--news" src={IMG + 'appliance.webp'} alt="" loading="lazy" decoding="async" />
      <div class="vp-news-cap">온숨 공기청정기 S1. 온숨 제공</div>
      <div class="vp-news-text"><div>수면모드 소음 22dB를 내세운 소형 공기청정기 '온숨 S1'이 출시 3주 만에 초도 물량을 모두 판매했다.</div><div>회사 측은 맘카페와 자취 커뮤니티에서 "밤새 켜둬도 조용하다"는 후기가 퍼지며 1인 가구 구매가 늘었다고 16일 밝혔다.</div></div>
    </div></div>
  </div>
)

const FmScreen = () => (
  <div class="vp-app vp-fm">
    <div class="vp-top vp-fm-top"><StatusBar dark />
      <div class="vp-fm-bar"><span class="vp-fm-logo">에펨코리아</span><b>로그인</b><b>가입</b><b>메뉴</b></div>
    </div>
    <div class="vp-body"><div class="vp-scroll">
      <div class="vp-fm-board"><b>포텐 터짐 화제순</b> ☆ <i>|</i> 유머/움짤/이슈 - 이슈</div>
      <div class="vp-fm-head"><div class="vp-fm-title">자취 3년차 대충 정착한 영양제 jpg</div><span>2026.10.14 19:02</span></div>
      <div class="vp-fm-author"><span class="vp-ava" /> 철분부족한곰 <em>조회 수 38120</em><em>추천 412</em><em>댓글 186</em></div>
      <div class="vp-fm-text"><div>알약 삼키는 거 극혐이라 영양제 계속 실패했는데</div><div>이건 물 없이 짜먹는 젤리라 3주째 안 빼먹음</div></div>
      <img class="vp-photo" src={IMG + 'supplement.webp'} alt="" loading="lazy" decoding="async" />
      <div class="vp-fm-text"><div>레몬맛이라 그냥 간식 느낌임</div><div>출근할 때 가방에 몇 개 넣어두면 끝</div></div>
      <div class="vp-fm-reco"><span><Svg d={I.heart} w={18} /> 412</span><span><Svg d={I.comment} w={18} /> 186</span><span><Svg d={I.share} w={18} /> 23</span></div>
      <div class="vp-fm-sort">인기순 <Svg d={I.down} w={14} /></div>
      <Comments list={[
        { n: '야근요정', t: '나도 이거 먹는데 맛있음 ㅇㅇ', d: '12시간 전' },
        { n: '헬스장출석왕', t: '마그네슘은 저녁에 먹으면 잠 잘 옴', d: '11시간 전' },
        { n: '알약포기자', t: '짜먹는 거 ㄹㅇ 편하긴 하더라', d: '10시간 전' },
      ]} />
    </div></div>
  </div>
)

export const VIRAL_SCREENS = [
  { scroll: 420, el: <CafeScreen color="#e2587a" cafe="새봄맘♥수다방" board="뷰티/패션/건강" title="환절기 속건조에 물결랩 세럼 정착했어요" nick="봄날의곰" date="2026.10.12. 14:53" views="1,284"
      body={['세안하고 당기는 게 너무 심해서', '수분크림만 덕지덕지 발랐었는데요ㅠ', '맘님들 추천으로 물결랩 히알루 세럼 써봤어요!']} img="beauty"
      after={['세안 후 바로 한 방울만 발라도 촉촉하고', '무향이라 아기 볼에 닿아도 걱정이 덜해요 ㅎㅎ']} likes={24} cc={12}
      comments={[{ n: '포레스트맘', t: '저도 이거 쓰는데 재구매했어요!', d: '2026.10.12. 15:16', badge: '' }, { n: '봄날의곰', t: '그쵸 순해서 좋더라구요~', d: '2026.10.12. 15:20', badge: '작성자' }]} /> },
  { scroll: 400, el: <BlogScreen /> },
  { scroll: 380, el: <PpomppuScreen /> },
  { scroll: 360, el: <NewsScreen /> },
  { scroll: 400, el: <FmScreen /> },
  { scroll: 420, el: <CafeScreen color="#2f9e6e" cafe="1인가구 살림연구소" board="생활가전 후기" title="밤새 켜도 조용한 공기청정기 찾았어요" nick="원룸탈출기" date="2026.10.09. 22:41" views="2,031"
      body={['원룸이라 공기청정기 소리가 너무 거슬렸는데', '수면모드 22dB라길래 한 달 써봤어요.']} img="appliance"
      after={['진짜 켜둔 줄도 모르고 잤어요ㅋㅋ', '필터 1개 더 줘서 반년은 걱정 없을 듯해요.']} likes={41} cc={18}
      comments={[{ n: '자취9년차', t: '오 소음 정보 감사합니다 ㅎㅎ', d: '2026.10.09. 23:02' }, { n: '원룸탈출기', t: '네 수면모드 진짜 조용해요!', d: '2026.10.09. 23:10', badge: '작성자' }]} /> },
]

export const ViralPhones = () => (
  <div class="vp" aria-hidden="true" data-vp>
    {VIRAL_SCREENS.map((s, i) => <div class="vp-phone" data-scroll={s.scroll} key={i}>
      <div class="vp-screen">{s.el}<span class="vp-island" /></div>
    </div>)}
  </div>
)

// 히어로 배경: 파란 빛 번짐 + 가운데 화면 도착 때마다 퍼지는 물결 + 떠오르는 반응 알림(viral-phones.js가 만든다)
export const ViralBackdrop = () => (
  <div class="vb" aria-hidden="true" data-vb><div class="vb-glow" /></div>
)
