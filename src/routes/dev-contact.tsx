export const DevContactPage = () => (
  <>
    {/* ════════════════════════════════════════
        DEV-CONTACT PAGE — 개발 문의
    ════════════════════════════════════════ */}

    {/* ── HERO ── */}
    <section class="dct-hero">
      <canvas id="dctCanvas" class="dct-canvas"></canvas>
      <div class="dct-hero-inner container">
        <a href="/development" class="dct-back-btn">
          <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
            <path d="M19 12H5M11 6L5 12L11 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Development로 돌아가기
        </a>

        <div class="dct-hero-badges">
          <span class="dct-badge">
            <svg viewBox="0 0 24 24" fill="none" width="14" height="14">
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.8"/>
              <path d="M12 6v6l4 2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
            </svg>
            24시간 이내 응답
          </span>
          <span class="dct-badge">
            <svg viewBox="0 0 24 24" fill="none" width="14" height="14">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            무료 사전 상담
          </span>
          <span class="dct-badge">
            <svg viewBox="0 0 24 24" fill="none" width="14" height="14">
              <path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.8"/>
            </svg>
            전담 담당자 배정
          </span>
        </div>

        <h1 class="dct-hero-title">
          <span class="dct-hl">개발 문의하기</span>
        </h1>
        <p class="dct-hero-sub">마케팅 자동화 시스템 개발, 어떤 궁금증이든 편하게 남겨주세요.<br />24시간 이내 담당자가 직접 연락드립니다.</p>
      </div>
    </section>

    {/* ── MAIN ── */}
    <section class="dct-main">
      <div class="container dct-main-inner">

        {/* ── 사이드바 ── */}
        <aside class="dct-sidebar">

          {/* 연락처 카드 */}
          <div class="dct-info-card">
            <div class="dct-info-icon">
              <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.12 2.2 2 2 0 012.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.56-.56a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="dct-info-body">
              <span class="dct-info-label">대표 직통</span>
              <a href="tel:010-9186-9944" class="dct-info-value">010-9186-9944</a>
            </div>
          </div>

          <div class="dct-info-card">
            <div class="dct-info-icon">
              <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                <polyline points="22,6 12,13 2,6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="dct-info-body">
              <span class="dct-info-label">이메일</span>
              <a href="mailto:inadcompany@naver.com" class="dct-info-value">inadcompany@naver.com</a>
            </div>
          </div>

          <div class="dct-info-card">
            <div class="dct-info-icon">
              <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="1.8"/>
              </svg>
            </div>
            <div class="dct-info-body">
              <span class="dct-info-label">오시는 길</span>
              <span class="dct-info-value dct-info-value--sm">경기 안산시 단원구 고잔로 51<br />타워아이즈빌 2F, 204호</span>
            </div>
          </div>

          {/* 자동화 영역 */}
          <div class="dct-sidebar-section">
            <h3 class="dct-sidebar-title">개발 가능 영역</h3>
            <ul class="dct-area-list">
              <li>
                <span class="dct-area-dot"></span>
                마케팅 업무 자동화 시스템
              </li>
              <li>
                <span class="dct-area-dot"></span>
                데이터 수집 · 분석 대시보드
              </li>
              <li>
                <span class="dct-area-dot"></span>
                CRM · 고객 관리 자동화
              </li>
              <li>
                <span class="dct-area-dot"></span>
                SNS 콘텐츠 자동 발행
              </li>
              <li>
                <span class="dct-area-dot"></span>
                광고 성과 모니터링 툴
              </li>
              <li>
                <span class="dct-area-dot"></span>
                랜딩페이지 · 마이크로사이트
              </li>
              <li>
                <span class="dct-area-dot"></span>
                기타 맞춤형 개발
              </li>
            </ul>
          </div>

          {/* 운영 시간 */}
          <div class="dct-hours-card">
            <h3 class="dct-sidebar-title">운영 시간</h3>
            <div class="dct-hours-row">
              <span class="dct-hours-day">평일</span>
              <span class="dct-hours-time">09:00 – 18:00</span>
            </div>
            <div class="dct-hours-row">
              <span class="dct-hours-day">주말·공휴일</span>
              <span class="dct-hours-time dct-hours-off">이메일로 문의</span>
            </div>
            <p class="dct-hours-note">문의 접수는 24시간 가능합니다</p>
          </div>

        </aside>

        {/* ── 폼 영역 ── */}
        <div class="dct-form-wrap">
          <div class="dct-form-header">
            <h2 class="dct-form-title">개발 문의 폼</h2>
            <p class="dct-form-desc">아래 내용을 작성하시면 메일 앱으로 바로 전송됩니다.<br />빠른 상담을 원하신다면 전화 주세요.</p>
          </div>

          {/* 성공 화면 — 초기 숨김 */}
          <div class="dct-success" id="dctSuccess" style="display:none">
            <div class="dct-success-icon">
              <svg viewBox="0 0 24 24" fill="none" width="48" height="48">
                <circle cx="12" cy="12" r="10" stroke="#a78bfa" stroke-width="1.8"/>
                <path d="M8 12l3 3 5-6" stroke="#a78bfa" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h3 class="dct-success-title">메일 앱이 열렸습니다!</h3>
            <p class="dct-success-msg">작성된 내용이 메일 앱에 입력됩니다.<br />전송 후 24시간 이내 담당자가 연락드립니다.</p>
            <a href="/development" class="dct-success-back">Development로 돌아가기</a>
          </div>

          {/* 실제 폼 */}
          <form class="dct-form" id="dctForm" novalidate>

            {/* 기본 정보 */}
            <div class="dct-form-section">
              <h3 class="dct-fs-title">기본 정보</h3>
              <div class="dct-field-grid">
                <div class="dct-field">
                  <label class="dct-label" for="dctName">
                    이름 <span class="dct-req">*</span>
                  </label>
                  <input
                    type="text"
                    id="dctName"
                    name="name"
                    class="dct-input"
                    placeholder="홍길동"
                    required
                  />
                </div>
                <div class="dct-field">
                  <label class="dct-label" for="dctPhone">
                    연락처 <span class="dct-req">*</span>
                  </label>
                  <input
                    type="tel"
                    id="dctPhone"
                    name="phone"
                    class="dct-input"
                    placeholder="010-0000-0000"
                    required
                  />
                </div>
                <div class="dct-field">
                  <label class="dct-label" for="dctCompany">
                    회사명
                  </label>
                  <input
                    type="text"
                    id="dctCompany"
                    name="company"
                    class="dct-input"
                    placeholder="(주)인애드컴퍼니"
                  />
                </div>
                <div class="dct-field">
                  <label class="dct-label" for="dctEmail">
                    이메일
                  </label>
                  <input
                    type="email"
                    id="dctEmail"
                    name="email"
                    class="dct-input"
                    placeholder="example@company.com"
                  />
                </div>
              </div>
            </div>

            {/* 관심 서비스 */}
            <div class="dct-form-section">
              <h3 class="dct-fs-title">관심 있는 개발 영역 <span class="dct-req">*</span></h3>
              <p class="dct-fs-sub">해당하는 항목을 모두 선택해 주세요</p>
              <div class="dct-check-grid">
                <label class="dct-check-item">
                  <input type="checkbox" name="service" value="마케팅 업무 자동화" class="dct-checkbox" />
                  <span class="dct-check-box"></span>
                  <span class="dct-check-text">마케팅 업무 자동화</span>
                </label>
                <label class="dct-check-item">
                  <input type="checkbox" name="service" value="데이터 수집·분석 대시보드" class="dct-checkbox" />
                  <span class="dct-check-box"></span>
                  <span class="dct-check-text">데이터 수집·분석 대시보드</span>
                </label>
                <label class="dct-check-item">
                  <input type="checkbox" name="service" value="CRM·고객 관리 자동화" class="dct-checkbox" />
                  <span class="dct-check-box"></span>
                  <span class="dct-check-text">CRM·고객 관리 자동화</span>
                </label>
                <label class="dct-check-item">
                  <input type="checkbox" name="service" value="SNS 콘텐츠 자동 발행" class="dct-checkbox" />
                  <span class="dct-check-box"></span>
                  <span class="dct-check-text">SNS 콘텐츠 자동 발행</span>
                </label>
                <label class="dct-check-item">
                  <input type="checkbox" name="service" value="광고 성과 모니터링 툴" class="dct-checkbox" />
                  <span class="dct-check-box"></span>
                  <span class="dct-check-text">광고 성과 모니터링 툴</span>
                </label>
                <label class="dct-check-item">
                  <input type="checkbox" name="service" value="랜딩페이지·마이크로사이트" class="dct-checkbox" />
                  <span class="dct-check-box"></span>
                  <span class="dct-check-text">랜딩페이지·마이크로사이트</span>
                </label>
                <label class="dct-check-item">
                  <input type="checkbox" name="service" value="기타 맞춤형 개발" class="dct-checkbox" />
                  <span class="dct-check-box"></span>
                  <span class="dct-check-text">기타 맞춤형 개발</span>
                </label>
              </div>
            </div>

            {/* 현재 업무 상황 */}
            <div class="dct-form-section">
              <h3 class="dct-fs-title">현재 업무 상황</h3>
              <div class="dct-field">
                <label class="dct-label" for="dctCurrent">
                  현재 어떤 업무에서 불편함을 느끼시나요?
                </label>
                <textarea
                  id="dctCurrent"
                  name="current"
                  class="dct-textarea"
                  rows={3}
                  placeholder="예) 매일 수동으로 광고 성과를 엑셀에 정리하고 있어요. 보고서 작성에만 2시간씩 소요됩니다."
                ></textarea>
              </div>
            </div>

            {/* 문의 내용 */}
            <div class="dct-form-section">
              <h3 class="dct-fs-title">문의 내용 <span class="dct-req">*</span></h3>
              <div class="dct-field dct-field--textarea">
                <label class="dct-label" for="dctMessage">
                  개발 의뢰 내용을 자세히 적어주세요
                </label>
                <textarea
                  id="dctMessage"
                  name="message"
                  class="dct-textarea dct-textarea--lg"
                  rows={6}
                  maxlength={1000}
                  placeholder="원하시는 기능, 현재 사용 중인 툴·플랫폼, 참고 사례 등을 자유롭게 작성해 주세요."
                  required
                ></textarea>
                <div class="dct-char-counter">
                  <span id="dctCharCount">0</span> / 1000
                </div>
              </div>
            </div>

            {/* 예산 */}
            <div class="dct-form-section">
              <h3 class="dct-fs-title">예상 예산</h3>
              <div class="dct-radio-grid">
                <label class="dct-radio-item">
                  <input type="radio" name="budget" value="미정" class="dct-radio" defaultChecked />
                  <span class="dct-radio-box"></span>
                  <span class="dct-radio-text">미정</span>
                </label>
                <label class="dct-radio-item">
                  <input type="radio" name="budget" value="500만원 미만" class="dct-radio" />
                  <span class="dct-radio-box"></span>
                  <span class="dct-radio-text">500만원 미만</span>
                </label>
                <label class="dct-radio-item">
                  <input type="radio" name="budget" value="500만~1000만원" class="dct-radio" />
                  <span class="dct-radio-box"></span>
                  <span class="dct-radio-text">500만~1,000만원</span>
                </label>
                <label class="dct-radio-item">
                  <input type="radio" name="budget" value="1000만~3000만원" class="dct-radio" />
                  <span class="dct-radio-box"></span>
                  <span class="dct-radio-text">1,000만~3,000만원</span>
                </label>
                <label class="dct-radio-item">
                  <input type="radio" name="budget" value="3000만원 이상" class="dct-radio" />
                  <span class="dct-radio-box"></span>
                  <span class="dct-radio-text">3,000만원 이상</span>
                </label>
              </div>
            </div>

            {/* 개인정보 동의 */}
            <div class="dct-form-section dct-form-section--privacy">
              <label class="dct-privacy-label">
                <input type="checkbox" id="dctPrivacy" name="privacy" class="dct-checkbox" required />
                <span class="dct-check-box"></span>
                <span class="dct-privacy-text">
                  개인정보 수집 및 이용에 동의합니다. <span class="dct-req">*</span>
                  <em class="dct-privacy-detail">수집 항목: 이름, 연락처, 이메일 / 이용 목적: 상담 및 견적 안내 / 보유 기간: 3년</em>
                </span>
              </label>
            </div>

            {/* 제출 버튼 */}
            <div class="dct-submit-wrap">
              <button type="submit" class="dct-submit-btn" id="dctSubmitBtn">
                <span class="dct-submit-text">문의 메일 보내기</span>
                <svg class="dct-submit-arrow" viewBox="0 0 24 24" fill="none" width="18" height="18">
                  <path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <p class="dct-submit-note">버튼 클릭 시 메일 앱이 열립니다. 전송 후 담당자가 연락드립니다.</p>
            </div>

          </form>
        </div>
      </div>
    </section>

    {/* ── 인라인 스크립트 ── */}
    <script dangerouslySetInnerHTML={{ __html: `
(function() {
  /* ── 파티클 캔버스 ── */
  (function initCanvas() {
    var canvas = document.getElementById('dctCanvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var particles = [];
    var W, H;
    function resize() {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);
    for (var i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.5 + 0.5,
        a: Math.random() * 0.5 + 0.2
      });
    }
    function draw() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(function(p) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(167,139,250,' + p.a + ')';
        ctx.fill();
      });
      requestAnimationFrame(draw);
    }
    draw();
  })();

  /* ── 글자 수 카운터 ── */
  var msgEl = document.getElementById('dctMessage');
  var cntEl = document.getElementById('dctCharCount');
  if (msgEl && cntEl) {
    msgEl.addEventListener('input', function() {
      cntEl.textContent = msgEl.value.length;
    });
  }

  /* ── 폼 제출 (mailto) ── */
  var form = document.getElementById('dctForm');
  var successEl = document.getElementById('dctSuccess');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      /* 필수 검증 */
      var name    = (document.getElementById('dctName').value || '').trim();
      var phone   = (document.getElementById('dctPhone').value || '').trim();
      var message = (document.getElementById('dctMessage').value || '').trim();
      var privacy = document.getElementById('dctPrivacy').checked;
      var services = Array.from(document.querySelectorAll('input[name="service"]:checked')).map(function(el) { return el.value; });

      if (!name) { alert('이름을 입력해 주세요.'); return; }
      if (!phone) { alert('연락처를 입력해 주세요.'); return; }
      if (services.length === 0) { alert('관심 있는 개발 영역을 하나 이상 선택해 주세요.'); return; }
      if (!message) { alert('문의 내용을 입력해 주세요.'); return; }
      if (!privacy) { alert('개인정보 수집 및 이용에 동의해 주세요.'); return; }

      /* 폼 데이터 수집 */
      var company  = (document.getElementById('dctCompany').value || '').trim();
      var email    = (document.getElementById('dctEmail').value || '').trim();
      var current  = (document.getElementById('dctCurrent').value || '').trim();
      var budgetEl = document.querySelector('input[name="budget"]:checked');
      var budget   = budgetEl ? budgetEl.value : '미정';

      /* mailto 본문 구성 */
      var body = [
        '[개발 문의]',
        '',
        '■ 기본 정보',
        '이름: ' + name,
        '연락처: ' + phone,
        '회사명: ' + (company || '미입력'),
        '이메일: ' + (email || '미입력'),
        '',
        '■ 관심 개발 영역',
        services.join(', '),
        '',
        '■ 현재 업무 상황',
        (current || '미입력'),
        '',
        '■ 문의 내용',
        message,
        '',
        '■ 예상 예산',
        budget,
        '',
        '─────────────────────',
        '인애드컴퍼니 개발 문의 폼 제출'
      ].join('\n');

      var subject = '[개발문의] ' + name + ' (' + (company || phone) + ')';
      var mailtoUrl = 'mailto:inadcompany@naver.com'
        + '?subject=' + encodeURIComponent(subject)
        + '&body=' + encodeURIComponent(body);

      window.location.href = mailtoUrl;

      /* 성공 화면 전환 */
      setTimeout(function() {
        if (form && successEl) {
          form.style.display = 'none';
          successEl.style.display = 'flex';
          successEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 800);
    });
  }
})();
    `}} />
  </>
)
