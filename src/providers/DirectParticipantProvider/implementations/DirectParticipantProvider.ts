import axios from 'axios';
import IDirectParticipantProvider from '../models/IDirectParticipantProvider';
import Order from '../dto/IOrder';
import IOrderResponse from '../dto/IOrderResponse';
import AppError from '../../../errors/AppError';
import IStatusResponse from '../dto/IStatusResponse';

export default class DirectParticipantProvider
  implements IDirectParticipantProvider {
  public async generateTransaction(order: Order): Promise<IOrderResponse> {
    const host = process.env.DIRECT_PARTICIPANT_HOST;
    const token = process.env.TOKEN_DIRECT_PARTICIPANT;
    const url = `${host}/orders/`;
    const config = {
      headers: {
        Authorization: token,
      },
    };

    try {
      const res = await axios.post(url, order, config);
      return res.data;
    } catch (error) {
      console.log(error);
      throw new AppError(error.response.data.message, error.response.status);
    }
  }

  public async checkStatus(orderId: string): Promise<IStatusResponse> {
    const host = process.env.DIRECT_PARTICIPANT_HOST;
    const token = process.env.TOKEN_DIRECT_PARTICIPANT;
    const url = `${host}/orders/${orderId}`;
    const config = {
      headers: {
        Authorization: token,
      },
    };

    try {
      const response = await axios.get(url, config);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new AppError(error.response.data.message, error.response.status);
    }
  }
}
