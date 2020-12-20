/* eslint-disable @typescript-eslint/camelcase */
import AppError from '../errors/AppError';
import ITransactionRepository from '../repositories/ITransactionRepository';
import Transaction from '../schemas/Transaction';
import IDirectParticipantProvider from '../providers/DirectParticipantProvider/models/IDirectParticipantProvider';

class UpdateTransactionService {
  private transactionRepository: ITransactionRepository;

  private participantProvider: IDirectParticipantProvider;

  constructor(
    transactionRepository: ITransactionRepository,
    participantProvider: IDirectParticipantProvider,
  ) {
    this.transactionRepository = transactionRepository;
    this.participantProvider = participantProvider;
  }

  public async execute(orderId: string): Promise<Transaction> {
    const participantResponse = await this.participantProvider.checkStatus(
      orderId,
    );

    const response = participantResponse;

    const transactionCode = response.external_id;
    const transaction = await this.transactionRepository.findByCode(
      transactionCode,
    );
    if (!transaction) {
      throw new AppError('Transação a atualizar não encontrada', 404);
    }

    transaction.status = response.status;
    transaction.participant.status = response.status;

    const cashbackToAdd = 5;
    if (transaction.status === 'approved') {
      transaction.cashback_generated += cashbackToAdd;
    }

    return this.transactionRepository.save(transaction);
  }
}

export default UpdateTransactionService;
