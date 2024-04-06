"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../../utils");
var getPlanetById_1 = require("./getPlanetById");
var getPlanets_1 = require("./getPlanets");
var controllers = {
    getPlanetById: (0, utils_1.catchedAsync)(getPlanetById_1.default),
    getPlanets: (0, utils_1.catchedAsync)(getPlanets_1.default),
};
exports.default = controllers;
