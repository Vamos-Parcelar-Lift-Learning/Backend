import { Request, Response } from 'express';
import { getMongoRepository } from 'typeorm';
import Transaction from '../schemas/Transaction';

export default class AdminTransactionController {
  public async index(request: Request, response: Response): Promise<Response> {
    const transactionRepository = getMongoRepository(Transaction, 'mongo');
    const transactions = await transactionRepository.find();
    return response.status(200).json(transactions);
  }
}
