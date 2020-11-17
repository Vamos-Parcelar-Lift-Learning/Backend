import Locator from '../schemas/Locator';
import AppError from '../errors/AppError';
import LocatorRepository from '../repositories/LocatorRepository';

class ShowLocatorService {
  private locatorRepository: LocatorRepository;

  constructor(locatorRepository: LocatorRepository) {
    this.locatorRepository = locatorRepository;
  }

  public async execute(code: string): Promise<Locator> {
    const locator = await this.locatorRepository.findByCode(code);
    if (!locator) {
      throw new AppError('Localizador não encontrado.', 404);
    }
    return locator;
  }
}

export default ShowLocatorService;
