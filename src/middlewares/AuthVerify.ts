import { NextFunction, Request, Response } from 'express';
import { ErrorsList } from './ErrorsMiddleware';

import JWT from '../helpers/JWT';

const AuthVerify = (req: Request, _res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) throw ErrorsList.tokenNotFound;

  try {
    JWT.validateToken(token); // Validating if Token exist
    next();
  } catch (e) {
    throw ErrorsList.invalidToken;
  }
};

export default AuthVerify;
