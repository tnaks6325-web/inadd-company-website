// 개편 서비스 페이지 — 매체별 광고 성과 사례(퍼포먼스·구독, 2026-11-07 대표: 성과 사례는 새 디자인으로 살림).
// 내용은 운영 페이지와 같은 REF_CASES(svc-performance-ref.tsx — 포트폴리오 광고 성과 카드도 같은 목록). 모양은 /static/renewal/svc.css(.cs*), 넘기기는 svc.js.
// 슬라이드 id 는 예전과 같은 ref-<id> 라 포트폴리오의 /marketing/performance#ref-<id> 링크가 그대로 그 사례를 연다.
import { REF_CASES, REF_GROUPS, type RefCase } from '../svc-performance-ref'

const Bars = ({ c }: { c: RefCase }) => {
  const max = Math.max(...c.bars.map(b => b.value))
  return (
    <div class="cs-chart">
      <span class="mono">{c.chartTitle}</span>
      <div class="cs-bars" style={`--n:${c.bars.length}`}>
        {c.bars.map(b => (
          <div class={'cs-bar' + (b.hi ? ' hi' : '') + (b.pending ? ' pend' : '')}>
            <span class="v">{b.text}{b.sub && <small>{b.sub}</small>}</span>
            <span class="f" style={`--h:${Math.max(8, Math.round(b.value / max * 100))}%`}></span>
            <span class="x mono">{b.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export const SvcCases = () => (
  <div class="cs" data-cases>
    <div class="cs-tabs" role="tablist">
      {REF_GROUPS.map((g, i) => (
        <button type="button" role="tab" class={i === 0 ? 'on' : ''} data-case-tab={g.id}>
          {g.name}<span class="mono">{g.id === 'all' ? REF_CASES.length : REF_CASES.filter(c => c.group === g.id).length}</span>
        </button>
      ))}
    </div>
    <div class="cs-track">
      {REF_CASES.map((c, i) => (
        <article class={'cs-case' + (i === 0 ? ' on' : '')} id={`ref-${c.id}`} data-case data-group={c.group}>
          <div class="cs-head">
            {c.media.map(m => <span class="cs-media">{m}</span>)}
            <span class="cs-client">{c.client}</span>
          </div>
          <h3 class="cs-t">{c.title[0]}<br /><em>{c.title2}</em></h3>
          <p class="cs-d">{c.desc}</p>
          <div class="cs-body">
            <Bars c={c} />
            <div class="cs-kpis">
              {c.kpis.map(k => <div><b>{k.num}<small>{k.unit}</small></b><span class="l">{k.label}</span><span class="dt">{k.detail}</span></div>)}
            </div>
          </div>
          <p class="cs-note">{c.note}</p>
        </article>
      ))}
    </div>
    <div class="cs-nav">
      <button type="button" data-case-prev aria-label="이전 사례">←</button>
      <span class="mono" data-case-n>01 / {String(REF_CASES.length).padStart(2, '0')}</span>
      <button type="button" data-case-next aria-label="다음 사례">→</button>
    </div>
  </div>
)
