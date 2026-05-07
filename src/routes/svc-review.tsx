export const SvcReviewPage = () => (
  <>
    {/* ══ HERO ══ */}
    <section class="vh-hero">
      <canvas id="vhCanvas5" class="vh-canvas"></canvas>
      <div class="vh-bg">
        <div class="vh-orb vh-orb--1" style="background:radial-gradient(circle,rgba(234,179,8,0.22) 0%,transparent 70%)"></div>
        <div class="vh-orb vh-orb--2" style="background:radial-gradient(circle,rgba(249,115,22,0.18) 0%,transparent 70%)"></div>
        <div class="vh-orb vh-orb--3" style="background:radial-gradient(circle,rgba(26,107,255,0.18) 0%,transparent 70%)"></div>
        <div class="vh-grid"></div>
        <div class="vh-noise"></div>
      </div>
      <div class="container vh-inner">
        <a href="/marketing" class="svc-back-link vh-back">← Marketing 전체보기</a>
        <div class="vh-badge" style="color:rgba(234,179,8,0.95);border-color:rgba(234,179,8,0.35);background:rgba(234,179,8,0.08)">
          <span class="vh-badge-dot" style="background:rgba(234,179,8,1);box-shadow:0 0 8px rgba(234,179,8,0.9)"></span>
          <span>CUSTOMER REVIEW MARKETING</span>
        </div>
        <h1 class="vh-title">
          <span class="vh-tline" id="rvL1">리뷰 하나가</span>
          <span class="vh-tline" id="rvL2" style="background:linear-gradient(135deg,#fff 20%,rgba(234,179,8,0.95) 55%,rgba(249,115,22,0.85) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">구매를 결정합니다.</span>
        </h1>
        <div class="vh-sub-wrap" id="rvSub">
          <p class="vh-sub">소비자의 <strong style="color:rgba(255,255,255,0.9)">92%는 구매 전 리뷰를 확인</strong>합니다.</p>
          <p class="vh-sub"><strong style="color:rgba(255,255,255,0.9)">네이버 × 쿠팡</strong> — 구매가 일어나는 모든 채널에서</p>
          <p class="vh-sub" style="margin-top:8px"><span style="color:rgba(234,179,8,0.9);font-weight:600">전략적 리뷰 설계로 브랜드 신뢰를 쌓고 전환율을 극대화합니다.</span></p>
        </div>
        <div class="vh-kpi-strip" id="rvKpi">
          <div class="vh-kpi-item">
            <strong class="vh-kpi-num" style="color:#eab308">+230%</strong>
            <span class="vh-kpi-label">리뷰 전환율 향상</span>
          </div>
          <div class="vh-kpi-sep"></div>
          <div class="vh-kpi-item">
            <strong class="vh-kpi-num">별점 4.9</strong>
            <span class="vh-kpi-label">평균 달성 실적</span>
          </div>
          <div class="vh-kpi-sep"></div>
          <div class="vh-kpi-item">
            <strong class="vh-kpi-num">2개</strong>
            <span class="vh-kpi-label">핵심 채널 커버</span>
          </div>
        </div>
        <div class="vh-btns" id="rvBtns">
          <a href="/contact" class="hero-cta-btn primary">
            <span>무료 전략 상담받기</span>
            <svg viewBox="0 0 24 24" fill="none"><path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
          <a href="#rv-types" class="vh-scroll-btn">
            <span>상품 보기</span>
            <svg viewBox="0 0 24 24" fill="none" width="15" height="15"><path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
        </div>
      </div>
      <div class="vh-scroll-hint"><div class="vh-scroll-mouse"><div class="vh-scroll-wheel"></div></div></div>
      <script dangerouslySetInnerHTML={{ __html: `
(function(){
  var s=document.createElement('script');
  s.src='/static/svc-three-bg.js';
  s.onload=function(){ initSvcThreeBg(0xeab308, 0xf97316, 0x1a6bff); };
  document.head.appendChild(s);
  function anim(el,delay,dir){if(!el)return;el.style.opacity='0';el.style.transform=dir==='up'?'translateY(32px)':'translateX(-32px)';el.style.transition='opacity .9s cubic-bezier(.25,.46,.45,.94),transform .9s cubic-bezier(.25,.46,.45,.94)';setTimeout(function(){el.style.opacity='1';el.style.transform='none';},delay);}
  anim(document.getElementById('rvL1'),200,'left');
  anim(document.getElementById('rvL2'),440,'left');
  anim(document.getElementById('rvSub'),700,'up');
  anim(document.getElementById('rvKpi'),940,'up');
  anim(document.getElementById('rvBtns'),1140,'up');
})();
      `}} />
    </section>

    {/* ══ REVIEW TYPE COMPARISON ══ */}
    <section class="section rvt-section" id="rv-types">
      <div class="svc-bg-deco"><div class="svc-grid-lines"></div><div class="svc-orb-right"></div><div class="svc-section-glow-top"></div></div>
      <div class="container">
        <div class="section-head">
          <span class="sec-label">Review Type Comparison</span>
          <h2 class="sec-title">리뷰 타입 비교<br /><em>브랜드 상황에 맞게 선택하세요</em></h2>
          <p class="sec-sub">브랜드 상황과 목표에 따라 차별화된 리뷰 서비스를 제공합니다.</p>
        </div>

        <div class="rvt-compare">

          {/* 기획형 리뷰 */}
          <div class="rvt-card rvt-card--premium">
            <div class="rvt-card-top">
              <div class="rvt-tier-badge" style="background:rgba(234,179,8,0.15);border-color:rgba(234,179,8,0.4);color:#eab308">PREMIUM SERVICE</div>
              <div class="rvt-mock-preview rvt-mock--blog">
                <img src="/static/seo-images/review-planned.jpg" alt="기획형 리뷰 예시" class="rvt-mock-real-img" />
              </div>
            </div>
            <div class="rvt-card-body">
              <h3 class="rvt-type-name">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                기획형 리뷰
              </h3>
              <ul class="rvt-feature-list">
                <li>
                  <div class="rvt-feat-icon" style="--fi:#eab308">⭐</div>
                  <div>
                    <strong>별점 5점 필수</strong>
                    <p>브랜드 신뢰도를 위한 만점 리뷰 작성</p>
                  </div>
                </li>
                <li>
                  <div class="rvt-feat-icon" style="--fi:#3b82f6">📷</div>
                  <div>
                    <strong>사진 및 영상 첨부</strong>
                    <p>고퀄리티 시각 자료 필수 포함으로 신뢰도 상승</p>
                  </div>
                </li>
                <li>
                  <div class="rvt-feat-icon" style="--fi:#8b5cf6">✍️</div>
                  <div>
                    <strong>스토리라인 리뷰</strong>
                    <p>체계적인 기획 기반의 스토리텔링으로 구매 전환 유도</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* VS 구분 */}
          <div class="rvt-vs">
            <span>VS</span>
          </div>

          {/* 단순 리뷰 */}
          <div class="rvt-card rvt-card--basic">
            <div class="rvt-card-top">
              <div class="rvt-tier-badge" style="background:rgba(100,116,139,0.15);border-color:rgba(100,116,139,0.4);color:rgba(255,255,255,0.5)">BASIC SERVICE</div>
              <div class="rvt-mock-preview rvt-mock--simple">
                <img src="/static/seo-images/review-simple.jpg" alt="단순 리뷰 예시" class="rvt-mock-real-img" />
              </div>
            </div>
            <div class="rvt-card-body">
              <h3 class="rvt-type-name rvt-type-name--basic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                단순 리뷰
              </h3>
              <ul class="rvt-feature-list rvt-feature-list--basic">
                <li>
                  <div class="rvt-feat-icon rvt-feat-icon--dim" style="--fi:#64748b">⭐</div>
                  <div>
                    <strong>별점 5점 필수</strong>
                    <p>기본적인 긍정 평가 보장</p>
                  </div>
                </li>
                <li>
                  <div class="rvt-feat-icon rvt-feat-icon--dim" style="--fi:#64748b">📷</div>
                  <div>
                    <strong>사진 및 영상 첨부 불필요</strong>
                    <p>자유로운 형식의 텍스트 리뷰 작성</p>
                  </div>
                </li>
                <li>
                  <div class="rvt-feat-icon rvt-feat-icon--dim" style="--fi:#64748b">💬</div>
                  <div>
                    <strong>스토리라인 없는 리뷰</strong>
                    <p>간결하고 진솔한 후기 위주</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

        </div>{/* /rvt-compare */}
      </div>
    </section>

    {/* ══ 프리미엄 리뷰 상세 ══ */}
    <section class="section rvp-section">
      <div class="svc-bg-deco"><div class="svc-dot-pattern"></div><div class="svc-orb-right"></div><div class="svc-section-glow-top"></div></div>
      <div class="container">

        {/* 헤더 */}
        <div class="rvp-hero">
          <div class="rvp-hero-label">
            <span class="rvp-hero-badge">PREMIUM REVIEW</span>
            <span class="rvp-hero-sub-badge">기획형 리뷰 기반</span>
          </div>
          <h2 class="rvp-hero-title">
            블로그 리뷰 <em>&amp;</em> 구매평을<br />
            <strong>하나의 전략</strong>으로 운용합니다
          </h2>
          <p class="rvp-hero-desc">
            기획형 리뷰를 기반으로 네이버 블로그와 커머스 구매평을 동시에 공략합니다.<br />
            단순 리뷰와 달리 <strong>스토리 구조·핵심 키워드·설득 포인트</strong>를 설계하여<br />
            검색 상위노출과 실구매 전환율을 함께 끌어올립니다.
          </p>
        </div>

        {/* 3-카드 그리드 (이미지 포함) */}
        <div class="rvp-premium-grid">

          {/* 카드 01 — 상위노출 & 블로그 */}
          <div class="rvp-premium-card rvp-premium-card--blue">
            <div class="rvp-premium-img-wrap">
              <img src="/static/seo-images/review-premium-blog.jpg" alt="블로그 리뷰 상위노출" class="rvp-premium-img" />
              <div class="rvp-premium-img-overlay"></div>
              <span class="rvp-premium-num">01</span>
            </div>
            <div class="rvp-premium-body">
              <div class="rvp-premium-tags">
                <span class="rvp-premium-tag">#블로그_상위노출</span>
                <span class="rvp-premium-tag">#키워드_1페이지</span>
                <span class="rvp-premium-tag">#기획형_스토리</span>
              </div>
              <h4 class="rvp-premium-title">상위노출 &amp; 블로그 리뷰</h4>
              <p class="rvp-premium-desc">
                기획형 스토리 구조로 블로그에 게시해 <strong>메인 키워드 1페이지 노출</strong>을 달성합니다.
                커머스 유입 고객과 검색 고객을 동시에 확보하며,
                신제품·신규 브랜드 런칭 시 특히 높은 성과를 냅니다.
              </p>
              <ul class="rvp-premium-list">
                <li>네이버 블로그 검색 노출 최적화</li>
                <li>상품별 최적화 블로거 매칭 <em>(품질 관리)</em></li>
                <li>비용 대비 최고 효율의 유입 채널</li>
              </ul>
            </div>
          </div>

          {/* 카드 02 — 별점 관리 */}
          <div class="rvp-premium-card rvp-premium-card--gold">
            <div class="rvp-premium-img-wrap">
              <img src="/static/seo-images/review-premium-star.jpg" alt="별점 5점 관리" class="rvp-premium-img" />
              <div class="rvp-premium-img-overlay"></div>
              <span class="rvp-premium-num">02</span>
            </div>
            <div class="rvp-premium-body">
              <div class="rvp-premium-tags">
                <span class="rvp-premium-tag">#별점5점_확보</span>
                <span class="rvp-premium-tag">#부정여론_완화</span>
                <span class="rvp-premium-tag">#평점_관리</span>
              </div>
              <h4 class="rvp-premium-title">별점 관리 &amp; 여론 개선</h4>
              <p class="rvp-premium-desc">
                <strong>별점 5점 리뷰를 지속적으로 축적</strong>하여 기존 부정 여론을 효과적으로 희석시킵니다.
                긍정적 리뷰 콘텐츠가 소비자의 구매 심리를 자극하고
                평균 별점을 끌어올려 전환율을 높입니다.
              </p>
              <ul class="rvp-premium-list">
                <li>네이버·쿠팡 별점 집중 관리</li>
                <li>부정 리뷰 비율 희석 전략</li>
                <li>긍정 여론 형성으로 재구매 유도</li>
              </ul>
            </div>
          </div>

          {/* 카드 03 — 구매 유도 */}
          <div class="rvp-premium-card rvp-premium-card--green">
            <div class="rvp-premium-img-wrap">
              <img src="/static/seo-images/review-premium-convert.jpg" alt="구매 유도 리뷰" class="rvp-premium-img" />
              <div class="rvp-premium-img-overlay"></div>
              <span class="rvp-premium-num">03</span>
            </div>
            <div class="rvp-premium-body">
              <div class="rvp-premium-tags">
                <span class="rvp-premium-tag">#구매전환_유도</span>
                <span class="rvp-premium-tag">#설득_포인트</span>
                <span class="rvp-premium-tag">#실구매자_경험</span>
              </div>
              <h4 class="rvp-premium-title">구매 전환 리뷰</h4>
              <p class="rvp-premium-desc">
                상품의 소구 포인트를 정확히 짚는 <strong>의미 있는 리뷰</strong>로
                소비자의 구매 결정을 자연스럽게 유도합니다.
                실제 체험 기반의 진정성 있는 콘텐츠로
                장바구니 담기에서 결제까지 이어지는 전환을 만듭니다.
              </p>
              <ul class="rvp-premium-list">
                <li>핵심 소구 포인트 중심 스토리텔링</li>
                <li>구매 망설임 해소 댓글 작성</li>
                <li>실질적인 구매 전환율 향상</li>
              </ul>
            </div>
          </div>

        </div>{/* /rvp-premium-grid */}

        {/* 하단 강조 배너 */}
        <div class="rvp-premium-banner">
          <div class="rvp-premium-banner-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="28" height="28"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          </div>
          <div class="rvp-premium-banner-text">
            <strong>기획형 리뷰</strong>를 기본으로, 블로그·구매평을 동시에 공략하는
            <em> 인애드만의 통합 프리미엄 리뷰 전략</em>
          </div>
          <div class="rvp-premium-banner-kpi">
            <span><b>검색 유입</b> ↑</span>
            <span><b>별점 관리</b> ↑</span>
            <span><b>구매 전환</b> ↑</span>
          </div>
        </div>

      </div>
    </section>

    {/* ══ PROCESS TIMELINE (시딩과 동일 방식) ══ */}
    <section class="section sdtl-section">
      <div class="svc-bg-deco"><div class="svc-grid-lines"></div><div class="svc-orb-left"></div><div class="svc-section-glow-top"></div></div>
      <div class="container">
        <div class="section-head">
          <span class="sec-label">Process</span>
          <h2 class="sec-title">리뷰 마케팅<br /><em>진행 프로세스</em></h2>
          <p class="sec-sub">상담부터 최종 리포트까지, 전담 PM이 모든 단계를 함께합니다.</p>
        </div>

        <div class="sdtl-wrap">
          <div class="sdtl-axis"><div class="sdtl-axis-line"></div></div>

          {/* STEP 01 */}
          <div class="sdtl-item sdtl-item--left">
            <div class="sdtl-card">
              <div class="sdtl-card-icon" style="--tc:#1a6bff">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              </div>
              <div class="sdtl-card-body">
                <span class="sdtl-card-en">Consultation</span>
                <h4 class="sdtl-card-title">상담 진행</h4>
                <p class="sdtl-card-desc">브랜드 목표, 현재 리뷰 현황, 타겟 채널을 파악합니다. 기획형·단순 리뷰 최적 믹스 전략을 수립합니다.</p>
              </div>
            </div>
            <div class="sdtl-dot" style="--tc:#1a6bff"><span class="sdtl-num">01</span></div>
            <div class="sdtl-spacer"></div>
          </div>

          {/* STEP 02 */}
          <div class="sdtl-item sdtl-item--right">
            <div class="sdtl-spacer"></div>
            <div class="sdtl-dot" style="--tc:#6d28d9"><span class="sdtl-num">02</span></div>
            <div class="sdtl-card">
              <div class="sdtl-card-icon" style="--tc:#6d28d9">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
              </div>
              <div class="sdtl-card-body">
                <span class="sdtl-card-en">Contract &amp; Scope</span>
                <h4 class="sdtl-card-title">계약 진행</h4>
                <p class="sdtl-card-desc">진행 범위, 리뷰 수량, 목표 별점, 기간을 명확히 문서화합니다. 투명한 비용 구조로 신뢰 관계를 구축합니다.</p>
              </div>
            </div>
          </div>

          {/* STEP 03 */}
          <div class="sdtl-item sdtl-item--left">
            <div class="sdtl-card">
              <div class="sdtl-card-icon" style="--tc:#0891b2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>
              </div>
              <div class="sdtl-card-body">
                <span class="sdtl-card-en">Guideline &amp; Briefing</span>
                <h4 class="sdtl-card-title">가이드라인 작성</h4>
                <p class="sdtl-card-desc">브랜드 메시지, 핵심 키워드, 스토리라인, 촬영 가이드를 제작합니다. 자연스럽고 설득력 있는 리뷰 생성의 기반이 됩니다.</p>
              </div>
            </div>
            <div class="sdtl-dot" style="--tc:#0891b2"><span class="sdtl-num">03</span></div>
            <div class="sdtl-spacer"></div>
          </div>

          {/* STEP 04 */}
          <div class="sdtl-item sdtl-item--right">
            <div class="sdtl-spacer"></div>
            <div class="sdtl-dot" style="--tc:#059669"><span class="sdtl-num">04</span></div>
            <div class="sdtl-card">
              <div class="sdtl-card-icon" style="--tc:#059669">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <div class="sdtl-card-body">
                <span class="sdtl-card-en">Reviewer Recruitment</span>
                <h4 class="sdtl-card-title">크리에이터 모집</h4>
                <p class="sdtl-card-desc">브랜드 타겟과 부합하는 블로거·일반 소비자를 모집합니다. 채널 활동 이력과 리뷰 품질을 사전 검토합니다.</p>
              </div>
            </div>
          </div>

          {/* STEP 05 */}
          <div class="sdtl-item sdtl-item--left">
            <div class="sdtl-card">
              <div class="sdtl-card-icon" style="--tc:#d97706">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              </div>
              <div class="sdtl-card-body">
                <span class="sdtl-card-en">Reviewer Selection</span>
                <h4 class="sdtl-card-title">크리에이터 선정</h4>
                <p class="sdtl-card-desc">진정성, 팔로워 품질, 카테고리 적합도를 기준으로 최적의 리뷰어를 선정합니다. 데이터 기반 매칭으로 성과를 극대화합니다.</p>
              </div>
            </div>
            <div class="sdtl-dot" style="--tc:#d97706"><span class="sdtl-num">05</span></div>
            <div class="sdtl-spacer"></div>
          </div>

          {/* STEP 06 */}
          <div class="sdtl-item sdtl-item--right">
            <div class="sdtl-spacer"></div>
            <div class="sdtl-dot" style="--tc:#e11d48"><span class="sdtl-num">06</span></div>
            <div class="sdtl-card">
              <div class="sdtl-card-icon" style="--tc:#e11d48">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              </div>
              <div class="sdtl-card-body">
                <span class="sdtl-card-en">Product Experience</span>
                <h4 class="sdtl-card-title">체험 진행</h4>
                <p class="sdtl-card-desc">선정된 리뷰어에게 제품을 발송하고 실제 사용 체험을 진행합니다. 가이드라인을 기반으로 자연스러운 리뷰 콘텐츠가 준비됩니다.</p>
              </div>
            </div>
          </div>

          {/* STEP 07 */}
          <div class="sdtl-item sdtl-item--left">
            <div class="sdtl-card">
              <div class="sdtl-card-icon" style="--tc:#7c3aed">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </div>
              <div class="sdtl-card-body">
                <span class="sdtl-card-en">Review Writing</span>
                <h4 class="sdtl-card-title">리뷰 작성</h4>
                <p class="sdtl-card-desc">리뷰어가 가이드라인에 맞춰 기획형 또는 단순 리뷰를 작성합니다. 브랜드 검수 후 각 플랫폼에 최적화된 형태로 게시됩니다.</p>
              </div>
            </div>
            <div class="sdtl-dot" style="--tc:#7c3aed"><span class="sdtl-num">07</span></div>
            <div class="sdtl-spacer"></div>
          </div>

          {/* STEP 08 */}
          <div class="sdtl-item sdtl-item--right sdtl-item--last">
            <div class="sdtl-spacer"></div>
            <div class="sdtl-dot sdtl-dot--final" style="--tc:#10b981"><span class="sdtl-num">08</span></div>
            <div class="sdtl-card sdtl-card--final">
              <div class="sdtl-card-icon" style="--tc:#10b981">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
              </div>
              <div class="sdtl-card-body">
                <span class="sdtl-card-en">Performance Report</span>
                <h4 class="sdtl-card-title">리포트</h4>
                <p class="sdtl-card-desc">캠페인 전 기간의 리뷰 수, 별점 변화, 전환율, 검색 유입을 수치로 정리한 종합 리포트를 제공합니다. 다음 캠페인 전략까지 제안합니다.</p>
              </div>
            </div>
          </div>

        </div>{/* /sdtl-wrap */}

        <div class="sdtl-footer">
          <span class="sdtl-footer-icon">📋</span>
          <span>모든 단계에서 <strong>전담 PM</strong>이 함께합니다 &nbsp;·&nbsp; 평균 캠페인 기간 <strong>3–5주</strong></span>
        </div>

      </div>
    </section>

    {/* ══ RESULTS ══ */}
    {/* ══ FAQ ══ */}
    <section class="section svc-faq-section">
      <div class="svc-bg-deco"><div class="svc-dot-pattern"></div><div class="svc-orb-right"></div><div class="svc-section-glow-top"></div></div>
      <div class="container">
        <div class="section-head">
          <span class="sec-label">FAQ</span>
          <h2 class="sec-title">자주 하는 질문</h2>
          <p class="sec-sub">리뷰 마케팅에 대해 가장 많이 묻는 질문들을 모았습니다.</p>
        </div>
        <div class="faq-wrap">
          {[
            { q:'리뷰 마케팅은 허위 리뷰 아닌가요?', a:'실제 제품을 사용한 소비자가 <strong>자신의 경험을 솔직하게 작성</strong>하는 방식입니다. 인애드컴퍼니는 허위·과장 리뷰를 엄격히 금지하며, 공정거래위원회 지침을 준수합니다.' },
            { q:'어떤 플랫폼에서 리뷰 관리가 가능한가요?', a:'<strong>네이버 스마트스토어, 쿠팡, 올리브영, 카카오선물하기</strong> 등 주요 이커머스 플랫폼과 네이버 블로그, 인스타그램까지 통합 관리합니다.' },
            { q:'부정적인 리뷰는 어떻게 대응하나요?', a:'부정 리뷰 모니터링 → 원인 분석 → <strong>신속한 브랜드 공식 답변 작성</strong> → 긍정 리뷰 비중 확대 전략을 순차적으로 적용해 브랜드 이미지를 회복합니다.' },
            { q:'리뷰 수가 얼마나 있어야 효과가 있나요?', a:'카테고리마다 다르지만, 일반적으로 <strong>50건 이상</strong>이면 신뢰도 형성이 시작되고, 200건 이상이면 검색 알고리즘 상위 노출에도 긍정적인 영향을 줍니다.' },
            { q:'별점 관리도 함께 해주나요?', a:'네, 리뷰 수 확보와 함께 <strong>평균 별점 4.5 이상 유지</strong>를 목표로 운영합니다. 저품질 리뷰 관리 및 우수 리뷰 유도 전략을 병행합니다.' },
            { q:'리뷰 캠페인 완료 후에도 효과가 지속되나요?', a:'네, 블로그·이커머스 리뷰는 <strong>검색 자산으로 축적</strong>되어 캠페인 종료 후에도 지속적으로 신규 고객 유입과 구매 전환에 기여합니다.' },
          ].map((item, i) => (
            <div class="faq-item" id={`faq-review-${i}`}>
              <button class="faq-q" type="button" onclick={`(function(btn){var item=btn.closest('.faq-item');var isOpen=item.classList.contains('faq-item--open');document.querySelectorAll('.faq-item').forEach(function(el){el.classList.remove('faq-item--open');});if(!isOpen){item.classList.add('faq-item--open');}})(this)`}>
                <div class="faq-q-left">
                  <span class="faq-q-badge">Q</span>
                  <span class="faq-q-text">{item.q}</span>
                </div>
                <span class="faq-chevron"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><polyline points="6 9 12 15 18 9"/></svg></span>
              </button>
              <div class="faq-a"><div class="faq-a-inner" dangerouslySetInnerHTML={{__html: item.a}} /></div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ══ CTA ══ */}
    <section class="svc-cta-section">
      <div class="container">
        <div class="svc-cta-inner">
          <div class="svc-cta-text">
            <h2>리뷰 마케팅으로<br /><em>브랜드 신뢰를 쌓으세요</em></h2>
            <p>인애드컴퍼니 전문가가 브랜드에 맞는 리뷰 전략을 무료로 진단해드립니다.</p>
          </div>
          <div class="svc-cta-btns">
            <a href="/contact" class="hero-cta-btn primary"><span>무료 상담 신청하기</span><svg viewBox="0 0 24 24" fill="none"><path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
            <button type="button" class="hero-cta-btn ghost" onclick="openCallModal()"><span>📞 바로 전화하기</span></button>
          </div>
        </div>
      </div>
    </section>


    {/* ── Scroll Reveal ── */}
    <script dangerouslySetInnerHTML={{__html: `
(function(){
  var s = document.createElement('script');
  s.src = '/static/scroll-reveal.js';
  document.head.appendChild(s);
})();
    `}} />

    {/* ── Admin Dynamic Marketing Stats ── */}
    <script dangerouslySetInnerHTML={{__html: `
(function(){
  var SVC_KEY = 'review';
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
  </>
)
