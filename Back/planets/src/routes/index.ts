import { Router } from 'express';
import controllers from '../controllers'; // Importa el objeto controllers

const router = Router();

router.get('/', controllers.getPlanets); // Usa controllers.getPlanets
router.get('/:name', controllers.getPlanetByName); 

export default router;