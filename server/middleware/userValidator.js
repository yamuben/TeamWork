import Joi from 'joi';

export const validsignUp = (req, res, next) => {
  const schema = {
    firstName: Joi.string().alphanum().required(),
    lastName: Joi.string().alphanum().required(),
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).min(6).required(),
    gender: Joi.string().alphanum().required(),
    jobRole: Joi.string().required(),
    department: Joi.string().required(),
    address: Joi.string().required(),

  };
  const result = Joi.validate(req.body, schema);
  if (result.error !== null) {
    return res.status(400).send(
      {
        status: 400,
        error: result.error.details[0].message,
      },
    );
  }
  next();
};