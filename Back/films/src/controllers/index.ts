import { RequestHandler } from 'express';
import { catchedAsync } from '../utils';
import getFilms from './getFilms';
import getFilmByTitle from './getFilmByTitle';

interface Controller {
    [key: string]: RequestHandler;
}

const controllers: Controller = {
    getFilms: catchedAsync(getFilms),
    getFilmByTitle: catchedAsync(getFilmByTitle),
};

export default controllers;
