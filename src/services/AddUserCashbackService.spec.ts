import FakeTransactionRepository from '../repositories/fakes/FakeTransactionRepository';
import Transaction from '../schemas/Transaction';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import AddUserCashbackService from './AddUserCashbackService';
import AppError from '../errors/AppError';

describe('IndexTransaction', () => {
  const transactionRepository = new FakeTransactionRepository();
  const userRepository = new FakeUserRepository();

  beforeAll(async () => {
    const userJose = {
      code: 'ce0696d2-c0cf-49c7-aeeb-60c1a666647b',
      name: 'José João',
      email: 'jose.joao@gmail.com',
      cashback: 0,
      password: '123123',
      birthdate: new Date('1994-09-10'),
      cpf: '12345678900',
    };
    await userRepository.create(userJose);

    const transactionJose: Transaction = {
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
      user_code: 'ce0696d2-c0cf-49c7-aeeb-60c1a666647b',
      amount: 'fake',
      cashback_used: 10.0,
      total_payment: 100.0,
      cashback_generated: 5,
      status: 'approved',
      bills: [],
      created_at: new Date('2020-11-20'),
      updated_at: new Date('2020-11-20'),
    };

    const transactionGhostUser: Transaction = {
      _id: '3d7399e0-08e6-4d8c-ba4e-953affd8da5e',
      code: '96089039-b35b-4499-9e36-c0308feGHOST',
      key: 'joaozinho61df@gmail.com',
      participant: {
        order_id: '1',
        qr_code: 'url_qr_code',
        qr_code_text: 'url_qr_code_txt',
        status: 'pending',
      },
      nickname: 'month bills',
      user_code: 'ce0696d2-c0cf-49c7-aeeb-60c1a66XXXXX',
      amount: 'fake',
      cashback_used: 10.0,
      total_payment: 100.0,
      cashback_generated: 5,
      status: 'approved',
      bills: [],
      created_at: new Date('2020-11-20'),
      updated_at: new Date('2020-11-20'),
    };

    await transactionRepository.save(transactionJose);
    await transactionRepository.save(transactionGhostUser);
  });

  it('it should not find the user to add cashback', async () => {
    const transactionCode = '96089039-b35b-4499-9e36-c0308feGHOST';
    const transaction = await transactionRepository.findByCode(transactionCode);

    if (transaction) {
      const addUserCash = new AddUserCashbackService(
        transactionRepository,
        userRepository,
      );

      await expect(addUserCash.execute(transaction)).rejects.toBeInstanceOf(
        AppError,
      );
    }
  });

  it('it should do nothing to others status', async () => {
    const transactionCode = '96089039-b35b-4499-9e36-c0308feGHOST';
    const transaction = await transactionRepository.findByCode(transactionCode);
    const user = await userRepository.findByCode(
      'ce0696d2-c0cf-49c7-aeeb-60c1a666647b',
    );

    if (transaction && user) {
      transaction.status = 'pending';

      const addUserCash = new AddUserCashbackService(
        transactionRepository,
        userRepository,
      );

      expect(user.cashback).toBe(0);
      await addUserCash.execute(transaction);
      expect(user.cashback).toBe(0);
    }
  });

  it('it should add cashback to user', async () => {
    const user = await userRepository.findByCode(
      'ce0696d2-c0cf-49c7-aeeb-60c1a666647b',
    );

    const transactionCode = '96089039-b35b-4499-9e36-c0308fea97ee';
    const transaction = await transactionRepository.findByCode(transactionCode);

    if (transaction && user) {
      const addUserCash = new AddUserCashbackService(
        transactionRepository,
        userRepository,
      );

      expect(user.cashback).toBe(0);
      await addUserCash.execute(transaction);
      expect(user.cashback).toBe(5);
    }
  });
});
