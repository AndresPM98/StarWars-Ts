import { Request, Response } from 'express';
import People from '../data';
import { response } from '../../utils';

export default async (req: Request, res: Response): Promise<void> => {
    try {
        const id: number = parseInt(req.params.id, 10); // Convertir el id a número
        const people = await People.getById(id);
        response(res, 200, people);
    } catch (error) {
        console.error('Error fetching people by ID:', error);
        response(res, 500, { error: 'Internal Server Error' });
    }
};
