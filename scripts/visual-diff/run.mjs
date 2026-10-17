// PR 수정 전·후 화면 비교 캡처.
// 수정 전(base)·수정 후(head) 두 로컬 서버의 같은 페이지를 PC·휴대폰 크기로 찍고,
// 달라진 줄만 골라 "왼쪽 수정 전 / 오른쪽 수정 후" 비교 그림을 만든다.
//
//   node run.mjs --base http://127.0.0.1:5101 --head http://127.0.0.1:5102 --out out
//
// 결과: out/*.png(비교 그림), out/report.json, out/comment.md(이미지 주소는 {{IMG_BASE}} 자리표시)
import { chromium } from 'playwright'
import { PNG } from 'pngjs'
import pixelmatch from 'pixelmatch'
import fs from 'node:fs'
import path from 'node:path'

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, v, i, a) => (v.startsWith('--') ? [...acc, [v.slice(2), a[i + 1]]] : acc), [])
)
const BASE = args.base
const HEAD = args.head
const OUT = path.resolve(args.out || 'out')
if (!BASE || !HEAD) {
  console.error('사용법: node run.mjs --base <url> --head <url> --out <dir>')
  process.exit(2)
}
fs.mkdirSync(OUT, { recursive: true })

const DEVICES = [
  { key: 'pc', label: 'PC', viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, isMobile: false },
  { key: 'mobile', label: '휴대폰', viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
]
// 항상 보는 페이지(사이트맵에 없어도). 인사이트 상세는 글 데이터가 로컬에 없어 제외.
const ALWAYS = ['/', '/marketing/seo']
const SKIP = [/^\/insight\/./, /^\/admin/, /^\/api\//]
const FIXED_TIME = new Date('2026-01-05T10:00:00+09:00')
const PAD = 120          // 달라진 줄 위아래로 함께 보여줄 여백(px, CSS 기준)
const MERGE_GAP = 240    // 이보다 가까운 변경 묶음은 한 그림으로
const MAX_CROP = 1600    // 한쪽 그림 최대 높이(CSS px)
const MAX_SHOTS_PER_PAGE = 4
const MAX_PAGES_DIFF_ROWS = 3000 // 이보다 많이 달라지면 줄 맞춤 포기하고 통째로 비교

// ─────────────── 페이지 목록 ───────────────
async function sitemapPaths(origin) {
  try {
    const res = await fetch(origin + '/sitemap.xml')
    const xml = await res.text()
    return [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map(m => new URL(m[1]).pathname)
  } catch {
    return []
  }
}

// ─────────────── 캡처 ───────────────
// 같은 조건이 되도록: 시계 고정·난수 고정·애니메이션 끔·영상 첫 장면 정지·외부 삽입물(iframe) 가림
const FREEZE_CSS = `
  *, *::before, *::after { animation: none !important; transition: none !important; caret-color: transparent !important; }
  html { scroll-behavior: auto !important; }
`
async function shoot(browser, device, url) {
  const context = await browser.newContext({
    viewport: device.viewport,
    deviceScaleFactor: device.deviceScaleFactor,
    isMobile: device.isMobile,
    hasTouch: device.hasTouch,
    reducedMotion: 'reduce',
    locale: 'ko-KR',
    timezoneId: 'Asia/Seoul',
  })
  await context.addInitScript(() => {
    let s = 20260105
    Math.random = () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646
  })
  const page = await context.newPage()
  await page.clock.install({ time: FIXED_TIME })
  await page.clock.pauseAt(FIXED_TIME)
  let status = 0
  try {
    const t0 = Date.now()
    const res = await page.goto(url, { waitUntil: 'load', timeout: 60000 })
    if (process.env.VD_DEBUG) console.log('  load', Date.now() - t0)
    status = res?.status() ?? 0
    await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {})
    await page.addStyleTag({ content: FREEZE_CSS })
    await page.clock.runFor(1500)
    // 끝까지 내려가며 늦게 뜨는 요소(스크롤 등장·지연 이미지)를 모두 띄운다
    const total = await page.evaluate(() => document.documentElement.scrollHeight)
    for (let y = 0; y < total; y += Math.round(device.viewport.height * 0.8)) {
      // 스크롤 이벤트를 직접 보내고 실제 시간도 잠깐 줘서, 스크롤에 반응하는 요소가 매번 똑같이 뜨게 한다
      await page.evaluate(v => { window.scrollTo(0, v); window.dispatchEvent(new Event('scroll')) }, y)
      await page.waitForTimeout(120)
      await page.clock.runFor(300)
    }
    await page.evaluate(() => { window.scrollTo(0, 0); window.dispatchEvent(new Event('scroll')) })
    await page.waitForTimeout(120)
    await page.clock.runFor(3000)
    await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {})
    // 페이지 안 타이머는 멈춰 있으므로, 최대 대기 시간은 페이지 밖(여기)에서 잰다
    await Promise.race([
      page.evaluate(async () => {
        await document.fonts.ready
        const imgs = [...document.images].filter(i => !i.complete && i.loading !== 'lazy')
        await Promise.all(imgs.map(i => new Promise(r => { i.onload = i.onerror = r })))
      }).catch(() => {}),
      new Promise(r => setTimeout(r, 8000)),
    ])
    await page.evaluate(() => {
      for (const v of document.querySelectorAll('video')) {
        v.removeAttribute('autoplay')
        v.pause()
        try { v.currentTime = 0 } catch {}
      }
    }).catch(() => {})
    await page.clock.runFor(500)
    if (process.env.VD_DEBUG) console.log('  ready', Date.now() - t0)
    const title = await page.title()
    const buf = await page.screenshot({
      fullPage: true,
      animations: 'disabled',
      caret: 'hide',
      mask: [page.locator('iframe, .leaflet-container')],
      maskColor: '#d9d9de',
    })
    return { ok: true, status, title, png: PNG.sync.read(buf) }
  } catch (e) {
    return { ok: false, status, title: '', error: String(e?.message || e).split('\n')[0] }
  } finally {
    await context.close()
  }
}

// ─────────────── 비교 ───────────────
// 1) 줄마다 "대략적인 모양"(가로를 48칸으로 나눈 칸별 밝기)을 만들어, 비슷한 줄끼리 짝을 맞춘다.
//    → 위쪽에 무언가 끼워 넣어져 아래가 밀려도(반 픽셀 밀림 포함) 밀린 부분은 "변경"으로 보지 않는다.
// 2) 짝이 맞은 구간도 픽셀 단위로 다시 비교해, 글자 하나·색 하나 바뀐 것까지 잡는다.
//    글자 테두리의 미세한 번짐(밀림 때문에 생기는 것)은 무시한다.
const BLOCKS = 48
const ROW_TOL = 3             // 줄 모양 비교 허용 차(0~255). 크면 1~2줄 어긋난 채로 짝이 맞아 가짜 변경이 생김
const MIN_DIFF_PX = 40        // 이보다 적게 다른 묶음은 잡음으로 보고 버림(CSS px² 기준)
const MIN_REAL_PX = 30        // 밀림을 감안하고도 이만큼은 달라야 진짜 변경(CSS px² 기준)

function rowFeatures(png) {
  const { width, height, data } = png
  const bw = width / BLOCKS
  const f = new Float32Array(height * BLOCKS)
  for (let y = 0; y < height; y++) {
    const o = y * width * 4
    for (let b = 0; b < BLOCKS; b++) {
      const x0 = Math.floor(b * bw), x1 = Math.floor((b + 1) * bw)
      let s = 0
      for (let x = x0; x < x1; x++) {
        const i = o + x * 4
        s += data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114
      }
      f[y * BLOCKS + b] = s / (x1 - x0)
    }
  }
  return f
}

// Myers 차이 계산(같은지 판단은 eq 함수로). 너무 많이 다르면 null
function diffRows(n, m, eq, maxD) {
  const max = n + m
  const off = max + 1
  const v = new Int32Array(2 * max + 3)
  const trace = [] // trace[d] = 단계 d 직전의 v 중 k ∈ [-d-1, d+1] 부분만 (메모리 절약)
  const at = (d, k) => trace[d][k + d + 1]
  for (let d = 0; d <= Math.min(max, maxD); d++) {
    trace.push(v.slice(off - d - 1, off + d + 2))
    for (let k = -d; k <= d; k += 2) {
      let x = (k === -d || (k !== d && v[off + k - 1] < v[off + k + 1])) ? v[off + k + 1] : v[off + k - 1] + 1
      let y = x - k
      while (x < n && y < m && eq(x, y)) { x++; y++ }
      v[off + k] = x
      if (x >= n && y >= m) {
        const pairs = []
        let cx = n, cy = m
        for (let dd = d; dd > 0; dd--) {
          const kk = cx - cy
          const prevK = (kk === -dd || (kk !== dd && at(dd, kk - 1) < at(dd, kk + 1))) ? kk + 1 : kk - 1
          const px = at(dd, prevK), py = px - prevK
          while (cx > px && cy > py) { cx--; cy--; pairs.push([cx, cy]) }
          cx = px; cy = py
        }
        while (cx > 0 && cy > 0) { cx--; cy--; pairs.push([cx, cy]) }
        return pairs.reverse()
      }
    }
  }
  return null
}

function crop(png, y0, y1) {
  y0 = Math.max(0, y0); y1 = Math.min(png.height, y1)
  const h = Math.max(1, y1 - y0)
  const out = new PNG({ width: png.width, height: h })
  if (y1 > y0) PNG.bitblt(png, out, 0, y0, png.width, y1 - y0, 0, 0)
  return out
}

// 같은 높이 두 조각을 픽셀 비교해 "진짜 바뀐" 덩어리들을 줄 범위 + 가로 범위로 돌려준다
function pixelSpots(a, b, scale) {
  const w = a.width, h = a.height
  const diff = new PNG({ width: w, height: h })
  pixelmatch(a.data, b.data, diff.data, w, h, { threshold: 0.12, includeAA: false, diffMask: true })
  const rowCount = new Int32Array(h), rowX0 = new Int32Array(h).fill(w), rowX1 = new Int32Array(h).fill(-1)
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const i = (y * w + x) * 4
    if (diff.data[i + 3] && diff.data[i] === 255 && diff.data[i + 1] === 0) {
      rowCount[y]++
      if (x < rowX0[y]) rowX0[y] = x
      if (x > rowX1[y]) rowX1[y] = x
    }
  }
  const spots = []
  const gap = 12 * scale
  let cur = null
  for (let y = 0; y < h; y++) {
    if (!rowCount[y]) continue
    if (cur && y - cur.y1 <= gap) {
      cur.y1 = y + 1; cur.px += rowCount[y]
      cur.x0 = Math.min(cur.x0, rowX0[y]); cur.x1 = Math.max(cur.x1, rowX1[y] + 1)
    } else {
      cur = { y0: y, y1: y + 1, x0: rowX0[y], x1: rowX1[y] + 1, px: rowCount[y] }
      spots.push(cur)
    }
  }
  return spots.filter(s => {
    if (s.px < MIN_DIFF_PX * scale * scale) return false
    s.real = shiftTolerantCount(a, b, s, scale)
    return s.real >= MIN_REAL_PX * scale * scale
  })
}

