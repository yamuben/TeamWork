import express from 'express';
import { validsignUp, validsignIn } from '../middleware/userValidator';
import ucontroller from '../controllers/userController';


const router = express.Router();

router.post('/signup', validsignUp, ucontroller.UserController.signUp);

router.post('/signin', validsignIn, ucontroller.UserController.signIn);

export default router;
