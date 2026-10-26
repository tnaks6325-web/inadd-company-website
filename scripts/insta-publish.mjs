#!/usr/bin/env node
// ─────────────────────────────────────────────
//  노션 '🎞 2. 릴스 제작' 카드뉴스 → 인스타그램(@inadcompany.official) 자동 게시
//
//  카드뉴스 상태가 '확정'이고 카드뉴스 게시일(예정일)이 오늘 이전인 것 중 하나를 골라
//  한국 시각 12시 이후, 하루 1세트만 메타 공식 API 로 캐러셀 게시한다.
//  게시하면 노션에 카드뉴스 상태=게시됨 · 카드뉴스 게시일=오늘 · 카드뉴스 주소=게시물 주소를 적는다.
//  실패하면 카드뉴스 상태=미리보기로 되돌리고 차단 사유 맨 앞에 [인스타 게시 오류 날짜] 이유를 적는다.
//
//  카드 이미지: 노션 '카드뉴스 폴더' 칸의 맥 폴더 안 PNG/JPG(이름순 = 게시 순서, 2~10장).
//  JPEG 로 바꿔(sips) 홈페이지 이미지 저장소(/api/blog/insight/thumb)에 올린 공개 주소를 메타에 넘긴다.
//  캡션 = 캡션 칸 + 해시태그 칸(최대 5개).
//
//  열쇠(저장소에 넣지 않음):
//    ~/.config/inadd/notion-token   노션 내부 연결 비밀 열쇠
//    ~/.config/inadd/blog-api-key   홈페이지 이미지 업로드 키
//    ~/.config/inadd/meta-ig-token  메타 시스템 사용자 열쇠(instagram_content_publish 포함)
//
//  사용: node scripts/insta-publish.mjs [--dry-run] [--no-notion-write] [--page <노션 페이지 ID>]
//    --dry-run   이미지 변환·캡션·계정 확인까지만. 업로드·게시·노션 변경 없음
//    --no-notion-write  게시는 하되 노션은 바꾸지 않음
//    --page      상태·예정일·시각·하루 1세트 조건과 상관없이 그 페이지만 처리(--dry-run 과 같이 쓰는 용도)
//  예약 실행: ~/Library/LaunchAgents/com.sooman.inadd-insta-publish.plist (30분마다)
// ─────────────────────────────────────────────
import { readFileSync, readdirSync, mkdtempSync, rmSync, statSync } from 'node:fs'
import { homedir, tmpdir } from 'node:os'
import { join } from 'node:path'
import { execFileSync } from 'node:child_process'
import { ACCOUNT, buildCaption, checkCardCount, kstDate, pickCardFiles, pickDue } from './insta-publish-lib.mjs'

const DATA_SOURCE_ID = '337336ce-80bf-4e20-9597-b485cec92830' // 🎞 2. 릴스 제작
const PAGE_ID = '1132941699905387' // 페이스북 페이지 '인애드컴퍼니'(인스타 계정이 연결된 곳)
const NOTION_VERSION = '2025-09-03'
const GRAPH = 'https://graph.facebook.com/v26.0'
const SITE = 'https://www.inadcompany.co.kr'
const UA = 'Mozilla/5.0 (Macintosh) inadd-insta-publish/1.0' // Cloudflare 가 기본 UA 를 막는다

const args = process.argv.slice(2)
const DRY = args.includes('--dry-run')
const NO_NOTION_WRITE = args.includes('--no-notion-write')
const argVal = (name) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : undefined }
const ONLY_PAGE = argVal('--page')

const readKey = (name) => readFileSync(join(homedir(), '.config/inadd', name), 'utf8').trim()
const NOTION_TOKEN = readKey('notion-token')
const IG_TOKEN = readKey('meta-ig-token')
const BLOG_KEY = DRY ? '' : readKey('blog-api-key')

const log = (...m) => console.log(`[${new Date().toISOString()}]`, ...m)
const sleep = (ms) => new Promise(r => setTimeout(r, ms))

