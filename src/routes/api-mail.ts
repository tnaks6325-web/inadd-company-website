/**
 * Resend Mail API — 상담 폼 이메일 발송
 *
 * POST /api/mail/contact   (일반 상담 - 에이전시/브랜드)
 * POST /api/mail/brochure  (회사소개서 요청)
 * POST /api/mail/kickoff   (킥오프 미팅 신청)
 */

import { Hono } from 'hono'
import { resolveRecipients } from './mail-recipients'

type Bindings = {
  RESEND_API_KEY: string     // re_xxxx
  RESEND_FROM: string        // noreply@inadcompany.co.kr
  RESEND_TO: string          // 기본 수신자 (쉼표로 여러 명 지정 가능)
  ADMIN_KV?: KVNamespace     // home_brochure_url / mail_recipients 등 KV 값 읽기용
}

const mail = new Hono<{ Bindings: Bindings }>()

/* ─────────────────────────────────────────────
   공통: 지정 수신자에게 메일 발송
   to 는 문자열 또는 이메일 배열 (Resend 최대 50명)
───────────────────────────────────────────── */
async function sendMailTo(
  env: Bindings,
  to: string | string[],
  subject: string,
  htmlBody: string
): Promise<void> {
  const toList = (Array.isArray(to) ? to : [to]).filter(Boolean)
  if (!toList.length) {
    throw new Error('메일 수신자가 설정되지 않았습니다.')
  }
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: env.RESEND_FROM,
      to: toList,
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
   관리자 페이지에 등록된 수신자 전원에게 발송하고,
   등록된 목록이 없으면 RESEND_TO 로 폴백
───────────────────────────────────────────── */
async function sendMail(
  env: Bindings,
  subject: string,
  htmlBody: string
): Promise<void> {
  const recipients = await resolveRecipients(env.ADMIN_KV, env.RESEND_TO)
  return sendMailTo(env, recipients, subject, htmlBody)
}

/* ─────────────────────────────────────────────
   Google Drive URL → 직접 다운로드 URL 변환
   일반 업로드 PDF: /uc?export=download&id=FILE_ID
   (Google Docs /export?format=pdf 는 Docs 전용 — 일반 PDF에 사용 불가)
───────────────────────────────────────────── */
function toDriveDownloadUrl(driveUrl: string): string {
  const match = driveUrl.match(/\/file\/d\/([^/]+)/)
  if (match) {
    return `https://drive.google.com/uc?export=download&id=${match[1]}`
  }
  return driveUrl
}

/* ─────────────────────────────────────────────
   내부 알림용 HTML 이메일 템플릿
───────────────────────────────────────────── */
function internalTemplate(title: string, rows: { label: string; value: string }[]): string {
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
        <tr>
          <td style="background:linear-gradient(135deg,#1a6bff,#0d47d6);padding:28px 32px;">
            <p style="margin:0 0 4px;font-size:12px;color:rgba(255,255,255,0.7);letter-spacing:0.1em;text-transform:uppercase;">IN AD COMPANY</p>
            <h1 style="margin:0;font-size:20px;font-weight:700;color:#fff;">${title}</h1>
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
function brochureReplyTemplate(
  pdfUrl: string,
  downloadUrl: string,
  headline: string,
  bodyText: string,
  tags: string[]
): string {
  const year = new Date().getFullYear()
  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>인애드컴퍼니 회사소개서</title>
</head>
<body style="margin:0;padding:0;background:#0d0f14;font-family:'Apple SD Gothic Neo','Malgun Gothic',sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0d0f14;padding:40px 16px;">
  <tr><td align="center">
  <table width="600" cellpadding="0" cellspacing="0"
         style="max-width:600px;width:100%;border-radius:16px;overflow:hidden;box-shadow:0 8px 40px rgba(0,0,0,0.5);">

    <!-- ── 헤더 ── -->
    <tr>
      <td style="background:linear-gradient(135deg,#0f1729 0%,#0d1a3a 50%,#0a1628 100%);padding:40px 40px 32px;text-align:center;border-bottom:1px solid rgba(26,107,255,0.25);">
        <!-- 로고 텍스트 -->
        <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.25em;color:rgba(26,107,255,0.8);text-transform:uppercase;">IN AD COMPANY</p>
        <h1 style="margin:0;font-size:28px;font-weight:800;color:#ffffff;letter-spacing:-0.02em;line-height:1.3;">
          ${headline.replace(/\n/g, '<br>')}
        </h1>
        <p style="margin:16px 0 0;font-size:14px;color:rgba(255,255,255,0.5);line-height:1.7;">
          ${bodyText.replace(/\n/g, '<br>')}
        </p>
      </td>
    </tr>

    <!-- ── 소개서 카드 + 다운로드 버튼 ── -->
    <tr>
      <td style="background:#111827;padding:36px 40px;">

        <!-- 소개서 미리보기 카드 -->
        <table width="100%" cellpadding="0" cellspacing="0"
               style="background:linear-gradient(135deg,#1a2744,#0f1a35);border:1px solid rgba(26,107,255,0.3);border-radius:12px;overflow:hidden;margin-bottom:28px;">
          <tr>
            <td style="padding:28px 28px 24px;">
              <p style="margin:0 0 12px;font-size:10px;font-weight:700;letter-spacing:0.2em;color:rgba(26,107,255,0.7);text-transform:uppercase;">COMPANY BROCHURE</p>
              <p style="margin:0 0 8px;font-size:20px;font-weight:700;color:#ffffff;">인애드컴퍼니 소개서</p>
              <p style="margin:0 0 20px;font-size:13px;color:rgba(255,255,255,0.45);line-height:1.6;">
                서비스 소개 · 캠페인 사례 · 성과 레퍼런스 · 파트너사 현황
              </p>
              <!-- 태그 칩 -->
              <table cellpadding="0" cellspacing="0">
                <tr>
                  ${tags.map((tag, i) => {
                    const colors = [
                      { bg: 'rgba(26,107,255,0.15)',  border: 'rgba(26,107,255,0.3)',  text: 'rgba(26,107,255,0.9)'  },
                      { bg: 'rgba(168,85,247,0.12)',  border: 'rgba(168,85,247,0.3)',  text: 'rgba(168,85,247,0.9)'  },
                      { bg: 'rgba(20,184,166,0.1)',   border: 'rgba(20,184,166,0.3)',  text: 'rgba(20,184,166,0.9)'  },
                      { bg: 'rgba(249,115,22,0.1)',   border: 'rgba(249,115,22,0.3)',  text: 'rgba(249,115,22,0.9)'  },
                      { bg: 'rgba(236,72,153,0.1)',   border: 'rgba(236,72,153,0.3)',  text: 'rgba(236,72,153,0.9)'  },
                      { bg: 'rgba(234,179,8,0.1)',    border: 'rgba(234,179,8,0.3)',   text: 'rgba(234,179,8,0.9)'   },
                    ]
                    const c = colors[i % colors.length]
                    return `${i > 0 ? '<td width="6"></td>' : ''}<td style="padding:5px 10px;background:${c.bg};border:1px solid ${c.border};border-radius:20px;font-size:11px;color:${c.text};white-space:nowrap;">${tag}</td>`
                  }).join('')}
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- PDF 다운로드 버튼 -->
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
          <tr>
            <td align="center">
              <a href="${downloadUrl}"
                 style="display:inline-block;padding:16px 48px;background:linear-gradient(135deg,#1a6bff,#0d47d6);color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;border-radius:10px;letter-spacing:0.02em;">
                📄&nbsp;&nbsp;소개서 다운로드 (PDF)
              </a>
            </td>
          </tr>
        </table>

        <!-- 미리보기 링크 -->
        <p style="margin:0;text-align:center;font-size:12px;color:rgba(255,255,255,0.3);">
          다운로드가 안 되시면
          <a href="${pdfUrl}" style="color:rgba(26,107,255,0.7);text-decoration:underline;">여기서 미리보기</a>를 클릭해 주세요.
        </p>

      </td>
    </tr>

    <!-- ── 소개서에 담긴 내용 ── -->
    <tr>
      <td style="background:#0f1520;padding:32px 40px;border-top:1px solid rgba(255,255,255,0.06);">
        <p style="margin:0 0 18px;font-size:12px;font-weight:700;letter-spacing:0.15em;color:rgba(255,255,255,0.3);text-transform:uppercase;">소개서에 담긴 내용</p>
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td width="50%" style="padding-bottom:12px;vertical-align:top;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="width:6px;height:6px;background:#1a6bff;border-radius:50%;vertical-align:middle;padding-right:10px;"></td>
                  <td style="font-size:13px;color:rgba(255,255,255,0.65);line-height:1.5;">인플루언서·유튜브 마케팅</td>
                </tr>
              </table>
            </td>
            <td width="50%" style="padding-bottom:12px;vertical-align:top;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="width:6px;height:6px;background:#a855f7;border-radius:50%;vertical-align:middle;padding-right:10px;"></td>
                  <td style="font-size:13px;color:rgba(255,255,255,0.65);line-height:1.5;">바이럴·커뮤니티 마케팅</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td width="50%" style="padding-bottom:12px;vertical-align:top;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="width:6px;height:6px;background:#14b8a6;border-radius:50%;vertical-align:middle;padding-right:10px;"></td>
                  <td style="font-size:13px;color:rgba(255,255,255,0.65);line-height:1.5;">SEO·블로그·리뷰 마케팅</td>
                </tr>
              </table>
            </td>
            <td width="50%" style="padding-bottom:12px;vertical-align:top;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="width:6px;height:6px;background:#f97316;border-radius:50%;vertical-align:middle;padding-right:10px;"></td>
                  <td style="font-size:13px;color:rgba(255,255,255,0.65);line-height:1.5;">PPL·협찬 콘텐츠</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td width="50%" style="vertical-align:top;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="width:6px;height:6px;background:#eab308;border-radius:50%;vertical-align:middle;padding-right:10px;"></td>
                  <td style="font-size:13px;color:rgba(255,255,255,0.65);line-height:1.5;">주요 캠페인 성과·레퍼런스</td>
                </tr>
              </table>
            </td>
            <td width="50%" style="vertical-align:top;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="width:6px;height:6px;background:#ec4899;border-radius:50%;vertical-align:middle;padding-right:10px;"></td>
                  <td style="font-size:13px;color:rgba(255,255,255,0.65);line-height:1.5;">파트너사 현황</td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- ── 문의하기 CTA ── -->
    <tr>
      <td style="background:#111827;padding:28px 40px;border-top:1px solid rgba(255,255,255,0.06);text-align:center;">
        <p style="margin:0 0 16px;font-size:13px;color:rgba(255,255,255,0.45);">소개서를 보신 후 궁금한 점이 있으시면 언제든지 문의해 주세요.</p>
        <a href="https://www.inadcompany.co.kr/contact"
           style="display:inline-block;padding:12px 32px;background:transparent;border:1px solid rgba(26,107,255,0.5);color:rgba(26,107,255,0.9);font-size:13px;font-weight:600;text-decoration:none;border-radius:8px;">
          상담 문의하기 →
        </a>
      </td>
    </tr>

    <!-- ── 연락처 / 푸터 ── -->
    <tr>
      <td style="background:#0a0d14;padding:28px 40px;border-top:1px solid rgba(255,255,255,0.05);">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="vertical-align:top;padding-right:20px;">
              <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:rgba(255,255,255,0.25);text-transform:uppercase;">IN AD COMPANY</p>
              <p style="margin:0 0 12px;font-size:12px;color:rgba(255,255,255,0.35);line-height:1.7;">
                대표 : 김수만<br>
                경기도 안산시 단원구 고잔로 51, 타워아이즈빌 2F, 204호
              </p>
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-right:16px;">
                    <a href="tel:010-9186-9944" style="font-size:12px;color:rgba(26,107,255,0.7);text-decoration:none;">📞 010-9186-9944</a>
                  </td>
                  <td style="padding-right:16px;">
                    <a href="mailto:tnaks6325@inadcompany.com" style="font-size:12px;color:rgba(26,107,255,0.7);text-decoration:none;">✉ tnaks6325@inadcompany.com</a>
                  </td>
                  <td>
                    <a href="https://www.inadcompany.co.kr" style="font-size:12px;color:rgba(26,107,255,0.7);text-decoration:none;">🌐 inadcompany.co.kr</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        <hr style="border:none;border-top:1px solid rgba(255,255,255,0.06);margin:20px 0 16px;">
        <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.2);line-height:1.7;text-align:center;">
          본 메일은 inadcompany.co.kr 소개서 신청 폼을 통해 자동 발송되었습니다.<br>
          수신을 원하지 않으시면 <a href="mailto:tnaks6325@inadcompany.com?subject=수신거부" style="color:rgba(255,255,255,0.3);text-decoration:underline;">수신 거부</a>를 요청해 주세요.
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
   1) 내부 알림  → RESEND_TO (관리자)
   2) 소개서 발송 → 광고주 이메일 (브랜딩 템플릿)
