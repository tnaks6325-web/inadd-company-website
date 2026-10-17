// 퍼포먼스 마케팅 — 매체별 광고 성과 레퍼런스 (인애드컴퍼니_광고성과_레퍼런스.pdf 기반)
// 광고주명은 업종 + 이니셜로만 표기한다.
type Bar = { label: string; value: number; text: string; sub?: string; hi?: boolean; pending?: boolean }
type Kpi = { num: string; unit?: string; label: string; detail: string }
export type RefCase = {
  id: string; media: string[]; group: string; client: string
  title: [string, string, string]  // 앞, 강조, 뒤
  title2?: string
  desc: string; chartTitle: string; bars: Bar[]; kpis: Kpi[]; note: string
}

export const REF_CASES: RefCase[] = [
  { id: 'b2b', media: ['구글 검색', '메타'], group: 'google', client: 'B2B 광고대행 · 인애드컴퍼니 자사 사례',
    title: ['브랜드 초기 3개월 만에', '', ''], title2: '월 문의 14건 → 74건',
    desc: '구글 검색과 메타를 함께 운영하며, 광고비는 1.8배 늘리고 문의는 5.3배 늘렸어요',
    chartTitle: '월별 문의 건수',
    bars: [{ label: '7월', value: 14, text: '14건', sub: '광고비 140만' }, { label: '8월', value: 42, text: '42건', sub: '광고비 200만' }, { label: '9월', value: 74, text: '74건', sub: '광고비 250만', hi: true }, { label: '10월', value: 36, text: '36건', sub: '진행 중', pending: true }],
    kpis: [{ num: '5.3', unit: '배', label: '월 문의 건수', detail: '7월 14건 → 9월 74건' }, { num: '-66', unit: '%', label: '문의당 비용', detail: '10만 원 → 3.4만 원' }, { num: '1.8', unit: '배', label: '월 광고비', detail: '140만 → 250만 원' }, { num: '166', unit: '건', label: '누적 문의', detail: '7월 ~ 10월 14일' }],
    note: '기간: 2026년 7월 ~ 10월 14일 · 구글 검색 + 메타 합산 · 10월은 진행 중인 수치 · 문의당 비용 = 월 광고비 ÷ 문의 건수' },
  { id: 'powerlink', media: ['네이버 파워링크'], group: 'naver', client: '가전 리테일 · H브랜드',
    title: ['파워링크 광고비 350만 원 더 쓰고', '', ''], title2: '매출은 1억 410만 원 더 벌었어요',
    desc: '구매 의도가 높은 키워드에 예산을 모아, 유입은 줄었지만 유입당 매출을 1.8배로 키웠어요',
    chartTitle: '파워링크 월 광고 매출',
    bars: [{ label: '6월', value: 2.213, text: '2억 2,130만 원' }, { label: '7월', value: 3.254, text: '3억 2,540만 원', hi: true }],
    kpis: [{ num: '+1억 410', unit: '만 원', label: '월 매출 증가', detail: '2.21억 → 3.25억 원 (+47%)' }, { num: '1,373', unit: '%', label: 'ROAS', detail: '1,095% → 1,373% (+277%p)' }, { num: '1.8', unit: '배', label: '유입당 매출', detail: '3,628원 → 6,508원' }, { num: '+350', unit: '만 원', label: '광고비 증가', detail: '2,020만 → 2,370만 원 (+17%)' }],
    note: '기간: 2025년 6월 vs 7월 · 유입 6.1만 → 5.0만 건(−18%) · 네이버 키워드광고 기준 · 광고 매체 리포트 기준 매출' },
  { id: 'shopping', media: ['네이버 쇼핑검색'], group: 'naver', client: '스포츠웨어 E커머스 · S브랜드',
    title: ['네이버 쇼핑검색 한 달 만에', '', ''], title2: '매출 57%, 구매 74% 상승',
    desc: '광고비를 늘리면서도 ROAS 4,700%대를 유지하며 매출 규모를 키웠어요',
    chartTitle: '월 광고 매출',
    bars: [{ label: '3월', value: 4436, text: '4,436만 원' }, { label: '4월', value: 6975, text: '6,975만 원', hi: true }],
    kpis: [{ num: '+57', unit: '%', label: '매출', detail: '4,436만 → 6,975만 원' }, { num: '+74', unit: '%', label: '구매 건수', detail: '326건 → 568건' }, { num: '+167', unit: '%', label: '장바구니 담기', detail: '1,178건 → 3,144건' }, { num: '+135', unit: '%', label: '회원가입', detail: '264건 → 620건' }],
    note: '기간: 3월 vs 4월 · 광고비 61.5만 → 147.4만 원(VAT 별도) · ROAS 7,211% → 4,733% · 네이버 광고관리시스템 기준' },
  { id: 'demandgen', media: ['구글 디맨드젠'], group: 'google', client: '스포츠웨어 E커머스 · S브랜드',
    title: ['구글 디맨드젠 영상 캠페인으로', '', ''], title2: '시청 비용 92% 절감, 시청 76배',
    desc: '유튜브 브랜드 영상 노출을 키우면서 영상 1회 시청 비용을 518원에서 41원으로 낮췄어요',
    chartTitle: '영상 1회 시청 비용 (CPV)',
    bars: [{ label: '3월', value: 518, text: '518원' }, { label: '4월', value: 41, text: '41원', hi: true }],
    kpis: [{ num: '-92', unit: '%', label: '시청당 비용 (CPV)', detail: '518원 → 41원' }, { num: '76', unit: '배', label: '영상 시청 (ThruPlay)', detail: '833회 → 63,455회' }, { num: '12.5', unit: '배', label: '시청률 (VTR)', detail: '0.16% → 2.00%' }, { num: '317', unit: '만', label: '월 노출', detail: '52만 → 317만 회' }],
    note: '기간: 3월 vs 4월 · 광고비 43.1만 → 258.9만 원(VAT 별도) · 클릭률 2.0% → 1.0%, 클릭당 비용 41원 → 137원 · 구글 애즈 기준' },
  { id: 'da', media: ['디스플레이 광고(DA) · 웹'], group: 'da', client: '가전 리테일 · H브랜드',
    title: ['웹 DA 광고비 280만 원 더 쓰고', '', ''], title2: '매출은 6,560만 원 더 벌었어요',
    desc: '일반광고는 키우고 리타겟팅은 효율화해서, 한 달 만에 웹 DA 매출을 41% 늘렸어요',
    chartTitle: '웹 DA 월 매출',
    bars: [{ label: '6월', value: 1.62, text: '1.62억 원' }, { label: '7월', value: 2.27, text: '2.27억 원', hi: true }],
    kpis: [{ num: '+6,560', unit: '만 원', label: '웹 DA 월 매출 증가', detail: '1.62억 → 2.27억 원 (+41%)' }, { num: '385', unit: '%', label: '웹 DA ROAS', detail: '288% → 385% (+97%p)' }, { num: '+3,870', unit: '만 원', label: '일반광고 매출', detail: '광고비 +420만 원 · 매출 +82%' }, { num: '+2,690', unit: '만 원', label: '리타겟팅 매출', detail: '광고비 −140만 원 · 매출 +23%' }],
    note: '기간: 2025년 6월 vs 7월 · 앱 설치 광고 제외, 웹 일반광고+리타겟팅 기준 · 광고비 5,620만 → 5,900만 원 · 광고 매체 리포트 기준 매출' },
  { id: 'sns', media: ['SNS 광고'], group: 'sns', client: '어학 교육 · L브랜드',
    title: ['SNS 광고 ROAS 78% 개선', '', ''], title2: '구매 전환은 2배 이상',
    desc: '같은 클릭 단가를 유지하면서 SNS 유입의 구매 전환을 끌어올렸어요',
    chartTitle: 'SNS 광고 ROAS',
    bars: [{ label: '2023년', value: 1.41, text: '1.41%' }, { label: '2024년', value: 2.51, text: '2.51%', hi: true }],
    kpis: [{ num: '+78', unit: '%', label: 'ROAS', detail: '1.41% → 2.51%' }, { num: '2.2', unit: '배', label: '구매 전환', detail: '6건 → 13건' }, { num: '+101', unit: '%', label: '전환 매출', detail: '103만 → 208만 원' }, { num: '+13', unit: '%', label: '클릭 수', detail: '62,799 → 71,217회' }],
    note: '기간: 2023년 vs 2024년(연간) · 광고비 7,309만 → 8,294만 원(VAT 포함) · 회원가입 199건 → 86건 · 마지막 클릭 기준 전환' },
  { id: 'meta', media: ['메타'], group: 'meta', client: '교육 · P브랜드',
    title: ['영상으로 알리고 이미지로 전환', '', ''], title2: '한 달 만에 신청 179건',
    desc: '인지용 영상은 효율을 높이고, 전환용 이미지 소재를 더해 신청이 없던 계정에서 문의를 만들었어요',
    chartTitle: '월 클릭 수',
    bars: [{ label: '11월', value: 1330, text: '1,330회' }, { label: '12월', value: 6900, text: '6,900회', hi: true }],
    kpis: [{ num: '179', unit: '건', label: '신청하기 전환', detail: '11월 0건 → 12월 179건' }, { num: '5.2', unit: '배', label: '클릭 수', detail: '1,330 → 6,900회' }, { num: '9.46', unit: '%', label: '영상 시청률 (VTR)', detail: '8.53% → 9.46% (영상비 −7%)' }, { num: '1.35', unit: '%', label: '이미지 소재 CTR', detail: '영상 소재 CTR 0.11%의 12배' }],
    note: '기간: 11월 vs 12월 · 광고비 192만 → 1,476만 원(마크업 포함, VAT 별도) · 신청당 비용 8.2만 원 · 메타 광고관리자 기준' },
]

