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
      // Realizar solicitud GET a la API externa
      const response = await axios.get('https://swapi.dev/api/films');

      const films = await Promise.all(response.data.results.map(async filmData => {
         // Verificar si la película ya existe en la base de datos local
         const existingFilm = await this.findOne({ _id: filmData.episode_id });
         if (!existingFilm) {
            // Si la película no existe, crear una nueva instancia y la guardar en la base de datos
            const newFilm = await this.create({
               _id: filmData.episode_id,
               title: filmData.title,
               opening_crawl: filmData.opening_crawl,
               director: filmData.director,
               producer: filmData.producer,
               release_date: new Date(filmData.release_date),
               characters: filmData.characters.map(character => character.split('/').slice(-2, -1)[0]),
               planets: filmData.planets.map(planet => planet.split('/').slice(-2, -1)[0])
            });
            return newFilm;
         } else {
            // Si la película ya existe, actualiza sus datos
            existingFilm.set({
               title: filmData.title,
               opening_crawl: filmData.opening_crawl,
               director: filmData.director,
               producer: filmData.producer,
               release_date: new Date(filmData.release_date),
               characters: filmData.characters.map(character => character.split('/').slice(-2, -1)[0]),
               planets: filmData.planets.map(planet => planet.split('/').slice(-2, -1)[0])
            });
            await existingFilm.save();
            return existingFilm;
         }
      }));

      return films;
   } catch (error) {
      console.error('Error al obtener películas desde la API:', error);
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