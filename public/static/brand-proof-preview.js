/* DEV brand proof: read first, move on intent. Native finite scrolling, no clones,
   autoplay, wheel interception, rewritten quotes, or fabricated ratings. */
(function () {
  var root = document.querySelector('#homeEmotion[data-brand-proof]');
  if (!root || root.dataset.bproofInitialized) return;
  var rail = root.querySelector('.bproof-rail');
  var reviews = Array.from(root.querySelectorAll('.bproof-review'));
  var previous = root.querySelector('[data-bproof-prev]');
  var next = root.querySelector('[data-bproof-next]');
  var current = root.querySelector('[data-bproof-current]');
  var status = root.querySelector('[data-bproof-status]');
  var peeks = Array.from(root.querySelectorAll('[data-bproof-peek]'));
  if (!rail || !reviews.length || !previous || !next || !current || !status) return;
  root.dataset.bproofInitialized = 'true';

  var media = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
  var reduced = !!(media && media.matches);
  var supported = typeof rail.animate === 'function';
  var active = 0, intended = null, width = rail.clientWidth, scrollFrame = 0;
  var inView = !('IntersectionObserver' in window), pageVisible = !document.hidden;
  var entryReady = false;
  var entered = reduced || !supported, entranceJobs = [], selectionJobs = [], observer = null, resize = null, destroyed = false;
  var ease = 'cubic-bezier(.16,1,.3,1)';

  function wrap(index) { return ((index % reviews.length) + reviews.length) % reviews.length; }
  function pad(index) { return String(index + 1).padStart(2, '0'); }
  function reviewText(review, selector) {
    var node = review.querySelector(selector);
    return node ? node.textContent.trim() : '';
  }
  function update() {
    current.textContent = pad(active);
    root.dataset.bproofIndex = String(active);
    root.dataset.bproofMotion = reduced || !supported ? 'reduced' : 'full';
    previous.disabled = next.disabled = reviews.length < 2;
    peeks.forEach(function (peek) {
      var index = wrap(active + Number(peek.dataset.bproofPeek || 1));
      var tag = reviewText(reviews[index], '.bproof-tag');
      var quote = reviewText(reviews[index], '.bproof-highlight') || reviewText(reviews[index], '.bproof-quote p');
      var label = peek.querySelector('.bproof-peek-tag');
      var body = peek.querySelector('.bproof-peek-copy');
      if (label) label.textContent = tag;
      if (body) body.textContent = quote;
      peek.setAttribute('aria-label', tag + ' 고객 후기 보기');
      peek.dataset.bproofTarget = String(index);
      peek.disabled = reviews.length < 2;
    });
  }
  function cancel(jobs) { jobs.forEach(function (job) { job.animation.cancel(); }); jobs.length = 0; }
  function animate(jobs, node, frames, options) {
    if (!node || typeof node.animate !== 'function') return;
    var animation = node.animate(frames, Object.assign({ easing: ease, fill: 'both', iterations: 1 }, options));
    var job = { animation: animation, done: false };
    jobs.push(job);
    animation.finished.then(function () {
      if (destroyed || jobs.indexOf(job) < 0) return;
      job.done = true;
      // The complete CSS pose stays visible; finished tracks cannot replay.
      animation.cancel();
      if (jobs === entranceJobs && jobs.every(function (item) { return item.done; })) root.dataset.bproofPhase = 'ready';
    }).catch(function () {});
  }
  function startEntrance() {
    if (entered || !entryReady || !inView || !pageVisible) return;
    entered = true;
    window.removeEventListener('scroll', checkEntry);
    window.removeEventListener('resize', checkEntry);
    if (reduced || !supported) { root.dataset.bproofPhase = 'ready'; return; }
    root.dataset.bproofPhase = 'entering';
    try {
      animate(entranceJobs, root.querySelector('.bproof-eyebrow'), [{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 440 });
      root.querySelectorAll('.bproof-title-line').forEach(function (line, index) {
        animate(entranceJobs, line, [{ opacity: 0, transform: 'translateY(105%)' }, { opacity: 1, transform: 'translateY(0)' }], { delay: 80 + index * 100, duration: 650 });
      });
      animate(entranceJobs, root.querySelector('.bproof-description'), [{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'translateY(0)' }], { delay: 340, duration: 560 });
      animate(entranceJobs, root.querySelector('.bproof-stage'), [{ opacity: 0, transform: 'translateY(22px)' }, { opacity: 1, transform: 'translateY(0)' }], { delay: 460, duration: 640 });
    } catch (_) { supported = false; cancel(entranceJobs); root.dataset.bproofPhase = 'ready'; update(); }
  }
  function syncMotion() {
    if (destroyed) return;
    startEntrance();
    [entranceJobs, selectionJobs].forEach(function (jobs) {
      jobs.forEach(function (job) {
        if (job.done) return;
        if (inView && pageVisible && !reduced) job.animation.play();
        else job.animation.pause();
      });
    });
  }
  function nearest() {
    return Math.max(0, Math.min(reviews.length - 1, Math.round(rail.scrollLeft / Math.max(1, width))));
  }
  function scrolled() {
    if (scrollFrame || destroyed) return;
    scrollFrame = requestAnimationFrame(function () {
      scrollFrame = 0;
      var closest = nearest();
      if (active !== closest) { active = closest; update(); }
      if (intended !== null && Math.abs(rail.scrollLeft - intended * width) <= 1) intended = null;
    });
  }
  function navigate(index, announce) {
    if (destroyed || reviews.length < 2) return;
    index = wrap(index);
    intended = index;
    cancel(selectionJobs);
    rail.scrollTo({ left: index * width, behavior: reduced || !supported ? 'instant' : 'smooth' });
    if (reduced || !supported) { active = index; intended = null; update(); }
    else if (inView && pageVisible && entered && root.dataset.bproofPhase === 'ready') {
      try {
        // Keep the decorative quote mark anchored to its figure throughout the text reveal.
        animate(selectionJobs, reviews[index].querySelector('.bproof-quote p'), [{ opacity: .35, transform: 'translateY(10px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 360, fill: 'none' });
      } catch (_) { cancel(selectionJobs); }
    }
    if (announce) status.textContent = '고객 후기 ' + pad(index) + ' / ' + reviews.length + '. ' + reviewText(reviews[index], '.bproof-tag') + ', ' + reviewText(reviews[index], '.bproof-attribution strong') + ', ' + reviewText(reviews[index], '.bproof-attribution span');
  }
  function previousClick() { navigate((intended === null ? active : intended) - 1, true); }
  function nextClick() { navigate((intended === null ? active : intended) + 1, true); }
  function keydown(event) {
    // Only the native rail owns these keys, not buttons/links elsewhere in the chapter.
    if (event.target !== rail || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    var destination = intended === null ? active : intended;
    if (event.key === 'ArrowLeft') destination--;
    else if (event.key === 'ArrowRight') destination++;
    else if (event.key === 'Home') destination = 0;
    else if (event.key === 'End') destination = reviews.length - 1;
    else return;
    event.preventDefault();
    navigate(destination, true);
  }
  function directGesture() { intended = null; cancel(selectionJobs); }
  function resizeRail() {
    var index = intended === null ? active : intended;
    var nextWidth = rail.clientWidth;
    // ResizeObserver also fires once on attachment and for height-only changes.
    // Those are not permission to interrupt a customer's ongoing selection.
    if (!nextWidth || Math.abs(nextWidth - width) < .5) return;
    width = nextWidth;
    rail.scrollTo({ left: index * width, behavior: 'instant' });
    active = index;
    intended = null;
    update();
  }
  function visibility() { pageVisible = !document.hidden; syncMotion(); }
  function preference(event) {
    reduced = event.matches;
    if (reduced) {
      entered = true;
      cancel(entranceJobs);
      cancel(selectionJobs);
      if (intended !== null) { active = intended; rail.scrollTo({ left: active * width, behavior: 'instant' }); intended = null; }
      root.dataset.bproofPhase = 'ready';
    }
    update();
    syncMotion();
  }
  function checkViewport() {
    var rect = root.getBoundingClientRect();
    inView = rect.bottom > 0 && rect.top < window.innerHeight;
    syncMotion();
  }
  function checkEntry() {
    if (entered || destroyed) return;
    // The section's top padding is not the headline. Wait until actual title
    // pixels are visible; a 1px section intersection must not spend the reveal.
    var title = root.querySelector('.bproof-title') || root;
    var rect = title.getBoundingClientRect();
    var pixels = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0));
    entryReady = pixels >= Math.min(40, rect.height * .2, window.innerHeight * .2);
    syncMotion();
  }
  var peekHandlers = peeks.map(function (peek) {
    var handler = function () { navigate(Number(peek.dataset.bproofTarget), true); };
    peek.addEventListener('click', handler);
    return handler;
  });
  function destroy() {
    destroyed = true;
    cancel(entranceJobs);
    cancel(selectionJobs);
    if (scrollFrame) cancelAnimationFrame(scrollFrame);
    if (observer) observer.disconnect();
    if (resize) resize.disconnect();
    previous.removeEventListener('click', previousClick);
    next.removeEventListener('click', nextClick);
    rail.removeEventListener('scroll', scrolled);
    rail.removeEventListener('keydown', keydown);
    rail.removeEventListener('pointerdown', directGesture);
    rail.removeEventListener('wheel', directGesture);
    peeks.forEach(function (peek, index) { peek.removeEventListener('click', peekHandlers[index]); });
    window.removeEventListener('scroll', checkViewport);
    window.removeEventListener('scroll', checkEntry);
    window.removeEventListener('resize', checkEntry);
    window.removeEventListener('resize', resizeRail);
    document.removeEventListener('visibilitychange', visibility);
    if (media && media.removeEventListener) media.removeEventListener('change', preference);
    else if (media && media.removeListener) media.removeListener(preference);
    previous.disabled = next.disabled = true;
    peeks.forEach(function (peek) { peek.disabled = true; });
    root.dataset.bproofPhase = 'ready';
    delete root.dataset.bproofInitialized;
  }

  root.dataset.bproofPhase = reduced || !supported ? 'ready' : 'pending';
  active = nearest();
  update();
  previous.addEventListener('click', previousClick);
  next.addEventListener('click', nextClick);
  rail.addEventListener('scroll', scrolled, { passive: true });
  rail.addEventListener('keydown', keydown);
  rail.addEventListener('pointerdown', directGesture, { passive: true });
  rail.addEventListener('wheel', directGesture, { passive: true });
  window.addEventListener('resize', resizeRail, { passive: true });
  if (!entered) {
    window.addEventListener('scroll', checkEntry, { passive: true });
    window.addEventListener('resize', checkEntry, { passive: true });
  }
  document.addEventListener('visibilitychange', visibility);
  if (media && media.addEventListener) media.addEventListener('change', preference);
  else if (media && media.addListener) media.addListener(preference);
  if ('ResizeObserver' in window) { resize = new ResizeObserver(resizeRail); resize.observe(rail); }
  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) { if (entry.target === root) inView = entry.isIntersecting; });
      checkEntry();
      syncMotion();
    }, { threshold: .12 });
    observer.observe(root);
  } else { window.addEventListener('scroll', checkViewport, { passive: true }); checkViewport(); }
  checkEntry();
  window.__brandProofPreview = { destroy: destroy };
})();
