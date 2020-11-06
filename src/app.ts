import express from 'express';
import 'express-async-errors';
import * as dotenv from 'dotenv';
import cors from 'cors';

import { createConnections } from 'typeorm';
import routes from './routes/index';
import handleError from './middlewares/handleError';

dotenv.config();

createConnections().catch(err => {
  console.log('Internal server error', err);
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);
app.use(handleError);

export default app;
