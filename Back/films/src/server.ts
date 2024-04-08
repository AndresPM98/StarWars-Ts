import { Express, Request, Response, NextFunction } from 'express';
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
import routes from './routes';

const server: Express = express();

server.use(express.json());
server.use(morgan('dev'));

server.use(cors());

server.use('/films', routes);

server.use('*', (req: Request, res: Response) => {
    res.status(404).send('not found');
});

server.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.statusCode || 500).send({
        error: true,
        message: err.message,
    });
});

export default server;
