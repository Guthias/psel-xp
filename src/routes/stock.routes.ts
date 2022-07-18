import { Router } from 'express';
import StockController from '../controllers/StockController';

const routes = Router();

routes.get('/', StockController.getAllStocks);
routes.get('/:id', StockController.getStockById);

export default routes;
