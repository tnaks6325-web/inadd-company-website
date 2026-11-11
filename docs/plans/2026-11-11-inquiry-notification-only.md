# 홈페이지 내부 문의 메일을 접수 알림으로 제한

## 범위와 완료 기준

- 일반 상담(`/api/mail/contact`)과 견적 상담(`/api/mail/estimate`)의 **직원용** 메일만 변경한다.
- 제목은 `[홈페이지 문의] 새 문의가 접수되었습니다`로 고정한다.
- 본문에는 접수 제목, 인트라넷에서 내용 확인·담당자 배정을 하라는 안내, `인트라넷 공식 문의 바로가기` 버튼만 둔다.
- 버튼 주소: `https://inadd-system.pages.dev/?tab=homepage_inquiries`.
- 이름·회사·연락처·문의 내용·견적 조합·금액·접수 위치를 직원용 제목/본문에 넣지 않는다.
- 고객 견적 메일, 회사소개서 회신, KV 백업, 인트라넷 전송, 수신자 설정, 시험 서버 리다이렉트와 실패 처리는 유지한다.
- 푸시·PR·배포·실제 메일 발송은 범위 밖이다.

## 실행 계획 및 결과

- [x] 코드맵에서 메일 라우터·견적·인트라넷 전송 연결 확인. 문자열 검색으로 관리자 시험 발송도 기존 `internalTemplate`을 사용함을 확인하여 기존 공용 템플릿은 유지.
- [x] 변경 전 전체 검사: 49개 통과.
- [x] 실제 Hono 핸들러를 실행하는 회귀 검사 작성. 메일 공급자와 인트라넷 fetch만 차단·대체하고 KV는 가짜 인메모리 저장소 사용.
- [x] RED: 변경 전 일반 상담은 고객 이름이 있는 제목으로, 견적 상담은 회사명·금액이 있는 제목으로 실패함을 확인.
- [x] 접수 데이터를 인자로 받지 않는 전용 고정 템플릿을 추가하고 두 내부 발송에 적용.
- [x] 고객 견적 HTML(홈/구독 각각)의 변경 전 SHA-256과 변경 후 결과가 일치. 기준 커밋 `596c98cc30ddd9a686f66f315ae399f83f2c666b`를 별도 scratch 사본에서 실행해 재확인.
- [x] 신규 핸들러 검사 9개: 일반/브랜드/최소 상담, 홈·구독 견적, 고객 발송 실패, 인트라넷 실패, 직원 발송 실패, 시험 서버 리다이렉트, 소개서 회신 및 백업·전송 보존.
- [x] `npm test`: 58개 통과. 실패 처리 검사의 의도된 오류 로그만 출력.
- [x] `npm run build`: 성공.
- [x] `graphify update .`: 성공. 미분류 파일·일부 심볼 없는 파일·커뮤니티 이름 갱신 안내는 비차단 경고. 코드맵 산출물은 커밋하지 않음.
- [x] 가짜 데이터만 담은 실제 핸들러 HTML을 로컬 브라우저에서 변경 전/후로 비교하고 캡처.

## 로컬 증거

모든 경로는 `/Users/sooman/.hermes/cache/scratch/` 기준이다.

- 변경 전 HTML: `inquiry-mail-before/contact-agency-0.html`, `inquiry-mail-before/estimate-home-0.html`, `inquiry-mail-before/estimate-subscription-0.html`
- 변경 후 HTML: `inquiry-mail-after/contact-agency-0.html`, `inquiry-mail-after/estimate-home-0.html`, `inquiry-mail-after/estimate-subscription-0.html`
- 비교 화면: `inquiry-mail-contact-preview.html`, `inquiry-mail-estimate-preview.html`
- 빨간 테두리·설명 포함 캡처: `inquiry-mail-contact-before-after.png`, `inquiry-mail-estimate-before-after.png`
- 재생성: `MAIL_PREVIEW_DIR=<로컬 폴더> node --test --test-name-pattern='contact handler|estimate home|estimate subscription' tests/inquiry-notification.test.mjs`

## 별도 의존성 / 미검증

인트라넷 읽기 전용 조사 당시 `public/static/js/app-core.js`의 `_readLastOpenTab()`은 세션 저장소만 읽고, 일반 초기화는 마지막 탭 또는 대시보드로 진입하며 쿼리를 제거했다. 지정 URL의 `tab` 처리와 로그인 후 복귀 보존은 부모 작업에서 인트라넷에 별도 구현한다. 이 변경은 홈페이지 저장소에만 한정한다.

운영 발송, 실제 메일 앱별 렌더링, 로그인부터 인트라넷 공식 문의 탭까지의 통합 동작은 여기서 검증하지 않았다. 브라우저 비교는 실제 템플릿 HTML의 로컬 렌더링이며 메일 클라이언트 수신 검사가 아니다.
