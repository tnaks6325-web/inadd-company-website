// 포트폴리오 히어로(한 바퀴 약 13.4초): '마케팅이 하나씩 더해지며 한 브랜드가 커지는 과정' — 가상 브랜드 물결랩 히알루 세럼의 예시 시나리오.
// ① 브랜드 메시지(회의실: 페르소나 카드 → 화이트보드 빈 칸에 핵심 카피) → ② 체험단·리뷰(리뷰어가 세럼을 찍음 → 후기·별점) →
// ③ 바이럴·커뮤니티(커뮤니티 글에 댓글 → 핫딜) → ④ 인플루언서(링라이트 앞 촬영 → 릴스 조회수) → ⑤ 광고(네이버·구글·인스타그램 → 구매 전환) →
// ⑥ 올리브영·PPL(드라마 속 세럼 → 올리브영 온라인몰 랭킹 1위) → 결과(출고 현장 위로 월 매출 계단이 화면 가득, 단계 이름이 계단마다).
// 화면 오른쪽 아래 '월 매출' 계단 그래프가 계속 떠 있고, 단계가 끝날 때마다 한 칸씩 오른다(예시 숫자, '예시 시나리오' 표기 — 실제 성과 아님).
// 인물·장소는 AI 가상(nano_banana_pro: meet 77c9fc63, review d63e8c23, influencer d521492d, drama 0320f16d, ship f2072308, 세럼은 리뷰 페이지 prod-b 기준).
// 실제 올리브영 매장·방송사·플랫폼 로고는 쓰지 않는다. 대가·협찬 표시 문구 금지. 움직임은 works-hero.js.
const V = '/static/works-hero/'

// 월 매출 계단(예시, 단위 만 원)
export const STEPS = [
  { k: '브랜드 메시지', v: 800, t: '800만' },
  { k: '체험단·리뷰', v: 1500, t: '1,500만' },
  { k: '바이럴', v: 3200, t: '3,200만' },
  { k: '인플루언서', v: 6000, t: '6,000만' },
  { k: '광고', v: 12000, t: '1.2억' },
  { k: '올리브영·PPL', v: 30000, t: '3억' },
]

const Chip = ({ n, k }: { n: number; k: string }) => <p class="wkh-chip" data-wkh-chip><span>STEP {n}</span>{k}</p>

