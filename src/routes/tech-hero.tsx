// 아워테크 히어로: 회사소개처럼 상단 구역 좌우 전체를 채운다. 1600x900 무대를 화면 너비에 맞춰(cover) 키운다.
// 흐름: ① 사무실 책상 위 노트북(대표 책상 사진 IMG_0288을 참고로 만든 AI 사진 nano f48730c4, 로고·글자 없음) — 꺼진 화면이 켜진다
// → ② 노트북 화면 속으로 날아 들어가 화면이 무대를 꽉 채운다
// → ③ 회사가 직접 만들어 운영하는 시스템 화면을 탭처럼 차례로 넘기며, 화면마다 일이 저절로 처리되는 모습:
//    인트라넷(할 일 체크·일정) → 협찬 후보 찾기(조건 검색·점수) → 리뷰 운영(진행 현황) → 카페 운영(발행 일정)
//    → ADFLOW 성과 분석(그래프) → 광고주 리포트 센터(보고서 발행) → 착수 보고서
//    화면 모양은 실제 시스템을 따르되, 이름·숫자·주소는 모두 지어낸 예시(고객사·직원·연락처 없음)
// → ④ 뒤로 빠져 책상이 다시 보이고, 사진이 어둡고 흐려지며 'AD TECH AGENCY · 마케팅을 코드로 설계하는 애드테크 에이전시' 글자만 → 여기서 멈춘다(반복 없음, 1.5배속).
// 움직임은 tech-hero.js — 화면 속 요소의 data-a(나타나는 때)·data-n(숫자 세기)·data-w/h(막대)·data-p(선 그리기)·data-c(상태 바뀜)는
// 그 화면이 시작된 뒤 몇 초인지로 적는다.
const V = '/static/tech-hero/'

const TABS = ['인트라넷', '협찬 찾기', '리뷰 운영', '카페 운영', '성과 분석', '광고주 리포트']

// 숫자 세기: 0에서 n까지(소수 자리 d, 뒤에 붙는 글자 s)
const N = (p: { n: number; a: number; d?: number; s?: string; dur?: number }) => (
  <span data-n={p.n} data-a={p.a} data-dur={p.dur ?? 0.7} data-dec={p.d ?? 0} data-suf={p.s ?? ''}>0{p.s ?? ''}</span>
)

const Intranet = () => (
  <div class="th-app th-intra">
    <aside class="th-side">
      <b class="th-brand"><i class="th-logo">α</i>인애드 인트라넷</b>
      <p class="th-me">관리자</p>
      <span class="th-sh">메인</span>
      <a class="on">홈</a><a>업무지원</a><a>신규입사자 온보딩</a><a>미션&amp;할일</a><a>콜드메일발송</a><a>캠페인 관리</a>
    </aside>
    <main class="th-main">
      <div class="th-head"><h3>홈</h3><span>2026년 10월 31일 토요일</span><em>처리 필요 <N n={12} a={0.1} /> · 공지 4 · 일정 소식 5</em></div>
      <div class="th-row2">
        <section class="th-card">
          <h4>공지사항 <small>필독 공지와 최근 안내</small></h4>
          <p class="th-li" data-a="0.15"><b class="th-fix">고정</b>[필수] 주간 보고 양식이 바뀌었습니다<small>필독</small></p>
          <p class="th-li" data-a="0.25"><b class="th-fix">고정</b>오전·오후 반차 운영 기준 안내<small>필독</small></p>
          <p class="th-li" data-a="0.35">콜드메일 그룹 탭에서 내 담당만 불러오도록 바뀌었습니다<small>공지</small></p>
        </section>
        <section class="th-card">
          <h4>미션 &amp; 할 일 <small>할 일 · 처리 필요 · 오늘 마감</small></h4>
          <p class="th-todo" data-c="0.3"><i></i>착수 보고서 검토하고 광고주에게 보내기</p>
          <p class="th-todo" data-c="0.55"><i></i>체험단 모집 공고 올리기</p>
          <p class="th-todo" data-c="0.8"><i></i>주간 리포트 발송 확인</p>
          <p class="th-todo" data-c="1.05"><i></i>협찬 후보 명단 정리</p>
        </section>
      </div>
      <section class="th-card th-cal">
        <h4>업무 캘린더 <small>한 달의 모든 일정을 한눈에 확인합니다</small><strong>2026년 10월</strong></h4>
        <div class="th-grid">
          {['일', '월', '화', '수', '목', '금', '토'].map(d => <b>{d}</b>)}
          {Array.from({ length: 21 }, (_, i) => (
            <div><span>{i + 11}</span>
              {i % 3 === 0 && <p data-a={(0.2 + (i % 7) * 0.08).toFixed(2)}><i class="c1"></i>회의</p>}
              {i % 4 === 1 && <p data-a={(0.3 + (i % 5) * 0.09).toFixed(2)}><i class="c2"></i>미팅</p>}
              {i % 5 === 2 && <p data-a={(0.4 + (i % 4) * 0.1).toFixed(2)}><i class="c3"></i>연차</p>}
            </div>
          ))}
        </div>
      </section>
    </main>
  </div>
)

