import { Router } from 'express';
import controllers from '../controllers'; 

const router = Router();

router.get('/', controllers.getPeople); 
router.get('/:name', controllers.getPeopleByName); 

export default router;

