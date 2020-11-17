import Locator from '../schemas/Locator';

export default interface LocatorRepository {
  findAll(): Promise<Locator[]>;
  findByCode(code: string): Promise<Locator | undefined>;
}
