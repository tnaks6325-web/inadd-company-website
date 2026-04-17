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

      {/* 가운데 구분선 + OR */}
      <div class="ct-split-divider">
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
                </div>

                <button type="submit" class="cf-submit">
                  <span>상담 신청하기</span>
                  <svg viewBox="0 0 24 24" fill="none"><path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </button>
              </form>

              {/* 완료 메시지 */}
              <div class="contact-success" id="contactSuccess" style="display:none;">
                <div class="cs-check">
                  <svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="22" stroke="rgba(26,107,255,0.3)" stroke-width="1.5"/><path d="M14 24l8 8 12-12" stroke="rgba(26,107,255,0.9)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </div>
                <h3>상담 신청이 완료되었습니다!</h3>
                <p>담당자가 빠른 시일 내 연락드립니다.<br />보통 1 영업일 이내 응답합니다.</p>
              </div>

            </div>{/* /contact-form-wrap */}

          </div>{/* /contact-layout (폼 영역만) */}

          {/* ── 자주 묻는 질문 — 폼 아래 풀 너비 ── */}
          <div class="ct-faq-section">
            <div class="ct-faq-head">
              <span class="sec-label">FAQ</span>
              <h3>자주 묻는 질문</h3>
            </div>
            <div class="ct-faq-list">
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

    {/* ── JS ── */}
    <script dangerouslySetInnerHTML={{__html: `
      (function() {
        function hoverPanel(type) {
          var agency = document.getElementById('panel-agency');
          var brand  = document.getElementById('panel-brand');
          if (type === 'agency') {
            agency.classList.add('ct-active');
            brand.classList.add('ct-shrink');
          } else {
            brand.classList.add('ct-active');
            agency.classList.add('ct-shrink');
          }
        }
        function resetPanel() {
          ['panel-agency','panel-brand'].forEach(function(id) {
            var el = document.getElementById(id);
            el.classList.remove('ct-active','ct-shrink');
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
          var split  = document.getElementById('ct-split');
          var screen = document.getElementById('ct-form-screen');
          screen.style.animation = 'ctSplitOut 0.4s ease forwards';
          setTimeout(function() {
            screen.style.display = 'none';
            split.style.display = 'flex';
            split.style.animation = 'ctFormIn 0.5s ease forwards';
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }, 350);
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
        // 전역 노출
        window.hoverPanel = hoverPanel;
        window.resetPanel = resetPanel;
        window.enterForm = enterForm;
        window.backToSelect = backToSelect;
        window.toggleCustomBudget = toggleCustomBudget;
        window.handleContactSubmit = handleContactSubmit;
      })();
    `}} />
  </>
)
