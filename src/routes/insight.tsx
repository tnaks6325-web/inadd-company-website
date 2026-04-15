import { INSIGHT_ARTICLES } from '../data/insight-articles'

export const InsightPage = () => {
  const articles = INSIGHT_ARTICLES

  return (
    <>
      {/* ── Page Hero ── */}
      <section class="page-hero insight-hero">
        <div class="page-hero-bg"><div class="hero-glow glow-1"></div></div>
        <div class="container">
          <span class="sec-label">[ MARKETING INSIGHT ]</span>
          <h1 class="page-title">마케팅<br /><em>인사이트</em></h1>
          <p class="page-desc">광고주가 참고할 수 있는 마케팅 전략과 실전 사례를 공유합니다.</p>
        </div>
      </section>

      {/* ── 아티클 목록 ── */}
      <section class="section insight-list-section">
        <div class="container">

          {/* ── 카테고리 탭 ── */}
          <nav class="ins2-tab-bar" id="ins2Tabs">
            <button class="ins2-tab active" data-cat="all">All</button>
            <button class="ins2-tab" data-cat="content-strategy">콘텐츠 별 전략</button>
            <button class="ins2-tab" data-cat="case-study">실전 사례</button>
          </nav>

          {/* ── 카드 그리드 ── */}
          <div class="ins2-grid" id="ins2Grid">
            {articles.map(article => (
              <a
                key={article.id}
                href={`/insight/${article.id}`}
                class="ins2-card"
                data-cat={article.category}
              >
                {/* 썸네일 */}
                <div class="ins2-thumb">
                  <img
                    src={article.thumbnail}
                    alt={article.title}
                    class="ins2-thumb-img"
                    loading="lazy"
                    onerror="this.style.display='none';this.parentElement.classList.add('ins2-thumb--fallback')"
                  />
                  <span class="ins2-tag">{article.tags[0]}</span>
                </div>

                {/* 본문 정보 */}
                <div class="ins2-body">
                  <h3 class="ins2-title">{article.title}</h3>
                  <p class="ins2-summary">{article.summary}</p>
                  <div class="ins2-meta">
                    <span class="ins2-date">{article.date.replace(/-/g, '-')}</span>
                    <span class="ins2-views">조회수 {article.views}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* 글이 없을 때 */}
          <div class="ins2-empty" id="ins2Empty" style="display:none;">
            <p>아직 등록된 글이 없습니다.</p>
          </div>

        </div>
      </section>

      {/* 탭 필터 JS */}
      <script dangerouslySetInnerHTML={{__html: `
(function() {
  var tabs = document.querySelectorAll('.ins2-tab');
  var cards = document.querySelectorAll('.ins2-card');
  var empty = document.getElementById('ins2Empty');

  tabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      var cat = this.getAttribute('data-cat');

      // 탭 active
      tabs.forEach(function(t) { t.classList.remove('active'); });
      this.classList.add('active');

      // 카드 필터
      var visible = 0;
      cards.forEach(function(card) {
        if (cat === 'all' || card.getAttribute('data-cat') === cat) {
          card.style.display = '';
          visible++;
        } else {
          card.style.display = 'none';
        }
      });

      if (empty) empty.style.display = visible === 0 ? 'block' : 'none';
    });
  });
})();
      `}} />

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
