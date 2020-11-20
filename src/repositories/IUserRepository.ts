import User from '../schemas/User';
import ICreateUserDTO from './dtos/ICreateUserDTO';

export default interface IUserRepository {
  findAll(): Promise<User[]>;
  findByCode(code: string): Promise<User | undefined>;
  findByCpf(cpf: string): Promise<User | undefined>;
  create(user: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
