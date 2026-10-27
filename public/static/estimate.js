/* 마케팅팀 구독 견적 조합기 — 구독 페이지(#estimate)·홈 하단(#homeEstimate) 공용.
   마크업: src/routes/svc-subscription-estimate.ts(estimateSection) · 모양: /static/estimate.css · 접수: POST /api/mail/estimate
   방문 기록(GA4): estimate_view·estimate_edit {source}, estimate_submit {value, currency, item_count, capped, source} — source = subscription|home */
(function () {
  function track(name, params) { try { if (typeof window.gtag === 'function') window.gtag('event', name, params || {}); } catch (e) {} }
  function once(el, fn, t) {
    if (!el || !('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { io.unobserve(e.target); fn(e.target); } });
    }, { threshold: t || 0.2, rootMargin: '0px 0px -8% 0px' });
    io.observe(el);
  }

  // 견적 조합: 고른 항목 단품가 합계, 300만 원 이상이면 팀구독 300만 원. 초기진단·세팅은 무료로 들어간다.
  // 화면 표시용 계산이고, 메일·인트라넷에 찍히는 금액은 서버가 다시 계산한다(src/lib/subscription-estimate.ts).
  function init(estSec) {
    var form = estSec.querySelector('.mte-form'), source = form.dataset.source || '';
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
    var markEdit = function () { if (!edited) { edited = true; track('estimate_edit', { source: source }); } };
    boxes.forEach(function (b) { b.addEventListener('change', function () { update(); markEdit(); }); });
    q('[data-mte-all]').addEventListener('click', function () { checkAll(true); markEdit(); });
    q('[data-mte-clear]').addEventListener('click', function () { checkAll(false); markEdit(); });
    update();
    // 구획이 길어(휴대폰 2화면 남짓) 보이는 비율이 작으므로 낮은 기준으로 한 번만 센다
    once(estSec, function () { track('estimate_view', { source: source }); }, 0.1);

    var pv = q('[data-mte-privacy]'), panel = q('.mte-privacy-panel');
    pv.addEventListener('click', function () {
      panel.hidden = !panel.hidden;
      pv.setAttribute('aria-expanded', panel.hidden ? 'false' : 'true');
      pv.textContent = panel.hidden ? '내용 보기' : '닫기';
    });

    // 연락처 하이픈 자동은 사이트 공통(/static/main.js)이 모든 연락처 칸에 해 준다.

    var err = q('[data-mte-error]'), btn = form.querySelector('.mte-submit'), busy = false;
    function fail(msg) { err.textContent = msg; err.hidden = false; }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (busy) return;
      var fd = new FormData(form);
      var v = function (k) { return String(fd.get(k) || '').trim(); };
      var items = [];
      boxes.forEach(function (b) { if (b.checked) items.push(b.value); });
      var payload = { items: items, company: v('company'), name: v('name'), phone: v('phone'), email: v('email'), message: v('message'), privacy: !!fd.get('privacy'), source: source };
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
          track('estimate_submit', { value: total * 10000, currency: 'KRW', item_count: items.length, capped: total >= PACKAGE, source: source });
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
  }

  document.querySelectorAll('[data-estimate]').forEach(init);
})();
