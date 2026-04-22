export const InsightPage = () => {
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

          {/* ── 2단계: 콘텐츠 별 전략 세부 탭 ── */}
          <nav class="ins2-sub-tab-bar" id="ins2SubTabs" style="display:none;">
            <button class="ins2-sub-tab active" data-sub="all-strategy">전체</button>
            <button class="ins2-sub-tab" data-sub="viral">바이럴 마케팅</button>
            <button class="ins2-sub-tab" data-sub="influencer">인플루언서 마케팅</button>
            <button class="ins2-sub-tab" data-sub="seeding">시딩 캠페인</button>
            <button class="ins2-sub-tab" data-sub="seo">SEO 마케팅</button>
            <button class="ins2-sub-tab" data-sub="review">리뷰 마케팅</button>
            <button class="ins2-sub-tab" data-sub="oliveyoung">올리브영 마케팅</button>
            <button class="ins2-sub-tab" data-sub="ppl">PPL 마케팅</button>
          </nav>

          {/* ── 카드 그리드 — 어드민 API로 채움 ── */}
          <div class="ins2-grid" id="ins2Grid">
            {/* 로딩 플레이스홀더 */}
            <div class="ins2-loading" id="ins2Loading">
              <div class="ins2-spinner"></div>
              <p>게시물을 불러오는 중...</p>
            </div>
          </div>

          {/* 글이 없을 때 */}
          <div class="ins2-empty" id="ins2Empty" style="display:none;">
            <p>아직 등록된 글이 없습니다.</p>
          </div>

        </div>
      </section>

      {/* ── 탭 필터 + 어드민 데이터 로딩 통합 JS ── */}
      <script dangerouslySetInnerHTML={{__html: `
(function() {
  var mainTabs  = document.querySelectorAll('.ins2-tab');
  var subTabBar = document.getElementById('ins2SubTabs');
  var subTabs   = document.querySelectorAll('.ins2-sub-tab');
  var grid      = document.getElementById('ins2Grid');
  var empty     = document.getElementById('ins2Empty');
  var loading   = document.getElementById('ins2Loading');

  var currentMain = 'all';
  var currentSub  = 'all-strategy';

  var CAT_LABELS = { 'content-strategy':'콘텐츠 전략', 'case-study':'실전 사례' };
  var SUB_LABELS = { viral:'바이럴 마케팅', influencer:'인플루언서', seeding:'시딩', seo:'SEO', review:'리뷰', oliveyoung:'올리브영', ppl:'PPL' };

  function applyFilter() {
    var cards = grid.querySelectorAll('.ins2-card');
    var visible = 0;
    cards.forEach(function(card) {
      var mainCat = card.getAttribute('data-main-cat');
      var subCat  = card.getAttribute('data-sub-cat');
      var showMain = currentMain === 'all' || mainCat === currentMain;
      var showSub  = true;
      if (currentMain === 'content-strategy' && currentSub !== 'all-strategy') {
        showSub = subCat === currentSub;
      }
      if (showMain && showSub) { card.style.display = ''; visible++; }
      else { card.style.display = 'none'; }
    });
    if (empty) empty.style.display = visible === 0 ? 'block' : 'none';
  }

  function renderCards(posts) {
    if (loading) loading.style.display = 'none';
    // 기존 카드 전부 제거
    grid.querySelectorAll('.ins2-card').forEach(function(c){ c.remove(); });

    if (!posts || !posts.length) {
      if (empty) empty.style.display = 'block';
      return;
    }

    posts.forEach(function(post) {
      var a = document.createElement('a');
      a.href = '/insight/admin_' + post.id;
      a.className = 'ins2-card';
      a.setAttribute('data-main-cat', post.mainCategory || '');
      a.setAttribute('data-sub-cat',  post.subCategory  || '');
      var dateStr = (post.createdAt || '').slice(0, 10);
      var tag = SUB_LABELS[post.subCategory] || CAT_LABELS[post.mainCategory] || '인사이트';
      a.innerHTML =
        '<div class="ins2-thumb">'
        + (post.thumbnail
            ? '<img src="' + post.thumbnail + '" alt="' + post.title + '" class="ins2-thumb-img" loading="lazy" onerror="this.style.display=\\'none\\'">'
            : '<div class="ins2-thumb-fallback"><i class="fas fa-newspaper"></i></div>')
        + '<span class="ins2-tag">' + tag + '</span>'
        + '</div>'
        + '<div class="ins2-body">'
        + '<h3 class="ins2-title">' + (post.title || '') + '</h3>'
        + '<p class="ins2-summary">' + (post.summary || '') + '</p>'
        + '<div class="ins2-meta">'
        + '<span class="ins2-date">' + dateStr + '</span>'
        + '</div>'
        + '</div>';
      grid.appendChild(a);
    });

    applyFilter();
  }

  // ── 어드민 API에서 포스트 로드 ──
  fetch('/api/admin/public/insight')
    .then(function(r) { return r.json(); })
    .then(function(data) { renderCards(data.posts || []); })
    .catch(function() {
      if (loading) loading.style.display = 'none';
      if (empty) empty.style.display = 'block';
    });

  // ── 메인 탭 클릭 ──
  mainTabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      currentMain = this.getAttribute('data-main');
      mainTabs.forEach(function(t) { t.classList.remove('active'); });
      this.classList.add('active');
      if (currentMain === 'content-strategy') {
        subTabBar.style.display = 'flex';
      } else {
        subTabBar.style.display = 'none';
        currentSub = 'all-strategy';
        subTabs.forEach(function(t) { t.classList.remove('active'); });
        subTabs[0] && subTabs[0].classList.add('active');
      }
      applyFilter();
    });
  });

  // ── 서브 탭 클릭 ──
  subTabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      currentSub = this.getAttribute('data-sub');
      subTabs.forEach(function(t) { t.classList.remove('active'); });
      this.classList.add('active');
      applyFilter();
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
