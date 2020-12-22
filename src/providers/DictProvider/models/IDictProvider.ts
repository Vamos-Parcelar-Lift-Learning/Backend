import IResponseDict from '../dto/IResponseDict';

export default interface IDictProvider {
  validateKey(key: string): Promise<IResponseDict>;
}
