# CLAUDE.md

Project rules for coding assistants and human contributors.

## What this is

A Gladys Assistant **external integration** (Node 22+, ESM, no build step, one runtime dependency:
`@gladysassistant/integration-sdk`) for the electricity contracts of **ÉS (Électricité de Strasbourg)**.
Manifest `type: "provider"`: no device, no meter reading, no network access. It declares eight energy contract templates (`energy_contracts`, `rules` mode) and feeds the `holidays-fr` tariff calendar. The
Gladys core prices everything.

## Commands

```bash
npm install
npm test                                  # node --test
node --test test/templates.test.js        # one file
npm run templates                         # rewrite the manifest energy_contracts field
npm run lint
npm run format:check                      # Prettier, Markdown included
npx github:GladysAssistant/integration-store .   # store admission checks
```

## Architecture

```
index.js                          SDK wiring only
src/app.js                        registers the handlers (connected)
src/templates.js                  the 8 templates, generated from the price grid
src/tariffs/offres-vertes.json    the grid in force of the green fixed-price offers
src/holidays.js, src/calendar.js  French national holidays, published once each to holidays-fr
src/service.js                    reads the contracts and syncs the calendar every 10 minutes
src/store.js, src/failures.js     /data/state.json, repeated failures logged once
scripts/templates.mjs             `npm run templates`
test/vendor/gladys-5.2.0/         unmodified pricing engine of Gladys, the tests price with it
```

## Rules

- **Template keys are forever** (`es-verte-prix-fixe-…`, `es-verte-regionale-…`): users' contracts
  store them. Same for input keys and the `holidays-fr` calendar key.
- **The manifest `energy_contracts` field is generated**: change `src/templates.js` or `src/tariffs/`,
  then `npm run templates`. `test/templates.test.js` fails when they drift apart.
- **No Tarif Bleu here, on purpose** (maintainer's decision, 15/11/2026). The regulated tariff stays in
  the community catalogue (`GladysAssistant/energy-contracts`, `electricite-de-strasbourg`): it has one
  template per subscribed power, so it carries the history of prices AND subscriptions, which an
  integration template cannot (no per-power variant, 20 templates at most). Declaring it here too would
  list it twice in the wizard. A test fails if a template names Tarif Bleu or Tempo.
- **Prices are inputs**: the green offers are fixed for a year from each customer's signature, so there
  is no shared price history. The defaults are the grid in force, 6 kVA.
- **Manifest size**: the store indexer reads 100 KB. The manifest is indented with tabs and laid out by
  Prettier from a one-line JSON (about 50 KB); `test/manifest.test.js` guards 90 KB.
- **ÉS facts**: Week-end = Saturday 0:00 to Sunday 24:00 plus national holidays; Good Friday and
  26 December are weekdays. Off-peak hours are set per meter by Strasbourg Électricité Réseaux. The
  100 % regional option is the same grid plus a monthly amount.
- Texts exist in English, French, German (informal "du") and Spanish, `docs/{en,fr,de,es}.md` included
  (same sections, ending with the legal notice). Rule labels are French.
- **The cover shows the official ÉS logo**, at the maintainer's request: it belongs to ÉS, the legal
  notice of the docs and of the README says so. Keep both together.
- Versions belong to the Release workflow; every user-visible change adds a line under
  `## [Unreleased]` in `CHANGELOG.md`. The container rootfs is read-only: write only under `/data`.
