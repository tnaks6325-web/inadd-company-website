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
  let config = null;
  let activeKey = null;
  let activeSection = null;
  let undoStack = [];
  let redoStack = [];
  let focusSnapshot = null;

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

  function toast(message) {
    const element = $('toast');
    element.textContent = message;
    element.classList.add('show');
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => element.classList.remove('show'), 2800);
  }

  function frameEditor() { return frame.contentWindow && frame.contentWindow.__INAD_HOME_EDITOR__; }
  function frameDocument() { return frame.contentDocument; }
  function apply() { if (config && frameEditor()) frameEditor().applyConfig(config); }
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
    $('saveStatus').textContent = '저장되지 않은 변경';
  }

  function editability(enabled) {
    const doc = frameDocument();
    if (!doc || !frameEditor()) return;
    Object.entries(frameEditor().fields).forEach(([key, selector]) => {
      const element = doc.querySelector(selector);
      if (!element) return;
      element.contentEditable = enabled ? 'true' : 'false';
      element.spellcheck = false;
      element.style.outline = enabled ? '1px dashed rgba(38,103,255,.55)' : '';
      element.style.outlineOffset = enabled ? '5px' : '';
      element.style.cursor = enabled ? 'text' : '';
      if (enabled && !element.dataset.editorBound) {
        element.dataset.editorBound = '1';
        element.addEventListener('focus', () => {
          focusSnapshot = deepCopy(config);
          selectField(key);
        });
        element.addEventListener('click', (event) => event.preventDefault());
        element.addEventListener('input', () => {
          config.fields[key].text = element.innerText.replace(/\r\n?/g, '\n').slice(0, 300);
          $('saveStatus').textContent = '입력 중…';
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
    const editor = frameEditor();
    if (!editor) return;
    await editor.ready.catch(() => null);
    if (!config) return;
    apply();
    editability(!document.body.classList.contains('preview'));
  }

  frame.addEventListener('load', connectFrame);
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
    $('saveStatus').textContent = '저장되지 않은 변경';
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
    editability(!preview);
  });
  $('saveBtn').addEventListener('click', async () => {
    try {
      $('saveBtn').disabled = true;
      $('saveStatus').textContent = '저장 중…';
      const result = await api('/editor/home', { method: 'PUT', body: JSON.stringify(config) });
      config = result.config;
      undoStack = []; redoStack = []; updateHistoryButtons();
      $('saveStatus').textContent = '저장됨';
      toast('홈페이지 변경사항을 저장했습니다.');
    } catch (error) {
      $('saveStatus').textContent = '저장 실패';
      toast(error.message);
    } finally { $('saveBtn').disabled = false; }
  });

  const theme = localStorage.getItem('inadd_editor_theme');
  if (['studio','paper','sky'].includes(theme)) {
    document.body.dataset.theme = theme;
    document.querySelectorAll('.theme-swatch').forEach((item) => item.classList.toggle('active', item.dataset.theme === theme));
  }

  api('/editor/home').then((data) => {
    config = data.config;
    $('saveStatus').textContent = '저장됨';
    connectFrame();
  }).catch((error) => {
    $('saveStatus').textContent = '불러오기 실패';
    toast(error.message);
  });
})();
