"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.response = void 0;
var response = function (res, statusCode, data) {
    res.status(statusCode).json({
        error: false,
        data: data,
    });
};
exports.response = response;
