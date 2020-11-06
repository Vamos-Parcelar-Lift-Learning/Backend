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
      const regNome = /^[a-zA-Z ]+$/;
      const regCpf = /(^([0-9]{3})(.[0-9]{3}){2}-[0-9]{2}$|^[0-9]{11}$)/;

      const { name, birthdate, cpf } = request.body;
      const { code } = request.user;

      const schema = object().shape({
        name: str().required().matches(regNome),
        birthdate: date().required(),
        cpf: str().required().matches(regCpf),
      });

      if (await schema.isValid({ name, birthdate, cpf })) {
        const user = {
          code,
          name,
          birthdate,
          cpf: cpf.replace(/[^\d]/g, ''),
        };

        const result = await userService.updateUsers(user);

        return response.status(200).json(result);
      }

      return response.status(400).json({ err: 'Body inválido' });
    } catch (error) {
      return response.status(error.statusCode).json({ err: error.message });
    }
  }
}
