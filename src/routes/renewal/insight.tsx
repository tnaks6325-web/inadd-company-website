import { raw } from 'hono/html'
// 개편 인사이트(2026-11-09 대표: 포트폴리오 다음 인사이트, 목록은 썸네일 갤러리형·서비스별 작은 탭·인애드 일상) — 시안 lab/insight.html·insight-detail.html 을 옮긴 것.
// 틀은 insight-body.html·insight-detail-body.html(→ 미리 채운 *.gen.html, 메뉴·바닥 포함), 모양·움직임은 /static/renewal/insight.*·insight-detail.js.
// 글은 관리자 글(insight_posts)을 src/main.tsx 가 이 파일의 부품으로 표식 자리에 채운다(검색 로봇이 글을 읽도록 서버에서 그림).
// 예전 인사이트는 ../insight(InsightPage·insight-hero), ../insight-detail(InsightDetailPage).
import listBody from './insight-body.gen.html?raw'
import detailBody from './insight-detail-body.gen.html?raw'
import { postPath, plainText, type InsightPost } from '../../lib/insight-posts'

const V = '20261113b'
const css = (f: string) => <link rel="stylesheet" href={`/static/renewal/${f}?v=${V}`} />
const js = (f: string) => <script src={`/static/renewal/${f}?v=${V}`}></script>

// 분류 이름 — 화면 스크립트(insight.js CAT·SUB)와 같게. 띄어쓰기는 시안(콘텐츠별)대로, 관리자 화면 이름(lib CAT_LABEL)은 그대로 둔다
export const CAT: Record<string, string> = { 'content-strategy': '콘텐츠별 전략', 'case-study': '실전 사례', resources: '실무 자료실' }
export const SUB: Record<string, string> = { viral: '바이럴 마케팅', influencer: '인플루언서', seeding: '체험단', seo: 'SEO', review: '리뷰', oliveyoung: '올리브영', ppl: 'PPL' }

