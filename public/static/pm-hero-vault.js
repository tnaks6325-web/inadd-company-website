/* 퍼포먼스 마케팅 히어로 카드 흐름.
   - 줄마다 카드를 복제해 끊김 없이 흐르게 하고, 줄마다 방향을 번갈아 바꾼다.
   - 첫 장면: 가운데 파란 IN AD COMPANY 카드만 크게 → 나머지 카드가 나타나며 화면이 물러나고 흐르기 시작.
   - 화면 밖이거나 탭이 숨겨지면 멈추고, '움직임 줄이기' 설정이면 멈춘 화면만 보여준다. */
(function () {
  var vault = document.querySelector('[data-pm-vault]');
  if (!vault) return;
  var stage = vault.querySelector('.pm-vault-stage');
  var rows = Array.prototype.slice.call(vault.querySelectorAll('.pm-vault-row'));
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var CRUISE = 26; // px/s
  var state = rows.map(function (row, r) {
    var track = row.querySelector('.pm-vault-track');
    return { track: track, originals: Array.prototype.slice.call(track.children), dir: r % 2 ? -1 : 1, setW: 0, x: 0 };
  });

  function layout() {
    var stageW = stage.offsetWidth;
    state.forEach(function (s, r) {
      // 원본만 남기고 다시 복제(화면 크기가 바뀌면 카드 크기도 바뀜)
      while (s.track.children.length > s.originals.length) s.track.removeChild(s.track.lastChild);
      var first = s.originals[0], last = s.originals[s.originals.length - 1];
      var gap = parseFloat(getComputedStyle(s.track).columnGap) || 0;
      s.setW = last.offsetLeft + last.offsetWidth + gap - first.offsetLeft;
      var copies = Math.ceil((stageW + s.setW) / s.setW);
      for (var i = 0; i < copies; i++) s.originals.forEach(function (el) { s.track.appendChild(el.cloneNode(true)); });
      var brand = s.originals.filter(function (el) { return el.classList.contains('pm-vault-brand'); })[0];
      // 파란 카드가 있는 줄은 그 카드가 정확히 가운데 오도록, 나머지는 줄마다 엇갈리게
      s.x = brand ? stageW / 2 - brand.offsetLeft - brand.offsetWidth / 2 : -r * (s.setW / s.originals.length) * 0.5;
      s.x = wrap(s.x, s.setW);
      paint(s);
    });
  }
  function wrap(x, w) { x = x % w; if (x > 0) x -= w; return x; }
  function paint(s) { s.track.style.transform = 'translate3d(' + s.x.toFixed(2) + 'px,0,0)'; }

  layout();
  var resizeTimer;
  window.addEventListener('resize', function () { clearTimeout(resizeTimer); resizeTimer = setTimeout(layout, 150); });
  if (reduce) { vault.classList.remove('is-intro'); return; }

  // 첫 장면 순서
  var cards = vault.querySelectorAll('.pm-vault-card:not(.pm-vault-brand)');
  Array.prototype.forEach.call(cards, function (el, i) { el.style.setProperty('--d', (0.15 + (i % 9) * 0.06).toFixed(2) + 's'); });
  void stage.offsetWidth;
  requestAnimationFrame(function () { requestAnimationFrame(function () { vault.classList.add('is-run', 'is-brand'); }); });
  var startAt = performance.now();
  setTimeout(function () { vault.classList.remove('is-intro'); vault.classList.remove('is-brand'); }, 1100);

  var visible = true, last = 0;
  if ('IntersectionObserver' in window) new IntersectionObserver(function (e) { visible = e[0].isIntersecting; }).observe(vault);
  function tick(now) {
    var dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
    last = now;
    // 처음 1.3초는 멈춰 있다가 1.6초에 걸쳐 천천히 속도를 올린다
    var t = (now - startAt) / 1000 - 1.3;
    var speed = CRUISE * (t <= 0 ? 0 : t >= 1.6 ? 1 : (1 - Math.cos(Math.PI * t / 1.6)) / 2);
    if (visible && !document.hidden && speed > 0) state.forEach(function (s) { s.x = wrap(s.x + s.dir * speed * dt, s.setW); paint(s); });
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();
