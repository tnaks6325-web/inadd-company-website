(function(){

/* ─────────────────────────────────────────────
   0. HERO — 썸네일 대각선 플로우 (CSS animation 기반, JS 불필요)
───────────────────────────────────────────── */
// thumb-flow는 순수 CSS 애니메이션으로 동작 — JS 제어 없음

/* ─────────────────────────────────────────────
   2. STATS — 숫자 카운팅 + stagger fade-up
───────────────────────────────────────────── */
(function(){
  var statSection = document.querySelector('.stats-section');
  if(!statSection) return;
  var triggered = false;

  // 각 stat-block에 fade-up 클래스 추가
  var blocks = statSection.querySelectorAll('.stat-block');
  blocks.forEach(function(b, i){
    b.style.opacity = '0';
    b.style.transform = 'translateY(32px)';
    b.style.transition = 'opacity 0.6s cubic-bezier(0.16,1,0.3,1) '+(i*0.12)+'s, transform 0.6s cubic-bezier(0.16,1,0.3,1) '+(i*0.12)+'s';
  });

  function countUp(){
    if(triggered) return;
    var rect = statSection.getBoundingClientRect();
    if(rect.top > window.innerHeight - 100) return;
    triggered = true;

    // fade-up 실행
    blocks.forEach(function(b){
      b.style.opacity = '1';
      b.style.transform = 'translateY(0)';
    });

    // 숫자 카운팅
    var nums = statSection.querySelectorAll('.stat-num-big');
    nums.forEach(function(el){
      var target = parseInt(el.getAttribute('data-count') || '0', 10);
      var duration = 1800;
      var start = null;
      function step(ts){
        if(!start) start = ts;
        var prog = Math.min((ts - start) / duration, 1);
        var ease = 1 - Math.pow(1 - prog, 4); // easeOutQuart
        el.textContent = Math.floor(ease * target);
        if(prog < 1){
          requestAnimationFrame(step);
        } else {
          el.textContent = target;
        }
      }
      requestAnimationFrame(step);
    });
  }

  window.addEventListener('scroll', countUp, { passive: true });
  countUp();
})();

/* ─────────────────────────────────────────────
   3. HISTORY — 곡선 드로잉 + 노드 순차 등장
───────────────────────────────────────────── */
(function(){
  var histSection = document.querySelector('.history-section');
  if(!histSection) return;
  var triggered = false;

  // 노드들 초기 숨김
  var nodes = histSection.querySelectorAll('.hn-node');
  nodes.forEach(function(n){
    n.style.opacity = '0';
    n.style.transform = 'translateY(20px) scale(0.8)';
    n.style.transition = 'none';
  });

  // 곡선 경로 길이 측정
  var line = histSection.querySelector('.hist-curve-line');
  if(line){
    var len = line.getTotalLength ? line.getTotalLength() : 1800;
    line.style.strokeDasharray = len;
    line.style.strokeDashoffset = len;
    line.style.transition = 'none';
  }
  var glow = histSection.querySelector('.hist-curve-glow');
  if(glow){
    var glen = glow.getTotalLength ? glow.getTotalLength() : 1800;
    glow.style.strokeDasharray = glen;
    glow.style.strokeDashoffset = glen;
    glow.style.transition = 'none';
  }

  function runAnim(){
    if(triggered) return;
    var rect = histSection.getBoundingClientRect();
    if(rect.top > window.innerHeight - 80) return;
    triggered = true;

    // 곡선 드로잉
    if(line){
      line.style.transition = 'stroke-dashoffset 1.8s cubic-bezier(0.4,0,0.2,1)';
      line.style.strokeDashoffset = '0';
    }
    if(glow){
      glow.style.transition = 'stroke-dashoffset 1.8s cubic-bezier(0.4,0,0.2,1) 0.1s';
      glow.style.strokeDashoffset = '0';
    }

    // 노드 순차 등장 (곡선 드로잉과 함께)
    nodes.forEach(function(n, i){
      var delay = 0.3 + i * 0.18;
      setTimeout(function(){
        n.style.transition = 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.34,1.56,0.64,1)';
        n.style.opacity = '1';
        n.style.transform = 'translateY(0) scale(1)';
      }, delay * 1000);
    });
  }

  window.addEventListener('scroll', runAnim, { passive: true });
  runAnim();
})();

/* ─────────────────────────────────────────────
   4. 전체 섹션 스크롤 reveal (section-head 등)
───────────────────────────────────────────── */
(function(){
  var revealEls = document.querySelectorAll('.section-head, .hist-head, .testi-head');
  if(!('IntersectionObserver' in window)){
    revealEls.forEach(function(el){ el.style.opacity='1'; el.style.transform='none'; });
    return;
  }
  revealEls.forEach(function(el){
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)';
  });
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(function(el){ io.observe(el); });
})();

