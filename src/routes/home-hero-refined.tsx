/** DEV-only comparison: existing photography, a promise-first narrative and finite UI motion. */
const scenes = [
  {
    file: '06-consumer-natural-light-v4', label: '팔리는 이유를 만드는 회사', duration: 8500, focus: '76%',
    lead: '저희는 광고만 만드는 회사가 아닌',
    title: '저희는 광고만 만드는 회사가 아닌 팔리는 이유를 만드는 회사입니다.',
    lines: [<><em>팔리는 이유</em>를</>, <>만드는 회사입니다.</>],
    support: '관심이 선택으로 이어지도록, 사람의 마음부터 설계합니다.',
  },
  {
    file: '01-report-versus-sales-natural-light-v5', label: '보고서와 매출', duration: 7000, focus: '72%',
    title: '보고서 속 숫자는 화려한데, 매출은 그대로',
    lines: [<>보고서 속 숫자는</>, <>화려한데,</>, <>매출은 <em>그대로</em></>],
    support: '숫자의 크기보다, 매출로 이어지는 이유를 봅니다.',
  },
  {
    file: '02-waiting-for-response-natural-light-v5', label: '답을 기다리는 순간', duration: 7000, focus: '65%',
    title: '계약 전엔 매일 연락, 계약 후엔 읽씹.',
    lines: [<>계약 전엔 매일 연락,</>, <>계약 후엔 <em>읽씹</em>.</>],
    support: '필요한 순간에 곁에 있는 것. 인애드가 지키는 기본입니다.',
  },
  {
    file: '03-quiet-brand-workroom-natural-light-v5', label: '익숙한 패턴', duration: 8500, focus: '90%',
    title: '이런 이야기, 익숙한 패턴이죠?',
    lines: [<>이런 이야기,</>, <><em>익숙한 패턴</em>이죠?</>],
    quotes: ['“일단 두 달만 더 지켜보시죠.”', '“예산 조금만 더 태워보실까요?”', '“그건 저희 담당이 아니라서요.”', '“담당자가 퇴사해서 인수인계 중이에요.”'],
    support: '말이 아닌, 일하는 방식으로 차이를 만듭니다.',
  },
  {
    file: '04-customer-understanding-natural-light-v5', label: '고객이 망설이는 이유를 듣다', duration: 7000, focus: '86%',
    title: '광고 상품이 아니라, 마케팅의 본질부터.',
    lines: [<>광고 상품이 아니라,</>, <><em>마케팅의 본질</em>부터.</>],
    support: '고객이 무엇을 망설이는지, 그 이유부터 함께 찾습니다.',
  },
  {
    file: '05-real-purchase-natural-light-v5', label: '관심이 실제 구매로 이어지다', duration: 7000, focus: '86%',
    title: '검증된 방식을 골라, 노출이 아닌 매출로 이어지게.',
    lines: [<>검증된 방식을 골라,</>, <>노출이 아닌</>, <><em>매출로 이어지게.</em></>],
    support: '브랜드의 과제에 맞춰, 일곱 가지 서비스를 연결합니다.',
  },
]

const Arrow = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
const Chevron = ({ previous = false }: { previous?: boolean }) => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d={previous ? 'm12 5-5 5 5 5' : 'm8 5 5 5-5 5'} /></svg>

