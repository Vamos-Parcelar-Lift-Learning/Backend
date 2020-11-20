import { MongoRepository, getMongoRepository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import IUserRepository from '../IUserRepository';
import User from '../../schemas/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

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

  public async create(createUser: ICreateUserDTO): Promise<User> {
    const created_at = new Date();
    const user = this.ormRepository.create({
      ...createUser,
      code: uuidv4(),
      cashback: 0,
      created_at,
      updated_at: created_at,
    });

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export default ORMUserRepository;
