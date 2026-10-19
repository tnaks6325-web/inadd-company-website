import { RefSection } from './svc-performance-ref'
const media = [
  { id: 'naver', name: '네이버', en: 'NAVER', title: '검색·쇼핑 광고', desc: '상품과 서비스를 찾는 검색어를 선별하고, 키워드·상품별 전환 실적에 맞춰 입찰과 예산을 조정합니다.', products: ['파워링크', '쇼핑검색', '브랜드검색', '플레이스', 'GFA'], work: ['검색어 분석 및 비효율 키워드 제외', '상품·카테고리별 입찰 관리', '캠페인별 예산 배분'] },
  { id: 'google', name: '구글', en: 'Google', title: '검색·디스플레이 광고', desc: '검색 광고와 디스플레이 캠페인을 운영하고, 전환 데이터를 기준으로 타겟과 소재 조합을 테스트합니다.', products: ['검색', '디스플레이', '디맨드젠', 'Performance Max'], work: ['전환 목표에 맞는 캠페인 구성', '잠재고객·소재별 성과 분석', '전환 실적에 따른 예산 조정'] },
  { id: 'meta', name: '메타', en: 'Meta', title: 'SNS·리드 광고', desc: '피드·스토리·릴스에 맞는 광고 소재를 제작합니다. 타겟과 메시지를 나눠 테스트하고 구매·문의 실적을 확인합니다.', products: ['피드', '스토리', '릴스', '리드 광고'], work: ['타겟별 캠페인 운영', '이미지·카피·CTA 테스트', '저효율 소재 교체'] },
  { id: 'kakao', name: '카카오', en: 'kakao', title: '디스플레이·CRM 광고', desc: '브랜드의 고객군과 프로모션 일정에 맞춰 광고와 메시지를 운영하고, 반응과 전환 결과를 분석합니다.', products: ['비즈보드', '디스플레이', 'CRM 광고'], work: ['고객군별 타겟 설정', '프로모션별 소재·메시지 구성', '광고 반응과 전환 실적 점검'] },
]
const Arrow = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>
const Check = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m5 12 4 4L19 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>

