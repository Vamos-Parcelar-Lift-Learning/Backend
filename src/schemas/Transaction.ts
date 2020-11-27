/* eslint-disable @typescript-eslint/camelcase */
import { Entity, Column, ObjectIdColumn } from 'typeorm';
import { Double } from 'mongodb';
import Bill from './Bill';
import Participant from './Participant';

@Entity()
class Transaction {
  @ObjectIdColumn()
  _id: string;

  @Column('uuid')
  code: string;

  @Column()
  key: string;

  @Column()
  participant: Participant;

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

  constructor() {
    const created = new Date();
    this.cashback_generated = (0 as unknown) as Double;
    this.created_at = created;
    this.updated_at = created;
  }
}

export default Transaction;
