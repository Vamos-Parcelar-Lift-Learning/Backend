import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import UpdateUserService from './UpdateUserService';
import AppError from '../errors/AppError';

describe('UpdateUser', () => {
  const userRepository = new FakeUserRepository();
  const updateUserService = new UpdateUserService(userRepository);

  beforeAll(async () => {
    const userJose = {
      code: 'ce0696d2-c0cf-49c7-aeeb-60c1a666647b',
      name: 'José João',
      email: 'jose.joao@gmail.com',
      password: '123123',
      birthdate: new Date('1994-09-10'),
      cpf: '12345678900',
    };
    const userMaria = {
      code: '5678f1c9-bf5a-4f7e-ab7e-b5a9d15eae99',
      name: 'Maria Vitória',
      email: 'maria.vitoria@gmail.com',
      password: '456456',
      birthdate: new Date('1992-04-23'),
      cpf: '32132132100',
    };
    await userRepository.create(userJose);
    await userRepository.create(userMaria);
  });

  it('should not find user', async () => {
    const updateUser = {
      code: 'aaabbbcc-c0cf-49c7-aeeb-60c1a666647b',
      name: 'Rogéria dos Santos',
      birthdate: new Date('1990-09-10'),
      cpf: '32132132111',
    };

    const expectedError = new AppError('Usuário não encontrado', 404);
    updateUserService
      .execute(updateUser)
      .catch(e => expect(e).toMatchObject(expectedError));
  });

  it('should not update if cpf is registred for another user', async () => {
    const updateUser = {
      code: 'ce0696d2-c0cf-49c7-aeeb-60c1a666647b',
      name: 'José João',
      birthdate: new Date('1994-09-10'),
      cpf: '32132132100',
    };

    const expectedError = new AppError(
      'Cpf informado já cadastrado no sistema',
      400,
    );
    updateUserService
      .execute(updateUser)
      .catch(e => expect(e).toMatchObject(expectedError));
  });

  it('should update user successfully', async () => {
    const updateUser = {
      code: 'ce0696d2-c0cf-49c7-aeeb-60c1a666647b',
      name: 'José João NOVO',
      birthdate: new Date('2000-09-10'),
      cpf: '12345678900',
    };

    const userJose = await userRepository.findByCode(
      'ce0696d2-c0cf-49c7-aeeb-60c1a666647b',
    );

    expect(userJose?.name).toBe('José João');

    await updateUserService.execute(updateUser);

    expect(userJose?.name).toBe('José João NOVO');
    expect(userJose?.birthdate).toStrictEqual(new Date('2000-09-10'));
    expect(userJose?.updated_at).not.toBe(userJose?.created_at);
  });
});
