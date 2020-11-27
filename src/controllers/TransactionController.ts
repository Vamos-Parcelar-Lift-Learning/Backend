/* eslint-disable @typescript-eslint/camelcase */
import { Request, Response } from 'express';
import * as yup from 'yup';

import IndexTransactionService from '../services/IndexTransactionService';
import ShowTransactionService from '../services/ShowTransactionService';
import CreateTransactionService from '../services/CreateTransactionService';
import ORMTransactionRepository from '../repositories/implementations/ORMTransactionRepository';
import FakeDictProvider from '../providers/DictProvider/fakes/FakeDictProvider';
import ORMUserRepository from '../repositories/implementations/ORMUserRepository';
import ShowUserService from '../services/ShowUserService';
// import FakeParticipantProvider from '../providers/DirectParticipantProvider/fakes/FakeDirectParticipant';

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

    const transactionRepository = new ORMTransactionRepository();
    const transactionService = new ShowTransactionService(
      transactionRepository,
    );
    const transaction = await transactionService.execute(code);
    return response.status(200).json({ transaction });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { key, transaction } = request.body;

    if (!key || !transaction) {
      return response.status(400).json({ msg: 'Body inválido' });
    }

    const transactionSchema = yup.object().shape({
      nickname: yup.string().required(),
      bills: yup.array().of(
        yup.object().shape({
          name: yup.string().required(),
          description: yup.string().required(),
          issuer: yup.string().required(),
          expiration_date: yup.date().required(),
          amount: yup.number().required(),
        }),
      ),
    });

    const isValid = await transactionSchema.isValid(transaction);
    if (!isValid) {
      return response.status(400).json({ msg: 'Body inválido' });
    }

    // get logged user in database
    const userCode = request.user.code;
    const userRepository = new ORMUserRepository();
    const showUserService = new ShowUserService(userRepository);
    const user = await showUserService.execute(userCode);

    const transactionRepository = new ORMTransactionRepository();
    const dictProvider = new FakeDictProvider();
    // const participantProvider = new FakeParticipantProvider();
    const transactionService = new CreateTransactionService(
      transactionRepository,
      dictProvider,
      // partipantProvider,
    );

    const createTransaction = await transactionService.execute(
      transaction,
      user,
      key,
    );
    return response.status(200).json(createTransaction);
  }
}
