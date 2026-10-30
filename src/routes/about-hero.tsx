// 회사소개 히어로: 홈처럼 상단 구역 좌우 전체를 채운다. 1600x900 무대를 화면 너비에 맞춰(cover) 키운다.
// 흐름(제목 장면 없이 바로 시작): ① 사무실의 하루: 실제 사무실 사진(대표 촬영 IMG_0285)을 시간대별로 바꾼 6장(아침~저녁 5장은 AI 보정, 밤은 원본)을
//   kling3_0 시작·끝 장면으로 이어 만든 5구간 타임랩스 영상(사람들이 매우 빠르게 오감, 얼굴 안 보임, 기둥 화이트보드 글씨는 흐림 처리).
//   아래 가운데 아날로그 시계 바늘이 08시→22시로 빠르게 돈다
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
// 시계 눈금 12개(3·6·9·12시는 굵게)
const TICKS = Array.from({ length: 12 }, (_, i) => i)

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
        <svg viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="56" fill="#fff" stroke="#111318" stroke-width="3" />
          {TICKS.map(i => <line x1="60" y1={i % 3 ? 10 : 9} x2="60" y2={i % 3 ? 17 : 21} stroke="#111318" stroke-width={i % 3 ? 2.5 : 4.5} stroke-linecap="round" transform={`rotate(${i * 30} 60 60)`} />)}
          <line x1="60" y1="64" x2="60" y2="33" stroke="#111318" stroke-width="6" stroke-linecap="round" data-abh-hh />
          <line x1="60" y1="66" x2="60" y2="19" stroke="#21306F" stroke-width="3.5" stroke-linecap="round" data-abh-mh />
          <circle cx="60" cy="60" r="5" fill="#21306F" />
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
