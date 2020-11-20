import Transaction from '../schemas/Transaction';

export default interface TransactionRepository {
  findAll(user_code: string): Promise<Transaction[]>;
  findByCode(code: string, user_code: string): Promise<Transaction | undefined>;
  save(transaction: Transaction): Promise<Transaction>;
}
