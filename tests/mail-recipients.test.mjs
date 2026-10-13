import assert from 'node:assert/strict'
import test from 'node:test'

import {
  DEFAULT_RECIPIENTS,
  MAIL_RECIPIENTS_KEY,
  checkRecipients,
  parseStoredRecipients,
  resolveRecipients,
} from '../src/routes/mail-recipients.ts'

const fakeKv = (value, { fail = false } = {}) => ({
  async get(key) {
    if (fail) throw new Error('kv down')
    return key === MAIL_RECIPIENTS_KEY ? value : null
  },
})

test('기본 수신자에 4명이 들어 있다', () => {
  assert.deepEqual(DEFAULT_RECIPIENTS, [
    'tnaks6325@inadcompany.com',
    'inadkwj@inadcompany.com',
    'dndvkr41@inadcompany.com',
    'ohmh879@inadcompany.com',
  ])
})

test('공백·대소문자·중복을 정리하고 틀린 형식은 따로 모은다', () => {
  const { recipients, invalid } = checkRecipients([' A@inad.com ', 'a@inad.com', 'b@inad.com', 'not-an-email', ''])
  assert.deepEqual(recipients, ['a@inad.com', 'b@inad.com'])
  assert.deepEqual(invalid, ['not-an-email'])
})

test('깨진 저장값은 빈 목록으로 읽는다', () => {
  assert.deepEqual(parseStoredRecipients('{broken'), [])
  assert.deepEqual(parseStoredRecipients('"a@inad.com"'), [])
  assert.deepEqual(parseStoredRecipients(null), [])
})

test('저장된 목록이 있으면 그 목록으로 보낸다', async () => {
  assert.deepEqual(await resolveRecipients(fakeKv('["x@inad.com","y@inad.com"]')), ['x@inad.com', 'y@inad.com'])
})

test('저장된 목록이 없거나 비었거나 읽기 실패면 기본 수신자로 보낸다', async () => {
  assert.deepEqual(await resolveRecipients(fakeKv(null)), DEFAULT_RECIPIENTS)
  assert.deepEqual(await resolveRecipients(fakeKv('[]')), DEFAULT_RECIPIENTS)
  assert.deepEqual(await resolveRecipients(fakeKv(null, { fail: true })), DEFAULT_RECIPIENTS)
  assert.deepEqual(await resolveRecipients(undefined), DEFAULT_RECIPIENTS)
})
