import Locator from '../schemas/Locator';
import AppError from '../errors/AppError';
import ILocatorRepository from '../repositories/ILocatorRepository';

class ShowLocatorService {
  private locatorRepository: ILocatorRepository;

  constructor(locatorRepository: ILocatorRepository) {
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
