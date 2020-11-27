import { sign } from 'jsonwebtoken';
import UserRepository from '../repositories/IUserRepository';

import AppError from '../errors/AppError';
import authConfig from '../config/authConfig';
import User from '../schemas/User';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class AutheticateUserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Usuário ou senha estão incorretos', 401);
    }

    if (password !== user.password) {
      throw new AppError('Usuário ou senha estão incorretos', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({ _id: user._id, code: user.code }, secret, {
      expiresIn,
    });

    delete user.password;

    return { user, token };
  }
}

export default AutheticateUserService;
