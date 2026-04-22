// ── 인증 확인 ──
const token = localStorage.getItem('admin_token');
if (!token) { window.location.href = '/admin/login'; }

async function api(method, path, body) {
  const res = await fetch('/api/admin' + path, {
    method,
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
    body: body ? JSON.stringify(body) : undefined
  });
  if (res.status === 401) { localStorage.removeItem('admin_token'); window.location.href = '/admin/login'; }
  return res.json();
}

function showToast(msg, type) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast' + (type === 'error' ? ' error' : '');
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

// ── 로그아웃 ──
document.getElementById('btnLogout').addEventListener('click', () => {
  localStorage.removeItem('admin_token');
  window.location.href = '/admin/login';
});

// ── 섹션 전환 ──
const sectionTitles = { home:'홈 관리', about:'About 관리', works:'Works 관리', insight:'Insight 관리', marketing:'Marketing 성과 관리', contact:'Contact 관리' };
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    item.classList.add('active');
    const sec = item.dataset.section;
    document.getElementById('section-' + sec).classList.add('active');
    document.getElementById('sectionTitle').textContent = sectionTitles[sec];
    loadSection(sec);
  });
});

// ═══════════════ HOME ═══════════════
let homeVideos = [];

// 영상 메모 — 로컬스토리지에만 저장 (관리자 전용)
const VIDEO_MEMO_KEY = 'inadmin_video_memos';
function loadVideoMemos() {
  try { return JSON.parse(localStorage.getItem(VIDEO_MEMO_KEY) || '{}'); } catch(e) { return {}; }
}
function saveVideoMemo(idx, text) {
  const memos = loadVideoMemos();
  if (text.trim()) memos[idx] = text;
  else delete memos[idx];
  localStorage.setItem(VIDEO_MEMO_KEY, JSON.stringify(memos));
}
// 영상 추가/삭제 시 메모 인덱스 재정렬
function shiftVideoMemos(removedIdx) {
  const memos = loadVideoMemos();
  const newMemos = {};
  Object.keys(memos).forEach(k => {
    const n = parseInt(k);
    if (n < removedIdx) newMemos[n] = memos[k];
    else if (n > removedIdx) newMemos[n - 1] = memos[k];
    // removedIdx는 삭제
  });
  localStorage.setItem(VIDEO_MEMO_KEY, JSON.stringify(newMemos));
}

async function loadHome() {
  const data = await api('GET', '/home');
  homeVideos = data.videos || [];
  document.getElementById('brochureUrl').value = data.brochure || '';
  const s = data.stats || {};
  document.getElementById('statProjects').value = s.projects || '';
  document.getElementById('statContracts').value = s.contracts || '';
  document.getElementById('statExperience').value = s.experience || '';
  document.getElementById('statPartners').value = s.partners || '';
  document.getElementById('slideInterval').value = data.interval || 7;
  renderVideoList();
}

// YouTube 링크에서 ID 추출
function extractYouTubeId(input) {
  if (!input) return '';
  input = input.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(input)) return input;
  var m = input.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (m) return m[1];
  m = input.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (m) return m[1];
  m = input.match(/embed\/([a-zA-Z0-9_-]{11})/);
  if (m) return m[1];
  m = input.match(/shorts\/([a-zA-Z0-9_-]{11})/);
  if (m) return m[1];
  return input;
}

function renderVideoList() {
  const list = document.getElementById('videoList');
  if (!list) return;
  const memos = loadVideoMemos();
  list.innerHTML = homeVideos.map((v, i) => {
    const preview = v
      ? `<a class="yt-preview" href="https://youtu.be/${v}" target="_blank" title="영상 미리보기"><i class="fab fa-youtube"></i></a>`
      : `<span class="yt-preview" style="opacity:.3"><i class="fab fa-youtube"></i></span>`;
    const memo = (memos[i] || '').replace(/"/g, '&quot;');
    return `<div class="video-item" data-index="${i}">
      <div class="video-item-inner">
        <input class="video-memo-input" type="text" value="${memo}" data-memo="${i}"
          placeholder="📝 채널명·영상 설명 메모 (관리자만 표시)">
        <div class="video-item-row">
          <span class="idx">${i+1}</span>
          <input type="text" value="${v}" data-idx="${i}"
            placeholder="YouTube 링크 또는 영상 ID 붙여넣기">
          ${preview}
          <button class="btn-remove" data-remove="${i}" title="삭제"><i class="fas fa-times"></i></button>
        </div>
      </div>
    </div>`;
  }).join('');

  // 이벤트 바인딩
  list.querySelectorAll('input[data-idx]').forEach(input => {
    const i = parseInt(input.dataset.idx);
    input.addEventListener('input', () => { homeVideos[i] = input.value; });
    input.addEventListener('paste', (e) => handleVideoPaste(e, i, input));
  });
  list.querySelectorAll('[data-remove]').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.remove);
      shiftVideoMemos(idx);
      homeVideos.splice(idx, 1);
      renderVideoList();
    });
  });
  // 메모 입력 바인딩 — blur 시 저장
  list.querySelectorAll('input[data-memo]').forEach(input => {
    const i = parseInt(input.dataset.memo);
    input.addEventListener('blur', () => saveVideoMemo(i, input.value));
    input.addEventListener('keydown', (e) => { if(e.key === 'Enter') input.blur(); });
  });
}
function handleVideoPaste(e, i, input) {
  setTimeout(() => {
    const id = extractYouTubeId(input.value);
    homeVideos[i] = id;
    input.value = id;
    renderVideoList();
    if (id) showToast('✅ YouTube ID 추출 완료: ' + id);
  }, 50);
}

