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
