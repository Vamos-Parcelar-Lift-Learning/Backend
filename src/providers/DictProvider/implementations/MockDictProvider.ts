import axios from 'axios';
import IDictProvider from '../models/IDictProvider';
import IAnswerDict from '../dto/IAnswerDict';

export default class MockDictProvider implements IDictProvider {
  public async validateKey(key: string): Promise<IAnswerDict> {
    const host = process.env.MOCK_DICT_HOST;
    const url = `${host}/api/${key}`;
    const config = {
      headers: {
        Authorization: process.env.TOKEN_MOCK_DICT,
      },
    };

    try {
      const res = await axios.get(url, config);

      if (!res.data.length) {
        return { message: 'Chave PIX não encontrada', status: 404 };
      }

      return { message: '', status: 200 };
    } catch (error) {
      console.log(error.response.status);
      return {
        message: error.response.data.error,
        status: error.response.status,
      };
    }
  }
}
