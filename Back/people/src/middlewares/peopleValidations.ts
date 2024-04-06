import { Request, Response, NextFunction } from 'express';
import { ClientError } from '../../utils/errors';

const peopleValidationMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const { name } = req.body;
    if (name) {
        next();
    } else {
        next(new ClientError('Error en el nombre', 401));
    }
};

export default peopleValidationMiddleware;
