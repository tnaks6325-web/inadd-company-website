import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

test("ships a public HTML company-profile viewer", async () => {
  const viewerPath = path.join(root, "public", "static", "company-profile.html");
  await access(viewerPath);

  const viewer = await readFile(viewerPath, "utf8");
  assert.match(viewer, /<html/i);
});

test("links brochure recipients and contact visitors to the HTML viewer", async () => {
  const [mailRoute, contactPage, adminStore] = await Promise.all([
    readFile(path.join(root, "src", "routes", "api-mail.ts"), "utf8"),
    readFile(path.join(root, "src", "routes", "contact.tsx"), "utf8"),
    readFile(path.join(root, "src", "admin", "store.ts"), "utf8"),
  ]);

  assert.match(mailRoute, /https:\/\/www\.inadcompany\.co\.kr\/static\/company-profile\.html/);
  assert.match(adminStore, /home_brochure_url: 'https:\/\/www\.inadcompany\.co\.kr\/static\/company-profile\.html'/);
  assert.match(mailRoute, /회사소개서 보기/);
  assert.match(contactPage, /href="\/static\/company-profile\.html"/);
  assert.match(contactPage, /target="_blank"/);
});
