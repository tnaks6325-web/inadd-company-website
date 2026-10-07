/** Standalone DEV-only art direction study. Photography motion, not generated video. */
export const HeroMotionStudy = () => (
  <html lang="ko">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="noindex, nofollow" />
      <title>히어로 모션 시안 01 | IN AD COMPANY</title>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" />
      <link rel="stylesheet" href="/static/hero-motion-study.css" />
    </head>
    <body>
      <header class="ms-header">
        <a class="ms-logo" href="/">IN AD COMPANY<span aria-hidden="true">®</span></a>
        <span class="ms-study-label">사진 기반 UI 모션 시안 <span>01</span></span>
        <div class="ms-mode" role="group" aria-label="시안 연출 방식">
          <button type="button" data-mode="still" aria-pressed="false">정지</button>
          <button type="button" data-mode="motion" aria-pressed="true">모션 <span class="ms-dot" aria-hidden="true" /></button>
        </div>
        <a class="ms-original" href="/">기존 테스트 보기 <span aria-hidden="true">↗</span></a>
      </header>
      <main id="motionStudy" data-mode="motion">
        <section class="ms-hero" aria-labelledby="studyTitle">
          <div class="ms-hero-copy">
            <p class="ms-kicker"><span>01 — BRAND REALITY</span><span>IN AD</span></p>
            <h1 id="studyTitle">
              <span class="ms-line"><span>보고서 속 숫자는</span></span>
              <span class="ms-line"><span>화려한데,</span></span>
              <span class="ms-line"><span>매출은 <em>그대로</em></span></span>
            </h1>
            <div class="ms-copy-bottom">
              <a class="ms-discover" href="#studyAnswer">인애드의 방식 알아보기 <span aria-hidden="true">↗</span></a>
              <p class="ms-small-note">숫자 뒤에 있는, 사람의 이야기.</p>
            </div>
          </div>
          <figure class="ms-photo-window">
            <div class="ms-photo-shift">
              <img class="ms-photo" src="/static/hero-preview-v1/01-report-versus-sales-natural-light-v5.webp" width="1672" height="941" alt="작업실에서 노트북을 보며 고민하는 브랜드 운영자" fetchpriority="high" decoding="async" />
            </div>
            <figcaption><span>보고서와 매출</span><span>01 / 01</span></figcaption>
          </figure>
          <div class="ms-hero-footer">
            <a href="#studyAnswer">SCROLL TO EXPLORE <span aria-hidden="true">↓</span></a>
            <div class="ms-playback"><span class="ms-track" aria-hidden="true"><i /></span><span data-playback-label>모션 재생 중</span><button type="button" data-pause aria-pressed="false" aria-label="모션 일시정지"><svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><path class="ms-pause-icon" d="M7 5v10M13 5v10" fill="none" stroke="currentColor" stroke-width="2" /><path class="ms-play-icon" d="m7 4 9 6-9 6Z" fill="currentColor" /></svg></button></div>
          </div>
        </section>
        <section class="ms-answer" id="studyAnswer" aria-labelledby="answerTitle">
          <div class="ms-answer-meta"><span>THE WAY WE WORK</span><span>말이 아닌, 일하는 방식으로.</span></div>
          <h2 id="answerTitle">성과는 쌓이고,<br /><span class="ms-circle">소통과 업무는<br class="ms-mobile-break" /> 끊기지 않도록.<svg viewBox="0 0 900 150" preserveAspectRatio="none" aria-hidden="true"><ellipse cx="450" cy="75" rx="444" ry="68" /></svg></span></h2>
          <div class="ms-answer-bottom"><p>인애드는 다음 세 가지를 기본으로 지킵니다.</p><a href="/#homeWhy">일하는 방식 보기 <span aria-hidden="true">↗</span></a></div>
        </section>
        <footer class="ms-notice"><p>UI MOTION STUDY / 01</p><p>기존 사진에 카메라 이동·포인터 반응·스크롤 연출을 적용한 시안입니다.<br />실제 인물 영상이나 3D 모델은 포함하지 않았습니다.</p><a href="/">기존 홈페이지로 돌아가기 ↗</a></footer>
      </main>
      <script src="/static/hero-motion-study.js" defer />
    </body>
  </html>
)
