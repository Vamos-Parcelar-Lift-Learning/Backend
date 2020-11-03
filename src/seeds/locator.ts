import { getMongoRepository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import Locator from '../schemas/Locator';
import billSeed from './bill';

async function locatorSeed(): Promise<Locator[]> {
  const locators: Locator[] = [];
  const locatorRepository = getMongoRepository(Locator, 'mongo');
  const lenLocators = 10;
  for (let i = 0; i < lenLocators; i += 1) {
    const code = uuidv4();
    const locator: Locator = locatorRepository.create({
      code,
      bills: billSeed(), // Apenas para teste, posteriormente será chamado o seeds do Bill
    });
    locators.push(locator);
  }
  return locatorRepository.save(locators);
}

export default locatorSeed;
