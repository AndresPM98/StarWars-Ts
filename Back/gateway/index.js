"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var morgan = require("morgan");
var createProxyMiddleware = require("http-proxy-middleware").createProxyMiddleware;
var spawn = require("child_process").spawn;
var cors = require("cors");
var app = express();
// Habilitar CORS para permitir solicitudes desde cualquier origen
app.use(cors());
app.use(function (req, res, next) {
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
// Función para iniciar los microservicios en los puertos 8003 y 8002
var startMicroservices = function () {
    var microserviceFilms = spawn("node", ["../films/index.js"]);
    var microservicePeople = spawn("node", ["../people/index.js"]);
    var microservicePlanets = spawn("node", ["../planets/index.js"]);
    var microserviceStarships = spawn("node", ["../starships/index.js"]);
    microserviceFilms.stdout.on("data", function (data) {
        console.log("Films microservice: ".concat(data));
    });
    microserviceFilms.stderr.on("data", function (data) {
        console.error("Error in films microservice: ".concat(data));
    });
    microservicePeople.stdout.on("data", function (data) {
        console.log("People microservice: ".concat(data));
    });
    microservicePeople.stderr.on("data", function (data) {
        console.error("Error in people microservice: ".concat(data));
    });
    microservicePlanets.stdout.on("data", function (data) {
        console.log("Planets microservice: ".concat(data));
    });
    microservicePlanets.stderr.on("data", function (data) {
        console.error("Error in planets microservice: ".concat(data));
    });
    microserviceStarships.stdout.on("data", function (data) {
        console.log("Starships microservice: ".concat(data));
    });
    microserviceStarships.stderr.on("data", function (data) {
        console.error("Error in starships microservice: ".concat(data));
    });
};
app.listen(8000, function () {
    console.log("Gateway on port 8000");
    startMicroservices();
});
