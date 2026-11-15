// Writes the manifest `energy_contracts` field from src/templates.js and the
// dated price grid of src/tariffs/. Run it after changing either:
//   npm run templates
// test/templates.test.js fails while the manifest is not up to date.

import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import * as prettier from 'prettier';
import { buildEnergyContracts } from '../src/templates.js';

// A file path, not a URL: Prettier would not find its config under a folder
// whose name needs escaping.
const path = fileURLToPath(new URL('../gladys-assistant-integration.json', import.meta.url));
const manifest = JSON.parse(await readFile(path, 'utf8'));
manifest.energy_contracts = buildEnergyContracts();
const options = { ...(await prettier.resolveConfig(path)), filepath: path };
// Serialized on one line, then laid out by Prettier: it only breaks the objects
// that do not fit the line width, which keeps twelve templates and five years
// of prices under the 100 KB the store indexer reads.
await writeFile(path, await prettier.format(JSON.stringify(manifest), options));
console.log(`energy_contracts: ${manifest.energy_contracts.templates.length} templates written`);
