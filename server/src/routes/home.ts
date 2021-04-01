import { NextFunction, Response, Router } from 'express';
import { resolve } from 'path';
import { LocalRequest } from '../types/local-request.type';

export const homeRouter: Router = Router();

/* GET users listing. */
homeRouter.get('*', (req: LocalRequest, res: Response, next: NextFunction) => {
    res.sendFile(resolve(__dirname, '..', '..', '..', 'client', 'build', 'index.html'))
});
