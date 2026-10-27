import { estimateSection } from './svc-subscription-estimate'

/* ── 마퀴/서비스 공용 SVG 아이콘 (Lucide 기반, 단색 currentColor) ──
   이모지 대신 단색 SVG를 써서 OS별 렌더 편차를 없애고 톤을 통일한다. */
const svgIcon = (paths: any, extra?: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"
    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">{paths}{extra}</svg>
)

const ICONS: Record<string, any> = {
  viral: svgIcon(<><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></>),
  influencer: svgIcon(<><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>),
  seeding: svgIcon(<><path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/></>),
  seo: svgIcon(<><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></>),
  review: svgIcon(<><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></>),
  oliveyoung: svgIcon(<><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/></>),
  ppl: svgIcon(<><path d="M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3Z"/><path d="m6.2 5.3 3.1 3.9"/><path d="m12.4 3.4 3.1 4"/><path d="M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/></>),
  reviewPlan: svgIcon(<><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></>),
  reviewSimple: svgIcon(<><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></>),
  reviewPremium: svgIcon(<><path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"/><path d="M5 21h14"/></>),
  pointer: svgIcon(<><path d="M22 14a8 8 0 0 1-8 8"/><path d="M18 11v-1a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1"/><path d="M10 9.5V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v10"/><path d="M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></>),
  phone: svgIcon(<><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></>),
  // ── 서비스 키워드 칩용 아이콘 ──
  kwCoffee: svgIcon(<><path d="M10 2v2"/><path d="M14 2v2"/><path d="M6 2v2"/><path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"/></>),
  kwUsers: svgIcon(<><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>),
  kwShare: svgIcon(<><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></>),
  kwNews: svgIcon(<><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/></>),
  kwChart: svgIcon(<><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></>),
  kwFilter: svgIcon(<><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></>),
  kwUserCheck: svgIcon(<><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></>),
  kwBadge: svgIcon(<><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/></>),
  kwInsta: svgIcon(<><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></>),
  kwPin: svgIcon(<><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></>),
  kwSearch: svgIcon(<><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></>),
  kwPlay: svgIcon(<><polygon points="6 3 20 12 6 21 6 3"/></>),
  kwSparkle: svgIcon(<><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/></>),
  kwTrend: svgIcon(<><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></>),
  kwStar: svgIcon(<><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></>),
  kwGift: svgIcon(<><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/></>),
  kwTv: svgIcon(<><rect width="20" height="15" x="2" y="7" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/></>),
  kwFilm: svgIcon(<><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 3v18"/><path d="M3 7.5h4"/><path d="M3 12h18"/><path d="M3 16.5h4"/><path d="M17 3v18"/><path d="M17 7.5h4"/><path d="M17 16.5h4"/></>),
  kwEye: svgIcon(<><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></>),
  kwShield: svgIcon(<><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></>),
}

/* ── 후기 데이터 (기존 카드 내용 그대로) — 세로 컬럼 스크롤용 ── */
const TESTI = [
  { tag: 'Viral Marketing', body: '억지로 밀어붙이지 않았는데 사람들이 먼저 이야기하기 시작했어요. **브랜드 화제성이 이렇게 만들어지는구나** 처음 체감했습니다.', av: '김', name: '김○○ 대표', role: '셀비○' },
  { tag: 'Influencer Marketing', body: '브랜드에 딱 맞는 인플루언서를 골라주셔서 **협업 콘텐츠의 반응이 확실히 달랐습니다**.', av: '이', name: '이○○ CMO', role: '너즐○' },
  { tag: 'Data Insight', body: '인사이트 리포트를 받고 **마케팅 방향이 완전히 바뀌었습니다**. 데이터를 이렇게 해석해주는 파트너는 처음이에요.', av: '박', name: '박○○ 마케팅팀장', role: '핏펫○어' },
  { tag: 'Olive Young Marketing', body: '올리브영 입점 후 첫 달부터 리뷰가 쌓이기 시작했고, **몇 달 만에 채널 매출이 눈에 띄게 늘었습니다**.', av: '최', name: '최○○ 대표', role: '블라이○' },
  { tag: 'YouTube Marketing', body: '유튜브 영상 이후 **브랜드 검색량이 확연히 늘었어요**. 막연하던 인지도가 실제 검색으로 이어진 게 인상적이었습니다.', av: '정', name: '정○○ 마케터', role: '루시○이' },
  { tag: 'Seeding Campaign', body: '체험단으로 실사용 경험 콘텐츠를 확보했고, **전환율도 눈에 띄게 좋아졌어요**. 콘텐츠 퀄리티가 달랐습니다.', av: '윤', name: '윤○○ 팀장', role: '메디○라피' },
  { tag: 'Brand Strategy', body: '브랜드 포지셔닝 전략을 새로 수립하고 나서 **경쟁사 대비 인지도가 확연히 달라졌습니다**. 전략적 사고가 다릅니다.', av: '오', name: '오○○ 브랜드팀장', role: '좋은생○' },
  { tag: 'Community Viral', body: '커뮤니티 마케팅 이후 **브랜드 언급이 눈에 띄게 늘었습니다**. 콘텐츠의 힘을 체감했어요.', av: '서', name: '서○○ 마케터', role: '베베○' },
  { tag: 'PPL Campaign', body: 'PPL 콘텐츠가 프로그램에 잘 어울려 거부감이 없었습니다. **노출 대비 반응이 확실히 좋았어요**.', av: '문', name: '문○○ 콘텐츠팀장', role: '메가스○어' },
  { tag: 'Review Marketing', body: '리뷰 마케팅으로 브랜드 신뢰도가 올라갔습니다. **소비자들이 먼저 브랜드를 찾기 시작했어요**.', av: '임', name: '임○○ 대표', role: '탐정○' },
  { tag: 'IMC Strategy', body: '통합 마케팅 커뮤니케이션으로 모든 채널이 일관된 메시지를 전달했습니다. **브랜드 신뢰도가 눈에 띄게 올라갔어요**.', av: '조', name: '조○○ CMO', role: '제트○' },
  { tag: 'Viral Content', body: '콘텐츠 하나가 **예상보다 훨씬 멀리 퍼졌어요**. 기획부터 실행까지 믿고 맡길 수 있는 파트너였습니다.', av: '류', name: '류○○ 대표', role: '에스○피' },
]
/* **강조** 구간만 하이라이트로 렌더 */
const hlBody = (s: string) => s.split('**').map((seg, i) => (i % 2 ? <em class="testi-hl">{seg}</em> : seg))
const TCard = ({ t, dup }: { t: any; dup?: boolean }) => (
  <blockquote class="testi-card" aria-hidden={dup ? 'true' : undefined}>
    <span class="testi-tag">{t.tag}</span>
    <p class="testi-body">{hlBody(t.body)}</p>
    <footer class="testi-footer">
      <span class="testi-avatar" aria-hidden="true">{t.av}</span>
      <div class="testi-info"><strong>{t.name}</strong><span>{t.role}</span></div>
    </footer>
  </blockquote>
)
/* ── 홈 서비스 간략 데이터 (WHAT WE DO 간소화 — 텍스트 탭 선택형) ── */
// 홈 하단 '필요한 것은 무엇인가요?' 아래 마케팅팀 구독 견적 조합기(대표 결정 2026-10-27 — 목록·금액·신청서 전체).
// 조합기에는 구독 항목만 있으므로 범위를 도구 줄에 적고, 다른 서비스는 아래 '문의하기'로 받는다.
const HOME_ESTIMATE = estimateSection({
  id: 'homeEstimate', labelledBy: 'homeCtaTitle', source: 'home', className: 'mte-sec--home',
  intro: '마케팅팀 구독 견적 <a href="/marketing/subscription">자세히 보기</a>',
})

const HSVC = [
  { key: 'viral', en: 'Viral Marketing', ko: '바이럴 마케팅', desc: '검색해도 우리 브랜드 이야기가 없을 때', href: '/marketing/viral' },
  { key: 'performance', en: 'Performance Marketing', ko: '퍼포먼스 마케팅', desc: '네이버·구글·메타·카카오 광고 운영과 전환 분석', href: '/marketing/performance' },
  { key: 'influencer', en: 'Influencer & YouTube', ko: '인플루언서 · 유튜브 마케팅', desc: '어떤 크리에이터와 해야 할지 모르겠을 때', href: '/marketing/influencer' },
  { key: 'seeding', en: 'Seeding Campaign', ko: '체험단 마케팅', desc: '신제품인데 써본 사람이 없을 때', href: '/marketing/seeding' },
  { key: 'review', en: 'Customer Review', ko: '리뷰 마케팅', desc: '장바구니까지 왔다가 그냥 나갈 때', href: '/marketing/review' },
  { key: 'oliveyoung', en: 'Olive Young', ko: '올리브영 마케팅', desc: '입점은 했는데 그 다음이 막막할 때', href: '/marketing/oliveyoung' },
  { key: 'ppl', en: 'PPL', ko: 'PPL 마케팅', desc: '광고 티 내지 않고 각인시키고 싶을 때', href: '/marketing/ppl' },
]

export const HomePage = () => (
  <>
    {/* ============================================================
        HERO — 키네틱 타이포 영상(ver2 애니매틱 v17) 자동·반복 재생, 소리 없음
        큰 화면은 1280px 영상, 768px 이하는 가벼운 854px 영상.
        이전의 다크 공감 카피 슬라이드(2026-08~10)는 git 기록에 있다.
        ============================================================ */}
    <section class="hero-slider hero2--s2 hero-video-wrap" id="heroSlider">
      <h2 class="hero-video-title">Full Funnel Marketing Agency — IN AD COMPANY</h2>
      <video class="hero-video" id="heroVideo" autoplay muted loop playsinline preload="auto"
        poster="/static/hero/hero-kinetic-v17-poster.jpg" aria-label="인애드컴퍼니 소개 영상">
        <source src="/hero-video/hero-kinetic-v17.mp4" type="video/mp4" media="(min-width: 769px)" />
        <source src="/hero-video/hero-kinetic-v17-m.mp4" type="video/mp4" />
      </video>
      {/* 화면 밖으로 스크롤하면 멈추고, 돌아오면 이어서 재생(노트북 발열·배터리 절약).
          움직임 줄이기 설정을 켠 방문자에게는 첫 장면만 보여준다. */}
      <script dangerouslySetInnerHTML={{__html: `
(function(){
  var v = document.getElementById('heroVideo');
  if (!v) return;
  if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) {
    v.removeAttribute('autoplay'); v.pause(); return;
  }
  function play(){ var p = v.play(); if (p && p.catch) p.catch(function(){}); }
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function(es){
      es.forEach(function(e){ if (e.isIntersecting) play(); else v.pause(); });
    }, { threshold: 0.15 }).observe(v);
  } else { play(); }
  /* 뒤로가기 복원(bfcache)으로 돌아왔을 때 멈춰 있지 않게 */
  window.addEventListener('pageshow', function(e){ if (e.persisted) play(); });
})();
      `}} />
    </section>

    {/* ============ MARQUEE ============ */}
    <div class="marquee-band marquee-band--labeled">
      <div class="marquee-clients"><span>Clients</span></div>
      <div class="marquee-track marquee-track--fwd">
        {[
          { key: 'viral', text: '바이럴 마케팅', en: 'Viral Marketing', accent: false },
          { key: 'influencer', text: '인플루언서 · 유튜브 마케팅', en: 'Influencer & YouTube', accent: true },
          { key: 'seeding', text: '체험단 마케팅', en: 'Seeding Campaign', accent: false },
          { key: 'review', text: '고객 리뷰 마케팅', en: 'Customer Review', accent: true },
          { key: 'oliveyoung', text: '올리브영 마케팅', en: 'Olive Young', accent: false },
          { key: 'ppl', text: 'PPL 마케팅', en: 'PPL', accent: true },
          { key: 'viral', text: '바이럴 마케팅', en: 'Viral Marketing', accent: false },
          { key: 'influencer', text: '인플루언서 · 유튜브 마케팅', en: 'Influencer & YouTube', accent: true },
          { key: 'seeding', text: '체험단 마케팅', en: 'Seeding Campaign', accent: false },
          { key: 'review', text: '고객 리뷰 마케팅', en: 'Customer Review', accent: true },
          { key: 'oliveyoung', text: '올리브영 마케팅', en: 'Olive Young', accent: false },
          { key: 'ppl', text: 'PPL 마케팅', en: 'PPL', accent: true },
        ].map((item) => (
          <span class={`marquee-item${item.accent ? ' marquee-item--accent' : ''}`}>
            <span class="marquee-icon">{ICONS[item.key]}</span>
            <span class="marquee-ko">{item.text}</span>
            <span class="marquee-en">{item.en}</span>
            <span class="marquee-sep" aria-hidden="true"></span>
          </span>
        ))}
      </div>
    </div>

    {/* 마퀴를 '함께한 브랜드' 로고 흐름으로 교체 (로드 실패 시 서비스 키워드 유지) */}
    <script dangerouslySetInnerHTML={{__html: `
(function(){
  fetch('/api/admin/public/about')
    .then(function(r){ return r.json(); })
    .then(function(data){
      var keys = (data.logos || []).filter(function(k){ return k.indexOf('logo_') === 0; }).slice(0, 24);
      if (!keys.length) return;
      return Promise.all(keys.map(function(key){
        return fetch('/api/admin/logo/' + encodeURIComponent(key))
          .then(function(r){ return r.json(); })
          .then(function(res){ return res.dataUrl || null; })
          .catch(function(){ return null; });
      })).then(function(urls){
        var valid = urls.filter(Boolean);
        if (valid.length < 6) return;   // 너무 적으면 기존 키워드 유지
        var track = document.querySelector('.marquee-track--fwd');
        if (!track) return;
        var html = '';
        // 무한 루프용 2세트
        for (var s = 0; s < 2; s++) {
          valid.forEach(function(src){
            html += '<span class="marquee-item marquee-item--logo"><img src="' + src + '" alt="파트너 브랜드" class="marquee-logo-img" decoding="async"></span>';
          });
        }
        track.innerHTML = html;
      });
    })
    .catch(function(){});
})();
    `}} />

    {/* ══ 라이트 테마 콘텐츠 래퍼 (히어로/마퀴 제외) ══ */}
    <div class="svc-light">

    {/* ============ ① 해결 제시 — 답 (라이트) ============ */}
    <section class="section home-answer" id="homeAnswer">
      <div class="container">
        <div class="ans-editorial">
          <p class="ans-answer">고민의 답은, 이겁니다.</p>

          <p class="ans-punch">단순한 광고 상품 판매가 아니라,<br /><em class="ans-hl">마케팅의 본질<svg class="ans-scribble" viewBox="0 0 300 100" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="M 200 14 C 150 6, 80 8, 45 22 C 8 36, 6 66, 42 82 C 95 100, 210 100, 262 82 C 300 68, 298 34, 258 20 C 225 12, 170 12, 148 18" fill="none" stroke="var(--blue)" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke"/></svg></em>부터 파악하고 접근하는 것.</p>

          <p class="ans-bridge">인애드는 최소한, 아래 3가지 규칙을 우선시합니다.</p>

          <span class="ans-down" aria-hidden="true"></span>
        </div>
      </div>
      {/* 스크롤 진입 시 스태거 등장 + 마커 채움 + 연결선 (is-in 토글) */}
      <script dangerouslySetInnerHTML={{__html: `
(function(){
  var sec = document.getElementById('homeAnswer');
  if (!sec) return;
  if (!('IntersectionObserver' in window)) { sec.classList.add('is-in'); return; }
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){
      if (e.isIntersecting){ sec.classList.add('is-in'); io.disconnect(); }
    });
  }, { threshold: 0.4 });
  io.observe(sec);
})();
      `}} />
    </section>

    {/* ============ ①-b WHY IN AD — 차별점 (중앙 헤딩 + 좌우 교차 로우) ============ */}
    <section class="section home-why" id="homeWhy">
      <div class="container">
        <div class="why-rows">
          {[
            {
              title: '쌓인 데이터가, 다음 성과를 만듭니다',
              desc: '수많은 캠페인 데이터가 시스템에 축적됩니다. 매번 감으로 다시 시작하지 않고, 검증된 방식을 골라 노출이 아닌 매출로 이어지는 성과를 냅니다.',
              media: (
                <img src="/static/images/why-01.png?v=1" alt="" class="why-media-img" loading="lazy" />
              )
            },
            {
              title: '필요할 때, 늘 곁에',
              desc: '6시에 닫고 사라지는 대행사가 아닌, 자정까지 필요한 순간에 곁에 있습니다.',
              hours: '09:30 – 24:00',
              media: (
                <img src="/static/images/why-02.png?v=1" alt="" class="why-media-img" loading="lazy" />
              )
            },
            {
              title: '모든 브랜드를 시스템화',
              desc: '담당자가 자주 바뀌고 실무가 인수인계되지 않으면서, 했던 말을 또 하고 또 해야 했던 적 있으신가요? 인애드컴퍼니는 모든 브랜드를 시스템에 넣어 과거부터 현재까지를 연결하고, 모든 업무가 끊기지 않고 이어지게 합니다.',
              media: (
                <img src="/static/images/why-03.png?v=1" alt="" class="why-media-img" loading="lazy" />
              )
            },
          ].map((f, i) => (
            <div class="why-row">
              <div class="why-media why-media--photo">{f.media}</div>
              <div class="why-body">
                <span class="why-index">{`0${i + 1}`}</span>
                <h3 class="why-title">{f.title}</h3>
                <p class="why-desc">{f.desc}</p>
                {f.hours && (
                  <div class="why-hours">
                    <span class="why-hours-badge">
                      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/><path d="M12 7.5V12l3 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                      응대 가능 {f.hours}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        {/* 각 블록: 스크롤로 도착할 때 하나씩 떠오르며 등장 */}
        <script dangerouslySetInnerHTML={{__html: `
(function(){
  var rows = [].slice.call(document.querySelectorAll('#homeWhy .why-row'));
  if (!rows.length) return;
  if (!('IntersectionObserver' in window)) { rows.forEach(function(r){ r.classList.add('is-in'); }); return; }
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){
      if (e.isIntersecting){ e.target.classList.add('is-in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -30% 0px' });
  rows.forEach(function(r){ io.observe(r); });
})();
        `}} />
        <div class="why-cta-wrap">
          <a href="/contact" class="why-cta">
            <span>경험해보기</span>
            <svg class="why-cta-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>
          </a>
        </div>
      </div>
    </section>

    {/* ============ ② 서비스 간략 (WHAT WE DO 간소화) ============ */}
    <section class="section hsvc-section" id="services">
      <div class="container">
        <div class="section-head hsvc-head">
          <h2 class="sec-title"><em>마케팅</em>, 파는 게 전부일까요?</h2>
          <p class="sec-sub">스스로 말하게 하고 · 검색하게 하고 · 다시 찾게 하는,<br />브랜드가 <em class="hsvc-wave">회자되는 구조<svg class="hsvc-wave-line" viewBox="0 0 300 16" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="M2 9 Q 20 2, 38 9 T 74 9 T 110 9 T 146 9 T 182 9 T 218 9 T 254 9 T 290 9" fill="none" stroke="var(--blue)" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke"/></svg></em>를 인애드가 설계합니다.</p>
        </div>
        {/* 물결 밑줄: 헤더 진입 시 그려짐 */}
        <script dangerouslySetInnerHTML={{__html: `
(function(){
  var head = document.querySelector('.hsvc-head');
  if (!head) return;
  if (!('IntersectionObserver' in window)) { head.classList.add('is-in'); return; }
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){ if (e.isIntersecting){ head.classList.add('is-in'); io.disconnect(); } });
  }, { threshold: 0.6 });
  io.observe(head);
})();
        `}} />

        {/* 왼쪽 큰 SERVICE 라벨 */}
        <div class="hsvc-eyebrow"><span>SERVICE</span></div>

        {/* 텍스트 탭 — 서비스 선택 */}
        <div class="hsvc-tabs" id="hsvcTabs" role="tablist">
          {HSVC.map((c, i) => (
            <button
              type="button"
              class={`hsvc-tab${i === 0 ? ' active' : ''}`}
              role="tab"
              data-en={c.en}
              data-ko={c.ko}
              data-desc={c.desc}
              data-href={c.href}
              data-img={`/static/svc-images/${c.key}.png`}
              data-image-size={c.key === 'performance' ? '90% auto' : 'contain'}
            >{c.ko}</button>
          ))}
        </div>

        {/* 선택된 서비스 설명 패널 */}
        <div class="hsvc-panel" id="hsvcPanel">
          <div class="hsvc-panel-slide" id="hsvcPanelSlide">
            <div class="hsvc-panel-text">
              <span class="hsvc-panel-en" id="hsvcPanelEn">{HSVC[0].en}</span>
              <h3 class="hsvc-panel-name" id="hsvcPanelName">{HSVC[0].ko}</h3>
              <p class="hsvc-panel-desc" id="hsvcPanelDesc">{HSVC[0].desc}</p>
              <a class="hsvc-panel-link" id="hsvcPanelLink" href={HSVC[0].href}>자세히 보기 →</a>
            </div>
            <div class="hsvc-panel-img" id="hsvcPanelImg" style={`background-image:url('/static/svc-images/${HSVC[0].key}.png')`}></div>
          </div>
        </div>

        <script dangerouslySetInnerHTML={{__html: `
(function(){
  var tabs = [].slice.call(document.querySelectorAll('#hsvcTabs .hsvc-tab'));
  var slide = document.getElementById('hsvcPanelSlide');
  if (!tabs.length || !slide) return;
  var en = document.getElementById('hsvcPanelEn');
  var name = document.getElementById('hsvcPanelName');
  var desc = document.getElementById('hsvcPanelDesc');
  var link = document.getElementById('hsvcPanelLink');
  var img = document.getElementById('hsvcPanelImg');
  var curIdx = 0, animating = false;
  function swap(tab){
    en.textContent = tab.getAttribute('data-en');
    name.textContent = tab.getAttribute('data-ko');
    desc.textContent = tab.getAttribute('data-desc');
    link.href = tab.getAttribute('data-href');
    img.style.backgroundImage = "url('" + tab.getAttribute('data-img') + "')";
    img.style.backgroundSize = tab.getAttribute('data-image-size');
  }
  tabs.forEach(function(tab, i){
    tab.addEventListener('click', function(){
      if (animating || i === curIdx) return;
      animating = true;
      var forward = i > curIdx;            // 오른쪽 탭 = 앞으로
      curIdx = i;
      tabs.forEach(function(t){ t.classList.remove('active'); });
      tab.classList.add('active');
      // 나가기: 앞으로면 왼쪽으로, 뒤로면 오른쪽으로 밀려남
      slide.style.transition = 'transform .26s ease, opacity .26s ease';
      slide.style.transform = 'translateX(' + (forward ? '-42px' : '42px') + ')';
      slide.style.opacity = '0';
      setTimeout(function(){
        swap(tab);
        // 들어오기: 반대편에서 시작해 제자리로
        slide.style.transition = 'none';
        slide.style.transform = 'translateX(' + (forward ? '42px' : '-42px') + ')';
        void slide.offsetWidth;            // reflow
        slide.style.transition = 'transform .4s cubic-bezier(.16,1,.3,1), opacity .38s ease';
        slide.style.transform = 'translateX(0)';
        slide.style.opacity = '1';
        setTimeout(function(){ animating = false; }, 400);
      }, 260);
    });
  });
})();
        `}} />
      </div>
    </section>

    {/* ============ ③ 레퍼런스 — 대표 캠페인 ============ */}
    <section class="section home-refs-section" id="homeRefs">
      <div class="container">
        <div class="section-head">
          <h2 class="sec-title">Portfolio</h2>
          <p class="sec-sub">다양한 브랜드들과 함께 성공하고 있습니다</p>
        </div>
      </div>

      {/* 한 줄 좌측 흐름 — 컨테이너 밖 풀폭 */}
      <div class="refs-flow" id="refsFlow">
        <div class="refs-flow-track" id="refsFlowTrack"></div>
      </div>

      <div class="container">
        <div class="home-refs-more">
          <a href="/works" class="why-cta">
            <span>포트폴리오 전체 보기</span>
            <svg class="why-cta-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>
          </a>
        </div>
      </div>
      <script dangerouslySetInnerHTML={{__html: `
(function(){
  function esc(value){
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
  /*
   * 업로드된 로고 파일의 캔버스 여백은 브랜드마다 제각각이다.
   * 네 모서리의 배경색과 다른 실제 로고 픽셀만 찾아 잘라낸 뒤 표시하면
   * 이미지 파일의 중심이 아니라 '보이는 로고'의 중심이 카드 중앙에 온다.
   */
  window.fitPortfolioLogo = function(img){
    if (!img || img.dataset.logoFitted) return;
    img.dataset.logoFitted = '1';
    try {
      var nw = img.naturalWidth, nh = img.naturalHeight;
      if (!nw || !nh) return;
      var maxSide = 600;
      var scale = Math.min(1, maxSide / Math.max(nw, nh));
      var w = Math.max(1, Math.round(nw * scale));
      var h = Math.max(1, Math.round(nh * scale));
      var scan = document.createElement('canvas');
      scan.width = w; scan.height = h;
      var ctx = scan.getContext('2d', { willReadFrequently: true });
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, w, h);
      var pixels = ctx.getImageData(0, 0, w, h).data;
      var corners = [[0,0],[w-1,0],[0,h-1],[w-1,h-1]];
      var br = 0, bg = 0, bb = 0;
      corners.forEach(function(p){
        var i = (p[1] * w + p[0]) * 4;
        br += pixels[i]; bg += pixels[i+1]; bb += pixels[i+2];
      });
      br /= 4; bg /= 4; bb /= 4;
      var minX = w, minY = h, maxX = -1, maxY = -1;
      for (var y = 0; y < h; y++) for (var x = 0; x < w; x++) {
        var i = (y * w + x) * 4;
        var alpha = pixels[i+3];
        var distance = Math.abs(pixels[i]-br) + Math.abs(pixels[i+1]-bg) + Math.abs(pixels[i+2]-bb);
        if (alpha > 24 && distance > 48) {
          if (x < minX) minX = x; if (x > maxX) maxX = x;
          if (y < minY) minY = y; if (y > maxY) maxY = y;
        }
      }
      if (maxX < minX || maxY < minY) return;
      var pad = Math.max(4, Math.round(Math.max(maxX-minX, maxY-minY) * 0.06));
      minX = Math.max(0, minX-pad); minY = Math.max(0, minY-pad);
      maxX = Math.min(w-1, maxX+pad); maxY = Math.min(h-1, maxY+pad);
      var cropW = maxX-minX+1, cropH = maxY-minY+1;
      var out = document.createElement('canvas');
      out.width = cropW; out.height = cropH;
      var outCtx = out.getContext('2d');
      if (!outCtx) return;
      outCtx.drawImage(scan, minX, minY, cropW, cropH, 0, 0, cropW, cropH);
      /* 누끼: 배경색(모서리색)과 가까운 픽셀만 투명 처리 — 로고 원색 그대로 유지 */
      var od = outCtx.getImageData(0, 0, cropW, cropH);
      var op = od.data;
      for (var k = 0; k < op.length; k += 4) {
        var dd = Math.abs(op[k]-br) + Math.abs(op[k+1]-bg) + Math.abs(op[k+2]-bb);
        var a = (dd - 40) / 70;
        if (a < 0) a = 0; if (a > 1) a = 1;
        op[k+3] = Math.round(op[k+3] * a);
      }
      outCtx.putImageData(od, 0, 0);
      /* 규격 정규화: 600x300 캔버스에 면적 기준으로 스케일 — 로고마다 제각각인 비율 통일 */
      var NW = 600, NH = 300;
      var s = 262 / Math.sqrt(cropW * cropH);
      if (s * cropW > NW * 0.94) s = NW * 0.94 / cropW;
      if (s * cropH > NH * 0.82) s = NH * 0.82 / cropH;
      var norm = document.createElement('canvas');
      norm.width = NW; norm.height = NH;
      var nctx = norm.getContext('2d');
      if (!nctx) { img.src = out.toDataURL('image/png'); return; }
      nctx.imageSmoothingQuality = 'high';
      var dw = cropW * s, dh = cropH * s;
      var dx = (NW - dw) / 2, dy = (NH - dh) / 2;
      /* 가독성: 로고 실루엣을 흰색으로 만들어 12방향으로 찍어 화이트 아웃라인 형성 */
      var sil = document.createElement('canvas');
      sil.width = NW; sil.height = NH;
      var sctx = sil.getContext('2d');
      if (sctx) {
        sctx.drawImage(out, dx, dy, dw, dh);
        sctx.globalCompositeOperation = 'source-in';
        sctx.fillStyle = '#fff';
        sctx.fillRect(0, 0, NW, NH);
        var R = 6;
        for (var q = 0; q < 12; q++) {
          nctx.drawImage(sil, Math.cos(q * Math.PI / 6) * R, Math.sin(q * Math.PI / 6) * R);
        }
      }
      nctx.drawImage(out, dx, dy, dw, dh);
      img.src = norm.toDataURL('image/png');
    } catch(e) {
      /* CORS 등으로 픽셀을 읽을 수 없는 외부 이미지는 기존 contain 정렬 유지 */
    }
  };
  fetch('/api/admin/public/works')
    .then(function(r){ return r.json(); })
    .then(function(data){
      /* 대표이미지(cover) 있는 브랜드만 회전 — 플레이스홀더 카드 제거 */
      var eligible = (data.items || []).filter(function(it){ return it.cover && it.thumb; });
      var featured = eligible.filter(function(it){
        var rank = Number(it.featuredRank);
        return rank >= 1 && rank <= 8;
      }).sort(function(a,b){ return Number(a.featuredRank) - Number(b.featuredRank); });
      var items = (featured.length ? featured : eligible.slice(0, 8)).slice(0, 8);
      var track = document.getElementById('refsFlowTrack');
      if (!track || !items.length) return;
      function cardHtml(item){
        // 기본 이미지 = 프로젝트 대표이미지(cover). 아직 없으면 브랜드명 플레이스홀더.
        // 호버 = 흰 배경 + 브랜드 로고(thumb).
        var imgArea = item.cover
          ? '<div class="refs-card-img">'
            +'<img class="refs-card-cover" src="'+esc(item.cover)+'" alt="'+esc(item.brand)+' 캠페인 이미지" loading="lazy" decoding="async">'
          : '<div class="refs-card-img refs-card-img--ph"><span class="refs-card-ph">'+esc(item.brand)+'</span>';
        return '<article class="refs-flow-card">'
          + imgArea
          +'<div class="refs-card-hover"><img src="'+esc(item.thumb)+'" alt="'+esc(item.brand)+'" crossorigin="anonymous" loading="lazy" decoding="async" onload="fitPortfolioLogo(this)" onerror="if(this.crossOrigin!=null){this.crossOrigin=null;var s=this.src;this.src=s;}"></div>'
          +'</div>'
          +'<div class="wg-meta">'
          +'<span class="wg-brand">'+esc(item.brand)+'</span>'
          +'<p class="wg-tags-text">'+esc(item.services)+'</p>'
          +'</div></article>';
      }
      var html = '';
      // 선택 항목이 적어도 흐름이 끊기지 않도록 최소 4장으로 반복한 뒤 2세트 구성
      var flowItems = items.slice();
      while (flowItems.length < 4) flowItems = flowItems.concat(items);
      flowItems = flowItems.slice(0, Math.max(4, items.length));
      for (var s = 0; s < 2; s++) flowItems.forEach(function(item){ html += cardHtml(item); });
      track.innerHTML = html;
      track.style.setProperty('--dur', (flowItems.length * 6) + 's');
    })
    .catch(function(error){
      console.error('홈 포트폴리오를 불러오지 못했습니다.', error);
    });
})();
      `}} />
    </section>

    {/* ============ ④ 수치 — 신뢰 지표 ============ */}
    <section class="stats-section" id="homeStats">
      <div class="container">

        {/* 섹션 헤드 */}
        <div class="stats-head">
          <h2 class="stats-title">매년 더 많은 브랜드와 함께,<br />누적 성과를 쌓아가고 있습니다</h2>
        </div>

        {/* 누적 캠페인 성장 — 대표 수치 + 우상향 막대그래프 + 콜아웃 배지 (흰 카드) */}
        <div class="stats-growth">
          <div class="sg-headline">
            <span class="sg-eyebrow">누적 완료 캠페인</span>
            <div class="sg-num-wrap">
              <span class="stat-num-big sg-num" data-count="37000">0</span>
              <span class="stat-unit-big sg-unit">+</span>
            </div>
            <div class="sg-mini">
              <div class="sg-mini-item"><span class="sg-mini-num">1,520<i>+</i></span><span class="sg-mini-label">크리에이터 DB</span></div>
              <span class="sg-mini-div"></span>
              <div class="sg-mini-item"><span class="sg-mini-num">7<i>년+</i></span><span class="sg-mini-label">업계 경험</span></div>
              <span class="sg-mini-div"></span>
              <div class="sg-mini-item"><span class="sg-mini-num">50<i>+</i></span><span class="sg-mini-label">파트너 브랜드</span></div>
            </div>
          </div>
          <div class="sg-chart" aria-hidden="true">
            <div class="sg-callout">
              <span class="sg-callout-num">2019<i>년부터</i></span>
              <span class="sg-callout-txt">쌓아 온 캠페인</span>
            </div>
            {[
              { y: '2019', h: 4 }, { y: '2020', h: 7 }, { y: '2021', h: 12 }, { y: '2022', h: 19 },
              { y: '2023', h: 31 }, { y: '2024', h: 49 }, { y: '2025', h: 73 }, { y: '2026', h: 100 },
            ].map((b, i, arr) => (
              <div class="sg-col">
                <div class={`sg-bar${i === arr.length - 1 ? ' sg-bar--active' : ''}`} style={`height:${b.h}%`}></div>
                <span class="sg-year">{b.y}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>

    {/* ============ ⑤ 감성 영역 — 브랜드 신념 ============ */}
    <section class="section home-emotion" id="homeEmotion">
      <div class="container">
        <h2 class="hemo-line">우리는 광고를 만드는 회사가 아니라<br /><em class="hemo-hl">팔리는 이유<svg class="hemo-underline" viewBox="0 0 320 20" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="M6 12 C 74 4, 150 17, 212 10 C 262 4, 298 14, 314 9" fill="none" stroke="var(--blue)" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke"/></svg></em>를 만드는 회사입니다</h2>
        <p class="hemo-sub">숫자 뒤에 있는 사람의 마음까지 설계할 때,<br class="hemo-br-m" /> 마케팅은 비용이 아니라 자산이 됩니다.</p>
      </div>
      {/* 밑줄 그려지기 (섹션 진입 시) */}
      <script dangerouslySetInnerHTML={{__html: `
(function(){
  var sec = document.getElementById('homeEmotion');
  if (!sec) return;
  if (!('IntersectionObserver' in window)) { sec.classList.add('is-in'); return; }
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){ if (e.isIntersecting){ sec.classList.add('is-in'); io.disconnect(); } });
  }, { threshold: 0.55 });
  io.observe(sec);
})();
      `}} />
    </section>

    {/* ============ ⑥ TESTIMONIALS — 한 줄 무한 흐름 ============ */}
    <section class="testimonials-section">

      {/* ── 한 줄 좌측 무한 흐름 ── */}
      <div class="testi-flow">
        <div class="testi-flow-track" style="--dur:75s">
          {[...TESTI, ...TESTI].map((t, i) => <TCard t={t} dup={i >= TESTI.length} />)}
        </div>
      </div>
    </section>

    {/* ============ ⑦ 클로징 + 문의 CTA ============ */}
    <section class="home-cta" id="homeCta">
      <div class="cta-img-bg" aria-hidden="true" style="--cta-img:url('/static/images/cta-home.png')"></div>
      <div class="home-cta-bg">
        <div class="hcta-glow"></div>
        {/* 파티클 캔버스 */}
        <canvas id="ctaParticle" class="hcta-canvas"></canvas>
        {/* 글로우 오브 */}
        <div class="hcta-orb hcta-orb--1"></div>
        <div class="hcta-orb hcta-orb--2"></div>
      </div>
      <div class="container">
        <div class="home-cta-inner">
          <h2 class="hcta-title" id="homeCtaTitle">
            <span class="hcta-line hcta-line--1">지금 당신의 브랜드에</span>
            <em class="hcta-line hcta-line--2 shiny-text">필요한 것은 무엇인가요?</em>
          </h2>
          <p class="hcta-desc">
            어떤 채널부터 손대야 할지 모르겠다면, 그것부터 같이 정리합니다.<br />
            <span class="hcta-desc-sub">검색 → 발견 → 신뢰 → 구매 → 재방문, 퍼널 전 단계를 함께 봅니다.</span>
          </p>
        </div>
        <div dangerouslySetInnerHTML={{ __html: HOME_ESTIMATE }} />
        {/* 구독 밖 서비스(인플루언서·PPL·올리브영 등) 문의 */}
        <div class="hcta-other">
          <p>인플루언서·PPL·올리브영 등 다른 서비스가 필요하다면</p>
          <div class="hcta-btns">
            <a href="/contact" class="hero2-cta">문의하기</a>
          </div>
        </div>
      </div>
    </section>
    <link rel="stylesheet" href="/static/estimate.css?v=20261027b" />
    <script src="/static/estimate.js?v=20261027c" defer></script>

    {/* ============ HOME PAGE — 인터랙티브 JS (외부 파일로 분리, JSX < > 파싱 에러 방지) ============ */}
    <script src="/static/home.js?v=20260715" />

    </div>{/* /svc-light */}
  </>
)
