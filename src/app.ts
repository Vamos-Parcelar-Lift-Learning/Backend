import express, { Router } from 'express';
import cors from 'cors';

const routes = Router();

routes.get('/', async (request, response) => {
  return response.status(200).json({ msg: 'Sucess!' });
});

const app = express();
app.use(express.json());
app.use(cors());
app.use(routes);

export default app;
