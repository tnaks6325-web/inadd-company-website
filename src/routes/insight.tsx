export const InsightPage = () => (
  <>
    {/* ── Page Hero ── */}
    <section class="page-hero insight-hero">
      <div class="page-hero-bg"><div class="hero-glow glow-1"></div></div>
      <div class="container">
        <span class="sec-label">Marketing Insight</span>
        <h1 class="page-title">마케팅<br /><em>인사이트</em></h1>
        <p class="page-desc">현장에서 직접 검증된 마케팅 지식과 트렌드를 공유합니다.</p>
      </div>
    </section>

    {/* ── Featured Article ── */}
    <section class="section insight-featured-section">
      <div class="container">
        <div class="ins-featured">
          <div class="ins-featured-label">
            <span class="sec-label">FEATURED</span>
          </div>
          <div class="ins-featured-inner">
            <div class="ins-featured-visual">
              <div class="ins-featured-icon-bg">
                <svg viewBox="0 0 120 120" fill="none">
                  <circle cx="60" cy="60" r="58" stroke="rgba(26,107,255,0.15)" stroke-width="1"/>
                  <circle cx="60" cy="60" r="40" stroke="rgba(26,107,255,0.2)" stroke-width="1"/>
                  <path d="M30 80 Q45 50 60 58 Q75 66 90 35" stroke="rgba(26,107,255,0.7)" stroke-width="2" stroke-linecap="round" fill="none"/>
                  <circle cx="60" cy="58" r="5" fill="rgba(26,107,255,0.9)"/>
                  <circle cx="30" cy="80" r="3" fill="rgba(26,107,255,0.5)"/>
                  <circle cx="90" cy="35" r="3" fill="rgba(26,107,255,0.5)"/>
                </svg>
              </div>
              <div class="ins-featured-tag-wrap">
                <span class="ins-cat-tag ins-cat-tag--blue">퍼포먼스 마케팅</span>
              </div>
            </div>
            <div class="ins-featured-content">
              <div class="ins-meta-row">
                <span class="ins-date">2025.03.28</span>
                <span class="ins-read-time">10분 읽기</span>
              </div>
              <h2 class="ins-featured-title">2025년 바이럴 마케팅,<br />이제는 '경험'이 전파되는 시대</h2>
              <p class="ins-featured-desc">소비자는 광고를 피합니다. 하지만 경험은 스스로 공유합니다. 2025년 마케팅의 핵심은 광고가 아닌 경험을 설계하는 것입니다. 인애드컴퍼니가 현장에서 직접 검증한 바이럴 퍼널 설계 전략을 공개합니다.</p>
              <div class="ins-kpi-row">
                <div class="ins-kpi-item">
                  <strong>2,800만+</strong>
                  <span>평균 캠페인 도달</span>
                </div>
                <div class="ins-kpi-item">
                  <strong>48시간</strong>
                  <span>최단 바이럴 달성</span>
                </div>
                <div class="ins-kpi-item">
                  <strong>+1,200%</strong>
                  <span>검색량 증가</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ── 필터 + 아티클 그리드 ── */}
    <section class="section insight-articles-section">
      <div class="container">
        <div class="insight-filter-bar" id="insightFilter">
          <button class="inf-btn active" data-filter="all">전체</button>
          <button class="inf-btn" data-filter="viral">바이럴</button>
          <button class="inf-btn" data-filter="influencer">인플루언서</button>
          <button class="inf-btn" data-filter="seo">SEO</button>
          <button class="inf-btn" data-filter="content">콘텐츠</button>
          <button class="inf-btn" data-filter="trend">트렌드</button>
          <button class="inf-btn" data-filter="oliveyoung">올리브영</button>
        </div>

        <div class="insight-articles-grid" id="insightGrid">

          <article class="ins-card" data-cat="viral content">
            <div class="ins-card-visual ins-visual--01">
              <div class="ins-card-icon">
                <svg viewBox="0 0 48 48" fill="none">
                  <path d="M8 40 L18 24 L28 30 L38 14" stroke="rgba(26,107,255,0.8)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <circle cx="18" cy="24" r="3" fill="rgba(26,107,255,0.7)"/>
                  <circle cx="28" cy="30" r="3" fill="rgba(26,107,255,0.7)"/>
                </svg>
              </div>
            </div>
            <div class="ins-card-body">
              <div class="ins-card-meta">
                <span class="ins-cat-tag ins-cat-tag--blue">바이럴 마케팅</span>
                <span class="ins-date">2025.03.15</span>
              </div>
              <h3 class="ins-card-title">숏폼이 바꾼 소비자 구매 여정</h3>
              <p class="ins-card-desc">틱톡, 인스타 릴스, 유튜브 쇼츠. 숏폼이 구매 퍼널을 어떻게 재편하고 있는지 분석합니다.</p>
              <div class="ins-card-footer">
                <span class="ins-read-time">8분 읽기</span>
                <span class="ins-platform">TikTok · Instagram</span>
              </div>
            </div>
          </article>

          <article class="ins-card" data-cat="viral seo">
            <div class="ins-card-visual ins-visual--02">
              <div class="ins-card-icon">
                <svg viewBox="0 0 48 48" fill="none">
                  <circle cx="20" cy="20" r="12" stroke="rgba(26,107,255,0.6)" stroke-width="2"/>
                  <line x1="30" y1="30" x2="40" y2="40" stroke="rgba(26,107,255,0.8)" stroke-width="2.5" stroke-linecap="round"/>
                  <circle cx="16" cy="18" r="2" fill="rgba(26,107,255,0.7)"/>
                  <circle cx="22" cy="22" r="2" fill="rgba(26,107,255,0.7)"/>
                </svg>
              </div>
            </div>
            <div class="ins-card-body">
              <div class="ins-card-meta">
                <span class="ins-cat-tag ins-cat-tag--purple">커뮤니티 마케팅</span>
                <span class="ins-date">2025.03.10</span>
              </div>
              <h3 class="ins-card-title">맘카페·커뮤니티 바이럴의 힘</h3>
              <p class="ins-card-desc">광고가 통하지 않는 공간, 커뮤니티. 실제 소비자들이 모이는 공간에서 브랜드를 확산시키는 전략.</p>
              <div class="ins-card-footer">
                <span class="ins-read-time">6분 읽기</span>
                <span class="ins-platform">네이버카페 · 맘카페</span>
              </div>
            </div>
          </article>

          <article class="ins-card" data-cat="seo trend">
            <div class="ins-card-visual ins-visual--03">
              <div class="ins-card-icon">
                <svg viewBox="0 0 48 48" fill="none">
                  <rect x="6" y="10" width="36" height="28" rx="4" stroke="rgba(26,107,255,0.5)" stroke-width="1.5"/>
                  <path d="M6 18H42" stroke="rgba(26,107,255,0.3)" stroke-width="1"/>
                  <path d="M14 26H24" stroke="rgba(26,107,255,0.6)" stroke-width="2" stroke-linecap="round"/>
                  <path d="M14 32H20" stroke="rgba(26,107,255,0.4)" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </div>
            </div>
            <div class="ins-card-body">
              <div class="ins-card-meta">
                <span class="ins-cat-tag ins-cat-tag--green">SEO 마케팅</span>
                <span class="ins-date">2025.03.05</span>
              </div>
              <h3 class="ins-card-title">검색이 곧 구매다: 2025 SEO 전략</h3>
              <p class="ins-card-desc">소비자가 검색하는 순간, 브랜드가 먼저 보여야 합니다. 키워드 전략부터 콘텐츠 최적화까지.</p>
              <div class="ins-card-footer">
                <span class="ins-read-time">7분 읽기</span>
                <span class="ins-platform">네이버 · 구글 · 블로그</span>
              </div>
            </div>
          </article>

          <article class="ins-card" data-cat="influencer content">
            <div class="ins-card-visual ins-visual--04">
              <div class="ins-card-icon">
                <svg viewBox="0 0 48 48" fill="none">
                  <polygon points="24,6 28,18 40,18 30,26 34,38 24,30 14,38 18,26 8,18 20,18" stroke="rgba(26,107,255,0.6)" stroke-width="1.5" fill="none"/>
                  <polygon points="24,12 27,21 36,21 29,27 32,36 24,30 16,36 19,27 12,21 21,21" fill="rgba(26,107,255,0.15)"/>
                </svg>
              </div>
            </div>
            <div class="ins-card-body">
              <div class="ins-card-meta">
                <span class="ins-cat-tag ins-cat-tag--orange">인플루언서</span>
                <span class="ins-date">2025.02.28</span>
              </div>
              <h3 class="ins-card-title">팔로워 수보다 중요한 영향력</h3>
              <p class="ins-card-desc">대형보다 정교하게 타겟팅된 마이크로 인플루언서가 더 높은 전환율을 만들어내는 이유.</p>
              <div class="ins-card-footer">
                <span class="ins-read-time">5분 읽기</span>
                <span class="ins-platform">YouTube · Instagram</span>
              </div>
            </div>
          </article>

          <article class="ins-card" data-cat="oliveyoung trend">
            <div class="ins-card-visual ins-visual--05">
              <div class="ins-card-icon">
                <svg viewBox="0 0 48 48" fill="none">
                  <path d="M10 36 L10 20 L24 8 L38 20 L38 36" stroke="rgba(26,107,255,0.6)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <rect x="18" y="26" width="12" height="10" stroke="rgba(26,107,255,0.5)" stroke-width="1.5"/>
                  <circle cx="24" cy="20" r="3" fill="rgba(26,107,255,0.5)"/>
                </svg>
              </div>
            </div>
            <div class="ins-card-body">
              <div class="ins-card-meta">
                <span class="ins-cat-tag ins-cat-tag--green">올리브영 마케팅</span>
                <span class="ins-date">2025.02.20</span>
              </div>
              <h3 class="ins-card-title">올리브영 입점 브랜드 성장 전략</h3>
              <p class="ins-card-desc">올리브영 입점 후 매출을 극대화하는 방법. 리뷰 관리, 노출 최적화, 온오프라인 연계 마케팅.</p>
              <div class="ins-card-footer">
                <span class="ins-read-time">9분 읽기</span>
                <span class="ins-platform">올리브영 · 리뷰 최적화</span>
              </div>
            </div>
          </article>

          <article class="ins-card" data-cat="content trend">
            <div class="ins-card-visual ins-visual--06">
              <div class="ins-card-icon">
                <svg viewBox="0 0 48 48" fill="none">
                  <rect x="6" y="8" width="36" height="26" rx="4" stroke="rgba(26,107,255,0.5)" stroke-width="1.5"/>
                  <circle cx="24" cy="21" r="8" stroke="rgba(26,107,255,0.6)" stroke-width="1.5"/>
                  <polygon points="22,18 22,24 28,21" fill="rgba(26,107,255,0.7)"/>
                  <path d="M12 40 H36" stroke="rgba(26,107,255,0.3)" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </div>
            </div>
            <div class="ins-card-body">
              <div class="ins-card-meta">
                <span class="ins-cat-tag ins-cat-tag--purple">PPL 전략</span>
                <span class="ins-date">2025.02.15</span>
              </div>
              <h3 class="ins-card-title">거부감 없는 PPL, 어떻게 만드나</h3>
              <p class="ins-card-desc">드라마·영화·웹콘텐츠 속 자연스러운 브랜드 노출. 수천만 시청자에게 각인시키는 전략.</p>
              <div class="ins-card-footer">
                <span class="ins-read-time">6분 읽기</span>
                <span class="ins-platform">드라마 · 웹예능 · YouTube</span>
              </div>
            </div>
          </article>

          <article class="ins-card" data-cat="viral influencer">
            <div class="ins-card-visual ins-visual--01">
              <div class="ins-card-icon">
                <svg viewBox="0 0 48 48" fill="none">
                  <circle cx="16" cy="16" r="8" stroke="rgba(26,107,255,0.5)" stroke-width="1.5"/>
                  <circle cx="34" cy="28" r="6" stroke="rgba(26,107,255,0.6)" stroke-width="1.5"/>
                  <line x1="23" y1="18" x2="30" y2="24" stroke="rgba(26,107,255,0.5)" stroke-width="1.5"/>
                  <circle cx="22" cy="36" r="5" stroke="rgba(26,107,255,0.4)" stroke-width="1.5"/>
                  <line x1="28" y1="32" x2="25" y2="34" stroke="rgba(26,107,255,0.4)" stroke-width="1.5"/>
                </svg>
              </div>
            </div>
            <div class="ins-card-body">
              <div class="ins-card-meta">
                <span class="ins-cat-tag ins-cat-tag--blue">시딩 캠페인</span>
                <span class="ins-date">2025.02.10</span>
              </div>
              <h3 class="ins-card-title">시딩의 진짜 목적: 입소문 생태계 설계</h3>
              <p class="ins-card-desc">단순 체험단이 아닌, 자발적 후기가 퍼져나가는 구조를 만드는 방법. 68% 전환율의 비결.</p>
              <div class="ins-card-footer">
                <span class="ins-read-time">7분 읽기</span>
                <span class="ins-platform">블로그 · 인스타그램</span>
              </div>
            </div>
          </article>

          <article class="ins-card" data-cat="seo content">
            <div class="ins-card-visual ins-visual--03">
              <div class="ins-card-icon">
                <svg viewBox="0 0 48 48" fill="none">
                  <path d="M8 34 L16 22 L24 28 L32 16 L40 20" stroke="rgba(26,107,255,0.7)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                  <path d="M8 34 L16 22 L24 28 L32 16 L40 20 L40 38 L8 38 Z" fill="rgba(26,107,255,0.07)"/>
                </svg>
              </div>
            </div>
            <div class="ins-card-body">
              <div class="ins-card-meta">
                <span class="ins-cat-tag ins-cat-tag--orange">퍼포먼스</span>
                <span class="ins-date">2025.02.05</span>
              </div>
              <h3 class="ins-card-title">마케팅 ROI를 3배 높이는 퍼널 설계</h3>
              <p class="ins-card-desc">인식→관심→욕구→행동. 각 단계를 최적화하면 같은 예산으로 3배의 성과를 만들 수 있습니다.</p>
              <div class="ins-card-footer">
                <span class="ins-read-time">8분 읽기</span>
                <span class="ins-platform">전 채널 공통</span>
              </div>
            </div>
          </article>

        </div>{/* /insight-articles-grid */}

        <div class="insight-load-more">
          <button class="ins-load-btn" id="insLoadMore">
            <span>더 많은 인사이트 보기</span>
            <svg viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
        </div>
      </div>
    </section>

    {/* ── 마케팅 퍼널 인포그래픽 ── */}
    <section class="section insight-funnel-section">
      <div class="container">
        <div class="section-head">
          <span class="sec-label">Our Method</span>
          <h2 class="sec-title">인애드의<br /><em>마케팅 퍼널</em></h2>
        </div>
        <div class="ins-funnel-steps">
          <div class="ins-funnel-step">
            <div class="ifs-num">01</div>
            <div class="ifs-body">
              <h4>경험 설계</h4>
              <p>소비자가 광고가 아닌 경험으로 인식하도록 콘텐츠를 설계합니다</p>
            </div>
          </div>
          <div class="ins-funnel-arrow">
            <svg viewBox="0 0 40 24" fill="none"><path d="M0 12H36M28 4L36 12L28 20" stroke="rgba(26,107,255,0.5)" stroke-width="2" stroke-linecap="round"/></svg>
          </div>
          <div class="ins-funnel-step">
            <div class="ifs-num">02</div>
            <div class="ifs-body">
              <h4>자발적 공유</h4>
              <p>자발적으로 공유하고 싶은 감정적 트리거를 심어 확산을 유도합니다</p>
            </div>
          </div>
          <div class="ins-funnel-arrow">
            <svg viewBox="0 0 40 24" fill="none"><path d="M0 12H36M28 4L36 12L28 20" stroke="rgba(26,107,255,0.5)" stroke-width="2" stroke-linecap="round"/></svg>
          </div>
          <div class="ins-funnel-step">
            <div class="ifs-num">03</div>
            <div class="ifs-body">
              <h4>검색 유입</h4>
              <p>바이럴 후 검색으로 유입되는 소비자를 잡는 SEO 구조를 사전에 준비합니다</p>
            </div>
          </div>
          <div class="ins-funnel-arrow">
            <svg viewBox="0 0 40 24" fill="none"><path d="M0 12H36M28 4L36 12L28 20" stroke="rgba(26,107,255,0.5)" stroke-width="2" stroke-linecap="round"/></svg>
          </div>
          <div class="ins-funnel-step ins-funnel-step--accent">
            <div class="ifs-num">04</div>
            <div class="ifs-body">
              <h4>구매 전환</h4>
              <p>검색에서 구매까지의 전환율을 극대화하는 랜딩 구조를 설계합니다</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ── 뉴스레터 구독 ── */}
    <section class="section insight-newsletter-section">
      <div class="container">
        <div class="ins-newsletter-wrap">
          <div class="ins-nl-text">
            <span class="sec-label">Newsletter</span>
            <h2>마케팅 트렌드를<br /><em>가장 먼저 받아보세요</em></h2>
            <p>매월 1회, 검증된 마케팅 인사이트를 무료로 발송합니다.</p>
            <div class="ins-nl-count">
              <svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" stroke="rgba(26,107,255,0.5)" stroke-width="1.5"/><path d="M7 10l2 2 4-4" stroke="rgba(26,107,255,0.8)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
              <span>현재 <strong>2,400명</strong>의 마케터가 구독 중</span>
            </div>
          </div>
          <form class="ins-nl-form" id="newsletterForm" onsubmit="return handleNewsletter(event)">
            <div class="ins-nl-input-wrap">
              <input type="email" id="nl-email" placeholder="이메일 주소를 입력해주세요" required />
              <button type="submit" class="ins-nl-btn">구독하기</button>
            </div>
            <p class="ins-nl-note">스팸 없이, 언제든지 구독 취소 가능합니다.</p>
            <div class="ins-nl-success" id="nlSuccess" style="display:none;">
              <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="rgba(26,107,255,0.15)"/><path d="M8 12l3 3 5-5" stroke="rgba(26,107,255,0.9)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
              <span>구독 신청이 완료되었습니다!</span>
            </div>
          </form>
        </div>
      </div>
    </section>

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
