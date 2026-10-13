import { execFileSync } from 'node:child_process'
import { mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const cwd = process.cwd()
const wrangler = join(cwd, 'node_modules', 'wrangler', 'bin', 'wrangler.js')
const accountId = '68b8e64fc892743ecf639d310e5bb1ca'
const localBase = 'http://127.0.0.1:5173'
const env = { ...process.env, CLOUDFLARE_ACCOUNT_ID: accountId }
const stamp = new Date().toISOString().replace(/[:.]/g, '-').replace('T', '_').replace('Z', '')
const backupDir = join(cwd, 'backups', `production-works-${stamp}`)
const batchDir = join(backupDir, 'upload-batches')
mkdirSync(batchDir, { recursive: true })

function wranglerRun(args) {
  return execFileSync(process.execPath, [wrangler, ...args], {
    cwd,
    env,
    encoding: 'utf8',
    maxBuffer: 50 * 1024 * 1024
  })
}

function signature(item) {
  return item.id ? `id:${item.id}` : `item:${item.brand}\u0000${item.services || ''}`
}

const remoteRaw = wranglerRun([
  'kv', 'key', 'get', 'works_items', '--binding', 'ADMIN_KV', '--remote', '--text'
]).trim()
const remoteItems = JSON.parse(remoteRaw)
const localResponse = await fetch(`${localBase}/api/admin/public/works`)
if (!localResponse.ok) throw new Error(`Local works fetch failed: ${localResponse.status}`)
const localItems = (await localResponse.json()).items

const localSignatures = new Set(localItems.map(signature))
const missing = remoteItems.filter((item) => !localSignatures.has(signature(item)))
if (missing.length) {
  throw new Error(`Local list is missing ${missing.length} production entries: ${missing.map((x) => x.brand).join(', ')}`)
}

const backupFile = join(backupDir, 'works_items.production.json')
writeFileSync(backupFile, JSON.stringify(remoteItems, null, 2), 'utf8')
const backupKey = `works_items_backup_${stamp}`
wranglerRun([
  'kv', 'key', 'put', backupKey, '--path', backupFile, '--binding', 'ADMIN_KV', '--remote'
  , '--preview', 'false'
])

const assetPaths = new Set()
for (const item of localItems) {
  for (const field of ['thumb', 'cover']) {
    const value = item[field]
    if (typeof value === 'string' && value.startsWith('/api/admin/works-img/')) assetPaths.add(value)
  }
}

const entries = []
for (const assetPath of assetPaths) {
  const response = await fetch(`${localBase}${assetPath}`)
  if (!response.ok) throw new Error(`Local asset fetch failed: ${assetPath} (${response.status})`)
  const contentType = response.headers.get('content-type') || 'image/png'
  const base64 = Buffer.from(await response.arrayBuffer()).toString('base64')
  const key = `works_img_${assetPath.split('/').pop()}`
  entries.push({ key, value: `data:${contentType};base64,${base64}` })
}

const batchSize = 8
for (let offset = 0; offset < entries.length; offset += batchSize) {
  const batch = entries.slice(offset, offset + batchSize)
  const batchFile = join(batchDir, `batch-${String(offset / batchSize + 1).padStart(2, '0')}.json`)
  writeFileSync(batchFile, JSON.stringify(batch), 'utf8')
  wranglerRun(['kv', 'bulk', 'put', batchFile, '--binding', 'ADMIN_KV', '--remote', '--preview', 'false'])
  console.log(`Uploaded assets ${Math.min(offset + batchSize, entries.length)}/${entries.length}`)
}

const mergedFile = join(backupDir, 'works_items.merged.json')
writeFileSync(mergedFile, JSON.stringify(localItems, null, 2), 'utf8')
wranglerRun([
  'kv', 'key', 'put', 'works_items', '--path', mergedFile, '--binding', 'ADMIN_KV', '--remote'
  , '--preview', 'false'
])

const verifiedRaw = wranglerRun([
  'kv', 'key', 'get', 'works_items', '--binding', 'ADMIN_KV', '--remote', '--text'
]).trim()
const verifiedItems = JSON.parse(verifiedRaw)
if (verifiedItems.length !== localItems.length) {
  throw new Error(`Verification failed: expected ${localItems.length}, got ${verifiedItems.length}`)
}

rmSync(batchDir, { recursive: true, force: true })
console.log(JSON.stringify({
  backupKey,
  backupFile,
  productionBefore: remoteItems.length,
  productionAfter: verifiedItems.length,
  preservedProductionItems: remoteItems.length - missing.length,
  uploadedAssets: entries.length
}, null, 2))
