import { ObjectID } from 'mongodb';
import AppError from '../errors/AppError';
import ShowLocatorService from './ShowLocatorService';
import FakeLocatorRepository from '../repositories/fakes/FakeLocatorRepository';

describe('ShowLocator', () => {
  const locatorRepository = new FakeLocatorRepository();
  const locatorService = new ShowLocatorService(locatorRepository);

  it('should not find locator', async () => {
    const expectedError = new AppError('Localizador não encontrado.', 404);

    const code = 'BBB135';
    locatorService
      .execute(code)
      .catch(e => expect(e).toMatchObject(expectedError));
  });

  it('should find locator', async () => {
    const code = 'AAA531';
    const locator = await locatorService.execute(code);

    expect(locator.code).toMatch(code);
    expect(locator._id).toMatchObject(new ObjectID('5fabf9d2ed64b85f96fd3214'));
  });
});
