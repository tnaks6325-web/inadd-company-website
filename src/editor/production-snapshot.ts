export const PRODUCTION_SNAPSHOT_ORIGIN = 'https://eb3f7b50.inadd-company-website.pages.dev'
export const PRODUCTION_SNAPSHOT_PREFIX = '/admin/editor/live-snapshot'

const blockedTopLevelPaths = new Set(['admin'])
const safePathSegment = /^[a-z0-9][a-z0-9._~-]*$/i

export function normalizeProductionSnapshotPath(value: unknown, allowApi = false): string | null {
  if (typeof value !== 'string' || value.length > 2048 || !value.startsWith('/')) return null

  let parsed: URL
  try {
    parsed = new URL(value, 'https://snapshot.invalid')
  } catch {
    return null
  }
  if (parsed.origin !== 'https://snapshot.invalid' || parsed.username || parsed.password) return null

  const segments = parsed.pathname.split('/').filter(Boolean)
  if (segments.some((segment) => !safePathSegment.test(segment))) return null
  if (blockedTopLevelPaths.has(segments[0]?.toLowerCase())) return null
  if (!allowApi && segments[0]?.toLowerCase() === 'api') return null

  return parsed.pathname
}

export function toProductionSnapshotUrl(route: string): string | null {
  const path = normalizeProductionSnapshotPath(route)
  return path ? `${PRODUCTION_SNAPSHOT_PREFIX}${path}?editor=1` : null
}

export function toProductionSnapshotRedirect(location: string, from: string): string | null {
  let redirected: URL
  try {
    redirected = new URL(location, from)
  } catch {
    return null
  }
  if (redirected.origin !== PRODUCTION_SNAPSHOT_ORIGIN) return null

  const path = normalizeProductionSnapshotPath(redirected.pathname)
  if (!path) return null

  redirected.searchParams.set('editor', '1')
  return `${PRODUCTION_SNAPSHOT_PREFIX}${path}${redirected.search}`
}

function toSnapshotAssetPath(value: string): string | null {
  const pathname = value.split(/[?#]/, 1)[0]
  const segments = pathname.split('/').filter(Boolean)
  if (!segments.length || !['api', 'static'].includes(segments[0])) return null
  if (segments.some((segment) => !safePathSegment.test(segment))) return null
  return `${PRODUCTION_SNAPSHOT_PREFIX}${value}`
}

export function rewriteProductionSnapshotAssetText(source: string): string {
  return source
    .replace(/(["'])\/((?:api|static)\/[^"']*)/g, (match, quote: string, relative: string) => {
      const target = toSnapshotAssetPath(`/${relative}`)
      return target ? `${quote}${target}` : match
    })
    .replace(/url\((['"]?)\/(?!\/)([^)'"\s]+)\1\)/g, (match, quote: string, rest: string) => {
      const target = toSnapshotAssetPath(`/${rest}`)
      return target ? `url(${quote}${target}${quote})` : match
    })
}

export function rewriteProductionSnapshotDocument(source: string, route: string): string {
  const normalizedRoute = normalizeProductionSnapshotPath(route)
  if (!normalizedRoute) throw new Error('Invalid production snapshot route')

  const rewritten = rewriteProductionSnapshotAssetText(source).replace(
    /\b(src|href|action)=(['"])\/(?!\/)([^'"<>]*)\2/gi,
    (match, attribute: string, quote: string, value: string) => {
      const target = toSnapshotAssetPath(`/${value}`) || (() => {
        const route = normalizeProductionSnapshotPath(`/${value}`.split(/[?#]/, 1)[0])
        return route ? `${PRODUCTION_SNAPSHOT_PREFIX}/${value}` : null
      })()
      return target ? `${attribute}=${quote}${target}${quote}` : match
    },
  )
  const bridge = `<script>window.__INAD_LIVE_EDITOR_ROUTE__ = ${JSON.stringify(normalizedRoute)};window.__INAD_LIVE_EDITOR_SNAPSHOT_PREFIX__ = ${JSON.stringify(PRODUCTION_SNAPSHOT_PREFIX)};</script>`
    + '<script type="module" src="/static/live-content-patches.js"></script>'
    + '<script type="module" src="/static/live-editor-bridge.js"></script>'

  return rewritten.includes('</body>')
    ? rewritten.replace('</body>', `${bridge}</body>`)
    : `${rewritten}${bridge}`
}
