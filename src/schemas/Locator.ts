/* eslint-disable @typescript-eslint/camelcase */
import { Entity, Column, ObjectIdColumn, Index } from 'typeorm';
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

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  constructor(code: string, bills: Bill[]) {
    this.code = code;
    this.bills = bills;
    this.created_at = new Date();
    this.updated_at = new Date();
  }
}

export default Locator;
