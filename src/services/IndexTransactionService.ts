import Transaction from '../schemas/Transaction';
import AppError from '../errors/AppError';
import TransactionRepository from '../repositories/TransactionRepository';

class IndexTransactionService {
  private transactionRepository: TransactionRepository;

  constructor(transactionRepository: TransactionRepository) {
    this.transactionRepository = transactionRepository;
  }

  public async execute(user_code: string): Promise<Transaction[]> {
    const transactions = await this.transactionRepository.findAll(user_code);
    if (!transactions.length) {
      return [];
    }
    return transactions;
  }
}

export default IndexTransactionService;
