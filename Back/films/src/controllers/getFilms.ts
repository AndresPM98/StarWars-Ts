import { Response } from 'express';
import Film from '../data';
import { response } from '../../utils/response';

export default async (req: Request, res: Response): Promise<void> => {
    try {
        const films = await Film.list();
        response(res, 200, films);
    } catch (error) {
        console.error('Error fetching films:', error);
        response(res, 500, { error: 'Internal Server Error' });
    }
};
