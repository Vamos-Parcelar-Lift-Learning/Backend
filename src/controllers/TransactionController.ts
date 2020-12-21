import { Request, Response } from 'express';
import * as yup from 'yup';

import IndexTransactionService from '../services/IndexTransactionService';
import ShowTransactionService from '../services/ShowTransactionService';
import CreateTransactionService from '../services/CreateTransactionService';
import ORMTransactionRepository from '../repositories/implementations/ORMTransactionRepository';
import ORMUserRepository from '../repositories/implementations/ORMUserRepository';
import ShowUserService from '../services/ShowUserService';
import MockDictProvider from '../providers/DictProvider/implementations/MockDictProvider';
import DirectParticipantProvider from '../providers/DirectParticipantProvider/implementations/DirectParticipantProvider';

export default class TransactionController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { code } = request.user;
    const transactionRepository = new ORMTransactionRepository();
    const transactionService = new IndexTransactionService(
      transactionRepository,
    );
    const transactions = await transactionService.execute(code);
    return response.status(200).json(transactions);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { code } = request.params;
    const { user } = request;

    const transactionRepository = new ORMTransactionRepository();
    const transactionService = new ShowTransactionService(
      transactionRepository,
    );
    const transaction = await transactionService.execute(code, user.code);
    return response.status(200).json(transaction);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const schema = yup.object().shape({
      key: yup.string().required(),
      cashback: yup.number().min(0).required(),
      transaction: yup.object().shape({
        nickname: yup.string().required(),
        bills: yup.array().of(
          yup.object().shape({
            name: yup.string().required(),
            description: yup.string().required(),
            issuer: yup.string().required(),
            expiration_date: yup.date().required(),
            amount: yup.number().positive().required(),
          }),
        ),
      }),
    });

    const isValid = await schema.isValid(request.body);
    if (!isValid) {
      return response.status(400).json({ msg: 'Body inválido' });
    }

    const { key, cashback, transaction } = request.body;

    // get logged user in database
    const userCode = request.user.code;
    const userRepository = new ORMUserRepository();
    const showUserService = new ShowUserService(userRepository);
    const user = await showUserService.execute(userCode);

    const transactionRepository = new ORMTransactionRepository();
    const dictProvider = new MockDictProvider();
    const participantProvider = new DirectParticipantProvider();
    const transactionService = new CreateTransactionService(
      transactionRepository,
      dictProvider,
      participantProvider,
    );

    const createTransaction = await transactionService.execute(
      transaction,
      cashback,
      user,
      key,
    );
    return response.status(200).json(createTransaction);
  }
}
