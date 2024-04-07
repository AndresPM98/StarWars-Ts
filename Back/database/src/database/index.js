const mongoose = require("mongoose");
const { MONGO_URI } = require("../config/envs");
const { characterSchema, filmSchema, planetSchema } = require("./schemas");

const conn = mongoose.createConnection(MONGO_URI);

module.exports = {
    Character: conn.model("Character", characterSchema),
    Film: conn.model("Film", filmSchema),
    Planet: conn.model("Planet", planetSchema)
}