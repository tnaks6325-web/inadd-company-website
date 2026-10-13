#!/usr/bin/env node
// ─────────────────────────────────────────────
//  노션 '📝 블로그 글' → 홈페이지 인사이트 자동 발행
//
//  상태가 '승인'인 글을 찾아 /api/blog/insight 로 올리고, 노션에
//  상태=발행됨 · 홈페이지 URL · 홈페이지 글 ID · 발행일을 적는다.
//  같은 노션 페이지를 다시 '승인'하면 같은 글을 수정한다(notionId 기준).
//  실패하면 상태=수정요청, 검토 메모 맨 앞에 [발행 오류 날짜] 이유를 적는다.
//
//  본문은 '## 📋 네이버 블로그용 원고' 제목 앞(바로 앞 구분선 포함)까지만 올린다.
//
//  열쇠(저장소에 넣지 않음):
//    ~/.config/inadd/notion-token   노션 내부 연결 비밀 열쇠
//    ~/.config/inadd/blog-api-key   발행 API 키 원문 (코드에는 SHA-256 만)
//
//  사용: node scripts/notion-publish.mjs [--dry-run] [--no-notion-write] [--site http://localhost:5173] [--page <노션 페이지 ID>]
//    --dry-run  홈페이지·노션에 쓰지 않고 변환 결과만 scripts/.notion-publish-out/ 에 저장
//    --no-notion-write  홈페이지에는 올리되 노션은 바꾸지 않음(로컬 시험용)
//    --page     상태와 상관없이 그 페이지만 처리(--dry-run 과 같이 쓰는 용도)
//  예약 실행: ~/Library/LaunchAgents/com.sooman.inadd-notion-publish.plist (30분마다)
// ─────────────────────────────────────────────
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const DATA_SOURCE_ID = '154401ee-3daf-4f95-b1af-fc3fb74e32a5' // 📝 블로그 글
const NOTION_VERSION = '2025-09-03'
const UA = 'Mozilla/5.0 (Macintosh) inadd-notion-publish/1.0' // Cloudflare 가 기본 UA 를 막는다

const args = process.argv.slice(2)
const DRY = args.includes('--dry-run')
const argVal = (name) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : undefined }
const SITE = (argVal('--site') || 'https://www.inadcompany.co.kr').replace(/\/$/, '')
const ONLY_PAGE = argVal('--page')
const NO_NOTION_WRITE = args.includes('--no-notion-write') // 로컬 시험용: 홈페이지에는 올리되 노션은 바꾸지 않음

const readKey = (name) => readFileSync(join(homedir(), '.config/inadd', name), 'utf8').trim()
const NOTION_TOKEN = readKey('notion-token')
const BLOG_KEY = DRY ? '' : readKey('blog-api-key')

const MAIN_CAT = { '콘텐츠 별 전략': 'content-strategy', '실전 사례': 'case-study' }
const SUB_CAT = { 바이럴: 'viral', 인플루언서: 'influencer', 체험단: 'seeding', SEO: 'seo', 리뷰: 'review', 올리브영: 'oliveyoung', PPL: 'ppl' }
const NAVER_HEADING = '네이버 블로그용 원고'
const NAVER_URL_PLACEHOLDER = '(발행 후 홈페이지 URL이 여기에 들어갑니다)'

const today = () => new Date(Date.now() + 9 * 3600e3).toISOString().slice(0, 10) // 한국 날짜
const log = (...m) => console.log(`[${new Date().toISOString()}]`, ...m)

