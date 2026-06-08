/**
 * Resend Mail API — 상담 폼 이메일 발송
 *
 * POST /api/mail/contact   (일반 상담 - 에이전시/브랜드)
 * POST /api/mail/brochure  (회사소개서 요청)
 * POST /api/mail/kickoff   (킥오프 미팅 신청)
 */

import { Hono } from 'hono'

type Bindings = {
  RESEND_API_KEY: string   // re_xxxx
  RESEND_FROM: string      // noreply@inadcompany.co.kr
  RESEND_TO: string        // tnaks6325@inadcompany.com
}

const mail = new Hono<{ Bindings: Bindings }>()

/* ─────────────────────────────────────────────
   Resend REST API로 메일 발송
───────────────────────────────────────────── */
async function sendMail(
  env: Bindings,
  subject: string,
  htmlBody: string
): Promise<void> {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: env.RESEND_FROM,
      to: [env.RESEND_TO],
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
   HTML 이메일 템플릿
───────────────────────────────────────────── */
function emailTemplate(title: string, rows: { label: string; value: string }[]): string {
  const rowsHtml = rows
    .filter(r => r.value && r.value.trim())
    .map(r => `
      <tr>
        <td style="padding:10px 16px;background:#f8f9fa;font-size:13px;color:#555;white-space:nowrap;width:120px;border-bottom:1px solid #e9ecef;">${r.label}</td>
        <td style="padding:10px 16px;font-size:14px;color:#212529;border-bottom:1px solid #e9ecef;">${r.value}</td>
      </tr>`).join('')

  return `<!DOCTYPE html>
<html lang="ko">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f1f3f5;font-family:'Apple SD Gothic Neo',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f3f5;padding:40px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">
        <!-- 헤더 -->
        <tr>
          <td style="background:linear-gradient(135deg,#1a6bff,#0d47d6);padding:28px 32px;">
            <p style="margin:0 0 4px;font-size:12px;color:rgba(255,255,255,0.7);letter-spacing:0.1em;text-transform:uppercase;">IN AD COMPANY</p>
            <h1 style="margin:0;font-size:20px;font-weight:700;color:#fff;">${title}</h1>
          </td>
        </tr>
        <!-- 본문 -->
        <tr>
          <td style="padding:24px 32px 8px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e9ecef;border-radius:8px;overflow:hidden;">
              ${rowsHtml}
            </table>
          </td>
        </tr>
        <!-- 푸터 -->
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
   API 라우트 — 일반 상담 (에이전시 / 브랜드)
───────────────────────────────────────────── */
mail.post('/contact', async (c) => {
  try {
    const data = await c.req.json() as Record<string, string>
    const formType = data.formType === 'agency' ? '에이전시' : '브랜드'

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
      { label: '예상 예산',    value: data.budget },
      { label: '문의 내용',    value: data.message?.replace(/\n/g, '<br>') },
    ]

    await sendMail(
      c.env,
      `[상담 신청] ${data.name || ''} — ${data.company || ''}`,
      emailTemplate('📋 새 상담 신청이 접수됐습니다', rows)
    )
    return c.json({ ok: true })
  } catch (e: any) {
    console.error('[mail/contact]', e.message)
    return c.json({ ok: false, error: e.message }, 500)
  }
})

/* ─────────────────────────────────────────────
   API 라우트 — 회사소개서 요청
───────────────────────────────────────────── */
mail.post('/brochure', async (c) => {
  try {
    const data = await c.req.json() as Record<string, string>

    const rows = [
      { label: '이름',   value: data.name },
      { label: '직급',   value: data.position },
      { label: '연락처', value: data.phone },
      { label: '이메일', value: data.email },
      { label: '회사명', value: data.company },
      { label: '메모',   value: data.message?.replace(/\n/g, '<br>') },
    ]

    await sendMail(
      c.env,
      `[소개서 요청] ${data.name || ''} — ${data.company || ''}`,
      emailTemplate('📄 회사소개서 요청이 접수됐습니다', rows)
    )
    return c.json({ ok: true })
  } catch (e: any) {
    console.error('[mail/brochure]', e.message)
    return c.json({ ok: false, error: e.message }, 500)
  }
})

/* ─────────────────────────────────────────────
   API 라우트 — 킥오프 미팅 신청
───────────────────────────────────────────── */
mail.post('/kickoff', async (c) => {
  try {
    const data = await c.req.json() as Record<string, string>

    const rows = [
      { label: '담당자 이름', value: data.kf_name },
      { label: '직급',        value: data.kf_position },
      { label: '연락처',      value: data.kf_phone },
      { label: '이메일',      value: data.kf_email },
      { label: '회사명',      value: data.kf_company },
      { label: '미팅 방식',   value: data.meetingType },
      { label: '1순위 일정',  value: `${data.date1 || ''} ${data.time1 || ''}`.trim() },
      { label: '2순위 일정',  value: `${data.date2 || ''} ${data.time2 || ''}`.trim() },
      { label: '주소',        value: [data.address, data.addressDetail].filter(Boolean).join(' ') },
      { label: '참여 인원',   value: data.memberCount },
      { label: '사전 질문',   value: data.note?.replace(/\n/g, '<br>') },
    ]

    await sendMail(
      c.env,
      `[킥오프 신청] ${data.kf_name || ''} — ${data.kf_company || ''}`,
      emailTemplate('🚀 킥오프 미팅 신청이 접수됐습니다', rows)
    )
    return c.json({ ok: true })
  } catch (e: any) {
    console.error('[mail/kickoff]', e.message)
    return c.json({ ok: false, error: e.message }, 500)
  }
})

export { mail as MailRouter }
