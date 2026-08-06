const textSelector = 'main h1, main h2, main h3, main h4, main p, main a, main button, main li, main span, main strong, main em, main small, main label';

function stablePath(element) {
  const main = document.querySelector('main');
  const segments = [];
  let current = element;

  while (current && current !== main) {
    const parent = current.parentElement;
    if (!parent) return null;
    const siblings = [...parent.children].filter((sibling) => sibling.tagName === current.tagName);
    segments.unshift(`${current.tagName.toLowerCase()}${siblings.indexOf(current) + 1}`);
    current = parent;
  }

  return current === main ? segments.join('.') : null;
}

function regionIdFor(element) {
  const path = stablePath(element);
  if (!path) return null;
  const identifier = `content.${path}`;
  if (identifier.length <= 80) return identifier;

  let hash = 2166136261;
  for (const character of path) hash = Math.imul(hash ^ character.charCodeAt(0), 16777619);
  return `content.${(hash >>> 0).toString(36)}`;
}

export function registerLiveContentRegions() {
  const regions = new Map();
  document.querySelectorAll(textSelector).forEach((element) => {
    if (element.children.length > 0 || !element.textContent?.trim()) return;
    const regionId = regionIdFor(element);
    if (!regionId || regions.has(regionId)) return;
    element.dataset.liveEditorRegion = regionId;
    regions.set(regionId, element);
  });
  return regions;
}

const route = window.location.pathname;
const regions = route === '/' ? new Map() : registerLiveContentRegions();

export function applyLiveContentPatches(patches) {
  if (!patches || typeof patches !== 'object') return;
  Object.entries(patches).forEach(([regionId, patch]) => {
    const element = regions.get(regionId);
    if (!element || !patch || typeof patch !== 'object' || typeof patch.text !== 'string') return;
    element.textContent = patch.text;
  });
}

const ready = route === '/' ? Promise.resolve() : fetch(`/api/admin/public/editor/live?route=${encodeURIComponent(route)}`)
  .then((response) => response.ok ? response.json() : { patches: {} })
  .then((payload) => applyLiveContentPatches(payload.patches))
  .catch(() => {});

window.__INAD_LIVE_CONTENT__ = { regions, applyLiveContentPatches, ready };
