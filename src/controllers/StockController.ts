import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import StockService from '../services/StockService';

const getAllStocks = async (_req: Request, res: Response) => {
  const stockList = await StockService.getAllStocks();
  res.status(StatusCodes.OK).json(stockList);
};

const getStockById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const stockData = await StockService.getStockById(id.toUpperCase());
  res.status(StatusCodes.OK).json(stockData);
};

export default { getAllStocks, getStockById };