document.getElementById('btnAddVideo').addEventListener('click', () => {
  homeVideos.push('');
  renderVideoList();
  const inputs = document.querySelectorAll('#videoList .video-item input');
  if (inputs.length) inputs[inputs.length - 1].focus();
});

document.getElementById('btnSaveVideos').addEventListener('click', async () => {
  const cleaned = homeVideos.map(v => extractYouTubeId(v)).filter(v => v.trim());
  homeVideos = cleaned;
  await api('PUT', '/home', { videos: cleaned });
  renderVideoList();
  showToast('영상 링크가 저장되었습니다.');
});

document.getElementById('btnSaveInterval').addEventListener('click', async () => {
  const raw = parseInt(document.getElementById('slideInterval').value, 10);
  const sec = Math.max(1, Math.min(30, isNaN(raw) ? 7 : raw));
  document.getElementById('slideInterval').value = sec;
  await api('PUT', '/home', { interval: sec });
  showToast(`슬라이드 전환 간격이 ${sec}초로 저장되었습니다.`);
});

document.getElementById('btnSaveBrochure').addEventListener('click', async () => {
  await api('PUT', '/home', { brochure: document.getElementById('brochureUrl').value });
  showToast('회사소개서 링크가 저장되었습니다.');
});

document.getElementById('btnSaveStats').addEventListener('click', async () => {
  await api('PUT', '/home', { stats: {
    projects: +document.getElementById('statProjects').value,
    contracts: +document.getElementById('statContracts').value,
    experience: +document.getElementById('statExperience').value,
    partners: +document.getElementById('statPartners').value,
  }});
  showToast('KPI 수치가 저장되었습니다.');
});

// ═══════════════ ABOUT ═══════════════
let aboutLogos = [];
let currentAddrLat = '';
let currentAddrLng = '';

async function loadAbout() {
  const data = await api('GET', '/about');
  const addr = data.address || '';
  document.getElementById('aboutAddress').value = addr;
  currentAddrLat = data.lat || '';
  currentAddrLng = data.lng || '';
  document.getElementById('aboutLat').value = currentAddrLat;
  document.getElementById('aboutLng').value = currentAddrLng;
  // 저장된 주소가 있으면 미리보기 지도 표시
  if (addr && currentAddrLat && currentAddrLng) {
    updateAdminMapPreview(addr, currentAddrLat, currentAddrLng);
  }
  aboutLogos = data.logos || [];
  renderLogoGrid();
}

// 다음 주소 찾기 팝업
document.getElementById('btnSearchAddress').addEventListener('click', () => {
  if (typeof daum === 'undefined' || !daum.Postcode) {
    showToast('주소 검색 서비스를 불러오는 중입니다. 잠시 후 다시 시도해주세요.', 'error');
    loadDaumPostcode();
    return;
  }
  new daum.Postcode({
    oncomplete: async function(result) {
      // 선택된 주소 (도로명 우선)
      const addr = result.roadAddress || result.jibunAddress;
      document.getElementById('aboutAddress').value = addr;
      // 상세주소 입력창 표시
      document.getElementById('addrDetailWrap').style.display = 'block';
      document.getElementById('aboutAddressDetail').value = '';
      document.getElementById('aboutAddressDetail').focus();
      // 카카오 geocoding으로 좌표 변환
      await geocodeAddress(addr);
    }
  }).open();
});

// 상세주소 입력 시 주소 업데이트
document.getElementById('aboutAddressDetail').addEventListener('input', function() {
  const base = document.getElementById('aboutAddress').value.split(' (')[0]; // 기존 상세 제거
  // 미리보기용으로는 좌표 기반이므로 값만 유지
});