───────────────────────────────────────────── */
mail.post('/brochure', async (c) => {
  try {
    const data = await c.req.json() as Record<string, string>
    const toEmail = (data.email || '').trim()

    if (!toEmail) {
      return c.json({ ok: false, error: '이메일 주소가 없습니다.' }, 400)
    }

    // KV에서 PDF URL + 메일 템플릿 내용 읽기
    const kv = c.env.ADMIN_KV
    const [rawPdfUrl, rawHeadline, rawBodyText, rawTags] = await Promise.all([
      kv?.get('home_brochure_url') ?? null,
      kv?.get('brochure_mail_headline') ?? null,
      kv?.get('brochure_mail_body') ?? null,
      kv?.get('brochure_mail_tags') ?? null,
    ])
    const pdfUrl     = rawPdfUrl     ?? 'https://drive.google.com/file/d/1YsEoDjdrOatvEO1-jQHxoKBEC0vY4ihO/view'
    const headline   = rawHeadline   ?? '회사소개서를\n보내드립니다.'
    const bodyText   = rawBodyText   ?? '요청해 주셔서 감사합니다.\n인애드컴퍼니의 서비스와 레퍼런스를 담은 소개서입니다.'
    const tags: string[] = rawTags   ? JSON.parse(rawTags) : ['인플루언서', '바이럴 마케팅', 'SEO · 리뷰', 'PPL']
    const downloadUrl = toDriveDownloadUrl(pdfUrl)

    // ① 내부 알림 메일 (관리자용)
    const internalRows = [
      { label: '이메일', value: toEmail },
      { label: '소개서 URL', value: pdfUrl },
      { label: '신청 시각', value: new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }) },
    ]
    await sendMail(
      c.env,
      `[소개서 요청] ${toEmail}`,
      internalTemplate('📄 회사소개서 요청이 접수됐습니다', internalRows)
    )

    // ② 광고주 회신 메일 (소개서 PDF 링크 + KV 템플릿 내용 포함)
    await sendMailTo(
      c.env,
      toEmail,
      '[인애드컴퍼니] 요청하신 회사소개서를 보내드립니다.',
      brochureReplyTemplate(pdfUrl, downloadUrl, headline, bodyText, tags)
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
      internalTemplate('🚀 킥오프 미팅 신청이 접수됐습니다', rows)
    )
    return c.json({ ok: true })
  } catch (e: any) {
    console.error('[mail/kickoff]', e.message)
    return c.json({ ok: false, error: e.message }, 500)
  }
})

export { mail as MailRouter }
