"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = require("./src/server");
var PORT = 8004;
server_1.default.listen(PORT, function () {
    console.log("Server listening on port ".concat(PORT));
});
