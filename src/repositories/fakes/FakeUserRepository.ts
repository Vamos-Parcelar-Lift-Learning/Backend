import IUserRepository from '../UserRepository';
import User from '../../schemas/User';
import UserSeed from '../../seeds/UserSeed';

class FakeUserRepository implements IUserRepository {
  private users: User[] = [];

  constructor() {
    const userSeed = new UserSeed();
    const users = userSeed.genInMemory(5);
    this.users.push(...users);
  }

  public async findAll(): Promise<User[]> {
    return this.users;
  }

  public async findByCode(code: string): Promise<User | undefined> {
    const user = this.users.find(element => element.code === code);

    return user;
  }

  public async findByCpf(cpf: string): Promise<User | undefined> {
    const user = this.users.find(element => element.cpf === cpf);

    return user;
  }

  public async save(user: User): Promise<User> {
    const idx = this.users.findIndex(element => element.cpf === user.cpf);
    this.users[idx] = user;

    return user;
  }
}

export default FakeUserRepository;
