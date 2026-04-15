// ─────────────────────────────────────────────
//  인사이트 아티클 데이터
//  관리자가 여기에 글을 추가합니다.
//
//  category:
//    'content-strategy' : 콘텐츠 별 전략
//    'case-study'        : 실전 사례 (세부 카테고리 없음)
//
//  subCategory (content-strategy 전용):
//    'viral' | 'influencer' | 'seeding' | 'seo' | 'review' | 'oliveyoung' | 'ppl'
// ─────────────────────────────────────────────

export type InsightCategory = 'content-strategy' | 'case-study'

export type ContentSubCategory =
  | 'viral'
  | 'influencer'
  | 'seeding'
  | 'seo'
  | 'review'
  | 'oliveyoung'
  | 'ppl'

export const CONTENT_SUB_LABELS: Record<ContentSubCategory, string> = {
  viral:       '바이럴 마케팅',
  influencer:  '인플루언서 마케팅',
  seeding:     '시딩 캠페인',
  seo:         'SEO 마케팅',
  review:      '리뷰 마케팅',
  oliveyoung:  '올리브영 마케팅',
  ppl:         'PPL 마케팅',
}

export interface InsightArticle {
  id: string
  category: InsightCategory
  subCategory?: ContentSubCategory  // content-strategy 일 때만 사용
  title: string
  summary: string          // 썸네일에 보이는 한 줄 요약
  date: string             // 'YYYY-MM-DD'
  views: number
  thumbnail: string        // /static/insight/ 하위 이미지 경로 or 외부 URL
  tags: string[]           // 태그 (썸네일 좌상단 표시)
  content: string          // HTML 형식의 본문 (관리자 작성)
}

