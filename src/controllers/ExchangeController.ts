import { Request, Response } from 'express';
import ExchangeService from '../services/ExchangeService';

const buyStocks = async (req: Request, res: Response) => {
  const { stockId, quantity } = req.body;
  const marketPrice = await ExchangeService.buyStocks(1, stockId, quantity);
  res.status(201).json({ marketPrice });
};

export default { buyStocks };
