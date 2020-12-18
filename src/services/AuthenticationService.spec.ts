import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import AuthenticateUserService from './AuthenticationService';
import AppError from '../errors/AppError';
import User from '../schemas/User';

let userRepository: FakeUserRepository;
let authenticateUser: AuthenticateUserService;
let userJose: User;

describe('AuthenticateUser', () => {
  beforeEach(async () => {
    userRepository = new FakeUserRepository();
    authenticateUser = new AuthenticateUserService(userRepository);

    userJose = await userRepository.create({
      name: 'José João',
      email: 'jose.joao@gmail.com',
      password: '123123',
      birthdate: new Date('1994-09-10'),
      cpf: '12345678900',
    });
  });

  it('should be able to authenticate', async () => {
    const response = await authenticateUser.execute({
      email: 'jose.joao@gmail.com',
      password: '123123',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(userJose);
  });

  it('should not be able to authenticate with non existing user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await userRepository.create(userJose);

    await expect(
      authenticateUser.execute({
        email: 'jose.joao@gmail.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
