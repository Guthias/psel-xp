import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { StatusCodes } from 'http-status-codes';

const LoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const LoginValidate = async (req: Request, res: Response, next: NextFunction) => {
  const { error } = LoginSchema.validate(req.body);

  if (error) {
    const { message } = error.details[0];

    return res.status(StatusCodes.BAD_REQUEST).json({ message });
  }

  return next();
};

export default LoginValidate;
