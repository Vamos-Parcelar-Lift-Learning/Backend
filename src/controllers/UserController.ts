import { Request, Response } from 'express';
import { string as str, date, object } from 'yup';

import UserService from '../services/UpdateUserService';
import ORMUserRepository from '../repositories/implementations/ORMUserRepository';

export default class UserController {
  public async index(request: Request, response: Response): Promise<Response> {
    const userRepository = new ORMUserRepository();
    const users = await userRepository.findAll();

    return response.status(200).json(users);
  }

  public async put(request: Request, response: Response): Promise<Response> {
    const userRepository = new ORMUserRepository();
    const updateUserService = new UserService(userRepository);

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
  }
}
