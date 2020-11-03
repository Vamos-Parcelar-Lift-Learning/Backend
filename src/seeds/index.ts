import { createConnections } from 'typeorm';
import * as dotenv from 'dotenv';
import UserSeed from './UserSeed';

const userSeed = new UserSeed();

dotenv.config();

createConnections().then(
  () => {
    console.log('Generating Seeds');

    userSeed.gen().then(
      () => {
        console.log('Users generated');
      },
      err => {
        console.log(err);
      },
    );
  },
  err => {
    console.log(err);
    process.exit(1);
  },
);
