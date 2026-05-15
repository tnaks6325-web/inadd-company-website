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
  t.className = 'toast' + (type === 'error' ? ' error' : type === 'info' ? ' info' : '');
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 4000);
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
  const detail = data.addressDetail || '';
  document.getElementById('aboutAddress').value = addr;
  document.getElementById('aboutAddressDetail').value = detail;
  currentAddrLat = data.lat || '';
  currentAddrLng = data.lng || '';
  document.getElementById('aboutLat').value = currentAddrLat;
  document.getElementById('aboutLng').value = currentAddrLng;
  updateKakaoMapLink(addr);
  if (addr && currentAddrLat && currentAddrLng) {
    updateAdminMapPreview(addr, currentAddrLat, currentAddrLng);
  }
  aboutLogos = data.logos || [];
  renderLogoGrid();
}

// 카카오맵 링크 업데이트
function updateKakaoMapLink(addr) {
  const link = document.getElementById('btnOpenKakaoMap');
  if (!link) return;
  if (addr) {
    link.href = 'https://map.kakao.com/?q=' + encodeURIComponent(addr);
  } else {
    link.href = 'https://map.kakao.com/';
  }
}

// 다음 주소 찾기 팝업
document.getElementById('btnSearchAddress').addEventListener('click', () => {
  if (typeof daum === 'undefined' || !daum.Postcode) {
    showToast('주소 검색 서비스를 불러오는 중입니다. 잠시 후 다시 시도해주세요.', 'error');
    loadDaumPostcode();
    return;
  }
  new daum.Postcode({
    oncomplete: function(result) {
      const addr = result.roadAddress || result.jibunAddress;
      document.getElementById('aboutAddress').value = addr;
      // 상세주소 입력창 표시
      document.getElementById('addrDetailWrap').style.display = 'block';
      document.getElementById('aboutAddressDetail').value = '';
      document.getElementById('aboutAddressDetail').focus();
      // 카카오맵 링크: 해당 주소로 검색
      updateKakaoMapLink(addr);
      // 좌표 초기화 안내
      document.getElementById('aboutLat').value = '';
      document.getElementById('aboutLng').value = '';
      document.getElementById('adminMapPreview').style.display = 'none';
      showToast('주소가 선택되었습니다. 위의 카카오맵 버튼으로 정확한 좌표를 확인 후 입력해주세요.', 'info');
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

// 좌표 미리보기 버튼
document.getElementById('btnPreviewCoord').addEventListener('click', () => {
  const lat = document.getElementById('aboutLat').value.trim();
  const lng = document.getElementById('aboutLng').value.trim();
  const addr = document.getElementById('aboutAddress').value.trim();
  if (!lat || !lng) {
    showToast('위도와 경도를 모두 입력해주세요.', 'error');
    return;
  }
  const latNum = parseFloat(lat);
  const lngNum = parseFloat(lng);
  if (isNaN(latNum) || isNaN(lngNum) || latNum < 33 || latNum > 39 || lngNum < 124 || lngNum > 132) {
    showToast('올바른 한국 좌표 범위를 입력해주세요. (위도 33~39, 경도 124~132)', 'error');
    return;
  }
  currentAddrLat = lat;
  currentAddrLng = lng;
  updateAdminMapPreview(addr, lat, lng);
  showToast('지도 미리보기가 업데이트되었습니다.');
});

document.getElementById('btnSaveAddress').addEventListener('click', async () => {
  const base = document.getElementById('aboutAddress').value.trim();
  const detail = document.getElementById('aboutAddressDetail').value.trim();
  const lat = document.getElementById('aboutLat').value.trim();
  const lng = document.getElementById('aboutLng').value.trim();
  if (!base) { showToast('주소를 먼저 검색해주세요.', 'error'); return; }
  if (!lat || !lng) { showToast('위도/경도를 입력해주세요. 카카오맵 버튼으로 좌표를 확인하세요.', 'error'); return; }
  const latNum = parseFloat(lat);
  const lngNum = parseFloat(lng);
  if (isNaN(latNum) || isNaN(lngNum) || latNum < 33 || latNum > 39 || lngNum < 124 || lngNum > 132) {
    showToast('올바른 한국 좌표를 입력해주세요. (위도 33~39, 경도 124~132)', 'error'); return;
  }
  await api('PUT', '/about', { address: base, addressDetail: detail, lat, lng });
  const fullAddr = detail ? base + ' ' + detail : base;
  updateAdminMapPreview(fullAddr, lat, lng);
  showToast('✅ 주소와 지도 위치가 저장되었습니다.');
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
  // 갤러리도 함께 로드
  loadGallery();
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
  else if (sec === 'gallery') loadGallery();
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

// ═══════════════ GALLERY (인애드 일상) ═══════════════

let allGalAdminItems = [];
let currentGalAdminTag = 'all';

async function loadGallery() {
  const data = await api('GET', '/gallery');
  allGalAdminItems = data.items || [];
  renderGalAdmin(allGalAdminItems);
  initGalAdminFilter();
}

function initGalAdminFilter() {
  const filterEl = document.getElementById('galAdminFilter');
  if (!filterEl) return;
  filterEl.querySelectorAll('.gal-admin-ftag').forEach(btn => {
    btn.addEventListener('click', function() {
      currentGalAdminTag = this.getAttribute('data-tag');
      filterEl.querySelectorAll('.gal-admin-ftag').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const filtered = currentGalAdminTag === 'all'
        ? allGalAdminItems
        : allGalAdminItems.filter(i => i.tag === currentGalAdminTag);
      renderGalAdmin(filtered);
    });
  });
}

const TAG_COLORS_ADMIN = {
  '일상':   { bg:'rgba(41,121,255,0.18)',  border:'rgba(41,121,255,0.5)',  color:'#7ab4ff' },
  '팀':     { bg:'rgba(41,200,130,0.15)',  border:'rgba(41,200,130,0.45)', color:'#4dd99c' },
  '오피스': { bg:'rgba(168,85,247,0.15)',  border:'rgba(168,85,247,0.45)', color:'#c084fc' },
  '행사':   { bg:'rgba(251,146,60,0.15)',  border:'rgba(251,146,60,0.45)', color:'#fb923c' },
  '캠페인': { bg:'rgba(239,68,68,0.15)',   border:'rgba(239,68,68,0.45)',  color:'#f87171' }
};

function renderGalAdmin(items) {
  const grid = document.getElementById('galAdminGrid');
  if (!grid) return;
  if (!items.length) {
    grid.innerHTML = '<div class="gal-admin-empty"><i class="fas fa-images"></i>등록된 사진이 없습니다.<br><span style="font-size:12px;margin-top:4px;display:block">사진 추가 버튼을 눌러 업로드하세요.</span></div>';
    return;
  }
  grid.innerHTML = items.map(item => {
    const col = TAG_COLORS_ADMIN[item.tag] || TAG_COLORS_ADMIN['일상'];
    return `
    <div class="gal-admin-item">
      <img src="${item.imageUrl}" alt="${item.caption || ''}" loading="lazy" onerror="this.parentElement.style.background='#1a1a1a'" />
      <div class="gal-admin-item-info">
        <span class="gal-admin-item-tag" style="background:${col.bg};border-color:${col.border};color:${col.color}">${item.tag || '일상'}</span>
        ${item.caption ? `<span class="gal-admin-item-cap">${item.caption}</span>` : ''}
      </div>
      <button class="gal-admin-item-del" onclick="deleteGalItem(${item.id})" title="삭제"><i class="fas fa-times"></i></button>
    </div>`;
  }).join('');
}

async function deleteGalItem(id) {
  if (!confirm('이 사진을 삭제하시겠습니까?')) return;
  await api('DELETE', `/gallery/${id}`);
  showToast('사진이 삭제되었습니다.');
  loadGallery();
}

// 갤러리 사진 추가 모달
document.getElementById('btnAddGallery').addEventListener('click', () => {
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.88);z-index:1000;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(4px);';
  overlay.innerHTML = `
    <div style="background:#141414;border:1px solid #2a2a2a;border-radius:16px;padding:0;width:500px;max-width:96vw;overflow:hidden;">
      <!-- 헤더 -->
      <div style="display:flex;justify-content:space-between;align-items:center;padding:20px 24px;border-bottom:1px solid #222;">
        <div>
          <strong style="color:#fff;font-size:16px;font-weight:700">사진 추가</strong>
          <p style="color:#555;font-size:12px;margin:3px 0 0">인애드 일상 갤러리에 사진을 업로드합니다</p>
        </div>
        <button id="galModalClose" style="background:rgba(255,255,255,0.06);border:1px solid #333;color:#888;width:32px;height:32px;border-radius:50%;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;">✕</button>
      </div>
      <!-- 본문 -->
      <div style="padding:24px;display:flex;flex-direction:column;gap:18px;">
        <!-- 이미지 업로드 드롭존 -->
        <div>
          <label style="color:#888;font-size:11px;font-weight:700;display:block;margin-bottom:8px;letter-spacing:.5px;text-transform:uppercase">이미지 파일 *</label>
          <label for="galFileInput" id="galDropZone" style="display:flex;flex-direction:column;align-items:center;justify-content:center;border:2px dashed #2a2a2a;border-radius:12px;padding:28px 16px;text-align:center;cursor:pointer;transition:border-color .2s,background .2s;gap:8px;">
            <i class="fas fa-cloud-upload-alt" style="font-size:28px;color:#444;"></i>
            <span style="color:#555;font-size:13px">클릭하거나 이미지를 드래그하세요</span>
            <span style="color:#3a3a3a;font-size:11px">JPG · PNG · WebP / 최대 5MB</span>
          </label>
          <input type="file" id="galFileInput" accept="image/*" style="display:none;" />
          <div id="galPreview" style="margin-top:12px;display:none;position:relative;border-radius:10px;overflow:hidden;border:1px solid #2a2a2a;">
            <img id="galPreviewImg" style="width:100%;max-height:220px;object-fit:contain;display:block;background:#0a0a0a;" />
            <button id="galPreviewClear" style="position:absolute;top:8px;right:8px;background:rgba(0,0,0,0.7);border:1px solid #444;color:#fff;border-radius:50%;width:26px;height:26px;font-size:12px;cursor:pointer;display:flex;align-items:center;justify-content:center;">✕</button>
          </div>
        </div>
        <!-- 태그 선택 -->
        <div>
          <label style="color:#888;font-size:11px;font-weight:700;display:block;margin-bottom:8px;letter-spacing:.5px;text-transform:uppercase">태그</label>
          <div id="galTagBtns" style="display:flex;gap:8px;flex-wrap:wrap;">
            <button class="gal-tag-btn active" data-val="일상" style="padding:6px 16px;border-radius:20px;border:1px solid rgba(41,121,255,0.5);background:rgba(41,121,255,0.18);color:#7ab4ff;font-size:12px;font-weight:600;cursor:pointer;">일상</button>
            <button class="gal-tag-btn" data-val="팀" style="padding:6px 16px;border-radius:20px;border:1px solid #2a2a2a;background:transparent;color:#666;font-size:12px;font-weight:600;cursor:pointer;">팀</button>
            <button class="gal-tag-btn" data-val="오피스" style="padding:6px 16px;border-radius:20px;border:1px solid #2a2a2a;background:transparent;color:#666;font-size:12px;font-weight:600;cursor:pointer;">오피스</button>
            <button class="gal-tag-btn" data-val="행사" style="padding:6px 16px;border-radius:20px;border:1px solid #2a2a2a;background:transparent;color:#666;font-size:12px;font-weight:600;cursor:pointer;">행사</button>
            <button class="gal-tag-btn" data-val="캠페인" style="padding:6px 16px;border-radius:20px;border:1px solid #2a2a2a;background:transparent;color:#666;font-size:12px;font-weight:600;cursor:pointer;">캠페인</button>
          </div>
          <input type="hidden" id="galTagSelect" value="일상" />
        </div>
        <!-- 캡션 -->
        <div>
          <label style="color:#888;font-size:11px;font-weight:700;display:block;margin-bottom:8px;letter-spacing:.5px;text-transform:uppercase">캡션 <span style="color:#444;font-weight:400;text-transform:none">(선택)</span></label>
          <input type="text" id="galCaptionInput" placeholder="사진에 대한 간단한 설명을 입력하세요" style="width:100%;background:#1a1a1a;border:1px solid #2a2a2a;border-radius:8px;color:#fff;padding:10px 14px;font-size:14px;outline:none;box-sizing:border-box;transition:border-color .2s;" onfocus="this.style.borderColor='#1a6bff'" onblur="this.style.borderColor='#2a2a2a'" />
        </div>
      </div>
      <!-- 푸터 -->
      <div style="display:flex;gap:10px;padding:16px 24px;border-top:1px solid #222;background:#111;">
        <button id="galSaveBtn" style="flex:1;background:#1a6bff;border:none;color:#fff;padding:12px;border-radius:10px;font-size:14px;font-weight:700;cursor:pointer;transition:background .2s;">
          <i class="fas fa-upload" style="margin-right:6px"></i>업로드 저장
        </button>
        <button id="galCancelBtn" style="padding:12px 20px;background:#1a1a1a;border:1px solid #2a2a2a;color:#aaa;border-radius:10px;font-size:14px;cursor:pointer;">취소</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  let b64Data = null;
  let selectedTag = '일상';

  /* 태그 버튼 토글 */
  overlay.querySelectorAll('.gal-tag-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      selectedTag = this.getAttribute('data-val');
      document.getElementById('galTagSelect').value = selectedTag;
      const col = TAG_COLORS_ADMIN[selectedTag] || TAG_COLORS_ADMIN['일상'];
      overlay.querySelectorAll('.gal-tag-btn').forEach(b => {
        b.style.background = 'transparent'; b.style.borderColor = '#2a2a2a'; b.style.color = '#666';
      });
      this.style.background = col.bg;
      this.style.borderColor = col.border;
      this.style.color = col.color;
    });
  });

  /* 드롭존 hover */
  const dropZone = document.getElementById('galDropZone');
  dropZone.addEventListener('mouseenter', () => { dropZone.style.borderColor='#1a6bff'; dropZone.style.background='rgba(26,107,255,0.05)'; });
  dropZone.addEventListener('mouseleave', () => { dropZone.style.borderColor='#2a2a2a'; dropZone.style.background=''; });

  /* 파일 선택 */
  document.getElementById('galFileInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(ev) {
      b64Data = ev.target.result;
      document.getElementById('galPreviewImg').src = b64Data;
      document.getElementById('galPreview').style.display = 'block';
      dropZone.style.display = 'none';
    };
    reader.readAsDataURL(file);
  });

  /* 미리보기 제거 */
  document.getElementById('galPreviewClear').addEventListener('click', () => {
    b64Data = null;
    document.getElementById('galPreview').style.display = 'none';
    document.getElementById('galFileInput').value = '';
    dropZone.style.display = 'flex';
  });

  function closeModal() { overlay.remove(); }
  document.getElementById('galModalClose').addEventListener('click', closeModal);
  document.getElementById('galCancelBtn').addEventListener('click', closeModal);
  overlay.addEventListener('click', function(e) { if (e.target === overlay) closeModal(); });

  document.getElementById('galSaveBtn').addEventListener('click', async () => {
    if (!b64Data) { showToast('이미지를 선택해주세요.', 'error'); return; }
    const btn = document.getElementById('galSaveBtn');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin" style="margin-right:6px"></i>업로드 중...';
    btn.disabled = true;
    try {
      const imgRes = await api('POST', '/gallery/image', { data: b64Data });
      const tag     = document.getElementById('galTagSelect').value || '일상';
      const caption = document.getElementById('galCaptionInput').value.trim();
      await api('POST', '/gallery', { imageUrl: imgRes.url, tag, caption });
      showToast('사진이 추가되었습니다.');
      closeModal();
      loadGallery();
    } catch(err) {
      showToast('업로드 실패: ' + (err.message || '오류'), 'error');
      btn.innerHTML = '<i class="fas fa-upload" style="margin-right:6px"></i>업로드 저장';
      btn.disabled = false;
    }
  });
});

// gallery loadSection is handled in the main loadSection above

// ════════════════════════════════════════════════
//  SERVICE FAQ ADMIN
// ════════════════════════════════════════════════

let currentSvcFaqService = 'viral';
let currentSvcFaqItems   = [];

const SVC_NAMES = {
  viral:       '바이럴',
  influencer:  '인플루언서',
  seeding:     '시딩',
  seo:         'SEO',
  review:      '리뷰',
  ppl:         'PPL',
  oliveyoung:  '올리브영'
};

async function loadSvcFaq(service) {
  currentSvcFaqService = service;
  try {
    const data = await api('GET', `/svc-faq/${service}`);
    currentSvcFaqItems = (data.faq || []).map(item => ({ ...item }));
    renderSvcFaq();
    setFaqHint('');
  } catch(e) {
    showToast('FAQ 불러오기 실패', 'error');
  }
}

function renderSvcFaq() {
  const list = document.getElementById('svcFaqList');
  if (!list) return;
  if (currentSvcFaqItems.length === 0) {
    list.innerHTML = '<div style="text-align:center;padding:32px 0;color:#444;font-size:13px"><i class="fas fa-question-circle" style="font-size:28px;display:block;margin-bottom:10px"></i>등록된 FAQ가 없습니다.</div>';
    return;
  }
  list.innerHTML = currentSvcFaqItems.map((item, i) => `
    <div class="svc-faq-row" data-idx="${i}">
      <div class="svc-faq-row-head">
        <span class="svc-faq-num">${i + 1}</span>
        <input class="svc-faq-q-inp" type="text" placeholder="질문을 입력하세요" value="${escapeAttr(item.q)}" data-field="q" data-idx="${i}">
        <div class="svc-faq-row-actions">
          <button class="btn-move-up" title="위로" onclick="moveSvcFaqItem(${i}, -1)"><i class="fas fa-chevron-up"></i></button>
          <button class="btn-move-down" title="아래로" onclick="moveSvcFaqItem(${i}, 1)"><i class="fas fa-chevron-down"></i></button>
          <button class="btn-del-faq" title="삭제" onclick="deleteSvcFaqItem(${i})"><i class="fas fa-trash"></i></button>
        </div>
      </div>
      <textarea class="svc-faq-a-inp" placeholder="답변을 입력하세요 (HTML 태그 사용 가능)" rows="3" data-field="a" data-idx="${i}">${escapeText(item.a)}</textarea>
    </div>
  `).join('');

  // 인풋 변경 이벤트 바인딩
  list.querySelectorAll('.svc-faq-q-inp').forEach(inp => {
    inp.addEventListener('input', e => {
      const idx = parseInt(e.target.dataset.idx);
      currentSvcFaqItems[idx].q = e.target.value;
    });
  });
  list.querySelectorAll('.svc-faq-a-inp').forEach(ta => {
    ta.addEventListener('input', e => {
      const idx = parseInt(e.target.dataset.idx);
      currentSvcFaqItems[idx].a = e.target.value;
    });
  });
}

function escapeAttr(str) {
  return (str || '').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function escapeText(str) {
  return (str || '').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function moveSvcFaqItem(idx, dir) {
  const newIdx = idx + dir;
  if (newIdx < 0 || newIdx >= currentSvcFaqItems.length) return;
  const tmp = currentSvcFaqItems[idx];
  currentSvcFaqItems[idx]    = currentSvcFaqItems[newIdx];
  currentSvcFaqItems[newIdx] = tmp;
  renderSvcFaq();
  setFaqHint('순서가 변경되었습니다. 저장 버튼을 눌러 반영하세요.');
}

function deleteSvcFaqItem(idx) {
  if (!confirm(`${idx + 1}번 FAQ를 삭제하시겠습니까?`)) return;
  currentSvcFaqItems.splice(idx, 1);
  renderSvcFaq();
  setFaqHint('항목이 삭제되었습니다. 저장 버튼을 눌러 반영하세요.');
}

function addSvcFaqItem() {
  currentSvcFaqItems.push({ q: '', a: '' });
  renderSvcFaq();
  // 새로 추가된 질문 인풋에 포커스
  const rows = document.querySelectorAll('.svc-faq-row');
  if (rows.length > 0) {
    const lastInp = rows[rows.length - 1].querySelector('.svc-faq-q-inp');
    if (lastInp) lastInp.focus();
  }
  setFaqHint('새 질문이 추가되었습니다. 내용 입력 후 저장하세요.');
}

async function saveSvcFaq() {
  // 빈 항목 경고
  const hasEmpty = currentSvcFaqItems.some(item => !item.q.trim() || !item.a.trim());
  if (hasEmpty) {
    showToast('질문 또는 답변이 비어있는 항목이 있습니다.', 'error');
    return;
  }
  try {
    const btns = document.querySelectorAll('#btnSaveFaq, #btnSaveFaq2');
    btns.forEach(b => { b.disabled = true; b.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 저장 중...'; });
    await api('PUT', `/svc-faq/${currentSvcFaqService}`, { faq: currentSvcFaqItems });
    showToast(`${SVC_NAMES[currentSvcFaqService]} FAQ가 저장되었습니다.`);
    setFaqHint('✓ 저장 완료 — 서비스 페이지에 반영되었습니다.');
    btns.forEach(b => { b.disabled = false; b.innerHTML = '<i class="fas fa-save"></i> 저장'; });
  } catch(e) {
    showToast('저장 실패: ' + (e.message || '오류'), 'error');
    const btns = document.querySelectorAll('#btnSaveFaq, #btnSaveFaq2');
    btns.forEach(b => { b.disabled = false; b.innerHTML = '<i class="fas fa-save"></i> 저장'; });
  }
}

function setFaqHint(msg) {
  const el = document.getElementById('svcFaqHint');
  if (el) el.textContent = msg;
}

function initSvcFaqSection() {
  // 탭 클릭
  const tabBar = document.getElementById('svcFaqTabBar');
  if (!tabBar) return;
  tabBar.querySelectorAll('.svc-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      tabBar.querySelectorAll('.svc-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      loadSvcFaq(btn.dataset.svc);
    });
  });

  // 질문 추가 버튼
  const addBtn = document.getElementById('btnAddFaq');
  if (addBtn) addBtn.addEventListener('click', addSvcFaqItem);

  // 저장 버튼 (상단 / 하단 둘 다)
  const saveBtn  = document.getElementById('btnSaveFaq');
  const saveBtn2 = document.getElementById('btnSaveFaq2');
  if (saveBtn)  saveBtn.addEventListener('click',  saveSvcFaq);
  if (saveBtn2) saveBtn2.addEventListener('click', saveSvcFaq);

  // 초기 로드
  loadSvcFaq('viral');
}

// section-marketing 로드 시 FAQ 초기화
(function patchLoadSection() {
  const _orig = window._loadSectionPatched;
  if (_orig) return;
  window._loadSectionPatched = true;

  // MutationObserver로 section-marketing 활성화 감지
  const observer = new MutationObserver(() => {
    const sec = document.getElementById('section-marketing');
    if (sec && sec.classList.contains('active')) {
      const tabBar = document.getElementById('svcFaqTabBar');
      // 이미 초기화됐으면 스킵
      if (tabBar && !tabBar.dataset.initialized) {
        tabBar.dataset.initialized = '1';
        initSvcFaqSection();
      }
    }
  });
  const content = document.getElementById('content');
  if (content) observer.observe(content, { subtree: true, attributeFilter: ['class'] });
})();
