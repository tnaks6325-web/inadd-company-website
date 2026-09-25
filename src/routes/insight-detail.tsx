import { CAT_LABEL, SUB_LABEL, postPath, type InsightPost } from '../lib/insight-posts'

interface Props {
  post: InsightPost | null
  related?: InsightPost[]
}

// 서버에서 본문까지 완성된 HTML로 내려준다 (검색로봇이 JS 없이도 글을 읽을 수 있도록)
export const InsightDetailPage = ({ post, related = [] }: Props) => {
  if (!post) {
    return (
      <section id="detail404">
        <div class="container" style="text-align:center;padding:120px 0;">
          <span class="sec-label">404</span>
          <h1 class="page-title" style="font-size:2rem;">글을 찾을 수 없습니다</h1>
          <a href="/insight" class="hero-cta-btn primary" style="margin-top:32px;display:inline-flex;">
            <span>목록으로 돌아가기</span>
          </a>
        </div>
      </section>
    )
  }

  const catLabel = CAT_LABEL[post.mainCategory || ''] || '인사이트'
  const subLabel = post.subCategory ? SUB_LABEL[post.subCategory] : ''
  const date = (post.createdAt || '').slice(0, 10)

  return (
    <div id="detailContent">
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
            {subLabel && <span class="ins2-tag ins2-tag--ghost">{subLabel}</span>}
          </div>
          <h1 class="ins-detail-title">{post.title}</h1>
          <div class="ins-detail-info">
            <time datetime={post.createdAt || ''}>{date}</time>
          </div>
        </div>
      </section>

      {post.thumbnail && (
        <div class="container ins-detail-thumb-wrap">
          <img src={post.thumbnail} alt={post.title} class="ins-detail-thumb" onerror="this.style.display='none'" />
        </div>
      )}

      <article class="container ins-detail-body">
        <div class="ins-detail-content" dangerouslySetInnerHTML={{ __html: post.content || '<p style="color:#666">본문이 없습니다.</p>' }}></div>
      </article>

      {related.length > 0 && (
        <section class="section ins-detail-related">
          <div class="container">
            <h3 class="ins-detail-related-title">다른 인사이트</h3>
            <div class="ins2-grid ins2-grid--related">
              {related.map(a => (
                <a href={postPath(a)} class="ins2-card">
                  <div class="ins2-thumb">
                    {a.thumbnail
                      ? <img src={a.thumbnail} alt={a.title} class="ins2-thumb-img" loading="lazy" onerror="this.style.display='none'" />
                      : <div class="ins2-thumb-fallback"><i class="fas fa-newspaper"></i></div>}
                    <span class="ins2-tag">{SUB_LABEL[a.subCategory || ''] || CAT_LABEL[a.mainCategory || ''] || '인사이트'}</span>
                  </div>
                  <div class="ins2-body">
                    <h3 class="ins2-title">{a.title}</h3>
                    <div class="ins2-meta"><span class="ins2-date">{(a.createdAt || '').slice(0, 10)}</span></div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

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
    </div>
  )
}
