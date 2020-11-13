import { getMongoRepository } from 'typeorm';
import Locator from '../schemas/Locator';
import AppError from '../errors/AppError';

class ShowLocatorService {
  public async execute(code: string): Promise<Locator> {
    const locatorRepository = getMongoRepository(Locator, 'mongo');
    const locator = await locatorRepository.findOne({ code });
    if (!locator) {
      throw new AppError('Localizador não encontrado.', 404);
    }
    return locator;
  }
}

export default ShowLocatorService;
