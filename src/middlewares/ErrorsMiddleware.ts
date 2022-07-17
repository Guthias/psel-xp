import { NextFunction, Request, Response } from 'express';
import IError from '../interfaces/CustomErrorInterface';

export const CustomError = (status: number, message: string) => ({ status, message });

const errorMiddleware = (error: IError, _req: Request, res: Response, next: NextFunction) => {
  if (error) res.status(error.status || 500).json({ message: error.message || 'Unexpected Error' });
  next();
};

export default errorMiddleware;
