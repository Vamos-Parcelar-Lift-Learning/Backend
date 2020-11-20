import { MongoRepository, getMongoRepository } from 'typeorm';
import ILocatorRepository from '../ILocatorRepository';
import Locator from '../../schemas/Locator';

class ORMLocatorRepository implements ILocatorRepository {
  private ormRepository: MongoRepository<Locator>;

  constructor() {
    this.ormRepository = getMongoRepository(Locator, 'mongo');
  }

  public async findAll(): Promise<Locator[]> {
    const locators = await this.ormRepository.find();
    return locators;
  }

  public async findByCode(code: string): Promise<Locator | undefined> {
    const locator = await this.ormRepository.findOne({ code });
    return locator;
  }
}

export default ORMLocatorRepository;
