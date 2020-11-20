import { ObjectID } from 'mongodb';
import ILocatorRepository from '../ILocatorRepository';
import Locator from '../../schemas/Locator';

class FakeLocatorRepository implements ILocatorRepository {
  private locators: Locator[] = [];

  constructor() {
    const bills = [
      {
        code: '695008153145',
        name: 'Energia',
        description: 'Conta de Energia',
        issuer: 'Albuquerque - Santos',
        expiration_date: new Date('2020-11-27'),
        amount: 91,
      },
      {
        code: '25716045148',
        name: 'Energia',
        description: 'Conta de Energia',
        issuer: 'Carvalho, Franco and Reis',
        expiration_date: new Date('2020-11-03'),
        amount: 172,
      },
    ];

    const created_at = new Date();
    const locator = {
      code: 'AAA531',
      bills,
      created_at,
      updated_at: created_at,
      _id: new ObjectID('5fabf9d2ed64b85f96fd3214'),
    };

    this.locators.push(locator);
  }

  public async findAll(): Promise<Locator[]> {
    return this.locators;
  }

  public async findByCode(code: string): Promise<Locator | undefined> {
    const locator = this.locators.find(element => element.code === code);

    return locator;
  }
}

export default FakeLocatorRepository;
