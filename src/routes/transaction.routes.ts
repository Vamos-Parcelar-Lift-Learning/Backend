import { Router } from 'express';
import { TransactionRepository } from 'typeorm';
import TransactionController from '../controllers/TransactionController';

const transactionRouter = Router();
const transactionController = new TransactionController();

transactionRouter.get('/', transactionController.index);
transactionRouter.post('/', transactionController.create);
transactionRouter.get('/:code', transactionController.show);

export default transactionRouter;
