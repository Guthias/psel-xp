import { Router } from 'express';
import UserController from '../controllers/UserController';
import AuthVerify from '../middlewares/AuthVerify';

const routes = Router();

routes.get('/', AuthVerify, UserController.getUserDetails);

export default routes;
