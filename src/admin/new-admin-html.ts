// 새 관리자 화면(2026-11-09 대표: 시안 C 첫 화면 + B 편집 + 되돌리기) — 화면은 /static/admin2/*.js 가 그린다.
// 옛 관리자 화면은 /admin/old 에 그대로 둔다(새 화면에 문제가 생기면 바로 옛 화면으로 일할 수 있게).
const V = '20261109b'
// 화면 조각(core.js·home.js …)은 app.js 가 './home.js' 처럼 버전 없이 불러온다. 정적 파일은 4시간 캐시라
// 배포 직후 옛 조각이 섞이지 않게 import map 으로 같은 버전 꼬리표를 붙인다(파일을 새로 만들면 여기에도 추가)
const MODS = ['core', 'home', 'services', 'history', 'works', 'insight', 'gallery', 'settings']
export function newAdminHTML(): string {
  return `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex, nofollow" />
<title>관리자 – IN AD COMPANY</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" />
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="/static/admin2/app.css?v=${V}" />
</head>
<body>
<noscript>관리자 화면은 자바스크립트를 켜야 쓸 수 있습니다.</noscript>
<script type="importmap">${JSON.stringify({ imports: Object.fromEntries(MODS.map(m => [`/static/admin2/${m}.js`, `/static/admin2/${m}.js?v=${V}`])) })}</script>
<script type="module" src="/static/admin2/app.js?v=${V}"></script>
</body>
</html>`
}
