import { Response } from 'express';
import Starship from '../data';
import { response } from '../utils/response';

export default async (req: Request, res: Response): Promise<void> => {
    try {
        const starships = await Starship.list();
        response(res, 200, starships);
    } catch (error) {
        console.error('Error fetching starships:', error);
        response(res, 500, { error: 'Internal Server Error' });
    }
};
