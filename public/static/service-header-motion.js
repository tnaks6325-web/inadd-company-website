(function () {
  'use strict';
  var section = document.getElementById('services');
  if (!section || !section.classList.contains('hsvc-redesign')) return;
  var header = section.querySelector('.hsvc-redesign-header');
  if (!header || header.dataset.headerInitialized) return;
  var parts = Array.from(header.querySelectorAll('[data-header-part]'));
  var letters = Array.from(header.querySelectorAll('[data-header-letter]'));
  if (!parts.length || !letters.length) return;
  header.dataset.headerInitialized = 'true';
  header.dataset.headerState = 'waiting';
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  var capable = typeof header.animate === 'function';
  var visible = !('IntersectionObserver' in window);
  var entered = false, token = 0, jobs = [];
  var ease = 'cubic-bezier(.16,1,.3,1)';
  var poseKeys = ['opacity', 'translate', 'rotate', 'scale'];

  function clearPose() {
    parts.concat(letters).forEach(function (node) {
      poseKeys.forEach(function (key) { node.style.removeProperty(key); });
    });
  }
  function stop() {
    var old = jobs;
    jobs = [];
    old.forEach(function (job) { job.animation.cancel(); });
  }
  function staticHeader() {
    ++token;
    entered = true;
    stop(); clearPose();
    header.dataset.headerState = 'ready';
  }
  function track(node, frames, duration, delay) {
    var animation = node.animate(frames, { duration: duration, delay: delay, easing: ease, fill: 'both' });
    var job = { animation: animation, done: false };
    jobs.push(job);
    return animation.finished.then(function () { job.done = true; }, function () {});
  }
  function finish(cohort, requestId) {
    Promise.all(cohort).then(function () {
      if (requestId !== token) return;
      stop(); clearPose();
      header.dataset.headerState = 'ready';
    });
  }
  function reveal() {
    entered = true;
    var requestId = ++token;
    header.dataset.headerState = 'reveal';
    var cohort = parts.map(function (node) {
      var kind = node.dataset.headerPart;
      var headline = kind.indexOf('headline-') === 0;
      var intro = kind.indexOf('intro-') === 0;
      var delay = headline ? 70 + Number(kind.slice(9)) * 100 : intro ? 320 + Number(kind.slice(6)) * 90 : 0;
      return track(node, [
        { opacity: 0, translate: headline ? '0px 110%' : '0px 18px', offset: 0 },
        { opacity: 1, translate: headline ? '0px -2%' : '0px 0px', offset: .8 },
        { opacity: 1, translate: '0px 0px', offset: 1 }
      ], headline ? 620 : intro ? 420 : 360, delay);
    }).concat(letters.map(function (node, index) {
      return track(node, [
        { opacity: 0, translate: '0px 26px', rotate: '2deg', scale: '.94', offset: 0 },
        { opacity: 1, translate: '0px -3px', rotate: '-.7deg', scale: '1.025', offset: .7 },
        { opacity: 1, translate: '0px 0px', rotate: '0deg', scale: '1', offset: 1 }
      ], 540, 260 + index * 45);
    }));
    finish(cohort, requestId);
  }
  function syncVisibility() {
    var running = visible && !document.hidden && !reduced.matches && capable;
    if (running && !entered) reveal();
    jobs.forEach(function (job) {
      if (job.done) return;
      if (running) job.animation.play();
      else job.animation.pause();
    });
  }
  function react() {
    if (!entered || !visible || document.hidden || reduced.matches || !capable || header.dataset.headerState === 'reveal') return;
    // Rapid selections continue from the displayed pose, not a reset mid-hop.
    var poses = letters.map(function (node) {
      var computed = getComputedStyle(node), pose = {};
      poseKeys.forEach(function (key) { pose[key] = computed[key] || (key === 'opacity' ? '1' : 'none'); });
      return pose;
    });
    var requestId = ++token;
    stop(); clearPose();
    header.dataset.headerState = 'react';
    var cohort = letters.map(function (node, index) {
      return track(node, [
        Object.assign({ offset: 0 }, poses[index]),
        { opacity: 1, translate: '0px -7px', rotate: '-1.4deg', scale: '1.04', offset: .32 },
        { opacity: 1, translate: '0px 1px', rotate: '.4deg', scale: '.99', offset: .72 },
        { opacity: 1, translate: '0px 0px', rotate: '0deg', scale: '1', offset: 1 }
      ], 500, index * 35);
    });
    finish(cohort, requestId);
    syncVisibility();
  }
  function syncMotion() {
    header.dataset.headerMotion = reduced.matches || !capable ? 'reduced' : 'full';
    if (reduced.matches || !capable) staticHeader();
    syncVisibility();
  }
  section.addEventListener('hsvc:selection', react);
  if (reduced.addEventListener) reduced.addEventListener('change', syncMotion);
  else reduced.addListener(syncMotion);
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      visible = entries.some(function (entry) { return entry.isIntersecting; });
      syncVisibility();
    }, { threshold: .15 });
    observer.observe(header);
  }
  document.addEventListener('visibilitychange', syncVisibility);
  syncMotion();
}());
