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

홈페이지 상담 신청 / 킥오프 미팅 신청 알림 메일은 Resend 로 발송되며, 수신자는 아래 방법으로 지정합니다.
(회사소개서 요청은 광고주에게 소개서 메일만 발송하고 내부 알림은 보내지 않습니다.)

1. **관리자 페이지** — `/admin` → `Contact 관리` → `문의 접수 메일 수신자`
   등록한 이메일 전원에게 동시에 발송됩니다. (KV `mail_recipients`, 최대 50명)
   여기에 목록이 저장되어 있으면 아래 2·3번은 무시되고 이 목록만 사용됩니다.
2. **코드 기본 수신자** — `src/routes/mail-recipients.ts` 의 `DEFAULT_RECIPIENTS`.
   관리자 페이지 목록이 비어 있을 때 항상 포함되는 상시 수신자입니다.
3. **환경변수 `RESEND_TO`** — 2번과 합쳐져 기본 수신자로 사용됩니다.
   `a@example.com, b@example.com` 처럼 쉼표로 여러 명을 지정할 수 있습니다.
