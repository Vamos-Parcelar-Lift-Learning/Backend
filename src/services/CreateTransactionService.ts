/* eslint-disable @typescript-eslint/camelcase */
import AppError from '../errors/AppError';
import Transaction from '../schemas/Transaction';
import ITransactionRepository from '../repositories/ITransactionRepository';
import IDictProvider from '../providers/DictProvider/models/IDictProvider';
import User from '../schemas/User';
import IResponseDict from '../providers/DictProvider/dto/IResponseDict';

class CreateTransactionService {
  private transactionRepository: ITransactionRepository;

  private dictProvider: IDictProvider;

  constructor(
    transactionRepository: ITransactionRepository,
    dictProvider: IDictProvider,
  ) {
    this.transactionRepository = transactionRepository;
    this.dictProvider = dictProvider;
  }

  async execute(
    transactionRequest: Transaction,
    key: string,
  ): Promise<Transaction> {
    console.log('transaction = ', transactionRequest);
    const checkTransactionExists = await this.transactionRepository.findByCode(
      transactionRequest.code,
    );

    if (checkTransactionExists) {
      throw new AppError('Essa transação já existe.', 400);
    }

    await this.dictProvider.validateKey(key);

    const transaction: Transaction = {
      ...transactionRequest,
      key,
    };

    // const transaction = await this.transactionRepository.save(
    //   transactionRequest,
    // );

    return transaction;
  }
}

export default CreateTransactionService;
