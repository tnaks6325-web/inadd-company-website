/** Local development preview only; the production homepage keeps its existing hero. */
const scenes = [
  {
    file: '01-report-versus-sales-natural-light-v5', label: '보고서와 매출', duration: 6500, focus: '72%',
    headline: <>보고서 속 숫자는<br />화려한데,<br />매출은 <em>그대로</em></>,
  },
  {
    file: '02-waiting-for-response-natural-light-v5', label: '답을 기다리는 순간', duration: 6500, focus: '65%',
    headline: <>계약 전엔 매일 연락,<br />계약 후엔 <em>읽씹</em>.</>,
  },
  {
    file: '03-quiet-brand-workroom-natural-light-v5', label: '브랜드의 고민', duration: 8500, focus: '90%',
    headline: <>이런 이야기,<br /><em>익숙한 패턴</em>이죠?</>,
    quotes: ['"일단 두 달만 더 지켜보시죠."', '"예산 조금만 더 태워보실까요?"', '"그건 저희 담당이 아니라서요."', '"담당자가 퇴사해서 인수인계 중이에요."'],
  },
  {
    file: '04-customer-understanding-natural-light-v5', label: '고객이 망설이는 이유를 듣다', duration: 6000, focus: '86%',
    headline: <>광고 상품이 아니라,<br /><em>마케팅의 본질</em>부터.</>,
  },
  {
    file: '05-real-purchase-natural-light-v5', label: '관심이 실제 구매로 이어지다', duration: 5500, focus: '86%',
    headline: <>검증된 방식을 골라,<br />노출이 아닌<br /><em>매출로 이어지게.</em></>,
  },
  {
    file: '06-consumer-natural-light-v4', label: '구매한 제품을 일상에서 사용하다', duration: 6500, focus: '76%',
    headline: <>저희는 광고만 만드는 회사가 아닌<br /><em>팔리는 이유</em>를<br />만드는 회사입니다.</>,
  },
]

const PlayIcon = () => <svg viewBox="0 0 20 20" width="16" height="16" fill="none" aria-hidden="true"><path d="m7 4 9 6-9 6V4Z" fill="currentColor" /></svg>
const PauseIcon = () => <svg viewBox="0 0 20 20" width="16" height="16" fill="none" aria-hidden="true"><path d="M6 4v12M14 4v12" stroke="currentColor" stroke-width="3" /></svg>

export const HomeHeroPreview = () => (
  <>
    <link rel="stylesheet" href="/static/hero-preview-v1.css" />
    <section class="home-hero-preview" id="homeHeroPreview" aria-label="인애드컴퍼니 브랜드 이야기" aria-roledescription="슬라이드쇼">
      <h1 class="hhp-sr-only">브랜드를 움직이는 힘, 인애드컴퍼니</h1>
      <div class="hhp-media" aria-hidden="true">
        {scenes.map((scene, index) => (
          <div class={`hhp-frame${index === 0 ? ' is-active' : ''}`} data-frame={index} style={`--scene-focus:${scene.focus};--scene-duration:${scene.duration}ms`}>
            <img src={`/static/hero-preview-v1/${scene.file}.webp`} width="1672" height="941" alt="" loading={index === 0 ? 'eager' : 'lazy'} fetchpriority={index === 0 ? 'high' : 'low'} decoding="async" />
          </div>
        ))}
      </div>
      <div class="hhp-shade" aria-hidden="true" />
      <div class="hhp-inner">
        <div class="hhp-copy-stage">
          {scenes.map((scene, index) => (
            <div class={`hhp-copy${index === 0 ? ' is-active' : ''}`} data-copy={index} data-duration={scene.duration} aria-hidden={index !== 0 ? 'true' : 'false'} role="group" aria-roledescription="슬라이드" aria-label={`${index + 1} / ${scenes.length} — ${scene.label}`}>
              <p class="hhp-eyebrow">IN AD COMPANY</p>
              {scene.quotes && <div class="hhp-quotes">{scene.quotes.map(quote => <p>{quote}</p>)}</div>}
              <h2>{scene.headline}</h2>
            </div>
          ))}
        </div>
        <a href="#homeAnswer" class="hhp-discover">인애드의 방식 알아보기 <span aria-hidden="true">↗</span></a>
        <div class="hhp-bottom">
          <nav class="hhp-controls" aria-label="히어로 장면 선택">
            <button type="button" class="hhp-arrow" data-hero-prev aria-label="이전 장면"><svg viewBox="0 0 20 20" width="18" height="18" fill="none" aria-hidden="true"><path d="m12 5-5 5 5 5" stroke="currentColor" stroke-width="1.5" /></svg></button>
            <div class="hhp-steps">
              {scenes.map((scene, index) => <button type="button" class="hhp-step" data-hero-step={index} aria-label={`${index + 1}번째 장면: ${scene.label}`} aria-current={index === 0 ? 'true' : 'false'}><span>{String(index + 1).padStart(2, '0')}</span><i aria-hidden="true" /></button>)}
            </div>
            <button type="button" class="hhp-arrow" data-hero-next aria-label="다음 장면"><svg viewBox="0 0 20 20" width="18" height="18" fill="none" aria-hidden="true"><path d="m8 5 5 5-5 5" stroke="currentColor" stroke-width="1.5" /></svg></button>
            <button type="button" class="hhp-pause" data-hero-pause aria-label="자동 전환 일시정지" aria-pressed="false"><span data-pause-icon><PauseIcon /></span><span data-play-icon hidden><PlayIcon /></span><span data-pause-label>일시정지</span></button>
          </nav>
          <a class="hhp-scroll" href="#homeAnswer">SCROLL TO EXPLORE <span aria-hidden="true">↓</span></a>
        </div>
      </div>
      <p class="hhp-status hhp-sr-only" aria-live="off" aria-atomic="true">1번째 장면: 보고서와 매출</p>
    </section>
    <script src="/static/hero-preview-v1.js" defer />
  </>
)
