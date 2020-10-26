import 'reflect-metadata';
import { getMongoRepository } from 'typeorm';
import Photo from '../schemas/PhotoExample';

class HelloService {
  public async testConn(): Promise<void> {
    try {
      const helloRepository = getMongoRepository(Photo, 'mongo');
      console.log(await helloRepository.stats());
    } catch (error) {
      console.log(error);
    }
  }
}

export default HelloService;
