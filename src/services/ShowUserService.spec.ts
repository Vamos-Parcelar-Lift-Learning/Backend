import AppError from '../errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import ShowUserService from './ShowUserService';

describe('ShowTransaction', () => {
  const userRepository = new FakeUserRepository();
  const showUserService = new ShowUserService(userRepository);

  beforeAll(async () => {
    const userJose = {
      code: 'ce0696d2-c0cf-49c7-aeeb-60c1a666647b',
      name: 'José João',
      email: 'jose.joao@gmail.com',
      password: '123123',
      birthdate: new Date('1994-09-10'),
      cpf: '12345678900',
    };
    await userRepository.create(userJose);
  });
  it('should not find user', async () => {
    const code = 'ce0696d2-c0cf-49c7-aeeb-60c1a6666xxx';

    const expectedError = new AppError('Usuário não encontrado.', 404);

    showUserService
      .execute(code)
      .catch(e => expect(e).toMatchObject(expectedError));
  });

  it('should find user', async () => {
    const code = 'ce0696d2-c0cf-49c7-aeeb-60c1a666647b';

    const user = await showUserService.execute(code);

    expect(user.code).toMatch(code);
    expect(user.name).toMatch('José João');
  });
});
