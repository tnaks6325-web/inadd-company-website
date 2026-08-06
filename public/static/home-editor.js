(() => {
  'use strict';

  const fields = {
    heroEyebrow: '#editorHeroEyebrow', heroLine1: '#hlLine1', heroLine2: '#hlLine2',
    heroLine3: '#hlLine3', heroSub: '#heroSub', heroCta: '#editorHeroCta',
    servicesLabel: '#editorServicesLabel', servicesTitleLead: '#editorServicesTitleLead',
    servicesTitleAccent: '#editorServicesTitleAccent', servicesTitleTail: '#editorServicesTitleTail',
    servicesSub: '#editorServicesSub', historyLabel: '#editorHistoryLabel',
    historyTitleLead: '#editorHistoryTitleLead', historyTitleAccent: '#editorHistoryTitleAccent',
    historySub: '#editorHistorySub', testimonialsLabel: '#editorTestimonialsLabel',
    testimonialsTitleLead: '#editorTestimonialsTitleLead',
    testimonialsTitleAccent: '#editorTestimonialsTitleAccent', ctaBadge: '#editorCtaBadge',
    ctaTitleLead: '#editorCtaTitleLead', ctaTitleAccent: '#editorCtaTitleAccent',
    ctaSub: '#editorCtaSub', ctaButton: '#editorCtaButton'
  };
  const sections = {
    hero: '#heroSlider', services: '#services', stats: '#homeStats', history: '#history',
    testimonials: '#homeTestimonials', cta: '#homeCta'
  };
  const accents = {
    hero: ['#hlLine2'], services: ['#editorServicesTitleAccent'], stats: [],
    history: ['#editorHistoryTitleAccent'], testimonials: ['#editorTestimonialsTitleAccent'],
    cta: ['#editorCtaTitleAccent']
  };
  const fontFamilies = {
    pretendard: "Pretendard, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    display: "'Arial Black', Pretendard, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    mono: "'SFMono-Regular', Consolas, monospace"
  };

  function setScaledSize(element, percent) {
    if (!element.dataset.editorBaseSize) {
      element.dataset.editorBaseSize = String(parseFloat(getComputedStyle(element).fontSize) || 16);
    }
    element.style.fontSize = `${Number(element.dataset.editorBaseSize) * percent / 100}px`;
  }

  function applyConfig(config) {
    Object.entries(sections).forEach(([key, selector]) => {
      const element = document.querySelector(selector);
      const style = config.sections?.[key];
      if (!element || !style) return;
      element.style.backgroundColor = style.backgroundColor === 'transparent' ? '' : style.backgroundColor;
      (accents[key] || []).forEach((target) => {
        const accent = document.querySelector(target);
        if (accent) accent.style.color = style.accentColor;
      });
    });

    Object.entries(fields).forEach(([key, selector]) => {
      const element = document.querySelector(selector);
      const field = config.fields?.[key];
      if (!element || !field) return;
      element.dataset.homeEditorKey = key;
      element.dataset.liveEditorRegion = `home.${key}`;
      element.textContent = field.text;
      element.style.whiteSpace = 'pre-line';
      element.style.color = field.color;
      element.style.backgroundColor = field.backgroundColor === 'transparent' ? '' : field.backgroundColor;
      element.style.fontFamily = fontFamilies[field.fontFamily] || fontFamilies.pretendard;
      element.style.fontWeight = field.fontWeight;
      element.style.textAlign = field.textAlign;
      setScaledSize(element, field.fontSize);
    });
    window.dispatchEvent(new CustomEvent('inad:home-editor-config', { detail: config }));
  }

  const ready = fetch('/api/admin/public/editor/home')
    .then((response) => {
      if (!response.ok) throw new Error('editor config unavailable');
      return response.json();
    })
    .then((payload) => {
      const config = payload.config;
      applyConfig(config);
      return config;
    })
    .catch(() => null);

  window.__INAD_HOME_EDITOR__ = { fields, sections, accents, applyConfig, ready };
})();
