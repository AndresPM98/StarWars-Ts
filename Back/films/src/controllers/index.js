"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../../utils");
var getFilms_1 = require("./getFilms");
var getFilmByTitle_1 = require("./getFilmByTitle");
var controllers = {
    getFilms: (0, utils_1.catchedAsync)(getFilms_1.default),
    getFilmByTitle: (0, utils_1.catchedAsync)(getFilmByTitle_1.default),
};
exports.default = controllers;
