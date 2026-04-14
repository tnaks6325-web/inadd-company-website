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

    {/* ── 상담 버튼 2개 (크게, 눈에 띄게) ── */}
    <section class="contact-cta-top">
      <div class="container">
        <div class="cct-wrap">
          <a href="#consult-form" class="cct-btn cct-btn--primary">
            <div class="cct-icon">
              <svg viewBox="0 0 32 32" fill="none">
                <path d="M28 6H4C2.9 6 2 6.9 2 8V24C2 25.1 2.9 26 4 26H28C29.1 26 30 25.1 30 24V8C30 6.9 29.1 6 28 6Z" stroke="currentColor" stroke-width="1.5"/>
                <path d="M2 10L16 18L30 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </div>
            <div class="cct-text">
              <strong>상담 신청</strong>
              <span>정보를 입력하시면 담당자가 직접 연락드립니다</span>
            </div>
            <div class="cct-arrow">
              <svg viewBox="0 0 24 24" fill="none"><path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
          </a>

          <button class="cct-btn cct-btn--ghost" id="quickContactBtn" onclick="document.getElementById('quickModal').classList.add('active')">
            <div class="cct-icon">
              <svg viewBox="0 0 32 32" fill="none">
                <path d="M8.62 13.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V23c0 .55-.45 1-1 1C12.61 24 4 15.39 4 7c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="currentColor"/>
              </svg>
            </div>
            <div class="cct-text">
              <strong>빠른 상담</strong>
              <span>대표에게 지금 바로 전화 연결</span>
            </div>
            <div class="cct-arrow">
              <svg viewBox="0 0 24 24" fill="none"><path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
          </button>
        </div>
      </div>
    </section>

    {/* ── 빠른 상담 모달 ── */}
    <div class="quick-modal" id="quickModal" onclick="if(event.target===this)this.classList.remove('active')">
      <div class="qm-card">
        <button class="qm-close" onclick="document.getElementById('quickModal').classList.remove('active')">
          <svg viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        </button>
        <div class="qm-phone-icon">
          <svg viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="30" stroke="rgba(26,107,255,0.2)" stroke-width="1"/>
            <path d="M20.62 27.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V37c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="rgba(26,107,255,0.9)"/>
          </svg>
        </div>
        <h3>빠른 상담</h3>
        <p class="qm-sub">대표 <strong>김수만</strong>에게<br />지금 바로 연락하세요</p>
        <a href="tel:010-9186-9944" class="qm-call-btn">
          <svg viewBox="0 0 24 24" fill="none"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="currentColor"/></svg>
          010-9186-9944
        </a>
        <p class="qm-hours">
          <svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1"/><path d="M8 4v4l2.5 1.5" stroke="currentColor" stroke-width="1" stroke-linecap="round"/></svg>
          평일 09:00 – 18:00 운영
        </p>
      </div>
    </div>

    {/* ── 상담 신청 폼 ── */}
    <section class="section contact-main-section" id="consult-form">
      <div class="container">
        <div class="contact-layout">

          {/* ── 폼 ── */}
          <div class="contact-form-wrap">
            <div class="cfw-head">
              <span class="sec-label">Consultation</span>
              <h2>상담 신청</h2>
              <p>빠른 시일 내에 담당자가 연락드립니다.<br />보통 1 영업일 이내 응답합니다.</p>
            </div>

            <form class="contact-form" id="contactForm" onsubmit="return handleContact(event)">

              <div class="cf-row cf-row--2">
                <div class="cf-group">
                  <label for="cf-name">이름 / 담당자명 <span class="cf-req">*</span></label>
                  <input type="text" id="cf-name" name="name" placeholder="홍길동" required />
                </div>
                <div class="cf-group">
                  <label for="cf-company">회사명</label>
                  <input type="text" id="cf-company" name="company" placeholder="(주)브랜드명" />
                </div>
              </div>

              <div class="cf-row cf-row--2">
                <div class="cf-group">
                  <label for="cf-phone">연락처 <span class="cf-req">*</span></label>
                  <input type="tel" id="cf-phone" name="phone" placeholder="010-0000-0000" required />
                </div>
                <div class="cf-group">
                  <label for="cf-email">이메일</label>
                  <input type="email" id="cf-email" name="email" placeholder="hello@company.com" />
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
                    <label class="cf-chip">
                      <input type="checkbox" name="service" value={s.val} />
                      <span>{s.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div class="cf-group">
                <label for="cf-budget">예상 예산</label>
                <div class="cf-select-wrap">
                  <select id="cf-budget" name="budget">
                    <option value="">선택해주세요</option>
                    <option value="under300">300만원 미만</option>
                    <option value="300to1000">300만원 ~ 1,000만원</option>
                    <option value="1000to3000">1,000만원 ~ 3,000만원</option>
                    <option value="over3000">3,000만원 이상</option>
                  </select>
                  <span class="cf-sel-arrow">▾</span>
                </div>
              </div>

              <div class="cf-group">
                <label for="cf-message">문의 내용 <span class="cf-req">*</span></label>
                <textarea id="cf-message" name="message" rows={5} placeholder="프로젝트 목표, 현재 상황, 원하는 결과 등 자유롭게 작성해 주세요." required></textarea>
              </div>

              <div class="cf-group cf-privacy-group">
                <label class="cf-privacy-check">
                  <input type="checkbox" id="cf-privacy" name="privacy" required />
                  <span class="cf-privacy-box"></span>
                  <span>개인정보 수집 및 이용에 동의합니다.</span>
                </label>
              </div>

              <button type="submit" class="cf-submit">
                <span>상담 신청하기</span>
                <svg viewBox="0 0 24 24" fill="none"><path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </button>
            </form>

            <div class="contact-success" id="contactSuccess" style="display:none;">
              <div class="cs-check">
                <svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="22" stroke="rgba(26,107,255,0.3)" stroke-width="1.5"/><path d="M14 24l8 8 12-12" stroke="rgba(26,107,255,0.9)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </div>
              <h3>상담 신청이 완료되었습니다!</h3>
              <p>담당자가 빠른 시일 내 연락드립니다.<br />보통 1 영업일 이내 응답합니다.</p>
            </div>
          </div>

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
  </>
)
