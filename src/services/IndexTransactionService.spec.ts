import FakeTransactionRepository from '../repositories/fakes/FakeTransactionRepository';
import IndexTransactionService from './IndexTransactionService';
import Transaction from '../schemas/Transaction';

describe('IndexTransaction', () => {
  const transactionRepository = new FakeTransactionRepository();
  const indexTransactionService = new IndexTransactionService(
    transactionRepository,
  );

  beforeAll(async () => {
    const transactionOne: Transaction = {
      _id: '3d7399e0-08e6-4d8c-ba4e-953affd8da5e',
      code: '96089039-b35b-4499-9e36-c0308fea97ee',
      key: 'joaozinho61df@gmail.com',
      participant: {
        order_id: '1',
        qr_code: 'url_qr_code',
        qr_code_text: 'url_qr_code_txt',
        status: 'pending',
      },
      nickname: 'month bills',
      user_code: 'd9db3cc9-bf8e-4b40-bc61-d07c7ef60495',
      amount: 'fake',
      cashback_used: 10.0,
      total_payment: 100.0,
      cashback_generated: 10.2,
      status: 'pending',
      bills: [],
      created_at: new Date('2020-11-20'),
      updated_at: new Date('2020-11-20'),
    };
    const transactionTwo: Transaction = {
      _id: 'dca427c8-9e50-4c6f-894a-2c503a8b632b',
      code: '96089039-b35b-4499-9e36-c0308fea97ed',
      key: 'joaozinho61df@gmail.com',
      participant: {
        order_id: '2',
        qr_code: 'url_qr_code',
        qr_code_text: 'url_qr_code_txt',
        status: 'pending',
      },
      nickname: 'Credit card',
      user_code: 'd9db3cc9-bf8e-4b40-bc61-d07c7ef60495',
      amount: 'fake',
      cashback_used: 70.0,
      total_payment: 700.0,
      cashback_generated: 80.2,
      status: 'pending',
      bills: [],
      created_at: new Date('2020-11-20'),
      updated_at: new Date('2020-11-20'),
    };
    await transactionRepository.save(transactionOne);
    await transactionRepository.save(transactionTwo);
  });

  it('should not find transactions for user_code', async () => {
    const user_code = 'd9db3cc9-bf8e-4b40-bc61-d07c7ef60480';

    const expected: Transaction[] = [];

    indexTransactionService
      .execute(user_code)
      .catch(e => expect(e).toMatchObject(expected));
  });

  it('should find transactions for user_code', async () => {
    const user_code = 'd9db3cc9-bf8e-4b40-bc61-d07c7ef60495';

    const userTransactions = await indexTransactionService.execute(user_code);
    expect(userTransactions.length).toBe(2);
  });
});