// 반 픽셀 밀림으로 생긴 차이인지 확인: 한쪽 픽셀 색이 다른 쪽 같은 자리 주변(±r) 픽셀들의 색 범위 안에 들면 "밀림"으로 본다.
// 양쪽 방향 모두 확인해서, 어느 쪽에서든 범위를 벗어나는 픽셀 수를 센다.
function shiftTolerantCount(a, b, s, scale) {
  const w = a.width, h = a.height, r = Math.max(1, scale), tol = 24
  let n = 0
  const outside = (src, ref, x, y) => {
    const i = (y * w + x) * 4
    for (let c = 0; c < 3; c++) {
      let lo = 255, hi = 0
      for (let dy = -r; dy <= r; dy++) {
        const yy = y + dy
        if (yy < 0 || yy >= h) continue
        for (let dx = -r; dx <= r; dx++) {
          const xx = x + dx
          if (xx < 0 || xx >= w) continue
          const v = ref[(yy * w + xx) * 4 + c]
          if (v < lo) lo = v
          if (v > hi) hi = v
        }
      }
      const v = src[i + c]
      if (v < lo - tol || v > hi + tol) return true
    }
    return false
  }
  for (let y = s.y0; y < s.y1; y++) for (let x = s.x0; x < s.x1; x++) {
    if (outside(b.data, a.data, x, y) || outside(a.data, b.data, x, y)) n++
  }
  return n
}