/* ─────────────────────────────────────────────
   5. HOME CTA — 스크롤 진입 이펙트 + 파티클
───────────────────────────────────────────── */
(function(){
  var cta = document.getElementById('homeCta');
  if(!cta) return;
  var triggered = false;

  // 진입 시 각 요소 visible 클래스 추가
  function revealCta(){
    if(triggered) return;
    var rect = cta.getBoundingClientRect();
    if(rect.top > window.innerHeight - 100) return;
    triggered = true;
    var els = cta.querySelectorAll('.hcta-badge, .hcta-line, .hcta-desc, .hcta-kpi, .hcta-btns');
    els.forEach(function(el){ el.classList.add('visible'); });
  }
  window.addEventListener('scroll', revealCta, { passive: true });
  revealCta();

  // CTA 파티클
  var canvas = document.getElementById('ctaParticle');
  if(!canvas) return;
  var ctx = canvas.getContext('2d');
  var W, H, pts = [];
  function resize(){ W = canvas.width = cta.offsetWidth; H = canvas.height = cta.offsetHeight; }
  resize();
  window.addEventListener('resize', resize);
  for(var i=0; i<50; i++){
    pts.push({
      x: Math.random()*1400, y: Math.random()*500,
      r: Math.random()*1.2+0.2,
      dx: (Math.random()-0.5)*0.25, dy: (Math.random()-0.5)*0.25,
      o: Math.random()*0.35+0.05
    });
  }
  function drawCta(){
    ctx.clearRect(0,0,W,H);
    pts.forEach(function(p){
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle='rgba(100,160,255,'+p.o+')';
      ctx.fill();
      p.x+=p.dx; p.y+=p.dy;
      if(p.x-0<0||p.x-W>0) p.dx*=-1;
      if(p.y-0<0||p.y-H>0) p.dy*=-1;
    });
    requestAnimationFrame(drawCta);
  }
  drawCta();
})();

/* ─────────────────────────────────────────────
   ADMIN DYNAMIC DATA — 관리자 데이터 동적 로딩
───────────────────────────────────────────── */
(function(){
  // 시드 기반 셔플 — 비트연산 없이 순수 나머지 연산만 사용
  function seededShuffle(arr, seed) {
    var a = arr.slice();
    for(var i = a.length - 1; i > 0; i--){
      seed = (seed * 1664525 + 1013904223) % 99999989;
      if(seed < 0) seed = -seed;
      var j = seed % (i + 1);
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }
  // 카드 HTML 생성
  function makeCards(ids) {
    return ids.map(function(id){
      return '<div class="thumb-card"><img src="https://img.youtube.com/vi/'+id+'/maxresdefault.jpg" alt="" loading="lazy"'+
        ' onerror="if(!this.dataset.fb){this.dataset.fb=\'1\';this.src=\'https://img.youtube.com/vi/'+id+'/hqdefault.jpg\';}else{this.parentNode.style.display=\'none\';}"'+
        ' onload="if(this.naturalWidth<=120){this.parentNode.style.display=\'none\';}"></div>';
    }).join('');
  }
  // 썸네일 행 채우기
  function fillThumbs(ids) {
    if(!ids || !ids.length) return;
    [0,1,2].forEach(function(ri){
      var row = document.getElementById('thumbRow'+ri);
      if(!row) return;
      // 행마다 다른 시드로 셔플 → 완전히 다른 순서
      var shuffled = seededShuffle(ids, ri * 31337 + 42);
      // 2배 복제 → translateX(-50%) 무한루프 끊김 없이
      var doubled = shuffled.concat(shuffled);
      row.innerHTML = makeCards(doubled);
    });
  }

  fetch('/api/admin/public/home')
    .then(function(r){ return r.json(); })
    .then(function(data){
      // ── 썸네일 채우기 ──
      if(data.videos && data.videos.length){
        fillThumbs(data.videos);
      }
      // ── 회사소개서 링크 교체 ──
      if(data.brochure){
        document.querySelectorAll('a[href*="drive.google.com"]').forEach(function(a){
          a.href = data.brochure;
        });
      }
      // ── KPI 수치 교체 ──
      if(data.stats){
        var s = data.stats;
        var nums = document.querySelectorAll('.stat-num-big');
        var map = [s.projects, s.contracts, s.experience, s.partners];
        nums.forEach(function(el, i){
          if(map[i] !== undefined){
            el.setAttribute('data-count', map[i]);
            el.textContent = '0';
          }
        });
      }
    })
    .catch(function(){});
})();

})(); // ── 최상위 IIFE 닫기 ──
