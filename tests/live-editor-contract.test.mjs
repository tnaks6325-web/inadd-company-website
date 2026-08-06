import assert from "node:assert/strict";
import test from "node:test";

import {
  LIVE_EDITOR_CHANNEL,
  LIVE_EDITOR_VERSION,
  LIVE_EDITOR_ROUTES,
  isLiveEditorMessage,
  normalizeLiveEditorRoute,
  toLiveEditorUrl,
} from "../public/static/live-editor-contract.js";

test("accepts only versioned live editor messages with an allowlisted type", () => {
  assert.equal(isLiveEditorMessage({
    channel: LIVE_EDITOR_CHANNEL,
    version: LIVE_EDITOR_VERSION,
    type: "set-mode",
    mode: "interact",
  }), true);

  assert.equal(isLiveEditorMessage({
    channel: LIVE_EDITOR_CHANNEL,
    version: LIVE_EDITOR_VERSION + 1,
    type: "set-mode",
    mode: "interact",
  }), false);
  assert.equal(isLiveEditorMessage({ type: "run-code", code: "alert(1)" }), false);
  assert.equal(isLiveEditorMessage({
    channel: LIVE_EDITOR_CHANNEL,
    version: LIVE_EDITOR_VERSION,
    type: "apply",
    regionId: "content.main.h2",
    text: "안전한 문구",
  }), true);
  assert.equal(isLiveEditorMessage({
    channel: LIVE_EDITOR_CHANNEL,
    version: LIVE_EDITOR_VERSION,
    type: "apply",
    regionId: "content.main.h2",
    text: "x".repeat(501),
  }), false);
});

test("normalizes only public editor routes and removes query state", () => {
  assert.equal(normalizeLiveEditorRoute("/marketing?editor=1#services"), "/marketing");
  assert.equal(normalizeLiveEditorRoute("/marketing/influencer"), "/marketing/influencer");
  assert.equal(normalizeLiveEditorRoute("https://example.com/contact"), null);
  assert.equal(normalizeLiveEditorRoute("/admin/editor"), null);
  assert.equal(LIVE_EDITOR_ROUTES.some((route) => route.path === "/marketing/seo"), true);
});

test("keeps editor context when the canvas changes to another public route", () => {
  assert.equal(toLiveEditorUrl("/"), "/?editor=1");
  assert.equal(toLiveEditorUrl("/contact"), "/contact?editor=1");
  assert.equal(toLiveEditorUrl("/admin/editor"), null);
});

test("allows the same public route on an explicit preview origin", () => {
  assert.equal(
    normalizeLiveEditorRoute("http://127.0.0.1:4173/contact", "http://127.0.0.1:4173"),
    "/contact",
  );
});