// ── 노션 API ──
async function notion(path, { method = 'GET', body } = {}) {
  for (let attempt = 0; ; attempt++) {
    const res = await fetch(`https://api.notion.com/v1${path}`, {
      method,
      headers: { Authorization: `Bearer ${NOTION_TOKEN}`, 'Notion-Version': NOTION_VERSION, 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    })
    if (res.status === 429 && attempt < 3) { await sleep(1500 * (attempt + 1)); continue }
    const json = await res.json().catch(() => ({}))
    if (!res.ok) throw new Error(`노션 ${method} ${path} → ${res.status} ${json.message || ''}`)
    return json
  }
}

const plain = (rt = []) => rt.map(t => t.plain_text).join('')
function prop(page, name) {
  const p = page.properties[name]
  if (!p) return ''
  if (p.type === 'title') return plain(p.title)
  if (p.type === 'rich_text') return plain(p.rich_text)
  if (p.type === 'select') return p.select?.name || ''
  if (p.type === 'date') return p.date?.start || ''
  if (p.type === 'url') return p.url || ''
  return ''
}

async function queryCards(status) {
  const r = await notion(`/data_sources/${DATA_SOURCE_ID}/query`, { method: 'POST', body: {
    filter: { property: '카드뉴스 상태', select: { equals: status } }, page_size: 50,
  } })
  return r.results
}

// ── 메타(인스타) API ── 열쇠는 주소가 아니라 헤더로 보내 기록에 남지 않게 한다
async function graph(path, { method = 'GET', params } = {}) {
  const url = new URL(`${GRAPH}${path}`)
  const init = { method, headers: { Authorization: `Bearer ${IG_TOKEN}` } }
  if (method === 'GET') for (const [k, v] of Object.entries(params || {})) url.searchParams.set(k, v)
  else init.body = new URLSearchParams(params || {})
  const res = await fetch(url, init)
  const json = await res.json().catch(() => ({}))
  if (!res.ok || json.error) throw new Error(`메타 ${method} ${path} → ${res.status} ${json.error?.error_user_msg || json.error?.message || ''}`)
  return json
}

async function igAccount() {
  const r = await graph(`/${PAGE_ID}`, { params: { fields: 'instagram_business_account{id,username}' } })
  const ig = r.instagram_business_account
  if (!ig?.id) throw new Error('페이지에 연결된 인스타 계정을 찾지 못했습니다.')
  if (ig.username !== ACCOUNT) throw new Error(`연결된 계정이 @${ig.username} 입니다. @${ACCOUNT} 가 아니면 올리지 않습니다.`)
  return ig.id
}

// ── 이미지 ──
function prepareImages(folder) {
  if (!folder) throw new Error('카드뉴스 폴더 칸이 비어 있습니다.')
  const dir = folder.replace(/^~(?=\/)/, homedir())
  if (!statSync(dir, { throwIfNoEntry: false })?.isDirectory()) throw new Error(`카드뉴스 폴더를 찾지 못했습니다: ${folder}`)
  const files = pickCardFiles(readdirSync(dir))
  const bad = checkCardCount(files.length)
  if (bad) throw new Error(bad)
  const tmp = mkdtempSync(join(tmpdir(), 'insta-publish-'))
  const jpgs = files.map((f, i) => {
    const out = join(tmp, `${String(i + 1).padStart(2, '0')}.jpg`)
    execFileSync('/usr/bin/sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', '90', join(dir, f), '--out', out], { stdio: 'ignore' })
    const size = statSync(out).size
    if (size > 8 * 1024 * 1024) throw new Error(`${f} 가 8MB 를 넘습니다.`)
    return out
  })
  return { tmp, files, jpgs }
}

async function upload(jpgPath) {
  const b64 = readFileSync(jpgPath).toString('base64')
  const res = await fetch(`${SITE}/api/blog/insight/thumb`, {
    method: 'POST',
    headers: { 'X-Blog-Key': BLOG_KEY, 'Content-Type': 'application/json', 'User-Agent': UA },
    body: JSON.stringify({ dataUrl: `data:image/jpeg;base64,${b64}` }),
  })
  const json = await res.json().catch(() => ({}))
  if (!res.ok || !json.url) throw new Error(`이미지 업로드 실패 ${res.status} ${json.error || ''}`)
  return `${SITE}${json.url}`
}

