import Transaction from '../schemas/Transaction';
import ITransactionRepository from '../repositories/ITransactionRepository';
import AppError from '../errors/AppError';
import IUserRepository from '../repositories/IUserRepository';

class AddUserCashbackService {
  private transactionRepository: ITransactionRepository;

  private userRepository: IUserRepository;

  constructor(
    transactionRepository: ITransactionRepository,
    userRepository: IUserRepository,
  ) {
    this.transactionRepository = transactionRepository;
    this.userRepository = userRepository;
  }

  async execute(transaction: Transaction): Promise<void> {
    const userCode = transaction.user_code;

    if (transaction.status === 'approved') {
      const user = await this.userRepository.findByCode(userCode);
      if (!user) {
        throw new AppError(
          'Não foi possível encontrar usuário na adição de cashback',
          500,
        );
      }

      user.cashback += transaction.cashback_generated;

      await this.userRepository.save(user);
      console.log('Gerado cashback para usuário');
    }
  }
}

export default AddUserCashbackService;
