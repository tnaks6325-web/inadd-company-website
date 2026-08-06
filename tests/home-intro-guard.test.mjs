import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('skips automatic hero slide scheduling when the home has no slides', async () => {
  const source = await readFile(new URL('../public/static/main.js', import.meta.url), 'utf8');
  assert.match(source, /if \(TOTAL\) scheduleNext\(\);/, 'automatic slide scheduling must require at least one slide');
});