// 결과: 바뀐 곳 목록. 각 항목 = 수정 전 줄 [a0,a1) ↔ 수정 후 줄 [b0,b1), 가로 범위 x0~x1(없으면 전체 폭)
function compare(basePng, headPng, scale) {
  if (basePng.width !== headPng.width) return [{ a0: 0, a1: basePng.height, b0: 0, b1: headPng.height }]
  const fa = rowFeatures(basePng), fb = rowFeatures(headPng)
  const eq = (i, j) => {
    const oi = i * BLOCKS, oj = j * BLOCKS
    for (let k = 0; k < BLOCKS; k++) if (Math.abs(fa[oi + k] - fb[oj + k]) > ROW_TOL) return false
    return true
  }
  const pairs = diffRows(basePng.height, headPng.height, eq, MAX_PAGES_DIFF_ROWS)
  if (!pairs) return [{ a0: 0, a1: basePng.height, b0: 0, b1: headPng.height }]

  const spots = []
  // 짝이 맞은 줄들은 연속 구간별로 픽셀 비교
  let runStart = 0
  for (let i = 1; i <= pairs.length; i++) {
    const contiguous = i < pairs.length && pairs[i][0] === pairs[i - 1][0] + 1 && pairs[i][1] === pairs[i - 1][1] + 1
    if (contiguous) continue
    const [a0, b0] = pairs[runStart], len = pairs[i - 1][0] - a0 + 1
    for (const s of pixelSpots(crop(basePng, a0, a0 + len), crop(headPng, b0, b0 + len), scale)) {
      spots.push({ a0: a0 + s.y0, a1: a0 + s.y1, b0: b0 + s.y0, b1: b0 + s.y1, x0: s.x0, x1: s.x1, px: s.px, real: s.real })
    }
    runStart = i
  }
  // 짝이 안 맞은 줄(끼워 넣음·빠짐·바뀜). 빈 줄 한두 개를 사이에 둔 "빠짐+끼움"은 한 덩어리(바뀜)로 합친다
  const gaps = []
  let pa = 0, pb = 0
  for (const [x, y] of [...pairs, [basePng.height, headPng.height]]) {
    if (x > pa || y > pb) {
      const g = gaps[gaps.length - 1]
      if (g && pa - g.a1 <= 2 * scale && pb - g.b1 <= 2 * scale) { g.a1 = x; g.b1 = y }
      else gaps.push({ a0: pa, a1: x, b0: pb, b1: y })
    }
    pa = x + 1; pb = y + 1
  }
  for (const g of gaps) {
    const la = g.a1 - g.a0, lb = g.b1 - g.b0
    if (Math.max(la, lb) <= 2 * scale) continue // 1~2줄짜리는 반 픽셀 밀림 보정이라 버림
    if (la && lb && Math.abs(la - lb) <= Math.max(3 * scale, 0.25 * Math.max(la, lb))) {
      // 길이가 비슷하면 같은 길이로 잘라 밀림을 감안해 비교 → 바뀐 글자만 테두리
      const L = Math.max(la, lb)
      for (const s of pixelSpots(crop(basePng, g.a0, g.a0 + L), crop(headPng, g.b0, g.b0 + L), scale)) {
        spots.push({ a0: g.a0 + s.y0, a1: g.a0 + s.y1, b0: g.b0 + s.y0, b1: g.b0 + s.y1, x0: s.x0, x1: s.x1, px: s.px, real: s.real })
      }
    } else {
      spots.push(g)
    }
  }
  return spots.sort((p, q) => p.b0 - q.b0)
}

