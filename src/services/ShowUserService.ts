import AppError from '../errors/AppError';
import IUserRepository from '../repositories/IUserRepository';
import User from '../schemas/User';

class ShowUserService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(code: string): Promise<User> {
    const user = await this.userRepository.findByCode(code);
    if (!user) {
      throw new AppError('Usuário não encontrado.', 404);
    }
    return user;
  }
}

export default ShowUserService;