// 제목의 ' — ' 뒤는 부제로
const split = (t: string) => { const [a, ...b] = (t || '').split(' — '); return [a.trim(), b.join(' — ').trim()] as const }
const day = (p: InsightPost) => (p.createdAt || '').slice(0, 10)
const dot = (d: string) => d.replace(/-/g, '.')
const Arrow = ({ cls }: { cls?: string }) => <svg class={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>
const Thumb = ({ p }: { p: InsightPost }) => (p.thumbnail ? <img src={p.thumbnail} alt="" loading="lazy" onerror="this.remove()" /> : '')

// ── 목록: 맨 위 글 하나 크게 ──
export const InsightFeat = ({ post: p }: { post: InsightPost }) => {
  const [t, s] = split(p.title)
  return (
    <>
      <div class="feat-h"><span class="mono">( 01 ) LATEST</span><span class="mono">{day(p)}</span></div>
      <a class="feat-a" href={postPath(p)} data-feat>
        <div class="feat-pic" data-feat-pic>{p.thumbnail ? <img src={p.thumbnail} alt="" onerror="this.remove()" /> : ''}</div>
        <div>
          <div class="feat-meta mono"><span>{CAT[p.mainCategory || ''] || '인사이트'}</span>{p.subCategory && SUB[p.subCategory] ? <span>{SUB[p.subCategory]}</span> : ''}</div>
          <h2 class="feat-t">{t}{s ? <small>{s}</small> : ''}</h2>
          <p class="feat-s">{p.summary || ''}</p>
          <span class="more">글 읽기 <Arrow /></span>
        </div>
      </a>
    </>
  )
}

// ── 목록: 글 카드(컴퓨터 3열 갤러리, 휴대폰 썸네일 왼쪽 줄) — 화면 스크립트가 탭으로 거르고 첫 화면 제목 흐름에도 씀 ──
export const InsightRows = ({ posts }: { posts: InsightPost[] }) => (
  <>
    {posts.map((p, i) => {
      const [t, s] = split(p.title)
      const sub = p.subCategory && SUB[p.subCategory]
      return (
        <a class="ir" href={postPath(p)} data-i={String(i)} data-main={p.mainCategory || ''} data-subcat={p.subCategory || ''} data-date={day(p)}>
          <span class="th"><Thumb p={p} /></span>
          <span class="mono d">{dot(day(p))}</span>
          <span class="mono c">{CAT[p.mainCategory || ''] || '인사이트'}{sub ? <> <small>{sub}</small></> : ''}</span>
          <span class="tt">{t}{s ? <small>{s}</small> : ''}</span>
          <span class="sm">{p.summary || ''}</span>
          <Arrow cls="ar" />
        </a>
      )
    })}
  </>
)

// ── 글: 첫 화면 + 본문 + 다른 인사이트 3개(같은 분류 먼저) ──
export const RenewalInsightDetail = ({ post, posts }: { post: InsightPost | null; posts: InsightPost[] }) => {
  if (!post) {
    return (
      <section class="dh wrap" data-bg="ink">
        <a class="back" href="/insight"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5" /><path d="m11 6-6 6 6 6" /></svg>인사이트 목록</a>
        <div class="dh-meta mono"><b>404</b></div>
        <h1 class="dh-t">글을 찾을 수 없습니다</h1>
        <p class="dh-st">주소가 바뀌었거나 내려간 글입니다. 목록에서 다른 글을 찾아보세요.</p>
      </section>
    )
  }
  const [t, s] = split(post.title)
  // 읽는 시간: 공백 뺀 글자 500자에 1분(시안과 같은 기준)
  const minutes = Math.max(1, Math.round(plainText(post.content, 1e9).replace(/\s/g, '').length / 500))
  const others = posts.filter(p => p.id !== post.id)
  const rel = others.filter(p => p.mainCategory === post.mainCategory).concat(others.filter(p => p.mainCategory !== post.mainCategory)).slice(0, 3)
  return (
    <>
      <section class="dh wrap" data-bg="ink">
        <a class="back" href="/insight"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5" /><path d="m11 6-6 6 6 6" /></svg>인사이트 목록</a>
        <div class="dh-meta mono" data-meta>
          <b>{CAT[post.mainCategory || ''] || '인사이트'}</b>
          {post.subCategory && SUB[post.subCategory] ? <span>{SUB[post.subCategory]}</span> : ''}
          <time datetime={post.createdAt || ''}>{dot(day(post))}</time>
          <span>읽는 시간 약 {minutes}분</span>
        </div>
        <h1 class="dh-t" data-t>{t}</h1>
        {s ? <p class="dh-st" data-st>{s}</p> : ''}
        {post.thumbnail ? <div class="dh-pic" data-pic><img src={post.thumbnail} alt={post.title} onerror="this.remove()" /></div> : ''}
      </section>
      <section class="read wrap" data-bg="paper">
        <aside class="toc" data-toc><span class="mono">CONTENTS</span></aside>
        <article>
          {post.summary ? <p class="lead">{post.summary}</p> : ''}
          <div class="art" data-art>{raw(post.content || '<p>본문이 없습니다.</p>')}</div>
        </article>
        <div class="sp"></div>
      </section>
      {rel.length > 0 && (
        <section class="rel wrap" data-bg="ink">
          <div class="rel-h"><span class="mono">MORE INSIGHT</span><a class="more" href="/insight">전체 글 보기 <Arrow /></a></div>
          <div class="rel-g" data-rel>
            {rel.map(p => (
              <a class="rc" href={postPath(p)}>
                <div class="pic"><Thumb p={p} /></div>
                <div class="m mono"><span>{(p.subCategory && SUB[p.subCategory]) || CAT[p.mainCategory || ''] || '인사이트'}</span><span>{dot(day(p))}</span></div>
                <b>{split(p.title)[0]}</b>
              </a>
            ))}
          </div>
        </section>
      )}
    </>
  )
}

const libs = (
  <>
    {js('data.js')}
    <script src="https://cdn.jsdelivr.net/npm/lenis@1.1.13/dist/lenis.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/SplitText.min.js"></script>
    {js('base.js')}
  </>
)

export const renewalInsightHead = (
  <>
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/lenis@1.1.13/dist/lenis.css" />
    {css('base.css')}
    {css('insight.css')}
  </>
)

export const renewalInsightBody = { 'data-nav': 'insight' }

// 목록 — 글은 src/main.tsx 가 표식 자리에 채운다(못 채우면 '아직 등록된 글이 없습니다')
export const RenewalInsightPage = () => (
  <>
    {raw(listBody)}
    <script dangerouslySetInnerHTML={{ __html: 'window.INAD_LIVE = true;' }} />
    {libs}
    {js('insight.js')}
  </>
)

// 글 — 렌더러(bare)로 머리(검색 정보)를 받고, 본문은 이 페이지가 직접 그림
export const RenewalInsightDetailPage = ({ post, posts }: { post: InsightPost | null; posts: InsightPost[] }) => {
  const [before, after] = detailBody.split('<!--ins-detail-->')
  return (
    <>
      {raw(before)}<RenewalInsightDetail post={post} posts={posts} />{raw(after)}
      <script dangerouslySetInnerHTML={{ __html: 'window.INAD_LIVE = true;' }} />
      {libs}
      {js('insight-detail.js')}
    </>
  )
}
