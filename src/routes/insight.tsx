import { INSIGHT_ARTICLES, CONTENT_SUB_LABELS, type ContentSubCategory } from '../data/insight-articles'

export const InsightPage = () => {
  const articles = INSIGHT_ARTICLES

  // 콘텐츠 별 전략 세부 탭 목록 (서비스 순서 그대로)
  const subTabs: { key: ContentSubCategory; label: string }[] = [
    { key: 'viral',      label: '바이럴 마케팅' },
    { key: 'influencer', label: '인플루언서 마케팅' },
    { key: 'seeding',    label: '시딩 캠페인' },
    { key: 'seo',        label: 'SEO 마케팅' },
    { key: 'review',     label: '리뷰 마케팅' },
    { key: 'oliveyoung', label: '올리브영 마케팅' },
    { key: 'ppl',        label: 'PPL 마케팅' },
  ]

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

          {/* ── 1단계: 메인 탭 ── */}
          <nav class="ins2-tab-bar" id="ins2MainTabs">
            <button class="ins2-tab active" data-main="all">All</button>
            <button class="ins2-tab" data-main="content-strategy">콘텐츠 별 전략</button>
            <button class="ins2-tab" data-main="case-study">실전 사례</button>
          </nav>

          {/* ── 2단계: 콘텐츠 별 전략 세부 탭 (기본 hidden) ── */}
          <nav class="ins2-sub-tab-bar" id="ins2SubTabs" style="display:none;">
            <button class="ins2-sub-tab active" data-sub="all-strategy">전체</button>
            {subTabs.map(t => (
              <button class="ins2-sub-tab" data-sub={t.key} key={t.key}>{t.label}</button>
            ))}
          </nav>

          {/* ── 카드 그리드 ── */}
          <div class="ins2-grid" id="ins2Grid">
            {articles.map(article => (
              <a
                key={article.id}
                href={`/insight/${article.id}`}
                class="ins2-card"
                data-main-cat={article.category}
                data-sub-cat={article.subCategory ?? ''}
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
                    <span class="ins2-date">{article.date}</span>
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

      {/* ── 탭 필터 JS ── */}
      <script dangerouslySetInnerHTML={{__html: `
(function() {
  var mainTabs   = document.querySelectorAll('.ins2-tab');
  var subTabBar  = document.getElementById('ins2SubTabs');
  var subTabs    = document.querySelectorAll('.ins2-sub-tab');
  var cards      = document.querySelectorAll('.ins2-card');
  var empty      = document.getElementById('ins2Empty');

  var currentMain = 'all';
  var currentSub  = 'all-strategy';

  function applyFilter() {
    var visible = 0;
    cards.forEach(function(card) {
      var mainCat = card.getAttribute('data-main-cat');
      var subCat  = card.getAttribute('data-sub-cat');

      var showMain = currentMain === 'all' || mainCat === currentMain;
      var showSub  = true;

      // 콘텐츠별전략 탭이 활성일 때만 세부 필터 적용
      if (currentMain === 'content-strategy' && currentSub !== 'all-strategy') {
        showSub = subCat === currentSub;
      }

      if (showMain && showSub) {
        card.style.display = '';
        visible++;
      } else {
        card.style.display = 'none';
      }
    });

    if (empty) empty.style.display = visible === 0 ? 'block' : 'none';
  }

  // 메인 탭 클릭
  mainTabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      currentMain = this.getAttribute('data-main');

      mainTabs.forEach(function(t) { t.classList.remove('active'); });
      this.classList.add('active');

      // 콘텐츠별전략 선택 시 서브탭 표시
      if (currentMain === 'content-strategy') {
        subTabBar.style.display = 'flex';
      } else {
        subTabBar.style.display = 'none';
        // 서브탭 초기화
        currentSub = 'all-strategy';
        subTabs.forEach(function(t) { t.classList.remove('active'); });
        subTabs[0] && subTabs[0].classList.add('active');
      }

      applyFilter();
    });
  });

  // 서브 탭 클릭
  subTabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      currentSub = this.getAttribute('data-sub');
      subTabs.forEach(function(t) { t.classList.remove('active'); });
      this.classList.add('active');
      applyFilter();
    });
  });

  // 초기 렌더
  applyFilter();
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
