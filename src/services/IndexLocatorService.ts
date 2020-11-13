import { getMongoRepository } from 'typeorm';
import Locator from '../schemas/Locator';
import AppError from '../errors/AppError';

class IndexLocatorService {
  public async execute(): Promise<Locator[]> {
    const locatorRepository = getMongoRepository(Locator, 'mongo');
    const locators = await locatorRepository.find();
    if (!locators.length) {
      throw new AppError('Nenhum localizador encontrado', 404);
    }
    return locators;
  }
}

export default IndexLocatorService;
