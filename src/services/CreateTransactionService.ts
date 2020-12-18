/* eslint-disable @typescript-eslint/camelcase */
import { v4 as uuidv4 } from 'uuid';
import Transaction from '../schemas/Transaction';
import ITransactionRepository from '../repositories/ITransactionRepository';
import IDictProvider from '../providers/DictProvider/models/IDictProvider';
import User from '../schemas/User';
import IDirectParticipantProvider from '../providers/DirectParticipantProvider/models/IDirectParticipantProvider';
import ICreateTransactionDTO from '../dtos/ICreateTransactionDTO';
import IOrder from '../providers/DirectParticipantProvider/dto/IOrder';
import AppError from '../errors/AppError';

class CreateTransactionService {
  private transactionRepository: ITransactionRepository;

  private dictProvider: IDictProvider;

  private participantProvider: IDirectParticipantProvider;

  constructor(
    transactionRepository: ITransactionRepository,
    dictProvider: IDictProvider,
    participantProvider: IDirectParticipantProvider,
  ) {
    this.transactionRepository = transactionRepository;
    this.dictProvider = dictProvider;
    this.participantProvider = participantProvider;
  }

  async execute(
    transaction: ICreateTransactionDTO,
    transactionCashback: number,
    user: User,
    key: string,
  ): Promise<Transaction> {
    // validate while code exists?
    const transactionCode = uuidv4();

    // validates Dict key
    const { message, status } = await this.dictProvider.validateKey(key);

    if (status !== 200) {
      throw new AppError(message, status);
    }

    // checks if there is an available cashback
    if (user.cashback < transactionCashback) {
      throw new AppError('Cashback insuficiente', 401);
    }

    const items = [];
    let totalAmount = 0;

    let i = 0;
    while (i < transaction.bills.length) {
      const bill = transaction.bills[i];
      const item = {
        item_title: bill.name,
        quantity: 1,
        unit_price: bill.amount,
      };
      items.push(item);

      totalAmount += bill.amount;
      i += 1;
    }

    const name = user.name.split(' ');
    const participantPayload: IOrder = {
      buyer: {
        cpf: user.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'),
        email: user.email,
        first_name: name[0],
        last_name: name[name.length - 1],
        phone: '(11) 99999-9999',
      },
      callback_url: process.env.CALLBACK_URL || '',
      items,
      order_ref: transactionCode,
      total: totalAmount,
      wallet: 'pix',
    };

    console.log('participantPayload = ', participantPayload);

    const participant = await this.participantProvider.generateTransaction(
      participantPayload,
    );

    const saveTransaction: Transaction = {
      ...transaction,
      code: transactionCode,
      user_code: user.code,
      key,
      participant,
      cashback_used: transactionCashback,
      amount: totalAmount.toString(),
      status: participant.status,
    };

    return this.transactionRepository.save(saveTransaction);
  }
}

export default CreateTransactionService;
