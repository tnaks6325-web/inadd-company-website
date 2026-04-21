export const SvcViralPage = () => (
  <>
    {/* ── Hero ── */}
    <section class="page-hero svc-hero">
      <div class="page-hero-bg"><div class="hero-glow glow-1"></div><div class="hero-glow glow-2"></div></div>
      <div class="container">
        <a href="/marketing" class="svc-back-link">← Marketing 서비스 전체보기</a>
        <span class="sec-label">Viral Marketing</span>
        <h1 class="page-title">바이럴 마케팅</h1>
        <p class="page-desc">맘카페·온라인 커뮤니티 기반의 자연스러운 확산으로<br />브랜드 인지도를 폭발적으로 높입니다.</p>
        <div class="svc-hero-kpi">
          <div class="shk-item"><strong>2,800만+</strong><span>평균 캠페인 도달</span></div>
          <div class="shk-divider"></div>
          <div class="shk-item"><strong>48시간</strong><span>최단 바이럴 달성</span></div>
          <div class="shk-divider"></div>
          <div class="shk-item"><strong>98%</strong><span>재계약률</span></div>
        </div>
      </div>
    </section>

    {/* ============ 서비스 소개 ============ */}
    <section class="section svc-intro-section" id="viral-content">
      <div class="container">
        <div class="svc-intro-grid">
          <div class="svc-intro-text">
            <span class="sec-label">What We Do</span>
            <h2 class="sec-title">광고가 아닌<br /><em>경험으로 퍼집니다</em></h2>
            <p>소비자는 광고를 피하지만, 경험은 스스로 공유합니다. 인애드컴퍼니는 맘카페, 네이버카페, 커뮤니티 등 소비자가 직접 모이는 공간에서 자연스럽게 확산되는 바이럴 구조를 설계합니다.</p>
            <p>광고처럼 느껴지지 않는 콘텐츠가 공유되고, 공유는 검색으로, 검색은 구매로 연결됩니다.</p>
            <ul class="svc-feature-list">
              <li><span class="sfl-dot"></span>커뮤니티 이슈화 기획 및 운영</li>
              <li><span class="sfl-dot"></span>맘카페·SNS 자연확산 설계</li>
              <li><span class="sfl-dot"></span>UGC(사용자 생성 콘텐츠) 유도 전략</li>
              <li><span class="sfl-dot"></span>버즈 모니터링 및 실시간 대응</li>
              <li><span class="sfl-dot"></span>바이럴 후 SEO 연계 전략</li>
            </ul>
          </div>
          <div class="svc-intro-visual">
            <div class="siv-img-wrap">
              <img src="/static/svc-images/viral.png" alt="바이럴 마케팅 비주얼" class="siv-photo" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ============ 상품 라인업 ============ */}
    <section class="section viral-products-section">
      <div class="container">
        <div class="section-head">
          <span class="sec-label">Service Products</span>
          <h2 class="sec-title">바이럴 마케팅<br /><em>상품 라인업</em></h2>
        </div>
        <div class="vp-grid">
          {[
            {
              icon:'☕', name:'카페 침투 마케팅', sub:'Cafe Viral',
              desc:'맘카페·네이버카페 등 소비자가 모이는 커뮤니티에 자연스럽게 스며드는 바이럴 콘텐츠 기획·운영',
              kpis:[
                { val:'1,965개', label:'보유 카페 수' },
                { val:'19개', label:'진행 카테고리 수' },
              ]
            },
            {
              icon:'💬', name:'커뮤니티 바이럴', sub:'Community Viral',
              desc:'온라인 커뮤니티 내 이슈화로 브랜드 검색량과 자연 유입을 폭발적으로 증가시킵니다',
              kpis:[
                { val:'72+', label:'진행 가능 커뮤니티' },
              ]
            },
            {
              icon:'📱', name:'SNS 바이럴', sub:'SNS Viral',
              desc:'인스타그램·틱톡·유튜브 등 SNS 채널에서의 자연스러운 확산 구조를 설계합니다',
              kpis:[
                { val:'450개+', label:'진행 가능 계정' },
              ],
              tags:['인스타 카드뉴스','먹스타그램 배포','숏폼 배포','숏폼 제작','X (구 트위터)','스레드'],
            },
            {
              icon:'📰', name:'언론 바이럴', sub:'Press Viral',
              desc:'뉴스·매체 배포를 통해 브랜드의 공신력과 검색 노출을 동시에 강화합니다',
              kpis:[
                { val:'153+', label:'보유 매체 수' },
                { val:'7개', label:'보유 카테고리 수' },
              ]
            },
          ].map((p, i) => (
            <div class="vp-card" id={`vp-card-${i}`} onclick={`toggleVpCard(${i})`}>
              <div class="vp-card-top">
                <div class="vp-icon">{p.icon}</div>
                <div class="vp-body">
                  <h3>{p.name}</h3>
                  <span class="vp-sub">{p.sub}</span>
                  <p>{p.desc}</p>
                </div>
                <div class="vp-toggle-btn" id={`vp-toggle-${i}`}>
                  <svg viewBox="0 0 24 24" fill="none" width="16" height="16"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </div>
              </div>
              <div class="vp-kpi-panel" id={`vp-kpi-${i}`}>
                <div class="vp-kpi-divider"></div>
                <div class="vp-kpi-row">
                  {p.kpis.map(k => (
                    <div class="vp-kpi-item">
                      <strong class="vp-kpi-val">{k.val}</strong>
                      <span class="vp-kpi-label">{k.label}</span>
                    </div>
                  ))}
                </div>
                {p.tags && (
                  <div class="vp-tags-row">
                    <span class="vp-tags-label">상품군</span>
                    <div class="vp-tags-wrap">
                      {p.tags.map(t => (
                        <span class="vp-tag">{t}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ============ 진행 프로세스 ============ */}
    <section class="section svc-process-section">
      <div class="container">
        <div class="section-head">
          <span class="sec-label">Process</span>
          <h2 class="sec-title">바이럴 마케팅<br /><em>진행 프로세스</em></h2>
        </div>
        <div class="svc-process-steps">
          {[
            { num:'01', title:'브랜드 분석', desc:'브랜드 특성, 타겟 소비자, 경쟁 환경을 분석해 바이럴 포인트를 발굴합니다.', img:'/static/process-images/process-01.png', accent:'#1a6bff' },
            { num:'02', title:'채널 전략 수립', desc:'맘카페, 커뮤니티, SNS 등 타겟이 모이는 최적 채널과 확산 시나리오를 설계합니다.', img:'/static/process-images/process-02.png', accent:'#7c3aed' },
            { num:'03', title:'콘텐츠 제작', desc:'광고처럼 느껴지지 않는 자연스러운 경험 콘텐츠를 기획·제작합니다.', img:'/static/process-images/process-03.png', accent:'#059669' },
            { num:'04', title:'시드 배포', desc:'핵심 커뮤니티에 콘텐츠를 전략적으로 배포하고 초기 반응을 모니터링합니다.', img:'/static/process-images/process-04.png', accent:'#0891b2' },
            { num:'05', title:'확산 관리', desc:'버즈가 확산되는 과정을 실시간 모니터링하고 추가 확산 전략을 실행합니다.', img:'/static/process-images/process-05.png', accent:'#dc2626' },
            { num:'06', title:'성과 리포팅', desc:'도달, 공유, 검색량 변화, 매출 연계 등 종합 성과 리포트를 제공합니다.', img:'/static/process-images/process-06.png', accent:'#d97706' },
          ].map(s => (
            <div class="sps-step">
              <div class="sps-img-wrap">
                <img src={s.img} alt={s.title} class="sps-img" loading="lazy" />
                <div class="sps-img-dim"></div>
              </div>
              <div class="sps-content">
                <div class="sps-num" style={`color:${s.accent}`}>{s.num}</div>
                <div class="sps-body">
                  <h4>{s.title}</h4>
                  <p>{s.desc}</p>
                </div>
                <div class="sps-accent-bar" style={`background:${s.accent}`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ============ 성과 사례 ============ */}
    <section class="section svc-results-section">
      <div class="container">
        <div class="section-head">
          <span class="sec-label">Results</span>
          <h2 class="sec-title">실제 성과<br /><em>숫자로 증명합니다</em></h2>
        </div>
        <div class="svc-result-grid">
          <div class="srg-card srg-card--featured">
            <div class="srg-tag">Instagram 바이럴</div>
            <div class="srg-metrics">
              <div class="srg-metric"><strong>2,800만</strong><span>조회수</span></div>
              <div class="srg-metric"><strong>142,000</strong><span>공유 수</span></div>
              <div class="srg-metric"><strong>+580%</strong><span>매출 증가</span></div>
            </div>
            <p class="srg-desc">뷰티 브랜드 신제품 출시 캠페인. 맘카페 + 인스타그램 연계 바이럴로 48시간 내 2,800만 조회 달성</p>
          </div>
          <div class="srg-card">
            <div class="srg-tag">커뮤니티 바이럴</div>
            <div class="srg-metrics">
              <div class="srg-metric"><strong>1,800만</strong><span>조회수</span></div>
              <div class="srg-metric"><strong>+1,200%</strong><span>검색량 증가</span></div>
            </div>
            <p class="srg-desc">식품 브랜드 바이럴 캠페인. 온라인 커뮤니티 이슈화로 브랜드 검색량 폭발적 증가</p>
          </div>
          <div class="srg-card">
            <div class="srg-tag">YouTube 바이럴</div>
            <div class="srg-metrics">
              <div class="srg-metric"><strong>900만</strong><span>조회수</span></div>
              <div class="srg-metric"><strong>+340%</strong><span>브랜드 인지도</span></div>
            </div>
            <p class="srg-desc">헬스케어 브랜드 유튜브 바이럴. 자연스러운 리뷰 콘텐츠로 브랜드 신뢰도 3배 향상</p>
          </div>
        </div>
      </div>
    </section>

    {/* ============ CTA ============ */}
    <section class="svc-cta-section">

    <script dangerouslySetInnerHTML={{ __html: `
      function toggleVpCard(idx) {
        var panel = document.getElementById('vp-kpi-' + idx);
        var btn   = document.getElementById('vp-toggle-' + idx);
        var card  = document.getElementById('vp-card-' + idx);
        if (!panel) return;
        var isOpen = panel.classList.contains('vp-kpi-panel--open');
        // 모든 카드 닫기
        for (var i = 0; i < 4; i++) {
          var p = document.getElementById('vp-kpi-' + i);
          var b = document.getElementById('vp-toggle-' + i);
          var c = document.getElementById('vp-card-' + i);
          if (p) p.classList.remove('vp-kpi-panel--open');
          if (b) b.classList.remove('vp-toggle-btn--open');
          if (c) c.classList.remove('vp-card--active');
        }
        // 클릭한 카드가 닫혀있었으면 열기
        if (!isOpen) {
          panel.classList.add('vp-kpi-panel--open');
          btn.classList.add('vp-toggle-btn--open');
          card.classList.add('vp-card--active');
        }
      }
    `}} />
      <div class="container">
        <div class="svc-cta-inner">
          <div class="svc-cta-text">
            <h2>바이럴 마케팅으로<br /><em>브랜드를 폭발적으로 성장시키세요</em></h2>
            <p>인애드컴퍼니 전문가가 우리 브랜드에 맞는 바이럴 전략을 무료로 진단해드립니다.</p>
          </div>
          <div class="svc-cta-btns">
            <a href="/contact" class="hero-cta-btn primary">
              <span>무료 상담 신청하기</span>
              <svg viewBox="0 0 24 24" fill="none"><path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </a>
            <button type="button" class="hero-cta-btn ghost" onclick="openCallModal()"><span>📞 바로 전화하기</span></button>
          </div>
        </div>
      </div>
    </section>
  </>
)
