import assert from "node:assert/strict";
import test from "node:test";

import {
  MAX_RECIPIENTS,
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

test("resolveRecipients prefers KV list and falls back to RESEND_TO", async () => {
  const kv = (value) => ({ get: async () => value });

  assert.deepEqual(
    await resolveRecipients(kv('["team@inad.com","boss@inad.com"]'), "legacy@inad.com"),
    ["team@inad.com", "boss@inad.com"]
  );
  assert.deepEqual(await resolveRecipients(kv("[]"), "legacy@inad.com"), ["legacy@inad.com"]);
  assert.deepEqual(await resolveRecipients(undefined, "a@inad.com, b@inad.com"), ["a@inad.com", "b@inad.com"]);
  assert.deepEqual(await resolveRecipients(kv(null), undefined), []);
});

test("resolveRecipients falls back when KV throws", async () => {
  const kv = { get: async () => { throw new Error("kv down"); } };
  assert.deepEqual(await resolveRecipients(kv, "legacy@inad.com"), ["legacy@inad.com"]);
});
