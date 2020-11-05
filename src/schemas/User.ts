import { Entity, Column, ObjectIdColumn } from 'typeorm';
import { Double, ObjectID } from 'mongodb';

@Entity()
class User {
  @ObjectIdColumn()
  id: ObjectID;

  @Column('uuid')
  code: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  cashback: Double;

  @Column()
  birthdate: Date;

  @Column()
  cpf: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}

export default User;
