import assert from "node:assert/strict";
import test from "node:test";

import {
  isLiveEditorRoute,
  sanitizeGlobalLiveEditorPatches,
  sanitizeLiveEditorPatches,
} from "../src/admin/live-editor-config.ts";

test("keeps only known route text patches with safe region identifiers", () => {
  const patches = sanitizeLiveEditorPatches({
    "content.hero.title": { text: "새 제목" },
    "content.invalid<script>": { text: "삭제" },
    "content.summary": { text: "x".repeat(700) },
  });

  assert.deepEqual(patches["content.hero.title"], { text: "새 제목" });
  assert.equal("content.invalid<script>" in patches, false);
  assert.equal(patches["content.summary"].text.length, 500);
  assert.equal(isLiveEditorRoute("/marketing/seo"), true);
  assert.equal(isLiveEditorRoute("/insight/admin_article-42"), true);
  assert.equal(isLiveEditorRoute("/insight/a/b"), false);
  assert.equal(isLiveEditorRoute("/admin/editor"), false);
});

test("caps stored patches to keep a page edit bounded", () => {
  const manyPatches = Object.fromEntries(Array.from({ length: 230 }, (_, index) => [
    `content.region.${index}`,
    { text: `문구 ${index}` },
  ]));

  assert.equal(Object.keys(sanitizeLiveEditorPatches(manyPatches)).length, 200);
});

test("keeps only safe media and link URLs for their matching live regions", () => {
  const patches = sanitizeLiveEditorPatches({
    "media.hero.image": { url: "/static/hero.jpg" },
    "link.hero.cta": { url: "https://example.com/contact" },
    "link.hero.phone": { url: "tel:01012345678" },
    "field.contact.name": { text: "Name" },
    "media.hero.script": { url: "javascript:alert(1)" },
    "link.hero.data": { url: "data:text/html,nope" },
    "content.hero.title": { url: "/wrong-shape" },
  });

  assert.deepEqual(patches["media.hero.image"], { url: "/static/hero.jpg" });
  assert.deepEqual(patches["link.hero.cta"], { url: "https://example.com/contact" });
  assert.deepEqual(patches["link.hero.phone"], { url: "tel:01012345678" });
  assert.deepEqual(patches["field.contact.name"], { text: "Name" });
  assert.equal("media.hero.script" in patches, false);
  assert.equal("link.hero.data" in patches, false);
  assert.equal("content.hero.title" in patches, false);
});

test("keeps shared header and footer patches in the same safe shape", () => {
  const patches = sanitizeLiveEditorPatches({
    "global.content.header.title": { text: "IN AD COMPANY" },
    "global.link.header.contact": { url: "/contact" },
    "global.media.footer.logo": { url: "https://cdn.example.com/logo.svg" },
    "global.link.header.unsafe": { url: "javascript:alert(1)" },
  });

  assert.deepEqual(patches["global.content.header.title"], { text: "IN AD COMPANY" });
  assert.deepEqual(patches["global.link.header.contact"], { url: "/contact" });
  assert.deepEqual(patches["global.media.footer.logo"], { url: "https://cdn.example.com/logo.svg" });
  assert.equal("global.link.header.unsafe" in patches, false);
});

test("rejects page-only regions from the shared site scope", () => {
  const patches = sanitizeGlobalLiveEditorPatches({
    "global.content.header.title": { text: "IN AD COMPANY" },
    "content.hero.title": { text: "Page-only title" },
  });

  assert.deepEqual(patches, { "global.content.header.title": { text: "IN AD COMPANY" } });
});
