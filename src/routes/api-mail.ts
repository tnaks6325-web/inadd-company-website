/**
 * Resend Mail API — 상담 폼 이메일 발송
 *
 * POST /api/mail/contact   (일반 상담 - 에이전시/브랜드)
 * POST /api/mail/brochure  (회사소개서 요청)
 */

import { Hono } from 'hono'
import { kvGet } from '../admin/store'

type Bindings = {
  RESEND_API_KEY: string     // re_xxxx
  RESEND_FROM: string        // noreply@inadcompany.co.kr
  RESEND_TO: string          // tnaks6325@inadcompany.com
  ADMIN_KV: KVNamespace      // home_brochure_url 등 KV 값 읽기용
  MAIL_REDIRECT_TO?: string  // 테스트 서버 전용: 모든 메일을 이 주소로만 보낸다(wrangler.jsonc env.preview)
}

const mail = new Hono<{ Bindings: Bindings }>()

const INTERNAL_RECIPIENTS = [
  'tnaks6325@inadcompany.com',
  'inadkwj@inadcompany.com',
  'dndvkr41@inadcompany.com',
]

mail.use('*', async (c, next) => {
  const origin = c.req.header('Origin')
  if (origin && new URL(origin).host !== new URL(c.req.url).host) {
    return c.json({ ok: false, error: '허용되지 않은 요청입니다.' }, 403)
  }
  const ip = c.req.header('CF-Connecting-IP') || c.req.header('X-Forwarded-For')?.split(',')[0]?.trim() || 'unknown'
  const bucket = Math.floor(Date.now() / 3600000)
  const key = 'mail_rate_' + ip + '_' + bucket
  const count = Number(await c.env.ADMIN_KV?.get(key) || 0)
  if (count >= 10) return c.json({ ok: false, error: '요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.' }, 429)
  await c.env.ADMIN_KV?.put(key, String(count + 1), { expirationTtl: 7200 })
  await next()
})

async function backupLead(env: Bindings, type: string, data: Record<string, string>) {
  const key = 'lead_' + type + '_' + Date.now() + '_' + crypto.randomUUID().slice(0, 8)
  await env.ADMIN_KV.put(key, JSON.stringify({ type, data, receivedAt: new Date().toISOString() }))
}

/* ─────────────────────────────────────────────
   공통: 지정 수신자에게 메일 발송
───────────────────────────────────────────── */
async function sendMailTo(
  env: Bindings,
  to: string | string[],
  subject: string,
  htmlBody: string
): Promise<void> {
  let recipients = Array.isArray(to) ? to : [to]
  // 테스트 서버에서는 실제 고객·직원에게 메일이 나가지 않도록 시험 주소로만 보낸다.
  if (env.MAIL_REDIRECT_TO) {
    htmlBody = `<p style="margin:0;padding:12px 16px;background:#fff3cd;color:#664d03;font-size:13px;font-family:sans-serif;">[테스트 서버] 원래 받는 사람: ${recipients.map(escapeHtml).join(', ')}</p>` + htmlBody
    subject = `[테스트서버] ${subject}`
    recipients = [env.MAIL_REDIRECT_TO]
  }
  if (!env.RESEND_API_KEY || !env.RESEND_FROM || recipients.length === 0) {
    throw new Error('메일 환경변수가 설정되지 않았습니다.')
  }
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: env.RESEND_FROM,
      to: recipients,
      subject,
      html: htmlBody,
    }),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`메일 발송 실패: ${res.status} ${text}`)
  }
}

/* ─────────────────────────────────────────────
   편의 래퍼: 내부(관리자) 알림용
───────────────────────────────────────────── */
async function sendMail(
  env: Bindings,
  subject: string,
  htmlBody: string
): Promise<void> {
  return sendMailTo(env, INTERNAL_RECIPIENTS, subject, htmlBody)
}

