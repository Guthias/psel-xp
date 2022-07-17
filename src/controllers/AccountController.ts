import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import JWT from '../helpers/JWT';
import * as UserService from '../services/UserService';
import { ErrorsList } from '../middlewares/ErrorsMiddleware';

const depositMoney = async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  const { value } = req.body;

  if (!value || !token) throw ErrorsList.unexpected;
  const { id } = JWT.decodeToken(token);

  const newBalance = await UserService.increaseBalance(id, value);

  res.status(StatusCodes.OK).json(newBalance);
};

export default { depositMoney };
