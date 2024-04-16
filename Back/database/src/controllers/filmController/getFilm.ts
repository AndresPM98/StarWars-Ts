import axios from "axios";
import { Request, Response } from "express";
import Film from "../../models/film";

export async function fetchAndSaveFilms(
    req: Request,
    res: Response
): Promise<void> {
    try {
        // Verificar si existen películas en la base de datos
        const filmsInDB = await Film.find();
        if (filmsInDB.length > 0) {
            // Si existen películas en la base de datos las devuelve como respuesta
            res.json(filmsInDB);
            return; 
        }

        // Si no hay películas en la base de datos, hacer una solicitud a la API de Star Wars para obtenerlas
        const response = await axios.get("https://swapi.dev/api/films/");
        const filmsData = response.data.results;

        // Guardar las películas en la base de datos
        const savedFilms = await Promise.all(
            filmsData.map(async (film: any) => {
                const newFilm = new Film({
                    title: film.title,
                    episodeId: film.episode_id,
                    openingCrawl: film.opening_crawl,
                    director: film.director,
                    producer: film.producer,
                    releaseDate: new Date(film.release_date),
                    characters: film.characters,
                    planets: film.planets,
                    starships: film.starships,
                    vehicles: film.vehicles,
                    species: film.species,
                    created: new Date(film.created),
                    edited: new Date(film.edited),
                    url: film.url,
                });
                // Guardar la nueva película en la base de datos
                return newFilm.save();
            })
        );

        res.json(savedFilms.filter((film: any) => film)); 
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}