export const REF_GROUPS = [
  { id: 'all', name: '전체' }, { id: 'naver', name: '네이버' }, { id: 'google', name: '구글' },
  { id: 'meta', name: '메타' }, { id: 'da', name: '디스플레이(DA)' }, { id: 'sns', name: 'SNS' },
]

const Chart = ({ c }: { c: RefCase }) => {
  const max = Math.max(...c.bars.map(b => b.value))
  return (
    <div class="pr-chart">
      <b class="pr-chart-cap">{c.chartTitle}</b>
      <div class="pr-bars" style={`--n:${c.bars.length}`}>
        {c.bars.map(b => (
          <div class={'pr-bar' + (b.hi ? ' is-hi' : '') + (b.pending ? ' is-pending' : '')} key={b.label}>
            <span class="pr-bar-val">{b.text}{b.sub && <small>{b.sub}</small>}</span>
            <span class="pr-bar-fill" style={`--h:${Math.max(8, Math.round(b.value / max * 100))}%`}></span>
            <span class="pr-bar-x">{b.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export const RefDetail = ({ c }: { c: RefCase }) => (
  <article class="pr-case" data-group={c.group}>
    <div class="pr-case-head">
      {c.media.map(m => <span class="pr-media" key={m}>{m}</span>)}
      <span class="pr-client">{c.client}</span>
    </div>
    <h3 class="pr-headline">{c.title[0]}<br /><em>{c.title2}</em></h3>
    <p class="pr-summary">{c.desc}</p>
    <div class="pr-case-body">
      <Chart c={c} />
      <div class="pr-kpis">
        {c.kpis.map(k => <div class="pr-kpi" key={k.label}><strong>{k.num}<small>{k.unit}</small></strong><b>{k.label}</b><span>{k.detail}</span></div>)}
      </div>
    </div>
    <p class="pr-note">{c.note}</p>
  </article>
)

// 매체 탭 + 사례 한 장씩 넘기기 (휴대폰은 밀어서 넘김)
export const RefSection = () => (
  <section class="pm-section pr-section" id="pm-reference">
    <div class="container">
      <div class="section-head"><span class="sec-label">Reference</span><h2 class="sec-title">매체별 광고<br /><em>성과 레퍼런스</em></h2><p class="sec-sub">실제 운영 계정 데이터입니다. 광고주명은 업종과 이니셜로 표기했습니다.</p></div>
      <div class="pr-tabs" role="tablist">
        {REF_GROUPS.map((g, i) => <button type="button" role="tab" class={'pr-tab' + (i === 0 ? ' is-on' : '')} data-g={g.id} key={g.id}>{g.name}<span>{g.id === 'all' ? REF_CASES.length : REF_CASES.filter(c => c.group === g.id).length}</span></button>)}
      </div>
      <div class="pr-viewport">
        <button type="button" class="pr-nav pr-prev" aria-label="이전 사례">‹</button>
        <div class="pr-track">{REF_CASES.map((c, i) => <div class={'pr-slide' + (i === 0 ? ' is-on' : '')} data-ref={`ref-${c.id}`} data-group={c.group} key={c.id}><RefDetail c={c} /></div>)}</div>
        <button type="button" class="pr-nav pr-next" aria-label="다음 사례">›</button>
      </div>
    </div>
    <script dangerouslySetInnerHTML={{ __html: `
(function(){
  var sec=document.currentScript.closest('section'); var slides=[].slice.call(sec.querySelectorAll('.pr-slide')); var tabs=[].slice.call(sec.querySelectorAll('.pr-tab'));
  var g='all', cur=0;
  function vis(){ return slides.filter(function(s){ return g==='all'||s.dataset.group===g; }); }
  function show(i){ var v=vis(); cur=(i+v.length)%v.length; slides.forEach(function(s){ s.classList.toggle('is-on', s===v[cur]); }); }
  tabs.forEach(function(t){ t.addEventListener('click',function(){ tabs.forEach(function(x){x.classList.toggle('is-on',x===t);}); g=t.dataset.g; show(0); }); });
  // 포트폴리오의 광고 성과 카드에서 #ref-<id> 로 들어오면 그 사례를 펼치고 구간 머리부터 보이게 한다
  function fromHash(){ var i=slides.findIndex(function(s){ return '#'+s.dataset.ref===location.hash; }); if(i<0)return; tabs.forEach(function(x){x.classList.toggle('is-on',x.dataset.g==='all');}); g='all'; show(i);
    var go=function(){ window.scrollTo(0, sec.getBoundingClientRect().top + window.scrollY - 70); }; go(); window.addEventListener('load', go, { once:true }); }
  window.addEventListener('hashchange',fromHash); fromHash();
  sec.querySelector('.pr-prev').addEventListener('click',function(){show(cur-1);}); sec.querySelector('.pr-next').addEventListener('click',function(){show(cur+1);});
  var x0=null; sec.querySelector('.pr-track').addEventListener('touchstart',function(e){x0=e.touches[0].clientX;},{passive:true});
  sec.querySelector('.pr-track').addEventListener('touchend',function(e){ if(x0===null)return; var dx=e.changedTouches[0].clientX-x0; if(Math.abs(dx)>50) show(cur+(dx<0?1:-1)); x0=null; });
})();` }} />
  </section>
)
