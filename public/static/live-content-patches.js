import { isSafeLiveUrl } from '/static/live-editor-contract.js';

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

function regionIdFor(element, prefix) {
  const path = stablePath(element);
  if (!path) return null;
  const identifier = `${prefix}.${path}`;
  if (identifier.length <= 80) return identifier;

  let hash = 2166136261;
  for (const character of path) hash = Math.imul(hash ^ character.charCodeAt(0), 16777619);
  return `${prefix}.${(hash >>> 0).toString(36)}`;
}

function registerRegion(regions, element, prefix, selectable = true) {
  const regionId = regionIdFor(element, prefix);
  if (!regionId || regions.has(regionId)) return null;
  if (selectable) element.dataset.liveEditorRegion = regionId;
  regions.set(regionId, element);
  return regionId;
}

function backgroundImageUrl(element) {
  const match = element.style.backgroundImage.match(/^url\((["']?)(.*)\1\)$/);
  return match?.[2] || '';
}

export function registerLiveContentRegions() {
  const regions = new Map();
  document.querySelectorAll(textSelector).forEach((element) => {
    if (element.children.length > 0 || !element.textContent?.trim()) return;
    registerRegion(regions, element, 'content');
  });
  document.querySelectorAll('main img[src]').forEach((element) => registerRegion(regions, element, 'media'));
  document.querySelectorAll('main video[src], main source[src]').forEach((element) => registerRegion(regions, element, 'media'));
  document.querySelectorAll('main [style*="background-image"]').forEach((element) => {
    const regionId = registerRegion(regions, element, 'media');
    if (regionId) element.dataset.liveEditorMediaUrl = backgroundImageUrl(element);
  });
  document.querySelectorAll('main a[href]').forEach((element) => {
    const regionId = registerRegion(regions, element, 'link', !element.dataset.liveEditorRegion);
    if (regionId) element.dataset.liveEditorLinkRegion = regionId;
  });
  return regions;
}

const route = window.location.pathname;
const regions = route === '/' ? new Map() : registerLiveContentRegions();

export function applyLiveContentPatches(patches) {
  if (!patches || typeof patches !== 'object') return;
  Object.entries(patches).forEach(([regionId, patch]) => {
    const element = regions.get(regionId);
    if (!element || !patch || typeof patch !== 'object') return;
    if (regionId.startsWith('content.') && typeof patch.text === 'string') element.textContent = patch.text;
    if (regionId.startsWith('media.') && isSafeLiveUrl(patch.url, regionId)) {
      if (element instanceof HTMLImageElement) element.src = patch.url;
      else if (element instanceof HTMLMediaElement || element instanceof HTMLSourceElement) {
        element.src = patch.url;
        element.closest('video, audio')?.load();
      }
      else if (element instanceof HTMLElement) {
        element.style.backgroundImage = `url(${JSON.stringify(patch.url)})`;
        element.dataset.liveEditorMediaUrl = patch.url;
      }
    }
    if (regionId.startsWith('link.') && element instanceof HTMLAnchorElement && isSafeLiveUrl(patch.url, regionId)) element.href = patch.url;
  });
}

const ready = route === '/' ? Promise.resolve() : fetch(`/api/admin/public/editor/live?route=${encodeURIComponent(route)}`)
  .then((response) => response.ok ? response.json() : { patches: {} })
  .then((payload) => applyLiveContentPatches(payload.patches))
  .catch(() => {});

window.__INAD_LIVE_CONTENT__ = { regions, applyLiveContentPatches, ready };
