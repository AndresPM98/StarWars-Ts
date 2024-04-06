import { Router } from 'express';
import controllers from '../controllers'; // Importa el objeto controllers

const router = Router();

router.get('/', controllers.getStarships); 

export default router;

