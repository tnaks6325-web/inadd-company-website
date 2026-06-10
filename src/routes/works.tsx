export const WorksPage = () => (
  <>
    {/* ── Page Hero ── */}
    <section class="page-hero">
      <div class="page-hero-bg"><div class="hero-glow glow-1"></div></div>
      <div class="container">
        <span class="sec-label">Our Works</span>
        <h1 class="page-title">[ WORKS ]</h1>
        <p class="page-desc">인애드컴퍼니가 함께한 브랜드들의 마케팅 성과입니다.</p>
      </div>
    </section>

    {/* ── Works Grid ── */}
    <section class="section works-gallery-section">
      <div class="container works-container">

        {/* Filter */}
        <div class="works-filter" id="worksFilter">
          <button class="wf-btn active" data-filter="all">전체</button>
          <button class="wf-btn" data-filter="viral">바이럴</button>
          <button class="wf-btn" data-filter="influencer">인플루언서</button>
          <button class="wf-btn" data-filter="seeding">시딩</button>
          <button class="wf-btn" data-filter="seo">SEO</button>
          <button class="wf-btn" data-filter="review">리뷰</button>
          <button class="wf-btn" data-filter="oliveyoung">올리브영</button>
          <button class="wf-btn" data-filter="ppl">PPL</button>
        </div>

        {/* Grid — 관리자 등록 데이터로 동적 렌더 */}
        <div class="wg-grid" id="worksGrid">
        </div>{/* /wg-grid */}
      </div>
    </section>

    {/* ── CTA ── */}
    <section class="home-cta">
      <div class="home-cta-bg"><div class="hcta-glow"></div></div>
      <div class="container">
        <div class="home-cta-inner">
          <h2>다음 성공 케이스는<br /><em>당신의 브랜드입니다</em></h2>
          <p>인애드컴퍼니와 함께 시작해보세요.</p>
          <a href="/contact" class="hero-cta-btn primary">
            <span>무료 상담 신청하기</span>
            <svg viewBox="0 0 24 24" fill="none"><path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
        </div>
      </div>
    </section>

    {/* ── Admin Dynamic Works ── */}
    <script dangerouslySetInnerHTML={{__html: `
(function(){
  fetch('/api/admin/public/works')
    .then(function(r){ return r.json(); })
    .then(function(data){
      var items = data.items;
      if(!items || !items.length) return;
      var grid = document.getElementById('worksGrid');
      if(!grid) return;
      // 기존 정적 카드 제거 후 동적 렌더
      grid.innerHTML = '';
      items.forEach(function(item){
        var tags = (item.tags||[]).join(' ');
        var article = document.createElement('article');
        article.className = 'wg-card';
        article.setAttribute('data-cat', tags);
        article.innerHTML =
          '<div class="wg-thumb">'
          +'<img src="'+(item.thumb||'')+'" alt="'+(item.brand||'')+'" loading="lazy" onerror="this.style.opacity=0">'
          +'<div class="wg-overlay">'
          +'<div class="wg-overlay-logo"><span>'+(item.overlay||item.brand||'')+'</span></div>'
          +'</div>'
          +'</div>'
          +'<div class="wg-meta">'
          +'<span class="wg-brand">'+(item.brand||'')+'</span>'
          +'<p class="wg-tags-text">'+(item.services||'')+'</p>'
          +'</div>';
        grid.appendChild(article);
      });
      // 필터 재바인딩
      var filterBtns = document.querySelectorAll('.wf-btn');
      filterBtns.forEach(function(btn){
        btn.addEventListener('click', function(){
          filterBtns.forEach(function(b){ b.classList.remove('active'); });
          btn.classList.add('active');
          var filter = btn.getAttribute('data-filter');
          grid.querySelectorAll('.wg-card').forEach(function(card){
            var cat = card.getAttribute('data-cat') || '';
            card.style.display = (filter==='all' || cat.indexOf(filter)>-1) ? '' : 'none';
          });
        });
      });
    })
    .catch(function(){});
})();
    `}} />
  </>
)
