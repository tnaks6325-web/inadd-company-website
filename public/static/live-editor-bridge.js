import {
  createLiveEditorMessage,
  isLiveEditorMessage,
  normalizeLiveEditorRoute,
} from '/static/live-editor-contract.js';

const params = new URLSearchParams(window.location.search);
const isLiveEditorFrame = params.get('editor') === '1';

if (isLiveEditorFrame && window.parent !== window) {
  let mode = 'interact';
  let selectedRegionId = null;

  function getRegions() {
    return [...document.querySelectorAll('[data-live-editor-region]')]
      .map((element) => element.getAttribute('data-live-editor-region'))
      .filter((regionId) => typeof regionId === 'string' && /^[a-z0-9][a-z0-9._-]{0,79}$/i.test(regionId));
  }

  function send(type, payload = {}) {
    window.parent.postMessage(createLiveEditorMessage(type, payload), window.location.origin);
  }

  function updateMode(nextMode) {
    mode = nextMode;
    selectedRegionId = null;
    document.documentElement.dataset.liveEditorMode = mode;
    document.querySelectorAll('[data-live-editor-region]').forEach((element) => {
      element.classList.toggle('live-editor-selected', false);
    });
  }

  function selectRegion(regionId) {
    if (!getRegions().includes(regionId)) return;
    selectedRegionId = regionId;
    document.querySelectorAll('[data-live-editor-region]').forEach((element) => {
      element.classList.toggle('live-editor-selected', element.getAttribute('data-live-editor-region') === regionId);
    });
    send('select', { regionId });
  }

  function preserveEditorQuery() {
    document.querySelectorAll('a[href]').forEach((anchor) => {
      if (anchor.dataset.liveEditorLinked === '1') return;
      const route = normalizeLiveEditorRoute(anchor.href, window.location.origin);
      if (!route || anchor.target || anchor.hasAttribute('download')) return;
      const url = new URL(anchor.href, window.location.origin);
      url.searchParams.set('editor', '1');
      anchor.href = url.pathname + url.search + url.hash;
      anchor.dataset.liveEditorLinked = '1';
    });
  }

  window.addEventListener('message', (event) => {
    if (event.origin !== window.location.origin || event.source !== window.parent || !isLiveEditorMessage(event.data)) return;
    if (event.data.type === 'set-mode') updateMode(event.data.mode);
    if (event.data.type === 'apply') {
      const patches = event.data.field === 'url'
        ? { [event.data.regionId]: { url: event.data.value } }
        : { [event.data.regionId]: { text: event.data.field === 'text' ? event.data.value : event.data.text } };
      window.__INAD_LIVE_CONTENT__?.applyLiveContentPatches(patches);
    }
  });

  document.addEventListener('click', (event) => {
    if (mode !== 'select') return;
    const target = event.target instanceof Element ? event.target.closest('[data-live-editor-region]') : null;
    const regionId = target?.getAttribute('data-live-editor-region');
    if (!regionId) return;
    event.preventDefault();
    event.stopPropagation();
    selectRegion(regionId);
  }, true);

  preserveEditorQuery();
  updateMode('interact');
  send('ready', { route: window.location.pathname, regions: getRegions() });
}
