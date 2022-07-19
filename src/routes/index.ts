import { Router } from 'express';
import UserController from '../controllers/UserController';
import LoginValidate from '../middlewares/LoginValidate';
import SignupValidate from '../middlewares/SignupValidate';
import accountRoutes from './account.routes';
import stockRoutes from './stock.routes';
import walletRoutes from './wallet.routes';

const routes = Router();

routes.post('/login', LoginValidate, UserController.signIn);

routes.post('/signup', SignupValidate, UserController.signUp);

routes.use('/account', accountRoutes);

routes.use('/stocks', stockRoutes);

routes.use('/wallet', walletRoutes);

export default routes;
