import { Request, Response } from 'express';
import AuthenticationService from '../services/AuthenticationService';
import ORMUserRepository from '../repositories/implementations/ORMUserRepository';

export default class SessionsController {
  public async post(request: Request, response: Response): Promise<Response> {
    const userRepository = new ORMUserRepository();
    const authService = new AuthenticationService(userRepository);
    const { email, password } = request.body;

    try {
      const { user, token } = await authService.execute({ email, password });

      return response.status(200).json({ user, token });
    } catch (error) {
      return response.status(error.statusCode).json({ msg: error.message });
    }
  }
}
