import {
  Entity,
  Column,
  ObjectIdColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectID } from 'mongodb';

@Entity()
class User {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column('uuid')
  code: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  cashback: number;

  @Column()
  birthdate: Date;

  @Column()
  cpf: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
