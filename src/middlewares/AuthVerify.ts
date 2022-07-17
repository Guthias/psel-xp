import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import JWT from '../helpers/JWT';

const errors = {
  tokenNotFound: {
    status: StatusCodes.UNAUTHORIZED,
    message: 'Token not found',
  },
  invalidToken: {
    status: StatusCodes.UNAUTHORIZED,
    message: 'Invalid or expired Token',
  },
};

const AuthVerify = (req: Request, _res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) throw errors.tokenNotFound;

  try {
    JWT.validateToken(token); // Validating if Token exist
    next();
  } catch (e) {
    throw errors.invalidToken;
  }
};

export default AuthVerify;
