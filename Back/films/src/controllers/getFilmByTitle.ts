import { Request, Response } from 'express';
import Film from '../data';
import { response } from '../../utils';

export default async (req: Request, res: Response): Promise<void> => {
    try {
        const title: string = req.params.title; 
        const film = await Film.getByTitle(title);
        response(res, 200, film);
    } catch (error) {
        console.error('Error fetching film by title:', error);
        response(res, 500, { error: 'Internal Server Error' });
    }
};
