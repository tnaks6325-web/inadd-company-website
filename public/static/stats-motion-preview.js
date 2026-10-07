/* DEV growth scene: a finite shared timeline, never a looping chart or fake data.
   SSR stays readable without JS. Administrative values remain the source of truth. */
(function () {
  var root = document.querySelector('#homeStats[data-stats-motion]');
  if (!root || root.dataset.statsInitialized) return;
  var number = root.querySelector('.sg-num');
  var numberWrap = root.querySelector('.sg-num-wrap');
  var reserve = root.querySelector('.sg-num-reserve');
  var bars = Array.from(root.querySelectorAll('.sg-bar'));
  if (!number || !numberWrap || !bars.length) return;
  root.dataset.statsInitialized = 'true';

  var media = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
  var reduced = !!(media && media.matches);
  var supported = typeof numberWrap.animate === 'function';
  var phase = 'pending', inView = false, pageVisible = !document.hidden, destroyed = false;
  var elapsed = 0, lastTime = null, raf = 0, jobs = [], observer = null, mutation = null;
  var duration = 2260, counterStart = 260, counterEnd = 1900;
  var target = 37000, value = 0, anchorValue = 0, anchorTime = counterStart;
  var ease = 'cubic-bezier(.16,1,.3,1)';

  function validTarget(raw) {
    if (raw === null || String(raw).trim() === '') return null;
    var parsed = Number(raw);
    return Number.isFinite(parsed) && parsed >= 0 && parsed <= Number.MAX_SAFE_INTEGER ? Math.floor(parsed) : null;
  }
  function format(n) { return n.toLocaleString('ko-KR'); }
  function write(n) {
    value = Math.max(0, Math.min(target, Math.floor(n)));
    var text = format(value);
    if (number.textContent !== text) number.textContent = text;
  }
  function state() {
    root.dataset.statsPhase = phase;
    root.dataset.statsPlayback = phase === 'playing' && inView && pageVisible ? 'playing' : 'paused';
    root.dataset.statsMotionMode = reduced || !supported ? 'reduced' : 'full';
  }
  function stopFrame() {
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
    lastTime = null;
  }
  function clearJobs() {
    jobs.forEach(function (job) { job.animation.cancel(); });
    jobs = [];
  }
  function finish() {
    readTarget();
    stopFrame();
    clearJobs();
    phase = 'settled';
    elapsed = duration;
    write(target);
    state();
  }
  function readTarget() {
    var next = validTarget(number.getAttribute('data-count'));
    if (next === null) return;
    if (next !== target) {
      target = next;
      anchorValue = Math.min(value, target);
      anchorTime = Math.max(counterStart, elapsed);
      if (phase === 'settled' || phase === 'pending') write(target);
      else write(anchorValue);
    }
    // Read once, not one live announcement for every visual animation frame.
    numberWrap.setAttribute('aria-label', '누적 완료 캠페인 ' + format(target) + '건 이상');
    if (reserve && reserve.textContent !== format(target)) reserve.textContent = format(target);
  }
  function add(node, frames, delay, length, easing) {
    if (!node || typeof node.animate !== 'function') return;
    var animation = node.animate(frames, { delay: delay, duration: length, easing: easing || ease, fill: 'both', iterations: 1 });
    animation.pause();
    animation.currentTime = 0;
    jobs.push({ animation: animation, end: delay + length, done: false });
  }
  function assemble() {
    root.querySelectorAll('.sg-title-line').forEach(function (line, index) {
      add(line, [{ transform: 'translateY(105%)', opacity: 0 }, { transform: 'translateY(0)', opacity: 1 }], index * 100, 620);
    });
    add(root.querySelector('.sg-eyebrow'), [{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'translateY(0)' }], 180, 450);
    add(numberWrap, [{ opacity: 0, transform: 'translateY(14px)' }, { opacity: 1, transform: 'translateY(0)' }], 260, 560);
    bars.forEach(function (bar, index) {
      // Inline final heights and year labels never change; only the visual scale rises.
      add(bar, [{ transform: 'scaleY(0)', opacity: .35 }, { transform: 'scaleY(1)', opacity: 1 }], 320 + index * 115, 720);
    });
    // Animate the badge's whole silhouette, not its anchored outer box.
    add(root.querySelector('.sg-callout-body'), [
      { opacity: 0, transform: 'translateY(14px) scale(.88)', offset: 0 },
      { opacity: 1, transform: 'translateY(-3px) scale(1.04)', offset: .65 },
      { opacity: 1, transform: 'translateY(0) scale(1)', offset: 1 },
    ], 1640, 560, 'cubic-bezier(.22,.75,.3,1)');
    root.querySelectorAll('.sg-mini-item').forEach(function (item, index) {
      add(item, [{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'translateY(0)' }], 1810 + index * 80, 290);
    });
  }
  function renderCounter() {
    if (elapsed < counterStart) { write(0); return; }
    if (elapsed >= counterEnd) { write(target); return; }
    var progress = Math.min(1, Math.max(0, (elapsed - anchorTime) / Math.max(1, counterEnd - anchorTime)));
    var eased = 1 - Math.pow(1 - progress, 3);
    write(anchorValue + (target - anchorValue) * eased);
  }
  function frame(time) {
    raf = 0;
    if (destroyed || phase !== 'playing' || !inView || !pageVisible) { lastTime = null; return; }
    if (lastTime !== null) elapsed += Math.max(0, time - lastTime);
    lastTime = time;
    jobs.forEach(function (job) {
      if (job.done) return;
      job.animation.currentTime = Math.min(elapsed, job.end);
      job.done = elapsed >= job.end;
    });
    renderCounter();
    if (elapsed >= duration) finish();
    else raf = requestAnimationFrame(frame);
  }
  function sync() {
    if (destroyed) return;
    if (reduced || !supported) { finish(); return; }
    if (phase === 'pending' && inView && pageVisible) {
      readTarget();
      anchorValue = 0;
      anchorTime = counterStart;
      value = 0;
      phase = 'playing';
      renderCounter();
    }
    if (phase === 'playing' && inView && pageVisible) {
      if (!raf) raf = requestAnimationFrame(frame);
    } else stopFrame();
    state();
  }
  function visibleEnough(rect, pixels) {
    return pixels >= Math.min(rect.height, window.innerHeight) * .45;
  }
  function checkViewport() {
    var rect = root.getBoundingClientRect();
    var pixels = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0));
    inView = phase === 'pending' ? visibleEnough(rect, pixels) : pixels > 0;
    sync();
  }
  function visibilityChanged() { pageVisible = !document.hidden; sync(); }
  function preferenceChanged(event) { reduced = event.matches; sync(); }
  function destroy() {
    if (destroyed) return;
    finish();
    destroyed = true;
    if (observer) observer.disconnect();
    if (mutation) mutation.disconnect();
    root.removeEventListener('stats:data', readTarget);
    document.removeEventListener('visibilitychange', visibilityChanged);
    window.removeEventListener('scroll', checkViewport);
    window.removeEventListener('resize', checkViewport);
    if (media && media.removeEventListener) media.removeEventListener('change', preferenceChanged);
    else if (media && media.removeListener) media.removeListener(preferenceChanged);
  }

  readTarget();
  // The DOM keeps the final total even while the paused entrance effect masks it.
  write(target);
  // Arm progressive enhancement before entry, avoiding a full-chart flash followed
  // by collapse. Canceling these paused effects always restores the readable SSR.
  if (!reduced && supported) {
    try { assemble(); } catch (_) { supported = false; finish(); }
  }
  state();
  root.addEventListener('stats:data', readTarget);
  if ('MutationObserver' in window) {
    mutation = new MutationObserver(readTarget);
    mutation.observe(number, { attributes: true, attributeFilter: ['data-count'] });
  }
  document.addEventListener('visibilitychange', visibilityChanged);
  if (media && media.addEventListener) media.addEventListener('change', preferenceChanged);
  else if (media && media.addListener) media.addListener(preferenceChanged);
  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.target !== root) return;
        inView = entry.isIntersecting && (phase !== 'pending' || visibleEnough(entry.boundingClientRect, entry.intersectionRect.height));
      });
      sync();
    }, { threshold: [0, .1, .22, .45, .65, 1] });
    observer.observe(root);
  } else {
    window.addEventListener('scroll', checkViewport, { passive: true });
    window.addEventListener('resize', checkViewport, { passive: true });
    checkViewport();
  }
  window.__statsMotionPreview = { finish: finish, destroy: destroy };
  if (reduced || !supported) finish();
})();
