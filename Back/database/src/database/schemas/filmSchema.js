const { Schema } = require("mongoose")
const axios = require('axios');

const filmSchema = new Schema({
   _id: String,
   title: String,
   opening_crawl: String,
   director: String,
   producer: String,
   release_date: Date,
   characters: [{ type: String, ref: "Character" }],
   planets: [{ type: String, ref: "Planet" }]
});

filmSchema.statics.list = async function () {
   try {
      const films = await this.find();
      return films;
   } catch (error) {
      console.error('Error al obtener películas desde la base de datos:', error);
      throw error;
   }
};


filmSchema.statics.get = async function (id) {
   return await this.findById(id)
      .populate("characters", ["_id", "name"])
      .populate("planets", ["_id", "name"])
};

filmSchema.statics.searchByTitle = async function (title) {
   try {
      const film = await this.find({ title: { $regex: new RegExp(title, "i") } })
      .populate("characters", ["_id", "name"])
      .populate("planets", ["_id", "name"])
      return film;
   } catch (error) {
      console.error('Error al buscar peliculas por titulo:', error);
      throw error;
   }
};


filmSchema.statics.insert = async function (film) {
   return await this.create(film)
};

filmSchema.statics.delete = async function (id) {
   return await this.deleteOne({ _id: id })
};

module.exports = filmSchema;