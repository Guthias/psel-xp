import { Router } from 'express';
import UserController from '../controllers/UserController';
import LoginValidate from '../middlewares/LoginValidate';
import SignupValidate from '../middlewares/SignupValidate';

const routes = Router();

routes.post('/login', LoginValidate, UserController.signIn);

routes.post('/signup', SignupValidate, UserController.signUp);

export default routes;
