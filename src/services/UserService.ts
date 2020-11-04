import { getMongoRepository } from 'typeorm';
import User from '../schemas/User';

class UserService {
  public async getAllUsers(): Promise<User[]> {
    // try {
    const userRepository = getMongoRepository(User, 'mongo');
    const users = userRepository.find();

    return users;
    // } catch (error) {
    //   console.log(error);
    // }
  }
}

export default UserService;
