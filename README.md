# 인애드컴퍼니 홈페이지 (www.inadcompany.co.kr)

## 개발·배포 흐름 (함께 개발할 때 반드시 지킬 것)

Cloudflare Pages 가 이 GitHub 저장소에 연결되어 있다.

| 어디에 올리나 | 무슨 일이 생기나 |
|---|---|
| `main` 이외의 브랜치에 push | **테스트 서버**(미리보기)가 자동으로 생긴다. 주소: `<브랜치명>.inadd-company-website.pages.dev` (PR 화면에도 링크가 달린다) |
| `main` 에 합쳐짐(PR 머지) | **실제 사이트**(www.inadcompany.co.kr)에 자동 반영된다 |

1. 각자 브랜치를 만들어 작업한다. `main` 에 직접 push 하지 않는다(보호 규칙으로 막혀 있음).
2. 브랜치를 push 하면 테스트 서버가 뜬다. 거기서 확인한다.
3. PR 을 올린다. **대표 계정(@tnaks6325-web)이 승인해야** `main` 에 합쳐지고 실제 사이트에 반영된다.
4. **`wrangler pages deploy` 나 Cloudflare 화면에서 실제 사이트에 직접 올리지 않는다.**
   직접 올리면 저장소와 실제 사이트가 어긋나고, 다음 머지 때 기능이 사라진다(2026-10 실제 발생).
   Cloudflare 화면은 문제가 생겼을 때 직전 배포로 되돌리는(Rollback) 용도로만 쓴다.

### PR 화면 비교 캡처 (`.github/workflows/visual-diff.yml`)

PR 이 열리거나 커밋이 더 올라오면 GitHub Actions 가 자동으로:

1. `main`(수정 전)·PR(수정 후) 코드를 각각 로컬 서버(vite, 빈 데이터)로 띄우고
2. 사이트맵의 모든 페이지 + `/`, `/marketing/seo` 를 PC(1440)·휴대폰(390) 크기로 전체 화면 캡처한 뒤
3. 달라진 곳만 "왼쪽 수정 전 / 오른쪽 수정 후" + 빨간 테두리 그림으로 만들어
4. PR 댓글로 올린다(저장소 주인 언급 → GitHub 알림 메일). 그 메일에 "승인"이라고 답장하면 반영된다(아래).

- 스크립트: `scripts/visual-diff/run.mjs` (부품은 그 폴더의 `package.json` — 사이트 빌드와 무관)
- 그림 보관: `visual-diff-images` 브랜치. Cloudflare Pages 미리보기 배포 대상에서 제외해 둠(`preview_branch_excludes`).
- 같은 조건으로 찍기 위해 시계·난수 고정, 애니메이션 끔, 영상 첫 장면 정지, iframe·지도(Leaflet)는 회색으로 가림.
- 위에 무언가 끼워 넣어 아래가 밀려도(반 픽셀 밀림 포함) 밀린 부분은 변경으로 잡지 않는다(줄 단위 짝 맞춤 + 밀림 허용 픽셀 비교).
- 로컬 실행: 두 서버를 띄운 뒤 `node scripts/visual-diff/run.mjs --base http://127.0.0.1:5101 --head http://127.0.0.1:5102 --out out [--only /about,/works]` (`VD_DEBUG=1` 이면 잡힌 위치 출력)

### 메일 답장 "승인" → 실제 사이트 반영 (`.github/workflows/reply-approval.yml`)

화면 비교 댓글 알림 메일에 대표가 **"승인"** 이라고만 답장하면(GitHub 이 답장을 PR 댓글로 올림) 자동으로 PR 을 승인·병합한다.

- 대상: 저장소 주인이 단 댓글 중, 인용(`>`)·빈 줄을 뺀 첫 줄이 정확히 `승인`(끝의 `.` `!` 허용)인 것. 그 밖의 답장은 그냥 PR 댓글로 남아 수정한 사람에게 전달된다.
- 병합 전 확인: PR 이 열려 있고 `main` 대상·같은 저장소 브랜치 / **지금 head 커밋의 비교 댓글이 승인 답장보다 먼저 올라왔는지**(새 커밋 뒤 옛 메일에 답장하면 거절) / 그 커밋의 `visual-diff.yml` 실행이 성공했는지 / `.github/`·`scripts/visual-diff/` 를 고치지 않았는지(고쳤으면 GitHub 화면에서 직접 승인).
- 승인(작성자가 대표 본인이면 생략) → `sha` 고정 병합. 결과는 github-actions 가 `@주인` 댓글로 알린다(반영 완료 / 거절 이유).
- 열쇠: 대표 계정 fine-grained 토큰(이 저장소 + 시험 저장소, Contents·Pull requests 쓰기). 환경 `reply-approval`(배포 브랜치 `main` 만)의 비밀값 `MERGE_TOKEN` — `main` 에서 도는 작업만 꺼낼 수 있어 협업자 브랜치의 작업은 읽지 못한다. 원본은 대표 맥 `~/.config/inadd/github-merge-token`.
  - **만료 2027-10-17.** 만료되면 "열쇠가 만료" 댓글이 오고, GitHub 화면 승인은 계속 된다. 새로 만들어 `gh secret set MERGE_TOKEN --env reply-approval < 파일` 로 교체.
