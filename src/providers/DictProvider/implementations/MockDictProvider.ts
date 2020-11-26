import axios from 'axios';
import IDictProvider from '../models/IDictProvider';
import IResponseDict from '../dto/IResponseDict';
import AppError from '../../../errors/AppError';

export default class MockDictProvider implements IDictProvider {
  public async validateKey(key: string): Promise<IResponseDict> {
    const host = process.env.MOCK_DICT_HOST;
    const url = `${host}/api?key=${key}`;
    const config = {
      headers: {
        Authorization: process.env.TOKEN_MOCK_DICT,
      },
    };

    try {
      const res = await axios.get(url, config);
      const user: IResponseDict = res.data;
      return user;
    } catch (error) {
      throw new AppError(error);
    }
  }
}
