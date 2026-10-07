(function () {
  'use strict';
  var panel = document.getElementById('hsvcPanel');
  var host = document.getElementById('hsvcPanelImg');
  var tabsRoot = document.getElementById('hsvcTabs');
  var tabs = Array.from(document.querySelectorAll('#hsvcTabs .hsvc-tab'));
  if (!panel || !panel.classList.contains('hsvc-panel--icons') || !host || !tabs.length || panel.dataset.iconsInitialized) return;
  panel.dataset.iconsInitialized = 'true';
  var fallback = document.getElementById('hsvcIconAsset');
  var indicator = document.getElementById('hsvcTabIndicator');
  var counter = document.getElementById('hsvcPanelNumber');
  var catalog = tabsRoot.dataset.layout === 'catalog';
  var fields = ['En', 'Name', 'Desc', 'Link'].map(function (key) { return document.getElementById('hsvcPanel' + key); });
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  var selected = Math.max(0, tabs.findIndex(function (tab) { return tab.classList.contains('active'); }));
  var token = 0, indicatorFrame = 0, active = null, displayedKey = null;
  var visible = !('IntersectionObserver' in window);
  var serial = 0, partAnimations = [], copyParts = [];
  var ASSEMBLY_MS = 660, EXIT_MS = 230;
  var ASSEMBLY_EASE = 'cubic-bezier(.16,1,.3,1)';
  var cache = new Map(), svgCache = new Map();
  var viewport = document.createElement('div');
  viewport.className = 'hsvc-motion-viewport';
  viewport.setAttribute('aria-hidden', 'true');
  var world = document.createElement('div');
  world.className = 'hsvc-motion-world';
  viewport.appendChild(world);
  var data = null;
  function notifyHeaderSelection(requestId, key) {
    if (!catalog || requestId <= 1 || typeof CustomEvent !== 'function' || typeof panel.dispatchEvent !== 'function') return;
    panel.dispatchEvent(new CustomEvent('hsvc:selection', { bubbles: true, detail: { service: key } }));
  }
  // Copy and vector parts share a cancellable selection cohort. No video or
  // external runtime is needed; links/headings remain real accessible HTML.
  function copyPart(field, text, kind) {
    var mask = document.createElement('span');
    mask.className = 'hsvc-copy-mask hsvc-copy-mask--' + kind;
    var node = document.createElement('span');
    node.className = 'hsvc-copy-part';
    node.dataset.copyKind = kind;
    node.textContent = text;
    mask.appendChild(node);
    field.appendChild(mask);
    copyParts.push(node);
  }
  function writeCopy(tab) {
    copyParts = [];
    fields[0].replaceChildren();
    copyPart(fields[0], tab.dataset.en || '', 'eyebrow');
    var title = tab.dataset.ko || '';
    var split = title.match(/^(.*) (마케팅)$/);
    fields[1].replaceChildren();
    fields[1].setAttribute('aria-label', title);
    (split ? [split[1] + ' ', split[2]] : [title]).forEach(function (word, index) {
      copyPart(fields[1], word, 'title-' + index);
    });
    // The accessible name stays unchanged when the trial's title uses two rows.
    Array.from(fields[1].children).forEach(function (mask) { mask.setAttribute('aria-hidden', 'true'); });
    fields[2].replaceChildren();
    copyPart(fields[2], tab.dataset.desc || '', 'description');
    fields[3].href = tab.dataset.href || '/contact';
    fields[3].inert = false;
    fields[3].dataset.copyKind = 'cta';
    copyParts.push(fields[3]);
    if (counter) {
      counter.textContent = String(tabs.indexOf(tab) + 1).padStart(2, '0');
      counter.dataset.copyKind = 'counter';
      copyParts.push(counter);
    }
    panel.classList.add('hsvc-panel--presentation');
    panel.dataset.presentedService = tab.dataset.service;
  }
  function clearCopyPose() {
    copyParts.forEach(function (node) {
      ['opacity', 'translate', 'rotate', 'scale'].forEach(function (key) { node.style.removeProperty(key); });
    });
  }
  function copyEntrance(direction) {
    return copyParts.map(function (node) {
      var kind = node.dataset.copyKind;
      var title = kind.indexOf('title-') === 0;
      var delay = kind === 'eyebrow' || kind === 'counter' ? 0 : title ? 60 + Number(kind.slice(6)) * 75 : kind === 'description' ? 220 : 320;
      return track(node, [
        { opacity: 0, translate: title ? '0px 110%' : direction * 18 + 'px 16px', rotate: title ? direction * 3 + 'deg' : '0deg', offset: 0 },
        { opacity: 1, translate: title ? '0px -3%' : '0px -1px', rotate: '0deg', offset: .78 },
        { opacity: 1, translate: '0px 0px', rotate: '0deg', offset: 1 }
      ], { duration: title ? 540 : 380, delay: delay, easing: ASSEMBLY_EASE, fill: 'both' });
    });
  }
  function copyExit(direction) {
    return copyParts.map(function (node, index) {
      var current = getComputedStyle(node);
      return track(node, [
        { opacity: current.opacity, translate: current.translate || 'none', rotate: current.rotate || 'none', scale: current.scale || 'none' },
        { opacity: 0, translate: -direction * 22 + 'px -16px', rotate: '0deg', scale: '1' }
      ], { duration: 170, delay: Math.min(index * 12, 36), easing: 'cubic-bezier(.55,0,1,.45)', fill: 'both' });
    });
  }
  function getData() {
    if (!data) data = fetch('/static/service-motion-v1/scenes.json').then(function (response) {
      if (!response.ok) throw new Error('Service motion manifest unavailable');
      return response.json();
    }).catch(function (error) { data = null; throw error; });
    return data;
  }

  function indicatorAtSelection(move) {
    if (!indicator) return;
    var root = tabsRoot.getBoundingClientRect(), rect = tabs[selected].getBoundingClientRect();
    if (!(root.width > 0 && rect.width > 0 && rect.height > 0)) return;
    var snap = !move || tabsRoot.dataset.indicatorReady !== 'true' || reduced.matches;
    var vertical = catalog && !(window.innerWidth <= 760);
    if (catalog) {
      tabsRoot.dataset.indicatorAxis = vertical ? 'vertical' : 'horizontal';
      tabsRoot.setAttribute('aria-orientation', vertical ? 'vertical' : 'horizontal');
    }
    if (snap) indicator.style.transition = 'none';
    else indicator.style.removeProperty('transition');
    indicator.style.transform = vertical
      ? 'translate3d(' + (rect.left - root.left) + 'px,' + (rect.top - root.top) + 'px,0) scaleY(' + rect.height + ')'
      : 'translate3d(' + (rect.left - root.left) + 'px,' + (rect.bottom - root.top - 1) + 'px,0) scaleX(' + rect.width + ')';
    tabsRoot.dataset.indicatorReady = 'true';
    if (snap) { void indicator.offsetWidth; indicator.style.removeProperty('transition'); }
  }
  function measure() {
    world.style.transform = 'scale(' + (viewport.clientWidth / 480) + ')';
    indicatorAtSelection(false);
  }
  function scheduleMeasure() {
    if (indicatorFrame) return;
    indicatorFrame = requestAnimationFrame(function () { indicatorFrame = 0; measure(); });
  }
  function syncVisibility() {
    panel.dataset.iconFloat = visible && !document.hidden && !reduced.matches ? 'running' : 'paused';
    // Preserve both the CSS action and the part cohort outside the viewport.
    partAnimations.forEach(function (item) {
      if (item.done) return;
      if (visible && !document.hidden && !reduced.matches) item.animation.play();
      else item.animation.pause();
    });
  }
  function setPhase(scene, phase) {
    scene.dataset.phase = phase;
    panel.dataset.iconPhase = phase;
    panel.dataset.presentationPhase = phase;
  }
  function finishPerformance(event) {
    if (!active || active.dataset.phase !== 'perform' || event.elapsedTime < 1.59) return;
    if (event.target.closest('.hsvc-motion-scene') !== active) return;
    setPhase(active, 'idle');
  }
  world.addEventListener('animationend', finishPerformance);

  // The Figma artwork stays intact. These explicitly user-requested selection tracks
  // are a separate web choreography, not a retiming of the source proof keyframes.
  function parts(scene) {
    return Array.from(scene.querySelectorAll('[data-name]')).filter(function (node) {
      return /^(Viral|Performance|Influencer|Experience|Review|OliveYoung|PPL)\//.test(node.getAttribute('data-name'));
    });
  }
  function clearPartPose(scene) {
    parts(scene).forEach(function (node) {
      ['opacity', 'translate', 'rotate', 'scale'].forEach(function (key) { node.style.removeProperty(key); });
    });
    scene.querySelectorAll('path').forEach(function (path) {
      path.style.removeProperty('stroke-dasharray');
      path.style.removeProperty('stroke-dashoffset');
    });
  }
  function stopParts() {
    var old = partAnimations;
    partAnimations = [];
    old.forEach(function (item) { item.animation.cancel(); });
  }
  function freezeScene(scene) {
    if (!scene) return;
    // Snapshot before cancelling: a rapid new click starts from what was visible,
    // rather than snapping an unfinished assembly to its final pose.
    var poses = parts(scene).concat(copyParts).map(function (node) {
      var computed = getComputedStyle(node);
      return { node: node, opacity: computed.opacity, translate: computed.translate, rotate: computed.rotate, scale: computed.scale };
    });
    var paths = Array.from(scene.querySelectorAll('path')).map(function (path) {
      var computed = getComputedStyle(path);
      return { node: path, dash: computed.strokeDasharray, offset: computed.strokeDashoffset };
    });
    stopParts();
    setPhase(scene, 'static');
    poses.forEach(function (pose) {
      ['opacity', 'translate', 'rotate', 'scale'].forEach(function (key) { pose.node.style[key] = pose[key] || (key === 'opacity' ? '1' : 'none'); });
    });
    paths.forEach(function (pose) {
      if (pose.dash) pose.node.style.strokeDasharray = pose.dash;
      if (pose.offset) pose.node.style.strokeDashoffset = pose.offset;
    });
  }
  function track(node, frames, options) {
    var animation = node.animate(frames, options);
    var item = { node: node, animation: animation };
    partAnimations.push(item);
    return animation.finished.then(function () {
      // Retain the final pose until the complete cohort finishes. Cancelling each
      // exit separately would flash earlier parts back before the last part exits.
      item.done = true;
    }, function () {});
  }
  function profile(name, index, direction) {
    var side = direction || 1;
    if (/Ground-Shadow$/.test(name)) return { x: 0, y: 0, rotate: 0, scale: .65, delay: 0, opacity: .7 };
    if (/Wave-|Connection-/.test(name)) return { x: -side * 30, y: 0, rotate: 0, scale: .7, delay: 90, opacity: 1 };
    if (/Bubble-|Reaction-|Star-/.test(name)) return {
      x: side * (54 + (index % 3) * 18), y: (index % 2 ? -1 : 1) * 40,
      rotate: side * (index % 2 ? -18 : 18), scale: .35, delay: 70 + (index % 5) * 30, opacity: 1
    };
    if (/Target|Check-Badge|Check-Card|Magnifier|Spotlight$/.test(name)) return { x: side * 72, y: -48, rotate: side * 22, scale: .45, delay: 110, opacity: 1 };
    if (/Bar-|Cosmetic-|Sample-Product|PPL\/Product/.test(name)) return { x: side * 25, y: 56, rotate: -side * 8, scale: .62, delay: 65 + (index % 3) * 35, opacity: 1 };
    if (/Play-Button|Check-Mark|Arrow/.test(name)) return { x: -side * 36, y: 24, rotate: -side * 14, scale: .6, delay: 90, opacity: 1 };
    return { x: side * 72, y: 36, rotate: -side * 14, scale: .64, delay: 0, opacity: 1 };
  }
  function assemble(scene, requestId, direction) {
    stopParts();
    clearPartPose(scene);
    clearCopyPose();
    viewport.style.opacity = '1';
    if (reduced.matches || typeof scene.animate !== 'function') {
      setPhase(scene, 'static');
      return Promise.resolve();
    }
    setPhase(scene, 'assemble');
    var jobs = parts(scene).map(function (node, index) {
      var pose = profile(node.getAttribute('data-name'), index, direction);
      return track(node, [
        { opacity: 0, translate: pose.x + 'px ' + pose.y + 'px', rotate: pose.rotate + 'deg', scale: String(pose.scale), offset: 0 },
        { opacity: pose.opacity, translate: -pose.x * .085 + 'px ' + -pose.y * .12 + 'px', rotate: -pose.rotate * .12 + 'deg', scale: '1.055', offset: .64 },
        { opacity: pose.opacity, translate: pose.x * .025 + 'px ' + pose.y * .04 + 'px', rotate: pose.rotate * .025 + 'deg', scale: '.988', offset: .82 },
        { opacity: pose.opacity, translate: '0px 0px', rotate: '0deg', scale: '1', offset: 1 }
      ], { duration: ASSEMBLY_MS, delay: pose.delay, easing: ASSEMBLY_EASE, fill: 'both' });
    }).concat(copyEntrance(direction));
    syncVisibility();
    return Promise.all(jobs).then(function () {
      if (requestId !== token || active !== scene || reduced.matches) return;
      stopParts();
      clearCopyPose();
      setPhase(scene, 'perform');
    });
  }
  function exit(scene, direction) {
    if (reduced.matches || typeof scene.animate !== 'function') return Promise.resolve();
    setPhase(scene, 'exit');
    fields[3].inert = true;
    var jobs = parts(scene).map(function (node, index) {
      var current = getComputedStyle(node);
      var shadow = /Ground-Shadow$/.test(node.getAttribute('data-name'));
      var fan = (index % 3 - 1) * 22;
      return track(node, [
        { opacity: current.opacity, translate: current.translate || 'none', rotate: current.rotate || 'none', scale: current.scale || 'none' },
        { opacity: 0, translate: (shadow ? 0 : -direction * (48 + index * 4)) + 'px ' + (shadow ? 0 : fan) + 'px', rotate: (shadow ? 0 : -direction * (8 + index % 3 * 4)) + 'deg', scale: shadow ? '.8' : '.65' }
      ], { duration: EXIT_MS, delay: Math.min(index * 8, 40), easing: 'cubic-bezier(.55,0,1,.45)', fill: 'both' });
    }).concat(copyExit(direction));
    syncVisibility();
    return Promise.all(jobs);
  }

  function inlineSvg(src, prefix) {
    if (!svgCache.has(src)) svgCache.set(src, fetch(src).then(function (r) {
      if (!r.ok) throw new Error('SVG part unavailable');
      return r.text();
    }).catch(function (error) { svgCache.delete(src); throw error; }));
    return svgCache.get(src).then(function (source) {
      var parsed = new DOMParser().parseFromString(source, 'image/svg+xml');
      if (parsed.querySelector('parsererror') || parsed.documentElement.localName !== 'svg') throw new Error('Invalid local SVG');
      var svg = document.importNode(parsed.documentElement, true);
      // Only repository-local Figma SVGs are parsed. Never insert executable or external content.
      svg.querySelectorAll('script, foreignObject').forEach(function (node) { node.remove(); });
      var ids = new Map();
      svg.querySelectorAll('[id]').forEach(function (node, index) { ids.set(node.id, prefix + '-' + index); });
      svg.querySelectorAll('*').forEach(function (node) {
        Array.from(node.attributes).forEach(function (attr) {
          if (/^on/i.test(attr.name)) node.removeAttribute(attr.name);
          else {
            var value = attr.value.replace(/url\(#([^)]*)\)/g, function (_, id) { return 'url(#' + (ids.get(id) || id) + ')'; });
            if (value[0] === '#' && ids.has(value.slice(1))) value = '#' + ids.get(value.slice(1));
            if (attr.name === 'id') value = ids.get(attr.value);
            node.setAttribute(attr.name, value);
          }
        });
      });
      svg.querySelectorAll('path').forEach(function (path) { path.setAttribute('pathLength', '1'); });
      svg.setAttribute('aria-hidden', 'true');
      svg.style.maxWidth = 'none';
      return svg;
    });
  }
  function element(spec, sceneId, pending) {
    var attrs = spec.attrs;
    var node = document.createElement(spec.tag);
    Object.keys(attrs.style || {}).forEach(function (key) { node.style[key] = attrs.style[key]; });
    ['data-node-id', 'data-name'].forEach(function (key) { if (attrs[key]) node.setAttribute(key, attrs[key]); });
    if (spec.tag === 'img') {
      if (attrs.inline) {
        node = document.createElement('div');
        pending.push(inlineSvg(attrs.src, 'hsvc-' + sceneId + '-' + (++serial)).then(function (svg) { node.appendChild(svg); }));
      } else {
        node.alt = '';
        node.setAttribute('width', String(attrs.width));
        node.setAttribute('height', String(attrs.height));
        node.style.cssText = 'display:block;max-width:none;width:' + attrs.width + 'px;height:' + attrs.height + 'px';
        var ready = new Promise(function (resolve, reject) {
          node.onload = function () { if (node.decode) node.decode().then(resolve, reject); else resolve(); };
          node.onerror = function () { reject(new Error('SVG part failed to load')); };
        });
        node.src = attrs.src;
        pending.push(ready);
      }
    }
    spec.children.forEach(function (child) { node.appendChild(element(child, sceneId, pending)); });
    return node;
  }
  function prepare(key) {
    if (cache.has(key)) return cache.get(key);
    var promise = getData().then(function (scenes) {
      var spec = scenes.find(function (item) { return item.key === key; });
      if (!spec) throw new Error('Unknown service: ' + key);
      var pending = [], scene = element(spec.artwork, ++serial, pending);
      scene.className = 'hsvc-motion-scene';
      scene.dataset.service = key;
      // Preparation is static; selection assembly, semantic action and idle are distinct.
      scene.dataset.phase = 'static';
      return Promise.all(pending).then(function () { return scene; });
    });
    cache.set(key, promise);
    promise.catch(function () { if (cache.get(key) === promise) cache.delete(key); });
    return promise;
  }
  function commit(scene, key, requestId) {
    if (requestId !== token) return;
    stopParts();
    clearPartPose(scene);
    active = scene;
    displayedKey = key;
    writeCopy(tabs[selected]);
    panel.setAttribute('aria-labelledby', tabs[selected].id);
    world.replaceChildren(scene);
    viewport.hidden = false;
    panel.classList.add('hsvc-panel--motion');
    if (!viewport.isConnected) host.appendChild(viewport);
    if (fallback) fallback.hidden = true;
    viewport.style.opacity = '1';
    setPhase(scene, 'static');
    panel.dataset.iconState = 'ready';
    panel.setAttribute('aria-busy', 'false');
    measure();
    syncVisibility();
    notifyHeaderSelection(requestId, key);
  }
  function select(index, focus) {
    var previous = selected;
    selected = (index + tabs.length) % tabs.length;
    var tab = tabs[selected], key = tab.dataset.service, requestId = ++token;
    var direction = selected < previous ? -1 : 1;
    freezeScene(active);
    fields[3].inert = false;
    tabs.forEach(function (item, i) {
      item.classList.toggle('active', i === selected);
      item.setAttribute('aria-selected', String(i === selected));
      item.tabIndex = i === selected ? 0 : -1;
    });
    panel.dataset.selectedService = key;
    if (focus) tab.focus();
    indicatorAtSelection(true);
    if (displayedKey === key) {
      panel.dataset.iconState = 'ready'; panel.setAttribute('aria-busy', 'false');
      clearCopyPose();
      assemble(active, requestId, direction);
      notifyHeaderSelection(requestId, key);
      return;
    }
    panel.dataset.iconState = 'loading';
    panel.setAttribute('aria-busy', 'true');
    prepare(key).then(function (scene) {
      if (requestId !== token) return;
      return (active ? exit(active, direction) : Promise.resolve()).then(function () {
        if (requestId !== token) return;
        commit(scene, key, requestId);
        return assemble(scene, requestId, direction);
      });
    }).catch(function () {
      if (requestId !== token) return;
      panel.dataset.iconState = 'error';
      panel.setAttribute('aria-busy', 'false');
      stopParts();
      writeCopy(tab);
      clearCopyPose();
      panel.setAttribute('aria-labelledby', tab.id);
      panel.dataset.presentationPhase = 'static';
      viewport.style.opacity = '1';
      // Network/asset failure retains an intelligible static fallback for the selected service.
      if (fallback) { fallback.src = tab.dataset.img; fallback.alt = tab.dataset.ko || ''; fallback.dataset.service = key; fallback.hidden = false; }
      viewport.hidden = true;
      world.replaceChildren();
      active = null; displayedKey = null;
      notifyHeaderSelection(requestId, key);
    });
  }
  tabs.forEach(function (tab, index) {
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', panel.id);
    tab.addEventListener('click', function () { select(index, false); });
    tab.addEventListener('keydown', function (event) {
      var next;
      if (event.key === 'ArrowRight') next = index + 1;
      else if (event.key === 'ArrowLeft') next = index - 1;
      else if (catalog && event.key === 'ArrowDown') next = index + (window.innerWidth <= 760 ? 2 : 1);
      else if (catalog && event.key === 'ArrowUp') next = index - (window.innerWidth <= 760 ? 2 : 1);
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      else return;
      event.preventDefault(); select(next, true);
    });
  });
  function syncMotion() {
    panel.dataset.iconMotion = reduced.matches ? 'reduced' : 'full';
    if (reduced.matches) { stopParts(); clearCopyPose(); viewport.style.opacity = '1'; }
    if (active) { clearPartPose(active); setPhase(active, reduced.matches ? 'static' : 'idle'); }
    syncVisibility(); scheduleMeasure();
  }
  if (reduced.addEventListener) reduced.addEventListener('change', syncMotion);
  else reduced.addListener(syncMotion);
  if ('ResizeObserver' in window) {
    var resize = new ResizeObserver(scheduleMeasure);
    resize.observe(tabsRoot); resize.observe(viewport);
    tabs.forEach(function (tab) { resize.observe(tab); });
  }
  window.addEventListener('resize', scheduleMeasure);
  if (document.fonts) document.fonts.ready.then(scheduleMeasure);
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      visible = entries.some(function (entry) { return entry.isIntersecting; });
      syncVisibility();
    });
    observer.observe(panel);
    var warmer = new IntersectionObserver(function (entries) {
      if (!entries.some(function (entry) { return entry.isIntersecting; })) return;
      tabs.forEach(function (tab) { prepare(tab.dataset.service).catch(function () {}); });
      warmer.disconnect();
    }, { rootMargin: '400px 0px' });
    warmer.observe(panel);
  }
  document.addEventListener('visibilitychange', syncVisibility);
  syncMotion(); select(selected, false);
}());
