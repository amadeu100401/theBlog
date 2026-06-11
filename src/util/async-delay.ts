import { logColor } from './log-color';

const SIMULATE_WAIT_IN_MS = parseInt(
  process.env.SIMULATE_WAIT_IN_MD || '0',
  10,
);

const ENV_VERBOSE = parseInt(process.env.VERBOSE_LOG || '0', 10);

export async function simulateAwait(
  method: string | '',
  verboseOverpass?: false | true,
  time?: number,
): Promise<void> {
  const delayTime = time ? time : SIMULATE_WAIT_IN_MS;

  if (delayTime <= 0) return;

  const verbose = verboseOverpass || ENV_VERBOSE;

  if (verbose === 1) {
    logColor(`Delaying for ${delayTime / 1000}s - ${method}`);
  }

  await new Promise(resolve => setTimeout(resolve, delayTime));
}
