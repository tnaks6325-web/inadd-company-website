import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('home editor has a protected reset route and a matching editor action', async () => {
  const [apiSource, editorSource] = await Promise.all([
    readFile(new URL('../src/admin/api.ts', import.meta.url), 'utf8'),
    readFile(new URL('../public/static/admin-editor.js', import.meta.url), 'utf8'),
  ]);

  assert.match(apiSource, /admin\.delete\('\/editor\/home', authMiddleware/, 'home edits need an authenticated reset endpoint');
  assert.match(apiSource, /kvDelete\(kv, 'home_editor_config'\)/, 'home reset must remove only the editor override');
  assert.match(editorSource, /resetHomeBtn/, 'the editor needs a visible home recovery action');
  assert.match(editorSource, /api\('\/editor\/home', \{ method: 'DELETE' \}\)/, 'the home recovery action must call the reset endpoint');
});
