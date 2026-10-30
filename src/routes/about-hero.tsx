// 회사소개 히어로: 홈처럼 상단 구역 좌우 전체를 채운다. 1600x900 무대를 화면 너비에 맞춰(cover) 키운다.
// 흐름(제목 장면 없이 바로 시작): ① 사무실의 하루: 실제 사무실 사진(대표 촬영 IMG_0285)을 시간대별로 바꾼 6장(아침~저녁 5장은 AI 보정, 밤은 원본)을
//   kling3_0 시작·끝 장면으로 이어 만든 5구간 타임랩스 영상(사람들이 매우 빠르게 오감, 얼굴 안 보임, 기둥 화이트보드 글씨는 흐림 처리)
// → ② 밤 사진(원본)에서 오른쪽 줄 가운데 모니터(정면, 앞에 가리는 것 없음 — 대표 걷는 영상 IMG_0287로 자리 확인)로 쭉 빨려 들어간다.
//   깊이 확대해도 선명하도록 원본 고해상도에서 자른 조각 2장(zoom1 4배·zoom2 약 8배)을 제자리에 겹쳐 둔다. 모니터에는 ③ 첫 컷이 원근으로 켜진다
// → ③ 실제 사무실 컷(대표 촬영 사진·영상, 글씨는 모두 흐림 처리, 인물은 AI 가상·뒷모습만):
//    컷1 크리에이티브: 기획 메모를 쓰는 손(IMG_0289 → kling b559ff68) / 컷2 데이터: 화이트보드에 적는 직원(IMG_0291 + nano 2d5ab310 → kling c04a76f9)
//    컷3 만나는 곳: 회의실에서 TV(광고 소재+성과 그래프)를 보며 회의(IMG_0290 + nano dbf2e169 → kling df7b0fe3)
//    컷4 실제 촬영: 사무실 회전 영상(IMG_0294) 유리벽 IN AD COMPANY 로고, 유리에 비친 촬영자 얼굴은 흐림 → '크리에이티브와 데이터가 만나는 곳 · IN AD COMPANY'
// 사무실 시간대 사진: nano_banana_pro 03cde637 2e2fe066 5fa5e2bb 376e8dfd aab5591b.
// 움직임은 about-hero.js.
const V = '/static/about-hero/'
const CUTS = ['cut1', 'cut2', 'cut3', 'cut4']

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

      {/* ② 모니터 화면: ③ 첫 컷을 모니터 네 귀퉁이에 맞춰 원근으로 붙인다 */}
      <div class="abh-scr" data-abh-scr><img src={`${V}cut1.webp`} alt="" /></div>

      {/* ③ 실제 사무실 컷 — 다음 컷이 아래에서 밀어 올라온다 */}
      {CUTS.map(c => <div class="abh-cut" data-abh-cut><video src={`${V}${c}.mp4`} poster={`${V}${c}.webp`} muted playsinline preload="auto" /></div>)}
      <p class="abh-tag" data-abh-tag>크리에이티브</p>
      <p class="abh-tag" data-abh-tag>데이터</p>
      <div class="abh-meet" data-abh-meet>
        <p class="abh-meet-s">크리에이티브와 데이터가 만나는 곳</p>
        <b>IN AD COMPANY</b>
        <span>2019년부터 · 누적 캠페인 <u>37,000+</u></span>
      </div>
    </div>
  </div>
)
