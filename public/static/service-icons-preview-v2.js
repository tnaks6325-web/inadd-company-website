(function () {
  'use strict';

  var panel = document.getElementById('hsvcPanel');
  var asset = document.getElementById('hsvcIconAsset');
  var tabs = Array.from(document.querySelectorAll('#hsvcTabs .hsvc-tab'));
  if (!panel || !panel.classList.contains('hsvc-panel--icons') || !asset || !tabs.length || panel.dataset.iconsInitialized) return;
  panel.dataset.iconsInitialized = 'true';

  var en = document.getElementById('hsvcPanelEn');
  var name = document.getElementById('hsvcPanelName');
  var desc = document.getElementById('hsvcPanelDesc');
  var link = document.getElementById('hsvcPanelLink');
  var tabsRoot = document.getElementById('hsvcTabs');
  var indicator = document.getElementById('hsvcTabIndicator');
  var motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var floatVisible = !('IntersectionObserver' in window);
  var indicatorFrame = 0;
  var cache = new Map();
  var selected = Math.max(0, tabs.findIndex(function (tab) { return tab.classList.contains('active'); }));
  var request = 0;
  var transition = null;
  var pendingReady = null;
  var previous = null;
  var committed = {
    src: asset.getAttribute('src'),
    alt: asset.getAttribute('alt') || '',
    scale: tabs[selected].getAttribute('data-icon-scale') || '1',
    service: tabs[selected].getAttribute('data-service') || ''
  };

  function measureIndicator(move) {
    if (!tabsRoot || !indicator) return;
    var rootRect = tabsRoot.getBoundingClientRect();
    var tabRect = tabs[selected].getBoundingClientRect();
    // Hidden layouts may report zero dimensions. Keep the last valid placement until observed again.
    if (!(rootRect.width > 0 && tabRect.width > 0 && tabRect.height > 0)) return;
    var x = tabRect.left - rootRect.left;
    var y = tabRect.bottom - rootRect.top - 1;
    if (![x, y, tabRect.width].every(Number.isFinite)) return;
    var snap = !move || tabsRoot.dataset.indicatorReady !== 'true' || motion.matches;
    if (snap) indicator.style.setProperty('transition', 'none');
    else indicator.style.removeProperty('transition');
    indicator.style.setProperty('transform', 'translate3d(' + x + 'px, ' + y + 'px, 0) scaleX(' + tabRect.width + ')');
    tabsRoot.dataset.indicatorReady = 'true';
    if (snap) {
      // Flush the snap before restoring the CSS transition, so layout changes never animate the bar.
      void indicator.offsetWidth;
      indicator.style.removeProperty('transition');
    }
  }

  function scheduleIndicator() {
    if (!tabsRoot || !indicator || indicatorFrame) return;
    if (!window.requestAnimationFrame) { measureIndicator(false); return; }
    indicatorFrame = window.requestAnimationFrame(function () {
      indicatorFrame = 0;
      measureIndicator(false);
    });
  }

  function appearance() {
    var computed = window.getComputedStyle ? window.getComputedStyle(asset) : asset.style;
    var opacity = Number.parseFloat(computed.opacity);
    return {
      opacity: Number.isFinite(opacity) ? Math.min(1, Math.max(0, opacity)) : 1,
      transform: computed.transform && computed.transform !== 'none' ? computed.transform : 'none'
    };
  }

  function hold(frame) {
    asset.style.setProperty('opacity', String(frame.opacity));
    asset.style.setProperty('transform', frame.transform);
  }

  function restoreAppearance() {
    asset.style.removeProperty('opacity');
    asset.style.removeProperty('transform');
  }

  function stopTransition(preserve) {
    // Snapshot before cancel: interrupted Web Animations otherwise snap to their base styles.
    var current = appearance();
    if (preserve) hold(current);
    if (transition) {
      var running = transition;
      transition = null;
      running.animation.cancel();
    }
    if (!preserve) restoreAppearance();
    return current;
  }

  function animate(frames, duration, token, phase, finished) {
    var animation = asset.animate(frames, {
      duration: duration,
      easing: phase === 'exiting' ? 'cubic-bezier(.4,0,.7,1)' : 'cubic-bezier(.16,1,.3,1)',
      fill: 'both'
    });
    transition = { animation: animation, token: token, phase: phase };
    panel.dataset.iconPhase = phase;
    animation.finished.then(function () {
      if (!transition || transition.animation !== animation || token !== request) return;
      hold(frames[frames.length - 1]);
      transition = null;
      animation.cancel();
      finished();
    }, function () {
      // A deliberate cancellation has already cleared transition. Recover an unexpected one.
      if (!transition || transition.animation !== animation || token !== request) return;
      transition = null;
      if (pendingReady && pendingReady.token === request) commit(pendingReady.next, request, false);
      else restoreAppearance();
      panel.dataset.iconPhase = 'idle';
    });
  }

  function recover(token) {
    var current = stopTransition(true);
    if (motion.matches || typeof asset.animate !== 'function' || (current.opacity >= .999 && current.transform === 'none')) {
      restoreAppearance();
      panel.dataset.iconPhase = 'idle';
      return;
    }
    animate([current, { opacity: 1, transform: 'none' }], 180, token, 'recovering', function () {
      restoreAppearance();
      panel.dataset.iconPhase = 'idle';
    });
  }

  function syncFloat() {
    panel.dataset.iconFloat = floatVisible && !document.hidden && !motion.matches ? 'running' : 'paused';
  }

  function syncMotion() {
    panel.dataset.iconMotion = motion.matches ? 'reduced' : 'full';
    syncFloat();
    scheduleIndicator();
    if (!motion.matches) return;
    stopTransition(false);
    if (pendingReady && pendingReady.token === request) commit(pendingReady.next, request, false);
    panel.dataset.iconPhase = 'idle';
  }

  function scaleFor(tab) {
    var scale = Number(tab.getAttribute('data-icon-scale'));
    return Number.isFinite(scale) && scale > 0 ? String(Math.min(1.4, Math.max(.65, scale))) : '1';
  }

  // Loading and decoding in a separate Image keeps the visible asset intact.
  function load(src) {
    if (cache.has(src)) return cache.get(src);
    var promise = new Promise(function (resolve, reject) {
      var image = new Image();
      var settling = false;
      image.decoding = 'async';
      function fail() {
        if (settling) return;
        settling = true;
        reject(new Error('Service icon could not load: ' + src));
      }
      function ready() {
        if (settling) return;
        settling = true;
        if (typeof image.decode === 'function') {
          image.decode().then(function () { resolve(image); }, reject);
        } else {
          resolve(image);
        }
      }
      image.onload = ready;
      image.onerror = fail;
      image.src = src;
      if (image.complete && image.naturalWidth > 0) ready();
    });
    cache.set(src, promise);
    // A failed preload may be retried when that tab is selected again.
    promise.catch(function () { if (cache.get(src) === promise) cache.delete(src); });
    return promise;
  }

  function setAsset(next) {
    asset.setAttribute('src', next.src);
    asset.setAttribute('alt', next.alt);
    asset.dataset.service = next.service;
    panel.style.setProperty('--service-icon-scale', next.scale);
  }

  function commit(next, token, enter) {
    if (token !== request) return;
    if (next.src !== committed.src) previous = committed;
    committed = next;
    setAsset(next);
    pendingReady = null;
    panel.dataset.iconState = 'ready';
    panel.setAttribute('aria-busy', 'false');
    if (!enter || motion.matches || typeof asset.animate !== 'function') {
      restoreAppearance();
      panel.dataset.iconPhase = 'idle';
      return;
    }
    // The source changes only at complete transparency; the new silhouette grows into place.
    var start = { opacity: 0, transform: 'translateY(7px) scale(.96)' };
    hold(start);
    animate([start, { opacity: 1, transform: 'translateY(0) scale(1)' }], 260, token, 'entering', function () {
      restoreAppearance();
      panel.dataset.iconPhase = 'idle';
    });
  }

  function swap(next, token) {
    if (token !== request) return;
    pendingReady = { next: next, token: token };
    if (next.src === committed.src) {
      // Reselecting the displayed icon restores an interrupted fade without hiding it again.
      setAsset(next);
      committed = next;
      pendingReady = null;
      panel.dataset.iconState = 'ready';
      panel.setAttribute('aria-busy', 'false');
      recover(token);
      return;
    }
    var current = stopTransition(true);
    if (motion.matches || typeof asset.animate !== 'function') {
      commit(next, token, false);
    } else if (current.opacity <= .01) {
      commit(next, token, true);
    } else {
      // Preloading finishes first. Until then the last valid icon remains on screen.
      animate([current, { opacity: 0, transform: 'translateY(-5px) scale(.96)' }],
        140 * current.opacity, token, 'exiting', function () { commit(next, token, true); });
    }
  }

  function select(index, focus) {
    selected = (index + tabs.length) % tabs.length;
    var tab = tabs[selected];
    var token = ++request;
    pendingReady = null;
    recover(token);
    tabs.forEach(function (item, i) {
      var active = i === selected;
      item.classList.toggle('active', active);
      item.setAttribute('aria-selected', String(active));
      item.tabIndex = active ? 0 : -1;
      item.setAttribute('tabindex', String(item.tabIndex));
    });
    panel.setAttribute('aria-labelledby', tab.id);
    panel.dataset.selectedService = tab.getAttribute('data-service') || '';
    if (en) en.textContent = tab.getAttribute('data-en') || '';
    if (name) name.textContent = tab.getAttribute('data-ko') || '';
    if (desc) desc.textContent = tab.getAttribute('data-desc') || '';
    if (link) link.setAttribute('href', tab.getAttribute('data-href') || '/contact');
    if (focus) tab.focus();
    measureIndicator(true);

    var src = tab.getAttribute('data-img');
    if (!src) return;
    panel.dataset.iconState = 'loading';
    panel.setAttribute('aria-busy', 'true');
    load(src).then(function () {
      if (token !== request) return;
      var next = {
        src: src,
        alt: (tab.getAttribute('data-ko') || '서비스') + ' 서비스를 표현한 3D 아이콘',
        scale: scaleFor(tab),
        service: tab.getAttribute('data-service') || ''
      };
      swap(next, token);
    }, function () {
      if (token !== request) return;
      pendingReady = null;
      panel.dataset.iconState = 'error';
      panel.setAttribute('aria-busy', 'false');
      recover(token);
    });
  }

  tabs.forEach(function (tab, index) {
    if (!tab.id) tab.id = 'hsvcTab-' + (tab.getAttribute('data-service') || index);
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', panel.id);
    tab.addEventListener('click', function () { select(index, false); });
    tab.addEventListener('keydown', function (event) {
      var next;
      if (event.key === 'ArrowRight') next = index + 1;
      else if (event.key === 'ArrowLeft') next = index - 1;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      else return;
      event.preventDefault();
      select(next, true);
    });
  });
  panel.setAttribute('role', 'tabpanel');

  // A rare failure of the displayed element itself also restores the last good asset.
  asset.addEventListener('error', function () {
    ++request;
    pendingReady = null;
    stopTransition(false);
    cache.delete(committed.src);
    if (previous && asset.getAttribute('src') === committed.src && previous.src !== committed.src) {
      committed = previous;
      previous = null;
      setAsset(committed);
    }
    panel.dataset.iconState = 'error';
    panel.dataset.iconPhase = 'idle';
    panel.setAttribute('aria-busy', 'false');
  });

  if (motion.addEventListener) motion.addEventListener('change', syncMotion);
  else if (motion.addListener) motion.addListener(syncMotion);
  syncMotion();
  select(selected, false);

  if (tabsRoot && indicator) {
    if ('ResizeObserver' in window) {
      var resizeObserver = new ResizeObserver(scheduleIndicator);
      resizeObserver.observe(tabsRoot);
      tabs.forEach(function (tab) { resizeObserver.observe(tab); });
    }
    if (window.addEventListener) window.addEventListener('resize', scheduleIndicator);
    if (document.fonts) {
      if (document.fonts.ready && typeof document.fonts.ready.then === 'function') {
        document.fonts.ready.then(scheduleIndicator, function () {});
      }
      if (document.fonts.addEventListener) document.fonts.addEventListener('loadingdone', scheduleIndicator);
    }
  }

  // The gentle CSS float runs only while the service panel is actually on screen.
  // This observer stays separate from the one-shot, early image preloader below.
  if ('IntersectionObserver' in window) {
    var floatObserver = new IntersectionObserver(function (entries) {
      floatVisible = entries.some(function (entry) { return entry.isIntersecting; });
      syncFloat();
    }, { rootMargin: '0px', threshold: 0 });
    floatObserver.observe(panel);
  }
  document.addEventListener('visibilitychange', syncFloat);

  // Only the initial icon loads above the fold; warm the full small WebP set near SERVICE.
  var warmed = false;
  function warm() {
    if (warmed) return;
    warmed = true;
    tabs.forEach(function (tab) {
      var src = tab.getAttribute('data-img');
      if (src) load(src).catch(function () {});
    });
  }
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      if (!entries.some(function (entry) { return entry.isIntersecting; })) return;
      warm();
      observer.disconnect();
    }, { rootMargin: '500px 0px', threshold: 0 });
    observer.observe(panel);
  } else {
    warm();
  }
}());
