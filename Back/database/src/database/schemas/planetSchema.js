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
      // Realizar solicitud GET a la API externa
      const response = await axios.get('https://swapi.dev/api/planets');

      // Guardar los datos de los planetas en la base de datos local
      const planets = await Promise.all(response.data.results.map(async planetData => {
         // Verificar si el planeta ya existe en la base de datos local
         const existingPlanet = await this.findOne({ _id: planetData.url.split('/').slice(-2, -1)[0] });
         if (!existingPlanet) {
            // Si el planeta no existe, crear una nueva instancia y guardarla en la base de datos
            const newPlanet = await this.create({
               _id: planetData.url.split('/').slice(-2, -1)[0],
               name: planetData.name,
               rotation_period: planetData.rotation_period,
               orbital_period: planetData.orbital_period,
               diameter: planetData.diameter,
               climate: planetData.climate,
               gravity: planetData.gravity,
               terrain: planetData.terrain,
               surface_water: planetData.surface_water,
               residents: planetData.residents.map(resident => resident.split('/').slice(-2, -1)[0]),
               films: planetData.films.map(film => film.split('/').slice(-2, -1)[0])
            });
            return newPlanet;
         } else {
            // Si el planeta ya existe, actualizar sus datos
            existingPlanet.set({
               name: planetData.name,
               rotation_period: planetData.rotation_period,
               orbital_period: planetData.orbital_period,
               diameter: planetData.diameter,
               climate: planetData.climate,
               gravity: planetData.gravity,
               terrain: planetData.terrain,
               surface_water: planetData.surface_water,
               residents: planetData.residents.map(resident => resident.split('/').slice(-2, -1)[0]),
               films: planetData.films.map(film => film.split('/').slice(-2, -1)[0])
            });
            await existingPlanet.save();
            return existingPlanet;
         }
      }));

      // Devolver los datos de los planetas
      return planets;
   } catch (error) {
      console.error('Error al obtener planetas desde la API:', error);
      throw error;
   }
};

planetSchema.statics.get = async function (id) {
   return await this.findById(id)
      .populate("residents", ["_id", "name"])
      .populate("films", ["_id", "title"])
};

planetSchema.statics.insert = async function (planet) {
   return await this.create(planet)
};

planetSchema.statics.delete = async function (id) {
   return await this.deleteOne({ _id: id })
};


module.exports = planetSchema;

