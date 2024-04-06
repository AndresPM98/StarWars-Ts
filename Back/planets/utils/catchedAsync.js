"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchedAsync = void 0;
var catchedAsync = function (fn) {
    return function (req, res, next) {
        fn(req, res).catch(function (err) {
            next(err);
        });
    };
};
exports.catchedAsync = catchedAsync;
