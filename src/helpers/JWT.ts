import jwt from 'jsonwebtoken';
import IUser from '../interfaces/UserInterface';
import 'dotenv/config';
import IAuthToken from '../interfaces/AuthTokenInterface';

const SECRET = process.env.SECRET as string;

const createToken = (payload: Omit<IUser, 'password'>): string => {
  const token = jwt.sign(payload, SECRET, {
    expiresIn: '15m',
  });

  return token;
};

const decodeToken = (token: string): IAuthToken => {
  const tokenDetails = jwt.decode(token) as IAuthToken;
  const { id, name, email } = tokenDetails;
  return { id, name, email };
};

export default { createToken, decodeToken };
