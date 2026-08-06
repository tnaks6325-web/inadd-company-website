export const LIVE_EDITOR_ROUTE_PATHS = [
  '/', '/about', '/works', '/insight', '/marketing',
  '/marketing/viral', '/marketing/influencer', '/marketing/seeding',
  '/marketing/seo', '/marketing/review', '/marketing/oliveyoung', '/marketing/ppl',
  '/development', '/contact',
] as const

export type LiveEditorPatch = { text: string }
export type LiveEditorPatches = Record<string, LiveEditorPatch>

const knownRoutes = new Set<string>(LIVE_EDITOR_ROUTE_PATHS)
const regionIdPattern = /^[a-z0-9][a-z0-9._-]{0,79}$/i

export function isLiveEditorRoute(route: unknown): route is typeof LIVE_EDITOR_ROUTE_PATHS[number] {
  return typeof route === 'string' && knownRoutes.has(route)
}

export function sanitizeLiveEditorPatches(value: unknown): LiveEditorPatches {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {}
  const patches: LiveEditorPatches = {}
  let count = 0;

  for (const [regionId, patch] of Object.entries(value as Record<string, unknown>)) {
    if (count >= 200) break
    if (!regionIdPattern.test(regionId) || !patch || typeof patch !== 'object' || Array.isArray(patch)) continue
    const text = (patch as { text?: unknown }).text
    if (typeof text !== 'string') continue
    patches[regionId] = { text: text.replace(/\r\n?/g, '\n').slice(0, 500) }
    count += 1
  }

  return patches
}
