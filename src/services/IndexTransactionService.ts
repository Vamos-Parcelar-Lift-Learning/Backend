import Transaction from '../schemas/Transaction';
import ITransactionRepository from '../repositories/ITransactionRepository';

class IndexTransactionService {
  private transactionRepository: ITransactionRepository;

  constructor(transactionRepository: ITransactionRepository) {
    this.transactionRepository = transactionRepository;
  }

  public async execute(userCode: string): Promise<Transaction[]> {
    const transactions = await this.transactionRepository.findAllByUser(
      userCode,
    );

    return transactions;
  }
}

export default IndexTransactionService;
