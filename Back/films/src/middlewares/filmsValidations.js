"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../../utils/errors");
const filmsValidationMiddleware = (req, res, next) => {
    const { title } = req.body;
    if (title) {
        next();
    }
    else {
        next(new errors_1.ClientError('Error en el titulo', 401));
    }
};
exports.default = filmsValidationMiddleware;
