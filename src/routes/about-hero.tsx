// 회사소개 히어로: 홈처럼 상단 구역 좌우 전체를 채운다. 1600x900 무대를 화면 너비에 맞춰(cover) 키운다.
// 흐름(제목 장면 없이 바로 시작): ① 사무실의 하루: 실제 사무실 사진(대표 촬영 IMG_0285)을 시간대별로 바꾼 6장(아침~저녁 5장은 AI 보정, 밤은 원본)을
//   kling3_0 시작·끝 장면으로 이어 만든 5구간 타임랩스 영상(사람들이 매우 빠르게 오감, 얼굴 안 보임, 기둥 화이트보드 글씨는 흐림 처리).
//   아래 가운데 실물 벽시계(화이트 미니멀, 바늘 없는 시계판을 nano_banana_pro 5f035f9f 로 만들고 배경을 오려 냄) 위에서
//   바늘이 08시→22시로 일정하게 빠르게 돈다(분침 뒤 잔상)
// → ② 밤 사진(원본)에서 오른쪽 줄 가운데 모니터(정면, 앞에 가리는 것 없음 — 대표 걷는 영상 IMG_0287로 자리 확인)로 쭉 빨려 들어간다.
//   깊이 확대해도 선명하도록 원본 고해상도에서 자른 조각 2장(zoom1 4배·zoom2 약 8배)을 제자리에 겹쳐 둔다. 모니터에는 ③ 첫 장면이 원근으로 켜진다
// → ③ 크리에이티브 × 데이터: 화면 전체가 네 줄로 갈라져 왼쪽 두 줄은 쓰고·놓고·그리는 손, 오른쪽 두 줄은 대시보드·리포트·표를 보는 손.
//    엇갈리며 점점 빠르게 바뀌다가 가운데로 모여 '크리에이티브와 데이터가 만나는 곳 · IN AD COMPANY'(사이트 하단 회사 문구).
// 사무실 시간대 사진: nano_banana_pro 03cde637 2e2fe066 5fa5e2bb 376e8dfd aab5591b.
// 손 장면은 AI 가상(nano_banana_pro → kling3_0 3초, 얼굴 없음): c1 b8e77971 c2 33595f34 c3 0c51dc77 / d1 dc0e2e82 d2 af53ef92 d3 7418358a.
// 움직임은 about-hero.js.
const V = '/static/about-hero/'
// 줄마다 장면 순서(같은 때 같은 장면이 두 줄에 겹치지 않게 엇갈림)
const COLS = [['c1', 'c2', 'c3'], ['c3', 'c1', 'c2'], ['d1', 'd2', 'd3'], ['d3', 'd1', 'd2']]
// 분침 잔상 8개(빠르게 돌 때 부채꼴로 번져 보이게)
const GHOSTS = Array.from({ length: 8 }, (_, i) => i)
// 시계 바늘(12시 방향 기준, viewBox 120): 검정 막대, 축 뒤로 조금 튀어나옴
const MIN_HAND = <rect x="58.7" y="15" width="2.6" height="53" rx="1" fill="#111318" />
const HOUR_HAND = <rect x="57.9" y="30" width="4.2" height="37" rx="1.7" fill="#111318" />

export const AboutHero = () => (
  <div class="abh" aria-hidden="true" data-abh>
    <div class="abh-stage" data-abh-stage>
      {/* ① 사무실의 하루 */}
      <div class="abh-day" data-abh-day>
        <video class="abh-day-f" src={`${V}day.mp4`} poster={`${V}day0.webp`} muted playsinline preload="auto" data-abh-dv />
        <img class="abh-day-f abh-night" src={`${V}day5.webp`} alt="" data-abh-night />
        {/* ② 확대용 고해상도 조각(밤 사진의 모니터 주변, 무대 좌표 그대로) */}
        <img class="abh-zp abh-zp--1" src={`${V}zoom1.webp`} alt="" data-abh-zp />
        <img class="abh-zp abh-zp--2" src={`${V}zoom2.webp`} alt="" data-abh-zp />
      </div>
      <div class="abh-clock" data-abh-clock>
        <img src={`${V}clock.webp`} alt="" />
        <svg viewBox="0 0 120 120" class="abh-hands">
          <g data-abh-hh>{HOUR_HAND}</g>
          {GHOSTS.map(() => <g opacity="0" data-abh-mg>{MIN_HAND}</g>)}
          <g data-abh-mh>{MIN_HAND}</g>
          <circle cx="60" cy="60" r="3" fill="#111318" />
        </svg>
      </div>

      {/* ② 모니터 화면: ③ 첫 장면(네 줄 첫 그림)을 모니터 네 귀퉁이에 맞춰 원근으로 붙인다 */}
      <div class="abh-scr" data-abh-scr>
        {COLS.map((fs, i) => <img class={'abh-scr-c abh-col--' + i} src={`${V}${fs[0]}.webp`} alt="" />)}
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
