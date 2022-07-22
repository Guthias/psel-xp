import { Request, Response } from 'express';
import ExchangeService from '../services/ExchangeService';
import JWT from '../helpers/JWT';
import { ErrorsList } from '../middlewares/ErrorsMiddleware';

const buyStocks = async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  const { stockId, quantity } = req.body;
  if (!token) throw ErrorsList.unexpected;
  const { id } = JWT.decodeToken(token);
  const marketPrice = await ExchangeService.buyStocks(id, stockId, quantity);
  res.status(201).json({ marketPrice });
};

export default { buyStocks };
