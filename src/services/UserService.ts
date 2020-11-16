import { getMongoRepository } from 'typeorm';

import User from '../schemas/User';
import AppError from '../errors/AppError';

interface IRequestBody {
  code: string;
  name: string;
  birthdate: Date;
  cpf: string;
}

class UserService {
  public async getAllUsers(): Promise<User[]> {
    const userRepository = getMongoRepository(User, 'mongo');
    const users = userRepository.find();

    return users;
  }

  public async updateUsers({
    code,
    name,
    birthdate,
    cpf,
  }: IRequestBody): Promise<User> {
    const userRepository = getMongoRepository(User, 'mongo');
    const user = await userRepository.findOne({ code });

    if (!user) {
      throw new AppError('Usuário não encontrado', 404);
    }

    if (cpf !== user.cpf) {
      if (await userRepository.findOne({ cpf })) {
        throw new AppError('Cpf informado já cadastrado no sistema');
      }
    }

    user.name = name;
    user.birthdate = birthdate;
    user.cpf = cpf;
    user.updated_at = new Date();
    return userRepository.save(user);
  }
}

export default UserService;
