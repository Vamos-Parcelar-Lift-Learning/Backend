import axios from 'axios';
import DictProvider from '../models/IDictProvider';

export default class MockDictProvider implements DictProvider {
  public async validateKey(key: string): Promise<boolean | undefined> {
    const host = process.env.MOCK_DICT_HOST;
    const url = `${host}/api?key=${key}`;
    const config = {
      headers: {
        Authorization: process.env.TOKEN_MOCK_DICT,
      },
    };

    try {
      await axios.get(url, config);
      return true;
    } catch (error) {
      return false;
    }
  }
}
