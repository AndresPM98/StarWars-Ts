import { Response } from 'express';
import People from '../data';
import { response } from '../utils/response';

export default async (req: Request, res: Response): Promise<void> => {
    try {
        const people = await People.list();
        response(res, 200, people);
    } catch (error) {
        console.error('Error fetching people:', error);
        response(res, 500, { error: 'Internal Server Error' });
    }
};
