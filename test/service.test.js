// -----------------------------------------------------------------------------
// The running part: the `holidays-fr` calendar kept fed in the fake Gladys of
// the SDK, each holiday published once.
// -----------------------------------------------------------------------------

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { contractOf, createMemoryStore, createWorld } from './helpers/world.js';

test('the national holidays are published from the 1st of January of last year to a week ahead', async () => {
  const world = await createWorld({ at: '2026-11-08T08:00:00Z' });
  const holidays = world.holidays();
  assert.equal(holidays[0], '2025-01-01');
  // Armistice is three days ahead; Christmas is beyond the week Gladys accepts.
  assert.equal(holidays.at(-1), '2026-11-11');
  assert.ok(holidays.includes('2026-04-06'), 'Easter Monday');
  assert.ok(!holidays.includes('2026-04-03'), 'Good Friday is an ordinary day for ÉS');
  assert.ok(!holidays.includes('2025-12-26'), '26 December is an ordinary day for ÉS');
  assert.equal(world.service.calendar.status, 'ok');
});

test('a contract starting in the past gets its holidays back to its first day', async () => {
  const world = await createWorld({
    contracts: [contractOf('es-verte-prix-fixe-week-end', { valid_from: '2023-05-01' })],
  });
  assert.equal(world.holidays()[0], '2023-05-01');
});

test('a holiday is published once, and the next one when it comes within a week', async () => {
  const world = await createWorld({ at: '2026-11-08T08:00:00Z' });
  const published = world.holidays().length;
  await world.service.sync();
  assert.equal(world.holidays().length, published);
  world.clock.ms = Date.parse('2026-12-20T08:00:00Z');
  await world.service.sync();
  assert.deepEqual(world.holidays().slice(published), ['2026-12-25']);
});

test('the published dates survive a restart (/data)', async () => {
  const store = createMemoryStore();
  await createWorld({ store, at: '2026-11-08T08:00:00Z' });
  const saved = store.load('state.json').published_holidays;
  assert.ok(saved.includes('2026-11-11'));
  const restarted = await createWorld({ store, calendar: [], at: '2026-11-08T08:00:00Z' });
  // Only the holidays around today are checked against Gladys and sent again.
  assert.deepEqual(restarted.holidays(), ['2026-11-11']);
});

test('another integration owning holidays-fr is not an error: its values are read', async () => {
  const world = await createWorld({ calendar: null });
  assert.equal(world.service.calendar.status, 'refused');
  await world.service.sync();
  assert.equal(world.service.calendar.status, 'refused');
});

test('Gladys failing to list the contracts does not stop the holidays', async () => {
  const world = await createWorld({ connect: false });
  world.gladys.getEnergyContracts = async () => {
    throw new Error('boom');
  };
  await world.gladys.connect();
  await world.service.queue;
  assert.ok(world.holidays().includes('2026-11-11'));
});
