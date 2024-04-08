const store = require("../database");
const { response } = require("../utils");

module.exports = async (req, res) => {
  try {
    const { model, title } = req.params; 
    const modelGetByTitle = await store[model].searchByTitle(title); 
    res.status(200).json(modelGetByTitle);
  } catch (error) {
    console.error("Error al buscar el modelo por titulo:", error);
    res.status(500).json(response("error", "Error interno del servidor"));
  }
};