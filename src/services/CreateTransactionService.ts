import AppError from '../errors/AppError';
import Transaction from '../schemas/Transaction';
import TransactionRepository from '../repositories/TransactionRepository';
import TransactionController from '../controllers/TransactionController';

class CreateTransactionService {
  constructor(
    private transactionRepository: TransactionRepository,
  ) {}

  async execute(transactionRequest: Transaction, user_code: string): Promise<Transaction> {

    const checkTransactionExists = await this.transactionRepository.findByCode(transactionRequest.code, user_code);

    if (checkTransactionExists) {
      throw new AppError('Essa transação já existe.');
    }

    const transaction = await this.transactionRepository.save(transactionRequest);

    return transaction;
  }
}

export default CreateTransactionService;
