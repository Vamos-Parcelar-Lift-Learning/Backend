import { getMongoRepository } from 'typeorm';
import Locator from '../schemas/Locator';

class LocatorService {
  public async testConn(): Promise<void> {
    try {
      const locatorRepository = getMongoRepository(Locator, 'mongo');
      console.log(await locatorRepository.stats());
    } catch (error) {
      console.log(error);
    }
  }
}

export default LocatorService;
