import express from 'express';
import artcontroller from '../controllers/articleController';
import tokenVerify from '../middleware/tokenVerify';


const router = express.Router();


router.post('/articles/', tokenVerify.verifyUser, artcontroller.articleController.new_article);

export default router;