// 가까운 변경끼리 묶어 그림 한 장 단위로
function groupHunks(hunks, scale) {
  const gap = MERGE_GAP * scale
  const groups = []
  for (const h of hunks) {
    const g = groups[groups.length - 1]
    if (g && h.a0 - g.a1 < gap && h.b0 - g.b1 < gap) {
      g.a1 = Math.max(g.a1, h.a1); g.b1 = Math.max(g.b1, h.b1); g.items.push(h)
    } else groups.push({ a0: h.a0, a1: h.a1, b0: h.b0, b1: h.b1, items: [h] })
  }
  return groups
}

// ─────────────── 비교 그림 만들기 ───────────────
const dataUrl = png => 'data:image/png;base64,' + PNG.sync.write(png).toString('base64')

async function compose(browser, { pageTitle, pagePath, device, basePng, headPng, group, scale, index, total }) {
  const pad = PAD * scale
  const maxH = MAX_CROP * scale
  // 양쪽 그림이 같은 줄에서 시작하도록 "바뀌기 직전" 여백을 같게 잡는다
  let aStart = group.a0 - pad, bStart = group.b0 - pad
  const lift = Math.max(0, -Math.min(aStart, bStart))
  aStart += lift; bStart += lift
  const aEnd = Math.min(group.a1 + pad, aStart + maxH)
  const bEnd = Math.min(group.b1 + pad, bStart + maxH)
  const cutA = group.a1 + pad > aEnd, cutB = group.b1 + pad > bEnd
  const ca = crop(basePng, aStart, aEnd), cb = crop(headPng, bStart, bEnd)

  const W = device.viewport.width
  const boxes = side => group.items.map(h => {
    const s0 = side === 'a' ? h.a0 : h.b0, s1 = side === 'a' ? h.a1 : h.b1
    const start = side === 'a' ? aStart : bStart
    const x0 = h.x0 ?? 0, x1 = h.x1 ?? basePng.width
    return { x0: x0 / scale, x1: x1 / scale, y0: (s0 - start) / scale, y1: (s1 - start) / scale, empty: s1 === s0 }
  })
  const boxHtml = list => list.map(b => b.empty
    ? `<div class="ins" style="top:${b.y0 - 3}px"></div>`
    : boxDiv(Math.max(0, b.x0 - 9), Math.max(0, b.y0 - 9), Math.min(W, b.x1 + 9), b.y1 + 9)).join('')
  // 테두리는 바뀐 곳 바깥으로 둘러 글자를 가리지 않게 한다
  const boxDiv = (l, t, r, btm) => `<div class="box" style="left:${l}px;top:${t}px;width:${r - l}px;height:${btm - t}px"></div>`
  const pos = total > 1 ? ` (${index}/${total})` : ''
  const html = `<!doctype html><meta charset="utf-8"><style>
    body{margin:0;background:#fff;font-family:'Noto Sans CJK KR','Apple SD Gothic Neo','Malgun Gothic',sans-serif}
    .wrap{display:inline-block;padding:20px;background:#f3f4f6}
    .title{font-size:22px;font-weight:700;color:#111;margin:0 0 6px}
    .note{font-size:16px;color:#b91c1c;margin:0 0 14px;font-weight:600}
    .cols{display:flex;gap:20px;align-items:flex-start}
    .col h3{margin:0 0 8px;font-size:18px;color:#374151}
    .col.after h3{color:#1d4ed8}
    .shot{position:relative;width:${W}px;border:1px solid #d1d5db;background:#fff;line-height:0;overflow:hidden}
    .shot img{width:${W}px;display:block}
    .box{position:absolute;border:3px solid #e11d48;box-sizing:border-box;border-radius:3px}
    .ins{position:absolute;left:0;right:0;height:6px;background:#e11d48}
    .cut{font-size:14px;color:#6b7280;margin-top:6px}
  </style><div class="wrap" id="cap">
    <p class="title">${esc(pageTitle)} · ${device.label}${pos}</p>
    <p class="note">빨간 테두리 = 달라진 곳 (${pagePath})</p>
    <div class="cols">
      <div class="col"><h3>수정 전 (지금 사이트)</h3><div class="shot"><img src="${dataUrl(ca)}">${boxHtml(boxes('a'))}</div>${cutA ? '<div class="cut">… 이하 생략</div>' : ''}</div>
      <div class="col after"><h3>수정 후</h3><div class="shot"><img src="${dataUrl(cb)}">${boxHtml(boxes('b'))}</div>${cutB ? '<div class="cut">… 이하 생략</div>' : ''}</div>
    </div></div>`
  const ctx = await browser.newContext({ viewport: { width: W * 2 + 100, height: 800 }, deviceScaleFactor: scale })
  const page = await ctx.newPage()
  await page.setContent(html, { waitUntil: 'load' })
  const buf = await page.locator('#cap').screenshot()
  await ctx.close()
  return buf
}

