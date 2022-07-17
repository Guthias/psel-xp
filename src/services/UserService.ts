import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import Users from '../database/models/UserModel';
import hashPassword from '../helpers/hashPassword';
import JWT from '../helpers/JWT';
import IUser from '../interfaces/UserInterface';

const errors = {
  incorrectCredentials: {
    status: StatusCodes.BAD_REQUEST,
    message: 'Invalid Credentials',
  },
  emailAlreadyUsed: {
    status: StatusCodes.CONFLICT,
    message: 'This email is already registred',
  },
  unexpected: {
    status: StatusCodes.INTERNAL_SERVER_ERROR,
    message: 'Unexpected Error',
  },
};

const signIn = async (email: string, triedPassword: string): Promise <string> => {
  const User = await Users.findOne({
    attributes: { exclude: ['balance'] },
    where: { email },
  });

  if (!User) throw errors.incorrectCredentials;

  const match = await bcrypt.compare(triedPassword, User.password);

  if (!match) throw errors.incorrectCredentials;

  const { password, ...UserData } = User.toJSON() as IUser;
  const token = JWT.createToken(UserData);

  return token;
};

const signUp = async (name: string, email: string, password: string): Promise <string> => {
  const hasUser = await Users.findOne({ where: { email } });
  if (hasUser) throw errors.emailAlreadyUsed;

  const hashedPassword = await hashPassword(password);
  await Users.create({ name, email, password: hashedPassword });

  const User = await Users.findOne({
    attributes: { exclude: ['balance', 'password'] },
    where: { email },
  });

  if (!User) throw errors.unexpected;

  const token = JWT.createToken(User.toJSON());

  return token;
};

export default { signIn, signUp };
