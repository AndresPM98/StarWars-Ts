"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var morgan = require("morgan");
var cors = require("cors");
var routes_1 = require("./routes");
var server = express();
server.use(express.json());
server.use(morgan('dev'));
server.use(cors());
// Aquí es donde se define la ruta '/planets'
server.use('/people', routes_1.default);
server.use('*', function (req, res) {
    res.status(404).send('not found');
});
server.use(function (err, req, res, next) {
    res.status(err.statusCode || 500).send({
        error: true,
        message: err.message,
    });
});
exports.default = server;
