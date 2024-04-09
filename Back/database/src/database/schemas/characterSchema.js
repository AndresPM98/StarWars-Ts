const { Schema } = require("mongoose")
const axios = require('axios');

const characterSchema = new Schema({
   _id: String,
   name: String,
   height: String,
   mass: String,
   hair_color: String,
   skin_color: String,
   eye_color: String,
   birth_year: String,
   gender: String,
   homeworld: { type: String, ref: "Planet" },
   films: [{ type: String, ref: "Film" }]
});

characterSchema.statics.list = async function () {
   try {
      const characters = await this.find();
      return characters;
   } catch (error) {
      console.error('Error al obtener personas desde la base de datos:', error);
      throw error;
   }
};

characterSchema.statics.get = async function (id) {
   return await this.findById(id)
      .populate("homeworld", ["_id", "name"])
      .populate("films", ["_id", "title"])
};

characterSchema.statics.searchByName = async function (name) {
   try {
      const character = await this.find({ name: { $regex: new RegExp(name, "i") } })
      .populate("homeworld", ["_id", "name"])
      .populate("films", ["_id", "title"])
      return character;
   } catch (error) {
      console.error('Error al buscar personas por nombre:', error);
      throw error;
   }
};

characterSchema.statics.insert = async function (character) {
   return await this.create(character)
};

characterSchema.statics.delete = async function (id) {
   return await this.deleteOne({ _id: id })
};

module.exports = characterSchema;