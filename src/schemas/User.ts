import {
  Entity,
  Column,
  ObjectIdColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { ObjectID } from 'mongodb';

@Entity()
class User {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column('uuid')
  @Index({ unique: true })
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
