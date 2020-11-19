import { Request, Response } from 'express';
import IndexTransactionService from '../services/IndexTransactionService';
import ShowTransactionService from '../services/ShowTransactionService';
import CreateTransactionService from '../services/CreateTransactionService';
import ORMTransactionRepository from '../repositories/implementations/ORMTransactionRepository';

import * as yup from 'yup';
import AppError from '../errors/AppError';

export default class TransactionController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user = request.user;

    console.log(user);

    const transactionRepository = new ORMTransactionRepository();
    const transactionService = new IndexTransactionService(transactionRepository);
    const transactions = await transactionService.execute();
    return response.status(200).json({ transactions });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { code } = request.params;

    const transactionRepository = new ORMTransactionRepository();
    const transactionService = new ShowTransactionService(transactionRepository);
    const transactions = await transactionService.execute(code);
    return response.status(200).json({ transactions });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const transactionRepository = new ORMTransactionRepository();
    const transactionService = new CreateTransactionService(transactionRepository);
    const transaction = await transactionService.execute(request.body);
    return response.status(200).json({ transaction });
  }
}
