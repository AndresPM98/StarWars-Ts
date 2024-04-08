import { Request, Response } from 'express';
import Planet from '../data';
import { response } from '../../utils';

export default async (req: Request, res: Response): Promise<void> => {
    try {
        const name: string = req.params.name; 
        const planets = await Planet.getByName(name);
        response(res, 200, planets);
    } catch (error) {
        console.error('Error fetching planet by name:', error);
        response(res, 500, { error: 'Internal Server Error' });
    }
};
