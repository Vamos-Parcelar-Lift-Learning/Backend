import { v4 as uuidv4 } from 'uuid';
import { getMongoRepository } from 'typeorm';
import User from '../schemas/User';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const faker = require('faker-br');

interface MyUser {
  code: string;
  name: string;
  email: string;
  password: string;
  cashback: number;
  birthdate: Date;
  cpf: string;
  created: Date;
  updated: Date;
}

class UserSeed {
  public gen(): Promise<MyUser[]> {
    const users: MyUser[] = [];
    const lenUsers = 10;
    const userRepository = getMongoRepository(User, 'mongo');

    for (let i = 0; i < lenUsers; i += 1) {
      const name: string = faker.name.findName();
      const cpf: string = faker.br.cpf();
      const created: Date = faker.date.past();

      const user: MyUser = {
        code: uuidv4(),
        name,
        email: this.genEmail(name),
        password: this.genPassword(),
        cashback: 0,
        birthdate: this.genBirthDate(),
        cpf,
        created,
        updated: created,
      };
      users.push(user);
    }
    return userRepository.save(users);
  }

  private genEmail(name: string): string {
    const [firstName, lastName] = name.split(' ');
    return faker.internet.email(
      firstName.toLowerCase(),
      lastName.toLowerCase(),
    );
  }

  private genPassword(): string {
    return faker.helpers.replaceSymbolWithNumber('XXXXXX', 'X');
  }

  private genBirthDate(): Date {
    const dt = faker.date.between('1980-01-01', '2000-12-31');

    return dt;
  }
}

export default UserSeed;