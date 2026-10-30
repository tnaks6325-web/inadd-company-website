// 회사소개 히어로: 회사 아이덴티티 — ① 사무실의 하루(타임랩스, 대표 제공 사진으로 제작 예정) → ② 사무실 한 바퀴 → 모니터 화면 속으로(대표 촬영 예정)
// → ③ 크리에이티브 × 데이터: 화면이 반으로 갈라져 왼쪽은 쓰고·놓고·그리는 손, 오른쪽은 대시보드·리포트·표를 보는 손이 점점 빠르게 바뀌다가
//    가운데로 모여 '크리에이티브와 데이터가 만나는 곳 · IN AD COMPANY'(사이트 하단 회사 문구).
// 지금은 ③만 있다. 손 장면은 AI 가상(nano_banana_pro → kling3_0 3초, 얼굴 없음): c1 b8e77971 c2 33595f34 c3 0c51dc77 / d1 dc0e2e82 d2 af53ef92 d3 7418358a.
// 움직임은 about-hero.js.
const V = '/static/about-hero/'
const CREATIVE = ['c1', 'c2', 'c3']
const DATA = ['d1', 'd2', 'd3']

const Clip = ({ f }: { f: string }) => (
  <div class="abh-clip" data-abh-clip><video src={`${V}${f}.mp4`} poster={`${V}${f}.webp`} muted playsinline preload="auto" /></div>
)

export const AboutHero = () => (
  <div class="abh" aria-hidden="true" data-abh>
    <div class="abh-stage">
      <div class="abh-pane abh-pane--l" data-abh-pane>
        {CREATIVE.map(f => <Clip f={f} />)}
        <p class="abh-tag">크리에이티브</p>
      </div>
      <div class="abh-pane abh-pane--r" data-abh-pane>
        {DATA.map(f => <Clip f={f} />)}
        <p class="abh-tag">데이터</p>
      </div>
      <div class="abh-meet" data-abh-meet>
        <p class="abh-meet-s">크리에이티브와 데이터가 만나는 곳</p>
        <b>IN AD COMPANY</b>
        <span>2019년부터 · 누적 캠페인 <u>37,000+</u></span>
      </div>
    </div>
  </div>
)
