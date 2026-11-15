// -----------------------------------------------------------------------------
// The contract templates the integration offers in the energy contract wizard
// of Gladys, and the public holiday calendar the Week-end options read. The
// manifest field `energy_contracts` is GENERATED from this file and the price
// grid of src/tariffs/ (`npm run templates`); test/templates.test.js fails
// when the two drift apart.
//
// Eight templates: the green fixed-price offer of ÉS and its 100 % regional
// variant, four options each. The prices are those of the customer's own
// contract, fixed for a year from its signature, so they are inputs pre-filled
// with the grid in force.
//
// The regulated Tarif Bleu is NOT here: it lives in the community catalogue
// (GladysAssistant/energy-contracts, `electricite-de-strasbourg`), which has
// one template per subscribed power and the history of prices and
// subscriptions. Declaring it here too would list it twice in the wizard.
// -----------------------------------------------------------------------------

import { readFileSync } from 'node:fs';

/** The grid in force of the green fixed-price offers. */
export const GREEN = JSON.parse(
  readFileSync(new URL('./tariffs/offres-vertes.json', import.meta.url), 'utf8'),
);

export const TIMEZONE = 'Europe/Paris';
export const LANGUAGES = ['en', 'fr', 'de', 'es'];

/**
 * The French national public holidays. `holidays-fr` is the key convention of
 * the Gladys energy contracts spec (`holidays-<country>`): another integration
 * declaring it first owns it, and our templates read its values all the same.
 */
export const HOLIDAY_CALENDAR = {
  key: 'holidays-fr',
  granularity: 'day',
  timezone: TIMEZONE,
  values: ['holiday'],
};
export const HOLIDAY_VALUE = 'holiday';

/** The usual off-peak hours of Strasbourg Électricité Réseaux; each meter has its own. */
export const DEFAULT_OFF_PEAK_SLOTS = [['22:00', '06:00']];

// Rule labels: the core shows them as they are (current price widget, "price
// changed" trigger), in one language only. The contracts are French, so are
// the period names on the bill.
export const RULE_LABELS = {
  base: 'Base',
  peak: 'Heures pleines',
  off_peak: 'Heures creuses',
  weekday: 'Semaine',
  weekend: 'Week-end',
  holiday: 'Jour férié',
};

// -- Texts --------------------------------------------------------------------

const FAMILIES = {
  green: {
    en: 'ÉS Green fixed price 1 year',
    fr: 'ÉS Offre verte prix fixe 1 an',
    de: 'ÉS Ökostrom Festpreis 1 Jahr',
    es: 'ÉS Verde precio fijo 1 año',
  },
  'green-regional': {
    en: 'ÉS 100% regional green 1 year',
    fr: 'ÉS Offre verte 100 % régionale 1 an',
    de: 'ÉS Ökostrom 100 % regional 1 Jahr',
    es: 'ÉS Verde 100 % regional 1 año',
  },
};

const OPTION_NAMES = {
  base: { en: 'Base', fr: 'Base', de: 'Base', es: 'Base' },
  'peak-off-peak': {
    en: 'Off-peak hours',
    fr: 'Heures Creuses',
    de: 'Nebenzeit',
    es: 'Horas valle',
  },
  weekend: { en: 'Weekend', fr: 'Week-end', de: 'Wochenende', es: 'Fin de semana' },
  'weekend-peak-off-peak': {
    en: 'Weekend + Off-peak hours',
    fr: 'Week-end + Heures Creuses',
    de: 'Wochenende + Nebenzeit',
    es: 'Fin de semana + Horas valle',
  },
};

