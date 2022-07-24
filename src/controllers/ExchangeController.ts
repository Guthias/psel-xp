import { Request, Response } from 'express';
import ExchangeService from '../services/ExchangeService';
import JWT from '../helpers/JWT';
import { ErrorsList } from '../middlewares/ErrorsMiddleware';

const buyStocks = async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  const { stockId, quantity } = req.body;
  if (!token) throw ErrorsList.unexpected;
  const { id } = JWT.decodeToken(token);
  const createdOrder = await ExchangeService.buyStocks(id, stockId, quantity);
  res.status(201).json(createdOrder);
};

const sellStocks = async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  const { stockId, quantity } = req.body;
  if (!token) throw ErrorsList.unexpected;
  const { id } = JWT.decodeToken(token);
  const createdOrder = await ExchangeService.sellStocks(id, stockId, quantity);
  res.status(201).json(createdOrder);
};

export default { buyStocks, sellStocks };
