import Locator from '../schemas/Locator';
import AppError from '../errors/AppError';
import LocatorRepository from '../repositories/LocatorRepository';

class IndexLocatorService {
  private locatorRepository: LocatorRepository;

  constructor(locatorRepository: LocatorRepository) {
    this.locatorRepository = locatorRepository;
  }

  public async execute(): Promise<Locator[]> {
    const locators = await this.locatorRepository.findAll();
    if (!locators.length) {
      throw new AppError('Nenhum localizador encontrado', 404);
    }
    return locators;
  }
}

export default IndexLocatorService;
