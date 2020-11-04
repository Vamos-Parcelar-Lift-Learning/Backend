import { getMongoRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';

import AppError from '../errors/AppError';
import User from '../schemas/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AutheticateUserService {
  public async handle({ email, password }: Request): Promise<Response> {
    const userRepository = getMongoRepository(User, 'mongo');

    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      throw new AppError('Usuário ou senha estão incorretos', 401);
    }

    if (password !== user.password) {
      throw new AppError('Usuário ou senha estão incorretos', 401);
    }

    // TODO validar variáveis de ambiente
    if (!process.env.SECRET) {
      throw new AppError('Internal server error', 500);
    }

    const secret = process.env.SECRET;
    const token = sign({ id: user.id, code: user.code }, secret, {
      expiresIn: '365d',
    });

    delete user.password;

    return { user, token };
  }
}

export default AutheticateUserService;
