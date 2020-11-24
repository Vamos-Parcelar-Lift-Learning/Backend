import AppError from '../errors/AppError';
import Transaction from '../schemas/Transaction';
import ITransactionRepository from '../repositories/ITransactionRepository';

class CreateTransactionService {
  private transactionRepository: ITransactionRepository;

  constructor(transactionRepository: ITransactionRepository) {
    this.transactionRepository = transactionRepository;
  }

  async execute(
    transactionRequest: Transaction,
    userCode: string,
  ): Promise<Transaction> {
    const checkTransactionExists = await this.transactionRepository.findByCode(
      transactionRequest.code,
      userCode,
    );

    if (checkTransactionExists) {
      throw new AppError('Essa transação já existe.');
    }

    const transaction = await this.transactionRepository.save(
      transactionRequest,
    );

    return transaction;
  }
}

export default CreateTransactionService;
