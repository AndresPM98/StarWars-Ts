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
        const endpoint = model === 'Film' ? 'films' : model === 'Character' ? 'people' : model === 'Planet' ? 'planets' : '';
        
        if (endpoint) {
            const dataFromAPI = await fetchDataFromAPI(endpoint);
            
            // Guardar los datos en la base de datos
            const Model = store[model]; // Obtener el modelo correspondiente desde el almacenamiento
            const savedData = await Model.insertMany(dataFromAPI); // Insertar los datos en la base de datos
            
            res.status(200).json(savedData); // Responder con los datos guardados
        } else {
            const modelGet = await store[model].list();
            res.status(200).json(modelGet);
        }
    } catch (error) {
        console.error('Error en el controlador:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};