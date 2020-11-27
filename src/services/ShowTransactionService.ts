import Transaction from '../schemas/Transaction';
import AppError from '../errors/AppError';
import ITransactionRepository from '../repositories/ITransactionRepository';

class ShowTransactionService {
  private transactionRepository: ITransactionRepository;

  constructor(transactionRepository: ITransactionRepository) {
    this.transactionRepository = transactionRepository;
  }

  public async execute(code: string, userCode: string): Promise<Transaction> {
    const transaction = await this.transactionRepository.findByCode(code);

    if (!transaction || transaction.user_code !== userCode) {
      throw new AppError('Transação não encontrada.', 404);
    }
    return transaction;
  }
}

export default ShowTransactionService;
