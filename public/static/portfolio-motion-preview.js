/* DEV portfolio: the rail is the only continuous track. Native vertical
   scrolling remains untouched; photographs and metadata stay readable. */
(function () {
  var root = document.querySelector('#homeRefs[data-portfolio-motion]');
  if (!root || root.dataset.portfolioInitialized) return;
  var flow = root.querySelector('#refsFlow');
  var track = root.querySelector('#refsFlowTrack');
  var previous = root.querySelector('[data-pf-prev]');
  var next = root.querySelector('[data-pf-next]');
  var toggle = root.querySelector('[data-pf-toggle]');
  var toggleLabel = root.querySelector('[data-pf-toggle-label]');
  var status = root.querySelector('[data-pf-status]');
  if (!flow || !track || !previous || !next || !toggle || !status) return;
  root.dataset.portfolioInitialized = 'true';

  var media = window.matchMedia('(prefers-reduced-motion: reduce)');
  var reduced = media.matches;
  var cards = [], originals = [], geometry = [], railWidth = 0, period = 0, step = 0, distance = 0;
  var raf = 0, lastTime = 0, velocity = 0, boost = 0, tween = null;
  var manualPaused = false, hovering = false, focused = false;
  var inView = !('IntersectionObserver' in window);
  var pageVisible = !document.hidden, drag = null, active = -1;
  var entered = false, entranceJobs = [], currentCard = null;
  var lastScroll = window.scrollY, ready = false, nativeTarget = null;
  var clamp = function (value, min, max) { return Math.max(min, Math.min(max, value)); };
  var wrap = function (value) { return period ? ((value % period) + period) % period : 0; };
  function now() { return performance.now(); }
  function allowed() { return ready && inView && pageVisible && !reduced; }
  function automatic() { return allowed() && originals.length > 1 && !manualPaused && !hovering && !focused && !drag && !tween; }
  function needsFrame() { return allowed() && (automatic() || Math.abs(velocity) > 1 || !!tween); }

  function updateState() {
    root.dataset.portfolioMotion = reduced ? 'reduced' : 'full';
    root.dataset.portfolioPlayback = automatic() ? 'playing' : 'paused';
    root.dataset.portfolioPhase = drag && drag.locked ? 'dragging' : tween ? 'selecting' : Math.abs(velocity) > 1 ? 'coasting' : automatic() ? 'flowing' : 'settled';
    toggle.disabled = reduced || originals.length < 2;
    toggle.setAttribute('aria-pressed', String(manualPaused));
    toggle.setAttribute('aria-label', reduced ? '모션 감소 설정으로 자동 흐름 꺼짐' : manualPaused ? '포트폴리오 자동 흐름 재생' : '포트폴리오 자동 흐름 일시정지');
    if (toggleLabel) toggleLabel.textContent = reduced ? '자동 흐름 꺼짐' : manualPaused ? '재생' : '일시정지';
    previous.disabled = next.disabled = originals.length < 2;
  }
  function highlight(card) {
    if (currentCard === card) return;
    cards.forEach(function (item) { item.classList.toggle('is-portfolio-active', item === card); });
    currentCard = card;
    if (card && !tween) active = Number(card.dataset.portfolioIndex) || 0;
  }
  function render(forceHighlight) {
    if (!ready) return;
    if (!reduced) {
      distance = wrap(distance);
      track.style.transform = 'translate3d(' + (-distance).toFixed(3) + 'px,0,0)';
    }
    if ((hovering && !forceHighlight && Math.abs(velocity) <= 1) || (drag && drag.locked)) return;
    if (reduced && nativeTarget !== null) {
      if (Math.abs(flow.scrollLeft - nativeTarget) < 1) { highlight(originals[active < 0 ? 0 : active]); return; }
      nativeTarget = null;
    }
    var center = railWidth / 2, offsetLeft = reduced ? flow.scrollLeft : distance;
    var candidate = null, closest = Infinity;
    geometry.forEach(function (item) {
      var card = item.card;
      if (reduced && card.hasAttribute('data-portfolio-duplicate')) return;
      var offset = Math.abs(item.left - offsetLeft + item.width / 2 - center);
      if (offset < closest) { closest = offset; candidate = card; }
    });
    highlight(candidate);
  }
  function wake() {
    updateState();
    if (!needsFrame()) {
      if (raf) cancelAnimationFrame(raf);
      raf = 0; lastTime = 0;
      return;
    }
    if (!raf) { lastTime = 0; raf = requestAnimationFrame(tick); }
  }
  function tick(time) {
    raf = 0;
    if (!allowed()) { lastTime = 0; updateState(); return; }
    var dt = lastTime ? clamp((time - lastTime) / 1000, 0, .05) : 0;
    lastTime = time;
    if (tween) {
      var progress = clamp((time - tween.started) / 520, 0, 1);
      distance = tween.from + (tween.to - tween.from) * (1 - Math.pow(1 - progress, 3));
      if (progress === 1) tween = null;
    } else if (!drag) {
      if (Math.abs(velocity) > 1) {
        distance += velocity * dt;
        velocity *= Math.exp(-5.5 * dt);
        if (Math.abs(velocity) <= 1) velocity = 0;
      } else if (automatic()) distance += (52 + boost) * dt;
    }
    boost *= Math.exp(-4.5 * dt);
    if (boost < .5) boost = 0;
    render(); updateState();
    if (needsFrame()) raf = requestAnimationFrame(tick);
    else lastTime = 0;
  }
  function entrance() {
    if (entered || !ready || !inView || !pageVisible || reduced) return;
    entered = true;
    if (typeof flow.animate !== 'function') return;
    root.querySelectorAll('[data-pf-reveal]').forEach(function (part, index) {
      entranceJobs.push(part.animate([{ opacity: .45, transform: 'translateY(22px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 620, delay: index * 90, easing: 'cubic-bezier(.22,1,.36,1)' }));
    });
    var bounds = flow.getBoundingClientRect(), order = 0;
    cards.forEach(function (card) {
      var rect = card.getBoundingClientRect();
      var body = card.querySelector('.pf-card-body');
      if (body && rect.right > bounds.left && rect.left < bounds.right) {
        entranceJobs.push(body.animate([{ opacity: .65, transform: 'translateY(32px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 700, delay: 100 + order++ * 75, easing: 'cubic-bezier(.22,1,.36,1)' }));
      }
    });
  }
  function syncVisibility() {
    entranceJobs.forEach(function (job) {
      if (job.playState === 'finished' || job.playState === 'idle') return;
      if (inView && pageVisible) job.play(); else job.pause();
    });
    if (!inView || !pageVisible) { velocity = boost = 0; tween = null; releaseDrag(true); }
    entrance(); wake();
  }
  function measure() {
    cards = Array.from(track.querySelectorAll('.refs-flow-card'));
    originals = cards.filter(function (card) { return !card.hasAttribute('data-portfolio-duplicate'); });
    var duplicate = cards.find(function (card) { return card.hasAttribute('data-portfolio-duplicate'); });
    if (!originals.length || !duplicate) return;
    root.dataset.portfolioSingle = String(originals.length === 1);
    if (originals.length === 1) { distance = velocity = boost = 0; tween = null; }
    var oldPeriod = period;
    step = originals.length > 1 ? originals[1].offsetLeft - originals[0].offsetLeft : originals[0].getBoundingClientRect().width;
    period = duplicate.offsetLeft - originals[0].offsetLeft;
    if (period <= 0) period = step * originals.length;
    if (period <= 0 || step <= 0) return;
    if (oldPeriod) {
      var ratio = period / oldPeriod;
      distance *= ratio;
      if (tween) {
        var selected = tween.index;
        var desired = originals[selected].offsetLeft - originals[0].offsetLeft - Math.max(0, (flow.clientWidth - originals[selected].getBoundingClientRect().width) / 2);
        var delta = wrap(desired - distance);
        if (delta > period / 2) delta -= period;
        tween = { from: distance, to: distance + delta, started: now(), index: selected };
      }
    }
    /* Extra non-accessible tiles prevent a short catalogue from exposing a
       blank end on unusually wide displays. The actual cycle stays unchanged. */
    if (!reduced && originals.length > 1 && track.scrollWidth < period + flow.clientWidth) {
      originals.forEach(function (card) {
        var clone = card.cloneNode(true);
        clone.setAttribute('data-portfolio-duplicate', 'true');
        clone.setAttribute('aria-hidden', 'true');
        clone.setAttribute('inert', '');
        track.appendChild(clone);
      });
      cards = Array.from(track.querySelectorAll('.refs-flow-card'));
    }
    railWidth = flow.clientWidth;
    geometry = cards.map(function (card) {
      return { card: card, left: card.offsetLeft - originals[0].offsetLeft, width: card.getBoundingClientRect().width };
    });
    ready = true; root.dataset.portfolioReady = 'true';
    render(); entrance(); wake();
  }
  function announce() {
    var card = originals[active];
    var brand = card && card.querySelector('.wg-brand');
    status.textContent = (active + 1) + ' / ' + originals.length + (brand ? ' — ' + brand.textContent : '');
  }
  function select(index, direction) {
    if (!ready || originals.length < 2) return;
    index = (index + originals.length) % originals.length;
    velocity = boost = 0;
    if (reduced) {
      flow.scrollLeft = Math.max(0, originals[index].offsetLeft - originals[0].offsetLeft - (flow.clientWidth - originals[index].getBoundingClientRect().width) / 2);
      nativeTarget = flow.scrollLeft;
      highlight(originals[index]);
    } else {
      var left = originals[index].offsetLeft - originals[0].offsetLeft;
      var target = left - Math.max(0, (flow.clientWidth - originals[index].getBoundingClientRect().width) / 2);
      var delta = wrap(target - distance);
      if (direction < 0 && delta > 0) delta -= period;
      else if (!direction && delta > period / 2) delta -= period;
      tween = { from: distance, to: distance + delta, started: now(), index: index };
    }
    active = index; announce(); wake();
  }
  function releaseDrag(cancelled) {
    if (!drag) return;
    var pointer = drag.id, locked = drag.locked;
    drag = null;
    root.classList.remove('is-portfolio-dragging');
    root.dataset.portfolioDragging = 'false';
    if (cancelled || !locked) velocity = 0;
    if (flow.hasPointerCapture && flow.hasPointerCapture(pointer)) flow.releasePointerCapture(pointer);
  }
  flow.addEventListener('pointerdown', function (event) {
    if (reduced || !ready || originals.length < 2 || (event.button !== undefined && event.button !== 0) || event.isPrimary === false) return;
    velocity = boost = 0; tween = null;
    drag = { id: event.pointerId, x: event.clientX, y: event.clientY, lastX: event.clientX, lastTime: now(), locked: false };
    wake();
  });
  flow.addEventListener('pointermove', function (event) {
    if (!drag || event.pointerId !== drag.id) return;
    var dx = event.clientX - drag.x, dy = event.clientY - drag.y;
    if (!drag.locked) {
      if (Math.max(Math.abs(dx), Math.abs(dy)) < 8) return;
      if (Math.abs(dx) <= Math.abs(dy) * 1.2) { releaseDrag(true); wake(); return; }
      drag.locked = true;
      root.classList.add('is-portfolio-dragging');
      root.dataset.portfolioDragging = 'true';
      if (flow.setPointerCapture) flow.setPointerCapture(event.pointerId);
    }
    event.preventDefault();
    var time = now(), change = event.clientX - drag.lastX;
    distance -= change;
    velocity = clamp(-change / Math.max((time - drag.lastTime) / 1000, .016), -1800, 1800);
    drag.lastX = event.clientX; drag.lastTime = time;
    render();
  });
  function finishDrag(event) {
    if (!drag || event.pointerId !== drag.id) return;
    if (now() - drag.lastTime > 100) velocity = 0;
    var wasLocked = drag.locked;
    releaseDrag(false);
    if (wasLocked) { render(true); announce(); }
    wake();
  }
  flow.addEventListener('pointerup', finishDrag);
  window.addEventListener('pointerup', finishDrag);
  window.addEventListener('pointercancel', function (event) {
    if (drag && event.pointerId === drag.id) { releaseDrag(true); wake(); }
  });
  window.addEventListener('blur', function () { releaseDrag(true); wake(); });
  ['pointercancel', 'lostpointercapture'].forEach(function (name) {
    flow.addEventListener(name, function (event) {
      if (drag && event.pointerId === drag.id) { releaseDrag(true); wake(); }
    });
  });
  flow.addEventListener('dragstart', function (event) { event.preventDefault(); });
  flow.addEventListener('pointerenter', function (event) {
    if (event.pointerType === 'touch') return;
    hovering = true; velocity = boost = 0; wake();
  });
  flow.addEventListener('pointerover', function (event) {
    if (event.pointerType === 'touch') return;
    var card = event.target.closest && event.target.closest('.refs-flow-card');
    if (card && track.contains(card)) highlight(card);
  });
  flow.addEventListener('pointerleave', function (event) {
    if (event.pointerType === 'touch') return;
    hovering = false; render(); wake();
  });
  root.addEventListener('focusin', function () { focused = true; velocity = boost = 0; wake(); });
  root.addEventListener('focusout', function (event) {
    if (event.relatedTarget && root.contains(event.relatedTarget)) return;
    focused = false; wake();
  });
  flow.addEventListener('keydown', function (event) {
    var target = active < 0 ? 0 : active;
    if (event.key === 'ArrowRight') { event.preventDefault(); select(target + 1, 1); }
    else if (event.key === 'ArrowLeft') { event.preventDefault(); select(target - 1, -1); }
    else if (event.key === 'Home') { event.preventDefault(); select(0, 0); }
    else if (event.key === 'End') { event.preventDefault(); select(originals.length - 1, 0); }
  });
  previous.addEventListener('click', function () { select(active - 1, -1); });
  next.addEventListener('click', function () { select(active + 1, 1); });
  toggle.addEventListener('click', function () {
    if (reduced) return;
    manualPaused = !manualPaused;
    velocity = boost = 0;
    if (!manualPaused) focused = false;
    wake();
  });
  flow.addEventListener('scroll', function () { if (reduced) render(); }, { passive: true });
  window.addEventListener('scroll', function () {
    var value = window.scrollY, change = Math.abs(value - lastScroll);
    lastScroll = value;
    if (automatic()) { boost = clamp(boost + change * 3.5, 0, 250); wake(); }
  }, { passive: true });
  document.addEventListener('visibilitychange', function () { pageVisible = !document.hidden; syncVisibility(); });
  window.addEventListener('pagehide', function () { pageVisible = false; syncVisibility(); });
  window.addEventListener('pageshow', function () { pageVisible = !document.hidden; lastScroll = window.scrollY; syncVisibility(); });
  function changeMotion() {
    reduced = media.matches; velocity = boost = 0; tween = null; nativeTarget = null; releaseDrag(true);
    entranceJobs.forEach(function (job) { job.cancel(); }); entranceJobs = [];
    if (reduced) {
      var nativeOffset = wrap(distance);
      updateState(); track.style.removeProperty('transform');
      flow.scrollLeft = nativeOffset;
      entered = true;
    } else { distance = flow.scrollLeft; flow.scrollLeft = 0; }
    updateState(); measure();
  }
  if (media.addEventListener) media.addEventListener('change', changeMotion);
  else if (media.addListener) media.addListener(changeMotion);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      inView = entries[0].isIntersecting && entries[0].intersectionRatio > .08;
      syncVisibility();
    }, { threshold: [0, .08, .2] }).observe(root);
  }
  if ('ResizeObserver' in window) new ResizeObserver(measure).observe(flow);
  else window.addEventListener('resize', measure, { passive: true });
  if ('MutationObserver' in window) new MutationObserver(measure).observe(track, { childList: true });
  track.addEventListener('portfolio:ready', measure);
  updateState(); measure();
})();
