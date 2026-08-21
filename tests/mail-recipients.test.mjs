import assert from "node:assert/strict";
import test from "node:test";

import {
  DEFAULT_RECIPIENTS,
  MAX_RECIPIENTS,
  fallbackRecipients,
  normalizeRecipients,
  parseStoredRecipients,
  resolveRecipients,
} from "../src/routes/mail-recipients.ts";

test("normalizes comma / semicolon / newline separated strings", () => {
  const list = normalizeRecipients("a@inad.com, b@inad.com;c@inad.com\nd@inad.com");
  assert.deepEqual(list, ["a@inad.com", "b@inad.com", "c@inad.com", "d@inad.com"]);
});

test("lowercases, trims and removes duplicates", () => {
  const list = normalizeRecipients([" Boss@Inad.com ", "boss@inad.com", "team@inad.com"]);
  assert.deepEqual(list, ["boss@inad.com", "team@inad.com"]);
});

test("drops malformed addresses and empty input", () => {
  assert.deepEqual(normalizeRecipients(["not-an-email", "@inad.com", "a@b", "ok@inad.com"]), ["ok@inad.com"]);
  assert.deepEqual(normalizeRecipients(""), []);
  assert.deepEqual(normalizeRecipients(undefined), []);
});

test("caps the list at the Resend limit", () => {
  const many = Array.from({ length: MAX_RECIPIENTS + 10 }, (_, i) => `user${i}@inad.com`);
  assert.equal(normalizeRecipients(many).length, MAX_RECIPIENTS);
});

test("parses stored KV values as JSON or plain text", () => {
  assert.deepEqual(parseStoredRecipients('["a@inad.com","b@inad.com"]'), ["a@inad.com", "b@inad.com"]);
  assert.deepEqual(parseStoredRecipients("a@inad.com, b@inad.com"), ["a@inad.com", "b@inad.com"]);
  assert.deepEqual(parseStoredRecipients(null), []);
  assert.deepEqual(parseStoredRecipients("[]"), []);
});

test("default recipients are valid, unique and lowercase", () => {
  assert.ok(DEFAULT_RECIPIENTS.length > 0);
  assert.deepEqual(normalizeRecipients(DEFAULT_RECIPIENTS), DEFAULT_RECIPIENTS);
});

test("fallbackRecipients merges RESEND_TO with the code defaults", () => {
  const merged = fallbackRecipients("ops@inad.com");
  assert.equal(merged[0], "ops@inad.com");
  for (const email of DEFAULT_RECIPIENTS) assert.ok(merged.includes(email));

  // RESEND_TO 가 기본 수신자와 겹쳐도 중복되지 않는다
  const overlap = fallbackRecipients(DEFAULT_RECIPIENTS[0]);
  assert.deepEqual(overlap, DEFAULT_RECIPIENTS);

  // RESEND_TO 가 비어 있어도 기본 수신자는 남는다
  assert.deepEqual(fallbackRecipients(undefined), DEFAULT_RECIPIENTS);
});

test("resolveRecipients prefers the KV list over the defaults", async () => {
  const kv = (value) => ({ get: async () => value });

  assert.deepEqual(
    await resolveRecipients(kv('["team@inad.com","boss@inad.com"]'), "legacy@inad.com"),
    ["team@inad.com", "boss@inad.com"]
  );
});

test("resolveRecipients falls back to RESEND_TO + defaults when the KV list is empty", async () => {
  const kv = (value) => ({ get: async () => value });

  assert.deepEqual(await resolveRecipients(kv("[]"), "legacy@inad.com"), fallbackRecipients("legacy@inad.com"));
  assert.deepEqual(await resolveRecipients(kv(null), undefined), DEFAULT_RECIPIENTS);
  assert.deepEqual(await resolveRecipients(undefined, "a@inad.com"), fallbackRecipients("a@inad.com"));
});

test("resolveRecipients falls back when KV throws", async () => {
  const kv = { get: async () => { throw new Error("kv down"); } };
  assert.deepEqual(await resolveRecipients(kv, "legacy@inad.com"), fallbackRecipients("legacy@inad.com"));
});