// ── 노션 API ──
async function notion(path, { method = 'GET', body } = {}) {
  for (let attempt = 0; ; attempt++) {
    const res = await fetch(`https://api.notion.com/v1${path}`, {
      method,
      headers: { Authorization: `Bearer ${NOTION_TOKEN}`, 'Notion-Version': NOTION_VERSION, 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    })
    if (res.status === 429 && attempt < 3) { await new Promise(r => setTimeout(r, 1500 * (attempt + 1))); continue }
    const json = await res.json().catch(() => ({}))
    if (!res.ok) throw new Error(`노션 ${method} ${path} → ${res.status} ${json.message || ''}`)
    return json
  }
}

async function children(blockId) {
  const out = []
  let cursor
  do {
    const r = await notion(`/blocks/${blockId}/children?page_size=100${cursor ? `&start_cursor=${cursor}` : ''}`)
    out.push(...r.results)
    cursor = r.has_more ? r.next_cursor : undefined
  } while (cursor)
  for (const b of out) if (b.has_children && b.type !== 'child_page' && b.type !== 'child_database') b._children = await children(b.id)
  return out
}

// ── 홈페이지 API ──
async function site(path, { method = 'GET', body } = {}) {
  const res = await fetch(`${SITE}${path}`, {
    method,
    headers: { 'X-Blog-Key': BLOG_KEY, 'Content-Type': 'application/json', 'User-Agent': UA },
    body: body ? JSON.stringify(body) : undefined,
  })
  const json = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(`홈페이지 ${method} ${path} → ${res.status} ${json.error || ''}`)
  return json
}

// 노션 파일(1시간 뒤 만료되는 주소)은 홈페이지 저장소로 옮긴다
async function rehostImage(url) {
  if (DRY) return url
  const res = await fetch(url)
  if (!res.ok) throw new Error(`이미지 내려받기 실패 ${res.status}`)
  const type = res.headers.get('content-type') || 'image/png'
  const buf = Buffer.from(await res.arrayBuffer())
  if (buf.length > 5 * 1024 * 1024) throw new Error('이미지가 5MB 를 넘습니다. 노션에서 줄여 주세요.')
  const r = await site('/api/blog/insight/thumb', { method: 'POST', body: { dataUrl: `data:${type};base64,${buf.toString('base64')}` } })
  return r.url
}

// ── 노션 블록 → HTML ──
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
const plain = (rt = []) => rt.map(t => t.plain_text).join('')

function richText(rt = []) {
  return rt.map(t => {
    let s = esc(t.plain_text).replace(/\n/g, '<br>')
    const a = t.annotations || {}
    if (a.code) s = `<code>${s}</code>`
    if (a.bold) s = `<strong>${s}</strong>`
    if (a.italic) s = `<em>${s}</em>`
    if (a.strikethrough) s = `<s>${s}</s>`
    if (a.underline) s = `<u>${s}</u>`
    const href = t.href || t.text?.link?.url
    if (href && /^https?:\/\//.test(href)) s = `<a href="${esc(href)}" target="_blank" rel="noopener">${s}</a>`
    return s
  }).join('')
}

async function blocksToHtml(blocks, ctx) {
  let html = ''
  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i]
    const t = b.type
    // 같은 종류의 목록 항목은 하나의 목록으로 묶는다
    if (t === 'bulleted_list_item' || t === 'numbered_list_item') {
      const tag = t === 'bulleted_list_item' ? 'ul' : 'ol'
      let items = ''
      while (i < blocks.length && blocks[i].type === t) {
        const it = blocks[i]
        items += `<li>${richText(it[t].rich_text)}${it._children ? await blocksToHtml(it._children, ctx) : ''}</li>`
        i++
      }
      i--
      html += `<${tag}>${items}</${tag}>`
      continue
    }
    const v = b[t] || {}
    const kids = b._children && t !== 'table' ? await blocksToHtml(b._children, ctx) : ''
    switch (t) {
      case 'paragraph': html += plain(v.rich_text).trim() ? `<p>${richText(v.rich_text)}</p>${kids}` : kids; break
      case 'heading_1': html += `<h2>${richText(v.rich_text)}</h2>${kids}`; break // 글 제목이 h1 이라 본문은 h2 부터
      case 'heading_2': html += `<h2>${richText(v.rich_text)}</h2>${kids}`; break
      case 'heading_3': html += `<h3>${richText(v.rich_text)}</h3>${kids}`; break
      case 'quote': html += `<blockquote><p>${richText(v.rich_text)}</p>${kids}</blockquote>`; break
      case 'callout': html += `<div class="ins-callout"><p>${richText(v.rich_text)}</p>${kids}</div>`; break
      case 'divider': html += '<hr>'; break
      case 'code': html += `<pre><code>${esc(plain(v.rich_text))}</code></pre>`; break
      case 'toggle': html += `<details><summary>${richText(v.rich_text)}</summary>${kids}</details>`; break
      case 'image': {
        const src = v.type === 'external' ? v.external.url : await rehostImage(v.file.url)
        const caption = plain(v.caption)
        if (!ctx.firstImage) ctx.firstImage = src
        html += `<figure><img src="${esc(src)}" alt="${esc(caption || ctx.title)}" loading="lazy">${caption ? `<figcaption>${esc(caption)}</figcaption>` : ''}</figure>`
        break
      }
      case 'table': {
        const rows = b._children || []
        html += '<table>' + rows.map((r, ri) => {
          const head = ri === 0 && v.has_column_header
          const cell = head ? 'th' : 'td'
          return `<tr>${r.table_row.cells.map(c => `<${cell}>${richText(c)}</${cell}>`).join('')}</tr>`
        }).join('') + '</table>'
        break
      }
      case 'bookmark': case 'embed': case 'link_preview':
        if (v.url) html += `<p><a href="${esc(v.url)}" target="_blank" rel="noopener">${esc(plain(v.caption) || v.url)}</a></p>`
        break
      default: ctx.skipped.add(t) // 동영상·하위 페이지 등은 올리지 않는다
    }
  }
  return html
}

// 네이버 원고 제목 앞(바로 앞 구분선 포함)까지만
function bodyBlocks(blocks) {
  const idx = blocks.findIndex(b => b.type?.startsWith('heading_') && plain(b[b.type].rich_text).includes(NAVER_HEADING))
  if (idx < 0) return { body: blocks, naver: [] }
  let end = idx
  if (end > 0 && blocks[end - 1].type === 'divider') end--
  return { body: blocks.slice(0, end), naver: blocks.slice(idx) }
}

function prop(page, name) {
  const p = page.properties[name]
  if (!p) return ''
  if (p.type === 'title') return plain(p.title)
  if (p.type === 'rich_text') return plain(p.rich_text)
  if (p.type === 'select') return p.select?.name || ''
  if (p.type === 'url') return p.url || ''
  return ''
}

