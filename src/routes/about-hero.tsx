// 회사소개 히어로(한 바퀴 약 11.5초): '한 문장이 설계되는 과정' — 제목 '브랜드의 설득력을 설계하는'을 장면으로 보여 준다.
// 1 고민: 카피 설계 노트 위에 타깃·고민·상황과 카피 후보들이 빠르게 적힌다.
// 2 지우기: 후보 카피에 줄이 그어지며 하나씩 사라진다(점점 빠르게).
// 3 한 문장: '오후 3시에도 당기지 않는 피부'만 남아 크게 적힌다(광고주 강조색).
// 4 번짐: 노트가 위로 작아지고, 같은 문장이 검색창·릴스·상세페이지로 번져 간다.
// 5 끝: '2019년부터 · 누적 캠페인 37,000+'(홈 신뢰 지표와 같은 값).
// 노트 내용과 문장은 예시(노트에 '예시' 표기). 고객사 로고·실제 인물 없음. 릴스 화면은 인플루언서 페이지 히어로의 AI 가상 영상을 다시 씀. 움직임은 about-hero.js.
const KEEP = [
  { k: '타깃', v: '29세 사무직 직장인', x: 28, y: 66 },
  { k: '고민', v: '오후만 되면 당기는 피부', x: 300, y: 66 },
  { k: '상황', v: '하루 종일 히터·에어컨 바람', x: 28, y: 112 },
]
const DRAFTS = [
  { v: '히알루론산 5중 보습', x: 34, y: 172 },
  { v: '1+1 최저가 특가', x: 330, y: 184 },
  { v: '피부과 전문의 추천', x: 64, y: 236 },
  { v: '성분이 다른 세럼', x: 336, y: 248 },
  { v: '촉촉함, 그 이상', x: 180, y: 302 },
]
const LINE = '오후 3시에도 당기지 않는 피부'

export const AboutHero = () => (
  <div class="abh" aria-hidden="true" data-abh>
    <div class="abh-stage">
      {/* 번질 때 문장에서 각 화면으로 이어지는 선 */}
      <svg class="abh-links" viewBox="0 0 680 620" data-abh-links>
        <path d="M300 272 C 260 292, 150 280, 130 300" />
        <path d="M340 272 L 340 282" />
        <path d="M380 272 C 420 292, 530 280, 550 300" />
      </svg>

      {/* 카피 설계 노트 */}
      <div class="abh-note" data-abh-note>
        <div class="abh-paper" data-abh-paper><p class="abh-note-h"><b>카피 설계 노트</b><span>예시</span></p></div>
        {KEEP.map(it => <p class="abh-kw abh-kw--keep" data-abh-kw style={`left:${it.x}px;top:${it.y}px`}><small>{it.k}</small>{it.v}</p>)}
        {DRAFTS.map(it => <p class="abh-kw abh-kw--draft" data-abh-kw data-abh-draft style={`left:${it.x}px;top:${it.y}px`}>“{it.v}”<i data-abh-strike /></p>)}
        <p class="abh-line" data-abh-line><span>“{LINE}”</span></p>
      </div>

      {/* 같은 문장이 번져 가는 화면 */}
      <div class="abh-mk abh-mk--search" data-abh-mk>
        <p class="abh-mk-h">검색</p>
        <p class="abh-sbar"><i />{LINE}</p>
        <p class="abh-sr"><b>{LINE}, 사무실 세럼 정착기</b><small>블로그 · 피부일기</small></p>
        <p class="abh-sr"><b>건성 직장인 보습 루틴</b><small>카페 · 뷰티 커뮤니티</small></p>
      </div>
      <div class="abh-mk abh-mk--reel" data-abh-mk>
        <p class="abh-mk-h">릴스</p>
        <div class="abh-phone"><video src="/static/influencer-phones/skincare-am.mp4" poster="/static/influencer-phones/skincare-am.webp" muted loop playsinline preload="auto" /><p>{LINE}</p><small>♡ 1.2만 · 저장 3,410</small></div>
      </div>
      <div class="abh-mk abh-mk--detail" data-abh-mk>
        <p class="abh-mk-h">상세페이지</p>
        <i class="abh-serum" />
        <b>{LINE}</b>
        <small>히알루 세럼 30ml</small>
      </div>

      <p class="abh-foot" data-abh-foot>2019년부터 · 누적 캠페인 <b>37,000+</b></p>
    </div>
  </div>
)