async function waitFinished(containerId) {
  for (let i = 0; i < 20; i++) {
    const r = await graph(`/${containerId}`, { params: { fields: 'status_code,status' } })
    if (r.status_code === 'FINISHED') return
    if (r.status_code === 'ERROR' || r.status_code === 'EXPIRED') throw new Error(`메타가 이미지를 처리하지 못했습니다(${r.status_code} ${r.status || ''})`)
    await sleep(3000)
  }
  throw new Error('메타 처리 대기 시간이 지났습니다.')
}

// ── 게시 ──
async function publishCard(page, igId) {
  const title = prop(page, '제목')
  const caption = buildCaption(prop(page, '캡션'), prop(page, '해시태그'))
  const { tmp, files, jpgs } = prepareImages(prop(page, '카드뉴스 폴더'))
  try {
    if (DRY) {
      log(`  [미리보기] ${title} — 카드 ${files.length}장(${files.join(', ')}), 캡션 ${caption.length}자, JPEG 변환 확인 → ${tmp}`)
      return
    }
    const urls = []
    for (const j of jpgs) urls.push(await upload(j))
    const children = []
    for (const image_url of urls) children.push((await graph(`/${igId}/media`, { method: 'POST', params: { image_url, is_carousel_item: 'true' } })).id)
    const carousel = await graph(`/${igId}/media`, { method: 'POST', params: { media_type: 'CAROUSEL', children: children.join(','), caption } })
    await waitFinished(carousel.id)
    const pub = await graph(`/${igId}/media_publish`, { method: 'POST', params: { creation_id: carousel.id } })
    const { permalink } = await graph(`/${pub.id}`, { params: { fields: 'permalink' } })
    if (NO_NOTION_WRITE) { log(`  [노션 미변경] 인스타 게시: ${title} → ${permalink}`); return }
    await notion(`/pages/${page.id}`, { method: 'PATCH', body: { properties: {
      '카드뉴스 상태': { select: { name: '게시됨' } },
      '카드뉴스 게시일': { date: { start: kstDate() } },
      '카드뉴스 주소': { url: permalink || null },
    } } })
    log(`  인스타 게시: ${title} → ${permalink} (카드 ${files.length}장)`)
  } finally {
    rmSync(tmp, { recursive: true, force: true })
  }
}

async function markFailed(page, err) {
  const memo = prop(page, '차단 사유')
  await notion(`/pages/${page.id}`, { method: 'PATCH', body: { properties: {
    '카드뉴스 상태': { select: { name: '미리보기' } },
    '차단 사유': { rich_text: [{ type: 'text', text: { content: `[인스타 게시 오류 ${kstDate()}] ${err.message}\n${memo}`.slice(0, 1900) } }] },
  } } })
}

async function main() {
  let page
  if (ONLY_PAGE) {
    page = await notion(`/pages/${ONLY_PAGE}`)
  } else {
    const confirmed = await queryCards('확정')
    if (!confirmed.length) return
    const today = kstDate()
    const postedToday = (await queryCards('게시됨')).filter(p => prop(p, '카드뉴스 게시일').slice(0, 10) === today).length
    const { item, reason } = pickDue(confirmed.map(p => ({ page: p, date: prop(p, '카드뉴스 게시일'), created: p.created_time })), { postedToday })
    if (!item) { log(`대기: 확정 ${confirmed.length}개 — ${reason}`); return }
    page = item.page
  }
  log(`게시할 카드뉴스: ${prop(page, '제목')}${DRY ? ' (미리보기)' : ''}`)
  try {
    const igId = await igAccount()
    await publishCard(page, igId)
  } catch (e) {
    log(`  실패: ${prop(page, '제목')} — ${e.message}`)
    if (!DRY && !NO_NOTION_WRITE) await markFailed(page, e).catch(e2 => log(`  노션에 실패 기록도 못 함: ${e2.message}`))
    process.exitCode = 1
  }
}

main().catch(e => { log('중단:', e.message); process.exitCode = 1 })
