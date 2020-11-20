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
    const transactions = await transactionService.execute(user.code);
    return response.status(200).json({ transactions });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { code } = request.params;
    const user = request.user;

    const transactionRepository = new ORMTransactionRepository();
    const transactionService = new ShowTransactionService(transactionRepository);
    const transaction = await transactionService.execute(code, user.code);
    return response.status(200).json({ transaction });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const user = request.user;

    const transactionRepository = new ORMTransactionRepository();
    const transactionService = new CreateTransactionService(transactionRepository);
    const transaction = await transactionService.execute(request.body, user.code);
    return response.status(200).json({ transaction });
  }
}
