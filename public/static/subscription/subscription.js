/* 마케팅팀 구독 상세페이지 효과 — 시안(Claude Design '종합 마케팅 구독 상세페이지 A 채용고민형')의 효과 스크립트를 옮김.
   1) 860px 페이지를 화면 폭에 맞춰 축소  2) 하단 고정 '무료 상담 신청' 버튼  5) 성과 레퍼런스 탭·막대
   3) 구간 등장·화살표 그리기·숫자 올라가기·비교 막대·비용 더미·보고 목록 효과
   4) 상담 신청 버튼 → 전역 문의 팝업(main.js)에 '마케팅팀 구독' 관심 서비스를 미리 체크
   6) 견적 조합(#estimate): 합계 계산·상담 신청 접수
   7) 방문 기록(GA4 이벤트): 어디서 어떤 버튼을 눌렀는지, 조합기를 봤는지·바꿨는지·신청했는지 */
(function () {
  var page = document.getElementById('mtsPage');
  if (!page) return;
  var root = document.documentElement;

  function fit() { root.style.setProperty('--mts-zoom', Math.min(1, root.clientWidth / 860)); }
  fit();
  window.addEventListener('resize', fit, { passive: true });

  // 상담 버튼: main.js 가 /contact 클릭을 가로채 팝업을 열면서 폼을 초기화하므로, 그 뒤에 체크한다
  page.querySelectorAll('[data-mts-cta]').forEach(function (a) {
    a.addEventListener('click', function () {
      setTimeout(function () {
        var chip = document.querySelector('#cmForm input[name="service"][value="마케팅팀 구독"]');
        if (chip) chip.checked = true;
      }, 0);
    });
  });

  function once(el, fn, t) {
    if (!el) return;
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { io.unobserve(e.target); fn(e.target); } });
    }, { threshold: t || 0.2, rootMargin: '0px 0px -8% 0px' });
    io.observe(el);
  }

  // 하단 고정 버튼: 첫 비교 구간을 지나면 보이고, 마지막 상담 구간에 닿으면 숨김
  var sticky = page.querySelector('[data-sticky]');
  var ctaBox = page.querySelector('section[data-screen-label="08 상담"] a[data-mts-cta]');
  var heroBand = page.querySelector('section[data-screen-label="01 히어로 비교"]');
  var estSec = page.querySelector('[data-estimate]');
  function onScroll() {
    if (!sticky) return;
    var passed = heroBand && heroBand.getBoundingClientRect().bottom < 0;
    var atCta = ctaBox && ctaBox.getBoundingClientRect().top < window.innerHeight;
    // 견적 조합 구획에서는 그 구획의 합계 막대가 아래에 붙으므로 고정 버튼을 숨긴다
    var er = estSec && estSec.getBoundingClientRect();
    var atEst = er && er.top < window.innerHeight && er.bottom > 0;
    var show = passed && !atCta && !atEst;
    sticky.style.opacity = show ? '1' : '0';
    sticky.style.transform = show ? 'translate(-50%,0)' : 'translate(-50%,160%)';
    sticky.style.pointerEvents = show ? 'auto' : 'none';
  }
  document.addEventListener('scroll', onScroll, { passive: true, capture: true });
  onScroll();

  // 방문 기록(GA4) — 견적 조합기 위치 효과를 숫자로 보기 위함(대표 요청 2026-10-27)
  // estimate_cta_click·consult_cta_click {position: hero|sticky|final}, estimate_view, estimate_edit, estimate_submit {value, currency, item_count, capped}
  function track(name, params) { try { if (typeof window.gtag === 'function') window.gtag('event', name, params || {}); } catch (e) {} }
  page.querySelectorAll('[data-mts-pos]').forEach(function (a) {
    a.addEventListener('click', function () {
      track(a.getAttribute('href') === '#estimate' ? 'estimate_cta_click' : 'consult_cta_click', { position: a.dataset.mtsPos });
    });
  });

  // 견적 조합: 고른 항목 단품가 합계, 300만 원 이상이면 팀구독 300만 원. 초기진단·세팅은 무료로 들어간다.
  // 화면 표시용 계산이고, 메일·인트라넷에 찍히는 금액은 서버가 다시 계산한다(src/lib/subscription-estimate.ts).
  if (estSec) (function () {
    var form = estSec.querySelector('#mteForm');
    var done = estSec.querySelector('[data-mte-done]');
    var boxes = estSec.querySelectorAll('input[name="item"]');
    var PACKAGE = Number(form.dataset.package), FREE = Number(form.dataset.free);
    var q = function (s) { return estSec.querySelector(s); };
    var won = function (n) { return n.toLocaleString('ko-KR'); };
    var checkAll = function (on) { boxes.forEach(function (b) { b.checked = on; }); update(); };

    function update() {
      var n = 0, sub = 0;
      boxes.forEach(function (b) { if (b.checked) { n++; sub += Number(b.dataset.price); } });
      var capped = sub >= PACKAGE, total = capped ? PACKAGE : sub, list = n ? sub + FREE : 0;
      q('[data-mte-count]').textContent = n;
      var ls = q('[data-mte-list]');
      ls.textContent = won(list) + '만 원';
      ls.className = list > total ? '' : 'is-plain';
      q('[data-mte-total]').textContent = won(total);
      var note = q('[data-mte-note]');
      note.className = 'mte-bar-note' + (capped ? ' is-hot' : '');
      if (!n) note.textContent = '항목을 골라 주세요.';
      else if (capped) {
        note.textContent = '팀구독 적용 · 10가지가 다 들어가요';
        if (n < boxes.length) {
          var b = document.createElement('button');
          b.type = 'button'; b.textContent = '전부 담기';
          b.addEventListener('click', function () { checkAll(true); });
          note.appendChild(b);
        }
      } else note.textContent = won(PACKAGE - sub) + '만 원 더 담으면 팀구독 금액이에요';
    }
    var edited = false;
    var markEdit = function () { if (!edited) { edited = true; track('estimate_edit'); } };
    boxes.forEach(function (b) { b.addEventListener('change', function () { update(); markEdit(); }); });
    q('[data-mte-all]').addEventListener('click', function () { checkAll(true); markEdit(); });
    q('[data-mte-clear]').addEventListener('click', function () { checkAll(false); markEdit(); });
    update();
    // 구획이 길어(휴대폰 2화면 남짓) 보이는 비율이 작으므로 낮은 기준으로 한 번만 센다
    once(estSec, function () { track('estimate_view'); }, 0.1);

    var pv = q('[data-mte-privacy]'), panel = q('#mtePrivacy');
    pv.addEventListener('click', function () {
      panel.hidden = !panel.hidden;
      pv.setAttribute('aria-expanded', panel.hidden ? 'false' : 'true');
      pv.textContent = panel.hidden ? '내용 보기' : '닫기';
    });

    var err = q('[data-mte-error]'), btn = form.querySelector('.mte-submit'), busy = false;
    function fail(msg) { err.textContent = msg; err.hidden = false; }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (busy) return;
      var fd = new FormData(form);
      var v = function (k) { return String(fd.get(k) || '').trim(); };
      var items = [];
      boxes.forEach(function (b) { if (b.checked) items.push(b.value); });
      var payload = { items: items, company: v('company'), name: v('name'), phone: v('phone'), email: v('email'), message: v('message'), privacy: !!fd.get('privacy') };
      if (!items.length) return fail('항목을 하나 이상 골라 주세요.');
      if (!payload.company || !payload.name || !payload.phone || !payload.email) return fail('별표(*) 칸을 모두 채워 주세요.');
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) return fail('이메일 주소를 확인해 주세요.');
      if (!payload.privacy) return fail('개인정보 수집 및 이용에 동의해 주세요.');
      err.hidden = true; busy = true; btn.disabled = true; btn.textContent = '접수 중...';
      fetch('/api/mail/estimate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
        .then(function (res) {
          return res.json().catch(function () { return {}; }).then(function (j) {
            if (!res.ok || !j.ok) throw new Error(res.status === 400 || res.status === 429 ? (j.error || '') : '');
            return j;
          });
        })
        .then(function (j) {
          var total = Number(j.total) || 0;
          track('estimate_submit', { value: total * 10000, currency: 'KRW', item_count: items.length, capped: total >= PACKAGE });
          form.hidden = true;
          q('[data-mte-done-email]').textContent = payload.email;
          done.hidden = false;
          done.scrollIntoView({ block: 'center', behavior: 'smooth' });
        })
        .catch(function (x) {
          busy = false; btn.disabled = false; btn.textContent = '이 조합으로 상담 신청';
          fail((x && x.message) || '접수 중 오류가 났어요. 잠시 뒤 다시 시도하거나 010-9186-9944로 전화 주세요.');
        });
    });
  })();

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 성과 레퍼런스: 탭을 누르면 그 카드로 바꾸고 막대를 아래부터 다시 키움.
  // 화면에 보이기 시작하면 4.5초마다 다음 탭으로 넘어가고, 사용자가 탭을 누르면 자동 넘김을 멈춤
  var ref = page.querySelector('[data-ref]');
  if (ref) {
    var tabs = ref.querySelectorAll('[data-ref-tab]'), panels = ref.querySelectorAll('[data-ref-panel]');
    var refIdx = 0, refStop = false;
    // 막대를 접고 개선 값(오른쪽 숫자)을 숨겨 둔다
    var collapse = function (panel) {
      panel.querySelectorAll('[data-ref-bar]').forEach(function (b) { b.style.transition = 'none'; b.style.transform = 'scaleY(0)'; });
      var after = panel.querySelector('[data-ref-after]');
      if (after) { after.style.transition = 'none'; after.style.opacity = '0'; after.style.transform = 'scale(0.6)'; after.style.backgroundSize = '0% 40%'; }
    };
    // 막대가 다 자란 뒤 개선 값이 튀어나오고 형광펜 밑줄이 그어진다
    var grow = function (panel) {
      if (reduced) return;
      collapse(panel);
      var bs = panel.querySelectorAll('[data-ref-bar]'), after = panel.querySelector('[data-ref-after]');
      setTimeout(function () {
        bs.forEach(function (b, i) {
          b.style.transition = 'transform ' + (i ? 1.5 : 1.3) + 's cubic-bezier(0.7,0,0.2,1)'; b.style.transform = 'scaleY(1)';
        });
      }, 60);
      if (after) setTimeout(function () {
        after.style.transition = 'opacity 0.2s ease, transform 0.5s cubic-bezier(0.34,1.9,0.64,1), background-size 0.45s ease 0.35s';
        after.style.opacity = '1'; after.style.transform = 'none'; after.style.backgroundSize = '100% 40%';
      }, 1500);
    };
    var showRef = function (j) {
      refIdx = j;
      tabs.forEach(function (t, k) {
        var on = k === j;
        t.style.fontWeight = on ? '800' : '600';
        t.style.color = on ? '#21306F' : '#111318';
        t.style.boxShadow = 'inset 0 -4px 0 ' + (on ? '#21306F' : 'transparent');
        t.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      panels.forEach(function (p, k) { p.style.display = k === j ? '' : 'none'; });
      grow(panels[j]);
    };
    tabs.forEach(function (t, k) {
      t.addEventListener('click', function () { refStop = true; showRef(k); });
    });
    if (!reduced) {
      collapse(panels[0]);
      // 구획 전체는 짧은 화면보다 길 수 있으므로 첫 카드의 막대 영역(300px)이 보이는지로 판단하고,
      // 자동 넘김 타이머도 그때부터 센다(첫 카드가 온전히 4.5초 보이도록 — 개선 값 강조가 2초쯤 끝나고 읽을 시간)
      once(panels[0].querySelector('[data-ref-bar]').parentElement.parentElement, function () {
        if (refStop) return;
        showRef(refIdx);
        setInterval(function () { if (!refStop) showRef((refIdx + 1) % panels.length); }, 4500);
      }, 0.4);
    }
  }

  if (reduced) return;
  var ease = 'cubic-bezier(0.2,0.7,0.2,1)', pop = 'cubic-bezier(0.34,1.56,0.64,1)';

  page.querySelectorAll('section[data-screen-label]').forEach(function (sec) {
    if (sec.dataset.screenLabel === '01 히어로') return;
    Array.prototype.forEach.call(sec.children, function (ch) {
      ch.style.opacity = '0'; ch.style.transform = 'translateY(40px)';
      ch.style.transition = 'opacity 0.7s ' + ease + ', transform 0.7s ' + ease;
      once(ch, function (el) { el.style.opacity = '1'; el.style.transform = 'none'; }, 0.08);
    });
  });

  var svg = page.querySelector('section[data-screen-label="01 히어로"] svg');
  if (svg) {
    var ps = svg.querySelectorAll('path'), p1 = ps[0], p2 = ps[1];
    var L = p1.getTotalLength();
    p1.style.strokeDasharray = L; p1.style.strokeDashoffset = L; p2.style.opacity = '0';
    p1.getBoundingClientRect();
    setTimeout(function () {
      p1.style.transition = 'stroke-dashoffset 1.4s cubic-bezier(0.6,0,0.3,1)'; p1.style.strokeDashoffset = '0';
      setTimeout(function () { p2.style.transition = 'opacity 0.2s'; p2.style.opacity = '1'; }, 1350);
    }, 500);
  }

  // 사이트 공통 스크립트(main.js)도 [data-count] 를 정수로 세므로 겹치지 않게 data-mts-count 를 쓴다(소수점 유지)
  page.querySelectorAll('[data-mts-count]').forEach(function (el) {
    var raw = el.dataset.mtsCount, target = parseFloat(raw), dec = (raw.split('.')[1] || '').length;
    var fmt = function (v) { return dec ? v.toFixed(dec) : Math.round(v).toLocaleString('ko-KR'); };
    el.textContent = fmt(0);
    once(el, function () {
      var t0 = performance.now(), D = 1200;
      var step = function (now) {
        var k = Math.min(1, (now - t0) / D);
        el.textContent = fmt(target * (1 - Math.pow(1 - k, 3)));
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, 0.6);
  });

  // 채용·구독 비교 막대 (시안에서 width:88% 인 막대)
  var bars = Array.prototype.filter.call(page.querySelectorAll('div'), function (d) { return d.style.width === '88%'; })
    .map(function (b, i) {
      var sib = b.nextElementSibling;
      b.style.overflow = 'hidden'; b.style.whiteSpace = 'nowrap'; b.style.width = '0%';
      b.style.transition = 'width 1.1s ' + ease + ' ' + (i * 0.25) + 's';
      if (sib) { sib.style.opacity = '0'; sib.style.transition = 'opacity 0.5s ease 1.1s'; }
      return { b: b, sib: sib, done: false };
    });
  function checkBars() {
    bars.forEach(function (o) {
      if (o.done) return;
      var r = o.b.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.85 && r.bottom > 0) {
        o.done = true;
        requestAnimationFrame(function () { o.b.style.width = '88%'; if (o.sib) o.sib.style.opacity = '1'; });
      }
    });
  }
  document.addEventListener('scroll', checkBars, { passive: true, capture: true });
  var barTimer = setInterval(function () {
    checkBars();
    if (bars.every(function (o) { return o.done; })) clearInterval(barTimer);
  }, 300);

  // 채용 비용 7가지가 아래부터 하나씩 튀어나옴
  var pileImg = page.querySelector('img[data-mts-pile]');
  if (pileImg) {
    var items = Array.prototype.filter.call(pileImg.parentElement.children, function (c) { return c.tagName === 'DIV'; });
    var order = items.slice(0, 7).reverse().concat(items.slice(7));
    order.forEach(function (c) { c.style.opacity = '0'; c.style.transform = 'scale(0.7)'; });
    once(pileImg.parentElement, function () {
      order.forEach(function (c, i) {
        setTimeout(function () {
          c.style.transition = 'opacity 0.3s ease, transform 0.45s ' + pop; c.style.opacity = '1'; c.style.transform = 'none';
        }, 300 + i * 260);
      });
    }, 0.3);
  }

  // 주간 보고 목록이 하나씩 체크되고 말풍선이 튀어나옴
  var rows = Array.prototype.map.call(page.querySelectorAll('svg path[d="M3 8.5 L6.5 12 L13 4.5"]'), function (p) {
    return p.closest('svg').parentElement.parentElement;
  });
  var bubble = page.querySelector('[data-pop]');
  if (bubble) { bubble.style.opacity = '0'; bubble.style.transform = 'scale(0.3)'; bubble.style.transformOrigin = '85% 120%'; }
  rows.forEach(function (r) { r.style.opacity = '0.25'; });
  if (rows.length) once(rows[0], function () {
    rows.forEach(function (r, i) {
      setTimeout(function () {
        r.style.transition = 'opacity 0.3s ease'; r.style.opacity = '1';
        var c = r.firstElementChild; c.style.transition = 'transform 0.35s ' + pop; c.style.transform = 'scale(1.3)';
        setTimeout(function () { c.style.transform = 'none'; }, 220);
      }, 300 + i * 380);
    });
    if (bubble) setTimeout(function () {
      bubble.style.transition = 'opacity 0.2s ease, transform 0.5s cubic-bezier(0.34,1.9,0.64,1)'; bubble.style.opacity = '1'; bubble.style.transform = 'none';
    }, 300 + rows.length * 380 + 150);
  }, 0.5);
})();
