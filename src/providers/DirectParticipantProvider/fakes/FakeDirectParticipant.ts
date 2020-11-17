/* eslint-disable @typescript-eslint/camelcase */
import IDirectParticipantProvider from '../models/IDirectParticipantProvider';
import Order from '../dto/IOrder';
import OrderResponse from '../dto/IOrderResponse';

export default class DirectParticipantProvider
  implements IDirectParticipantProvider {
  public async generateTransaction(order: Order): Promise<OrderResponse> {
    const orderResponse = {
      deep_link: 'url_of_digital_wallet',
      order_id: 'id_of_order',
      qr_code: 'qr_code_base64',
      qr_code_text: 'qr_code_text',
      status: 'payment_status',
    };
    return orderResponse;
  }

  public async checkStatus(idOrder: string): Promise<string> {
    return 'reponse_status_fake';
  }
}
