import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { StatusCodes } from 'http-status-codes';
import { CustomError } from './ErrorsMiddleware';

const LoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const LoginValidate = async (req: Request, res: Response, next: NextFunction) => {
  const { error } = LoginSchema.validate(req.body);

  if (error) {
    const { type, message } = error.details[0];

    if (type === 'any.required') throw CustomError(StatusCodes.BAD_REQUEST, message);

    throw CustomError(StatusCodes.UNPROCESSABLE_ENTITY, message);
  }

  return next();
};

export default LoginValidate;
