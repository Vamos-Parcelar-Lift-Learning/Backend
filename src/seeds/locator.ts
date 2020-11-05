import { getMongoRepository } from 'typeorm';

import Locator from '../schemas/Locator';
import billSeed from './bill';

async function locatorSeed(): Promise<Locator[]> {
  const generateUniqueCode = (codes: string[]): string => {
    let code = Math.random().toString(36).substr(6).toUpperCase();
    while (codes.includes(code)) {
      code = Math.random().toString(36).substr(6).toUpperCase();
    }
    return code;
  };

  const locators: Locator[] = [];
  const locatorRepository = getMongoRepository(Locator, 'mongo');
  const lenLocators = 10;
  const existentsLocators = await locatorRepository.find();
  const existentsCodes = existentsLocators.map(locator => locator.code);

  for (let i = 0; i < lenLocators; i += 1) {
    const code = generateUniqueCode(existentsCodes);
    const locator: Locator = locatorRepository.create({
      code,
      bills: billSeed(),
    });
    locators.push(locator);
  }
  return locatorRepository.save(locators);
}

export default locatorSeed;
