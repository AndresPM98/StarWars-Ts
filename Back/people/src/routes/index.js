"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controllers_1 = require("../controllers"); // Importa el objeto controllers
var router = (0, express_1.Router)();
router.get('/', controllers_1.default.getPeople); // Usa controllers.getPlanets
exports.default = router;
