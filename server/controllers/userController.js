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
        return res.status(401).send({ status: 401, Error: 'Email is already exist!' });
      }
      // eslint-disable-next-line new-cap
      const user = new userdata(
        id, req.body.firstName, req.body.lastName,
        req.body.email, req.body.password, req.body.gender, req.body.jobRole, req.body.department,
        req.body.address,
      );

      const token = Token.generateToken(user.id, user.email);
      users.push(user);
      
  
 
       const data = users.find(u => (u.email === req.body.email));
      return res.status(201).json({
        status: 201,
        Message: 'user Created successfully',
       
        Data: {
            Id:data.id, 
            Firstname: data.firstname, 
            Lastname: data.lastname,
            Email: data.email, 
            Gender: data.gender, 
            Jobrole: data.jobRole, 
            Department: data.department,
            Adress: data.address,
            Token: token,

        },

      });
    };

    // ........................................

     static signIn = (req, res) => {

       const isLogin = (email, password) => users.find(user => (user.email === email)
      && ((password === user.password)));


       if (isLogin(req.body.email, req.body.password)) {
         const user = users.find(u => (u.email === req.body.email)
          && (req.body.password === u.password));
         const token = Token.generateToken(user.id, req.body.email);


         return res.status(200).json({
           status: 200,
           Message: user.email + ' is successfully logged in',
           Data: {
              
             token,
           },
         });
       }

       return res.status(401).json({
         status: 401,
         Error: 'Invalid Email or Password',
       });
     }
}
export default { UserController, users };