const OPTION_DESCRIPTIONS = {
  base: {
    en: 'One kWh price at any time.',
    fr: 'Un seul prix du kWh à toute heure.',
    de: 'Ein kWh-Preis zu jeder Zeit.',
    es: 'Un único precio del kWh a cualquier hora.',
  },
  'peak-off-peak': {
    en: 'Reduced kWh price during the 8 off-peak hours of your meter, every day.',
    fr: 'Prix du kWh réduit pendant les 8 heures creuses de votre compteur, tous les jours.',
    de: 'Günstigerer kWh-Preis während der 8 Nebenzeitstunden deines Zählers, jeden Tag.',
    es: 'Precio del kWh reducido durante las 8 horas valle de su contador, todos los días.',
  },
  weekend: {
    en: 'Reduced kWh price all weekend and on national public holidays (Good Friday and 26 December are ordinary days). Linky meter required.',
    fr: 'Prix du kWh réduit tout le week-end et les jours fériés nationaux (le Vendredi saint et le 26 décembre sont des jours ordinaires). Compteur Linky requis.',
    de: 'Günstigerer kWh-Preis am ganzen Wochenende und an landesweiten Feiertagen (Karfreitag und 26. Dezember sind normale Tage). Linky-Zähler erforderlich.',
    es: 'Precio del kWh reducido todo el fin de semana y los festivos nacionales (el Viernes Santo y el 26 de diciembre son días normales). Requiere contador Linky.',
  },
  'weekend-peak-off-peak': {
    en: 'Reduced kWh price all weekend, on national public holidays (Good Friday and 26 December are ordinary days) and during the off-peak hours of your meter on weekdays. Linky meter required.',
    fr: 'Prix du kWh réduit tout le week-end, les jours fériés nationaux (le Vendredi saint et le 26 décembre sont des jours ordinaires) et pendant les heures creuses de votre compteur en semaine. Compteur Linky requis.',
    de: 'Günstigerer kWh-Preis am ganzen Wochenende, an landesweiten Feiertagen (Karfreitag und 26. Dezember sind normale Tage) und werktags während der Nebenzeit deines Zählers. Linky-Zähler erforderlich.',
    es: 'Precio del kWh reducido todo el fin de semana, los festivos nacionales (el Viernes Santo y el 26 de diciembre son días normales) y durante las horas valle de su contador entre semana. Requiere contador Linky.',
  },
};

const frDate = (iso) => iso.split('-').reverse().join('/');
const amount = (value, comma) => {
  const text = value.toFixed(2);
  return comma ? text.replace('.', ',') : text;
};
const kwh = (value, comma) => {
  const text = String(value);
  return comma ? text.replace('.', ',') : text;
};

/** "3 kVA: 12.18 · 6: 15.95 · …", the subscription grid of an option. */
function subscriptionGrid(subscriptions, comma) {
  return Object.entries(subscriptions)
    .map(([power, value], index) => `${power}${index === 0 ? ' kVA' : ''}: ${amount(value, comma)}`)
    .join(' · ');
}

function familyDescription(regional, grid) {
  return {
    en: `ÉS market offer${regional ? ' with electricity produced in the Grand Est region' : ''}: prices fixed for 1 year from your signature. Pre-filled with the grid of ${grid}: replace them with the prices of your contract.`,
    fr: `Offre de marché ÉS${regional ? " avec de l'électricité produite dans le Grand Est" : ''} : prix fixes 1 an à partir de votre souscription. Pré-rempli avec la grille du ${frDate(grid)} : remplacez par les prix de votre contrat.`,
    de: `Marktangebot von ÉS${regional ? ' mit Strom aus der Region Grand Est' : ''}: Preise 1 Jahr fest ab Vertragsabschluss. Vorbelegt mit der Tabelle vom ${frDate(grid)}: ersetze sie durch die Preise deines Vertrags.`,
    es: `Oferta de mercado de ÉS${regional ? ' con electricidad producida en la región Grand Est' : ''}: precios fijos 1 año desde su contratación. Prerrellenado con la tabla del ${frDate(grid)}: sustitúyalos por los precios de su contrato.`,
  };
}

const joinTexts = (...texts) =>
  Object.fromEntries(LANGUAGES.map((lang) => [lang, texts.map((text) => text[lang]).join(' ')]));

// -- Inputs -------------------------------------------------------------------

