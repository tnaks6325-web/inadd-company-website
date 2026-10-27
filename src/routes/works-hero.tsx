// 포트폴리오 히어로(한 바퀴 약 13.4초): '마케팅이 하나씩 더해지며 한 브랜드가 커지는 과정' — 가상 브랜드 물결랩 히알루 세럼의 예시 시나리오.
// 단계마다 카드(사진·영상·화면)가 가운데에 크게 떴다가, 사진을 내려놓듯 작아지며 위쪽 3x2 자리에 차곡차곡 쌓인다(장면 전환 없이 누적).
// 쌓인 카드는 계속 남고, 영상 카드는 쌓인 뒤에도 각자 계속 재생된다. 카드가 자리에 내려앉을 때마다 아래 '월 매출' 계단이 한 칸씩 차오른다.
// ① 브랜드 메시지(회의실: 페르소나 + 화이트보드 빈 칸에 핵심 카피) ② 체험단·리뷰(리뷰어 촬영 + 후기·별점) ③ 바이럴·커뮤니티(커뮤니티 글 + 핫딜)
// ④ 인플루언서(링라이트 앞 촬영 + 릴스 조회수) ⑤ 광고(네이버 검색·구글 영상·인스타그램 구매 전환) ⑥ 올리브영·PPL(드라마 속 세럼 + 올리브영 온라인몰 1위)
// → 결과: 출고 현장 사진이 뒤에 깔리고 계단 위에 '마케팅을 더할 때마다 한 칸씩'. 숫자는 모두 예시('예시 시나리오' 표기 — 실제 성과 아님).
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

const Chip = ({ n, k }: { n: number; k: string }) => <p class="wkh-chip"><span>STEP {n}</span>{k}</p>
// 카드 바탕: 사진(나중에 같은 이름의 영상이 생기면 video 로 바꿔 끼운다)
const Photo = ({ f }: { f: string }) => <div class="wkh-ph" style={`background-image:url(${V}${f}.webp)`} />

export const WorksHero = () => (
  <div class="wkh" aria-hidden="true" data-wkh>
    <div class="wkh-stage">
      {/* 결과 때 뒤에 깔리는 출고 현장 */}
      <div class="wkh-bg" data-wkh-bg style={`background-image:url(${V}ship.webp)`} />

      {/* 월 매출 계단(예시) */}
      <div class="wkh-chart" data-wkh-chart>
        <p class="wkh-chart-h"><b>월 매출</b><span>예시 시나리오</span><em data-wkh-big>마케팅을 더할 때마다 한 칸씩</em></p>
        <div class="wkh-steps">
          {STEPS.map(s => <div class="wkh-st" data-wkh-st data-v={s.v}><small>{s.t}</small><i /><span>{s.k}</span></div>)}
        </div>
      </div>

      {/* ① 브랜드 메시지 */}
      <div class="wkh-card" data-wkh-card>
        <Photo f="meet" />
        <p class="wkh-copy" data-wkh-copy><span>하루 종일 건조한 사무실,</span><span>물결랩 한 방울</span></p>
        <Chip n={1} k="브랜드 메시지" />
        <div class="wkh-ov wkh-persona" data-wkh-pop>
          <p class="wkh-ov-h">페르소나</p>
          <b>29세 사무직 직장인</b>
          <ul><li>오후만 되면 당기는 피부</li><li>퇴근 후 3분 스킨케어</li><li>성분보다 후기를 먼저 봄</li></ul>
        </div>
      </div>

      {/* ② 체험단·리뷰 */}
      <div class="wkh-card" data-wkh-card>
        <Photo f="review" />
        <Chip n={2} k="체험단·리뷰" />
        <div class="wkh-ov wkh-reviews" data-wkh-pop>
          <p class="wkh-ov-h">물결랩 히알루 세럼 후기</p>
          <p class="wkh-star"><b>★ 4.8</b><span>후기 <u data-wkh-cnt="326">0</u>개</span></p>
          <p class="wkh-rv">건조한 사무실에서 하루 버텨요</p>
          <p class="wkh-rv">재구매 3번째예요</p>
        </div>
      </div>

      {/* ③ 바이럴·커뮤니티 */}
      <div class="wkh-card wkh-card--ui" data-wkh-card>
        <Chip n={3} k="바이럴·커뮤니티" />
        <div class="wkh-post" data-wkh-pop>
          <p class="wkh-post-h"><span>뷰티 커뮤니티</span><small>자유게시판</small></p>
          <b class="wkh-post-t">물결랩 세럼 써 보신 분? 건성인데 고민 중이에요</b>
          <p class="wkh-cm"><b>피부결맘</b>저 3통째예요. 사무실에서 덜 당겨요</p>
          <p class="wkh-cm"><b>건성인간</b>지금 핫딜 떴어요!</p>
        </div>
        <div class="wkh-deal" data-wkh-pop><i style={`background-image:url(${V}serum.webp)`} /><span><small>핫딜</small><b>물결랩 히알루 세럼</b><em>22% · 21,840원</em></span></div>
      </div>

      {/* ④ 인플루언서 */}
      <div class="wkh-card" data-wkh-card>
        <Photo f="influencer" />
        <Chip n={4} k="인플루언서" />
        <div class="wkh-ov wkh-reel" data-wkh-pop>
          <p class="wkh-ov-h">릴스 · 건성 피부 출근 전 루틴</p>
          <p class="wkh-reel-n"><span>조회수</span><b><u data-wkh-cnt="48">0</u>만</b></p>
        </div>
      </div>

      {/* ⑤ 광고 */}
      <div class="wkh-card wkh-card--ui" data-wkh-card>
        <Chip n={5} k="광고" />
        <div class="wkh-ads">
          {[['네이버 검색', 212], ['구글 영상', 148], ['인스타그램', 296]].map(([a, n]) => (
            <div class="wkh-ad" data-wkh-pop>
              <b>{a}</b>
              <i style={`background-image:url(${V}serum.webp)`} />
              <span>구매 전환<br /><u data-wkh-cnt={n}>0</u>건</span>
            </div>
          ))}
        </div>
      </div>

      {/* ⑥ 올리브영·PPL */}
      <div class="wkh-card" data-wkh-card>
        <Photo f="drama" />
        <Chip n={6} k="올리브영·PPL" />
        <div class="wkh-ov wkh-oy" data-wkh-pop>
          <p class="wkh-ov-h">올리브영 온라인몰 · 스킨케어</p>
          <p class="wkh-oy-r"><b>1</b><span>위</span><i style={`background-image:url(${V}serum.webp)`} /></p>
        </div>
      </div>
    </div>
  </div>
)
