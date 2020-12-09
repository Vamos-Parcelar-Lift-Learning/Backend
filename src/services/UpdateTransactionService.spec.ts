/* eslint-disable @typescript-eslint/camelcase */
import { Double } from 'mongodb';
import AppError from '../errors/AppError';
import FakeTransactionRepository from '../repositories/fakes/FakeTransactionRepository';
import UpdateTransactionService from './UpdateTransactionService';
import FakeParticipantProvider from '../providers/DirectParticipantProvider/fakes/FakeDirectParticipant';

describe('UpdateTransaction', () => {
  const transactionRepository = new FakeTransactionRepository();
  const participantProvider = new FakeParticipantProvider();
  const updateTransaction = new UpdateTransactionService(
    transactionRepository,
    participantProvider,
  );

  beforeAll(async () => {
    const transaction = {
      cashback_used: new Double(0),
      total_payment: new Double(0),
      cashback_generated: new Double(0),
      created_at: new Date('2020-12-08T15:56:24.662Z'),
      updated_at: new Date('2020-12-08T15:56:24.662Z'),
      _id: '5fcfa223114d085b13681d60',
      code: '915c0f08-8582-4bca-8045-906e4b3ecc76',
      key: '78865679000',
      participant: {
        order_id: '5fcfa223f0326c5c2a0d649a',
        qr_code: 'qrcode',
        qr_code_text: 'urlqrcodetxt/qrcode_ref',
        status: 'approved',
      },
      nickname: 'minhas contas',
      user_code: '71d59018-0605-495b-8f6a-8cea2478fcd5',
      amount: '174',
      status: 'pending',
      bills: [
        {
          code: '597364863907',
          name: 'Celular',
          description: 'Conta de Celular',
          issuer: 'Costa - Reis',
          expiration_date: new Date('2020-11-17T09:53:39.469Z'),
          amount: 174,
        },
      ],
    };

    await transactionRepository.save(transaction);
  });

  it('should not find the transaction status', async () => {
    const order_id = '5fcf92f553291943325fxxxx';

    await expect(updateTransaction.execute(order_id)).rejects.toBeInstanceOf(
      AppError,
    );
  });

  it('should find the transaction status but not find the transaction to be updated', async () => {
    // transaction with invalid external_id
    const order_id = '5fcf92f553291943325f1234';
    const expectedError = new AppError(
      'Transação a atualizar não encontrada',
      404,
    );

    await expect(updateTransaction.execute(order_id)).rejects.toMatchObject(
      expectedError,
    );
  });

  it('should find the transaction status and update the transaction', async () => {
    const order_id = '5fcf92f553291943325f7ec2';
    const transactionId = '915c0f08-8582-4bca-8045-906e4b3ecc76'; // created transaction

    const transaction = await transactionRepository.findByCode(transactionId);
    expect(transaction?.status).toMatch('pending');

    await updateTransaction.execute(order_id);
    expect(transaction?.status).toMatch('approved');
  });
});
