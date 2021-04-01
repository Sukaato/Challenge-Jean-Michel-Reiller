import { NextFunction, Response, Router } from 'express';
import { LocalRequest } from '../types/local-request.type';

export const juryRouter: Router = Router();

/* GET users listing. */
juryRouter.get('/', (req: LocalRequest, res: Response, next: NextFunction) => {
    res.json({title: "Express ES6 with TypeScript Sample"});
});
