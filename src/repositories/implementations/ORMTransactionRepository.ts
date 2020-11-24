import { MongoRepository, getMongoRepository } from 'typeorm';
import ITransactionRepository from '../ITransactionRepository';
import Transaction from '../../schemas/Transaction';

class ORMTransactionRepository implements ITransactionRepository {
  private ormRepository: MongoRepository<Transaction>;

  constructor() {
    this.ormRepository = getMongoRepository(Transaction, 'mongo');
  }

  // eslint-disable-next-line @typescript-eslint/camelcase
  public async findAll(user_code: string): Promise<Transaction[]> {
    const transactions = await this.ormRepository.find({
      // eslint-disable-next-line @typescript-eslint/camelcase
      where: { user_code },
    });
    return transactions;
  }

  public async findByCode(
    code: string,
    // eslint-disable-next-line @typescript-eslint/camelcase
    user_code: string,
  ): Promise<Transaction | undefined> {
    const transaction = await this.ormRepository.findOne({
      // eslint-disable-next-line @typescript-eslint/camelcase
      where: { code, user_code },
    });
    return transaction;
  }

  public async save(transaction: Transaction): Promise<Transaction> {
    return this.ormRepository.save(transaction);
  }
}

export default ORMTransactionRepository;
