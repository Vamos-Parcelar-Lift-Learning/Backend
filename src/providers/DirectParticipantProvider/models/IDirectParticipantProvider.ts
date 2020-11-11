export default interface IDirectParticipantProvider {
  generateTransaction(payload: string): Promise<string>;
  checkStatus(payload: string): Promise<string>;
}
