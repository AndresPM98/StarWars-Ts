import { RequestHandler } from 'express';
import { catchedAsync } from '../../utils';
import getStarships from './getStarships';

interface Controller {
    [key: string]: RequestHandler;
}

const controllers: Controller = {
    getStarships: catchedAsync(getStarships),
};

export default controllers;
