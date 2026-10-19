/* 인플루언서 히어로: 화면에 보이는 휴대폰의 영상만 소리 없이 재생하고, 안 보이면 멈춘다.
   히어로가 화면 밖이거나 탭이 숨겨지면 흐름도 멈추고, '움직임 줄이기' 설정이면 첫 장면 사진만 보여준다. */
(function () {
  var root = document.querySelector('[data-ip]');
  if (!root) return;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) return;
  var videos = Array.prototype.slice.call(root.querySelectorAll('video'));
  var heroOn = true;
  function play(v) { if (v.preload !== 'auto') v.preload = 'auto'; var p = v.play(); if (p && p.catch) p.catch(function () {}); }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { e.target._seen = e.isIntersecting; if (e.isIntersecting && heroOn && !document.hidden) play(e.target); else e.target.pause(); });
  }, { threshold: 0.15 });
  videos.forEach(function (v) { io.observe(v); });
  new IntersectionObserver(function (e) {
    heroOn = e[0].isIntersecting;
    root.classList.toggle('is-paused', !heroOn);
  }).observe(root);
  document.addEventListener('visibilitychange', function () {
    videos.forEach(function (v) { if (document.hidden) v.pause(); else if (v._seen && heroOn) play(v); });
  });
})();