- `main` 보호 규칙: 승인 1명 + 새 커밋 시 승인 취소 + 필수 검사 `capture`(화면 비교) — 비교 캡처가 성공하지 않은 수정본은 합칠 수 없다(관리자 우회 제외).
- 저장소 설정 "Allow GitHub Actions to create and approve pull requests" 는 **꺼 둔다**(켜면 협업자 워크플로가 스스로 승인 가능).
- 시험 저장소: `tnaks6325-web/inadd-approval-sandbox`(공개, 사이트와 무관). 같은 파일 + 가짜 비교 댓글로 메일 답장 → 병합, 거절 경우들을 시험했다.

### 테스트 서버는 실제 사이트와 무엇이 다른가 (`wrangler.jsonc` 의 `env.preview`)

- 데이터 저장소(KV)가 분리되어 있다(`inadd-company-website-preview`). 테스트 서버의 관리자 화면에서 무엇을 저장해도 실제 사이트에는 영향이 없다.
- 모든 메일(문의 알림·소개서 회신)은 `MAIL_REDIRECT_TO`(시험 주소)로만 간다. 제목 앞에 `[테스트서버]` 가 붙는다.
- 검색엔진에 잡히지 않도록 `X-Robots-Tag: noindex` 를 보낸다.
- 관리자 로그인 비밀값(`ADMIN_JWT_SECRET`)과 메일 발송 키(`RESEND_*`)는 Cloudflare 화면의 Preview 환경 변수에 따로 넣는다(실제 사이트 값과 별개).

## 인사이트(블로그)

- `src/main.tsx` 가 빌드 진입점이다. 인사이트 경로만 직접 처리하고 나머지는 `src/index.tsx` 앱에 넘긴다.
  - `/insight` 목록 카드와 `/insight/admin_<id>` 상세 본문을 서버에서 그려, 검색로봇이 JS 없이 읽을 수 있다.
  - 상세에는 글별 제목·설명·canonical·BlogPosting 구조화 데이터·og:image 가 들어간다.
  - `/sitemap.xml` 에 글 주소(실제 수정일), `/insight/rss.xml` RSS, `robots.txt` 에 썸네일 경로 허용을 더한다.
- 자동 발행 API `/api/blog/insight` (GET 목록, POST 등록 — 같은 `notionId` 면 수정, PUT `/:id` 수정, POST `/thumb` 썸네일)
  - 헤더 `X-Blog-Key` 필요. 코드에는 키의 SHA-256 만 있다. 원문 키는 대표 맥 `~/.config/inadd/blog-api-key` 에 보관(저장소에 넣지 말 것).
  - 테스트 서버는 데이터 저장소가 분리되어 있어, 미리보기 주소로 발행하면 실제 사이트에는 올라가지 않는다.
- 노션 연결: 노션 '블로그 자동화 (마케팅 인사이트) / 📝 블로그 글'에서 상태를 **승인**으로 바꾸면,
  대표 맥의 예약 작업(launchd `com.sooman.inadd-notion-publish`, 30분마다 → `~/dev/.devtools/inadd-notion-publish.sh`)이
  `scripts/notion-publish.mjs` 로 올리고 노션에 발행됨·홈페이지 URL·글 ID·발행일을 적는다.
  - 본문은 `## 📋 네이버 블로그용 원고` 앞까지만 올라간다. 네이버 원고의 '전체 글 보기' 자리에는 홈페이지 주소가 채워진다.
  - 실패하면 상태가 수정요청으로 바뀌고 검토 메모 맨 앞에 `[발행 오류 날짜] 이유`가 적힌다.
  - 미리보기: `node scripts/notion-publish.mjs --dry-run --page <노션 페이지 ID>` (홈페이지·노션 변경 없음)
  - 로컬 시험: `--no-notion-write --site http://localhost:<포트>` (로컬 홈페이지에만 올림)
  - 열쇠: `~/.config/inadd/notion-token`(노션 내부 연결 '인애드 홈페이지 발행'), `~/.config/inadd/blog-api-key`

## 로컬 개발

```txt
npm install
npm run dev
```

```txt
npm run deploy
```

[For generating/synchronizing types based on your Worker configuration run](https://developers.cloudflare.com/workers/wrangler/commands/#types):

```txt
npm run cf-typegen
```

Pass the `CloudflareBindings` as generics when instantiation `Hono`:

```ts
// src/index.ts
const app = new Hono<{ Bindings: CloudflareBindings }>()
```
