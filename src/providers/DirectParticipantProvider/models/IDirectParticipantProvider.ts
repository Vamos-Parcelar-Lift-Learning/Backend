import Order from '../dto/IOrder';
import IOrderResponse from '../dto/IOrderResponse';
import IStatusResponse from '../dto/IStatusResponse';

export default interface IDirectParticipantProvider {
  generateTransaction(order: Order): Promise<IOrderResponse>;
  checkStatus(order_id: string): Promise<IStatusResponse>;
}
