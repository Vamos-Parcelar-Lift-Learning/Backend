/* eslint-disable @typescript-eslint/camelcase */
import { Entity, Column, ObjectIdColumn } from 'typeorm';
import Bill from './Bill';

@Entity()
class Locator {
  @ObjectIdColumn()
  _id: string;

  @Column()
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