export const SvcPerformancePage = () => (
  <div class="pm-page">
    <link rel="stylesheet" href="/static/performance.css" />
    <link rel="stylesheet" href="/static/performance-ref.css?v=20261014a" />
    <section class="vh-hero vh-hero--photo pm-hero">
      <div class="vh-photo-bg" aria-hidden="true" style="--hero-photo:url('/static/mkt-images/hero_im.png')"></div>
      <div class="container vh-inner">
        <a href="/#services" class="svc-back-link vh-back">← 서비스 전체보기</a>
        <h1 class="vh-title"><span class="vh-tline">매출과 문의를 늘리는</span><span class="vh-tline"><span class="vh-hl">퍼포먼스 마케팅</span></span></h1>
        <div class="vh-sub-wrap">
          <p class="vh-sub">네이버·구글·메타·카카오 광고를 운영합니다.</p>
          <p class="vh-sub">전환 추적부터 광고 소재 제작, 성과 분석까지 함께 관리합니다.</p>
        </div>
        <div class="vh-btns">
          <a href="/contact" class="vh-cta-btn" data-pm-contact>문의하기 <Arrow /></a>
          <a href="#pm-media" class="vh-scroll-btn">서비스 보기 ↓</a>
        </div>
      </div>
    </section>
    <div class="svc-light">
      <nav class="pm-section-nav" aria-label="퍼포먼스 마케팅 안내"><div class="container">
        <a href="#pm-media">운영 매체</a><a href="#pm-reference">성과 사례</a><a href="#pm-scope">제공 서비스</a><a href="#pm-terms">운영 조건</a><a href="#pm-process">진행 절차</a><a href="#pm-faq">자주 하는 질문</a>
      </div></nav>

      <section class="pm-section" id="pm-media">
        <div class="container">
          <div class="section-head"><span class="sec-label">Media</span><h2 class="sec-title">주요 광고 매체<br /><em>통합 운영</em></h2><p class="sec-sub">업종과 광고 목표, 예산에 맞춰 집행 매체를 제안합니다.</p></div>
          <div class="pm-media-grid">
            {media.map(m => <a class={'pm-media-card pm-media-card--' + m.id} href="#pm-scope" key={m.id}>
              <div class="pm-media-card-image" aria-hidden="true"><span class="pm-card-mark">{m.en}</span><span class="pm-card-line"></span><span class="pm-card-dot"></span></div>
              <div class="pm-media-card-copy"><span class="pm-caption">{m.en} ADS</span><h3>{m.title}</h3><p>{m.desc}</p><span class="pm-card-link">운영 범위 보기 <Arrow /></span></div>
            </a>)}
          </div>
        </div>
      </section>

      <RefSection />

      <section class="pm-section pm-soft" id="pm-scope">
        <div class="container">
          <div class="section-head"><span class="sec-label">Service</span><h2 class="sec-title">광고 집행에 필요한<br /><em>실무를 함께합니다</em></h2><p class="sec-sub">매체 운영, 데이터 분석, 소재 제작을 한 팀에서 관리합니다.</p></div>
          <div class="pm-feature">
            <div class="pm-feature-copy"><span class="pm-number">01</span><h3>전환 추적과<br />고객 행동 분석</h3><p>GA4·GTM을 설치하고 구매·문의·회원가입 등 주요 행동을 측정합니다. 유입 경로와 이탈 구간을 분석해 광고 및 랜딩페이지 개선안을 제안합니다.</p><ul class="pm-checks"><li><Check />GA4·GTM 기본 설치 지원</li><li><Check />핵심 전환 이벤트 설정 및 수집 확인</li><li><Check />유입 채널·기기·페이지별 성과 분석</li></ul></div>
            <div class="pm-funnel"><div class="pm-funnel-head"><b>구매 전환 분석</b><span>GA4 · GTM</span></div><ol>{[['유입', '어떤 광고에서 방문했는가'], ['상품 조회', '어떤 상품을 살펴봤는가'], ['장바구니', '구매 전 어떤 행동을 했는가'], ['결제·구매', '어느 단계에서 이탈했는가']].map(([a,b],i) => <li key={a}><span class="pm-funnel-step">{String(i+1).padStart(2,'0')}</span><b>{a}</b><span>{b}</span></li>)}</ol><p>구매형 사이트의 분석 예시입니다. 서비스에 따라 문의·상담을 전환 목표로 설정합니다.</p></div>
          </div>
          <div class="pm-feature pm-feature-reverse">
            <div class="pm-creative"><div class="pm-creative-art"><img src="/static/svc-images/performance.png" width="1872" height="1248" loading="lazy" alt="광고 성과 분석과 타겟팅을 표현한 3D 일러스트" /></div><div class="pm-creative-stages"><span>소재 제작</span><Arrow /><span>광고주 확인</span><Arrow /><span>집행·교체</span></div></div>
            <div class="pm-feature-copy"><span class="pm-number">02</span><h3>광고 소재 제작과<br />효율 관리</h3><p>보유한 제품·브랜드 이미지로 매체 규격에 맞는 광고 소재를 제작합니다. 이미지와 문구별 반응을 비교하고, 성과가 낮은 소재는 교체합니다.</p><ul class="pm-checks"><li><Check />배너·카드뉴스 등 매체별 소재 제작</li><li><Check />프로모션에 맞는 카피와 CTA 구성</li><li><Check />체험단·리뷰 콘텐츠의 광고 소재 활용</li></ul><p class="pm-note">기본 제작 기간은 영업일 2~3일이며, 월 제작 수량과 수정 범위는 사전에 협의합니다. 콘텐츠 활용 시 광고 사용 권한을 확인합니다.</p></div>
          </div>
          <div class="pm-report"><div><span class="pm-number">03</span><h3>성과 보고와 운영 협의</h3><p>집행 결과와 조정 사항을 정리해 공유합니다.</p></div><dl><div><dt>일간 보고</dt><dd>전일 성과, 소재·타겟별 반응, 예산 소진 현황</dd></div><div><dt>수시 공유</dt><dd>운영시간 내 광고 현황 확인 및 요청사항 대응</dd></div><div><dt>월간 보고</dt><dd>월별 성과와 주요 이슈, 다음 달 운영 계획</dd></div></dl></div>
        </div>
      </section>

      <section class="pm-section" id="pm-terms">
        <div class="container">
          <div class="section-head"><span class="sec-label">Management</span><h2 class="sec-title">운영 조건</h2><p class="sec-sub">담당 광고주 수를 제한해 계정별 관리 시간을 확보합니다.</p></div>
          <div class="pm-term-grid">
            <article><span>운영 수수료</span><strong>8–10<small>%</small></strong><p>광고 규모·운영 범위에 따라 협의</p></article>
            <article><span>담당자별 광고주</span><strong>최대 3<small>개</small></strong><p>광고주별 전담 관리</p></article>
            <article><span>정기 미팅</span><strong>월 최대 4<small>회</small></strong><p>운영 현황과 개선 사항 협의</p></article>
          </div>
          <div class="pm-budget"><b>월 광고비 300만원 이상 · 최소 3개월 운영</b><p>수수료 산정 기준, 소재 제작 수량, 미팅·보고 범위는 상담 후 제안서에 안내합니다.</p></div>
        </div>
      </section>

      <section class="pm-section pm-soft" id="pm-process">
        <div class="container"><div class="section-head"><span class="sec-label">Process</span><h2 class="sec-title">퍼포먼스 마케팅<br /><em>진행 프로세스</em></h2></div>
          <ol class="pm-timeline">{[
            ['상담·계정 진단', '업종, 목표, 광고 예산을 확인하고 기존 계정의 구조·타겟·소재·예산 소진 현황을 점검합니다.'],
            ['운영안 제안', '집행 매체, 전환 목표, 예산 배분과 운영 범위를 제안하고 세부 조건을 협의합니다.'],
            ['광고 집행 준비', '전환 추적을 설정하고 캠페인과 소재를 준비합니다. 광고주 확인 후 집행합니다.'],
            ['성과 분석·개선', '성과를 보고하고 입찰, 타겟, 예산과 소재를 조정합니다. 정기 미팅에서 다음 운영 계획을 협의합니다.'],
          ].map(([title,desc],i) => <li key={title}><span class="pm-timeline-number">{String(i+1).padStart(2,'0')}</span><div><h3>{title}</h3><p>{desc}</p></div></li>)}</ol>
        </div>
      </section>

      <section class="pm-section" id="pm-faq"><div class="container"><div class="section-head"><span class="sec-label">FAQ</span><h2 class="sec-title">자주 하는 질문</h2></div><div class="pm-faq">
        {[
          ['기존 광고 계정도 무료로 진단할 수 있나요?', '네. 공유 가능한 계정 정보를 바탕으로 캠페인 구조, 타겟 설정, 소재 효율, 예산 소진을 점검하고 개선 방향을 제안합니다.'],
          ['GA4·GTM 설치 비용이 따로 있나요?', '기본 설치와 주요 전환 이벤트 설정을 무료로 지원합니다. 사이트 구조와 접근 권한을 먼저 확인하며, 별도 개발이 필요한 항목은 범위를 협의합니다.'],
          ['광고 소재를 직접 준비해야 하나요?', '제품·브랜드 이미지를 전달해 주시면 매체 규격에 맞춰 소재를 제작합니다. 제작 수량과 수정 범위는 계약 전에 정합니다.'],
          ['모든 매체를 한 번에 운영해야 하나요?', '아닙니다. 업종과 예산, 목표에 맞는 매체를 선택하고 성과에 따라 확대 여부를 결정합니다.'],
        ].map(([q,a]) => <details key={q}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}
      </div></div></section>

      <section class="pm-contact"><div class="container"><div><h2>광고 계정<br /><em>무료 진단</em></h2><p>운영 중인 매체와 광고 예산, 개선하고 싶은 점을 알려주세요.<br />담당자가 확인 후 연락드립니다.</p><a class="vh-cta-btn" href="/contact" data-pm-contact>문의하기 <Arrow /></a></div><img src="/static/svc-images/performance.png" width="1872" height="1248" loading="lazy" alt="" /></div></section>
    </div>
    <script dangerouslySetInnerHTML={{ __html: `
      (function () {
        var tabs = Array.from(document.querySelectorAll('.pm-media-tabs [role="tab"]'));
        function activate(tab) {
          tabs.forEach(function (item) {
            var selected = item === tab;
            item.setAttribute('aria-selected', String(selected));
            item.tabIndex = selected ? 0 : -1;
            document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
          });
        }
        tabs.forEach(function (tab, index) {
          tab.addEventListener('click', function () { activate(tab); });
          tab.addEventListener('keydown', function (event) {
            var next = index;
            if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % tabs.length;
            else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index + tabs.length - 1) % tabs.length;
            else if (event.key === 'Home') next = 0;
            else if (event.key === 'End') next = tabs.length - 1;
            else return;
            event.preventDefault(); activate(tabs[next]); tabs[next].focus();
          });
        });
        document.querySelectorAll('[data-pm-contact]').forEach(function (link) {
          link.addEventListener('click', function (event) {
            if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0 || !window.openContactModal) return;
            event.preventDefault(); event.stopPropagation(); window.openContactModal();
            var field = document.querySelector('#cmodal input[name="service"][value="퍼포먼스 마케팅"]');
            if (field) field.checked = true;
          });
        });
      })();
    ` }} />
  </div>
)
