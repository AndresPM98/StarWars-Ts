import axios from "axios";
import { Request, Response } from "express";
import Starship from "../../models/starship";

export async function fetchAndSaveStarships(
    req: Request,
    res: Response
): Promise<void> {
    try {
        // Verificar si existen naves estelares en la base de datos
        const starshipsInDB = await Starship.find();
        if (starshipsInDB.length > 0) {
            // Si existen naves estelares en la base de datos, responder con ellas
            res.json(starshipsInDB);
            return; // Salir de la función
        }

        // Si no hay naves estelares en la base de datos, hacer una solicitud a la API de Star Wars para obtenerlas
        const response = await axios.get("https://swapi.dev/api/starships/");
        const starshipsData = response.data.results;

        // Función auxiliar para completar los valores faltantes con "n/a"
        const completeWithNA = (value: any) => (value ? value : "n/a");

        // Guardar las naves estelares en la base de datos
        const savedStarships = await Promise.all(
            starshipsData.map(async (starship: any) => {
                // Crear una nueva instancia del modelo Starship con los datos de la API
                const newStarship = new Starship({
                    name: completeWithNA(starship.name),
                    model: completeWithNA(starship.model),
                    manufacturer: completeWithNA(starship.manufacturer),
                    cost_in_credits: completeWithNA(starship.cost_in_credits),
                    length: completeWithNA(starship.length),
                    max_atmosphering_speed: completeWithNA(starship.max_atmosphering_speed),
                    crew: completeWithNA(starship.crew),
                    passengers: completeWithNA(starship.passengers),
                    cargo_capacity: completeWithNA(starship.cargo_capacity),
                    consumables: completeWithNA(starship.consumables),
                    hyperdrive_rating: completeWithNA(starship.hyperdrive_rating),
                    MGLT: completeWithNA(starship.MGLT),
                    starship_class: completeWithNA(starship.starship_class),
                    pilots: completeWithNA(starship.pilots),
                    films: completeWithNA(starship.films),
                    created: new Date(starship.created),
                    edited: new Date(starship.edited),
                    url: completeWithNA(starship.url),
                    // Agregar otros campos necesarios aquí
                });

                // Guardar la nueva nave estelar en la base de datos
                return newStarship.save();
            })
        );

        // Filtrar las naves estelares guardadas con éxito y eliminar las entradas nulas
        const filteredStarships = savedStarships.filter(
            (starship) => starship !== null
        );

        res.json(filteredStarships); // Responder con las naves estelares guardadas con éxito
    } catch (error: any) {
        // Especifica el tipo de la variable error como any
        res.status(500).json({ message: error.message });
    }
}
