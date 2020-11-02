import { Request, Response } from 'express';
import UserService from '../services/UserService';

export default class UserController {
  public async get(request: Request, response: Response): Promise<Response> {
    const userService = new UserService();
    const users = await userService.getAllUsers();

    return response.status(200).json(users);
  }
}
