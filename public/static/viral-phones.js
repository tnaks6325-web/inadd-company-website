/* 바이럴 히어로 휴대폰 롤링.
   - 휴대폰이 한 칸씩 왼쪽으로 넘어가고, 가운데 온 화면은 크게 → 도착하자마자 글이 한 번 아래로 스크롤된다.
   - 화면 밖이거나 탭이 숨겨지면 멈추고, '움직임 줄이기' 설정이면 가운데 화면만 멈춘 채 보여준다. */
(function () {
  var root = document.querySelector('[data-vp]');
  if (!root) return;
  var phones = Array.prototype.slice.call(root.querySelectorAll('.vp-phone'));
  var n = phones.length, cur = n - 1, prevRel = [];
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var STEP_MS = 1500, SCROLL_DELAY = 450;

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
    document.dispatchEvent(new CustomEvent('vp:arrive', { detail: center }));
    setTimeout(function () { if (relOf(phones.indexOf(center)) === 0) scrollPhone(center, true); }, SCROLL_DELAY);
  }

  apply();
  window.addEventListener('resize', apply);
  if (reduce) { cur = 0; apply(); return; }

  var visible = true;
  if ('IntersectionObserver' in window) new IntersectionObserver(function (e) { visible = e[0].isIntersecting; }).observe(root);
  // 첫 화면도 다른 화면과 똑같은 시간 머물도록, 첫 등장 뒤부터 간격을 센다
  setTimeout(function () {
    advance();
    setInterval(function () { if (visible && !document.hidden) advance(); }, STEP_MS);
  }, 350);
})();

/* 히어로 배경: 가운데 화면이 도착할 때마다 물결이 퍼지고, 휴대폰 가장자리 위로 반응 알림이 떠올랐다 사라진다. */
(function () {
  var bg = document.querySelector('[data-vb]');
  if (!bg) return;
  var hero = bg.parentNode, layer = hero.querySelector('[data-vp]') || bg;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var CHIPS = [
    ['♥', '#f0284a', '좋아요 +24', ''], ['💬', '#03c75a', '댓글 12', '저도 써봤어요!'], ['👁', '#5b6bd6', '조회 1,284', ''],
    ['🔗', '#285ccc', '공유 38', ''], ['👍', '#3d63c9', '추천 412', ''], ['＋', '#03c75a', '이웃추가', ''],
    ['💬', '#03c75a', '새 댓글', '어디서 사셨어요?'], ['★', '#f3a51b', '실시간 인기글', ''], ['🔖', '#7a5af0', '스크랩 9', ''],
    ['♥', '#f0284a', '좋아요 +41', ''], ['💬', '#3d63c9', '댓글 186', '재구매 각'], ['👁', '#5b6bd6', '조회 38,120', '']
  ];
  var mobile = function () { return window.innerWidth < 768; };
  var k = 0;
  function rnd(a, b) { return a + Math.random() * (b - a); }
  function chip(x, y, still) {
    var c = CHIPS[k++ % CHIPS.length], el = document.createElement('div');
    el.className = 'vb-chip';
    el.innerHTML = '<i style="--c:' + c[1] + '">' + c[0] + '</i><span>' + c[2] + (c[3] ? ' <small>' + c[3] + '</small>' : '') + '</span>';
    el.style.left = x + '%'; el.style.top = y + '%';
    el.style.setProperty('--sc', rnd(.9, 1).toFixed(2));
    el.style.setProperty('--dur', rnd(4.5, 6) + 's');
    if (!still) el.addEventListener('animationend', function () { el.remove(); });
    layer.appendChild(el);
  }
  // 휴대폰 묶음 안에서 가운데 화면 양옆 가장자리(옆 화면 위)에 띄워 가운데 화면 글은 가리지 않는다.
  // PC 는 알림이 130px 떠오르므로 30% 아래에서 시작해 위쪽 메뉴를 덮지 않게 한다.
  var side = 0;
  function spot() { side = 1 - side; var y = mobile() ? rnd(12, 78) : rnd(30, 82); return mobile() ? [side ? rnd(2, 10) : rnd(52, 60), y] : [side ? rnd(10, 24) : rnd(64, 76), y]; }
  if (reduce) { for (var i = 0; i < 7; i++) { var p = spot(); chip(p[0], p[1], true); } return; }

  document.addEventListener('vp:arrive', function (e) {
    if (document.hidden) return;
    var r = e.detail.getBoundingClientRect(), h = hero.getBoundingClientRect();
    var ring = document.createElement('div');
    ring.className = 'vb-ring';
    ring.style.left = (r.left + r.width / 2 - h.left) + 'px';
    ring.style.top = (r.top + r.height / 2 - h.top) + 'px';
    ring.addEventListener('animationend', function () { ring.remove(); });
    bg.appendChild(ring);
  });
  var visible = true;
  if ('IntersectionObserver' in window) new IntersectionObserver(function (e) { visible = e[0].isIntersecting; }).observe(bg);
  for (var j = 0; j < 2; j++) { var q = spot(); chip(q[0], q[1]); }
  setInterval(function () {
    if (!visible || document.hidden || layer.querySelectorAll('.vb-chip').length >= 4) return;
    var p = spot(); chip(p[0], p[1]);
  }, 1100);
})();
