import express from 'express';
import { validsignUp, validsignIn } from '../middleware/userValidator';
import ucontroller from '../controllers/userController';


const router = express.Router();

router.post('/signup', validsignUp, ucontroller.UserController.signUp);


export default router;