function subscriptionInput(subscriptions, grid, defaultPower) {
  return {
    key: 'subscription',
    type: 'number',
    unit: 'EUR/month',
    label: {
      en: 'Monthly subscription (by subscribed power)',
      fr: 'Abonnement mensuel (selon la puissance)',
      de: 'Monatliche Grundgebühr (nach Anschlussleistung)',
      es: 'Abono mensual (según la potencia contratada)',
    },
    description: {
      en: `Pre-filled for ${defaultPower} kVA. ÉS grid of ${grid} in EUR/month including taxes: ${subscriptionGrid(subscriptions, false)}.`,
      fr: `Pré-rempli pour ${defaultPower} kVA. Grille ÉS du ${frDate(grid)} en €/mois TTC : ${subscriptionGrid(subscriptions, true)}.`,
      de: `Vorbelegt für ${defaultPower} kVA. ÉS-Tabelle vom ${frDate(grid)} in €/Monat brutto: ${subscriptionGrid(subscriptions, true)}.`,
      es: `Prerrellenado para ${defaultPower} kVA. Tabla ÉS del ${frDate(grid)} en €/mes con impuestos: ${subscriptionGrid(subscriptions, true)}.`,
    },
    default: subscriptions[String(defaultPower)],
    required: true,
  };
}

const OFF_PEAK_SLOTS_INPUT = {
  key: 'off_peak_slots',
  type: 'time_intervals',
  label: {
    en: 'Off-peak hours of your meter',
    fr: 'Heures creuses de votre compteur',
    de: 'Nebenzeiten deines Zählers',
    es: 'Horas valle de su contador',
  },
  description: {
    en: 'Set by Strasbourg Électricité Réseaux, 8 hours a day: see your bill, under "option tarifaire".',
    fr: 'Fixées par Strasbourg Électricité Réseaux, 8 heures par jour : voir votre facture, rubrique « option tarifaire ».',
    de: 'Von Strasbourg Électricité Réseaux festgelegt, 8 Stunden pro Tag: siehe deine Rechnung unter „option tarifaire“.',
    es: 'Fijadas por Strasbourg Électricité Réseaux, 8 horas al día: véase su factura, apartado «option tarifaire».',
  },
  default: DEFAULT_OFF_PEAK_SLOTS,
  required: true,
};

function priceInput(key, value, grid, note) {
  const suffix = (lang) => (note ? ` ${note[lang]}` : '');
  return {
    key,
    type: 'number',
    unit: 'EUR/kWh',
    label: PRICE_LABELS[key],
    description: {
      en: `Price including taxes of your contract. ÉS grid of ${grid}: ${kwh(value, false)}.${suffix('en')}`,
      fr: `Prix TTC de votre contrat. Grille ÉS du ${frDate(grid)} : ${kwh(value, true)}.${suffix('fr')}`,
      de: `Bruttopreis deines Vertrags. ÉS-Tabelle vom ${frDate(grid)}: ${kwh(value, true)}.${suffix('de')}`,
      es: `Precio con impuestos de su contrato. Tabla ÉS del ${frDate(grid)}: ${kwh(value, true)}.${suffix('es')}`,
    },
    default: value,
    required: true,
  };
}

