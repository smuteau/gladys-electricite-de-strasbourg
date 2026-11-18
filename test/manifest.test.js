// -----------------------------------------------------------------------------
// Consistency checks between `gladys-assistant-integration.json`, the package
// and the documentation. The `energy_contracts` field is checked in
// test/templates.test.js.
// -----------------------------------------------------------------------------

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { LANGUAGES } from '../src/templates.js';
import { createWorld } from './helpers/world.js';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');
const manifest = JSON.parse(await read('gladys-assistant-integration.json'));
const pkg = JSON.parse(await read('package.json'));

/** Every multi-language text of the manifest: [path, { en, fr, … }]. */
function texts(value, path = '') {
  if (Array.isArray(value)) {
    return value.flatMap((item, index) => texts(item, `${path}[${index}]`));
  }
  if (value && typeof value === 'object') {
    if (typeof value.en === 'string') {
      return [[path, value]];
    }
    return Object.entries(value).flatMap(([key, item]) => texts(item, `${path}.${key}`));
  }
  return [];
}

test('identity: a provider of energy contracts for France, computed locally', () => {
  assert.equal(manifest.name, 'Électricité de Strasbourg');
  assert.equal(manifest.type, 'provider');
  assert.deepEqual(manifest.categories, ['energy']);
  assert.deepEqual(manifest.countries, ['FR']);
  // Nothing is fetched: the price grids ship with the integration.
  assert.deepEqual(manifest.transports, ['local']);
  assert.match(manifest.docker_image, /^ghcr\.io\/[a-z0-9-]+\/gladys-electricite-de-strasbourg:/);
  assert.match(manifest.cover_image, /^https:\/\/raw\.githubusercontent\.com\/.+\/cover\.png$/);
});

test('keywords and countries need Gladys 5.3.0', () => {
  const [major, minor] = manifest.gladys_version
    .match(/>=\s*(\d+)\.(\d+)/)
    .slice(1)
    .map(Number);
  assert.ok(major > 5 || (major === 5 && minor >= 3), manifest.gladys_version);
});

test('the manifest version is the package version, and the image is tagged with it', () => {
  assert.equal(manifest.version, pkg.version);
  assert.ok(manifest.docker_image.endsWith(`:${pkg.version}`));
});

test('the manifest stays under the 100 KB the store indexer reads', async () => {
  const { size } = await stat(new URL('../gladys-assistant-integration.json', import.meta.url));
  assert.ok(size < 90 * 1024, `${size} bytes`);
});

test('every text exists in the four languages, none empty', () => {
  const all = texts(manifest);
  assert.ok(all.length > 50);
  for (const [path, text] of all) {
    assert.deepEqual(Object.keys(text), LANGUAGES, path);
    for (const lang of LANGUAGES) {
      assert.ok(text[lang].trim().length > 0, `${path}.${lang}`);
    }
  }
});

test('the catalog description holds 10 to 100 characters per language', () => {
  for (const lang of LANGUAGES) {
    const { length } = manifest.description[lang];
    assert.ok(length >= 10 && length <= 100, `${lang}: ${length}`);
  }
});

test('German uses the formal "Sie", never "du", like the French "vous" and the Spanish "usted"', async () => {
  const informal = /\b(du|Du|dein\w*|Dein\w*|dir|dich)\b/;
  for (const [path, text] of texts(manifest)) {
    assert.doesNotMatch(text.de, informal, path);
  }
  const doc = await readFile(new URL('../docs/de.md', import.meta.url), 'utf8');
  assert.doesNotMatch(doc, informal, 'docs/de.md');
});

test('the configuration page only explains: no setting, no secret, no action', () => {
  assert.deepEqual(
    manifest.config_schema.map((field) => field.type),
    ['section'],
  );
  for (const key of ['actions', 'widgets', 'scene_triggers', 'scene_actions']) {
    assert.equal(manifest[key], undefined, key);
  }
});

test('the integration registers no handler of its own: nothing to discover, no action', async () => {
  const { createFakeGladys } = await import('@gladysassistant/integration-sdk/testing');
  const bare = Object.keys(createFakeGladys({}).handlers ?? {});
  const world = await createWorld({ connect: false });
  assert.deepEqual(Object.keys(world.gladys.handlers ?? {}), bare);
});

test('the user documentation exists in the four languages, with the same sections', async () => {
  const sections = [];
  for (const lang of LANGUAGES) {
    const doc = await read(`docs/${lang}.md`);
    assert.ok(doc.length >= 300, `docs/${lang}.md is too short for the store`);
    // The owner of the names and of the logo, and the official website.
    assert.ok(doc.includes('https://www.es.fr/'), `docs/${lang}.md: link to es.fr`);
    sections.push(doc.split('\n').filter((line) => line.startsWith('## ')).length);
  }
  assert.deepEqual(sections, [6, 6, 6, 6]);
});

test('the cover image is a PNG of 150 KB at most', async () => {
  const { size } = await stat(new URL('../cover.png', import.meta.url));
  assert.ok(size > 0 && size <= 150 * 1024, `${size} bytes`);
});
