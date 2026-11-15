// -----------------------------------------------------------------------------
// The contract templates, priced by the pricing engine of Gladys itself
// (test/vendor/): the off-peak hours, the weekend and the public holidays, and
// the manifest kept in sync with src/templates.js.
// -----------------------------------------------------------------------------

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { engine } from './helpers/engine.js';
import {
  GREEN,
  HOLIDAY_CALENDAR,
  HOLIDAY_TEMPLATE_KEYS,
  LANGUAGES,
  buildEnergyContracts,
} from '../src/templates.js';
import { holidaysBetween } from '../src/holidays.js';

const manifest = JSON.parse(
  await readFile(new URL('../gladys-assistant-integration.json', import.meta.url), 'utf8'),
);
const { templates, calendars } = buildEnergyContracts();
const template = (key) => templates.find((entry) => entry.key === key);
const defaults = (entry) =>
  Object.fromEntries(entry.inputs.map((input) => [input.key, input.default]));

const HOLIDAYS = holidaysBetween('2021-01-01', '2030-12-31').map(({ date }) => ({
  calendar_key: HOLIDAY_CALENDAR.key,
  date,
  value: 'holiday',
}));
const lookupOf = (entries) =>
  engine.createCalendarLookup(
    { [HOLIDAY_CALENDAR.key]: { granularity: 'day', timezone: 'Europe/Paris' } },
    entries,
    'Europe/Paris',
  );
const CONTRACT = { timezone: 'Europe/Paris' };

/** Price of 1 kWh starting at each instant: [{ label, energy }]. */
function price(key, instants, { inputs = {}, entries = HOLIDAYS } = {}) {
  const entry = template(key);
  const compiled = engine.compileTariff(entry.tariff, { ...defaults(entry), ...inputs });
  const { costs } = engine.priceIntervals(
    compiled,
    CONTRACT,
    instants.map((starts_at) => ({ starts_at, kwh: 1 })),
    { calendars: lookupOf(entries) },
  );
  // The engine answers in chronological order: back to the order asked.
  const byStart = new Map(costs.map((cost) => [Date.parse(cost.starts_at), cost]));
  return instants.map((instant) => {
    const cost = byStart.get(Date.parse(instant));
    return { label: cost.label, energy: cost.components.energy };
  });
}
const prices = (...args) => price(...args).map(({ energy }) => energy);

test('the manifest carries the templates generated from src/templates.js (npm run templates)', () => {
  assert.deepEqual(manifest.energy_contracts, buildEnergyContracts());
});

test('eight templates, one per ÉS green offer and option, under keys that never change', () => {
  assert.deepEqual(
    templates.map((entry) => entry.key),
    [
      'es-verte-prix-fixe-base',
      'es-verte-prix-fixe-heures-creuses',
      'es-verte-prix-fixe-week-end',
      'es-verte-prix-fixe-week-end-heures-creuses',
      'es-verte-regionale-base',
      'es-verte-regionale-heures-creuses',
      'es-verte-regionale-week-end',
      'es-verte-regionale-week-end-heures-creuses',
    ],
  );
  assert.ok(templates.length <= 20, 'the core accepts 20 templates per integration');
  for (const entry of templates) {
    assert.equal(entry.country, 'FR');
    assert.equal(entry.currency, 'EUR');
    assert.equal(entry.timezone, 'Europe/Paris');
    assert.equal(entry.pricing_mode, 'rules');
    assert.deepEqual(entry.tariff.calendars ?? [], entry.calendars ?? []);
    assert.equal(entry.version, GREEN.applicable_from);
  }
  assert.deepEqual(calendars, [
    { key: 'holidays-fr', granularity: 'day', timezone: 'Europe/Paris', values: ['holiday'] },
  ]);
  assert.deepEqual(HOLIDAY_TEMPLATE_KEYS, [
    'es-verte-prix-fixe-week-end',
    'es-verte-prix-fixe-week-end-heures-creuses',
    'es-verte-regionale-week-end',
    'es-verte-regionale-week-end-heures-creuses',
  ]);
});

test('the names tell the contract and the option apart, in every language', () => {
  for (const lang of LANGUAGES) {
    const names = templates.map((entry) => entry.name[lang]);
    assert.equal(new Set(names).size, names.length, `duplicate name in ${lang}`);
    for (const name of names) {
      assert.match(name, /^ÉS .+ – .+$/);
    }
  }
  assert.equal(template('es-verte-prix-fixe-base').name.fr, 'ÉS Offre verte prix fixe 1 an – Base');
  assert.equal(
    template('es-verte-regionale-week-end-heures-creuses').name.fr,
    'ÉS Offre verte 100 % régionale 1 an – Week-end + Heures Creuses',
  );
});

test('every template passes the validator of the core within its limits', () => {
  for (const entry of templates) {
    const tariff = engine.substituteInputs(entry.tariff, defaults(entry));
    assert.doesNotThrow(() => engine.validateTariff(tariff), entry.key);
    assert.ok(tariff.components.length <= 16, entry.key);
    assert.ok(tariff.components[0].rules.length <= 64, entry.key);
    // The manifest validation of the core substitutes a sample for an input without default.
    const sample = Object.fromEntries(entry.inputs.map((input) => [input.key, input.default ?? 1]));
    assert.doesNotThrow(() => engine.compileTariff(entry.tariff, sample), entry.key);
  }
});

