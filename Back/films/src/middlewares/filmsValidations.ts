import { Request, Response, NextFunction } from 'express';
import { ClientError } from '../utils/errors';

const filmsValidationMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const { title } = req.body;
    if (title) {
        next();
    } else {
        next(new ClientError('Error en el titulo', 401));
    }
};

export default filmsValidationMiddleware;
