(function () {
  function animate(el) {
    var target = parseInt(el.getAttribute('data-target'), 10) || 0;
    var startedAt = 0;
    function frame(now) {
      if (!startedAt) startedAt = now;
      var progress = Math.min((now - startedAt) / 1400, 1);
      var eased = 1 - Math.pow(1 - progress, 4);
      el.textContent = Math.floor(target * eased).toLocaleString();
      if (progress < 1) window.requestAnimationFrame(frame);
      else el.textContent = target.toLocaleString();
    }
    window.requestAnimationFrame(frame);
  }

  var blocks = Array.prototype.slice.call(document.querySelectorAll('.ifl-data-counter-bar, .ifl-data-db-badge'));
  blocks.forEach(function (block) {
    if (block.dataset.counterReady === '1') return;
    block.dataset.counterReady = '1';
    var counters = Array.prototype.slice.call(block.querySelectorAll('.ifl-data-counter-num[data-target]'));
    if (!counters.length) return;
    counters.forEach(function (counter) { counter.setAttribute('data-influencer-counter', '1'); });
    function run() { counters.forEach(animate); }
    if (!('IntersectionObserver' in window)) { run(); return; }
    var observer = new IntersectionObserver(function (entries) {
      if (!entries.some(function (entry) { return entry.isIntersecting; })) return;
      run();
      observer.disconnect();
    }, { threshold: 0.25 });
    observer.observe(block);
  });
})();
