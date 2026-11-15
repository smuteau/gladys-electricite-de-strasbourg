// -----------------------------------------------------------------------------
// The running part of the integration. Gladys prices the contracts by itself
// with the templates of the manifest; the container only keeps the
// `holidays-fr` calendar fed (src/calendar.js), which the Week-end options
// read.
//
// A sync every 10 minutes reads the contracts again: a contract created or
// changed in Gladys sends no event to the integration, and one that starts in
// the past needs its holidays published back to its first day.
// -----------------------------------------------------------------------------

import { createLogger } from '@gladysassistant/integration-sdk';
import { HolidayCalendar } from './calendar.js';
import { createFailureLog } from './failures.js';
import { MINUTE_MS } from './time.js';

const logger = createLogger({ name: 'electricite-de-strasbourg' });

export const SYNC_INTERVAL_MS = 10 * MINUTE_MS;

export class ContractService {
  /**
   * @param {object} options
   * @param {object} options.gladys the SDK client
   * @param {object} options.store JSON files in /data (src/store.js)
   * @param {Function} [options.now] the clock (tests)
   * @param {boolean} [options.timers] false in the tests: they call sync()
   */
  constructor({ gladys, store, now = Date.now, timers = true }) {
    this.gladys = gladys;
    this.now = now;
    this.timers = timers;
    this.calendar = new HolidayCalendar({ gladys, store });
    this.contracts = [];
    this.syncTimer = null;
    this.queue = Promise.resolve();
    this.failures = createFailureLog(logger);
  }

  async start() {
    await this.sync();
    if (this.timers && !this.syncTimer) {
      this.syncTimer = setInterval(() => this.sync().catch(() => {}), SYNC_INTERVAL_MS);
      this.syncTimer.unref?.();
    }
  }

  /** One sync at a time: the timer never interleaves with a reconnection. */
  sync() {
    const run = this.queue.then(() => this.syncNow());
    this.queue = run.catch(() => {});
    return run;
  }

  async syncNow() {
    try {
      const all = await this.gladys.getEnergyContracts();
      this.contracts = Array.isArray(all) ? all : [];
      this.failures.succeeded('contracts', 'The energy contracts are read again');
    } catch (err) {
      // The holidays are published all the same, on the last contracts known.
      this.failures.failed(
        'contracts',
        `Could not read the energy contracts: ${err?.message ?? err}`,
      );
    }
    return this.calendar.sync({ now: this.now(), contracts: this.contracts });
  }

  stop() {
    clearInterval(this.syncTimer);
    this.syncTimer = null;
    return this.queue;
  }
}
