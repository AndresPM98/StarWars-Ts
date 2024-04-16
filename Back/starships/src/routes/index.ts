import { Router } from 'express';
import controllers from '../controllers';

const router = Router();

router.get('/', controllers.getStarships); 
router.get('/:name', controllers.getStarshipByName); 

export default router;

