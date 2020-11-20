import IDictProvider from '../models/IDictProvider';

export default class FakeDictProvider implements IDictProvider {
  private keys: string[] = [];

  constructor() {
    this.keys.push('12345678900', '12345678901', '12345678902');
  }

  public async validateKey(key: string): Promise<boolean> {
    if (this.keys.includes(key)) {
      return true;
    }
    return false;
  }
}
