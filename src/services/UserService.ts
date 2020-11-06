import { getMongoRepository } from 'typeorm';
import User from '../schemas/User';

class UserService {
  public async getAllUsers(): Promise<User[]> {
    const userRepository = getMongoRepository(User, 'mongo');
    const users = userRepository.find();

    return users;
  }

  public async updateUsers(): Promise<User[]> {
    const userRepository = getMongoRepository(User, 'mongo');
    return userRepository.find();
  }
}

export default UserService;
