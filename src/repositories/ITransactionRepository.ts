import Transaction from '../schemas/Transaction';

export default interface ITransactionRepository {
  findAllByUser(userCode: string): Promise<Transaction[]>;
  findByCode(code: string, userCode: string): Promise<Transaction | undefined>;
  save(transaction: Transaction): Promise<Transaction>;
}
