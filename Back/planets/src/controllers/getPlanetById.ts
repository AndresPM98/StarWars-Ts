import { Request, Response } from 'express';
import Planet from '../data';
import { response } from '../../utils';

export default async (req: Request, res: Response): Promise<void> => {
    try {
        const id: number = parseInt(req.params.id, 10); // Convertir el id a número
        const planet = await Planet.getById(id);
        response(res, 200, planet);
    } catch (error) {
        console.error('Error fetching planet by ID:', error);
        response(res, 500, { error: 'Internal Server Error' });
    }
};