const CH = [
  ['데일리뷰티 민', '뷰티', 412000, 96000, 6.8, 78],
  ['피부일기', '뷰티', 268000, 71000, 5.9, 76],
  ['선크림 연구소', '뷰티', 153000, 48000, 7.4, 75],
  ['오늘의 루틴', '라이프', 520000, 133000, 4.1, 73],
  ['모닝케어 TV', '뷰티', 89000, 31000, 8.2, 72],
  ['뷰티노트 J', '뷰티', 341000, 64000, 3.6, 70],
] as const
const Sponsor = () => (
  <div class="th-app th-spon">
    <aside class="th-side">
      <b class="th-brand"><i class="th-logo th-logo--sq">in</i>인애드 협찬</b>
      <span class="th-sh">진행 중인 협찬</span><p class="th-me">아직 없어요</p>
      <span class="th-sh">전체</span>
      <a class="on">후보 찾기</a><a>채널 명단</a><a>판정 점검</a><a>협찬 목록</a><a>고객사</a><a>보낸 알림</a><a>작업 기록</a>
    </aside>
    <main class="th-main">
      <div class="th-head"><h3>후보 찾기</h3><em>유튜브 조회 오늘 <N n={115} a={0.1} />/5,000단위</em></div>
      <section class="th-card th-form">
        <div class="th-utabs"><span>검색어로 찾기</span><span class="on">인기 영상에서 찾기</span></div>
        <label>분야</label><div class="th-in">뷰티</div>
        <label>규모</label><div class="th-in th-in--s">10,000</div><span class="th-to">~</span><div class="th-in th-in--s th-ph">최대</div><span class="th-to">구독자</span>
        <label>최근 활동</label><div class="th-in th-in--s">60</div><span class="th-to">일 안</span>
        <span class="th-btn" data-c="0.25">이 조건으로 찾기</span>
      </section>
      <table class="th-tbl">
        <tr><th>점수</th><th>채널</th><th>플랫폼</th><th>분야</th><th class="r">구독자</th><th class="r">대표 조회</th><th class="r">참여율</th><th>최근 활동</th></tr>
        {CH.map((c, i) => (
          <tr data-a={(0.45 + i * 0.12).toFixed(2)}>
            <td><b class="th-score"><N n={c[5]} a={0.45 + i * 0.12} dur={0.4} /></b></td><td><b>{c[0]}</b></td><td>유튜브</td><td>{c[1]}</td>
            <td class="r">{c[2].toLocaleString()}</td><td class="r">{c[3].toLocaleString()}</td><td class="r">{c[4]}%</td><td>오늘</td>
          </tr>
        ))}
      </table>
    </main>
  </div>
)