function keywords(text) {
  return text.split(/[\/,·\n]+/).map(s => s.replace(/^\s*보조\s*:\s*/, '').trim()).filter(Boolean).slice(0, 10)
}

// 네이버 원고의 '전체 글 보기' 자리 표시를 실제 주소로 바꾼다
async function fillNaverLink(naverBlocks, url) {
  const walk = (bs) => bs.flatMap(b => [b, ...(b._children ? walk(b._children) : [])])
  for (const b of walk(naverBlocks)) {
    const v = b[b.type]
    if (!v?.rich_text || !plain(v.rich_text).includes(NAVER_URL_PLACEHOLDER)) continue
    const rich_text = v.rich_text.map(t => t.type === 'text' && t.plain_text.includes(NAVER_URL_PLACEHOLDER)
      ? { type: 'text', text: { content: t.plain_text.replace(NAVER_URL_PLACEHOLDER, url), link: null }, annotations: t.annotations }
      : t)
    await notion(`/blocks/${b.id}`, { method: 'PATCH', body: { [b.type]: { rich_text } } })
  }
}

async function publishPage(page) {
  const title = prop(page, '제목')
  const ctx = { title, firstImage: null, skipped: new Set() }
  const all = await children(page.id)
  const { body, naver } = bodyBlocks(all)
  const content = await blocksToHtml(body, ctx)
  if (!title || !content) throw new Error('제목이나 본문이 비어 있습니다.')
  const cover = page.cover ? (page.cover.type === 'external' ? page.cover.external.url : await rehostImage(page.cover.file.url)) : null
  const summary = prop(page, '요약')
  const post = {
    notionId: page.id,
    title,
    summary,
    metaDescription: summary,
    content,
    mainCategory: MAIN_CAT[prop(page, '분류')] || 'content-strategy',
    subCategory: SUB_CAT[prop(page, '서비스')] || undefined,
    keywords: keywords(prop(page, '타깃 키워드')),
    ...(cover || ctx.firstImage ? { thumbnail: cover || ctx.firstImage } : {}),
  }
  if (ctx.skipped.size) log(`  올리지 않은 블록 종류: ${[...ctx.skipped].join(', ')}`)
  if (DRY) {
    const dir = join(dirname(fileURLToPath(import.meta.url)), '.notion-publish-out')
    mkdirSync(dir, { recursive: true })
    writeFileSync(join(dir, `${page.id}.json`), JSON.stringify(post, null, 2))
    writeFileSync(join(dir, `${page.id}.html`), `<!doctype html><meta charset="utf-8"><h1>${esc(title)}</h1>${content}`)
    log(`  [미리보기] ${title} → ${dir}/${page.id}.html (본문 ${content.length}자)`)
    return
  }
  const r = await site('/api/blog/insight', { method: 'POST', body: post })
  const url = r.post?.url
  if (NO_NOTION_WRITE) { log(`  [노션 미변경] ${r.created ? '새로 발행' : '수정 반영'}: ${title} → ${url}`); return }
  await notion(`/pages/${page.id}`, { method: 'PATCH', body: { properties: {
    상태: { select: { name: '발행됨' } },
    '홈페이지 URL': { url },
    '홈페이지 글 ID': { rich_text: [{ type: 'text', text: { content: r.post.id } }] },
    발행일: { date: { start: today() } },
  } } })
  await fillNaverLink(naver, url).catch(e => log(`  네이버 원고 주소 채우기 실패(발행은 완료): ${e.message}`))
  log(`  ${r.created ? '새로 발행' : '수정 반영'}: ${title} → ${url}`)
}

async function markFailed(page, err) {
  const memo = prop(page, '검토 메모')
  await notion(`/pages/${page.id}`, { method: 'PATCH', body: { properties: {
    상태: { select: { name: '수정요청' } },
    '검토 메모': { rich_text: [{ type: 'text', text: { content: `[발행 오류 ${today()}] ${err.message}\n${memo}`.slice(0, 1900) } }] },
  } } })
}

async function main() {
  let pages
  if (ONLY_PAGE) {
    pages = [await notion(`/pages/${ONLY_PAGE}`)]
  } else {
    const r = await notion(`/data_sources/${DATA_SOURCE_ID}/query`, { method: 'POST', body: {
      filter: { property: '상태', select: { equals: '승인' } }, page_size: 20,
    } })
    pages = r.results
  }
  if (!pages.length) return
  log(`처리할 글 ${pages.length}개${DRY ? ' (미리보기)' : ''}`)
  let failed = 0
  for (const page of pages) {
    try { await publishPage(page) }
    catch (e) {
      failed++
      log(`  실패: ${prop(page, '제목')} — ${e.message}`)
      if (!DRY && !NO_NOTION_WRITE) await markFailed(page, e).catch(e2 => log(`  노션에 실패 기록도 못 함: ${e2.message}`))
    }
  }
  process.exitCode = failed ? 1 : 0
}

main().catch(e => { log('중단:', e.message); process.exitCode = 1 })