export const INSIGHT_ARTICLES: InsightArticle[] = [

  // ─── 실전 사례 ───────────────────────────────
  {
    id: 'hotdeal-sales-curve',
    category: 'case-study',
    title: '핫딜, 단 하루로 만드는 폭발적 판매 곡선 (Feat.실제 진행 사례)',
    summary: '핫딜 바이럴이 어떻게 하루 만에 폭발적 판매 곡선을 만들었는지, 실제 사례로 확인하세요.',
    date: '2025-08-25',
    views: 130,
    thumbnail: '/static/insight/hotdeal.png',
    tags: ['실전 사례'],
    content: `
<h2>대부분의 광고주는 "한 방에 매출을 끌어올릴 수 있는 방법 없을까요?"에 대한 고민을 한 번쯤은 하기 마련입니다.</h2>
<p>브랜딩은 장기적 접근이 필요하지만, 단기 성과가 필요한 시점에서는 즉각적인 매출 폭발이 중요한 과제입니다. 이때 가장 강력한 카드가 바로 핫딜 바이럴입니다. 그러나 이런 의문 또한 동시에 가지게 됩니다.</p>
<ul>
  <li>"정말 하루 만에 성과가 나올 수 있나요?"</li>
  <li>"혹시나 부정적인 여론이 생기면 어떡하죠?"</li>
</ul>
<p>오늘은 실제 사례를 기반으로 핫딜 바이럴이 어떻게 하루 만에 폭발적 판매 곡선을 만들었는지, 그리고 이를 통해 얻을 수 있는 인사이트를 짚어보겠습니다.</p>

<h2>실전 사례: 메모리폼 베개 캠페인</h2>
<h3>전략</h3>
<p>단순히 가격만 나열하는 것이 아니라, 공감대를 형성할만한 타깃 설정 <strong>"베개 누레질때까지 쓰는 뻔뻔이형들"</strong> + <strong>"가성비 메모리폼 배개 가져와봄 구존막아면 안환대 카페 아련것도 같이암"</strong> 형식으로 커뮤니티 감성 글쓰기를 활용했습니다.</p>

<h3>결과</h3>
<ul>
  <li>조회수 <strong>127,800</strong></li>
  <li>추천 <strong>99</strong> / 댓글 <strong>217</strong></li>
  <li>당일 판매 폭증 → 핫딜 랭킹 TOP 진입</li>
</ul>

<h2>핵심 인사이트</h2>
<ol>
  <li><strong>공감형 타이틀</strong>이 클릭률을 결정합니다. 광고처럼 보이지 않는 제목이 핵심입니다.</li>
  <li><strong>커뮤니티 특성 파악</strong>이 필수입니다. 각 커뮤니티마다 문체, 톤앤매너가 다릅니다.</li>
  <li><strong>타이밍 설계</strong>: 오전 10~11시 게시가 오후 구매 피크와 맞물릴 때 효과가 극대화됩니다.</li>
  <li><strong>후속 SEO 연계</strong>: 핫딜 이후 네이버 블로그·리뷰를 통한 검색 유입 설계가 장기 효과를 만듭니다.</li>
</ol>

<p>인애드컴퍼니는 단순 게시물 작성이 아닌, <strong>퍼널 전체를 설계</strong>합니다. 핫딜 → 검색 유입 → 리뷰 → 재구매로 이어지는 구조를 함께 만들어드립니다.</p>
`,
  },

  // ─── 콘텐츠 별 전략 — 바이럴 마케팅 ────────────
  {
    id: 'shortform-purchase-funnel',
    category: 'content-strategy',
    subCategory: 'viral',
    title: '숏폼이 바꾼 소비자 구매 여정',
    summary: '틱톡·릴스·쇼츠. 숏폼이 구매 퍼널을 어떻게 재편하고 있는지 분석합니다.',
    date: '2025-03-15',
    views: 214,
    thumbnail: '/static/insight/shortform.png',
    tags: ['바이럴 마케팅'],
    content: `
<h2>숏폼이 구매 퍼널을 바꿨습니다</h2>
<p>불과 3년 전까지만 해도 소비자 구매 여정은 <strong>검색 → 비교 → 구매</strong>의 선형 구조였습니다. 그러나 숏폼의 등장으로 이 구조가 완전히 재편되고 있습니다.</p>

<h2>숏폼 구매 퍼널의 특징</h2>
<ul>
  <li><strong>발견 → 즉시 구매</strong>: '내 피드에 뜬 제품'을 클릭 한 번으로 구매하는 패턴이 일반화</li>
  <li><strong>감정 트리거</strong>: 15초 안에 감정을 건드려야 스와이프를 멈춥니다</li>
  <li><strong>UGC(사용자 생성 콘텐츠) 확산</strong>: 브랜드 콘텐츠보다 실제 유저 영상이 3배 높은 구매 전환율</li>
</ul>

<h2>브랜드가 취해야 할 전략</h2>
<ol>
  <li>제품이 아닌 <strong>경험을 보여주는 숏폼</strong> 제작</li>
  <li>인플루언서 협업 시 <strong>자연스러운 일상 녹아들기</strong></li>
  <li>숏폼 → 링크 → 구매 페이지 <strong>원클릭 전환 구조</strong></li>
</ol>

<p>인애드컴퍼니는 숏폼 콘텐츠 기획부터 인플루언서 매칭, 구매 연결까지 전 과정을 설계합니다.</p>
`,
  },

  // ─── 콘텐츠 별 전략 — 커뮤니티/바이럴 ──────────
  {
    id: 'community-viral-strategy',
    category: 'content-strategy',
    subCategory: 'viral',
    title: '맘카페·커뮤니티 바이럴의 힘',
    summary: '광고가 통하지 않는 공간, 커뮤니티. 실제 소비자들이 모이는 공간에서 브랜드를 확산시키는 전략.',
    date: '2025-03-10',
    views: 189,
    thumbnail: '/static/insight/community.png',
    tags: ['바이럴 마케팅'],
    content: `
<h2>왜 커뮤니티 마케팅인가?</h2>
<p>맘카페, 디시인사이드, 보배드림, 클리앙 — 이 공간들의 공통점은 <strong>광고에 극도로 예민한 유저들</strong>이 모여 있다는 점입니다. 동시에, 한번 신뢰를 얻으면 <strong>자발적 추천이 폭발적으로 확산</strong>됩니다.</p>

<h2>커뮤니티별 공략 포인트</h2>
<ul>
  <li><strong>맘카페</strong>: 육아·생활 실용 정보로 접근, 감성 + 실용 균형</li>
  <li><strong>디시/에펨코리아</strong>: 유머·밈 활용, 자연스러운 커뮤니티 언어 사용</li>
  <li><strong>네이버 카페</strong>: 정보성 글 + 댓글 관리로 신뢰 구축</li>
</ul>

<h2>성공 사례</h2>
<p>뷰티 브랜드 A사: 맘카페 커뮤니티 바이럴 집행 후 <strong>2주 내 검색량 +840%</strong>, 월 매출 3배 증가</p>
`,
  },

]
