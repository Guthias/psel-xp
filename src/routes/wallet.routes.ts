import { Router } from 'express';
import WalletController from '../controllers/WalletController';
import AuthVerify from '../middlewares/AuthVerify';

const routes = Router();

routes.get('/', AuthVerify, WalletController.getAll);
routes.get('/buy', AuthVerify, WalletController.getBuyOrders);
routes.get('/sell', AuthVerify, WalletController.getSellOrders);

export default routes;
