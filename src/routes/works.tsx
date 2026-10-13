export const WorksPage = () => (
  <>
    {/* ── Page Hero ── */}
    <section class="page-hero page-hero--works">
      <div class="page-hero-img-bg" aria-hidden="true"></div>
      <div class="page-hero-bg"><div class="hero-glow glow-1"></div></div>
      <div class="container">
        <span class="sec-label">Our Works</span>
        <h1 class="page-title">[ WORKS ]</h1>
        <p class="page-desc">인애드컴퍼니가 함께한 브랜드들의 마케팅 성과입니다.</p>
      </div>
    </section>

    {/* ══ 라이트 테마 콘텐츠 래퍼 (히어로 제외) ══ */}
    <div class="svc-light">

    {/* ── Works Grid ── */}
    <section class="section works-gallery-section">
      <div class="container works-container">

        {/* Filter */}
        <div class="works-filter" id="worksFilter">
          <button class="wf-btn active" data-filter="all">전체</button>
          <button class="wf-btn" data-filter="viral">바이럴</button>
          <button class="wf-btn" data-filter="influencer">인플루언서</button>
          <button class="wf-btn" data-filter="seeding">체험단</button>
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
      <div class="cta-img-bg" aria-hidden="true" style="--cta-img:url('/static/images/다음 성공 케이스는 당신의 브랜드입니다.png')"></div>
      <div class="home-cta-bg"><div class="hcta-glow"></div></div>
      <div class="container">
        <div class="home-cta-inner">
          <h2>다음 성공 케이스는<br /><em>당신의 브랜드입니다</em></h2>
          <p>인애드컴퍼니와 함께 시작해보세요.</p>
          <a href="/contact" class="why-cta cta-inq-btn">
            <span>문의하기</span>
            <svg class="why-cta-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>
          </a>
        </div>
      </div>
    </section>

    {/* ── Admin Dynamic Works ── */}
    <script dangerouslySetInnerHTML={{__html: `
(function(){
  function esc(value){
    return String(value == null ? '' : value).replace(/[&<>"']/g, function(ch){
      return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[ch];
    });
  }
  window.fitWorksLogo = function(img){
    if (!img || img.dataset.logoFitted) return;
    img.dataset.logoFitted = '1';
    try {
      var nw=img.naturalWidth, nh=img.naturalHeight;
      if(!nw || !nh) return;
      var scale=Math.min(1,600/Math.max(nw,nh));
      var w=Math.max(1,Math.round(nw*scale));
      var h=Math.max(1,Math.round(nh*scale));
      var scan=document.createElement('canvas');
      scan.width=w; scan.height=h;
      var ctx=scan.getContext('2d',{willReadFrequently:true});
      if(!ctx) return;
      ctx.drawImage(img,0,0,w,h);
      var p=ctx.getImageData(0,0,w,h).data;
      var corners=[[0,0],[w-1,0],[0,h-1],[w-1,h-1]];
      var br=0,bg=0,bb=0;
      corners.forEach(function(c){
        var i=(c[1]*w+c[0])*4;
        br+=p[i]; bg+=p[i+1]; bb+=p[i+2];
      });
      br/=4; bg/=4; bb/=4;
      var minX=w,minY=h,maxX=-1,maxY=-1;
      for(var y=0;y<h;y++) for(var x=0;x<w;x++){
        var i=(y*w+x)*4;
        var distance=Math.abs(p[i]-br)+Math.abs(p[i+1]-bg)+Math.abs(p[i+2]-bb);
        if(p[i+3]>24 && distance>48){
          if(x<minX)minX=x; if(x>maxX)maxX=x;
          if(y<minY)minY=y; if(y>maxY)maxY=y;
        }
      }
      if(maxX<minX || maxY<minY) return;
      var pad=Math.max(4,Math.round(Math.max(maxX-minX,maxY-minY)*.06));
      minX=Math.max(0,minX-pad); minY=Math.max(0,minY-pad);
      maxX=Math.min(w-1,maxX+pad); maxY=Math.min(h-1,maxY+pad);
      var cropW=maxX-minX+1,cropH=maxY-minY+1;
      var out=document.createElement('canvas');
      out.width=cropW; out.height=cropH;
      var outCtx=out.getContext('2d');
      if(!outCtx) return;
      outCtx.drawImage(scan,minX,minY,cropW,cropH,0,0,cropW,cropH);
      /* 누끼: 배경색(모서리색)과 가까운 픽셀만 투명 처리 — 로고 원색 그대로 유지 */
      var od=outCtx.getImageData(0,0,cropW,cropH);
      var op=od.data;
      for(var k=0;k<op.length;k+=4){
        var dd=Math.abs(op[k]-br)+Math.abs(op[k+1]-bg)+Math.abs(op[k+2]-bb);
        var a=(dd-40)/70;
        if(a<0)a=0; if(a>1)a=1;
        op[k+3]=Math.round(op[k+3]*a);
      }
      outCtx.putImageData(od,0,0);
      /* 규격 정규화: 600x300 캔버스에 면적 기준으로 스케일 — 로고마다 제각각인 비율 통일 */
      var NW=600,NH=300;
      var s=262/Math.sqrt(cropW*cropH);
      if(s*cropW>NW*0.94)s=NW*0.94/cropW;
      if(s*cropH>NH*0.82)s=NH*0.82/cropH;
      var norm=document.createElement('canvas');
      norm.width=NW;norm.height=NH;
      var nctx=norm.getContext('2d');
      if(!nctx){img.src=out.toDataURL('image/png');return;}
      nctx.imageSmoothingQuality='high';
      var dw=cropW*s,dh=cropH*s;
      var dx=(NW-dw)/2,dy=(NH-dh)/2;
      /* 가독성: 로고 실루엣을 흰색으로 만들어 12방향으로 찍어 화이트 아웃라인 형성 */
      var sil=document.createElement('canvas');
      sil.width=NW;sil.height=NH;
      var sctx=sil.getContext('2d');
      if(sctx){
        sctx.drawImage(out,dx,dy,dw,dh);
        sctx.globalCompositeOperation='source-in';
        sctx.fillStyle='#fff';
        sctx.fillRect(0,0,NW,NH);
        var R=6;
        for(var q=0;q<12;q++){
          nctx.drawImage(sil,Math.cos(q*Math.PI/6)*R,Math.sin(q*Math.PI/6)*R);
        }
      }
      nctx.drawImage(out,dx,dy,dw,dh);
      img.src=norm.toDataURL('image/png');
    } catch(e) {}
  };
  fetch('/api/admin/public/works')
    .then(function(r){ return r.json(); })
    .then(function(data){
      // 대표이미지(cover) 있는 항목만 노출 — 데이터는 유지, 표시만 필터
      var items = (data.items || []).filter(function(it){ return it.cover; });
      items = items.map(function(item, index){ return { item:item, index:index }; })
        .sort(function(a, b){
          var ar = Number(a.item.featuredRank) || 999;
          var br = Number(b.item.featuredRank) || 999;
          return ar === br ? a.index - b.index : ar - br;
        })
        .map(function(entry){ return entry.item; });
      var grid = document.getElementById('worksGrid');
      if(!grid) return;
      if(!items.length) {
        grid.innerHTML = '<p class="wg-empty">등록된 포트폴리오가 없습니다.</p>';
        return;
      }
      // 기존 정적 카드 제거 후 동적 렌더
      grid.innerHTML = '';
      items.forEach(function(item){
        var tags = (item.tags||[]).join(' ');
        var article = document.createElement('article');
        var hasCover = !!item.cover;
        article.className = 'wg-card' + (hasCover ? ' wg-card--cover' : '');
        article.setAttribute('data-cat', tags);
        var metaHtml =
          '<div class="wg-meta">'
          +'<span class="wg-brand">'+esc(item.brand)+'</span>'
          +'<p class="wg-tags-text">'+esc(item.services)+'</p>'
          +'</div>';
        var overlayHtml = item.thumb
          ? '<div class="wg-overlay" aria-hidden="true">'
            +'<img class="wg-overlay-logo-img" src="'+esc(item.thumb)+'" alt="" crossorigin="anonymous" loading="lazy" decoding="async" onload="fitWorksLogo(this)" onerror="if(this.crossOrigin!=null){this.crossOrigin=null;var s=this.src;this.src=s;}">'
            +'</div>'
          : '';
        if (hasCover) {
          /* 대표이미지 풀블리드 — 로고는 hover 시에만 중앙 노출 */
          article.innerHTML =
            '<div class="wg-thumb wg-thumb--cover">'
            +'<img class="wg-cover-img" src="'+esc(item.cover)+'" alt="'+esc(item.brand)+'" loading="lazy" onerror="this.style.opacity=0">'
            +overlayHtml
            +'</div>'
            +metaHtml;
        } else {
          /* 기존: 로고 카드 (cover 미등록 항목 fallback) */
          article.innerHTML =
            '<div class="wg-thumb">'
            +'<img src="'+esc(item.thumb)+'" alt="'+esc(item.brand)+'" loading="lazy" onerror="this.style.opacity=0">'
            +overlayHtml
            +'</div>'
            +metaHtml;
        }
        grid.appendChild(article);
      });
      // 이미지 가장자리 색을 읽어 카드 배경을 자동 매칭 — 배경색 다른 이미지의 흰 테두리 띠 제거
      function tintThumb(img){
        try{
          var c=document.createElement('canvas');
          var w=c.width=Math.max(2,Math.min(48,img.naturalWidth));
          var h=c.height=Math.max(2,Math.min(48,img.naturalHeight));
          var x=c.getContext('2d');
          x.drawImage(img,0,0,w,h);
          var d=x.getImageData(0,0,w,h).data;
          var r=0,g=0,b=0,n=0;
          function px(i){ if(d[i+3]<200)return; r+=d[i];g+=d[i+1];b+=d[i+2];n++; }
          for(var i=0;i<w;i++){ px(i*4); px(((h-1)*w+i)*4); }
          for(var j=0;j<h;j++){ px(j*w*4); px((j*w+w-1)*4); }
          if(!n)return;
          var thumb=img.closest('.wg-thumb');
          if(thumb) thumb.style.background='rgb('+Math.round(r/n)+','+Math.round(g/n)+','+Math.round(b/n)+')';
        }catch(e){}
      }
      grid.querySelectorAll('.wg-thumb:not(.wg-thumb--cover) img').forEach(function(img){
        if(img.complete && img.naturalWidth) tintThumb(img);
        else img.addEventListener('load', function(){ tintThumb(img); });
      });
      // ── 필터 + 더보기(16개씩 점진 표시) 통합 뷰 ──
      var STEP = 16;
      var visibleLimit = STEP;
      var currentFilter = 'all';
      // 더보기 버튼 생성 (그리드 아래 중앙)
      var moreWrap = document.createElement('div');
      moreWrap.style.cssText = 'text-align:center;margin-top:36px;';
      var moreBtn = document.createElement('button');
      moreBtn.type = 'button';
      moreBtn.className = 'wf-btn';
      moreBtn.style.cssText = 'padding:13px 44px;font-size:15px;';
      moreWrap.appendChild(moreBtn);
      grid.parentNode.insertBefore(moreWrap, grid.nextSibling);
      // 전체 펼침 시 마무리 문구 — "공개 사례가 전부가 아님"
      var endNote = document.createElement('div');
      endNote.style.cssText = 'display:none;text-align:center;margin-top:48px;padding:34px 20px 6px;border-top:1px solid var(--border);';
      endNote.innerHTML =
        '<p style="margin:0;font-size:17px;font-weight:700;color:var(--white);letter-spacing:-0.3px;">지금 보신 레퍼런스가 전부가 아닙니다.</p>'
        +'<p style="margin:10px 0 0;font-size:14px;color:var(--gray-2);line-height:1.7;">브랜드 정책상 공개하지 않은 수많은 캠페인이 함께하고 있습니다.<br />우리 브랜드와 비슷한 사례가 궁금하시다면 <a href="/contact" style="color:var(--blue);text-decoration:underline;">문의하기</a>에서 확인해 보세요.</p>';
      moreWrap.parentNode.insertBefore(endNote, moreWrap.nextSibling);
      function applyView(){
        var cards = Array.prototype.slice.call(grid.querySelectorAll('.wg-card'));
        var shown = 0, total = 0;
        cards.forEach(function(card){
          var cat = card.getAttribute('data-cat') || '';
          var match = (currentFilter === 'all' || cat.indexOf(currentFilter) > -1);
          if(match) total++;
          if(match && shown < visibleLimit){ card.style.display = ''; shown++; }
          else card.style.display = 'none';
        });
        moreBtn.textContent = '더보기 (' + shown + ' / ' + total + ')';
        moreWrap.style.display = (total > shown) ? '' : 'none';
        endNote.style.display = (total > 0 && total <= shown) ? '' : 'none';
      }
      moreBtn.addEventListener('click', function(){
        visibleLimit += STEP;
        applyView();
      });
      // 필터 재바인딩 — 필터 변경 시 더보기 초기화
      var filterBtns = document.querySelectorAll('.wf-btn:not([type=button])');
      filterBtns = document.querySelectorAll('#worksFilter .wf-btn');
      filterBtns.forEach(function(btn){
        btn.addEventListener('click', function(){
          filterBtns.forEach(function(b){ b.classList.remove('active'); });
          btn.classList.add('active');
          currentFilter = btn.getAttribute('data-filter');
          visibleLimit = STEP;
          applyView();
        });
      });
      applyView();
    })
    .catch(function(){});
})();
    `}} />
    </div>{/* /svc-light */}
  </>
)
