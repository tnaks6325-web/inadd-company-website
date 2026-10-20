// PPL 마케팅 히어로(한 바퀴 약 8초): '방송 직후 반응' — 촬영 현장에서 찍고 → 방송에 나가고 → 반응이 온다.
// 촬영 현장(슬레이트 'S#12 T3', 세트 책상 위 음료) → 감독 모니터 속 장면으로 줌인 → 그 화면이 그대로 방송 화면(21:40 본방송) →
// 방송 화면이 왼쪽 위로 작아지고 검색량 그래프가 21:40 에서 치솟음(18배) → 커뮤니티 게시판에 글 제목이 시각과 함께 한 줄씩 → 처음으로.
// 인물은 AI 가상 인물(폼보드 16번, 아이보리 블라우스), 음료 'LEMON SPARKLING'·드라마 「봄날의 계절」·채널은 모두 가상(실제 방송사 로고·프로그램명 없음).
// 반응은 말풍선(바이럴 페이지)·검색 결과 화면(체험단 페이지)과 겹치지 않게 게시판 글 목록으로. 대가·협찬 표시 문구 금지. 움직임은 ppl-onair.js.
const V = '/static/ppl-onair/'

// 게시판 글(방송 직후 시각 순)
const POSTS = [
  { t: '21:41', s: '봄날 12회 야근 장면에 나온 음료 뭐예요?', c: 48 },
  { t: '21:44', s: '여주가 마신 레몬 탄산수 정보 공유합니다', c: 112 },
  { t: '21:52', s: '드라마 그 음료 편의점에서 찾았어요', c: 37 },
  { t: '22:10', s: '방송 보고 바로 주문했어요', c: 21 },
]

// 검색량(20:00~23:00, 10분 간격 19개 점). 21:40(10번째)에서 치솟는다
const SEARCH = [5, 6, 5, 7, 6, 5, 6, 7, 6, 6, 100, 84, 66, 58, 52, 49, 46, 44, 42]
const GW = 640, GH = 116
const pts = SEARCH.map((v, i) => [(i / (SEARCH.length - 1)) * GW, GH - (v / 100) * GH])
const line = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ')
const SPIKE_X = pts[10][0]

export const PplOnAir = () => (
  <div class="pon" aria-hidden="true" data-pon>
    <div class="pon-stage">
      {/* 현실 컷: 촬영 현장 → 감독 모니터 */}
      <div class="pon-real" data-pon-real>
        <div class="pon-cut" data-pon-cut style={`background-image:url(${V}set.webp)`}><i class="pon-flash" data-pon-flash /></div>
        <div class="pon-cut" data-pon-cut style={`background-image:url(${V}monitor.webp)`} />
      </div>

      {/* 방송 화면 */}
      <div class="pon-tv" data-pon-tv />
      <div class="pon-tv-scr" style={`background-image:url(${V}scene.webp)`} data-pon-scr>
        <b class="pon-tv-title">봄날의 계절</b>
        <i class="pon-tv-age">15</i>
        <span class="pon-tv-ep">12회</span>
      </div>
      <div class="pon-onair" data-pon-onair><i />본방송 <b>21:40</b></div>

      {/* 검색량 그래프 */}
      <div class="pon-graph" data-pon-graph>
        <div class="pon-graph-head">
          <p><span>방송 10분 뒤 검색량</span><b><u data-pon-x>1</u>배</b></p>
          <em>'봄날의 계절 음료' 검색 추이 · 오늘</em>
        </div>
        <svg viewBox={`0 0 ${GW} ${GH + 22}`} class="pon-graph-svg">
          <line x1={SPIKE_X} y1="0" x2={SPIKE_X} y2={GH} class="pon-graph-mark" data-pon-mark />
          <path d={line + ` L${GW} ${GH} L0 ${GH} Z`} class="pon-graph-fill" data-pon-fill />
          <path d={line} pathLength="1" class="pon-graph-line" data-pon-line />
          {['20:00', '21:00', '22:00', '23:00'].map((t, i) => <text x={(i / 3) * GW} y={GH + 18} text-anchor={i === 0 ? 'start' : i === 3 ? 'end' : 'middle'}>{t}</text>)}
          <text x={SPIKE_X - 8} y="14" text-anchor="end" class="pon-graph-tag" data-pon-tag>21:40 방송</text>
        </svg>
      </div>

      {/* 커뮤니티 게시판 */}
      <div class="pon-board" data-pon-board>
        <p class="pon-board-h"><b>드라마 게시판</b><span>최신순</span></p>
        {POSTS.map((p) => <div class="pon-post" data-pon-post><time>{p.t}</time><span>{p.s}</span><em>[{p.c}]</em></div>)}
      </div>
    </div>
  </div>
)
