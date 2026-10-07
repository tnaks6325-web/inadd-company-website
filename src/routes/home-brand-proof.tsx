type BrandReview = { tag: string; body: string; av: string; name: string; role: string }

const quoteBody = (body: string) => body.split('**').map((segment, index) => index % 2 ? <em class="bproof-highlight">{segment}</em> : segment)
const highlight = (body: string) => body.split('**')[1] || body.replace(/\*\*/g, '')
const arrow = (previous = false) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d={previous ? 'M19 12H5m6-6-6 6 6 6' : 'M5 12h14m-6-6 6 6-6 6'} stroke-linecap="round" stroke-linejoin="round" /></svg>

/* DEV: one promise + a readable, finite set of existing customer voices.
   Native scrolling remains useful if the optional motion controller cannot load. */
export const HomeBrandProof = ({ reviews }: { reviews: BrandReview[] }) => (
  <section id="homeEmotion" class="brand-proof-preview" data-brand-proof="true" aria-labelledby="brandProofTitle">
    <link rel="stylesheet" href="/static/brand-proof-preview.css?v=20261007" />
    <div class="container bproof-container">
      <header class="bproof-head">
        <p class="bproof-eyebrow">OUR PROMISE</p>
        <h2 class="bproof-title" id="brandProofTitle" aria-label="저희는 광고만 만드는 회사가 아닌, 팔리는 이유를 만드는 회사입니다.">
          <span class="bproof-title-mask" aria-hidden="true"><span class="bproof-title-line bproof-title-intro">저희는 광고만 만드는 회사가 아닌</span></span>
          <span class="bproof-title-mask" aria-hidden="true"><span class="bproof-title-line bproof-title-key"><em>팔리는 이유</em><span class="bproof-title-suffix">를</span></span></span>
          <span class="bproof-title-mask" aria-hidden="true"><span class="bproof-title-line bproof-title-final">만드는 회사입니다.</span></span>
        </h2>
        <p class="bproof-description">숫자 뒤에 있는 사람의 마음까지 설계할 때,<br />마케팅은 비용이 아니라 자산이 됩니다.</p>
      </header>

      <div class="bproof-stage">
        <div class="bproof-main">
          <div class="bproof-review-head">
            <h3 id="brandProofVoices">함께한 브랜드의 이야기</h3>
            <div class="bproof-controls" role="group" aria-label="고객 후기 탐색">
              <span class="bproof-count" aria-hidden="true"><span data-bproof-current>01</span><span class="bproof-count-divider">/</span><span>{String(reviews.length).padStart(2, '0')}</span></span>
              <button type="button" data-bproof-prev aria-label="이전 고객 후기" disabled>{arrow(true)}</button>
              <button type="button" data-bproof-next aria-label="다음 고객 후기" disabled>{arrow()}</button>
            </div>
          </div>
          <div class="bproof-rail" role="region" aria-roledescription="캐러셀" aria-labelledby="brandProofVoices" aria-describedby="brandProofHelp" tabindex="0">
            {reviews.map((review, index) => (
              <figure class="bproof-review" data-review-index={String(index)} aria-label={`고객 후기 ${index + 1} / ${reviews.length}`}>
                <span class="bproof-tag">{review.tag}</span>
                <blockquote class="bproof-quote">
                  <span class="bproof-quote-mark" aria-hidden="true">“</span>
                  <p>{quoteBody(review.body)}</p>
                </blockquote>
                <figcaption class="bproof-attribution"><strong>{review.name}</strong><span>{review.role}</span></figcaption>
              </figure>
            ))}
          </div>
          <p class="bproof-help" id="brandProofHelp">좌우로 넘겨 다른 이야기를 만나보세요.</p>
        </div>
        <aside class="bproof-aside" aria-label="이어서 볼 고객 후기">
          <p class="bproof-aside-label">NEXT STORIES</p>
          {[1, 2].map((step) => {
            const next = reviews[step % reviews.length]
            return <button class="bproof-peek" type="button" data-bproof-peek={String(step)} aria-label={`${next.tag} 고객 후기 보기`} disabled>
              <span class="bproof-peek-content"><span class="bproof-peek-tag">{next.tag}</span><strong class="bproof-peek-copy">{highlight(next.body)}</strong></span>
              {arrow()}
            </button>
          })}
        </aside>
      </div>
      <p class="bproof-status" data-bproof-status aria-live="polite" aria-atomic="true"></p>
    </div>
    <script src="/static/brand-proof-preview.js?v=20261007" defer />
  </section>
)
