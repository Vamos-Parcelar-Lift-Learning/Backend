/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/camelcase */
import IDirectParticipantProvider from '../models/IDirectParticipantProvider';
import Order from '../dto/IOrder';
import OrderResponse from '../dto/IOrderResponse';

export default class FakeParticipantProvider
  implements IDirectParticipantProvider {
  public async generateTransaction(order: Order): Promise<OrderResponse> {
    const orderResponse = {
      order_id: 'order_id',
      qr_code: 'qr_code_base64',
      qr_code_text: 'qr_code_text',
      status: 'pending',
    };

    return orderResponse;
  }

  public async checkStatus(idOrder: string): Promise<string> {
    return 'reponse_status_fake';
  }
}
