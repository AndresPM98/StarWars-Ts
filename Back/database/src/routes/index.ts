import express from 'express';
import { fetchAndSaveFilms } from '../controllers/filmController/getFilm';
import { getFilmByTitle } from '../controllers/filmController/getFilmByTitle';
import { fetchAndSavePeople } from '../controllers/peopleController/getPeople';
import { fetchAndSavePlanets } from '../controllers/planetController/getPlanet';
import { fetchAndSaveStarships } from '../controllers/starshipController/getStarship';

const router = express.Router();

// Definir la ruta para obtener películas de Star Wars y guardarlas en la base de datos
router.get('/films', fetchAndSaveFilms);
router.get('/films/:name', getFilmByTitle);

router.get('/people', fetchAndSavePeople);

router.get('/planets', fetchAndSavePlanets);

router.get('/starships', fetchAndSaveStarships);

export default router;