export const WorksHero = () => (
  <div class="wkh" aria-hidden="true" data-wkh>
    <div class="wkh-stage">
      {/* ① 브랜드 메시지 */}
      <div class="wkh-scn" data-wkh-scn>
        <div class="wkh-cut" data-wkh-cut style={`background-image:url(${V}meet.webp)`}>
          <p class="wkh-copy" data-wkh-copy><span>하루 종일 건조한 사무실,</span><span>물결랩 한 방울</span></p>
        </div>
        <Chip n={1} k="브랜드 메시지" />
        <div class="wkh-ov wkh-persona" data-wkh-ov>
          <p class="wkh-ov-h">페르소나</p>
          <b>29세 사무직 직장인</b>
          <ul><li>오후만 되면 당기는 피부</li><li>퇴근 후 3분 스킨케어</li><li>성분보다 후기를 먼저 봄</li></ul>
        </div>
      </div>

      {/* ② 체험단·리뷰 */}
      <div class="wkh-scn" data-wkh-scn>
        <div class="wkh-cut" data-wkh-cut style={`background-image:url(${V}review.webp)`} />
        <Chip n={2} k="체험단·리뷰" />
        <div class="wkh-ov wkh-reviews" data-wkh-ov>
          <p class="wkh-ov-h">물결랩 히알루 세럼 후기</p>
          <p class="wkh-star"><b>★ 4.8</b><span>후기 <u data-wkh-cnt="326">0</u>개</span></p>
          {['건조한 사무실에서 하루 버텨요', '한 방울로 속당김이 사라짐', '재구매 3번째예요'].map(s => <p class="wkh-rv" data-wkh-pop>{s}</p>)}
        </div>
      </div>

      {/* ③ 바이럴·커뮤니티 */}
      <div class="wkh-scn wkh-scn--ui" data-wkh-scn>
        <Chip n={3} k="바이럴·커뮤니티" />
        <div class="wkh-post" data-wkh-ov>
          <p class="wkh-post-h"><span>뷰티 커뮤니티</span><small>자유게시판</small></p>
          <b class="wkh-post-t">물결랩 세럼 써 보신 분? 건성인데 고민 중이에요</b>
          {[['피부결맘', '저 3통째예요. 사무실에서 진짜 덜 당겨요'], ['오늘도출근', '후기 보고 샀는데 만족합니다'], ['건성인간', '지금 핫딜 떴어요!']].map(([a, b]) => <p class="wkh-cm" data-wkh-pop><b>{a}</b>{b}</p>)}
        </div>
        <div class="wkh-deal" data-wkh-deal><i style={`background-image:url(${V}serum.webp)`} /><span><small>핫딜</small><b>물결랩 히알루 세럼 30ml</b><em>22% · 21,840원</em></span></div>
      </div>

      {/* ④ 인플루언서 */}
      <div class="wkh-scn" data-wkh-scn>
        <div class="wkh-cut" data-wkh-cut style={`background-image:url(${V}influencer.webp)`} />
        <Chip n={4} k="인플루언서" />
        <div class="wkh-ov wkh-reel" data-wkh-ov>
          <p class="wkh-ov-h">릴스 · 건성 피부 출근 전 루틴</p>
          <p class="wkh-reel-n"><span>조회수</span><b><u data-wkh-cnt="48">0</u>만</b></p>
          <p class="wkh-reel-s"><span>저장 <u data-wkh-cnt="12400">0</u></span><span>공유 <u data-wkh-cnt="3100">0</u></span></p>
        </div>
      </div>

      {/* ⑤ 광고 */}
      <div class="wkh-scn wkh-scn--ui" data-wkh-scn>
        <Chip n={5} k="광고" />
        <div class="wkh-ads">
          {[['네이버 검색', '세럼 추천'], ['구글 영상', '건성 루틴'], ['인스타그램', '피드 광고']].map(([a, b], i) => (
            <div class="wkh-ad" data-wkh-pop>
              <p><b>{a}</b><small>{b}</small></p>
              <i style={`background-image:url(${V}serum.webp)`} />
              <span>구매 전환 <u data-wkh-cnt={[212, 148, 296][i]}>0</u>건</span>
            </div>
          ))}
        </div>
      </div>

      {/* ⑥ 올리브영·PPL */}
      <div class="wkh-scn" data-wkh-scn>
        <div class="wkh-cut" data-wkh-cut style={`background-image:url(${V}drama.webp)`} />
        <Chip n={6} k="올리브영·PPL" />
        <div class="wkh-ov wkh-oy" data-wkh-ov>
          <p class="wkh-ov-h">올리브영 온라인몰 · 스킨케어 랭킹</p>
          <p class="wkh-oy-r"><b>1</b><span>위</span><i style={`background-image:url(${V}serum.webp)`} /><small>물결랩 히알루 세럼</small></p>
        </div>
      </div>

      {/* 결과: 출고 현장 */}
      <div class="wkh-scn" data-wkh-scn>
        <div class="wkh-cut" data-wkh-cut style={`background-image:url(${V}ship.webp)`} />
        <div class="wkh-dim" data-wkh-dim />
      </div>

      {/* 월 매출 계단(예시): 오른쪽 아래 작은 카드 → 결과에서 화면 가득 */}
      <div class="wkh-chart" data-wkh-chart>
        <p class="wkh-chart-h"><b>월 매출</b><span>예시 시나리오</span><em data-wkh-big>마케팅을 더할 때마다 한 칸씩</em></p>
        <div class="wkh-steps">
          {STEPS.map(s => (
            <div class="wkh-st" data-wkh-st data-v={s.v}>
              <small>{s.t}</small><i /><span>{s.k}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
)
