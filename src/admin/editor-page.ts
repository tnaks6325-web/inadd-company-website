export function adminEditorHTML() {
  return `<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>홈페이지 비주얼 편집기 · IN AD COMPANY</title>
  <link rel="stylesheet" href="/static/admin-editor.css">
</head>
<body data-theme="studio">
  <div class="editor-shell">
    <header class="topbar">
      <a class="brand" href="/admin" aria-label="관리자 대시보드로 이동">IN AD <b>EDITOR</b></a>
      <div class="history-tools" aria-label="편집 기록">
        <button id="undoBtn" class="icon-btn" title="실행 취소 (Ctrl+Z)" disabled>↶</button>
        <button id="redoBtn" class="icon-btn" title="다시 실행 (Ctrl+Shift+Z)" disabled>↷</button>
      </div>
      <div class="device-tools" role="group" aria-label="화면 크기">
        <button class="device-btn active" data-device="desktop">PC</button>
        <button class="device-btn" data-device="tablet">태블릿</button>
        <button class="device-btn" data-device="mobile">모바일</button>
      </div>
      <div class="live-canvas-tools" aria-label="라이브 캔버스 도구">
        <select id="liveRoutePicker" aria-label="편집할 실제 페이지"></select>
        <div class="live-mode-toggle" role="group" aria-label="캔버스 모드">
          <button type="button" class="live-mode-btn active" data-live-mode="interact">상호작용</button>
          <button type="button" class="live-mode-btn" data-live-mode="select">선택</button>
        </div>
      </div>
      <div class="top-actions">
        <span id="saveStatus" class="save-status">불러오는 중…</span>
        <button id="previewBtn" class="btn secondary">미리보기</button>
        <button id="saveBtn" class="btn primary">저장하기</button>
      </div>
    </header>

    <aside class="left-panel">
      <div class="panel-heading"><span>페이지</span><a href="/admin">대시보드</a></div>
      <div class="page-chip"><span class="page-dot"></span><div><b>홈페이지</b><small>/</small></div></div>
      <div class="panel-heading layers-heading"><span>섹션</span><small>클릭하여 이동</small></div>
      <nav id="sectionList" class="section-list">
        <button data-section="hero"><span>01</span><b>히어로</b><small>6개 텍스트</small></button>
        <button data-section="services"><span>02</span><b>서비스 소개</b><small>5개 텍스트</small></button>
        <button data-section="stats"><span>03</span><b>성과 수치</b><small>섹션 스타일</small></button>
        <button data-section="history"><span>04</span><b>회사 연혁</b><small>4개 텍스트</small></button>
        <button data-section="testimonials"><span>05</span><b>고객 후기</b><small>3개 텍스트</small></button>
        <button data-section="cta"><span>06</span><b>상담 CTA</b><small>5개 텍스트</small></button>
      </nav>
      <div class="theme-block">
        <label>편집기 화면 테마</label>
        <div class="theme-options">
          <button class="theme-swatch active" data-theme="studio" title="클린 스튜디오"><i></i>Studio</button>
          <button class="theme-swatch" data-theme="paper" title="웜 페이퍼"><i></i>Paper</button>
          <button class="theme-swatch" data-theme="sky" title="에어리 블루"><i></i>Airy</button>
        </div>
      </div>
    </aside>

    <main class="canvas-area">
      <div class="canvas-hint"><span class="pulse"></span><b>텍스트를 직접 클릭</b>하면 바로 편집할 수 있습니다.</div>
      <div id="frameWrap" class="frame-wrap device-desktop">
        <iframe id="siteFrame" src="/?editor=1" title="홈페이지 편집 캔버스"></iframe>
      </div>
    </main>

    <aside class="right-panel">
      <div class="inspector-head"><div><small>선택한 요소</small><b id="selectedName">텍스트를 선택하세요</b></div><span id="selectionBadge">—</span></div>
      <div id="emptyInspector" class="empty-inspector"><div class="cursor-graphic">T</div><p>캔버스에서 수정할 텍스트를 클릭하세요.</p><small>문구, 글꼴, 색상, 정렬과 섹션 배경을 편집할 수 있습니다.</small></div>
      <div id="liveContentInspector" class="inspector-controls" hidden>
        <section class="control-section"><h3>실제 페이지 문구</h3><label>선택한 문구<textarea id="liveContentText" rows="6" maxlength="500"></textarea></label><p class="compact-info">텍스트만 변경됩니다. 링크와 실제 페이지 동작은 유지됩니다.</p></section>
      </div>
      <div id="inspectorControls" class="inspector-controls" hidden>
        <section class="control-section" id="typographyControls">
          <h3>타이포그래피</h3>
          <label>글꼴<select id="fontFamily"><option value="pretendard">Pretendard</option><option value="display">Display</option><option value="serif">Serif</option><option value="mono">Mono</option></select></label>
          <div class="two-cols"><label>굵기<select id="fontWeight"><option>400</option><option>500</option><option>600</option><option>700</option><option>800</option></select></label><label>크기 <output id="fontSizeValue">100%</output><input id="fontSize" type="range" min="70" max="150" step="5"></label></div>
          <label>정렬<div class="segmented"><button data-align="left">왼쪽</button><button data-align="center">가운데</button><button data-align="right">오른쪽</button></div></label>
        </section>
        <section class="control-section">
          <h3>색상</h3>
          <div class="color-row" id="textColorControls"><label>글자색<input id="textColor" type="color"></label><label>강조 배경<input id="highlightColor" type="color"></label><button id="clearHighlight" class="tiny-btn">없음</button></div>
          <div class="color-row"><label>섹션 배경<input id="sectionColor" type="color"></label><button id="clearSection" class="tiny-btn">기본값</button></div>
          <div class="color-row"><label>강조색<input id="accentColor" type="color"></label></div>
        </section>
        <section class="control-section compact-info"><h3>사용 방법</h3><p>텍스트는 캔버스에서 직접 입력합니다. Enter로 줄바꿈하고, 바깥을 클릭하면 변경 기록에 저장됩니다.</p></section>
      </div>
    </aside>
  </div>
  <div id="toast" class="toast" role="status" aria-live="polite"></div>
  <script type="module" src="/static/admin-editor.js"></script>
</body>
</html>`
}
