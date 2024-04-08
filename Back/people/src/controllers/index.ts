import { RequestHandler } from 'express';
import { catchedAsync } from '../utils';
import getPeople from './getPeople';
import getPeopleByName from './getPeopleByName';

interface Controller {
    [key: string]: RequestHandler;
}

const controllers: Controller = {
    getPeople: catchedAsync(getPeople),
    getPeopleByName: catchedAsync(getPeopleByName),
};

export default controllers;
