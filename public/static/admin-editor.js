import {
  LIVE_EDITOR_ROUTES,
  createLiveEditorMessage,
  isLiveEditorMessage,
  isSafeLiveUrl,
  normalizeLiveEditorRoute,
  toLiveEditorUrl,
} from '/static/live-editor-contract.js';
import { createLiveEditorSavePlan, hasLiveEditorChanges } from '/static/live-editor-save-plan.js';

(() => {
  'use strict';

  const token = localStorage.getItem('admin_token');
  if (!token) {
    location.replace('/admin/login');
    return;
  }

  const labels = {
    heroEyebrow: '히어로 · 영문 라벨', heroLine1: '히어로 · 제목 첫 줄', heroLine2: '히어로 · 강조 제목',
    heroLine3: '히어로 · 제목 마지막 줄', heroSub: '히어로 · 설명', heroCta: '히어로 · 버튼',
    servicesLabel: '서비스 · 라벨', servicesTitleLead: '서비스 · 제목 앞',
    servicesTitleAccent: '서비스 · 강조 제목', servicesTitleTail: '서비스 · 제목 뒤', servicesSub: '서비스 · 설명',
    historyLabel: '연혁 · 라벨', historyTitleLead: '연혁 · 제목', historyTitleAccent: '연혁 · 강조 제목',
    historySub: '연혁 · 설명', testimonialsLabel: '후기 · 라벨',
    testimonialsTitleLead: '후기 · 제목', testimonialsTitleAccent: '후기 · 강조 제목',
    ctaBadge: 'CTA · 라벨', ctaTitleLead: 'CTA · 제목', ctaTitleAccent: 'CTA · 강조 제목',
    ctaSub: 'CTA · 설명', ctaButton: 'CTA · 버튼'
  };
  const fieldSections = {
    heroEyebrow:'hero',heroLine1:'hero',heroLine2:'hero',heroLine3:'hero',heroSub:'hero',heroCta:'hero',
    servicesLabel:'services',servicesTitleLead:'services',servicesTitleAccent:'services',servicesTitleTail:'services',servicesSub:'services',
    historyLabel:'history',historyTitleLead:'history',historyTitleAccent:'history',historySub:'history',
    testimonialsLabel:'testimonials',testimonialsTitleLead:'testimonials',testimonialsTitleAccent:'testimonials',
    ctaBadge:'cta',ctaTitleLead:'cta',ctaTitleAccent:'cta',ctaSub:'cta',ctaButton:'cta'
  };
  const deepCopy = (value) => JSON.parse(JSON.stringify(value));
  const $ = (id) => document.getElementById(id);
  const frame = $('siteFrame');
  function ensureLiveResetAction() {
    if ($('resetLiveBtn')) return;
    const button = document.createElement('button');
    button.id = 'resetLiveBtn';
    button.className = 'btn secondary';
    button.type = 'button';
    button.hidden = true;
    button.textContent = '원본 복구';
    $('previewBtn').before(button);
  }
  ensureLiveResetAction();
  function ensureHomeResetAction() {
    if ($('resetHomeBtn')) return;
    const button = document.createElement('button');
    button.id = 'resetHomeBtn';
    button.className = 'btn secondary';
    button.type = 'button';
    button.hidden = true;
    button.textContent = '홈 원본 복구';
    $('previewBtn').before(button);
  }
  ensureHomeResetAction();
  function ensureGlobalResetAction() {
    if ($('resetGlobalLiveBtn')) return;
    const button = document.createElement('button');
    button.id = 'resetGlobalLiveBtn';
    button.className = 'btn secondary';
    button.type = 'button';
    button.hidden = true;
    button.textContent = '공통 원본 복구';
    $('previewBtn').before(button);
  }
  ensureGlobalResetAction();
  function ensureLiveUrlInspector() {
    const textField = $('liveContentText')?.closest('label');
    if (!textField || $('liveContentUrl')) return;
    const urlField = document.createElement('label');
    urlField.id = 'liveContentUrlField';
    urlField.hidden = true;
    urlField.textContent = 'URL';
    const input = document.createElement('input');
    input.id = 'liveContentUrl';
    input.type = 'url';
    input.maxLength = 2048;
    input.inputMode = 'url';
    input.autocomplete = 'off';
    urlField.append(input);
    const info = document.createElement('p');
    info.id = 'liveContentUrlInfo';
    info.className = 'compact-info';
    info.hidden = true;
    info.textContent = 'HTTPS 주소 또는 사이트 내부 경로만 사용할 수 있습니다.';
    textField.after(urlField, info);
  }
  ensureLiveUrlInspector();
  let config = null;
  let activeKey = null;
  let activeSection = null;
  let undoStack = [];
  let redoStack = [];
  let focusSnapshot = null;
  let activeRoute = '/';
  let liveMode = 'interact';
  let activeLiveRegion = null;
  let activeLiveUrlRegion = null;
  let livePatches = {};
  let globalLivePatches = {};
  let dirty = { home: false, route: false, global: false };
  let changeRevision = { home: 0, route: 0, global: 0 };
  let isSaving = false;

  function updateSaveStatus(cleanMessage = '저장됨') {
    const dirtyCount = Object.values(dirty).filter(Boolean).length;
    $('saveStatus').textContent = dirtyCount ? `저장되지 않은 변경 ${dirtyCount}개` : cleanMessage;
  }

  function markDirty(scope) {
    changeRevision[scope] += 1;
    dirty[scope] = true;
    updateSaveStatus();
  }

  function isGlobalLiveRegion(regionId) {
    return typeof regionId === 'string' && regionId.startsWith('global.');
  }

  function liveRegionKind(regionId) {
    const scopedRegionId = isGlobalLiveRegion(regionId) ? regionId.slice('global.'.length) : regionId;
    return scopedRegionId.split('.', 1)[0];
  }

  function livePatchesFor(regionId) {
    return isGlobalLiveRegion(regionId) ? globalLivePatches : livePatches;
  }

  function updateLiveRecoveryActions() {
    const hasRouteLiveSelection = Boolean(activeLiveRegion || activeLiveUrlRegion) && !isGlobalLiveRegion(activeLiveUrlRegion || activeLiveRegion);
    $('resetHomeBtn').hidden = activeRoute !== '/';
    $('resetLiveBtn').hidden = activeRoute === '/' && !hasRouteLiveSelection;
    $('resetGlobalLiveBtn').hidden = !isGlobalLiveRegion(activeLiveUrlRegion || activeLiveRegion);
  }

  async function api(path, options = {}) {
    const response = await fetch('/api/admin' + path, {
      ...options,
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token, ...(options.headers || {}) }
    });
    if (response.status === 401) {
      localStorage.removeItem('admin_token');
      location.replace('/admin/login');
      throw new Error('로그인이 만료되었습니다.');
    }
    const body = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(body.error || '요청을 처리하지 못했습니다.');
    return body;
  }

  async function loadLivePatches(route) {
    const requestedRoute = route;
    try {
      const result = await api(`/editor/live?route=${encodeURIComponent(route)}`);
      if (activeRoute !== requestedRoute || dirty.route) return;
      livePatches = result.patches || {};
    } catch (error) {
      if (activeRoute === requestedRoute) toast(error.message);
    }
  }

  async function loadGlobalLivePatches() {
    try {
      const result = await api('/editor/live-global');
      if (dirty.global) return;
      globalLivePatches = result.patches || {};
    } catch (error) {
      toast(error.message);
    }
  }

  function showLiveContentInspector(regionId) {
    const element = [...frameDocument().querySelectorAll('[data-live-editor-region]')]
      .find((candidate) => candidate.getAttribute('data-live-editor-region') === regionId);
    if (!element) return;
    activeKey = null;
    activeSection = null;
    activeLiveRegion = regionId;
    const patches = livePatchesFor(regionId);
    const kind = liveRegionKind(regionId);
    $('selectedName').textContent = '실제 페이지 문구';
    $('selectionBadge').textContent = isGlobalLiveRegion(regionId) ? 'GLOBAL' : 'TEXT';
    $('emptyInspector').hidden = true;
    $('inspectorControls').hidden = true;
    $('liveContentInspector').hidden = false;
    const isField = kind === 'field';
    $('liveContentText').value = patches[regionId]?.text ?? (isField ? element.getAttribute('placeholder') : element.textContent) ?? '';
    const textField = $('liveContentText').closest('label');
    const anchor = element instanceof HTMLAnchorElement ? element : element.closest('a[href]');
    const urlRegion = kind === 'media' || kind === 'link'
      ? regionId
      : anchor?.dataset.liveEditorLinkRegion;
    const isMedia = kind === 'media';
    activeLiveUrlRegion = urlRegion || null;
    textField.hidden = !(kind === 'content' || isField);
    $('liveContentUrlField').hidden = !activeLiveUrlRegion;
    $('liveContentUrlInfo').hidden = !activeLiveUrlRegion;
    $('liveContentInspector').querySelector('.compact-info:not(#liveContentUrlInfo)').hidden = Boolean(activeLiveUrlRegion);
    if (activeLiveUrlRegion) {
      $('liveContentUrl').value = livePatchesFor(activeLiveUrlRegion)[activeLiveUrlRegion]?.url
        ?? (isMedia ? (element.getAttribute('src') || element.dataset.liveEditorMediaUrl) : (anchor?.dataset.liveEditorPatchedHref || anchor?.dataset.liveEditorOriginalHref || anchor?.getAttribute('href')))
        ?? '';
      $('selectedName').textContent = isMedia ? '실제 페이지 미디어' : '실제 페이지 링크';
      $('selectionBadge').textContent = isMedia ? 'MEDIA' : 'LINK';
    } else if (isField) {
      $('selectedName').textContent = '실제 페이지 입력 안내';
      $('selectionBadge').textContent = 'FORM';
    }
    if (isGlobalLiveRegion(regionId)) $('selectedName').textContent = isMedia ? '공통 미디어' : (activeLiveUrlRegion ? '공통 링크' : '공통 메뉴·푸터 문구');
    updateLiveRecoveryActions();
  }

  function toast(message) {
    const element = $('toast');
    element.textContent = message;
    element.classList.add('show');
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => element.classList.remove('show'), 2800);
  }

  function frameEditor() { return activeRoute === '/' && frame.contentWindow && frame.contentWindow.__INAD_HOME_EDITOR__; }
  function frameDocument() { return frame.contentDocument; }
  function apply() { if (config && frameEditor()) frameEditor().applyConfig(config); }

  function setRouteDisplay(route) {
    const entry = LIVE_EDITOR_ROUTES.find((item) => item.path === route)
      || (route.startsWith('/insight/') ? { path: route, label: 'Insight article' } : LIVE_EDITOR_ROUTES[0]);
    activeRoute = entry.path;
    const picker = $('liveRoutePicker');
    if (![...picker.options].some((option) => option.value === entry.path)) {
      const option = document.createElement('option');
      option.value = entry.path;
      option.textContent = entry.label;
      picker.append(option);
    }
    picker.value = entry.path;
    document.querySelector('.page-chip b').textContent = entry.label;
    document.querySelector('.page-chip small').textContent = entry.path;
    $('saveBtn').disabled = false;
    updateLiveRecoveryActions();
    loadLivePatches(entry.path);
  }

  function postLiveMode() {
    frame.contentWindow?.postMessage(createLiveEditorMessage('set-mode', { mode: liveMode }), window.location.origin);
  }

  function setLiveMode(nextMode) {
    liveMode = nextMode;
    document.querySelectorAll('[data-live-mode]').forEach((button) => button.classList.toggle('active', button.dataset.liveMode === liveMode));
    document.querySelector('.canvas-hint').innerHTML = liveMode === 'interact'
      ? '<span class="pulse"></span><b>상호작용 모드</b>에서 실제 메뉴와 페이지 동작을 확인하세요.'
      : '<span class="pulse"></span><b>선택 모드</b>에서 파란 윤곽선으로 표시된 편집 영역을 선택하세요.';
    if (liveMode === 'interact') editability(false);
    postLiveMode();
  }

  async function navigateLiveRoute(route) {
    const target = toLiveEditorUrl(route);
    if (!target) return;
    if (isSaving) {
      $('liveRoutePicker').value = activeRoute;
      return;
    }
    if (route === activeRoute) return;
    if (hasLiveEditorChanges(dirty)) {
      const shouldSave = window.confirm('저장되지 않은 변경이 있습니다. 저장한 뒤 페이지를 이동할까요? 취소를 누르면 현재 편집을 계속합니다.');
      if (!shouldSave || !await savePendingChanges({ announce: false })) {
        $('liveRoutePicker').value = activeRoute;
        return;
      }
    }
    editability(false);
    activeKey = null;
    activeSection = null;
    activeLiveRegion = null;
    activeLiveUrlRegion = null;
    updateLiveRecoveryActions();
    $('liveContentInspector').hidden = true;
    $('emptyInspector').hidden = false;
    $('inspectorControls').hidden = true;
    $('selectedName').textContent = '요소를 선택하세요';
    $('selectionBadge').textContent = '—';
    setRouteDisplay(route);
    frame.src = target;
  }

  function populateRoutePicker() {
    LIVE_EDITOR_ROUTES.forEach((route) => {
      const option = document.createElement('option');
      option.value = route.path;
      option.textContent = route.label;
      $('liveRoutePicker').append(option);
    });
    setRouteDisplay(activeRoute);
  }
  function updateHistoryButtons() {
    $('undoBtn').disabled = undoStack.length === 0;
    $('redoBtn').disabled = redoStack.length === 0;
  }
  function pushHistory(snapshot) {
    if (!snapshot) return;
    undoStack.push(snapshot);
    if (undoStack.length > 30) undoStack.shift();
    redoStack = [];
    updateHistoryButtons();
    markDirty('home');
  }

  function editability(enabled, editableKey = activeKey) {
    const doc = frameDocument();
    if (!doc || !frameEditor()) return;
    Object.entries(frameEditor().fields).forEach(([key, selector]) => {
      const element = doc.querySelector(selector);
      if (!element) return;
      const canEdit = enabled && key === editableKey;
      element.contentEditable = canEdit ? 'true' : 'false';
      element.spellcheck = false;
      element.style.outline = canEdit ? '1px dashed rgba(38,103,255,.55)' : '';
      element.style.outlineOffset = canEdit ? '5px' : '';
      element.style.cursor = canEdit ? 'text' : '';
      if (!element.dataset.editorBound) {
        element.dataset.editorBound = '1';
        element.addEventListener('focus', () => {
          focusSnapshot = deepCopy(config);
          selectField(key);
        });
        element.addEventListener('click', (event) => event.preventDefault());
        element.addEventListener('input', () => {
          config.fields[key].text = element.innerText.replace(/\r\n?/g, '\n').slice(0, 300);
          markDirty('home');
        });
        element.addEventListener('blur', () => {
          const changed = JSON.stringify(focusSnapshot) !== JSON.stringify(config);
          if (changed) pushHistory(focusSnapshot);
          focusSnapshot = null;
          apply();
        });
      }
    });
  }

  function selectField(key) {
    activeKey = key;
    activeSection = fieldSections[key];
    const field = config.fields[key];
    const section = config.sections[fieldSections[key]];
    $('selectedName').textContent = labels[key] || key;
    $('selectionBadge').textContent = fieldSections[key].toUpperCase();
    $('emptyInspector').hidden = true;
    $('inspectorControls').hidden = false;
    $('typographyControls').hidden = false;
    $('textColorControls').hidden = false;
    $('fontFamily').value = field.fontFamily;
    $('fontWeight').value = field.fontWeight;
    $('fontSize').value = field.fontSize;
    $('fontSizeValue').textContent = field.fontSize + '%';
    $('textColor').value = field.color;
    $('highlightColor').value = field.backgroundColor === 'transparent' ? '#ffffff' : field.backgroundColor;
    $('sectionColor').value = section.backgroundColor === 'transparent' ? '#ffffff' : section.backgroundColor;
    $('accentColor').value = section.accentColor;
    document.querySelectorAll('[data-align]').forEach((button) => button.classList.toggle('active', button.dataset.align === field.textAlign));
    document.querySelectorAll('[data-section]').forEach((button) => button.classList.toggle('active', button.dataset.section === fieldSections[key]));
  }

  function selectSection(sectionKey) {
    activeKey = null;
    activeSection = sectionKey;
    const names = { hero:'히어로', services:'서비스 소개', stats:'성과 수치', history:'회사 연혁', testimonials:'고객 후기', cta:'상담 CTA' };
    const section = config.sections[sectionKey];
    $('selectedName').textContent = names[sectionKey] + ' · 섹션';
    $('selectionBadge').textContent = 'SECTION';
    $('emptyInspector').hidden = true;
    $('inspectorControls').hidden = false;
    $('typographyControls').hidden = true;
    $('textColorControls').hidden = true;
    $('sectionColor').value = section.backgroundColor === 'transparent' ? '#ffffff' : section.backgroundColor;
    $('accentColor').value = section.accentColor;
  }

  function mutate(change) {
    if (!activeKey) return;
    pushHistory(deepCopy(config));
    change(config.fields[activeKey], config.sections[fieldSections[activeKey]]);
    apply();
    selectField(activeKey);
  }

  function mutateSection(change) {
    if (!activeSection) return;
    pushHistory(deepCopy(config));
    change(config.sections[activeSection]);
    apply();
    if (activeKey) selectField(activeKey); else selectSection(activeSection);
  }

  async function connectFrame() {
    try {
      const route = normalizeLiveEditorRoute(frame.contentWindow?.location?.pathname);
      if (route) setRouteDisplay(route);
    } catch {}
    const editor = frameEditor();
    if (editor) {
      await editor.ready.catch(() => null);
      if (config) apply();
    }
    editability(false);
    postLiveMode();
  }

  frame.addEventListener('load', connectFrame);
  window.addEventListener('message', (event) => {
    if (event.origin !== window.location.origin || event.source !== frame.contentWindow || !isLiveEditorMessage(event.data)) return;
    if (event.data.type === 'ready' || event.data.type === 'route-change') {
      const route = normalizeLiveEditorRoute(event.data.route);
      if (route) setRouteDisplay(route);
      postLiveMode();
      return;
    }
    if (event.data.type !== 'select' || liveMode !== 'select') return;
    if (event.data.regionId.startsWith('home.') && activeRoute === '/') {
      const key = event.data.regionId.slice('home.'.length);
      if (!config?.fields[key]) return;
      selectField(key);
      editability(true, key);
      frameDocument()?.querySelector(frameEditor().fields[key])?.focus();
      return;
    }
    const kind = liveRegionKind(event.data.regionId);
    if (['content', 'field', 'media', 'link'].includes(kind)) showLiveContentInspector(event.data.regionId);
  });
  populateRoutePicker();
  $('liveRoutePicker').addEventListener('change', async (event) => navigateLiveRoute(event.target.value));
  document.querySelectorAll('[data-live-mode]').forEach((button) => button.addEventListener('click', () => setLiveMode(button.dataset.liveMode)));
  $('fontFamily').addEventListener('change', (event) => mutate((field) => { field.fontFamily = event.target.value; }));
  $('fontWeight').addEventListener('change', (event) => mutate((field) => { field.fontWeight = Number(event.target.value); }));
  $('fontSize').addEventListener('change', (event) => mutate((field) => { field.fontSize = Number(event.target.value); }));
  $('fontSize').addEventListener('input', (event) => { $('fontSizeValue').textContent = event.target.value + '%'; });
  $('textColor').addEventListener('change', (event) => mutate((field) => { field.color = event.target.value; }));
  $('highlightColor').addEventListener('change', (event) => mutate((field) => { field.backgroundColor = event.target.value; }));
  $('sectionColor').addEventListener('change', (event) => mutateSection((section) => { section.backgroundColor = event.target.value; }));
  $('accentColor').addEventListener('change', (event) => mutateSection((section) => { section.accentColor = event.target.value; }));
  $('clearHighlight').addEventListener('click', () => mutate((field) => { field.backgroundColor = 'transparent'; }));
  $('clearSection').addEventListener('click', () => mutateSection((section) => { section.backgroundColor = 'transparent'; }));
  document.querySelectorAll('[data-align]').forEach((button) => button.addEventListener('click', () => mutate((field) => { field.textAlign = button.dataset.align; })));
  $('liveContentText').addEventListener('input', (event) => {
    if (!activeLiveRegion) return;
    const text = event.target.value.replace(/\r\n?/g, '\n').slice(0, 500);
    livePatchesFor(activeLiveRegion)[activeLiveRegion] = { text };
    postLiveMode();
    frame.contentWindow?.postMessage(createLiveEditorMessage('apply', { regionId: activeLiveRegion, text }), window.location.origin);
    markDirty(isGlobalLiveRegion(activeLiveRegion) ? 'global' : 'route');
  });
  $('liveContentUrl').addEventListener('change', (event) => {
    if (!activeLiveUrlRegion) return;
    const url = event.target.value.trim();
    if (!isSafeLiveUrl(url, activeLiveUrlRegion)) {
      toast('HTTPS 주소 또는 사이트 내부 경로만 사용할 수 있습니다.');
      return;
    }
    livePatchesFor(activeLiveUrlRegion)[activeLiveUrlRegion] = { url };
    postLiveMode();
    frame.contentWindow?.postMessage(createLiveEditorMessage('apply', { regionId: activeLiveUrlRegion, field: 'url', value: url }), window.location.origin);
    markDirty(isGlobalLiveRegion(activeLiveUrlRegion) ? 'global' : 'route');
  });

  document.querySelectorAll('.device-btn').forEach((button) => button.addEventListener('click', () => {
    document.querySelectorAll('.device-btn').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    $('frameWrap').className = 'frame-wrap device-' + button.dataset.device;
  }));
  document.querySelectorAll('.theme-swatch').forEach((button) => button.addEventListener('click', () => {
    document.body.dataset.theme = button.dataset.theme;
    localStorage.setItem('inadd_editor_theme', button.dataset.theme);
    document.querySelectorAll('.theme-swatch').forEach((item) => item.classList.toggle('active', item === button));
  }));
  document.querySelectorAll('#sectionList [data-section]').forEach((button) => button.addEventListener('click', () => {
    const selector = frameEditor()?.sections[button.dataset.section];
    frameDocument()?.querySelector(selector)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    selectSection(button.dataset.section);
    document.querySelectorAll('#sectionList [data-section]').forEach((item) => item.classList.toggle('active', item === button));
  }));

  function restore(next, destination) {
    if (!next) return;
    destination.push(deepCopy(config));
    config = next;
    apply();
    if (activeKey) selectField(activeKey); else if (activeSection) selectSection(activeSection);
    updateHistoryButtons();
    markDirty('home');
  }
  $('undoBtn').addEventListener('click', () => restore(undoStack.pop(), redoStack));
  $('redoBtn').addEventListener('click', () => restore(redoStack.pop(), undoStack));
  document.addEventListener('keydown', (event) => {
    if (!(event.ctrlKey || event.metaKey) || event.key.toLowerCase() !== 'z') return;
    event.preventDefault();
    (event.shiftKey ? $('redoBtn') : $('undoBtn')).click();
  });

  $('previewBtn').addEventListener('click', () => {
    const preview = document.body.classList.toggle('preview');
    $('previewBtn').textContent = preview ? '편집으로 돌아가기' : '미리보기';
    setLiveMode('interact');
  });
  $('resetHomeBtn').addEventListener('click', async () => {
    if (isSaving) return;
    if (!window.confirm('홈 문구와 스타일의 저장된 편집을 지우고 기본 상태로 돌아갈까요?')) return;
    try {
      $('resetHomeBtn').disabled = true;
      const result = await api('/editor/home', { method: 'DELETE' });
      config = result.config;
      changeRevision.home += 1;
      dirty.home = false;
      undoStack = [];
      redoStack = [];
      updateHistoryButtons();
      apply();
      if (activeKey) selectField(activeKey); else if (activeSection) selectSection(activeSection);
      updateSaveStatus('홈 원본 상태');
      toast('홈 편집을 기본 상태로 복구했습니다.');
    } catch (error) {
      toast(error.message);
    } finally {
      $('resetHomeBtn').disabled = false;
    }
  });
  $('resetLiveBtn').addEventListener('click', async () => {
    if (isSaving) return;
    if (!window.confirm('이 페이지에 저장된 라이브 편집 변경을 모두 지우고 원본 상태로 돌아갈까요?')) return;
    try {
      $('resetLiveBtn').disabled = true;
      const result = await api(`/editor/live?route=${encodeURIComponent(activeRoute)}`, { method: 'DELETE' });
      livePatches = result.patches || {};
      changeRevision.route += 1;
      dirty.route = false;
      frame.src = toLiveEditorUrl(activeRoute);
      updateSaveStatus('원본 상태');
      toast('이 페이지를 원본 상태로 복구했습니다.');
    } catch (error) {
      toast(error.message);
    } finally {
      $('resetLiveBtn').disabled = false;
    }
  });
  $('resetGlobalLiveBtn').addEventListener('click', async () => {
    if (isSaving) return;
    if (!window.confirm('모든 페이지에 적용된 공통 메뉴·푸터 편집을 지우고 원본 상태로 돌아갈까요?')) return;
    try {
      $('resetGlobalLiveBtn').disabled = true;
      const result = await api('/editor/live-global', { method: 'DELETE' });
      globalLivePatches = result.patches || {};
      changeRevision.global += 1;
      dirty.global = false;
      frame.src = toLiveEditorUrl(activeRoute);
      updateSaveStatus('공통 원본 상태');
      toast('공통 메뉴·푸터를 원본 상태로 복구했습니다.');
    } catch (error) {
      toast(error.message);
    } finally {
      $('resetGlobalLiveBtn').disabled = false;
    }
  });
  async function savePendingChanges({ announce = true } = {}) {
    const plan = createLiveEditorSavePlan({
      dirty,
      route: activeRoute,
      config,
      routePatches: livePatches,
      globalPatches: globalLivePatches,
    });
    if (!plan.length) {
      updateSaveStatus('저장할 변경사항이 없습니다.');
      if (announce) toast('저장할 변경사항이 없습니다.');
      return true;
    }
    isSaving = true;
    $('saveBtn').disabled = true;
    $('saveStatus').textContent = '저장 중…';
    const results = await Promise.all(plan.map(async (action) => {
      const revision = changeRevision[action.scope];
      try {
        return { action, revision, payload: await api(action.path, { method: 'PUT', body: JSON.stringify(action.body) }) };
      } catch (error) {
        return { action, revision, error };
      }
    }));
    const successful = results.filter((result) => !result.error);
    const currentSuccesses = successful.filter(({ action, revision }) => changeRevision[action.scope] === revision);
    currentSuccesses.forEach(({ action, payload }) => {
      dirty[action.scope] = false;
      if (action.scope === 'home') config = payload.config;
      if (action.scope === 'route') livePatches = payload.patches;
      if (action.scope === 'global') globalLivePatches = payload.patches;
    });
    if (currentSuccesses.some(({ action }) => action.scope === 'home')) {
      undoStack = [];
      redoStack = [];
      updateHistoryButtons();
    }
    const failures = results.filter((result) => result.error);
    isSaving = false;
    $('saveBtn').disabled = false;
    if (failures.length) {
      updateSaveStatus(successful.length ? '일부 저장 실패' : '저장 실패');
      toast(failures[0].error.message);
      return false;
    }
    if (currentSuccesses.length !== successful.length) {
      updateSaveStatus('저장 도중 새 변경 감지');
      if (announce) toast('저장 중 새 변경이 있어 다시 저장해야 합니다.');
      return false;
    }
    updateSaveStatus();
    if (announce) toast(`${currentSuccesses.length}개 편집 범위를 저장했습니다.`);
    return true;
  }
  $('saveBtn').addEventListener('click', () => savePendingChanges());

  const theme = localStorage.getItem('inadd_editor_theme');
  if (['studio','paper','sky'].includes(theme)) {
    document.body.dataset.theme = theme;
    document.querySelectorAll('.theme-swatch').forEach((item) => item.classList.toggle('active', item.dataset.theme === theme));
  }

  Promise.all([api('/editor/home'), loadGlobalLivePatches()]).then(([data]) => {
    config = data.config;
    $('saveStatus').textContent = '저장됨';
    connectFrame();
  }).catch((error) => {
    $('saveStatus').textContent = '불러오기 실패';
    toast(error.message);
  });
})();
