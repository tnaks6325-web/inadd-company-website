/* 인사이트 히어로(상단 좌우 전체, 한 번 재생 후 마지막 문구에서 멈춤 — 뒤 제목 줄만 아주 천천히 계속 흐른다)
   - 뒤 배경: 광고주 미팅 → PPT 브리핑 → 회의 → 교육 → 시장 분석 장면이 약 0.55초씩 빠르게 바뀐다(장면마다 살짝 다가감). 마지막 장면에서 멈춘다.
   - 그 위로 실제 글 제목(ishTitles)을 4줄로 나눠 캔버스에 그리고, 줄마다 서로 반대 방향으로 빠르게 흐르다가 약 3초 동안 느려진다. 숫자(47%, 2.4배 …)는 노랑.
   - 약 2.6초부터 배경이 흐려지고 가운데가 어두워지며, 'IN AD COMPANY INSIGHT'(자간이 좁혀지며) → 제목 두 줄(아래에서 올라옴) → 설명.
   1600x600 무대를 칸에 꽉 차게(cover) 키운다(--k·--x·--y). 히어로가 화면 밖이거나 탭이 숨겨지면 멈추고,
   '움직임 줄이기' 설정이면 마지막 화면으로 바로 그린다. window.ishSeek(t) 로 특정 순간을 고정해 볼 수 있다. */
