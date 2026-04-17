export const ContactPage = () => (
  <>
    {/* ── Page Hero ── */}
    <section class="page-hero contact-hero">
      <div class="page-hero-bg"><div class="hero-glow glow-1"></div></div>
      <div class="container">
        <span class="sec-label">Contact</span>
        <h1 class="page-title">지금 바로<br /><em>상담을 시작하세요</em></h1>
        <p class="page-desc">어떤 고민이든 괜찮습니다.<br />인애드컴퍼니가 함께 방향을 잡아드립니다.</p>
      </div>
    </section>

    {/* ── 메인 상담 섹션 ── */}
    <section class="section contact-main-section" id="consult-form">
      <div class="container">
        <div class="contact-layout">

          {/* ── 폼 영역 ── */}
          <div class="contact-form-wrap">

            {/* ===== STEP 1: 유형 선택 ===== */}
            <div class="contact-step" id="step-select">
              <div class="cfw-head">
                <span class="sec-label">상담 신청</span>
                <h2>어떤 분이신가요?</h2>
                <p>유형에 맞는 최적화된 상담을 도와드립니다.</p>
              </div>

              <div class="type-select-grid">
                <button class="type-card" id="btn-agency" onclick="selectType('agency')">
                  <div class="type-card-icon">
                    <svg viewBox="0 0 48 48" fill="none">
                      <rect x="6" y="14" width="36" height="26" rx="3" stroke="currentColor" stroke-width="1.5"/>
                      <path d="M16 14V10a2 2 0 012-2h12a2 2 0 012 2v4" stroke="currentColor" stroke-width="1.5"/>
                      <path d="M6 24h36" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3 3"/>
                      <circle cx="24" cy="24" r="3" fill="currentColor" opacity="0.5"/>
                    </svg>
                  </div>
                  <div class="type-card-body">
                    <strong>대행사</strong>
                    <span>마케팅 에이전시 · 광고대행사</span>
                  </div>
                  <div class="type-card-arrow">
                    <svg viewBox="0 0 24 24" fill="none"><path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  </div>
                  <div class="type-card-badge">파트너십 문의</div>
                </button>

                <button class="type-card" id="btn-brand" onclick="selectType('brand')">
                  <div class="type-card-icon">
                    <svg viewBox="0 0 48 48" fill="none">
                      <path d="M24 4L6 14v10c0 10.5 7.7 20.3 18 22.7C34.3 44.3 42 34.5 42 24V14L24 4z" stroke="currentColor" stroke-width="1.5"/>
                      <path d="M16 24l5 5 11-10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                  <div class="type-card-body">
                    <strong>브랜드</strong>
                    <span>직접 운영하는 브랜드 · 기업</span>
                  </div>
                  <div class="type-card-arrow">
                    <svg viewBox="0 0 24 24" fill="none"><path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  </div>
                  <div class="type-card-badge">마케팅 상담</div>
                </button>
              </div>

              <p class="type-hint">
                <svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1"/><path d="M8 7v4M8 5v.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
                선택하신 유형에 따라 최적화된 상담 양식이 제공됩니다
              </p>
            </div>

            {/* ===== STEP 2-A: 대행사 폼 ===== */}
            <div class="contact-step" id="step-agency" style="display:none;">
              <div class="cfw-head">
                <button class="step-back-btn" onclick="goBack()">
                  <svg viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 18L5 12L11 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  다시 선택
                </button>
                <div class="step-type-badge agency">대행사 상담 신청</div>
                <h2>파트너십 상담</h2>
                <p>빠른 시일 내에 담당자가 연락드립니다.<br />보통 1 영업일 이내 응답합니다.</p>
              </div>

              <form class="contact-form" id="agencyForm" onsubmit="return handleContact(event, 'agency')">

                {/* 담당자 이름 + 직급 */}
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

                {/* 연락처 + 이메일 */}
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

                {/* 회사명 + 회사 URL */}
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

                {/* 담당 브랜드 + 브랜드 URL */}
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

                {/* 관심 서비스 */}
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

                {/* 예산 */}
                <div class="cf-group">
                  <label>예상 예산</label>
                  <div class="cf-budget-wrap">
                    <div class="cf-select-wrap">
                      <select id="ag-budget" name="budget" onchange="toggleCustomBudget(this, 'ag-budget-custom')">
                        <option value="">선택해주세요</option>
                        <option value="under300">300만원 미만</option>
                        <option value="300to1000">300만원 ~ 1,000만원</option>
                        <option value="1000to3000">1,000만원 ~ 3,000만원</option>
                        <option value="over3000">3,000만원 이상</option>
                        <option value="custom">직접 입력</option>
                      </select>
                      <span class="cf-sel-arrow">▾</span>
                    </div>
                    <div class="cf-custom-budget" id="ag-budget-custom" style="display:none;">
                      <input type="text" name="budgetCustom" placeholder="예: 월 500만원, 총 2,000만원 등 자유롭게 입력" />
                    </div>
                  </div>
                </div>

                {/* 문의 내용 */}
                <div class="cf-group">
                  <label for="ag-message">문의 내용 <span class="cf-req">*</span></label>
                  <textarea id="ag-message" name="message" rows={5} placeholder="클라이언트 업종, 캠페인 목표, 현재 상황 등 자유롭게 작성해 주세요." required></textarea>
                </div>

                <div class="cf-group cf-privacy-group">
                  <label class="cf-privacy-check">
                    <input type="checkbox" id="ag-privacy" name="privacy" required />
                    <span class="cf-privacy-box"></span>
                    <span>개인정보 수집 및 이용에 동의합니다.</span>
                  </label>
                </div>

                <button type="submit" class="cf-submit">
                  <span>상담 신청하기</span>
                  <svg viewBox="0 0 24 24" fill="none"><path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </button>
              </form>

              <div class="contact-success" id="agencySuccess" style="display:none;">
                <div class="cs-check">
                  <svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="22" stroke="rgba(26,107,255,0.3)" stroke-width="1.5"/><path d="M14 24l8 8 12-12" stroke="rgba(26,107,255,0.9)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </div>
                <h3>상담 신청이 완료되었습니다!</h3>
                <p>담당자가 빠른 시일 내 연락드립니다.<br />보통 1 영업일 이내 응답합니다.</p>
              </div>
            </div>

            {/* ===== STEP 2-B: 브랜드 폼 ===== */}
            <div class="contact-step" id="step-brand" style="display:none;">
              <div class="cfw-head">
                <button class="step-back-btn" onclick="goBack()">
                  <svg viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 18L5 12L11 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  다시 선택
                </button>
                <div class="step-type-badge brand">브랜드 상담 신청</div>
                <h2>마케팅 상담</h2>
                <p>빠른 시일 내에 담당자가 연락드립니다.<br />보통 1 영업일 이내 응답합니다.</p>
              </div>

              <form class="contact-form" id="brandForm" onsubmit="return handleContact(event, 'brand')">

                {/* 담당자 이름 + 직급 */}
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

                {/* 연락처 + 이메일 */}
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

                {/* 회사명 + 회사 URL */}
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

                {/* 관심 서비스 */}
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

                {/* 예산 */}
                <div class="cf-group">
                  <label>예상 예산</label>
                  <div class="cf-budget-wrap">
                    <div class="cf-select-wrap">
                      <select id="br-budget" name="budget" onchange="toggleCustomBudget(this, 'br-budget-custom')">
                        <option value="">선택해주세요</option>
                        <option value="under300">300만원 미만</option>
                        <option value="300to1000">300만원 ~ 1,000만원</option>
                        <option value="1000to3000">1,000만원 ~ 3,000만원</option>
                        <option value="over3000">3,000만원 이상</option>
                        <option value="custom">직접 입력</option>
                      </select>
                      <span class="cf-sel-arrow">▾</span>
                    </div>
                    <div class="cf-custom-budget" id="br-budget-custom" style="display:none;">
                      <input type="text" name="budgetCustom" placeholder="예: 월 300만원, 총 1,000만원 등 자유롭게 입력" />
                    </div>
                  </div>
                </div>

                {/* 문의 내용 */}
                <div class="cf-group">
                  <label for="br-message">문의 내용 <span class="cf-req">*</span></label>
                  <textarea id="br-message" name="message" rows={5} placeholder="브랜드 소개, 마케팅 목표, 현재 상황 등 자유롭게 작성해 주세요." required></textarea>
                </div>

                <div class="cf-group cf-privacy-group">
                  <label class="cf-privacy-check">
                    <input type="checkbox" id="br-privacy" name="privacy" required />
                    <span class="cf-privacy-box"></span>
                    <span>개인정보 수집 및 이용에 동의합니다.</span>
                  </label>
                </div>

                <button type="submit" class="cf-submit">
                  <span>상담 신청하기</span>
                  <svg viewBox="0 0 24 24" fill="none"><path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </button>
              </form>

              <div class="contact-success" id="brandSuccess" style="display:none;">
                <div class="cs-check">
                  <svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="22" stroke="rgba(26,107,255,0.3)" stroke-width="1.5"/><path d="M14 24l8 8 12-12" stroke="rgba(26,107,255,0.9)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </div>
                <h3>상담 신청이 완료되었습니다!</h3>
                <p>담당자가 빠른 시일 내 연락드립니다.<br />보통 1 영업일 이내 응답합니다.</p>
              </div>
            </div>

          </div>{/* /contact-form-wrap */}

          {/* ── 정보 사이드바 ── */}
          <aside class="contact-sidebar">
            <div class="csb-card">
              <h3 class="csb-title">연락처 정보</h3>
              <ul class="csb-list">
                <li class="csb-item">
                  <div class="csb-icon">
                    <svg viewBox="0 0 24 24" fill="none"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="currentColor"/></svg>
                  </div>
                  <div>
                    <span class="csb-label">대표 연락처</span>
                    <a href="tel:010-9186-9944" class="csb-value csb-link">010-9186-9944</a>
                  </div>
                </li>
                <li class="csb-item">
                  <div class="csb-icon">
                    <svg viewBox="0 0 24 24" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor"/></svg>
                  </div>
                  <div>
                    <span class="csb-label">주소</span>
                    <p class="csb-value">경기도 안산시 단원구 고잔로 51<br />타워아이즈빌 2F, 204호</p>
                  </div>
                </li>
                <li class="csb-item">
                  <div class="csb-icon">
                    <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/><path d="M12 6v6l4 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
                  </div>
                  <div>
                    <span class="csb-label">운영시간</span>
                    <p class="csb-value">평일 09:00 – 18:00<br /><span class="csb-note">주말 및 공휴일 휴무</span></p>
                  </div>
                </li>
              </ul>
            </div>

            <div class="csb-card">
              <h3 class="csb-title">자주 묻는 질문</h3>
              <div class="csb-faq">
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
                  <div class="faq-a">서비스 유형에 따라 다릅니다. 단발성 캠페인은 300만원~, 월 운영 계약은 월 150만원~부터 협의 가능합니다.</div>
                </div>
                <div class="faq-item">
                  <button class="faq-q" onclick="this.closest('.faq-item').classList.toggle('open')">
                    <span>성과 보장이 되나요?</span>
                    <svg class="faq-arr" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
                  </button>
                  <div class="faq-a">명확한 KPI를 함께 설정하고 달성을 위해 지속적으로 최적화합니다. 인애드컴퍼니의 재계약률 98%가 그 결과입니다.</div>
                </div>
                <div class="faq-item">
                  <button class="faq-q" onclick="this.closest('.faq-item').classList.toggle('open')">
                    <span>어떤 업종과 주로 일하나요?</span>
                    <svg class="faq-arr" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
                  </button>
                  <div class="faq-a">뷰티, 식품, 헬스케어, 이커머스, 패션, 생활용품 등 다양한 업종과 함께하고 있습니다. 업종에 맞는 최적화 전략을 제안합니다.</div>
                </div>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </section>

    {/* ── JS: 단계 전환 로직 ── */}
    <script dangerouslySetInnerHTML={{__html: `
      function selectType(type) {
        var sel = document.getElementById('step-select');
        var target = document.getElementById('step-' + type);
        sel.style.animation = 'stepFadeOut 0.3s ease forwards';
        setTimeout(function() {
          sel.style.display = 'none';
          sel.style.animation = '';
          target.style.display = 'block';
          target.style.animation = 'stepFadeIn 0.4s ease forwards';
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 280);
      }

      function goBack() {
        var sel = document.getElementById('step-select');
        var agency = document.getElementById('step-agency');
        var brand = document.getElementById('step-brand');
        [agency, brand].forEach(function(el) {
          el.style.animation = 'stepFadeOut 0.3s ease forwards';
          setTimeout(function() {
            el.style.display = 'none';
            el.style.animation = '';
          }, 280);
        });
        setTimeout(function() {
          sel.style.display = 'block';
          sel.style.animation = 'stepFadeIn 0.4s ease forwards';
          sel.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 280);
      }

      function toggleCustomBudget(sel, targetId) {
        var wrap = document.getElementById(targetId);
        if (!wrap) return;
        wrap.style.display = sel.value === 'custom' ? 'block' : 'none';
      }

      function handleContact(e, type) {
        e.preventDefault();
        var formId = type === 'agency' ? 'agencyForm' : 'brandForm';
        var successId = type === 'agency' ? 'agencySuccess' : 'brandSuccess';
        var form = document.getElementById(formId);
        var success = document.getElementById(successId);
        if (form && success) {
          form.style.opacity = '0';
          form.style.transition = 'opacity 0.3s ease';
          setTimeout(function() {
            form.style.display = 'none';
            success.style.display = 'flex';
            success.style.animation = 'stepFadeIn 0.5s ease forwards';
          }, 300);
        }
        return false;
      }
    `}} />
  </>
)
