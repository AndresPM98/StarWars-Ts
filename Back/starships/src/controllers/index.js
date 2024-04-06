"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../../utils");
var getStarships_1 = require("./getStarships");
var controllers = {
    getStarships: (0, utils_1.catchedAsync)(getStarships_1.default),
};
exports.default = controllers;
