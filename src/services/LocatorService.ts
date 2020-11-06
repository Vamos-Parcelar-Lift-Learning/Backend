import { getMongoRepository } from 'typeorm';
import Locator from '../schemas/Locator';
import AppError from '../errors/AppError';

class LocatorService {
  public async getAllLocators(): Promise<Locator[]> {
    const locatorRepository = getMongoRepository(Locator, 'mongo');
    const locators = await locatorRepository.find();
    if (!locators.length) {
      throw new AppError('Nenhum localizador encontrado', 404);
    }
    return locators;
  }

  public async getLocator(code: string): Promise<Locator | undefined> {
    const locatorRepository = getMongoRepository(Locator, 'mongo');
    const locator = await locatorRepository.findOne({ code });
    if (!locator) {
      throw new AppError('Localizador não encontrado.', 404);
    }
    return locator;
  }
}

export default LocatorService;
