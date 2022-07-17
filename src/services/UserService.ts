import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import Users from '../database/models/UserModel';

const errors = {
  incorrectCredentials: {
    status: StatusCodes.BAD_REQUEST,
    message: 'email or password is incorrect',
  },
};

const signIn = async (email: string, password: string): Promise <string> => {
  const User = await Users.findOne({ where: { email } });

  if (!User) throw errors.incorrectCredentials;

  const match = await bcrypt.compare(password, User.password);

  if (!match) return 'Dados incorretos';

  return 'Usuario autenticado com sucesso';
};

export default { signIn };
