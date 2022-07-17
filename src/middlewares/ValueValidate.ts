import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { StatusCodes } from 'http-status-codes';
import { CustomError } from './ErrorsMiddleware';

const ValueSchema = Joi.object({
  value: Joi.number().min(1).required(),
});

const ValueValidate = async (req: Request, _res: Response, next: NextFunction) => {
  const { error } = ValueSchema.validate(req.body);

  if (error) {
    const { message } = error.details[0];

    throw CustomError(StatusCodes.BAD_REQUEST, message);
  }

  return next();
};

export default ValueValidate;
