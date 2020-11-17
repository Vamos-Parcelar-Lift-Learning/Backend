import axios from 'axios';
import IDirectParticipantProvider from '../models/IDirectParticipantProvider';
import Order from '../dto/IOrder';
import OrderResponse from '../dto/IOrderResponse';
import AppError from '../../../errors/AppError';

export default class DirectParticipantProvider
  implements IDirectParticipantProvider {
  public async generateTransaction(order: Order): Promise<OrderResponse> {
    const response = await axios.post(
      `${process.env.DIRECT_PARTICIPANT_URL}/order/`,
      order,
      {
        headers: { Authorization: 'teste' },
      },
    );

    if (response.status === 200) {
      const orderResponse = response.data;
      return orderResponse;
    }

    throw new AppError('Internal server error', 500);
  }

  public async checkStatus(idOrder: string): Promise<string> {
    const response = await axios.get(
      `${process.env.DIRECT_PARTICIPANT_URL}/order/${idOrder}`,
      {
        headers: { Authorization: 'teste' },
      },
    );
    if (response.status === 200) {
      return response.statusText;
    }

    throw new AppError('Internal server error', 500);
  }
}
