export default interface IDictProvider {
  validateKey(key: string): Promise<boolean>;
}
