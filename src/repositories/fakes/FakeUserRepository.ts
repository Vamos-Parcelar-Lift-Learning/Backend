import { v4 as uuidv4 } from 'uuid';
import { ObjectID } from 'mongodb';
import IUserRepository from '../IUserRepository';
import User from '../../schemas/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

class FakeUserRepository implements IUserRepository {
  private users: User[] = [];

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

  public async create(createUser: ICreateUserDTO): Promise<User> {
    const user = new User();
    const created_at = new Date();

    Object.assign(user, {
      _id: new ObjectID(),
      code: uuidv4(),
      ...createUser,
      cashback: 0,
      created_at,
      updated_at: created_at,
    });

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const idx = this.users.findIndex(element => element.cpf === user.cpf);
    this.users[idx] = user;

    return user;
  }
}

export default FakeUserRepository;
