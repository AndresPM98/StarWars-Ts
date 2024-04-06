"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../../utils/errors");
const starshipsValidationMiddleware = (req, res, next) => {
    const { name } = req.body;
    if (name) {
        next();
    }
    else {
        next(new errors_1.ClientError('Error en el nombre', 401));
    }
};
exports.default = starshipsValidationMiddleware;
