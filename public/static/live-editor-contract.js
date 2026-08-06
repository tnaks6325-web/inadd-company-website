export const LIVE_EDITOR_CHANNEL = 'inad-live-editor';
export const LIVE_EDITOR_VERSION = 1;

export const LIVE_EDITOR_ROUTES = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/works', label: 'Works' },
  { path: '/insight', label: 'Insight' },
  { path: '/marketing', label: 'Marketing' },
  { path: '/marketing/viral', label: 'Viral Marketing' },
  { path: '/marketing/influencer', label: 'Influencer Marketing' },
  { path: '/marketing/seeding', label: 'Seeding Campaign' },
  { path: '/marketing/seo', label: 'SEO Marketing' },
  { path: '/marketing/review', label: 'Review Marketing' },
  { path: '/marketing/oliveyoung', label: 'Olive Young Marketing' },
  { path: '/marketing/ppl', label: 'PPL Marketing' },
  { path: '/development', label: 'Our Tech' },
  { path: '/contact', label: 'Contact' },
];

const allowedMessageTypes = new Set(['ready', 'route-change', 'select', 'set-mode', 'apply']);
const allowedRoutes = new Set(LIVE_EDITOR_ROUTES.map((route) => route.path));

export function normalizeLiveEditorRoute(value, origin = 'https://www.inadcompany.co.kr') {
  if (typeof value !== 'string' || value.length > 240) return null;

  try {
    const url = new URL(value, origin);
    if (url.origin !== origin) return null;
    return allowedRoutes.has(url.pathname) ? url.pathname : null;
  } catch {
    return null;
  }
}

export function toLiveEditorUrl(route) {
  const normalizedRoute = normalizeLiveEditorRoute(route);
  return normalizedRoute ? `${normalizedRoute}?editor=1` : null;
}

export function isLiveEditorMessage(value) {
  if (!value || typeof value !== 'object') return false;
  const message = value;
  if (message.channel !== LIVE_EDITOR_CHANNEL || message.version !== LIVE_EDITOR_VERSION) return false;
  if (!allowedMessageTypes.has(message.type)) return false;
  if (message.type === 'set-mode') return message.mode === 'interact' || message.mode === 'select';
  if (message.type === 'ready' || message.type === 'route-change') return normalizeLiveEditorRoute(message.route) !== null;
  if (message.type === 'select') return typeof message.regionId === 'string' && /^[a-z0-9][a-z0-9._-]{0,79}$/i.test(message.regionId);
  if (message.type === 'apply') {
    return typeof message.regionId === 'string'
      && /^[a-z0-9][a-z0-9._-]{0,79}$/i.test(message.regionId)
      && typeof message.text === 'string'
      && message.text.length <= 500;
  }
  return false;
}

export function createLiveEditorMessage(type, payload = {}) {
  return { channel: LIVE_EDITOR_CHANNEL, version: LIVE_EDITOR_VERSION, type, ...payload };
}