(function () {
  var root = document.querySelector('[data-ish]');
  if (!root) return;
  function q(k) { return root.querySelector('[data-ish-' + k + ']'); }
  var rowsEl = q('rows'), glow = q('glow'), bg = q('bg'), type = root.querySelector('.ish-type');
  var scenes = Array.prototype.slice.call(root.querySelectorAll('[data-ish-sc]'));
  var lines = Array.prototype.slice.call(root.querySelectorAll('[data-ish-l]'));

  // 무대 배율: 칸을 빈틈없이 덮게. 무대가 많이 작아지면(휴대폰) 가운데 글자만 TS배(최대 1.4) 키운다
  var TS = 1;
  function fit() {
    var w = root.clientWidth, h = root.clientHeight, k = Math.max(w / 1600, h / 600);
    root.style.setProperty('--k', k.toFixed(5));
    root.style.setProperty('--x', ((w - 1600 * k) / 2).toFixed(1) + 'px');
    root.style.setProperty('--y', ((h - 600 * k) / 2).toFixed(1) + 'px');
    TS = Math.min(1.4, Math.max(1, 0.42 / k));
    root.classList.toggle('is-small', TS > 1);
  }

  // 글 제목 줄 만들기: '—' 앞부분만, 숫자+단위는 <em>(남색)
  var titles = [];
  try { titles = JSON.parse(document.getElementById('ishTitles').textContent) || []; } catch (e) {}
  titles = titles.map(function (t) { return String(t).split(' — ')[0].trim(); }).filter(Boolean);
  if (!titles.length) return;
  // 숫자+단위(47%, 2.4배, 3만 원 …)는 남색으로 나눠 그린다
  function parts(s) {
    var out = [], re = /(\d[\d,.]*\s?(?:%|배|곳|개|가지|만 원|원|일|건|종))/g, last = 0, m;
    while ((m = re.exec(s))) { if (m.index > last) out.push([s.slice(last, m.index), 0]); out.push([m[1], 1]); last = m.index + m[1].length; }
    if (last < s.length) out.push([s.slice(last), 0]);
    return out;
  }
  // 흐르는 줄은 캔버스 한 장에 그린다(아주 긴 글자 줄을 통째로 움직이면 브라우저가 겹쳐 그리는 일이 있어서)
  var cv = document.createElement('canvas'), cx = cv.getContext('2d');
  cv.className = 'ish-cv'; rowsEl.appendChild(cv);
  var ROWS = 4, SPEED = [80, 105, 70, 95], FS = 50, GAP = 48;   // 줄마다 기본 속도(px/초) — 짝수 줄은 왼쪽, 홀수 줄은 오른쪽으로 / 글자 크기 / 제목 사이 간격
  var FONT = '700 ' + FS + 'px Pretendard, -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Noto Sans KR", sans-serif';
  var rows = [];
  for (var r = 0; r < ROWS; r++) {
    var mine = titles.filter(function (_, i) { return i % ROWS === r; });
    if (!mine.length) mine = [titles[r % titles.length]];
    rows.push({ items: mine.map(parts), dir: r % 2 ? 1 : -1, v: SPEED[r], x: -((r * 397) % 900), w: 0, y: 78 + r * 148 });
  }
  var PR = 1;   // 캔버스 한 칸 = 무대 1px 의 몇 배(화면 배율 × 기기 배율, 최대 2.5)
  function measure() {
    cx.font = FONT;
    rows.forEach(function (o) {
      o.w = 0;
      o.items.forEach(function (it) { it.forEach(function (p) { p[2] = cx.measureText(p[0]).width; o.w += p[2]; }); o.w += GAP * 2; });
    });
  }
  function size() {
    var k = parseFloat(root.style.getPropertyValue('--k')) || 1;
    PR = Math.min(2.5, k * (window.devicePixelRatio || 1));
    cv.width = Math.round(1600 * PR); cv.height = Math.round(600 * PR);
  }
  fit(); size(); measure();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { measure(); render(t, 0); });   // 글꼴이 늦게 오면 폭이 바뀌므로 다시 잰다
  window.addEventListener('resize', function () { fit(); size(); render(t, 0); });

  // 시각표(초)
  var SC = [0, 0.55, 1.1, 1.65, 2.2];   // 장면마다 시작하는 때
  var SLOW = [0, 3.2], GLOW = [2.6, 3.3], LINE = [2.85, 3.05, 3.2, 3.55], END = 4.3;

  function clamp(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
  function seg(l, r) { return clamp((l - r[0]) / (r[1] - r[0])); }
  function ease(x) { return 1 - Math.pow(1 - x, 3); }

  function render(l, dt) {
    // 흐르는 줄: 처음 2.4배 → 3.2초 동안 0.22배까지 느려진다(그 뒤로도 아주 천천히)
    var f = 0.22 + 2.18 * (1 - ease(seg(l, SLOW))), dim = ease(seg(l, GLOW));
    var a = 0.26 - 0.12 * dim;
    // 뒤 배경 장면: 다음 장면이 0.1초 만에 앞 장면을 덮고, 장면마다 1.06배에서 1배로 살짝 다가간다
    var cur = 0;
    for (var i = 0; i < SC.length; i++) if (l >= SC[i]) cur = i;
    scenes.forEach(function (e, i) {
      var shown = i === cur || (i === cur - 1 && l < SC[cur] + 0.1);
      e.style.opacity = shown ? (i === cur && i > 0 ? seg(l, [SC[i], SC[i] + 0.1]) : 1).toFixed(3) : '0';
      e.style.zIndex = i;
      if (shown) e.style.transform = 'scale(' + (1.06 - 0.06 * ease(seg(l, [SC[i], SC[i] + 1.2]))).toFixed(4) + ')';
    });
    bg.style.filter = dim > 0.01 ? 'blur(' + (dim * 6).toFixed(2) + 'px)' : 'none';
    cx.setTransform(PR, 0, 0, PR, 0, 0); cx.clearRect(0, 0, 1600, 600);
    cx.font = FONT; cx.textBaseline = 'middle';
    rows.forEach(function (o) {
      o.x += o.dir * o.v * f * dt;
      if (o.w) { o.x %= o.w; if (o.x > 0) o.x -= o.w; }
      for (var x0 = o.x; x0 < 1600; x0 += o.w) {
        var x = x0;
        o.items.forEach(function (it) {
          it.forEach(function (p) {
            if (x + p[2] > 0 && x < 1600) { cx.fillStyle = p[1] ? 'rgba(251,240,207,' + Math.min(1, a * 2.8).toFixed(3) + ')' : 'rgba(255,255,255,' + a.toFixed(3) + ')'; cx.fillText(p[0], x, o.y); }
            x += p[2];
          });
          cx.fillStyle = 'rgba(217,197,154,' + Math.min(1, a * 2).toFixed(3) + ')';   // 제목 사이 작은 네모(버터 브라운)
          cx.fillRect(x + GAP - 6, o.y - 6, 12, 12);
          x += GAP * 2;
        });
        if (!o.w) break;
      }
    });
    glow.style.opacity = dim.toFixed(3);
    lines.forEach(function (e, i) {
      var p = ease(seg(l, [LINE[i], LINE[i] + (i === 0 || i === 3 ? 0.5 : 0.55)]));
      if (i === 0) { e.style.opacity = p.toFixed(3); e.style.letterSpacing = (0.62 - 0.2 * p).toFixed(3) + 'em'; }
      else if (i === 3) { e.style.opacity = p.toFixed(3); e.style.transform = 'translateY(' + ((1 - p) * 12).toFixed(1) + 'px)'; }
      else e.style.transform = 'translateY(' + ((1 - p) * 105).toFixed(1) + '%)';
    });
    type.style.transform = 'translate(-50%,-50%) scale(' + (TS * (1 - 0.05 * (1 - ease(seg(l, [LINE[1], LINE[3] + 0.6]))))).toFixed(4) + ')';
  }

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var t = 0, prev = 0, on = true, held = false;
  window.ishSeek = function (s) { held = true; rows.forEach(function (o, r) { o.x = -((r * 397) % 900) + o.dir * o.v * 2.4 * s; }); t = s; render(t, 0); };
  window.ishTimes = { SC: SC, SLOW: SLOW, GLOW: GLOW, LINE: LINE, END: END };
  if (reduce) { t = END; render(t, 0); return; }
  if ('IntersectionObserver' in window) new IntersectionObserver(function (e) { on = e[0].isIntersecting; }).observe(root);
  // 첫 장면 사진이 준비된 뒤에 시작한다(늦게 뜨면 첫 장면을 못 보고 지나가므로). 1.5초가 지나면 그냥 시작
  var ready = false;
  function go() { ready = true; }
  if (scenes[0] && scenes[0].decode) scenes[0].decode().then(go, go); else go();
  setTimeout(go, 1500);
  function frame(now) {
    var dt = prev ? Math.min(0.1, (now - prev) / 1000) : 0; prev = now;
    if (held || !ready || !on || document.hidden) dt = 0;
    t = Math.min(END, t + dt);
    render(t, dt);   // 문구는 END 에서 멈추고, 뒤 줄은 느린 속도로 계속 흐른다
    requestAnimationFrame(frame);
  }
  render(0, 0);
  requestAnimationFrame(frame);
})();
