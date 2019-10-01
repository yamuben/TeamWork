import dotenv from 'dotenv';
import userdata from '../model/userModel';
import Token from '../helpers/tokens';

const users = [];
const userProfile =[];

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
      
         // art.forEach((art) => { delete art.date_integer; });
       user => {delete user.password;};
       const Profile = userProfile.find(u => (u.email === req.body.email));
      return res.status(201).json({
        status: 201,
        message: 'user Created successfully',
       


          data: {
            Id:id, 
            Firstname: req.body.firstName, 
            Lastname: req.body.lastName,
            Email: req.body.email, 
            Gender: req.body.gender, 
            Jobrole: req.body.jobRole, 
            Department: req.body.department,
            Adress: req.body.address,
            token,

        },

      });
    };

    // ........................................
     // USER LOGIN
     static signIn = (req, res) => {
       //
       const isLogin = (email, password) => users.find(user => (user.email === email)
      && ((password === user.password)));


       if (isLogin(req.body.email, req.body.password)) {
         const user = users.find(u => (u.email === req.body.email)
          && (req.body.password === u.password));
         const token = Token.generateToken(user.id, req.body.email);


         return res.status(200).json({
           status: 200,
           message: 'user  is successfully logged in',
           data: {
             token,
           },
         });
       }

       return res.status(401).json({
         status: 401,
         error: 'Invalid Email or Password',
       });
     }
}
export default { UserController, users };
