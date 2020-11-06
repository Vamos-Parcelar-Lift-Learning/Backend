import { getMongoRepository } from 'typeorm';
import * as yup from 'yup';
import Locator from '../schemas/Locator';

class LocatorService {
  public async getAllLocators(): Promise<Locator[]> {
    const locatorRepository = getMongoRepository(Locator, 'mongo');
    const locators = await locatorRepository.find();
    return locators;
  }

  public async getLocator(code: string): Promise<Locator | undefined> {
    const schema = yup
      .string()
      .length(6)
      .matches(/[A-Z0-9]{6}/);

    const isValid = await schema.isValid(code);
    if (isValid) {
      const locatorRepository = getMongoRepository(Locator, 'mongo');
      const locator = await locatorRepository.findOne({ code });
      return locator;
    }
    return undefined; // Tratar erro
  }
}

export default LocatorService;
