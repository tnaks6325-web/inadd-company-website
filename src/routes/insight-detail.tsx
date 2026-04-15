import { INSIGHT_ARTICLES } from '../data/insight-articles'

interface Props {
  id: string
}

export const InsightDetailPage = ({ id }: Props) => {
  const article = INSIGHT_ARTICLES.find(a => a.id === id)

  if (!article) {
    return (
      <>
        <section class="page-hero">
          <div class="container" style="text-align:center;padding:120px 0;">
            <span class="sec-label">404</span>
            <h1 class="page-title" style="font-size:2rem;">글을 찾을 수 없습니다</h1>
            <a href="/insight" class="hero-cta-btn primary" style="margin-top:32px;display:inline-flex;">
              <span>목록으로 돌아가기</span>
            </a>
          </div>
        </section>
      </>
    )
  }

  const catLabel = article.category === 'case-study' ? '실전 사례' : '콘텐츠 별 전략'

  return (
    <>
      {/* ── 상세 Hero ── */}
      <section class="ins-detail-hero">
        <div class="page-hero-bg"><div class="hero-glow glow-1"></div></div>
        <div class="container">
          <a href="/insight" class="ins-detail-back">
            <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
              <path d="M19 12H5M11 6L5 12L11 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            마케팅 인사이트
          </a>
          <div class="ins-detail-meta-top">
            <span class="ins2-tag ins2-tag--hero">{catLabel}</span>
            {article.tags.slice(1).map(tag => (
              <span class="ins2-tag ins2-tag--ghost" key={tag}>{tag}</span>
            ))}
          </div>
          <h1 class="ins-detail-title">{article.title}</h1>
          <div class="ins-detail-info">
            <span>{article.date}</span>
            <span>조회수 {article.views}</span>
          </div>
        </div>
      </section>

      {/* ── 썸네일 ── */}
      <div class="container ins-detail-thumb-wrap">
        <img
          src={article.thumbnail}
          alt={article.title}
          class="ins-detail-thumb"
          onerror="this.style.display='none'"
        />
      </div>

      {/* ── 본문 ── */}
      <article class="container ins-detail-body">
        <div class="ins-detail-content" dangerouslySetInnerHTML={{ __html: article.content }} />
      </article>

      {/* ── 다른 글 (같은 카테고리) ── */}
      {(() => {
        const others = INSIGHT_ARTICLES.filter(a => a.id !== id).slice(0, 3)
        if (others.length === 0) return null
        return (
          <section class="section ins-detail-related">
            <div class="container">
              <h3 class="ins-detail-related-title">다른 인사이트</h3>
              <div class="ins2-grid ins2-grid--related">
                {others.map(a => (
                  <a href={`/insight/${a.id}`} class="ins2-card" key={a.id}>
                    <div class="ins2-thumb">
                      <img
                        src={a.thumbnail}
                        alt={a.title}
                        class="ins2-thumb-img"
                        loading="lazy"
                        onerror="this.style.display='none';this.parentElement.classList.add('ins2-thumb--fallback')"
                      />
                      <span class="ins2-tag">{a.tags[0]}</span>
                    </div>
                    <div class="ins2-body">
                      <h3 class="ins2-title">{a.title}</h3>
                      <div class="ins2-meta">
                        <span class="ins2-date">{a.date}</span>
                        <span class="ins2-views">조회수 {a.views}</span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )
      })()}

      {/* ── CTA ── */}
      <section class="home-cta">
        <div class="home-cta-bg"><div class="hcta-glow"></div></div>
        <div class="container">
          <div class="home-cta-inner">
            <h2>우리 브랜드에 맞는<br /><em>마케팅 전략이 궁금하신가요?</em></h2>
            <p>인애드컴퍼니 전문가가 무료로 진단해드립니다.</p>
            <a href="/contact" class="hero-cta-btn primary">
              <span>무료 마케팅 상담 받기</span>
              <svg viewBox="0 0 24 24" fill="none"><path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
