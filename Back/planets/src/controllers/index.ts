import { RequestHandler } from 'express';
import { catchedAsync } from '../../utils';
import getPlanetByName from './getPlanetByName';
import getPlanets from './getPlanets';

interface Controller {
    [key: string]: RequestHandler;
}

const controllers: Controller = {
    getPlanets: catchedAsync(getPlanets),
    getPlanetByName: catchedAsync(getPlanetByName),
};

export default controllers;
