(() => {
  const root = document.getElementById('motionStudy');
  if (!root) return;
  const hero = root.querySelector('.ms-hero');
  const photoWindow = root.querySelector('.ms-photo-window');
  const answer = root.querySelector('.ms-answer');
  const pause = root.querySelector('[data-pause]');
  const label = root.querySelector('[data-playback-label]');
  const modes = [...document.querySelectorAll('[data-mode]')].filter(el => el.tagName === 'BUTTON');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  let manualPaused = false;
  let visible = true;
  let pointer = 0;
  let frame = 0;
  function sync() {
    const still = root.dataset.mode === 'still' || reduced.matches;
    const active = !still && !manualPaused && !document.hidden;
    const playing = active && visible;
    root.classList.toggle('is-active', active);
    root.classList.toggle('is-playing', playing);
    pause.disabled = still;
    pause.setAttribute('aria-pressed', String(!playing));
    pause.setAttribute('aria-label', playing ? '모션 일시정지' : '모션 재생');
    label.textContent = reduced.matches ? '동작 줄이기 적용' : still ? '정지 화면' : manualPaused ? '모션 일시정지' : '모션 재생 중';
    if (still) { root.style.setProperty('--pointer-x', '0px'); root.style.setProperty('--image-y', '0px'); }
    if (!playing) { cancelAnimationFrame(frame); frame = 0; }
    else schedule();
  }
  function update() {
    frame = 0;
    if (!root.classList.contains('is-playing')) return;
    const r = hero.getBoundingClientRect();
    const overscan = Math.max(0, photoWindow.getBoundingClientRect().height * .0275 - 2);
    const shift = Math.min(24, overscan, Math.max(0, -r.top * .06));
    root.style.setProperty('--pointer-x', `${pointer}px`);
    root.style.setProperty('--image-y', `${shift}px`);
  }
  function schedule() { if (!frame && root.classList.contains('is-playing')) frame = requestAnimationFrame(update); }
  hero.addEventListener('pointermove', event => {
    if (!finePointer.matches) return;
    const r = hero.getBoundingClientRect();
    pointer = ((event.clientX - r.left) / r.width - .5) * 12;
    schedule();
  });
  hero.addEventListener('pointerleave', () => { pointer = 0; schedule(); });
  window.addEventListener('scroll', schedule, { passive: true });
  pause.addEventListener('click', () => { manualPaused = !manualPaused; sync(); });
  modes.forEach(button => button.addEventListener('click', () => {
    root.dataset.mode = button.dataset.mode;
    modes.forEach(other => other.setAttribute('aria-pressed', String(other === button)));
    manualPaused = false;
    sync();
    schedule();
  }));
  document.addEventListener('visibilitychange', sync);
  reduced.addEventListener('change', sync);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => { visible = entries[0].isIntersecting; sync(); }, { threshold: 0 }).observe(hero);
    const reveal = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) { answer.classList.add('is-in'); reveal.disconnect(); }
    }, { threshold: .25 });
    reveal.observe(answer);
  } else { answer.classList.add('is-in'); }
  root.classList.add('ms-ready');
  sync();
})();
