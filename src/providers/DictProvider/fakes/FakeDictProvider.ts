import IDictProvider from '../models/IDictProvider';
import IResponseDict from '../dto/IResponseDict';
import IAnswerDict from '../dto/IAnswerDict';

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

  public async validateKey(key: string): Promise<IAnswerDict> {
    const user: IResponseDict[] = this.users.filter(e => e.Key === key);
    if (user[0]) {
      return { message: '', status: 200 };
    }
    return { message: 'Chave PIX não encontrada', status: 404 };
  }
}
