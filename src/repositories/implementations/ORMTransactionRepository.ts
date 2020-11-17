import { MongoRepository, getMongoRepository } from 'typeorm';
import TransactionRepository from '../TransactionRepository';
import Transaction from '../../schemas/Transaction';

class ORMTransactionRepository implements TransactionRepository {
  private ormRepository: MongoRepository<Transaction>;

  constructor() {
    this.ormRepository = getMongoRepository(Transaction, 'mongo');
  }

  public async findAll(): Promise<Transaction[]> {
    const transactions = await this.ormRepository.find();
    return transactions;
  }
}

export default ORMTransactionRepository;
