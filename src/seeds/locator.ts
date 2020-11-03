/* eslint-disable no-await-in-loop */
import { getMongoRepository } from 'typeorm';

import Locator from '../schemas/Locator';
import billSeed from './bill';

async function locatorSeed(): Promise<void> {
  const locatorRepository = getMongoRepository(Locator, 'mongo');
  const nTuples = 10;
  let i = 0;
  while (i < nTuples) {
    const code = Math.floor(1000000000000000 + Math.random() * 9000000000000000)
      .toString(36)
      .substr(0, 10);
    const checkLocatorHasCode = await locatorRepository.findOne({
      where: { code },
    });

    if (!checkLocatorHasCode) {
      const locator = locatorRepository.create({
        code,
        bills: billSeed(), // Apenas para teste, posteriormente será chamado o seeds do Bill
      });
      await locatorRepository.save(locator);
      i += 1;
    }
  }
  console.log('Seeds do localizador foi executado com sucesso!\n');
}

export default locatorSeed;