const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))
const slug = p => (p === '/' ? 'home' : p.replace(/^\/|\/$/g, '').replace(/[^a-zA-Z0-9]+/g, '-'))

// ─────────────── 실행 ───────────────
const browser = await chromium.launch()
const paths = [...new Set([...ALWAYS, ...(await sitemapPaths(BASE)), ...(await sitemapPaths(HEAD))])]
  .filter(p => !SKIP.some(r => r.test(p)))
  .filter(p => !args.only || args.only.split(',').includes(p))
console.log('비교할 페이지:', paths.join(' '))

const report = { pages: [], images: [] }
for (const p of paths) {
  for (const device of DEVICES) {
    // 한 장이 2분 넘게 걸리면 그 화면은 "열리지 않음"으로 처리하고 넘어간다
    const timed = url => Promise.race([
      shoot(browser, device, url),
      new Promise(r => setTimeout(() => r({ ok: false, status: 0, title: '', error: '2분 안에 찍지 못함' }), 120000)),
    ])
    const [a, b] = [await timed(BASE + p), await timed(HEAD + p)]
    const entry = { path: p, device: device.key, title: b.title || a.title || p }
    if (!a.ok || !b.ok || a.status >= 400 || b.status >= 400) {
      entry.state = 'error'
      entry.detail = `수정 전 ${a.ok ? a.status : a.error} / 수정 후 ${b.ok ? b.status : b.error}`
      // 새로 생기거나 없어진 페이지
      if (a.status === 404 && b.ok && b.status < 400) entry.state = 'added'
      if (b.status === 404 && a.ok && a.status < 400) entry.state = 'removed'
      report.pages.push(entry)
      console.log(p, device.key, entry.state, entry.detail)
      continue
    }
    const scale = device.deviceScaleFactor
    const hunks = compare(a.png, b.png, scale)
    if (!hunks.length) { entry.state = 'same'; report.pages.push(entry); console.log(p, device.key, '같음'); continue }
    if (process.env.VD_DEBUG) for (const h of hunks) console.log('  spot', JSON.stringify(h))
    const groups = groupHunks(hunks, scale)
    entry.state = 'changed'
    entry.spots = groups.length
    entry.files = []
    const shown = groups.slice(0, MAX_SHOTS_PER_PAGE)
    for (let i = 0; i < shown.length; i++) {
      const buf = await compose(browser, {
        pageTitle: entry.title.split('|')[0].trim(), pagePath: p, device,
        basePng: a.png, headPng: b.png, group: shown[i], scale, index: i + 1, total: shown.length,
      })
      const file = `${slug(p)}-${device.key}-${i + 1}.png`
      fs.writeFileSync(path.join(OUT, file), buf)
      entry.files.push(file)
      report.images.push(file)
    }
    entry.more = groups.length - shown.length
    report.pages.push(entry)
    console.log(p, device.key, `달라짐 ${groups.length}곳`)
  }
}
await browser.close()

