import { Router } from 'express';
import StockController from '../controllers/StockController';

const routes = Router();

routes.get('/', StockController.getAllStocks);

export default routes;
