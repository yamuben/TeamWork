import express from 'express';
import artcontroller from '../controllers/articleController';
import tokenVerify from '../middleware/tokenVerify';


const router = express.Router();


router.post('/articles/', tokenVerify.verifyUser, artcontroller.articleController.new_article);
router.delete('/articles/:articleId', tokenVerify.verifyUser, artcontroller.articleController.delete_article);
router.patch('/articles/:articleId', tokenVerify.verifyUser, artcontroller.articleController.edit_article);
router.post('/articles/:articleId/comments', tokenVerify.verifyUser, artcontroller.articleController.post_comment);
router.get('/feeds/', tokenVerify.verifyUser, artcontroller.articleController.getall_article);
export default router;
