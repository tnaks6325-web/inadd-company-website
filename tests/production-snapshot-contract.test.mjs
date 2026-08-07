import assert from 'node:assert/strict';
import test from 'node:test';

import {
  PRODUCTION_SNAPSHOT_PREFIX,
  normalizeProductionSnapshotPath,
  rewriteProductionSnapshotDocument,
  toProductionSnapshotRedirect,
  toProductionSnapshotUrl,
} from '../src/editor/production-snapshot.ts';

test('keeps the production snapshot on an allowlisted public path', () => {
  assert.equal(normalizeProductionSnapshotPath('/'), '/');
  assert.equal(normalizeProductionSnapshotPath('/marketing/seo'), '/marketing/seo');
  assert.equal(normalizeProductionSnapshotPath('/static/main.js'), '/static/main.js');
  assert.equal(normalizeProductionSnapshotPath('/api/home'), null);
  assert.equal(normalizeProductionSnapshotPath('/api/home', true), '/api/home');
  assert.equal(normalizeProductionSnapshotPath('/admin/editor'), null);
  assert.equal(normalizeProductionSnapshotPath('/static/../../api/admin'), null);
  assert.equal(normalizeProductionSnapshotPath('https://example.com/'), null);
  assert.equal(toProductionSnapshotUrl('/contact'), `${PRODUCTION_SNAPSHOT_PREFIX}/contact?editor=1`);
});

test('rewrites snapshot assets and injects the editor bridge without trusting page URLs', () => {
  const document = rewriteProductionSnapshotDocument(
    '<html><head><link href="/static/style.css"></head><body><a href="/contact">Contact</a><script>fetch("/api/home")</script></body></html>',
    '/contact',
  );

  assert.match(document, new RegExp(`${PRODUCTION_SNAPSHOT_PREFIX}/static/style\\.css`));
  assert.match(document, new RegExp(`${PRODUCTION_SNAPSHOT_PREFIX}/contact`));
  assert.match(document, new RegExp(`${PRODUCTION_SNAPSHOT_PREFIX}/api/home`));
  assert.match(document, /window\.__INAD_LIVE_EDITOR_ROUTE__ = "\/contact"/);
  assert.match(document, /\/static\/live-content-patches\.js/);
  assert.match(document, /\/static\/live-editor-bridge\.js/);
});

test('keeps production redirects inside the editor snapshot canvas', () => {
  assert.equal(
    toProductionSnapshotRedirect('/', 'https://eb3f7b50.inadd-company-website.pages.dev/contact'),
    `${PRODUCTION_SNAPSHOT_PREFIX}/?editor=1`,
  );
  assert.equal(
    toProductionSnapshotRedirect('/works?filter=featured', 'https://eb3f7b50.inadd-company-website.pages.dev/'),
    `${PRODUCTION_SNAPSHOT_PREFIX}/works?filter=featured&editor=1`,
  );
  assert.equal(
    toProductionSnapshotRedirect('https://example.com/', 'https://eb3f7b50.inadd-company-website.pages.dev/'),
    null,
  );
});
