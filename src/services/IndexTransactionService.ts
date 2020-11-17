import Transaction from '../schemas/Transaction';
import AppError from '../errors/AppError';
import TransactionRepository from '../repositories/TransactionRepository';

class IndexTransactionService {
  private transactionRepository: TransactionRepository;

  constructor(transactionRepository: TransactionRepository) {
    this.transactionRepository = transactionRepository;
  }

  public async execute(): Promise<Transaction[]> {
    const transactions = await this.transactionRepository.findAll();
    if (!transactions.length) {
      throw new AppError('Nenhum transação encontrada', 404);
    }
    return transactions;
  }
}

export default IndexTransactionService;
