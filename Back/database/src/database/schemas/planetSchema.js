const { Schema } = require("mongoose")
const axios = require('axios');

const planetSchema = new Schema({
   _id: String,
   name: String,
   rotation_period: String,
   orbital_period: String,
   diameter: String,
   climate: String,
   gravity: String,
   terrain: String,
   surface_water: String,
   residents: [{ type: String, ref: "Character" }],
   films: [{ type: String, ref: "Film" }]
});

planetSchema.statics.list = async function () {
   try {
      const planets = await this.find();
      return planets;
   } catch (error) {
      console.error('Error al obtener personas desde la base de datos:', error);
      throw error;
   }
};

planetSchema.statics.get = async function (id) {
   return await this.findById(id)
      .populate("residents", ["_id", "name"])
      .populate("films", ["_id", "title"])
};

planetSchema.statics.searchByName = async function (name) {
   try {
      const planets = await this.find({ name: { $regex: new RegExp(name, "i") } })
      .populate("residents", ["_id", "name"])
      .populate("films", ["_id", "title"])
      return planets;
   } catch (error) {
      console.error('Error al buscar planetas por nombre:', error);
      throw error;
   }
};

planetSchema.statics.insert = async function (planet) {
   return await this.create(planet)
};

planetSchema.statics.delete = async function (id) {
   return await this.deleteOne({ _id: id })
};


module.exports = planetSchema;

