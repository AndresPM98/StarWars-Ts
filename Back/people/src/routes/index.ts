import { Router } from 'express';
import controllers from '../controllers'; // Importa el objeto controllers

const router = Router();

router.get('/', controllers.getPeople); // Usa controllers.getPlanets
router.get('/:id', controllers.getPeopleById); // Usa controllers.getPlanetById

export default router;

