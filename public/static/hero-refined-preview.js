(function () {
  'use strict';
  var hero = document.getElementById('homeHeroRefined');
  if (!hero || hero.dataset.initialized) return;
  var frames = Array.from(hero.querySelectorAll('[data-refined-frame]'));
  var copies = Array.from(hero.querySelectorAll('[data-refined-copy]'));
  var steps = Array.from(hero.querySelectorAll('[data-refined-step]'));
  var pause = hero.querySelector('[data-refined-pause]');
  var status = hero.querySelector('.hhr-status');
  if (!frames.length || copies.length !== frames.length || steps.length !== frames.length || !pause || !status) return;
  hero.dataset.initialized = 'true';
  var photos = frames.map(function (frame) { return frame.querySelector('.hhr-photo'); });
  var actions = hero.querySelector('.hhr-actions');
  var label = hero.querySelector('.hhr-scene-label');
  var controls = hero.querySelector('.hhr-controls');
  var motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var capable = typeof hero.animate === 'function';
  var index = 0, token = 0, elapsed = 0, previousTime = 0, frameId = 0;
  var manualPaused = motion.matches || !capable, focusPaused = false, pageAway = false;
  var inView = !('IntersectionObserver' in window);
  var jobs = [];
  var ease = 'cubic-bezier(.16,1,.3,1)';

  function parts(copy) { return Array.from(copy.querySelectorAll('[data-refined-part]')); }
  function nodesFor(scene) { return [frames[scene], photos[scene], copies[scene]].concat(parts(copies[scene])).filter(Boolean); }
  function clearPose(nodes) {
    nodes.forEach(function (node) { node.style.removeProperty('opacity'); node.style.removeProperty('transform'); });
  }
  function clearAll() {
    copies.forEach(function (_, scene) { clearPose(nodesFor(scene)); });
    if (actions) clearPose([actions]);
  }
  function stop() {
    var old = jobs;
    jobs = [];
    old.forEach(function (job) { job.animation.cancel(); });
  }
  function discard(cohort) {
    cohort.forEach(function (job) { job.animation.cancel(); });
    jobs = jobs.filter(function (job) { return cohort.indexOf(job) === -1; });
  }
  function snapshot(scene) {
    return nodesFor(scene).map(function (node) {
      var style = getComputedStyle(node);
      return { node: node, opacity: style.opacity, transform: style.transform || 'none' };
    });
  }
  function track(node, keyframes, duration, delay, kind) {
    var animation = node.animate(keyframes, { duration: duration, delay: delay || 0, easing: ease, fill: 'both' });
    var job = { node: node, animation: animation, kind: kind || 'entrance', done: false };
    jobs.push(job);
    job.promise = animation.finished.then(function () { job.done = true; }, function () {});
    return job;
  }
  function duration() { return Number(copies[index].dataset.duration) || 7000; }
  function available() { return inView && !document.hidden && !pageAway; }
  function running() { return available() && !manualPaused && !focusPaused && !motion.matches && capable; }
  function progress() { hero.style.setProperty('--refined-progress', Math.min(elapsed / duration(), 1).toFixed(4)); }
  function render(leaving) {
    frames.forEach(function (frame, scene) {
      frame.classList.toggle('is-active', scene === index);
      frame.classList.toggle('is-leaving', scene === leaving && scene !== index);
    });
    copies.forEach(function (copy, scene) {
      copy.classList.toggle('is-active', scene === index);
      copy.classList.toggle('is-leaving', scene === leaving && scene !== index);
      copy.setAttribute('aria-hidden', String(scene !== index));
    });
    steps.forEach(function (step, scene) { step.setAttribute('aria-current', String(scene === index)); });
    hero.dataset.scene = String(index + 1);
    status.textContent = steps[index].getAttribute('aria-label');
    if (label) label.textContent = String(index + 1).padStart(2, '0') + ' / ' + String(copies.length).padStart(2, '0') + ' — ' + steps[index].getAttribute('aria-label').replace(/^\d+번째 장면: /, '');
    progress();
  }
  function enter(previous, poses, first) {
    var requestId = ++token;
    stop(); clearAll();
    if (previous !== index && poses) poses.forEach(function (pose) {
      pose.node.style.opacity = pose.opacity;
      pose.node.style.transform = pose.transform;
    });
    var leaving = previous !== index && !first ? previous : -1;
    render(leaving);
    if (motion.matches || !capable) { clearAll(); render(-1); hero.dataset.phase = 'settled'; return; }
    hero.dataset.phase = first ? 'enter' : 'transition';
    var cohort = [];
    if (leaving >= 0) {
      [frames[leaving], copies[leaving]].forEach(function (node, order) {
        var computed = getComputedStyle(node);
        cohort.push(track(node, [
          { opacity: computed.opacity, transform: computed.transform || 'none' },
          { opacity: 0, transform: order ? 'translate3d(0,-12px,0)' : 'translate3d(-12px,0,0)' }
        ], order ? 220 : 760, 0, 'exit'));
      });
    }
    cohort.push(track(frames[index], [
      { opacity: first ? .72 : 0, transform: first ? 'none' : 'translate3d(14px,0,0)' },
      { opacity: 1, transform: 'none' }
    ], 760, 0));
    var quoted = !!copies[index].querySelector('.hhr-quotes');
    parts(copies[index]).forEach(function (node) {
      var kind = node.dataset.refinedPart, order = Number(node.dataset.refinedOrder) || 0;
      var title = kind === 'title';
      var delay = title ? (quoted ? 350 : 180) + order * 90 : kind === 'support' ? 570 : kind === 'quote' ? 100 + order * 65 : kind === 'lead' ? 100 : 30;
      cohort.push(track(node, [
        { opacity: 0, transform: title ? 'translate3d(0,110%,0)' : 'translate3d(0,16px,0)', offset: 0 },
        { opacity: 1, transform: title ? 'translate3d(0,-2%,0)' : 'none', offset: .82 },
        { opacity: 1, transform: 'none', offset: 1 }
      ], title ? 720 : 440, delay));
    });
    if (first && actions) cohort.push(track(actions, [
      { opacity: 0, transform: 'translate3d(0,12px,0)' }, { opacity: 1, transform: 'none' }
    ], 440, 660));
    if (photos[index]) track(photos[index], [
      { transform: 'scale(1.075) translate3d(8px,0,0)' },
      { transform: 'scale(1.035) translate3d(0,0,0)' }
    ], Math.min(duration() - 900, 7000), 0, 'photo');
    Promise.all(cohort.map(function (job) { return job.promise; })).then(function () {
      if (requestId !== token) return;
      discard(cohort);
      if (leaving >= 0) clearPose(nodesFor(leaving));
      clearPose([frames[index], copies[index]].concat(parts(copies[index])));
      if (actions) clearPose([actions]);
      render(-1);
      hero.dataset.phase = 'settled';
    });
  }
  function tick(now) {
    frameId = 0;
    if (!running()) return;
    if (previousTime) elapsed += Math.max(0, Math.min(now - previousTime, 100));
    previousTime = now;
    if (elapsed >= duration()) select(index + 1, false);
    progress();
    if (!frameId && running()) frameId = requestAnimationFrame(tick);
  }
  function syncPlayback() {
    var enabled = running(), suspended = manualPaused || focusPaused;
    hero.dataset.playback = enabled ? 'playing' : 'paused';
    hero.dataset.motion = motion.matches || !capable ? 'reduced' : 'full';
    pause.disabled = motion.matches || !capable;
    pause.setAttribute('aria-pressed', String(suspended || pause.disabled));
    pause.setAttribute('aria-label', pause.disabled ? '기기 설정에 따라 모션이 꺼져 있습니다' : suspended ? '자동 전환 재생' : '자동 전환 일시정지');
    hero.querySelector('[data-refined-pause-label]').textContent = pause.disabled ? '모션 꺼짐' : suspended ? '재생' : '일시정지';
    hero.querySelector('[data-refined-pause-icon]').hidden = suspended || pause.disabled;
    hero.querySelector('[data-refined-play-icon]').hidden = !suspended && !pause.disabled;
    jobs.forEach(function (job) {
      if (job.done) return;
      var play = available() && !motion.matches && capable && (job.kind !== 'photo' || enabled);
      if (play) job.animation.play(); else job.animation.pause();
    });
    if (!enabled) { cancelAnimationFrame(frameId); frameId = 0; previousTime = 0; }
    else if (!frameId) { previousTime = 0; frameId = requestAnimationFrame(tick); }
  }
  function select(next, userInitiated, first) {
    var previous = index, poses = capable && !motion.matches ? snapshot(previous) : null;
    index = (next + copies.length) % copies.length;
    elapsed = 0; previousTime = 0;
    if (userInitiated) manualPaused = true;
    status.setAttribute('aria-live', userInitiated ? 'polite' : 'off');
    enter(previous, poses, !!first);
    syncPlayback();
  }
  hero.querySelector('[data-refined-prev]').addEventListener('click', function () { select(index - 1, true); });
  hero.querySelector('[data-refined-next]').addEventListener('click', function () { select(index + 1, true); });
  steps.forEach(function (step, scene) { step.addEventListener('click', function () { select(scene, true); }); });
  pause.addEventListener('click', function () {
    if (running()) manualPaused = true;
    else { manualPaused = false; focusPaused = false; }
    status.setAttribute('aria-live', 'off');
    syncPlayback();
  });
  controls.addEventListener('keydown', function (event) {
    var next;
    if (event.key === 'ArrowRight') next = index + 1;
    else if (event.key === 'ArrowLeft') next = index - 1;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = copies.length - 1;
    else return;
    event.preventDefault();
    select(next, true);
    steps[index].focus();
  });
  hero.addEventListener('focusin', function () { focusPaused = true; syncPlayback(); });
  hero.addEventListener('focusout', function (event) {
    if (event.relatedTarget && hero.contains(event.relatedTarget)) return;
    focusPaused = false; syncPlayback();
  });
  document.addEventListener('visibilitychange', syncPlayback);
  function syncMotion() {
    if (motion.matches || !capable) {
      manualPaused = true; ++token; stop(); clearAll(); render(-1);
      hero.dataset.phase = 'settled';
    }
    syncPlayback();
  }
  if (motion.addEventListener) motion.addEventListener('change', syncMotion);
  else motion.addListener(syncMotion);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      inView = entries.some(function (entry) { return entry.isIntersecting && entry.intersectionRatio >= .15; });
      syncPlayback();
    }, { threshold: [0, .15] }).observe(hero);
  }
  window.addEventListener('pagehide', function () { pageAway = true; syncPlayback(); });
  window.addEventListener('pageshow', function () { pageAway = false; syncPlayback(); });
  select(0, false, true);
}());
