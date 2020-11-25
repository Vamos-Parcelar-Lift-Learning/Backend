/* eslint-disable @typescript-eslint/camelcase */
import { Double, ObjectID } from 'mongodb';
import FakeTransactionRepository from '../repositories/fakes/FakeTransactionRepository';
import ShowTransactionService from './ShowTransactionService';
import AppError from '../errors/AppError';
import Transaction from '../schemas/Transaction';

describe('ShowTransaction', () => {
  const transactionRepository = new FakeTransactionRepository();
  const showTransactionService = new ShowTransactionService(
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

  it('should not find transaction', async () => {
    const user_code = 'd9db3cc9-bf8e-4b40-bc61-d07c7ef60495';
    const code = '96089039-b35b-4499-9e36-c0308fea97aa';

    const expectedError = new AppError('Transação não encontrada.', 404);

    showTransactionService
      .execute(code, user_code)
      .catch(e => expect(e).toMatchObject(expectedError));
  });

  it('should not find transaction for user', async () => {
    const user_code = 'd9db3cc9-bf8e-4b40-bc61-d07c7ef60480';
    const code = '96089039-b35b-4499-9e36-c0308fea97ee';

    const expectedError = new AppError('Transação não encontrada.', 404);

    showTransactionService
      .execute(code, user_code)
      .catch(e => expect(e).toMatchObject(expectedError));
  });

  it('should find transaction', async () => {
    const user_code = 'd9db3cc9-bf8e-4b40-bc61-d07c7ef60495';
    const code = '96089039-b35b-4499-9e36-c0308fea97ee';

    const transaction = await showTransactionService.execute(code, user_code);

    expect(transaction.code).toMatch(code);
    expect(transaction._id).toMatch('3d7399e0-08e6-4d8c-ba4e-953affd8da5e');
  });
});
