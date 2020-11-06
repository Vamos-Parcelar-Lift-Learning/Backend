/* eslint-disable @typescript-eslint/camelcase */
import { Entity, Column, ObjectIdColumn } from 'typeorm';
import { Double, ObjectID } from 'mongodb';
import Bill from './Bill';

@Entity()
class Transaction {
  @ObjectIdColumn()
  _id: string;

  @Column('uuid')
  code: string;

  @Column()
  nickname: string;

  @Column('uuid')
  user_code: string;

  @Column()
  amount: string;

  @Column()
  cashback_used: Double;

  @Column()
  total_payment: Double;

  @Column()
  cashback_generated: Double;

  @Column()
  status: string;

  @Column()
  bills: Bill[];

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}

export default Transaction;
