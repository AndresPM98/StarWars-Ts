"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../../utils");
var getPlanetByName_1 = require("./getPlanetByName");
var getPlanets_1 = require("./getPlanets");
var controllers = {
    getPlanetByName: (0, utils_1.catchedAsync)(getPlanetByName_1.default),
    getPlanets: (0, utils_1.catchedAsync)(getPlanets_1.default),
};
exports.default = controllers;
