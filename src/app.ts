import cors from 'cors';
import express from 'express';
import * as dotenv from 'dotenv';
import { createConnections } from 'typeorm';

import routes from './routes/index';

dotenv.config();
createConnections().catch(err => {
  console.log('Internal server error', err);
});

const app = express();
app.use(express.json());
app.use(cors());
app.use(routes);

export default app;
