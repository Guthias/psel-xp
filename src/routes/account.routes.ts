import { Router } from 'express';
import AccountController from '../controllers/AccountController';
import UserController from '../controllers/UserController';
import AuthVerify from '../middlewares/AuthVerify';
import ValueValidate from '../middlewares/ValueValidate';

const routes = Router();

routes.get('/', AuthVerify, UserController.getUserDetails);

routes.post('/deposit', AuthVerify, ValueValidate, AccountController.depositMoney);

routes.post('/withdraw', AuthVerify, ValueValidate, AccountController.withdrawMoney);

export default routes;