// 카카오 geocoding (REST API) → 좌표 획득
async function geocodeAddress(addr) {
  try {
    // 카카오 로컬 검색 API 사용 (클라이언트 측에서는 CORS 제한)
    // 대신 Nominatim (OpenStreetMap) 무료 geocoding API 사용
    const encoded = encodeURIComponent(addr);
    const res = await fetch(
      'https://nominatim.openstreetmap.org/search?format=json&q=' + encoded + '&limit=1&countrycodes=kr',
      { headers: { 'Accept-Language': 'ko' } }
    );
    const data = await res.json();
    if (data && data.length > 0) {
      const lat = parseFloat(data[0].lat).toFixed(6);
      const lng = parseFloat(data[0].lon).toFixed(6);
      currentAddrLat = lat;
      currentAddrLng = lng;
      document.getElementById('aboutLat').value = lat;
      document.getElementById('aboutLng').value = lng;
      updateAdminMapPreview(addr, lat, lng);
      showToast('주소 위치를 찾았습니다.');
    } else {
      showToast('좌표를 찾지 못했습니다. 주소를 더 구체적으로 입력해보세요.', 'error');
    }
  } catch(e) {
    console.error('Geocoding error:', e);
    showToast('위치 변환 중 오류가 발생했습니다.', 'error');
  }
}

// 미리보기 지도 업데이트 (Google Maps embed)
function updateAdminMapPreview(addr, lat, lng) {
  const wrap = document.getElementById('adminMapPreview');
  const iframe = document.getElementById('adminMapIframe');
  if (!wrap || !iframe) return;
  const q = encodeURIComponent(addr);
  iframe.src = 'https://maps.google.com/maps?q=' + lat + ',' + lng + '&z=17&ie=UTF8&iwloc=&output=embed';
  wrap.style.display = 'block';
}

// 다음 우편번호 스크립트 동적 로드
function loadDaumPostcode() {
  if (document.getElementById('daumPostcodeScript')) return;
  const s = document.createElement('script');
  s.id = 'daumPostcodeScript';
  s.src = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
  document.head.appendChild(s);
}

async function renderLogoGrid() {
  const grid = document.getElementById('logoGrid');
  if (!aboutLogos.length) {
    grid.innerHTML = '<p style="color:#555;font-size:13px">등록된 로고가 없습니다.</p>';
    return;
  }
  grid.innerHTML = '<p style="color:#666;font-size:12px;margin-bottom:8px">로고 불러오는 중...</p>';
  const items = await Promise.all(aboutLogos.map(async key => {
    try {
      const res = await api('GET', '/logo/' + key);
      return { key, src: res.dataUrl || '' };
    } catch(e) { return { key, src: '' }; }
  }));
  grid.innerHTML = items.map(({key, src}) => `
    <div class="logo-card">
      ${src ? `<img src="${src}" alt="logo">` : `<div style="width:80px;height:50px;background:#222;border-radius:4px;margin:0 auto"></div>`}
      <button class="btn-del" data-key="${key}">✕</button>
      <div class="logo-name">${key.split('_')[1] || key}</div>
    </div>
  `).join('');
  grid.querySelectorAll('.btn-del').forEach(btn => {
    btn.addEventListener('click', () => deleteLogo(btn.dataset.key));
  });
}

async function deleteLogo(key) {
  if (!confirm('로고를 삭제하시겠습니까?')) return;
  await api('DELETE', '/about/logo/' + key);
  aboutLogos = aboutLogos.filter(k => k !== key);
  renderLogoGrid();
  showToast('로고가 삭제되었습니다.');
}

document.getElementById('btnSaveAddress').addEventListener('click', async () => {
  const base = document.getElementById('aboutAddress').value.trim();
  const detail = document.getElementById('aboutAddressDetail').value.trim();
  const full = detail ? base + ' ' + detail : base;
  const lat = document.getElementById('aboutLat').value;
  const lng = document.getElementById('aboutLng').value;
  if (!full) { showToast('주소를 먼저 검색해주세요.', 'error'); return; }
  if (!lat || !lng) { showToast('주소 검색을 통해 위치를 확인해주세요.', 'error'); return; }
  await api('PUT', '/about', { address: full, lat, lng });
  // 저장 후 미리보기 지도 갱신
  updateAdminMapPreview(full, lat, lng);
  showToast('주소가 저장되었습니다. 사이트의 지도도 업데이트됩니다.');
});

document.getElementById('logoUploadZone').addEventListener('click', () => document.getElementById('logoFileInput').click());
document.getElementById('logoFileInput').addEventListener('change', async (e) => {
  const files = Array.from(e.target.files);
  for (const file of files) {
    const dataUrl = await readFileAsDataUrl(file);
    const resized = await resizeImage(dataUrl, 200, 80);
    const name = file.name.replace(/\.[^.]+$/, '');
    const res = await api('POST', '/about/logo', { name, dataUrl: resized });
    if (res.ok) { aboutLogos.push(res.key); }
  }
  renderLogoGrid();
  showToast(files.length + '개 로고가 업로드되었습니다.');
  e.target.value = '';
});

