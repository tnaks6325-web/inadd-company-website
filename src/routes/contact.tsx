import { icon } from '../icons'
export const ContactPage = () => (
  <>
    {/* ══ 라이트 테마 래퍼 ══ */}
    <div class="svc-light">

    {/* ══════════════════════════════════════
        메인 — 간편 문의 (단일 폼)
        ══════════════════════════════════════ */}
    <div id="ct-main">

      {/* 페이지 히어로 */}
      <section class="page-hero contact-hero ct-form-hero">
        <div class="page-hero-bg"><div class="hero-glow glow-1"></div></div>
        <div class="container">
          <span class="sec-label">Contact</span>
          <h1 class="page-title">문의<em>하기</em></h1>
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
                <p>빠른 시일 내에 담당자가 메일로 연락드립니다.<br />보통 1영업일 이내 응답합니다.</p>
              </div>

              {/* ── 간편 문의 폼 ── */}
              <form class="contact-form" id="simpleForm" onsubmit="return handleContactSubmit(event)">

                {/* ── 대체 문의 안내: 모바일 이메일 입력 이탈 방지 ── */}
                <p class="cf-altmail">
                  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="2.5" y="4.5" width="15" height="11" rx="2" stroke="currentColor" stroke-width="1.6"/><path d="M3.5 6l6.5 4.5L16.5 6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  <span>이메일 입력이 어려우신 경우, 아래 메일로 직접 문의 주셔도 됩니다.<br />
                    <a href="mailto:dndvkr41@inadcompany.com">dndvkr41@inadcompany.com</a>
                  </span>
                </p>

                <div class="cf-row cf-row--2">
                  <div class="cf-group">
                    <label for="ct-company">회사 / 브랜드명 <span class="cf-req">*</span></label>
                    <input type="text" id="ct-company" name="company" placeholder="브랜드명 또는 회사명" required />
                  </div>
                  <div class="cf-group">
                    <label for="ct-name">이름 <span class="cf-req">*</span></label>
                    <input type="text" id="ct-name" name="name" placeholder="홍길동" required />
                  </div>
                </div>

                <div class="cf-row cf-row--2">
                  <div class="cf-group">
                    <label for="ct-phone">연락처 <span class="cf-req">*</span></label>
                    <input type="tel" id="ct-phone" name="phone" placeholder="010-0000-0000" required />
                  </div>
                  <div class="cf-group">
                    <label for="ct-email">메일 주소 <span class="cf-req">*</span></label>
                    <input type="email" id="ct-email" name="email" placeholder="hello@yourcompany.com" required />
                  </div>
                </div>

                <div class="cf-group">
                  <label>관심 서비스 <span class="cf-opt">(복수 선택 가능)</span></label>
                  <div class="cf-chips">
                    {[
                      { val: 'viral', label: '바이럴 마케팅' },
                      { val: 'performance', label: '퍼포먼스 마케팅' },
                      { val: 'influencer', label: '인플루언서·유튜브' },
                      { val: 'seeding', label: '체험단' },
                      { val: 'review', label: '고객 리뷰' },
                      { val: 'oliveyoung', label: '올리브영' },
                      { val: 'ppl', label: 'PPL' },
                      { val: 'other', label: '기타' },
                    ].map(s => (
                      <label class="cf-chip" key={s.val}>
                        <input type="checkbox" name="service" value={s.label} />
                        <span>{s.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div class="cf-group">
                  <label for="ct-message">문의 내용</label>
                  <textarea id="ct-message" name="message" rows={5} placeholder="브랜드 상황, 마케팅 목표 등 편하게 적어주세요. 간단히 적어주셔도 괜찮습니다."></textarea>
                </div>

                {/* 회사소개서 체크박스 제거 — 문의 접수 시 항상 함께 발송 */}

                <div class="cf-group cf-privacy-group">
                  <label class="cf-privacy-check">
                    <input type="checkbox" name="privacy" required />
                    <span class="cf-privacy-box"></span>
                    <span>개인정보 수집 및 이용에 동의합니다.</span>
                  </label>
                  <button type="button" class="cf-privacy-view-btn" onclick="openPrivacyModal()">내용 확인</button>
                </div>

                <button type="submit" class="cf-submit">
                  <span>문의하기</span>
                  <svg viewBox="0 0 24 24" fill="none"><path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </button>
                <p class="cf-brochure-note">문의를 접수하시면 회사소개서도 함께 보내드립니다.</p>
              </form>

              {/* 완료 메시지 */}
              <div class="contact-success" id="contactSuccess" style="display:none;">
                <div class="cs-main">
                  <div class="cs-check">
                    <svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="22" stroke="rgba(26,107,255,0.3)" stroke-width="1.5"/><path d="M14 24l8 8 12-12" stroke="rgba(26,107,255,0.9)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  </div>
                  <h3>문의가 접수되었습니다!</h3>
                </div>
                <p class="cs-notify">담당자가 <strong>1영업일 이내</strong> 메일로 연락드립니다.<br />급한 문의는 아래로 연락 주세요.</p>
                <p class="cs-notify cm-bro-note" id="csBroNote" style="display:none;">입력하신 이메일로 <strong>회사소개서</strong>도 보내드립니다.</p>
                <p class="cs-contact-info"><a href="tel:010-9186-9944">010-9186-9944</a></p>

                {/* 작성 내용 보기 */}
                <button class="cs-review-btn" onclick="openSubmitReviewModal('contact')">
                  <svg viewBox="0 0 24 24" fill="none" width="14" height="14"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  <span>작성 내용 보기</span>
                </button>

              </div>

            </div>{/* /contact-form-wrap */}
          </div>{/* /contact-layout */}

          {/* ── 자주 묻는 질문 ── */}
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
                <div class="faq-a">명확한 KPI를 함께 설정하고 지속 최적화합니다. 게시글 수·리뷰 수처럼 계약으로 약속한 숫자는 보장합니다.</div>
              </div>
              <div class="faq-item">
                <button class="faq-q" onclick="this.closest('.faq-item').classList.toggle('open')">
                  <span>어떤 업종과 주로 일하나요?</span>
                  <svg class="faq-arr" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
                </button>
                <div class="faq-a">뷰티, 식품, 헬스케어, 이커머스, 패션, 생활용품 등 다양한 업종과 함께하고 있습니다.</div>
              </div>
              <div class="faq-item">
                <button class="faq-q" onclick="this.closest('.faq-item').classList.toggle('open')">
                  <span>상담 후 바로 계약을 해야 하나요?</span>
                  <svg class="faq-arr" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
                </button>
                <div class="faq-a">아닙니다. 초기 상담은 완전 무료이며 부담 없이 문의해 주세요. 전략 제안서를 검토하신 후 진행 여부를 결정하시면 됩니다.</div>
              </div>
              <div class="faq-item">
                <button class="faq-q" onclick="this.closest('.faq-item').classList.toggle('open')">
                  <span>상담 신청 후 연락은 얼마나 걸리나요?</span>
                  <svg class="faq-arr" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
                </button>
                <div class="faq-a">영업일 기준 24시간 이내에 담당 매니저가 메일로 연락드립니다. 긴급한 경우 전화 문의를 이용해 주세요.</div>
              </div>
              <div class="faq-item">
                <button class="faq-q" onclick="this.closest('.faq-item').classList.toggle('open')">
                  <span>여러 마케팅 상품을 동시에 진행할 수 있나요?</span>
                  <svg class="faq-arr" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
                </button>
                <div class="faq-a">가능합니다. 바이럴·체험단·인플루언서를 함께 운영하면 채널이 서로 받쳐주면서 효과가 더 커집니다. 통합 패키지 할인도 드립니다.</div>
              </div>
              <div class="faq-item">
                <button class="faq-q" onclick="this.closest('.faq-item').classList.toggle('open')">
                  <span>계약 해지는 자유롭게 가능한가요?</span>
                  <svg class="faq-arr" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
                </button>
                <div class="faq-a">월 단위 계약을 기본으로 하며, 최소 계약 기간(보통 3개월) 이후에는 1개월 전 통보로 자유롭게 해지하실 수 있습니다.</div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>{/* /ct-main */}

    {/* ══════════════════════════════════════
        킥오프 미팅 신청 화면 (문의 완료 후 진입)
        ══════════════════════════════════════ */}
    <div class="ct-kickoff-screen" id="ct-kickoff-screen" style="display:none;">

      {/* 히어로 */}
      <section class="page-hero contact-hero ct-form-hero">
        <div class="page-hero-bg"><div class="hero-glow glow-1"></div></div>
        <div class="container">
          <button class="step-back-btn" onclick="backFromKickoff()">
            <svg viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 18L5 12L11 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            돌아가기
          </button>
          <div class="ct-form-type-badge ct-badge--kickoff">KICKOFF MEETING</div>
          <h1 class="page-title">인애드컴퍼니<br /><em>미팅일정 잡기</em></h1>
          <p class="page-desc">희망 일정을 알려주시면 담당자가 확인 후<br />빠르게 미팅 일정을 확정해 드립니다.</p>
        </div>
      </section>

      {/* 신청 폼 */}
      <section class="section contact-main-section">
        <div class="container">
          <div class="ct-kickoff-form-solo">
            <form class="contact-form" id="kickoffForm" onsubmit="return handleKickoffSubmit(event)">

              {/* hidden: 문의 시 입력한 담당자 정보 자동 전달 */}
              <input type="hidden" id="kf-name" name="kf_name" />
              <input type="hidden" id="kf-phone" name="kf_phone" />
              <input type="hidden" id="kf-email" name="kf_email" />
              <input type="hidden" id="kf-company" name="kf_company" />

              {/* ── STEP 1: 미팅 방식 ── */}
              <div class="kf-section" style="opacity:1;transform:translateY(0)">
                <div class="kf-section-head">
                  <span class="kf-step-num">01</span>
                  <div>
                    <h3 class="kf-section-title">미팅 방식 선택 <span class="cf-req">*</span></h3>
                    <p class="kf-section-desc">편하신 방식을 선택해 주세요</p>
                  </div>
                </div>
                <div class="kf-method-cards">
                  <label class="kf-method-card" id="kmc-visit">
                    <input type="radio" name="meetingType" value="visit" required
                           onchange="onMeetingTypeChange('visit')" />
                    <div class="kf-mc-icon">{icon('building')}</div>
                    <div class="kf-mc-body">
                      <strong>인애드컴퍼니 방문</strong>
                      <p>저희 사무실로 직접 방문하시는 미팅</p>
                    </div>
                    <div class="kf-mc-check">
                      <svg viewBox="0 0 20 20" fill="none"><path d="M5 10l4 4 6-8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </div>
                  </label>
                  <label class="kf-method-card" id="kmc-onsite">
                    <input type="radio" name="meetingType" value="onsite" required
                           onchange="onMeetingTypeChange('onsite')" />
                    <div class="kf-mc-icon">{icon('car')}</div>
                    <div class="kf-mc-body">
                      <strong>방문 상담 요청</strong>
                      <p>담당자가 직접 방문하는 출장 미팅</p>
                    </div>
                    <div class="kf-mc-check">
                      <svg viewBox="0 0 20 20" fill="none"><path d="M5 10l4 4 6-8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </div>
                  </label>
                  <label class="kf-method-card" id="kmc-zoom">
                    <input type="radio" name="meetingType" value="zoom" required
                           onchange="onMeetingTypeChange('zoom')" />
                    <div class="kf-mc-icon">{icon('monitor')}</div>
                    <div class="kf-mc-body">
                      <strong>ZOOM 미팅</strong>
                      <p>Zoom / Google Meet 온라인 미팅</p>
                    </div>
                    <div class="kf-mc-check">
                      <svg viewBox="0 0 20 20" fill="none"><path d="M5 10l4 4 6-8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </div>
                  </label>
                </div>
              </div>

              {/* ── STEP 2-A: 인애드컴퍼니 방문 — 고정 주소 표시 ── */}
              <div class="kf-section kf-location-section" id="kf-location-section" style="display:none;">
                <div class="kf-section-head">
                  <span class="kf-step-num">02</span>
                  <div>
                    <h3 class="kf-section-title" id="kf-location-title">미팅 장소</h3>
                    <p class="kf-section-desc" id="kf-location-desc">방문하실 인애드컴퍼니 주소입니다</p>
                  </div>
                </div>

                {/* visit: 고정 주소 카드 */}
                <div id="kf-addr-fixed" style="display:none;">
                  <div class="kf-fixed-addr-card">
                    <svg viewBox="0 0 24 24" fill="none" width="18" height="18" style="flex-shrink:0;margin-top:2px"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" stroke="rgba(160,120,255,0.85)" stroke-width="1.8" stroke-linecap="round"/><circle cx="12" cy="10" r="3" stroke="rgba(160,120,255,0.85)" stroke-width="1.8"/></svg>
                    <div>
                      <p class="kf-fixed-addr-main">경기도 안산시 단원구 고잔로 51, 타워아이즈빌 2층 204호</p>
                      <p class="kf-fixed-addr-sub">주차 가능 · 지하철 4호선 중앙역 도보 5분</p>
                    </div>
                  </div>
                  {/* hidden으로 form 데이터에 포함 */}
                  <input type="hidden" name="visitAddress" value="경기도 안산시 단원구 고잔로 51, 타워아이즈빌 2층 204호" />
                </div>

                {/* onsite: 주소 직접 입력 */}
                <div id="kf-addr-search" style="display:none;">
                  <div class="kf-address-wrap">
                    <div class="cf-row cf-row--addr">
                      <div class="cf-group" style="flex:1; margin-bottom:0">
                        <input type="text" id="kf-postcode" name="postcode" placeholder="우편번호" readonly
                               style="cursor:pointer; background:rgba(255,255,255,0.04);"
                               onclick="openAddressSearch()" />
                      </div>
                      <button type="button" class="kf-addr-search-btn" onclick="openAddressSearch()">
                        <svg viewBox="0 0 24 24" fill="none" width="15" height="15"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="1.8"/></svg>
                        주소 찾기
                      </button>
                    </div>
                    <div class="cf-group" style="margin-top:10px; margin-bottom:0">
                      <input type="text" id="kf-address" name="address" placeholder="기본 주소" readonly
                             style="background:rgba(255,255,255,0.04);" />
                    </div>
                    <div class="cf-group" style="margin-top:8px; margin-bottom:0">
                      <input type="text" id="kf-address-detail" name="addressDetail" placeholder="상세 주소 (층, 호수 등)" />
                    </div>
                  </div>
                </div>
              </div>

              {/* ── STEP 3: 미팅 참여 인원 ── */}
              <div class="kf-section kf-members-section" id="kf-members-section" style="display:none;">
                <div class="kf-section-head">
                  <span class="kf-step-num" id="kf-step-members">03</span>
                  <div>
                    <h3 class="kf-section-title">미팅 참여 인원 <span class="cf-req">*</span></h3>
                    <p class="kf-section-desc">참석 예정 인원수를 선택해 주세요</p>
                  </div>
                </div>
                <div class="kf-members-chips">
                  {['1명', '2명', '3명', '4명', '5명 이상'].map((v, i) => (
                    <label class="kf-member-chip" key={v}>
                      <input type="radio" name="memberCount" value={v} required />
                      <span>{v}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* ── STEP 4: 희망 일정 ── */}
              <div class="kf-section kf-schedule-section" id="kf-schedule-section" style="display:none;">
                <div class="kf-section-head">
                  <span class="kf-step-num" id="kf-step-schedule">04</span>
                  <div>
                    <h3 class="kf-section-title">희망 일정 <span class="cf-req">*</span></h3>
                    <p class="kf-section-desc">1순위·2순위를 입력하시면 인애드컴퍼니가 확정해 드립니다</p>
                  </div>
                </div>

                {/* 1순위 */}
                <div class="kf-schedule-block">
                  <div class="kf-schedule-rank kf-rank--1">1순위</div>
                  <div class="cf-row cf-row--2">
                    <div class="cf-group" style="margin-bottom:0">
                      <label style="font-size:11px;color:rgba(255,255,255,0.45);margin-bottom:6px;display:block">날짜</label>
                      <input type="date" id="kf-date1" name="date1" required style="color-scheme:dark" />
                    </div>
                    <div class="cf-group" style="margin-bottom:0">
                      <label style="font-size:11px;color:rgba(255,255,255,0.45);margin-bottom:6px;display:block">시간</label>
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

                {/* 2순위 */}
                <div class="kf-schedule-block" style="margin-top:16px">
                  <div class="kf-schedule-rank kf-rank--2">2순위 <span style="font-size:10px;opacity:0.55">(선택)</span></div>
                  <div class="cf-row cf-row--2">
                    <div class="cf-group" style="margin-bottom:0">
                      <label style="font-size:11px;color:rgba(255,255,255,0.45);margin-bottom:6px;display:block">날짜</label>
                      <input type="date" id="kf-date2" name="date2" style="color-scheme:dark" />
                    </div>
                    <div class="cf-group" style="margin-bottom:0">
                      <label style="font-size:11px;color:rgba(255,255,255,0.45);margin-bottom:6px;display:block">시간</label>
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

                <p class="kf-schedule-note">
                  <svg viewBox="0 0 16 16" fill="none" width="13" height="13"><path d="M8 2a6 6 0 1 1 0 12A6 6 0 0 1 8 2zm0 4v4m0 2v.5" stroke="rgba(160,120,255,0.7)" stroke-width="1.5" stroke-linecap="round"/></svg>
                  인애드컴퍼니가 두 일정 중 가능한 일정으로 확정 후 연락드립니다
                </p>
              </div>

              {/* ── STEP 5: 사전 질문 ── */}
              <div class="kf-section kf-note-section" id="kf-note-section" style="display:none;">
                <div class="kf-section-head">
                  <span class="kf-step-num" id="kf-step-note">05</span>
                  <div>
                    <h3 class="kf-section-title">사전 질문 / 궁금한 점 <span style="font-size:11px;color:rgba(255,255,255,0.35);font-weight:400">(선택)</span></h3>
                    <p class="kf-section-desc">미팅 전 미리 공유하고 싶은 내용을 적어주세요</p>
                  </div>
                </div>
                <textarea id="kf-note" name="note" rows={4}
                          class="kf-textarea"
                          placeholder="현재 브랜드 상황, 목표, 궁금한 점 등 자유롭게 적어주세요.&#10;미팅 담당자가 미리 확인하고 더 알찬 미팅을 준비합니다." />

                {/* 개인정보 동의 */}
                <div class="cf-group cf-privacy-group" style="margin-top:20px">
                  <label class="cf-privacy-check">
                    <input type="checkbox" name="privacyAgree" required />
                    <span class="cf-privacy-box"></span>
                    <span>개인정보 수집 및 이용에 동의합니다. <span class="cf-req">*</span></span>
                  </label>
                  <button type="button" class="cf-privacy-view-btn" onclick="openPrivacyModal()">내용 확인</button>
                </div>

                <button type="submit" class="cf-submit cf-submit--kickoff" style="margin-top:24px">
                  <svg viewBox="0 0 24 24" fill="none" width="17" height="17"><path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  <span>미팅일정 신청하기</span>
                </button>
              </div>

            </form>

            {/* 완료 메시지 */}
            <div class="ct-kickoff-done" id="kickoffSuccess" style="display:none;">
              <div class="ckd-icon">{icon('calendar')}</div>
              <h3 class="ckd-title">미팅일정 신청이 완료되었습니다</h3>
              <p class="ckd-msg">
                인애드컴퍼니에서 일정을 확인 후<br />
                <strong>1영업일 이내</strong> 회신 드리겠습니다.<br />
                감사합니다
              </p>
              <div class="ckd-info-list">
                <div class="ckd-info-item">
                  <svg viewBox="0 0 20 20" fill="none" width="15" height="15"><path d="M10 2a8 8 0 1 1 0 16A8 8 0 0 1 10 2zm0 4v4l3 3" stroke="rgba(160,120,255,0.85)" stroke-width="1.5" stroke-linecap="round"/></svg>
                  <span>신청하신 1·2순위 일정 중 가능한 일정으로 확정됩니다</span>
                </div>
                <div class="ckd-info-item">
                  <svg viewBox="0 0 20 20" fill="none" width="15" height="15"><path d="M3 8l7-5 7 5v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8z" stroke="rgba(160,120,255,0.85)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  <span>일정 확정 후 이메일 또는 전화로 안내드립니다</span>
                </div>
                <div class="ckd-info-item">
                  <svg viewBox="0 0 20 20" fill="none" width="15" height="15"><path d="M10 2l2.4 5h5.3l-4.3 3.1 1.6 5.2L10 12.3 5 15.3l1.6-5.2L2.3 7h5.3z" stroke="rgba(160,120,255,0.85)" stroke-width="1.5" stroke-linejoin="round"/></svg>
                  <span>킥오프 미팅에서 인애드만의 독점 마케팅 상품을 공개합니다</span>
                </div>
              </div>
              <button class="ckd-review-btn" onclick="openSubmitReviewModal('kickoff')">
                <svg viewBox="0 0 24 24" fill="none" width="14" height="14"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
                <span>작성 내용 보기</span>
              </button>
              <p class="ckd-contact">문의: <a href="tel:010-9186-9944">010-9186-9944</a></p>
            </div>

          </div>{/* /ct-kickoff-form-solo */}
        </div>
      </section>
    </div>{/* /ct-kickoff-screen */}

    {/* ── 작성 내용 보기 모달 ── */}
    <div id="submit-review-modal" class="prv-modal-overlay" onclick="if(event.target===this)closeSubmitReviewModal()" style="display:none;">
      <div class="prv-modal-box srm-box">
        <div class="prv-modal-header">
          <h2>작성 내용 확인</h2>
          <button class="prv-modal-close" onclick="closeSubmitReviewModal()" aria-label="닫기">
            <svg viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
          </button>
        </div>
        <div class="prv-modal-body">
          <div id="srm-body" class="srm-list"></div>
        </div>
      </div>
    </div>

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
                <tr><td>문의</td><td>회사/브랜드명, 이름, 연락처, 이메일</td><td>관심 서비스, 문의 내용</td></tr>
                <tr><td>미팅 신청</td><td>미팅 방식, 희망 일정, 참여 인원</td><td>주소, 사전 질문</td></tr>
              </tbody>
            </table>
          </section>

          <section class="prv-section">
            <h3>■ 수집 방법</h3>
            <p>홈페이지 문의 폼을 통한 직접 입력</p>
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
                <tr><td>책임자</td><td>김수만</td></tr>
                <tr><td>담당자</td><td>김수만</td></tr>
                <tr><td>웹사이트</td><td><a href="https://www.inadcompany.co.kr" target="_blank" rel="noopener">www.inadcompany.co.kr</a></td></tr>
                <tr><td>이메일</td><td><a href="mailto:tnaks6325@inadcompany.com">tnaks6325@inadcompany.com</a></td></tr>
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
        /* ── 간편 문의 제출 ── */
        var _submittedFormData = {};
        var _kickoffFormData   = {};
        async function handleContactSubmit(e) {
          e.preventDefault();
          var form = document.getElementById('simpleForm');
          var success = document.getElementById('contactSuccess');

          _submittedFormData = {};
          var fd = new FormData(form);
          var labelMap = {
            company:'회사/브랜드명', name:'이름', phone:'연락처', email:'이메일', message:'문의 내용'
          };
          var services = [];
          var mailPayload = {};
          fd.forEach(function(val, key) {
            if (key === 'service') { services.push(val); return; }
            if (key === 'privacy') return;
            if (!val) return;
            _submittedFormData[labelMap[key] || key] = val;
            mailPayload[key] = val;
          });
          if (services.length) {
            _submittedFormData['관심 서비스'] = services.join(', ');
            mailPayload['services'] = services.join(', ');
          }
          /* 회사소개서는 선택이 아니라 문의 접수 시 항상 함께 발송 */
          var wantsBrochure = !!mailPayload.email;
          try {
            var responses = await Promise.all([
              fetch('/api/mail/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(mailPayload)
              }),
              fetch('/api/mail/brochure', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: mailPayload.email, emailAgree: 'on' })
              })
            ]);
            /* 소개서 발송 실패로 문의 접수까지 실패 처리하지 않는다 */
            if (!responses[0].ok) throw new Error('mail failed');
          } catch (err) {
            alert('접수 중 오류가 발생했습니다. 잠시 후 다시 시도하거나 전화로 문의해 주세요.');
            return false;
          }
          var broNote = document.getElementById('csBroNote');
          if (broNote) broNote.style.display = wantsBrochure ? 'block' : 'none';

          form.style.transition = 'opacity 0.3s ease';
          form.style.opacity = '0';
          setTimeout(function() {
            form.style.display = 'none';
            success.style.display = 'flex';
            success.style.animation = 'ctFormIn 0.5s ease forwards';
          }, 300);
          return false;
        }

        /* ── 킥오프 화면 전환 ── */
        function goToKickoff() {
          // 문의 폼에서 입력한 담당자 정보 → 킥오프 hidden 필드에 자동 복사
          [['ct-name','kf-name'],['ct-phone','kf-phone'],['ct-email','kf-email'],['ct-company','kf-company']]
            .forEach(function(m) {
              var src = document.getElementById(m[0]);
              var dest = document.getElementById(m[1]);
              if (src && dest) dest.value = src.value || '';
            });

          var main    = document.getElementById('ct-main');
          var kScreen = document.getElementById('ct-kickoff-screen');
          main.style.animation = 'ctSplitOut 0.4s ease forwards';
          setTimeout(function() {
            main.style.display = 'none';
            kScreen.style.display = 'block';
            kScreen.style.animation = 'ctFormIn 0.5s ease forwards';
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }, 380);
        }
        function backFromKickoff() {
          var main    = document.getElementById('ct-main');
          var kScreen = document.getElementById('ct-kickoff-screen');
          kScreen.style.animation = 'ctSplitOut 0.4s ease forwards';
          setTimeout(function() {
            kScreen.style.display = 'none';
            main.style.display = 'block';
            main.style.animation = 'ctFormIn 0.5s ease forwards';
            window.scrollTo({ top: 0, behavior: 'smooth' });
            resetKickoffForm();
          }, 350);
        }
        function resetKickoffForm() {
          var form = document.getElementById('kickoffForm');
          var success = document.getElementById('kickoffSuccess');
          if (form) { form.reset(); form.style.display = 'block'; form.style.opacity = '1'; }
          if (success) success.style.display = 'none';
          ['kf-location-section','kf-members-section','kf-schedule-section','kf-note-section'].forEach(function(id) {
            var el = document.getElementById(id);
            if (el) el.style.display = 'none';
          });
          document.querySelectorAll('.kf-method-card').forEach(function(c) { c.classList.remove('kf-mc--selected'); });
          updateKickoffStepNums('visit');
        }
        function onMeetingTypeChange(type) {
          document.querySelectorAll('.kf-method-card').forEach(function(c) { c.classList.remove('kf-mc--selected'); });
          var card = document.getElementById('kmc-' + type);
          if (card) card.classList.add('kf-mc--selected');

          var locSection  = document.getElementById('kf-location-section');
          var memSection  = document.getElementById('kf-members-section');
          var schSection  = document.getElementById('kf-schedule-section');
          var noteSection = document.getElementById('kf-note-section');

          function showSection(el) {
            el.style.display = 'block';
            requestAnimationFrame(function() { el.classList.add('kf-section--visible'); });
          }

          [locSection, memSection, schSection, noteSection].forEach(function(s) {
            if (s) { s.style.display = 'none'; s.classList.remove('kf-section--visible'); }
          });

          if (type === 'zoom') {
            setTimeout(function() { showSection(memSection); }, 100);
            setTimeout(function() { showSection(schSection); }, 200);
            setTimeout(function() { showSection(noteSection); }, 300);
          } else {
            var addrFixed  = document.getElementById('kf-addr-fixed');
            var addrSearch = document.getElementById('kf-addr-search');
            var locTitle   = document.getElementById('kf-location-title');
            var locDesc    = document.getElementById('kf-location-desc');

            if (type === 'visit') {
              if (addrFixed)  addrFixed.style.display  = 'block';
              if (addrSearch) addrSearch.style.display = 'none';
              if (locTitle)   locTitle.textContent = '미팅 장소';
              if (locDesc)    locDesc.textContent  = '방문하실 인애드컴퍼니 주소입니다';
            } else {
              if (addrFixed)  addrFixed.style.display  = 'none';
              if (addrSearch) addrSearch.style.display = 'block';
              if (locTitle)   locTitle.innerHTML = '미팅 장소 <span class="cf-req">*</span>';
              if (locDesc)    locDesc.textContent = '담당자가 방문할 주소를 입력해 주세요';
              var pc2  = document.getElementById('kf-postcode');
              var adr2 = document.getElementById('kf-address');
              if (pc2)  pc2.value  = '';
              if (adr2) adr2.value = '';
            }
            setTimeout(function() { showSection(locSection); }, 100);
            setTimeout(function() { showSection(memSection); }, 200);
            setTimeout(function() { showSection(schSection); }, 300);
            setTimeout(function() { showSection(noteSection); }, 400);
          }

          updateKickoffStepNums(type);
        }
        function updateKickoffStepNums(type) {
          var isZoom = (type === 'zoom');
          var stepMem  = document.getElementById('kf-step-members');
          var stepSch  = document.getElementById('kf-step-schedule');
          var stepNote = document.getElementById('kf-step-note');
          if (stepMem)  stepMem.textContent  = isZoom ? '02' : '03';
          if (stepSch)  stepSch.textContent  = isZoom ? '03' : '04';
          if (stepNote) stepNote.textContent = isZoom ? '04' : '05';
        }
        function openAddressSearch() {
          function execDaum() {
            new daum.Postcode({
              oncomplete: function(data) {
                document.getElementById('kf-postcode').value = data.zonecode;
                document.getElementById('kf-address').value  = data.roadAddress || data.jibunAddress;
                document.getElementById('kf-address-detail').focus();
              }
            }).open();
          }
          if (window.daum && window.daum.Postcode) {
            execDaum();
          } else {
            var s = document.createElement('script');
            s.src = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
            s.onload = execDaum;
            document.head.appendChild(s);
          }
        }
        async function handleKickoffSubmit(e) {
          e.preventDefault();
          var form    = document.getElementById('kickoffForm');
          var success = document.getElementById('kickoffSuccess');

          _kickoffFormData = {};
          var fd = new FormData(form);
          var meetingTypeLabel = { visit: '인애드컴퍼니 방문', onsite: '방문 상담 요청', zoom: 'ZOOM 미팅' };
          var kLabelMap = {
            kf_name: '이름', kf_phone: '연락처',
            kf_email: '이메일', kf_company: '회사/브랜드명',
            meetingType: '미팅 방식', postcode: '우편번호', address: '기본 주소',
            addressDetail: '상세 주소', memberCount: '참여 인원',
            date1: '1순위 날짜', time1: '1순위 시간',
            date2: '2순위 날짜', time2: '2순위 시간',
            note: '사전 질문 / 궁금한 점'
          };
          var mailPayload = {};
          fd.forEach(function(val, key) {
            if (key === 'privacyAgree' || key === 'visitAddress') return;
            if (!val || val === '') return;
            var label = kLabelMap[key] || key;
            var displayVal = (key === 'meetingType') ? (meetingTypeLabel[val] || val) : val;
            _kickoffFormData[label] = displayVal;
            mailPayload[key] = displayVal;
          });
          var meetingType = fd.get('meetingType');
          if (meetingType === 'visit') {
            mailPayload.address = fd.get('visitAddress') || '';
            _kickoffFormData['기본 주소'] = mailPayload.address;
          } else if (meetingType === 'zoom') {
            delete mailPayload.address;
            delete mailPayload.addressDetail;
          }
          try {
            var response = await fetch('/api/mail/kickoff', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(mailPayload)
            });
            if (!response.ok) throw new Error('mail failed');
          } catch (err) {
            alert('접수 중 오류가 발생했습니다. 잠시 후 다시 시도하거나 전화로 문의해 주세요.');
            return false;
          }

          form.style.transition = 'opacity 0.3s ease';
          form.style.opacity = '0';
          setTimeout(function() {
            form.style.display = 'none';
            success.style.display = 'flex';
            success.style.animation = 'ctFormIn 0.5s ease forwards';
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }, 300);
          return false;
        }

        /* ── 작성 내용 보기 모달 ── */
        function openSubmitReviewModal(source) {
          var modal = document.getElementById('submit-review-modal');
          if (!modal) return;
          var body = document.getElementById('srm-body');
          var dataToShow = (source === 'kickoff') ? _kickoffFormData : _submittedFormData;
          if (body) {
            if (Object.keys(dataToShow).length) {
              var title = source === 'kickoff'
                ? '<div class="srm-source-title">미팅일정 신청 내용</div>'
                : '<div class="srm-source-title">문의 내용</div>';
              var rows = Object.entries(dataToShow).map(function(kv) {
                return '<div class="srm-row"><span class="srm-key">' + kv[0] + '</span><span class="srm-val">' + (kv[1] || '-') + '</span></div>';
              }).join('');
              body.innerHTML = title + rows;
            } else {
              body.innerHTML = '<p style="color:rgba(255,255,255,0.4);text-align:center;padding:24px 0">작성된 내용이 없습니다.</p>';
            }
          }
          modal.style.display = 'flex';
          document.body.style.overflow = 'hidden';
          requestAnimationFrame(function() { modal.classList.add('prv-open'); });
        }
        function closeSubmitReviewModal() {
          var modal = document.getElementById('submit-review-modal');
          if (!modal) return;
          modal.classList.remove('prv-open');
          setTimeout(function() { modal.style.display = 'none'; document.body.style.overflow = ''; }, 260);
        }

        /* ── 개인정보 모달 ── */
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
        document.addEventListener('keydown', function(e) {
          if (e.key === 'Escape') { closePrivacyModal(); closeSubmitReviewModal(); }
        });

        // ── 네이버 전환추적: 콘텐츠 조회(view_content) ──
        if (window.wcs) {
          if (!window.wcs_add) window.wcs_add = {};
          window.wcs_add['wa'] = 's_dcdf9038a76';
          wcs.trans({ type: 'view_content' });
        }

        // 전역 노출
        window.handleContactSubmit = handleContactSubmit;
        window.goToKickoff = goToKickoff;
        window.backFromKickoff = backFromKickoff;
        window.resetKickoffForm = resetKickoffForm;
        window.onMeetingTypeChange = onMeetingTypeChange;
        window.openAddressSearch = openAddressSearch;
        window.handleKickoffSubmit = handleKickoffSubmit;
        window.openSubmitReviewModal = openSubmitReviewModal;
        window.closeSubmitReviewModal = closeSubmitReviewModal;
        window.openPrivacyModal = openPrivacyModal;
        window.closePrivacyModal = closePrivacyModal;

        // ── admin API에서 개인정보 책임자 + FAQ 동적 로드 ──
        fetch('/api/admin/public/contact')
          .then(function(r) { return r.json(); })
          .then(function(data) {
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
    </div>{/* /svc-light */}
  </>
)
