import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import IError from '../interfaces/CustomErrorInterface';

export const ErrorsList = {
  incorrectCredentials: {
    status: StatusCodes.BAD_REQUEST,
    message: 'Invalid Credentials',
  },
  emailAlreadyUsed: {
    status: StatusCodes.CONFLICT,
    message: 'This email is already registred',
  },
  unexpected: {
    status: StatusCodes.INTERNAL_SERVER_ERROR,
    message: 'Unexpected Error',
  },
  tokenNotFound: {
    status: StatusCodes.UNAUTHORIZED,
    message: 'Token not found',
  },
  invalidToken: {
    status: StatusCodes.UNAUTHORIZED,
    message: 'Invalid or expired Token',
  },
  insuficientFounds: {
    status: StatusCodes.PAYMENT_REQUIRED,
    message: 'Insuficient Founds',
  },
};

export const CustomError = (status: number, message: string) => ({ status, message });

const errorMiddleware = (error: IError, _req: Request, res: Response, next: NextFunction) => {
  if (error) res.status(error.status || 500).json({ message: error.message || 'Unexpected Error' });
  next();
};

export default errorMiddleware;
