import User from '../schemas/User';

export default interface UserRepository {
  findAll(): Promise<User[]>;
  findByCode(code: string): Promise<User | undefined>;
  findByCpf(cpf: string): Promise<User | undefined>;
  save(user: User): Promise<User>;
}