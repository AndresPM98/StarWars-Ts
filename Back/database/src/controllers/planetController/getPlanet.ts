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

        // Guardar los planetas en la base de datos
        const savedPlanets = await Promise.all(
            planetsData.map(async (planet: any) => {
                // Crear una nueva instancia del modelo Planet con los datos de la API
                const newPlanet = new Planet({
                    name: planet.name,
                    rotationPeriod: planet.rotation_period,
                    orbitalPeriod: planet.orbital_period,
                    diameter: planet.diameter,
                    climate: planet.climate,
                    gravity: planet.gravity,
                    terrain: planet.terrain,
                    surfaceWater: planet.surface_water,
                    population: planet.population,
                    residents: planet.residents,
                    films: planet.films,
                    created: new Date(planet.created),
                    edited: new Date(planet.edited),
                    url: planet.url,
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
