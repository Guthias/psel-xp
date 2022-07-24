import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { StatusCodes } from 'http-status-codes';
import { CustomError } from './ErrorsMiddleware';

const OrderSchema = Joi.object({
  stockId: Joi.string().required(),
  quantity: Joi.number().min(1).required(),
  price: Joi.number().min(0.01).optional(),
});

const OrderValidate = async (req: Request, res: Response, next: NextFunction) => {
  const { error } = OrderSchema.validate(req.body);

  if (error) {
    const { type, message } = error.details[0];

    if (type === 'any.required') throw CustomError(StatusCodes.BAD_REQUEST, message);

    throw CustomError(StatusCodes.UNPROCESSABLE_ENTITY, message);
  }

  return next();
};

export default OrderValidate;
