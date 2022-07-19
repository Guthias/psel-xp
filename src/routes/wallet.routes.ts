import { Router } from 'express';
import WalletController from '../controllers/WalletController';
import AuthVerify from '../middlewares/AuthVerify';

const routes = Router();

routes.get('/', AuthVerify, WalletController.getAll);

export default routes;
