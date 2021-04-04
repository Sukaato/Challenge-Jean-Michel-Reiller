import { Level, levels, Logger } from 'log4js';
import { db_logs } from '../database/database';
import { ServerSocket } from '../socket';
import { Callback } from '../types/callback.type';
import { LogDoc } from '../types/log.type';
import { logger } from '../utils/logger';

export class LoggerService {
  private logger: Logger;

  constructor(name: string) {
    this.logger = logger.getLogger(name);
  }

  info(message: string): void {
    this.logger.info(message);
    this.makeLogEntry(message, levels.INFO);
  }

  warn(message: string): void {
    this.logger.warn(message);
    this.makeLogEntry(message, levels.WARN);
  }

  error(message: string, err: any): void {
    this.logger.error(message, err);
  }

  debug(message: string): void {
    this.logger.debug(message);
  }

  deleteLogEntry(id: string): void {
    db_logs.delete(id, (err: any) => {
      if (err) this.error(`Erreur lors de la suppression du logs: '${id}'`, err);
      this.findAllLog(logs => {
        ServerSocket.sendNewLog(logs);
      });
    });
  }

  private makeLogEntry(message: string, level: Level): void {
    db_logs.post({ message, level: level.levelStr }, () => {
      this.findAllLog(logs => {
        ServerSocket.sendNewLog(logs);
      });
    });
  }

  private findAllLog(callback: Callback<LogDoc[]>): void {
    db_logs.all((err: any, docs: LogDoc[]) => {
      if (err) {
        this.logger.error('findAll', err);
        return
      }
      callback(docs);
    });
  }


}