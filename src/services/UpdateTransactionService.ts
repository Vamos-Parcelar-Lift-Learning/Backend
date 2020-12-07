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

    const { statusCode, data, error } = participantResponse;
    if (statusCode !== 200 || !data) {
      throw new AppError(
        error || 'Erro não identificado no participante direto',
        statusCode,
      );
    }

    const transactionCode = data.external_id;
    const transaction = await this.transactionRepository.findByCode(
      transactionCode,
    );
    if (!transaction) {
      throw new AppError('Transação a atualizar não encontrada', 404);
    }

    transaction.status = data.status;
    transaction.participant.status = data.status;
    transaction.updated_at = new Date();

    return this.transactionRepository.save(transaction);
  }
}

export default UpdateTransactionService;
