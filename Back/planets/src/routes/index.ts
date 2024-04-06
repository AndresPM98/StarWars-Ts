import { Router } from 'express';
import controllers from '../controllers'; // Importa el objeto controllers

const router = Router();

router.get('/', controllers.getPlanets); // Usa controllers.getPlanets
router.get('/:id', controllers.getPlanetById); // Usa controllers.getPlanetById

export default router;

