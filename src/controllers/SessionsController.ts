import { Request, Response } from 'express';
import AuthenticationService from '../services/AuthenticationService';

export default class SessionsController {
  public async post(request: Request, response: Response): Promise<Response> {
    const authService = new AuthenticationService();
    const { email, password } = request.body;

    try {
      const { user, token } = await authService.handle({ email, password });

      return response.status(200).json({ user, token });
    } catch (error) {
      return response.status(error.statusCode).json({ msg: error.message });
    }
  }
}
