import jwt from 'jsonwebtoken';

const Helper = {

  generateToken(id, email) {
    const token = jwt.sign({
      Id: id,
      userEmail: email,
    },
    process.env.teamwork_scretkey, { expiresIn: '1d' });
    return token;
  },


};

export default Helper;
