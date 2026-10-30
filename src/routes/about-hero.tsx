// 회사소개 히어로: 홈처럼 상단 구역 좌우 전체를 채운다. 1600x900 무대를 화면 너비에 맞춰(cover) 키운다.
// 흐름: 제목(큰 글자) → [① 사무실의 하루(대표 사진으로 타임랩스) → ② 사무실 한 바퀴 → 모니터 화면 속으로(대표 촬영) — 자료 받으면 추가]
// → ③ 크리에이티브 × 데이터: 화면 전체가 네 줄로 갈라져 왼쪽 두 줄은 쓰고·놓고·그리는 손, 오른쪽 두 줄은 대시보드·리포트·표를 보는 손.
//    엇갈리며 점점 빠르게 바뀌다가 가운데로 모여 '크리에이티브와 데이터가 만나는 곳 · IN AD COMPANY'(사이트 하단 회사 문구).
// 손 장면은 AI 가상(nano_banana_pro → kling3_0 3초, 얼굴 없음): c1 b8e77971 c2 33595f34 c3 0c51dc77 / d1 dc0e2e82 d2 af53ef92 d3 7418358a.
// 움직임은 about-hero.js.
const V = '/static/about-hero/'
// 줄마다 장면 순서(같은 때 같은 장면이 두 줄에 겹치지 않게 엇갈림)
const COLS = [['c1', 'c2', 'c3'], ['c3', 'c1', 'c2'], ['d1', 'd2', 'd3'], ['d3', 'd1', 'd2']]

export const AboutHero = () => (
  <div class="abh" aria-hidden="true" data-abh>
    <div class="abh-stage" data-abh-stage>
      {/* 제목 */}
      <div class="abh-title" data-abh-title>
        <span data-abh-tl>브랜드의 설득력을</span>
        <span data-abh-tl><em>설계하는</em></span>
        <span data-abh-tl>크리에이티브 퍼포먼스</span>
      </div>

      {/* ③ 크리에이티브 × 데이터 */}
      {COLS.map((fs, i) => (
        <div class={'abh-col abh-col--' + i} data-abh-col>
          {fs.map(f => <div class="abh-clip" data-abh-clip><video src={`${V}${f}.mp4`} poster={`${V}${f}.webp`} muted playsinline preload="auto" /></div>)}
        </div>
      ))}
      <p class="abh-tag abh-tag--l" data-abh-tag>크리에이티브</p>
      <p class="abh-tag abh-tag--r" data-abh-tag>데이터</p>
      <div class="abh-meet" data-abh-meet>
        <p class="abh-meet-s">크리에이티브와 데이터가 만나는 곳</p>
        <b>IN AD COMPANY</b>
        <span>2019년부터 · 누적 캠페인 <u>37,000+</u></span>
      </div>
    </div>
  </div>
)
