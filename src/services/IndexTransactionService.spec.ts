/* eslint-disable @typescript-eslint/camelcase */
import { Double } from 'mongodb';
import FakeTransactionRepository from '../repositories/fakes/FakeTransactionRepository';
import IndexTransactionService from './IndexTransactionService';
import Transaction from '../schemas/Transaction';

describe('IndexTransaction', () => {
  const transactionRepository = new FakeTransactionRepository();
  const indexTransactionService = new IndexTransactionService(
    transactionRepository,
  );

  beforeEach(() => {
    const transactionOne: Transaction = {
      _id: '3d7399e0-08e6-4d8c-ba4e-953affd8da5e',
      code: '96089039-b35b-4499-9e36-c0308fea97ee',
      nickname: 'month bills',
      user_code: 'd9db3cc9-bf8e-4b40-bc61-d07c7ef60495',
      amount: 'fake',
      cashback_used: new Double(10.0),
      total_payment: new Double(100.0),
      cashback_generated: new Double(10.2),
      status: 'pending',
      bills: [],
      created_at: new Date('2020-11-20'),
      updated_at: new Date('2020-11-20'),
    };
    const transactionTwo: Transaction = {
      _id: 'dca427c8-9e50-4c6f-894a-2c503a8b632b',
      code: '96089039-b35b-4499-9e36-c0308fea97ed',
      nickname: 'Credit card',
      user_code: 'd9db3cc9-bf8e-4b40-bc61-d07c7ef60495',
      amount: 'fake',
      cashback_used: new Double(70.0),
      total_payment: new Double(700.0),
      cashback_generated: new Double(80.2),
      status: 'pending',
      bills: [],
      created_at: new Date('2020-11-20'),
      updated_at: new Date('2020-11-20'),
    };
    transactionRepository.save(transactionOne);
    transactionRepository.save(transactionTwo);
  });

  it('should not find user_code', async () => {
    const user_code = 'd9db3cc9-bf8e-4b40-bc61-d07c7ef60480';

    const expected: Transaction[] = [];

    indexTransactionService
      .execute(user_code)
      .catch(e => expect(e).toMatchObject(expected));
  });
});