const PRICE_LABELS = {
  price: { en: 'kWh price', fr: 'Prix du kWh', de: 'kWh-Preis', es: 'Precio del kWh' },
  peak_price: {
    en: 'Peak hours kWh price',
    fr: 'Prix du kWh en heures pleines',
    de: 'kWh-Preis Hauptzeit',
    es: 'Precio del kWh en horas punta',
  },
  off_peak_price: {
    en: 'Off-peak hours kWh price',
    fr: 'Prix du kWh en heures creuses',
    de: 'kWh-Preis Nebenzeit',
    es: 'Precio del kWh en horas valle',
  },
  weekday_price: {
    en: 'Weekday kWh price',
    fr: 'Prix du kWh en semaine',
    de: 'kWh-Preis werktags',
    es: 'Precio del kWh entre semana',
  },
  weekday_peak_price: {
    en: 'Weekday peak hours kWh price',
    fr: 'Prix du kWh en semaine, heures pleines',
    de: 'kWh-Preis werktags, Hauptzeit',
    es: 'Precio del kWh entre semana, horas punta',
  },
  weekday_off_peak_price: {
    en: 'Weekday off-peak hours kWh price',
    fr: 'Prix du kWh en semaine, heures creuses',
    de: 'kWh-Preis werktags, Nebenzeit',
    es: 'Precio del kWh entre semana, horas valle',
  },
  weekend_price: {
    en: 'Weekend and public holiday kWh price',
    fr: 'Prix du kWh le week-end et les jours fériés',
    de: 'kWh-Preis Wochenende und Feiertage',
    es: 'Precio del kWh fines de semana y festivos',
  },
};

const REGIONAL_INPUT = {
  key: 'regional_option',
  type: 'number',
  unit: 'EUR/month',
  label: {
    en: '100% regional green electricity option',
    fr: 'Option Électricité verte 100 % régionale',
    de: 'Option Ökostrom 100 % regional',
    es: 'Opción electricidad verde 100 % regional',
  },
  description: {
    en: `Monthly amount including taxes added to the subscription. ÉS grid of ${GREEN.applicable_from}: ${amount(GREEN.regional_option_per_month, false)}.`,
    fr: `Montant mensuel TTC ajouté à l'abonnement. Grille ÉS du ${frDate(GREEN.applicable_from)} : ${amount(GREEN.regional_option_per_month, true)}.`,
    de: `Monatlicher Bruttobetrag zusätzlich zur Grundgebühr. ÉS-Tabelle vom ${frDate(GREEN.applicable_from)}: ${amount(GREEN.regional_option_per_month, true)}.`,
    es: `Importe mensual con impuestos añadido al abono. Tabla ÉS del ${frDate(GREEN.applicable_from)}: ${amount(GREEN.regional_option_per_month, true)}.`,
  },
  default: GREEN.regional_option_per_month,
  required: true,
};

// -- Tariffs --------------------------------------------------------------------

function tariffOf(rules, fallback, { calendars = [], regional = false } = {}) {
  const components = [
    { key: 'energy', kind: 'consumption', rules, fallback },
    { key: 'subscription', kind: 'fixed', amount: '{{input:subscription}}', per: 'month' },
  ];
  if (regional) {
    components.push({
      key: 'regional_option',
      kind: 'fixed',
      label: 'Option Électricité verte 100 % régionale',
      amount: '{{input:regional_option}}',
      per: 'month',
    });
  }
  return { tariff_version: 1, ...(calendars.length > 0 ? { calendars } : {}), components };
}

const holidayRule = (price) => ({
  label: RULE_LABELS.holiday,
  when: { calendar: { [HOLIDAY_CALENDAR.key]: HOLIDAY_VALUE } },
  price,
});
const weekendRule = (price) => ({
  label: RULE_LABELS.weekend,
  when: { weekdays: ['sat', 'sun'] },
  price,
});
const offPeakRule = (price) => ({
  label: RULE_LABELS.off_peak,
  when: { time: '{{input:off_peak_slots}}' },
  price,
});

