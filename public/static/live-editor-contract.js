export const LIVE_EDITOR_CHANNEL = 'inad-live-editor';
export const LIVE_EDITOR_VERSION = 1;

export const LIVE_EDITOR_ROUTES = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/works', label: 'Works' },
  { path: '/insight', label: 'Insight' },
  { path: '/marketing', label: 'Marketing' },
  { path: '/viral', label: 'Viral (legacy)' },
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
const regionIdPattern = /^[a-z0-9][a-z0-9._-]{0,79}$/i;
const insightDetailPattern = /^\/insight\/(?:admin_)?[a-z0-9][a-z0-9_-]{0,79}$/i;

function isAllowedLiveEditorPath(path) {
  return allowedRoutes.has(path) || insightDetailPattern.test(path);
}

export function normalizeLiveEditorRoute(value, origin = 'https://www.inadcompany.co.kr') {
  if (typeof value !== 'string' || value.length > 240) return null;

  try {
    const url = new URL(value, origin);
    if (url.origin !== origin) return null;
    return isAllowedLiveEditorPath(url.pathname) ? url.pathname : null;
  } catch {
    return null;
  }
}

export function toLiveEditorUrl(route) {
  const normalizedRoute = normalizeLiveEditorRoute(route);
  return normalizedRoute ? `${normalizedRoute}?editor=1` : null;
}

export function isSafeLiveUrl(value, regionId) {
  if (typeof value !== 'string' || typeof regionId !== 'string') return false;
  const url = value.trim();
  if (!url || url.length > 2048 || /[\u0000-\u001f\\]/.test(url)) return false;
  if (url.startsWith('/') && !url.startsWith('//')) return true;
  if (regionId.startsWith('link.') && url.startsWith('#')) return true;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:'
      || (regionId.startsWith('link.') && (parsed.protocol === 'mailto:' || parsed.protocol === 'tel:'));
  } catch {
    return false;
  }
}

export function isLiveEditorMessage(value) {
  if (!value || typeof value !== 'object') return false;
  const message = value;
  if (message.channel !== LIVE_EDITOR_CHANNEL || message.version !== LIVE_EDITOR_VERSION) return false;
  if (!allowedMessageTypes.has(message.type)) return false;
  if (message.type === 'set-mode') return message.mode === 'interact' || message.mode === 'select';
  if (message.type === 'ready' || message.type === 'route-change') return normalizeLiveEditorRoute(message.route) !== null;
  if (message.type === 'select') return typeof message.regionId === 'string' && regionIdPattern.test(message.regionId);
  if (message.type === 'apply') {
    if (typeof message.regionId !== 'string' || !regionIdPattern.test(message.regionId)) return false;
    if (message.regionId.startsWith('content.') || message.regionId.startsWith('field.')) {
      const text = message.field === 'text' ? message.value : message.text;
      return typeof text === 'string' && text.length <= 500;
    }
    return (message.regionId.startsWith('media.') || message.regionId.startsWith('link.'))
      && message.field === 'url'
      && isSafeLiveUrl(message.value, message.regionId);
  }
  return false;
}

export function createLiveEditorMessage(type, payload = {}) {
  return { channel: LIVE_EDITOR_CHANNEL, version: LIVE_EDITOR_VERSION, type, ...payload };
}
