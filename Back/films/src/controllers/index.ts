import { RequestHandler } from 'express';
import { catchedAsync } from '../../utils';
import getFilms from './getFilms';

interface Controller {
    [key: string]: RequestHandler;
}

const controllers: Controller = {
    getFilms: catchedAsync(getFilms),
};

export default controllers;
