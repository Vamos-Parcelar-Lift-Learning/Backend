/* eslint-disable @typescript-eslint/camelcase */
import { Request, Response } from 'express';
import DirectParticipantProvider from '../providers/DirectParticipantProvider/implementations/DirectParticipantProvider';

export default class TransactionsController {
  // Apenas para teste
  public async create(request: Request, response: Response): Promise<Response> {
    const { buyer, items, order_ref, total, wallet } = request.body;
    const order = {
      buyer,
      items,
      order_ref,
      total,
      wallet,
    };
    const transactionService = new DirectParticipantProvider();
    const transaction = await transactionService.generateTransaction(order);
    return response.status(200).json({ transaction });
  }
}
