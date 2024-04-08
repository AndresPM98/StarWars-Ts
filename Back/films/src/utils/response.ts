import { Response } from 'express';

const response = (res: Response, statusCode: number, data: any): void => {
    res.status(statusCode).json({
        error: false,
        data,
    });
};

export { response };
