import { ObjectID } from 'mongodb';
import FakeTransactionRepository from '../repositories/fakes/FakeTransactionRepository';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import AppError from '../errors/AppError';
import User from '../schemas/User';
import CreateTransactionService from './CreateTransactionService';
import FakeDictProvider from '../providers/DictProvider/fakes/FakeDictProvider';
import FakeDirectParticipant from '../providers/DirectParticipantProvider/fakes/FakeDirectParticipant';
import ICreateTransactionDTO from '../dtos/ICreateTransactionDTO';

describe('CreateTransaction', () => {
  const transactionRepository = new FakeTransactionRepository();
  const userRepository = new FakeUserRepository();
  const dictProvider = new FakeDictProvider();
  const directParticipantProvider = new FakeDirectParticipant();

  const transactionService = new CreateTransactionService(
    transactionRepository,
    dictProvider,
    directParticipantProvider,
  );

  const transactionOne = new ICreateTransactionDTO();
  transactionOne.bills = [
    {
      code: '597364863907',
      name: 'Celular',
      description: 'Conta de Celular',
      issuer: 'Costa - Reis',
      expiration_date: new Date('2020-11-17T09:53:39.469Z'),
      amount: 174,
    },
  ];
  transactionOne.nickname = 'minhas contas';

  const userJose: User = {
    _id: new ObjectID('5fabf9d2ed64b85f96fd3214'),
    code: 'ce0696d2-c0cf-49c7-aeeb-60c1a666647b',
    name: 'José João',
    email: 'jose.joao@gmail.com',
    password: '123123',
    birthdate: new Date('1994-09-10'),
    created_at: new Date(),
    updated_at: new Date(),
    cpf: '12345678900',
    cashback: 0,
  };

  let user: User;

  beforeAll(async () => {
    console.log('teste');
    user = await userRepository.save(userJose);
  });

  it('should create a transaction', async () => {
    const cashback = 0;
    const key = 'joao.silva@gmail.com';

    const createTransaction = await transactionService.execute(
      transactionOne,
      cashback,
      user,
      key,
    );

    expect(createTransaction.nickname).toMatch('minhas contas');
    expect(createTransaction.user_code).toMatch(user.code);
  });

  it('insufficient cashback ', async () => {
    const cashback = 10;
    const key = 'joao.silva@gmail.com';

    const expectedError = new AppError('Cashback insuficiente', 401);

    transactionService
      .execute(transactionOne, cashback, user, key)
      .catch(e => expect(e).toMatchObject(expectedError));
  });

  it('Invalid Key ', async () => {
    const cashback = 0;
    const key = 'xyz123';

    const expectedError = new AppError('Chave PIX não encontrada', 404);

    transactionService
      .execute(transactionOne, cashback, user, key)
      .catch(e => expect(e).toMatchObject(expectedError));
  });
});
