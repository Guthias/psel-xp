import { Router } from 'express';
import ExchangeController from '../controllers/ExchangeController';
import AuthVerify from '../middlewares/AuthVerify';

const routes = Router();

routes.post('/buy', AuthVerify, ExchangeController.buyStocks);

export default routes;
