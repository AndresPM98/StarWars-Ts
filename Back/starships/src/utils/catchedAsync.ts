import { Request, Response, NextFunction } from 'express';

const catchedAsync = (fn: Function) => {
    return function(req: Request, res: Response, next: NextFunction): void {
        fn(req, res).catch((err: Error) => {
            next(err);
        });
    };
};

export { catchedAsync };
