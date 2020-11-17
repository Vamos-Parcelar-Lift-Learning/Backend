import Locator from '../schemas/Locator';

export default interface ILocatorRepository {
  findAll(): Promise<Locator[]>;
  findByCode(code: string): Promise<Locator | undefined>;
}
