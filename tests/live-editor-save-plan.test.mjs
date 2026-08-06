import assert from "node:assert/strict";
import test from "node:test";

import { createLiveEditorSavePlan, hasLiveEditorChanges } from "../public/static/live-editor-save-plan.js";

test("builds one save plan for every dirty editor scope", () => {
  const plan = createLiveEditorSavePlan({
    dirty: { home: true, route: true, global: true },
    route: "/marketing/seo",
    config: { fields: { hero: { text: "Home" } } },
    routePatches: { "content.hero.title": { text: "SEO" } },
    globalPatches: { "global.content.header.title": { text: "IN AD" } },
  });

  assert.deepEqual(plan, [
    { scope: "home", path: "/editor/home", body: { fields: { hero: { text: "Home" } } } },
    { scope: "route", path: "/editor/live?route=%2Fmarketing%2Fseo", body: { patches: { "content.hero.title": { text: "SEO" } } } },
    { scope: "global", path: "/editor/live-global", body: { patches: { "global.content.header.title": { text: "IN AD" } } } },
  ]);
});

test("recognizes pending changes without creating a redundant save", () => {
  assert.equal(hasLiveEditorChanges({ home: false, route: false, global: false }), false);
  assert.equal(hasLiveEditorChanges({ home: false, route: true, global: false }), true);
  assert.deepEqual(createLiveEditorSavePlan({ dirty: { home: false, route: false, global: false }, route: "/", config: {}, routePatches: {}, globalPatches: {} }), []);
  assert.deepEqual(createLiveEditorSavePlan({ dirty: { home: true, route: false, global: false }, route: "/", config: null, routePatches: {}, globalPatches: {} }), []);
});
