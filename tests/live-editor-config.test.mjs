import assert from "node:assert/strict";
import test from "node:test";

import {
  isLiveEditorRoute,
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
  assert.equal(isLiveEditorRoute("/admin/editor"), false);
});

test("caps stored patches to keep a page edit bounded", () => {
  const manyPatches = Object.fromEntries(Array.from({ length: 230 }, (_, index) => [
    `content.region.${index}`,
    { text: `문구 ${index}` },
  ]));

  assert.equal(Object.keys(sanitizeLiveEditorPatches(manyPatches)).length, 200);
});
