import IDictProvider from '../models/IDictProvider';
import IResponseDict from '../dto/IResponseDict';
import AppError from '../../../errors/AppError';

export default class FakeDictProvider implements IDictProvider {
  private users: IResponseDict[] = [];

  constructor() {
    const user: IResponseDict = {
      Account: {
        AccountNumber: '0007654321',
        AccountType: 'CACC',
        Branch: '00001',
        OpeningDate: '2010-01-10T03:00:00Z',
        Participant: '12345678', // Identificador SPB do provedor da conta
      },
      Key: 'joao.silva@gmail.com', // <= 77 characters
      KeyType: 'EMAIL', // Enum: "CPF" "CNPJ" "PHONE" "EMAIL" "EVP"
      Owner: {
        Name: 'João Silva',
        TaxIdNumber: 11122233300,
        Type: 'LEGAL_PERSON',
      },
    };
    this.users.push(user);
  }

  public async validateKey(key: string): Promise<IResponseDict> {
    const user: IResponseDict[] = this.users.filter(e => e.Key === key);
    if (user[0]) {
      return user[0];
    }

    throw new AppError('Not found', 404);
  }
}
