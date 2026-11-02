// 인사이트 히어로: 회사소개·아워테크처럼 상단 구역 좌우 전체를 채우되, 글 목록이 바로 보이게 높이는 그 3분의 2쯤(1600x600 무대를 cover).
// 흐름: 뒤 배경으로 광고주 미팅 → PPT 브리핑 → 회의 → 교육 → 시장 분석 장면(AI 생성, 얼굴 없음)이 빠르게 바뀌고,
// 그 위로 실제 인사이트 글 제목들이 여러 줄 서로 반대 방향으로 흐르다가(숫자는 노랑) 느려진다. 마지막 장면이 흐려지며
// 가운데에 상자 없이 'IN AD COMPANY INSIGHT · 직접 해 보고 쓴 마케팅 기록'이 줄마다 올라온다. 뒤 제목들은 아주 천천히 계속 흐른다(처음으로 돌아가지 않음).
// 제목은 아래 TITLES(지금 글 목록, 예비용)로 그리고, 서버(main.tsx /insight)가 관리자에 등록된 최신 글 제목으로 ishTitles 를 바꿔 넣는다.
// 움직임은 insight-hero.js.

// 2026-11-02 기준 글 제목('—' 앞부분)
export const TITLES = [
  '테스트에서 잘 된 메타 광고 소재, 본 캠페인에 옮기면 효율이 떨어지는 이유 4가지',
  '메타 광고 소재 옮기기 판단표와 7일 기록 시트',
  '상세페이지 문구 점검 키트: 화장품·식품 광고 금지 표현과 AI 점검 명령문',
  '상세페이지에 무심코 쓰는 위험한 단어 10개, 올리기 전 체크리스트',
  '체험단·인플루언서·바이럴·검색광고, 지금 단계엔 뭐부터?',
  '파워링크 유입은 줄고 매출은 47% 늘어난 이유',
  '광고비 2.4배 늘려도 매출이 따라온 한 달',
  '인플루언서 단가, 릴스·스토리 얼마가 적정할까',
  '공동구매 수수료, 공구가 3만 원이면 브랜드에 얼마 남나',
  '광고대행사 고르는 법',
  '자사몰 리뷰 0개일 때 리뷰 이벤트보다 먼저 할 일',
  '블로그 임대·구매로 브랜드 블로그 시작해도 될까',
  '의료기기 체험단 블로그 리뷰, 어디까지 될까',
  '바이럴 마케팅 불법일까?',
  '인플루언서 마케팅 플랫폼 vs 대행사',
  '배송형 체험단 vs 방문형 체험단',
  '쿠팡 체험단 마케팅',
  '네이버·쿠팡 리뷰 마케팅 규칙 비교',
  '올리브영 마케팅 전략',
  '협찬과 PPL 차이',
]

// 글 제목 → 흐르는 줄에 쓸 짧은 제목('—' 앞부분)
export const shortTitle = (t: string) => t.split(' — ')[0].trim()

// 뒤 배경 장면(나오는 순서): 광고주 미팅, PPT 브리핑, 회의, 교육, 시장 분석. 2000x750, 보이는 얼굴은 흐리게 처리
const SCENES = ['s1', 's2', 's3', 's4', 's5']

export const InsightHero = () => (
  <div class="ish" aria-hidden="true" data-ish>
    <script type="application/json" id="ishTitles" dangerouslySetInnerHTML={{ __html: JSON.stringify(TITLES).replace(/</g, '\\u003c') }} />
    <div class="ish-stage" data-ish-stage>
      <div class="ish-bg" data-ish-bg>
        {SCENES.map((s, i) => <img class="ish-sc" src={`/static/insight-hero/${s}.webp`} alt="" width={2000} height={750} decoding="async" fetchpriority={i === 0 ? 'high' : 'auto'} data-ish-sc />)}
      </div>
      <div class="ish-shade"></div>
      <div class="ish-rows" data-ish-rows></div>
      <div class="ish-glow" data-ish-glow></div>
      <div class="ish-type">
        <p class="ish-eye" data-ish-l>IN AD COMPANY INSIGHT</p>
        <span class="ish-ln"><b data-ish-l>직접 해 보고 쓴</b></span>
        <span class="ish-ln"><b data-ish-l>마케팅 기록</b></span>
        <p class="ish-sub" data-ish-l>집행한 캠페인 사례와 광고 규칙, 바로 쓰는 체크리스트까지</p>
      </div>
    </div>
  </div>
)
