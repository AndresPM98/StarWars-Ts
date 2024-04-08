import { Router } from 'express';
import controllers from '../controllers'; 

const router = Router();

router.get('/', controllers.getFilms); 
router.get('/:title', controllers.getFilmByTitle); 

export default router;

