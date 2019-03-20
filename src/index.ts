import logger, { LoggerSetupOptions } from './lib/logger';
import runUpdate, { UpdateOptions } from './lib/update';

export function update(options: LoggerSetupOptions & UpdateOptions) {
  logger.setup(options);

  return runUpdate(options);
}
