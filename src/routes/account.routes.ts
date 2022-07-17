import { Router } from 'express';
import AccountController from '../controllers/AccountController';
import UserController from '../controllers/UserController';
import AuthVerify from '../middlewares/AuthVerify';

const routes = Router();

routes.get('/', AuthVerify, UserController.getUserDetails);

routes.post('/deposit', AuthVerify, AccountController.depositMoney);

export default routes;
