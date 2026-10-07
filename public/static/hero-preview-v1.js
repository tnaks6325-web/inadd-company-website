(function () {
  'use strict';
  var hero = document.getElementById('homeHeroPreview');
  if (!hero || hero.dataset.initialized) return;
  hero.dataset.initialized = 'true';
  var frames = Array.from(hero.querySelectorAll('[data-frame]'));
  var copies = Array.from(hero.querySelectorAll('[data-copy]'));
  var steps = Array.from(hero.querySelectorAll('[data-hero-step]'));
  var pause = hero.querySelector('[data-hero-pause]');
  var status = hero.querySelector('.hhp-status');
  var motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var index = 0;
  var manualPaused = motion.matches;
  var inView = true;
  var frameId = 0;
  var elapsed = 0;
  var previousTime = 0;
  var leavingTimers = [];

  function duration() { return Number(copies[index].dataset.duration) || 6500; }
  function running() { return !manualPaused && !motion.matches && !document.hidden && inView; }
  function updateProgress() { hero.style.setProperty('--hero-progress', Math.min(elapsed / duration(), 1).toFixed(4)); }
  function render() {
    frames.forEach(function (frame, i) {
      var wasActive = frame.classList.contains('is-active');
      if (i === index) {
        clearTimeout(leavingTimers[i]);
        frame.classList.add('is-active');
        frame.classList.remove('is-leaving');
      } else if (wasActive) {
        // Keep the outgoing zoom until its 900ms dissolve is completely invisible.
        frame.classList.add('is-leaving');
        frame.classList.remove('is-active');
        clearTimeout(leavingTimers[i]);
        leavingTimers[i] = setTimeout(function () { frame.classList.remove('is-leaving'); }, 1000);
      }
    });
    copies.forEach(function (copy, i) {
      copy.classList.toggle('is-active', i === index);
      copy.setAttribute('aria-hidden', String(i !== index));
    });
    steps.forEach(function (step, i) { step.setAttribute('aria-current', String(i === index)); });
    hero.dataset.scene = String(index + 1);
    status.textContent = steps[index].getAttribute('aria-label');
    updateProgress();
  }
  function tick(now) {
    if (!running()) { frameId = 0; return; }
    if (previousTime) elapsed += Math.min(now - previousTime, 100);
    previousTime = now;
    if (elapsed >= duration()) {
      index = (index + 1) % copies.length;
      elapsed = 0;
      render();
    }
    updateProgress();
    frameId = requestAnimationFrame(tick);
  }
  function syncPlayback() {
    var enabled = running();
    hero.classList.toggle('is-running', enabled);
    hero.dataset.playback = enabled ? 'playing' : 'paused';
    pause.disabled = motion.matches;
    pause.setAttribute('aria-pressed', String(manualPaused || motion.matches));
    pause.setAttribute('aria-label', motion.matches ? '기기 설정에 따라 자동 전환이 꺼져 있습니다' : manualPaused ? '자동 전환 재생' : '자동 전환 일시정지');
    hero.querySelector('[data-pause-label]').textContent = motion.matches ? '모션 꺼짐' : manualPaused ? '재생' : '일시정지';
    hero.querySelector('[data-pause-icon]').hidden = manualPaused || motion.matches;
    hero.querySelector('[data-play-icon]').hidden = !manualPaused && !motion.matches;
    if (!enabled) {
      cancelAnimationFrame(frameId);
      frameId = 0;
      previousTime = 0;
    } else if (!frameId) {
      previousTime = 0;
      frameId = requestAnimationFrame(tick);
    }
  }
  function select(next, userInitiated) {
    index = (next + copies.length) % copies.length;
    elapsed = 0;
    previousTime = 0;
    if (userInitiated) manualPaused = true;
    status.setAttribute('aria-live', userInitiated ? 'polite' : 'off');
    render();
    syncPlayback();
  }
  hero.querySelector('[data-hero-prev]').addEventListener('click', function () { select(index - 1, true); });
  hero.querySelector('[data-hero-next]').addEventListener('click', function () { select(index + 1, true); });
  steps.forEach(function (step, i) { step.addEventListener('click', function () { select(i, true); }); });
  pause.addEventListener('click', function () {
    manualPaused = !manualPaused;
    status.setAttribute('aria-live', 'off');
    syncPlayback();
  });
  hero.querySelector('.hhp-controls').addEventListener('keydown', function (event) {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      select(index + (event.key === 'ArrowRight' ? 1 : -1), true);
    }
  });
  document.addEventListener('visibilitychange', syncPlayback);
  function onMotionChange() { if (motion.matches) manualPaused = true; syncPlayback(); }
  if (motion.addEventListener) motion.addEventListener('change', onMotionChange);
  else motion.addListener(onMotionChange);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      inView = entries[0].isIntersecting && entries[0].intersectionRatio >= .15;
      syncPlayback();
    }, { threshold: [0, .15] }).observe(hero);
  }
  window.addEventListener('pagehide', function () { cancelAnimationFrame(frameId); frameId = 0; previousTime = 0; });
  window.addEventListener('pageshow', syncPlayback);
  render();
  hero.classList.add('is-ready');
  syncPlayback();
}());
