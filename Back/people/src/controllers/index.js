"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../../utils");
var getPeople_1 = require("./getPeople");
var controllers = {
    getPeople: (0, utils_1.catchedAsync)(getPeople_1.default),
};
exports.default = controllers;
