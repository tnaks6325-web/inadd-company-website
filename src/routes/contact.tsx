export const ContactPage = () => (
  <>
    <section class="page-hero">
      <div class="page-hero-bg"><div class="hero-glow glow-1"></div></div>
      <div class="container">
        <span class="section-label">Contact</span>
        <h1 class="page-title">프로젝트를<br /><em>시작해봅시다</em></h1>
        <p class="page-desc">어떤 고민이든 괜찮습니다.<br />NOVA STUDIO가 함께 방향을 잡아드립니다.</p>
      </div>
    </section>

    <section class="section contact-section">
      <div class="container">
        <div class="contact-layout">
          {/* Form */}
          <div class="contact-form-wrap">
            <h2>문의하기</h2>
            <p class="contact-form-desc">빠른 시일 내에 담당자가 연락드립니다.<br />보통 1 영업일 이내 응답합니다.</p>
            <form class="contact-form" id="contactForm" onsubmit="return handleContact(event);">
              <div class="form-group">
                <label for="name">이름 / 담당자명 <span class="required">*</span></label>
                <input type="text" id="name" name="name" placeholder="홍길동" required class="form-input" />
              </div>
              <div class="form-group">
                <label for="company">회사명</label>
                <input type="text" id="company" name="company" placeholder="(주)브랜드명" class="form-input" />
              </div>
              <div class="form-group">
                <label for="email">이메일 <span class="required">*</span></label>
                <input type="email" id="email" name="email" placeholder="hello@company.com" required class="form-input" />
              </div>
              <div class="form-group">
                <label for="phone">연락처</label>
                <input type="tel" id="phone" name="phone" placeholder="010-0000-0000" class="form-input" />
              </div>
              <div class="form-group">
                <label>관심 서비스</label>
                <div class="checkbox-group">
                  <label class="checkbox-item">
                    <input type="checkbox" name="service" value="brand" />
                    <span>브랜드 전략</span>
                  </label>
                  <label class="checkbox-item">
                    <input type="checkbox" name="service" value="performance" />
                    <span>퍼포먼스 마케팅</span>
                  </label>
                  <label class="checkbox-item">
                    <input type="checkbox" name="service" value="viral" />
                    <span>바이럴 마케팅</span>
                  </label>
                  <label class="checkbox-item">
                    <input type="checkbox" name="service" value="content" />
                    <span>콘텐츠 제작</span>
                  </label>
                  <label class="checkbox-item">
                    <input type="checkbox" name="service" value="insight" />
                    <span>마케팅 인사이트</span>
                  </label>
                  <label class="checkbox-item">
                    <input type="checkbox" name="service" value="other" />
                    <span>기타</span>
                  </label>
                </div>
              </div>
              <div class="form-group">
                <label for="budget">예상 예산</label>
                <select id="budget" name="budget" class="form-input form-select">
                  <option value="">선택해주세요</option>
                  <option value="under300">300만원 미만</option>
                  <option value="300to1000">300만원 ~ 1,000만원</option>
                  <option value="1000to3000">1,000만원 ~ 3,000만원</option>
                  <option value="over3000">3,000만원 이상</option>
                </select>
              </div>
              <div class="form-group">
                <label for="message">문의 내용 <span class="required">*</span></label>
                <textarea id="message" name="message" rows={6} placeholder="프로젝트 목표, 현재 상황, 원하는 결과 등 자유롭게 작성해 주세요." required class="form-input form-textarea"></textarea>
              </div>
              <div class="form-group">
                <label class="checkbox-item privacy-check">
                  <input type="checkbox" id="privacy" name="privacy" required />
                  <span>개인정보 수집 및 이용에 동의합니다. <a href="#" class="privacy-link">[자세히 보기]</a></span>
                </label>
              </div>
              <button type="submit" class="btn btn-primary btn-full">문의 보내기</button>
            </form>
            <div class="contact-success" id="contactSuccess" style="display:none;">
              <div class="success-icon">✓</div>
              <h3>문의가 접수되었습니다!</h3>
              <p>담당자가 빠른 시일 내 연락드리겠습니다.<br />보통 1 영업일 이내 응답합니다.</p>
            </div>
          </div>

          {/* Info */}
          <div class="contact-info">
            <div class="contact-info-card">
              <h3>연락처 정보</h3>
              <div class="info-items">
                <div class="info-item">
                  <div class="info-icon">📧</div>
                  <div>
                    <span class="info-label">이메일</span>
                    <a href="mailto:hello@novastudio.kr" class="info-value">hello@novastudio.kr</a>
                  </div>
                </div>
                <div class="info-item">
                  <div class="info-icon">📞</div>
                  <div>
                    <span class="info-label">전화</span>
                    <a href="tel:02-0000-0000" class="info-value">02-0000-0000</a>
                  </div>
                </div>
                <div class="info-item">
                  <div class="info-icon">📍</div>
                  <div>
                    <span class="info-label">주소</span>
                    <p class="info-value">서울특별시 강남구 테헤란로 123<br />NOVA빌딩 7층</p>
                  </div>
                </div>
                <div class="info-item">
                  <div class="info-icon">🕐</div>
                  <div>
                    <span class="info-label">운영시간</span>
                    <p class="info-value">평일 09:00 – 18:00<br />주말 및 공휴일 휴무</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="contact-info-card">
              <h3>빠른 문의 채널</h3>
              <div class="quick-contacts">
                <a href="#" class="qc-btn kakao">
                  <span class="qc-icon">💬</span>
                  <span>카카오톡 상담</span>
                </a>
                <a href="#" class="qc-btn instagram">
                  <span class="qc-icon">📸</span>
                  <span>인스타그램 DM</span>
                </a>
              </div>
            </div>
            <div class="contact-info-card faq-card">
              <h3>자주 묻는 질문</h3>
              <div class="faq-list">
                <div class="faq-item">
                  <button class="faq-q" onclick="toggleFaq(this)">프로젝트 기간은 얼마나 걸리나요?</button>
                  <div class="faq-a">프로젝트 규모에 따라 다르지만, 일반적으로 전략 수립 2~4주, 실행 및 운영 1~6개월입니다. 초기 미팅에서 상세 일정을 협의합니다.</div>
                </div>
                <div class="faq-item">
                  <button class="faq-q" onclick="toggleFaq(this)">최소 예산이 있나요?</button>
                  <div class="faq-a">프로젝트 유형에 따라 다릅니다. 단발성 캠페인은 300만원~, 장기 운영 계약은 월 150만원~부터 협의 가능합니다.</div>
                </div>
                <div class="faq-item">
                  <button class="faq-q" onclick="toggleFaq(this)">성과 보장이 되나요?</button>
                  <div class="faq-a">특정 수치를 보장하기보다는, 명확한 KPI를 함께 설정하고 그 달성을 위해 지속적으로 최적화하는 방식으로 운영합니다.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
)
