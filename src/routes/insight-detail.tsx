interface Props {
  id: string
}

export const InsightDetailPage = ({ id }: Props) => {
  // 모든 글을 클라이언트에서 API로 로드 (하드코딩 제거)
  const CAT_LABEL: Record<string, string> = {
    'case-study': '실전 사례',
    'content-strategy': '콘텐츠 별 전략',
  }
  const SUB_LABEL: Record<string, string> = {
    viral: '바이럴 마케팅', influencer: '인플루언서', seeding: '시딩',
    seo: 'SEO', review: '리뷰', oliveyoung: '올리브영', ppl: 'PPL',
  }

  return (
    <>
      {/* ── 로딩 중 플레이스홀더 ── */}
      <div id="detailLoading" style="min-height:60vh;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:16px;">
        <div style="width:36px;height:36px;border:3px solid #2a2a2a;border-top-color:#1a6bff;border-radius:50%;animation:ins2Spin .7s linear infinite"></div>
        <p style="color:#555;font-size:14px">글을 불러오는 중...</p>
      </div>

      {/* ── 404 (JS로 토글) ── */}
      <section id="detail404" style="display:none;">
        <div class="container" style="text-align:center;padding:120px 0;">
          <span class="sec-label">404</span>
          <h1 class="page-title" style="font-size:2rem;">글을 찾을 수 없습니다</h1>
          <a href="/insight" class="hero-cta-btn primary" style="margin-top:32px;display:inline-flex;">
            <span>목록으로 돌아가기</span>
          </a>
        </div>
      </section>

      {/* ── 본문 (JS로 채움) ── */}
      <div id="detailContent" style="display:none;">
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
              <span class="ins2-tag ins2-tag--hero" id="detailCatTag"></span>
              <span class="ins2-tag ins2-tag--ghost" id="detailSubTag" style="display:none"></span>
            </div>
            <h1 class="ins-detail-title" id="detailTitle"></h1>
            <div class="ins-detail-info">
              <span id="detailDate"></span>
            </div>
          </div>
        </section>

        <div class="container ins-detail-thumb-wrap">
          <img id="detailThumb" src="" alt="" class="ins-detail-thumb" onerror="this.style.display='none'" style="display:none" />
        </div>

        <article class="container ins-detail-body">
          <div class="ins-detail-content" id="detailBody"></div>
        </article>

        {/* 관련 글 */}
        <section class="section ins-detail-related" id="detailRelated" style="display:none;">
          <div class="container">
            <h3 class="ins-detail-related-title">다른 인사이트</h3>
            <div class="ins2-grid ins2-grid--related" id="detailRelatedGrid"></div>
          </div>
        </section>

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

      {/* ── 데이터 로딩 JS ── */}
      <script dangerouslySetInnerHTML={{__html: `
(function(){
  var postId = ${JSON.stringify(id)};
  // admin_ 접두사 제거해서 실제 ID 추출
  var realId = postId.replace(/^admin_/, '');

  var CAT_LABEL = {'case-study':'실전 사례','content-strategy':'콘텐츠 별 전략'};
  var SUB_LABEL = {viral:'바이럴 마케팅',influencer:'인플루언서',seeding:'시딩',seo:'SEO',review:'리뷰',oliveyoung:'올리브영',ppl:'PPL'};

  function show404(){
    document.getElementById('detailLoading').style.display='none';
    document.getElementById('detail404').style.display='';
  }

  fetch('/api/admin/public/insight')
    .then(function(r){ return r.json(); })
    .then(function(data){
      var posts = data.posts || [];
      var post = posts.find(function(p){ return p.id === realId; });
      if(!post){ show404(); return; }

      // 헤더
      document.getElementById('detailCatTag').textContent = CAT_LABEL[post.mainCategory] || '인사이트';
      var subEl = document.getElementById('detailSubTag');
      if(post.subCategory && SUB_LABEL[post.subCategory]){
        subEl.textContent = SUB_LABEL[post.subCategory];
        subEl.style.display='';
      }
      document.getElementById('detailTitle').textContent = post.title || '';
      document.getElementById('detailDate').textContent = (post.createdAt||'').slice(0,10);

      // 썸네일
      if(post.thumbnail){
        var th = document.getElementById('detailThumb');
        th.src = post.thumbnail;
        th.alt = post.title;
        th.style.display = '';
      }

      // 본문 (HTML 허용)
      document.getElementById('detailBody').innerHTML = post.content || '<p style="color:#666">본문이 없습니다.</p>';

      // 관련 글 (다른 글 최대 3개)
      var others = posts.filter(function(p){ return p.id !== realId; }).slice(0,3);
      if(others.length){
        var grid = document.getElementById('detailRelatedGrid');
        grid.innerHTML = others.map(function(a){
          var tag = SUB_LABEL[a.subCategory] || CAT_LABEL[a.mainCategory] || '인사이트';
          var dateStr = (a.createdAt||'').slice(0,10);
          return '<a href="/insight/admin_'+a.id+'" class="ins2-card">'
            +'<div class="ins2-thumb">'
            +(a.thumbnail ? '<img src="'+a.thumbnail+'" alt="'+a.title+'" class="ins2-thumb-img" loading="lazy" onerror="this.style.display=\\'none\\'">' : '<div class="ins2-thumb-fallback"><i class="fas fa-newspaper"></i></div>')
            +'<span class="ins2-tag">'+tag+'</span>'
            +'</div>'
            +'<div class="ins2-body">'
            +'<h3 class="ins2-title">'+(a.title||'')+'</h3>'
            +'<div class="ins2-meta"><span class="ins2-date">'+dateStr+'</span></div>'
            +'</div>'
            +'</a>';
        }).join('');
        document.getElementById('detailRelated').style.display='';
      }

      // 표시
      document.getElementById('detailLoading').style.display='none';
      document.getElementById('detailContent').style.display='';
    })
    .catch(function(){ show404(); });
})();
      `}} />
    </>
  )
}
