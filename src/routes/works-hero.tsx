// 포트폴리오 히어로(한 바퀴 약 15초): '마케팅이 하나씩 더해지며 한 브랜드가 커지는 과정' — 가상 브랜드 물결랩 히알루 세럼의 예시 시나리오.
// 단계 카드 12장(사진·영상·화면)이 하나씩 가운데에 크게 떴다가, 사진을 책상에 흩뜨리듯 위쪽에 서로 겹치며 쌓인다(장면 전환 없이 레이어 누적).
// 뒤로 갈수록 카드가 빨리 내려앉는다(가속). 쌓인 카드는 끝까지 남고, 영상 카드는 쌓인 뒤에도 각자 계속 재생된다.
// 실행 카드(2~11)가 내려앉을 때마다 아래 '월 매출' 계단이 한 칸씩 차오른다. 1 시장 분석은 출시 전, 12 주간 보고서는 정리라 계단 없음.
// 1 시장·경쟁사 분석 2 브랜드 메시지 3 체험단 4 블로그 검색 노출 5 구매평·별점 6 바이럴·커뮤니티 7 핫딜·공동구매 8 인플루언서 9 유튜브·쇼츠 10 광고 11 올리브영·PPL 12 주간 성과 보고서
// → 결과: 출고 현장 사진이 뒤에 깔리고 '마케팅을 더할 때마다 한 칸씩'. 숫자는 모두 예시('예시 시나리오' 표기 — 실제 성과 아님).
// 인물·장소는 AI 가상(nano_banana_pro: meet 77c9fc63, review d63e8c23, influencer d521492d, youtube 02880edc, drama 0320f16d, ship f2072308, 세럼은 리뷰 페이지 prod-b 기준).
// 실제 올리브영 매장·방송사·플랫폼 로고는 쓰지 않는다. 대가·협찬 표시 문구 금지. 움직임은 works-hero.js.
const V = '/static/works-hero/'

// 월 매출 계단(예시, 단위 만 원) — 카드 2~11 에 하나씩
export const STEPS = [
  { k: '메시지', v: 800, t: '800만' },
  { k: '체험단', v: 1100, t: '1,100만' },
  { k: '블로그', v: 1500, t: '1,500만' },
  { k: '구매평', v: 2000, t: '2,000만' },
  { k: '바이럴', v: 2800, t: '2,800만' },
  { k: '핫딜·공구', v: 3800, t: '3,800만' },
  { k: '인플루언서', v: 6000, t: '6,000만' },
  { k: '유튜브', v: 8500, t: '8,500만' },
  { k: '광고', v: 14000, t: '1.4억' },
  { k: '올리브영·PPL', v: 30000, t: '3억' },
]

