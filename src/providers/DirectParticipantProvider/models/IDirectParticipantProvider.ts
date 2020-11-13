import Order from '../dto/IOrder';
import OrderResponse from '../dto/IOrderResponse';

export default interface IDirectParticipantProvider {
  generateTransaction(order: Order): Promise<OrderResponse>;
  checkStatus(payload: string): Promise<string>;
}
