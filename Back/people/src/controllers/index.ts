import { RequestHandler } from 'express';
import { catchedAsync } from '../../utils';
import getPeople from './getPeople';

interface Controller {
    [key: string]: RequestHandler;
}

const controllers: Controller = {
    getPeople: catchedAsync(getPeople),
};

export default controllers;
