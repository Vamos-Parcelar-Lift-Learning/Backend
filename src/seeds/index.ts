import 'reflect-metadata';
import * as dotenv from 'dotenv';

import { createConnection } from 'typeorm';
import locatorSeed from './locator';

async function indexSeed(): Promise<void> {
  dotenv.config();
  await createConnection({
    name: 'mongo',
    type: 'mongodb',
    url: process.env.DB_URL,
    entities: process.env.PROD
      ? [`${__dirname}/../schemas/*.js`]
      : [`${__dirname}/../schemas/*.ts`],
    useUnifiedTopology: true,
  });
  console.clear();
  locatorSeed();
}

export default indexSeed();