const Chip = ({ n, k }: { n: number; k: string }) => <p class="wkh-chip"><span>STEP {n}</span>{k}</p>
// 카드 바탕: 사진(나중에 같은 이름의 영상이 생기면 video loop 로 바꿔 끼운다)
const Photo = ({ f }: { f: string }) => <div class="wkh-ph" style={`background-image:url(${V}${f}.webp)`} />
const Serum = ({ c }: { c?: string }) => <i class={'wkh-serum ' + (c || '')} style={`background-image:url(${V}serum.webp)`} />

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

      {/* 1 시장·경쟁사 분석 */}
      <div class="wkh-card wkh-card--ui" data-wkh-card>
        <Chip n={1} k="시장·경쟁사 분석" />
        <div class="wkh-ui wkh-mkt" data-wkh-pop>
          <p class="wkh-ui-h">보습 세럼 경쟁 제품 비교</p>
          <table>
            <tr><th>제품</th><th>가격</th><th>후기</th><th>핵심 소구</th></tr>
            <tr><td>A사 세럼</td><td>32,000원</td><td>4,210</td><td>미백</td></tr>
            <tr><td>B사 앰플</td><td>26,000원</td><td>2,870</td><td>진정</td></tr>
            <tr><td>C사 세럼</td><td>29,000원</td><td>1,540</td><td>탄력</td></tr>
            <tr class="is-gap"><td>빈자리</td><td colspan={3}>건성 직장인을 위한 하루 보습</td></tr>
          </table>
        </div>
        <div class="wkh-ui wkh-kw" data-wkh-pop><span>'건성 세럼' 검색량</span><b>+38%</b><small>최근 3개월</small></div>
      </div>

      {/* 2 브랜드 메시지 */}
      <div class="wkh-card" data-wkh-card>
        <Photo f="meet" />
        <p class="wkh-copy" data-wkh-copy><span>하루 종일 건조한 사무실,</span><span>물결랩 한 방울</span></p>
        <Chip n={2} k="브랜드 메시지" />
        <div class="wkh-ov wkh-tr" data-wkh-pop>
          <p class="wkh-ov-h">페르소나</p>
          <b class="wkh-ov-b">29세 사무직 직장인</b>
          <ul><li>오후만 되면 당기는 피부</li><li>퇴근 후 3분 스킨케어</li><li>성분보다 후기를 먼저 봄</li></ul>
        </div>
      </div>

      {/* 3 체험단 */}
      <div class="wkh-card" data-wkh-card>
        <Photo f="review" />
        <Chip n={3} k="체험단" />
        <div class="wkh-ov wkh-tr" data-wkh-pop>
          <p class="wkh-ov-h">체험단 모집</p>
          <p class="wkh-big"><u data-wkh-cnt="50">0</u><small>명 참여</small></p>
          <p class="wkh-rv">사진 후기 · 사용 2주 기록</p>
        </div>
      </div>

      {/* 4 블로그 검색 노출 */}
      <div class="wkh-card wkh-card--ui" data-wkh-card>
        <Chip n={4} k="블로그 검색 노출" />
        <div class="wkh-ui wkh-srch" data-wkh-pop>
          <p class="wkh-sbar">건성 세럼 추천</p>
          <p class="wkh-tabs"><b>블로그</b><span>카페</span><span>쇼핑</span></p>
          {['건성 피부 세럼 정착템, 물결랩 2주 후기', '사무실 건조할 때 물결랩 한 방울', '보습 세럼 3종 비교해 보니'].map((s, i) => (
            <div class="wkh-sr" data-wkh-pop><span><b>{s}</b><small>블로그 · {['피부일기', '오늘의 화장대', '세럼 덕후'][i]}</small></span><Serum /></div>
          ))}
        </div>
      </div>

      {/* 5 구매평·별점 */}
      <div class="wkh-card wkh-card--ui" data-wkh-card>
        <Chip n={5} k="구매평·별점" />
        <div class="wkh-ui wkh-store" data-wkh-pop>
          <div class="wkh-store-top"><Serum c="lg" /><span><b>물결랩 히알루 세럼 30ml</b><small>스마트스토어 구매평</small></span></div>
          <p class="wkh-rate"><b>★ <u data-wkh-num="4.2,4.8">4.2</u></b><span>구매평 <u data-wkh-cnt="1284">0</u>개</span></p>
          <p class="wkh-chips"><span>촉촉해요 92%</span><span>재구매 의사 87%</span><span>사진 후기 410</span></p>
        </div>
      </div>

      {/* 6 바이럴·커뮤니티 */}
      <div class="wkh-card wkh-card--ui" data-wkh-card>
        <Chip n={6} k="바이럴·커뮤니티" />
        <div class="wkh-ui wkh-post" data-wkh-pop>
          <p class="wkh-post-h"><span>뷰티 커뮤니티</span><small>자유게시판</small></p>
          <b class="wkh-post-t">물결랩 세럼 써 보신 분? 건성인데 고민 중이에요</b>
          <p class="wkh-cm" data-wkh-pop><b>피부결맘</b>저 3통째예요. 사무실에서 덜 당겨요</p>
          <p class="wkh-cm" data-wkh-pop><b>오늘도출근</b>후기 보고 샀는데 만족합니다</p>
        </div>
      </div>

      {/* 7 핫딜·공동구매 */}
      <div class="wkh-card wkh-card--ui" data-wkh-card>
        <Chip n={7} k="핫딜·공동구매" />
        <div class="wkh-ui wkh-deal" data-wkh-pop>
          <Serum c="lg" />
          <span class="wkh-deal-tx"><small>공동구매 · 3일 한정</small><b>물결랩 히알루 세럼 1+1</b><em>22% · 21,840원</em></span>
        </div>
        <div class="wkh-ui wkh-stock" data-wkh-pop>
          <p><b>남은 수량 <u data-wkh-cnt="37" data-down="1">0</u>개</b><span>마감까지 02:14:09</span></p>
          <i><b data-wkh-bar /></i>
        </div>
      </div>

      {/* 8 인플루언서 */}
      <div class="wkh-card" data-wkh-card>
        <Photo f="influencer" />
        <Chip n={8} k="인플루언서" />
        <div class="wkh-ov wkh-tl" data-wkh-pop>
          <p class="wkh-ov-h">릴스 · 건성 피부 출근 전 루틴</p>
          <p class="wkh-big"><small>조회수</small><u data-wkh-cnt="48">0</u><small>만</small></p>
        </div>
      </div>

      {/* 9 유튜브·쇼츠 */}
      <div class="wkh-card" data-wkh-card>
        <Photo f="youtube" />
        <Chip n={9} k="유튜브·쇼츠" />
        <div class="wkh-ov wkh-tr" data-wkh-pop>
          <p class="wkh-ov-h">쇼츠 · 건성 세럼 3종 비교</p>
          <p class="wkh-big"><small>조회수</small><u data-wkh-cnt="21">0</u><small>만</small></p>
          <p class="wkh-rv">"사무실용이면 물결랩"</p>
        </div>
      </div>

      {/* 10 광고 */}
      <div class="wkh-card wkh-card--ui" data-wkh-card>
        <Chip n={10} k="광고" />
        <div class="wkh-ads">
          {[['네이버 검색', 212], ['구글 영상', 148], ['인스타그램', 296]].map(([a, n]) => (
            <div class="wkh-ad" data-wkh-pop><b>{a}</b><Serum /><span>구매 전환<br /><u data-wkh-cnt={n}>0</u>건</span></div>
          ))}
        </div>
      </div>

      {/* 11 올리브영·PPL */}
      <div class="wkh-card" data-wkh-card>
        <Photo f="drama" />
        <Chip n={11} k="올리브영·PPL" />
        <div class="wkh-ov wkh-tr" data-wkh-pop>
          <p class="wkh-ov-h">올리브영 온라인몰 · 스킨케어</p>
          <p class="wkh-oy-r"><b>1</b><span>위</span><Serum /></p>
        </div>
      </div>

      {/* 12 주간 성과 보고서 */}
      <div class="wkh-card wkh-card--ui" data-wkh-card>
        <Chip n={12} k="주간 성과 보고서" />
        <div class="wkh-ui wkh-rep" data-wkh-pop>
          <p class="wkh-rep-h"><b>물결랩 주간 보고서</b><span>10월 4주</span></p>
          <div class="wkh-rep-k">
            {[['매출', '+18%'], ['ROAS', '412%'], ['새 후기', '+86']].map(([a, b]) => <p data-wkh-pop><span>{a}</span><b>{b}</b></p>)}
          </div>
          <p class="wkh-rep-n"><b>다음 주</b>올리브영 기획전 소재 교체 · 쇼츠 2편 추가</p>
        </div>
      </div>
    </div>
  </div>
)
