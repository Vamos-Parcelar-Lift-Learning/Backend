import axios from 'axios';
import IDictProvider from '../models/IDictProvider';
import IResponseDict from '../dto/IResponseDict';
import AppError from '../../../errors/AppError';

export default class MockDictProvider implements IDictProvider {
  public async validateKey(key: string): Promise<IResponseDict> {
    const host = process.env.MOCK_DICT_HOST;
    const url = `${host}/api/${key}`;
    const config = {
      headers: {
        Authorization: process.env.TOKEN_MOCK_DICT,
      },
    };

    try {
      const res = await axios.get(url, config);
      return res.data;
    } catch (error) {
      console.log('Error in PIX key validation: ', error.response.data);
      throw new AppError(error.response.data.msg, error.response.status);
    }
  }
}