const Review = () => (
  <div class="th-app th-rev">
    <div class="th-topnav"><b class="th-brand">리뷰웹시스템</b>
      {['홈', '작업오더', '모집공고', '작업보드', '관측', '입금관리', 'C/S', '업체관리', '리뷰검수', '등록리뷰어DB', '알림톡', '설정'].map((m, i) => <a class={i === 3 ? 'on' : ''}>{m}</a>)}
    </div>
    <div class="th-rev-in">
      <h3 class="th-rtitle">10/31 선크림 체험단 300건 <small>(예시 작업)</small></h3>
      <div class="th-row3">
        <section class="th-card th-kv">
          <h4>작업 조건</h4>
          <p><span>일정</span>2026-10-31 ~ 2026-11-14</p><p><span>총건수</span>300건</p><p><span>일건수</span>하루 30건</p>
          <p><span>구매채널</span>오픈마켓</p><p><span>리뷰타입</span>혼합 (포토 210 · 텍스트 90)</p><p><span>입금</span>자동</p>
        </section>
        <section class="th-card th-prog">
          <h4>진행 현황</h4>
          <p><span>참여자</span><b><N n={232} a={0.15} dur={0.9} /></b><small>/300</small><i class="th-bar"><i data-w="77" data-a="0.15" data-dur="0.9"></i></i><em><N n={77} a={0.15} dur={0.9} s="%" /></em></p>
          <p><span>제출완료</span><b><N n={145} a={0.3} dur={0.9} /></b><small>/300</small><i class="th-bar g"><i data-w="48" data-a="0.3" data-dur="0.9"></i></i><em><N n={48} a={0.3} dur={0.9} s="%" /></em></p>
          <p><span>입금완료</span><b><N n={134} a={0.45} dur={0.9} /></b><small>/300</small><i class="th-bar"><i data-w="45" data-a="0.45" data-dur="0.9"></i></i><em><N n={45} a={0.45} dur={0.9} s="%" /></em></p>
        </section>
        <section class="th-card th-sub">
          <h4>제출물 미리보기</h4>
          <div class="th-phone" data-a="0.35"><b>주문상세</b><p><span>상품 가격</span>42,750원</p><p><span>할인금액</span>-3,000원</p><p class="t"><span>총 결제금액</span>39,750원</p></div>
          <div class="th-empty" data-a="0.5"><b>리뷰 확인 중</b>제출되면 자동으로 검수합니다</div>
        </section>
        <section class="th-card th-cs">
          <h4>C/S 대화</h4>
          <p class="in" data-a="0.3">리뷰 올렸어요! 확인 부탁드려요</p>
          <p class="out" data-a="0.65">확인했습니다. 영업일 6일 안에 입금됩니다</p>
          <p class="in" data-a="1.0">감사합니다</p>
        </section>
      </div>
      <table class="th-tbl th-tbl--s">
        <tr><th>참여자</th><th>연락처</th><th>번호</th><th>구매일자</th><th>리뷰옵션</th><th>주문번호</th><th>상태</th></tr>
        {['김*주', '조*빈', '윤*원', '장*정'].map((n, i) => (
          <tr data-a={(0.6 + i * 0.1).toFixed(2)}><td>{n}</td><td>010-****-{['1024', '2048', '3072', '4096'][i]}</td><td>{i + 1}</td><td>10/31</td><td>포토</td><td>••••••{['1101', '1102', '1103', '1104'][i]}</td><td><b class="th-st" data-c={(0.9 + i * 0.12).toFixed(2)}><s>대기</s><u>제출완료</u></b></td></tr>
        ))}
      </table>
    </div>
  </div>
)

const CAFE_AD = [['해온', 51], ['모닝랩', 2], ['바른결 치과', 1], ['온결 스킨', 15], ['하루필라테스', 10], ['소담한의원', 7], ['데일리팜', 18], ['봄결 피부과', 8], ['리프레시 요가', 12]] as const
const CAFE = [['10/31 (토)', '육아맘 모임', '정상'], ['10/31 (토)', '직장인 재테크', '정상'], ['10/31 (토)', '동네 소식', 'A/S'], ['11/01 (일)', '뷰티 정보방', '정상'], ['11/01 (일)', '자취생 꿀팁', '정상'], ['11/02 (월)', '운동 기록', '정상'], ['11/02 (월)', '주부 살림', 'A/S']] as const
const Cafe = () => (
  <div class="th-app th-cafe">
    <aside class="th-side">
      <b class="th-brand"><i class="th-logo">◷</i>카페웹시스템</b>
      <a>대시보드</a><a>카페마케팅</a><a class="th-sub2">작업요청</a><a class="th-sub2">작업 시트</a><a class="th-sub2">오늘 올릴 글</a><a class="on">카페마케팅업무</a><a>게시보고</a><a>카페</a><a>계정</a><a>육성현황</a><a>감사 로그</a>
    </aside>
    <div class="th-list">
      <div class="th-in th-ph">광고주 검색</div>
      <span class="th-sh">진행 중 · 40</span>
      {CAFE_AD.map((a, i) => <p class={i === 0 ? 'on' : ''}><span>{a[0]}</span><b>{a[1]}</b></p>)}
    </div>
    <main class="th-main">
      <div class="th-head"><h3>해온 <small>(가상 광고주)</small></h3><em>가동 중 · 오류 0</em><span class="th-btn th-btn--l">보고 링크 발급</span></div>
      <div class="th-kpis">
        <div><span>감시 글</span><b><N n={51} a={0.1} />/51</b><small>예정 0 · 삭제 0</small></div>
        <div><span>조회 증가 · 등록 이후</span><b>+<N n={140} a={0.15} /></b><small>오늘 09시 이후 +35</small></div>
        <div><span>새 댓글 · 등록 이후</span><b>+<N n={12} a={0.2} /></b><small>오늘 +3</small></div>
        <div><span>미처리 댓글</span><b>0</b><small>처리하면 09시 리포트에서 제외</small></div>
        <div><span>검증 · 원고</span><b><N n={51} a={0.25} />/51</b><small>제목·댓글 대조 · 원고 배정</small></div>
      </div>
      <div class="th-sched"><b>발행 일정</b><span>총 51건 — 발행 38 · 예정 13</span><span class="th-btn" data-c="0.2">+ 스케줄 생성</span><span class="th-ghost">원고 자동 배정</span><span class="th-ghost">계정 자동 배정</span></div>
      <table class="th-tbl">
        <tr><th>No.</th><th>발행일</th><th>카페</th><th>카페 글 주소</th><th>원고</th><th>발행계정</th><th>상태</th></tr>
        {CAFE.map((c, i) => (
          <tr data-a={(0.35 + i * 0.1).toFixed(2)}><td>{i + 1}</td><td>{c[0]}</td><td>{c[1]}</td><td class="th-url">https://cafe.••••.com/••••/{5100 + i * 37}</td><td>배정됨</td><td>배정됨</td><td><b class={'th-tag' + (c[2] === 'A/S' ? ' th-tag--as' : '')}>{c[2]}</b></td></tr>
        ))}
      </table>
    </main>
  </div>
)

