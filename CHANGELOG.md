# Changelog

All notable changes to this integration are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the versions follow
[Semantic Versioning](https://semver.org/). The Release workflow moves the
`Unreleased` section under the new version: never write a version heading by hand.

## [Unreleased]

## [0.2.0] - 2026-11-18

### Changed

- German texts use the formal "Sie" instead of "du", like the French and Spanish ones: the names,
  descriptions and fields of the contract templates, the configuration page and the German
  documentation.

Nothing else changes: same template keys, same prices and same `holidays-fr` calendar, so the contracts
already created keep working as they are.

## [0.1.0] - 2026-11-15

### Added

- Eight contract templates for the Gladys energy monitoring: the ÉS green fixed-price offer and its 100 %
  regional variant, each with the Base, Heures Creuses, Week-end and Week-end + Heures Creuses options.
- French national public holidays published to the `holidays-fr` calendar for the Week-end options.
- User documentation in English, French, German and Spanish.

[Unreleased]: https://github.com/smuteau/gladys-electricite-de-strasbourg/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/smuteau/gladys-electricite-de-strasbourg/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/smuteau/gladys-electricite-de-strasbourg/releases/tag/v0.1.0
