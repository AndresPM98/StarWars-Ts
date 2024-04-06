import { RequestHandler } from 'express';
import { catchedAsync } from '../../utils';
import getPlanetById from './getPlanetById';
import getPlanets from './getPlanets';

interface Controller {
    [key: string]: RequestHandler;
}

const controllers: Controller = {
    getPlanetById: catchedAsync(getPlanetById),
    getPlanets: catchedAsync(getPlanets),
};

export default controllers;
