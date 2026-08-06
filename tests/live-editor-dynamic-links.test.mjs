import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('keeps editor context on links added after initial canvas load', async () => {
  const source = await readFile(new URL('../public/static/live-editor-bridge.js', import.meta.url), 'utf8');

  assert.match(source, /new MutationObserver\(/, 'the bridge needs to observe dynamically added page content');
  assert.match(source, /new MutationObserver\(\(\) => preserveEditorQuery\(\)\)\s*\.observe\(document\.body, \{ childList: true, subtree: true \}\)/, 'new page links must receive editor context after a DOM mutation');
});