const Adflow = () => (
  <div class="th-app th-adf">
    <aside class="th-side">
      <b class="th-brand th-brand--adf">ADFLOW<small>ANALYTICS</small></b>
      <a>대시보드</a><a>광고주 관리</a><a class="on">성과 분석</a><a>소재 비교</a><a>데이터 센터</a><a>보고서</a><a>설정</a>
    </aside>
    <main class="th-main">
      <p class="th-crumb">광고 성과 관리 › 성과 분석</p>
      <div class="th-head"><h3>성과 분석</h3><span>같은 기준으로 성과를 비교하고 운영 판단을 기록하세요.</span></div>
      <section class="th-card th-filter"><label>광고주</label><div class="th-in">해온 (가상)</div><label>기간</label><div class="th-in">2026. 10. 01. ~ 2026. 10. 31.</div><label>핵심 전환</label><div class="th-in">구매</div></section>
      <div class="th-utabs"><span class="on">성과 요약</span><span>소재 A/B</span></div>
      <section class="th-card th-kpi5">
        <div><span>광고비</span><b><N n={3200000} a={0.1} dur={0.9} s="원" /></b><small>이전 2,950,000원</small></div>
        <div><span>노출</span><b><N n={128400} a={0.15} dur={0.9} /></b><small>이전 96,200</small></div>
        <div><span>클릭</span><b><N n={2310} a={0.2} dur={0.9} /></b><small>이전 1,740</small></div>
        <div><span>전환수</span><b><N n={86} a={0.25} dur={0.9} /></b><small>이전 61</small></div>
        <div><span>CPA</span><b><N n={37209} a={0.3} dur={0.9} s="원" /></b><small>이전 48,361원</small></div>
      </section>
      <section class="th-card th-line">
        <h4>일별 광고비 추이</h4>
        <svg viewBox="0 0 1000 220" preserveAspectRatio="none">
          <line x1="0" y1="110" x2="1000" y2="110" class="g" /><line x1="0" y1="215" x2="1000" y2="215" class="g" />
          <polyline data-p="0.2" data-dur="1.1" points="0,120 35,138 70,160 105,152 140,170 175,110 210,140 245,118 280,175 315,178 350,188 385,115 420,122 455,120 490,40 525,72 560,182 595,176 630,150 665,100 700,108 735,108 770,96 805,198 840,192 875,140 910,136 945,158 1000,105" />
        </svg>
      </section>
    </main>
  </div>
)

