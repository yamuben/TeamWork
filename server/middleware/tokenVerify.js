import User from '../controllers/userController';
import verifytoken from '../helpers/tokens';

class tokenVerify {
  static verifyUser = (req, res, next) => {
    const token = req.header('user-auth-token');
    if (!token) {
      return res.status(400).send({
        status: 400,
        error: 'Provide a Token or check key header',
      });
    }
    try {
      const decode = verifytoken.verifyToken(token);
      const loadedUser = User.users.find(u => u.email === decode.userEmail);
      // console.log(decode);
      if (!loadedUser) {
        return res.status(401).send({
          status: 401,
          error: 'You are not a user',
        });
      }


      next();
    } catch (error) {
      return res.status(404).send({
        status: 404,
        error: 'invalid token',

      });
    }
  }
}


export default tokenVerify;
