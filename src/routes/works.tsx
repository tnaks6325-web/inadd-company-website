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

        {/* Grid */}
        <div class="wg-grid" id="worksGrid">

          {/* Card 1 - papa recipe */}
          <article class="wg-card" data-cat="viral influencer">
            <div class="wg-thumb">
              <img src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80" alt="파파레시피 캠페인" loading="lazy" />
              <div class="wg-overlay">
                <div class="wg-overlay-logo">
                  <span>papa recipe</span>
                </div>
              </div>
            </div>
            <div class="wg-meta">
              <span class="wg-brand">파파레시피</span>
              <p class="wg-tags-text">프로모션 바이럴 · 브랜드 콘텐츠 제작 · PPL</p>
            </div>
          </article>

          {/* Card 2 - 빼빼로 */}
          <article class="wg-card" data-cat="viral">
            <div class="wg-thumb">
              <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80" alt="빼빼로 캠페인" loading="lazy" />
              <div class="wg-overlay">
                <div class="wg-overlay-logo">
                  <span>빼빼로</span>
                </div>
              </div>
            </div>
            <div class="wg-meta">
              <span class="wg-brand">롯데제과</span>
              <p class="wg-tags-text">프로모션 바이럴 · 브랜드 콘텐츠 제작 · 신제품 런칭 홍보</p>
            </div>
          </article>

          {/* Card 3 - G마켓 */}
          <article class="wg-card" data-cat="influencer seo">
            <div class="wg-thumb">
              <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80" alt="G마켓 캠페인" loading="lazy" />
              <div class="wg-overlay">
                <div class="wg-overlay-logo">
                  <span>G market</span>
                </div>
              </div>
            </div>
            <div class="wg-meta">
              <span class="wg-brand">지마켓</span>
              <p class="wg-tags-text">프로모션 바이럴 · 마케팅 기획</p>
            </div>
          </article>

          {/* Card 4 - LG */}
          <article class="wg-card" data-cat="influencer seeding">
            <div class="wg-thumb">
              <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80" alt="LG 캠페인" loading="lazy" />
              <div class="wg-overlay">
                <div class="wg-overlay-logo">
                  <span>LG</span>
                </div>
              </div>
            </div>
            <div class="wg-meta">
              <span class="wg-brand">LG전자</span>
              <p class="wg-tags-text">브랜드 런레포 제작 · 소셜미디어 체험단 · 프로모션 바이럴</p>
            </div>
          </article>

          {/* Card 5 - 식품 */}
          <article class="wg-card" data-cat="review seeding">
            <div class="wg-thumb">
              <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80" alt="식품 캠페인" loading="lazy" />
              <div class="wg-overlay">
                <div class="wg-overlay-logo">
                  <span>F&amp;B</span>
                </div>
              </div>
            </div>
            <div class="wg-meta">
              <span class="wg-brand">식품 브랜드</span>
              <p class="wg-tags-text">소셜미디어 제품단 · 프로모션 바이럴 · 신제품 런칭 홍보</p>
            </div>
          </article>

          {/* Card 6 - 종근당건강 */}
          <article class="wg-card" data-cat="oliveyoung review">
            <div class="wg-thumb">
              <img src="https://images.unsplash.com/photo-1585435557343-3b092031a831?w=600&q=80" alt="종근당건강 캠페인" loading="lazy" />
              <div class="wg-overlay">
                <div class="wg-overlay-logo">
                  <span>종근당건강</span>
                </div>
              </div>
            </div>
            <div class="wg-meta">
              <span class="wg-brand">종근당건강</span>
              <p class="wg-tags-text">소셜미디어 제품단 · 프로모션 바이럴 · 신제품 런칭 홍보</p>
            </div>
          </article>

          {/* Card 7 - 뷰티 */}
          <article class="wg-card" data-cat="oliveyoung influencer">
            <div class="wg-thumb">
              <img src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&q=80" alt="뷰티 캠페인" loading="lazy" />
              <div class="wg-overlay">
                <div class="wg-overlay-logo">
                  <span>K-BEAUTY</span>
                </div>
              </div>
            </div>
            <div class="wg-meta">
              <span class="wg-brand">K-뷰티 브랜드</span>
              <p class="wg-tags-text">올리브영 마케팅 · 인플루언서 협업 · 시딩 캠페인</p>
            </div>
          </article>

          {/* Card 8 - 헬스케어 */}
          <article class="wg-card" data-cat="seo review">
            <div class="wg-thumb">
              <img src="https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?w=600&q=80" alt="헬스케어 캠페인" loading="lazy" />
              <div class="wg-overlay">
                <div class="wg-overlay-logo">
                  <span>HEALTHCARE</span>
                </div>
              </div>
            </div>
            <div class="wg-meta">
              <span class="wg-brand">헬스케어 브랜드</span>
              <p class="wg-tags-text">SEO 마케팅 · 리뷰 마케팅 · 커뮤니티 바이럴</p>
            </div>
          </article>

          {/* Card 9 - 패션 */}
          <article class="wg-card" data-cat="ppl influencer">
            <div class="wg-thumb">
              <img src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&q=80" alt="패션 PPL" loading="lazy" />
              <div class="wg-overlay">
                <div class="wg-overlay-logo">
                  <span>FASHION</span>
                </div>
              </div>
            </div>
            <div class="wg-meta">
              <span class="wg-brand">패션 브랜드</span>
              <p class="wg-tags-text">PPL · 인플루언서 마케팅 · 브랜드 콘텐츠</p>
            </div>
          </article>

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
