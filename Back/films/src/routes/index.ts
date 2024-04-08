import { Router } from 'express';
import controllers from '../controllers'; // Importa el objeto controllers

const router = Router();

router.get('/', controllers.getFilms); // Usa controllers.getPlanets
router.get('/:title', controllers.getFilmByTitle); 

export default router;

