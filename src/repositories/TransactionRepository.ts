import Transaction from '../schemas/Transaction';

export default interface TransactionRepository {
  findAll(): Promise<Transaction[]>;
}