// ═══════════════ WORKS ═══════════════
let worksItems = [];
let editingWorkId = null;
let wThumbDataUrl = '';

const PRODUCT_LABELS = { viral:'바이럴', influencer:'인플루언서', seeding:'시딩', seo:'SEO', review:'리뷰', oliveyoung:'올리브영', ppl:'PPL' };

async function loadWorks() {
  const data = await api('GET', '/works');
  worksItems = data.items || [];
  renderWorksTable();
}

function renderWorksTable() {
  const tbody = document.getElementById('worksTbody');
  tbody.innerHTML = worksItems.map((item, i) => {
    const tags = (item.tags || []).map(t => `<span class="tag-chip">${PRODUCT_LABELS[t]||t}</span>`).join('');
    return `<tr>
      <td><img class="works-thumb" src="${item.thumb||''}" onerror="this.style.opacity=0"></td>
      <td style="color:#fff;font-weight:600">${item.brand||''}</td>
      <td style="color:#aaa">${item.overlay||''}</td>
      <td>${tags}</td>
      <td style="color:#777;font-size:13px">${item.services||''}</td>
      <td style="white-space:nowrap">
        <button class="btn btn-secondary btn-sm" data-edit="${i}"><i class="fas fa-edit"></i></button>
        <button class="btn btn-danger btn-sm" data-del="${i}" style="margin-left:6px"><i class="fas fa-trash"></i></button>
      </td>
    </tr>`;
  }).join('');
  tbody.querySelectorAll('[data-edit]').forEach(btn => {
    btn.addEventListener('click', () => openEditWork(parseInt(btn.dataset.edit)));
  });
  tbody.querySelectorAll('[data-del]').forEach(btn => {
    btn.addEventListener('click', () => deleteWork(parseInt(btn.dataset.del)));
  });
}

function openAddWork() {
  editingWorkId = null; wThumbDataUrl = '';
  document.getElementById('workModalTitle').textContent = '새 포트폴리오 추가';
  ['wBrand','wOverlay','wServices','wThumbUrl'].forEach(id => { document.getElementById(id).value = ''; });
  document.querySelectorAll('[name="wTag"]').forEach(cb => cb.checked = false);
  document.getElementById('wThumbPreview').innerHTML = '';
  document.getElementById('workModal').classList.add('open');
}

function openEditWork(i) {
  editingWorkId = i; wThumbDataUrl = '';
  const item = worksItems[i];
  document.getElementById('workModalTitle').textContent = '포트폴리오 수정';
  document.getElementById('wBrand').value = item.brand || '';
  document.getElementById('wOverlay').value = item.overlay || '';
  document.getElementById('wServices').value = item.services || '';
  document.getElementById('wThumbUrl').value = item.thumb || '';
  document.querySelectorAll('[name="wTag"]').forEach(cb => cb.checked = (item.tags||[]).includes(cb.value));
  document.getElementById('wThumbPreview').innerHTML = item.thumb
    ? `<img src="${item.thumb}" style="max-height:80px;border-radius:6px">` : '';
  document.getElementById('workModal').classList.add('open');
}

async function deleteWork(i) {
  if (!confirm('삭제하시겠습니까?')) return;
  worksItems.splice(i, 1);
  await api('PUT', '/works', { items: worksItems });
  renderWorksTable();
  showToast('삭제되었습니다.');
}

document.getElementById('btnAddWork').addEventListener('click', openAddWork);
document.getElementById('closeWorkModal').addEventListener('click', () => document.getElementById('workModal').classList.remove('open'));
document.getElementById('btnCancelWork').addEventListener('click', () => document.getElementById('workModal').classList.remove('open'));

document.getElementById('wThumbZone').addEventListener('click', () => document.getElementById('wThumbFile').click());
document.getElementById('wThumbFile').addEventListener('change', async (e) => {
  const file = e.target.files[0]; if (!file) return;
  const dataUrl = await readFileAsDataUrl(file);
  const resized = await resizeImage(dataUrl, 600, 450);
  const res = await api('POST', '/works/thumb', { dataUrl: resized });
  if (res.ok) { wThumbDataUrl = res.url; document.getElementById('wThumbUrl').value = res.url; }
  document.getElementById('wThumbPreview').innerHTML = `<img src="${resized}" style="max-height:80px;border-radius:6px">`;
});

