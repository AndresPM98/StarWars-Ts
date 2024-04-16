import { Request, Response } from 'express';
import Starship from '../data';
import { response } from '../utils';

export default async (req: Request, res: Response): Promise<void> => {
    try {
        const name: string = req.params.name; 
        const starship = await Starship.getByName(name);
        response(res, 200, starship);
    } catch (error) {
        console.error('Error fetching starship by name:', error);
        response(res, 500, { error: 'Internal Server Error' });
    }
};
