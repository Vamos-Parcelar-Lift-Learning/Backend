import Transaction from '../schemas/Transaction';

export default interface TransactionRepository {
  findAll(): Promise<Transaction[]>;
  findByCode(code: string): Promise<Transaction | undefined>;
  save(transaction: Transaction): Promise<Transaction>;
}
