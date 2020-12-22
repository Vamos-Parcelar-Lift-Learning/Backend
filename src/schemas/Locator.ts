import {
  Entity,
  Column,
  ObjectIdColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectID } from 'mongodb';
import Bill from './Bill';

@Entity()
class Locator {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  @Index({ unique: true })
  code: string;

  @Column()
  bills: Bill[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Locator;
