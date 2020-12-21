import IDirectParticipantProvider from '../models/IDirectParticipantProvider';
import Order from '../dto/IOrder';
import OrderResponse from '../dto/IOrderResponse';
import IStatusResponse from '../dto/IStatusResponse';
import AppError from '../../../errors/AppError';

interface ITransactionStatus extends IStatusResponse {
  id: string;
}

export default class FakeParticipantProvider
  implements IDirectParticipantProvider {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async generateTransaction(order: Order): Promise<OrderResponse> {
    const orderResponse = {
      order_id: 'order_id',
      qr_code: 'qr_code_base64',
      qr_code_text: 'qr_code_text',
      status: 'pending',
    };

    return orderResponse;
  }

  public async checkStatus(orderId: string): Promise<IStatusResponse> {
    const transactionsStatus: ITransactionStatus[] = [];
    transactionsStatus.push(
      {
        id: '5fcf92f553291943325f7ec2',
        wallet: 'pix',
        external_id: '915c0f08-8582-4bca-8045-906e4b3ecc76',
        status: 'approved',
        paid_amount: 354.99,
        total_order: 354.99,
        items: [
          {
            item_title: 'conta de luz',
            quantity: 1,
            unit_price: 354.99,
          },
        ],
        created_at: '2020-12-08T14:51:33.562Z',
        updated_at: '2020-12-08T14:51:38.728Z',
      },
      {
        id: '5fcf92f553291943325f1234',
        wallet: 'pix',
        external_id: 'id não existente',
        status: 'approved',
        paid_amount: 354.99,
        total_order: 354.99,
        items: [
          {
            item_title: 'conta de luz',
            quantity: 1,
            unit_price: 354.99,
          },
        ],
        created_at: '2020-12-08T14:51:33.562Z',
        updated_at: '2020-12-08T14:51:38.728Z',
      },
    );

    const transactionStatus = transactionsStatus.find(e => e.id === orderId);
    if (transactionStatus) {
      return transactionStatus;
    }

    throw new AppError('Not found', 404);
  }
}
