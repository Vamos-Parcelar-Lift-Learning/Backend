import { Request, Response } from 'express';
import IndexTransactionService from '../services/IndexTransactionService';
import ShowTransactionService from '../services/ShowTransactionService';
import CreateTransactionService from '../services/CreateTransactionService';
import ORMTransactionRepository from '../repositories/implementations/ORMTransactionRepository';

export default class TransactionController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { code } = request.user;

    const transactionRepository = new ORMTransactionRepository();
    const transactionService = new IndexTransactionService(
      transactionRepository,
    );
    const transactions = await transactionService.execute(code);
    return response.status(200).json({ transactions });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { code } = request.params;
    const { user } = request;

    const transactionRepository = new ORMTransactionRepository();
    const transactionService = new ShowTransactionService(
      transactionRepository,
    );
    const transaction = await transactionService.execute(code, user.code);
    return response.status(200).json({ transaction });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { user } = request;

    const transactionRepository = new ORMTransactionRepository();
    const transactionService = new CreateTransactionService(
      transactionRepository,
    );
    const transaction = await transactionService.execute(
      request.body,
      user.code,
    );
    return response.status(200).json({ transaction });
  }
}
