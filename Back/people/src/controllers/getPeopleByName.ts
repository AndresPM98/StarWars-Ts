import { Request, Response } from 'express';
import People from '../data';
import { response } from '../utils';

export default async (req: Request, res: Response): Promise<void> => {
    try {
        const name: string = req.params.name; 
        const people = await People.getByName(name);
        response(res, 200, people);
    } catch (error) {
        console.error('Error fetching people by name:', error);
        response(res, 500, { error: 'Internal Server Error' });
    }
};
