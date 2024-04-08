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
      // Realizar solicitud GET a la API externa
      const response = await axios.get('https://swapi.dev/api/people');

      // Guardar los datos de los personajes en la base de datos local
      const characters = await Promise.all(response.data.results.map(async characterData => {
         // Verificar si el personaje ya existe en la base de datos local
         const existingCharacter = await this.findOne({ _id: characterData.url.split('/').slice(-2, -1)[0] });
         if (!existingCharacter) {
            // Si el personaje no existe, crear una nueva instancia y la guardar en la base de datos
            const newCharacter = await this.create({
               _id: characterData.url.split('/').slice(-2, -1)[0],
               name: characterData.name,
               height: characterData.height,
               mass: characterData.mass,
               hair_color: characterData.hair_color,
               skin_color: characterData.skin_color,
               eye_color: characterData.eye_color,
               birth_year: characterData.birth_year,
               gender: characterData.gender,
               homeworld: characterData.homeworld.split('/').slice(-2, -1)[0],
               films: characterData.films.map(film => film.split('/').slice(-2, -1)[0])
            });
            return newCharacter;
         } else {
            // Si el personaje ya existe, actualizar sus datos
            existingCharacter.set({
               name: characterData.name,
               height: characterData.height,
               mass: characterData.mass,
               hair_color: characterData.hair_color,
               skin_color: characterData.skin_color,
               eye_color: characterData.eye_color,
               birth_year: characterData.birth_year,
               gender: characterData.gender,
               homeworld: characterData.homeworld.split('/').slice(-2, -1)[0],
               films: characterData.films.map(film => film.split('/').slice(-2, -1)[0])
            });
            await existingCharacter.save();
            return existingCharacter;
         }
      }));

      return characters;
   } catch (error) {
      console.error('Error al obtener personajes desde la API:', error);
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