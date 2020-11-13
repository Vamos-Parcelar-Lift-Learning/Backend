export default interface DictProvider {
  validateKey(key: string): Promise<boolean | undefined>;
}
