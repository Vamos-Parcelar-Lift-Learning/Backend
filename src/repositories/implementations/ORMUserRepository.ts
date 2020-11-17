import { MongoRepository, getMongoRepository } from 'typeorm';
import IUserRepository from '../UserRepository';
import User from '../../schemas/User';

class ORMUserRepository implements IUserRepository {
  private ormRepository: MongoRepository<User>;

  constructor() {
    this.ormRepository = getMongoRepository(User, 'mongo');
  }

  public async findAll(): Promise<User[]> {
    const users = await this.ormRepository.find();

    return users;
  }

  public async findByCode(code: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ code });

    return user;
  }

  public async findByCpf(cpf: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { cpf } });

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export default ORMUserRepository;