document.getElementById('btnSaveWork').addEventListener('click', async () => {
  const brand = document.getElementById('wBrand').value.trim();
  const overlay = document.getElementById('wOverlay').value.trim();
  const services = document.getElementById('wServices').value.trim();
  const thumbUrl = document.getElementById('wThumbUrl').value.trim() || wThumbDataUrl;
  const tags = Array.from(document.querySelectorAll('[name="wTag"]:checked')).map(cb => cb.value);
  if (!brand) { showToast('업체명을 입력해주세요.', 'error'); return; }
  const item = {
    brand, overlay, services, thumb: thumbUrl, tags,
    id: editingWorkId !== null ? worksItems[editingWorkId].id : Date.now()
  };
  if (editingWorkId !== null) { worksItems[editingWorkId] = item; }
  else { worksItems.push(item); }
  await api('PUT', '/works', { items: worksItems });
  renderWorksTable();
  document.getElementById('workModal').classList.remove('open');
  showToast('저장되었습니다.');
});

// ═══════════════ INSIGHT ═══════════════
let insightPosts = [];
let editingPostId = null;
let iThumbDataUrl = '';

async function loadInsight() {
  const data = await api('GET', '/insight');
  insightPosts = data.posts || [];
  renderPostList();
}

function renderPostList() {
  const list = document.getElementById('postList');
  if (!insightPosts.length) {
    list.innerHTML = '<p style="color:#555;font-size:13px;text-align:center;padding:40px">등록된 게시물이 없습니다.</p>';
    return;
  }
  list.innerHTML = insightPosts.map(post => `
    <div class="post-item">
      <img class="post-thumb" src="${post.thumbnail||''}" onerror="this.style.background='#2a2a2a';this.src=''">
      <div class="post-info">
        <div class="post-title">${post.title||'제목 없음'}</div>
        <div class="post-meta">${post.mainCategory||''} · ${post.subCategory||''} · ${(post.createdAt||'').slice(0,10)}</div>
      </div>
      <div class="post-actions">
        <button class="btn btn-secondary btn-sm" data-edit-post="${post.id}"><i class="fas fa-edit"></i></button>
        <button class="btn btn-danger btn-sm" data-del-post="${post.id}"><i class="fas fa-trash"></i></button>
      </div>
    </div>
  `).join('');
  list.querySelectorAll('[data-edit-post]').forEach(btn => {
    btn.addEventListener('click', () => openEditInsight(btn.dataset.editPost));
  });
  list.querySelectorAll('[data-del-post]').forEach(btn => {
    btn.addEventListener('click', () => deleteInsight(btn.dataset.delPost));
  });
}

// ── Quill 에디터 초기화 (인사이트 모달용) ──
let insightQuill = null;

