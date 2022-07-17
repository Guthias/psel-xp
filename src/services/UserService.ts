import bcrypt from 'bcrypt';
import Users from '../database/models/UserModel';
import hashPassword from '../helpers/hashPassword';
import JWT from '../helpers/JWT';
import IUser from '../interfaces/UserInterface';
import { ErrorsList } from '../middlewares/ErrorsMiddleware';

export const signIn = async (email: string, triedPassword: string): Promise <string> => {
  const User = await Users.findOne({
    attributes: { exclude: ['balance'] },
    where: { email },
  });

  if (!User) throw ErrorsList.incorrectCredentials;

  const match = await bcrypt.compare(triedPassword, User.password);

  if (!match) throw ErrorsList.incorrectCredentials;

  const { password, ...UserData } = User.toJSON() as IUser;

  const token = JWT.createToken(UserData);

  return token;
};

export const signUp = async (name: string, email: string, password: string): Promise <string> => {
  const hasUser = await Users.findOne({ where: { email } });
  if (hasUser) throw ErrorsList.emailAlreadyUsed;

  const hashedPassword = await hashPassword(password);
  await Users.create({ name, email, password: hashedPassword });

  const User = await Users.findOne({
    attributes: { exclude: ['balance', 'password'] },
    where: { email },
  });

  if (!User) throw ErrorsList.unexpected;

  const token = JWT.createToken(User.toJSON());

  return token;
};

export const getDetailsById = async (id: number) => {
  const userDetails = await Users.findOne({
    attributes: { exclude: ['password'] },
    where: { id },
  });

  return { ...userDetails?.toJSON(), balance: Number(userDetails?.balance) };
};
