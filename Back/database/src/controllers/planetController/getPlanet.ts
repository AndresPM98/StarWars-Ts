import axios from "axios";
import { Request, Response } from "express";
import Planet from "../../models/planet";

export async function fetchAndSavePlanets(
    req: Request,
    res: Response
): Promise<void> {
    try {
        // Verificar si existen planetas en la base de datos
        const planetsInDB = await Planet.find();
        if (planetsInDB.length > 0) {
            // Si existen planetas en la base de datos, responder con ellos
            res.json(planetsInDB);
            return; // Salir de la función
        }

        // Si no hay planetas en la base de datos, hacer una solicitud a la API de Star Wars para obtenerlos
        const response = await axios.get("https://swapi.dev/api/planets/");
        
        const planetsData = response.data.results;

        // Función auxiliar para completar los valores faltantes con "n/a"
        const completeWithNA = (value: any, field: string) => {
            if (value !== undefined && value !== null) {
                return value;
            } else {
                switch (field) {
                    case "surface_water":
                    case "orbital_period":
                    case "rotation_period":
                        return "unknown";
                    default:
                        return "n/a";
                }
            }
        };

        // Guardar los planetas en la base de datos
        const savedPlanets = await Promise.all(
            planetsData.map(async (planet: any) => {
                // Crear una nueva instancia del modelo Planet con los datos de la API
                const newPlanet = new Planet({
                    name: completeWithNA(planet.name, "name"),
                    rotation_period: completeWithNA(planet.rotation_period, "rotation_period"),
                    orbital_period: completeWithNA(planet.orbital_period, "orbital_period"),
                    diameter: completeWithNA(planet.diameter, "diameter"),
                    climate: completeWithNA(planet.climate, "climate"),
                    gravity: completeWithNA(planet.gravity, "gravity"),
                    terrain: completeWithNA(planet.terrain, "terrain"),
                    surface_water: completeWithNA(planet.surface_water, "surface_water"),
                    population: completeWithNA(planet.population, "population"),
                    residents: completeWithNA(planet.residents, "residents"),
                    films: completeWithNA(planet.films, "films"),
                    created: new Date(planet.created),
                    edited: new Date(planet.edited),
                    url: completeWithNA(planet.url, "url"),
                });
                // Guardar el nuevo planeta en la base de datos
                return newPlanet.save();
            })
        );

        res.json(savedPlanets.filter((planet) => planet)); // Filtrar los planetas guardados con éxito
    } catch (error: any) {
        // Especifica el tipo de la variable error como any
        res.status(500).json({ message: error.message });
    }
}
