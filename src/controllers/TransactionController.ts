import { Request, Response } from 'express';
import IndexTransactionService from '../services/IndexTransactionService';
import ORMTransactionRepository from '../repositories/implementations/ORMTransactionRepository';

export default class TransactionController {
  public async index(request: Request, response: Response): Promise<Response> {
    const transactionRepository = new ORMTransactionRepository();
    const transactionService = new IndexTransactionService(transactionRepository);
    const transactions = await transactionService.execute();
    return response.status(200).json({ transactions });
  }
}
