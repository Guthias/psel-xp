import { Router } from 'express';
import ExchangeController from '../controllers/ExchangeController';
import AuthVerify from '../middlewares/AuthVerify';
import OrderValidate from '../middlewares/OrderValidate';

const routes = Router();

routes.post('/buy', AuthVerify, OrderValidate, ExchangeController.buyStocks);
routes.post('/sell', AuthVerify, OrderValidate, ExchangeController.sellStocks);

export default routes;