function initInsightQuill() {
  if (insightQuill) return; // 이미 초기화된 경우 스킵
  if (typeof Quill === 'undefined') {
    console.warn('Quill not loaded yet, retrying...');
    setTimeout(initInsightQuill, 300);
    return;
  }
  insightQuill = new Quill('#quillEditor', {
    theme: 'snow',
    modules: {
      toolbar: {
        container: '#quillToolbar',
        handlers: {
          image: function() {
            // 이미지 업로드 핸들러: 파일 선택 다이얼로그 열기
            var input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/*');
            input.click();
            input.onchange = async function() {
              var file = input.files[0];
              if (!file) return;
              var dataUrl = await readFileAsDataUrl(file);
              var resized = await resizeImage(dataUrl, 1200, 800);
              // API를 통해 이미지 업로드
              var res = await api('POST', '/insight/thumb', { dataUrl: resized });
              if (res && res.ok) {
                var range = insightQuill.getSelection();
                insightQuill.insertEmbed(range ? range.index : 0, 'image', res.url);
              }
            };
          }
        }
      }
    },
    placeholder: '본문을 자유롭게 작성하세요. 툴바 버튼으로 제목, 단락, 목록, 인용구, 이미지 등을 편집할 수 있습니다.',
  });
}

// 페이지 로드 후 초기화
document.addEventListener('DOMContentLoaded', function() {
  // Quill 에디터 초기화 (CDN 로딩 대기)
  setTimeout(initInsightQuill, 500);
  // Daum 우편번호 스크립트 미리 로드 (About 섹션에서 즉시 사용 가능하도록)
  loadDaumPostcode();
});

function openAddInsight() {
  editingPostId = null; iThumbDataUrl = '';
  document.getElementById('insightModalTitle').textContent = '새 게시물 작성';
  document.getElementById('iTitle').value = '';
  document.getElementById('iSummary').value = '';
  document.getElementById('iThumbUrl').value = '';
  document.getElementById('iContent').value = '';
  document.getElementById('iMainCat').value = 'content-strategy';
  document.getElementById('iSubCat').value = 'viral';
  var tp=document.getElementById('iThumbPreview'); tp.src=''; tp.classList.remove('show');
  document.getElementById('insightModal').classList.add('open');
  // Quill 초기화 및 내용 클리어
  setTimeout(function() {
    initInsightQuill();
    if (insightQuill) insightQuill.setContents([]);
  }, 100);
}

function openEditInsight(id) {
  editingPostId = id; iThumbDataUrl = '';
  const post = insightPosts.find(p => p.id === id);
  if (!post) return;
  document.getElementById('insightModalTitle').textContent = '게시물 수정';
  document.getElementById('iTitle').value = post.title || '';
  document.getElementById('iSummary').value = post.summary || '';
  document.getElementById('iContent').value = post.content || '';
  document.getElementById('iThumbUrl').value = post.thumbnail || '';
  document.getElementById('iMainCat').value = post.mainCategory || 'content-strategy';
  document.getElementById('iSubCat').value = post.subCategory || 'viral';
  var tp2=document.getElementById('iThumbPreview'); if(post.thumbnail){tp2.src=post.thumbnail;tp2.classList.add('show');}else{tp2.src='';tp2.classList.remove('show');}
  document.getElementById('insightModal').classList.add('open');
  // Quill에 기존 HTML 내용 로드
  setTimeout(function() {
    initInsightQuill();
    if (insightQuill) {
      const html = post.content || '';
      insightQuill.clipboard.dangerouslyPasteHTML(html);
    }
  }, 100);
}

async function deleteInsight(id) {
  if (!confirm('게시물을 삭제하시겠습니까?')) return;
  await api('DELETE', '/insight/' + id);
  insightPosts = insightPosts.filter(p => p.id !== id);
  renderPostList();
  showToast('삭제되었습니다.');
}

document.getElementById('btnAddInsight').addEventListener('click', openAddInsight);
document.getElementById('closeInsightModal').addEventListener('click', () => document.getElementById('insightModal').classList.remove('open'));
document.getElementById('btnCancelInsight').addEventListener('click', () => document.getElementById('insightModal').classList.remove('open'));

document.getElementById('iThumbZone').addEventListener('click', () => document.getElementById('iThumbFile').click());
document.getElementById('iThumbFile').addEventListener('change', async (e) => {
  const file = e.target.files[0]; if (!file) return;
  const dataUrl = await readFileAsDataUrl(file);
  const resized = await resizeImage(dataUrl, 800, 500);
  const res = await api('POST', '/insight/thumb', { dataUrl: resized });
  if (res.ok) { iThumbDataUrl = res.url; document.getElementById('iThumbUrl').value = res.url; }
  var tp3=document.getElementById('iThumbPreview'); tp3.src=resized; tp3.classList.add('show');
});

document.getElementById('btnSaveInsight').addEventListener('click', async () => {
  const title = document.getElementById('iTitle').value.trim();
  const summary = document.getElementById('iSummary').value.trim();
  // Quill 에디터에서 HTML 추출, 폴백으로 textarea 사용
  let content = '';
  if (insightQuill) {
    // Quill v2: getSemanticHTML(), v1 폴백: root.innerHTML
    try {
      content = (insightQuill.getSemanticHTML ? insightQuill.getSemanticHTML() : insightQuill.root.innerHTML).trim();
    } catch(e) {
      content = insightQuill.root.innerHTML.trim();
    }
    // 빈 내용 체크 (<p><br></p> 등)
    if (content === '<p><br></p>' || content === '<p></p>' || content === '<p class="ql-align-justify"><br></p>') content = '';
  } else {
    content = document.getElementById('iContent').value.trim();
  }
  const thumbnail = document.getElementById('iThumbUrl').value.trim() || iThumbDataUrl;
  const mainCategory = document.getElementById('iMainCat').value;
  const subCategory = document.getElementById('iSubCat').value;
  if (!title) { showToast('제목을 입력해주세요.', 'error'); return; }
  const postData = { title, summary, content, thumbnail, mainCategory, subCategory };
  if (editingPostId) {
    await api('PUT', '/insight/' + editingPostId, postData);
    const idx = insightPosts.findIndex(p => p.id === editingPostId);
    if (idx !== -1) insightPosts[idx] = Object.assign({}, insightPosts[idx], postData);
  } else {
    const res = await api('POST', '/insight', postData);
    if (res.ok) insightPosts.unshift(res.post);
  }
  renderPostList();
  document.getElementById('insightModal').classList.remove('open');
  showToast('게시물이 저장되었습니다.');
});

// ═══════════════ MARKETING ═══════════════
const SERVICE_NAMES = {
  viral:'바이럴 마케팅', influencer:'인플루언서 마케팅', seeding:'시딩 캠페인',
  seo:'SEO 마케팅', review:'리뷰 마케팅', oliveyoung:'올리브영 마케팅', ppl:'PPL 마케팅'
};
let marketingStats = {};

async function loadMarketing() {
  const data = await api('GET', '/marketing');
  marketingStats = data.stats || {};
  renderMarketingEditor();
}

function renderMarketingEditor() {
  const editor = document.getElementById('marketingEditor');
  let html = '';
  Object.entries(SERVICE_NAMES).forEach(([svcKey, svcName]) => {
    const svc = marketingStats[svcKey] || {};
    html += `<div class="mktg-service">
      <div class="mktg-service-title"><i class="fas fa-chart-bar"></i> ${svcName}</div>
      <div class="case-grid">`;
    ['case1','case2','case3'].forEach((cKey, ci) => {
      const c = svc[cKey] || {};
      html += `<div class="case-card">
        <div class="case-tag">케이스 ${ci+1}</div>
        <div class="metric-input-wrap" style="margin-bottom:8px">
          <div class="ml">캠페인 설명 태그</div>
          <input type="text" data-svc="${svcKey}" data-case="${cKey}" data-field="tag" value="${c.tag||''}" placeholder="예: 패션 브랜드 숏폼">
        </div>
        <div class="metric-row">
          <div class="metric-input-wrap">
            <div class="ml">지표 1 수치</div>
            <input type="text" data-svc="${svcKey}" data-case="${cKey}" data-field="m1" value="${c.m1||''}" placeholder="2,800만">
          </div>
          <div class="metric-input-wrap">
            <div class="ml">지표 1 레이블</div>
            <input type="text" data-svc="${svcKey}" data-case="${cKey}" data-field="l1" value="${c.l1||''}" placeholder="조회수">
          </div>
        </div>
        <div class="metric-row">
          <div class="metric-input-wrap">
            <div class="ml">지표 2 수치</div>
            <input type="text" data-svc="${svcKey}" data-case="${cKey}" data-field="m2" value="${c.m2||''}" placeholder="+580%">
          </div>
          <div class="metric-input-wrap">
            <div class="ml">지표 2 레이블</div>
            <input type="text" data-svc="${svcKey}" data-case="${cKey}" data-field="l2" value="${c.l2||''}" placeholder="매출 증가">
          </div>
        </div>
        <div class="metric-row">
          <div class="metric-input-wrap">
            <div class="ml">지표 3 수치 (선택)</div>
            <input type="text" data-svc="${svcKey}" data-case="${cKey}" data-field="m3" value="${c.m3||''}" placeholder="">
          </div>
          <div class="metric-input-wrap">
            <div class="ml">지표 3 레이블 (선택)</div>
            <input type="text" data-svc="${svcKey}" data-case="${cKey}" data-field="l3" value="${c.l3||''}" placeholder="">
          </div>
        </div>
        <div class="metric-input-wrap">
          <div class="ml">설명 문구</div>
          <input type="text" data-svc="${svcKey}" data-case="${cKey}" data-field="desc" value="${c.desc||''}" placeholder="캠페인 설명">
        </div>
      </div>`;
    });
    html += `</div></div>`;
  });
  editor.innerHTML = html;

  // data-* 이벤트 바인딩
  editor.querySelectorAll('input[data-svc]').forEach(input => {
    input.addEventListener('input', () => {
      const svc = input.getAttribute('data-svc');
      const caseKey = input.getAttribute('data-case');
      const field = input.getAttribute('data-field');
      if (!marketingStats[svc]) marketingStats[svc] = {};
      if (!marketingStats[svc][caseKey]) marketingStats[svc][caseKey] = {};
      marketingStats[svc][caseKey][field] = input.value;
    });
  });
}

document.getElementById('btnSaveMarketing').addEventListener('click', async () => {
  await api('PUT', '/marketing', { stats: marketingStats });
  showToast('성과 수치가 저장되었습니다.');
});

// ═══════════════ 유틸 ═══════════════
function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => resolve(e.target.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function resizeImage(dataUrl, maxW, maxH) {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let w = img.width, h = img.height;
      if (w > maxW) { h = Math.round(h * maxW / w); w = maxW; }
      if (h > maxH) { w = Math.round(w * maxH / h); h = maxH; }
      canvas.width = w; canvas.height = h;
      canvas.getContext('2d').drawImage(img, 0, 0, w, h);
      resolve(canvas.toDataURL('image/jpeg', 0.85));
    };
    img.src = dataUrl;
  });
}

// ═══════════════ 섹션 로드 ═══════════════
function loadSection(sec) {
  if (sec === 'home') loadHome();
  else if (sec === 'about') loadAbout();
  else if (sec === 'works') loadWorks();
  else if (sec === 'insight') loadInsight();
  else if (sec === 'marketing') loadMarketing();
  else if (sec === 'contact') loadContact();
}

// 초기 로드
loadHome();

// ═══════════════ CONTACT ═══════════════
let faqItems = [];

async function loadContact() {
  const data = await api('GET', '/contact');
  // 개인정보 보호 책임자
  if (data.officer) {
    document.getElementById('privacyManager').value = data.officer.manager || '';
    document.getElementById('privacyOfficer').value = data.officer.officer || '';
    document.getElementById('privacyWebsite').value = data.officer.website || '';
    document.getElementById('privacyEmail').value   = data.officer.email   || '';
  }
  // FAQ
  faqItems = (data.faq || []).map(f => ({ q: f.q || '', a: f.a || '' }));
  renderFaqList();
}

function renderFaqList() {
  const wrap = document.getElementById('faqList');
  if (!wrap) return;
  const addBtn = document.getElementById('btnAddFaq');
  if (addBtn) addBtn.disabled = faqItems.length >= 5;

  if (!faqItems.length) {
    wrap.innerHTML = '<p style="color:#555;font-size:13px;text-align:center;padding:20px 0">등록된 FAQ가 없습니다. 추가 버튼을 눌러 질문을 등록하세요.</p>';
    return;
  }

  wrap.innerHTML = faqItems.map((f, i) => `
    <div class="faq-edit-item" data-idx="${i}" style="background:#1a1a1a;border:1px solid #2a2a2a;border-radius:10px;padding:16px">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
        <span style="color:#888;font-size:12px;font-weight:700">FAQ ${i + 1}</span>
        <button onclick="removeFaqItem(${i})" style="background:none;border:none;color:#555;cursor:pointer;font-size:14px;padding:2px 6px;transition:color .15s" onmouseover="this.style.color='#ff4d4d'" onmouseout="this.style.color='#555'">
          <i class="fas fa-trash"></i>
        </button>
      </div>
      <div class="form-group" style="margin-bottom:10px">
        <label style="font-size:11px;color:#888;margin-bottom:5px;display:block">질문</label>
        <input type="text" value="${escHtml(f.q)}" oninput="faqItems[${i}].q=this.value"
          style="width:100%;background:#111;border:1px solid #2a2a2a;border-radius:6px;color:#fff;font-size:14px;padding:9px 12px;outline:none;box-sizing:border-box"
          placeholder="예: 프로젝트 기간은 얼마나 걸리나요?">
      </div>
      <div class="form-group">
        <label style="font-size:11px;color:#888;margin-bottom:5px;display:block">답변</label>
        <textarea oninput="faqItems[${i}].a=this.value" rows="3"
          style="width:100%;background:#111;border:1px solid #2a2a2a;border-radius:6px;color:#ccc;font-size:13px;padding:9px 12px;outline:none;resize:vertical;line-height:1.6;box-sizing:border-box;font-family:inherit"
          placeholder="답변을 입력하세요...">${escHtml(f.a)}</textarea>
      </div>
    </div>
  `).join('');
}

function escHtml(s) {
  return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function removeFaqItem(idx) {
  faqItems.splice(idx, 1);
  renderFaqList();
}

document.getElementById('btnAddFaq').addEventListener('click', () => {
  if (faqItems.length >= 5) { showToast('FAQ는 최대 5개까지 등록 가능합니다.', 'error'); return; }
  faqItems.push({ q: '', a: '' });
  renderFaqList();
  // 새로 추가된 질문 input에 포커스
  const items = document.querySelectorAll('.faq-edit-item');
  const last = items[items.length - 1];
  if (last) last.querySelector('input').focus();
});

document.getElementById('btnSavePrivacyOfficer').addEventListener('click', async () => {
  const officer = {
    manager: document.getElementById('privacyManager').value.trim(),
    officer: document.getElementById('privacyOfficer').value.trim(),
    website: document.getElementById('privacyWebsite').value.trim(),
    email:   document.getElementById('privacyEmail').value.trim(),
  };
  await api('PUT', '/contact', { officer });
  showToast('개인정보 보호 책임자가 저장되었습니다.');
});

document.getElementById('btnSaveFaq').addEventListener('click', async () => {
  // 빈 항목 필터링
  const valid = faqItems.filter(f => f.q.trim() && f.a.trim());
  if (!valid.length) { showToast('저장할 FAQ가 없습니다.', 'error'); return; }
  await api('PUT', '/contact', { faq: valid });
  faqItems = valid;
  renderFaqList();
  showToast('FAQ가 저장되었습니다.');
});
