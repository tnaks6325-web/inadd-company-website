import assert from 'node:assert/strict'
import test, { after } from 'node:test'
import { mkdir, writeFile } from 'node:fs/promises'
import { createServer } from 'vite'
import { createHash } from 'node:crypto'

// Load the real TypeScript router and all its dependencies; only network I/O is mocked.
const server = await createServer({ configFile: false, server: { middlewareMode: true }, appType: 'custom' })
after(() => server.close())
const { MailRouter } = await server.ssrLoadModule('/src/routes/api-mail.ts')
const staff = ['staff-one@example.test', 'staff-two@example.test']
const contact = {
  formType: 'agency', name: 'FAKE_NAME_782', position: 'FAKE_POSITION_782',
  phone: '010-0000-0782', email: 'customer782@example.test', company: 'FAKE_COMPANY_782',
  companyUrl: 'https://company782.example.test', brand: 'FAKE_BRAND_782',
  brandUrl: 'https://brand782.example.test', services: 'FAKE_SERVICE_782',
  budget: 'custom', budgetCustom: 'FAKE_BUDGET_782', message: 'FAKE_MESSAGE_782 <script>bad</script>',
}

async function submit(t, route, body, options = {}) {
  const values = new Map([['contact_mail_recipients', JSON.stringify(staff)]])
  const calls = []
  const pending = []
  t.mock.method(globalThis, 'fetch', async (url, init) => {
    const request = { url: String(url), ...init, body: JSON.parse(init.body) }
    calls.push(request)
    if (request.url === 'https://api.brevo.com/v3/smtp/email') {
      const customer = request.body.to.some(to => to.email === contact.email)
      return new Response(JSON.stringify({ messageId: 'fake-message', message: 'fake failure' }), { status: options.failCustomer && customer || options.failStaff && !customer ? 503 : 201 })
    }
    assert.equal(request.url, 'https://intranet.example.test/api/homepage-inquiries/ingest', 'never access an unexpected endpoint')
    return new Response('{}', { status: options.failIntranet ? 503 : 200 })
  })
  const env = {
    BREVO_API_KEY: 'fake-provider-key', MAIL_REPLY_TO: 'reply@example.test',
    INTRANET_INQUIRY_KEY: 'fake-intranet-key', INTRANET_URL: 'https://intranet.example.test',
    ADMIN_KV: { get: async key => values.get(key) ?? null, put: async (key, value) => values.set(key, value) },
    ...options.env,
  }
  const response = await MailRouter.request(`https://website.example.test/${route}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', Origin: 'https://website.example.test' }, body: JSON.stringify(body),
  }, env, { waitUntil: promise => pending.push(promise) })
  await Promise.all(pending)
  const mails = calls.filter(call => call.url === 'https://api.brevo.com/v3/smtp/email').map(call => call.body)
  const leads = [...values].filter(([key]) => key.startsWith('lead_')).map(([key, value]) => ({ key, ...JSON.parse(value) }))
  const forwarded = calls.filter(call => call.url.startsWith('https://intranet.example.test'))
  if (process.env.MAIL_PREVIEW_DIR) {
    await mkdir(process.env.MAIL_PREVIEW_DIR, { recursive: true })
    for (const [index, mail] of mails.entries()) {
      await writeFile(`${process.env.MAIL_PREVIEW_DIR}/${route}-${body.source || body.formType || 'default'}-${index}.html`, mail.htmlContent)
    }
  }
  return { response, mails, leads, forwarded }
}

function notification(mail) {
  assert.equal(mail.subject, '[홈페이지 문의] 새 문의가 접수되었습니다')
  assert.match(mail.htmlContent, /새 문의가 접수되었습니다/)
  assert.match(mail.htmlContent, /문의 내용 확인과 담당자 배정은 인트라넷 공식 문의에서 진행해 주세요\./)
  assert.match(mail.htmlContent, /<a\s+href="https:\/\/inadd-system\.pages\.dev\/\?tab=homepage_inquiries"[^>]*>\s*인트라넷 공식 문의 바로가기\s*<\/a>/)
  assert.equal((mail.htmlContent.match(/<a\s/g) || []).length, 1)
  assert.equal(mail.htmlContent.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim(),
    '새 문의가 접수되었습니다 문의 내용 확인과 담당자 배정은 인트라넷 공식 문의에서 진행해 주세요. 인트라넷 공식 문의 바로가기')
  for (const value of Object.values(contact)) {
    assert.ok(!(mail.subject + mail.htmlContent).includes(value), `private field leaked: ${value}`)
  }
  assert.doesNotMatch(mail.htmlContent, /견적 조합|만 원|접수 위치|폼 유형/)
}

test('contact handler sends only a generic intranet notification while preserving backup and forwarding', async t => {
  const { response, mails, leads, forwarded } = await submit(t, 'contact', contact)
  assert.equal(response.status, 200)
  assert.deepEqual(await response.json(), { ok: true })
  assert.equal(mails.length, 1)
  assert.deepEqual(mails[0].to, staff.map(email => ({ email })))
  assert.deepEqual(mails[0].replyTo, { email: 'reply@example.test' })
  assert.equal(leads.length, 1)
  assert.equal(leads[0].type, 'contact')
  assert.deepEqual(leads[0].data, contact)
  assert.equal(forwarded.length, 1)
  assert.deepEqual(forwarded[0].body.data, contact)
  assert.equal(forwarded[0].body.external_id, leads[0].key)
  assert.equal(forwarded[0].headers['X-Inquiry-Key'], 'fake-intranet-key')
  notification(mails[0])
})

const estimate = {
  company: contact.company, name: contact.name, phone: contact.phone, email: contact.email,
  message: contact.message, items: ['performance', 'creative'], privacy: true,
  total: 1, // The server must still recompute, not trust the submitted total.
}

for (const source of ['home', 'subscription']) {
  test(`estimate ${source} preserves customer quote, backup and forwarding but sends staff only a notification`, async t => {
    const { response, mails, leads, forwarded } = await submit(t, 'estimate', { ...estimate, source })
    assert.equal(response.status, 200)
    assert.deepEqual(await response.json(), { ok: true, total: 180 })
    assert.equal(mails.length, 2)
    const customer = mails.find(mail => mail.to[0].email === contact.email)
    const internal = mails.find(mail => mail.to[0].email === staff[0])
    assert.equal(customer.subject, `[인애드컴퍼니] ${contact.company} 마케팅 팀구독 견적 조합 내역`)
    assert.match(customer.htmlContent, /180만 원/)
    assert.match(customer.htmlContent, /퍼포먼스 마케팅/)
    assert.ok(customer.htmlContent.includes(source === 'home' ? '/#homeEstimate' : '/marketing/subscription#estimate'))
    // SHA-256 of real handler output at baseline 596c98cc (fake inputs above).
    const baseline = {
      home: '813bba95d223bb725fd4011953378dbfe8cba3b4e1c2ce6d63888f5db8c27798',
      subscription: '6f04a5794b003ed6d33178dd230aa046f317f5191cefd99f933aeced17d1dd20',
    }
    assert.equal(createHash('sha256').update(customer.htmlContent).digest('hex'), baseline[source])
    assert.equal(leads.length, 1)
    assert.equal(leads[0].type, 'contact')
    assert.equal(leads[0].data.estimateSource, source)
    assert.equal(leads[0].data.estimateItems, 'performance,creative')
    assert.equal(leads[0].data.estimateTotal, '180')
    assert.equal(leads[0].data.company, contact.company)
    assert.ok(leads[0].data.message.includes(contact.message))
    assert.ok(leads[0].data.message.includes('180만 원'))
    assert.equal(forwarded.length, 1)
    assert.deepEqual(forwarded[0].body.data, leads[0].data)
    assert.equal(forwarded[0].body.external_id, leads[0].key)
    assert.deepEqual(internal.to, staff.map(email => ({ email })))
    notification(internal)
  })
}

test('brand and minimal contact submissions use the identical generic notification', async t => {
  const first = await submit(t, 'contact', { ...contact, formType: 'brand', name: 'OTHER_FAKE_PERSON', company: 'OTHER_FAKE_COMPANY' })
  notification(first.mails[0])
  const second = await submit(t, 'contact', { email: 'minimal@example.test' })
  assert.deepEqual(await second.response.json(), { ok: true })
  assert.equal(first.mails[0].subject, second.mails[0].subject)
  assert.equal(first.mails[0].htmlContent, second.mails[0].htmlContent)
})

test('customer mail failure still accepts estimate and sends the staff notification', async t => {
  const { response, mails, leads, forwarded } = await submit(t, 'estimate', estimate, { failCustomer: true })
  assert.equal(response.status, 200)
  assert.deepEqual(await response.json(), { ok: true, total: 180 })
  assert.equal(leads.length, 1)
  assert.equal(forwarded.length, 1)
  notification(mails.find(mail => mail.to[0].email === staff[0]))
})

test('intranet failure does not prevent contact backup or notification', async t => {
  const { response, mails, leads } = await submit(t, 'contact', contact, { failIntranet: true })
  assert.equal(response.status, 200)
  assert.equal(leads.length, 1)
  notification(mails[0])
})

test('staff provider failure still returns 500 while preserving backup and forwarding', async t => {
  const { response, leads, forwarded } = await submit(t, 'contact', contact, { failStaff: true })
  assert.equal(response.status, 500)
  assert.equal((await response.json()).ok, false)
  assert.deepEqual(leads[0].data, contact)
  assert.deepEqual(forwarded[0].body.data, contact)
})

test('preview redirection remains intact and skips intranet forwarding', async t => {
  const { response, mails, forwarded } = await submit(t, 'contact', contact, {
    env: { SITE_ENV: 'preview', MAIL_REDIRECT_TO: 'preview@example.test' },
  })
  assert.equal(response.status, 200)
  assert.deepEqual(mails[0].to, [{ email: 'preview@example.test' }])
  assert.equal(mails[0].subject, '[테스트서버] [홈페이지 문의] 새 문의가 접수되었습니다')
  assert.match(mails[0].htmlContent, /\[테스트 서버\] 원래 받는 사람: staff-one@example.test, staff-two@example.test/)
  assert.equal(forwarded.length, 0)
})

test('brochure acknowledgement remains customer-only and keeps its backup', async t => {
  const { response, mails, leads, forwarded } = await submit(t, 'brochure', { email: contact.email })
  assert.equal(response.status, 200)
  assert.equal(mails.length, 1)
  assert.deepEqual(mails[0].to, [{ email: contact.email }])
  assert.match(mails[0].htmlContent, /소개서 다운로드/)
  assert.match(mails[0].htmlContent, /포트폴리오 보기/)
  assert.doesNotMatch(mails[0].htmlContent, /homepage_inquiries/)
  assert.equal(leads.length, 1)
  assert.equal(leads[0].type, 'brochure')
  assert.deepEqual(leads[0].data, { email: contact.email })
  assert.equal(forwarded.length, 0)
})
