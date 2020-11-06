import { Request, Response } from 'express';
import { string as str, date, object } from 'yup';
import UserService from '../services/UserService';

export default class UserController {
  public async get(request: Request, response: Response): Promise<Response> {
    const userService = new UserService();
    try {
      const users = await userService.getAllUsers();
      return response.status(200).json(users);
    } catch (error) {
      return response.status(400).json({ msg: error });
    }
  }

  public async put(request: Request, response: Response): Promise<Response> {
    const userService = new UserService();
    try {
      const regNome = new RegExp('^[a-zA-Z ]+$');
      const regCpf = new RegExp(
        '(^([0-9]{3})(.[0-9]{3}){2}-[0-9]{2}$|^[0-9]{11}$)',
      );

      const schema = object().shape({
        name: str().required().matches(regNome),
        birthdate: date().required(),
        cpf: str().required().matches(regCpf),
      });

      console.log('body =', request.body);
      if (await schema.isValid(request.body)) {
        console.log('é valido');
      } else {
        console.log('inválido');
      }

      const users = await userService.updateUsers();
      return response.status(200).json(users);
    } catch (error) {
      return response.status(400).json({ msg: error });
    }
  }
}