// Template key suffix, grid of src/tariffs/offres-vertes.json, inputs, tariff.
// Template and input keys are stored in the users' contracts: never rename one.
const OPTIONS = {
  base: {
    key: 'base',
    grid: 'base',
    inputs: (prices, grid) => [
      priceInput('price', prices.price_3_6, grid, {
        en: `For 9 to 36 kVA: ${kwh(prices.price_9_36, false)}.`,
        fr: `De 9 à 36 kVA : ${kwh(prices.price_9_36, true)}.`,
        de: `Für 9 bis 36 kVA: ${kwh(prices.price_9_36, true)}.`,
        es: `De 9 a 36 kVA: ${kwh(prices.price_9_36, true)}.`,
      }),
    ],
    tariff: (extra) => tariffOf([], { label: RULE_LABELS.base, price: '{{input:price}}' }, extra),
  },
  'peak-off-peak': {
    key: 'heures-creuses',
    grid: 'peak_off_peak',
    inputs: (prices, grid) => [
      priceInput('peak_price', prices.peak_price, grid),
      priceInput('off_peak_price', prices.off_peak_price, grid),
      OFF_PEAK_SLOTS_INPUT,
    ],
    tariff: (extra) =>
      tariffOf(
        [offPeakRule('{{input:off_peak_price}}')],
        { label: RULE_LABELS.peak, price: '{{input:peak_price}}' },
        extra,
      ),
  },
  weekend: {
    key: 'week-end',
    grid: 'weekend',
    holidays: true,
    inputs: (prices, grid) => [
      priceInput('weekday_price', prices.weekday_price, grid),
      priceInput('weekend_price', prices.weekend_price, grid),
    ],
    tariff: (extra) =>
      tariffOf(
        [holidayRule('{{input:weekend_price}}'), weekendRule('{{input:weekend_price}}')],
        { label: RULE_LABELS.weekday, price: '{{input:weekday_price}}' },
        extra,
      ),
  },
  'weekend-peak-off-peak': {
    key: 'week-end-heures-creuses',
    grid: 'weekend_peak_off_peak',
    holidays: true,
    inputs: (prices, grid) => [
      priceInput('weekday_peak_price', prices.weekday_peak_price, grid),
      priceInput('weekday_off_peak_price', prices.weekday_off_peak_price, grid),
      // The grid prints the weekend peak and off-peak prices apart; they are the same.
      priceInput('weekend_price', prices.weekend_peak_price, grid),
      OFF_PEAK_SLOTS_INPUT,
    ],
    tariff: (extra) =>
      tariffOf(
        [
          holidayRule('{{input:weekend_price}}'),
          weekendRule('{{input:weekend_price}}'),
          offPeakRule('{{input:weekday_off_peak_price}}'),
        ],
        { label: RULE_LABELS.peak, price: '{{input:weekday_peak_price}}' },
        extra,
      ),
  },
};

const DEFAULT_POWER = 6;

function templatesOf(family) {
  const grid = GREEN.applicable_from;
  const regional = family === 'green-regional';
  const prefix = regional ? 'es-verte-regionale' : 'es-verte-prix-fixe';
  return Object.entries(OPTIONS).map(([option, definition]) => {
    const calendars = definition.holidays ? [HOLIDAY_CALENDAR.key] : [];
    const prices = GREEN.options[definition.grid];
    return {
      key: `${prefix}-${definition.key}`,
      name: Object.fromEntries(
        LANGUAGES.map((lang) => [
          lang,
          `${FAMILIES[family][lang]} – ${OPTION_NAMES[option][lang]}`,
        ]),
      ),
      description: joinTexts(OPTION_DESCRIPTIONS[option], familyDescription(regional, grid)),
      country: 'FR',
      currency: GREEN.currency,
      timezone: TIMEZONE,
      pricing_mode: 'rules',
      version: grid,
      ...(calendars.length > 0 ? { calendars } : {}),
      inputs: [
        ...definition.inputs(prices, grid),
        subscriptionInput(prices.subscription_per_month, grid, DEFAULT_POWER),
        ...(regional ? [REGIONAL_INPUT] : []),
      ],
      tariff: definition.tariff({ calendars, regional }),
    };
  });
}

/** The manifest `energy_contracts` field. */
export function buildEnergyContracts() {
  return {
    templates: [...templatesOf('green'), ...templatesOf('green-regional')],
    calendars: [HOLIDAY_CALENDAR],
  };
}

/** Keys of the templates whose prices depend on the public holidays. */
export const HOLIDAY_TEMPLATE_KEYS = buildEnergyContracts()
  .templates.filter((entry) => entry.calendars?.includes(HOLIDAY_CALENDAR.key))
  .map((entry) => entry.key);