/* ─────────────────────────────────────────────
   Google Drive URL → 직접 다운로드 URL 변환
   일반 업로드 PDF: /uc?export=download&id=FILE_ID
   (Google Docs /export?format=pdf 는 Docs 전용 — 일반 PDF에 사용 불가)
───────────────────────────────────────────── */
function toDriveDownloadUrl(driveUrl: string): string {
  const match = driveUrl.match(/\/file\/d\/([^/?]+)/)
  if (match) {
    return `https://drive.google.com/uc?export=download&id=${match[1]}`
  }
  try {
    const url = new URL(driveUrl)
    const id = url.searchParams.get('id')
    if (id && /drive\.google\.com$/.test(url.hostname)) {
      return 'https://drive.google.com/uc?export=download&id=' + encodeURIComponent(id)
    }
  } catch {}
  return driveUrl
}

/* ─────────────────────────────────────────────
   내부 알림용 HTML 이메일 템플릿
───────────────────────────────────────────── */
function escapeHtml(value: unknown): string {
  return String(value ?? '').replace(/[&<>"']/g, ch => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[ch]!))
}

function internalTemplate(title: string, rows: { label: string; value: string }[]): string {
  const rowsHtml = rows
    .filter(r => r.value && r.value.trim())
    .map(r => `
      <tr>
        <td style="padding:10px 16px;background:#f8f9fa;font-size:13px;color:#555;white-space:nowrap;width:120px;border-bottom:1px solid #e9ecef;">${escapeHtml(r.label)}</td>
        <td style="padding:10px 16px;font-size:14px;color:#212529;border-bottom:1px solid #e9ecef;">${escapeHtml(r.value).replace(/\n/g, '<br>')}</td>
      </tr>`).join('')

  return `<!DOCTYPE html>
<html lang="ko">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f1f3f5;font-family:'Apple SD Gothic Neo',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f3f5;padding:40px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">
        <tr>
          <td style="background:linear-gradient(135deg,#1a6bff,#0d47d6);padding:28px 32px;">
            <p style="margin:0 0 4px;font-size:12px;color:rgba(255,255,255,0.7);letter-spacing:0.1em;text-transform:uppercase;">IN AD COMPANY</p>
            <h1 style="margin:0;font-size:20px;font-weight:700;color:#fff;">${escapeHtml(title)}</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:24px 32px 8px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e9ecef;border-radius:8px;overflow:hidden;">
              ${rowsHtml}
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 32px 28px;">
            <p style="margin:0;font-size:12px;color:#adb5bd;text-align:center;">
              본 메일은 <strong>inadcompany.co.kr</strong> 상담 폼에서 자동 발송되었습니다.<br>
              ${new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

/* ─────────────────────────────────────────────
   광고주용 소개서 회신 이메일 템플릿
   headline : "회사소개서를\n보내드립니다." (줄바꿈 \n → <br>)
   bodyText : 헤더 서브 문구 (줄바꿈 \n → <br>)
   tags     : 서비스 태그 배열
───────────────────────────────────────────── */
/* 소개서는 자체 호스팅 페이지 사용 — 드라이브 권한/HTML 소스 노출 문제 회피 */
const PROFILE_URL = 'https://www.inadcompany.co.kr/company-profile'

function brochureReplyTemplate(
  pdfUrl: string,
  downloadUrl: string,
  headline: string,
  bodyText: string,
  tags: string[],
  footerAddress: string,
  contactEmail: string
): string {
  const safePdfUrl = /^https?:\/\//i.test(pdfUrl) ? escapeHtml(pdfUrl) : '#'
  const safeDownloadUrl = /^https?:\/\//i.test(downloadUrl) ? escapeHtml(downloadUrl) : '#'
  const safeFooterAddress = escapeHtml(footerAddress)
  const safeContactEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail) ? escapeHtml(contactEmail) : ''
  tags = tags.map(escapeHtml)
  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>인애드컴퍼니 회사소개서</title>
</head>
<body style="margin:0;padding:0;background:#F1F1F1;font-family:'Apple SD Gothic Neo','Malgun Gothic',sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F1F1F1;padding:40px 16px;">
  <tr><td align="center">
  <table width="600" cellpadding="0" cellspacing="0"
         style="max-width:600px;width:100%;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(26,31,46,0.08);">

    <!-- 상단 블루 액센트 -->
    <tr><td style="height:4px;background:linear-gradient(90deg,#285CCC 0%,rgba(40,92,204,0.35) 100%);font-size:0;line-height:0;">&nbsp;</td></tr>

    <!-- ── 헤더 ── -->
    <tr>
      <td style="background:#FFFFFF;padding:44px 40px 24px;text-align:center;border-bottom:0;">
        <p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:0.25em;color:#285CCC;text-transform:uppercase;">IN AD COMPANY</p>
        <h1 style="margin:0;font-size:31px;font-weight:800;color:#1A1F2E;letter-spacing:-0.03em;line-height:1.32;">
          ${escapeHtml(headline).replace(/\n/g, '<br>')}
        </h1>
        <p style="margin:16px 0 0;font-size:14px;color:#6E6E6E;line-height:1.7;">
          ${escapeHtml(bodyText).replace(/\n/g, '<br>')}
        </p>
      </td>
    </tr>

    <!-- ── 로고 마크 (헤더와 액션 사이 여백을 채우는 시각 앵커) ── -->
    <tr>
      <td style="background:#FFFFFF;padding:26px 40px 24px;text-align:center;">
        <img src="https://www.inadcompany.co.kr/static/logo.png" alt="인애드컴퍼니"
             width="64" height="64"
             style="display:inline-block;width:64px;height:64px;border:0;outline:none;text-decoration:none;">
      </td>
    </tr>

    <!-- ── 액션 버튼 2종 (소개서 다운로드 / 포트폴리오) ── -->
    <tr>
      <td style="background:#FFFFFF;padding:0 40px 36px;text-align:center;">
        <p style="margin:0 0 22px;font-size:13px;color:#6E6E6E;line-height:1.7;">담당자가 확인 후 회신드릴 예정입니다.<br>그동안 소개서와 캠페인 사례를 살펴보세요.</p>

        <table cellpadding="0" cellspacing="0" align="center">
          <tr>
            <td style="padding-right:10px;">
              <a href="${PROFILE_URL}/download"
                 style="display:inline-block;padding:14px 26px;background:linear-gradient(180deg,#33343A 0%,#1D1E22 100%);color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;border-radius:10px;white-space:nowrap;">
                소개서 다운로드
              </a>
            </td>
            <td style="padding-left:10px;">
              <a href="https://www.inadcompany.co.kr/works"
                 style="display:inline-block;padding:13px 26px;background:#FFFFFF;border:1px solid rgba(26,31,46,0.18);color:#33343A;font-size:14px;font-weight:600;text-decoration:none;border-radius:10px;white-space:nowrap;">
                포트폴리오 보기
              </a>
            </td>
          </tr>
        </table>

        <p style="margin:20px 0 0;font-size:12px;color:#9A9AA0;">
          받기 전에 살펴보고 싶으시면
          <a href="${PROFILE_URL}" style="color:#285CCC;text-decoration:underline;">여기서 미리보기</a>를 클릭해 주세요.
        </p>
      </td>
    </tr>


    <!-- ── 연락처 / 푸터 ── -->
    <tr>
      <td style="background:#EDEDED;padding:28px 40px;border-top:1px solid rgba(26,31,46,0.08);">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="vertical-align:top;padding-right:20px;">
              <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#A5A5AB;text-transform:uppercase;">IN AD COMPANY</p>
              <p style="margin:0 0 12px;font-size:12px;color:#8A8A90;line-height:1.7;">
                대표 : 김수만<br>
                ${safeFooterAddress}
              </p>
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-right:16px;">
                    <a href="tel:010-9186-9944" style="font-size:12px;color:#285CCC;text-decoration:none;">📞 010-9186-9944</a>
                  </td>
                  <td style="padding-right:16px;">
                    <a href="mailto:${safeContactEmail}" style="font-size:12px;color:#285CCC;text-decoration:none;">✉ ${safeContactEmail}</a>
                  </td>
                  <td>
                    <a href="https://www.inadcompany.co.kr" style="font-size:12px;color:#285CCC;text-decoration:none;">🌐 inadcompany.co.kr</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        <hr style="border:none;border-top:1px solid rgba(26,31,46,0.09);margin:20px 0 16px;">
        <p style="margin:0;font-size:11px;color:#A5A5AB;line-height:1.7;text-align:center;">
          본 메일은 inadcompany.co.kr 문의 폼을 통해 자동 발송되었습니다.<br>
          수신을 원하지 않으시면 <a href="mailto:${safeContactEmail}?subject=수신거부" style="color:#9A9AA0;text-decoration:underline;">수신 거부</a>를 요청해 주세요.
        </p>
      </td>
    </tr>

  </table>
  </td></tr>
  </table>

</body>
</html>`
}

/* ─────────────────────────────────────────────
   API 라우트 — 일반 상담 (에이전시 / 브랜드)
───────────────────────────────────────────── */
mail.post('/contact', async (c) => {
  try {
    const data = await c.req.json() as Record<string, string>
    await backupLead(c.env, 'contact', data)
    const formType = data.formType === 'agency' ? '에이전시' : data.formType === 'brand' ? '브랜드' : ''

    const rows = [
      { label: '폼 유형',      value: formType },
      { label: '이름',         value: data.name },
      { label: '직급',         value: data.position },
      { label: '연락처',       value: data.phone },
      { label: '이메일',       value: data.email },
      { label: '회사명',       value: data.company },
      { label: '회사 URL',     value: data.companyUrl },
      { label: '담당 브랜드',  value: data.brand },
      { label: '브랜드 URL',   value: data.brandUrl },
      { label: '관심 서비스',  value: data.services },
      { label: '예상 예산',    value: data.budget === 'custom' ? (data.budgetCustom || '직접 입력') : data.budget },
      { label: '직접 입력 예산', value: data.budgetCustom },
      { label: '문의 내용',    value: data.message },
    ]

    await sendMail(
      c.env,
      `[상담 신청] ${data.name || data.company || data.email || '간편 문의'}`,
      internalTemplate('📋 새 상담 신청이 접수됐습니다', rows)
    )
    return c.json({ ok: true })
  } catch (e: any) {
    console.error('[mail/contact]', e.message)
    return c.json({ ok: false, error: e.message }, 500)
  }
})

/* ─────────────────────────────────────────────
   API 라우트 — 회사소개서 요청
   광고주 이메일로 소개서를 발송한다. 내부 관리자 알림은 보내지 않는다.
───────────────────────────────────────────── */
mail.post('/brochure', async (c) => {
  try {
    const data = await c.req.json() as Record<string, string>
    await backupLead(c.env, 'brochure', data)
    const toEmail = (data.email || '').trim()

    if (!toEmail) {
      return c.json({ ok: false, error: '이메일 주소가 없습니다.' }, 400)
    }

    // KV에서 PDF URL + 메일 템플릿 내용 읽기
    const [rawPdfUrl, rawSubject, rawHeadline, rawBodyText, rawTags, rawAddress, rawAddressDetail] = await Promise.all([
      kvGet(c.env.ADMIN_KV, 'home_brochure_url'),
      kvGet(c.env.ADMIN_KV, 'brochure_mail_subject'),
      kvGet(c.env.ADMIN_KV, 'brochure_mail_headline'),
      kvGet(c.env.ADMIN_KV, 'brochure_mail_body'),
      kvGet(c.env.ADMIN_KV, 'brochure_mail_tags'),
      kvGet(c.env.ADMIN_KV, 'about_address'),
      kvGet(c.env.ADMIN_KV, 'about_address_detail'),
    ])
    const pdfUrl = rawPdfUrl!
    const mailSubject = rawSubject!
    const headline = rawHeadline!
    const bodyText = rawBodyText!
    let tags: string[] = ['인플루언서', '바이럴 마케팅', '리뷰', 'PPL']
    if (rawTags) {
      try {
        const parsed = JSON.parse(rawTags)
        if (Array.isArray(parsed) && parsed.every(v => typeof v === 'string')) tags = parsed
      } catch {}
    }
    const downloadUrl = toDriveDownloadUrl(pdfUrl)

    await sendMailTo(
      c.env,
      toEmail,
      mailSubject,
      brochureReplyTemplate(pdfUrl, downloadUrl, headline, bodyText, tags, [rawAddress, rawAddressDetail].filter(Boolean).join(' '), c.env.RESEND_TO)
    )
    return c.json({ ok: true })
  } catch (e: any) {
    console.error('[mail/brochure]', e.message)
    return c.json({ ok: false, error: e.message }, 500)
  }
})

export { mail as MailRouter }
