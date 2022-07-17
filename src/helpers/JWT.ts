import jwt from 'jsonwebtoken';
import IUser from '../interfaces/UserInterface';
import 'dotenv/config';

const SECRET = process.env.SECRET as string;

const createToken = (payload: Omit<IUser, 'password'>): string => {
  const token = jwt.sign(payload, SECRET, {
    expiresIn: '15m',
  });

  return token;
};

export default { createToken };
