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

        // Guardar las naves estelares en la base de datos
        const savedStarships = await Promise.all(
            starshipsData.map(async (starship: any) => {
                // Verificar si los campos requeridos están presentes en los datos
                if (
                    !starship.starship_class ||
                    !starship.hyperdrive_rating ||
                    !starship.cargo_capacity ||
                    !starship.max_atmosphering_speed ||
                    !starship.cost_in_credits
                ) {
                    // Si falta alguno de los campos requeridos, omitir esta nave estelar
                    console.log(
                        `Nave estelar omitida debido a datos incompletos: ${starship.name}`
                    );
                    return null;
                }

                // Crear una nueva instancia del modelo Starship con los datos de la API
                const newStarship = new Starship({
                    name: starship.name,
                    model: starship.model,
                    manufacturer: starship.manufacturer,
                    cost_in_credits: starship.cost_in_credits,
                    length: starship.length,
                    max_atmosphering_speed: starship.max_atmosphering_speed,
                    crew: starship.crew,
                    passengers: starship.passengers,
                    cargo_capacity: starship.cargo_capacity,
                    consumables: starship.consumables,
                    hyperdrive_rating: starship.hyperdrive_rating,
                    MGLT: starship.MGLT,
                    starship_class: starship.starship_class,
                    pilots: starship.pilots,
                    films: starship.films,
                    created: new Date(starship.created),
                    edited: new Date(starship.edited),
                    url: starship.url,
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
