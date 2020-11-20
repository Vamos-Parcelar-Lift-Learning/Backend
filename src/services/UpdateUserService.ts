import UserRepository from '../repositories/IUserRepository';

import User from '../schemas/User';
import AppError from '../errors/AppError';

interface IRequestBody {
  code: string;
  name: string;
  birthdate: Date;
  cpf: string;
}

class UpdateUserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async execute({
    code,
    name,
    birthdate,
    cpf,
  }: IRequestBody): Promise<User> {
    const user = await this.userRepository.findByCode(code);

    if (!user) {
      throw new AppError('Usuário não encontrado', 404);
    }

    if (cpf !== user.cpf) {
      if (await this.userRepository.findByCpf(cpf)) {
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
