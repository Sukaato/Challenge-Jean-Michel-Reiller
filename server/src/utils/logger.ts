import log4js from 'log4js';
import { loggerConfig } from './logger.config';

class Logger {
  private logger = log4js.configure(loggerConfig);

  getLogger(name: string) {
      return this.logger.getLogger(name);
  }
}

export const logger = new Logger();