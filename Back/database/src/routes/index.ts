// routes/index.ts
import express from 'express';
import { fetchAndSaveFilms } from '../controllers/filmController/getFilm';
import { getFilmByTitle } from '../controllers/filmController/getFilmByTitle';
import { fetchAndSavePeople } from '../controllers/peopleController/getPeople';
import { getPeopleByName } from '../controllers/peopleController/getPeopleByName';
import { fetchAndSavePlanets } from '../controllers/planetController/getPlanet';
import { getPlanetByName } from '../controllers/planetController/getPlanetByName';
import { fetchAndSaveStarships } from '../controllers/starshipController/getStarship';
import { getStarshipByName } from '../controllers/starshipController/getStarshipsByName';

const router = express.Router();

// Definir la ruta para obtener películas de Star Wars y guardarlas en la base de datos
router.get('/films', fetchAndSaveFilms);
router.get('/films/:title', getFilmByTitle);

router.get('/people', fetchAndSavePeople);
router.get('/people/:name', getPeopleByName);

router.get('/planets', fetchAndSavePlanets);
router.get('/planets/:name', getPlanetByName);

router.get('/starships', fetchAndSaveStarships);
router.get('/starships/:name', getStarshipByName);

export default router;
