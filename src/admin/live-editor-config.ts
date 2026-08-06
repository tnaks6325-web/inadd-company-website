export const LIVE_EDITOR_ROUTE_PATHS = [
  '/', '/about', '/works', '/insight', '/marketing',
  '/marketing/viral', '/marketing/influencer', '/marketing/seeding',
  '/marketing/seo', '/marketing/review', '/marketing/oliveyoung', '/marketing/ppl',
  '/development', '/contact',
] as const

export type LiveEditorPatch = { text?: string; url?: string }
export type LiveEditorPatches = Record<string, LiveEditorPatch>

const knownRoutes = new Set<string>(LIVE_EDITOR_ROUTE_PATHS)
const regionIdPattern = /^[a-z0-9][a-z0-9._-]{0,79}$/i
const maxTextLength = 500
const maxUrlLength = 2_048

export function isLiveEditorRoute(route: unknown): route is typeof LIVE_EDITOR_ROUTE_PATHS[number] {
  return typeof route === 'string' && knownRoutes.has(route)
}

function safeLiveUrl(value: unknown, regionId: string) {
  if (typeof value !== 'string') return null
  const url = value.trim()
  if (!url || url.length > maxUrlLength || /[\u0000-\u001f\\]/.test(url)) return null

  if (url.startsWith('/') && !url.startsWith('//')) return url
  if (regionId.startsWith('link.') && url.startsWith('#')) return url

  try {
    const parsed = new URL(url)
    if (parsed.protocol === 'https:') return url
    if (regionId.startsWith('link.') && (parsed.protocol === 'mailto:' || parsed.protocol === 'tel:')) return url
  } catch {}
  return null
}

export function sanitizeLiveEditorPatches(value: unknown): LiveEditorPatches {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {}
  const patches: LiveEditorPatches = {}
  let count = 0

  for (const [regionId, patch] of Object.entries(value as Record<string, unknown>)) {
    if (count >= 200) break
    if (!regionIdPattern.test(regionId) || !patch || typeof patch !== 'object' || Array.isArray(patch)) continue

    if (regionId.startsWith('content.') && typeof (patch as { text?: unknown }).text === 'string') {
      patches[regionId] = { text: (patch as { text: string }).text.replace(/\r\n?/g, '\n').slice(0, maxTextLength) }
      count += 1
      continue
    }

    if ((regionId.startsWith('media.') || regionId.startsWith('link.'))) {
      const url = safeLiveUrl((patch as { url?: unknown }).url, regionId)
      if (!url) continue
      patches[regionId] = { url }
      count += 1
    }
  }

  return patches
}
