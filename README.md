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

## 문의 접수 메일 수신자

홈페이지 상담 / 회사소개서 요청 / 킥오프 신청 알림 메일은 Resend 로 발송되며, 수신자는 두 가지 방법으로 지정합니다.

1. **관리자 페이지** — `/admin` → `Contact 관리` → `문의 접수 메일 수신자`
   등록한 이메일 전원에게 동시에 발송됩니다. (KV `mail_recipients`, 최대 50명)
2. **환경변수 `RESEND_TO`** — 관리자 페이지 목록이 비어 있을 때 사용되는 기본 수신자입니다.
   `a@example.com, b@example.com` 처럼 쉼표로 여러 명을 지정할 수 있습니다.
