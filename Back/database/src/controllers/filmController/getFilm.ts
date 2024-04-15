import axios from 'axios';
import { Request, Response } from 'express'; 
import Film from '../../models/film';

export async function fetchAndSaveFilms(req: Request, res: Response): Promise<void> {
  try {
    // Verificar si existen películas en la base de datos
    const moviesInDB = await Film.find();
    if (moviesInDB.length > 0) {
      // Si existen películas en la base de datos, responder con ellas
      res.json(moviesInDB);
      return; // Salir de la función
    }

    // Si no hay películas en la base de datos, hacer una solicitud a la API de Star Wars para obtenerlas
    const response = await axios.get('https://swapi.dev/api/films/');
    const moviesData = response.data.results;

    // Guardar las películas en la base de datos
    const savedMovies = await Promise.all(moviesData.map(async (movie: any) => {
      // Crear una nueva instancia del modelo Movie con los datos de la API
      const newMovie = new Film({
        title: movie.title,
        episodeId: movie.episode_id,
        openingCrawl: movie.opening_crawl,
        director: movie.director,
        producer: movie.producer,
        releaseDate: new Date(movie.release_date),
        characters: movie.characters,
        planets: movie.planets,
        starships: movie.starships,
        vehicles: movie.vehicles,
        species: movie.species,
        created: new Date(movie.created),
        edited: new Date(movie.edited),
        url: movie.url
      });
      // Guardar la nueva película en la base de datos
      return newMovie.save();
    }));

    res.json(savedMovies.filter((movie) => movie)); // Filtrar las películas guardadas con éxito
  } catch (error: any) { // Especifica el tipo de la variable error como any
    res.status(500).json({ message: error.message });
  }
}
