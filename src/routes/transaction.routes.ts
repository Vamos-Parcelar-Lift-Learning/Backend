import { Router } from 'express';

const transactionRouter = Router();

transactionRouter.get('/', (request, response) => {
  response.json({message: 'Hello transaction'});
});

export default transactionRouter;
