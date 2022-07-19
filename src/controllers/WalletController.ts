import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import JWT from '../helpers/JWT';
import WalletService from '../services/WalletService';

const getAll = async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;
  const { id } = JWT.decodeToken(token);

  const walletStocks = await WalletService.getAll(id);
  res.status(StatusCodes.OK).json(walletStocks);
};

export default { getAll };
