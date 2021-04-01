import { NextFunction, Response, Router } from 'express';
import { LocalRequest } from '../types/local-request.type';

export const ipMiddleware = Router();

ipMiddleware.use((req: LocalRequest, res: Response, next: NextFunction) => {
  const { ip } = req;
  const parsed = ip === '::1' ? 'localhost' : ip;

  req.local.ip = parsed;

  return next();
});