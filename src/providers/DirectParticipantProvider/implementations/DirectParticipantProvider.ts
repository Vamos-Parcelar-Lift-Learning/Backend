import axios from 'axios';
import IDirectParticipantProvider from '../models/IDirectParticipantProvider';
import AppError from '../../../errors/AppError';

interface Buyer {
  cpf: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
}

interface Items {
  item_title: string;
  quantity: number;
  unity_price: number;
}

interface Order {
  buyer: Buyer;
  items: Items[];
  order_ref: string;
  total: number;
  wallet: string;
}

export default class DirectParticipantProvider
  implements IDirectParticipantProvider {
  public async generateTransaction(order: Order): Promise<string> {
    const response = await axios
      .post(`${process.env.DIRECT_PARTICIPANT_URL}/order/`, order, {
        headers: { Authorization: 'teste' },
      })
      .then(res => {
        return res;
      })
      .catch(() => {
        throw new AppError('Internal server error', 500);
      });
    return response.statusText;
  }

  public async checkStatus(payload: string): Promise<string> {
    return 'Hello provider';
  }
}
