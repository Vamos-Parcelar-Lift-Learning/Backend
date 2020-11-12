import { Request, Response } from 'express';
import { string as str, date, object } from 'yup';
import { getMongoRepository } from 'typeorm';
import UserService from '../services/UpdateUserService';

import User from '../schemas/User';

export default class UserController {
  public async index(request: Request, response: Response): Promise<Response> {
    const userRepository = getMongoRepository(User, 'mongo');
    const users = await userRepository.find();

    return response.status(200).json(users);
  }

  public async put(request: Request, response: Response): Promise<Response> {
    const userRepository = getMongoRepository(User, 'mongo');
    const updateUserService = new UserService(userRepository);

    try {
      const regNome = /^[a-zA-Z.áàâãéèêíïóôõöúçñ ]+$/;
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

        const result = await updateUserService.execute(user);

        return response.status(200).json(result);
      }
      console.log(`body inválido: ${name} ${birthdate} ${cpf}`);

      return response.status(400).json({ err: 'Body inválido' });
    } catch (error) {
      return response.status(error.statusCode).json({ err: error.message });
    }
  }
}
