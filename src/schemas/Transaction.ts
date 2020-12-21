import {
  Entity,
  Column,
  ObjectIdColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import Bill from './Bill';
import Participant from './Participant';

@Entity()
class Transaction {
  @ObjectIdColumn()
  _id: string;

  @Column('uuid')
  @Index({ unique: true })
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
  cashback_used: number;

  @Column()
  total_payment: number;

  @Column()
  cashback_generated: number;

  @Column()
  status: string;

  @Column()
  bills: Bill[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    this.cashback_used = 0;
    this.total_payment = 0;
    this.cashback_generated = 0;
  }
}

export default Transaction;
