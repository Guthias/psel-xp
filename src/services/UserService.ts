import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import Users from '../database/models/UserModel';
import JWT from '../helpers/JWT';
import IUser from '../interfaces/UserInterface';

const errors = {
  incorrectCredentials: {
    status: StatusCodes.BAD_REQUEST,
    message: 'email or password is incorrect',
  },
};

const signIn = async (email: string, triedPassword: string): Promise <string> => {
  const User = await Users.findOne({
    attributes: { exclude: ['balance'] },
    where: { email },
  });

  if (!User) throw errors.incorrectCredentials;

  const match = await bcrypt.compare(triedPassword, User.password);

  if (!match) return 'Dados incorretos';

  const { password, ...UserData } = User.toJSON() as IUser;
  const token = JWT.createToken(UserData);

  return token;
};

export default { signIn };
