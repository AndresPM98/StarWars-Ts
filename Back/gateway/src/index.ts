import { Express, Request, Response, NextFunction } from 'express';
const express = require("express");
const morgan = require("morgan");
const { createProxyMiddleware } = require("http-proxy-middleware");
const { spawn } = require("child_process");
const cors = require("cors");

const app: Express = express();

app.use(cors());

app.use((req: Request, res: Response, next: NextFunction) => {
    next();
});

app.use(morgan("dev"));

app.use("/films", createProxyMiddleware({
    target: "http://localhost:8001",
    changeOrigin: true,
}));

app.use("/people", createProxyMiddleware({
    target: "http://localhost:8002",
    changeOrigin: true,
}));

app.use("/planets", createProxyMiddleware({
    target: "http://localhost:8003",
    changeOrigin: true,
}));

app.use("/starships", createProxyMiddleware({
    target: "http://localhost:8004",
    changeOrigin: true,
}));
app.use("/database", createProxyMiddleware({
    target: "http://localhost:8005",
    changeOrigin: true,
}));


// Función para iniciar los microservicios en los puertos 8000, 8001, 8002, 8003 y 8004
const startMicroservices = () => {
    const microserviceFilms = spawn("node", ["../films/dist/index.js"]);
    const microservicePeople = spawn("node", ["../people/dist/index.js"]);
    const microservicePlanets = spawn("node", ["../planets/dist/index.js"]);
    const microserviceStarships = spawn("node", ["../starships/dist/index.js"]);
    const microserviceDatabase = spawn("node", ["../database/index.js"]);

    microserviceFilms.stdout.on("data", (data: any) => {
        console.log(`Films microservice: ${data}`);
    });

    microserviceFilms.stderr.on("data", (data: any) => {
        console.error(`Error in films microservice: ${data}`);
    });

    microservicePeople.stdout.on("data", (data: any) => {
        console.log(`People microservice: ${data}`);
    });

    microservicePeople.stderr.on("data", (data: any) => {
        console.error(`Error in people microservice: ${data}`);
    });

    microservicePlanets.stdout.on("data", (data: any) => {
        console.log(`Planets microservice: ${data}`);
    });

    microservicePlanets.stderr.on("data", (data: any) => {
        console.error(`Error in planets microservice: ${data}`);
    });

    microserviceStarships.stdout.on("data", (data: any) => {
        console.log(`Starships microservice: ${data}`);
    });

    microserviceStarships.stderr.on("data", (data: any) => {
        console.error(`Error in starships microservice: ${data}`);
    });
    microserviceDatabase.stdout.on("data", (data: any) => {
        console.log(`Starships microservice: ${data}`);
    });

    microserviceDatabase.stderr.on("data", (data: any) => {
        console.error(`Error in starships microservice: ${data}`);
    });
};

app.listen(8000, () => {
    console.log("Gateway on port 8000");
    startMicroservices();
});
