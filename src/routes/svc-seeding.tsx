import { icon } from '../icons'
export const SvcSeedingPage = () => (
  <>
    <section class="vh-hero vh-hero--photo">
      <div class="vh-photo-bg" aria-hidden="true" style="--hero-photo:url('/static/seeding-images/hero.png')"></div>
      <canvas id="vhCanvas3" class="vh-canvas"></canvas>
      <div class="vh-bg">
        <div class="vh-orb vh-orb--1" style="background:radial-gradient(circle,rgba(20,184,166,0.24) 0%,transparent 70%)"></div>
        <div class="vh-orb vh-orb--2" style="background:radial-gradient(circle,rgba(45,212,191,0.18) 0%,transparent 70%)"></div>
        <div class="vh-orb vh-orb--3" style="background:radial-gradient(circle,rgba(16,185,129,0.18) 0%,transparent 70%)"></div>
        <div class="vh-grid"></div>
        <div class="vh-noise"></div>
      </div>

      <div class="container vh-inner">
        <a href="/#services" class="svc-back-link vh-back">← 서비스 전체보기</a>

        {/* 서비스명(검색엔진이 읽는 큰 제목의 일부) + 슬로건 */}
        <h1 class="vh-h1">
          <span class="vh-badge" style="color:rgba(20,184,166,0.95);border-color:rgba(20,184,166,0.35);background:rgba(20,184,166,0.08)">
            <span class="vh-badge-dot" style="background:rgba(20,184,166,1);box-shadow:0 0 8px rgba(20,184,166,0.9)"></span>
            <span>체험단 마케팅</span>
          </span>

          <span class="vh-title">
          <span class="vh-tline" id="sdL1">브랜드의 씨앗을 심어</span>
          <span class="vh-tline" id="sdL2" style="background:linear-gradient(135deg,#fff 20%,rgba(20,184,166,0.95) 60%,rgba(45,212,191,0.85) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;"><span class="vh-hl">자연스러운 확산</span> 유도</span>
        </span>
        </h1>

        <div class="vh-sub-wrap" id="sdSub">
          <p class="vh-sub"><strong style="color:rgba(255,255,255,0.9)">실사용 경험 콘텐츠를 채널별로 제작해, 검색했을 때 신뢰가 가게 만들고,</strong></p>
          <p class="vh-sub">소비자가 <span style="color:rgba(20,184,166,0.9);font-weight:600">'직접 발견한 브랜드'</span>처럼 경험하게 만듭니다.</p>
        </div>

        <div class="vh-kpi-strip" id="sdKpi"></div>
        <script dangerouslySetInnerHTML={{__html:`(function(){
          fetch('/api/admin/public/hero-kpi/seeding')
            .then(function(r){return r.json();})
            .then(function(d){
              var el=document.getElementById('sdKpi');if(!el||!d.kpi)return;
              el.innerHTML=d.kpi.map(function(k,i){
                return (i>0?'<div class="vh-kpi-sep"></div>':'')
                  +'<div class="vh-kpi-item">'
                  +'<strong class="vh-kpi-num">'+k.num+'</strong>'
                  +'<span class="vh-kpi-label">'+k.label+'</span>'
                  +'</div>';
              }).join('');
            }).catch(function(){});
        })();`}} />

        <div class="vh-btns" id="sdBtns">
          <a href="/contact" class="vh-cta-btn">
            <span>문의하기</span>
            <svg viewBox="0 0 24 24" fill="none" width="15" height="15"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
          <a href="#svc-intro" class="vh-scroll-btn">
            <span>자세히 보기</span>
            <svg viewBox="0 0 24 24" fill="none" width="15" height="15"><path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
        </div>
      </div>

      <div class="vh-scroll-hint">
        <div class="vh-scroll-mouse"><div class="vh-scroll-wheel"></div></div>
      </div>

      <script dangerouslySetInnerHTML={{ __html: `
(function(){
  function anim(el,delay,dir){if(!el)return;el.style.opacity='0';el.style.transform=dir==='up'?'translateY(32px)':'translateX(-32px)';el.style.transition='opacity .9s cubic-bezier(.25,.46,.45,.94),transform .9s cubic-bezier(.25,.46,.45,.94)';setTimeout(function(){el.style.opacity='1';el.style.transform='none';},delay);}
  anim(document.getElementById('sdL1'),200,'left');
  anim(document.getElementById('sdL2'),440,'left');
  anim(document.getElementById('sdSub'),700,'up');
  anim(document.getElementById('sdKpi'),940,'up');
  anim(document.getElementById('sdBtns'),1140,'up');
})();
      `}} />
    </section>

    {/* ══ 라이트 테마 콘텐츠 래퍼 (히어로 제외) ══ */}
    <div class="svc-light">

    <section class="section svc-intro-section">
      <div class="svc-bg-deco"><div class="svc-grid-lines"></div><div class="svc-orb-right"></div></div>
      <div class="container">
        <div class="svc-intro-text seed-story">
          <div class="seed-story-copy">
            <span class="seed-story-index">REVIEW DESIGN / 01</span>
            <h2>좋은 후기는<br />우연히 <mark>쌓이지 않습니다.</mark></h2>
            <p>누가 경험하고, 무엇을 발견하고, 어떤 언어로 남기는지.<br />체험단은 모집이 아니라 리뷰의 이유를 설계하는 일입니다.</p>
            <strong class="seed-story-conclusion">참여자 수보다,<br />구매를 움직일 후기.</strong>
          </div>
          <div class="seed-review-board" aria-label="체험단 리뷰 설계 과정">
            <article class="seed-note seed-note--target"><span>01 / TARGET</span><strong>맞는 사람을 찾고</strong><p>제품을 실제로 필요로 하는 소비자를 선정합니다.</p></article>
            <article class="seed-note seed-note--experience"><span>02 / EXPERIENCE</span><strong>말할 이유를 만들고</strong><p>써봐야 알 수 있는 가치를 경험 미션에 담습니다.</p></article>
            <article class="seed-note seed-note--review"><span>03 / REVIEW</span><strong>신뢰로 남깁니다</strong><p>진정성 있는 후기가 검색과 구매의 근거가 됩니다.</p></article>
          </div>
        </div>
      </div>
    </section>

    {/* ══ 네이버 블로그 체험단 상품군 ══ */}
    <section class="section sdng-products-section" id="sdng-blog">
      <div class="svc-bg-deco"><div class="svc-grid-lines"></div><div class="svc-orb-right"></div><div class="svc-section-glow-top"></div></div>
      <div class="container">

        {/* 좌(타이틀+리스트) / 우(패널) 통합 레이아웃 */}
        <div class="sdng-split-layout" id="sdngBlogInteractive">

          {/* 왼쪽: 타이틀 + 상품 리스트 */}
          <div class="sdng-split-left">
            <div class="sdng-split-head">
              <span class="sec-label">Naver Blog Seeding</span>
              <h2 class="sec-title">네이버 블로그 체험단<br /><em>패키지 라인업</em></h2>
              <p class="sec-sub">검색에서 발견되고, 후기에서 신뢰가 쌓이게.<br />목표와 예산에 맞춰 블로그 체험단 상품을 선택하세요.</p>
            </div>
            <ul class="svc-list" id="sdngBlogList">
            <li class="svc-list-item active" data-sdng="0">
              <a href="#sdng-blog">
                <span class="svc-list-num">01</span>
                <span class="svc-list-name">일반 블로거</span>
              </a>
            </li>
            <li class="svc-list-item" data-sdng="1">
              <a href="#sdng-blog">
                <span class="svc-list-num">02</span>
                <span class="svc-list-name">특화 블로거</span>
              </a>
            </li>
            <li class="svc-list-item sdng-list-best" data-sdng="2">
              <a href="#sdng-blog">
                <span class="svc-list-num">03</span>
                <span class="svc-list-name" style="word-break:keep-all">공략형 체험단</span>
                <span class="sdng-list-best-badge">BEST</span>
              </a>
            </li>
            <li class="svc-list-item" data-sdng="3">
              <a href="#sdng-blog">
                <span class="svc-list-num">04</span>
                <span class="svc-list-name">네이버 인플루언서</span>
              </a>
            </li>
          </ul>
          </div>{/* /sdng-split-left */}

          {/* 오른쪽: 비주얼 패널 */}
          <div class="sdng-split-right">
          <div class="svc-visual" id="sdngBlogVisual">

            {/* 패널 0 — 일반 블로거 */}
            <div class="svc-panel active" data-sdng-panel="0" style="display:flex">
              <div class="svc-panel-img sdng-img-wrap">
                <img src="/static/seeding-images/blog-general-new.png" alt="일반 블로거 체험단" class="sdng-panel-photo" />
                <span class="sdng-panel-badge sdng-panel-badge--basic">Basic</span>
              </div>
              <div class="svc-panel-info">
                <span class="svc-panel-tag">General Blogger</span>
                <p class="svc-panel-desc">
                  다양한 분야의 일반 블로거로 진행하는 <strong>가성비 중심 체험단</strong>입니다.<br />
                  대량 배포로 검색 유입을 넓히고, 체험 기반 후기로 브랜드 신뢰를 쌓습니다.<br /><br />
                  처음 시작하는 브랜드부터, 빠르게 물량이 필요한 캠페인까지 잘 맞습니다.
                </p>
                <div class="svc-panel-tags">
                  <p class="svc-ptag-label">SERVICE KEYWORDS</p>
                  <div class="svc-ptag-grid">
                    <span class="svc-ptag">체험 기반 후기</span>
                    <span class="svc-ptag">키워드 맞춤 구성</span>
                    <span class="svc-ptag">성과 리포트 제공</span>
                    <span class="svc-ptag">대량 배포·확산</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 패널 1 — 특화 블로거 */}
            <div class="svc-panel" data-sdng-panel="1" style="display:none">
              <div class="svc-panel-img sdng-img-wrap">
                <img src="/static/seeding-images/blog-specialized-new.jpg" alt="특화 블로거 체험단" class="sdng-panel-photo" />
                <span class="sdng-panel-badge sdng-panel-badge--specialized">Specialized</span>
              </div>
              <div class="svc-panel-info">
                <span class="svc-panel-tag">Specialized Blogger</span>
                <p class="svc-panel-desc">
                  뷰티·식품·육아·여행처럼 카테고리가 뚜렷한 브랜드라면, <strong>'전문성'이 곧 설득력</strong>이 됩니다.<br />
                  해당 분야를 꾸준히 다뤄온 특화 블로거로 타깃을 더 정확히 맞추고, 콘텐츠 신뢰도까지 끌어올립니다.<br /><br />
                  카테고리형 바이럴에서 가장 효율이 좋은 라인업입니다.
                </p>
                <div class="svc-panel-tags">
                  <p class="svc-ptag-label">SPECIALTY AREAS</p>
                  <div class="svc-ptag-grid">
                    <span class="svc-ptag">뷰티 카테고리</span>
                    <span class="svc-ptag">식품 카테고리</span>
                    <span class="svc-ptag">육아 카테고리</span>
                    <span class="svc-ptag">여행 카테고리</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 패널 2 — 키워드 공략형 체험단 (BEST) */}
            <div class="svc-panel sdng-panel--best" data-sdng-panel="2" style="display:none">
              <div class="svc-panel-img sdng-img-wrap">
                <img src="/static/seeding-images/blog-ranking-new.jpg" alt="키워드 공략형 체험단" class="sdng-panel-photo" />
                <span class="sdng-panel-badge sdng-panel-badge--ranking">Keyword Targeting</span>
                <div class="sdng-best-crown">
                  <span class="sdng-best-crown-icon">{icon('crown')}</span>
                  <span class="sdng-best-crown-text">BEST</span>
                </div>
              </div>
              <div class="svc-panel-info sdng-best-info">
                <div class="sdng-best-header">
                  <span class="sdng-best-tag">베스트 추천 상품</span>
                </div>
                <span class="svc-panel-tag">Keyword Targeting</span>
                <p class="svc-panel-desc">
                  성과를 <strong>"운"에 맡기지 않습니다.</strong><br />
                  키워드 선정부터 콘텐츠 설계, 배포까지 설계된 대로 진행합니다.<br /><br />
                  경쟁 키워드일수록 격차가 나옵니다.
                </p>
                <div class="svc-panel-tags">
                  <p class="svc-ptag-label">SERVICE KEYWORDS</p>
                  <div class="svc-ptag-grid">
                    <span class="svc-ptag">검색 노출 목표 설계</span>
                    <span class="svc-ptag">키워드 전략</span>
                    <span class="svc-ptag">검색 유입 강화</span>
                    <span class="svc-ptag">콘텐츠 최적화 구성</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 패널 3 — 네이버 인플루언서 */}
            <div class="svc-panel" data-sdng-panel="3" style="display:none">
              <div class="svc-panel-img sdng-img-wrap">
                <img src="/static/seeding-images/blog-influencer-new.jpg" alt="네이버 인플루언서 체험단" class="sdng-panel-photo" />
                <span class="sdng-panel-badge sdng-panel-badge--premium">Premium</span>
              </div>
              <div class="svc-panel-info">
                <span class="svc-panel-tag">Naver Influencer</span>
                <p class="svc-panel-desc">
                  네이버 <strong>공식 인증 인플루언서</strong>와 함께, 브랜드 메시지를 더 설득력 있게 전달합니다.<br />
                  카테고리 적합도와 콘텐츠 퀄리티를 기준으로 매칭해 인지도뿐 아니라 신뢰까지 함께 쌓이도록 설계합니다.<br /><br />
                  브랜드의 첫인상을 '광고'가 아니라 '추천'에 가깝게 바꾸는 방식입니다.
                </p>
                <div class="svc-panel-tags">
                  <p class="svc-ptag-label">SERVICE KEYWORDS</p>
                  <div class="svc-ptag-grid">
                    <span class="svc-ptag">공식 인증 인플루언서</span>
                    <span class="svc-ptag">프리미엄 콘텐츠</span>
                    <span class="svc-ptag">카테고리 적합 매칭</span>
                    <span class="svc-ptag">브랜드 신뢰 강화</span>
                  </div>
                </div>
              </div>
            </div>

          </div>{/* /svc-visual */}
          </div>{/* /sdng-split-right */}
        </div>{/* /sdng-split-layout */}
      </div>

      <script dangerouslySetInnerHTML={{ __html: `
(function(){
  function initBlogTab() {
    var list = document.getElementById('sdngBlogList');
    var visual = document.getElementById('sdngBlogVisual');
    if(!list || !visual) return;
    var items = list.querySelectorAll('.svc-list-item');
    var panels = visual.querySelectorAll('.svc-panel');

    function activate(idx) {
      items.forEach(function(el){ el.classList.remove('active'); });
      panels.forEach(function(el){
        el.classList.remove('active');
        el.style.display = 'none';
      });
      items[idx].classList.add('active');
      if(panels[idx]) {
        panels[idx].classList.add('active');
        panels[idx].style.display = 'flex';
      }
    }

    /* 초기화: 첫 번째 패널만 표시 */
    panels.forEach(function(el, i){
      el.style.display = i === 0 ? 'flex' : 'none';
    });

    items.forEach(function(item, i){
      item.addEventListener('click', function(e){
        e.preventDefault();
        activate(i);
      });
    });
  }
  if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBlogTab);
  } else {
    initBlogTab();
  }
})();
      `}} />
    </section>

    {/* ══ 인스타그램 체험단 상품군 ══ */}
    <section class="section sdng-products-section" id="sdng-insta">
      <div class="svc-bg-deco"><div class="svc-dot-pattern"></div><div class="svc-orb-left"></div><div class="svc-section-glow-top"></div></div>
      <div class="container">

        {/* 좌(타이틀+특징+리스트) / 우(패널) 통합 레이아웃 */}
        <div class="sdng-split-layout sdng-split-layout--insta" id="sdngInstaInteractive">

          {/* 왼쪽: 타이틀 + 특징 + 상품 리스트 */}
          <div class="sdng-split-left">
            <div class="sdng-split-head">
              <span class="sec-label">Instagram Seeding</span>
              <h2 class="sec-title">인스타그램 체험단<br /><em>패키지 라인업</em></h2>
              <p class="sec-sub">해시태그와 콘텐츠 결로 '저장/공유'가 일어나는 피드를 만듭니다.<br />노출에서 끝내지 않고, 프로필 유입과 탐색 유입까지 연결합니다.</p>
            </div>

            {/* 인스타 핵심 특징 태그 */}
            <div class="sdng-insta-features">
              <span class="sdng-insta-feat"># 해시태그 유입</span>
              <span class="sdng-insta-feat">비주얼 설득</span>
              <span class="sdng-insta-feat">탐색/추천 노출</span>
            </div>

            <ul class="svc-list" id="sdngInstaList">
            <li class="svc-list-item active" data-insta="0">
              <a href="#sdng-insta">
                <span class="svc-list-num">01</span>
                <span class="svc-list-name">일반 피드 체험단</span>
              </a>
            </li>
            <li class="svc-list-item" data-insta="1">
              <a href="#sdng-insta">
                <span class="svc-list-num">02</span>
                <span class="svc-list-name">특화 타깃 체험단</span>
              </a>
            </li>
          </ul>
          </div>{/* /sdng-split-left */}

          {/* 오른쪽: 비주얼 패널 */}
          <div class="sdng-split-right">
          <div class="svc-visual" id="sdngInstaVisual">

            {/* 패널 0 — 일반 피드 체험단 */}
            <div class="svc-panel active" data-insta-panel="0" style="display:flex">
              <div class="svc-panel-img sdng-img-wrap">
                <img src="/static/seeding-images/insta-general-new.jpg" alt="일반 피드 체험단" class="sdng-panel-photo" />
                <span class="sdng-panel-badge sdng-panel-badge--insta-basic">Basic</span>
              </div>
              <div class="svc-panel-info">
                <span class="svc-panel-tag">General Feed Seeding</span>
                <p class="svc-panel-desc">
                  일반 계정 풀을 활용해 <strong>'브랜드가 보이는 빈도'</strong>를 먼저 만듭니다.<br />
                  이미지/피드 톤을 맞춘 콘텐츠로 노출하고, 해시태그 유입까지 설계합니다.<br /><br />
                  첫 인지도 확산과 피드 자산 구축에 적합한 베이직 라인입니다.
                </p>
                <div class="svc-panel-tags">
                  <p class="svc-ptag-label">SERVICE KEYWORDS</p>
                  <div class="svc-ptag-grid">
                    <span class="svc-ptag sdng-insta-ptag">비주얼 중심 콘텐츠 구성</span>
                    <span class="svc-ptag sdng-insta-ptag"># 해시태그 유입 설계</span>
                    <span class="svc-ptag sdng-insta-ptag">피드 노출</span>
                    <span class="svc-ptag sdng-insta-ptag">성과 리포트 제공</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 패널 1 — 특화 타깃 체험단 */}
            <div class="svc-panel" data-insta-panel="1" style="display:none">
              <div class="svc-panel-img sdng-img-wrap">
                <img src="/static/seeding-images/insta-specialized-new.jpg" alt="특화 타깃 체험단" class="sdng-panel-photo" />
                <span class="sdng-panel-badge sdng-panel-badge--insta-specialized">Specialized</span>
              </div>
              <div class="svc-panel-info">
                <span class="svc-panel-tag">Specialized Target Seeding</span>
                <p class="svc-panel-desc">
                  특정 타깃에게 <strong>'딱 맞는' 해시태그 세트</strong>와 위치·카테고리 맥락을 정밀하게 맞춥니다.<br />
                  뷰티/패션/라이프처럼 관심사가 뚜렷한 카테고리는, 이 작은 차이가 탐색 노출과 반응을 갈라놓습니다.<br /><br />
                  저장·공유가 늘어나는 흐름까지, 콘텐츠와 확산을 함께 설계합니다.
                </p>
                <div class="svc-panel-tags">
                  <p class="svc-ptag-label">SERVICE KEYWORDS</p>
                  <div class="svc-ptag-grid">
                    <span class="svc-ptag sdng-insta-ptag sdng-insta-ptag--spec">타깃 맞춤 해시태그 세트</span>
                    <span class="svc-ptag sdng-insta-ptag sdng-insta-ptag--spec">위치·카테고리 맥락 설계</span>
                    <span class="svc-ptag sdng-insta-ptag sdng-insta-ptag--spec">트렌드 커뮤니티 확산</span>
                    <span class="svc-ptag sdng-insta-ptag sdng-insta-ptag--spec">저장·공유 반응 강화</span>
                  </div>
                </div>
              </div>
            </div>

          </div>{/* /svc-visual */}
          </div>{/* /sdng-split-right */}
        </div>{/* /sdng-split-layout */}

        {/* 인스타 체험단 안내 배너 */}
        <div class="sdng-insta-banner">
          <div class="sdng-insta-banner-icon">{icon('smartphone')}</div>
          <div class="sdng-insta-banner-text">
            <strong>인스타그램 체험단 · 탐색 탭 & 해시태그 최적화</strong>
            <span>네이버 블로그 체험단과 같이 하면 검색과 SNS를 한 번에 잡는 조합이 됩니다</span>
          </div>
        </div>

      </div>

      <script dangerouslySetInnerHTML={{ __html: `
(function(){
  function initInstaTab() {
    var list = document.getElementById('sdngInstaList');
    var visual = document.getElementById('sdngInstaVisual');
    if(!list || !visual) return;
    var items = list.querySelectorAll('.svc-list-item');
    var panels = visual.querySelectorAll('.svc-panel');

    function activate(idx) {
      items.forEach(function(el){ el.classList.remove('active'); });
      panels.forEach(function(el){
        el.classList.remove('active');
        el.style.display = 'none';
      });
      items[idx].classList.add('active');
      if(panels[idx]) {
        panels[idx].classList.add('active');
        panels[idx].style.display = 'flex';
      }
    }

    /* 초기화 */
    panels.forEach(function(el, i){
      el.style.display = i === 0 ? 'flex' : 'none';
    });

    items.forEach(function(item, i){
      item.addEventListener('click', function(e){
        e.preventDefault();
        activate(i);
      });
    });
  }
  if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initInstaTab);
  } else {
    initInstaTab();
  }
})();
      `}} />
    </section>

    {/* ══ PROCESS TIMELINE ══ */}
    <section class="section sdtl-section">
      <div class="svc-bg-deco"><div class="svc-grid-lines"></div><div class="svc-orb-left"></div><div class="svc-section-glow-top"></div></div>
      <div class="container">
        <div class="section-head">
          <span class="sec-label">Process</span>
          <h2 class="sec-title">체험단 캠페인<br /><em>진행 프로세스</em></h2>
          <p class="sec-sub">상담부터 최종 리포트까지, 전담 PM이 모든 단계를 함께합니다.</p>
        </div>

        <div class="sdtl-wrap" id="sdtlWrap">
          {/* 중앙 라인 */}
          <div class="sdtl-axis">
            <div class="sdtl-axis-line"></div>
          </div>

          {/* STEP 01 */}
          <div class="sdtl-item sdtl-item--left">
            <div class="sdtl-card">
              <div class="sdtl-card-icon" style="--tc:#1a6bff">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              </div>
              <div class="sdtl-card-body">
                <span class="sdtl-card-en">Consulting &amp; Contract</span>
                <h4 class="sdtl-card-title">상담 &amp; 계약</h4>
                <p class="sdtl-card-desc">브랜드 목표·예산·타겟을 정리한 뒤, 캠페인 범위·일정·성과 지표를 투명한 계약으로 확정합니다.</p>
              </div>
            </div>
            <div class="sdtl-dot" style="--tc:#1a6bff"><span class="sdtl-num">01</span></div>
            <div class="sdtl-spacer"></div>
          </div>

          {/* STEP 02 */}
          <div class="sdtl-item sdtl-item--left">
            <div class="sdtl-card">
              <div class="sdtl-card-icon" style="--tc:#0891b2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>
              </div>
              <div class="sdtl-card-body">
                <span class="sdtl-card-en">Creative Briefing</span>
                <h4 class="sdtl-card-title">가이드라인 작성</h4>
                <p class="sdtl-card-desc">브랜드 메시지, 톤앤매너, 금지 표현, 핵심 키워드를 담은 콘텐츠 가이드를 제작합니다. 자연스럽고 일관된 후기 생성의 기반이 됩니다.</p>
              </div>
            </div>
            <div class="sdtl-dot" style="--tc:#0891b2"><span class="sdtl-num">02</span></div>
            <div class="sdtl-spacer"></div>
          </div>

          {/* STEP 04 */}
          <div class="sdtl-item sdtl-item--right">
            <div class="sdtl-spacer"></div>
            <div class="sdtl-dot" style="--tc:#059669"><span class="sdtl-num">03</span></div>
            <div class="sdtl-card">
              <div class="sdtl-card-icon" style="--tc:#059669">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <div class="sdtl-card-body">
                <span class="sdtl-card-en">Creator Casting</span>
                <h4 class="sdtl-card-title">크리에이터 섭외</h4>
                <p class="sdtl-card-desc">타겟에 맞는 블로거·인플루언서를 공개 모집하고, 채널 분석과 활동 이력을 검토해 최종 선정합니다.</p>
              </div>
            </div>
          </div>

          {/* STEP 04 */}
          <div class="sdtl-item sdtl-item--right">
            <div class="sdtl-spacer"></div>
            <div class="sdtl-dot" style="--tc:#e11d48"><span class="sdtl-num">04</span></div>
            <div class="sdtl-card">
              <div class="sdtl-card-icon" style="--tc:#e11d48">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              </div>
              <div class="sdtl-card-body">
                <span class="sdtl-card-en">Experience &amp; Review</span>
                <h4 class="sdtl-card-title">체험 &amp; 후기</h4>
                <p class="sdtl-card-desc">제품을 발송해 실제 사용 경험을 진행하고, 가이드라인에 맞춘 솔직한 후기를 브랜드 검수 후 게시합니다.</p>
              </div>
            </div>
          </div>

          {/* STEP 05 */}
          <div class="sdtl-item sdtl-item--right sdtl-item--last">
            <div class="sdtl-spacer"></div>
            <div class="sdtl-dot sdtl-dot--final" style="--tc:#10b981"><span class="sdtl-num">05</span></div>
            <div class="sdtl-card sdtl-card--final">
              <div class="sdtl-card-icon" style="--tc:#10b981">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
              </div>
              <div class="sdtl-card-body">
                <span class="sdtl-card-en">Performance Report</span>
                <h4 class="sdtl-card-title">성과 리포트</h4>
                <p class="sdtl-card-desc">캠페인 전 기간의 성과를 수치로 정리한 종합 리포트를 제공합니다. 전환율, 검색 유입, 매출 변화를 분석해 다음 캠페인 전략까지 제안합니다.</p>
              </div>
            </div>
          </div>

        </div>{/* /sdtl-wrap */}

        {/* 하단 배너 */}
        <div class="sdtl-footer">
          <span class="sdtl-footer-icon">{icon('clipboard')}</span>
          <span>모든 단계에서 <strong>전담 PM</strong>이 함께합니다 &nbsp;·&nbsp; 평균 캠페인 기간 <strong>4–6주</strong></span>
        </div>

      </div>
    </section>

    {/* ══ FAQ ══ */}
    <section class="section svc-faq-section">
      <div class="svc-bg-deco"><div class="svc-dot-pattern"></div><div class="svc-orb-right"></div><div class="svc-section-glow-top"></div></div>
      <div class="container">
        <div class="section-head">
          <span class="sec-label">FAQ</span>
          <h2 class="sec-title">자주 하는 질문</h2>
          <p class="sec-sub">체험단 캠페인에 대해 가장 많이 묻는 질문들을 모았습니다.</p>
        </div>
        <div class="faq-wrap" id="faqWrap" data-service="seeding"></div>
        <script dangerouslySetInnerHTML={{__html:`(function(){
          fetch('/api/admin/public/svc-faq/seeding')
            .then(function(r){return r.json();})
            .then(function(data){
              var wrap=document.getElementById('faqWrap');
              if(!wrap||!data.faq)return;
              wrap.innerHTML=data.faq.map(function(item,i){
                return '<div class="faq-item" id="faq-seed-'+i+'">'
                  +'<button class="faq-q" type="button" onclick="(function(btn){var item=btn.closest(\\'.faq-item\\');var isOpen=item.classList.contains(\\'faq-item--open\\');document.querySelectorAll(\\'.faq-item\\').forEach(function(el){el.classList.remove(\\'faq-item--open\\');});if(!isOpen){item.classList.add(\\'faq-item--open\\');}})(this)">'
                  +'<div class="faq-q-left"><span class="faq-q-badge">Q</span><span class="faq-q-text">'+item.q+'</span></div>'
                  +'<span class="faq-chevron"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><polyline points="6 9 12 15 18 9"/></svg></span>'
                  +'</button>'
                  +'<div class="faq-a"><div class="faq-a-inner">'+item.a+'</div></div>'
                  +'</div>';
              }).join('');
            }).catch(function(){});
        })();`}} />
      </div>
    </section>

    <section class="svc-cta-section">
      <div class="cta-img-bg" aria-hidden="true" style="--cta-img:url('/static/images/cta-seeding.png')"></div>
      <div class="container">
        <div class="svc-cta-inner">
          <div class="svc-cta-text">
            <h2>진정성 있는 후기로<br /><em>브랜드 신뢰를 쌓아보세요</em></h2>
            <p>소비자가 먼저 말하게 만드는 체험단 전략을 무료로 진단해드립니다.</p>
          </div>
        </div>
      </div>
    </section>


    {/* ── Scroll Reveal ── */}
    <script dangerouslySetInnerHTML={{__html: `
(function(){
  var s = document.createElement('script');
  s.src = '/static/scroll-reveal.js?v=20260722b';
  document.head.appendChild(s);
})();
    `}} />

    {/* ── Admin Dynamic Marketing Stats ── */}
    <script dangerouslySetInnerHTML={{__html: `
(function(){
  var SVC_KEY = 'seeding';
  fetch('/api/admin/public/marketing')
    .then(function(r){ return r.json(); })
    .then(function(data){
      var svc = data.stats && data.stats[SVC_KEY];
      if(!svc) return;
      var grid = document.querySelector('.svc-result-grid');
      if(!grid) return;
      var cards = grid.querySelectorAll('.srg-card');
      ['case1','case2','case3'].forEach(function(ck, i){
        var c = svc[ck];
        if(!c || !cards[i]) return;
        var card = cards[i];
        var tagEl = card.querySelector('.srg-tag');
        if(tagEl && c.tag) tagEl.textContent = c.tag;
        var metrics = card.querySelectorAll('.srg-metric');
        var mdata = [
          {m:c.m1,l:c.l1},{m:c.m2,l:c.l2},{m:c.m3,l:c.l3}
        ].filter(function(x){ return x.m; });
        mdata.forEach(function(md, mi){
          if(!metrics[mi]) return;
          var strong = metrics[mi].querySelector('strong');
          var span = metrics[mi].querySelector('span');
          if(strong && md.m) strong.textContent = md.m;
          if(span && md.l) span.textContent = md.l;
        });
        var desc = card.querySelector('.srg-desc');
        if(desc && c.desc) desc.textContent = c.desc;
      });
    }).catch(function(){});
})();
    `}} />
    </div>{/* /svc-light */}
  </>
)
