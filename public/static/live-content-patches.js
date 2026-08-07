import { isSafeLiveUrl } from '/static/live-editor-contract.js';

const textSelector = 'h1, h2, h3, h4, p, a, button, li, span, strong, em, small, label';

function stablePath(element, root) {
  const segments = [];
  let current = element;

  while (current && current !== root) {
    const parent = current.parentElement;
    if (!parent) return null;
    const siblings = [...parent.children].filter((sibling) => sibling.tagName === current.tagName);
    segments.unshift(`${current.tagName.toLowerCase()}${siblings.indexOf(current) + 1}`);
    current = parent;
  }

  return current === root ? segments.join('.') : null;
}

function regionIdFor(element, prefix, root) {
  const path = stablePath(element, root);
  if (!path) return null;
  const identifier = `${prefix}.${path}`;
  if (identifier.length <= 80) return identifier;

  let hash = 2166136261;
  for (const character of path) hash = Math.imul(hash ^ character.charCodeAt(0), 16777619);
  return `${prefix}.${(hash >>> 0).toString(36)}`;
}

function registerRegion(regions, element, prefix, root, selectable = true) {
  const regionId = regionIdFor(element, prefix, root);
  if (!regionId || regions.has(regionId)) return null;
  if (selectable) element.dataset.liveEditorRegion = regionId;
  regions.set(regionId, element);
  return regionId;
}

function backgroundImageUrl(element) {
  const match = element.style.backgroundImage.match(/^url\((["']?)(.*)\1\)$/);
  return match?.[2] || '';
}

function scopedPrefix(scope, kind) {
  return scope ? `${scope}.${kind}` : kind;
}

function isHomeEditorManaged(element) {
  return element.dataset.homeEditorKey || window.__INAD_HOME_EDITOR__?.isManagedElement?.(element);
}

function registerRegionsIn(root, regions, scope = '') {
  root.querySelectorAll(textSelector).forEach((element) => {
    if (element.children.length > 0 || !element.textContent?.trim() || isHomeEditorManaged(element)) return;
    registerRegion(regions, element, scopedPrefix(scope, 'content'), root);
  });
  root.querySelectorAll('input[placeholder], textarea[placeholder]').forEach((element) => registerRegion(regions, element, scopedPrefix(scope, 'field'), root));
  root.querySelectorAll('img[src], video[src], source[src]').forEach((element) => registerRegion(regions, element, scopedPrefix(scope, 'media'), root));
  root.querySelectorAll('[style*="background-image"]').forEach((element) => {
    const regionId = registerRegion(regions, element, scopedPrefix(scope, 'media'), root);
    if (regionId) element.dataset.liveEditorMediaUrl = backgroundImageUrl(element);
  });
  root.querySelectorAll('a[href]').forEach((element) => {
    const regionId = registerRegion(regions, element, scopedPrefix(scope, 'link'), root, !element.dataset.liveEditorRegion);
    if (regionId) element.dataset.liveEditorLinkRegion = regionId;
  });
  return regions;
}

export function registerLiveContentRegions(regions = new Map()) {
  const main = document.querySelector('main');
  if (main) registerRegionsIn(main, regions);
  return regions;
}

export function registerLiveGlobalRegions(regions = new Map()) {
  document.querySelectorAll('header, footer').forEach((root) => registerRegionsIn(root, regions, 'global'));
  return regions;
}

function patchKind(regionId) {
  const scopedRegionId = regionId.startsWith('global.') ? regionId.slice('global.'.length) : regionId;
  return scopedRegionId.split('.', 1)[0];
}

const route = window.__INAD_LIVE_EDITOR_ROUTE__ || window.location.pathname;
const regions = registerLiveContentRegions();
const globalRegions = registerLiveGlobalRegions();
let activePatches = {};
let activeGlobalPatches = {};

function applyPatches(patches, targetRegions) {
  Object.entries(patches).forEach(([regionId, patch]) => {
    const element = targetRegions.get(regionId);
    if (!element || !patch || typeof patch !== 'object') return;
    const kind = patchKind(regionId);
    if (kind === 'content' && typeof patch.text === 'string' && element.textContent !== patch.text) element.textContent = patch.text;
    if (kind === 'field' && (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) && typeof patch.text === 'string' && element.placeholder !== patch.text) element.placeholder = patch.text;
    if (kind === 'media' && isSafeLiveUrl(patch.url, regionId)) {
      if (element instanceof HTMLImageElement && element.getAttribute('src') !== patch.url) element.src = patch.url;
      else if (element instanceof HTMLMediaElement || element instanceof HTMLSourceElement) {
        if (element.getAttribute('src') !== patch.url) {
          element.src = patch.url;
          element.closest('video, audio')?.load();
        }
      } else if (element instanceof HTMLElement && element.dataset.liveEditorMediaUrl !== patch.url) {
        element.style.backgroundImage = `url(${JSON.stringify(patch.url)})`;
        element.dataset.liveEditorMediaUrl = patch.url;
      }
    }
    if (kind === 'link' && element instanceof HTMLAnchorElement && isSafeLiveUrl(patch.url, regionId) && element.dataset.liveEditorPatchedHref !== patch.url) {
      element.dataset.liveEditorPatchedHref = patch.url;
      delete element.dataset.liveEditorLinked;
      element.href = patch.url;
    }
  });
}

export function applyLiveContentPatches(patches) {
  if (!patches || typeof patches !== 'object') return;
  const routePatches = {};
  const globalPatches = {};
  Object.entries(patches).forEach(([regionId, patch]) => {
    if (regionId.startsWith('global.')) globalPatches[regionId] = patch;
    else routePatches[regionId] = patch;
  });
  activePatches = { ...activePatches, ...routePatches };
  activeGlobalPatches = { ...activeGlobalPatches, ...globalPatches };
  applyPatches(routePatches, regions);
  applyPatches(globalPatches, globalRegions);
  document.dispatchEvent(new CustomEvent('live-editor-content-applied'));
}

const routeReady = fetch(`/api/admin/public/editor/live?route=${encodeURIComponent(route)}`)
  .then((response) => response.ok ? response.json() : { patches: {} })
  .then((payload) => applyLiveContentPatches(payload.patches))
  .catch(() => {});
const globalReady = fetch('/api/admin/public/editor/live-global')
  .then((response) => response.ok ? response.json() : { patches: {} })
  .then((payload) => applyLiveContentPatches(payload.patches))
  .catch(() => {});
const ready = Promise.all([routeReady, globalReady]);

let observerQueued = false;
new MutationObserver(() => {
  if (observerQueued) return;
  observerQueued = true;
  queueMicrotask(() => {
    observerQueued = false;
    registerLiveContentRegions(regions);
    if (Object.keys(activePatches).length) applyLiveContentPatches(activePatches);
    if (Object.keys(activeGlobalPatches).length) applyLiveContentPatches(activeGlobalPatches);
  });
}).observe(document.body, { childList: true, subtree: true });

window.__INAD_LIVE_CONTENT__ = { regions, globalRegions, applyLiveContentPatches, ready };
