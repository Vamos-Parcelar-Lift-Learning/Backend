import { getMongoRepository } from 'typeorm';
import Locator from '../schemas/Locator';

class LocatorService {
  public async getAllLocators(): Promise<Locator[]> {
    const locatorRepository = getMongoRepository(Locator, 'mongo');
    const locators = await locatorRepository.find();
    return locators;
  }

  public async getLocator(code: string): Promise<Locator | undefined> {
    const locatorRepository = getMongoRepository(Locator, 'mongo');
    const locator = await locatorRepository.findOne({ code });
    return locator;
  }
}

export default LocatorService;
