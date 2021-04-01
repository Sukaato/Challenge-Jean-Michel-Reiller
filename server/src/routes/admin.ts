import { NextFunction, Response, Router } from 'express';
import { LocalRequest } from '../types/local-request.type';

export const adminRouter: Router = Router();

/* GET users listing. */
adminRouter.get('/', (req: LocalRequest, res: Response, next: NextFunction) => {
    res.json({title: "Express ES6 with TypeScript Sample"});
});
