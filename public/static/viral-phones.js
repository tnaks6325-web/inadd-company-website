/* 바이럴 히어로 휴대폰 롤링.
   - 휴대폰이 한 칸씩 왼쪽으로 넘어가고, 가운데 온 화면은 크게 → 도착하자마자 글이 한 번 아래로 스크롤된다.
   - 화면 밖이거나 탭이 숨겨지면 멈추고, '움직임 줄이기' 설정이면 가운데 화면만 멈춘 채 보여준다. */
(function () {
  var root = document.querySelector('[data-vp]');
  if (!root) return;
  var phones = Array.prototype.slice.call(root.querySelectorAll('.vp-phone'));
  var n = phones.length, cur = n - 1, prevRel = [];
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var STEP_MS = 3800, SCROLL_DELAY = 750;

  function relOf(i) { var r = ((i - cur) % n + n) % n; return r > n / 2 ? r - n : r; }
  function scrollPhone(p, on) {
    var y = on ? -(+p.getAttribute('data-scroll') || 0) : 0;
    p.querySelector('.vp-scroll').style.transform = 'translateY(' + y + 'px)';
  }
  function apply() {
    var step = parseFloat(getComputedStyle(root).getPropertyValue('--step')) || 270;
    phones.forEach(function (p, i) {
      var r = relOf(i);
      // 반대편 끝으로 넘어가는 휴대폰은 보이지 않게 순간 이동
      p.classList.toggle('is-jump', prevRel[i] === undefined || Math.abs(r - prevRel[i]) > 1);
      p.style.setProperty('--x', (r * step) + 'px');
      p.style.setProperty('--k', r === 0 ? '1' : '.84');
      p.classList.toggle('is-on', Math.abs(r) <= 1);
      p.style.zIndex = String(10 - Math.abs(r));
      // 왼쪽으로 빠져 안 보이게 된 화면은 맨 위로 되돌려 둔다
      if (Math.abs(r) >= 2) { p.classList.add('is-reset'); scrollPhone(p, false); }
      prevRel[i] = r;
    });
    void root.offsetWidth;
    phones.forEach(function (p) { p.classList.remove('is-reset'); });
  }
  function advance() {
    cur = (cur + 1) % n;
    apply();
    var center = phones[cur];
    setTimeout(function () { if (relOf(phones.indexOf(center)) === 0) scrollPhone(center, true); }, SCROLL_DELAY);
  }

  apply();
  window.addEventListener('resize', apply);
  if (reduce) { cur = 0; apply(); return; }

  var visible = true;
  if ('IntersectionObserver' in window) new IntersectionObserver(function (e) { visible = e[0].isIntersecting; }).observe(root);
  setTimeout(advance, 350);
  setInterval(function () { if (visible && !document.hidden) advance(); }, STEP_MS);
})();
