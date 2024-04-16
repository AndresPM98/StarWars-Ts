import { RequestHandler } from 'express';
import { catchedAsync } from '../utils';
import getStarships from './getStarships';
import getStarshipByName from './getStarshipByName';

interface Controller {
    [key: string]: RequestHandler;
}

const controllers: Controller = {
    getStarships: catchedAsync(getStarships),
    getStarshipByName: catchedAsync(getStarshipByName),
};

export default controllers;
