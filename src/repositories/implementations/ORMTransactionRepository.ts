import { MongoRepository, getMongoRepository } from 'typeorm';
import TransactionRepository from '../TransactionRepository';
import Transaction from '../../schemas/Transaction';

class ORMTransactionRepository implements TransactionRepository {
  private ormRepository: MongoRepository<Transaction>;

  constructor() {
    this.ormRepository = getMongoRepository(Transaction, 'mongo');
  }

  public async findAll(user_code: string): Promise<Transaction[]> {
    const transactions = await this.ormRepository.find({ where: { user_code: user_code}});
    return transactions;
  }

  public async findByCode(code: string, user_code: string): Promise<Transaction | undefined> {
    const transaction = await this.ormRepository.findOne({ where: {code: code, user_code: user_code }});
    return transaction;
  }

  public async save(transaction: Transaction): Promise<Transaction> {
    return this.ormRepository.save(transaction);
  }
}

export default ORMTransactionRepository;
