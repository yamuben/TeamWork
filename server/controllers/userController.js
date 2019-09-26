import dotenv from 'dotenv';
import userdata from '../model/userModel';
import Token from '../helpers/tokens';

const users = [];


dotenv.config();

class UserController {
    // ....................................
    static signUp = (req, res) => {
      const id = users.length + 1;
      const isEmailTaken = users.find(user => user.email === req.body.email);

      if (isEmailTaken) {
        return res.status(401).send({ status: 401, error: 'Email is already exist!' });
      }
      // eslint-disable-next-line new-cap
      const user = new userdata(
        id, req.body.firstName, req.body.lastName,
        req.body.email, req.body.password, req.body.gender, req.body.jobRole, req.body.department,
        req.body.address,
      );

      const token = Token.generateToken(user.id, user.email);
      users.push(user);


      return res.status(201).json({
        status: 201,
        message: 'user Created successfully',
        data: {
          token,

        },
      });
    };

    
}
export default { UserController, users };
