/* eslint-disable @typescript-eslint/camelcase */
import ITransactionRepository from '../ITransactionRepository';
import Transaction from '../../schemas/Transaction';

class FakeTransactionRepository implements ITransactionRepository {
  private transactions: Transaction[] = [];

  public async findAllByUser(user_code: string): Promise<Transaction[]> {
    const transactions = this.transactions.filter(element => {
      return element.user_code === user_code;
    });

    return transactions;
  }

  public async findByCode(code: string): Promise<Transaction | undefined> {
    const transaction = this.transactions.find(
      element => element.code === code,
    );
    return transaction;
  }

  public async save(transaction: Transaction): Promise<Transaction> {
    this.transactions.push(transaction);

    return transaction;
  }
}

export default FakeTransactionRepository;
