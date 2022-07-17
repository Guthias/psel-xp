import { Router } from 'express';
import UserController from '../controllers/UserController';

const routes = Router();

routes.post('/login', UserController.signIn);

export default routes;
