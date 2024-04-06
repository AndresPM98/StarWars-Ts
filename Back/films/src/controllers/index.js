"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../../utils");
var getFilms_1 = require("./getFilms");
var controllers = {
    getFilms: (0, utils_1.catchedAsync)(getFilms_1.default),
};
exports.default = controllers;