test('the texts follow the restricted grammar of the core, in four languages', () => {
  for (const entry of templates) {
    assert.ok(entry.inputs.length <= 16);
    const keys = new Set();
    for (const input of entry.inputs) {
      assert.match(input.key, /^[a-z0-9_]{1,64}$/);
      assert.ok(!keys.has(input.key), `${entry.key}: duplicate input ${input.key}`);
      keys.add(input.key);
      assert.ok(['number', 'time_intervals'].includes(input.type));
      assert.ok(input.default !== undefined && input.required === true);
      assert.ok((input.unit ?? '').length <= 16);
      assert.deepEqual(Object.keys(input.label), LANGUAGES);
      assert.deepEqual(Object.keys(input.description), LANGUAGES);
      for (const lang of LANGUAGES) {
        assert.ok(input.label[lang].length <= 64, `${entry.key}.${input.key}.label.${lang}`);
        assert.ok(
          input.description[lang].length <= 256,
          `${entry.key}.${input.key}.description.${lang}`,
        );
      }
    }
    assert.deepEqual(Object.keys(entry.name), LANGUAGES);
    assert.deepEqual(Object.keys(entry.description), LANGUAGES);
    for (const lang of LANGUAGES) {
      assert.ok(entry.name[lang].length <= 64, `${entry.key}.name.${lang}`);
      assert.ok(entry.description[lang].length <= 512, `${entry.key}.description.${lang}`);
    }
    for (const component of entry.tariff.components) {
      for (const rule of [...(component.rules ?? []), component.fallback ?? {}]) {
        assert.ok((rule.label ?? 'x').length <= 64);
      }
    }
  }
});

test('green offers: the prices of the grid of 1 November 2026 by default, or those typed', () => {
  assert.deepEqual(prices('es-verte-prix-fixe-base', ['2026-11-16T10:00:00Z']), [0.33164]);
  assert.deepEqual(
    prices('es-verte-regionale-base', ['2026-11-16T10:00:00Z'], { inputs: { price: 0.3 } }),
    [0.3],
  );
  assert.deepEqual(
    price('es-verte-prix-fixe-heures-creuses', ['2026-11-16T10:00:00Z', '2026-11-16T23:00:00Z']),
    [
      { label: 'Heures pleines', energy: 0.35512 },
      { label: 'Heures creuses', energy: 0.26341 },
    ],
  );
});

test('Week-end: Saturday 0 h to Sunday midnight and the national holidays, not the Alsatian ones', () => {
  assert.deepEqual(
    price('es-verte-prix-fixe-week-end', [
      '2026-11-20T22:30:00Z', // Friday 23:30
      '2026-11-20T23:00:00Z', // Saturday 00:00
      '2026-11-22T22:30:00Z', // Sunday 23:30
      '2026-11-22T23:00:00Z', // Monday 00:00
      '2026-11-11T10:00:00Z', // Armistice, a Wednesday
      '2027-03-26T10:00:00Z', // Good Friday: a holiday in Alsace only
      '2027-03-29T10:00:00Z', // Easter Monday
      '2025-12-26T10:00:00Z', // 26 December, a Friday: a holiday in Alsace only
    ]),
    [
      { label: 'Semaine', energy: 0.34286 },
      { label: 'Week-end', energy: 0.25103 },
      { label: 'Week-end', energy: 0.25103 },
      { label: 'Semaine', energy: 0.34286 },
      { label: 'Jour férié', energy: 0.25103 },
      { label: 'Semaine', energy: 0.34286 },
      { label: 'Jour férié', energy: 0.25103 },
      { label: 'Semaine', energy: 0.34286 },
    ],
  );
});

test('Week-end + Heures Creuses: off-peak hours on weekdays, the weekend price otherwise', () => {
  assert.deepEqual(
    price('es-verte-regionale-week-end-heures-creuses', [
      '2026-11-18T10:00:00Z', // Wednesday 11:00
      '2026-11-18T22:00:00Z', // Wednesday 23:00
      '2026-11-21T10:00:00Z', // Saturday 11:00
      '2026-11-11T10:00:00Z', // Armistice
    ]),
    [
      { label: 'Heures pleines', energy: 0.35558 },
      { label: 'Heures creuses', energy: 0.25993 },
      { label: 'Week-end', energy: 0.25993 },
      { label: 'Jour férié', energy: 0.25993 },
    ],
  );
});

test('the subscription is the grid amount of the default power, the regional option a second fixed charge', () => {
  const amounts = (key) =>
    engine
      .substituteInputs(template(key).tariff, defaults(template(key)))
      .components.filter((component) => component.kind === 'fixed')
      .map((component) => [component.key, component.amount, component.per]);
  assert.deepEqual(amounts('es-verte-prix-fixe-base'), [['subscription', 15.95, 'month']]);
  assert.deepEqual(amounts('es-verte-prix-fixe-week-end'), [['subscription', 15.86, 'month']]);
  assert.deepEqual(amounts('es-verte-regionale-week-end-heures-creuses'), [
    ['subscription', 16.05, 'month'],
    ['regional_option', 2.27, 'month'],
  ]);
});

test('the regulated Tarif Bleu stays in the community catalogue: no template of ours names it', () => {
  for (const entry of templates) {
    assert.doesNotMatch(JSON.stringify(entry), /tarif[ -]bleu|tempo/i, entry.key);
  }
});
