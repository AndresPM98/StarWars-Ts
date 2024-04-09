const mongoose = require("mongoose");
const { characterSchema, filmSchema, planetSchema } = require("./schemas");

const conn = mongoose.createConnection('mongodb+srv://andresperezmerello:Andres1998@starwars.ssnz0q5.mongodb.net/'); 
/* const conn = mongoose.createConnection('mongodb://localhost:27017/starwars'); 
 */
module.exports = {
    Character: conn.model("Character", characterSchema),
    Film: conn.model("Film", filmSchema),
    Planet: conn.model("Planet", planetSchema)
}