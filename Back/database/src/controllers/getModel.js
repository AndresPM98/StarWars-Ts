const axios = require('axios');
const store = require("../database");

async function fetchDataFromAPI(endpoint) {
    try {
        const response = await axios.get(`https://swapi.dev/api/${endpoint}`);
        return response.data.results;
    } catch (error) {
        console.error(`Error al obtener datos desde la API para el modelo ${endpoint}:`, error);
        throw error;
    }
}

module.exports = async (req, res) => {
    const { model } = req.params;
    try {
        const endpoint = model === 'film' ? 'films' : model === 'character' ? 'people' : model === 'planet' ? 'planets' : '';
        
        if (endpoint) {
            const dataFromAPI = await fetchDataFromAPI(endpoint);
            
            const modelData = await Promise.all(dataFromAPI.map(async itemData => {
                const existingItem = await store[model].get(itemData.url.split('/').slice(-2, -1)[0]);
                if (!existingItem) {
                    return store[model].insert({
                        _id: itemData.url.split('/').slice(-2, -1)[0],
                        ...getDataForModel(model, itemData)
                    });
                } else {
                    await store[model].update(existingItem._id, getDataForModel(model, itemData));
                    return existingItem;
                }
            }));
            
            res.status(200).json(modelData);
        } else {
            const modelGet = await store[model].list();
            res.status(200).json(modelGet);
        }
    } catch (error) {
        console.error('Error en el controlador:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

function getDataForModel(model, itemData) {
    switch (model) {
        case 'film':
            return {
                title: itemData.title,
                opening_crawl: itemData.opening_crawl,
                director: itemData.director,
                producer: itemData.producer,
                release_date: new Date(itemData.release_date),
                characters: itemData.characters.map(character => character.split('/').slice(-2, -1)[0]),
                planets: itemData.planets.map(planet => planet.split('/').slice(-2, -1)[0])
            };
        case 'character':
            return {
                name: itemData.name,
                height: itemData.height,
                mass: itemData.mass,
                hair_color: itemData.hair_color,
                skin_color: itemData.skin_color,
                eye_color: itemData.eye_color,
                birth_year: itemData.birth_year,
                gender: itemData.gender,
                homeworld: itemData.homeworld.split('/').slice(-2, -1)[0],
                films: itemData.films.map(film => film.split('/').slice(-2, -1)[0])
            };
        case 'planet':
            return {
                name: itemData.name,
                rotation_period: itemData.rotation_period,
                orbital_period: itemData.orbital_period,
                diameter: itemData.diameter,
                climate: itemData.climate,
                gravity: itemData.gravity,
                terrain: itemData.terrain,
                surface_water: itemData.surface_water,
                residents: itemData.residents.map(resident => resident.split('/').slice(-2, -1)[0]),
                films: itemData.films.map(film => film.split('/').slice(-2, -1)[0])
            };
        default:
            return {};
    }
}
