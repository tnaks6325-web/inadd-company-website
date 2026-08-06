import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("mobile navigation exposes and updates its expanded state", async () => {
  const [renderer, main] = await Promise.all([
    readFile(new URL("src/renderer.tsx", root), "utf8"),
    readFile(new URL("public/static/main.js", root), "utf8"),
  ]);

  assert.match(renderer, /id="menuToggle"[^>]*aria-expanded="false"[^>]*aria-controls="mainNav"/);
  assert.match(main, /menuToggle\.setAttribute\('aria-expanded', String\(o\)\)/);
  assert.match(main, /menuToggle\.setAttribute\('aria-expanded', 'false'\)/);
});
