import { RequestHandler } from 'express';
import { catchedAsync } from '../../utils';
import getPeopleById from './getPeopleById';
import getPeople from './getPeople';

interface Controller {
    [key: string]: RequestHandler;
}

const controllers: Controller = {
    getPeopleById: catchedAsync(getPeopleById),
    getPeople: catchedAsync(getPeople),
};

export default controllers;
