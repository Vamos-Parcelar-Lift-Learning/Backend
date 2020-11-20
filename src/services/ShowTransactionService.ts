import Transaction from '../schemas/Transaction';
import AppError from '../errors/AppError';
import TransactionRepository from '../repositories/TransactionRepository';

class ShowTransactionService {
  private transactionRepository: TransactionRepository;

  constructor(transactionRepository: TransactionRepository) {
    this.transactionRepository = transactionRepository;
  }

  public async execute(code: string, user_code: string): Promise<Transaction> {
    const transaction = await this.transactionRepository.findByCode(code, user_code);
    if (!transaction) {
      throw new AppError('Transação não encontrada.', 404);
    }
    return transaction;
  }
}

export default ShowTransactionService;
