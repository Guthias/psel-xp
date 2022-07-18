import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import StockService from '../services/StockService';

const getAllStocks = async (_req: Request, res: Response) => {
  const stockList = await StockService.getAllStocks();
  res.status(StatusCodes.OK).json(stockList);
};

export default { getAllStocks };
