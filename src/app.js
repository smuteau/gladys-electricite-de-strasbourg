// -----------------------------------------------------------------------------
// Registers the SDK handlers on a GladysIntegration (or the SDK's fake Gladys
// in the tests) and returns the service, so index.js stays a few lines and the
// tests drive the very same wiring.
// -----------------------------------------------------------------------------

import { createLogger } from '@gladysassistant/integration-sdk';
import { ContractService } from './service.js';
import { createStore } from './store.js';

const logger = createLogger({ name: 'electricite-de-strasbourg-app' });

/**
 * @param {object} gladys GladysIntegration instance
 * @param {object} [options] test seams: store, now, timers
 */
export function registerHandlers(gladys, options = {}) {
  const service = new ContractService({
    gladys,
    store: options.store ?? createStore(),
    now: options.now,
    timers: options.timers ?? true,
  });

  // Also fired after a reconnection: Gladys may have changed meanwhile.
  gladys.on('connected', async () => {
    try {
      await service.start();
    } catch (err) {
      logger.error('Initialization failed', err);
    }
  });

  return { service, stop: () => service.stop() };
}
