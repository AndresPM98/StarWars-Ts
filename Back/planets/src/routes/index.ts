import { Router } from 'express';
import controllers from '../controllers'; 

const router = Router();

router.get('/', controllers.getPlanets); 
router.get('/:name', controllers.getPlanetByName); 

export default router;