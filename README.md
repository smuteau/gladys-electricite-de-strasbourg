# Électricité de Strasbourg for Gladys Assistant

An external integration for [Gladys Assistant](https://gladysassistant.com) that brings the electricity
contracts of **ÉS (Électricité de Strasbourg)** to the Gladys energy monitoring.

- **Eight contract templates**, named after the bill: the green fixed-price offer (« Offre verte à prix
  fixe 1 an ») and its 100 % regional variant, each with the Base, Heures Creuses, Week-end and Week-end +
  Heures Creuses options.
- **French national public holidays**, published to the `holidays-fr` calendar the Week-end options read.

The regulated **Tarif Bleu** (Base, Heures Creuses, Tempo) is not in this integration: it lives in the
community catalogue ([GladysAssistant/energy-contracts](https://github.com/GladysAssistant/energy-contracts),
`electricite-de-strasbourg`), with one template per subscribed power and the history of prices and
subscriptions. Both show up in the same contract wizard of Gladys.

No account, no network access: Gladys prices the consumption of the meter it already follows.

User documentation: [English](docs/en.md) · [Français](docs/fr.md) · [Deutsch](docs/de.md) · [Español](docs/es.md). Requires Gladys 5.3.0 or later.

## Development

```bash
npm install
npm test             # node --test, prices the templates with the Gladys pricing engine
npm run lint
npm run format:check
npm run templates    # regenerate the manifest energy_contracts field
```

### Updating the prices

The price grid lives in `src/tariffs/offres-vertes.json`, the manifest is generated from it: replace the
prices and `applicable_from` with those of the new ÉS grid (all taxes included), then `npm run templates`,
`npm test`, and a line in `CHANGELOG.md`. The template `version` follows the date of the grid.

## Releasing

Actions → Release bumps the version, tags, builds the multi-arch image and publishes the GitHub Release.
The store lists the repository once it carries the `gladys-assistant-integration` topic.

## License and credits

Apache-2.0. The project layout, the release workflows and the holiday calendar code come from
[guim31/gladys-edf-zen-weekend](https://github.com/guim31/gladys-edf-zen-weekend) (Apache-2.0). The tests
price the templates with an unmodified copy of the Gladys 5.2.0 pricing engine (`test/vendor/`).

## Legal notice

Independent community project: not published, endorsed or supported by ÉS Énergies Strasbourg,
Électricité de Strasbourg or the ÉS group ([www.es.fr](https://www.es.fr/)), and not an official Gladys
Assistant product. The names "ÉS", "Électricité de Strasbourg", "ÉS Énergies Strasbourg", and the ÉS logo shown on the cover image, belong to their respective owners; they are used only
to name the supplier and its contracts and will be removed at the first request of their owner. The
Apache-2.0 license of this repository does not cover them. Prices are copied from the grids ÉS
publishes, with no guarantee: only the customer's contract and bills are authoritative.
