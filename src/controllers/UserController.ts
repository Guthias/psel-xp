import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserService from '../services/UserService';

const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const token = await UserService.signIn(email, password);
  return res.status(StatusCodes.OK).json({ token });
};

const signUp = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const token = await UserService.signUp(name, email, password);
  return res.status(StatusCodes.CREATED).json({ token });
};

export default { signIn, signUp };