export const HomeHeroRefined = () => (
  <>
    <link rel="stylesheet" href="/static/hero-refined-preview.css" />
    <section class="home-hero-refined" id="homeHeroRefined" aria-label="인애드컴퍼니 브랜드 이야기" aria-roledescription="슬라이드쇼">
      <div class="hhr-media" aria-hidden="true">
        {scenes.map((scene, index) => (
          <div class={`hhr-frame${index === 0 ? ' is-active' : ''}`} data-refined-frame={index} style={`--scene-focus:${scene.focus}`}>
            <img class="hhr-photo" src={`/static/hero-preview-v1/${scene.file}.webp`} width="1672" height="941" alt="" loading={index === 0 ? 'eager' : 'lazy'} fetchpriority={index === 0 ? 'high' : 'low'} decoding="async" />
          </div>
        ))}
      </div>
      <div class="hhr-shade" aria-hidden="true" />
      <a class="hhr-compare" href="/">시안 02 <span aria-hidden="true">/</span> 기존 버전 보기 <span aria-hidden="true">↗</span></a>
      <div class="hhr-inner">
        <div class="hhr-copy-stage">
          {scenes.map((scene, index) => (
            <div class={`hhr-copy${index === 0 ? ' is-active' : ''}`} data-refined-copy={index} data-duration={scene.duration} aria-hidden={index !== 0 ? 'true' : 'false'} role="group" aria-roledescription="슬라이드" aria-label={`${index + 1} / ${scenes.length} — ${scene.label}`}>
              <p class="hhr-eyebrow" data-refined-part="eyebrow">IN AD COMPANY</p>
              {scene.lead && <p class="hhr-statement-lead" data-refined-part="lead" aria-hidden="true">{scene.lead}</p>}
              {scene.quotes && <div class="hhr-quotes">{scene.quotes.map((quote, order) => <p data-refined-part="quote" data-refined-order={order}>{quote}</p>)}</div>}
              {index === 0 ? (
                <h1 class="hhr-headline" aria-label={scene.title}>{scene.lines.map((line, order) => <span class="hhr-line" aria-hidden="true"><span class="hhr-line-part" data-refined-part="title" data-refined-order={order}>{line}</span></span>)}</h1>
              ) : (
                <h2 class="hhr-headline" aria-label={scene.title}>{scene.lines.map((line, order) => <span class="hhr-line" aria-hidden="true"><span class="hhr-line-part" data-refined-part="title" data-refined-order={order}>{line}</span></span>)}</h2>
              )}
              <p class="hhr-support" data-refined-part="support">{scene.support}</p>
            </div>
          ))}
        </div>
        <div class="hhr-actions">
          <a href="#homeAnswer" class="hhr-discover">인애드의 방식 알아보기 <Arrow /></a>
          <a href="#services" class="hhr-services">서비스 살펴보기 <span aria-hidden="true">↗</span></a>
        </div>
        <div class="hhr-bottom">
          <p class="hhr-scene-label" aria-hidden="true">01 / 06 — {scenes[0].label}</p>
          <nav class="hhr-controls" aria-label="히어로 장면 선택">
            <button type="button" class="hhr-arrow" data-refined-prev aria-label="이전 장면"><Chevron previous /></button>
            <div class="hhr-steps">{scenes.map((scene, index) => <button type="button" class="hhr-step" data-refined-step={index} aria-label={`${index + 1}번째 장면: ${scene.label}`} aria-current={index === 0 ? 'true' : 'false'}><span>{String(index + 1).padStart(2, '0')}</span><i aria-hidden="true" /></button>)}</div>
            <button type="button" class="hhr-arrow" data-refined-next aria-label="다음 장면"><Chevron /></button>
            <button type="button" class="hhr-pause" data-refined-pause aria-label="자동 전환 일시정지" aria-pressed="false"><span data-refined-pause-icon><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M7 5v10M13 5v10" fill="none" stroke="currentColor" stroke-width="2" /></svg></span><span data-refined-play-icon hidden><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m7 4 9 6-9 6Z" fill="currentColor" /></svg></span><span data-refined-pause-label>일시정지</span></button>
          </nav>
          <a class="hhr-scroll" href="#homeAnswer">SCROLL TO EXPLORE <span aria-hidden="true">↓</span></a>
        </div>
      </div>
      <p class="hhr-status hhr-sr-only" aria-live="off" aria-atomic="true">1번째 장면: {scenes[0].label}</p>
    </section>
    <script src="/static/hero-refined-preview.js" defer />
  </>
)
