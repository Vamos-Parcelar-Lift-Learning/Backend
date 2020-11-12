import { MongoRepository } from 'typeorm';

import User from '../schemas/User';
import AppError from '../errors/AppError';

interface RequestBody {
  code: string;
  name: string;
  birthdate: Date;
  cpf: string;
}

class UpdateUserService {
  private userRepository: MongoRepository<User>;

  constructor(userRepository: MongoRepository<User>) {
    this.userRepository = userRepository;
  }

  public async execute({
    code,
    name,
    birthdate,
    cpf,
  }: RequestBody): Promise<User> {
    const user = await this.userRepository.findOne({ code });

    if (!user) {
      throw new AppError('Usuário não encontrado', 404);
    }

    if (cpf !== user.cpf) {
      if (await this.userRepository.findOne({ cpf })) {
        throw new AppError('Cpf informado já cadastrado no sistema');
      }
    }

    user.name = name;
    user.birthdate = birthdate;
    user.cpf = cpf;
    user.updated_at = new Date();
    return this.userRepository.save(user);
  }
}

export default UpdateUserService;
