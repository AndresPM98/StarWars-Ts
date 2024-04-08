const store = require("../database");
const { response } = require("../utils");

module.exports = async (req, res) => {
  try {
    const { model, name } = req.params; 
    const modelGetByName = await store[model].searchByName(name); 
    res.status(200).json(modelGetByName);
  } catch (error) {
    console.error("Error al buscar el modelo por nombre:", error);
    res.status(500).json(response("error", "Error interno del servidor"));
  }
};