// 회사소개 히어로(한 바퀴 약 12초): '일하는 방식 → 결과 → 쌓아 온 시간'(A) 또는 '결과 → 일하는 방식 → 쌓아 온 시간'(B).
// 일하는 방식: 우리 일이 세상에 닿는 장면 6개(바이럴·체험단·인플루언서·리뷰·올리브영·PPL)가 차례로 크게 떴다가 3x2 칸으로 모인다.
//   장면은 각 서비스 페이지 히어로에서 쓰는 AI 가상 장면(영상·사진)을 그대로 다시 쓴다(새 크레딧 없음).
// 결과: 포트폴리오에 공개된 실제 고객 로고 130개(포트폴리오 thumb 을 여백 잘라 220x82 webp)가 터지듯 흩어졌다가 모여 'IN AD COMPANY'.
// 쌓아 온 시간: 2019~2026 막대(홈 '누적 성과' 막대와 같은 모양, 연도별 숫자 없음)가 차오르고 '2019년부터 · 130개 브랜드 · 누적 캠페인 37,000+'.
// 순서는 data-abh-order(a|b), 미리보기는 주소 뒤 ?abh=b. 움직임은 about-hero.js.
const LOGOS = 130
const SCENES = [
  { k: '바이럴·커뮤니티', v: '/static/review-compare/crowd-1' },
  { k: '체험단', v: '/static/seeding-search/unbox' },
  { k: '인플루언서', v: '/static/influencer-phones/skincare-am' },
  { k: '리뷰', v: '/static/review-compare/smile' },
  { k: '올리브영', img: '/static/oy-shelf/after.webp' },
  { k: 'PPL', v: '/static/ppl-onair/scene' },
]
// 홈 '누적 성과' 막대와 같은 높이 비율(2019=4 … 2026=100)
const YEARS = [['2019', 4], ['2020', 7], ['2021', 12], ['2022', 19], ['2023', 31], ['2024', 49], ['2025', 73], ['2026', 100]] as const

export const AboutHero = ({ order = 'a' }: { order?: 'a' | 'b' }) => (
  <div class="abh" aria-hidden="true" data-abh data-abh-order={order}>
    <div class="abh-stage">
      {/* 일하는 방식: 채널 장면 */}
      {SCENES.map(s => (
        <div class="abh-sc" data-abh-sc>
          {s.v
            ? <video src={`${s.v}.mp4`} poster={`${s.v}.webp`} muted loop playsinline preload="auto" />
            : <img src={s.img} alt="" />}
          <p class="abh-chip">{s.k}</p>
        </div>
      ))}

      {/* 결과: 실제 고객 로고 */}
      <div class="abh-logos">
        {Array.from({ length: LOGOS }, (_, i) => <img data-abh-lg src={`/static/about-hero/logos/l${String(i).padStart(3, '0')}.webp`} alt="" width="220" height="82" decoding="async" />)}
      </div>
      <div class="abh-word" data-abh-word>
        <b>IN AD COMPANY</b>
        <span data-abh-wsub><u data-abh-brands>130</u>개 브랜드와 함께</span>
      </div>

      {/* 쌓아 온 시간 */}
      <div class="abh-hist" data-abh-hist>
        <p class="abh-hist-h">누적 캠페인</p>
        <div class="abh-bars">
          {YEARS.map(([y, h], i) => (
            <div class={'abh-bar' + (i === YEARS.length - 1 ? ' is-now' : '')} data-abh-bar style={`--h:${h}`}><i /><span>{y}</span></div>
          ))}
        </div>
        <p class="abh-hist-f" data-abh-foot>2019년부터 · <u data-abh-brands>130</u>개 브랜드 · 누적 캠페인 <b>37,000+</b></p>
      </div>
    </div>
  </div>
)
