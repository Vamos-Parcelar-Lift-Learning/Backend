import 'reflect-metadata';
import * as dotenv from 'dotenv';

import { createConnections } from 'typeorm';
import locatorSeed from './locator';
import UserSeed from './UserSeed';

async function indexSeed(): Promise<void> {
  const userSeed = new UserSeed();
  dotenv.config();
  try {
    console.clear();
    await createConnections();
    console.log('Generating Seeds');
    await userSeed.gen();
    console.log('Users generated');
    await locatorSeed();
    console.log('Locators generated');
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

export default indexSeed();
