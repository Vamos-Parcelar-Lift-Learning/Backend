export default interface IDirectParticipantProvider {
  generateTransaction(order: Order): Promise<string>;
  checkStatus(payload: string): Promise<string>;
}
