import IDirectParticipantProvider from '../models/IDirectParticipantProvider';

export default class DirectParticipantProvider implements IDirectParticipantProvider {
  public async generateTransaction(payload: string): Promise<string> {
    return "Hello provider";
  }

  public async checkStatus(payload: string): Promise<string> {
    return "Hello provider";
  }
}
