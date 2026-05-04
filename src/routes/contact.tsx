export const ContactPage = () => (
  <>
    {/* ══════════════════════════════════════
        STEP 1 — 풀스크린 반반 선택 화면
        ══════════════════════════════════════ */}
    <div class="ct-split-screen" id="ct-split">

      {/* 왼쪽 — 대행사 */}
      <div class="ct-split-panel ct-panel--agency" id="panel-agency"
           onmouseenter="hoverPanel('agency')"
           onmouseleave="resetPanel()"
           onclick="enterForm('agency')">
        <div class="ct-panel-bg"></div>
        <div class="ct-panel-content">
          <div class="ct-panel-label">AGENCY</div>
          <h2 class="ct-panel-title">대행사<br />이신가요?</h2>
          <p class="ct-panel-desc">마케팅 에이전시 · 광고대행사<br />파트너십 상담을 도와드립니다</p>
          <div class="ct-panel-cta">
            <span>상담 신청하기</span>
            <svg viewBox="0 0 24 24" fill="none"><path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
        </div>
        <div class="ct-panel-num">01</div>
      </div>

      {/* 가운데 구분선 (왼쪽↔가운데) */}
      <div class="ct-split-divider ct-divider--left">
        <span>OR</span>
      </div>
      <div class="ct-split-panel ct-panel--brochure" id="panel-brochure"
           onmouseenter="hoverPanel('brochure')"
           onmouseleave="resetPanel()"
           onclick="enterBrochure()">
        <div class="ct-panel-bg"></div>
        <div class="ct-panel-content">
          <div class="ct-panel-label">BROCHURE</div>
          <h2 class="ct-panel-title">회사소개서<br />받아보기</h2>
          <p class="ct-panel-desc">이메일 하나면 충분합니다<br />인애드컴퍼니 소개서를 보내드립니다</p>
          <div class="ct-panel-cta">
            <span>소개서 신청하기</span>
            <svg viewBox="0 0 24 24" fill="none"><path d="M12 2v13M7 10l5 5 5-5M4 19h16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
        </div>
        <div class="ct-panel-num">03</div>
      </div>

      {/* 오른쪽 구분선 (가운데↔오른쪽) */}
      <div class="ct-split-divider ct-divider--right">
        <span>OR</span>
      </div>

      {/* 오른쪽 — 브랜드 */}
      <div class="ct-split-panel ct-panel--brand" id="panel-brand"
           onmouseenter="hoverPanel('brand')"
           onmouseleave="resetPanel()"
           onclick="enterForm('brand')">
        <div class="ct-panel-bg"></div>
        <div class="ct-panel-content">
          <div class="ct-panel-label">BRAND</div>
          <h2 class="ct-panel-title">브랜드<br />이신가요?</h2>
          <p class="ct-panel-desc">직접 운영하는 브랜드 · 기업<br />마케팅 상담을 도와드립니다</p>
          <div class="ct-panel-cta">
            <span>상담 신청하기</span>
            <svg viewBox="0 0 24 24" fill="none"><path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
        </div>
        <div class="ct-panel-num">02</div>
      </div>

    </div>

    {/* ══════════════════════════════════════
        STEP 2 — 상담 폼 (진입 후)
        ══════════════════════════════════════ */}
    <div class="ct-form-screen" id="ct-form-screen" style="display:none;">

      {/* 페이지 히어로 */}
      <section class="page-hero contact-hero ct-form-hero">
        <div class="page-hero-bg"><div class="hero-glow glow-1"></div></div>
        <div class="container">
          <button class="step-back-btn" id="form-back-btn" onclick="backToSelect()">
            <svg viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 18L5 12L11 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            유형 다시 선택
          </button>
          <div class="ct-form-type-badge" id="form-type-badge"></div>
          <h1 class="page-title" id="form-hero-title"></h1>
          <p class="page-desc">어떤 고민이든 괜찮습니다.<br />인애드컴퍼니가 함께 방향을 잡아드립니다.</p>
        </div>
      </section>

      {/* 폼 섹션 */}
      <section class="section contact-main-section">
        <div class="container">
          <div class="contact-layout">
            <div class="contact-form-wrap">
              <div class="cfw-head">
                <span class="sec-label">Consultation</span>
                <h2>상담 신청</h2>
                <p>빠른 시일 내에 담당자가 연락드립니다.<br />보통 1 영업일 이내 응답합니다.</p>
              </div>

              {/* ── 대행사 폼 ── */}
              <form class="contact-form ct-typed-form" id="agencyForm"
                    style="display:none;"
                    onsubmit="return handleContactSubmit(event,'agency')">

                <div class="cf-row cf-row--2">
                  <div class="cf-group">
                    <label for="ag-name">담당자 이름 <span class="cf-req">*</span></label>
                    <input type="text" id="ag-name" name="name" placeholder="홍길동" required />
                  </div>
                  <div class="cf-group">
                    <label for="ag-position">직급 <span class="cf-req">*</span></label>
                    <input type="text" id="ag-position" name="position" placeholder="팀장 / 대리 / 과장" required />
                  </div>
                </div>

                <div class="cf-row cf-row--2">
                  <div class="cf-group">
                    <label for="ag-phone">연락처 <span class="cf-req">*</span></label>
                    <input type="tel" id="ag-phone" name="phone" placeholder="010-0000-0000" required />
                  </div>
                  <div class="cf-group">
                    <label for="ag-email">이메일 <span class="cf-req">*</span></label>
                    <input type="email" id="ag-email" name="email" placeholder="hello@agency.com" required />
                  </div>
                </div>

                <div class="cf-row cf-row--2">
                  <div class="cf-group">
                    <label for="ag-company">회사명 <span class="cf-req">*</span></label>
                    <input type="text" id="ag-company" name="company" placeholder="(주)에이전시명" required />
                  </div>
                  <div class="cf-group">
                    <label for="ag-company-url">회사 URL</label>
                    <input type="url" id="ag-company-url" name="companyUrl" placeholder="https://agency.com" />
                  </div>
                </div>

                <div class="cf-row cf-row--2">
                  <div class="cf-group">
                    <label for="ag-brand">담당 브랜드 <span class="cf-req">*</span></label>
                    <input type="text" id="ag-brand" name="brand" placeholder="담당하시는 브랜드명" required />
                  </div>
                  <div class="cf-group">
                    <label for="ag-brand-url">브랜드 URL</label>
                    <input type="url" id="ag-brand-url" name="brandUrl" placeholder="https://brand.com" />
                  </div>
                </div>

                <div class="cf-group">
                  <label>관심 서비스 <span class="cf-req">*</span></label>
                  <div class="cf-chips">
                    {[
                      { val: 'viral', label: '바이럴 마케팅' },
                      { val: 'influencer', label: '인플루언서·유튜브' },
                      { val: 'seeding', label: '시딩 캠페인' },
                      { val: 'seo', label: 'SEO 마케팅' },
                      { val: 'review', label: '고객 리뷰' },
                      { val: 'oliveyoung', label: '올리브영' },
                      { val: 'ppl', label: 'PPL' },
                      { val: 'other', label: '기타' },
                    ].map(s => (
                      <label class="cf-chip" key={s.val}>
                        <input type="checkbox" name="service" value={s.val} />
                        <span>{s.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div class="cf-group">
                  <label>예상 예산</label>
                  <div class="cf-budget-wrap">
                    <div class="cf-select-wrap">
                      <select name="budget" onchange="toggleCustomBudget(this,'ag-custom-budget')">
                        <option value="">선택해주세요</option>
                        <option value="under300">300만원 미만</option>
                        <option value="300to1000">300만원 ~ 1,000만원</option>
                        <option value="1000to3000">1,000만원 ~ 3,000만원</option>
                        <option value="over3000">3,000만원 이상</option>
                        <option value="custom">직접 입력</option>
                      </select>
                      <span class="cf-sel-arrow">▾</span>
                    </div>
                    <div class="cf-custom-budget" id="ag-custom-budget" style="display:none;">
                      <input type="text" name="budgetCustom" placeholder="예: 월 500만원, 총 2,000만원 등 자유롭게 입력" />
                    </div>
                  </div>
                </div>

                <div class="cf-group">
                  <label for="ag-message">문의 내용 <span class="cf-req">*</span></label>
                  <textarea id="ag-message" name="message" rows={5} placeholder="클라이언트 업종, 캠페인 목표, 현재 상황 등 자유롭게 작성해 주세요." required></textarea>
                </div>

                <div class="cf-group cf-privacy-group">
                  <label class="cf-privacy-check">
                    <input type="checkbox" name="privacy" required />
                    <span class="cf-privacy-box"></span>
                    <span>개인정보 수집 및 이용에 동의합니다.</span>
                  </label>
                  <button type="button" class="cf-privacy-view-btn" onclick="openPrivacyModal()">내용 확인</button>
                </div>

                <button type="submit" class="cf-submit">
                  <span>상담 신청하기</span>
                  <svg viewBox="0 0 24 24" fill="none"><path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </button>
              </form>

              {/* ── 브랜드 폼 ── */}
              <form class="contact-form ct-typed-form" id="brandForm"
                    style="display:none;"
                    onsubmit="return handleContactSubmit(event,'brand')">

                <div class="cf-row cf-row--2">
                  <div class="cf-group">
                    <label for="br-name">담당자 이름 <span class="cf-req">*</span></label>
                    <input type="text" id="br-name" name="name" placeholder="홍길동" required />
                  </div>
                  <div class="cf-group">
                    <label for="br-position">직급 <span class="cf-req">*</span></label>
                    <input type="text" id="br-position" name="position" placeholder="대표 / 팀장 / 담당자" required />
                  </div>
                </div>

                <div class="cf-row cf-row--2">
                  <div class="cf-group">
                    <label for="br-phone">연락처 <span class="cf-req">*</span></label>
                    <input type="tel" id="br-phone" name="phone" placeholder="010-0000-0000" required />
                  </div>
                  <div class="cf-group">
                    <label for="br-email">이메일 <span class="cf-req">*</span></label>
                    <input type="email" id="br-email" name="email" placeholder="hello@brand.com" required />
                  </div>
                </div>

                <div class="cf-row cf-row--2">
                  <div class="cf-group">
                    <label for="br-company">회사명 <span class="cf-req">*</span></label>
                    <input type="text" id="br-company" name="company" placeholder="(주)브랜드명" required />
                  </div>
                  <div class="cf-group">
                    <label for="br-company-url">회사 URL</label>
                    <input type="url" id="br-company-url" name="companyUrl" placeholder="https://brand.com" />
                  </div>
                </div>

                <div class="cf-group">
                  <label>관심 서비스 <span class="cf-req">*</span></label>
                  <div class="cf-chips">
                    {[
                      { val: 'viral', label: '바이럴 마케팅' },
                      { val: 'influencer', label: '인플루언서·유튜브' },
                      { val: 'seeding', label: '시딩 캠페인' },
                      { val: 'seo', label: 'SEO 마케팅' },
                      { val: 'review', label: '고객 리뷰' },
                      { val: 'oliveyoung', label: '올리브영' },
                      { val: 'ppl', label: 'PPL' },
                      { val: 'other', label: '기타' },
                    ].map(s => (
                      <label class="cf-chip" key={s.val}>
                        <input type="checkbox" name="service" value={s.val} />
                        <span>{s.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div class="cf-group">
                  <label>예상 예산</label>
                  <div class="cf-budget-wrap">
                    <div class="cf-select-wrap">
                      <select name="budget" onchange="toggleCustomBudget(this,'br-custom-budget')">
                        <option value="">선택해주세요</option>
                        <option value="under300">300만원 미만</option>
                        <option value="300to1000">300만원 ~ 1,000만원</option>
                        <option value="1000to3000">1,000만원 ~ 3,000만원</option>
                        <option value="over3000">3,000만원 이상</option>
                        <option value="custom">직접 입력</option>
                      </select>
                      <span class="cf-sel-arrow">▾</span>
                    </div>
                    <div class="cf-custom-budget" id="br-custom-budget" style="display:none;">
                      <input type="text" name="budgetCustom" placeholder="예: 월 300만원, 총 1,000만원 등 자유롭게 입력" />
                    </div>
                  </div>
                </div>

                <div class="cf-group">
                  <label for="br-message">문의 내용 <span class="cf-req">*</span></label>
                  <textarea id="br-message" name="message" rows={5} placeholder="브랜드 소개, 마케팅 목표, 현재 상황 등 자유롭게 작성해 주세요." required></textarea>
                </div>

                <div class="cf-group cf-privacy-group">
                  <label class="cf-privacy-check">
                    <input type="checkbox" name="privacy" required />
                    <span class="cf-privacy-box"></span>
                    <span>개인정보 수집 및 이용에 동의합니다.</span>
                  </label>
                  <button type="button" class="cf-privacy-view-btn" onclick="openPrivacyModal()">내용 확인</button>
                </div>

                <button type="submit" class="cf-submit">
                  <span>상담 신청하기</span>
                  <svg viewBox="0 0 24 24" fill="none"><path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </button>
              </form>

              {/* 완료 메시지 */}
              <div class="contact-success" id="contactSuccess" style="display:none;">
                <div class="cs-main">
                  <div class="cs-check">
                    <svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="22" stroke="rgba(26,107,255,0.3)" stroke-width="1.5"/><path d="M14 24l8 8 12-12" stroke="rgba(26,107,255,0.9)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  </div>
                  <h3>상담 신청이 완료되었습니다!</h3>
                </div>
                <p class="cs-notify">담당자가 <strong>1영업일 이내</strong> 연락 드립니다.<br />급한 문의는 아래로 연락 주세요.</p>
                <p class="cs-contact-info">📞 <a href="tel:010-9186-9944">010-9186-9944</a></p>
                <div class="cs-divider"></div>
                <p class="cs-kickoff-label">상담 전 미리 준비하고 싶으시다면</p>
                <button class="cs-kickoff-btn" onclick="goToKickoff()">
                  <svg viewBox="0 0 24 24" fill="none" width="16" height="16"><path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  <span>킥오프 미팅 일정 잡기</span>
                </button>
                <p class="cs-kickoff-desc">킥오프 미팅에서 인애드컴퍼니의 독점 마케팅 상품을 확인하세요</p>
              </div>

            </div>{/* /contact-form-wrap */}

          </div>{/* /contact-layout (폼 영역만) */}

          {/* ── 자주 묻는 질문 — 폼 아래 풀 너비 ── */}
          <div class="ct-faq-section">
            <div class="ct-faq-head">
              <span class="sec-label">FAQ</span>
              <h3>자주 묻는 질문</h3>
            </div>
            <div class="ct-faq-list" id="dynamicFaqList">
              <div class="faq-item">
                <button class="faq-q" onclick="this.closest('.faq-item').classList.toggle('open')">
                  <span>프로젝트 기간은 얼마나 걸리나요?</span>
                  <svg class="faq-arr" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
                </button>
                <div class="faq-a">프로젝트 규모에 따라 다르지만, 일반적으로 전략 수립 1~2주, 실행 및 운영 1~3개월입니다. 초기 상담에서 상세 일정을 협의합니다.</div>
              </div>
              <div class="faq-item">
                <button class="faq-q" onclick="this.closest('.faq-item').classList.toggle('open')">
                  <span>최소 예산이 있나요?</span>
                  <svg class="faq-arr" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
                </button>
                <div class="faq-a">단발성 캠페인은 300만원~, 월 운영 계약은 월 150만원~부터 협의 가능합니다.</div>
              </div>
              <div class="faq-item">
                <button class="faq-q" onclick="this.closest('.faq-item').classList.toggle('open')">
                  <span>성과 보장이 되나요?</span>
                  <svg class="faq-arr" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
                </button>
                <div class="faq-a">명확한 KPI를 함께 설정하고 지속 최적화합니다. 인애드컴퍼니의 재계약률 98%가 그 결과입니다.</div>
              </div>
              <div class="faq-item">
                <button class="faq-q" onclick="this.closest('.faq-item').classList.toggle('open')">
                  <span>어떤 업종과 주로 일하나요?</span>
                  <svg class="faq-arr" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
                </button>
                <div class="faq-a">뷰티, 식품, 헬스케어, 이커머스, 패션, 생활용품 등 다양한 업종과 함께하고 있습니다.</div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>{/* /ct-form-screen */}

    {/* ══════════════════════════════════════
        STEP 3 — 회사소개서 신청 화면
        ══════════════════════════════════════ */}
    <div class="ct-brochure-screen" id="ct-brochure-screen" style="display:none;">

      {/* 페이지 히어로 */}
      <section class="page-hero contact-hero ct-form-hero">
        <div class="page-hero-bg"><div class="hero-glow glow-1"></div></div>
        <div class="container">
          <button class="step-back-btn" onclick="backToSelect()">
            <svg viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 18L5 12L11 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            유형 다시 선택
          </button>
          <div class="ct-form-type-badge ct-badge--brochure">회사소개서 신청</div>
          <h1 class="page-title">소개서<br /><em>신청하기</em></h1>
          <p class="page-desc">이메일 주소만 입력해 주세요.<br />인애드컴퍼니 소개서를 바로 보내드립니다.</p>
        </div>
      </section>

      {/* 소개서 신청 폼 */}
      <section class="section contact-main-section">
        <div class="container">
          <div class="ct-brochure-wrap">

            {/* 왼쪽: 소개서 카드 미리보기 */}
            <div class="ct-brochure-preview">
              <div class="ct-brochure-card">
                <div class="ct-brochure-card-inner">
                  <div class="ct-bc-logo">IN AD<br />COMPANY</div>
                  <div class="ct-bc-title">회사소개서</div>
                  <div class="ct-bc-year">2024</div>
                  <div class="ct-bc-tags">
                    <span>바이럴 마케팅</span>
                    <span>인플루언서</span>
                    <span>시딩</span>
                    <span>SEO</span>
                    <span>PPL</span>
                  </div>
                  <div class="ct-bc-footer">
                    <span>인애드컴퍼니 · inadcompany.com</span>
                  </div>
                </div>
              </div>
              <p class="ct-brochure-preview-desc">
                서비스 소개, 실적, 사례 레퍼런스가<br />담긴 PDF 소개서를 이메일로 보내드립니다.
              </p>
            </div>

            {/* 오른쪽: 신청 폼 */}
            <div class="ct-brochure-form-wrap">
              <form class="contact-form" id="brochureForm"
                    onsubmit="return handleBrochureSubmit(event)">
                <div class="ct-brochure-form-head">
                  <span class="sec-label">Brochure Request</span>
                  <h2>회사소개서 받기</h2>
                  <p>이메일 주소만 입력하면 바로 발송됩니다.<br />스팸이나 광고 메일은 절대 발송하지 않습니다.</p>
                </div>

                <div class="cf-group">
                  <label for="br-req-email">이메일 주소 <span class="cf-req">*</span></label>
                  <input type="email" id="br-req-email" name="email"
                         placeholder="hello@yourcompany.com" required
                         autocomplete="email" />
                </div>

                <div class="cf-group ct-brochure-agree-group">
                  <label class="cf-privacy-check">
                    <input type="checkbox" name="emailAgree" id="br-email-agree" required />
                    <span class="cf-privacy-box"></span>
                    <span>이메일 수신에 동의합니다.</span>
                  </label>
                  <p class="ct-brochure-agree-note">
                    회사소개서 발송 목적으로만 사용되며, 이후 마케팅 수신 동의로 활용될 수 있습니다.<br />
                    언제든지 수신 거부 가능합니다.
                  </p>
                </div>

                <button type="submit" class="cf-submit ct-brochure-submit">
                  <svg viewBox="0 0 24 24" fill="none" width="18" height="18"><path d="M12 2v13M7 10l5 5 5-5M4 19h16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  <span>소개서 받기</span>
                </button>
              </form>

              {/* 완료 메시지 */}
              <div class="contact-success" id="brochureSuccess" style="display:none;">
                <p class="cs-notify">이메일을 확인해 주세요.<br />소개서 발송 준비 중입니다.</p>
                <div class="cs-main">
                  <div class="cs-check">
                    <svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="22" stroke="rgba(26,107,255,0.3)" stroke-width="1.5"/><path d="M14 24l8 8 12-12" stroke="rgba(26,107,255,0.9)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  </div>
                  <h3>신청이 완료되었습니다!</h3>
                </div>
                <p style="color:rgba(255,255,255,0.5); font-size:14px; text-align:center; margin-top:12px;">
                  입력하신 이메일로 소개서를 발송해 드립니다.<br />
                  (발송까지 최대 1영업일 소요될 수 있습니다)
                </p>
              </div>
            </div>

          </div>{/* /ct-brochure-wrap */}
        </div>
      </section>
    </div>{/* /ct-brochure-screen */}

    {/* ══════════════════════════════════════
        STEP 4 — 킥오프 미팅 신청 화면
        ══════════════════════════════════════ */}
    <div class="ct-kickoff-screen" id="ct-kickoff-screen" style="display:none;">

      {/* 히어로 */}
      <section class="page-hero contact-hero ct-form-hero">
        <div class="page-hero-bg"><div class="hero-glow glow-1"></div></div>
        <div class="container">
          <button class="step-back-btn" onclick="backToSelect()">
            <svg viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 18L5 12L11 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            돌아가기
          </button>
          <div class="ct-form-type-badge ct-badge--kickoff">킥오프 미팅 신청</div>
          <h1 class="page-title">킥오프<br /><em>미팅 신청</em></h1>
          <p class="page-desc">희망 일정을 알려주시면 담당자가 확인 후<br />빠르게 미팅 일정을 확정해 드립니다.</p>
        </div>
      </section>

      {/* 신청 폼 */}
      <section class="section contact-main-section">
        <div class="container">
          <div class="ct-kickoff-wrap">

            {/* 왼쪽: 안내 카드 */}
            <div class="ct-kickoff-info">
              <div class="ct-kickoff-info-card">
                <div class="ct-ki-icon">🔒</div>
                <p class="ct-ki-badge">CONFIDENTIAL · INTERNAL</p>
                <h3 class="ct-ki-title">미디어믹스<br />2차가공 콘텐츠</h3>
                <p class="ct-ki-desc">킥오프 미팅에서만 공개되는<br />인애드컴퍼니 고유 마케팅 상품입니다.</p>
                <div class="ct-ki-steps">
                  <div class="ct-ki-step">
                    <span class="ct-ki-step-num">01</span>
                    <div>
                      <strong>일정 신청</strong>
                      <p>희망 날짜와 시간을 제출합니다</p>
                    </div>
                  </div>
                  <div class="ct-ki-step">
                    <span class="ct-ki-step-num">02</span>
                    <div>
                      <strong>담당자 확인</strong>
                      <p>1영업일 내 연락 및 일정 확정</p>
                    </div>
                  </div>
                  <div class="ct-ki-step">
                    <span class="ct-ki-step-num">03</span>
                    <div>
                      <strong>킥오프 미팅</strong>
                      <p>상품 상세 내용 + 전략 공유</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 오른쪽: 신청 폼 */}
            <div class="ct-kickoff-form-wrap">
              <form class="contact-form" id="kickoffForm"
                    onsubmit="return handleKickoffSubmit(event)">
                <div class="cfw-head">
                  <span class="sec-label">Kickoff Meeting</span>
                  <h2>미팅 일정 신청</h2>
                  <p>희망 일정 2~3개를 알려주시면<br />담당자가 조율 후 확정 연락 드립니다.</p>
                </div>

                {/* 담당자 정보 */}
                <div class="cf-row cf-row--2">
                  <div class="cf-group">
                    <label for="kf-name">담당자 이름 <span class="cf-req">*</span></label>
                    <input type="text" id="kf-name" name="name" placeholder="홍길동" required />
                  </div>
                  <div class="cf-group">
                    <label for="kf-company">브랜드 / 회사명 <span class="cf-req">*</span></label>
                    <input type="text" id="kf-company" name="company" placeholder="(주)브랜드명" required />
                  </div>
                </div>

                <div class="cf-row cf-row--2">
                  <div class="cf-group">
                    <label for="kf-phone">연락처 <span class="cf-req">*</span></label>
                    <input type="tel" id="kf-phone" name="phone" placeholder="010-0000-0000" required />
                  </div>
                  <div class="cf-group">
                    <label for="kf-email">이메일 <span class="cf-req">*</span></label>
                    <input type="email" id="kf-email" name="email" placeholder="hello@brand.com" required />
                  </div>
                </div>

                {/* 미팅 방식 */}
                <div class="cf-group">
                  <label>미팅 방식 <span class="cf-req">*</span></label>
                  <div class="cf-chips">
                    {[
                      { val: 'online', label: '💻 온라인 (Zoom·Meet)' },
                      { val: 'offline', label: '🏢 오프라인 방문' },
                      { val: 'both', label: '🔄 무관 (모두 가능)' },
                    ].map(s => (
                      <label class="cf-chip" key={s.val}>
                        <input type="radio" name="meetingType" value={s.val} required />
                        <span>{s.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 희망 일정 1 */}
                <div class="cf-group">
                  <label class="cf-schedule-label">
                    <span class="cf-schedule-badge cf-schedule-badge--1st">1순위</span>
                    희망 일정 <span class="cf-req">*</span>
                  </label>
                  <div class="cf-row cf-row--2">
                    <div class="cf-group" style="margin-bottom:0">
                      <input type="date" id="kf-date1" name="date1" required
                             style="color-scheme:dark" />
                    </div>
                    <div class="cf-group" style="margin-bottom:0">
                      <div class="cf-select-wrap">
                        <select name="time1" required>
                          <option value="">시간 선택</option>
                          <option value="09:00">오전 09:00</option>
                          <option value="10:00">오전 10:00</option>
                          <option value="11:00">오전 11:00</option>
                          <option value="13:00">오후 01:00</option>
                          <option value="14:00">오후 02:00</option>
                          <option value="15:00">오후 03:00</option>
                          <option value="16:00">오후 04:00</option>
                          <option value="17:00">오후 05:00</option>
                        </select>
                        <span class="cf-sel-arrow">▾</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 희망 일정 2 */}
                <div class="cf-group">
                  <label class="cf-schedule-label">
                    <span class="cf-schedule-badge cf-schedule-badge--2nd">2순위</span>
                    희망 일정 <span style="font-size:11px; color:rgba(255,255,255,0.35)">(선택)</span>
                  </label>
                  <div class="cf-row cf-row--2">
                    <div class="cf-group" style="margin-bottom:0">
                      <input type="date" id="kf-date2" name="date2"
                             style="color-scheme:dark" />
                    </div>
                    <div class="cf-group" style="margin-bottom:0">
                      <div class="cf-select-wrap">
                        <select name="time2">
                          <option value="">시간 선택</option>
                          <option value="09:00">오전 09:00</option>
                          <option value="10:00">오전 10:00</option>
                          <option value="11:00">오전 11:00</option>
                          <option value="13:00">오후 01:00</option>
                          <option value="14:00">오후 02:00</option>
                          <option value="15:00">오후 03:00</option>
                          <option value="16:00">오후 04:00</option>
                          <option value="17:00">오후 05:00</option>
                        </select>
                        <span class="cf-sel-arrow">▾</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 사전 질문 */}
                <div class="cf-group">
                  <label for="kf-note">사전 질문 / 궁금한 점 <span style="font-size:11px; color:rgba(255,255,255,0.35)">(선택)</span></label>
                  <textarea id="kf-note" name="note" rows={3}
                            placeholder="미팅 전 미리 알고 싶은 내용이나 현재 상황을 간단히 적어주세요." />
                </div>

                {/* 개인정보 동의 */}
                <div class="cf-group">
                  <label class="cf-privacy-check">
                    <input type="checkbox" name="privacyAgree" required />
                    <span class="cf-privacy-box"></span>
                    <span>개인정보 수집 및 이용에 동의합니다. <span class="cf-req">*</span></span>
                  </label>
                  <button type="button" class="cf-privacy-view-btn" onclick="openPrivacyModal()">내용 확인</button>
                </div>

                <button type="submit" class="cf-submit cf-submit--kickoff">
                  <span>미팅 일정 신청하기</span>
                  <svg viewBox="0 0 24 24" fill="none"><path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </button>
              </form>

              {/* 완료 메시지 */}
              <div class="contact-success ct-kickoff-success" id="kickoffSuccess" style="display:none;">
                <div class="cks-icon">📅</div>
                <h3 class="cks-title">미팅 신청이 완료되었습니다!</h3>
                <p class="cks-desc">담당자가 신청하신 일정을 확인하고<br /><strong>1영업일 이내</strong>에 연락 드립니다.</p>
                <div class="cks-info-box">
                  <div class="cks-info-row">
                    <svg viewBox="0 0 20 20" fill="none" width="16" height="16"><path d="M10 2a8 8 0 1 1 0 16A8 8 0 0 1 10 2zm0 4v4l3 3" stroke="rgba(160,120,255,0.9)" stroke-width="1.5" stroke-linecap="round"/></svg>
                    <span>담당자 확인 후 일정 확정 연락</span>
                  </div>
                  <div class="cks-info-row">
                    <svg viewBox="0 0 20 20" fill="none" width="16" height="16"><path d="M3 5h14M3 10h14M3 15h8" stroke="rgba(160,120,255,0.9)" stroke-width="1.5" stroke-linecap="round"/></svg>
                    <span>미팅 확정 시 상세 안내 이메일 발송</span>
                  </div>
                  <div class="cks-info-row">
                    <svg viewBox="0 0 20 20" fill="none" width="16" height="16"><path d="M10 2l2.4 5h5.3l-4.3 3.1 1.6 5.2L10 12.3 5 15.3l1.6-5.2L2.3 7h5.3z" stroke="rgba(160,120,255,0.9)" stroke-width="1.5" stroke-linejoin="round"/></svg>
                    <span>킥오프 미팅에서 상품 상세 내용 공개</span>
                  </div>
                </div>
                <p class="cks-contact">문의: <a href="tel:010-9186-9944">010-9186-9944</a></p>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>{/* /ct-kickoff-screen */}

    {/* ── 개인정보 처리방침 모달 ── */}
    <div id="privacy-modal" class="prv-modal-overlay" onclick="if(event.target===this)closePrivacyModal()" style="display:none;">
      <div class="prv-modal-box">
        <div class="prv-modal-header">
          <h2>개인정보 수집 및 이용 동의</h2>
          <button class="prv-modal-close" onclick="closePrivacyModal()" aria-label="닫기">
            <svg viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
          </button>
        </div>
        <div class="prv-modal-body">

          <section class="prv-section">
            <h3>■ 개인정보 수집 및 이용 동의</h3>
            <p>인애드컴퍼니(이하 "회사")는 「개인정보 보호법」 제15조 및 제22조에 따라 아래와 같이 개인정보를 수집·이용하며, 정보주체의 동의를 받습니다.</p>
          </section>

          <section class="prv-section">
            <h3>■ 수집·이용 목적</h3>
            <ul>
              <li>마케팅 서비스 상담 및 견적 안내</li>
              <li>상담 신청에 대한 회신 및 후속 연락</li>
              <li>서비스 제공 및 계약 이행</li>
              <li>민원 처리 및 분쟁 해결</li>
            </ul>
          </section>

          <section class="prv-section">
            <h3>■ 수집하는 개인정보 항목</h3>
            <table class="prv-table">
              <thead><tr><th>구분</th><th>필수 항목</th><th>선택 항목</th></tr></thead>
              <tbody>
                <tr><td>대행사</td><td>담당자 이름, 직급, 연락처, 이메일, 회사명, 담당 브랜드</td><td>회사 URL, 브랜드 URL, 예산, 문의 내용</td></tr>
                <tr><td>브랜드</td><td>담당자 이름, 직급, 연락처, 이메일, 회사명</td><td>회사 URL, 예산, 문의 내용</td></tr>
              </tbody>
            </table>
          </section>

          <section class="prv-section">
            <h3>■ 수집 방법</h3>
            <p>홈페이지 상담 신청 폼을 통한 직접 입력</p>
          </section>

          <section class="prv-section">
            <h3>■ 보유 및 이용 기간</h3>
            <p>동의일로부터 <strong>1년</strong>간 보유 후 파기합니다. 단, 관련 법령에 따라 보존할 필요가 있는 경우 해당 기간 동안 보관합니다. 보유 기간 만료 후 <strong>5영업일 이내</strong> 파기합니다.</p>
          </section>

          <section class="prv-section">
            <h3>■ 제3자 제공</h3>
            <p>회사는 원칙적으로 수집한 개인정보를 제3자에게 제공하지 않습니다. 단, 정보주체의 별도 동의가 있거나 법령에 따른 경우는 예외로 합니다.</p>
          </section>

          <section class="prv-section">
            <h3>■ 개인정보 파기 절차 및 방법</h3>
            <p>보유 기간이 경과하거나 처리 목적이 달성된 개인정보는 지체 없이 파기합니다.</p>
            <ul>
              <li><strong>전자적 파일:</strong> 복구 불가능한 방법으로 영구 삭제</li>
              <li><strong>종이 서류:</strong> 분쇄 또는 소각 처리</li>
            </ul>
          </section>

          <section class="prv-section">
            <h3>■ 정보주체의 권리</h3>
            <p>정보주체는 언제든지 개인정보 열람, 정정, 삭제, 처리 정지를 요구할 수 있습니다. 요청은 아래 개인정보 보호 책임자에게 연락하시기 바랍니다.</p>
          </section>

          <section class="prv-section">
            <h3>■ 개인정보 보호 책임자</h3>
            <table class="prv-table">
              <tbody id="privacyOfficerTable">
                <tr><td>책임자</td><td>김주희</td></tr>
                <tr><td>담당자</td><td>이승노</td></tr>
                <tr><td>웹사이트</td><td><a href="https://www.majestade.co.kr" target="_blank" rel="noopener">www.majestade.co.kr</a></td></tr>
                <tr><td>이메일</td><td><a href="mailto:maze_official@majestade.co.kr">maze_official@majestade.co.kr</a></td></tr>
              </tbody>
            </table>
          </section>

          <section class="prv-section">
            <h3>■ 기술적·관리적 보호 조치</h3>
            <ul>
              <li>개인정보에 대한 접근 권한 관리 및 최소화</li>
              <li>HTTPS 암호화 통신 적용</li>
              <li>개인정보 취급자 교육 및 내부 관리 계획 수립·시행</li>
            </ul>
          </section>

          <section class="prv-section">
            <h3>■ 고지 의무</h3>
            <p>개인정보 처리방침을 변경하는 경우 시행일로부터 최소 7일 전 홈페이지를 통해 공지합니다.</p>
          </section>

          <section class="prv-section prv-section--foot">
            <p>시행일: <strong>2019년 02월 01일</strong></p>
            <p>동의를 거부할 권리가 있으며, 거부 시 상담 신청 서비스 이용이 제한될 수 있습니다.</p>
          </section>

        </div>
        <div class="prv-modal-footer">
          <button class="prv-agree-btn" onclick="closePrivacyModal()">확인</button>
        </div>
      </div>
    </div>

    {/* ── JS ── */}
    <script dangerouslySetInnerHTML={{__html: `
      (function() {
        function hoverPanel(type) {
          var agency   = document.getElementById('panel-agency');
          var brand    = document.getElementById('panel-brand');
          var brochure = document.getElementById('panel-brochure');
          var all = [agency, brand, brochure];
          all.forEach(function(el) { el && el.classList.remove('ct-active','ct-shrink'); });
          var active = document.getElementById('panel-' + type);
          if (active) active.classList.add('ct-active');
          all.forEach(function(el) { if (el && el !== active) el.classList.add('ct-shrink'); });
        }
        function resetPanel() {
          ['panel-agency','panel-brand','panel-brochure'].forEach(function(id) {
            var el = document.getElementById(id);
            if (el) el.classList.remove('ct-active','ct-shrink');
          });
        }
        function enterForm(type) {
          var split  = document.getElementById('ct-split');
          var screen = document.getElementById('ct-form-screen');
          var badge  = document.getElementById('form-type-badge');
          var title  = document.getElementById('form-hero-title');
          var agForm = document.getElementById('agencyForm');
          var brForm = document.getElementById('brandForm');

          // 배지 & 타이틀 세팅
          if (type === 'agency') {
            badge.textContent = '대행사 파트너십 상담';
            badge.className = 'ct-form-type-badge ct-badge--agency';
            title.innerHTML = '파트너십<br><em>상담 신청</em>';
            agForm.style.display = 'block';
            brForm.style.display = 'none';
          } else {
            badge.textContent = '브랜드 마케팅 상담';
            badge.className = 'ct-form-type-badge ct-badge--brand';
            title.innerHTML = '마케팅<br><em>상담 신청</em>';
            agForm.style.display = 'none';
            brForm.style.display = 'block';
          }

          // 화면 전환
          split.style.animation = 'ctSplitOut 0.5s cubic-bezier(0.4,0,0.2,1) forwards';
          setTimeout(function() {
            split.style.display = 'none';
            screen.style.display = 'block';
            screen.style.animation = 'ctFormIn 0.5s cubic-bezier(0.4,0,0.2,1) forwards';
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }, 450);
        }
        function backToSelect() {
          var split     = document.getElementById('ct-split');
          var screen    = document.getElementById('ct-form-screen');
          var bScreen   = document.getElementById('ct-brochure-screen');
          var kScreen   = document.getElementById('ct-kickoff-screen');
          [screen, bScreen, kScreen].forEach(function(s) {
            if (s && s.style.display !== 'none') {
              s.style.animation = 'ctSplitOut 0.4s ease forwards';
              setTimeout(function() {
                s.style.display = 'none';
                split.style.display = 'flex';
                split.style.animation = 'ctFormIn 0.5s ease forwards';
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }, 350);
            }
          });
        }
        function enterKickoff() {
          var split   = document.getElementById('ct-split');
          var kScreen = document.getElementById('ct-kickoff-screen');
          split.style.animation = 'ctSplitOut 0.5s cubic-bezier(0.4,0,0.2,1) forwards';
          setTimeout(function() {
            split.style.display = 'none';
            kScreen.style.display = 'block';
            kScreen.style.animation = 'ctFormIn 0.5s cubic-bezier(0.4,0,0.2,1) forwards';
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }, 450);
        }
        function goToKickoff() {
          var formScreen    = document.getElementById('ct-form-screen');
          var kScreen       = document.getElementById('ct-kickoff-screen');
          formScreen.style.animation = 'ctSplitOut 0.4s ease forwards';
          setTimeout(function() {
            formScreen.style.display = 'none';
            kScreen.style.display = 'block';
            kScreen.style.animation = 'ctFormIn 0.5s ease forwards';
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }, 380);
        }
        function enterBrochure() {
          var split   = document.getElementById('ct-split');
          var bScreen = document.getElementById('ct-brochure-screen');
          split.style.animation = 'ctSplitOut 0.5s cubic-bezier(0.4,0,0.2,1) forwards';
          setTimeout(function() {
            split.style.display = 'none';
            bScreen.style.display = 'block';
            bScreen.style.animation = 'ctFormIn 0.5s cubic-bezier(0.4,0,0.2,1) forwards';
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }, 450);
        }
        function handleKickoffSubmit(e) {
          e.preventDefault();
          var form    = document.getElementById('kickoffForm');
          var success = document.getElementById('kickoffSuccess');
          form.style.transition = 'opacity 0.3s ease';
          form.style.opacity = '0';
          setTimeout(function() {
            form.style.display = 'none';
            success.style.display = 'flex';
            success.style.animation = 'ctFormIn 0.5s ease forwards';
          }, 300);
          return false;
        }
        function handleBrochureSubmit(e) {
          e.preventDefault();
          var form    = document.getElementById('brochureForm');
          var success = document.getElementById('brochureSuccess');
          form.style.transition = 'opacity 0.3s ease';
          form.style.opacity = '0';
          setTimeout(function() {
            form.style.display = 'none';
            success.style.display = 'flex';
            success.style.animation = 'ctFormIn 0.5s ease forwards';
          }, 300);
          return false;
        }
        function toggleCustomBudget(sel, targetId) {
          var wrap = document.getElementById(targetId);
          if (wrap) wrap.style.display = sel.value === 'custom' ? 'block' : 'none';
        }
        function handleContactSubmit(e, type) {
          e.preventDefault();
          var formId = type === 'agency' ? 'agencyForm' : 'brandForm';
          var form = document.getElementById(formId);
          var success = document.getElementById('contactSuccess');
          form.style.transition = 'opacity 0.3s ease';
          form.style.opacity = '0';
          setTimeout(function() {
            form.style.display = 'none';
            success.style.display = 'flex';
            success.style.animation = 'ctFormIn 0.5s ease forwards';
          }, 300);
          return false;
        }
        // 개인정보 모달
        function openPrivacyModal() {
          var m = document.getElementById('privacy-modal');
          if (!m) return;
          m.style.display = 'flex';
          document.body.style.overflow = 'hidden';
          requestAnimationFrame(function() { m.classList.add('prv-open'); });
        }
        function closePrivacyModal() {
          var m = document.getElementById('privacy-modal');
          if (!m) return;
          m.classList.remove('prv-open');
          setTimeout(function() {
            m.style.display = 'none';
            document.body.style.overflow = '';
          }, 260);
        }
        // ESC 키 닫기
        document.addEventListener('keydown', function(e) {
          if (e.key === 'Escape') closePrivacyModal();
        });

        // 전역 노출
        window.hoverPanel = hoverPanel;
        window.resetPanel = resetPanel;
        window.enterForm = enterForm;
        window.enterBrochure = enterBrochure;
        window.enterKickoff = enterKickoff;
        window.goToKickoff = goToKickoff;
        window.backToSelect = backToSelect;
        window.handleKickoffSubmit = handleKickoffSubmit;
        window.toggleCustomBudget = toggleCustomBudget;
        window.handleContactSubmit = handleContactSubmit;
        window.handleBrochureSubmit = handleBrochureSubmit;
        window.openPrivacyModal = openPrivacyModal;
        window.closePrivacyModal = closePrivacyModal;

        // ── admin API에서 개인정보 책임자 + FAQ 동적 로드 ──
        fetch('/api/admin/public/contact')
          .then(function(r) { return r.json(); })
          .then(function(data) {
            // 개인정보 보호 책임자 업데이트
            if (data.officer) {
              var o = data.officer;
              var tbody = document.getElementById('privacyOfficerTable');
              if (tbody) {
                tbody.innerHTML =
                  '<tr><td>책임자</td><td>' + (o.manager || '') + '</td></tr>' +
                  '<tr><td>담당자</td><td>' + (o.officer || '') + '</td></tr>' +
                  '<tr><td>웹사이트</td><td>' + (o.website ? '<a href="https://' + o.website.replace(/^https?:\\/\\//, '') + '" target="_blank" rel="noopener">' + o.website + '</a>' : '') + '</td></tr>' +
                  '<tr><td>이메일</td><td>' + (o.email ? '<a href="mailto:' + o.email + '">' + o.email + '</a>' : '') + '</td></tr>';
              }
            }
            // FAQ 업데이트
            if (data.faq && data.faq.length) {
              var faqList = document.getElementById('dynamicFaqList');
              if (faqList) {
                faqList.innerHTML = data.faq.map(function(f) {
                  return '<div class="faq-item">'
                    + '<button class="faq-q" onclick="this.closest(\\'.faq-item\\').classList.toggle(\\'open\\')">'
                    + '<span>' + (f.q || '') + '</span>'
                    + '<svg class="faq-arr" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>'
                    + '</button>'
                    + '<div class="faq-a">' + (f.a || '') + '</div>'
                    + '</div>';
                }).join('');
              }
            }
          })
          .catch(function() { /* 조용히 실패 */ });
      })();
    `}} />
  </>
)
