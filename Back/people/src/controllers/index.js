"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../../utils");
var getPeopleById_1 = require("./getPeopleById");
var getPeople_1 = require("./getPeople");
var controllers = {
    getPeopleById: (0, utils_1.catchedAsync)(getPeopleById_1.default),
    getPeople: (0, utils_1.catchedAsync)(getPeople_1.default),
};
exports.default = controllers;
