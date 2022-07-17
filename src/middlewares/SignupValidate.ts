import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { StatusCodes } from 'http-status-codes';
import { CustomError } from './ErrorsMiddleware';

const RegisterSchema = Joi.object({
  name: Joi.string().min(5).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const SignupValidate = async (req: Request, _res: Response, next: NextFunction) => {
  const { error } = RegisterSchema.validate(req.body);

  if (error) {
    const { message, type } = error.details[0];

    if (type === 'any.required') throw CustomError(StatusCodes.BAD_REQUEST, message);

    throw CustomError(StatusCodes.UNPROCESSABLE_ENTITY, message);
  }

  return next();
};

export default SignupValidate;
