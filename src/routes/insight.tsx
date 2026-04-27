export const InsightPage = () => {
  return (
    <>
      {/* ── Page Hero ── */}
      <section class="page-hero insight-hero">
        <div class="page-hero-bg"><div class="hero-glow glow-1"></div></div>
        <div class="container">
          <span class="sec-label">[ IN AD COMPANY INSIGHT ]</span>
          <h1 class="page-title">인애드컴퍼니가<br /><em>알려드립니다</em></h1>
          <p class="page-desc">마케팅 전략·실전 사례, 그리고 인애드컴퍼니의 일상을 함께 나눕니다.</p>
        </div>
      </section>

      {/* ── 콘텐츠 영역 ── */}
      <section class="section insight-list-section">
        <div class="container">

          {/* ── 메인 탭 ── */}
          <nav class="ins2-tab-bar" id="ins2MainTabs">
            <button class="ins2-tab active" data-main="all">All</button>
            <button class="ins2-tab" data-main="content-strategy">콘텐츠 별 전략</button>
            <button class="ins2-tab" data-main="case-study">실전 사례</button>
            <button class="ins2-tab ins2-tab--gallery" data-main="gallery">
              <span class="ins2-tab-dot"></span>인애드 일상
            </button>
          </nav>

          {/* ── 콘텐츠 별 전략 세부 탭 ── */}
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

          {/* ── 아티클 카드 그리드 ── */}
          <div class="ins2-grid" id="ins2Grid">
            <div class="ins2-loading" id="ins2Loading">
              <div class="ins2-spinner"></div>
              <p>게시물을 불러오는 중...</p>
            </div>
          </div>
          <div class="ins2-empty" id="ins2Empty" style="display:none;">
            <p>아직 등록된 글이 없습니다.</p>
          </div>

          {/* ── 갤러리 (인애드 일상) ── */}
          <div class="insgal-wrap" id="insGalWrap" style="display:none;">

            {/* 갤러리 필터 태그 */}
            <div class="insgal-filter" id="insGalFilter">
              <button class="insgal-ftag active" data-tag="all">전체</button>
              <button class="insgal-ftag" data-tag="일상">일상</button>
              <button class="insgal-ftag" data-tag="팀">팀</button>
              <button class="insgal-ftag" data-tag="오피스">오피스</button>
              <button class="insgal-ftag" data-tag="행사">행사</button>
              <button class="insgal-ftag" data-tag="캠페인">캠페인</button>
            </div>

            {/* 마소닉 그리드 */}
            <div class="insgal-grid" id="insGalGrid">
              <div class="ins2-loading" id="insGalLoading">
                <div class="ins2-spinner"></div>
                <p>사진을 불러오는 중...</p>
              </div>
            </div>
            <div class="ins2-empty" id="insGalEmpty" style="display:none;">
              <i class="fas fa-images" style="font-size:40px;opacity:.3;margin-bottom:12px;display:block"></i>
              <p>아직 등록된 사진이 없습니다.</p>
            </div>

          </div>

          {/* 라이트박스 */}
          <div class="insgal-lightbox" id="insGalLightbox" style="display:none;">
            <div class="insgal-lb-backdrop" id="insGalLbBackdrop"></div>
            <div class="insgal-lb-content">
              <button class="insgal-lb-close" id="insGalLbClose">✕</button>
              <img class="insgal-lb-img" id="insGalLbImg" src="" alt="" />
              <div class="insgal-lb-caption" id="insGalLbCaption"></div>
              <span class="insgal-lb-tag" id="insGalLbTag"></span>
            </div>
          </div>

        </div>
      </section>

      {/* ── JS ── */}
      <script dangerouslySetInnerHTML={{__html: `
(function() {
  /* ── 공통 요소 ── */
  var mainTabs   = document.querySelectorAll('.ins2-tab');
  var subTabBar  = document.getElementById('ins2SubTabs');
  var subTabs    = document.querySelectorAll('.ins2-sub-tab');
  var grid       = document.getElementById('ins2Grid');
  var empty      = document.getElementById('ins2Empty');
  var loading    = document.getElementById('ins2Loading');
  var galWrap    = document.getElementById('insGalWrap');
  var galGrid    = document.getElementById('insGalGrid');
  var galEmpty   = document.getElementById('insGalEmpty');
  var galLoading = document.getElementById('insGalLoading');
  var galFilter  = document.getElementById('insGalFilter');
  var lightbox   = document.getElementById('insGalLightbox');
  var lbImg      = document.getElementById('insGalLbImg');
  var lbCaption  = document.getElementById('insGalLbCaption');
  var lbTag      = document.getElementById('insGalLbTag');
  var lbClose    = document.getElementById('insGalLbClose');
  var lbBackdrop = document.getElementById('insGalLbBackdrop');

  var currentMain = 'all';
  var currentSub  = 'all-strategy';
  var currentGalTag = 'all';
  var allGalItems = [];

  var CAT_LABELS = { 'content-strategy':'콘텐츠 전략', 'case-study':'실전 사례' };
  var SUB_LABELS = { viral:'바이럴 마케팅', influencer:'인플루언서', seeding:'시딩', seo:'SEO', review:'리뷰', oliveyoung:'올리브영', ppl:'PPL' };

  /* ── 아티클 필터 ── */
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

  /* ── 아티클 렌더 ── */
  function renderCards(posts) {
    if (loading) loading.style.display = 'none';
    grid.querySelectorAll('.ins2-card').forEach(function(c){ c.remove(); });
    if (!posts || !posts.length) { if (empty) empty.style.display = 'block'; return; }
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
        + '<div class="ins2-meta"><span class="ins2-date">' + dateStr + '</span></div>'
        + '</div>';
      grid.appendChild(a);
    });
    applyFilter();
  }

  /* ── 갤러리 필터 적용 ── */
  function applyGalFilter() {
    var items = currentGalTag === 'all'
      ? allGalItems
      : allGalItems.filter(function(i){ return i.tag === currentGalTag; });
    renderGalItems(items, false);
  }

  /* ── 갤러리 렌더 ── */
  function renderGalItems(items, showLoader) {
    if (galLoading) galLoading.style.display = 'none';
    galGrid.querySelectorAll('.insgal-item').forEach(function(el){ el.remove(); });
    if (!items || !items.length) {
      if (galEmpty) galEmpty.style.display = 'flex';
      return;
    }
    if (galEmpty) galEmpty.style.display = 'none';

    items.forEach(function(item, idx) {
      var div = document.createElement('div');
      /* 마소닉: 3/6/9... 번째 아이템을 tall로 */
      var isTall = (idx % 5 === 2);
      div.className = 'insgal-item' + (isTall ? ' insgal-item--tall' : '');
      div.setAttribute('data-tag', item.tag || '일상');
      div.innerHTML =
        '<img src="' + item.imageUrl + '" alt="' + (item.caption||'') + '" loading="lazy" />'
        + '<div class="insgal-item-overlay">'
        + (item.tag ? '<span class="insgal-item-tag">' + item.tag + '</span>' : '')
        + (item.caption ? '<p class="insgal-item-caption">' + item.caption + '</p>' : '')
        + '</div>';
      div.addEventListener('click', function() {
        lbImg.src = item.imageUrl;
        lbCaption.textContent = item.caption || '';
        lbTag.textContent = item.tag || '';
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        setTimeout(function(){ lightbox.classList.add('insgal-lb--visible'); }, 10);
      });
      galGrid.appendChild(div);
    });
  }

  /* ── 라이트박스 닫기 ── */
  function closeLightbox() {
    lightbox.classList.remove('insgal-lb--visible');
    setTimeout(function(){
      lightbox.style.display = 'none';
      document.body.style.overflow = '';
    }, 280);
  }
  if (lbClose)    lbClose.addEventListener('click', closeLightbox);
  if (lbBackdrop) lbBackdrop.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape') closeLightbox(); });

  /* ── 데이터 로드 ── */
  fetch('/api/admin/public/insight')
    .then(function(r){ return r.json(); })
    .then(function(d){ renderCards(d.posts || []); })
    .catch(function(){
      if (loading) loading.style.display = 'none';
      if (empty)   empty.style.display   = 'block';
    });

  function loadGallery() {
    if (galLoading) galLoading.style.display = 'flex';
    galGrid.querySelectorAll('.insgal-item').forEach(function(el){ el.remove(); });
    if (galEmpty) galEmpty.style.display = 'none';
    fetch('/api/admin/public/gallery')
      .then(function(r){ return r.json(); })
      .then(function(d){
        allGalItems = d.items || [];
        applyGalFilter();
      })
      .catch(function(){
        if (galLoading) galLoading.style.display = 'none';
        if (galEmpty)   galEmpty.style.display   = 'flex';
      });
  }

  /* ── 메인 탭 전환 ── */
  mainTabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      currentMain = this.getAttribute('data-main');
      mainTabs.forEach(function(t){ t.classList.remove('active'); });
      this.classList.add('active');

      /* 아티클 영역 vs 갤러리 영역 토글 */
      if (currentMain === 'gallery') {
        grid.style.display    = 'none';
        empty.style.display   = 'none';
        subTabBar.style.display = 'none';
        galWrap.style.display = 'block';
        loadGallery();
      } else {
        galWrap.style.display = 'none';
        grid.style.display    = '';
        if (currentMain === 'content-strategy') {
          subTabBar.style.display = 'flex';
        } else {
          subTabBar.style.display = 'none';
          currentSub = 'all-strategy';
          subTabs.forEach(function(t){ t.classList.remove('active'); });
          subTabs[0] && subTabs[0].classList.add('active');
        }
        applyFilter();
      }
    });
  });

  /* ── 서브 탭 ── */
  subTabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      currentSub = this.getAttribute('data-sub');
      subTabs.forEach(function(t){ t.classList.remove('active'); });
      this.classList.add('active');
      applyFilter();
    });
  });

  /* ── 갤러리 필터 태그 ── */
  if (galFilter) {
    galFilter.querySelectorAll('.insgal-ftag').forEach(function(btn) {
      btn.addEventListener('click', function() {
        currentGalTag = this.getAttribute('data-tag');
        galFilter.querySelectorAll('.insgal-ftag').forEach(function(b){ b.classList.remove('active'); });
        this.classList.add('active');
        applyGalFilter();
      });
    });
  }
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
