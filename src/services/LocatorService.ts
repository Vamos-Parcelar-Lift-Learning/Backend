import { getMongoRepository } from 'typeorm';
import * as yup from 'yup';
import Locator from '../schemas/Locator';
import AppError from '../errors/AppError';

class LocatorService {
  public async getAllLocators(): Promise<Locator[]> {
    const schema = yup.array().min(1);
    const locatorRepository = getMongoRepository(Locator, 'mongo');
    const locators = await locatorRepository.find();
    const isValid = await schema.isValid(locators);
    if (isValid) {
      return locators;
    }
    throw new AppError('Nenhum localizador encontrado', 404);
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
      if (locator) {
        return locator;
      }
    }
    throw new AppError('Localizador não encontrado.', 404);
  }
}

export default LocatorService;
