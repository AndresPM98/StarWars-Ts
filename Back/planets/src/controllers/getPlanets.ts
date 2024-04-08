import { Response } from 'express';
import Planets from '../data';
import { response } from '../utils/response';

export default async (req: Request, res: Response): Promise<void> => {
    try {
        const planets = await Planets.list();
        response(res, 200, planets);
    } catch (error) {
        console.error('Error fetching planets:', error);
        response(res, 500, { error: 'Internal Server Error' });
    }
};