// ─────────────── 댓글 글 ───────────────
const changed = report.pages.filter(e => e.state === 'changed')
const special = report.pages.filter(e => ['added', 'removed', 'error'].includes(e.state))
const lines = []
lines.push('<!-- visual-diff -->')
lines.push(`## 수정 전·후 화면 비교`)
lines.push('')
lines.push('왼쪽이 **수정 전(지금 사이트)**, 오른쪽이 **수정 후**입니다. 빨간 테두리가 달라진 곳입니다.')
lines.push('')
if (!changed.length && !special.length) {
  lines.push(`✅ 확인한 ${paths.length}개 페이지(PC·휴대폰) 모두 **화면이 바뀐 곳이 없습니다.**`)
}
for (const e of changed) {
  const dev = DEVICES.find(d => d.key === e.device).label
  lines.push(`### ${esc(e.title.split('|')[0].trim())} · ${dev} — 달라진 곳 ${e.spots}곳`)
  for (const f of e.files) lines.push(`![${e.path} ${dev}]({{IMG_BASE}}/${f})`)
  if (e.more > 0) lines.push(`_그 밖에 ${e.more}곳 더 있음 (테스트 서버에서 직접 확인해 주세요)_`)
  lines.push('')
}
for (const e of special) {
  const dev = DEVICES.find(d => d.key === e.device).label
  const what = { added: '새로 생긴 페이지', removed: '없어진 페이지', error: '열리지 않음' }[e.state]
  lines.push(`- **${e.path}** (${dev}): ${what} — ${e.detail}`)
}
lines.push('')
const same = report.pages.filter(e => e.state === 'same').length
lines.push(`<sub>확인한 페이지 ${paths.length}개 × PC·휴대폰. 바뀌지 않은 화면 ${same}개는 생략했습니다. 움직이는 요소는 멈춘 상태로, 글·영상 같은 관리자 화면 데이터는 비운 상태로 찍습니다. 유튜브·지도 같은 외부 삽입물은 회색 상자로 가립니다.</sub>`)
fs.writeFileSync(path.join(OUT, 'comment.md'), lines.join('\n'))
fs.writeFileSync(path.join(OUT, 'report.json'), JSON.stringify({ paths, ...report }, null, 2))
console.log(`완료: 달라진 화면 ${changed.length}개, 그림 ${report.images.length}장`)
