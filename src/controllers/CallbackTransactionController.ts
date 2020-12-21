import { Request, Response } from 'express';
import * as yup from 'yup';

import DirectParticipantProvider from '../providers/DirectParticipantProvider/implementations/DirectParticipantProvider';
import UpdateTransactionService from '../services/UpdateTransactionService';
import ORMTransactionRepository from '../repositories/implementations/ORMTransactionRepository';
import ORMUserRepository from '../repositories/implementations/ORMUserRepository';
import AddUserCashbackService from '../services/AddUserCashbackService';

export default class CallbackTransactionController {
  public async patch(request: Request, response: Response): Promise<Response> {
    console.log('Novo callback recebido');
    console.log('payload', request.body);

    const schema = yup.object().shape({
      order_id: yup.string().required(),
    });

    const isValid = await schema.isValid(request.body);
    if (!isValid) {
      return response.status(400).json({ msg: 'Body inválido' });
    }

    const { order_id } = request.body;

    const transactionRepository = new ORMTransactionRepository();
    const participantProvider = new DirectParticipantProvider();
    const updateTransactionService = new UpdateTransactionService(
      transactionRepository,
      participantProvider,
    );

    const updateTransaction = await updateTransactionService.execute(order_id);

    const userRepository = new ORMUserRepository();
    const addUserCashback = new AddUserCashbackService(
      transactionRepository,
      userRepository,
    );

    await addUserCashback.execute(updateTransaction);

    return response.status(200).json(updateTransaction);
  }
}