const REP = [['해온', '10/31 등록', 'new'], ['모닝랩', '10/19 등록', 'ok'], ['온결 스킨', '10/07 등록', 'none'], ['하루필라테스', '09/28 등록', 'ok']] as const
const ReportCenter = () => (
  <div class="th-app th-rc">
    <div class="th-rc-box">
      <div class="th-rc-top"><b class="th-brand"><i class="th-logo">α</i>광고주 리포트 센터</b><span>관리자 · 관리</span></div>
      <p class="th-rc-ok">자동 점검: 문제 없음 · 메일 알림 켜짐</p>
      <div class="th-rc-bar"><span class="th-seg"><s>내 광고주 0</s><s class="on">전체 4</s></span><div class="th-in th-ph">광고주 이름 검색</div><span class="th-btn">+ 새 광고주</span></div>
      <table class="th-tbl th-tbl--rc">
        <tr><th>광고주</th><th>담당</th><th>착수 보고서</th><th>주간 리포트</th><th class="r">관리</th></tr>
        {REP.map((r, i) => (
          <tr><td><b>{r[0]}</b><small>{r[1]}</small></td><td>담당자</td>
            <td>{r[2] === 'new' ? <b class="th-st th-st--rep" data-c="0.45"><s><i class="dot w"></i>만드는 중…</s><u><i class="dot"></i>발행됨 · 10/31</u></b>
              : r[2] === 'ok' ? <span><i class="dot"></i>발행됨 · {i === 1 ? '10/19' : '10/01'}</span> : <span><i class="dot n"></i>요청 없음</span>}</td>
            <td>10월5주차(10/26~11/01) 발행</td>
            <td class="r"><span class={'th-btn th-btn--s' + (r[2] === 'none' ? ' off' : '')} data-c={i === 0 ? '0.85' : undefined}>보고서 보기</span><span class="th-ghost th-ghost--s">링크 복사</span></td>
          </tr>
        ))}
      </table>
    </div>
  </div>
)

const Kickoff = () => (
  <div class="th-app th-ko">
    <div class="th-ko-top"><span>← 리포트 목록</span><span>PDF로 저장</span></div>
    <div class="th-ko-page">
      <p class="th-ko-k">인애드컴퍼니 · 온라인 마케팅 착수 보고서</p>
      <h3>해온 <small>(가상 브랜드)</small></h3>
      <p class="th-ko-m">분석 기간 2026-10-01 ~ 2026-10-31 · 비교 브랜드 A, B</p>
      <p class="th-ko-k" data-a="0.1">01 요약</p>
      <h4 data-a="0.1">해온의 지금</h4>
      <p class="th-ko-s" data-a="0.15">해온의 착수 초점은 <b>긍정 비율 31%와 광고성 비중 44%의 간극</b>입니다.</p>
      <div class="th-ko-kpi">
        <div data-a="0.25"><b><N n={512} a={0.25} /></b><span>자연 언급(30일)</span></div>
        <div data-a="0.32"><b><N n={1.8} a={0.32} d={1} s="%" /></b><span>부정 비율</span></div>
        <div data-a="0.39"><b><N n={28400} a={0.39} /></b><span>월간 검색 수</span></div>
        <div data-a="0.46"><b><N n={72} a={0.46} s="%" /></b><span>AI 추천률</span></div>
      </div>
      <table class="th-tbl th-tbl--ko" data-a="0.55">
        <tr><th>지표</th><th class="r">해온</th><th class="r">비교 A</th><th class="r">비교 B</th></tr>
        <tr><td>자연 언급(건)</td><td class="r">512</td><td class="r">430</td><td class="r">690</td></tr>
        <tr><td>긍정 비율</td><td class="r">31%</td><td class="r">27%</td><td class="r">22%</td></tr>
        <tr><td>광고성 비중</td><td class="r">44%</td><td class="r">35%</td><td class="r">41%</td></tr>
      </table>
    </div>
  </div>
)

const PANELS = [Intranet, Sponsor, Review, Cafe, Adflow, ReportCenter, Kickoff]

export const TechHero = () => (
  <div class="tch" aria-hidden="true" data-tch>
    <div class="tch-stage" data-tch-stage>
      <div class="tch-world" data-tch-world><img src={`${V}desk.webp`} alt="" /></div>
      <div class="tch-scr" data-tch-scr>
        <div class="th-tabs">
          {TABS.map((t, i) => <span data-tch-tab={i}>{t}</span>)}
          <em>화면 속 이름·숫자는 예시입니다</em>
        </div>
        <div class="th-panes">
          {PANELS.map(P => <div class="th-pane" data-tch-pane><P /></div>)}
        </div>
      </div>
      {/* 마지막 문구: 상자 없이 글자만 — 뒤 사진을 어둡고 흐리게 한 뒤 줄마다 아래에서 올라온다 */}
      <div class="tch-dim" data-tch-dim></div>
      <div class="tch-type" data-tch-type>
        <p class="tch-eye" data-tch-l>AD TECH AGENCY</p>
        <span class="tch-ln"><b data-tch-l>마케팅을 코드로 설계하는</b></span>
        <span class="tch-ln"><b data-tch-l>애드테크 에이전시</b></span>
        <p class="tch-sub" data-tch-l>캠페인 운영부터 보고서까지, 직접 만든 시스템으로</p>
      </div>
    </div>
  </div>
)
