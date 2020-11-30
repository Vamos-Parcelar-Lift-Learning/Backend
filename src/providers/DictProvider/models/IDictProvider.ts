import IAnswerDict from '../dto/IAnswerDict';

export default interface IDictProvider {
  validateKey(key: string): Promise<IAnswerDict>;
}
