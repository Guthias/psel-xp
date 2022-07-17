import { Router } from 'express';
import UserController from '../controllers/UserController';
import LoginValidate from '../middlewares/LoginValidate';

const routes = Router();

routes.post('/login', LoginValidate, UserController.signIn);

export default routes;
